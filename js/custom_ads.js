/**
 * Custom Ads Manager for Samsung Tizen TV
 * Supports Chrome 38 compatible VMAP/VAST ad playback with Ad Pods
 */

function CustomAdsManager() {
    this.adBreaks = {
        preroll: [],
        midroll: [],
        postroll: []
    };
    this.currentAdPod = null;
    this.currentAdIndex = 0;
    this.adVideoElement = null;
    this.mainVideoElement = null;
    this.isAdPlaying = false;
    this.adContainer = null;

    // Create ad video element
    this.init = function (mainVideo, adContainerElement) {
        this.mainVideoElement = mainVideo;
        this.adContainer = adContainerElement;
        this.isAdPlaying = true
        // Create ad video element
        this.adVideoElement = document.createElement('video');
        this.adVideoElement.style.position = 'absolute';
        this.adVideoElement.style.top = '0';
        this.adVideoElement.style.left = '0';
        this.adVideoElement.style.width = '100%';
        this.adVideoElement.style.height = '100%';
        this.adVideoElement.style.zIndex = '1000';
        this.adVideoElement.style.display = 'none';
        this.adVideoElement.controls = false;
        this.adVideoElement.autoplay = true;

        this.adContainer.appendChild(this.adVideoElement);

        // Add event listeners
        this.setupAdEventListeners();

        console.log('Custom Ads Manager initialized');
    };

    // Setup event listeners for ad video element
    this.setupAdEventListeners = function () {
        var self = this;

        this._onLoadStart = function () {
            console.log('Ad loading started');
            if (typeof Main !== 'undefined' && Main.ShowLoading) {
                Main.ShowLoading();
            }
        };

        this._onCanPlay = function () {
            console.log('Ad can play');
            if (typeof Main !== 'undefined' && Main.HideLoading) {
                Main.HideLoading();
            }
        };

        this._onWaiting = function () {
            console.log('Ad is buffering/waiting');
            if (typeof Main !== 'undefined' && Main.ShowLoading) {
                Main.ShowLoading();
            }
        };

        this._onPlaying = function () {
            console.log('Ad is playing (buffering completed)');
            if (typeof Main !== 'undefined' && Main.HideLoading) {
                Main.HideLoading();
            }
        };

        this._onPlay = function () {
            console.log('Ad playback started');
            if (typeof Main !== 'undefined' && Main.HideLoading) {
                Main.HideLoading();
            }
            if (Yup("#play-but").css("display") == "block") {
                Yup("#play-but").css("display", "none");
            }
            self.isAdPlaying = true;

            var btn = Yup('#ad-playerBtn');
            if (btn.length) {
                btn.removeClass('player_pause').addClass('player_play');
            }

            resetAdControlsState();
        };



        this._onEnded = function () {
            console.log('Ad playback ended');
            if (typeof Main !== 'undefined' && Main.HideLoading) {
                Main.HideLoading();
            }
            self.onAdComplete();
        };

        this._onError = function (e) {
            console.error('Ad playback error:', e);
            if (typeof Main !== 'undefined' && Main.HideLoading) {
                Main.HideLoading();
            }
            self.onAdError(e);
        };

        this._onTimeUpdate = function () {
            if (self.currentAdPod && self.currentAdPod.onProgress) {
                var currentAd = self.currentAdPod.ads[self.currentAdIndex];
                var progress = (self.adVideoElement.currentTime / self.adVideoElement.duration) * 100;
                var currentTime = self.adVideoElement.currentTime
                self.currentAdPod.onProgress(progress, self.currentAdIndex, self.currentAdPod.ads.length, currentAd, currentTime);
            }
        };

        this.adVideoElement.addEventListener('loadstart', this._onLoadStart);
        this.adVideoElement.addEventListener('canplay', this._onCanPlay);
        this.adVideoElement.addEventListener('waiting', this._onWaiting);
        this.adVideoElement.addEventListener('playing', this._onPlaying);
        this.adVideoElement.addEventListener('play', this._onPlay);
        this.adVideoElement.addEventListener('ended', this._onEnded);
        this.adVideoElement.addEventListener('error', this._onError);
        this.adVideoElement.addEventListener('timeupdate', this._onTimeUpdate);
    };


    this.cleanupAdVideo = function () {
        if (!this.adVideoElement) return;

        // Remove event listeners
        this.adVideoElement.removeEventListener('loadstart', this._onLoadStart);
        this.adVideoElement.removeEventListener('canplay', this._onCanPlay);
        this.adVideoElement.removeEventListener('waiting', this._onWaiting);
        this.adVideoElement.removeEventListener('playing', this._onPlaying);
        this.adVideoElement.removeEventListener('play', this._onPlay);
        this.adVideoElement.removeEventListener('ended', this._onEnded);
        this.adVideoElement.removeEventListener('error', this._onError);
        this.adVideoElement.removeEventListener('timeupdate', this._onTimeUpdate);

        // Pause and unload
        this.adVideoElement.pause();

        // Remove <source> children if any
        while (this.adVideoElement.firstChild) {
            this.adVideoElement.removeChild(this.adVideoElement.firstChild);
        }

        // Remove src if set directly
        this.adVideoElement.removeAttribute('src');

        // Unload media
        this.adVideoElement.load();

        // Optionally hide or remove the element
        this.adVideoElement.style.display = 'none';

        // Optionally nullify the element if you're done with it
        // this.adVideoElement = null;

        console.log('Ad video cleaned up.');
    };


    // Fetch and parse VMAP
    this.fetchVMAP = function (vmapUrl, callback) {
        var self = this;
        console.log('Fetching VMAP from:', vmapUrl);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', vmapUrl, true);
        xhr.timeout = 10000; // 10 second timeout

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        self.parseVMAP(xhr.responseText, function (success) {
                            if (success) {
                                if (callback) callback(true, self.getAdBreaksSummary());
                            } else {
                                if (callback) callback(false, 'Failed to parse VMAP');
                            }
                        });
                    } catch (error) {
                        console.error('Error parsing VMAP:', error);
                        if (callback) callback(false, error);
                    }
                } else {
                    console.error('Failed to fetch VMAP:', xhr.status);
                    if (callback) callback(false, 'HTTP Error: ' + xhr.status);
                }
            }
        };

        xhr.onerror = function () {
            console.error('Network error fetching VMAP');
            if (callback) callback(false, 'Network error');
        };

        xhr.ontimeout = function () {
            console.error('VMAP fetch timeout');
            if (callback) callback(false, 'Timeout');
        };

        xhr.send();
    };

    this.prepareVAST = function (adData, callback) {
        var self = this;

        var adbreaks = {
            preroll: [],
            midroll: [],
            postroll: []
        };

        // Function to convert seconds to HH:mm:ss format
        function secondsToTimeFormat(seconds) {
            console.log("secondsToTimeFormat-->", seconds)
            var hours = Math.floor(seconds / 3600);
            var minutes = Math.floor((seconds % 3600) / 60);
            var remainingSeconds = seconds % 60;

            // Pad minutes and seconds with leading zeros if necessary
            return (
                (hours < 10 ? "0" + hours : hours) + ":" +
                (minutes < 10 ? "0" + minutes : minutes) + ":" +
                (remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds)
            );
        }

        // Iterate through the provided ad data
        for (var i = 0; i < adData.length; i++) {
            var ad = adData[i];
            var urlType = ad.urlType;
            var url = ad.url;
            var attributes = ad.attributes;
            var position = ad.position;
            var adUnitId = ad.adUnitId;

            var adTag = attributes.adTag;

            var vastData = {
                ads: [], // Assuming this is an array of ads. You can modify this if there's actual data.
                adUnitId: adUnitId
            };

            var breakType = urlType.toLowerCase(); // Could be 'preroll', 'midroll', or 'postroll'
            var adTagURI = url;
            var breakId = adUnitId; // For simplicity, assume adUnitId is the breakId

            switch (breakType) {
                case 'preurl':
                    adbreaks.preroll.push({
                        timeOffset: secondsToTimeFormat(0), // Preroll starts at time 0
                        breakType: breakType,
                        breakId: breakId,
                        vastUrl: adTagURI,
                        ads: vastData.ads,
                        totalAds: vastData.ads.length
                    });
                    break;

                case 'midurl':
                    // Ensure position object exists for midroll logic
                    if (position && position.offset && position.interval) {
                        var offset = parseInt(position.offset);
                        var interval = parseInt(position.interval);
                        var maxCount = parseInt(position.maxCount) || 30;

                        for (var j = 0; j < maxCount; j++) {
                            var timeOffset = offset + (j * interval);
                            adbreaks.midroll.push({
                                timeOffsetSeconds: timeOffset,
                                timeOffset: secondsToTimeFormat(timeOffset), // Convert to time format
                                breakType: breakType,
                                breakId: breakId,
                                vastUrl: adTagURI,
                                ads: vastData.ads, // You would populate this with actual ad data
                                totalAds: vastData.ads.length
                            });
                        }
                    }
                    break;

                case 'posturl':
                    adbreaks.postroll.push({
                        timeOffset: "posturl", // Postroll starts at the end of the video (this is just a placeholder)
                        breakType: breakType,
                        breakId: breakId,
                        vastUrl: adTagURI,
                        ads: vastData.ads,
                        totalAds: vastData.ads.length
                    });
                    break;

                default:
                    console.warn('Unknown urlType: ' + urlType);
                    break;
            }
        }
        self.parseVASTCollection(adbreaks, function (success) {
            if (success) {
                if (callback) callback(true, self.getAdBreaksSummary());
            } else {
                if (callback) callback(false, 'Failed to parse VMAP');
            }
        });
        adbreaks;
        console.log(adbreaks)
    }

    this.parseVASTCollection = function (vastUrls, callback) {
        var self = this;
        console.log('Parsing VAST URLs');

        // Reset ad breaks
        this.adBreaks = {
            preroll: [],
            midroll: [],
            postroll: []
        };

        var breaksParsed = 0;
        var totalBreaks = 0;

        // Helper function to process each VAST URL entry without fetching media immediately.
        // We store the URL and metadata and mark the break as not-yet-fetched. Actual VAST
        // parsing will happen lazily when the ad pod is about to play.
        function processVAST(vastType, vastUrl) {
            // vastUrl may be an object with properties like timeOffset and vastUrl
            var vastUrlStr = (vastUrl && vastUrl.vastUrl) ? vastUrl.vastUrl : vastUrl;

            var breakData = {
                timeOffset: vastUrl && vastUrl.timeOffset ? vastUrl.timeOffset : undefined,
                timeOffsetSeconds: vastUrl && vastUrl.timeOffsetSeconds ? parseInt(vastUrl.timeOffsetSeconds, 10) : undefined,
                breakType: vastType,
                breakId: vastType, // Math.random().toString(36).substr(2, 9), // Generate unique breakId
                vastUrl: vastUrlStr,
                // ads array will be populated only when we fetch the VAST (lazy)
                ads: [],
                totalAds: 0,
                fetched: false
            };

            if (vastType === 'preroll') {
                self.adBreaks.preroll.push(breakData);
            } else if (vastType === 'midroll') {
                self.adBreaks.midroll.push(breakData);
            } else if (vastType === 'postroll') {
                self.adBreaks.postroll.push(breakData);
            }

            // Increment the counter and check if all VAST URL entries are processed
            breaksParsed++;
            if (breaksParsed === totalBreaks) {
                console.log('VAST collection registered (lazy):', self.adBreaks);
                if (callback) callback(true);
            }
        }

        // Process the VAST URLs provided in the input
        for (var vastType in vastUrls) {
            if (vastUrls.hasOwnProperty(vastType)) {
                var vastList = vastUrls[vastType];
                totalBreaks += vastList.length;

                for (var i = 0; i < vastList.length; i++) {
                    processVAST(vastType, vastList[i]);
                }
            }
        }
    };

    // Ensure a given adBreak has fetched & parsed its VAST. Calls cb(true|false).
    this.ensureAdBreakFetched = function (adBreak, cb) {
        var self = this;
        if (!adBreak || !adBreak.vastUrl) {
            if (cb) cb(false);
            return;
        }
        if (adBreak.fetched) {
            if (cb) cb(true);
            return;
        }

        // Fetch and parse VAST for this break
        self.fetchAndParseVAST(adBreak.vastUrl, function (vastData) {
            if (vastData && vastData.ads) {
                adBreak.ads = vastData.ads;
                adBreak.totalAds = vastData.ads.length;
                adBreak.fetched = true;
                if (cb) cb(true);
            } else {
                console.error('Failed to fetch/parse VAST for break:', adBreak.breakId || adBreak.vastUrl);
                if (cb) cb(false);
            }
        });
    };


    this.parseVAST = function (vastXML) {
        console.log('Parsing VAST XML for ad pods');

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(vastXML, 'text/xml');

        var ads = xmlDoc.getElementsByTagName('Ad');
        var adPod = [];

        for (var i = 0; i < ads.length; i++) {
            var ad = ads[i];
            var sequence = ad.getAttribute('sequence') || (i + 1);

            var inLine = ad.getElementsByTagName('InLine')[0];
            if (!inLine) {
                // Try Wrapper
                var wrapper = ad.getElementsByTagName('Wrapper')[0];
                if (wrapper) {
                    console.warn('VAST Wrapper detected, this implementation requires InLine ads');
                    continue;
                }
                continue;
            }

            var creatives = inLine.getElementsByTagName('Creative');
            var linearCreative = null;

            // Find Linear creative
            for (var j = 0; j < creatives.length; j++) {
                var linear = creatives[j].getElementsByTagName('Linear')[0];
                if (linear) {
                    linearCreative = linear;
                    break;
                }
            }

            if (!linearCreative) {
                console.warn('No Linear creative found for ad sequence:', sequence);
                continue;
            }

            // Extract duration
            var durationEl = linearCreative.getElementsByTagName('Duration')[0];
            var duration = durationEl ? (durationEl.textContent || durationEl.innerText).trim() : '00:00:00';

            // Extract media files
            var mediaFiles = linearCreative.getElementsByTagName('MediaFile');
            var selectedMedia = this.selectBestMediaFile(mediaFiles);

            if (!selectedMedia) {
                console.warn('No suitable media file found for ad sequence:', sequence);
                continue;
            }

            // Extract tracking events
            var trackingEvents = this.extractTrackingEvents(linearCreative);

            // Merge extension tracking events if any
            var extensionTracking = this.extractExtensionTracking(inLine);
            for (var eventName in extensionTracking) {
                if (extensionTracking.hasOwnProperty(eventName)) {
                    if (!trackingEvents[eventName]) {
                        trackingEvents[eventName] = [];
                    }
                    trackingEvents[eventName] = trackingEvents[eventName].concat(extensionTracking[eventName]);
                }
            }

            // Extract impressions
            var impressions = this.extractImpressions(inLine);

            // Extract error URLs
            var errorUrls = this.extractErrorUrls(inLine);

            // Extract click tracking
            var clickThrough = this.extractClickThrough(linearCreative);
            var clickTracking = this.extractClickTracking(linearCreative);

            // Extract ad title
            var adTitle = this.extractAdTitle(inLine);

            // Check if the ad is skippable by looking for the 'skipoffset' attribute in the 'Linear' element
            var skipOffset = linearCreative.getAttribute('skipoffset');
            var isSkippableAd = skipOffset && skipOffset !== 'notsupported';

            // Initialize variable for the skip time
            var skipButtonTime = null;

            // If skipoffset is in seconds (e.g., "00:00:10")
            if (isSkippableAd && skipOffset.indexOf(':') !== -1) {
                skipButtonTime = this.parseTimeToSeconds(skipOffset);
            }

            // If skipoffset is in percentage (e.g., "50%")
            else if (isSkippableAd && skipOffset.indexOf('%') !== -1) {
                var percentage = parseFloat(skipOffset);
                if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                    // Calculate the skip time based on percentage of total ad duration
                    var totalDurationSeconds = this.parseDuration(duration);
                    skipButtonTime = Math.floor((percentage / 100) * totalDurationSeconds);
                }
            }

            adPod.push({
                sequence: parseInt(sequence, 10),
                title: adTitle,
                duration: duration,
                durationSeconds: this.parseDuration(duration),
                mediaFile: selectedMedia,
                trackingEvents: trackingEvents,
                impressions: impressions,
                errorUrls: errorUrls,
                clickThrough: clickThrough,
                clickTracking: clickTracking,
                isSkippableAd: isSkippableAd,
                skipButtonTime: skipButtonTime // Time (in seconds) when the skip button should be shown
            });
        }

        // Sort by sequence
        adPod.sort(function (a, b) {
            return a.sequence - b.sequence;
        });

        console.log('Found ' + adPod.length + ' ads in pod');

        return {
            ads: adPod,
            totalAds: adPod.length
        };
    };
    // Parse VMAP XML
    this.parseVMAP = function (vmapXML, callback) {
        var self = this;
        console.log('Parsing VMAP XML');

        // Reset ad breaks
        this.adBreaks = {
            preroll: [],
            midroll: [],
            postroll: []
        };

        // Parse XML (compatible with Chrome 38)
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(vmapXML, 'text/xml');

        var adBreaks = xmlDoc.getElementsByTagName('vmap:AdBreak');
        if (adBreaks.length === 0) {
            adBreaks = xmlDoc.getElementsByTagName('AdBreak'); // Try without namespace
        }

        if (adBreaks.length === 0) {
            console.log('No ad breaks found in VMAP');
            if (callback) callback(true);
            return;
        }

        // Process all ad breaks synchronously, just registering them without fetching VAST
        for (var i = 0; i < adBreaks.length; i++) {
            var adBreak = adBreaks[i];
            var timeOffset = adBreak.getAttribute('timeOffset');
            var breakType = adBreak.getAttribute('breakType');
            var breakId = adBreak.getAttribute('breakId') || 'break_' + i;
            var adTagURI = this.getAdTagURI(adBreak);

            if (adTagURI) {
                // Register the ad break without fetching VAST (lazy)
                var breakData = {
                    timeOffset: timeOffset,
                    breakType: breakType,
                    breakId: breakId,
                    vastUrl: adTagURI,
                    ads: [], // Will be populated when fetched
                    totalAds: 0,
                    fetched: false // Mark as not fetched yet
                };

                // Categorize ad breaks
                if (timeOffset === 'start') {
                    this.adBreaks.preroll.push(breakData);
                } else if (timeOffset === 'end') {
                    this.adBreaks.postroll.push(breakData);
                } else if (timeOffset.indexOf('%') !== -1 || timeOffset.indexOf(':') !== -1) {
                    breakData.timeOffsetSeconds = this.parseTimeOffset(timeOffset);
                    this.adBreaks.midroll.push(breakData);
                }
            }
        }

        console.log('VMAP parsed successfully (lazy):', this.adBreaks);
        if (callback) callback(true);
    };

    // Extract VAST URL from ad break
    this.getAdTagURI = function (adBreak) {
        var adSource = adBreak.getElementsByTagName('vmap:AdSource')[0] || adBreak.getElementsByTagName('AdSource')[0];
        if (adSource) {
            var adTagURI = adSource.getElementsByTagName('vmap:AdTagURI')[0] || adSource.getElementsByTagName('AdTagURI')[0];
            if (adTagURI) {
                return (adTagURI.textContent || adTagURI.innerText).trim();
            }
        }
        return null;
    };

    // Parse time offset to seconds
    this.parseTimeOffset = function (timeOffset) {
        if (timeOffset.indexOf('%') !== -1) {
            return parseFloat(timeOffset.replace('%', ''));
        } else if (timeOffset.indexOf(':') !== -1) {
            var parts = timeOffset.split(':');
            var seconds = 0;
            for (var i = 0; i < parts.length; i++) {
                seconds = seconds * 60 + parseFloat(parts[i]);
            }
            return seconds;
        }
        return parseFloat(timeOffset);
    };

    // Get summary of ad breaks
    this.getAdBreaksSummary = function () {
        var prerollCount = 0;
        var midrollCount = 0;
        var postrollCount = 0;

        for (var i = 0; i < this.adBreaks.preroll.length; i++) {
            prerollCount += this.adBreaks.preroll[i].totalAds;
        }
        for (var j = 0; j < this.adBreaks.midroll.length; j++) {
            midrollCount += this.adBreaks.midroll[j].totalAds;
        }
        for (var k = 0; k < this.adBreaks.postroll.length; k++) {
            postrollCount += this.adBreaks.postroll[k].totalAds;
        }

        return {
            preroll: prerollCount,
            midroll: midrollCount,
            postroll: postrollCount,
            total: prerollCount + midrollCount + postrollCount,
            prerollBreaks: this.adBreaks.preroll.length,
            midrollBreaks: this.adBreaks.midroll.length,
            postrollBreaks: this.adBreaks.postroll.length
        };
    };

    // Fetch and parse VAST to get ad pod
    this.fetchAndParseVAST = function (vastUrl, callback) {
        var self = this;
        // vastUrl =''
        var xhr = new XMLHttpRequest();
        xhr.open('GET', vastUrl, true);
        xhr.timeout = 10000;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        var vastData = self.parseVAST(xhr.responseText);
                        callback(vastData);
                    } catch (error) {
                        console.error('Error parsing VAST:', error);
                        callback(null);
                    }
                } else {
                    console.error('Failed to fetch VAST:', xhr.status);
                    callback(null);
                }
            }
        };

        xhr.onerror = function () {
            callback(null);
        };

        xhr.ontimeout = function () {
            callback(null);
        };

        xhr.send();
    };

    // Parse VAST XML and extract all ads in the pod (sequence-1, sequence-2, etc.)
    this.parseVAST = function (vastXML) {
        console.log('Parsing VAST XML for ad pods');

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(vastXML, 'text/xml');

        var ads = xmlDoc.getElementsByTagName('Ad');
        var adPod = [];

        for (var i = 0; i < ads.length; i++) {
            var ad = ads[i];
            var sequence = ad.getAttribute('sequence') || (i + 1);

            var inLine = ad.getElementsByTagName('InLine')[0];
            if (!inLine) {
                // Try Wrapper
                var wrapper = ad.getElementsByTagName('Wrapper')[0];
                if (wrapper) {
                    console.warn('VAST Wrapper detected, this implementation requires InLine ads');
                    continue;
                }
                continue;
            }

            var creatives = inLine.getElementsByTagName('Creative');
            var linearCreative = null;

            // Find Linear creative
            for (var j = 0; j < creatives.length; j++) {
                var linear = creatives[j].getElementsByTagName('Linear')[0];
                if (linear) {
                    linearCreative = linear;
                    break;
                }
            }

            if (!linearCreative) {
                console.warn('No Linear creative found for ad sequence:', sequence);
                continue;
            }

            // Extract duration
            var durationEl = linearCreative.getElementsByTagName('Duration')[0];
            var duration = durationEl ? (durationEl.textContent || durationEl.innerText).trim() : '00:00:00';

            // Extract media files
            var mediaFiles = linearCreative.getElementsByTagName('MediaFile');
            var selectedMedia = this.selectBestMediaFile(mediaFiles);

            if (!selectedMedia) {
                console.warn('No suitable media file found for ad sequence:', sequence);
                continue;
            }

            // Extract tracking events
            var trackingEvents = this.extractTrackingEvents(linearCreative);

            // Merge extension tracking events if any
            var extensionTracking = this.extractExtensionTracking(inLine);
            for (var eventName in extensionTracking) {
                if (extensionTracking.hasOwnProperty(eventName)) {
                    if (!trackingEvents[eventName]) {
                        trackingEvents[eventName] = [];
                    }
                    trackingEvents[eventName] = trackingEvents[eventName].concat(extensionTracking[eventName]);
                }
            }

            // Extract impressions
            var impressions = this.extractImpressions(inLine);

            // Extract error URLs
            var errorUrls = this.extractErrorUrls(inLine);

            // Extract click tracking
            var clickThrough = this.extractClickThrough(linearCreative);
            var clickTracking = this.extractClickTracking(linearCreative);

            // Extract ad title
            var adTitle = this.extractAdTitle(inLine);

            // Check if the ad is skippable by looking for the 'skipoffset' attribute in the 'Linear' element
            var skipOffset = linearCreative.getAttribute('skipoffset');
            var isSkippableAd = skipOffset && skipOffset !== 'notsupported';

            // Initialize variable for the skip time
            var skipButtonTime = null;

            // If skipoffset is in seconds (e.g., "00:00:10")
            if (isSkippableAd && skipOffset.indexOf(':') !== -1) {
                skipButtonTime = this.parseTimeToSeconds(skipOffset);
            }

            // If skipoffset is in percentage (e.g., "50%")
            else if (isSkippableAd && skipOffset.indexOf('%') !== -1) {
                var percentage = parseFloat(skipOffset);
                if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
                    // Calculate the skip time based on percentage of total ad duration
                    var totalDurationSeconds = this.parseDuration(duration);
                    skipButtonTime = Math.floor((percentage / 100) * totalDurationSeconds);
                }
            }

            adPod.push({
                sequence: parseInt(sequence, 10),
                title: adTitle,
                duration: duration,
                durationSeconds: this.parseDuration(duration),
                mediaFile: selectedMedia,
                trackingEvents: trackingEvents,
                impressions: impressions,
                errorUrls: errorUrls,
                clickThrough: clickThrough,
                clickTracking: clickTracking,
                isSkippableAd: isSkippableAd,
                skipButtonTime: skipButtonTime // Time (in seconds) when the skip button should be shown
            });
        }

        // Sort by sequence
        adPod.sort(function (a, b) {
            return a.sequence - b.sequence;
        });

        console.log('Found ' + adPod.length + ' ads in pod');

        return {
            ads: adPod,
            totalAds: adPod.length
        };
    };

    // Helper function to parse time string (MM:SS) to seconds
    this.parseTimeToSeconds = function (timeString) {
        var timeParts = timeString.split(':');
        var minutes = parseInt(timeParts[0], 10) || 0;
        var seconds = parseInt(timeParts[1], 10) || 0;
        return (minutes * 60) + seconds;
    };


    // Select best media file from available options
    this.selectBestMediaFile = function (mediaFiles) {
        var selectedMedia = null;
        // var preferredTypes = ['video/mp4', 'video/x-mp4'];
        var preferredTypes = ['1920'];


        // First try to find MP4
        for (var i = 0; i < mediaFiles.length; i++) {
            var mediaFile = mediaFiles[i];
            var type = mediaFile.getAttribute('width');

            for (var j = 0; j < preferredTypes.length; j++) {
                if (type && type.indexOf(preferredTypes[j]) !== -1) {
                    var url = (mediaFile.textContent || mediaFile.innerText).trim();
                    if (url) {
                        selectedMedia = {
                            url: url,
                            type: type,
                            width: mediaFile.getAttribute('width'),
                            height: mediaFile.getAttribute('height'),
                            bitrate: mediaFile.getAttribute('bitrate')
                        };
                        return selectedMedia;
                    }
                }
            }
        }

        // If no MP4 found, take first available
        if (!selectedMedia && mediaFiles.length > 0) {
            var firstMedia = mediaFiles[0];
            var url = (firstMedia.textContent || firstMedia.innerText).trim();
            if (url) {
                selectedMedia = {
                    url: url,
                    type: firstMedia.getAttribute('type'),
                    width: firstMedia.getAttribute('width'),
                    height: firstMedia.getAttribute('height'),
                    bitrate: firstMedia.getAttribute('bitrate')
                };
            }
        }

        return selectedMedia;
    };

    // Parse duration string (HH:MM:SS) to seconds
    this.parseDuration = function (duration) {
        var parts = duration.split(':');
        var seconds = 0;
        for (var i = 0; i < parts.length; i++) {
            seconds = seconds * 60 + parseFloat(parts[i]);
        }
        return seconds;
    };

    // Extract ad title
    this.extractAdTitle = function (inLine) {
        var adTitle = inLine.getElementsByTagName('AdTitle')[0];
        if (adTitle) {
            return (adTitle.textContent || adTitle.innerText).trim();
        }
        return 'Advertisement';
    };

    // Extract tracking events from VAST
    this.extractTrackingEvents = function (linear) {
        var tracking = {};
        var trackingEventsEl = linear.getElementsByTagName('TrackingEvents')[0];

        if (trackingEventsEl) {
            var trackingElements = trackingEventsEl.getElementsByTagName('Tracking');

            for (var i = 0; i < trackingElements.length; i++) {
                var trackingEl = trackingElements[i];
                var event = trackingEl.getAttribute('event');
                var url = (trackingEl.textContent || trackingEl.innerText).trim();

                if (event && url) {
                    if (!tracking[event]) {
                        tracking[event] = [];
                    }
                    tracking[event].push(url);
                }
            }
        }

        return tracking;
    };

    // Extract Impression URLs from VAST
    this.extractImpressions = function (inLine) {
        var impressions = [];
        var impressionEls = inLine.getElementsByTagName('Impression');
        for (var i = 0; i < impressionEls.length; i++) {
            var url = (impressionEls[i].textContent || impressionEls[i].innerText).trim();
            if (url) {
                impressions.push(url);
            }
        }
        return impressions;
    };

    // Extract Extension tracking events from VAST
    this.extractExtensionTracking = function (inLine) {
        var tracking = {};
        var extensionsEl = inLine.getElementsByTagName('Extensions')[0];
        if (extensionsEl) {
            var extensionEls = extensionsEl.getElementsByTagName('Extension');
            for (var i = 0; i < extensionEls.length; i++) {
                var ext = extensionEls[i];
                var trackingEls = ext.getElementsByTagName('Tracking');
                for (var j = 0; j < trackingEls.length; j++) {
                    var trackingEl = trackingEls[j];
                    var event = trackingEl.getAttribute('event');
                    var url = (trackingEl.textContent || trackingEl.innerText).trim();
                    if (event && url) {
                        if (!tracking[event]) {
                            tracking[event] = [];
                        }
                        tracking[event].push(url);
                    }
                }
            }
        }
        return tracking;
    };

    // Extract Error URLs from VAST
    this.extractErrorUrls = function (container) {
        var errors = [];
        var errorEls = container.getElementsByTagName('Error');
        for (var i = 0; i < errorEls.length; i++) {
            var url = (errorEls[i].textContent || errorEls[i].innerText).trim();
            if (url) {
                errors.push(url);
            }
        }
        return errors;
    };

    // Extract click through URL
    this.extractClickThrough = function (linear) {
        var videoClicks = linear.getElementsByTagName('VideoClicks')[0];
        if (videoClicks) {
            var clickThrough = videoClicks.getElementsByTagName('ClickThrough')[0];
            if (clickThrough) {
                return (clickThrough.textContent || clickThrough.innerText).trim();
            }
        }
        return null;
    };

    // Extract click tracking URLs
    this.extractClickTracking = function (linear) {
        var clickTracking = [];
        var videoClicks = linear.getElementsByTagName('VideoClicks')[0];

        if (videoClicks) {
            var clickTrackingEls = videoClicks.getElementsByTagName('ClickTracking');
            for (var i = 0; i < clickTrackingEls.length; i++) {
                var url = (clickTrackingEls[i].textContent || clickTrackingEls[i].innerText).trim();
                if (url) {
                    clickTracking.push(url);
                }
            }
        }

        return clickTracking;
    };

    // Play preroll ad pod
    this.playPrerollAd = function (breakIndex, callbacks) {
        console.log('Playing preroll ad pod at index:', breakIndex);
        if (this.adBreaks.preroll[breakIndex]) {
            this.playAdPod(this.adBreaks.preroll[breakIndex], 'preroll', callbacks);
        } else {
            console.error('Invalid preroll break index:', breakIndex);
            if (callbacks && callbacks.onError) {
                callbacks.onError('Invalid break index');
            }
        }
    };

    // Play midroll ad pod
    this.playMidrollAd = function (breakIndex, callbacks) {
        console.log('Playing midroll ad pod at index:', breakIndex);
        if (this.adBreaks.midroll[breakIndex]) {
            this.playAdPod(this.adBreaks.midroll[breakIndex], 'midroll', callbacks);
        } else {
            console.error('Invalid midroll break index:', breakIndex);
            if (callbacks && callbacks.onError) {
                callbacks.onError('Invalid break index');
            }
        }
    };

    // Play postroll ad pod
    this.playPostrollAd = function (breakIndex, callbacks) {
        console.log('Playing postroll ad pod at index:', breakIndex);
        if (this.adBreaks.postroll[breakIndex]) {
            this.playAdPod(this.adBreaks.postroll[breakIndex], 'postroll', callbacks);
        } else {
            console.error('Invalid postroll break index:', breakIndex);
            if (callbacks && callbacks.onError) {
                callbacks.onError('Invalid break index');
            }
        }
    };

    // Play ad pod (sequence of ads)
    this.playAdPod = function (adBreak, adType, callbacks) {
        var self = this;
        callbacks = callbacks || {};

        // Pause main video
        if (this.mainVideoElement) {
            this.mainVideoElement.pause();
        }

        // Create currentAdPod object. If the adBreak hasn't been fetched yet, fetch lazily
        // before starting playback so we don't fetch all VASTs up-front.
        var setupAndPlay = function () {
            self.currentAdPod = {
                adBreak: adBreak,
                ads: adBreak.ads,
                type: adType,
                callbacks: callbacks,
                onProgress: callbacks.onProgress
            };

            self.currentAdIndex = 0;

            if (callbacks.onPodStart) {
                callbacks.onPodStart(adBreak.ads.length);
            }

            // Start playing first ad in pod
            self.playNextAdInPod();
        };

        // If ads are not yet populated for this break, fetch the VAST now (lazy)
        if (!adBreak.fetched || !adBreak.ads || adBreak.ads.length === 0) {
            this.ensureAdBreakFetched(adBreak, function (success) {
                if (success) {
                    setupAndPlay();
                } else {
                    console.error('Failed to load ad pod before playback');
                    if (callbacks && callbacks.onError) callbacks.onError('Failed to load ad pod');
                }
            });
        } else {
            setupAndPlay();
        }
    };

    // Play next ad in current pod
    this.playNextAdInPod = function () {
        var self = this;

        if (!this.currentAdPod) {
            return;
        }

        if (this.currentAdIndex < this.currentAdPod.ads.length) {
            Main.playerHideLoading();
            var currentAd = this.currentAdPod.ads[this.currentAdIndex];
            if (Yup("#play-but").css("display") == "block") {
                Yup("#play-but").css("display", "none");
            }
            console.log('Playing ad ' + (this.currentAdIndex + 1) + ' of ' + this.currentAdPod.ads.length);
            console.log('Ad sequence:', currentAd.sequence, 'Title:', currentAd.title);

            // Show ad video element
            this.adVideoElement.style.display = 'block';
            if (typeof Main !== 'undefined' && Main.ShowLoading) {
                Main.ShowLoading();
            }
            this.adVideoElement.src = currentAd.mediaFile.url;

            // Fire impression tracking
            if (currentAd.impressions && currentAd.impressions.length > 0) {
                console.log('Firing impressions for ad:', currentAd.title);
                for (var j = 0; j < currentAd.impressions.length; j++) {
                    this.fireTrackingPixel(currentAd.impressions[j]);
                }
            }

            // Fire start tracking for this ad
            this.fireTrackingEvents('start', currentAd.trackingEvents);
            this.fireTrackingEvents('creativeView', currentAd.trackingEvents);
            
            // Fire show_ad extension tracking if exists
            this.fireTrackingEvents('show_ad', currentAd.trackingEvents);

            if (this.currentAdPod.callbacks.onAdStart) {
                this.currentAdPod.callbacks.onAdStart(this.currentAdIndex, this.currentAdPod.ads.length, currentAd);
            }
        } else {
            // All ads in pod completed
            this.onAdPodComplete();
        }
    };

    // Handle single ad completion
    this.onAdComplete = function () {
        if (this.currentAdPod) {
            var currentAd = this.currentAdPod.ads[this.currentAdIndex];

            // Fire complete tracking for this ad
            this.fireTrackingEvents('complete', currentAd.trackingEvents);

            if (this.currentAdPod.callbacks.onAdComplete) {
                this.currentAdPod.callbacks.onAdComplete(this.currentAdIndex, this.currentAdPod.ads.length, currentAd);
            }

            // Move to next ad in pod
            this.currentAdIndex++;
            this.playNextAdInPod();
        }
    };

    // Handle entire ad pod completion
    this.onAdPodComplete = function () {
        console.log('Ad pod completed');

        if (this.currentAdPod && this.currentAdPod.callbacks.onPodComplete) {
            this.currentAdPod.callbacks.onPodComplete();
        }

        // hide overlay and do not auto-open controls
        hideAdPodUI();
        resetAdControlsState();
        // restore main content and resume playback quietly
        this.cleanupAd();
        this.cleanupAdVideo();
    };


    // Handle ad error
    this.onAdError = function (error) {
        console.error('Ad playback error:', error);

        if (this.currentAdPod) {
            var currentAd = this.currentAdPod.ads[this.currentAdIndex];

            // Fire error tracking
            this.fireTrackingEvents('error', currentAd.trackingEvents);

            if (currentAd.errorUrls && currentAd.errorUrls.length > 0) {
                for (var k = 0; k < currentAd.errorUrls.length; k++) {
                    var errorUrl = currentAd.errorUrls[k].replace('[ERRORCODE]', '405'); // 405 = Linear ad playback error
                    this.fireTrackingPixel(errorUrl);
                }
            }

            if (this.currentAdPod.callbacks.onAdError) {
                this.currentAdPod.callbacks.onAdError(error, this.currentAdIndex, currentAd);
            }

            // Try to play next ad in pod
            this.currentAdIndex++;
            this.playNextAdInPod();
        } else {
            this.cleanupAd();
            this.cleanupAdVideo()
        }
    };

    // Cleanup after ad pod
    this.cleanupAd = function () {
        this.adVideoElement.style.display = 'none';
        this.adVideoElement.src = '';
        this.isAdPlaying = false;
        this.currentAdPod = null;
        this.currentAdIndex = 0;

        // Resume main video
        if (this.mainVideoElement) {
            this.mainVideoElement.play();
        }
    };

    // Fire tracking events
    this.fireTrackingEvents = function (eventType, trackingEvents) {
        if (trackingEvents && trackingEvents[eventType]) {
            for (var i = 0; i < trackingEvents[eventType].length; i++) {
                var trackingUrl = trackingEvents[eventType][i];
                this.fireTrackingPixel(trackingUrl);
            }
        }
    };

    // Fire tracking pixel
    this.fireTrackingPixel = function (url) {
        var img = new Image();
        img.src = url;
        console.log('Fired tracking pixel:', url);
    };

    // Skip current ad in pod
    this.skipCurrentAd = function () {
        if (this.isAdPlaying && this.currentAdPod) {
            console.log('Skipping current ad in pod');

            var currentAd = this.currentAdPod.ads[this.currentAdIndex];
            this.fireTrackingEvents('skip', currentAd.trackingEvents);

            // Move to next ad
            this.currentAdIndex++;
            this.playNextAdInPod();
        }
    };

    // Skip entire ad pod
    this.skipAdPod = function () {
        if (this.isAdPlaying && this.currentAdPod) {
            console.log('Skipping entire ad pod');
            analytics.plugin.handleAdSkipped({ adType: this.currentAdPod.type });
            this.onAdPodComplete();
        }
    };

    // Get current ad progress
    this.getAdProgress = function () {
        if (this.isAdPlaying && this.adVideoElement.duration && this.currentAdPod) {
            var currentAd = this.currentAdPod.ads[this.currentAdIndex];
            return {
                currentAdIndex: this.currentAdIndex,
                totalAds: this.currentAdPod.ads.length,
                currentTime: this.adVideoElement.currentTime,
                duration: this.adVideoElement.duration,
                percentage: (this.adVideoElement.currentTime / this.adVideoElement.duration) * 100,
                adTitle: currentAd.title,
                adSequence: currentAd.sequence
            };
        }
        return null;
    };

    // Destroy ad manager
    this.destroy = function () {
        if (this.adVideoElement) {
            this.adVideoElement.pause();
            this.adVideoElement.src = '';
            if (this.adVideoElement.parentNode) {
                this.adVideoElement.parentNode.removeChild(this.adVideoElement);
            }
        }

        this.adBreaks = { preroll: [], midroll: [], postroll: [] };
        this.currentAdPod = null;
        this.currentAdIndex = 0;
        this.isAdPlaying = false;

        console.log('Ad manager destroyed');
    };

    // Pause only the current ad
    this.pauseCurrentAd = function () {
        if (this.isAdPlaying && this.adVideoElement && !this.adVideoElement.paused) {
            try {
                this.adVideoElement.pause();
                console.log('Ad paused');
            } catch (e) {
                console.warn('Failed to pause ad:', e);
            }
        }
    };

    // Play only the current ad
    this.playCurrentAd = function () {
        if (this.adVideoElement && this.adVideoElement.paused) {
            try {
                this.adVideoElement.play();
                console.log('Ad resumed');
            } catch (e) {
                console.warn('Failed to play ad:', e);
            }
        }
    };

    // Toggle pause/play for the current ad
    this.toggleCurrentAdPlayPause = function () {
        if (!this.adVideoElement) return;

        try {
            if (this.adVideoElement.paused) {
                this.adVideoElement.play();
                console.log('Ad resumed (toggle)');
            } else {
                this.adVideoElement.pause();
                console.log('Ad paused (toggle)');
            }
        } catch (e) {
            console.warn('Failed to toggle ad play/pause:', e);
        }
    };

}


function playPrerollAdPods() {
    var currentBreakIndex = 0;
    var totalBreaks = adsManager.adBreaks.preroll.length;
    Main.playerHideLoading()
    function playNextPrerollBreak() {
        if (currentBreakIndex < totalBreaks) {
            var adBreak = adsManager.adBreaks.preroll[currentBreakIndex];
            console.log('Playing preroll break ' + (currentBreakIndex + 1) + ' with ' + adBreak.totalAds + ' ads');

            adsManager.playPrerollAd(currentBreakIndex, {
                onPodStart: function (totalAds) {
                    analytics.plugin.handleAdStarted({ adType: adBreak.breakId });
                    Main.playerHideLoading();
                    console.log('Preroll pod started with ' + totalAds + ' ads');
                    // Show ad pod UI
                    ShakaPlayer.hidePlayerDetails();
                    if (presentPagedetails.isCaptionsEnable == true) {
                        Yup('.captions_data').css('display', 'none');
                    }
                    showAdPodUI(totalAds, 'preroll');
                    // ShakaPlayer.showPlayerAdControls();

                },
                onAdStart: function (adIndex, totalAds, adData) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    console.log('Ad ' + (adIndex + 1) + ' of ' + totalAds + ' started');
                    console.log('Ad Title:', adData.title);
                    console.log('Ad Sequence:', adData.sequence);
                    console.log('Ad Duration:', adData.duration);
                    // Update UI to show current ad number
                    updateAdCounter(adIndex + 1, totalAds);
                },
                onProgress: function (percentage, adIndex, totalAds, adData, currentTime) {
                    // remaining time = total duration – current time
                    var remaining = (adData && typeof adData.durationSeconds === 'number')
                        ? (adData.durationSeconds - currentTime)
                        : null;

                    // Update counter text like "Ad 1 of 6 : (0:02)"
                    if (remaining !== null) {
                        updateAdCounter(adIndex + 1, totalAds, remaining);
                    } else {
                        updateAdCounter(adIndex + 1, totalAds);
                    }

                    // Update progress bar
                    updateAdProgressBar(percentage);
                    // console.log('onProgress-->',percentage)
                    if (Math.floor(percentage) > 25 && adData.trackingEvents['firstQuartile']) {
                        adsManager.fireTrackingEvents('firstQuartile', adData.trackingEvents)
                        delete adData.trackingEvents['firstQuartile']
                    } else if (Math.floor(percentage) > 50 && adData.trackingEvents['midpoint']) {
                        adsManager.fireTrackingEvents('midpoint', adData.trackingEvents)
                        delete adData.trackingEvents['midpoint']
                    } else if (Math.floor(percentage) > 75 && adData.trackingEvents['thirdQuartile']) {
                        adsManager.fireTrackingEvents('thirdQuartile', adData.trackingEvents)
                        delete adData.trackingEvents['thirdQuartile']
                    }
                },
                onAdComplete: function (adIndex, totalAds, adData) {
                    console.log('Ad ' + (adIndex + 1) + ' of ' + totalAds + ' completed');
                },
                onPodComplete: function () {
                    analytics.plugin.handleAdCompleted({ adType: adBreak.breakId });
                    console.log('Preroll pod ' + (currentBreakIndex + 1) + ' completed');
                    currentBreakIndex++;
                    playNextPrerollBreak(); // Play next preroll break or start content
                },
                onAdError: function (error, adIndex, adData) {
                    console.error('Error playing ad ' + (adIndex + 1) + ':', error);
                    // Continue to next ad automatically
                }
            });
        } else {
            // All preroll breaks completed, start main content
            hideAdPodUI();
            startMainContent();
        }
    }

    playNextPrerollBreak();
}


function removeAdContainer() {
    var adContainer = document.getElementById('ad-container');
    if (adContainer && adContainer.parentNode) {
        adContainer.parentNode.removeChild(adContainer);
        console.log('ad-container removed');
    } else {
        console.log('ad-container not found');
    }
}
function startMainContent() {
    // Load your main content
    // removeAdContainer()
    // hideAdPodUI()
    console.log("Main content Loading")
    // _shaka.load(presentPagedetails.steamResponse.streams[0].url, 0).then(function () {
 _shaka.load(presentPagedetails.steamResponse.streams[0].url).then(function () {
        // _shaka.load("httpmarkerType://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8").then(function() {
        console.log('Main content loaded');
        setupMidrollTriggers();
        video.play();
        if ((Yup("#playerBtn").length > 0)) {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#playerBtn").addClass("imageFocus");
        }
    }).catch(function (error) {
        console.error('Error loading content:', error);
    });
}

function setupMidrollTriggers() {
    var midrollBreaks = adsManager.adBreaks.midroll;
    var triggeredMidrolls = [];

    video.addEventListener('timeupdate', function () {
        try {
            var currentTime = video.currentTime;
        } catch (e) { console.log(e) }
        // console.log(currentTime)
        // Find the closest untriggered midroll that matches currentTime
        for (var i = 0; i < midrollBreaks.length; i++) {
            var midroll = midrollBreaks[i];
            var triggerTime = calculateTriggerTime(midroll);

            // Allow a small window (e.g., 1 second) for triggering
            var triggerWindow = 300;

            // Only trigger if within the window and not already triggered
            if (
                currentTime >= triggerTime &&
                currentTime < triggerTime + triggerWindow &&
                triggeredMidrolls.indexOf(midroll.breakId) === -1
            ) {
                triggeredMidrolls.push(midroll.breakId);
                ShakaPlayer.pause();
                Yup("#play-but").hide();
                adsManager.setupAdEventListeners();
                playMidrollAdPod(i);
                break; // Only trigger one ad break at a time
            } else if (currentTime > (triggerTime + triggerWindow)) {
                triggeredMidrolls.push(midroll.breakId);
            }
        }
    });
}


// Calculate trigger time for midroll (percentage or time-based)
function calculateTriggerTime(midroll) {
    if (midroll.timeOffset.indexOf('%') !== -1) {
        // Percentage-based trigger
        var percentage = parseFloat(midroll.timeOffset.replace('%', ''));
        return (video.duration * percentage) / 100;
    } else {
        // Time-based trigger
        return midroll.timeOffsetSeconds;
    }
}

// Play midroll ad pod
function playMidrollAdPod(breakIndex) {
    var midrollBreak = adsManager.adBreaks.midroll[breakIndex];
    console.log('Triggering midroll break at time:', video.currentTime);
    console.log('Midroll has ' + midrollBreak.totalAds + ' ads');
    Yup('.imageFocus').removeClass('imageFocus')
    adsManager.playMidrollAd(breakIndex, {
        onPodStart: function (totalAds) {
            if (Yup("#play-but").css("display") == "block") {
                Yup("#play-but").css("display", "none");
            }
            analytics.plugin.handleAdStarted({ adType: midrollBreak.breakId });
            Yup('.imageFocus').removeClass('imageFocus');
            if (presentPagedetails.isCaptionsEnable == true) {
                Yup('.captions_data').css('display', 'none');
            }
            console.log('Midroll pod started with ' + totalAds + ' ads');
            ShakaPlayer.hidePlayerDetails();

            showAdPodUI(totalAds, 'midroll');
            showPlayerAdControls();
        },
        onAdStart: function (adIndex, totalAds, adData) {
            if (Yup("#play-but").css("display") == "block") {
                Yup("#play-but").css("display", "none");
            }
            console.log('Midroll ad ' + (adIndex + 1) + ' of ' + totalAds + ' started');
            console.log('Ad Title:', adData.title);
            updateAdCounter(adIndex + 1, totalAds);
        },
        onProgress: function (percentage, adIndex, totalAds, adData, currentTime) {
            // remaining time for current ad
            var remaining = (adData && typeof adData.durationSeconds === 'number')
                ? (adData.durationSeconds - currentTime)
                : null;

            if (remaining !== null) {
                updateAdCounter(adIndex + 1, totalAds, remaining);
            } else {
                updateAdCounter(adIndex + 1, totalAds);
            }

            updateAdProgressBar(percentage);
            // console.log("onProgress",currentTime)
            //  console.log('onProgress-->',percentage)
            if (currentTime > adData.skipButtonTime && !!adData.isSkippableAd) {
                Yup('#skip-ad-button').css('display', 'block')
                Yup('#skip-ad-button').addClass('imageFocus')
            }
            if (Math.floor(percentage) > 25 && adData.trackingEvents['firstQuartile']) {
                adsManager.fireTrackingEvents('firstQuartile', adData.trackingEvents)
                delete adData.trackingEvents['firstQuartile']
            } else if (Math.floor(percentage) > 50 && adData.trackingEvents['midpoint']) {
                adsManager.fireTrackingEvents('midpoint', adData.trackingEvents)
                delete adData.trackingEvents['midpoint']
            } else if (Math.floor(percentage) > 75 && adData.trackingEvents['thirdQuartile']) {
                adsManager.fireTrackingEvents('thirdQuartile', adData.trackingEvents)
                delete adData.trackingEvents['thirdQuartile']
            }
        },
        onAdComplete: function (adIndex, totalAds, adData) {
            console.log('Midroll ad ' + (adIndex + 1) + ' completed');
        },
        onPodComplete: function () {
            analytics.plugin.handleAdCompleted({ adType: midrollBreak.breakId });
            console.log('Midroll pod completed, resuming content');
            hideAdPodUI();
            // ShakaPlayer.playOrPause()
            playPauseHandleForAds();
            Yup("#seekbar").addClass("imageFocus");
            // Main _shaka will resume automatically
        },
        onAdError: function (error, adIndex, adData) {
            console.error('Midroll ad error:', error);
            hideAdPodUI();
            // ShakaPlayer.playOrPause()
            playPauseHandleForAds();
            Yup("#seekbar").addClass("imageFocus");
        }
    });
}

// Play postroll when main content ends
// video.addEventListener('ended', function() {
//     var postrollBreaks = adsManager.adBreaks.postroll;

//     if (postrollBreaks.length > 0) {
//         playPostrollAdPods();
//     } else {
//         // No postroll ads, show end screen or replay options
//         showEndScreen();
//     }
// });

// Function to play all postroll ad pods
function playPostrollAdPods() {
    var currentBreakIndex = 0;
    var totalBreaks = adsManager.adBreaks.postroll.length;

    function playNextPostrollBreak() {
        if (currentBreakIndex < totalBreaks) {
            var adBreak = adsManager.adBreaks.postroll[currentBreakIndex];
            console.log('Playing postroll break ' + (currentBreakIndex + 1) + ' with ' + adBreak.totalAds + ' ads');

            adsManager.playPostrollAd(currentBreakIndex, {
                onPodStart: function (totalAds) {
                    Main.playerHideLoading();
                    analytics.plugin.handleAdStarted({ adType: adBreak.breakId });
                    console.log('Postroll pod started with ' + totalAds + ' ads');
                    ShakaPlayer.hidePlayerDetails();

                    showAdPodUI(totalAds, 'postroll');
                    showPlayerAdControls();
                },
                onAdStart: function (adIndex, totalAds, adData) {
                    console.log('Postroll ad ' + (adIndex + 1) + ' of ' + totalAds + ' started');
                    updateAdCounter(adIndex + 1, totalAds);
                },
                onProgress: function (percentage, adIndex, totalAds, adData, currentTime) {
                    var remaining = (adData && typeof adData.durationSeconds === 'number')
                        ? (adData.durationSeconds - currentTime)
                        : null;

                    if (remaining !== null) {
                        updateAdCounter(adIndex + 1, totalAds, remaining);
                    } else {
                        updateAdCounter(adIndex + 1, totalAds);
                    }

                    updateAdProgressBar(percentage);
                },

                onAdComplete: function (adIndex, totalAds, adData) {
                    console.log('Postroll ad ' + (adIndex + 1) + ' completed');
                },
                onPodComplete: function () {
                    analytics.plugin.handleAdCompleted({ adType: adBreak.breakId });
                    console.log('Postroll pod ' + (currentBreakIndex + 1) + ' completed');
                    currentBreakIndex++;
                    playNextPostrollBreak(); // Play next postroll break or show end screen
                },
                onAdError: function (error, adIndex, adData) {
                    console.error('Postroll ad error:', error);
                }
            });
        } else {
            // All postroll breaks completed
            hideAdPodUI();
            showEndScreen();
        }
    }

    playNextPostrollBreak();
}

// ====== UI Helper Functions (NO PROGRESS BAR) ======
function showAdPodUI(totalAds, adType) {
    var adOverlay = document.getElementById('ad-overlay');
    if (!adOverlay) {
        adOverlay = document.createElement('div');
        adOverlay.id = 'ad-overlay';
        adOverlay.style.position = 'absolute';
        adOverlay.style.top = '0';
        adOverlay.style.left = '0';
        adOverlay.style.width = '100%';
        adOverlay.style.height = '100%';
        adOverlay.style.zIndex = '1001';
        adOverlay.style.pointerEvents = 'none'; // we drive focus via keys, not mouse
        adOverlay.style.fontFamily = 'Arial, sans-serif';

        var adContainer = document.getElementById('ad-container');
        if (adContainer) {
            adContainer.appendChild(adOverlay);
        } else {
            console.error('ad-container element not found.');
            return;
        }
    }

    adOverlay.innerHTML = `
    <div class="player-bg ad-player-ui">
      <!-- dark gradient over video when controls visible -->
      <div class="ad-gradient-layer"></div>

      <!-- TOP LEFT: BACK ICON -->
      <div class="top-left-icons" id="ad-top-left-icon">
        <div class="control_items" type="back" source="ad-back" id="ad-btn-back">
          <img src="images/Player-Back.png" class="default"  id="ad_player_back" source="player_back">
          <img src="images/Back_Focused.png" class="focused" id="ad_player_back_focused" source="player_back">
          <div class="icon_name focused"></div>
        </div>
      </div>

      <!-- BOTTOM LEFT: PLAY / PAUSE ICON -->
      <div class="ad_bottom_icons" id="ad-bottom-left-icon">
        <div class="play_pause player_play" source="ad_player_icon" id="ad-playerBtn">
          <div class="icon_name play_selected_icon"></div>
          <div class="icon_name pause_selected_icon"></div>

          <img src="images/Play.png"             class="play_default_icon">
          <img src="images/playbtn_focused.png"  class="play_selected_icon">
          <img src="images/Pause.png"            class="pause_default_icon">
          <img src="images/pausebtn_focused.png" class="pause_selected_icon">
        </div>
      </div>

      <!-- AD TEXT + SKIP -->
      <div id="ad-counter" class="ad-counter">Ad 1 of ${totalAds} : (0:00)</div>
      <button id="skip-ad-button" class="ad-skip-btn" source="ad-container" style="display:none;">
        Skip Ad
      </button>
    </div>
`;

    adOverlay.style.display = 'block';
    resetAdControlsState();
    // First time pod UI shows → show controls and focus play/pause
    showAdControls();
}


// Format seconds -> M:SS  (0:02 style)
function formatAdTime(seconds) {
    if (typeof seconds !== 'number' || isNaN(seconds)) return '0:00';
    seconds = Math.max(0, Math.floor(seconds));
    var m = Math.floor(seconds / 60);
    var s = seconds % 60;
    return m + ':' + (s < 10 ? ('0' + s) : s);
}

// currentAd = 1-based index, totalAds, remainingSeconds (optional)
function updateAdCounter(currentAd, totalAds, remainingSeconds) {
    var adCounter = document.getElementById('ad-counter');
    if (!adCounter) return;

    if (typeof remainingSeconds === 'number') {
        var t = formatAdTime(remainingSeconds);
        adCounter.textContent = 'Ad ' + currentAd + ' of ' + totalAds + ' : (' + t + ')';
    } else {
        adCounter.textContent = 'Ad ' + currentAd + ' of ' + totalAds;
    }
}

// No-op so existing calls don’t break
function updateAdProgressBar(percentage) {
    // intentionally empty – no visual progress bar
}

function hideAdPodUI() {
    var adOverlay = document.getElementById('ad-overlay');
    if (adOverlay) {
        adOverlay.style.display = 'none';
    }
    hideAdControls(); // ensure gradient/flags cleared
}
// ====== END UI HELPERS ======

// ====== END UI HELPERS ======



// function updateAdCounter(currentAd, totalAds) {
//     var adCounter = document.getElementById('ad-counter');
//     if (adCounter) {
//         adCounter.textContent = 'Ad ' + currentAd + ' of ' + totalAds;
//     }
// }

// function updateAdProgressBar(percentage) {
//     var progressFill = document.getElementById('ad-progress-fill');
//     if (progressFill) {
//         progressFill.style.width = percentage + '%';
//     }
// }

// function hideAdPodUI() {
//     var adOverlay = document.getElementById('ad-overlay');
//     if (adOverlay) {
//         adOverlay.style.display = 'none';
//     }
// }


function showPlayerAdControls() {
    // delegate to shared ad control logic
    showAdControls();
};

function ensureAdDefaultFocus() {
    if (!window.adsManager || !adsManager.isAdPlaying) return;

    var $focus = Yup('.imageFocus');

    if (!$focus || $focus.length === 0) {
        // If skip button is visible, prefer that
        if (Yup('#skip-ad-button').length && Yup('#skip-ad-button').css('display') !== 'none') {
            $focus = Yup('#skip-ad-button');
        } else {
            $focus = Yup('#ad-playerBtn');
        }

        if ($focus && $focus.length) {
            $focus.addClass('imageFocus');
        }
    }
}

/**
* Show ad controls.
* - `force` (boolean) : when true, force-open controls (user action).
* - When false/undefined, function will respect adControlsAutoEnabled flag (default: do not auto-open).
*/
function showAdControls(force) {
    // defensive: ensure adsManager exists and an ad is playing
    if (!window.adsManager || !adsManager.isAdPlaying) return;

    // default boolean guard for force param (in case callers pass weird values)
    var doForce = !!force;

    // If not forced and auto-show is disabled, only refresh hide timer and prepare focus
    // (do not open controls visually).
    if (!doForce && adControlsAutoEnabled === false) {
        // Keep hide timer active so subsequent user actions close properly
        resetAdControlsHideTimer();

        // Prepare focus candidates but do not forcibly set focus class:
        ensureAdDefaultFocus();

        // exit without toggling visual UI (prevents auto-show on ad start)
        return;
    }

    // At this point either forced by user or auto-show is allowed.
    adControlsVisible = true;

    try {
        // reveal gradient/controls area and icon containers
        Yup('.ad-player-ui').addClass('ad-controls-visible');
        Yup('.ad-player-ui .top-left-icons, .ad-player-ui .ad_bottom_icons')
            .css('display', 'block');
    } catch (e) {
        console.warn('showAdControls: failed to apply ad UI classes', e);
    }

    try {
        // clear previous focus markers and set default play/pause focus if present
        Yup('.imageFocus').removeClass('imageFocus');

        if (Yup('#ad-playerBtn').length) {
            Yup('#ad-playerBtn').addClass('imageFocus');
        } else {
            // fall back to skip button if visible
            var $skip = Yup('#skip-ad-button');
            if ($skip.length && $skip.css('display') !== 'none') {
                $skip.addClass('imageFocus');
            }
        }
    } catch (e) {
        // non-fatal — continue
        console.warn('showAdControls focus handling failed', e);
    }

    // ensure default focus/selection exists and setup hide timer
    ensureAdDefaultFocus();
    resetAdControlsHideTimer();
}


function hideAdControls() {
    adControlsVisible = false;
    try {
        Yup('.ad-player-ui').removeClass('ad-controls-visible');
        Yup('.ad-player-ui .top-left-icons, .ad-player-ui .ad_bottom_icons')
            .css('display', 'none');
    } catch (e) { }
}



function resetAdControlsHideTimer() {
    if (adControlsHideTimer) {
        clearTimeout(adControlsHideTimer);
        adControlsHideTimer = null;
    }

    if (!window.adsManager || !adsManager.isAdPlaying) return;

    adControlsHideTimer = setTimeout(function () {
        hideAdControls();
    }, AD_CONTROLS_HIDE_MS);
}

/**
* Toggle ad play/pause and sync icon classes.
* Uses CustomAdsManager.toggleCurrentAdPlayPause().
*/
function toggleAdPlayPause() {
    if (!window.adsManager || !adsManager.adVideoElement) return;

    var btn = Yup('#ad-playerBtn');
    var video = adsManager.adVideoElement;

    try {
        if (video.paused) {
            video.play();
            btn.removeClass('player_pause').addClass('player_play');
        } else {
            video.pause();
            btn.removeClass('player_play').addClass('player_pause');
        }
    } catch (e) {
        console.warn('toggleAdPlayPause failed', e);
    }
}




// ---- Helpers: time/duration and seek handling ----

// return current player time in seconds (guarded)
function getCurrentPlayerTimeSec() {
    try {
        var t = ShakaPlayer && ShakaPlayer.videoElement && typeof ShakaPlayer.videoElement.currentTime === 'number'
            ? ShakaPlayer.videoElement.currentTime : (ShakaPlayer.curretTime || 0);
        return Number(t) || 0;
    } catch (e) {
        return Number(ShakaPlayer.curretTime || 0) || 0;
    }
}

// Ensure ShakaPlayer.duration gets populated once metadata arrives, and then re-check preview trigger
function ensureDurationAndRecheckPreview() {
    try {
        var vid = ShakaPlayer && ShakaPlayer.videoElement;
        var d = Number(ShakaPlayer.duration) || 0;
        if (d > 0) return;

        // if video element has duration now, use it and re-run update
        if (vid && typeof vid.duration === 'number' && !isNaN(vid.duration) && vid.duration > 0) {
            ShakaPlayer.duration = vid.duration;
            ShakaPlayer.update_seekbar_run_width(getCurrentPlayerTimeSec());
            return;
        }

        // attach one-time listeners to populate duration when available
        var once = function () {
            try { vid.removeEventListener('loadedmetadata', once); } catch (e) { }
            try { vid.removeEventListener('durationchange', once); } catch (e) { }
            if (vid && typeof vid.duration === 'number' && !isNaN(vid.duration) && vid.duration > 0) {
                ShakaPlayer.duration = vid.duration;
            }
            // re-evaluate preview immediately
            ShakaPlayer.update_seekbar_run_width(getCurrentPlayerTimeSec());
        };
        if (vid && !vid._hasDurationListener) {
            vid._hasDurationListener = true;
            vid.addEventListener('loadedmetadata', once);
            vid.addEventListener('durationchange', once);
        }
    } catch (e) {
        console.warn('ensureDurationAndRecheckPreview error', e);
    }
}

// attach a seek handler once to reset preview dismissal if user seeks back
function attachSeekHandlerToReenablePreview() {
    try {
        var vid = ShakaPlayer && ShakaPlayer.videoElement;
        if (!vid || vid._hasPreviewSeekHandler) return;
        vid._hasPreviewSeekHandler = true;

        vid.addEventListener('seeked', function () {
            try {
                var cur = getCurrentPlayerTimeSec();

                // If user seeks back sufficiently before recorded start, allow preview again
                if (nextVideoPreviewStartTime !== null && cur < (nextVideoPreviewStartTime - 1)) {
                    nextVideoPreview = false;
                    nextVideoPreviewDismissed = false;
                }

                // Always re-evaluate preview eligibility after a user seek
                ShakaPlayer.update_seekbar_run_width(cur);
            } catch (e) {
                console.warn('seek handler failed', e);
            }
        });
    } catch (e) {
        console.warn('attachSeekHandlerToReenablePreview error', e);
    }
}

function playPauseHandleForAds() {
    var btn = Yup('#playerBtn');
    if (!btn || !btn.length) return;

    // Clear all play/pause UI states
    btn.removeClass('player_pause player_play');
    btn.addClass('player_play');

    // Ensure focus is restored
    Yup('.imageFocus').removeClass('imageFocus');
    btn.addClass('imageFocus');

    ShakaPlayer.playerState = 'playing';
    Yup('#play-but').hide();
    if (presentPagedetails.isCaptionsEnable == true) {
        Yup('.captions_data').css('display', 'block');
    }
}
function resetAdControlsState() {
    adControlsVisible = false;

    if (adControlsHideTimer) {
        clearTimeout(adControlsHideTimer);
        adControlsHideTimer = null;
    }

    try {
        Yup('.ad-player-ui').removeClass('ad-controls-visible');
        Yup('.ad-player-ui .top-left-icons, .ad-player-ui .ad_bottom_icons')
            .css('display', 'none');
        Yup('.imageFocus').removeClass('imageFocus');
    } catch (e) { }
}
