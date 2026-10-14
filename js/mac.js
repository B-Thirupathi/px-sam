(function (window) {
    function handleVisibilityChange(isHidden) {
        if (view == "upiPaymentPage") {
            if (isHidden) {
                if (Util.upiTimerInterval) {
                    clearInterval(Util.upiTimerInterval);
                    Util.upiTimerInterval = null;
                }
                if (!!postpaidBillListener) {
                    clearTimeout(postpaidBillListener);
                    postpaidBillListener = null;
                }
            } else {
                if (Util.upiPageExpired || (Util.upiExpirationTimestamp && Date.now() >= Util.upiExpirationTimestamp)) {
                    if (typeof Util !== "undefined" && typeof Util.showUpiExpiredState === "function") {
                        Util.showUpiExpiredState();
                    }
                } else if (Util.upiExpirationTimestamp) {
                    var remainingSec = Math.ceil((Util.upiExpirationTimestamp - Date.now()) / 1000);
                    if (remainingSec <= 0) {
                        if (typeof Util !== "undefined" && typeof Util.showUpiExpiredState === "function") {
                            Util.showUpiExpiredState();
                        }
                    } else {
                        var popupData = Util.upiPaymentData || Main.upiPopupData;
                        if (typeof Util !== "undefined" && typeof Util.startUpiCountdown === "function") {
                            Util.startUpiCountdown(popupData, remainingSec);
                        }
                        var addBillID = (Main.upiAddBillID !== undefined) ? Main.upiAddBillID : (Main.popupData && Main.popupData.addBillID);
                        if (addBillID !== undefined && typeof Main.directStatusToPlansPostPaid === "function") {
                            Main.directStatusToPlansPostPaid(addBillID);
                        }
                    }
                }
            }
        }
        else if (view == "player") {
            if (isHidden) {
                analytics.plugin.handlePlayEndedByUser();
                ShakaPlayer.pause();
                if (Yup("#play-but").css("display") == "block") {
                    document.getElementById("play-but").style.setProperty("display", "none", "important");
                }
            }
            else {
                try {
                    analytics.setMetaData(presentPagedetails.steamResponse.streams[0].url);
                    analytics.plugin.thumbnailVideoClick();
                    analytics.plugin.handlePlayerLoad();
                }
                catch (e) { }

                try {
                    var isAdPlaying =
                        typeof window.adsManager !== 'undefined' &&
                        adsManager &&
                        adsManager.isAdPlaying === true;
                    if (isAdPlaying) {
                        return;
                    }
                }
                catch (e) { }

                ShakaPlayer.play();
                if (Yup("#playerBtn").hasClass('player_pause') && Yup("#play-but").css("display") == "none") {
                    Yup('.imageFocus').removeClass('player_pause');
                    Yup('.imageFocus').addClass('player_play');
                }
            }
        }
        else if (Yup(".expand-active").length > 0) {
            var expandedCard = Yup(".expand-active");
            var previewVideo = expandedCard.find("video.preview-video")[0];
            var liImage = expandedCard.find(".expand-liimage");
            var id = expandedCard.attr("id");

            if (isHidden) {
                liImage.css("opacity", "1");
                if (previewVideo) {
                    previewVideo.pause();
                    previewVideo.src = "";
                    previewVideo.load();
                    previewVideo.remove();
                }
            } else {
                var splitData = id.split("-");
                var vIndex = parseInt(splitData[1]);
                var hIndex = parseInt(splitData[2]);

                if (presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[vIndex] &&
                    presentPagedetails.sections[vIndex].sectionData && presentPagedetails.sections[vIndex].sectionData.data[hIndex]) {

                    var itemData = presentPagedetails.sections[vIndex].sectionData.data[hIndex];
                    var trailerPath = itemData.target.path;
                    var playStreamType = itemData.target.pageAttributes.trailerStreamType;

                    if (Yup("#" + id).hasClass("expand-active")) {
                        Main.expandPreviewtrailerGetStream(trailerPath, vIndex, hIndex, playStreamType);

                        // Ensure liimage is visible and small poster is hidden immediately
                        // to avoid the 1s blank screen/glitch while AJAX is loading
                        expandedCard.find(".shows-image > img:not(.partner_logo_inner)").css("opacity", "0");
                        expandedCard.find(".expand-liimage").css("opacity", "1");
                    }
                }
            }
        }
    }

    if (window.tizen) {
        document.addEventListener('visibilitychange', function () {
            handleVisibilityChange(document.visibilityState === "hidden");
        });
    }
    else if (window.webos) {
        var hidden = "hidden", visibilityChange = "visibilitychange";

        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        document.addEventListener(visibilityChange, function () {
            handleVisibilityChange(!!document[hidden]);
        });
    }
    else {
        var hidden = "hidden", visibilityChange = "visibilitychange";

        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        document.addEventListener(visibilityChange, function () {
            handleVisibilityChange(!!document[hidden]);
        });
    }
})(this);
