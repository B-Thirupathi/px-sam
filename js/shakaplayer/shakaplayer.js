var ShakaPlayer = {};
var fullResolution = ['0%', '0%', '100%', '100%'];
var _shaka = undefined
ShakaPlayer.duration = undefined;
var adPlaying = false;
ShakaPlayer.isseeking = false;
var showsuggestionsTimer;
var seekPositionTime;
var seekingTime = 0;
var isNetworkError = false;
var eventIdBuffer = '';
var nextVideoPreview = false;
var nextVideoPreviewDismissed = false;
var nextVideoPreviewStartTime = null; // in seconds
var clickedSkipIntro = false
var skipIntroOnn = false;
var skipIntroOff = false;
var nextVideoBack = false;
var showrunTime;
var isItSeekIn = false;
var timerInterval;
var timerSeconds = 0;
var isTimerRunning = false;
var assetkeyAvailable = false;
var stream_url;
var distroPlayingMacro = false
var languageMap = {};
var pollstart;
var controlSuggestionControls;
//ads implementation variables
var adUrls = {}
var adsManager;
var adContainer;
// ad controls visibility flags
var adControlsVisible = false;
var adControlsHideTimer = null;
var AD_CONTROLS_HIDE_MS = 5000;
var adControlsAutoEnabled = false;
var seekRecoveryTimer = null;
var SEEK_END_GUARD_SECONDS = 10;
// Function to start or resume the timer
function startTimer() {
    if (!isTimerRunning) {

        timerInterval = setInterval(function () {
            timerSeconds++;
        }, 1000);
        isTimerRunning = true;
    }
}

// Function to pause the timer
function pauseTimer() {
    if (isTimerRunning) {
        // Clear the timer interval to pause the timer
        clearInterval(timerInterval);
        isTimerRunning = false;
    }
}



// VMAP ad response handler
function handleVMAPResponse(success, result) {
    if (success) {
        console.log('VMAP loaded successfully');
        console.log('Total preroll ads:', result.preroll, 'in', result.prerollBreaks, 'breaks');
        console.log('Total midroll ads:', result.midroll, 'in', result.midrollBreaks, 'breaks');
        console.log('Total postroll ads:', result.postroll, 'in', result.postrollBreaks, 'breaks');
        console.log('Total ads:', result.total);

        // Log details of each break
        console.log('Preroll breaks:', adsManager.adBreaks.preroll);
        console.log('Midroll breaks:', adsManager.adBreaks.midroll);
        console.log('Postroll breaks:', adsManager.adBreaks.postroll);

        // Play preroll ad pods before content
        if (result.prerollBreaks > 0) {
            playPrerollAdPods();
        } else {
            startMainContent();
            if (adsManager && adsManager.isAdPlaying) {
                adsManager.isAdPlaying = false;
            }
        }
    } else {
        console.error('Failed to load VMAP:', result);
        startMainContent(); // Continue with content if ads fail
    }
}

ShakaPlayer.callingPlayer = function () {
    presentPagedetails.isPlayerReady = false;
    if (utilities.getFromLocalStorage("closed_caption") == "true") {
        presentPagedetails.isCaptionsEnable = true;
        // Yup("#closed_caption").attr("src", "images/cc-on.png")
    }
    Yup("#play-but").hide();
    Yup("#playerButtons").show();
    // if (adPlayerInstance == undefined && Player.Adsavaliable(presentPagedetails.type)) {
    // 	adPlayerInstance = adPlayer.InitadPlayer(ShakaPlayer)
    // 	adPlayerInstance.adPlayer.startSession(adPlayerInstance.session, adPlayerInstance.adPlayerListener);
    // 	return;
    // }
    Yup("#mainContent").html('');
    ShakaPlayer.appendUI();
}

ShakaPlayer.appendUI = function () {
    // Main.initconvivo();
    Main.hideMenu();
    Yup("#mainContent").append(Util.playerBody());
    Yup("#mainContent").show();
    Yup("#play-but").hide();
    Yup("#playerBackImg").hide();
    Yup("#subtitles_main").css('display', 'none');
    Yup("#video_quality").css('display', 'none');
    Yup("#playerBtn").show();
    // if (presentPagedetails.steamResponse.analyticsInfo.contentType !="live") {
    // 	Yup("#play-but").addClass("imageFocus");
    // }
    // if (presentPagedetails.steamResponse.analyticsInfo.contentType =="live") {
    //     Yup("#seekbar-live").addClass("imageFocus");
    // }
    // else{
    Yup(".imageFocus").removeClass('imageFocus')
    Yup("#playerBtn").addClass('imageFocus');
    // }
    if (presentPagedetails.isCaptionsEnable == true) {
        if (keyHandlar.isHD) {
            Yup(".captions_data").css('bottom', '132px')
        }
        else {
            Yup(".captions_data").css('bottom', '200px')
        }
    }
    if (presentPagedetails.steamResponse.analyticsInfo.contentType === 'live') {
        ShakaPlayer.hidePlayerDetails();
        presentPagedetails.constrolsShow = false;
    }
    else {
        presentPagedetails.constrolsShow = true;
    }
    Main.HideLoading();
    ShakaPlayer.construct();
}

ShakaPlayer.construct = function () {
    try {
        Main.playerShowLoading();
        var video = document.createElement('video');
        video.setAttribute('id', 'video');
        video.setAttribute('autoplay', 'true');
        video.style.position = 'fixed';
        video.style.left = fullResolution[0];
        video.style.top = fullResolution[1];
        video.style.width = fullResolution[2];
        video.style.height = fullResolution[3];
        ShakaPlayer.intialPlaying = true;
        ShakaPlayer.isseeking = false;
        // var sourceData = document.createElement("source");
        document.getElementById("mainContent").appendChild(video);
        attachSeekHandlerToReenablePreview();
        var adContainer = document.createElement('ad-container')
        adContainer.style.position = "absolute"
        adContainer.style.width = "100%"
        adContainer.style.height = "100%"
        adContainer.setAttribute("id", "ad-container");
        var mainContent = document.getElementById("mainContent");
        mainContent.appendChild(adContainer);
        // Install built-in polyfills to patch browser incompatibilities.
        var stream_index;
        for (var i = 0; i < presentPagedetails.steamResponse.streams.length; i++) {
            if (presentPagedetails.steamResponse.streams[i].streamType !== "fairplay" && presentPagedetails.steamResponse.streams[i].streamType != "playready") {
                stream_url = presentPagedetails.steamResponse.streams[i].url;
                stream_index = i;
                var daiAssetKey = presentPagedetails.steamResponse.streams[i].params.daiAssetKey;
                if (daiAssetKey) {
                    assetkeyAvailable = true;
                } else {
                    assetkeyAvailable = false;
                    console.log('No valid daiAssetKey found for stream:', i);
                }
                break;
            }
        }

        if (stream_url == undefined) {
            return;
        }

        // Player.seekBarAdbreakPoints();
        shaka.polyfill.installAll();
        presentPagedetails.isPlayerReady = true;
        if (shaka.Player.isBrowserSupported()) {
            var ele = document.getElementById('video')
            if (_shaka != undefined) {
                if (_shaka.destroy != undefined && typeof _shaka.destroy == 'function') {
                    _shaka.destroy();
                }
                _shaka = undefined
            }
            _shaka = new shaka.Player();
            _shaka.attach(ele).then(() => {



                // Ads Implementation
                adsManager = new CustomAdsManager();
                console.log(presentPagedetails.adUrlResponse)
                if (presentPagedetails.adUrlResponse && presentPagedetails.adUrlResponse.adUrlTypes) {
                    for (var i = 0; i < presentPagedetails.adUrlResponse.adUrlTypes.length; i++) {
                        if (presentPagedetails.adUrlResponse.adUrlTypes[i].attributes.adTag == "vast") {
                            adsManager.isAdPlaying = true
                            adsManager.init(ShakaPlayer.videoElement, document.getElementById('ad-container'))
                            adsManager.prepareVAST(presentPagedetails.adUrlResponse.adUrlTypes, handleVMAPResponse)
                            break;
                        }
                        else {
                            console.log(presentPagedetails.adUrlResponse.adUrlTypes[i].url)
                            adsManager.isAdPlaying = true
                            adsManager.init(ShakaPlayer.videoElement, document.getElementById('ad-container'))
                            // adsManager.
                            // adsManager.fetchVMAP("https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_skip_ad_samples&sz=640x480&cust_params=sample_ar%3Dmidskiponly&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&cmsid=496&vid=short_onecue&correlator=", handleVMAPResponse)
                            adsManager.fetchVMAP(presentPagedetails.adUrlResponse.adUrlTypes[i].url, handleVMAPResponse)
                            break
                        }

                        // adsManager.init(ShakaPlayer.videoElement,document.getElementById('ad-container'))
                        // adsManager.fetchVMAP("https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/vmap_ad_samples&sz=640x480&cust_params=sample_ar%3Dpremidpostoptimizedpod&ciu_szs=300x250&gdfp_req=1&ad_rule=1&output=vmap&unviewed_position_start=1&env=vp&cmsid=496&vid=short_onecue&correlator=", handleVMAPResponse)

                    }
                }


                // if (stream_url.indexOf('.m3u8') > -1) {
                //     // if (presentPagedetails.steamResponse.streams[stream_index].params &&
                //     //     presentPagedetails.steamResponse.streams[stream_index].params.token &&
                //     //     presentPagedetails.steamResponse.streams[stream_index].params.sessionid) {
                //     _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {
                //         if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                //             request.allowCrossSiteCredentials = true;
                //         }
                //         if (type === shaka.net.NetworkingEngine.RequestType.SEGMENT) {
                //             request.method = 'GET';
                //         }
                //         if (type === shaka.net.NetworkingEngine.RequestType.MANIFEST &&
                //             presentPagedetails.attributes.networkName === "Sonyliv" &&
                //             presentPagedetails.steamResponse.analyticsInfo.contentType === 'live') {
                //                 if(presentPagedetails.steamResponse &&presentPagedetails.steamResponse.streams && presentPagedetails.steamResponse.streams[0] && presentPagedetails.steamResponse.streams[0].params && presentPagedetails.steamResponse.streams[0].params.daiAssetKey){
                //             if (request.uris && request.uris.length && request.uris[0].indexOf('%') !== -1 && request.uris[0].indexOf('dai') !== -1) {
                //                 var newUris = [];
                //                 for (var i = 0; i < request.uris.length; i++) {
                //                   var u = request.uris[i];
                //                   try {
                //                     if (u.indexOf('%') !== -1) {
                //                     //   newUris.push(decodeURIComponent(u));
                //                       newUris.push((decodeURIComponent(u.replace(/%20/g, '+'))));
                //                     } else {
                //                       newUris.push(u);
                //                     }
                //                   } catch (e) {
                //                     newUris.push(u);
                //                   }
                //                 }
                //                 request.uris = newUris;
                //               }
                //                 }
                //                 else{
                //                     var updatedUris = [];
                //                     for (var i = 0; i < request.uris.length; i++) {
                //                         // updatedUris.push(request.uris[i].replace(/%20/g, '+'));
                //                         updatedUris.push((decodeURIComponent(request.uris[i].replace(/%20/g, '+'))));
                //                     }
                //                     request.uris = updatedUris;
                //                 }                              
                //             }
                //     });
                //     _shaka.configure({
                //         "manifest":{
                //             "hls":{
                //                 // useSafariBehaviourForLive:false
                //             }
                //         }
                //     })
                // }


                if (stream_url.indexOf(".m3u8") > -1) {
                    _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {
                        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                            request.allowCrossSiteCredentials = true;
                        }

                        // SEGMENT Handling (Kept as is)
                        if (type === shaka.net.NetworkingEngine.RequestType.SEGMENT || type === shaka.net.NetworkingEngine.RequestType.MANIFEST) {
                            request.method = 'GET';
                            if (
                                presentPagedetails.attributes.networkName === "Sonyliv" &&
                                presentPagedetails.steamResponse.analyticsInfo.contentType === 'live') {
                                if (presentPagedetails.steamResponse && presentPagedetails.steamResponse.streams && presentPagedetails.steamResponse.streams[0] && presentPagedetails.steamResponse.streams[0].params && presentPagedetails.steamResponse.streams[0].params.daiAssetKey) {
                                    if (request.uris && request.uris.length && request.uris[0].indexOf('%') !== -1) {
                                        var newUris = [];
                                        for (var i = 0; i < request.uris.length; i++) {
                                            var u = request.uris[i];
                                            try {
                                                if (u.indexOf('%') !== -1) {
                                                    // console.log(u.indexOf('%20'),u)
                                                    newUris.push((decodeURIComponent(u.replace(/%20/g, '+'))));
                                                } else {
                                                    newUris.push(u);
                                                }
                                            } catch (e) {
                                                newUris.push(u);
                                            }
                                        }
                                        request.uris = newUris;
                                    }
                                } else {
                                    var updatedUris = [];
                                    for (var i = 0; i < request.uris.length; i++) {
                                        updatedUris.push(request.uris[i].replace(/%20/g, '+'));
                                    }
                                    request.uris = updatedUris;
                                }
                            }
                        }
                    });
                }
                else {
                    _shaka.configure({
                        "drm": ShakaPlayer.getDrmConfig(),
                    })

                }
                if (presentPagedetails.steamResponse.pageAttributes.networkName == "Play Flix") {
                    _shaka.configure({
                        abr: {
                            restrictions: {
                                minBandwidth: 500000,
                                maxBandwidth: 1000000
                            }
                        }

                    });
                }
                if (assetkeyAvailable) {
                    try {
                        var adManager = _shaka.getAdManager();
                        adManager.initServerSide(adContainer, video);
                        console.log('Ad Manager initialized:', adManager);

                        var streamRequest = new google.ima.dai.api.LiveStreamRequest();
                        console.log('Stream Request initialized:', streamRequest);

                        for (var i = 0; i < presentPagedetails.steamResponse.streams.length; i++) {
                            var daiAssetKey = presentPagedetails.steamResponse.streams[i].params.daiAssetKey;
                            if (daiAssetKey) {
                                streamRequest.assetKey = daiAssetKey;
                                break;
                            }
                        }

                        assetkeyAvailable = false;

                        adManager.requestServerSideStream(streamRequest)
                            .then(function (uri) {
                                if (!adsManager.isAdPlaying) {
                                    console.log('Server-side stream URI:', uri);
                                    ShakaPlayer.shakaConfigurations();
                                    _shaka.load(uri);
                                }
                            })
                            .catch(function (error) {
                                console.error('Failed to load server-side stream:', error);
                                onError(error);
                            });
                        console.log('The video has now been loaded!');
                    } catch (e) {
                        console.error('Caught error in adManager process:', e);
                        onError(e);
                    }
                }
                else {
                    console.log(adsManager.isAdPlaying)
                    if (!adsManager.isAdPlaying) {
                        if (presentPagedetails.attributes.networkName == "Distro") {
                            callingMacros();
                            replaceUrl()
                        }
                        _shaka.load(stream_url).then(function (evt) {
                            console.log("The video has now been loaded!");
                            ShakaPlayer.shakaConfigurations();
                            // forceResumeIfStuck(video, _shaka);
                        }).catch(onErrorEvent)
                    }
                }
            }).then(function () {
                utilities.refreshContinueWatching();
                ShakaPlayer.playStream();
            }).catch(err => {
                analytics.plugin.handleError({ errorMsg: err.toString })
                onError(err);
            })
            ShakaPlayer.kill = ShakaPlayer.killWrapper(_shaka).bind(ShakaPlayer)

            // Listen for error events.
            _shaka.addEventListener('error', onErrorEvent);
            _shaka.addEventListener('LoadedEvent', function (data) {
            })
            _shaka.addEventListener('buffering', function (e) {
                console.log("Buffering:", e.buffering, " => isBuffering");
                console.warn(" Buffering:", e.buffering,
                    "Buffered ranges:", _shaka.getBufferedInfo());
                if (e.buffering == true) {
                    Main.playerShowLoading();
                    analytics.plugin.handleBufferStart();
                }

                if (e.buffering == false) {
                    Main.playerHideLoading();
                    analytics.plugin.handleBufferEnd();
                }
            })
            // Try to load a manifest.
            // This is an asynchronous process.


            function onErrorEvent(event) {
                console.error("Shaka Error:", event);
                var detail = (!!event.detail) ? event.detail : "NA"
                detail = (detail == "NA" && !!event.message) ? event.message : detail
                analytics.plugin.handleError({ errorMsg: detail })
            }

            function onError(error) {
                // Log the error.
                console.error('Error code', error.code, 'object', error);
                analytics.plugin.handleError({ errorMsg: error })
            }


        }
        ShakaPlayer.playerState = 'idle'
        ShakaPlayer.videoElement = video;
        video.addEventListener('play', function (e) {
            ShakaPlayer.playerState = "playing"
            Yup('#playPauseIcon').addClass("pauseIcon");
            Yup('#playPauseIcon').removeClass("playIcon");
            if (!!presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0 && presentPagedetails.isCaptionsEnable == true) {
                Yup('.captions_data').css('display', 'block');
                // Yup("#closed_caption").attr("src", "images/cc-on.png")
                var selectedLanguage = localStorage.getItem("selectedLanguage");
                var comingFromLocalSubtitle = false
                ShakaPlayer.setTitles(selectedLanguage, comingFromLocalSubtitle);
            }
        })
        video.addEventListener('pause', function (e) {
            ShakaPlayer.playerState = "paused"
        })
        video.addEventListener('loadeddata', function (e) {
            var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
            var cc;
            cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    _shaka.setTextTrackVisibility(true);
                    // Check if a style element with a specific ID exists
                    // var existingStyle = document.getElementById('subtitle-style');
                    // // If it exists, remove it
                    // if (existingStyle) {
                    //     existingStyle.remove();
                    // }
                    // var subtitleStyle = document.createElement('style');
                    // subtitleStyle.type = 'text/css';
                    // subtitleStyle.id = 'subtitle-style';
                    // subtitleStyle.innerHTML = `video::-webkit-media-text-track-container {bottom: 160px !important; position: absolute; background-color:none;}`;
                    // document.head.appendChild(subtitleStyle);
                    var existingStyle = document.getElementById('subtitle-style');
                    if (existingStyle) {
                        existingStyle.remove();
                    }

                    var subtitleStyle = document.createElement('style');
                    subtitleStyle.type = 'text/css';
                    subtitleStyle.id = 'subtitle-style';

                    subtitleStyle.textContent =
                        'video::-webkit-media-text-track-container{' +
                        'bottom:160px !important;' +
                        'position:absolute!important;' +
                        'background:none!important;' +
                        '}' +
                        'video::-webkit-media-text-track-background{' +
                        'background:none!important;' +
                        '}' +
                        'video::cue{' +
                        'background:transparent!important;' +
                        'font-family:Gotham-bold;' +
                        'text-shadow:0 0 5px rgba(0,0,0,0.9);' +
                        '}';

                    document.head.appendChild(subtitleStyle);


                    if (keyHandlar.isHD) {
                        updateSubtitlePosition("120px");

                    }
                    else {
                        updateSubtitlePosition('180px');

                    }
                }
                else if (window.webOS) {
                    _shaka.setTextTrackVisibility(true);
                    // Check if a style element with a specific ID exists
                    // var existingStyle = document.getElementById('subtitle-style');
                    // // If it exists, remove it
                    // if (existingStyle) {
                    //     existingStyle.remove();
                    // }
                    // var subtitleStyle = document.createElement('style');
                    // subtitleStyle.type = 'text/css';
                    // subtitleStyle.id = 'subtitle-style';
                    // subtitleStyle.innerHTML = `video::-webkit-media-text-track-container {bottom: 160px !important; position: absolute; background-color:none;}`;
                    // document.head.appendChild(subtitleStyle);
                    if (Yup(window).width() == 1280) {
                        if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                            updateSubtitlePosition('533px');
                        }
                    }
                    else {
                        if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                            updateSubtitlePosition('800px');
                        }
                    }
                }
            }
            Main.HideLoading();
            ShakaPlayer.addIcons()
            ShakaPlayer.settingPreviousAudio()
            ShakaPlayer.replacingIcons()
            ShakaPlayer.settingsBasedQuality()
        })
        video.addEventListener('playing', function (e) {
            // window.addEventListener('offline', function (e) {
            //     checknetworkType = false;

            // });
            if (seekRecoveryTimer) {
                clearTimeout(seekRecoveryTimer);
                seekRecoveryTimer = null;
            }
            startTimer();
            if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                if (!!ShakaPlayer.intialPlaying && presentPagedetails.isResume != undefined) {

                    ShakaPlayer.setDuration();
                    ShakaPlayer.seekEndTime()
                    if (!!presentPagedetails.steamResponse.sessionInfo && presentPagedetails.steamResponse.sessionInfo.streamPollKey && presentPagedetails.steamResponse.sessionInfo.streamPollKey != undefined && presentPagedetails.steamResponse.sessionInfo.streamPollKey != null) {
                        ShakaPlayer.hitPoll();
                    }
                    ShakaPlayer.intialPlaying = false;
                    if (presentPagedetails.isResume == true && presentPagedetails.attributes.playerType != "trailer") {
                        ShakaPlayer.update_seekbar_run_width(presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000);
                        video.currentTime = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
                        if (video.paused == true) {
                            video.play();
                        }
                        previousSeekposition = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
                        ShakaPlayer.seekStartTime();
                        analytics.plugin.handleSeek({
                            STPosition: 0,
                            ETPosition:
                                presentPagedetails.steamResponse.streamStatus
                                    .seekPositionInMillis / 1000
                        });
                        ShakaPlayer.update_seekbar_run_width()
                        ShakaPlayer.resumeTimeUpdated = true;
                        presentPagedetails.isResume = false;
                    }
                }
                // if (!!presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0 && presentPagedetails.isCaptionsEnable == true) {
                //     Yup('.captions_data').css('display', 'block');
                //     Yup("#closed_caption").attr("src", "images/cc-on.png")
                //     ShakaPlayer.setTitles();
                // }
            }
            Main.playerHideLoading();
            Main.HideLoading();
            analytics.plugin.handlePlayStarted();
            if (presentPagedetails.attributes.networkName == "Distro" && distroPlayingMacro == false) {
                distroPlayingMacro = true
                Main.distroContentPlaying(stream_url);
            }

        })
        video.addEventListener('durationchange', function (e) {
            //The duration attribute has been updated.
        })
        video.addEventListener('timeupdate', function (e) {
            ShakaPlayer.curretTime = e.target.currentTime;
            if (ShakaPlayer.isseeking == false) {
                ShakaPlayer.updateUIElements(e);
            }
            if (!!e.target && !!e.target.currentTime) {
                ShakaPlayer.currentTime = e.target.currentTime
            }
            if (ShakaPlayer.playerState == 'playing') {
                Main.playerHideLoading();

            }
            Main.HideLoading();
            // Main.playerHideLoading();
            // ShakaPlayer.livePositon = e.target.duration;
            // ShakaPlayer.update_seekbar_run_width(e.target.currentTime)

        })
        video.addEventListener('seeked', function (e) {
        })

        video.addEventListener("ended", function (event) {
            Main.playerHideLoading();
            analytics.plugin.handlePlayCompleted()
            distroPlayingMacro = false
            skipIntroOnn = false;
            clickedSkipIntro = false
            Main.myRecoApi(myReco);
            try {
                var video = document.getElementById('video');
                if (video) {
                    video.pause();
                    video.removeAttribute('src');
                    video.load();
                }
            } catch (e) { }
            ShakaPlayer.kill();
            // Check if a style element with a specific ID exists
            var existingStyle = document.getElementById('subtitle-style');
            // If it exists, remove it
            if (existingStyle) {
                existingStyle.remove();
            }
            if (presentPagedetails.nextVideoDetails && presentPagedetails.nextVideoDetails.length > 0) {
                var myobj = document.getElementById("nextVideo_bottom_id");
                if (!!myobj) {
                    myobj.remove();
                }
                var watchCreditsElement = document.getElementById("watch_credits_bottom_id")
                if (watchCreditsElement) watchCreditsElement.remove();
                var comingFromPlayerSections = false;
                Main.getNextVideo(presentPagedetails.targetPath, comingFromPlayerSections)
                resetNextPreviewState();
            }
            else {
                Main.previousPage();
            }
        });

        video.addEventListener("stalled", function () {
            if (!adsManager.isAdPlaying) {
                Main.playerShowLoading();
            }
            console.log("Playback stalled attempting safe recovery");

            try {
                var v = video;
                var ct = v.currentTime || 0;

                // if (presentPagedetails &&
                //     presentPagedetails.steamResponse &&
                //     presentPagedetails.steamResponse.analyticsInfo &&
                //     presentPagedetails.steamResponse.analyticsInfo.contentType !== "live") {

                //     _shaka.retryStreaming();

                //     v.play().catch(function(){});
                // }
                if (presentPagedetails &&
                    presentPagedetails.steamResponse &&
                    presentPagedetails.steamResponse.analyticsInfo &&
                    presentPagedetails.steamResponse.analyticsInfo.contentType == "live" || presentPagedetails.steamResponse.analyticsInfo.contentType == "epg") {
                    var range = _shaka.seekRange();
                    if (range && range.end && range.end - ct > 1) {
                        v.currentTime = Math.max(range.end - 0.5, ct);
                    }
                    _shaka.retryStreaming();
                    v.play().catch(function () { });
                }

            } catch (e) {
                console.error("stall recovery failed", e);
            }

            Main.playerHideLoading();
        });



        video.onerror = function (e) {
            Main.playerHideLoading();
            Main.HideLoading();
            if (!!e.currentTarget) {
                pauseTimer();
                analytics.plugin.handleError({ errorMsg: video.error.message })
                console.log("Error " + video.error.code + "; details: " + video.error.message);
                Main.playerHideLoading();
                Main.HideLoading();
                if (video.error && video.error.code != 4) {
                    Main.popupData = {
                        popuptype: 'Error',
                        message: "Error " + video.error.code + "; details: " + video.error.message,
                        buttonCount: 1,
                        yesText: 'OK',
                        yesTarget: 'GoBack',
                    }
                }
                if (_shaka) {
                    _shaka.destroy();
                }
                if (video.error && video.error.code != 4 && view == "player") {
                    Yup("#popUpFDFS").html(Util.showPopup());
                    Yup("#popup-btn-1").addClass('popupFocus');
                }
            }
        }

        // utilities.refreshContinueWatching();	
        // ShakaPlayer.playStream();
        // playbackRequested(video);
    }
    catch (err) {
        console.log(err);
        analytics.plugin.handleError({ errorMsg: err.toString });
        if (_shaka) {
            _shaka.destroy();
        }
        Main.playerHideLoading();
        Main.HideLoading();
        if (checknetworkType == false) {
            Main.popupData = {
                popuptype: 'netWorkError',
                message: "Please check your internet connection",
                buttonCount: 1,
                yesText: 'Okay',
                yesTarget: 'retrynet',
                onBack: 'close'
            }
            Yup("#popUpFDFS").html(Util.showPopup());
            Yup("#popup-btn-1").addClass('popupFocus');
        }
        else {
            Main.popupData = {
                popuptype: 'Error',
                message: 'Something went wrong',
                buttonCount: 1,
                yesText: 'OK',
                yesTarget: 'GoBack',
            }
        }
        Yup("#popUpFDFS").html(Util.showPopup());
        Yup("#popup-btn-1").addClass('popupFocus');
    }
}
ShakaPlayer.replacingIcons = function () {
    var sr = presentPagedetails && presentPagedetails.steamResponse;
    var streams = sr && sr.streams && sr.streams[0];
    var ccList = streams && streams.closeCaptions && streams.closeCaptions.ccList;
    var audioTracks = presentPagedetails && presentPagedetails.AudioTracks;

    var isNotLive = sr && sr.analyticsInfo && sr.analyticsInfo.contentType !== 'live';
    var isNotEPG = sr && sr.pageAttributes && sr.pageAttributes.contentType !== 'epg';

    var hasValidCC = ccList && ccList.length > 0 && ccList[0] && ccList[0].filePath !== '';

    var hasValidAudio = audioTracks && typeof audioTracks === 'object' &&
        Object.keys(audioTracks).length > 1 &&
        Object.keys(audioTracks)[0] !== 'und';

    if (isNotLive && isNotEPG && (hasValidCC || hasValidAudio)) {
        if (Yup("#btn-1").css("display") !== 'block') {
            var controlContainer = document.getElementById('top-left-icon');
            if (controlContainer) {
                var subtitlesControl = document.createElement('div');
                subtitlesControl.className = 'control_items';
                subtitlesControl.setAttribute('source', 'icon');
                subtitlesControl.setAttribute('type', 'subtitles');
                subtitlesControl.setAttribute('id', 'btn-1');
                subtitlesControl.innerHTML = `
                     <img src="images/subtitles_default.png" id="Subtitlesbtn" source="subtitlesbtn" class="default">
                     <img src="images/subtitles_focused.png" id="Subtitlesbtn" source="subtitlesbtn" class="focused">
                     <div class="icon_name focused">Audio/<br>Subtitles</div>
                 `;
                controlContainer.insertBefore(subtitlesControl, controlContainer.children[1]); // Insert after the second child
            } else {
                console.error('Container element not found.');
            }
        }
    }
    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live" && presentPagedetails.attributes.contentType != 'movie' && presentPagedetails.nextVideoDetails.length > 0 && (presentPagedetails.attributes.showNextButton == "true" || nextVidDetails == true)) {
        if (Yup("#btn-3").css("display") !== 'block') {
            var controlContainer = document.getElementById('top-left-icon');
            if (controlContainer) {
                var subtitlesControl = document.createElement('div');
                subtitlesControl.className = 'control_items';
                subtitlesControl.setAttribute('source', 'icon');
                subtitlesControl.setAttribute('type', 'nextbtn');
                subtitlesControl.setAttribute('id', 'btn-3');
                subtitlesControl.innerHTML = `
                 <img src="images/next_default.png" id="playstartbtn" source="playstartbtn"class="default">
                 <img src="images/next_focused.png" id="playstartbtn" source="playstartbtn" class="focused">
                 <div class="icon_name focused">Next&nbspEpisode</div>
                 `;
                if (Yup("#btn-1").css("display") !== 'block') {
                    controlContainer.insertBefore(subtitlesControl, controlContainer.children[2]); // Insert after the second child
                }
                else {
                    controlContainer.insertBefore(subtitlesControl, controlContainer.children[3]); // Insert after the second child
                }
            } else {
                console.error('Container element not found.');
            }
        }
    }

}
function selectNearestQuality(player, presentPagedetails, bitrateLocal) {
    if (!player || !presentPagedetails) {
        console.warn('Missing player or presentPagedetails');
        return;
    }

    if (bitrateLocal === 'auto' || Number(bitrateLocal) === 0) {
        // enable ABR (auto)
        try {
            player.configure({ abr: { enabled: true } });
            presentPagedetails.abr_disabled = false;
            console.log('ABR enabled (auto quality)');
        } catch (e) {
            console.warn('Error enabling ABR:', e);
        }
        // analytics (keep same behavior as your sample)
        analytics.plugin.setBitRate({ bitRate: bitrateLocal });
        analytics.plugin.handleBitRateChange({ bitRate: bitrateLocal });
        return;
    }

    var requestedHeight = Number(bitrateLocal);
    if (isNaN(requestedHeight)) {
        console.warn('bitrateLocal is not a number:', bitrateLocal);
        return;
    }

    // get variant tracks from player
    var variants = [];
    try {
        variants = (typeof player.getVariantTracks === 'function') ? player.getVariantTracks() : [];
    } catch (e) {
        variants = [];
    }

    if (!variants || variants.length === 0) {
        console.warn('No variant tracks available on player');
        return;
    }

    var activeVariant = null;
    for (var i = 0; i < variants.length; i++) {
        if (variants[i] && variants[i].active) {
            activeVariant = variants[i];
            break;
        }
    }

    var candidates = variants;
    if (activeVariant && activeVariant.language) {
        var tmp = [];
        for (i = 0; i < variants.length; i++) {
            if (!variants[i]) continue;
            if (variants[i].language === activeVariant.language ||
                (variants[i].audio && variants[i].audio.language === activeVariant.language)) {
                tmp.push(variants[i]);
            }
        }
        if (tmp.length > 0) candidates = tmp;
    }

    var exact = null;
    for (i = 0; i < candidates.length; i++) {
        var h = candidates[i].height || 0;
        if (Number(h) === requestedHeight) {
            exact = candidates[i];
            break;
        }
    }

    var pick = null;
    if (exact) {
        pick = exact;
    } else {
        var best = null;
        for (i = 0; i < candidates.length; i++) {
            var c = candidates[i];
            if (!c) continue;
            var ch = Number(c.height || 0);
            var cbw = Number(c.bandwidth || c.bitrate || 0);
            var diff = Math.abs(ch - requestedHeight);

            if (best === null) {
                best = { track: c, diff: diff, bw: cbw, height: ch };
            } else {
                if (diff < best.diff) {
                    best = { track: c, diff: diff, bw: cbw, height: ch };
                } else if (diff === best.diff) {
                    if (cbw > best.bw) {
                        best = { track: c, diff: diff, bw: cbw, height: ch };
                    } else if (cbw === best.bw) {
                        var bestLE = (best.height <= requestedHeight);
                        var candLE = (ch <= requestedHeight);
                        if (!bestLE && candLE) {
                            best = { track: c, diff: diff, bw: cbw, height: ch };
                        }
                    }
                }
            }
        }
        if (best) pick = best.track;
    }

    if (!pick) {
        console.warn('Could not pick any variant for requested height:', requestedHeight);
        return;
    }

    try {
        player.configure({ abr: { enabled: false } });
        presentPagedetails.abr_disabled = true;
    } catch (e) {
        console.warn('Error disabling ABR:', e);
    }

    var toSelect = pick;

    try {
        player.selectVariantTrack(toSelect, true);
    } catch (err) {
        try {
            player.selectVariantTrack(toSelect, true, 0);
        } catch (err2) {
            try {
                player.selectVariantTrack(toSelect, false);
            } catch (err3) {
                console.error('selectVariantTrack all attempts failed:', err, err2, err3);
            }
        }
    }

    try {
        var activeList = player.getVariantTracks();
        var active = null;
        for (var a = 0; a < activeList.length; a++) {
            if (activeList[a] && activeList[a].active) {
                active = activeList[a];
                break;
            }
        }
        console.log('Selected quality (requestedHeight):', {
            requested: requestedHeight,
            chosenHeight: (pick.height || 'unknown'),
            chosenBandwidth: (pick.bandwidth || pick.bitrate || 'unknown'),
            active: active ? (active.width + 'x' + active.height + ' / bw:' + active.bandwidth) : 'unknown'
        });
    } catch (e) {
        // ignore
    }

    // send analytics exactly as you used before
    analytics.plugin.setBitRate({ bitRate: bitrateLocal });
    analytics.plugin.handleBitRateChange({ bitRate: bitrateLocal });
}
ShakaPlayer.settingsBasedQuality = function () {
    var minBitrateSelected = utilities.getFromLocalStorage('MinQualitySelected');
    var maxBitrateSelected = utilities.getFromLocalStorage('MaxQualitySelected');
    var bitrateLocal = localStorage.getItem("selectedRadio");

    function enableAuto() {
        try { _shaka.configure({ abr: { enabled: true } }); } catch (e) { console.warn('enableAuto configure failed', e); }
        presentPagedetails.abr_disabled = false;
        localStorage.setItem("selectedRadio", "auto");
    }

    if (!isNaN(minBitrateSelected) && !isNaN(maxBitrateSelected)) {
        var minH = Number(minBitrateSelected);
        var maxH = Number(maxBitrateSelected);
        var trackKeys = Object.keys(presentPagedetails.QulailtyTracks || {});
        var maxTrackHeight = -1;

        for (var i = 0; i < trackKeys.length; i++) {
            var key = trackKeys[i];
            var track = presentPagedetails.QulailtyTracks[key];
            if (!track) continue;
            if (track.height !== undefined && !isNaN(track.height)) {
                var th = Number(track.height);
                if (th >= minH && th <= maxH) {
                    maxTrackHeight = Math.max(maxTrackHeight, th);
                }
            }
        }

        if (maxTrackHeight !== -1) {
            // Use selectNearestQuality so audio is preserved and selection uses actual variant objects.
            // selectNearestQuality will disable ABR and fire analytics.
            selectNearestQuality(_shaka, presentPagedetails, String(maxTrackHeight));
            // store selection
            localStorage.setItem("selectedRadio", String(maxTrackHeight));
        } else {
            // nothing in range -> fallback to auto
            enableAuto();
        }
        return;
    }

    // If an explicit selectedRadio exists, apply it (either auto or a height)
    // if (!!bitrateLocal && bitrateLocal !== "auto") {
    //     if (Number(bitrateLocal) === 0) {
    //         enableAuto();
    //     } else {
    //         // selectNearestQuality will handle ABR toggle and analytics
    //         selectNearestQuality(_shaka, presentPagedetails, bitrateLocal);
    //         // ensure storage is set (selectNearestQuality doesn't modify storage)
    //         localStorage.setItem("selectedRadio", String(bitrateLocal));
    //     }
    //     return;
    // }

    // default fallback -> enable ABR
    enableAuto();
};


// ShakaPlayer.settingsBasedQuality = function () {
//     var minBitrateSelected = utilities.getFromLocalStorage('MinQualitySelected');
//     var maxBitrateSelected = utilities.getFromLocalStorage('MaxQualitySelected');
//     var bitrateLocal = localStorage.getItem("selectedRadio");

//     // Helper: enable ABR (auto)
//     function enableAuto() {
//       try { _shaka.configure({ abr: { enabled: true } }); } catch (e) { console.warn('enableAuto configure failed', e); }
//       if (presentPagedetails) presentPagedetails.abr_disabled = false;
//       try { localStorage.setItem("selectedRadio", "auto"); } catch (e) {}
//       Main.playerHideLoading && Main.playerHideLoading();
//     }

//     // If min/max range is present, try to pick the maximum height in range,
//     // otherwise pick the nearest track to the range boundaries.
//     if (!isNaN(minBitrateSelected) && !isNaN(maxBitrateSelected)) {
//       var minH = Number(minBitrateSelected);
//       var maxH = Number(maxBitrateSelected);
//       var trackKeys = Object.keys(presentPagedetails.QulailtyTracks || {});
//       var foundHeights = [];
//       var maxTrackHeight = -1;

//       // collect numeric heights
//       for (var i = 0; i < trackKeys.length; i++) {
//         var key = trackKeys[i];
//         var track = presentPagedetails.QulailtyTracks[key];
//         if (!track) continue;
//         if (track.height !== undefined && !isNaN(track.height)) {
//           var th = Number(track.height);
//           // if in range, keep for max selection
//           if (th >= minH && th <= maxH) {
//             maxTrackHeight = Math.max(maxTrackHeight, th);
//           }
//           // always collect for fallback nearest calculation
//           foundHeights.push(th);
//         }
//       }

//       if (maxTrackHeight !== -1) {
//         // we have a track in range, select the highest in range
//         selectNearestQuality(_shaka, presentPagedetails, String(maxTrackHeight));
//         try { localStorage.setItem("selectedRadio", String(maxTrackHeight)); } catch (e) {}
//         return;
//       }

//       // nothing matched inside the range => pick nearest available track to the range
//       if (foundHeights.length) {
//         // compute distance to range for each track: distance = 0 if inside, else distance to nearest boundary
//         var bestHeight = null;
//         var bestDist = Number.POSITIVE_INFINITY;
//         for (var j = 0; j < foundHeights.length; j++) {
//           var h = foundHeights[j];
//           var dist = 0;
//           if (h < minH) dist = minH - h;
//           else if (h > maxH) dist = h - maxH;
//           else dist = 0; // should not happen because we checked above
//           // prefer smaller distance; if equal prefer the higher resolution (choose larger h)
//           if (dist < bestDist || (dist === bestDist && h > bestHeight)) {
//             bestDist = dist;
//             bestHeight = h;
//           }
//         }

//         if (bestHeight !== null) {
//           console.log('No track inside [' + minH + ',' + maxH + '], selecting nearest height:', bestHeight);
//           selectNearestQuality(_shaka, presentPagedetails, String(bestHeight));
//           try { localStorage.setItem("selectedRadio", String(bestHeight)); } catch (e) {}
//           return;
//         }
//       }

//       // nothing to pick -> fallback to auto
//       enableAuto();
//       return;
//     }

//     // If an explicit selectedRadio exists, apply it
//     if (!!bitrateLocal && bitrateLocal !== "auto") {
//       // if user picked auto via UI (0), enable ABR
//       if (Number(bitrateLocal) === 0) {
//         enableAuto();
//         return;
//       }
//       // otherwise select nearest available quality (selectNearestQuality handles ABR disable)
//       selectNearestQuality(_shaka, presentPagedetails, bitrateLocal);
//       try { localStorage.setItem("selectedRadio", String(bitrateLocal)); } catch (e) {}
//       return;
//     }

//     // default fallback -> enable ABR
//     enableAuto();
//   };


ShakaPlayer.settingPreviousAudio = function () {
    if (presentPagedetails.QulailtyTracks == undefined) {
        ShakaPlayer.setQualityLevels(_shaka.getVariantTracks())
    }
    ShakaPlayer.setAudioTracks(_shaka.getAudioLanguagesAndRoles())
    var audioVal = localStorage.getItem("selectedAudio");
    if (audioVal != undefined && audioVal != null && audioVal != '') {
        var AudiossTracks = Object.values(presentPagedetails.AudioTracks);
        for (var i = 0; i < AudiossTracks.length; i++) {
            var audioinitialTrack = AudiossTracks[i];
            if (audioVal == audioinitialTrack.label) {
                ShakaPlayer.SelectAudioTrack(audioVal)
            }
        }
    }
}
ShakaPlayer.playStream = function () {
    ShakaPlayer.stopInterval();
    var video = document.getElementById('video');
    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
        if (itisStartover == true) {
            video.currentTime = 0;
            itisStartover = false;
        }
        else if (!!ShakaPlayer.intialPlaying && (presentPagedetails.navigationFrom != "player" && presentPagedetails.comingFromPlayerSections != true) && presentPagedetails.steamResponse.streamStatus.seekPositionInMillis != 0) {
            video.currentTime = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
        }
        else if (!!ShakaPlayer.intialPlaying && (presentPagedetails.navigationFrom == "player" && presentPagedetails.comingFromPlayerSections == true) && presentPagedetails.steamResponse.streamStatus.seekPositionInMillis != 0) {
            video.currentTime = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
        }
    }
    ShakaPlayer.play();
    if (presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo != undefined && presentPagedetails.steamResponse.analyticsInfo != null) {
        var custom_data = JSON.parse(presentPagedetails.steamResponse.analyticsInfo.customData)
    }
    analytics.setMetaData(custom_data);
    analytics.plugin.thumbnailVideoClick();
    analytics.plugin.handlePlayerLoad();
    ShakaPlayer.clearControls();
}


function getPlayerPosition() {
    var pp = ShakaPlayer.currentTime * 1000;
    var ps = (typeof (ShakaPlayer.playerState) != "undefined") ? ShakaPlayer.playerState.toLowerCase() : "";
    return pp + "," + ps;
}
function getTotalVideoLength() {
    if (view == "player") {
        return presentPagedetails.steamResponse.streamStatus.totalDurationInMillis;
    }
    else if (!!livePreview) {
        var liveVideo = document.querySelector('video');
        return liveVideo.duration;
    }
}

// For //analytics getting player current position
ShakaPlayer.getPlayerPosition = function () {
    return ShakaPlayer.currentTime * 1000;
}


function resetNextPreviewState() {
    nextVideoPreview = false;
    nextVideoPreviewDismissed = false;
    nextVideoPreviewStartTime = null;
    if (ShakaPlayer && ShakaPlayer._isNextPreviewAnimating) {
        ShakaPlayer._isNextPreviewAnimating = false;
    }
}

function shouldShowNextPreview(time, targetTime) {
    if (typeof time !== "number" || isNaN(time)) return false;

    if (typeof targetTime !== "number" || isNaN(targetTime)) {
        // try to ensure duration so percent-based targets can be computed later
        ensureDurationAndRecheckPreview();
        return false;
    }

    // if (nextVideoPreviewStartTime === null) {
    //     nextVideoPreviewStartTime = targetTime;
    // }
    nextVideoPreviewStartTime = targetTime
    if (nextVideoPreviewStartTime !== null && time < (nextVideoPreviewStartTime - 1)) {
        nextVideoPreviewDismissed = false;
        nextVideoPreview = false;
    }

    return (
        time >= targetTime &&
        nextVideoPreview === false &&
        nextVideoPreviewDismissed === false &&
        presentPagedetails &&
        presentPagedetails.nextVideoDetails &&
        presentPagedetails.nextVideoDetails.length !== 0
    );
}

function parseIgnoreContentTypes(cfgValue) {
    if (!cfgValue || typeof cfgValue !== "string") return [];

    return cfgValue
        .split(",")
        .map(function (v) { return v.trim().toLowerCase(); })
        .filter(function (v) { return v.length > 0; });
}
function isNextEpisodeAllowed(pageAttrs, ignoreTypesArr) {
    if (!pageAttrs || !pageAttrs.contentType) return true;

    var type = String(pageAttrs.contentType).toLowerCase();
    return ignoreTypesArr.indexOf(type) === -1;
}


ShakaPlayer.update_seekbar_run_width = function (time) {
    var currentTime = (typeof time === "number" && !isNaN(time)) ? time : getCurrentPlayerTimeSec();
    ShakaPlayer.showSeekingInfo(ShakaPlayer.secondsTowidth(currentTime));
    Yup("#seek-picker-runtime").hide();
    var raw = systemConfigs && systemConfigs.configs && systemConfigs.configs.nextVideoDisplayConfig;
    var enableNextFromConfig =
        String(raw).toLowerCase() === "true";
    var streamResp = (presentPagedetails && (presentPagedetails.streamResponse || presentPagedetails.steamResponse)) || {};
    var streamStatus = streamResp.streamStatus || {};
    var analyticsInfo = streamResp.analyticsInfo || {};
    var pageAttrs = streamResp.pageAttributes || {};
    var isLive = analyticsInfo.contentType === "live";
    var ignoreTypesStr =
        systemConfigs &&
        systemConfigs.configs &&
        systemConfigs.configs.ignoreNextEpisodeContentTypes;
    var cfg = (systemConfigs && systemConfigs.configs) ? systemConfigs.configs : {};
    var ignoreNextEpisodeTypes = parseIgnoreContentTypes(ignoreTypesStr);

    var allowNextEpisode = isNextEpisodeAllowed(pageAttrs, ignoreNextEpisodeTypes);

    var hasNextVideo = presentPagedetails && Array.isArray(presentPagedetails.nextVideoDetails) && presentPagedetails.nextVideoDetails.length > 0;
    // console.log("NextEpisode decision:", {
    //     contentType: pageAttrs.contentType,
    //     ignoreList: ignoreNextEpisodeTypes,
    //     allowNextEpisode: allowNextEpisode
    // });

    if (hasNextVideo && allowNextEpisode) {
        var handledPreview = false;

        if (streamStatus.watchCreditsDetails && streamStatus.watchCreditsDetails.watchCreditsStartTimeInMillis) {
            var wcStartMs = Number(streamStatus.watchCreditsDetails.watchCreditsStartTimeInMillis);
            if (!isNaN(wcStartMs)) {
                var wcStartSec = wcStartMs / 1000;
                if (allowNextEpisode && shouldShowNextPreview(currentTime, wcStartSec)) {
                    nextVideoPreview = true;
                    console.log("Trigger: watchCreditsStartSec =", wcStartSec);
                    if (pageAttrs.contentType === "movie" && allowNextEpisode) {
                        ShakaPlayer.nextEpisode("Up Next");
                    } else if (allowNextEpisode) {
                        ShakaPlayer.nextEpisode("Next Episode");
                    }
                    handledPreview = true;
                }
            }
        }
        else if (pageAttrs && pageAttrs.creditsStartTime) {
            var wcStartMs = Number(pageAttrs.creditsStartTime);
            if (!isNaN(wcStartMs)) {
                var wcStartSec = wcStartMs;
                if (allowNextEpisode && shouldShowNextPreview(currentTime, wcStartSec)) {
                    nextVideoPreview = true;
                    console.log("Trigger: watchCreditsStartSec =", wcStartSec);
                    if (pageAttrs.contentType === "movie" && allowNextEpisode) {
                        ShakaPlayer.nextEpisode("Up Next");
                    } else if (allowNextEpisode) {
                        ShakaPlayer.nextEpisode("Next Episode");
                    }
                    handledPreview = true;
                }
            }
        }
        else if (!handledPreview && cfg.nextVideoDisplayType && ShakaPlayer.duration) {
            var durationSec = Number(ShakaPlayer.duration) || 0;
            var targetTime = null;

            if (cfg.nextVideoDisplayType === "P") {
                var percent = Number(cfg.nextVideoDisplayPercentage);
                if (!isNaN(percent) && percent > 0 && durationSec > 0) {
                    targetTime = durationSec * percent / 100;
                }
            } else if (cfg.nextVideoDisplayType === "S") {
                var secondsRemaining = Number(cfg.nextVideoDisplaySeconds);
                if (!isNaN(secondsRemaining) && secondsRemaining > 0 && durationSec > 0) {
                    targetTime = durationSec - secondsRemaining;
                }
            }

            if (allowNextEpisode && enableNextFromConfig && shouldShowNextPreview(currentTime, targetTime)) {
                nextVideoPreview = true;
                console.log("Trigger: config nextVideoDisplayType:", cfg.nextVideoDisplayType, "targetTime:", targetTime);
                if (pageAttrs.contentType === "movie" && allowNextEpisode) {
                    ShakaPlayer.nextEpisode("Up Next");
                } else if (allowNextEpisode) {
                    ShakaPlayer.nextEpisode("Next Episode");
                }
            }
        }
    }

    var skipIntroDetails = streamStatus.skipIntroDetails;
    if (skipIntroDetails && (skipIntroDetails.skipIntroStartTimeInMillis || skipIntroDetails.skipIntroEndTimeInMillis)) {
        var startMs = Number(skipIntroDetails.skipIntroStartTimeInMillis) || 0;
        var endMs = Number(skipIntroDetails.skipIntroEndTimeInMillis) || 0;
        var curMs = currentTime * 1000;
        var inSkipWindow = curMs >= startMs && curMs <= endMs;

        if (inSkipWindow && skipIntroOnn === false && clickedSkipIntro === false && ShakaPlayer.playerState == "playing") {
            skipIntroOnn = true;
            skipIntroOff = false;
            Yup("#skipintro").show();

            if (Yup("#video_quality").css("display") !== "block" &&
                Yup("#subtitles_main").css("display") !== "block" &&
                Yup(".playSugestions").css("display") !== "block" &&
                presentPagedetails.constrolsShow === false) {

                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#skipintro").addClass("imageFocus");
            }

            if (Yup(".playSugestions").css("display") === "block") {
                if (Yup(window).width() === 1280) {
                    Yup("#skipintro").css("bottom", "280px");
                } else {
                    Yup("#skipintro").css("bottom", "420px");
                }
            }
        } else if (!inSkipWindow && skipIntroOff === false) {
            Yup("#skipintro").hide();
            if (Yup("#video_quality").css("display") !== "block" &&
                Yup("#subtitles_main").css("display") !== "block" &&
                Yup(".playSugestions").css("display") !== "block") {

                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#playerBtn").addClass("imageFocus");
            }
            skipIntroOff = true;
            skipIntroOnn = false;
        }
    }
};




ShakaPlayer._isNextPreviewAnimating = false;

ShakaPlayer.nextEpisode = function (nextText) {
    nextVideoPreview = true;
    var streamResp = (presentPagedetails && (presentPagedetails.streamResponse || presentPagedetails.steamResponse)) || {};
    var pageAttrs = streamResp.pageAttributes || {};

    // if (typeof systemConfigs !== 'undefined' && systemConfigs.configs) {
    //     // attempt to set start time (if config provided)
    //     var cfg = systemConfigs.configs;
    //     var dur = Number(ShakaPlayer.duration) || 0;
    //     if (cfg && cfg.nextVideoDisplayType === "P" && dur > 0) {
    //         nextVideoPreviewStartTime = (dur * Number(cfg.nextVideoDisplayPercentage) / 100);
    //     }
    //     // if a seconds config exists and we didn't have duration available earlier, it's ok —
    //     // shouldShowNextPreview will set startTime when it first finds a valid numeric targetTime.
    // }
    ShakaPlayer._isNextPreviewAnimating = true;

    Yup("#watch_credits-preview").show();
    Yup("#next-preview").show();
    Yup("#watch_credits-preview").html(Util.watchCredits());
    Yup("#next-preview").html(Util.nextVideoPlay(nextText));
    ShakaPlayer.hidePlayerDetails();
    Yup(".playSugestions").hide();
    Yup(".downArrow").hide();
    Yup(".imageFocus").removeClass("imageFocus");
    Yup("#next-preview").addClass("imageFocus");

    if (Yup('#video_quality').css('display') == 'block') {
        Yup("#video_quality").css('display', 'none');
        Yup("#player_setting.default").css("display", "");
        Yup("#player_setting.focused").css("display", "");
    }
    if (Yup('#subtitles_main').css('display') == 'block') {
        Yup("#subtitles_main").hide();
        Yup("#Subtitlesbtn.default").css("display", "");
        Yup("#Subtitlesbtn.focused").css("display", "");
    }
    if (pageAttrs && pageAttrs.creditsDuration) {
        var animationDuration = Number(pageAttrs.creditsDuration) ? Number(pageAttrs.creditsDuration) : 5;
    }
    else {
        var rawDuration = (systemConfigs && systemConfigs.configs && systemConfigs.configs.nextContentButtonAnimation) ? Number(systemConfigs.configs.nextContentButtonAnimation) : 20;
        var animationDuration = (isNaN(rawDuration) || rawDuration <= 0) ? 20 : rawDuration;
    }


    var loader = Yup("#next-preview .layer2");

    var onTransitionEnd = function () {
        try { loader.off("transitionend", onTransitionEnd); } catch (e) { }
        ShakaPlayer._isNextPreviewAnimating = false;

        var videoPlayact = {
            'content id': presentPagedetails && presentPagedetails.attributes ? presentPagedetails.attributes.id || "" : "",
            'content name': presentPagedetails && presentPagedetails.attributes ? presentPagedetails.attributes.contentEpisode || "" : "",
            'content type': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.payType === "P" ? "paid" : "free",
            'content model': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.payType === "P" ? "svod"
                : (presentPagedetails && presentPagedetails.attributes && ["F", "L"].indexOf(presentPagedetails.attributes.payType) !== -1 ? "avod" : ""),
            'content partner name': presentPagedetails && presentPagedetails.attributes ? presentPagedetails.attributes.networkName || "" : "",
            'content tag': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.payType === "P" ? "paid" : "free"
        };

        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact);
        Main.playerShowLoading();
        ShakaPlayer.playerState = 'buffering';
        distroPlayingMacro = false;
        skipIntroOnn = false;
        clickedSkipIntro = false;
        ShakaPlayer.HandleBufferingEvent();

        var nextVideoElement = document.getElementById("nextVideo_bottom_id");
        if (nextVideoElement) nextVideoElement.remove();
        var watchCreditsElement = document.getElementById("watch_credits_bottom_id");
        if (watchCreditsElement) watchCreditsElement.remove();

        try { analytics.plugin.handlePlayEndedByUser(); } catch (e) { }
        ShakaPlayer.stopInterval();
        Main.playerScreenSessionEnd();
        Main.myRecoApi(myReco);
        try {
            var video = document.getElementById('video');
            if (video) {
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        } catch (e) { }
        ShakaPlayer.kill();

        var existingStyle = document.getElementById('subtitle-style');
        if (existingStyle) existingStyle.remove();
        var comingFromPlayerSections = false;
        Main.getNextVideo(presentPagedetails.targetPath, "", comingFromPlayerSections);
        resetNextPreviewState();
    };

    try { loader.off("transitionend", onTransitionEnd); } catch (e) { }
    try { loader.on("transitionend", onTransitionEnd); } catch (e) { }

    loader.css("right", "0%");
    loader.css("transition-duration", animationDuration + "s");
};


ShakaPlayer.clearControls = function () {
    if (controlVisbletoken != undefined) {
        clearTimeout(controlVisbletoken);
        controlVisbletoken = undefined;
    }
    controlVisbletoken = setTimeout(function () {
        ShakaPlayer.hidePlayerDetails();
    }, 5000);
}
ShakaPlayer.clearSuggestionControls = function () {
    if (controlSuggestionControls != undefined) {
        clearTimeout(controlSuggestionControls);
        controlSuggestionControls = undefined;
    }
    controlSuggestionControls = setTimeout(function () {
        Yup(".playSugestions").hide();
        Yup(".downArrow").hide();
        presentPagedetails.suggestionsShow = false
        if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#skipintro").addClass("imageFocus");
            if (keyHandlar.isHD) {
                Yup("#skipintro").css('bottom', '160px')
            }
            else {
                Yup("#skipintro").css('bottom', '240px')
            }
        }
        else if ((Yup("#playerBtn").length > 0)) {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#playerBtn").addClass("imageFocus");
        }
        if (presentPagedetails.isCaptionsEnable == true) {
            var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
            var cc;
            cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
            if (keyHandlar.isHD) {
                Yup(".captions_data").css('bottom', '66px')
                if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                    if (window.tizen) {
                        updateSubtitlePosition('66px');
                    }
                    else if (window.webOS) {
                        updateSubtitlePosition('565px');
                    }
                }
            }
            else {
                Yup(".captions_data").css('bottom', '100px')
                if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                    if (window.tizen) {
                        updateSubtitlePosition('100px');
                    }
                    else if (window.webOS) {
                        updateSubtitlePosition('850px');
                    }

                }
            }
        }
    }, 10000);
}

ShakaPlayer.secondsTowidth = function (secs) {
    if (!ShakaPlayer.duration) return 0;
    return ((secs * 100) / ShakaPlayer.duration);
}

ShakaPlayer.widthToseconds = function (width) {
    if (!ShakaPlayer.duration) return 0;
    return ((width * ShakaPlayer.duration) / 100);
}

ShakaPlayer.getCurrentPosition = function () {
    var current_seek_bar_width;
    if (!!document.getElementById('seekbar-run')) {
        if (!!document.getElementById('seekbar-run').style.width) {
            current_seek_bar_width = Number(document.getElementById('seekbar-run').style.width.split('%')[0])
        }
        else {
            current_seek_bar_width = 0;
        }
    }
    var ans = ShakaPlayer.widthToseconds(current_seek_bar_width);
    return ans;
}

ShakaPlayer.setDuration = function () {
    var seek_range = _shaka.seekRange();
    ShakaPlayer.duration = seek_range.end;
    return ShakaPlayer.duration
}

ShakaPlayer.seekStartTime = function () {
    document.getElementById('seek-picker-start').innerHTML = utilities.getTimeHMS(ShakaPlayer.getCurrentPosition() * 1000);
}

ShakaPlayer.seekEndTime = function () {
    document.getElementById('seek-picker-end').innerHTML = utilities.getTimeHMS(ShakaPlayer.duration * 1000);
}

ShakaPlayer.killWrapper = function (shaka_instance) {
    return function () {
        try {
            if (seekToken) {
                clearTimeout(seekToken);
                seekToken = undefined;
            }

            if (shaka_instance && shaka_instance.destroy) {
                shaka_instance.destroy().then(function () {
                    console.log("Shaka destroyed cleanly");
                });
            }
        } catch (e) { }

        ShakaPlayer.reset_player_dependices();
    };
};

function srtToVtt(srt) {
    return "WEBVTT\n\n" + srt
        .replace(/\r+/g, "")
        .replace(/^\d+\n/gm, "")
        .replace(/,/g, ".");
}
ShakaPlayer.setTitles = function (clickedLang, comingFromLocalSubtitle) {
    var streams = (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.streams) || [];
    if (!streams.length ||
        !streams[0] ||
        !streams[0].closeCaptions ||
        !streams[0].closeCaptions.ccList ||
        !streams[0].closeCaptions.ccList.length) {
        return;
    }


    var ccList = streams[0].closeCaptions.ccList;
    var selectedPath = null;
    var fallbackEnglishPath = null;

    var normalizedClickedLang = clickedLang ? clickedLang.toLowerCase() : undefined;
    if (normalizedClickedLang === 'en' || normalizedClickedLang === 'eng') normalizedClickedLang = 'english';
    if (normalizedClickedLang === 'hi') normalizedClickedLang = 'hindi';

    for (var i = 0; i < ccList.length; i++) {
        var ccLang = ccList[i].language ? ccList[i].language.toLowerCase() : undefined;
        if (ccLang === 'eng') ccLang = 'english';
        if (ccLang === 'hi') ccLang = 'hindi';

        if (normalizedClickedLang && ccLang === normalizedClickedLang) {
            selectedPath = Util.getImages(ccList[i].filePath);
            break;
        }

        if (ccLang === 'english' && !fallbackEnglishPath) {
            fallbackEnglishPath = Util.getImages(ccList[i].filePath);
        }
    }

    if (comingFromLocalSubtitle === true) {
        if (!selectedPath) return;
    } else {
        if (!selectedPath && fallbackEnglishPath) {
            selectedPath = fallbackEnglishPath;
        }
    }

    if (!selectedPath) return;

    var isVttSubtitle = /\.vtt$/i.test(selectedPath);
    var subtFinalPath = isVttSubtitle ? selectedPath : selectedPath.replace(/\.srt$/i, '.vtt');

    ShakaPlayer.setSubtitlePath(subtFinalPath, selectedPath);
};


// ShakaPlayer.setSubtitlePath = function(url) {
//     try {
//         if(url == undefined){
//             var track = document.querySelector('track')
//             if (!!track) {
//                 track.remove();
//             }
//             return;
//         }
//         var video = document.querySelector('video');
//         var track = document.querySelector('track')
//         var srctrack = document.createElement('track');
//         srctrack.setAttribute("enabled", true);
//         srctrack.setAttribute("label", "English");
//         srctrack.setAttribute("srclang", "en");
//         srctrack.setAttribute("kind", "captions");
//         srctrack.setAttribute("defaultLang", 'English');
//         srctrack.setAttribute("src", url);
//         if (!!track) {
//             video.replaceChild(srctrack, track);
//         }
//         else {
//             video.appendChild(srctrack);
//         }
//         var p_tag = document.getElementById('captions');
//         if (!video.textTracks) return;
//         var track = video.textTracks[0];
//         track.mode = 'hidden';
//         var subtitletexttoken;
//         track.oncuechange = function (e) {
//             try {
//                 // console.log(e);
//                 var cue = this.activeCues[0];
//                 if (cue) {
//                     if (subtitletexttoken != undefined) {
//                         clearTimeout(subtitletexttoken);
//                         subtitletexttoken = undefined;
//                     }
//                     p_tag.innerHTML = '';
//                     video.activeSubtitleText = cue.text;
//                     video.activeSubtitleTextendduration = cue.endTime * 1000;
//                     p_tag.appendChild(cue.getCueAsHTML());
//                     subtitletexttoken = setTimeout(function () {
//                         if (!!ShakaPlayer.videoElement && ShakaPlayer.videoElement.currentTime >= cue.endTime) {
//                             p_tag.innerHTML = ''
//                         }
//                         else {
//                             subtitletexttoken = undefined
//                         }
//                     }, ((cue.endTime - cue.startTime) * 1000))
//                 }
//                 else {
//                     if (subtitletexttoken == undefined) {
//                         p_tag.innerHTML = ''
//                         ShakaPlayer.activeSubtitleText = ''
//                     }

//                 }
//             } catch (err) {
//                 console.log(err)
//             }
//         };
//     }
//     catch (err) {
//         console.log(err)
//     }
// };

// ShakaPlayer.setSubtitlePath = function (url, originalUrl) {
//     try {
//         if (!url) {
//             var oldTrack = document.querySelector('track');
//             if (oldTrack) oldTrack.remove();
//             return;
//         }

//         var video = document.querySelector('video');
//         if (!video) return;

//         var oldTrack = video.querySelector('track');
//         if (oldTrack) oldTrack.remove();

//         var trackEl = document.createElement('track');
//         trackEl.setAttribute("kind", "captions");
//         trackEl.setAttribute("label", "English");
//         trackEl.setAttribute("srclang", "en");
//         trackEl.setAttribute("default", true);
//         trackEl.setAttribute("src", url);

//         /*  Fallback ONLY if VTT load fails */
//         trackEl.addEventListener('error', function () {
//             if (!originalUrl || !/\.srt$/i.test(originalUrl)) return;

//             var xhr = new XMLHttpRequest();
//             xhr.open('GET', originalUrl, true);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status >= 200 && xhr.status < 300) {
//                         try {
//                             var vttText = srtToVtt(xhr.responseText);
//                             var blob = new Blob([vttText], { type: "text/vtt" });
//                             var blobUrl = URL.createObjectURL(blob);
//                             trackEl.src = blobUrl;
//                         } catch (e) {
//                             console.log("Subtitle convert error:", e);
//                         }
//                     } else {
//                         console.log("SRT request failed:", xhr.status);
//                     }
//                 }
//             };
//             xhr.send(null);
//         });

//         video.appendChild(trackEl);

//         /* Existing cue rendering flow — untouched */
//         var p_tag = document.getElementById('captions');
//         if (!video.textTracks || !video.textTracks.length) return;

//         var textTrack = video.textTracks[0];
//         textTrack.mode = 'hidden';

//         var subtitletexttoken;

//         textTrack.oncuechange = function () {
//             try {
//                 var cue = this.activeCues && this.activeCues[0];
//                 if (cue) {
//                     if (subtitletexttoken) {
//                         clearTimeout(subtitletexttoken);
//                         subtitletexttoken = null;
//                     }

//                     p_tag.innerHTML = '';
//                     p_tag.appendChild(cue.getCueAsHTML());

//                     subtitletexttoken = setTimeout(function () {
//                         p_tag.innerHTML = '';
//                     }, (cue.endTime - cue.startTime) * 1000);
//                 } else {
//                     if (!subtitletexttoken) {
//                         p_tag.innerHTML = '';
//                     }
//                 }
//             } catch (e) {
//                 console.log(e);
//             }
//         };

//     } catch (err) {
//         console.log(err);
//     }
// };

ShakaPlayer.setSubtitlePath = function (url, originalUrl) {
    try {
        if (!url) {
            var oldTrack = document.querySelector('track');
            if (oldTrack) oldTrack.remove();
            return;
        }

        var video = document.querySelector('video');
        if (!video) return;

        var oldTrack = video.querySelector('track');
        if (oldTrack) oldTrack.remove();

        var trackEl = document.createElement('track');
        trackEl.setAttribute("kind", "captions");
        trackEl.setAttribute("label", "English");
        trackEl.setAttribute("srclang", "en");
        trackEl.setAttribute("default", true);

        video.appendChild(trackEl);


        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                if (xhr.status >= 200 && xhr.status < 300) {
                    trackEl.src = url;
                    return;
                }

                if (!originalUrl || !/\.srt$/i.test(originalUrl)) {
                    console.log("Subtitle VTT not found:", xhr.status);
                    return;
                }

                var srtXhr = new XMLHttpRequest();
                srtXhr.open('GET', originalUrl, true);

                srtXhr.onreadystatechange = function () {
                    if (srtXhr.readyState === 4) {
                        if (srtXhr.status >= 200 && srtXhr.status < 300) {
                            try {
                                var vttText = srtToVtt(srtXhr.responseText);
                                var blob = new Blob([vttText], { type: "text/vtt" });
                                var blobUrl = URL.createObjectURL(blob);
                                trackEl.src = blobUrl;
                            } catch (e) {
                                console.log("Subtitle convert error:", e);
                            }
                        } else {
                            console.log("SRT request failed:", srtXhr.status);
                        }
                    }
                };

                srtXhr.send(null);
            }
        };

        xhr.send(null);


        var p_tag = document.getElementById('captions');
        if (!video.textTracks || !video.textTracks.length) return;

        var textTrack = video.textTracks[0];
        textTrack.mode = 'hidden';

        var subtitletexttoken;

        textTrack.oncuechange = function () {
            try {
                var cue = this.activeCues && this.activeCues[0];
                if (cue) {
                    if (subtitletexttoken) {
                        clearTimeout(subtitletexttoken);
                        subtitletexttoken = null;
                    }

                    p_tag.innerHTML = '';
                    p_tag.appendChild(cue.getCueAsHTML());

                    subtitletexttoken = setTimeout(function () {
                        p_tag.innerHTML = '';
                    }, (cue.endTime - cue.startTime) * 1000);
                } else {
                    if (!subtitletexttoken) {
                        p_tag.innerHTML = '';
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };

    } catch (err) {
        console.log(err);
    }
};

ShakaPlayer.updateUIElements = function (e) {

    if (ShakaPlayer.videoElement) {
        if (!!presentPagedetails.steamResponse.analyticsInfo && presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
            ShakaPlayer.update_seekbar_run_width(ShakaPlayer.videoElement.currentTime)
            ShakaPlayer.seekStartTime();
        }
    }
}
ShakaPlayer.reset_player_dependices = function () {
    ShakaPlayer.curretTime = 0;
    ShakaPlayer.resumeTimeUpdated = false;
    ShakaPlayer.isseeking = false;
    ShakaPlayer.duration = undefined;
    ShakaPlayer.videoElement = undefined;
    ShakaPlayer.intialPlaying = undefined;
    _shaka = undefined;
}

// ShakaPlayer.getDrmConfig = function () {
//     var drm_configs = { servers: {} };
//     var append_headers = null;

//     if (presentPagedetails.steamResponse.pageAttributes.networkName === "LionsgatePlay") {
//         var DRMTOKEN = "";
//         var kid = null;

//         for (var i = 0; i < presentPagedetails.steamResponse.streams.length; i++) {
//             var stream = presentPagedetails.steamResponse.streams[i];
//             if (stream.streamType === "widevine") {
//                 DRMTOKEN = stream.params.drmToken;
//                 kid = stream.params.kid;
//                 drm_configs.servers["com.widevine.alpha"] = stream.keys.licenseKey;
//                 break;
//             }
//         }

//         _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {
//             if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
//                 try {
//                     var licenseBody = {
//                         token: DRMTOKEN,
//                         drm_info: Array.prototype.slice.call(new Uint8Array(request.body)),
//                         kid: kid
//                     };
//                     request.body = JSON.stringify(licenseBody);
//                     request.headers["Content-Type"] = "application/json";
//                 } catch (e) {
//                     console.error("LionsgatePlay license body build failed:", e);
//                 }
//             }
//         });

//         return drm_configs;
//     }

//     for (var j = 0; j < presentPagedetails.steamResponse.streams.length; j++) {
//         var s = presentPagedetails.steamResponse.streams[j];

//         if (s.streamType === "widevine") {
//             drm_configs.servers["com.widevine.alpha"] = s.keys.licenseKey;
//             if (s.attributes && s.attributes.append_headers) {
//                 append_headers = JSON.parse(s.attributes.append_headers);
//             }
//         }

//         if (s.streamType === "playready") {
//             drm_configs.servers["com.microsoft.playready"] = s.keys.licenseKey;
//         }
//     }

//     if (append_headers) {
//         _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {
//             if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
//                 for (var key in append_headers) {
//                     if (append_headers.hasOwnProperty(key)) {
//                         request.headers[key] = append_headers[key];
//                     }
//                 }
//             }
//         });
//     }

//     return drm_configs;
// };

ShakaPlayer.getDrmConfig = function () {
    var drm_configs = { servers: {} };
    var append_headers = null;

    if (presentPagedetails.steamResponse.pageAttributes.networkName === "LionsgatePlay") {

        var DRMTOKEN = "";
        var kid = null;
        var nvAuthorization = "";
        var useNewFlow = false;

        for (var i = 0; i < presentPagedetails.steamResponse.streams.length; i++) {

            var stream = presentPagedetails.steamResponse.streams[i];

            if (stream.streamType === "widevine") {

                drm_configs.servers["com.widevine.alpha"] = stream.keys.licenseKey;

                /*Check new flow first */
                if (stream.drmHeaders && stream.drmHeaders.length > 0) {

                    for (var h = 0; h < stream.drmHeaders.length; h++) {

                        if (stream.drmHeaders[h].name === "nv-authorizations") {
                            nvAuthorization = stream.drmHeaders[h].value;
                            useNewFlow = true;
                            break;
                        }
                    }
                }

                /* Fallback to old flow */
                if (!useNewFlow) {
                    DRMTOKEN = stream.params.drmToken;
                    kid = stream.params.kid;
                }

                break;
            }
        }

        _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {

            if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {

                try {

                    /*new flow */
                    if (useNewFlow && nvAuthorization) {

                        console.log("Using NEW nv-authorization flow");

                        request.headers["nv-authorizations"] = nvAuthorization;
                        request.headers["Content-Type"] = "application/octet-stream";
                        request.headers["Accept"] = "*/*";
                    }

                    /* old flow */
                    else {

                        console.log("Using OLD DRM TOKEN flow");

                        var licenseBody = {
                            token: DRMTOKEN,
                            drm_info: Array.prototype.slice.call(new Uint8Array(request.body)),
                            kid: kid
                        };

                        request.body = JSON.stringify(licenseBody);
                        request.headers["Content-Type"] = "application/json";
                    }

                } catch (e) {
                    console.error("LionsgatePlay license build failed:", e);
                }
            }
        });

        return drm_configs;
    }

    /* ---------------- NORMAL FLOW ---------------- */

    for (var j = 0; j < presentPagedetails.steamResponse.streams.length; j++) {

        var s = presentPagedetails.steamResponse.streams[j];

        if (s.streamType === "widevine") {
            drm_configs.servers["com.widevine.alpha"] = s.keys.licenseKey;

            if (s.attributes && s.attributes.append_headers) {
                append_headers = JSON.parse(s.attributes.append_headers);
            }
        }

        if (s.streamType === "playready") {
            drm_configs.servers["com.microsoft.playready"] = s.keys.licenseKey;
        }
    }

    if (append_headers) {
        _shaka.getNetworkingEngine().registerRequestFilter(function (type, request) {

            if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {

                for (var key in append_headers) {
                    if (append_headers.hasOwnProperty(key)) {
                        request.headers[key] = append_headers[key];
                    }
                }
            }
        });
    }

    return drm_configs;
};

ShakaPlayer.getPlayerPosition = function () {
    return ShakaPlayer.getCurrentPosition();
}

ShakaPlayer.play = function (comingFromPauseBtn) {
    if (checknetworkType == false) {
        ShakaPlayer.pause();
        Main.popupData = {
            popuptype: 'netWorkError',
            message: "Please check your internet connection",
            buttonCount: 1,
            yesText: 'Okay',
            yesTarget: 'retrynet',
            onBack: 'close'
        }
        Yup("#popUpFDFS").html(Util.showPopup());
        Yup("#popup-btn-1").addClass('popupFocus');
    }
    else if (ShakaPlayer.getCurrentPosition() == 0 && _shaka != undefined && timerSeconds == 0 && comingFromPauseBtn == true) {
        Main.playerShowLoading();
        _shaka.unload();
        _shaka.load(stream_url, ShakaPlayer.getCurrentPosition());
        ShakaPlayer.videoElement.play();
        Main.playerHideLoading();
        ShakaPlayer.playerState = "playing"
        Yup("#play-but").hide();
        analytics.plugin.handleResume();
    }
    else if (_shaka != undefined) {
        ShakaPlayer.playerState = "playing"
        ShakaPlayer.videoElement.play();
        Yup("#play-but").hide();
        analytics.plugin.handleResume();
    }
}

ShakaPlayer.pause = function () {
    if (_shaka != undefined) {
        pauseTimer();
        ShakaPlayer.playerState = 'paused'
        ShakaPlayer.videoElement.pause();
        Yup("#play-but").show();
        analytics.plugin.handlePause()

    }
}

ShakaPlayer.playOrPause = function (videoPlayact) {
    if (isNetworkError == true) {
        if (checknetworkType == true) { //no network error
            isNetworkError = false;
            _shaka.unload();
            _shaka.load(presentPagedetails.stream_url, ShakaPlayer.getCurrentPosition());
            return;
        } else {
            ShakaPlayer.pause();
            Main.popupData = {
                popuptype: 'netWorkError',
                message: "Please check your internet connection",
                buttonCount: 1,
                yesText: 'Okay',
                yesTarget: 'retrynet',
                onBack: 'close'
            }
            Yup("#popUpFDFS").html(Util.showPopup());
            Yup("#popup-btn-1").addClass('popupFocus');
            return;
        }
    }
    Main.playerHideLoading();
    if (Yup("#playerBtn").hasClass('player_pause') && Yup("#play-but").css("display") == "none") {
        ShakaPlayer.pause();
        try {
            if (videoPlayact && typeof videoPlayact === "object") {
                videoPlayact.action = "Pause";
            }

            if (clevertapservice && typeof clevertapservice.sendCleverTapEvent === "function") {
                clevertapservice.sendCleverTapEvent('video player actions', videoPlayact || {});
            } else {
                console.warn("CleverTap service not available");
            }
        } catch (err) {
            console.error("Failed to send CleverTap Pause event:", err);
        }

        analytics.plugin.handlePause();
    }
    else if (Yup("#playerBtn").hasClass('player_play') && Yup("#play-but").css("display") == "block") {
        var comingFromPauseBtn = true
        ShakaPlayer.play(comingFromPauseBtn);
        // Safe update + safe event trigger
        try {
            if (videoPlayact && typeof videoPlayact === "object") {
                videoPlayact.action = "Play";
            }

            if (clevertapservice && typeof clevertapservice.sendCleverTapEvent === "function") {
                clevertapservice.sendCleverTapEvent('video player actions', videoPlayact || {});
            } else {
                console.warn("CleverTap service not available");
            }
        } catch (err) {
            console.error("Failed to send CleverTap Pause event:", err);
        }

        analytics.plugin.handleResume();
    }
}

// hideing player controllers
ShakaPlayer.hidePlayerDetails = function () {
    Yup("#vod-title").hide();
    Yup("#seekbar").hide();
    // Yup(".playSugestions").hide();
    // Yup('#playerButtons').hide();
    Yup("#top-left-icon").hide();
    Yup(".seekbar-live").hide();
    // Yup("#subtitles_main").hide();
    Yup("#seek-picker-runtime").hide();
    Yup("#favText").hide();
    // Yup('#play_btn').hide();
    Yup(".upArrow").hide();
    // Yup(".downArrow").hide();
    // Yup(".player_bottom_gradient").hide();
    // Yup(".nextVideo_bottom").show();
    Yup(".bottom_icons").hide()
    Yup(".bottom_icons_live").hide()
    Main.hideArrows()
    if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && Yup(".playSugestions").css("display") != 'block' && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#skipintro").addClass("imageFocus");
    }
    else if ((Yup("#playerBtn").length > 0) && Yup(".playSugestions").css("display") != 'block' && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block' && Yup("#watch_credits-preview").css("display") != 'block' && Yup("#next-preview").css("display") != 'block') {
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#playerBtn").addClass("imageFocus");
    }
    if (presentPagedetails.isCaptionsEnable == true && !presentPagedetails.suggestionsShow) {
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        if (keyHandlar.isHD) {
            Yup(".captions_data").css('bottom', '66px')
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('66px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('565px');
                }
            }
        }
        else {
            Yup(".captions_data").css('bottom', '100px')
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('100px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('850px');
                }
            }
        }
    }
    presentPagedetails.constrolsShow = false;
}

// enable player controllers
ShakaPlayer.showPlayerDetails = function () {
    if (adsManager.isAdPlaying) {
        return
    }
    if (presentPagedetails.constrolsShow == false || !presentPagedetails.constrolsShow) {
        //adding focus to seekbar
        Yup(".visible").removeClass("visible");
        if (Yup('#video_quality').css("display") == "block") {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("span.checked").closest("li").addClass("imageFocus");
        }
        else if (skipIntroOnn != true && Yup("#skipintro").css("display") != 'block') {
            // if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#playerBtn').addClass("imageFocus");

            // }else{
            // Yup("#seekbar-live").addClass("imageFocus");

            // Yup(".vod-title").addClass("imageFocus");
            // }	
        }
        if (Yup('#subtitles_main').css("display") == "block") {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("span.checked").closest("li").addClass("imageFocus");
        }
        if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
            for (var i = 0; i < presentPagedetails.sections.length; i++) {
                Yup("#section-" + i).show();
            }
        }
        ShakaPlayer.showControls();
    }
}

// player showControls
ShakaPlayer.showControls = function () {
    Yup(".upArrow").show();
    Yup(".downArrow").hide();
    Yup(".playSugestions").hide();
    Yup("#vod-title").show();
    Yup("#top-left-icon").show();
    Yup(".seekbar-live").show();
    // if (presentPagedetails.steamResponse.analyticsInfo.contentType !="live") {
    Yup("#seekbar").show();
    Yup('#play_btn').show();
    Yup(".player_bottom_gradient").show();
    Yup(".bottom_icons").show()
    Yup(".bottom_icons_live").show()
    Yup("#playerBtn").show();
    if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
        if (keyHandlar.isHD) {
            Yup("#skipintro").css('bottom', '160px')
        }
        else {
            Yup("#skipintro").css('bottom', '240px')
        }
    }
    if (presentPagedetails.isCaptionsEnable == true) {
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        if (keyHandlar.isHD) {
            if (window.tizen) {
                Yup(".captions_data").css('bottom', '120px')
            }
            else if (window.webOS) {
                Yup(".captions_data").css('bottom', '132px')
            }
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('120px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('500px');
                }
            }
        }
        else {
            if (window.tizen) {
                Yup(".captions_data").css('bottom', '200px')
            }
            else if (window.webOS) {
                Yup(".captions_data").css('bottom', '180px')
            }
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('180px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('750px');
                }
            }
        }
    }
    presentPagedetails.constrolsShow = true;
    ShakaPlayer.clearControls()
    // }
}
// When Hover on seekbar with airmouse
ShakaPlayer.seekHover = function (event, id) {
    if (presentPagedetails.type != "live") {
        //  Yup("#seek-picker-runtime").show();
        var x = event.clientX - Yup('#' + id).position().left;
        var totalWidth = Yup('#' + id).width();
        var seekPercent = x / totalWidth;
        var pos = seekPercent * ShakaPlayer.getDurationForSeekbar();
        if (x > 0 && x <= totalWidth) {
            Yup("#seek-picker-runtime").css("left", x);
            Yup("#seek-picker-runtime").html(utilities.getTimeHMSsss(pos));
            Yup("#seek-picker-start").html(utilities.getTimeHMSsss(pos));
            if (event.type == 'click') {
                Main.playerShowLoading();
                ShakaPlayer.playerState = 'buffering';
                ShakaPlayer.HandleBufferingEvent();
                media.seekTo(pos);
            }
        }
        else
            Yup("#seek-picker-runtime").hide();
    } else {

    }
}
ShakaPlayer.getDurationForSeekbar = function () {
    return ShakaPlayer.duration;
};

// ShakaPlayer.seekHover = function(event, id) {
//         Yup("#seek-picker-runtime").show();
//         var x = event.clientX - Yup('#'+id).position().left;
//         var totalWidth = Yup('#'+id).width();
//         var seekPercent = x / totalWidth;
//         var pos = seekPercent * ShakaPlayer.duration;
//         if (x > 0 && x <= totalWidth) {
//             Yup("#seek-picker-runtime").css("left", x);
//             Yup("#seek-picker-runtime").html(utilities.getTimeHMSsss(pos));
//         }   
// };

// player showSuggsnControls
ShakaPlayer.showSuggsnControls = function (comingFromAirmouse) {
    presentPagedetails.constrolsShow = false
    presentPagedetails.suggestionsShow = true
    Yup(".upArrow").hide();
    Yup(".downArrow").show();
    Yup(".playSugestions").show();
    Yup("#vod-title").hide();
    Yup("#seekbar").hide();
    Yup("#playerBtn").hide();
    Yup("#top-left-icon").hide();
    // Yup('#playerButtons').hide();
    Yup(".player_bottom_gradient").hide();
    // if(skipIntroOnn == true && Yup("#skipintro").css("display") =='block'){  
    //     if(keyHandlar.isHD){
    //         Yup(".next_btn").css('bottom', 'px')
    //      }
    //     else{
    //         Yup(".next_btn").css('bottom', '200px')
    //     }
    // }
    if (presentPagedetails.isCaptionsEnable == true) {
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        if (keyHandlar.isHD) {
            Yup(".captions_data").css('bottom', '273px')
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('273px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('333px');
                }
            }
        }
        else {
            Yup(".captions_data").css('bottom', '410px')
            if (!cc && _shaka && _shaka.getTextTracks().length > 0 && presentPagedetails.isCaptionsEnable == true) {
                if (window.tizen) {
                    updateSubtitlePosition('410px');
                }
                else if (window.webOS) {
                    updateSubtitlePosition('500px');
                }
            }
        }
    }
    if (comingFromAirmouse == true) {
        if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
        } else {
            Yup("#section-" + (presentPagedetails.sections.length - 1)).show();
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#sectionItem-" + (presentPagedetails.sections.length - 1) + "-0").addClass("imageFocus");
        }
        comingFromAirmouse = false
    }
    if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
        if (keyHandlar.isHD) {
            Yup("#skipintro").css('bottom', '280px')
        }
        else {
            Yup("#skipintro").css('bottom', '420px')
        }
    }
    Yup("#player_setting.default").css("display", "");
    Yup("#player_setting.focused").css("display", "");
    Yup("#Subtitlesbtn.default").css("display", "");
    Yup("#Subtitlesbtn.focused").css("display", "");
    ShakaPlayer.clearSuggestionControls();
}

// playing seeking bar controlling  
ShakaPlayer.seekTo = function (nav, action) {
    if (Yup('#playerLoading').css('display') == 'none') {
        ShakaPlayer.clearControls();
        var video = document.getElementById('video');
        if (video.paused == false) {
            video.play();
        }
        if (seekToken != undefined) {
            clearTimeout(seekToken);
            seekToken = undefined;
        }
        ShakaPlayer.isseeking = true;
        var seekTime;
        if (!!action) {
            seekTime = 20;
        }
        else {
            seekTime = 10;
        }
        var currpos = ShakaPlayer.getCurrentPosition();
        var width;
        if (nav == 'prev') {
            if (currpos > seekTime) {
                width = ShakaPlayer.secondsTowidth(currpos - seekTime)
                document.getElementById('seek-picker-runtime').innerHTML = utilities.getTimeHMS((currpos - seekTime) * 1000);
                document.getElementById('seek-picker-runtime').style.left = width + '%';
            }
            else {
                width = 0;
                document.getElementById('seek-picker-runtime').innerHTML = '00:00:00';
                document.getElementById('seek-picker-runtime').style.left = width + '%';
            }
            // analytics.plugin.handleSeek({ STPosition: curPos, ETPosition: finalValue});
            ShakaPlayer.showSeekingInfo(width);
        }
        if (nav == 'next') {
            var safeEnd = ShakaPlayer.duration - SEEK_END_GUARD_SECONDS;

            if (currpos + seekTime >= safeEnd) {
                // if (currpos + seekTime >= ShakaPlayer.duration) {
                width = ShakaPlayer.secondsTowidth(safeEnd);
                document.getElementById('seek-picker-runtime').innerHTML = utilities.getTimeHMS((safeEnd) * 1000);
                document.getElementById('seek-picker-runtime').style.left = width + '%';
            }
            else {
                width = ShakaPlayer.secondsTowidth(currpos + seekTime);
                document.getElementById('seek-picker-runtime').innerHTML = utilities.getTimeHMS((currpos + seekTime) * 1000);
                document.getElementById('seek-picker-runtime').style.left = width + '%';
            }
            ShakaPlayer.showSeekingInfo(width);
        }
        document.getElementById('seek-picker-runtime').style.display = 'inline-block';
        document.getElementById('seek-picker-runtime').style.left = width + '%';
        document.getElementById('seek-picker').style.left = (width - 1) + '%';


        ShakaPlayer.showSeekingInfo(width);
        ShakaPlayer.seekStartTime()
        seekToken = setTimeout(function () {
            Main.playerShowLoading();
            try {
                document.getElementById('seek-picker-runtime').style.display = 'none';
                var currSeekPos = ShakaPlayer.getCurrentPosition();
                if (presentPagedetails.steamResponse.analyticsInfo.contentType == 'live') {
                    var range = _shaka.seekRange();
                    if (range && range.end) {
                        if (currSeekPos > range.end - 1) {
                            currSeekPos = range.end - 1; // stay just behind live edge
                        }
                        if (currSeekPos < range.start) {
                            currSeekPos = range.start;   // don’t seek before DVR window
                        }
                    }
                }
                else {
                    video.currentTime = currSeekPos;

                }
                // video.currentTime = currSeekPos;
                ShakaPlayer.isseeking = false;
                if (video.paused == true) {
                    video.pause();
                    Main.playerHideLoading();
                }
                previousSeekposition = currSeekPos;
                ShakaPlayer.seekStartTime();
                seekTime = 0;
                analytics.plugin.handleSeek({
                    STPosition: currpos,
                    ETPosition: currSeekPos
                });
            }
            catch (e) {
                if (_shaka) {
                    _shaka.destroy();
                }
                Main.playerHideLoading();
                Main.HideLoading();
                if (checknetworkType == false) {
                    Main.popupData = {
                        popuptype: 'netWorkError',
                        message: "Please check your internet connection",
                        buttonCount: 1,
                        yesText: 'Okay',
                        yesTarget: 'retrynet',
                        onBack: 'close'
                    }
                    Yup("#popUpFDFS").html(Util.showPopup());
                    Yup("#popup-btn-1").addClass('popupFocus');
                }
                else {
                    Main.popupData = {
                        popuptype: 'Error',
                        message: 'Something went wrong',
                        buttonCount: 1,
                        yesText: 'OK',
                        yesTarget: 'GoBack',
                    }
                    Yup("#popUpFDFS").html(Util.showPopup());
                    Yup("#popup-btn-1").addClass('popupFocus');
                }
            }
        }, 1500)
    }
}

ShakaPlayer.showSeekingInfo = function (width) {
    if (document.getElementById('seekbar-run')) {
        document.getElementById('seekbar-run').style.width = width + '%';
    }
    document.getElementById('seek-picker').style.left = (width - 1) + '%';
    document.getElementById('seek-picker-runtime').style.display = 'inline-block';
}

// when playing have to set the seek controllers value automatically
ShakaPlayer.seekPosition = function (seekTime) {
    document.getElementById('seekbar-run').style.width = (seekTime * 99 / ShakaPlayer.duration) + '%';
    Yup('#seek-picker').css("left", ((seekTime * 99 / ShakaPlayer.duration) - 1) + '%');
    ShakaPlayer.seekStartTime(seekTime);
    if (!ShakaPlayer.airMouseHover || ShakaPlayer.airMouseHover == false) {
        document.getElementById('seek-picker-runtime').innerHTML = utilities.getTimeHMS(seekTime);
        Yup('#seek-picker-runtime').css("left", ((seekTime * 99 / ShakaPlayer.duration) - 1) + '%');
        Yup("#seek-picker-runtime").hide();
    }
}

// With airmouse using controllers handler 
ShakaPlayer.progressIconHandle = function (event, action, id) {
    var source = Yup('#' + id).attr("source");
    switch (action) {
        case 'mouseover':
        case 'mousemove':
            ShakaPlayer.airMouseHover = true;
            ShakaPlayer.showPlayerDetails();
            if (presentPagedetails.isCaptionsEnable == true) {
                if (keyHandlar.isHD) {
                    Yup(".captions_data").css('bottom', '132px')
                }
                else {
                    Yup(".captions_data").css('bottom', '200px')
                }
            }
            if (source == 'seekbar' && Yup('#playerLoading').css('display') == 'none') {
                Yup("#seek-picker-runtime").show();
                ShakaPlayer.seekHover(event, id);
            }
            break;
        case 'mouseout':
            ShakaPlayer.airMouseHover = false;
            //   Yup("#favText").hide();
            break;
        case 'click':
            if (source == 'player_icon') {
                if (Yup("#playerBtn").hasClass('player_pause')) {
                    Yup('#playerBtn').addClass("player_play");
                    Yup('#playerBtn').removeClass("player_pause");
                }
                else if (Yup("#playerBtn").hasClass('player_play')) {
                    Yup('#playerBtn').removeClass("player_play");
                    Yup('#playerBtn').addClass("player_pause");
                }
                ShakaPlayer.playOrPause();
            } else {
                if (presentPagedetails.constrolsShow == false) {
                    ShakaPlayer.showPlayerDetails();
                    if (presentPagedetails.isCaptionsEnable == true) {
                        if (keyHandlar.isHD) {
                            Yup(".captions_data").css('bottom', '132px')
                        }
                        else {
                            Yup(".captions_data").css('bottom', '200px')
                        }
                    }
                    return;
                }
                if (source == 'seekbar') {
                    ShakaPlayer.seekOver(event);
                }
                else {
                    keyHandlar.playEnterKeydown(id);
                }
            }
            break;
        case 'down':
            break;
        default:
            break;
    }
}

// When Hover on seekbar with airmouse
ShakaPlayer.seekOver = function (event) {
    var x_pos = event.clientX;
    var window_width = Yup(window).width();
    var left = (window_width * 20) / 100;  // window width 10% left(in px) space from the seekbar 
    var right = (window_width * 90) / 100; //window width 10% right(in px) space from the seekbar 
    var seekbar_width = (window_width * 65) / 100;  //80 is the 80% seekbar width 
    if (x_pos >= left && x_pos <= right) {
        var width = x_pos - left;
        if (width >= 0 && width <= seekbar_width) {
            var width_in_perc = (100 * width) / seekbar_width; //width in perc
            var duration_in_sec = ShakaPlayer.widthToseconds(width_in_perc);
            Main.playerShowLoading();

            if (event.type == 'click') {
                if (airmouseseek != undefined) {
                    clearTimeout(airmouseseek);
                    airmouseseek = undefined;
                }
                airmouseseek = setTimeout(function () {
                    var current_duration = ShakaPlayer.getCurrentPosition();
                    var hover_duration = duration_in_sec;
                    if (previousSeekposition == undefined) {
                        if (current_duration < hover_duration) {
                            video.currentTime = video.currentTime + (hover_duration - current_duration);
                        }
                        else if (current_duration > hover_duration) {
                            video.currentTime = ShakaPlayer.catchuptime - (current_duration - hover_duration);
                        }
                    }
                    else {
                        if (current_duration < hover_duration) {
                            video.currentTime = video.currentTime + (hover_duration - current_duration);
                        }
                        else if (current_duration > hover_duration) {
                            video.currentTime = video.currentTime - (current_duration - hover_duration);
                        }
                    }
                    previousSeekposition = hover_duration;
                    document.getElementById('seek-picker-runtime').innerHTML = utilities.getTimeHMS(duration_in_sec * 1000);
                    document.getElementById('seek-picker-runtime').style.left = width_in_perc + '%';
                    document.getElementById('seek-picker-start').innerHTML = utilities.getTimeHMS(duration_in_sec * 1000);
                    ShakaPlayer.showSeekingInfo(width_in_perc);
                    ShakaPlayer.seekStartTime();
                }, 1500);
            }
            Main.playerHideLoading();
        }
    }
}


ShakaPlayer.HandleBufferingEvent = function () {
    if (eventIdBuffer == '') {
        eventIdBuffer = setTimeout(function () {
            if (ShakaPlayer.playerState == 'buffering') {
                ShakaPlayer.bufferEvent = true;
                eventIdBuffer = '';
                analytics.plugin.handleBufferStart();
            } else {
                eventIdBuffer = '';
                analytics.plugin.handleBufferEnd();
            }
        }, 1000);
    }

}
ShakaPlayer.setQualityLevels = function (tracks) {
    var unique_tracks = {}
    for (var i = 0; i < tracks.length; i++) {
        unique_tracks[tracks[i].height] = tracks[i]
    }
    presentPagedetails.QulailtyTracks = unique_tracks;
    // Yup('.playerControls').append(Util.videoQuality());
}
// Function to get language name
function getLanguageName(code) {
    return languageMap[code.toLowerCase()] || code;
}
ShakaPlayer.setAudioTracks = function (tracks) {
    var Audio_tracks = {}
    
    // Parse language data once
    if (systemConfigs && systemConfigs.configs && systemConfigs.configs.filterLanguagesList) {
        try {
            var languageData = JSON.parse(systemConfigs.configs.filterLanguagesList);
            if (languageData && languageData.items) {
                for (var j = 0; j < languageData.items.length; j++) {
                    var item = languageData.items[j];
                    languageMap[item.code.toLowerCase()] = item.title;
                }
            }
        } catch (e) {}
    }

    for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].language != 'und' && tracks[i].label != null) {
            var mappedTitle = languageMap[tracks[i].language.toLowerCase()];
            var finalLabel = mappedTitle ? mappedTitle : tracks[i].label;
            tracks[i].label = finalLabel;
            Audio_tracks[finalLabel] = tracks[i];
        }
        else {
            var languageName = getLanguageName(tracks[i].language);
            Audio_tracks[languageName] = {
                language: tracks[i].language,
                role: tracks[i].role,
                label: languageName
            };
        }
    }
    presentPagedetails.AudioTracks = Audio_tracks;
    // Yup('.playerControls').append(Util.videoQuality());
}

ShakaPlayer.SelectAudioTrack = function (track) {
    if (presentPagedetails.AudioTracks[track]) {
        var audioSend = presentPagedetails.AudioTracks[track]
        _shaka.selectAudioLanguage(audioSend.language, audioSend.role);
        Main.playerHideLoading();
    }
};
ShakaPlayer.SelectQulaityTrack = function (track) {
    if (track == 'auto') {
        if (presentPagedetails.abr_disabled) {
            _shaka.configure({
                abr: {
                    enabled: true
                }
            });
            presentPagedetails.abr_disabled = false;
        }
        Main.playerHideLoading();
    } else {
        if (!presentPagedetails.abr_disabled) {
            _shaka.configure({
                abr: {
                    enabled: false
                }
            });
            presentPagedetails.abr_disabled = true;
        }
        if (presentPagedetails.QulailtyTracks[track]) {
            _shaka.configure({
                abr: {
                    enabled: false
                }
            });
            presentPagedetails.abr_disabled = true;
            _shaka.selectVariantTrack(presentPagedetails.QulailtyTracks[track]);
            Main.playerHideLoading();
            analytics.plugin.setBitRate({ bitRate: parseInt(track) })
            analytics.plugin.handleBitRateChange({ bitRate: parseInt(track) })
        }
    }
};
ShakaPlayer.SelectCorrectQulaityTrack = function (track) {
    if (track === 'auto') {
        if (presentPagedetails.abr_disabled) {
            _shaka.configure({ abr: { enabled: true } });
            presentPagedetails.abr_disabled = false;
        }
        Main.playerHideLoading();
        return;
    }

    if (!presentPagedetails.abr_disabled) {
        _shaka.configure({ abr: { enabled: false } });
        presentPagedetails.abr_disabled = true;
    }

    var requestedHeight = parseInt(track, 10);
    if (isNaN(requestedHeight)) {
        Main.playerHideLoading();
        return;
    }

    var variants = [];
    try {
        variants = _shaka.getVariantTracks ? _shaka.getVariantTracks() : [];
    } catch (e) {
        variants = [];
    }

    if (!variants || variants.length === 0) {
        Main.playerHideLoading();
        return;
    }

    var activeVariant = null;
    for (var i = 0; i < variants.length; i++) {
        if (variants[i].active) {
            activeVariant = variants[i];
            break;
        }
    }

    var candidates = variants;
    if (activeVariant && activeVariant.language) {
        var tmp = [];
        for (i = 0; i < variants.length; i++) {
            if (variants[i].language === activeVariant.language) {
                tmp.push(variants[i]);
            }
        }
        if (tmp.length > 0) {
            candidates = tmp;
        }
    }

    var best = null;
    for (i = 0; i < candidates.length; i++) {
        var h = candidates[i].height || 0;
        var bw = candidates[i].bandwidth || candidates[i].bitrate || 0; // bits/sec
        var diff = Math.abs(h - requestedHeight);

        if (best === null) {
            best = { trackObj: candidates[i], diff: diff, bw: bw, height: h };
        } else {
            if (diff < best.diff) {
                best = { trackObj: candidates[i], diff: diff, bw: bw, height: h };
            } else if (diff === best.diff) {
                if (bw > best.bw) {
                    best = { trackObj: candidates[i], diff: diff, bw: bw, height: h };
                } else if (bw === best.bw) {
                    var preferCurrentLE = (best.height <= requestedHeight);
                    var candidateLE = (h <= requestedHeight);
                    if (!preferCurrentLE && candidateLE) {
                        best = { trackObj: candidates[i], diff: diff, bw: bw, height: h };
                    }
                }
            }
        }
    }

    if (best && best.trackObj) {
        try {
            _shaka.selectVariantTrack(best.trackObj, /* clearBuffer */ true);
        } catch (e) {
            try { _shaka.selectVariantTrack(best.trackObj); } catch (e2) { /* ignore */ }
        }

        Main.playerHideLoading();

        analytics.plugin.setBitRate({ bitRate: requestedHeight });
        analytics.plugin.handleBitRateChange({ bitRate: requestedHeight });
    } else {
        Main.playerHideLoading();
    }
};

ShakaPlayer.hitPoll = function () {
    ShakaPlayer.stopInterval();
    try {
        pollstart = setInterval(function () {
            if (presentPagedetails.steamResponse && presentPagedetails.steamResponse.sessionInfo != undefined && presentPagedetails.steamResponse.sessionInfo.pollIntervalInMillis) {
                Main.callPollApi();
            }
        }, presentPagedetails.steamResponse.sessionInfo.pollIntervalInMillis);
    }
    catch (e) { }
}

ShakaPlayer.stopInterval = function () {
    try {
        clearInterval(pollstart);
    }
    catch (e) { }
}
ShakaPlayer.shakaConfigurations = function () {
    var configStr = systemConfigs && systemConfigs.configs && systemConfigs.configs.shakaPlayerStreamConfig;

    var streamConfig = null;

    try {
        streamConfig = configStr ? JSON.parse(configStr) : null;
    } catch (e) {
        console.log("Failed to parse Shaka config JSON", e);
    }
    if (presentPagedetails
        && presentPagedetails.steamResponse
        && presentPagedetails.steamResponse.analyticsInfo
        && streamConfig
        && streamConfig.enabled) {

        var contentType = presentPagedetails.steamResponse.analyticsInfo.contentType;
        var typeConfig = streamConfig[contentType];   //  pick dynamically (live/movie/etc)

        if (typeConfig) {
            _shaka.configure({
                streaming: {
                    rebufferingGoal: (typeConfig.streaming && typeConfig.streaming.rebufferingGoal) || 2,
                    bufferingGoal: (typeConfig.streaming && typeConfig.streaming.bufferingGoal) || 4,
                    bufferBehind: (typeConfig.streaming && typeConfig.streaming.bufferBehind) || 10,
                    inaccurateManifestTolerance: (typeConfig.streaming && typeConfig.streaming.inaccurateManifestTolerance) || 2,
                    ignoreTextStreamFailures: (typeConfig.streaming && typeConfig.streaming.ignoreTextStreamFailures) || true,

                    //gap & stall recovery settings
                    gapDetectionThreshold: (typeConfig.streaming && typeConfig.streaming.gapDetectionThreshold) || 0.5,   // treat gaps >0.5s as real gaps
                    gapJumpTimerTime: (typeConfig.streaming && typeConfig.streaming.gapJumpTimerTime) || 0.25,    // check every 250ms if we can jump
                    stallEnabled: (typeConfig.streaming && typeConfig.streaming.stallEnabled) || true,         // detect playback stalls
                    stallThreshold: (typeConfig.streaming && typeConfig.streaming.stallThreshold) || 1,          // consider stall if playback stuck ≥1s
                    stallSkip: (typeConfig.streaming && typeConfig.streaming.stallSkip) || 0.1,             // skip forward 100ms to recover
                },
                abr: {
                    switchInterval: (typeConfig.abr && typeConfig.abr.switchInterval) || 8
                },
                manifest: {
                    availabilityWindowOverride: 60,
                    retryParameters: {
                        maxAttempts: (typeConfig.manifest && typeConfig.manifest.retryParameters && typeConfig.manifest.retryParameters.maxAttempts) || 3,
                        baseDelay: (typeConfig.manifest && typeConfig.manifest.retryParameters && typeConfig.manifest.retryParameters.baseDelay) || 300,
                        backoffFactor: (typeConfig.manifest && typeConfig.manifest.retryParameters && typeConfig.manifest.retryParameters.backoffFactor) || 2
                    }
                }
            });



            console.log("Applied Shaka config dynamically for contentType:", contentType, typeConfig);
        } else {
            console.log("No matching config found for contentType:", contentType);
        }
    } else {
        console.log("Shaka config not applied (config missing or disabled)");
    }
}
ShakaPlayer.addIcons = function () {
    if (_shaka && _shaka.getTextTracks().length > 0) {
        if (Yup("#btn-1").css("display") !== 'block' && presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' && presentPagedetails.steamResponse.pageAttributes.contentType !== 'epg') {
            var controlContainer = document.getElementById('top-left-icon');
            if (controlContainer) {
                var subtitlesControl = document.createElement('div');
                subtitlesControl.className = 'control_items';
                subtitlesControl.setAttribute('source', 'icon');
                subtitlesControl.setAttribute('type', 'subtitles');
                subtitlesControl.setAttribute('id', 'btn-1');
                subtitlesControl.innerHTML = `
                    <img src="images/subtitles_default.png" id="Subtitlesbtn" source="subtitlesbtn" class="default">
                    <img src="images/subtitles_focused.png" id="Subtitlesbtn" source="subtitlesbtn" class="focused">
                    <div class="icon_name focused">Audio/<br>Subtitles</div>`;
                controlContainer.insertBefore(subtitlesControl, controlContainer.children[1]); // Insert after the second child
            } else {
                console.error('Container element not found.');
            }
        }
        var selectedLanguage = localStorage.getItem("selectedLanguage");
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        if (selectedLanguage && !cc) {
            selectSubtitleByDisplayName(selectedLanguage);
        }
    }
}

ShakaPlayer.streamText = function () {
    try {
        var video = document.querySelector("video");
        var track = document.querySelector("track");
        var srctrack = document.createElement("track");
        srctrack.setAttribute("enabled", true);
        srctrack.setAttribute("label", "English");
        srctrack.setAttribute("srclang", "en");
        srctrack.setAttribute("kind", "captions");
        srctrack.setAttribute("defaultLang", "English");
        if (!!track) {
            video.replaceChild(srctrack, track);
        } else {
            video.appendChild(srctrack);
        }
        var p_tag = document.getElementById("captions");
        if (!video.textTracks) return;
        var track = video.textTracks[0];
        track.mode = "hidden";
        var subtitletexttoken;
        track.oncuechange = function (e) {
            try {
                console.log('txt track', e);
                var cue = this.activeCues[0];
                if (cue) {
                    if (subtitletexttoken != undefined) {
                        clearTimeout(subtitletexttoken);
                        subtitletexttoken = undefined;
                    }
                    p_tag.innerHTML = "";
                    video.activeSubtitleText = cue.text;
                    video.activeSubtitleTextendduration = cue.endTime * 1000;
                    p_tag.appendChild(cue.getCueAsHTML());
                    subtitletexttoken = setTimeout(
                        function () {
                            if (
                                !!ShakaPlayer.videoElement &&
                                ShakaPlayer.videoElement.currentTime >= cue.endTime
                            ) {
                                p_tag.innerHTML = "";
                            } else {
                                subtitletexttoken = undefined;
                            }
                        },
                        (cue.endTime - cue.startTime) * 1000
                    );
                } else {
                    if (subtitletexttoken == undefined) {
                        p_tag.innerHTML = "";
                        ShakaPlayer.activeSubtitleText = "";
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
    } catch (err) {
        console.log(err);
    }
}

function forceResumeIfStuck(video, shaka) {
    setTimeout(function () {
        try {
            if (!video || !shaka) return;

            var buffered = shaka.getBufferedInfo && shaka.getBufferedInfo().total;
            var hasBuffer = buffered && buffered.length > 0;
            var rs = video.readyState;

            if (!hasBuffer && rs >= 2) {
                console.warn("Playback stuck retryStreaming()");
                shaka.retryStreaming();
            }

            setTimeout(function () {
                buffered = shaka.getBufferedInfo && shaka.getBufferedInfo().total;
                hasBuffer = buffered && buffered.length > 0;

                if (!hasBuffer) {
                    console.warn("Playback still stuck – soft reset video");

                    try {
                        video.pause();
                        video.currentTime = video.currentTime; // force seek
                        video.play().catch(function () { });
                    } catch (e) { }
                }

                setTimeout(function () {
                    buffered = shaka.getBufferedInfo && shaka.getBufferedInfo().total;
                    hasBuffer = buffered && buffered.length > 0;

                    if (!hasBuffer) {
                        console.error("Playback dead – HARD MediaSource reset");

                        try {
                            video.pause();
                            video.removeAttribute('src');
                            video.load();
                            shaka.unload();

                            shaka.load(stream_url).then(function () {
                                video.play().catch(function () { });
                            });
                        } catch (e) {
                            console.error("Hard recovery failed", e);
                        }
                    }
                }, 1000);
            }, 1000);

        } catch (e) {
            console.error("forceResumeIfStuck error", e);
        }
    }, 500);
}

