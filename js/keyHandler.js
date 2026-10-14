var keyHandlar = {};
var itisStartover = false;
var disBingelist = false;
var comingToSign = false;
var playerTargerpath = '';
var isSearching = false;
var navigatingfavToDetails = false;
var navigatFavListToDetails = false;
var liveVideo;
var apiCallTimeout;
var exitPopupShow = false;
var clicked = false;
var SEEK_DISABLE_LAST_SECONDS = 10;
var currentSlideIndex = 0;
keyHandlar.lastPreviewKey = 0;
keyHandlar.previewTimer = null;
keyHandlar.previewImageChangeTimer = null;
keyHandlar.expandDelayTimer = null;
keyHandlar.currentPreviewCard = null;
keyHandlar.navLock = false;
keyHandlar.isHD = (window.innerWidth === 1280);
var leftRightCardCounts = [
    { 'cardType': "sheet_poster", 'small': 4, 'large': 4, 'smallleft': 275, 'largeleft': 420 },
    { 'cardType': "roller_poster", 'small': 7, 'large': 7, 'smallleft': 185, 'largeleft': 280 },
    { 'cardType': "top10_poster", 'small': 7, 'large': 7, 'smallleft': 190, 'largeleft': 460 },
    { 'cardType': "top10_movies_poster", 'small': 7, 'large': 7, 'smallleft': 245, 'largeleft': 367 },
    { 'cardType': "search-card", 'small': 4, 'large': 4, 'smallleft': 282, 'largeleft': 420 },
    { 'cardType': "overlay_poster", 'small': 4, 'large': 4, 'smallleft': 273, 'largeleft': 435 }, //437
    { 'cardType': "player-card", 'small': 4, 'large': 4, 'smallleft': 275, 'largeleft': 420 },
    { 'cardType': "expand_roller_poster", 'small': 7, 'large': 7, 'smallleft': 188, 'largeleft': 280 },
    { 'cardType': "square_poster", 'small': 7, 'large': 7, 'smallleft': 187, 'largeleft': 280 },
    { 'cardType': "circle_poster", 'small': 7, 'large': 7, 'smallleft': 153, 'largeleft': 220 },
    { 'cardType': "content_poster", 'small': 4, 'large': 4, 'smallleft': 273, 'largeleft': 420 },
    { 'cardType': "continue_watching_poster", 'small': 4, 'large': 4, 'smallleft': 275, 'largeleft': 424 },
    { 'cardType': "roller_poster_2", 'small': 7, 'large': 7, 'smallleft': 185, 'largeleft': 280 },
    { 'cardType': "sheet_poster_2", 'small': 4, 'large': 4, 'smallleft': 351, 'largeleft': 532 },
    { 'cardType': "expand_preview_poster", 'small': 4, 'large': 4, 'smallleft': 227, 'largeleft': 340 },
    { 'cardType': "show_card", 'small': 4, 'large': 4, 'smallleft': 281, 'largeleft': 420 },
    { 'cardType': "floating_rail", 'small': 7, 'large': 7, 'smallleft': 215, 'largeleft': 322 },
    { 'cardType': "top10_overlay_poster", 'small': 7, 'large': 7, 'smallleft': 418, 'largeleft': 623 },

];
var gridViewCardCount = [
    { 'cardType': "sheet_poster", 'small': 4, 'large': 4 },
    { 'cardType': "roller_poster", 'small': 6, 'large': 6 },
    { 'cardType': "search-card", 'small': 4, 'large': 4 },
    { 'cardType': "overlay_poster", 'small': 4, 'large': 4 },
    { 'cardType': "player-card", 'small': 4, 'large': 4 },
    { 'cardType': "expand_roller_poster", 'small': 6, 'large': 6 },
    { 'cardType': "square_poster", 'small': 6, 'large': 6 },
    { 'cardType': "circle_poster", 'small': 6, 'large': 6 },
    { 'cardType': "content_poster", 'small': 4, 'large': 4 },
    { 'cardType': "sheet_poster_2", 'small': 3, 'large': 3 },
    { 'cardType': "expand_preview_poster", 'small': 5, 'large': 5 },
    { 'cardType': "show_card", 'small': 6, 'large': 6 },
    { 'cardType': "floating_rail", 'small': 5, 'large': 5 },
    { 'cardType': "top10_overlay_poster", 'small': 5, 'large': 5 },
];
var bannerScrollListner;
var bannerPreviewToken = undefined;
var refreshHome = false;
//content and list page ENTER key handular
keyHandlar.contentEnterHandlar = function (id, source) {
    keyHandlar.stopPreviewTrailers();
    var source = Yup('.imageFocus').attr("source");
    commingFromMenus = false;
    if (utilities.validateString(source) == false) {
        source = Yup('#' + id).attr("source");
    }
    if (source == "signUpBtn") {
        view = "signin";
        Main.processNext();
    }
    var userDetails = localStorage.getItem("userDetails");
    var classname = Yup('.imageFocus').attr("class");
    var cardType = Yup('.imageFocus').attr("cardType");
    var substring = 'view_all';
    var splitData = id.split('-');
    if (!userDetails && cardType != "circle_poster" && cardType != "square_poster" && classname.indexOf(substring) == -1 && source != 'menus') {
        if (!userDetails && (source == "sections" || source == 'bannerBtn' || source == 'cards')) {
            presentPagedetails.clickedCard = id
            if (source == 'bannerBtn') {
                ctEvent.comingFromExit = "";
                var splIds = id.split('-');
                var selected_targetSign = Yup('#bannerImage-' + splIds[1]).attr("targetpath");
                clevertapservice.sendCleverTapEvent('registration page viewed', {
                    'tab': ctEvent.tabName,
                    'source': 'top banner',
                    'source details': "",
                    'content name': presentPagedetails.banners[parseInt(splIds[1])].title ? presentPagedetails.banners[parseInt(splIds[1])].title : "",
                    'content partner name': presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.networkName ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.networkName : "",
                    'content model': presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.payType == "P" ? 'svod' : 'avod',
                    'content tag': presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.payType == "P" ? "paid" : "free",
                    'content type': presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.mediaContentType ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.mediaContentType : "",
                })
            }
            else if (source == "sections" || source == 'cards') {
                ctEvent.comingFromExit = "";
                var selected_targetSign = Yup('#' + id).attr("targetpath");
                if (view != 'search' && view != 'list') {
                    clevertapservice.sendCleverTapEvent('registration page viewed', {
                        'tab': ctEvent.tabName,
                        'source': "carousel",
                        'source details': presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : "",
                        'content name': presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName : presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentName,
                        'content partner name': presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName : '',
                        'content model': presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P" ? 'svod' : 'avod',
                        'content tag': presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P" ? 'paid' : 'free',
                        'content type': presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType : '',
                    })
                }
                if (view == 'search' && presentPagedetails.searchResults.length > 0) {
                    ctEvent.comingFromExit = "";
                    clevertapservice.sendCleverTapEvent('registration page viewed', {
                        'tab': ctEvent.tabName,
                        'source': "search",
                        'source details': 'search',
                        'content name': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.tvShowName : "",
                        'content partner name': !!presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.networkName : "",
                        'content model': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'svod' : 'avod',
                        'content tag': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'paid' : 'free',
                        'content type': !!presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentType : "",

                    })
                }
                if (view == 'list') {
                    clevertapservice.sendCleverTapEvent('registration page viewed', {
                        'tab': ctEvent.tabName,
                        'source': "carousel",
                        'source details': 'view all',
                        'content name': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : "",
                        'content partner name': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName : "",
                        'content model': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'svod' : 'avod',
                        'content tag': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'paid' : 'free',
                        'content type': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType : "",

                    })
                } else if (view == 'search' && presentPagedetails.searchResults.length == 0) {
                    ctEvent.comingFromExit = "";
                    clevertapservice.sendCleverTapEvent('registration page viewed', {
                        'tab': ctEvent.tabName,
                        'source': "carousel",
                        'source details': 'trending search',
                        'content name': presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName,
                        'content partner name': presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName : "",
                        'content model': presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P" ? 'svod' : 'avod',
                        'content tag': presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P" ? 'paid' : 'free',
                        'content type': presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType : ''

                    })
                }
            }
            localStorage.setItem('selected_targetSign', selected_targetSign)
            //clevertapProfilepage appeared event
            profilesPageAppeared.profilesPageAppearedSource = "content click"
            profilesPageAppeared.profilesPagePageName = 'number submission'
            view = 'signin'
            Main.processNext();

        }
    }
    else if (source == 'menus') {
        keyHandlar.stopPreviewTrailers();
        keyHandlar.menuKeyEnterHandular(id);
    }

    else if (source == 'bannerBtn') {
        ctEvent.comingFromExit = "";
        isComingFromBanners = true;
        ctEvent.itemForTrailer = "top banner"
        var activeBanner = Yup(".active-banner").attr("id");
        var splIds = activeBanner.split("-")
        presentPagedetails.clickedBannerPosition = splIds[1]
        var targetPath = Yup('#bannerImage-' + splIds[1]).attr("targetpath");
        var planId = "";
        var gateway = "";
        if (targetPath && targetPath.includes("?")) {
            var queryString = targetPath.split("?")[1];
            var params = new URLSearchParams(queryString);

            planId = params.get("planId");
            gateway = params.get("gateway");

            console.log("Plan ID:", planId);
            console.log("Gateway:", gateway);
        }

        var isGatewayBlocked = false;
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (gateway && gateway.toLowerCase() === "sdpse") {
            if (userDetails) {
                if (userDetails.userCategory == 1) {
                    isGatewayBlocked = true;
                }
                else if (userDetails.userCategory == 3) {
                    isGatewayBlocked = true;
                }
                 else if (userDetails.userCategory == 2 && userDetails.attributes) {
                    var uType = userDetails.attributes.userType ? userDetails.attributes.userType.toUpperCase() : "";
                    var uStatus = userDetails.attributes.userStatus ? userDetails.attributes.userStatus.toUpperCase() : "";
                    if (uType === "SECONDARY" || uStatus === "SUSPENDED" || uType === "COCP") {
                        isGatewayBlocked = true;
                    }
                }
            }
        }

        if (targetPath && targetPath.indexOf("gateway=") !== -1 && !isGatewayBlocked) {
            var plansData = null;

            try {
                var rawData = systemConfigs.configs.tvappPlansPage;

                if (typeof rawData === "string") {
                    plansData = JSON.parse(rawData);
                } else if (typeof rawData === "object" && rawData !== null) {
                    plansData = rawData;
                    presentPagedetails.cancelText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel';
                    presentPagedetails.confirmText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm';

                } else {
                    plansData = {};
                }
            } catch (e) {
                console.error("Error while parsing tvappPlansPage:", e);
                plansData = {};
            }
            if (plansData) {
                presentPagedetails.cancelText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel';
                presentPagedetails.confirmText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm';
            }
            Main.popupData = {
                popuptype: 'bannerAddPostpaidBill',
                message: plansData && plansData.confirmation_popup && plansData.confirmation_popup.title ? plansData.confirmation_popup.title : 'You will be charged in your upcoming postpaid bill.',
                message2: plansData && plansData.confirmation_popup && plansData.confirmation_popup.description ? plansData.confirmation_popup.description : 'Confirm to start the selected subscription now.',
                buttonCount: 2,
                noTarget: 'billClose',
                noText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel',
                yesText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm',
                yesTarget: 'bannersAddToBill',
                onBack: 'close',
                bannersAddBillID: planId,
                bannersAddBillGateway: gateway

            }
            Yup("#popUpFDFS").html(Util.postpaidPlansConfirmation());
            Yup("#popup-btn-1").addClass('popupFocus');
            if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                var sourceDetailsPop = ctEvent.topBanner
            }
            else {
                var sourceDetailsPop = ctEvent.carouselName
            }
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'popup displayed',
                'label': 'postpaid confirmation',
                'popup name': 'postpaid confirmation',
                'button label': '',
                'source': "carousel",
                'source details': "top banner",
                'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
                // 'tab':ctEvent.tabName,  
            })
            clevertapservice.sendCleverTapEvent('subscription page appeared', {
                'tab': ctEvent && ctEvent.tabName,
                'source': "top banner",
                'page name': 'postpaid confirmation'
            })
            // var btnElement = Yup('#' + id + ' button');
            // var btnActionText = btnElement.length > 0 ? btnElement.text() : '';

            //     clevertapservice.sendCleverTapEvent('subscription page clicked', {
            //     'page name': 'pro subscription',
            //     'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
            //     'action':presentPagedetails && presentPagedetails.btnTitle ? presentPagedetails.btnTitle : "Add to Bill",
            //     'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
            //     'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : "" 
            // })
            // clevertapservice.sendCleverTapEvent('subscription page appeared', {
            //     'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
            //     'page name': 'postpaid confirmation',
            //     'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
            //     'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : "" 
            // })
        } 
         else if (targetPath && (targetPath === "plans/list" || targetPath.indexOf("plans/list") !== -1)) {
            localStorage.setItem('clickedCardForPostPaid', targetPath)
           Main.addToPlansPostPaid("", false, targetPath);
        } 
        else {
            Main.apiCall(targetPath);
        }
        Main.ctForTopbanner(splIds);
    }
    else if (source == 'uniqueButtons') {
        view = Yup('#' + id).attr("targetpath");
        if (view == 'signup') {
            tempObjectData.landingFromSettings = true;
        }
        Main.processNext();
    }
    else {
        if (source == "sections" || source == "cards") {
            var userDetails = localStorage.getItem("userDetails");
            if (!userDetails) {
                var selected_targetSign = Yup('#' + id).attr("targetpath");
                if (!!selected_targetSign) {
                    localStorage.setItem('selected_targetSign', selected_targetSign)
                }
            }
            ctEvent.comingFromExit = "";
            var splitData = id.split('-');
            ctEvent.carouselName = '';
            ctEvent.moduleTrackerId = (view != 'search' && presentPagedetails.sections[0].sectionData.myRecoTrackingId ? presentPagedetails.sections[0].sectionData.myRecoTrackingId : "")
            if (view === "list") {
                ctEvent.carouselName = presentPagedetails.sections[0].sectionInfo.name ? presentPagedetails.sections[0].sectionInfo.name : "na";
                if (ctEvent && ctEvent.topBanner) {
                    ctEvent.topBanner = ""
                }
            } else if (view == "search") {
                ctEvent.comingFromExitList = "";
                ctEvent.carouselName = presentPagedetails.trendingSearch.response.data[0].section.sectionInfo.name ? presentPagedetails.trendingSearch.response.data[0].section.sectionInfo.name : 'na'
                if (ctEvent && ctEvent.topBanner) {
                    ctEvent.topBanner = ""
                }
            }
            //  else if(classname.indexOf(substring) !== -1){
            //     ctEvent.carouselName = "na";
            // }
            else if (presentPagedetails.targetPath == "favourites") {
                ctEvent.comingFromExitList = "";
                ctEvent.carouselName = presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : 'na';
                if (ctEvent && ctEvent.topBanner) {
                    ctEvent.topBanner = ""
                }
            } else {
                ctEvent.carouselName = presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : "na";
                ctEvent.comingFromExitList = "";
                if (ctEvent && ctEvent.topBanner) {
                    ctEvent.topBanner = ""
                }
            }
            var classname = Yup('.imageFocus').attr("class");
            var detailsText = Yup('#' + id).text();
            var substring = 'view_all';
            var subscription_clev = '';
            if (classname.indexOf(substring) == -1) {
                ctEvent.explbyNamea = (presentPagedetails.pageSubType == "networkDetails") ? 'partner-' + presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName : "";
            }
            ctEvent.youmayLike = (view != 'search' && !!presentPagedetails.sections[0].sectionData.myRecoTrackingId ? 'recommendations' : "");
            var carP = parseInt(splitData[1]) + 2;
            var contP = parseInt(splitData[2]) + 1;
            ctEvent.carouselPositionn = carP;
            ctEvent.contentPositionss = contP;
            var template = Yup('#' + id).attr("template");
            var carouselPosition = parseInt(splitData[1]) + 2;
            var contentPosition = (parseInt(splitData[2]) + 1);
            presentPagedetails.clickedCard = id
            if (!!userDetails && !!userDetails.packages) {
                subscription_clev = (!!userDetails.packages.length == 0) ? 'no' : 'yes';
            }
            if (classname.indexOf(substring) !== -1) {
                // Handle view all present
                clevertapservice.sendCleverTapEvent('view all clicked', {
                    'subscription': subscription_clev,
                    'pop-up name': '',
                    'carousel position': carouselPosition,
                    'carousel name': ctEvent.carouselName,
                    'tab': presentPagedetails.targetPath
                });
            }
            Main.ctClickEvent(id);
        }

        if (presentPagedetails.templateData && (presentPagedetails.templateData.templateCode == "my_bingelist" || presentPagedetails.templateData.templateCode == "my_bingelist_tvshows")) {
            Yup("#" + presentPagedetails.clickedCard).addClass("imageFocus")
        }
        else {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#' + id).addClass("imageFocus")
        }
        var targetPath = Yup('#' + id).attr("targetpath");
        templateCode = Yup('#' + id).attr("template");
        var temflag = false;
        templateCodeInfo = {};
        if (!!templateCode) {
            if (!!templateList) {
                for (var i = 0; i < templateList.length; i++) {
                    if (templateCode == templateList[i].code) {
                        templateCodeInfo = templateList[i];
                        temflag = true;
                        break;
                    }
                }
            }
            if (!!temflag) {
                keyHandlar.stopPreviewTrailers();
                Main.getTemplateData(templateCode, targetPath, id, source);
                var detailsText = Yup('#' + id).text();
                console.log("popup111")
                Main.ctDammyPopupEvent(id, "popup displayed")
            } else {
                var myobj = document.getElementById("contentTemp");
                if (!!myobj) {
                    myobj.remove();
                }
                if (targetPath == undefined && targetPath == null) {
                    presentPagedetails.templateData = {};
                }
                // isComingFromBanners = false;
                if (presentPagedetails.targetPath == "favourites") {
                    navigatingfavToDetails = true;
                    // if (presentPagedetails.targetPath == "favourites") {
                    keyHandlar.stopPreviewTrailers();
                    Main.apiCall(targetPath);
                    // }
                }
                else {
                    keyHandlar.stopPreviewTrailers();
                    Main.apiCall(targetPath);
                }
            }
        } else {
            var myobj = document.getElementById("contentTemp");
            if (!!myobj) {
                myobj.remove();
            }
            if (targetPath == undefined && targetPath == null) {
                presentPagedetails.templateData = {};
            }
            // isComingFromBanners = false;
            keyHandlar.stopPreviewTrailers();
            Main.apiCall(targetPath);

        }
    }

}

//content and list page Return key handular
keyHandlar.contentReturnHandlar = function () {
    if (presentPagedetails.targetPath != firstMenu) {
        keyHandlar.stopPreviewTrailers();
        Main.previousPage();
        if (isSidemenuOpened == false) {
            Main.sidebarClose();
        } else {
            Main.sidebarClose();
        }
    }
    else {

    }
}

// function card_lazy_preview() {
//     // if (bannerPreviewToken != undefined) {
//     //     clearTimeout(bannerPreviewToken);
//     //     bannerPreviewToken = undefined;
//     // }
//     // bannerPreviewToken = setTimeout(function () {
//     if(presentPagedetails.targetPath != "search"){
//     var focusElementsource = Yup('.imageFocus').attr('source');
//         var id;
//         if (focusElementsource == 'sections' ||focusElementsource == 'menus' ) {
//             id = Yup('.imageFocus').attr("id");
//         }
//         else if (focusElementsource == 'menus') {
//             if (presentPagedetails.currentSection != undefined) {
//                 id = 'sectionItem-' + presentPagedetails.currentSection + '-0';
//             }
//         }
//         if(id != undefined ){
//         var splIds = id.split('-');
//         // bgType = id;
//         // Util.getOverlaySection(id);
//         Yup('.banners').css('display', 'none');
//         Yup('#backgroundPoster').css('display', 'block')
//         if(presentPagedetails.banners.length > 0){ 
//             if(keyHandlar.isHD){
//                 Yup('.sectionsHome').css('margin-top', '333px')
//              }
//              else{
//                 Yup('.sectionsHome').css('margin-top', '500px')     
//              }   
//         }
//        if(focusElementsource != "menus"){
//         Yup('.active-banner-background').css('display', 'none');
//         Yup('.active-banner-background').removeClass('active-banner-background');
//         Yup('#overlaySectionItem-' + splIds[1] + '-' + splIds[2]).css('display', 'block');
//          Yup('#overlaySectionItem-' + splIds[1] + '-' + splIds[2]).addClass('active-banner-background')
//        }
//     }
//     }
// // },0)
// }

function hasBgImage(data) {
    if (!data) return false;
    if (data.is_bg_available !== undefined) return data.is_bg_available;

    var elements =
        (data.display && data.display.elements) ||
        (data.hover && data.hover.elements) ||
        [];

    for (var i = 0; i < elements.length; i++) {
        if (
            elements[i].key === "bgImage" &&
            elements[i].value &&
            typeof elements[i].value === "string" &&
            elements[i].value.trim() !== ""
        ) {
            return true;
        }
    }
    return false;
}

function deBounceFunction(callback, delay) {
    var debounceToken;
    delay = delay || 300;

    return function () {
        if (debounceToken) {
            clearTimeout(debounceToken);
        }
        var args = arguments;
        debounceToken = setTimeout(function () {
            callback.apply(null, args);
        }, delay);
    };
}

keyHandlar.showCardLazyPreview = deBounceFunction(function () {
    card_lazy_preview();
}, 300);

function card_lazy_preview() {
    // if (bannerPreviewToken != undefined) {
    //     clearTimeout(bannerPreviewToken);
    //     bannerPreviewToken = undefined;
    // }
    // bannerPreviewToken = setTimeout(function () {
    if (presentPagedetails.targetPath != "search") {
        var focusElementsource = Yup('.imageFocus').attr('source');
        var id;
        if (focusElementsource == 'sections' || focusElementsource == 'menus') {
            id = Yup('.imageFocus').attr("id");
        }
        else if (focusElementsource == 'menus') {
            if (presentPagedetails.currentSection != undefined) {
                id = 'sectionItem-' + presentPagedetails.currentSection + '-0';
            }
        }
        if (id != undefined) {
            var splIds = id.split('-');
            // bgType = id;
            // Util.getOverlaySection(id);
            Yup('.banners').css('display', 'none');
            Yup('#backgroundPoster').css('display', 'block')

            if (focusElementsource != "menus") {
                Yup('.active-banner-background').css('display', 'none');
                Yup('.active-banner-background').removeClass('active-banner-background');
                var sectionIndex = parseInt(splIds[1], 10);
                var itemIndex = parseInt(splIds[2], 10);
                var cardElement = document.getElementById("sectionItem-" + sectionIndex + '-' + itemIndex);
                var viewAllSource = cardElement.getAttribute('sub_source');
                var data = null;

                if (
                    presentPagedetails &&
                    presentPagedetails.sections &&
                    presentPagedetails.sections[sectionIndex] &&
                    presentPagedetails.sections[sectionIndex].sectionData &&
                    presentPagedetails.sections[sectionIndex].sectionData.data &&
                    presentPagedetails.sections[sectionIndex].sectionData.data[itemIndex]
                ) {
                    data = presentPagedetails.sections[sectionIndex]
                        .sectionData
                        .data[itemIndex];
                }

                if (data && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
                    Util.getOverlaySection(data, id);
                }
                if (viewAllSource && viewAllSource == "view_all") {
                    var section_view_all_data = presentPagedetails.sections[sectionIndex];
                    var first_card_data = (section_view_all_data && section_view_all_data.sectionData && section_view_all_data.sectionData.data) ? section_view_all_data.sectionData.data[0] : null;

                    if (first_card_data && (first_card_data.cardType == "expand_preview_poster" || first_card_data.cardSubType == "tabbed-card")) {
                        // Skip background and overlay for these types
                        Yup("#backgroundPoster").html("");
                        return;
                    } else {
                        Util.getViewallOverlay(sectionIndex, itemIndex);
                    }
                }
                // Yup("#backgroundPoster").html('');
                // Yup("#backgroundPoster").append(presentPagedetails.overlayData);
                var bg = document.getElementById("backgroundPoster");

                if (bg) {
                    bg.innerHTML = presentPagedetails.overlayData;
                }
                presentPagedetails.overlayData = ''
                Yup('#overlaySectionItem-' + splIds[1] + '-' + splIds[2]).css('display', 'block');
                Yup('#overlaySectionItem-' + splIds[1] + '-' + splIds[2]).addClass('active-banner-background')
            }
            if (presentPagedetails.banners.length > 0 && ((data && data.cardType != "show_card") || viewAllSource == "view_all")) {
                if (keyHandlar.isHD) {
                    Yup('.sectionsHome').css('margin-top', '333px')
                }
                else {
                    Yup('.sectionsHome').css('margin-top', '500px')
                }
            }
            else if(data.is_bg_available == true) {
                 if (keyHandlar.isHD) {
                    Yup('.sectionsHome').css('margin-top', '333px')
                }
                else {
                    Yup('.sectionsHome').css('margin-top', '500px')
                } 
            }
        }
    }
    // },0)
}

keyHandlar.callPreviews = function (comingfrom, v_inde, h_inde, data) {
    if (data && (data.cardSubType === "tabbed-card" || data.cardType === "expand_preview_poster" || data.cardType === "show_card" || data.cardType === "floating_rail")) {
        return;
    }
    var userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (!!userDetails) {
        if (presentPagedetails.targetPath != "favourites" && presentPagedetails.subView != "favourites_list" && presentPagedetails.view != "list") {
            if (comingfrom == "sections") {
                var item = presentPagedetails &&
                    presentPagedetails.sections &&
                    presentPagedetails.sections[v_inde] &&
                    presentPagedetails.sections[v_inde].sectionData &&
                    presentPagedetails.sections[v_inde].sectionData.data &&
                    presentPagedetails.sections[v_inde].sectionData.data[h_inde];
                // Set a timeout for 2 seconds
                if (item && item.target && item.target.pageAttributes && item.target.pageAttributes.isTrailerAvailable === "true") {
                    apiCallTimeout = setTimeout(() => {
                        Main.trailerGetStream(
                            comingfrom,
                            item.target.path,
                            v_inde,
                            h_inde,
                            item.target.pageAttributes.trailerStreamType
                        );
                    }, 1000);
                }
                else {
                    var element = document.getElementById('sectionItem-' + v_inde + '-' + h_inde);

                    if (element) {
                        var datasrc = element.getAttribute('data-src');

                        if (datasrc) {
                            apiCallTimeout = setTimeout(function () {
                                keyHandlar.createVideoTag(comingfrom, datasrc, v_inde, h_inde);
                            }, 1000);
                        }
                    }
                }
            }
            // else if(comingfrom == "banners"){
            //     // Set a timeout for 2 seconds
            //         if (presentPagedetails.banners[v_inde].target.pageAttributes.isTrailerAvailable == "true") {
            //             clearInterval(bannerScrollListner)
            //             apiCallTimeout = setTimeout(() => {
            //             Main.trailerGetStream(comingfrom, presentPagedetails.banners[v_inde].target.path, v_inde,presentPagedetails.banners[v_inde].target.pageAttributes.trailerStreamType)
            //         }, 1000); // 2000ms = 2 seconds
            //         } else if (presentPagedetails.banners[v_inde].params.streamUrl != "") {
            //             clearInterval(bannerScrollListner)
            //             apiCallTimeout = setTimeout(() => {
            //             keyHandlar.createVideoTag(comingfrom, (v_inde), presentPagedetails.banners[v_inde].params.streamUrl)
            //         }, 1000); // 1500ms = 1.5 seconds
            //         }
            //         else {
            //             BannerMove();
            //         }

            // }
        }
    }

}


keyHandlar.getSectionItemData = function (presentPagedetails, first, second) {


    if (!presentPagedetails) {
        return null;
    }

    var sectionIndex = first;
    var itemIndex = second

    if (isNaN(sectionIndex) || isNaN(itemIndex)) {
        return null;
    }
    var sections = presentPagedetails.sections;
    if (
        !sections ||
        !sections[sectionIndex] ||
        !sections[sectionIndex].sectionData ||
        !sections[sectionIndex].sectionData.data ||
        !sections[sectionIndex].sectionData.data[itemIndex]
    ) {
        return null;
    }

    return sections[sectionIndex].sectionData.data[itemIndex];
};
keyHandlar.getSectionItemDataUp = function (presentPagedetails, splitData) {
    if (!presentPagedetails || !splitData) {
        return null;
    }

    var sectionIndex = parseInt(splitData[1], 10);
    var itemIndex = parseInt(splitData[2], 10);

    if (isNaN(sectionIndex) || isNaN(itemIndex)) {
        return null;
    }

    // +1 logic
    sectionIndex = sectionIndex - 1;

    var sections = presentPagedetails.sections;
    if (
        !sections ||
        !sections[sectionIndex] ||
        !sections[sectionIndex].sectionData ||
        !sections[sectionIndex].sectionData.data ||
        !sections[sectionIndex].sectionData.data[itemIndex]
    ) {
        return null;
    }

    return sections[sectionIndex].sectionData.data[itemIndex];
};
keyHandlar.getFirstSectionFirstItem = function (presentPagedetails) {
    if (
        !presentPagedetails ||
        !presentPagedetails.sections ||
        !presentPagedetails.sections[0] ||
        !presentPagedetails.sections[0].sectionData ||
        !presentPagedetails.sections[0].sectionData.data ||
        !presentPagedetails.sections[0].sectionData.data[0]
    ) {
        return null;
    }

    return presentPagedetails.sections[0].sectionData.data[0];
};
keyHandlar.settingMarginAndCardTypes = function (data, viewAllSource, forViewAllShowdata) {
    var focusElementId = Yup('.imageFocus').attr('id');
    var splitData = focusElementId.split('-');
    if (((data && data.cardType === "expand_preview_poster") || (viewAllSource === "view_all" && forViewAllShowdata && forViewAllShowdata.cardType === "expand_preview_poster"))) {
        keyHandlar.clearPreviousExpandPreview();
        if (viewAllSource !== "view_all") {
            keyHandlar.handleExpandPreviewFocus(
                splitData[1],
                parseInt(splitData[2]),
                data
            );
            return;
        } else {
            // For view_all on expand_preview_poster rail
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '90px');
            } else {
                Yup(".sectionsHome").css('margin-top', '135px');
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
            return;
        }
    }
    else if (data && data.cardType == "floating_rail") {
        if (presentPagedetails.targetPath != "favourites") {
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '100px')
            }
            else {
                Yup(".sectionsHome").css('margin-top', '150px')
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
    }
    else if (data && data.cardSubType != "tabbed-card" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
        if (data && data.cardType === "show_card") {
            if (presentPagedetails.targetPath != "favourites" && parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                if (keyHandlar.isHD) {
                    Yup(".sectionsHome").css('margin-top', '414px')
                }
                else {
                    Yup(".sectionsHome").css('margin-top', '628px')
                }
                // Yup('.active-banner-background').css('display', 'none');
                // Yup('.active-banner-background').removeClass('active-banner-background');
            }
        }
        else {
            keyHandlar.showCardLazyPreview();
        }
    }
    else if (presentPagedetails.targetPath !== "favourites" && (viewAllSource === "view_all" && hasBgImage(forViewAllShowdata))) {
        card_lazy_preview();
        keyHandlar.stopExpandPreviewTrailers();

        // else{

        // }
        // clearInterval(bannerScrollListner);
    }
    else {
        if (presentPagedetails.targetPath != "favourites") {
            if ((data && data.cardSubType == "tabbed-card") || (viewAllSource === "view_all" && forViewAllShowdata && forViewAllShowdata.cardSubType == "tabbed-card")) {
                if (presentPagedetails.targetPath != "favourites") {
                    // keyHandlar.setSectionsTopOffset("tabbed");
                    Yup('.active-banner-background').css('display', 'none');
                    Yup('.active-banner-background').removeClass('active-banner-background');
                }
                return;
            }
            else {
                // keyHandlar.setSectionsTopOffset("noMeta");
            }

            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
    }

}

keyHandlar.settingMarginUpAndDownForCardTypes = function (data, viewAllSource, forViewAllShowdata) {
    var focusElementId = Yup('.imageFocus').attr('id');
    var splitData = focusElementId.split('-');
    if (data && data.cardSubType && data.cardSubType == "tabbed-card") {
        if (presentPagedetails.targetPath != "favourites" && parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '90px')
            }
            else {
                Yup(".sectionsHome").css('margin-top', '135px')
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
        // if(data.cardSubType == "tabbed-card"){

        // }
        // else{
        //     Yup(".imageFocus").removeClass("imageFocus");
        //     Yup('#tab-' + (parseInt(splitData[1]) - 1) + '-' + 0).addClass('imageFocus');
        // }
    }
    else if ((data && data.cardType === "expand_preview_poster") || (viewAllSource === "view_all" && forViewAllShowdata && forViewAllShowdata.cardType === "expand_preview_poster")) {
        if (presentPagedetails.targetPath != "favourites" && parseInt(splitData[1]) <= presentPagedetails.sections.length - 1) {
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '90px')
            }
            else {
                Yup(".sectionsHome").css('margin-top', '135px')
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
        var id = Yup('.imageFocus').attr("id");
        var splitData = id.split('-');
        keyHandlar.clearPreviousExpandPreview();
        if (viewAllSource !== "view_all") {
            keyHandlar.handleExpandPreviewFocus(
                (parseInt(splitData[1])),
                splitData[2],
                data
            );
        }
    }
    else if (data && data.cardType == "floating_rail") {
        if (presentPagedetails.targetPath != "favourites") {
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '100px')
            }
            else {
                Yup(".sectionsHome").css('margin-top', '150px')
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
    }
    else if (data && (data.cardType !== "expand_preview_poster" || viewAllSource === "view_all") && presentPagedetails.targetPath !== "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
        if (data && data.cardType === "show_card") {
            if (presentPagedetails.targetPath != "favourites" && parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                if (keyHandlar.isHD) {
                    Yup(".sectionsHome").css('margin-top', '414px')
                }
                else {
                    Yup(".sectionsHome").css('margin-top', '628px')
                }
                // Yup('.active-banner-background').css('display', 'none');
                // Yup('.active-banner-background').removeClass('active-banner-background');
            }
        }
        card_lazy_preview();
        keyHandlar.stopExpandPreviewTrailers();

        // else{

        // }
        // clearInterval(bannerScrollListner);
    }
    else if (presentPagedetails.targetPath !== "favourites" && (viewAllSource === "view_all" && hasBgImage(forViewAllShowdata))) {
        card_lazy_preview();
        keyHandlar.stopExpandPreviewTrailers();

        // else{

        // }
        // clearInterval(bannerScrollListner);
    }
    else {
        if (presentPagedetails.targetPath != "favourites") {
            if (keyHandlar.isHD) {
                Yup(".sectionsHome").css('margin-top', '100px')
            }
            else {
                Yup(".sectionsHome").css('margin-top', '150px')
            }
            Yup('.active-banner-background').css('display', 'none');
            Yup('.active-banner-background').removeClass('active-banner-background');
        }
    }

}

keyHandlar.adjustTabScrollByIndex = function (tabEl, tabIndex) {
    if (!tabEl) return;

    var container = tabEl.closest('.tabs_rail').querySelector('ul');
    if (!container) return;

    var visibleCount = 5; // number of tabs visible before scroll starts
    var tabWidth = tabEl.offsetWidth + 24; // include margin-right (24px from CSS)

    if (tabIndex < visibleCount) {
        container.scrollLeft = 0;
        return;
    }

    var scrollIndex = tabIndex - (visibleCount - 1);
    container.scrollLeft = scrollIndex * tabWidth;
};
keyHandlar.previousTabbedPositionFocus = function () {
    if (keyHandlar.previewImageChangeTimer) {
        clearTimeout(keyHandlar.previewImageChangeTimer);
        keyHandlar.previewImageChangeTimer = null;
    }
    if (keyHandlar.trailerEndTimer) {
        clearTimeout(keyHandlar.trailerEndTimer);
        keyHandlar.trailerEndTimer = null;
    }
    if (keyHandlar.previewTimer) {
        clearTimeout(keyHandlar.previewTimer);
        keyHandlar.previewTimer = null;
    }

}
//content page key handular
keyHandlar.contentKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    // keyHandlar.stopPreviewTrailers();
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == 'bannerBtn') {
                var active_banner = Yup('.active-banner').attr("id");
                var splIds = active_banner.split('-');
                if (parseInt(splIds[1]) > 0) {
                    keyHandlar.stopPreviewTrailers();
                    Yup('.active-banner').removeClass('active-banner');
                    Yup('#bannerImage-' + (parseInt(splIds[1]))).css('display', 'none');
                    Yup('#bannerImage-' + (parseInt(splIds[1]) - 1)).css('display', 'block');
                    Yup('#bannerDetails-' + parseInt(splIds[1])).css('display', 'none');
                    Yup('#bannerDetails-' + (parseInt(splIds[1]) - 1)).css('display', 'block');
                    Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) - 1)).css('display', 'block');
                    Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) - 1)).addClass('imageFocus');
                    Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                    Yup('#partner-logo-' + (parseInt(splIds[1]) - 1)).css('display', 'block');
                    Yup('#bannerDetails-' + (parseInt(splIds[1]) - 1)).css('display', 'block');
                    Yup('#bannerBtn-' + (parseInt(splIds[1]) - 1)).addClass('active-banner');
                    // keyHandlar.callPreviews("banners",(parseInt(splIds[1]) - 1))
                }
                else {
                    keyHandlar.stopPreviewTrailers();
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.menu-item.menu-active').addClass('imageFocus');
                    presentPagedetails.currentSection = {};
                    Main.sidebarOpen();
                }
            }
            else if (source == 'signUpBtn') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup(".btn-search").addClass("imageFocus");
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == "tabsSection") {
                var splitData = id.split('-');
                var prevIndex = parseInt(splitData[2]) - 1;
                var prevTabId = "#tab-" + splitData[1] + '-' + prevIndex;
                var $prevTab = Yup(prevTabId);
                if (splitData[2] == 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.menu-item.menu-active').addClass('imageFocus');
                    keyHandlar.stopPreviewTrailers()
                    Main.sidebarOpen();
                }
                else if (Yup("#tab-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).length > 0) {
                    keyHandlar.stopPreviewTrailers();
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tab-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                }
                keyHandlar.previousTabbedPositionFocus(id)
                keyHandlar.adjustTabScrollByIndex($prevTab[0], prevIndex);
            }
            else if (source == "sections") {
                keyHandlar.previousTabbedPositionFocus();
                var splitData = id.split('-');
                if (parseInt(splitData[2]) != 0) {
                    keyHandlar.stopPreviewTrailers()
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]));
                    var parentElement = Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).parent();
                    var parentId = parentElement.attr("id");
                    var currentLeft = Yup("#" + parentId).css('left');
                    if (currentLeft != '40px') {
                        keyHandlar.liveScrollLeft(parseInt(splitData[1]), parseInt(splitData[2]));
                    }
                    var prev_h_inde = parseInt(splitData[2]) - 1;
                    var data = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], prev_h_inde);
                    var cardElement = document.getElementById("sectionItem-" + splitData[1] + '-' + prev_h_inde);
                    var viewAllSource = (cardElement) ? cardElement.getAttribute('sub_source') : '';
                    var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], (parseInt(splitData[2])));

                    keyHandlar.settingMarginAndCardTypes(data, viewAllSource, forViewAllShowdata);
                    // if(data && data.cardSubType != "tabbed-card"){}
                    keyHandlar.callPreviews("sections", splitData[1], prev_h_inde, data)
                    // }
                }
                else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.menu-item.menu-active').addClass('imageFocus');
                    // keyHandlar.stopPreviewTrailers()
                    Main.sidebarOpen();
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                    keyHandlar.addCurrentSection(parseInt(splitData[1]));
                    // var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, parseInt(splitData[1]), parseInt(splitData[2]));
                    // var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');
                    if (data && data.cardType === "expand_preview_poster") {
                        if (typeof keyHandlar.stopExpandPreviewTrailers === "function") {
                            keyHandlar.stopExpandPreviewTrailers();
                        }
                    } else if (data && (data.cardType !== "expand_preview_poster" || viewAllSource === "view_all") && presentPagedetails.targetPath !== "favourites" && (Yup('#' + id).attr('is_bg_available') == 'true')) {
                        // Keep background metadata for menu
                    } else {
                        keyHandlar.settingMarginAndCardTypes(data);
                    }
                }

            }
            else if (source == 'uniqueButtons') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#signin-0").addClass("imageFocus");
                }
            }
            else if (presentPagedetails && presentPagedetails.targetPath == "favourites" && presentPagedetails.sections && presentPagedetails.sections.length == 0) {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup('.menu-item.menu-active').addClass('imageFocus');
                keyHandlar.stopPreviewTrailers()
                Main.sidebarOpen();
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == 'bannerBtn') {
                var active_banner = Yup('.active-banner').attr("id");
                var splIds = active_banner.split('-');
                var bannerBtn = document.getElementById('bannerBtn-' + (parseInt(splIds[1]) + 1));
                if (bannerBtn) {
                    keyHandlar.stopPreviewTrailers();
                    // Function to stop, pause, and destroy the Shaka Player instance
                    var bannerImage = document.getElementById('bannerImage-' + (parseInt(splIds[1]) + 1));
                    if (Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).length > 0) {
                        if (Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).length > 0) {
                            Yup('.active-banner').removeClass('active-banner');
                            Yup('#bannerImage-' + splIds[1]).css('display', 'none');
                            Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#WatchBannerBtn-' + parseInt(splIds[1])).css('display', 'none');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#WatchBannerBtn-' + parseInt(splIds[1])).removeClass('imageFocus');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('imageFocus');
                            Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                            Yup('#partner-logo-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]))).css('display', 'none');
                            // Yup('#bannerTitle-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('active-banner');
                            // keyHandlar.callPreviews("banners", (parseInt(splIds[1]) + 1))
                        }
                    }
                }
                if (parseInt(splIds[1]) == (presentPagedetails.banners.length - 1)) {
                    keyHandlar.stopPreviewTrailers();
                    Yup('.active-banner').removeClass('active-banner');
                    Yup('#bannerImage-' + splIds[1]).css('display', 'none');
                    Yup('#WatchBannerBtn-' + parseInt(splIds[1])).css('display', 'none');
                    Yup('#WatchBannerBtn-0').css('display', 'block');
                    Yup('#WatchBannerBtn-' + parseInt(splIds[1])).removeClass('imageFocus');
                    Yup('#WatchBannerBtn-0').addClass('imageFocus');
                    Yup('#bannerDetails-' + parseInt(splIds[1])).css('display', 'none');
                    Yup('#bannerDetails-0').css('display', 'block');
                    Yup('#bannerImage-0').css('display', 'block');
                    Yup('#bannerBtn-0').addClass('active-banner');
                    Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                    Yup('#partner-logo-0').css('display', 'block');
                    // keyHandlar.callPreviews("banners",0)
                }
            }
            if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == "tabsSection") {
                var splitData = id.split('-');
                var sectionIndex = splitData[1];
                var nextIndex = parseInt(splitData[2]) + 1;
                var nextTabId = "#tab-" + sectionIndex + '-' + nextIndex;
                var $nextTab = Yup(nextTabId);
                if (Yup("#tab-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                    keyHandlar.stopPreviewTrailers();
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tab-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    keyHandlar.adjustTabScrollByIndex($nextTab[0], nextIndex);
                }
            }
            else if (source == "sections") {
                keyHandlar.previousTabbedPositionFocus();
                var splitData = id.split('-');
                if (Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                    keyHandlar.stopPreviewTrailers();
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]));
                    keyHandlar.liveScrollRight(parseInt(splitData[1]), parseInt(splitData[2]));
                    // if it is explore ott section
                    if (presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.code == "explore-tab" || presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.code == "explore-by-ott" || presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.dataType == "network" && presentPagedetails.sections[parseInt(splitData[1])].sectionData.hasMoreData == true) {
                        if (parseInt(splitData[2]) == presentPagedetails.sections[parseInt(splitData[1])].sectionData.data.length - 8) {
                            Main.exploreOttPagination(presentPagedetails.sections[parseInt(splitData[1])].sectionData.lastIndex, parseInt(splitData[1]));
                        }
                    }
                    var cardElement = document.getElementById("sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1));
                    var viewAllSource = cardElement.getAttribute('sub_source');
                    //  var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], (parseInt(splitData[2]) + 1));
                    var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], (parseInt(splitData[2])));
                    keyHandlar.settingMarginAndCardTypes(data, viewAllSource, forViewAllShowdata);
                    if (!viewAllSource && viewAllSource != "view_all" && data && data.cardType !== "expand_preview_poster" && data.cardSubType != "tabbed-card" && data.cardSubType != "floating_rail" && data.cardSubType != "show_card") {
                        keyHandlar.callPreviews("sections", splitData[1], (parseInt(splitData[2]) + 1), data)
                    }
                }
            }
            else if (source == 'uniqueButtons') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) != 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#signin-1").addClass("imageFocus");
                }
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (source == "bannerBtn") {
                if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (Yup(".top-menu-item.top-menu-active").length > 0) {
                        Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                    } else {
                        Yup(".top-menu-item").first().addClass("imageFocus");
                    }
                }
            }
            else if (source == "sections") {
                keyHandlar.stopPreviewTrailers();
                if (typeof keyHandlar.stopExpandPreviewTrailers === "function") {
                    keyHandlar.stopExpandPreviewTrailers();
                }
                if (typeof keyHandlar.clearPreviousExpandPreview === "function") {
                    keyHandlar.clearPreviousExpandPreview();
                }
                keyHandlar.previousTabbedPositionFocus();
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0) {
                    if (presentPagedetails.banners.length > 0) {
                        // if (Yup('.banners').css('display') == "none") {
                        var splitData = id.split('-');
                        var prevSectionIndex = parseInt(splitData[1]);
                        var sectionElement = document.getElementById("section-" + prevSectionIndex);

                        // Check if this section is a tabbed section (has <ul>)
                        if (sectionElement && sectionElement.querySelector('ul')) {
                            keyHandlar.previousTabbedPositionFocus();

                            var targetTabIndex = (presentPagedetails.tabFocusedIndex && presentPagedetails.tabFocusedIndex[prevSectionIndex] !== undefined) ? presentPagedetails.tabFocusedIndex[prevSectionIndex] : null;
                            var activeTab = null;
                            if (targetTabIndex !== null) {
                                activeTab = document.getElementById('tab-' + prevSectionIndex + '-' + targetTabIndex);
                            }
                            if (!activeTab) {
                                activeTab = sectionElement.querySelector('#tabs-' + prevSectionIndex + ' .active_tab');
                            }
                            if (!activeTab) {
                                activeTab = document.getElementById('tab-' + prevSectionIndex + '-0');
                            }

                            if (activeTab) {
                                Yup(".imageFocus").removeClass("imageFocus");
                                Yup(activeTab).addClass("imageFocus");
                                var tabIdx = parseInt(activeTab.getAttribute('data-tab-index'));
                                if (!isNaN(tabIdx)) keyHandlar.adjustTabScrollByIndex(activeTab, tabIdx);
                            }
                            keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                            keyHandlar.addCurrentSection(parseInt(splitData[1]));
                            return; // stop card focus logic
                        }
                        if (!!presentPagedetails.bannerCurrSection) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup('#WatchBannerBtn-' + presentPagedetails.bannerCurrSection).addClass('imageFocus');
                        }
                        else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#WatchBannerBtn-0").addClass('imageFocus');
                        }
                        var activeBannerIndex = presentPagedetails.bannerCurrSection ? presentPagedetails.bannerCurrSection : 0;
                        Yup('#bannerItem-' + activeBannerIndex).addClass('active-banner-background');
                        Yup('.active-banner-background').css('display', 'block');
                        BannerMove();
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                        Yup('.banners').css('display', 'block');
                        var sh = document.querySelector('.sectionsHome');
                        if (sh) void sh.offsetWidth;
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-down-to-banner');
                        setTimeout(function () {
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-down-to-banner');
                        }, 450);
                        Yup('#backgroundPoster').css('display', 'none')
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '-133px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '-200px')
                        }
                        // keyHandlar.callPreviews("banners",presentPagedetails.bannerCurrSection)

                        // }
                    } else if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                        Yup(".imageFocus").removeClass("imageFocus");
                        if (Yup(".top-menu-item.top-menu-active").length > 0) {
                            Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                        } else {
                            Yup(".top-menu-item").first().addClass("imageFocus");
                        }
                    }
                }
                else {
                    keyHandlar.previousTabbedPositionFocus();
                    var splitData = id.split('-');
                    Yup(".imageFocus").removeClass("imageFocus");
                    var prevSectionIndex = parseInt(splitData[1]);
                    var sectionElement = document.getElementById("section-" + prevSectionIndex);

                    // Check if this section is a tabbed section (has <ul>)
                    if (sectionElement && sectionElement.querySelector('ul')) {

                        var targetTabIndex = (presentPagedetails.tabFocusedIndex && presentPagedetails.tabFocusedIndex[prevSectionIndex] !== undefined) ? presentPagedetails.tabFocusedIndex[prevSectionIndex] : null;
                        var activeTab = null;
                        if (targetTabIndex !== null) {
                            activeTab = document.getElementById('tab-' + prevSectionIndex + '-' + targetTabIndex);
                        }
                        if (!activeTab) {
                            activeTab = sectionElement.querySelector('#tabs-' + prevSectionIndex + ' .active_tab');
                        }
                        if (!activeTab) {
                            activeTab = document.getElementById('tab-' + prevSectionIndex + '-0');
                        }

                        if (activeTab) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup(activeTab).addClass("imageFocus");
                            var tabIdx = parseInt(activeTab.getAttribute('data-tab-index'));
                            if (!isNaN(tabIdx)) keyHandlar.adjustTabScrollByIndex(activeTab, tabIdx);
                        }
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                        keyHandlar.addCurrentSection(parseInt(splitData[1]));
                        return; // stop card focus logic
                    }

                    else if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                        Yup('#sectionItem-' + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1] - 1)), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                        Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                        // if (parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                        //      Yup("#section-" + (parseInt(splitData[1]))).hide();
                        // }
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]) - 1, presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                        keyHandlar.addCurrentSection(parseInt(splitData[1]) - 1);
                        var cardElement = document.getElementById("sectionItem-" + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                        var viewAllSource = cardElement.getAttribute('sub_source');
                        if (!viewAllSource && viewAllSource != "view_all") {
                            keyHandlar.callPreviews("sections", (parseInt(splitData[1]) - 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1], data)
                        }
                    }
                    else {
                        Yup('#sectionItem-' + (parseInt(splitData[1]) - 1) + '-0').addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) - 1), 0);
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]) - 1, 0);
                        keyHandlar.addCurrentSection(parseInt(splitData[1]) - 1);
                        Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup('.sectionsHome').css('margin-top', '333px')
                            }
                            else {
                                Yup('.sectionsHome').css('margin-top', '500px')
                            }
                        }
                        keyHandlar.callPreviews("sections", (parseInt(splitData[1]) - 1), 0, data)
                    }
                    var cardElement = document.getElementById("sectionItem-" + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                    var viewAllSource = cardElement.getAttribute('sub_source');
                    var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) - 1), (presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1] - 1));
                    keyHandlar.settingMarginUpAndDownForCardTypes(data, viewAllSource, forViewAllShowdata)
                }
            }
            else if (source == "tabsSection") {
                var splitData = id.split('-');
                if (!presentPagedetails.tabFocusedIndex) presentPagedetails.tabFocusedIndex = {};
                presentPagedetails.tabFocusedIndex[parseInt(splitData[1])] = parseInt(splitData[2]);
                if (splitData[1] == 0) {
                    if (!!presentPagedetails.bannerCurrSection) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup('#WatchBannerBtn-' + presentPagedetails.bannerCurrSection).addClass('imageFocus');
                    }
                    else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#WatchBannerBtn-0").addClass('imageFocus');
                    }
                    var activeBannerIndex = presentPagedetails.bannerCurrSection ? presentPagedetails.bannerCurrSection : 0;
                    Yup('#bannerItem-' + activeBannerIndex).addClass('active-banner-background');
                    Yup('.active-banner-background').css('display', 'block');
                    BannerMove();
                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                    Yup('.banners').css('display', 'block');
                    var sh = document.querySelector('.sectionsHome');
                    if (sh) void sh.offsetWidth;
                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-down-to-banner');
                    setTimeout(function () {
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-down-to-banner');
                    }, 450);
                    Yup('#backgroundPoster').css('display', 'none')
                    if (keyHandlar.isHD) {
                        Yup(".sectionsHome").css('margin-top', '-133px')
                    }
                    else {
                        Yup(".sectionsHome").css('margin-top', '-200px')
                    }
                    return;
                }
                else if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass('imageFocus');
                    keyHandlar.addSectionKeyIndex((parseInt(splitData[1] - 1)), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]) - 1);
                    var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1] - 1)), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    // if (parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                    //      Yup("#section-" + (parseInt(splitData[1]))).hide();
                    // }
                    keyHandlar.callPreviews("sections", (parseInt(splitData[1]) - 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1], data)
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + (parseInt(splitData[1]) - 1) + '-0').addClass('imageFocus');
                    keyHandlar.addSectionKeyIndex((parseInt(splitData[1]) - 1), 0);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]) - 1);
                    var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) - 1), 0);
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    // if (parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                    //      Yup("#section-" + (parseInt(splitData[1]))).hide();
                    // }
                    keyHandlar.callPreviews("sections", (parseInt(splitData[1]) - 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1], data)
                }
                if (data && data.cardType === "expand_preview_poster") {
                    if (presentPagedetails.targetPath != "favourites" && parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '90px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '135px')
                        }
                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                    }
                    var id = Yup('.imageFocus').attr("id");
                    var splitData = id.split('-');
                    keyHandlar.clearPreviousExpandPreview();
                    keyHandlar.handleExpandPreviewFocus(
                        (parseInt(splitData[1])),
                        splitData[2],
                        data
                    );
                }
                else if (data && data.cardType == "floating_rail") {
                    if (presentPagedetails.targetPath != "favourites") {
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '100px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '150px')
                        }
                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                    }
                }
                else if (data && data.cardSubType == "tabbed-card") {
                    // if (presentPagedetails.targetPath != "favourites") {
                    //     if (keyHandlar.isHD) {
                    //         Yup(".sectionsHome").css('margin-top', '100px')
                    //     }
                    //     else {
                    //         Yup(".sectionsHome").css('margin-top', '150px')
                    //     }
                    //     Yup('.active-banner-background').css('display', 'none');
                    //     Yup('.active-banner-background').removeClass('active-banner-background');
                    // }
                }
                else if (data && data.cardType !== "expand_preview_poster" && presentPagedetails.targetPath !== "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
                    card_lazy_preview();
                    // clearInterval(bannerScrollListner);
                }
                else {
                    if (presentPagedetails.targetPath != "favourites") {
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '100px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '150px')
                        }
                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                    }
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == "bannerBtn") {
                var splitData = id.split('-');
                var nextSectionIndex = parseInt(splitData[1]) + 1;
                var sectionElement = document.getElementById("section-" + 0);

                // Check if this section is a tabbed section (has <ul>)
                if (sectionElement && sectionElement.querySelector('ul')) {

                    var targetTabIndex = (presentPagedetails.tabFocusedIndex && presentPagedetails.tabFocusedIndex[0] !== undefined) ? presentPagedetails.tabFocusedIndex[0] : null;
                    var activeTab = null;
                    if (targetTabIndex !== null) {
                        activeTab = document.getElementById('tab-0-' + targetTabIndex);
                    }
                    if (!activeTab) {
                        activeTab = sectionElement.querySelector('.active_tab');
                    }
                    if (!activeTab) {
                        activeTab = document.getElementById('tab-0-0');
                    }

                    if (activeTab) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(activeTab).addClass("imageFocus");
                    }
                    // if (parseInt(splitData[1]) == 0) {
                    //     Yup("#section-0").hide();
                    // }
                    // else if (parseInt(splitData[1]) > 0 && parseInt(splitData[1]) != presentPagedetails.sections.length - 1) {
                    //     Yup("#section-" + (parseInt(splitData[1]))).hide();
                    // }
                    //pagination
                    if (parseInt(splitData[1]) == presentPagedetails.sections.length - 4 && presentPagedetails.paginationSections && presentPagedetails.paginationSections.length > 0) {
                        Main.Paginationsections();

                    }
                    Yup('.active-banner-background').css('display', 'none');
                    Yup('.active-banner-background').removeClass('active-banner-background');
                    // if (presentPagedetails.targetPath != "favourites") {
                    //     if (keyHandlar.isHD) {
                    //         Yup(".sectionsHome").css('margin-top', '320px')
                    //     }
                    //     else {
                    //         Yup(".sectionsHome").css('margin-top', '480px')
                    //     }
                    //     if (keyHandlar.isHD) {
                    //         Yup("#sectionhorizontal-0").css('left', '30px')
                    //     }
                    //     else {
                    //         Yup("#sectionhorizontal-0").css('left', '40px')
                    //     }
                    // }
                    Yup('.banners').addClass('banner-fade-out');
                    var sh = document.querySelector('.sectionsHome');
                    if (sh) void sh.offsetWidth;
                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                    setTimeout(function () {
                        Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                    }, 450);
                    Yup('#backgroundPoster').css('display', 'block')
                    // var splitTabs = activeTab.split('-')
                    var targetCardIndex = (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] !== undefined) ? presentPagedetails.sectionIndex[0] : 0;
                    keyHandlar.addSectionKeyIndex(0, targetCardIndex);
                    keyHandlar.addCurrentSection(0);
                    keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                    var data = keyHandlar.getSectionItemData(presentPagedetails, 0, targetCardIndex)
                    keyHandlar.settingMarginUpAndDownForCardTypes(data, viewAllSource, forViewAllShowdata)
                    return; // stop card focus logic


                    Yup(".imageFocus").removeClass("imageFocus");
                    // Yup('.banners').css('display', 'none');
                    keyHandlar.addCurrentSection(0)
                    keyHandlar.addSectionKeyIndex(0, targetCardIndex);
                    keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                    Yup("#sectionItem-0-" + targetCardIndex).addClass("imageFocus");
                    var data = keyHandlar.getSectionItemData(presentPagedetails, 0, targetCardIndex)
                    // keyHandlar.callPreviews("sections",0,0) 
                    if (keyHandlar.isHD) {
                        Yup(".sectionsHome").css('margin-top', '320px')
                    }
                    else {
                        Yup(".sectionsHome").css('margin-top', '480px')
                    }
                    if (keyHandlar.isHD) {
                        Yup("#sectionhorizontal-0").css('left', '30px')
                    }
                    else {
                        Yup("#sectionhorizontal-0").css('left', '40px')
                    }
                }
                else if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
                    keyHandlar.stopPreviewTrailers();
                    if (!presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        // Yup('.banners').css('display', 'none');
                        Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                        var data = keyHandlar.getSectionItemData(presentPagedetails, 0, presentPagedetails.sectionIndex[0])
                        keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                        keyHandlar.callPreviews("sections", 0, presentPagedetails.sectionIndex[0], data)
                    } else if (!presentPagedetails.currentSection && presentPagedetails.currentSection != undefined && presentPagedetails.currentSection != null) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        // Yup('.banners').css('display', 'none');
                        // keyHandlar.addCurrentSection(0)
                        // keyHandlar.addSectionKeyIndex(0, 0);
                        Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection]);
                        if (!data || data.cardType !== "floating_rail") {
                            Yup('.banners').addClass('banner-fade-out');
                            var sh = document.querySelector('.sectionsHome');
                            if (sh) void sh.offsetWidth;
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                            setTimeout(function () {
                                Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                            }, 450);
                        }
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '320px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '480px')
                        }
                        keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                        keyHandlar.callPreviews("sections", presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection], data)
                        if (data && data.cardType != "expand_preview_poster" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
                            card_lazy_preview();
                        }
                        clearInterval(bannerScrollListner);
                    } else {

                        var splitData = id.split('-');
                        var nextSectionIndex = parseInt(splitData[1]) + 1;
                        var sectionElement = document.getElementById("section-" + 0);

                        // Check if this section is a tabbed section (has <ul>)
                        if (sectionElement && sectionElement.querySelector('ul')) {

                            var targetTabIndex = (presentPagedetails.tabFocusedIndex && presentPagedetails.tabFocusedIndex[0] !== undefined) ? presentPagedetails.tabFocusedIndex[0] : null;
                            var activeTab = null;
                            if (targetTabIndex !== null) {
                                activeTab = document.getElementById('tab-0-' + targetTabIndex);
                            }
                            if (!activeTab) {
                                activeTab = sectionElement.querySelector('#tabs-' + 0 + ' .active_tab');
                            }
                            if (!activeTab) {
                                activeTab = document.getElementById('tab-0-0');
                            }

                            if (activeTab) {
                                Yup(".imageFocus").removeClass("imageFocus");
                                Yup(activeTab).addClass("imageFocus");
                                var tabIdx = parseInt(activeTab.getAttribute('data-tab-index'));
                                if (!isNaN(tabIdx)) keyHandlar.adjustTabScrollByIndex(activeTab, tabIdx);
                            }
                            // if (parseInt(splitData[1]) == 0) {
                            //     Yup("#section-0").hide();
                            // }
                            // else if (parseInt(splitData[1]) > 0 && parseInt(splitData[1]) != presentPagedetails.sections.length - 1) {
                            //     Yup("#section-" + (parseInt(splitData[1]))).hide();
                            // }
                            //pagination
                            if (parseInt(splitData[1]) == presentPagedetails.sections.length - 4 && presentPagedetails.paginationSections && presentPagedetails.paginationSections.length > 0) {
                                Main.Paginationsections();

                            }
                            Yup('.active-banner-background').css('display', 'none');
                            Yup('.active-banner-background').removeClass('active-banner-background');
                            // if (presentPagedetails.targetPath != "favourites") {
                            //     if (keyHandlar.isHD) {
                            //         Yup(".sectionsHome").css('margin-top', '320px')
                            //     }
                            //     else {
                            //         Yup(".sectionsHome").css('margin-top', '480px')
                            //     }
                            //     if (keyHandlar.isHD) {
                            //         Yup("#sectionhorizontal-0").css('left', '30px')
                            //     }
                            //     else {
                            //         Yup("#sectionhorizontal-0").css('left', '40px')
                            //     }
                            // }
                            Yup('.banners').addClass('banner-fade-out');
                            var sh = document.querySelector('.sectionsHome');
                            if (sh) void sh.offsetWidth;
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                            setTimeout(function () {
                                Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                            }, 450);
                            Yup('#backgroundPoster').css('display', 'block')
                            // var splitTabs = activeTab.split('-')
                            var targetCardIndex = (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] !== undefined) ? presentPagedetails.sectionIndex[0] : 0;
                            keyHandlar.addSectionKeyIndex(0, targetCardIndex);
                            keyHandlar.addCurrentSection(0);

                            var data = keyHandlar.getSectionItemData(presentPagedetails, 0, targetCardIndex)
                            keyHandlar.settingMarginUpAndDownForCardTypes(data, viewAllSource, forViewAllShowdata)
                            return; // stop card focus logic
                        }

                        var targetCardIndex = (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] !== undefined) ? presentPagedetails.sectionIndex[0] : 0;
                        Yup(".imageFocus").removeClass("imageFocus");
                        // Yup('.banners').css('display', 'none');
                        keyHandlar.addCurrentSection(0)
                        keyHandlar.addSectionKeyIndex(0, targetCardIndex);
                        keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                        Yup("#sectionItem-0-" + targetCardIndex).addClass("imageFocus");
                        var data = keyHandlar.getSectionItemData(presentPagedetails, 0, targetCardIndex);
                        if (!data || data.cardType !== "floating_rail") {
                            Yup('.banners').addClass('banner-fade-out');
                            var sh = document.querySelector('.sectionsHome');
                            if (sh) void sh.offsetWidth;
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                            setTimeout(function () {
                                Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                            }, 450);
                        }
                        // keyHandlar.callPreviews("sections",0,0) 
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '320px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '480px')
                        }
                        if (keyHandlar.isHD) {
                            Yup("#sectionhorizontal-0").css('left', '30px')
                        }
                        else {
                            Yup("#sectionhorizontal-0").css('left', '40px')
                        }
                         keyHandlar.callPreviews("sections", 0, targetCardIndex, data)
                    }
                    Yup('#sectionItem-' + presentPagedetails.currentSection).show();                    //bacground preview checking
                    if (data && data.cardType == "floating_rail") {
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup(".sectionsHome").css('margin-top', '100px')
                            }
                            else {
                                Yup(".sectionsHome").css('margin-top', '150px')
                            }
                            Yup('.active-banner-background').css('display', 'none');
                            Yup('.active-banner-background').removeClass('active-banner-background');
                        }
                    }
                    else if (data && data.cardType == "expand_preview_poster") {
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup(".sectionsHome").css('margin-top', '90px')
                            }
                            else {
                                Yup(".sectionsHome").css('margin-top', '135px')
                            }
                            Yup('.active-banner-background').css('display', 'none');
                            Yup('.active-banner-background').removeClass('active-banner-background');
                        }
                        Yup('.banners').addClass('banner-fade-out');
                        var sh = document.querySelector('.sectionsHome');
                        if (sh) void sh.offsetWidth;
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                        setTimeout(function () {
                            Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                        }, 450);
                        Yup('#backgroundPoster').css('display', 'block');
                        var focusId = Yup('.imageFocus').attr("id");
                        if (focusId) {
                            var focusSplitData = focusId.split('-');
                            keyHandlar.clearPreviousExpandPreview();
                            keyHandlar.handleExpandPreviewFocus(
                                parseInt(focusSplitData[1]),
                                parseInt(focusSplitData[2]),
                                data
                            );
                        }
                        clearInterval(bannerScrollListner);
                    }
                    else if (data && data.cardType != "expand_preview_poster" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true')) {
                        card_lazy_preview();
                        clearInterval(bannerScrollListner);
                    }

                    else {
                        Yup('.banners').addClass('banner-fade-out');
                        var sh = document.querySelector('.sectionsHome');
                        if (sh) void sh.offsetWidth;
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                        Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-up-from-banner');
                        setTimeout(function () {
                            Yup('.banners').css('display', 'none').removeClass('banner-fade-out');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-up-from-banner');
                            Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('smooth-scroll-sections');
                        }, 450);
                        keyHandlar.addBannerCurrSection(parseInt(splitData[1]))
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '100px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '150px')
                        }
                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                    }
                }
            }
            else if (source == "tabsSection") {
                var splitData = id.split('-');
                if (!presentPagedetails.tabFocusedIndex) presentPagedetails.tabFocusedIndex = {};
                presentPagedetails.tabFocusedIndex[parseInt(splitData[1])] = parseInt(splitData[2]);
                keyHandlar.stopPreviewTrailers();
                if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1])] != undefined) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + (parseInt(splitData[1])) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1])]).addClass('imageFocus');
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + (parseInt(splitData[1])) + '-' + 0).addClass('imageFocus');
                }
            }
            else if (source == "sections") {
                var splitData = id.split('-');
                keyHandlar.stopPreviewTrailers();
                if (typeof keyHandlar.stopExpandPreviewTrailers === "function") {
                    keyHandlar.stopExpandPreviewTrailers();
                }
                if (typeof keyHandlar.clearPreviousExpandPreview === "function") {
                    keyHandlar.clearPreviousExpandPreview();
                }
                keyHandlar.previousTabbedPositionFocus();
                if (parseInt(splitData[1]) < presentPagedetails.sections.length - 1) {
                    var splitData = id.split('-');
                    var nextSectionIndex = parseInt(splitData[1]) + 1;
                    var sectionElement = document.getElementById("section-" + nextSectionIndex);

                    // Check if this section is a tabbed section (has <ul>)
                    if (sectionElement && sectionElement.querySelector('ul')) {

                        var targetTabIndex = (presentPagedetails.tabFocusedIndex && presentPagedetails.tabFocusedIndex[nextSectionIndex] !== undefined) ? presentPagedetails.tabFocusedIndex[nextSectionIndex] : null;
                        var activeTab = null;
                        if (targetTabIndex !== null) {
                            activeTab = document.getElementById('tab-' + nextSectionIndex + '-' + targetTabIndex);
                        }
                        if (!activeTab) {
                            activeTab = sectionElement.querySelector('#tabs-' + nextSectionIndex + ' .active_tab');
                        }
                        if (!activeTab) {
                            activeTab = document.getElementById('tab-' + nextSectionIndex + '-0');
                        }

                        if (activeTab) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup(activeTab).addClass("imageFocus");
                            var tabIdx = parseInt(activeTab.getAttribute('data-tab-index'));
                            if (!isNaN(tabIdx)) keyHandlar.adjustTabScrollByIndex(activeTab, tabIdx);
                        }
                        if (parseInt(splitData[1]) == 0) {
                            Yup("#section-0").hide();
                        }
                        else if (parseInt(splitData[1]) > 0 && parseInt(splitData[1]) != presentPagedetails.sections.length - 1) {
                            Yup("#section-" + (parseInt(splitData[1]))).hide();
                        }
                        //pagination
                        if (parseInt(splitData[1]) == presentPagedetails.sections.length - 4 && presentPagedetails.paginationSections && presentPagedetails.paginationSections.length > 0) {
                            Main.Paginationsections();

                        }
                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup(".sectionsHome").css('margin-top', '90px')
                            }
                            else {
                                Yup(".sectionsHome").css('margin-top', '135px')
                            }
                        }
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                        keyHandlar.addCurrentSection(parseInt(splitData[1]));
                        return; // stop card focus logic
                    }
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1] != undefined) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup('#sectionItem-' + (parseInt(splitData[1]) + 1) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1]).addClass('imageFocus');
                        Yup("#section-" + (parseInt(splitData[1]) + 1)).show();
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) + 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1]);
                        var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) + 1), (presentPagedetails.sectionIndex[parseInt(splitData[1])] + 1));
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup('.sectionsHome').css('margin-top', '333px')
                            }
                            else {
                                Yup('.sectionsHome').css('margin-top', '500px')
                            }
                            var cardElement = document.getElementById("sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1]);
                            var viewAllSource = cardElement.getAttribute('sub_source');
                            if (!viewAllSource && viewAllSource != "view_all") {
                                keyHandlar.callPreviews("sections", (parseInt(splitData[1]) + 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1], data)
                            }
                            if (forViewAllShowdata && forViewAllShowdata.cardType == "expand_preview_poster") {
                                if (keyHandlar.isHD) {
                                    Yup(".sectionsHome").css('margin-top', '90px')
                                }
                                else {
                                    Yup(".sectionsHome").css('margin-top', '135px')
                                }
                                Yup('.active-banner-background').css('display', 'none');
                                Yup('.active-banner-background').removeClass('active-banner-background');
                                //Pagination
                                if (parseInt(splitData[1]) == presentPagedetails.sections.length - 4 && presentPagedetails.paginationSections && presentPagedetails.paginationSections.length > 0) {
                                    Main.Paginationsections();

                                }
                                if (parseInt(splitData[1]) == 0) {
                                    Yup("#section-0").hide();
                                }
                                else if (parseInt(splitData[1]) > 0 && parseInt(splitData[1]) != presentPagedetails.sections.length - 1) {
                                    Yup("#section-" + (parseInt(splitData[1]))).hide();
                                }
                                var id_focus = Yup('.imageFocus').attr("id");
                                var splitData_focus = id_focus.split('-');
                                Yup("#section-" + (parseInt(splitData_focus[1]))).show();
                                keyHandlar.clearPreviousExpandPreview();
                                keyHandlar.handleExpandPreviewFocus(
                                    (parseInt(splitData_focus[1])),
                                    splitData_focus[2],
                                    data
                                );
                                return;
                            }
                        }
                    }
                    else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup('#sectionItem-' + (parseInt(splitData[1]) + 1) + '-0').addClass('imageFocus');
                        Yup("#section-" + (parseInt(splitData[1]) + 1)).show();
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) + 1), 0);
                        var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], 0)
                        if (presentPagedetails.targetPath != "favourites") {
                            if (keyHandlar.isHD) {
                                Yup('.sectionsHome').css('margin-top', '333px')
                            }
                            else {
                                Yup('.sectionsHome').css('margin-top', '500px')
                            }
                        }
                        // keyHandlar.callPreviews("sections",(parseInt(splitData[1]) + 1),0)
                        var cardElement = document.getElementById("sectionItem-" + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                        if (cardElement) {
                            var viewAllSource = cardElement.getAttribute('sub_source');
                        }
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]) + 1, 0)
                    }
                    keyHandlar.addCurrentSection(parseInt(splitData[1]) + 1)

                    if (parseInt(splitData[1]) == 0) {
                        Yup("#section-0").hide();
                    }
                    else if (parseInt(splitData[1]) > 0 && parseInt(splitData[1]) != presentPagedetails.sections.length - 1) {
                        Yup("#section-" + (parseInt(splitData[1]))).hide();
                    }
                    //pagination
                    if (parseInt(splitData[1]) == presentPagedetails.sections.length - 4 && presentPagedetails.paginationSections && presentPagedetails.paginationSections.length > 0) {
                        Main.Paginationsections();
                    }
                }
                // var cardElement = document.getElementById("sectionItem-" + (parseInt(splitData[1] - 1)) + '-' + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                // if(cardElement){
                // var viewAllSource = cardElement.getAttribute('sub_source');
                // }
                //bacground preview checking
                // var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');
                var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], (presentPagedetails.sectionIndex[parseInt(splitData[1])] - 1));
                // if ((data && presentPagedetails.targetPath != "favourites"  && (Yup('.imageFocus').attr('is_bg_available') == 'true')) || (viewAllSource && viewAllSource == "view_all") && hasBgImage(forViewAllShowdata)) {
                if (data) {
                    keyHandlar.settingMarginUpAndDownForCardTypes(data, viewAllSource, forViewAllShowdata)
                }
                else if (viewAllSource && viewAllSource == "view_all") {
                    card_lazy_preview()
                }
                if (!viewAllSource && viewAllSource != "view_all" && data) {
                    keyHandlar.callPreviews("sections", (parseInt(splitData[1]) + 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) + 1], data)
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            keyHandlar.previousTabbedPositionFocus();
            if (isSidemenuOpened == true && (presentPagedetails.pageSubType == "networkDetails" && presentPagedetails.pageType != "content")) {
                Main.sidebarClose();
                if (presentPagedetails.currentSection == undefined) {
                    if (Yup('#sectionItem-0-0').length > 0) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-0-0').addClass('imageFocus');
                    }
                }
                else if (presentPagedetails.sectionIndex[presentPagedetails.currentSection] != undefined) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                }
                else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-0').addClass('imageFocus');
                }
            }
            else if (isSidemenuOpened == false && presentPagedetails.pageSubType != "networkDetails" && presentPagedetails.pageSubSubtype != "sportsList") {
                var currentFocusedId = Yup('.imageFocus').attr('id');
                var isSectionItem = currentFocusedId && currentFocusedId.indexOf('sectionItem-') === 0;
                var isTabItem = currentFocusedId && currentFocusedId.indexOf('tab-') === 0;
                var isBannerItem = currentFocusedId && currentFocusedId.indexOf('WatchBannerBtn-') === 0;

                var isTopMenuItem = currentFocusedId && currentFocusedId.indexOf('top-menu-item-') === 0;

                // if ((isBannerItem || isTopMenuItem) && presentPagedetails.targetPath != firstMenu) {
                //     if (isBannerItem && Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         if (Yup(".top-menu-item.top-menu-active").length > 0) {
                //             Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                //         } else {
                //             Yup(".top-menu-item").first().addClass("imageFocus");
                //         }
                //     } else if (backData.length === 0) {
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         if (Yup('.side-menu-item.menu-active').length > 0) {
                //             Yup('.side-menu-item.menu-active').addClass('imageFocus');
                //         } else {
                //             Yup('.side-menu-item').first().addClass('imageFocus');
                //         }
                //         Main.sidebarOpen();
                //     } else {
                //         keyHandlar.stopPreviewTrailers();
                //         Main.previousPage();
                //     }
                //     return;
                // }

                if (isBannerItem) {
                    var isTopMenuVisible = Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none";
                    var activeSideMenuCode = Yup('.side-menu-item.menu-active').attr('targetpath');
                    var isHomeTopMenu = isTopMenuVisible && activeSideMenuCode === firstMenu;

                    if (presentPagedetails.targetPath !== firstMenu && !isHomeTopMenu) {
                        keyHandlar.stopPreviewTrailers();
                        Yup(".imageFocus").removeClass("imageFocus");
                        if (Yup('.side-menu-item.menu-active').length > 0) {
                            Yup('.side-menu-item.menu-active').addClass('imageFocus');
                        } else {
                            Yup('.side-menu-item').first().addClass('imageFocus');
                        }
                        Main.sidebarOpen();
                        return;
                    }
                }

                if (isSectionItem || isTabItem) {
                    var splitFocus = currentFocusedId.split('-');
                    var sIndex = parseInt(splitFocus[1]);
                    var cIndex = parseInt(splitFocus[2]);

                    if (cIndex > 0) {
                        keyHandlar.previousTabbedPositionFocus();
                        if (isSectionItem) {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#sectionItem-' + sIndex + '-0').addClass('imageFocus');
                            keyHandlar.addSectionKeyIndex(sIndex, 0);
                            Yup("#sectionhorizontal-" + sIndex).css("left", keyHandlar.isHD ? "30px" : "40px");

                            var data = keyHandlar.getSectionItemData(presentPagedetails, sIndex, 0);
                            var cardElement = document.getElementById("sectionItem-" + sIndex + '-0');
                            var viewAllSource = (cardElement) ? cardElement.getAttribute('sub_source') : '';
                            var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, sIndex, cIndex);

                            if (typeof keyHandlar.clearPreviousExpandPreview === "function") {
                                keyHandlar.clearPreviousExpandPreview();
                            }
                            keyHandlar.settingMarginAndCardTypes(data, viewAllSource, forViewAllShowdata);
                            keyHandlar.callPreviews("sections", sIndex, 0, data);
                        } else {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#tab-' + sIndex + '-0').addClass('imageFocus');
                            var firstTab = document.getElementById('tab-' + sIndex + '-0');
                            if (firstTab) {
                                keyHandlar.adjustTabScrollByIndex(firstTab, 0);
                            }
                            if (!presentPagedetails.tabFocusedIndex) presentPagedetails.tabFocusedIndex = {};
                            presentPagedetails.tabFocusedIndex[sIndex] = 0;
                        }
                        return;
                    }
                    else {
                        if (presentPagedetails.banners && presentPagedetails.banners.length > 0) {
                            var activeBanner = Yup(".active-banner").attr("id");
                            if (activeBanner) {
                                var splIds = activeBanner.split("-");
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                            } else {
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#WatchBannerBtn-0').addClass('imageFocus');
                            }
                            if (presentPagedetails.targetPath != "favourites") {
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                                if (keyHandlar.isHD) {
                                    Yup(".sectionsHome").css('margin-top', '-133px');
                                } else {
                                    Yup(".sectionsHome").css('margin-top', '-200px');
                                }
                                Yup('.banners').css('display', 'block');
                                var sh = document.querySelector('.sectionsHome');
                                if (sh) void sh.offsetWidth;
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-down-to-banner');
                                setTimeout(function () {
                                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-down-to-banner');
                                }, 450);
                                Yup('.active-banner-background').css('display', 'none');
                                Yup('.active-banner-background').removeClass('active-banner-background');
                                if (presentPagedetails.sections) {
                                    for (var i = 1; i < presentPagedetails.sections.length; i++) {
                                        Yup("#section-" + i).show();
                                    }
                                }
                                Yup("#section-0").show();
                                keyHandlar.addCurrentSection(0);
                            }
                            return;
                        } else if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                            keyHandlar.stopPreviewTrailers();
                            Yup(".imageFocus").removeClass("imageFocus");
                            if (Yup(".top-menu-item.top-menu-active").length > 0) {
                                Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                            } else {
                                Yup(".top-menu-item").first().addClass("imageFocus");
                            }
                            return;
                        } else {
                            var isTopMenuVisible = Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none";
                            var activeSideMenuCode = Yup('.side-menu-item.menu-active').attr('targetpath');
                            var isHomeTopMenu = isTopMenuVisible && activeSideMenuCode === firstMenu;

                            if (presentPagedetails.targetPath !== firstMenu && !isHomeTopMenu) {
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                if (Yup('.side-menu-item.menu-active').length > 0) {
                                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                                } else {
                                    Yup('.side-menu-item').first().addClass('imageFocus');
                                }
                                Main.sidebarOpen();
                                return;
                            }
                        }
                    }
                }
                else if (isSidemenuOpened == false && presentPagedetails.targetPath == "favourites" && presentPagedetails.sections.length <= 0) {
                    keyHandlar.stopPreviewTrailers();
                    if (Yup('.side-menu-item.menu-active').length > 0) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('.side-menu-item.menu-active').addClass('imageFocus');
                    } else {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('.side-menu-item').first().addClass('imageFocus');
                    }
                    Main.sidebarOpen();
                    return;
                }
                if (Main && Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.data && Main.exitPopupDataCards && Main.exitPopupDataCards.data[0] && Main.exitPopupDataCards.data[0].section && Main.exitPopupDataCards.data[0].section.sectionData && Main.exitPopupDataCards.data[0].section.sectionData.data.length > 0) {
                    Main.sidebarClose();
                    // clearInterval(bannerScrollListner);

                    if (presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                        var activeBanner = Yup(".active-banner").attr("id");
                        var splitData = id.split('-');
                        var splIds = activeBanner.split("-")
                        if (activeBanner) {
                            keyHandlar.stopPreviewTrailers();
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]))).addClass('imageFocus');
                        }
                        else {
                            keyHandlar.stopPreviewTrailers();
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#WatchBannerBtn-0').addClass('imageFocus');
                            //     if(presentPagedetails.banners[0].target.pageAttributes.isTrailerAvailable == "true"){
                        }
                    }
                    else if (view == "content" && presentPagedetails.currentSection !== undefined && presentPagedetails.currentSection !== null && presentPagedetails.currentSection !== "") {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                        keyHandlar.stopPreviewTrailers();
                    }
                    else if (Yup('.banners').css('display') == 'none' || presentPagedetails.banners.length == 0) {
                        if (presentPagedetails.currentSection == undefined) {
                            if (Yup('#sectionItem-0-0').length > 0) {
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#sectionItem-0-0').addClass('imageFocus');
                                keyHandlar.stopPreviewTrailers();
                            }
                            else {

                            }
                        }
                    }
                    //exit popup
                    Main.exitPopUpCallTemplate.popuptype = "exit_popup"
                    Main.exitPopUpCallTemplate.onBack = "close"
                    Main.exitPopUpCallTemplate.yesTarget = "exit_Sections"
                    Main.exitPopUpCallTemplate.noTarget = "exit"
                    Yup("#popUpFDFS").html(Util.signoutExitComformation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    exitPopupShow = true
                    clevertapservice.sendCleverTapEvent('exit popup', {
                        'action': 'displayed',
                        // 'label':'exit',
                        // 'popup name':'exit',
                        // 'button label':'',
                        'tab': "Home",
                    })
                }
                else {
                    Main.popupData = {
                        popuptype: 'noData',
                        message: 'Are you sure you want to exit ?',
                        buttonCount: 2,
                        yesText: 'Exit',
                        yesTarget: 'exit',
                        noText: 'Cancel',
                        noTarget: 'close',
                        onBack: 'close'
                    }
                    Yup("#popUpFDFS").html(Util.signoutComformation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup displayed',
                        'label': 'exit',
                        'popup name': 'exit',
                        'button label': '',
                        // 'tab':ctEvent.tabName,  
                    })
                }
            }
            else if (source == 'menus' && isSidemenuOpened == true && presentPagedetails.targetPath != firstMenu && presentPagedetails.activemainmenu != firstMenu) {
                Main.sidebarClose();
                Yup(".imageFocus").removeClass("imageFocus");
                keyHandlar.stopPreviewTrailers();
                Main.apiCall(firstMenu);

                // if (presentPagedetails.banners && presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                //     var activeBanner = Yup(".active-banner").attr("id");
                //     if (activeBanner) {
                //         var splIds = activeBanner.split("-");
                //         Yup('.imageFocus').removeClass('imageFocus');
                //         Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                //         keyHandlar.callPreviews("banners", parseInt(splIds[1]));
                //     } else {
                //         Yup('.imageFocus').removeClass('imageFocus');
                //         Yup('#WatchBannerBtn-0').addClass('imageFocus');
                //         keyHandlar.callPreviews("banners", 0);
                //     }
                // } else if (presentPagedetails.currentSection != undefined) {
                //     Yup('.imageFocus').removeClass('imageFocus');
                //     var cIdx = presentPagedetails.sectionIndex[presentPagedetails.currentSection] || 0;
                //     Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + cIdx).addClass('imageFocus');
                //     var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, cIdx);
                //     keyHandlar.callPreviews("sections", presentPagedetails.currentSection, cIdx, data);
                // } else if (Yup('#sectionItem-0-0').length > 0) {
                //     Yup('.imageFocus').removeClass('imageFocus');
                //     Yup('#sectionItem-0-0').addClass('imageFocus');
                //     var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
                //     keyHandlar.callPreviews("sections", 0, 0, data);
                // }
            }
            else if (presentPagedetails.view == 'content' && presentPagedetails.targetPath != 'home' && presentPagedetails.targetPath != firstMenu && backData.length > 0 && (presentPagedetails.pageSubType != "networkDetails" || presentPagedetails.targetPath == "free") && presentPagedetails.pageSubSubtype != "sportsList") {
                keyHandlar.stopPreviewTrailers();
                Yup('.imageFocus').removeClass('imageFocus');
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            else if (presentPagedetails.view == 'search') {
                keyHandlar.stopPreviewTrailers();
                Yup('.imageFocus').removeClass('imageFocus');
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            else if (source == 'menus' && isSidemenuOpened == true && (presentPagedetails.targetPath == firstMenu || presentPagedetails.activemainmenu == firstMenu)) {
                Main.sidebarClose();
                if (presentPagedetails.banners && presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                    var activeBanner = Yup(".active-banner").attr("id");
                    if (activeBanner) {
                        var splIds = activeBanner.split("-");
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                        keyHandlar.callPreviews("banners", parseInt(splIds[1]));
                    } else {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-0').addClass('imageFocus');
                        keyHandlar.callPreviews("banners", 0);
                    }
                } else if (presentPagedetails.currentSection != undefined) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    var cIdx = presentPagedetails.sectionIndex[presentPagedetails.currentSection] || 0;
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + cIdx).addClass('imageFocus');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, cIdx);
                    keyHandlar.callPreviews("sections", presentPagedetails.currentSection, cIdx, data);
                } else if (Yup('#sectionItem-0-0').length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-0-0').addClass('imageFocus');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
                    keyHandlar.callPreviews("sections", 0, 0, data);
                }
            }
            else {
                keyHandlar.stopPreviewTrailers();
                Main.previousPage();
            }
            break;
        }
        case 461: {
            keyHandlar.previousTabbedPositionFocus();
            if (isSidemenuOpened == true && (presentPagedetails.pageSubType == "networkDetails" && presentPagedetails.pageType != "content")) {
                Main.sidebarClose();
                if (presentPagedetails.currentSection == undefined) {
                    if (Yup('#sectionItem-0-0').length > 0) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-0-0').addClass('imageFocus');
                    }
                }
                else if (presentPagedetails.sectionIndex[presentPagedetails.currentSection] != undefined) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                }
                else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-0').addClass('imageFocus');
                }
            }
            else if (isSidemenuOpened == false && presentPagedetails.pageSubType != "networkDetails" && presentPagedetails.pageSubSubtype != "sportsList") {
                var currentFocusedId = Yup('.imageFocus').attr('id');
                var isSectionItem = currentFocusedId && currentFocusedId.indexOf('sectionItem-') === 0;
                var isTabItem = currentFocusedId && currentFocusedId.indexOf('tab-') === 0;
                var isBannerItem = currentFocusedId && currentFocusedId.indexOf('WatchBannerBtn-') === 0;

                var isTopMenuItem = currentFocusedId && currentFocusedId.indexOf('top-menu-item-') === 0;

                // if ((isBannerItem || isTopMenuItem) && presentPagedetails.targetPath != firstMenu) {
                //     if (isBannerItem && Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         if (Yup(".top-menu-item.top-menu-active").length > 0) {
                //             Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                //         } else {
                //             Yup(".top-menu-item").first().addClass("imageFocus");
                //         }
                //     } else if (backData.length === 0) {
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         if (Yup('.side-menu-item.menu-active').length > 0) {
                //             Yup('.side-menu-item.menu-active').addClass('imageFocus');
                //         } else {
                //             Yup('.side-menu-item').first().addClass('imageFocus');
                //         }
                //         Main.sidebarOpen();
                //     } else {
                //         keyHandlar.stopPreviewTrailers();
                //         Main.previousPage();
                //     }
                //     return;
                // }

                if (isBannerItem) {
                    var isTopMenuVisible = Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none";
                    var activeSideMenuCode = Yup('.side-menu-item.menu-active').attr('targetpath');
                    var isHomeTopMenu = isTopMenuVisible && activeSideMenuCode === firstMenu;

                    if (presentPagedetails.targetPath !== firstMenu && !isHomeTopMenu) {
                        keyHandlar.stopPreviewTrailers();
                        Yup(".imageFocus").removeClass("imageFocus");
                        if (Yup('.side-menu-item.menu-active').length > 0) {
                            Yup('.side-menu-item.menu-active').addClass('imageFocus');
                        } else {
                            Yup('.side-menu-item').first().addClass('imageFocus');
                        }
                        Main.sidebarOpen();
                        return;
                    }
                }

                if (isSectionItem || isTabItem) {
                    var splitFocus = currentFocusedId.split('-');
                    var sIndex = parseInt(splitFocus[1]);
                    var cIndex = parseInt(splitFocus[2]);

                    if (cIndex > 0) {
                        keyHandlar.previousTabbedPositionFocus();
                        if (isSectionItem) {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#sectionItem-' + sIndex + '-0').addClass('imageFocus');
                            keyHandlar.addSectionKeyIndex(sIndex, 0);
                            Yup("#sectionhorizontal-" + sIndex).css("left", keyHandlar.isHD ? "30px" : "40px");

                            var data = keyHandlar.getSectionItemData(presentPagedetails, sIndex, 0);
                            var cardElement = document.getElementById("sectionItem-" + sIndex + '-0');
                            var viewAllSource = (cardElement) ? cardElement.getAttribute('sub_source') : '';
                            var forViewAllShowdata = keyHandlar.getSectionItemData(presentPagedetails, sIndex, cIndex);

                            if (typeof keyHandlar.clearPreviousExpandPreview === "function") {
                                keyHandlar.clearPreviousExpandPreview();
                            }
                            keyHandlar.settingMarginAndCardTypes(data, viewAllSource, forViewAllShowdata);
                            keyHandlar.callPreviews("sections", sIndex, 0, data);
                        } else {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#tab-' + sIndex + '-0').addClass('imageFocus');
                            var firstTab = document.getElementById('tab-' + sIndex + '-0');
                            if (firstTab) {
                                keyHandlar.adjustTabScrollByIndex(firstTab, 0);
                            }
                            if (!presentPagedetails.tabFocusedIndex) presentPagedetails.tabFocusedIndex = {};
                            presentPagedetails.tabFocusedIndex[sIndex] = 0;
                        }
                        return;
                    }
                    else {
                        if (presentPagedetails.banners && presentPagedetails.banners.length > 0) {
                            var activeBanner = Yup(".active-banner").attr("id");
                            if (activeBanner) {
                                var splIds = activeBanner.split("-");
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                            } else {
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#WatchBannerBtn-0').addClass('imageFocus');
                            }
                            if (presentPagedetails.targetPath != "favourites") {
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('smooth-scroll-sections');
                                if (keyHandlar.isHD) {
                                    Yup(".sectionsHome").css('margin-top', '-133px');
                                } else {
                                    Yup(".sectionsHome").css('margin-top', '-200px');
                                }
                                Yup('.banners').css('display', 'block');
                                var sh = document.querySelector('.sectionsHome');
                                if (sh) void sh.offsetWidth;
                                Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').addClass('slide-down-to-banner');
                                setTimeout(function () {
                                    Yup('.sectionsHome, .live_sectionsHome, .sectionsShowsHome').removeClass('slide-down-to-banner');
                                }, 450);
                                Yup('.active-banner-background').css('display', 'none');
                                Yup('.active-banner-background').removeClass('active-banner-background');
                                if (presentPagedetails.sections) {
                                    for (var i = 1; i < presentPagedetails.sections.length; i++) {
                                        Yup("#section-" + i).show();
                                    }
                                }
                                Yup("#section-0").show();
                                keyHandlar.addCurrentSection(0);
                            }
                            return;
                        } else if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                            keyHandlar.stopPreviewTrailers();
                            Yup(".imageFocus").removeClass("imageFocus");
                            if (Yup(".top-menu-item.top-menu-active").length > 0) {
                                Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                            } else {
                                Yup(".top-menu-item").first().addClass("imageFocus");
                            }
                            return;
                        } else {
                            var isTopMenuVisible = Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none";
                            var activeSideMenuCode = Yup('.side-menu-item.menu-active').attr('targetpath');
                            var isHomeTopMenu = isTopMenuVisible && activeSideMenuCode === firstMenu;

                            if (presentPagedetails.targetPath !== firstMenu && !isHomeTopMenu) {
                                keyHandlar.stopPreviewTrailers();
                                Yup('.imageFocus').removeClass('imageFocus');
                                if (Yup('.side-menu-item.menu-active').length > 0) {
                                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                                } else {
                                    Yup('.side-menu-item').first().addClass('imageFocus');
                                }
                                Main.sidebarOpen();
                                return;
                            }
                        }
                    }
                }
                else if (isSidemenuOpened == false && presentPagedetails.targetPath == "favourites" && presentPagedetails.sections.length <= 0) {
                    keyHandlar.stopPreviewTrailers();
                    if (Yup('.side-menu-item.menu-active').length > 0) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('.side-menu-item.menu-active').addClass('imageFocus');
                    } else {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('.side-menu-item').first().addClass('imageFocus');
                    }
                    Main.sidebarOpen();
                    return;
                }
                if (Main && Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.data && Main.exitPopupDataCards && Main.exitPopupDataCards.data[0] && Main.exitPopupDataCards.data[0].section && Main.exitPopupDataCards.data[0].section.sectionData && Main.exitPopupDataCards.data[0].section.sectionData.data.length > 0) {
                    Main.sidebarClose();
                    // clearInterval(bannerScrollListner);

                    if (presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                        var activeBanner = Yup(".active-banner").attr("id");
                        var splitData = id.split('-');
                        var splIds = activeBanner.split("-")
                        if (activeBanner) {
                            keyHandlar.stopPreviewTrailers();
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]))).addClass('imageFocus');
                        }
                        else {
                            keyHandlar.stopPreviewTrailers();
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#WatchBannerBtn-0').addClass('imageFocus');
                            //     if(presentPagedetails.banners[0].target.pageAttributes.isTrailerAvailable == "true"){
                        }
                    }
                    else if (view == "content" && presentPagedetails.currentSection !== undefined && presentPagedetails.currentSection !== null && presentPagedetails.currentSection !== "") {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                        keyHandlar.stopPreviewTrailers();
                    }
                    else if (Yup('.banners').css('display') == 'none' || presentPagedetails.banners.length == 0) {
                        if (presentPagedetails.currentSection == undefined) {
                            if (Yup('#sectionItem-0-0').length > 0) {
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#sectionItem-0-0').addClass('imageFocus');
                                keyHandlar.stopPreviewTrailers();
                            }
                            else {

                            }
                        }
                    }
                    //exit popup
                    Main.exitPopUpCallTemplate.popuptype = "exit_popup"
                    Main.exitPopUpCallTemplate.onBack = "close"
                    Main.exitPopUpCallTemplate.yesTarget = "exit_Sections"
                    Main.exitPopUpCallTemplate.noTarget = "exit"
                    Yup("#popUpFDFS").html(Util.signoutExitComformation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    exitPopupShow = true
                    clevertapservice.sendCleverTapEvent('exit popup', {
                        'action': 'displayed',
                        // 'label':'exit',
                        // 'popup name':'exit',
                        // 'button label':'',
                        'tab': "Home",
                    })
                }
                else {
                    Main.popupData = {
                        popuptype: 'noData',
                        message: 'Are you sure you want to exit ?',
                        buttonCount: 2,
                        yesText: 'Exit',
                        yesTarget: 'exit',
                        noText: 'Cancel',
                        noTarget: 'close',
                        onBack: 'close'
                    }
                    Yup("#popUpFDFS").html(Util.signoutComformation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup displayed',
                        'label': 'exit',
                        'popup name': 'exit',
                        'button label': '',
                        // 'tab':ctEvent.tabName,  
                    })
                }
            }
            else if (source == 'menus' && isSidemenuOpened == true && presentPagedetails.targetPath != firstMenu && presentPagedetails.activemainmenu != firstMenu) {
                Main.sidebarClose();
                Yup(".imageFocus").removeClass("imageFocus");
                keyHandlar.stopPreviewTrailers();
                Main.apiCall(firstMenu);

                // if (presentPagedetails.banners && presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                //     var activeBanner = Yup(".active-banner").attr("id");
                //     if (activeBanner) {
                //         var splIds = activeBanner.split("-");
                //         Yup('.imageFocus').removeClass('imageFocus');
                //         Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                //         keyHandlar.callPreviews("banners", parseInt(splIds[1]));
                //     } else {
                //         Yup('.imageFocus').removeClass('imageFocus');
                //         Yup('#WatchBannerBtn-0').addClass('imageFocus');
                //         keyHandlar.callPreviews("banners", 0);
                //     }
                // } else if (presentPagedetails.currentSection != undefined) {
                //     Yup('.imageFocus').removeClass('imageFocus');
                //     var cIdx = presentPagedetails.sectionIndex[presentPagedetails.currentSection] || 0;
                //     Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + cIdx).addClass('imageFocus');
                //     var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, cIdx);
                //     keyHandlar.callPreviews("sections", presentPagedetails.currentSection, cIdx, data);
                // } else if (Yup('#sectionItem-0-0').length > 0) {
                //     Yup('.imageFocus').removeClass('imageFocus');
                //     Yup('#sectionItem-0-0').addClass('imageFocus');
                //     var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
                //     keyHandlar.callPreviews("sections", 0, 0, data);
                // }
            }
            else if (presentPagedetails.view == 'content' && presentPagedetails.targetPath != 'home' && presentPagedetails.targetPath != firstMenu && backData.length > 0 && (presentPagedetails.pageSubType != "networkDetails" || presentPagedetails.targetPath == "free") && presentPagedetails.pageSubSubtype != "sportsList") {
                keyHandlar.stopPreviewTrailers();
                Yup('.imageFocus').removeClass('imageFocus');
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            else if (presentPagedetails.view == 'search') {
                keyHandlar.stopPreviewTrailers();
                Yup('.imageFocus').removeClass('imageFocus');
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            else if (source == 'menus' && isSidemenuOpened == true && (presentPagedetails.targetPath == firstMenu || presentPagedetails.activemainmenu == firstMenu)) {
                Main.sidebarClose();
                if (presentPagedetails.banners && presentPagedetails.banners.length > 0 && Yup('.banners').css('display') != 'none') {
                    var activeBanner = Yup(".active-banner").attr("id");
                    if (activeBanner) {
                        var splIds = activeBanner.split("-");
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass('imageFocus');
                        keyHandlar.callPreviews("banners", parseInt(splIds[1]));
                    } else {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-0').addClass('imageFocus');
                        keyHandlar.callPreviews("banners", 0);
                    }
                } else if (presentPagedetails.currentSection != undefined) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    var cIdx = presentPagedetails.sectionIndex[presentPagedetails.currentSection] || 0;
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + cIdx).addClass('imageFocus');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, cIdx);
                    keyHandlar.callPreviews("sections", presentPagedetails.currentSection, cIdx, data);
                } else if (Yup('#sectionItem-0-0').length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#sectionItem-0-0').addClass('imageFocus');
                    var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
                    keyHandlar.callPreviews("sections", 0, 0, data);
                }
            }
            else {
                keyHandlar.stopPreviewTrailers();
                Main.previousPage();
            }
            break;
        }
        case tvKeyCode.Enter: {
            //  if (source == "tabsSection") {
            //     var splitData = id.split('-');
            //         keyHandlar.stopPreviewTrailers();
            //     Yup(".imageFocus").removeClass("imageFocus");
            //     // Yup("#tab-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
            // }
            if (source == "tabsSection") {

                var splitData = id.split('-');   // tab-7-2
                var sectionIndex = parseInt(splitData[1]);
                var tabIndex = parseInt(splitData[2]);

                keyHandlar.stopPreviewTrailers();

                // Focus update
                Yup("#tabs-" + sectionIndex + " li").removeClass("imageFocus");
                Yup("#" + id).addClass("imageFocus");
                Yup("#tabs-" + sectionIndex + " .active_tab").removeClass("active_tab");
                Yup("#" + id).addClass("active_tab");

                // Render selected tab data
                Main.onTabSelect(sectionIndex, tabIndex);
                keyHandlar.addSectionKeyIndex(sectionIndex, 0);
            }

            else {
                keyHandlar.previousTabbedPositionFocus();
                if (!!bannerScrollListner) { clearInterval(bannerScrollListner) }
                keyHandlar.stopPreviewTrailers();
                keyHandlar.contentEnterHandlar(id, source);
            }
            break;
        }
        default: {
            break;
        }
    }
}
keyHandlar.stopPreviewTrailers = function () {
    var videos = document.querySelectorAll("video.preview-video");
    if (videos.length > 0) {
        for (var i = 0; i < videos.length; i++) {
            try {
                videos[i].pause();
                videos[i].src = "";
                if (videos[i].parentElement) {
                    videos[i].parentElement.removeChild(videos[i]);
                }
            } catch (e) { }
        }

        var posters = document.querySelectorAll(
            ".shows-image > img:not(.partner_logo_inner)"
        );
        for (var j = 0; j < posters.length; j++) {
            posters[j].style.opacity = "1";
        }
    }
    if (!!apiCallTimeout) {
        clearTimeout(apiCallTimeout);
        apiCallTimeout = undefined;
    }

    if (keyHandlar.trailerAjaxRequest) {
        try {
            keyHandlar.trailerAjaxRequest.abort();
        } catch (e) { }
        keyHandlar.trailerAjaxRequest = null;
    }

    if (keyHandlar.previewTimer) {
        clearTimeout(keyHandlar.previewTimer);
        keyHandlar.previewTimer = null;
    }
    if (keyHandlar.previewImageChangeTimer) {
        clearTimeout(keyHandlar.previewImageChangeTimer);
        keyHandlar.previewImageChangeTimer = null;
    }
    if (keyHandlar.trailerEndTimer) {
        clearTimeout(keyHandlar.trailerEndTimer);
        keyHandlar.trailerEndTimer = null;
    }
    if (keyHandlar.expandDelayTimer) {
        clearTimeout(keyHandlar.expandDelayTimer);
        keyHandlar.expandDelayTimer = null;
    }

    var liveVideo = document.querySelector("video");
    if (liveVideo) {
        try {
            if (presentPagedetails && presentPagedetails.clickSection && presentPagedetails.trailerID && presentPagedetails.h_indexs && presentPagedetails.trailerID != undefined && presentPagedetails.h_indexs != null) {
                clevertapservice.sendCleverTapEvent('video stopped', utilities.sendEventItems(presentPagedetails.clickSection, presentPagedetails.trailerID + 1, presentPagedetails.h_indexs + 2));
                ctEvent.itemForTrailer = ""
                console.log("Video is paused.");
            }
            liveVideo.pause();
            liveVideo.src = ""; // Ensures audio stops
            liveVideo.load(); // Forces cleanup of media resource

            // Remove all event listeners safely before deleting
            liveVideo.onended = null;
            liveVideo.onpause = null;
            liveVideo.onplaying = null;
            liveVideo.onplay = null;
            liveVideo.ontimeupdate = null;

            // Remove video element from the DOM
            if (liveVideo.parentElement) {
                liveVideo.parentElement.removeChild(liveVideo);
            }

            // Reset video object to null
            liveVideo = null;
            console.log("Video stopped and cleaned up successfully.");
        } catch (err) {
            console.error("Error during video cleanup:", err);
        }
    } else {
        // console.warn("No live video element found for cleanup.");
    }

    if (livePreview) {
        // Properly destroy the HLS player instance
        livePreview.unload().then(function () {
            return livePreview.destroy();
        }).then(function () {
            console.log("HLS Player instance successfully destroyed.");
            livePreview = null;
        }).catch(function (error) {
            console.error("Error destroying HLS Player", error);
        });
    }

    // Destroy HLS instance if exists
    if (typeof hls !== "undefined" && hls) {
        try {
            hls.destroy();
            hls = null;
            console.log("HLS instance destroyed.");
        } catch (error) {
            console.error("Error destroying HLS instance:", error);
        }
    }

    // analytics.plugin.handlePlayEndedByUser();
    // analytics.plugin.handlePlayEndedByUser();
    if (
        analytics &&
        analytics.plugin &&
        typeof analytics.plugin.handlePlayEndedByUser === "function"
    ) {
        analytics.plugin.handlePlayEndedByUser();
    }
};

keyHandlar.createVideoTag = function (comingFrom, srcUrl, vert_index, hori_index) {
    // Focus check: Ensure we are still on the same item that triggered the preview
    var currentFocusId = Yup('.imageFocus').attr('id');
    var expectedId = (comingFrom === "sections") ? "sectionItem-" + vert_index + "-" + hori_index : "WatchBannerBtn-" + vert_index;

    if (currentFocusId !== expectedId) {
        console.log("createVideoTag focus changed, expected: " + expectedId + ", current: " + currentFocusId);
        return;
    }

    // Set the attributes
    liveVideo = document.createElement("video");
    liveVideo.setAttribute("autoplay", "autoplay");
    liveVideo.setAttribute("muted", "false"); // Note: `muted` is usually a boolean attribute; you can omit this if needed.
    liveVideo.setAttribute("crossorigin", "anonymous");
    liveVideo.setAttribute("data-src", ""); // Empty for now; can be updated later
    liveVideo.setAttribute("type", "video/mp4");
    liveVideo.style.top = "0";
    liveVideo.style.left = "0";
    if (comingFrom == "sections") {
        liveVideo.setAttribute("id", "sectionItem-" + vert_index + '-' + hori_index);
        liveVideo.style.position = "absolute";
        if (keyHandlar.isHD) {
            liveVideo.style.width = "685px";
            liveVideo.style.height = "384px";
        }
        else {
            liveVideo.style.width = "1024px";
            liveVideo.style.height = "576px";
        }
        liveVideo.style.objectFit = "cover";
        document.getElementById("banner_preview-" + vert_index + '-' + hori_index).appendChild(liveVideo);
        liveVideo.muted = false;
        liveVideo.setAttribute("src", srcUrl); // Empty for now; set video source here if available
    }
    // else if(comingFrom == "banners"){
    //     liveVideo.setAttribute("id", "bannerImage-" + vert_index);
    //     liveVideo.style.position = "fixed";
    //     liveVideo.style.width = "100vw";
    //     liveVideo.style.height = "100vh";
    //     liveVideo.style.objectFit = "cover";
    //     document.getElementById("top_bannerimg-"+vert_index).appendChild(liveVideo);
    //     liveVideo.setAttribute("src", srcUrl); // Empty for now; set video source here if available
    // }


    // Listen for the 'ended' event
    liveVideo.addEventListener("ended", function () {
        console.log("Preview video ended");

        if (comingFrom === "sections") {
            keyHandlar.setExpandPreviewImage(vert_index, hori_index);
        }

        liveVideo.parentElement.removeChild(liveVideo);

        if (comingFrom === "banners") {
            BannerMove();
        }
    });

}

//Switch profile key handular
keyHandlar.switchProfile = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            // var splitData = id.split('-');
            // if (source == 'profilePage') {
            //     var currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
            //     var splitIds = parseInt(splitData[1]) - 1
            //     if (Yup("#profile-" + splitIds).length > 0) {
            //         Yup(".profile-block").removeClass("imageFocus");
            //         Yup("#profile-" + splitIds).addClass("imageFocus");
            //     }
            //     else if (!!currentUserDetails && Yup("#menusWrapper").css("display") != "none" && Yup("#menusWrapper .side-menu").length > 0) {
            //         Yup('.imageFocus').removeClass('imageFocus');
            //         Yup('.menu-item.menu-active').addClass('imageFocus');
            //         Main.sidebarOpen();
            //     }
            // }
            // else if (source == "menus") {
            //     keyHandlar.menuKeyHandular(id, event);
            // }
            break;
        }
        case tvKeyCode.ArrowRight: {
            // var splitData = id.split('-');
            // if (source == 'profilePage') {
            //     var splitIds = parseInt(splitData[1]) + 1
            //     if (Yup("#profile-" + splitIds).length > 0) {
            //         Yup(".profile-block").removeClass("imageFocus");
            //         Yup("#profile-" + splitIds).addClass("imageFocus");
            //     }
            // }
            // else if (source == "menus") {
            //     Yup('.imageFocus').removeClass('imageFocus');
            //     Yup('#profile-0').addClass('imageFocus');
            //     Main.sidebarClose();
            // }
            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (source == 'profilePage') {
                var currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
                var splitIds = parseInt(splitData[1]) - 1
                if (Yup("#profile-" + splitIds).length > 0) {
                    Yup(".profile-block").removeClass("imageFocus");
                    Yup("#profile-" + splitIds).addClass("imageFocus");
                }
                else if (!!currentUserDetails && Yup("#menusWrapper").css("display") != "none" && Yup("#menusWrapper .side-menu").length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.menu-item.menu-active').addClass('imageFocus');
                    Main.sidebarOpen();
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (source == 'profilePage') {
                var splitIds = parseInt(splitData[1]) + 1
                if (Yup("#profile-" + splitIds).length > 0) {
                    Yup(".profile-block").removeClass("imageFocus");
                    Yup("#profile-" + splitIds).addClass("imageFocus");
                }
            }
            else if (source == "menus") {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup('#profile-0').addClass('imageFocus');
                Main.sidebarClose();
            }
            break;
        }
        case 8:
        case tvKeyCode.Return: {
            var currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
            if (presentPagedetails.contentNotFound == true) {
                Main.apiCall(firstMenu);
                isSidemenuOpened = false;
            }
            else if (isSidemenuOpened == false && !currentUserDetails) {
                // Main.apiCall(firstMenu);
                // isSidemenuOpened = false;
                Main.popupData = {
                    popuptype: 'noData',
                    message: 'Are you sure you want to exit ?',
                    buttonCount: 2,
                    yesText: 'Exit',
                    yesTarget: 'exit',
                    noText: 'Cancel',
                    noTarget: 'close',
                    onBack: 'close'
                }
                Yup("#popUpFDFS").html(Util.signoutComformation());
                Yup("#popup-btn-1").addClass('popupFocus');
                clevertapservice.sendCleverTapEvent('popup', {
                    'action': 'popup displayed',
                    'label': 'exit',
                    'popup name': 'exit',
                    'button label': '',
                    // 'tab':ctEvent.tabName,  
                })
                //  if (keyHandlar.isExitWindowActive) {
                //     Yup('.toastmsg_template').css('display', 'none');
                //     keyHandlar.isExitWindowActive = false;
                //     if (keyHandlar.exitToastTimer) clearTimeout(keyHandlar.exitToastTimer);
                //     if (keyHandlar.exitWindowTimer) clearTimeout(keyHandlar.exitWindowTimer);
                //     window.close();
                // } else {
                //     keyHandlar.isExitWindowActive = true;
                //     Yup('.toastmsg_template').html('Press back again to exit');
                //     Yup('.toastmsg_template').css('display', 'block');
                //     if (keyHandlar.exitToastTimer) clearTimeout(keyHandlar.exitToastTimer);
                //     keyHandlar.exitToastTimer = setTimeout(function () {
                //         Yup('.toastmsg_template').css('display', 'none');
                //     }, 2000);
                //     if (keyHandlar.exitWindowTimer) clearTimeout(keyHandlar.exitWindowTimer);
                //     keyHandlar.exitWindowTimer = setTimeout(function () {
                //         keyHandlar.isExitWindowActive = false;
                //     }, 10000);
                // }
            }
            else {
                isSidemenuOpened = false;
                Main.apiCall(firstMenu);
            }
            break;
        }
        case tvKeyCode.Enter: {
            if (source == 'profilePage') {
                keyHandlar.switchProfileEnter(id, source);
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        default: {
            break;
        }
    }
}



keyHandlar.switchProfileEnter = function (id, source) {
    var profileId = Yup('.imageFocus').attr("profile-id");
    var isProfileLockActive = Yup('.imageFocus').attr("isProfileLockActive");
    var profileImageUrl = Yup('.imageFocus').find('.profile_img').attr('src');
    if (source == 'profilePage' || source == "SettingsprofilePage") {
        tempObjectData.profileId = profileId;
        tempObjectData.isProfileLockActive = isProfileLockActive;
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        userDetails.phoneNumber = userDetails.phoneNumber.replace(/^91-/, '');
        tempObjectData.mobileNo = userDetails.phoneNumber
        for (var i = 0; i < presentPagedetails.profileDetails.response.length; i++) {
            if (presentPagedetails.profileDetails.response[i].profileId == tempObjectData.profileId) {
                var clickedProfile = presentPagedetails.profileDetails.response[i];
                if (profileImageUrl) {
                    clickedProfile.profileImageUrl = profileImageUrl;
                }
                localStorage.setItem("clickedProfile", JSON.stringify(clickedProfile));
            }
        }
        if (isProfileLockActive != "true") {
            Main.getSwitchProfileApi();
        } else {
            view = 'profileLockOtpVerification';
            currentBox = 0;
            Main.processNext();
        }
    }
}

//list page key handular
keyHandlar.listKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    var noOfCardForARow = 0;
    var h_length;
    if (presentPagedetails.sections.length > 0) {
        h_length = presentPagedetails.sections[0].sectionControls.dataLength;
        if (h_length > 0) {
            noOfCardForARow = keyHandlar.noOfCardForARowInGrid(presentPagedetails.sections[0].sectionData.data[0].cardType)
        }
    }
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (h_length > 0 && source != "menus") {
                var splitData = id.split('-');
                v_index = parseInt(splitData[1]);
                h_index = parseInt(splitData[2]);
                if (h_index != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]));
                    Yup("#sectionItem-" + v_index + "-" + (h_index - 1)).addClass("imageFocus");
                    Main.sidebarClose();
                } else {
                    if (Yup("#menusWrapper").css("display") != "none") {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(".menu-item.menu-active").addClass("imageFocus");
                        Main.sidebarOpen();
                    }
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == "menus") {
                var splitData = id.split('-');
                if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (Yup(".top-menu-item.top-menu-active").length > 0) {
                        Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                    } else {
                        Yup(".top-menu-item").first().addClass("imageFocus");
                    }
                    Main.sidebarClose();
                } else if (!!presentPagedetails.currentSection) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                    Main.sidebarClose();
                } else if ((presentPagedetails.sections && presentPagedetails.sections.length > 0) || Yup("#sectionItem-0-0").length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-0-0").addClass("imageFocus");
                    Main.sidebarClose();
                }
            }
            else if (h_length > 0) {
                var splitData = id.split('-');
                v_index = parseInt(splitData[1]);
                h_index = parseInt(splitData[2]);
                if (h_index < (noOfCardForARow - 1)) {
                    if ((((v_index + 1) * noOfCardForARow) - (noOfCardForARow - (h_index + 1))) < h_length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                        keyHandlar.addCurrentSection(parseInt(splitData[1]) + 1);
                        Yup("#sectionItem-" + v_index + "-" + (h_index + 1)).addClass("imageFocus");
                    }
                }
            }

            break;
        }
        case tvKeyCode.ArrowUp: {
            if (h_length > 0 && source != "menus") {
                var splitData = id.split('-');
                v_index = parseInt(splitData[1]);
                h_index = parseInt(splitData[2]);
                if (v_index != 0) {
                    if (v_index != 0) {
                        Yup("#viewAllrow-" + (v_index - 1)).show();
                    }
                    Yup(".imageFocus").removeClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]) - 1);
                    Yup("#sectionItem-" + (v_index - 1) + "-" + h_index).addClass("imageFocus");
                } else if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (Yup(".top-menu-item.top-menu-active").length > 0) {
                        Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                    } else {
                        Yup(".top-menu-item").first().addClass("imageFocus");
                    }
                }
            }
            else if (source == 'menus') {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (h_length > 0 && source != "menus") {
                var splitData = id.split('-');
                v_index = parseInt(splitData[1]);
                h_index = parseInt(splitData[2]);
                if (v_index < Math.floor((h_length - 1) / noOfCardForARow)) {
                    if (v_index < Math.floor((h_length - 1) / noOfCardForARow)) {
                        Yup("#viewAllrow-" + v_index).hide();
                    }
                    if ((((v_index + 2) * noOfCardForARow) - (noOfCardForARow - (h_index + 1)) <= h_length)) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]) + 1, 0)
                        keyHandlar.addCurrentSection(parseInt(splitData[1]) + 1)
                        Yup("#sectionItem-" + (v_index + 1) + "-" + h_index).addClass("imageFocus");
                    } else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        var lastindexvalue = h_length - ((v_index + 1) * noOfCardForARow);
                        Yup("#sectionItem-" + (v_index + 1) + "-" + (lastindexvalue - 1)).addClass("imageFocus");
                    }
                    //pagiantion
                    if (v_index == (Math.floor((h_length - 1) / noOfCardForARow) - 1)) {
                        if (presentPagedetails.sections[0].sectionData.hasMoreData == true)
                            Main.viewAllPagination();
                    }
                }
            }
            else if (source == 'menus') {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 461: {
            if (source == "menus") {
                var splitData = id.split('-');
                if (!!presentPagedetails.currentSection) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                    Main.sidebarClose();
                } else if ((presentPagedetails.sections && presentPagedetails.sections.length > 0) || Yup("#sectionItem-0-0").length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-0-0").addClass("imageFocus");
                    Main.sidebarClose();
                }
            }
            else if (refreshFav == true && presentPagedetails.subView == "favourites_list") {
                Main.apiCall('favourites');
                refreshFav = false
            }
            else {
                Main.previousPage();
            }
            break;
        }
        case 10009: {
            if (source == "menus") {
                var splitData = id.split('-');
                if (!!presentPagedetails.currentSection) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                    Main.sidebarClose();
                } else if ((presentPagedetails.sections && presentPagedetails.sections.length > 0) || Yup("#sectionItem-0-0").length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-0-0").addClass("imageFocus");
                    Main.sidebarClose();
                }
            }
            else if (refreshFav == true && presentPagedetails.subView == "favourites_list") {
                Main.apiCall('favourites');
                refreshFav = false
            }
            else {
                Main.previousPage();
            }
            break;
        }
        case tvKeyCode.Enter: {
            if (presentPagedetails.subView == "favourites_list") {
                navigatFavListToDetails = true;
            }
            keyHandlar.contentEnterHandlar(id, source);
            break;
        }
        default: {
            break;
        }
    }
}

//search page key handular
keyHandlar.searchKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == 'letters') {
                var splitData = id.split('-');
                if (((parseInt(splitData[1])) % 6)) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                } else if (!!presentPagedetails.menuIndex) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#menu-' + (parseInt(presentPagedetails.menuIndex))).addClass('imageFocus');
                    Yup('#menu-' + (parseInt(presentPagedetails.menuIndex))).addClass('active');
                    Main.sidebarOpen();
                    view = 'menus';
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#menu-0').addClass('imageFocus');
                    Yup('#menu-0').addClass('active');
                    Main.sidebarOpen();
                    view = 'menus';
                }
            }
            else if (source == 'settings') {
                var splitData = id.split('-');
                if (splitData[1] == 'back') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-space").addClass("imageFocus");
                }
                else if (splitData[1] == 'space') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-clear").addClass("imageFocus")
                }
                else if (splitData[1] == 'clear') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#menu-0').addClass('imageFocus');
                    Yup('#menu-0').addClass('active');
                    Main.sidebarOpen();
                }
            }
            else if (source == 'tabs') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-5").addClass("imageFocus");
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#searchTab-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                }
            }
            else if (source == 'cards') {
                var splitData = id.split('-');
                if (parseInt(splitData[2]) == 0) {
                    // focus moves to keypad
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-5").addClass("imageFocus");
                    keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                } else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#card-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                }
            }
            else if (source == 'sections') {
                var splitData = id.split('-');
                if (parseInt(splitData[2]) == 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-5").addClass("imageFocus");
                    keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                } else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                }
            }
            else if (source == 'suggestion') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup('.menu-item.menu-active').addClass('imageFocus');
                Main.sidebarOpen();
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == 'letters') {
                var splitData = id.split('-');
                var rowIndex = parseInt(splitData[1]);
                if ((rowIndex + 1) % 6 === 0 && isSearching == false && (Yup('.search_sectionsHome').css('display') == 'block' && Yup('.search_inner').css('display') != 'block')) {
                    if (!!presentPagedetails.previousCardFocus) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (parseInt(presentPagedetails.previousCardFocus.row)) + '-0').addClass("imageFocus");
                    }
                    else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-0-0").addClass("imageFocus");
                    }

                }
                else if (isSearching == false && ((rowIndex + 1) % 6 === 0)) {

                    if (!!presentPagedetails.previousCardFocus && presentPagedetails.searchResults.length > 0 && Yup('.search_inner').css('display') == 'block') {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(presentPagedetails.previousCardFocus.row)) + '-0').addClass("imageFocus");
                    }
                    else if (!!Yup("#searchTab-0").length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#searchTab-0").addClass("imageFocus");
                    }
                }
                else if (Yup("#key-" + (rowIndex + 1)).length > 0 && (rowIndex + 1) % 6 != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-" + (rowIndex + 1)).addClass("imageFocus");
                }
            }
            else if (source == 'settings') {
                var splitData = id.split('-');
                if (splitData[1] == 'clear') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-space").addClass("imageFocus");
                }
                else if (splitData[1] == 'space') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-back").addClass("imageFocus")
                }
                else if (splitData[1] == 'back') {
                    if (presentPagedetails.trendingSearch.response.data.length > 0 && Yup('.search_sectionsHome').css('display') == 'block') {
                        if (!!presentPagedetails.previousCardFocus) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (parseInt(presentPagedetails.previousCardFocus.row)) + '-0').addClass("imageFocus");
                        }
                        else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-0-0").addClass("imageFocus");
                        }
                    }
                    else if (!!presentPagedetails.previousCardFocus && !!presentPagedetails.arrayResults.length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(presentPagedetails.previousCardFocus.row)) + '-' + (parseInt(presentPagedetails.previousCardFocus.column))).addClass("imageFocus");
                    }
                    else if (!!Yup("#searchTab-0").length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#searchTab-0").addClass("imageFocus");
                    }
                }
            }
            else if (source == 'tabs') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) < presentPagedetails.tabsArray.length - 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#searchTab-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
            }
            else if (source == 'cards') {
                var splitData = id.split('-');
                if (parseInt(splitData[2]) < 2) {
                    if (!!Yup("#card-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) + 1)).length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    }
                }
                // keyhandlers for rightcard fromlastcard in row
                else if (!!Yup("#cardSection-" + (parseInt(splitData[1]) + 2)).length || !!presentPagedetails.pagination) {
                    // if(!!Yup("#card-"+(parseInt(splitData[1])+1)+'-0').length){
                    //     Yup("#cardSection-"+(parseInt(splitData[1]))).addClass("hideRow")
                    //     Yup(".imageFocus").removeClass("imageFocus");
                    //     Yup("#card-"+(parseInt(splitData[1])+1)+'-0').addClass("imageFocus");
                    // }
                    // pagination
                    if ((parseInt(splitData[1])) == (presentPagedetails.paginationIndex - 3)) {
                        if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
                            presentPagedetails.pagination = true;
                        }
                        Main.getSearchResults(presentPagedetails.searchedText, presentPagedetails.searchTabsVal);
                    }
                } else if (!!Yup("#card-" + (parseInt(splitData[1]) + 1) + '-0').length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#card-" + (parseInt(splitData[1]) + 1) + '-0').addClass("imageFocus");
                }
            }
            else if (source == 'sections') {
                var splitData = id.split('-');
                if (parseInt(splitData[2]) < 2) {
                    if (!!Yup("#sectionItem-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) + 1)).length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (parseInt(splitData[1])) + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    }
                }
                // keyhandlers for rightcard fromlastcard in row
                //  else if(!!Yup("#viewAllrow-"+(parseInt(splitData[1])+2)).length || !!presentPagedetails.pagination){
                //     if(!!Yup("#sectionItem-"+(parseInt(splitData[1])+1)+'-0').length){
                //         Yup("#viewAllrow-"+(parseInt(splitData[1]))).css('display', 'none');
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         Yup("#sectionItem-"+(parseInt(splitData[1])+1)+'-0').addClass("imageFocus");
                //     }
                // }
                // else if(!!Yup("#sectionItem-"+(parseInt(splitData[1])+1)+'-0').length){
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup("#sectionItem-"+(parseInt(splitData[1])+1)+'-0').addClass("imageFocus");
                // }
            }
            else if (source == 'suggestion') {
                var splitData = id.split('-');
                if (!!Yup("#searchTab-0").length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#searchTab-0").addClass("imageFocus");
                    keyHandlar.addSuggResultFocus(parseInt(splitData[1]));
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (source == 'letters' || source == 'numbers') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) > 5) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-" + (parseInt(splitData[1]) - 6)).addClass("imageFocus");
                }
            }
            else if (source == 'settings') {
                var splitData = id.split('-');
                if (splitData[1] == 'clear') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-30").addClass("imageFocus");
                } else if (splitData[1] == 'back') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-33").addClass("imageFocus");
                }
                else if (splitData[1] == 'space') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-30").addClass("imageFocus");
                }
            }
            else if (source == 'suggestion') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) != 0) {
                    Yup("#suggRes-" + (parseInt(splitData[1]) - 4)).removeClass("hideSuggRow");
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#suggRes-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                    keyHandlar.addSuggResultFocus(parseInt(splitData[1]));
                } else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-space").addClass("imageFocus");
                    keyHandlar.addSuggResultFocus(parseInt(splitData[1]));
                }
            }
            else if (source == 'cards') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) > 0) {
                    if (!!Yup("#cardSection-" + (parseInt(splitData[1]) - 1)).length) {
                        Yup("#cardSection-" + (parseInt(splitData[1]) - 1)).removeClass("hideRow")
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(splitData[1]) - 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                    }
                } else if (parseInt(splitData[1]) == 0) {
                    if (presentPagedetails.activeSearchTab == "") {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#searchTab-0").addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                    } else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#" + presentPagedetails.activeSearchTab).addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]), parseInt(splitData[2]));
                    }
                }
                // else if(!!Yup("#cardSection-"+(parseInt(splitData[1] -1))).length){
                //     Yup("#cardSection-"+(parseInt(splitData[1]))).addClass("hideRow")
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup("#card-"+(parseInt(splitData[1])+1)+'-'+(parseInt(splitData[2]))).addClass("imageFocus");
                // }
            }
            else if (source == 'sections') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) > 0) {
                    if (!!Yup("#viewAllrow-" + (parseInt(splitData[1]) - 1)).length) {
                        Yup("#viewAllrow-" + (parseInt(splitData[1]) - 1)).css('display', 'block');
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                    }
                }

            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == 'letters' || source == 'numbers') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) <= 29) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-" + (parseInt(splitData[1]) + 6)).addClass("imageFocus");
                } else if (30 <= parseInt(splitData[1]) && parseInt(splitData[1]) <= 31) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-clear").addClass("imageFocus");
                }
                else if (32 <= parseInt(splitData[1]) && parseInt(splitData[1]) <= 33) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-space").addClass("imageFocus");
                }
                else if (34 <= parseInt(splitData[1]) && parseInt(splitData[1]) <= 35) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#key-back").addClass("imageFocus");
                }
            }
            else if (source == 'settings') {
                var splitData = id.split('-');
                if (presentPagedetails.searchSuggestion.length > 0) {
                    if (!!presentPagedetails.addSuggResultFocus) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#suggRes-" + parseInt(presentPagedetails.addSuggResultFocus)).addClass("imageFocus");
                    } else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#suggRes-0").addClass("imageFocus");
                    }
                }
            }
            else if (source == 'suggestion') {
                var splitData = id.split('-');
                if (!!Yup("#suggRes-" + (parseInt(splitData[1]) + 1)).length) {
                    Yup("#suggRes-" + (parseInt(splitData[1]) - 3)).addClass("hideSuggRow");
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#suggRes-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
            }
            else if (source == 'tabs') {
                if (isSearchLoad == false) {
                    if (!!presentPagedetails.previousCardFocus && !!presentPagedetails.arrayResults.length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(presentPagedetails.previousCardFocus.row)) + '-' + (parseInt(presentPagedetails.previousCardFocus.column))).addClass("imageFocus");
                    }
                    else if (!!Yup("#card-0-0").length) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-0-0").addClass("imageFocus");
                    }
                }
            }
            else if (source == 'cards') {
                // need to halt user accordingly with cards count length
                var splitData = id.split('-');
                if (!!Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).length) {
                    if (!!Yup("#cardSection-" + (parseInt(splitData[1]) + 2)).length || !!presentPagedetails.pagination) {
                        Yup("#cardSection-" + (parseInt(splitData[1]))).addClass("hideRow")
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]) + 1, parseInt(splitData[2]))
                    } else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]) + 1, parseInt(splitData[2]))
                    }
                    if ((parseInt(splitData[1])) == (presentPagedetails.paginationIndex - 3)) {
                        if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
                            presentPagedetails.pagination = true;
                        }
                        if (presentPagedetails.searchResults.length >= 30) {
                            Main.getSearchResults(presentPagedetails.searchedText, presentPagedetails.searchTabsVal);
                            isSearching = false;
                        }
                    }
                } else if (!!Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 1)).length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                } else if (!!Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 2)).length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#card-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 2)).addClass("imageFocus");
                }
            }
            else if (source == 'sections') {
                // need to halt user accordingly with cards count length
                var splitData = id.split('-');
                if (!!Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).length) {
                    if (!!Yup("#viewAllrow-" + (parseInt(splitData[1]) + 2)).length || !!presentPagedetails.pagination) {
                        Yup("#viewAllrow-" + (parseInt(splitData[1]))).css('display', 'none');
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]) + 1, parseInt(splitData[2]))
                    } else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]))).addClass("imageFocus");
                        keyHandlar.previousCardFocus(parseInt(splitData[1]) + 1, parseInt(splitData[2]))
                    }
                    if ((parseInt(splitData[1])) == (presentPagedetails.paginationIndex - 3)) {
                        if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
                            presentPagedetails.pagination = true;
                        }
                        Main.getSearchResults(presentPagedetails.searchedText, presentPagedetails.searchTabsVal);
                    }
                } else if (!!Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 1)).length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                } else if (!!Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 2)).length) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + '-' + (parseInt(splitData[2]) - 2)).addClass("imageFocus");
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009:
        case 461: {
            if (source == "menus") {
                Main.sidebarClose();
                Yup(".imageFocus").removeClass("imageFocus");
                Main.apiCall(firstMenu);
            }
            else {
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }

            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.searchEnterHandlar(id);
        }
        default: {
            break;
        }
    }
}

//search enter key handular
keyHandlar.searchEnterHandlar = function (id) {
    var source = Yup('#' + id).attr("source");
    var splitData = id.split('-');
    if (source == 'settings') {
        var splitData = id.split('-');
        // if(parseInt(splitData[1])==51){  //char to number change
        //     var selectedKeyMap = Yup("#Alpha-51").attr("keyValue");
        //     presentPagedetails.sectionIndex[1]=0;
        //     Yup(".imageFocus").removeClass("imageFocus");
        //     Yup('#'+id).addClass("imageFocus");
        //     if(selectedKeyMap == 'ABC')	{
        //         Yup("#characterMap").hide();
        //         Yup("#NumbersMap").show();
        //         Yup("#Alpha-51").attr("keyValue","123");
        //         Yup("#Alpha-51").text("123");
        //     } else{
        //         Yup("#characterMap").show();
        //         Yup("#NumbersMap").hide();
        //         Yup("#Alpha-51").attr("keyValue","ABC");
        //         Yup("#Alpha-51").text("ABC");
        //     }
        // }
        if ((splitData[1]) == "clear") {  //clear
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#' + id).addClass("imageFocus");
            Yup("#searchData").text("Start Typing");
            Yup("#searchData").removeClass('active');
            Yup('.searchSuggestions').html('');
            Yup('#resultsCount').html('');
            Yup('#searchResults').html('');
            Yup(".search_sectionsHome").show()
            presentPagedetails.searchSuggestion = {};
            presentPagedetails.searchResults = [];
            Yup('.searchSuggestions').animate({ height: 15 }, 200);
            // Yup(".searchText").css("float", "none");
            Yup("#searchName").html("")
        } else if ((splitData[1]) == 'back') {  //backspace
            presentPagedetails.activeSearchTab = '';
            var searchText = Yup("#searchData").text();
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#' + id).addClass("imageFocus");
            if (searchText.length > 0 && searchText != "Start Typing") {
                var containsOnlySpaces = /^\s*$/.test(searchText);
                if (searchText.charAt(searchText.length - 1) === ' ' && containsOnlySpaces == false) {
                    var removingSpace = true
                }
                searchText = searchText.substr(0, searchText.length - 1);
                Yup("#searchData").text(searchText);
                var containsOnlySpaces = /^\s*$/.test(searchText);
                if (!containsOnlySpaces) {
                    if (searchText.length > 1) {
                        var displayText = "Showing Results for - " + searchText;
                        Yup("#searchName").html(displayText)
                    }
                }
                else {
                    Yup("#searchName").html("")
                }
                if (searchText.trim().length == 1) {
                    Yup('.searchSuggestions').html('');
                    Yup('#resultsCount').html('');
                    Yup('#searchResults').html('');
                    Yup(".search_sectionsHome").show()
                    Yup("#searchName").html("")
                    // Yup(".search_right_side").html("")
                    presentPagedetails.searchResults = [];
                    if (!!searchSubscribe) { clearTimeout(searchSubscribe); }

                }

                else if (searchText.trim().length >= 2 && !containsOnlySpaces) {
                    removingSpace = false
                    if (!!searchSubscribe) { clearTimeout(searchSubscribe); }
                    searchSubscribe = setTimeout(function () { Main.getSearchResults(searchText) }, 1000);
                }
                else {
                    if (searchText.length == 0) {
                        if (!!searchSubscribe) { clearTimeout(searchSubscribe); }
                        Yup("#searchData").text("Start Typing");
                        Yup("#searchData").removeClass('active');
                        Yup('.searchSuggestions').html('');
                        Yup('#resultsCount').html('');
                        Yup('#searchResults').html('');
                        Yup(".search_sectionsHome").show()
                        presentPagedetails.searchResults = [];
                    }
                    if (!!searchSubscribe) {
                        clearTimeout(searchSubscribe);
                        searchSubscribe = undefined
                    }
                    presentPagedetails.pagination = false;
                    presentPagedetails.activeSearchTab = '';
                    presentPagedetails.arrayResults = [];
                    presentPagedetails.searchResults = [];

                    for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
                        presentPagedetails.tabsArray[i].data = '';
                        presentPagedetails.tabsArray[i].lastDoc = '';
                        presentPagedetails.tabsArray[i].lastSearchOrder = '';
                        presentPagedetails.tabsArray[i].errorMsg = "";

                    }
                }
            }
        }
        else if ((splitData[1]) == "space") {  //space
            var searchText = Yup("#searchData").text();
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#' + id).addClass("imageFocus");
            if (searchText == "Start Typing") {
                searchText = '';
                Yup("#searchData").addClass('active');
                Yup("#searchData").text(searchText + ' ');
            } else if (searchText.length < 14) {
                Yup("#searchData").text(searchText + ' ');
                presentPagedetails.pagination = false;
                presentPagedetails.activeSearchTab = '';

                for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
                    presentPagedetails.tabsArray[i].data = '';
                    presentPagedetails.tabsArray[i].lastDoc = '';
                    presentPagedetails.tabsArray[i].lastSearchOrder = '';
                    presentPagedetails.tabsArray[i].errorMsg = "";

                }
                if (searchText.length > 1) {
                    if (Yup("#getSearchResults").css("display") == 'none') {
                        searchSubscribe = setTimeout(function () { Main.getSearchResults(searchText) }, 1000);
                    }
                }
            }
        }
    }
    else if (source == 'letters' || source == 'numbers') {
        var searchText = Yup("#searchData").text();
        var value = Yup('#' + id).attr("keyValue");
        Yup(".imageFocus").removeClass("imageFocus");
        Yup('#' + id).addClass("imageFocus");
        // presentPagedetails.searchPaginationPage={
        // 	'page':0,
        // 	'searchPaginationHit':true
        // }
        if (searchText == "Start Typing") {
            searchText = '';
            Yup("#searchData").addClass('active');
            Yup("#searchData").text(searchText + value);

            if (searchText.length > 0) {
                if (!!searchSubscribe) { clearTimeout(searchSubscribe); }
                Yup(".search_sectionsHome").hide()
                if (Yup("#getSearchResults").css("display") == 'none') {
                    isSearching = true
                    searchSubscribe = setTimeout(function () { Main.getSearchResults(searchText) }, 1000);
                }
            }
        } else if (searchText.length < 40) {
            Yup("#searchData").text(searchText + value);
            presentPagedetails.pagination = false;
            presentPagedetails.activeSearchTab = '';

            for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
                presentPagedetails.tabsArray[i].data = '';
                presentPagedetails.tabsArray[i].lastDoc = '';
                presentPagedetails.tabsArray[i].lastSearchOrder = '';
                presentPagedetails.tabsArray[i].errorMsg = "";

            }
            if ((searchText + value).trim().length > 1) {
                presentPagedetails.arrayResults = [];
                presentPagedetails.searchResults = [];
                if (!!searchSubscribe) { clearTimeout(searchSubscribe); }
                Yup(".search_sectionsHome").hide()
                isSearching = true
                searchSubscribe = setTimeout(function () { Main.getSearchResults(searchText + value) }, 1000);
                var displayText = "Showing Results for - " + searchText + value;
                Yup("#searchName").html(displayText)

            }
        }
    }
    else if (source == 'suggestion') {
        Yup("#searchData").text(searchText);
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#searchTab-0").addClass("imageFocus");
        var value = Yup('#' + id).text();
        Yup("#searchData").text(value);
        Yup(".search_sectionsHome").hide()
        if (Yup("#getSearchResults").css("display") == 'none') {
            Main.getSearchSuggestion(value, true);
        }
        presentPagedetails.pagination = false;
        presentPagedetails.suggestionClicked = true;
        presentPagedetails.activeSearchTab = 'searchTab-0';
        for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
            presentPagedetails.tabsArray[i].data = '';
            presentPagedetails.tabsArray[i].lastDoc = '';
            presentPagedetails.tabsArray[i].lastSearchOrder = '';
            presentPagedetails.tabsArray[i].errorMsg = "";

        }
        if (!!searchSubscribe) { clearTimeout(searchSubscribe); }
        // presentPagedetails.pagination = false;
        Yup(".search_sectionsHome").hide()
        if (Yup("#getSearchResults").css("display") == 'none') {
            Main.getSearchResults(value);
        }
    } else if (source == 'sections') {
        keyHandlar.contentEnterHandlar(id, source);
    }
    else if (source == 'menus') {
        keyHandlar.menuKeyEnterHandular(id);
    }
    else if (source == 'tabs') {
        var splitData = id.split('-');
        var value = Yup('#' + id).attr("keyValue");
        var menuTextvalue = Yup('#' + id).text();
        var searchValue = Yup('#searchData').text();
        presentPagedetails.pagination = false;
        presentPagedetails.activeSearchTab = id;
        presentPagedetails.searchTabsVal = value;
        presentPagedetails.searchTabsClicked = menuTextvalue;
        presentPagedetails.arrayResults = [];
        presentPagedetails.previousCardFocus = { row: 0, column: 0 };
        for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
            if (presentPagedetails.tabsArray[i].code == value) {
                if (presentPagedetails.tabsArray[i].code == value) {
                    presentPagedetails.lastDoc = presentPagedetails.tabsArray[i].lastDoc;
                    presentPagedetails.lastSearchOrder = presentPagedetails.tabsArray[i].lastSearchOrder;
                    presentPagedetails.arrayResults = presentPagedetails.tabsArray[i].data;
                    isSearching = true;
                    Main.getSearchResults(searchValue, presentPagedetails.tabsArray[i].code);
                    if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
                        presentPagedetails.paginationIndex = presentPagedetails.tabsArray[i].data.length;
                    }
                    // if(Yup("#getSearchResults").css("display") == 'none'){
                    // Yup('#searchCardsData').html(Util.getSearchResultsByTab(presentPagedetails.tabsArray[i].data));
                    // Yup('#searchResults').html(Util.getSearchResultsHTML(presentPagedetails.tabsArray[i].data));
                    // }
                } else if (!!presentPagedetails.tabsArray[i].errorMsg) {
                    presentPagedetails.pagination = false;
                    if (Yup("#getSearchResults").css("display") == 'none') {
                        Yup('#searchResults').html(Util.getSearchResultsHTML(false, presentPagedetails.tabsArray[i].errorMsg));
                    }
                }
                else {
                    presentPagedetails.pagination = false;
                    if (Yup("#getSearchResults").css("display") == 'none') {
                        Main.getSearchResults(presentPagedetails.searchedText, value);
                    }
                }
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#" + presentPagedetails.activeSearchTab).addClass("imageFocus");
                Yup(".activeTab").removeClass("activeTab");
                Yup("#" + presentPagedetails.activeSearchTab).addClass("activeTab");
            }
        }
        var searchText = Yup("#searchData").text();
        var eventProp = presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes : ""
        clevertapservice.sendCleverTapEvent('searched', {
            'content type': eventProp.contentType,
            'keyword': searchText,
            'content clicked': "yes",
            'search model': "search box",
            'filter': presentPagedetails && presentPagedetails.searchTabsClicked ? presentPagedetails.searchTabsClicked : "",
            'search type': "fresh",
            'content clicked position': parseInt(splitData[1]) + 1,
            'content name': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentName : ''
        })
    }
    else if (source == 'cards') {
        var searchText = Yup("#searchData").text();
        var eventProp = presentPagedetails.arrayResults[splitData[1]][splitData[2]].target.pageAttributes ? presentPagedetails.arrayResults[splitData[1]][splitData[2]].target.pageAttributes : ""
        clevertapservice.sendCleverTapEvent('searched', {
            'content type': eventProp.contentType,
            'keyword': searchText,
            'content clicked': "yes",
            'search model': "search box",
            'filter': presentPagedetails && presentPagedetails.searchTabsClicked ? presentPagedetails.searchTabsClicked : "",
            'search type': "fresh",
            'content clicked position': parseInt(splitData[1]) + 1,
            'content name': presentPagedetails.arrayResults[splitData[1]][splitData[2]].target.pageAttributes.contentName ? presentPagedetails.arrayResults[splitData[1]][splitData[2]].target.pageAttributes.contentName : ''
        })
        // on click to details page
        keyHandlar.contentEnterHandlar(id);
    }
}

//search add focus on click on suggestions
keyHandlar.addFocusOnClickSearchSuggestions = function () {
    if (presentPagedetails.searchSuggestion && presentPagedetails.searchSuggestion.length > 0) {
        Yup("#suggest-0").addClass("imageFocus");
        keyHandlar.addSectionKeyIndex(0, 0);
    } else {
        if (Yup("#Alpha-51").attr("keyValue") == '123') {
            if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[1]) {
                Yup("#Alpha-" + ((presentPagedetails.sectionIndex[1]))).addClass("imageFocus");
            } else {
                Yup("#Alpha-26").addClass("imageFocus");
            }
        } else {
            if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[1]) {
                Yup("#Alpha-" + presentPagedetails.sectionIndex[1]).addClass("imageFocus");
            } else {
                Yup("#Alpha-0").addClass("imageFocus");
            }
        }
    }
}

//details page key handular
keyHandlar.detailsPageKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == "sections") {
                var splitData = id.split('-');
                if (parseInt(splitData[2]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                    keyHandlar.addCurrentSection(parseInt(splitData[1]))
                    keyHandlar.liveScrollLeft(parseInt(splitData[1]), parseInt(splitData[2]));
                    Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    card_lazy_preview()
                    keyHandlar.stopPreviewTrailers();
                    var data = keyHandlar.getSectionItemData(presentPagedetails, splitData[1], (parseInt(splitData[2]) - 1));
                    keyHandlar.callPreviews("sections", splitData[1], (parseInt(splitData[2]) - 1), data);
                }

            }
            else if (source == 'button') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#button-" + (parseInt(splitData[1]) - 1)).addClass('imageFocus');
                }
            }
            else if (source == 'tabs') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tabs-" + (parseInt(splitData[1]) - 1)).addClass('imageFocus');
                }
                // else{
                // prevActive = Yup(".imageFocus")
                // Yup(".imageFocus").removeClass("imageFocus");
                // Yup('.menu-item.menu-active').addClass('imageFocus');
                // Main.sidebarOpen();
                // }
            }

            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == "menus") {
                var splitData = id.split('-');
                Yup(".imageFocus").removeClass("imageFocus");
                if (!!presentPagedetails.currentSection) {
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                }
                else if (prevActive) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    prevActive.addClass("imageFocus");
                }
            }
            else if (source == "sections") {
                var splitData = id.split('-');
                // if( presentPagedetails.castCrewSection){
                var splitData = id.split('-');
                // if( presentPagedetails.castCrewSection){
                if (parseInt(splitData[2]) < presentPagedetails.sections[parseInt(splitData[1])].sectionControls.dataLength - 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                    keyHandlar.liveScrollRight(parseInt(splitData[1]), parseInt(splitData[2]));
                    // Yup('.overlayBanner_info').css('display', 'block');
                    card_lazy_preview()
                    keyHandlar.stopPreviewTrailers();
                    var data = keyHandlar.getSectionItemData(presentPagedetails, parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                    keyHandlar.callPreviews("sections", parseInt(splitData[1]), parseInt(splitData[2]) + 1, data);
                }
                // }
                else {
                    var cardlength = secDataLen;
                    if ((((parseInt(splitData[1])) * 4) + ((parseInt(splitData[2]) + 1))) < cardlength) {
                        if ((parseInt(splitData[2]) + 1) % 4 != 0 && Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                            keyHandlar.addCurrentSection(parseInt(splitData[1]) + 1);
                            Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");

                        }
                    }
                }
            }
            else if (source == 'button') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) < (presentPagedetails.avilablePagebuttonsLength)) {
                    if (parseInt(splitData[1]) < (presentPagedetails.avilablePagebuttonsLength - 1)) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#button-" + (parseInt(splitData[1]) + 1)).addClass('imageFocus');
                    }
                }
            }
            else if (source == 'tabs') {
                var splitData = id.split('-');
                if (splitData[1] < presentPagedetails.sections.length - 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tabs-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(132, parseInt(splitData[1]) + 1);
                    if (parseInt(splitData[1]) > 2) {
                        Yup("#tabs-" + (parseInt(splitData[1]) - 3)).hide();
                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (source == 'menus') {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == "sections" && (view == 'movieDetails' || view == 'channelDetails')) {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0) {
                    if (presentPagedetails.avilablePagebuttonsLength >= 1) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#button-0").addClass('imageFocus');
                    } else if (presentPagedetails.favButtonAdded == true) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#favorites").addClass('imageFocus');
                    }
                    else if (Yup('#readMore').val() != undefined) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(".description").addClass('imageFocus');
                    }
                    Yup(".detailsContainer").animate({ 'margin-top': '0px' }, 300);
                    Yup('.detailsContainer').css('display', 'block');
                    Yup('#backgroundPoster').css('display', 'none');
                    Yup(".sectionsHome").css('margin-top', '')
                } else {
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    // Yup("#section-"+ (parseInt(splitData[1])+1)).hide();
                    // Yup("#section-"+ (parseInt(splitData[1]))).hide();
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-" + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass("imageFocus");
                        // keyHandlar.addSectionKeyIndex((parseInt(splitData[1])-1), presentPagedetails.sectionIndex[parseInt(splitData[1])-1]);                   

                    } else {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-0").addClass("imageFocus");
                        // keyHandlar.addSectionKeyIndex((parseInt(splitData[1])-1), "0");                   
                    }
                    card_lazy_preview();
                }
            }
            else if (source == "sections" && (view == 'tvshowDetails' || view == 'channelDetails')) {
                var splitData = id.split('-');
                // if(presentPagedetails.tabsInfo.showTabs == true){
                //     Yup("#tabs-0").addClass("imageFocus"); 
                // }
                if (parseInt(splitData[1]) == 0) {
                    if (presentPagedetails.avilablePagebuttonsLength >= 1) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#button-0").addClass("imageFocus");
                        Yup('.detailsContainer').css('display', 'block');
                        Yup('#backgroundPoster').css('display', 'none');
                        Yup(".tvShowDetails .sectionsShowsHome").css('margin-top', '')
                        // Yup(".section_Home").css('margin-top','')
                    }
                    else if (Yup('#readMore').val() != undefined) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(".description").addClass('imageFocus');
                    }
                    if (keyHandlar.isHD) {
                        Yup(".tvShowDetails .suggestions").css('margin-top', '-180px')
                    }
                    else {
                        Yup(".tvShowDetails .suggestions").css('margin-top', '-270px')
                    }

                    Yup(".detailsContainer").animate({ 'margin-top': '0px' }, 300);
                }
                else {
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    // Yup("#section-"+ (parseInt(splitData[1])+1)).hide();
                    // Yup("#section-"+ (parseInt(splitData[1]))).hide();
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-" + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass("imageFocus");
                        // keyHandlar.addSectionKeyIndex((parseInt(splitData[1])-1), presentPagedetails.sectionIndex[parseInt(splitData[1])-1]);                   

                    } else {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-0").addClass("imageFocus");
                        // keyHandlar.addSectionKeyIndex((parseInt(splitData[1])-1), "0");                   
                    }
                    card_lazy_preview();
                }
            }
            // else if(source == 'tabs'){
            //     if(presentPagedetails.avilablePagebuttonsLength >=1){
            //         Yup(".imageFocus").removeClass("imageFocus");
            //         Yup("#button-0").addClass('imageFocus');
            //     }
            // }
            else if (source == 'button') {
                if (Yup('#readMore').val() != undefined) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup(".description").addClass('imageFocus');
                }
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == 'menus') {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == "description") {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#button-0").addClass('imageFocus');
            }
            else if (source == 'button') {
                keyHandlar.stopPreviewTrailers();
                var splitData = id.split('-');
                if (view == 'movieDetails' || view == "channelDetails") {
                    if (presentPagedetails.sections.length > 0) {
                        if (keyHandlar.isHD) {
                            Yup(".detailsContainer").animate({ 'margin-top': '-153px' }, 300);
                        }
                        else {
                            Yup(".detailsContainer").animate({ 'margin-top': '-230px' }, 300);
                        }
                        if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                            // Yup('.detailsContainer').css('display', 'none');
                        }
                        else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-0-0").addClass("imageFocus");
                        }
                        Yup('.detailsContainer').css('display', 'none');
                        if (keyHandlar.isHD) {
                            Yup('.sectionsHome').css('margin-top', '320px')
                        }
                        else {
                            Yup('.sectionsHome').css('margin-top', '480px')
                        }
                        card_lazy_preview();
                    }
                } else if (view == 'tvshowDetails') {
                    keyHandlar.stopPreviewTrailers();
                    if (presentPagedetails.sections.length > 0) {
                        if (keyHandlar.isHD) {
                            Yup(".detailsContainer").animate({ 'margin-top': '-153px' }, 300);
                        }
                        else {
                            Yup(".detailsContainer").animate({ 'margin-top': '-230px' }, 300);
                        }
                        if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                            // Yup('.detailsContainer').css('display', 'none');
                        }
                        else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-0-0").addClass("imageFocus");
                        }
                        Yup('.detailsContainer').css('display', 'none');
                        if (keyHandlar.isHD) {
                            Yup('.sectionsShowsHome').css('margin-top', '320px')
                        }
                        else {
                            Yup('.sectionsShowsHome').css('margin-top', '480px')
                        }
                        card_lazy_preview();
                    }
                }
                // if(presentPagedetails.tabsInfo.showTabs==true){
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup(".activeTab").addClass('imageFocus')
                // }
                // else {
                //         if (keyHandlar.isHD) Yup(".detailsContainer").animate({ 'margin-top': '-40px' }, 300);
                //         else Yup(".detailsContainer").animate({ 'margin-top': '-70px' }, 300);
                //         if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
                //             Yup(".imageFocus").removeClass("imageFocus");
                //             if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                //                 Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                //                 Yup('.detailsContainer').css('display', 'none');
                //                 if(keyHandlar.isHD){
                //                     Yup('.section_Home').css('margin-top', '350px')
                //                  }
                //                  else{
                //                     Yup('.section_Home').css('margin-top', '500px')     
                //                  } 
                //                 keyHandlar.showCardLazyPreview();
                //             } else {
                //                 Yup("#sectionItem-0-0").addClass("imageFocus");
                //                 Yup('.detailsContainer').css('display', 'none');
                //                 if(keyHandlar.isHD){
                //                     Yup('.section_Home').css('margin-top', '350px')
                //                  }
                //                  else{
                //                     Yup('.section_Home').css('margin-top', '480px')     
                //                  }  
                //                 keyHandlar.showCardLazyPreview();
                //             }
                //             // if(keyHandlar.isHD){
                //             //     Yup(".section_Home").css('margin-top', '350px')
                //             // }
                //         // }
                // }

            }
            else if (source == "sections") {
                keyHandlar.stopPreviewTrailers();
                var splitData = id.split('-');
                if (view == 'movieDetails' || view == "channelDetails" || view == 'tvshowDetails') {
                    if ((parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1) {
                        // if (keyHandlar.isHD){
                        //     Yup(".detailsContainer").animate({ 'margin-top': '-153px' }, 300);
                        // } 
                        // else{
                        //     Yup(".detailsContainer").animate({ 'margin-top': '-230px' }, 300);
                        // } 
                        if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[(parseInt(splitData[1]) + 1)]) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + "-" + presentPagedetails.sectionIndex[(parseInt(splitData[1]) + 1)]).addClass("imageFocus");
                            // keyHandlar.addSectionKeyIndex((parseInt(splitData[1] + 1)), presentPagedetails.sectionIndex[parseInt(splitData[1])]);

                        } else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + "-0").addClass("imageFocus");
                            // keyHandlar.addSectionKeyIndex((parseInt(splitData[1]) + 1), "0");
                        }
                        if ((parseInt(splitData[1]) + 1) > 0 && (parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1) {
                            Yup("#section-" + (parseInt(splitData[1]))).hide();
                        }
                        // Yup('.detailsContainer').css('display', 'none');
                        // if(keyHandlar.isHD){
                        //     Yup('.sectionsHome').css('margin-top', '320px')
                        //  }
                        //  else{
                        //     Yup('.sectionsHome').css('margin-top', '480px')     
                        //  }    
                        card_lazy_preview();
                    }
                    //  } else if (view == 'tvshowDetails') {
                    //     keyHandlar.stopPreviewTrailers();
                    //     if((parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1){
                    //           if (keyHandlar.isHD){
                    //              Yup(".detailsContainer").animate({ 'margin-top': '-153px' }, 300);
                    //           }
                    //             else{
                    //              Yup(".detailsContainer").animate({ 'margin-top': '-230px' }, 300);
                    //             }
                    //             if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                    //                 Yup(".imageFocus").removeClass("imageFocus");
                    //                 Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                    //                 // Yup('.detailsContainer').css('display', 'none');
                    //             }
                    //             else {
                    //                 Yup(".imageFocus").removeClass("imageFocus");
                    //                 Yup("#sectionItem-0-0").addClass("imageFocus");
                    //             }
                    //             Yup('.detailsContainer').css('display', 'none');
                    //             if(keyHandlar.isHD){
                    //                 Yup('.sectionsShowsHome').css('margin-top', '320px')
                    //              }
                    //              else{
                    //                 Yup('.sectionsShowsHome').css('margin-top', '480px')     
                    //              }   
                    //             keyHandlar.showCardLazyPreview();
                    //         }
                    //     }
                } else if (view == 'tvshowDetails') {
                    keyHandlar.stopPreviewTrailers();
                    if ((parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1) {
                        if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[(parseInt(splitData[1]) + 1)]) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + "-" + presentPagedetails.sectionIndex[(parseInt(splitData[1]) + 1)]).addClass("imageFocus");
                            // keyHandlar.addSectionKeyIndex((parseInt(splitData[1] + 1)), presentPagedetails.sectionIndex[parseInt(splitData[1])]);

                        } else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (parseInt(splitData[1]) + 1) + "-0").addClass("imageFocus");
                            // keyHandlar.addSectionKeyIndex((parseInt(splitData[1]) + 1), "0");
                        }
                        if ((parseInt(splitData[1]) + 1) > 0 && (parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1) {
                            Yup("#section-" + (parseInt(splitData[1]))).hide();
                        }
                        card_lazy_preview();
                    }
                }
                // if(presentPagedetails.tabsInfo.showTabs==true){
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup(".activeTab").addClass('imageFocus')
                // }
                // else {
                //         if (keyHandlar.isHD) Yup(".detailsContainer").animate({ 'margin-top': '-40px' }, 300);
                //         else Yup(".detailsContainer").animate({ 'margin-top': '-70px' }, 300);
                //         if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
                //             Yup(".imageFocus").removeClass("imageFocus");
                //             if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                //                 Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                //                 Yup('.detailsContainer').css('display', 'none');
                //                 if(keyHandlar.isHD){
                //                     Yup('.section_Home').css('margin-top', '350px')
                //                  }
                //                  else{
                //                     Yup('.section_Home').css('margin-top', '500px')     
                //                  } 
                //                 keyHandlar.showCardLazyPreview();
                //             } else {
                //                 Yup("#sectionItem-0-0").addClass("imageFocus");
                //                 Yup('.detailsContainer').css('display', 'none');
                //                 if(keyHandlar.isHD){
                //                     Yup('.section_Home').css('margin-top', '350px')
                //                  }
                //                  else{
                //                     Yup('.section_Home').css('margin-top', '480px')     
                //                  }  
                //                 keyHandlar.showCardLazyPreview();
                //             }
                //             // if(keyHandlar.isHD){
                //             //     Yup(".section_Home").css('margin-top', '350px')
                //             // }
                //         // }
                // }

            }
            else if (source == 'tabs') {
                var splitData = Yup('.activeTab').attr("id").split('-');
                if (keyHandlar.isHD) Yup(".detailsContainer").animate({ 'margin-top': '-46px' }, 300);
                else Yup(".detailsContainer").animate({ 'margin-top': '-70px' }, 300);
                if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1])]) {
                        Yup("#sectionItem-" + (parseInt(splitData[1])) + "-" + presentPagedetails.sectionIndex[parseInt(splitData[1])]).addClass("imageFocus");
                    } else {
                        Yup("#sectionItem-" + (parseInt(splitData[1])) + "-0").addClass("imageFocus");
                    }
                }
            }

            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (navigatingfavToDetails == true && refreshPage == true) {
                Main.apiCall('favourites')
                navigatingfavToDetails = false;
                refreshPage = false;
            }
            else if (refreshHome == true) {
                Main.apiCall(firstMenu)
                refreshHome = false
            }
            else {
                keyHandlar.contentReturnHandlar();
            }
            break;
        }
        case 461: {
            if (navigatingfavToDetails == true && refreshPage == true) {
                Main.apiCall('favourites')
                navigatingfavToDetails = false;
                refreshPage = false;
            }
            else if (refreshHome == true) {
                Main.apiCall(firstMenu)
                refreshHome = false
            }
            else {
                keyHandlar.contentReturnHandlar();
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.detailsPageEnterHandlar(id);
            break;
        }
        default: {
            break;
        }
    }
}

keyHandlar.seasonPageKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var splitData = id.split('-');
            if (source == "sections") {
                if (presentPagedetails.previousSeasonFocus) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#" + presentPagedetails.previousSeasonFocus).addClass("imageFocus");
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#season-" + parseInt(splitData[1])).addClass("imageFocus");
                }
                keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                keyHandlar.addCurrentSection(parseInt(splitData[1]));
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            if (source == "seasonsItems") {
                if (presentPagedetails.sectionIndex[0] != undefined) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + "0").addClass("imageFocus");
                }
                keyHandlar.previousSeasonFocus(id);
            }
            // else if(source == "season"){
            //     Yup(".imageFocus").removeClass("imageFocus");
            //     Yup("#sectionItem-" + "0" + '-' + "0").addClass("imageFocus");
            // }
            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (source == "sections") {
                if (parseInt(splitData[2]) != 0) {
                    if (Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus").length > 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                        keyHandlar.addCurrentSection(parseInt(splitData[1]))
                        keyHandlar.liveScrollLeft(parseInt(splitData[1]), parseInt(splitData[2]));
                        Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    }
                    // if((parseInt(splitData[2])) == 1){
                    //     Yup('#sectionItem-' + splitData[1] + '-' + '0').css('display', 'block');
                    // }
                    if ((parseInt(splitData[2]) + 1) > 1) {
                        Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).css('display', 'block');

                    }
                }
            }
            else if (source == "season" || source == "seasonsItems") {
                if (Yup("#season-" + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#season-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                }
                if (presentPagedetails.sections.length >= 9) {
                    if ((parseInt(splitData[1]) + 1) > 1) {
                        Yup("#season-" + (parseInt(splitData[1]) - 1)).css('display', 'block');

                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (source == "season" || source == "seasonsItems") {
                // 
                if (Yup("#season-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#season-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
                // }
                // else{
                if (presentPagedetails.sections.length >= 9) {
                    if ((parseInt(splitData[1]) + 1) > 7 && ((parseInt(splitData[1]) + 1) <= presentPagedetails.sections.length - 1)) {
                        Yup("#season-" + (parseInt(splitData[1]) - 7)).css('display', 'none');
                    }
                }
                // }
            }
            else if (source == "sections") {
                var splitData = id.split('-');
                var sectionNum = parseInt(splitData[1])
                if (parseInt(splitData[2]) < presentPagedetails.sections[sectionNum].sectionData.data.length) {
                    if (Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    }
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                    keyHandlar.liveScrollRight(parseInt(splitData[1]), parseInt(splitData[2]));


                }
                else {
                    var cardlength = secDataLen;
                    if ((((parseInt(splitData[1])) * 4) + ((parseInt(splitData[2]) + 1))) < cardlength) {
                        if ((parseInt(splitData[2]) + 1) % 4 != 0) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                            keyHandlar.addCurrentSection(parseInt(splitData[1]) + 1);
                            Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");

                        }
                    }
                }
                if (parseInt(splitData[2]) == presentPagedetails.sections[parseInt(splitData[1])].sectionData.data.length - 7 && presentPagedetails.sections[sectionNum].sectionData.hasMoreData == true) {
                    Main.seasonsPagination(parseInt(splitData[1]))
                }
                if ((parseInt(splitData[2]) + 1) > 2 && ((parseInt(splitData[2]) + 1) < presentPagedetails.sections[sectionNum].sectionData.data.length - 1)) {
                    Yup('#sectionItem-' + splitData[1] + '-' + (parseInt(splitData[2]) - 2)).css('display', 'none');
                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (presentPagedetails.navigationFrom != "tvShowDetails") {
                keyHandlar.contentReturnHandlar();
            }
            else {
                Main.apiCall()
            }
            break;
        }
        case 461: {
            if (presentPagedetails.navigationFrom != "tvShowDetails") {
                keyHandlar.contentReturnHandlar();
            }
            else {
                Main.apiCall()
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.detailsPageEnterHandlar(id);
            break;
        }
        default: {
            break;
        }
    }
}

//detailsPage Enter Key Handular
keyHandlar.detailsPageEnterHandlar = function (id) {
    var source = Yup('#' + id).attr("source");
    var elementsubtype = Yup('#' + id).attr("elementsubtype");
    if (source == 'tabs') {
        var pagination = Yup('.imageFocus').attr("pagination");
        if (pagination == 'false') {
            var splitData = id.split('-');
            Yup(".activeSection").removeClass("activeSection");
            Yup(".activeTab").removeClass("activeTab");
            Yup("#tabs-" + (parseInt(splitData[1]))).addClass("activeTab");
            Yup("#section-" + parseInt(splitData[1])).addClass('activeSection');
        } else {
            // Pagination sesaons
        }
    }
    else if (source == "seasonsItems") {
        var data = gridDatas;
        var splitData = id.split('-');
        if (Yup("#season-" + parseInt(splitData[1]))) {
            Yup(".activeTab").removeClass("activeTab");
            Yup("#season-" + parseInt(splitData[1])).addClass("activeTab");
            var gridItemElements = document.querySelectorAll('[id^="grid_items-"]');
            var gridItemElementsArray = [];
            for (var i = 0; i < gridItemElements.length; i++) {
                gridItemElementsArray.push(gridItemElements[i]);
            }

            for (var j = 0; j < gridItemElementsArray.length; j++) {
                var gridItemElement = gridItemElementsArray[j];
                gridItemElement.style.display = 'none';
            }
            if (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data.length == 0) {
                Main.seasonsHeadPagination(parseInt(splitData[1]))
            }
            else {
                Yup("#grid_items-" + parseInt(splitData[1])).css('display', 'block');
                // Yup(".imageFocus").removeClass("imageFocus");
                // Yup("#sectionItem-" + splitData[1] + '-' + "0").addClass("imageFocus");
                if (presentPagedetails.sectionIndex[parseInt(splitData[1])] != undefined) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#sectionItem-' + splitData[1] + '-' + presentPagedetails.sectionIndex[splitData[1]]).addClass('imageFocus');
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + "0").addClass("imageFocus");
                }
            }
            keyHandlar.previousSeasonFocus(id);
        }
    }
    else if (elementsubtype == 'favourite') {
        if (Main.userProfile.userStatus) {
            var detailsText = Yup('#' + id).text();
            var clickSection = {
                clickLab: detailsText ? detailsText : "",
                genre: presentPagedetails.attributes.genre ? presentPagedetails.attributes.genre : "",
                contentType: presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
                contentLang: presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
                contentPartnerName: presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
                contentId: presentPagedetails.attributes.networkid ? presentPagedetails.attributes.networkid : "",
                tvshowname: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
                model: presentPagedetails.attributes.payType == 'P' ? 'svod' : 'avod',
                tab: ctEvent.tabName ? ctEvent.tabName : "",
                contantTag: presentPagedetails.attributes.payType == 'P' ? 'paid' : 'free',
                contentName: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
                souDet: ctEvent.carouselName ? ctEvent.carouselName : "",
                btn: "button",
            };
            if (presentPagedetails.pageButtons.isFavourite == true) {
                //remove from fav
                for (var i = 0; i < presentPagedetails.pageContent.length; i++) {
                    var dataRows = presentPagedetails.pageContent[i].dataRows;

                    for (var j = 0; j < dataRows.length; j++) {
                        var elements = dataRows[j].elements;

                        for (var k = 0; k < elements.length; k++) {
                            if (elements[k].elementSubtype == "favourite" && elements[k].properties && elements[k].properties.isFavourite == "true") {
                                elements[k].properties.isFavourite = "false";
                                presentPagedetails.pageButtons.isFavourite = false
                                clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss));
                                clevertapservice.sendCleverTapEvent('added removed to watchlist', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss, 'Removed'));
                            }
                        }
                    }
                }


                Yup('.fav').removeClass("removeWatch");
                Yup('.fav').addClass("addTowatch");
                Main.addToFav(presentPagedetails.targetPath, 2, id);
                if (navigatingfavToDetails == true || navigatFavListToDetails == true) {
                    refreshPage = true
                    refreshFav = true
                }
                Yup('.fav').html('<img class="fav_icon" src="images/Add to Bingelist CTA.png"/> My Bingelist')
                Yup('.fav_icon').css('display', 'block');
                // Yup('#' + id).text("Add to Favourite");
                Yup('.toastmsg_template').html('Removed from My Bingelist')
                Yup('.toastmsg_template').css('display', 'block');
                setTimeout(function () {
                    Yup('.toastmsg_template').css('display', 'none');
                }, 1000);

            } else {
                //add to fav
                for (var i = 0; i < presentPagedetails.pageContent.length; i++) {
                    var dataRows = presentPagedetails.pageContent[i].dataRows;

                    for (var j = 0; j < dataRows.length; j++) {
                        var elements = dataRows[j].elements;

                        for (var k = 0; k < elements.length; k++) {
                            if (elements[k].elementSubtype == "favourite" && elements[k].properties && elements[k].properties.isFavourite == "false") {
                                var detailsText = Yup('#' + id).text();
                                elements[k].properties.isFavourite = "true";
                                presentPagedetails.pageButtons.isFavourite = true
                                clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss));
                                clevertapservice.sendCleverTapEvent('added removed to watchlist', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss, "Added"));

                            }
                        }
                    }
                }
                Yup('.fav').removeClass("addTowatch");
                Yup('.fav').addClass("removeWatch");
                Main.addToFav(presentPagedetails.targetPath, 1, id);
                if (navigatingfavToDetails == true || navigatFavListToDetails == true) {
                    refreshPage = true
                    refreshFav = true
                }
                Yup('.fav').html('<img class="fav_icon" src="images/Added to Bingelist.png"/> My Bingelist')
                Yup('.fav_icon').css('display', 'block');
                // Yup('#' + id).text("Remove Favourite");
                Yup('.toastmsg_template').html('Added to My Bingelist')
                Yup('.toastmsg_template').css('display', 'block');
                setTimeout(function () {
                    Yup('.toastmsg_template').css('display', 'none');
                }, 1000);


            }
        } else {
            Main.popupData = {
                popuptype: 'info',
                message: 'Please Sign in to add your videos to BingeList',
                buttonCount: 1,
                yesText: 'Sign In',
                yesTarget: 'gotosignin',
                onBack: 'close'
            }
            Yup("#popUpFDFS").html(Util.showPopup());
            Yup("#popup-btn-1").addClass('popupFocus');

        }
    }
    else if (source == 'button') {
        var detailsText = Yup('#' + id).text();
        var sourcePly = ''
        var souDet = ''
        if (presentPagedetails.navigationFrom == "seasonsDetails") {
            sourcePly = 'browse episodes'
        }
        else if (presentPagedetails.navigationFrom == "search") {
            sourcePly = 'search'
        }
        else if (ctEvent && ctEvent.topBanner == "top banner") {
            souDet = ctEvent.topBanner
            sourcePly = 'carousel'
        }
        else if (ctEvent && ctEvent.itemForTrailer == "top banner") {
            souDet = ctEvent.itemForTrailer
            sourcePly = 'carousel'
        }
        else {
            sourcePly = 'carousel'
        }
        var clickSection = {
            clickLab: detailsText ? detailsText : "",
            genre: presentPagedetails.attributes.genre ? presentPagedetails.attributes.genre : "",
            contentType: presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
            contentLang: presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
            contentPartnerName: presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
            contentId: presentPagedetails.attributes.networkid ? presentPagedetails.attributes.networkid : "",
            tvshowname: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
            model: (presentPagedetails.attributes.payType == 'P') ? 'svod' : 'avod',
            tab: ctEvent.tabName ? ctEvent.tabName : "",
            contantTag: (presentPagedetails.attributes.payType == 'P') ? 'paid' : 'free',
            contentName: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : presentPagedetails.attributes.contentName,
            btn: "button",
            sourcePly: sourcePly ? sourcePly : 'carousel',
            souDet: postPaidPopContentData && postPaidPopContentData["source details"] ? postPaidPopContentData["source details"] : ctEvent.carouselName,
        }
        clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss));
        if (ctEvent) {
            ctEvent.moduleTrackerId = presentPagedetails && presentPagedetails.sections[0] && presentPagedetails.sections[0].sectionData && presentPagedetails.sections[0].sectionData.myRecoTrackingId ? presentPagedetails.sections[0].sectionData.myRecoTrackingId : "";

        }
        if (Yup("#" + id).attr("elementsubtype") == 'json') {
            keyHandlar.stopPreviewTrailers();
            ctEvent.topBanner = "";
            Yup('.toastmsg_template').css('display', 'none');
            var targetPath = Yup('#' + id).attr("targetpath");
            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
            if (detailsText && (detailsText.toLowerCase() == 'watch now' || detailsText.toLowerCase() == 'watch live')) {
                detailsText = "Watch Now"
            }
            if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "SECONDARY") {
                // clevertapservice.sendCleverTapEvent('subscription page appeared', {
                //     'tab': ctEvent && ctEvent.tabName,
                //     'source': 'content ' + detailsText ? 'content ' + detailsText.toLowerCase() : "carousel",
                //     'page name': 'plans'
                // })
                Main.addToPlansPostPaid(detailsText, "", targetPath);
            }
            else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userStatus.toUpperCase() == "SUSPENDED") {
                // clevertapservice.sendCleverTapEvent('subscription page appeared', {
                //     'tab': ctEvent && ctEvent.tabName,
                //     'source': 'content ' + detailsText ? 'content ' + detailsText.toLowerCase() : "carousel",
                //     'page name': 'plans'
                // })
                Main.addToPlansPostPaid(detailsText, "", targetPath);
            }
            else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "COCP") {
                // clevertapservice.sendCleverTapEvent('subscription page appeared', {
                //     'tab': ctEvent && ctEvent.tabName,
                //     'source': 'content ' + detailsText ? 'content ' + detailsText.toLowerCase() : "carousel",
                //     'page name': 'plans'
                // })
                Main.addToPlansPostPaid(detailsText, "", targetPath);
            }
            else if (userDetails && userDetails.userCategory == 2) {
                ctEvent.topBanner = "";
                Main.addToPlansPostPaid(detailsText, "", targetPath);
            }
            else {
                // clevertapservice.sendCleverTapEvent('subscription page appeared', {
                //     'tab': ctEvent && ctEvent.tabName,
                //     'source': 'content ' + detailsText ? 'content ' + detailsText.toLowerCase() : "carousel",
                //     'page name': 'plans'
                // })
                Main.addToPlansPostPaid(detailsText, "", targetPath);
            }
        }
        else if (Yup("#" + id).attr("elementsubtype") == 'watchnow') {
            keyHandlar.contentEnterHandlar(id, source);
        }
        else if (Yup("#" + id).attr("elementsubtype") == 'trailer') {
            keyHandlar.contentEnterHandlar(id, source);
        }
        else {

            if (Main.userProfile.userStatus) {  //user loginin
                if (Yup("#" + id).attr("elementsubtype") == 'subscribe' || Yup("#" + id).attr("elementsubtype") == 'rent') { // if it is subscribe button
                    // utilities.detailsPagePopupDetails("Please go to '" +systemConfigs.configs.packagePageUrl + "'  to buy  packages",'Subscribe','info');
                    keyHandlar.stopPreviewTrailers();
                    view = "noPackageView";
                    Main.processNext();
                } else {
                    var elementsubtype = Yup('#' + id).attr("elementsubtype")
                    if (elementsubtype != undefined) {
                        if (elementsubtype == 'resume') {
                            isStartOverBtn = false;
                        }
                        else {
                            isStartOverBtn = true;
                        }

                    }
                    if (Yup("#" + id).attr("elementsubtype") == 'startover') {
                        itisStartover = true;
                    }
                    if (Yup("#" + id).attr("elementsubtype") == 'browseEpisodes') {
                        Yup('.toastmsg_template').css('display', 'none');
                        Main.addBackData(targetPath)
                    }
                    if (Yup("#" + id).attr("elementsubtype") == 'watch_latest_episode') {
                        itisStartover = true;
                    }
                    keyHandlar.stopPreviewTrailers();
                    keyHandlar.contentEnterHandlar(id, source);
                }
            } else {  // not loggoed in
                view = 'signin';
                Main.processNext();
            }
        }
    }
    else if (elementsubtype == 'favourite') {
        if (Main.userProfile.userStatus) {
            if (presentPagedetails.pageButtons.isFavourite == true) {
                //remove from fav
                presentPagedetails.pageButtons.isFavourite = false;
                Yup('.fav').removeClass("removeWatch");
                Yup('.fav').addClass("addTowatch");
                Main.addToFav(presentPagedetails.targetPath, 2, id);
                Yup('.fav').html('<img class="fav_icon" src="images/Add to Bingelist.svg"/> Add to Bingelist')
                Yup('.fav_icon').css('display', 'block');
                // Yup('#' + id).text("Add to Favourite");
                Yup('.toastmsg_template').html('Removed from My Bingelist')
                Yup('.toastmsg_template').css('display', 'block');
                setTimeout(function () {
                    Yup('.toastmsg_template').css('display', 'none');
                }, 1000);

            } else {
                //add to fav
                presentPagedetails.pageButtons.isFavourite = true;
                Yup('.fav').removeClass("addTowatch");
                Yup('.fav').addClass("removeWatch");
                Main.addToFav(presentPagedetails.targetPath, 1, id);
                Yup('.fav').html('<img class="fav_icon" src="images/Added to Bingelist.svg"/> Remove from Bingelist')
                Yup('.fav_icon').css('display', 'block');
                // Yup('#' + id).text("Remove Favourite");
                Yup('.toastmsg_template').html('Added to My Bingelist')
                Yup('.toastmsg_template').css('display', 'block');
                setTimeout(function () {
                    Yup('.toastmsg_template').css('display', 'none');
                }, 1000);


            }
        } else {
            Main.popupData = {
                popuptype: 'info',
                message: 'Please Login to Add Favorites',
                buttonCount: 1,
                yesText: 'Sign In',
                yesTarget: 'gotosignin',
                onBack: 'close'
            }
            Yup("#popUpFDFS").html(Util.showPopup());
            Yup("#popup-btn-1").addClass('popupFocus');

        }
    }
    else if (source == "description") {
        utilities.detailsPagePopupDetails(presentPagedetails.descriptionText, presentPagedetails.pageContent[0].title, 'description');
    }
    else if (source == 'watchLive') {
        // Calculate Live Program
        keyHandlar.getCurrentTimeProgram();
    }
    else {
        if (view == "tvshowDetails") {
            Main.addBackData(targetPath)
        }
        keyHandlar.contentEnterHandlar(id, source);
    }
}

// Get The CurrentTime Program
keyHandlar.getCurrentTimeProgram = function () {
    if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
        for (var i = 0; presentPagedetails.sections.length; i++) {
            if (presentPagedetails.sections[i].sectionInfo.name == 'Today') {
                if (presentPagedetails.sections[i].sectionData.data.length > 0) {
                    for (var j = 0; j < presentPagedetails.sections[i].sectionData.data.length; j++) {
                        var epocTime = +new Date().getTime();
                        var data = presentPagedetails.sections[i].sectionData.data;
                        if (epocTime >= +(data[j].target.pageAttributes.startTime) && epocTime <= +(data[j].target.pageAttributes.endTime)) {
                            Main.apiCall(data[j].target.path);
                            break;
                        }
                    }
                }
            }
        }
    } else {
        Main.apiCall('');
    }
}

//history of the focus on menu
keyHandlar.addMenuKeyIndex = function (h_index) {
    presentPagedetails.menuIndex = parseInt(h_index);
}

//history of the focus in sections
keyHandlar.addSectionKeyIndex = function (v_index, h_index) {
    presentPagedetails.sectionIndex[v_index] = parseInt(h_index);
}


//history of the focus in sections
keyHandlar.previousCardFocus = function (v_index, h_index) {
    presentPagedetails.previousCardFocus = {
        row: parseInt(v_index),
        column: parseInt(h_index),
    };
}
//history of the focus in seasonspage
keyHandlar.previousSeasonFocus = function (id) {
    presentPagedetails.previousSeasonFocus = id

}
//history of the focus in seasonspage
keyHandlar.previousTabbedPositionFocus = function (id) {
    presentPagedetails.previousTabbedPositionFocus = id

}
keyHandlar.addTabsFocus = function (h_index) {
    presentPagedetails.tabsIndex = parseInt(h_index);
}
keyHandlar.addSuggResultFocus = function (h_index) {
    presentPagedetails.addSuggResultFocus = parseInt(h_index);
}

//To get no of cards to show in diff resoluton Based on card type.
function noOfCardForARow(cardType) {
    if (cardType) {
        for (var item = 0; item < leftRightCardCounts.length; item++) {
            if (leftRightCardCounts[item].cardType == cardType) {
                return (keyHandlar.isHD) ? leftRightCardCounts[item].small : leftRightCardCounts[item].large;
            }
        }
    } else {
        return 4;
    }
    return 4;
}

//To get no of cards to show in diff resoluton Based on card type.
keyHandlar.noOfCardForARowInGrid = function (cardType) {
    if (cardType) {
        for (var item = 0; item < gridViewCardCount.length; item++) {
            if (gridViewCardCount[item].cardType == cardType) {
                return (keyHandlar.isHD) ? gridViewCardCount[item].small : gridViewCardCount[item].large;
            }
        }
    } else {
        return 4;
    }
    return 4;
}

//to control the left scroll in sections
keyHandlar.liveScrollLeft = function (v_index, h_index) {
    var cardType = Yup("#sectionItem-" + v_index + '-' + (h_index)).attr('cardtype');
    var noOfCardsForRow = noOfCardForARow(cardType);
    var h_length = presentPagedetails.sections[parseInt(v_index)].sectionControls.dataLength;
    try {
        if (h_index - 1 >= 0) {
            if (noOfCardsForRow == 8) {
                if ((h_index > h_length - 3 && h_length >= 6) || h_index < 5) {

                } else {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                }
            }
            else if (noOfCardsForRow == 7) {
                if ((h_index > h_length - 3 && h_length >= 5) || h_index < 4) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                } else {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                }
            } else {
                if (h_index == h_length - 1 && h_length > 4) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                }
                else if ((h_index == 3 && h_length < 5) || h_index <= 2) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                }
                else {
                    keyHandlar.liveScrollRightWrapper(v_index, 'left', cardType);
                }
            }
        }
    } catch (e) { }
}

//to control the right scroll in sections
keyHandlar.liveScrollRight = function (v_index, h_index) {
    var cardType = Yup("#sectionItem-" + v_index + '-' + (h_index)).attr('cardtype');
    var noOfCardsForRow = noOfCardForARow(cardType);
    var h_length = presentPagedetails.sections[parseInt(v_index)].sectionControls.dataLength;
    try {
        if (h_index + 1 < h_length) {
            if (noOfCardsForRow == 8) {
                if (h_index < 4 || h_index > h_length - 4) {
                }
                else {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }
            }
            else if (noOfCardsForRow == 7) {
                if (h_index < 3 || h_index > h_length - 4) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }
                else {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }
            } else {
                if (h_index == 0 || h_index == 1 || h_index == h_length - 2) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }
                else if (h_index != h_length - 1) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }
            }
        }
    }
    catch (e) { }
}

//left padding how much to move
keyHandlar.liveScrollRightWrapper = function (v_index, pos, cardType) {
    var leftpaddng = 413;
    for (var item = 0; item < leftRightCardCounts.length; item++) {
        if (leftRightCardCounts[item].cardType == cardType) {
            leftpaddng = keyHandlar.isHD ? leftRightCardCounts[item].smallleft : leftRightCardCounts[item].largeleft;
            break;
        }
    }
    var existingleftValue = Yup('#sectionhorizontal-' + v_index).css("left")
    existingleftValue = existingleftValue.replace('px', '');
    existingleftValue = (pos == 'right') ? (parseInt(existingleftValue) - leftpaddng) : (parseInt(existingleftValue) + leftpaddng);
    Yup('#sectionhorizontal-' + v_index).css("left", existingleftValue + 'px');
}

// Auth keyHandler
keyHandlar.AuthKeyhandler = function (e) {
    var keycode = (window.event) ? e.keyCode : e.which;
    var source = Yup('.imageFocus').attr("source");
    var index = parseInt(Yup('.imageFocus').attr("index"));
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == 'keyPadNumaric') {
                if (index != 1) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index - 1)).addClass("imageFocus");
                }
            } else if (source == 'keyPadGenric') {
                if (index != 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-' + (index - 1)).addClass("imageFocus");
                }
            } else if (source == 'keyPadEmail') {
                if (index != 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-' + (index - 1)).addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (view == 'signin') {
                    if (index <= 14) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-' + (index - 1)).addClass("imageFocus");
                    }
                } else if (view == 'forgetPassword') {
                    if (index == 15) index = 13;
                    else index = index - 1;
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                }
                else if (view == 'signupOtpVerification' || view == 'profileLockOtpVerification') {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index - 1)).addClass("imageFocus");
                }
                else if (view == 'signup') {
                    if (index == 15) index = 13;
                    else index = index - 1;
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                }
                // else if(index == 13) index=12;{
                //     Yup('.imageFocus').removeClass("imageFocus");
                //     Yup('#numeric-'+(index)).addClass("imageFocus");
                // }

            } else if (source == 'actionKeyGen') {
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#defaultKeys-' + (index - 1)).addClass("imageFocus");
            } else if (source == 'signupBtn') {
                if (view == 'otpVerification' || view == 'signupOtpVerification' || view == 'profileLockOtpVerification') {
                    Yup('.imageFocus').removeClass("imageFocus");
                    if (Yup('.input-active').attr('keyType') == 'numeric') {
                        Yup('#numeric-13').addClass("imageFocus");
                    } else {
                        Yup('#defaultKeys-44').addClass("imageFocus");
                    }
                } else {
                    Yup('.imageFocus').removeClass("imageFocus");
                    if (Yup('.input-active').attr('keyType') == 'numeric') {
                        Yup('#numeric-13').addClass("imageFocus");
                    } else {
                        Yup('#defaultKeys-44').addClass("imageFocus");
                    }
                }

            } else if (source == 'actionKeyEmail') {
                if (view == 'signin') {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-' + (index - 1)).addClass("imageFocus");
                }
            }
            else if (source = "passcode") {
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#numeric-13').addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == 'keyPadNumaric') {
                if (index < 12) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index + 1)).addClass("imageFocus");
                }
            } else if (source == 'keyPadGenric') {
                if (index < 42) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-' + (index + 1)).addClass("imageFocus");
                }
            } else if (source == 'keyPadEmail') {
                if (index < 49) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-' + (index + 1)).addClass("imageFocus");
                }
            }
            else if (source == 'actionKey') {
                if (view == 'signin' || view == "introPageView") {
                    if (index < 13) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-' + (index + 1)).addClass("imageFocus");
                    }
                    else if (index == 13) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('.code_btn').addClass("imageFocus");
                    }
                }
                else if (view == 'signupOtpVerification' || view == 'profileLockOtpVerification') {
                    if (index <= 12) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-' + (index + 1)).addClass("imageFocus");
                    }
                    else if (index == 13 && view != "profileLockOtpVerification") {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('.code_btn').addClass("imageFocus");
                    }
                    else if (index == 14) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('.code_btn').addClass("imageFocus");
                    }
                }

            } else if (source == 'actionKeyGen') {
                if (index == 43) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-44').addClass("imageFocus");
                } else if (index == 44 || index == 45) {
                    if (view == 'signin' || view == "introPageView") {
                        if (systemConfigs.configs.showSignup == "true") {
                            Yup('.imageFocus').removeClass("imageFocus");
                            Yup('#signupBtn').addClass("imageFocus");
                        }
                    }
                    else if (view == 'signup') {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#signupBtn').addClass("imageFocus");
                    }
                    else if (view == 'otpVerification') {
                        if (presentPagedetails.resendButton == true) {
                            Yup('.imageFocus').removeClass("imageFocus");
                            Yup('#resendBtn').addClass("imageFocus");
                        }
                    }
                    else if (view == 'changePassword') {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#defaultKeys-45').addClass("imageFocus");
                    }
                }
            } else if (source == 'actionKeyEmail') {
                if (view == 'signin') {
                    if (index <= 49) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#emailKeys-' + (index + 1)).addClass("imageFocus");
                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (source == 'keyPadNumaric') {
                if (index > 3) {
                    if (index == 11) { index = 9 }
                    else (index = index - 3)
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                }
            } else if (source == 'keyPadGenric') {
                if (index < 40) {
                    if (index - 10 >= 0) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#defaultKeys-' + (index - 10)).addClass("imageFocus");
                    }
                } else if (index == 40) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-31').addClass("imageFocus");
                } else if (index == 41) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-34').addClass("imageFocus");
                } else if (index == 42) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-37').addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (view == 'signin') {
                    if (index >= 12 && index <= 15) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-' + (index - 2)).addClass("imageFocus");
                    }
                } else if (view == 'signupOtpVerification' || view == 'profileLockOtpVerification' || view == 'introPageView') {
                    if (index == 12 || index == 13) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-' + (index - 2)).addClass("imageFocus");
                    }
                    else if (index == 14) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-12').addClass("imageFocus");
                    }
                }
                // else if(index == 12) index=10;{
                //     if(index == 13) index=11;
                //     Yup('.imageFocus').removeClass("imageFocus");
                //     Yup('#numeric-'+(index)).addClass("imageFocus");
                // }

            } else if (source == 'actionKeyGen') {
                if (index == 43 || index == 44) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-41').addClass("imageFocus");
                } else {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-44').addClass("imageFocus");
                }
            } else if (source == 'keyPadEmail') {
                if (index == 47 || index == 46) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-42').addClass("imageFocus");
                } else if (index == 45) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-41').addClass("imageFocus");
                } else if (index == 44 || index == 43) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-40').addClass("imageFocus");
                } else if (index == 42) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-39').addClass("imageFocus");
                } else if (index == 41) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-34').addClass("imageFocus");
                } else if (index == 40) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-30').addClass("imageFocus");
                } else if (index < 40 && index - 10 >= 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-' + (index - 10)).addClass("imageFocus");
                }
            } else if (source == 'actionKeyEmail') {
                if (index == 49) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-46').addClass("imageFocus");
                } else if (index == 48) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-43').addClass("imageFocus");
                }
                else if (view == 'signin') {
                    if (index == 50) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#emailKeys-49').addClass("imageFocus");
                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == 'keyPadNumaric') {
                if (index < 10) {
                    if (index == 9) { index = 11; }
                    else if (index == 7 || index == 8) { index = 10; }
                    else { index = index + 3; }
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                } else if (index == 10) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index + 2)).addClass("imageFocus");
                }
                else {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-13').addClass("imageFocus");
                }
            } else if (source == 'keyPadGenric') {
                if (index < 30) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-' + (index + 10)).addClass("imageFocus");
                } else if (index == 30 || index == 31) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-40').addClass("imageFocus");
                } else if (index == 30 || index == 31) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-40').addClass("imageFocus");
                } else if (index >= 32 && index <= 36) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-41').addClass("imageFocus");
                } else if (index >= 37 && index <= 39) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-42').addClass("imageFocus");
                } else {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-44').addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (view == 'signin') {
                    if ((index == 12 || index == 13) && !!(Yup('#numeric-15').addClass("imageFocus").length > 0)) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#numeric-15').addClass("imageFocus");
                    }
                } else if (view == 'signupOtpVerification' || view == 'profileLockOtpVerification') {
                    if (index == 12 || index == 13) {
                        if (presentPagedetails.resendButton == true) {
                            Yup('.imageFocus').removeClass("imageFocus");
                            Yup('#numeric-14').addClass("imageFocus");
                        }
                    }
                }
            } else if (source == 'actionKeyGen') {
                if (index == 43 || index == 44) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#defaultKeys-45').addClass("imageFocus");
                }
            } else if (source == 'keyPadEmail') {
                if (index < 30) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-' + (index + 10)).addClass("imageFocus");
                }
                else if (index >= 30 && index <= 32) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-40').addClass("imageFocus");
                }
                else if (index >= 33 && index <= 36) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-41').addClass("imageFocus");
                }
                else if (index >= 37 && index <= 39) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-42').addClass("imageFocus");
                } else if (index == 40) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-43').addClass("imageFocus");
                } else if (index == 41) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-45').addClass("imageFocus");
                } else if (index == 42) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-46').addClass("imageFocus");
                } else if (index >= 43 && index <= 47) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#emailKeys-49').addClass("imageFocus");
                }
            } else if (source == 'actionKeyEmail') {
                if (index == 48 || index == 49) {
                    if (view == 'signin') { //adding focus to signin with mobile
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#emailKeys-50').addClass("imageFocus");
                    }
                }
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.keyboardEnterHandular();
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009:
        case 461: {
            if (view == 'otpVerification') {
                Main.stopTimer();
            }

            if (view == 'signupOtpVerification') {
                if (tempObjectData.context == 'login') {
                    if (tempObjectData.actionCode == 2 || tempObjectData.actionCode == 4) {
                        tempObjectData.context = '';
                        Main.apiCall(firstMenu);
                    } else {
                        profilesPageAppeared.action = 'back';
                        clevertapservice.profileClickedEvent();
                        Main.previousPage()
                    }
                }
                else {
                    Main.popupData = {
                        popuptype: 'info',
                        message: 'Do you want to discard the signup process?',
                        buttonCount: 2,
                        yesText: 'Stay',
                        yesTarget: 'close',
                        noText: 'Leave',
                        noTarget: 'leaveFromSignup',
                        onBack: 'close',
                    }
                    Yup("#popUpFDFS").html(Util.showPopup());
                    Yup("#popup-btn-1").addClass('popupFocus');
                }
            }
            // else if(source == "nonVi"){

            //     Yup("#popUpFDFS").html('');
            //     Yup('.imageFocus').removeClass("imageFocus");
            //     Yup("#numeric-13").addClass("imageFocus");
            //     Yup('#signInInput-0').addClass('input-active');


            // }
            else if (tempObjectData.context == 'login' && view == "signin") {

                Main.previousPage();
            }
            else {
                if (view == 'profileLockOtpVerification') {
                    profilesPageAppeared.action = 'back';
                    clevertapservice.profileClickedEvent();
                }
                Main.previousPage();
            }
        }
        default: {
            break;
        }
    }
}
//keyboard number keys
document.addEventListener('keydown', function (event) {
    function getScreenResolution() {
        var screenWidth = window.screen.width;
        var screenHeight = window.screen.height;
        return {
            width: screenWidth,
            height: screenHeight
        };
    }

    var resolution = getScreenResolution();
    var keyCode = event.keyCode;

    if (keyCode >= 48 && keyCode <= 57) {
        var number = keyCode - 48;
        if (view == "signin") {
            if (Yup(".input-active").val().length < 10) {
                if (Yup(".input-active").val().length < 1 && (number < 6 || number == 10)) {
                    Yup('.toastmsg_template').html('Please enter valid mobile number')
                    Yup('.toastmsg_template').css('display', 'block');
                    setTimeout(function () {
                        Yup('.toastmsg_template').css('display', 'none');
                    }, 1000);
                }
                else {
                    Yup(".input-active").val(Yup(".input-active").val() + number);
                }
            }
            if (Yup(".input-active").val().length == 10) {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup(".mouseFocus").removeClass("mouseFocus");
                Yup("#numeric-13").addClass("imageFocus")
                // redirectOtp();
            }
        }
        else if (view == "signupOtpVerification") {
            if (Yup(".input-active").val().length < 4) {
                Yup(".input-active").val(Yup(".input-active").val() + number);
            }
            if (Yup(".input-active").val().length == 4) {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup(".mouseFocus").removeClass("mouseFocus");
                Yup("#numeric-13").addClass("imageFocus")
                var redirectSignIn = function () {
                    if ((Yup('.input-active').val()).length <= parseInt(systemConfigs.configs.maxOTPLength) && (Yup('.input-active').val()).length > 3) { //if otp is correct
                        Yup("#signInErrLabel-0").text("");
                        Yup(".input-active").removeClass("errorClass");
                        Yup('#signInInput-1').addClass('input-active');
                        //complete rigistation API call
                        if (tempObjectData.context == 'signup') {
                            Main.completeRegistation(Yup('.input-active').val());
                        }
                        else if (tempObjectData.context == 'verify_mobile') {
                            Main.verifyMobile(Yup('.input-active').val());
                        }
                        else { // Non-verified User Sign In After Otp Enter
                            //    tempObjectData.password=(Yup('.input-active').val())
                            //    Main.requestSignIn(false)
                            if (tempObjectData.actionCode == 2 || tempObjectData.actionCode == 4 || tempObjectData.actionCode == -6) {
                                Main.verifyOtp(Yup('.input-active').val());
                            }
                            else {
                                tempObjectData.password = Yup("#signInInput-0").val();
                                // tempObjectData.password = 
                                if (switchProfilesOption != true) {
                                    isUserSignedOutinThisSession = false
                                }
                                Main.requestSignIn(false);
                            }
                        }
                    }
                    else {
                        Yup("#signInErrLabel-0").text("Please enter Valid OTP.");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
                redirectSignIn();
            }
        }
        else if (view == 'profileLockOtpVerification') {
            var number = keyCode - 48;
            // var index = parseInt(Yup('.imageFocus').attr("index"));
            Yup('#errorDisplay').css('display', 'none');
            // numValue = parseInt(Yup("#numeric-" + index).text())
            function pinEnter(val) {
                var boxlength = document.querySelectorAll('.myForms input').length
                var boxNo = document.querySelectorAll('.myForms input')[currentBox];
                if (boxNo) {
                    boxNo.value = val;
                    if (boxNo.value) {
                        currentBox = currentBox + 1;
                    }
                }
            }
            pinEnter(number)
            var inputs = document.querySelectorAll('.myForms input')
            var pinNumber = ""
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                pinNumber = pinNumber + input.value;
                // if (!input.value) {
                //     Yup('#errorDisplay').css('display', 'block');
                // }
            }
            if (pinNumber.length == 4) {
                profilesPageAppeared.action = 'continue';
                clevertapservice.profileClickedEvent();
                tempObjectData.selectProfileId = Yup("#selectedProfileID").val()
                // tempObjectData.profilepassword = Yup('.input-active').val()
                Yup(".imageFocus").removeClass("imageFocus");
                Yup(".mouseFocus").removeClass("mouseFocus");
                Yup("#numeric-13").addClass("imageFocus")
                tempObjectData.profilepassword = pinNumber
                var fromLockPinProfile = true;
                Main.getSwitchProfileApi(fromLockPinProfile);
            }
        }

    }
});
//auth key Enter
var currentBox;
keyHandlar.keyboardEnterHandular = function () {
    var source = Yup('.imageFocus').attr("source");
    var index = parseInt(Yup('.imageFocus').attr("index"));
    var redirectOtp = function () {
        var configMobileRegex = systemConfigs.configs.allowedMobileNumberRegex;
        var validMobileRegex = (/[^0-9]/g, '');
        var regex;
        if (configMobileRegex != undefined) {
            regex = new RegExp(configMobileRegex);
        } else if (validMobileRegex != undefined) {
            regex = new RegExp(validMobileRegex);
        } else {
            regex = new RegExp("^[0-9]{9}")
        }
        if (regex.test(Yup('.input-active').val())) {
            Yup("#signInErrLabel-0").text("");
            Yup(".input-active").removeClass("errorClass");
            if (view == 'signin') {
                // Yup('.input-active').removeClass('input-active');
                // Yup('#signInInput-1').addClass('input-active');
                tempObjectData.mobileNo = Yup("#signInInput-0").val();
                tempObjectData.context = "login"
                if (tempObjectData.mobileNo.length < 10) {
                    Yup("#signInErrLabel-0").text("Please enter valid mobile number");
                    Yup(".input-active").addClass("errorClass");
                }
                else {
                    Main.sendOTP();
                }
            }
            else if (view == 'forgetPassword') {
                tempObjectData.mobileNo = Yup("#signInInput-0").val();
                tempObjectData.context = "update_password"
                Main.sendOTP();
            } else if (view == 'signup') {
                Yup('.input-active').removeClass('input-active');
                Yup('#signInInput-1').addClass('input-active');
                Yup("#keyLayout").html(Util.genericKeys('signuppassword'));
            }
            else if (view == "signupOtpVerification" && Yup('.input-active').val() == "") {
                Yup("#signInErrLabel-0").text("Please enter Valid OTP.");
                Yup(".input-active").addClass("errorClass");
            }
        }
        else {
            Yup("#signInErrLabel-0").text("Please enter a Valid Mobile number.");
            Yup(".input-active").addClass("errorClass");
        }

    }
    var redirectSignIn = function () {
        if ((Yup('.input-active').val()).length <= parseInt(systemConfigs.configs.maxOTPLength) && (Yup('.input-active').val()).length > 3) { //if otp is correct
            Yup("#signInErrLabel-0").text("");
            Yup(".input-active").removeClass("errorClass");
            Yup('#signInInput-1').addClass('input-active');
            //complete rigistation API call
            if (tempObjectData.context == 'signup') {
                Main.completeRegistation(Yup('.input-active').val());
            }
            else if (tempObjectData.context == 'verify_mobile') {
                Main.verifyMobile(Yup('.input-active').val());
            }
            else { // Non-verified User Sign In After Otp Enter
                //    tempObjectData.password=(Yup('.input-active').val())
                //    Main.requestSignIn(false)
                if (tempObjectData.actionCode == 2 || tempObjectData.actionCode == 4 || tempObjectData.actionCode == -6) {
                    Main.verifyOtp(Yup('.input-active').val());
                }
                else {
                    tempObjectData.password = Yup("#signInInput-0").val();
                    // tempObjectData.password = 
                    if (switchProfilesOption != true) {
                        isUserSignedOutinThisSession = false
                    }
                    profilesPageAppeared.profilesPagePageName = "otp submission"
                    profilesPageAppeared.action = 'submit';
                    clevertapservice.profileClickedEvent();
                    Main.requestSignIn(false);
                }
            }
        }
        else {
            Yup("#signInErrLabel-0").text("Please enter Valid OTP.");
            Yup(".input-active").addClass("errorClass");
        }
    }
    if (source == 'keyPadNumaric') {
        if (index <= 10) {
            Yup("#signInErrLabel-0").text("");
            Yup(".input-active").removeClass("errorClass");

            if (view == 'signin' || view == 'forgetPassword' || view == 'signup') {
                if (Yup(".input-active").val().length < 10) {
                    if (Yup(".input-active").val().length < 1 && (index < 6 || index == 10)) {
                        Yup('.toastmsg_template').html('Please enter valid mobile number')
                        Yup('.toastmsg_template').css('display', 'block');
                        setTimeout(function () {
                            Yup('.toastmsg_template').css('display', 'none');
                        }, 1000);
                    }
                    else {
                        Yup(".input-active").val(Yup(".input-active").val() + Yup("#numeric-" + index).text());

                    }
                }
                if (Yup(".input-active").val().length == 10) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup(".mouseFocus").removeClass("mouseFocus");
                    Yup("#numeric-13").addClass("imageFocus")
                    // redirectOtp();
                }
            }
            else if (view == 'otpVerification' || view == 'signupOtpVerification') {
                if (Yup(".input-active").val().length < 4) {
                    Yup(".input-active").val(Yup(".input-active").val() + Yup("#numeric-" + index).text());
                }
                if (Yup(".input-active").val().length == 4) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup(".mouseFocus").removeClass("mouseFocus");
                    Yup("#numeric-13").addClass("imageFocus")
                    redirectSignIn();
                }
            }
            else if (view == 'profileLockOtpVerification') {
                Yup('#errorDisplay').css('display', 'none');
                numValue = parseInt(Yup("#numeric-" + index).text())
                function pinEnter(val) {
                    var boxlength = document.querySelectorAll('.myForms input').length
                    var boxNo = document.querySelectorAll('.myForms input')[currentBox];
                    if (boxNo) {
                        boxNo.value = val;
                        if (boxNo.value) {
                            currentBox = currentBox + 1;
                        }
                    }
                }
                pinEnter(numValue)
                var inputs = document.querySelectorAll('.myForms input')
                var pinNumber = ""
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    pinNumber = pinNumber + input.value;
                    // if (!input.value) {
                    //     Yup('#errorDisplay').css('display', 'block');
                    // }
                }
                if (pinNumber.length == 4) {
                    profilesPageAppeared.action = 'continue';
                    clevertapservice.profileClickedEvent();
                    tempObjectData.selectProfileId = Yup("#selectedProfileID").val()
                    // tempObjectData.profilepassword = Yup('.input-active').val()
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup(".mouseFocus").removeClass("mouseFocus");
                    Yup("#numeric-13").addClass("imageFocus")
                    tempObjectData.profilepassword = pinNumber
                    var fromLockPinProfile = true;
                    Main.getSwitchProfileApi(fromLockPinProfile);
                }
            }
        }

        else if (index == 11) { //  Delete
            if (view == 'profileLockOtpVerification') {
                Yup('#errorDisplay').css('display', 'none');
                if (currentBox > 0) {
                    currentBox = currentBox - 1;
                    boxNo = document.querySelectorAll('.myForms input')[currentBox];
                    if (boxNo) {
                        boxNo.value = ""
                    }
                }
            }
            else {
                Yup("#signInErrLabel-0").text("");
                Yup('.input-active').val(Yup('.input-active').val().substring(0, Yup('.input-active').val().length - 1));
                Yup(".input-active").removeClass("errorClass");
            }
        }
    }
    else if (source == 'actionKey') {
        if (index == 12) { //clicked on cancle
            profilesPageAppeared.action = 'back';
            clevertapservice.profileClickedEvent();
            tempObjectData.landingFromSettings = false;
            Main.previousPage();
            // if(view !="accountDetails"){
            // Yup('#menu-profile').addClass('imageFocus');
            // }

        } else if (index == 13) { 	//adding focus to Password
            if (view != 'profileLockOtpVerification') {
                var inputElement = document.getElementById('signInInput-0');
                var inputValue = inputElement.value.trim();
            }
            if ((view == 'signin' || view == 'forgetPassword' || view == 'signup') && inputValue !== "") {
                if (inputValue.length < 10) { // less than 10 digits
                    clevertapservice.sendCleverTapEvent('registration initiated', {
                        'status': "failed",
                        'mobile no': inputValue,
                        'reason': 'invalid number',
                        'source': view == "search" ? "search" : "carousel"
                    });
                } else { // 10 digits and correct
                    clevertapservice.sendCleverTapEvent('registration initiated', {
                        'status': 'success',
                        'mobile no': inputValue,
                        'reason': "valid number",
                        'source': view == "search" ? "search" : "carousel"
                    });

                }
                redirectOtp();
            } else if (inputValue == "") { // if no digits entered
                clevertapservice.sendCleverTapEvent('registration initiated', {
                    'status': "failed",
                    'mobile no': '',
                    'reason': 'No number',
                    'source': view == "search" ? "search" : "carousel"
                });
                redirectOtp();
            }
            else if (view == 'otpVerification') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 0) {  // otp form
                    if ((Yup('.input-active').val()).length <= parseInt(systemConfigs.configs.maxOTPLength) && (Yup('.input-active').val()).length > 3) { //if otp is correct
                        Yup("#signInErrLabel-0").text("");
                        Yup(".input-active").removeClass("errorClass");
                        Yup('.input-active').removeClass('input-active');
                        Yup('#signInInput-1').addClass('input-active');
                        Yup("#keyLayout").html(Util.genericKeys('newPassword'));
                    }
                    else {
                        Yup("#signInErrLabel-0").text("Please enter Valid OTP.");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
            }
            else if (view == 'signupOtpVerification') {
                redirectSignIn();
            }
            else if (view == 'profileLockOtpVerification') {
                // if(Yup('.input-active').val().length == appConfig.passwordMinLength){ //if otp is correct
                var inputs = document.querySelectorAll('.myForms input')
                var pinNumber = ""
                for (var input of inputs) {
                    pinNumber = pinNumber + input.value
                    if (!input.value) {
                        Yup('#errorDisplay').css('display', 'block');
                    }
                }
                if (pinNumber.length == 4) {
                    tempObjectData.selectProfileId = Yup("#selectedProfileID").val()
                    // tempObjectData.profilepassword = Yup('.input-active').val()
                    tempObjectData.profilepassword = pinNumber
                    var fromLockPinProfile = true;
                    Main.getSwitchProfileApi(fromLockPinProfile);
                }
            }

        } else if (index == 14) {
            if (view == 'signupOtpVerification') { // click on resend
                profilesPageAppeared.profilesPagePageName = "otp submission"
                profilesPageAppeared.action = 'resend otp';
                clevertapservice.profileClickedEvent();
                Main.resendOTP();
            }
            else { //click on change countrycode
                tempObjectData.mobileNo = Yup("#signInInput-0").val();
                tempObjectData.context = "contry_code"
                view = 'countryCode';
                Main.processNext();
            }

        }
        else if (index == 15) { //click on signin in email
            presentPagedetails.isChecked = false;
            Yup("#mainContent").html('');
            Yup("#mainContent").html(Util.signInHtml('mobile'));
        }
    }
    else if (source == 'keyPadGenric') {
        if (index == 42) { // clicked on clear
            Yup('.input-active').val(Yup('.input-active').val().substring(0, Yup('.input-active').val().length - 1));  //  Delete
        }
        else if (index == 41) { // cliked on space
            if (Yup(".input-active").val().length < appConfig.passwordMaxLength) {
                Yup('.input-active').val((Yup('.input-active').val().concat(' ')));  // Space
            }
        } else if (index == 40) { //cliked on special char
            if (Yup("#defaultKeys-40").text() == "!#$") {
                for (var i = 0; i < specialCharArray.length; i++) {
                    Yup("#defaultKeys-" + i).html(specialCharArray[i]);
                }
                Yup("#defaultKeys-" + 40).html("abc");
            }
            else {
                for (var i = 0; i < characterArray.length; i++) {
                    Yup("#defaultKeys-" + i).html(characterArray[i]);
                }
                Yup("#defaultKeys-40").html("!#$");
            }
        } else if (index == 30) {   // Upto characters
            for (var i = 10; i < 40; i++) {
                if (/^[A-Z]/.test(Yup("#defaultKeys-" + i).text()) && i != 30)
                    Yup("#defaultKeys-" + i).text(Yup("#defaultKeys-" + i).text().toLowerCase());
                else if (i != 30)
                    Yup("#defaultKeys-" + i).text(Yup("#defaultKeys-" + i).text().toUpperCase());
            }
        } else {
            if (Yup(".input-active").val().length < appConfig.passwordMaxLength) {
                Yup(".input-active").val(Yup(".input-active").val() + Yup("#defaultKeys-" + index).text());
            }
        }
    }
    else if (source == 'actionKeyGen') {
        if (index == 43) {  // clicked on previous
            if (view == 'signin' || view == "introPageView") {
                Yup('.input-active').removeClass('input-active');
                Yup('#signInInput-0').addClass('input-active');
                if (presentPagedetails.formType == 'mobile') {
                    Yup("#keyLayout").html(Util.numberKeys('signin'));
                } else {
                    Yup("#keyLayout").html(Util.emailKeys('signin'));
                }
            }
            else if (view == 'otpVerification' || view == 'profileLockOtpVerification') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 2) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-1').addClass('input-active');
                    Yup("#keyLayout").html(Util.genericKeys('newPassword'));
                }
                else if (formIndex == 1) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-0').addClass('input-active');
                    Yup("#keyLayout").html(Util.numberKeys('otp'));
                }
            }
            else if (view == 'changePassword') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 2) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-1').addClass('input-active');
                    Yup("#keyLayout").html(Util.genericKeys('newPassword'));
                }
                else if (formIndex == 1) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-0').addClass('input-active');
                    Yup("#keyLayout").html(Util.genericKeys('changePassOld'));
                } else if (formIndex == 0) {
                    Main.previousPage();
                }
            }
            else if (view == 'signup') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 2) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-1').addClass('input-active');
                    Yup("#keyLayout").html(Util.genericKeys('signuppassword'));
                }
                else if (formIndex == 1) {
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-0').addClass('input-active');
                    Yup("#keyLayout").html(Util.numberKeys('signup'));
                }
            }
        } else if (index == 44) { // clicked on signin /next
            if (view == 'signin') {
                if (/^\S*$/.test(Yup('.input-active').val())) {
                    if (Yup('.input-active').val().length >= 4 && Yup('.input-active').val().length <= appConfig.passwordMaxLength) {
                        var validateEmailMobile = utilities.validMobileEmail(Yup("#signInInput-0").val());
                        Yup(".input-active").removeClass("errorClass");
                        Yup("#signInErrLabel-1").text('');
                        tempObjectData.mobileNo = Yup("#signInInput-0").val();
                        tempObjectData.password = Yup("#signInInput-1").val();
                        tempObjectData.isMobile = validateEmailMobile.isMobile;
                        Main.requestSignIn(false);
                    }
                    else {
                        Yup("#signInErrLabel-1").text('Password length must be at least 4 and less than ' + (appConfig.passwordMaxLength) + ' characters');
                        Yup(".input-active").addClass("errorClass");
                    }
                } else {
                    Yup("#signInErrLabel-1").text("Password should not have spaces");
                    Yup(".input-active").addClass("errorClass");
                }
            } else if (view == 'otpVerification' || view == 'profileLockOtpVerification') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 1) {  //new password
                    if (/^\S*$/.test(Yup('.input-active').val())) {
                        if (Yup('.input-active').val().length >= appConfig.passwordMinLength && Yup('.input-active').val().length <= appConfig.passwordMaxLength) {
                            Yup(".input-active").removeClass("errorClass");
                            Yup("#signInErrLabel-1").text('');
                            Yup('.input-active').removeClass('input-active');
                            Yup('#signInInput-2').addClass('input-active');
                            Yup("#keyLayout").html(Util.genericKeys('reenterPassword'));
                        }
                        else {
                            Yup("#signInErrLabel-1").text('Password length must be at least ' + (appConfig.passwordMinLength) + ' and less than ' + (appConfig.passwordMaxLength) + ' characters');
                            Yup(".input-active").addClass("errorClass");
                        }
                    } else {
                        Yup("#signInErrLabel-1").text("Password should not have spaces");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
                else if (formIndex == 2) {  // reenter new password
                    if (Yup('.input-active').val() == Yup("#signInInput-1").val()) {
                        Yup(".input-active").removeClass("errorClass");
                        Yup("#signInErrLabel-2").text('');
                        tempObjectData.password = Yup("#signInInput-1").val();
                        Main.verifyOtpForgetPassword(Yup("#signInInput-0").val())
                    } else {
                        Yup("#signInErrLabel-2").text("Password Mismatch");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
            }
            else if (view == 'changePassword') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 0) {  //old password
                    if (/^\S*$/.test(Yup('.input-active').val())) {
                        if (Yup('.input-active').val().length >= appConfig.passwordMinLength && Yup('.input-active').val().length <= appConfig.passwordMaxLength) {
                            Yup(".input-active").removeClass("errorClass");
                            Yup("#signInErrLabel-0").text('');
                            Yup('.input-active').removeClass('input-active');
                            Yup('#signInInput-1').addClass('input-active');
                            Yup("#keyLayout").html(Util.genericKeys('newPassword'));
                        }
                        else {
                            Yup("#signInErrLabel-0").text('Password length must be at least ' + (appConfig.passwordMinLength) + ' and less than ' + (appConfig.passwordMaxLength) + ' characters');
                            Yup(".input-active").addClass("errorClass");
                        }
                    } else {
                        Yup("#signInErrLabel-0").text("Password should not have spaces");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
                else if (formIndex == 1) {  // enter new password
                    if (/^\S*$/.test(Yup('.input-active').val())) {
                        if (Yup('.input-active').val().length >= appConfig.passwordMinLength && Yup('.input-active').val().length <= appConfig.passwordMaxLength) {
                            Yup(".input-active").removeClass("errorClass");
                            Yup("#signInErrLabel-1").text('');
                            Yup('.input-active').removeClass('input-active');
                            Yup('#signInInput-2').addClass('input-active');
                            Yup("#keyLayout").html(Util.genericKeys('updatePassword'));
                        }
                        else {
                            Yup("#signInErrLabel-1").text('Password length must be at least ' + (appConfig.passwordMinLength) + ' and less than ' + (appConfig.passwordMaxLength) + ' characters');
                            Yup(".input-active").addClass("errorClass");
                        }
                    } else {
                        Yup("#signInErrLabel-1").text("Password should not have spaces");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
                else if (formIndex == 2) {  // reenter new password
                    if (Yup('.input-active').val() == Yup("#signInInput-1").val()) {
                        Yup(".input-active").removeClass("errorClass");
                        Yup("#signInErrLabel-2").text('');
                        Main.updatePassword(Yup("#signInInput-0").val(), Yup("#signInInput-1").val());
                    } else {
                        Yup("#signInErrLabel-2").text("Password Mismatch");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
            }
            else if (view == 'signup') {
                var formIndex = parseInt(Yup('.input-active').attr("index"));
                if (formIndex == 1) {
                    if (/^\S*$/.test(Yup('.input-active').val())) {
                        if (Yup('.input-active').val().length >= appConfig.passwordMinLength && Yup('.input-active').val().length <= appConfig.passwordMaxLength) {
                            Yup(".input-active").removeClass("errorClass");
                            Yup("#signInErrLabel-1").text('');
                            Yup('.input-active').removeClass('input-active');
                            Yup('#signInInput-2').addClass('input-active');
                            Yup("#keyLayout").html(Util.genericKeys('confirmPassword'));
                        }
                        else {
                            Yup("#signInErrLabel-1").text('Password length must be at least ' + (appConfig.passwordMinLength) + ' and less than ' + (appConfig.passwordMaxLength) + ' characters');
                            Yup(".input-active").addClass("errorClass");
                        }
                    } else {
                        Yup("#signInErrLabel-1").text("Password should not have spaces");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
                else if (formIndex == 2) {  // reenter new password
                    if (Yup('.input-active').val() == Yup("#signInInput-1").val()) {
                        Yup(".input-active").removeClass("errorClass");
                        Yup("#signInErrLabel-2").text('');
                        tempObjectData.mobileNo = Yup("#signInInput-0").val();
                        tempObjectData.password = Yup("#signInInput-1").val();
                        //get otp for signup request
                        Main.requestSignUpV2();
                    } else {
                        Yup("#signInErrLabel-2").text("Password Mismatch");
                        Yup(".input-active").addClass("errorClass");
                    }
                }
            }

        } else if (index == 45) { //show password
            var isChecked = Yup("#defaultKeys-45").attr('isChecked');
            if (isChecked == 'no') {
                Yup("#defaultKeys-45").addClass('checked');
                Yup("#defaultKeys-45").attr('isChecked', 'yes');
                presentPagedetails.isChecked = true;
                document.getElementById('signInInput-1').setAttribute('type', 'text');
                if (view == 'otpVerification' || view == 'changePassword' || view == 'signup') {
                    document.getElementById('signInInput-2').setAttribute('type', 'text');
                }
                if (view == 'changePassword') {
                    document.getElementById('signInInput-0').setAttribute('type', 'text');
                }
            } else {
                Yup("#defaultKeys-45").removeClass('checked');
                Yup("#defaultKeys-45").attr('isChecked', 'no');
                presentPagedetails.isChecked = false;
                document.getElementById('signInInput-1').setAttribute('type', 'password');
                if (view == 'otpVerification' || view == 'changePassword' || view == 'signup') {
                    document.getElementById('signInInput-2').setAttribute('type', 'password');
                }
                if (view == 'changePassword') {
                    document.getElementById('signInInput-0').setAttribute('type', 'password');
                }
            }
        }
    }
    else if (source == 'signupBtn') {
        if (view == 'otpVerification' || view == 'signupOtpVerification') {
            Main.resendOTP();
        }
        else if (view == 'signin') {
            view = 'signup';
            Main.processNext();
        }
        else if (view == 'signup') {
            if (tempObjectData.landingFromSettings == true) {
                tempObjectData.landingFromSettings = false;
                view = 'signin';
                Main.processNext();
            } else {
                Main.previousPage();
            }

        }
    }
    else if (source == 'keyPadEmail') {
        if (index <= 42 || index == 44 || index == 45 || index == 46) { //general keys
            if (index == 30) { //upperCase
                for (var i = 10; i < 40; i++) {
                    if (/^[A-Z]/.test(Yup("#emailKeys-" + i).text()) && i != 30)
                        Yup("#emailKeys-" + i).text(Yup("#emailKeys-" + i).text().toLowerCase());
                    else if (i != 30)
                        Yup("#emailKeys-" + i).text(Yup("#emailKeys-" + i).text().toUpperCase());
                }
            } else {
                if ((Yup(".input-active").val()).length < 63) {
                    Yup(".input-active").val(Yup(".input-active").val() + Yup("#emailKeys-" + index).text());
                    var foo = document.getElementById("signInInput-0");
                    foo.scrollLeft = foo.scrollWidth;
                }
            }
        } else if (index == 43) { // special charecters
            if (Yup("#emailKeys-43").text() == "!#$") {
                for (var i = 0; i < specialCharArray.length; i++) {
                    Yup("#emailKeys-" + i).html(specialCharArray[i]);
                }
                Yup("#emailKeys-" + 43).html("abc");
            } else {
                for (var i = 0; i < characterArray.length; i++) {
                    Yup("#emailKeys-" + i).html(characterArray[i]);
                }
                Yup("#emailKeys-43").html("!#$");
            }
        } else if (index == 47) { //backSpace
            Yup('.input-active').val(Yup('.input-active').val().substring(0, Yup('.input-active').val().length - 1));  //  Delete
        }
    }
    else if (source == "actionKeyEmail") {
        if (view == 'signin') {
            if (index == 48) { //clicked on cancle
                tempObjectData.landingFromSettings = false;
                Main.previousPage();
            }
            else if (index == 49) { //clicked on Signin next adding focus to password field
                var validateEmailMobile = utilities.validMobileEmail(Yup(".input-active").val());
                if (validateEmailMobile.isEmail == true) {   //valid Email
                    Yup("#signInErrLabel-0").text("");
                    Yup(".input-active").removeClass("errorClass");
                    Yup('.input-active').removeClass('input-active');
                    Yup('#signInInput-1').addClass('input-active');
                    Yup("#keyLayout").html(Util.genericKeys('signin'));
                } else {
                    Yup("#signInErrLabel-0").text("Please enter a Valid Email ID.");
                    Yup(".input-active").addClass("errorClass");
                }
            } else if (index == 50) { //clicked on signin with mobile
                presentPagedetails.isChecked = false;
                Yup("#mainContent").html('');
                Yup("#mainContent").html(Util.signInHtml('mobile'));
            }
        }

    }
    else if (source == "nonVi") {
        // Yup("#popUpFDFS").html('');
        // Yup('.imageFocus').removeClass("imageFocus");
        // Yup("#numeric-13").addClass("imageFocus");

    }
    else if (source == "passcode") {
        Yup('#passcode_msg').css('display', 'none');
        if (view == "signupOtpVerification") {
            profilesPageAppeared.profilesPagePageName = "otp submission"
        }
        else {
            profilesPageAppeared.profilesPagePageName = "number submission"
        }
        profilesPageAppeared.action = 'get new code';
        clevertapservice.profileClickedEvent();
        Main.getActivateDeviceAPI(true);
    }
}

// UPI Payment Page key handular
keyHandlar.upiPaymentPageKeyhandler = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    var type = Yup('.imageFocus').attr("btntype");
    switch (keycode) {
        case 8:
        case tvKeyCode.Return:
        case 10009:
        case 461: {
            if (typeof Main !== "undefined" && typeof Main.handleUpiBackNavigation === "function") {
                Main.handleUpiBackNavigation();
            } else {
                if (Util.upiTimerInterval) {
                    clearInterval(Util.upiTimerInterval);
                }
                if (!!postpaidBillListener) {
                    clearTimeout(postpaidBillListener);
                    postpaidBillListener = null;
                }
                Main.previousPage();
            }
            break;
        }
        case 13:
        case tvKeyCode.Enter: {
            if (Util.upiPageExpired) {
                Util.refreshUpiPayment();
                break;
            }
            var splitData = id.split('-');
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        if (type == "success") {
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                        }
                        else {
                            Main.previousPage();
                        }

                    }
                    else if (playerToDetails.view === "content" || playerToDetails.view === "list" || playerToDetails.view === "seasonsDetails" || playerToDetails.view === "list") {
                        if (type == "success") {
                            var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                            Main.apiCall(clickedCardForPostPaid)
                            Main.getUserInfo(true);
                            localStorage.removeItem('clickedCardForPostPaid');
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                    else {
                        if (playerToDetails.view == "switchProfile") {
                            if (type == "success") {
                                var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                                Main.apiCall(clickedCardForPostPaid)
                                Main.getUserInfo(true);
                                localStorage.removeItem('clickedCardForPostPaid');
                            }
                            else {
                                Main.apiCall(firstMenu)
                            }
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            break;
        }
    }
};

//Popup key handular
keyHandlar.popupKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.popupFocus').attr("id");
    var btntype = Yup('.popupFocus').attr("btntype");
    var source = Yup('.popupFocus').attr("source");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var splitData = id.split('-');
            if (parseInt(splitData[2]) == 2 && Main.popupData.buttonCount == 2 && source != "up") {
                Yup("#popup-btn-2").removeClass('popupFocus');
                Yup("#popup-btn-1").addClass('popupFocus');
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            if (parseInt(splitData[2]) == 1 && Main.popupData.buttonCount == 2 && source != "up") {
                Yup("#popup-btn-1").removeClass('popupFocus');
                Yup("#popup-btn-2").addClass('popupFocus');
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (parseInt(splitData[2]) == 2 && Main.popupData.buttonCount == 2 && source == "up") {
                Yup("#popup-btn-2").removeClass('popupFocus');
                Yup("#popup-btn-1").addClass('popupFocus');
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (parseInt(splitData[2]) == 1 && Main.popupData.buttonCount == 2 && source == "up") {
                Yup("#popup-btn-1").removeClass('popupFocus');
                Yup("#popup-btn-2").addClass('popupFocus');
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (Main.popupData) {
                if (presentPagedetails && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
                    if (Yup('.banners').css('display') == 'block') {
                        BannerMove();
                    }
                }
                if (id == 'offers_close' && Main.popupData.popuptype == "plansNew") {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    if (view == "switchProfile") {
                        Main.apiCall(firstMenu);
                    }
                }
                else if (Main.popupData.yesTarget == "activeClose") {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                }
                if (Main.popupData.onBack == 'close' && Main.popupData.popuptype == "adultPopup") {
                    Yup('#popUpFDFS').html('');
                    Main.popupData = undefined;
                    if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                        var sourceDetailsPop = ctEvent.topBanner
                    }
                    else {
                        var sourceDetailsPop = ctEvent.carouselName
                    }
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup closed',
                        'label': 'explicit content',
                        'popup name': 'adult content warning',
                        'button label': "na",
                        'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
                        'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
                        'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                        'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                        'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                        'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                        'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                        'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                        'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                        'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                        'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                        'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                        'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
                    })
                    Main.previousPage();
                }
                else if (Main.popupData.onBack == 'close' && Main.popupData.popuptype == "addPostpaidBill") {
                    Yup('#popUpFDFS').html('');
                    Main.popupData = undefined;
                    // Yup("imageFocus").removeClass("imageFocus");
                    // Yup("#package_item-0").addClass("imageFocus")
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup closed',
                        'label': 'postpaid confirmation',
                        'popup name': 'postpaid confirmation',
                        'button label': "na",
                        'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
                        'source details': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                        'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                        'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                        'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                        'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                        'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                        'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                        'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                        'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                        'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                        'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                        'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
                        // 'tab':ctEvent.tabName,  
                    })
                    // Main.previousPage();
                }
                else if (Main.popupData.onBack == 'close') {
                    if (Main.popupData.popuptype === 'upiPayment') {
                        if (Util.upiTimerInterval) {
                            clearInterval(Util.upiTimerInterval);
                        }
                    }
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    ybbPopUp = "";
                }
                else if (Main.popupData.onBack == 'exit') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                }
                else if (btntype == 'yes') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    Main.previousPage();
                }
                else if (target == 'navigateBack') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    Main.previousPage();
                }
                else if (target == 'goto_signin_from_password_reset') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    backData.pop();
                    Main.previousPage();
                } else if (target == 'exit') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    toast.application.exit();
                }
                else if (target == 'navigateBackFromPlayer') {
                    Yup("#popUpFDFS").html('');
                    Main.popupData = {};
                    try {
                        media.stop();
                        media.unsetListener();
                    }
                    catch (e) { }
                    Main.previousPage();
                }
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.popupEnterHandlar(id, event);
            break;
        }
        default: {
            break;
        }
    }
}

//Popup Enter Key Handular
keyHandlar.popupEnterHandlar = function (id, event) {
    var btnType = Yup('#' + id).attr("btnType");
    var id = Yup('.imageFocus').attr("id");
    var id = Yup('.popupFocus').attr("id");
    var target = (btnType == 'yes') ? Main.popupData.yesTarget : Main.popupData.noTarget;
    var buttonLab = Main.popupData.yesTarget ? 'Confirm' : Main.popupData.noTarget ? 'Cancel' : '';
    if (id == 'offers_close' && Main.popupData.popuptype == "plansNew") {
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        if (view == 'seasonsDetails') {
            var subtitle =
                Main &&
                Main.popupData &&
                Main.popupData.plansPageInfo &&
                Main.popupData.plansPageInfo.subTitle;

            var match = subtitle && subtitle.match(/#(.*?)#/);

            var price = match && match[1] ? match[1] : "";


            clevertapservice.sendCleverTapEvent('subscription page clicked', {
                'action': detailsText ? detailsText.toLowerCase() : "close",
                'tab': ctEvent && ctEvent.currentTabName,
                'source': Main.popupData && Main.popupData.subscriptionClicked ? Main.popupData.subscriptionClicked : "Browse episodes",
                'page name': 'plans',
                'movies pack price': price ? price : "unknown"
            })
        }
        else {
            if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner' && Main.popupData && !Main.popupData.subscriptionClicked && postPaidPopContentData && !postPaidPopContentData["button label"]) {
                var sourceDetailsPop = ctEvent.topBanner
                var subtitle =
                    Main &&
                    Main.popupData &&
                    Main.popupData.plansPageInfo &&
                    Main.popupData.plansPageInfo.subTitle;

                var match = subtitle && subtitle.match(/#(.*?)#/);

                var price = match && match[1] ? match[1] : "";

                clevertapservice.sendCleverTapEvent('subscription page clicked', {
                    'action': detailsText ? detailsText.toLowerCase() : "close",
                    'tab': ctEvent && ctEvent.currentTabName,
                    'source': sourceDetailsPop,
                    'page name': 'plans',
                    'movies pack price': price ? price : "unknown"
                })
            }
            else {
                if (postPaidPopContentData && postPaidPopContentData["button label"] && postPaidPopContentData["button label"] == "Watch Live") {
                    postPaidPopContentData["button label"] = "watch now"
                }
                var subtitle =
                    Main &&
                    Main.popupData &&
                    Main.popupData.plansPageInfo &&
                    Main.popupData.plansPageInfo.subTitle;

                var match = subtitle && subtitle.match(/#(.*?)#/);

                var price = match && match[1] ? match[1] : "";

                clevertapservice.sendCleverTapEvent('subscription page clicked', {
                    'action': detailsText ? detailsText.toLowerCase() : "close",
                    'tab': ctEvent && ctEvent.currentTabName,
                    'source': Main.popupData && Main.popupData.subscriptionClicked
                        ? Main.popupData.subscriptionClicked
                        : (postPaidPopContentData && postPaidPopContentData["button label"]
                            ? 'content ' + postPaidPopContentData["button label"]
                            : 'carousel'),
                    'page name': 'plans',
                    'movies pack price': price ? price : "unknown"
                })
            }
        }
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        if (presentPagedetails && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
            if (Yup('.banners').css('display') == 'block') {
                BannerMove();
            }
        }
        if (view == "switchProfile") {
            Main.apiCall(firstMenu);
        }
    }
    else if (target == 'close') {
        if (Main.popupData.popuptype == "adultPopup") {
            var id = Yup('.popupFocus').attr("id");
            var detailsText = Yup('#' + id).text();
            if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                var sourceDetailsPop = ctEvent.topBanner
            }
            else {
                var sourceDetailsPop = ctEvent.carouselName
            }
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'button clicked',
                'label': 'explicit content',
                'popup name': 'adult content warning',
                'button label': detailsText ? detailsText : "na",
                'source': 'content',
                'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
                'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
                'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
            })
            Yup('#popUpFDFS').html('');
            Main.popupData = undefined;
            Main.previousPage();

        }
        else if (Main.popupData.popuptype == "ybbConfirmation") {
            var id = Yup('.popupFocus').attr("id");
            var detailsText = Yup('#' + id).text();
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'button clicked',
                'popup name': "you broadband welcome",
                'button label': detailsText ? detailsText : "",
            })
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'popup closed',
                'popup name': "you broadband welcome",
                'button label': detailsText ? detailsText : "",
            })
            Yup("#popUpFDFS").html('');
            Main.popupData = {};
            ybbPopUp = ""
        }
        else {
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'button clicked',
                'popup name': presentPagedetails.targetPath === "settings" ? "signout" : 'exit',
                'label': presentPagedetails.targetPath === "settings" ? "signout" : 'exit',
                'button label': Main.popupData.noText ? 'Cancel' : Main.popupData.yesText ? 'Exit' : buttonLab,
                'source': ""
            })
            profilesPageAppeared.action = 'cancel';
            profilesPageAppeared.profilesPagePageName = 'manage device logout confirmation'
            // clevertapservice.profileClickedEvent();
            Yup("#popUpFDFS").html('');
            Main.popupData = {};

            if (presentPagedetails.targetPath == 'favourites' && isSidemenuOpened != true) {
                Yup('.section_row').css('display', 'block');
                Yup('#sectionItem-0-0').addClass('imageFocus');
            }
            if (id == "nonVi_close") {
                Yup('#signInInput-0').addClass('input-active');
            }
        }
        if (presentPagedetails && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
            if (Yup('.banners').css('display') == 'block') {
                BannerMove();
            }
        }
    }
    else if ((presentPagedetails.view == "plansUpgrade" || presentPagedetails.view == "bannersPlansUpgrade") && target == 'billClose') {
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
            var sourceDetailsPop = ctEvent.topBanner
        }
        else {
            var sourceDetailsPop = ctEvent.carouselName
        }
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'postpaid confirmation',
            'popup name': 'postpaid confirmation',
            'button label': presentPagedetails && presentPagedetails.cancelText ? presentPagedetails.cancelText : "na",
            'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (postPaidPopContentData && postPaidPopContentData.searchSource === "search" ? "search" : "carousel"),
            'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
            'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
            'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
            'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
            'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
            'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
            'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
            'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
            'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
            'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
            'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
            // 'tab':ctEvent.tabName,  
        })
        Yup("#popUpFDFS").html('');
        var planID = Main.popupData.addBillID
        clevertapservice.sendCleverTapEvent('subscription page clicked', {
            'page name': 'postpaid confirmation',
            'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
            'action': presentPagedetails && presentPagedetails.cancelText ? presentPagedetails.cancelText : "Cancel",
            'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[planID] && presentPagedetails.response.packages[planID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[planID].packageInfo.packages[0].salePrice : "",
            'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[planID] && presentPagedetails.response.packages[planID].packageInfo.master.name ? presentPagedetails.response.packages[planID].packageInfo.master.name : ""
        })
        Main.popupData = {};
        // Yup("imageFocus").removeClass("imageFocus");
        // Yup("#package_item-0").addClass("imageFocus")
        event.preventDefault();
        if (presentPagedetails && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
            if (Yup('.banners').css('display') == 'block') {
                BannerMove();
            }
        }
    }
    else if (presentPagedetails.view == "content" && target == 'billClose') {
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
            var sourceDetailsPop = ctEvent.topBanner
        }
        else {
            var sourceDetailsPop = ctEvent.carouselName
        }
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'postpaid confirmation',
            'popup name': 'postpaid confirmation',
            'button label': presentPagedetails && presentPagedetails.cancelText ? presentPagedetails.cancelText : "na",
            'source': "carousel",
            'source details': "top banner",
            'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
            'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
            'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
            'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
            'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
            'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
            'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
            'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
            'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
            'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
            // 'tab':ctEvent.tabName,  
        })
        clevertapservice.sendCleverTapEvent('subscription page clicked', {
            'action': detailsText ? detailsText.toLowerCase() : "close",
            'tab': ctEvent && ctEvent.currentTabName,
            'source': "top banner",
            'page name': 'postpaid confirmation'
        })
        Yup("#popUpFDFS").html('');
        // var planID = Main.popupData.addBillID
        // clevertapservice.sendCleverTapEvent('subscription page clicked', {
        //     'page name': 'postpaid confirmation',
        //     'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
        //     'action':presentPagedetails && presentPagedetails.cancelText ? presentPagedetails.cancelText :  "Cancel",
        //     'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[planID] && presentPagedetails.response.packages[planID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[planID].packageInfo.packages[0].salePrice : "",
        // 	'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[planID] && presentPagedetails.response.packages[planID].packageInfo.master.name ? presentPagedetails.response.packages[planID].packageInfo.master.name : "" 
        // })
        Main.popupData = {};
        if (presentPagedetails && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
            if (Yup('.banners').css('display') == 'block') {
                BannerMove();
            }
        }
    }
    else if (target == 'deviceRemovee') {
        profilesPageAppeared.action = 'Log Out';
        profilesPageAppeared.profilesPagePageName = 'manage device logout confirmation'
        clevertapservice.profileClickedEvent();
        Main.removeActiveSessions(Main.popupData.id)
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
    }
    else if (Main.popupData.popuptype == "deviceRemovee") {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
    }
    else if (target == "retrynet") {
        if (view == "player") {
            Yup("#popUpFDFS").html('');
            Main.popupData = {};
            distroPlayingMacro = false
            skipIntroOnn = false;
            clickedSkipIntro = false
            analytics.plugin.handlePlayEndedByUser();
            ShakaPlayer.stopInterval();
            Main.playerScreenSessionEnd();
            Main.myRecoApi(myReco);
            ShakaPlayer.kill();
            Main.previousPage();
            // Check if a style element with a specific ID exists
            var existingStyle = document.getElementById('subtitle-style');
            // If it exists, remove it
            if (existingStyle) {
                existingStyle.remove();
            }
        }
        else {
            Yup("#popUpFDFS").html('');
            Main.popupData = {};
        }
    }
    else if (target == 'goToSettings') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        distroPlayingMacro = false
        skipIntroOnn = false;
        clickedSkipIntro = false
        playerTargerpath = presentPagedetails.targetPath
        analytics.plugin.handlePlayEndedByUser();
        ShakaPlayer.stopInterval();
        Main.playerScreenSessionEnd();
        Main.myRecoApi(myReco);
        ShakaPlayer.kill();
        // Check if a style element with a specific ID exists
        var existingStyle = document.getElementById('subtitle-style');
        // If it exists, remove it
        if (existingStyle) {
            existingStyle.remove();
        }
        Main.getActiveScreen();
    }
    else if (target == 'activeClose') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.apiCall(playerTargerpath);
    }
    else if (target == 'exit') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        tizen.application.getCurrentApplication().exit();
        var detailsText = Yup('#' + id).text();
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'exit',
            'popup name': 'exit',
            'button label': detailsText,
        })

    }
    else if (target == 'leaveFromSignup') {
        Main.stopTimer();
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.previousPage();
    }
    else if (target == 'leaveFromOTP') {
        Main.stopTimer();
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        tempObjectData.context = '';
        Main.previousPage();
    }
    else if (target == 'forceLogin') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.requestSignIn(true);
    }
    else if (target == 'sessionLogout') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.BOXID = '';
        Main.sessionID = '';
        backData = [];
        presentPagedetails = {};
        popupData = {};
        clickedMenu = {};
        localStorage.removeItem('userDetails');
        localStorage.removeItem('currentUserDetails');
        localStorage.removeItem('selected_targetSign');
        commingFromMenus = false;
        isUserSignedOutinThisSession = true;
        pollSessionExit = true
        comingFromTemplates = false
        utilities.setLocalStorage('sessionID', '');
        utilities.setLocalStorage('boxNo', '');
        Main.getSessionAPI({ type: 'config' }, Main.getConfig);
    }
    else if (target == 'signOut') {
        Yup("#popUpFDFS").html('');
        var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        clevertapservice.sendCleverTapEvent('signout completed', {
            'mobile number': userDetails.phoneNumber
        })
        Main.popupData = {};
        Main.signout();
    }
    else if (target == 'logOut') {
        Yup("#popUpFDFS").html('');
        // var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // clevertapservice.sendCleverTapEvent('signout completed',{
        //     'mobile number':userDetails.phoneNumber
        // })
        profilesPageAppeared.action = 'Log Out';
        profilesPageAppeared.profilesPagePageName = 'manage device logout confirmation'
        clevertapservice.profileClickedEvent();
        Main.removeActiveSessions(Main.popupData.logoutDeviceId)
        Main.popupData = {};
    }
    else if (target == 'bannersAddToBill') {

        // var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // clevertapservice.sendCleverTapEvent('signout completed',{
        //     'mobile number':userDetails.phoneNumber
        // })
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
            var sourceDetailsPop = ctEvent.topBanner
        }
        else {
            var sourceDetailsPop = ctEvent.carouselName
        }
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'postpaid confirmation',
            'popup name': 'postpaid confirmation',
            'button label': presentPagedetails && presentPagedetails.confirmText ? presentPagedetails.confirmText : "na",
            'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
            'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
            'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
            'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
            'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
            'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
            'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
            'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
            'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
            'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
            'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
            'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
            // 'tab':ctEvent.tabName,  
        })
        clevertapservice.sendCleverTapEvent('subscription page clicked', {
            'action': detailsText ? detailsText.toLowerCase() : "close",
            'tab': ctEvent && ctEvent.currentTabName,
            'source': "top banner",
            'page name': 'postpaid confirmation'
        })
        if (presentPagedetails && presentPagedetails.confirmText) {
            detailsText = presentPagedetails.confirmText
        }
        Main.bannerAddPostPaidBillClick(detailsText)
    }
    else if (target == 'addToBill') {

        // var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // clevertapservice.sendCleverTapEvent('signout completed',{
        //     'mobile number':userDetails.phoneNumber
        // })
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
            var sourceDetailsPop = ctEvent.topBanner
        }
        else {
            var sourceDetailsPop = ctEvent.carouselName
        }
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'postpaid confirmation',
            'popup name': 'postpaid confirmation',
            'button label': presentPagedetails && presentPagedetails.confirmText ? presentPagedetails.confirmText : "na",
            'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
            'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
            'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
            'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
            'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
            'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
            'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
            'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
            'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
            'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
            'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
            'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
            // 'tab':ctEvent.tabName,  
        })
        if (presentPagedetails && presentPagedetails.confirmText) {
            detailsText = presentPagedetails.confirmText
        }
        Main.addPostPaidBillClick(detailsText)
    }
    else if (target == 'adultPopup') {

        // var userDetails = JSON.parse(localStorage.getItem('userDetails'));
        // clevertapservice.sendCleverTapEvent('signout completed',{
        //     'mobile number':userDetails.phoneNumber
        // })
        var id = Yup('.popupFocus').attr("id");
        var detailsText = Yup('#' + id).text();
        clevertapservice.sendCleverTapEvent('popup', {
            'action': 'button clicked',
            'label': 'explicit content',
            'popup name': 'adult content warning',
            'button label': detailsText ? detailsText : "na",
            'source': postPaidPopContentData && postPaidPopContentData.searchSource == "search" ? "search" : "carousel",
            'source details': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
            'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
            'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
            'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
            'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
            'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
            'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
            'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
            'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
            'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
            'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
        })

        var currentUserDetails = JSON.parse(localStorage.getItem("currentUserDetails"));
        var popupClickedUsers = JSON.parse(localStorage.getItem("popupClickedUsers") || "{}");

        if (currentUserDetails && currentUserDetails.profileId) {
            var profileId = currentUserDetails.profileId;

            // Check if this profileId already clicked the popup
            if (!popupClickedUsers[profileId]) {
                // Mark profileId as clicked
                popupClickedUsers[profileId] = true;

                // Save updated object to localStorage
                localStorage.setItem("popupClickedUsers", JSON.stringify(popupClickedUsers));
            }
        }
        clicked = true;
        Main.getStream(presentPagedetails.res, presentPagedetails.responseArray, "", "", clicked);

    }
    else if (target == 'goto_signin_from_password_reset') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        backData.pop();
        Main.previousPage();
    } else if (target == 'resume') {
        if (presentPagedetails.view == 'player') {
            analytics.plugin.handlePlayEndedByUser();
            try {
                media.pause();
                media.stop();
                media.unsetListener();
            }
            catch (e) { }
        }
        Yup("#popUpFDFS").html('');
        view = 'player';
        Main.addBackData(Main.popupData.responseArray.targetPath, Main.popupData.result);
        presentPagedetails = Main.popupData.responseArray;
        presentPagedetails.isResume = true;
        Main.popupData = {};
        ShakaPlayer.callingPlayer();
    }
    else if (target == 'startOver') {
        if (presentPagedetails.view == 'player') {
            analytics.plugin.handlePlayEndedByUser();
            try {
                media.pause();
                media.stop();
                media.unsetListener();
            }
            catch (e) { }
        }
        Yup("#popUpFDFS").html('');
        view = 'player';
        Main.addBackData(Main.popupData.responseArray.targetPath, Main.popupData.result);
        presentPagedetails = Main.popupData.responseArray;
        presentPagedetails.isResume = false;
        Main.popupData = {};
        ShakaPlayer.callingPlayer();
    }
    else if (target == 'navigateBack' || target == 'GoBack') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.previousPage();
    }
    else if (target == 'navigateBackFromPlayer') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        distroPlayingMacro = false
        skipIntroOnn = false;
        clickedSkipIntro = false
        analytics.plugin.handlePlayEndedByUser();
        ShakaPlayer.stopInterval();
        Main.playerScreenSessionEnd();
        Main.myRecoApi(myReco);
        ShakaPlayer.kill();
        Main.previousPage();
        // Check if a style element with a specific ID exists
        var existingStyle = document.getElementById('subtitle-style');
        // If it exists, remove it
        if (existingStyle) {
            existingStyle.remove();
        }
    } else if (target == 'gotosignin') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        view = 'signin';
        Main.processNext();
    }
    else if (target == 'gotoMobileVerification') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.verifyOtpGenral();
    }
    else if (target == 'tryAgainConfig') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.getConfig();
    } else if (target == 'tryAgainSession') {
        Yup("#popUpFDFS").html('');
        Main.popupData = {};
        Main.getSessionAPI(Main.popupData.callbackData, Main.popupData.callback);
    }
}

keyHandlar.activeScreensKeyHandular = function (e) {
    var keycode = (window.event) ? e.keyCode : e.which;
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (splitData[0] == 'close_screen_btn' && Yup('#close_screen_btn-' + (parseInt(splitData[1]) + 1)).length > 0) {
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#close_screen_btn-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
            }
            if ((parseInt(splitData[1]) + 1) > 9 && (parseInt(splitData[1]) + 1) <= presentPagedetails.Activescreens.length - 1) {
                Yup('#list-' + (parseInt(splitData[1]))).css('display', 'none');
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (splitData[0] == 'close_screen_btn' && Yup('#close_screen_btn-' + (parseInt(splitData[1]) - 1)).length > 0) {
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#close_screen_btn-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
            }
            if ((parseInt(splitData[1]) + 1) > 9) {
                Yup("#list-" + (parseInt(splitData[1]) - 1)).css('display', 'block');

            }
            break;
        }
        case tvKeyCode.Enter: {
            var splitData = id.split('-');
            if (splitData[0] == 'close_screen_btn') {
                Main.ActivescreenSessionEnd(id);
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (Main.popupData && Object.keys(Main.popupData).length != 0) {
                Yup("#popUpFDFS").html('');
                Main.popupData = {};
            }
            else {
                Main.previousPage();
            }
        }
        case 461: {
            if (Main.popupData && Object.keys(Main.popupData).length != 0) {
                Yup("#popUpFDFS").html('');
                Main.popupData = {};
            }
            else {
                Main.previousPage();
            }
        }
        default: {
            break;
        }
    }
}

//countryCode keyHandular
keyHandlar.countryCodeKyeHandular = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.imageFocus').attr("id");
    var index = parseInt(Yup('.imageFocus').attr("index"));
    switch (keycode) {
        case tvKeyCode.ArrowDown: {
            if ((index + 1) < countryList.length) {
                if ((index) > 4) {
                    Yup('#country-' + (index - 5)).hide();
                }
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#country-' + (index + 1)).addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (index != 0) {
                if (index > 5) {
                    Yup("#country-" + (index - 6)).show();
                }
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#country-' + (index - 1)).addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.countryCodeEnterHandular(id);
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            Main.previousPage();
            break;
        }
        case 461: {
            Main.previousPage();
            break;
        }
        default: {
            break;
        }
    }
}

keyHandlar.countryCodeEnterHandular = function (id) {
    var index = parseInt(Yup('#' + id).attr("index"));
    if (index >= 0) {
        Main.countryCode = countryList[index].isdCode;
        Main.countryFlag = countryList[index].iconUrl;
        Main.mobileCode = countryList[index].isdCode;
        utilities.setLocalStorage('countryCode', Main.countryCode);
        Main.previousPage();
    }

}

keyHandlar.accountKeydown = function (e) {
    var keycode = (window.event) ? e.keyCode : e.which;
    var source = Yup('.imageFocus').attr("source");
    var popsource = Yup('.popupFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    var popupid = Yup('.popupFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var splitData = id.split('-');
            if (popsource == "sign_out_btn") {

            }
            else if (source == "headTab") {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup('.menu-item.menu-active').addClass('imageFocus');
                Main.sidebarOpen();
            } else if (source == 'accountSignin') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup('.menu-item.menu-active').addClass('imageFocus');
                Main.sidebarOpen();
            }
            else if (source == "SettingsprofilePage") {
                if (splitData[1] == 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup(".toptab.active").addClass("imageFocus");
                }
                else if (Yup('#profile-' + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#profile-' + (parseInt(splitData[1]) - 1)).addClass('imageFocus');
                }
            }
            else if (source == "menus") {
                keyHandlar.menuKeyHandular(id, e);
            }
            else if (source == "videoqualitySel") {
                var splitData = id.split('-');
                // if(parseInt(splitData[1]) == 0){
                //     Yup('.imageFocus').removeClass("imageFocus");
                //     Yup('#radiobtn-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                // }
                //  if(Yup('#radiobtn-' + (parseInt(splitData[1]) - 1)).length > 0){
                Yup('.imageFocus').removeClass("imageFocus");
                // Yup('#account-1-0').addClass("imageFocus");
                Yup(".toptab.active").addClass("imageFocus");
                // }
            }
            else if (source == "apply_buttons") {
                var splitData = id.split('-');
                if (id == 'lang-update') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#lang-cancel').addClass("imageFocus");
                }
                else if (id == 'lang-cancel') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    // Yup('#account-2-0').addClass("imageFocus");
                    Yup(".toptab.active").addClass("imageFocus");
                }
            }
            else if (source == "deviceDetails") {
                Yup(".imageFocus").removeClass("imageFocus");
                // Yup('#account-5-0').addClass("imageFocus");
                Yup(".toptab.active").addClass("imageFocus");
            }
            else {
                var previousTabId = Yup(".toptab.active").attr('id');
                var splitDataLocal = previousTabId.split('-')
                // if (splitDataLocal[1] == "0") { // accountDetails
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup("#account-0-0").addClass("imageFocus");
                // }
                if (splitDataLocal[1] == "3") {  //languages
                    if ((id != 'lang-update' && id != 'lang-select') && id != 'lang-cancel') {

                        if ((parseInt(splitData[2])) % 3 === 0) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            // Yup("#account-2-0").addClass("imageFocus");
                            Yup(".toptab.active").addClass("imageFocus");
                        }
                        else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                        }
                    } else {
                        var visibleContainer = [];
                        Yup('.langlist_row').each(function () {
                            var rowContainer = Yup(this);
                            var allDivsVisible = true;
                            rowContainer.find('.toptab.langItem').each(function () {
                                var style = window.getComputedStyle(this);
                                if (style.getPropertyValue('display') === 'none') {
                                    allDivsVisible = false;
                                    return false;
                                }
                            });
                            if (allDivsVisible) {
                                visibleContainer.push(rowContainer);
                            }
                        });
                        if (visibleContainer.length > 0) {
                            var firstVisibleRow = visibleContainer[0];
                            var secondVisibleRow = visibleContainer[1];
                            var thirdVisibleRow = visibleContainer[2];
                        }
                        if (id == 'lang-update') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = firstVisibleRow.find(".toptab.langItem:last");
                            lastVisibleDiv.addClass("imageFocus");
                        }
                        else if (id == 'lang-select') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = secondVisibleRow.find(".toptab.langItem:last");
                            lastVisibleDiv.addClass("imageFocus");
                        }
                        else if (id == 'lang-cancel') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = thirdVisibleRow.find(".toptab.langItem:last");
                            lastVisibleDiv.addClass("imageFocus");
                        }
                    }
                }
                else if (splitDataLocal[1] == "3") { // filters
                    if ((id != 'filter_apply' && id != 'filter_select') && id != 'filter_clear') {
                        if ((parseInt(splitData[2])) % 4 == 0) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#account-6-0").addClass("imageFocus");
                        } else {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                        }
                    }
                    else if (source == 'apply') {
                        var visibleContainer = [];
                        Yup('.row_container').each(function () {
                            var rowContainer = Yup(this);
                            var allDivsVisible = true;
                            rowContainer.find('.image_box').each(function () {
                                var style = window.getComputedStyle(this);
                                if (style.getPropertyValue('display') === 'none') {
                                    allDivsVisible = false;
                                    return false;
                                }
                            });
                            if (allDivsVisible) {
                                visibleContainer.push(rowContainer);
                            }
                        });
                        if (visibleContainer.length > 0) {
                            var firstVisibleRow = visibleContainer[0];
                            var secondVisibleRow = visibleContainer[1];
                            var thirdVisibleRow = visibleContainer[2];
                        }
                        if (id == 'filter_apply') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = firstVisibleRow.find(".image_box:last");
                            lastVisibleDiv.addClass("imageFocus");
                        }
                        else if (id == 'filter_select') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = secondVisibleRow.find(".image_box:last");
                            lastVisibleDiv.addClass("imageFocus");
                        }
                        else if (id == 'filter_clear') {
                            Yup(".imageFocus").removeClass("imageFocus");
                            var lastVisibleDiv = thirdVisibleRow.find(".image_box:last");
                            lastVisibleDiv.addClass("imageFocus");

                        }
                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            if (popsource == "sign_out_btn") {

            }
            else if (source == "headTab") {
                var idlocal = Yup(".toptab.active").attr("id");
                var splitDataLocal = idlocal.split('-');
                if (Yup(".toptab.active").attr('subType') == "Video_Quality") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#radiobtn-0").addClass("imageFocus");
                }
                else if (Yup(".toptab.active").attr('subType') == "Switch_Profiles" && presentPagedetails.section.response.length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#profile-0").addClass("imageFocus");
                }
                else if (Yup(".toptab.active").attr('subType') == "Device_details") {
                    if (presentPagedetails.activeSessions.deviceList.length > 1) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#device_Details-1").addClass("imageFocus");
                    }
                    else {

                    }
                }
                if (Yup(".toptab.active").attr('subType') == "language_filters" && systemConfigs.contentLanguages.length > 0) { //lang selection
                    Yup(".imageFocus").removeClass("imageFocus");
                    for (var i = 0; i <= 17; i++) {
                        if (Yup("#accountContent-1-" + i).css('display') === "block") {
                            Yup("#accountContent-1-" + i).addClass("imageFocus");
                            break;
                        }
                    }
                }


            }
            else if (source == "langSelection") {
                var count = systemConfigs.contentLanguages.length - 1;

                if ((parseInt(splitData[2]) + 1) % 3 == 0) {

                    if (parseInt(splitData[2]) === 2) {
                        // Yup(".imageFocus").removeClass("imageFocus");
                        // Yup("#lang-update").addClass("imageFocus");

                    }
                    else {
                        // if (Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
                        //     Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 3)).css('display') == "block" &&
                        //     Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 6)).css('display') == "block"
                        // ) {
                        // Yup("#lang-cancel").addClass("imageFocus");
                    }
                    //             else if (Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
                    //                 Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 3)).css('display') == "none") {
                    //                 Yup("#lang-update").addClass("imageFocus");
                    // }
                    //             else if (Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
                    //                 Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 3)).css('display') == "block") {
                    //     Yup("#lang-select").addClass("imageFocus");
                    //     }
                    //         }
                }
                // else if (parseInt(splitData[2]) == count) {
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup("#lang-cancel").addClass("imageFocus");
                // }
                else if (Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                }
            }
            else if (source == "apply_buttons") {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#lang-update").addClass("imageFocus");
            }
            else if (source == "SettingsprofilePage") {
                if (Yup('#profile-' + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup('#profile-' + (parseInt(splitData[1]) + 1)).addClass('imageFocus');
                }
            }

            // else if (source == "filters") {
            //     var count = systemConfigs.networks.length - 1;
            //     if ((parseInt(splitData[2]) + 1) % 4 == 0) {
            //         Yup(".imageFocus").removeClass("imageFocus");

            //         if (parseInt(splitData[2]) === 3) {
            //             Yup("#filter_apply").addClass("imageFocus");
            //         }
            //         else {
            //             if (Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
            //                 Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 4)).css('display') == "block" &&
            //                 Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 8)).css('display') == "block"
            //             ) {
            //                 Yup("#filter_clear").addClass("imageFocus");
            //             }
            //             else if (Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
            //                 Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 4)).css('display') == "none") {
            //                 Yup("#filter_apply").addClass("imageFocus");
            //             }
            //             else if (Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]))).css('display') == "block" &&
            //                 Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 4)).css('display') == "block") {
            //                 Yup("#filter_select").addClass("imageFocus");

            //             }
            //         }
            //     }
            //     else if(parseInt(splitData[2]) === count){
            //         Yup(".imageFocus").removeClass("imageFocus");
            //         Yup("#filter_clear").addClass("imageFocus");
            //     }
            //     else {
            //         Yup(".imageFocus").removeClass("imageFocus");
            //         Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
            //     }
            // }
            if (source == "menus") {
                keyHandlar.menuKeyHandular(id, e);
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            var activeTabId = Yup('.toptab.active').attr('id');
            if (popsource == "sign_out_btn") {
                if (popupid == "sign_out_btn-1") {
                    Yup('.popupFocus').removeClass("popupFocus");
                    Yup("#sign_out_btn-0").addClass("popupFocus");
                }
            }
            else if (source == "headTab") {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#account-' + (parseInt(splitData[1]) - 1) + '-0').addClass("imageFocus");
                }
                // else{ //if it is firt menu
                //     keyHandlar.menuKeyHandular(id,e);
                // }
            }
            else if (source == "accountContent") {
                var splitData = id.split('-');
                if (activeTabId == 'account-0-0') {  // active pacakges tab
                    if (parseInt(splitData[2]) > 0) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#accountContent-0-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                        keyHandlar.addSectionKeyIndex(0, parseInt(splitData[2]) - 1);
                        if (parseInt(splitData[2]) >= 2) {
                            Yup("#accountContent-0-" + (parseInt(splitData[2]) - 2)).show();
                        }
                    }
                }

            }
            if (source == "menus") {
                keyHandlar.menuKeyHandular(id, e);
            }
            else if (source == "langSelection") {
                var count = systemConfigs.contentLanguages.length - 1;
                if ((id != 'lang-update' && id != 'lang-select') && id != 'lang-cancel') {
                    var splitData = id.split('-');
                    if (parseInt(splitData[2]) - 3 >= 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) - 3)).addClass("imageFocus");
                    }
                    if (parseInt(splitData[2]) > 2) {
                        for (var u = 0; u < 3; u++) {
                            Yup("#accountContent-" + splitData[1] + '-' + ((Math.floor(parseInt(splitData[2]) / 3) * 3) - 3 + u)).show();
                        }
                    }
                }
            }
            else if (source == "videoqualitySel") {
                var splitData = id.split('-');
                // if(parseInt(splitData[1]) == 0){
                //     Yup('.imageFocus').removeClass("imageFocus");
                //     Yup('#radiobtn-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                // }
                if (Yup('#radiobtn-' + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#radiobtn-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                }
            }
            else if (source == "apply_buttons") {
                var splitData = id.split('-');
                if (presentPagedetails.previousLanguage != undefined && presentPagedetails.previousLanguage != null) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#" + presentPagedetails.previousLanguage).addClass('imageFocus');
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#accountContent-1" + '-' + (systemConfigs.contentLanguages.length - 1)).addClass('imageFocus');
                }
            }
            else if (id == 'lang-cancel') {
                Yup(".imageFocus").removeClass("imageFocus");
                //   Yup("#lang-select").addClass("imageFocus");
                Yup("#" + presentPagedetails.previousLanguage).addClass('imageFocus');
            }
            else if (id == 'lang-select') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#lang-update").addClass("imageFocus");
            }
            else if (source == "filters") {
                var count = presentPagedetails.length - 1;
                var splitData = id.split('-');
                if (parseInt(splitData[2]) - 4 >= 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) - 4)).addClass("imageFocus");
                }
                if (Math.floor(parseInt(splitData[2])) > 3) {
                    for (var u = 0; u < 4; u++) {
                        Yup("#filter-" + splitData[1] + '-' + ((Math.floor(parseInt(splitData[2]) / 4) * 4) - 4 + u)).show();
                    }
                }
            }
            else if (source == "apply") {
                if (id == 'filter_select') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter_apply").addClass("imageFocus");
                }
                else if (id == 'filter_clear') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter_select").addClass("imageFocus");
                }
            }
            else if (source == "deviceDetails") {
                var splitData = id.split('-');
                if (Yup('#device_Details-' + (parseInt(splitData[1]) - 1)).length > 0 && (parseInt(splitData[1]) - 1) != 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#device_Details-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");

                    var focusIndex = parseInt(splitData[1]) - 1;
                    var itemHeight = (Yup('#device_Details-1').outerHeight() || (keyHandlar.isHD ? 104 : 136)) + (keyHandlar.isHD ? 10 : 16);
                    var currentMargin = parseInt(Yup('#deviceListScrollInner').css('margin-top')) || 0;
                    var topVisible = currentMargin === 0 ? 1 : Math.round(Math.abs(currentMargin) / itemHeight) + 1;

                    if (focusIndex < topVisible) {
                        topVisible = focusIndex;
                        var newMargin = topVisible === 1 ? 0 : -((topVisible - 1) * itemHeight);
                        Yup('#deviceListScrollInner').css('margin-top', newMargin + 'px');
                    }
                }
            }

            break;
        }
        case tvKeyCode.ArrowDown: {
            var activeTabId = Yup('.toptab.active').attr('id');
            if (source == "menus") {
                keyHandlar.menuKeyHandular(id, e);
            }
            else if (popsource == "sign_out_btn") {
                if (popupid == "sign_out_btn-0") {
                    Yup('.popupFocus').removeClass("popupFocus");
                    Yup("#sign_out_btn-1").addClass("popupFocus");
                }
            }
            else if (source == "headTab") {
                var splitData = id.split('-');
                if (Yup('#account-' + (parseInt(splitData[1]) + 1) + '-0').length > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#account-' + (parseInt(splitData[1]) + 1) + '-0').addClass("imageFocus");
                }
            }
            else if (source == "accountContent") {
                var count = parseInt(Yup(".imageFocus").attr("count"));
                var splitData = id.split('-');
                if (activeTabId == 'account-0-0') {  // active pacakges tab
                    if (parseInt(splitData[2]) < (presentPagedetails.settingsActivepackages.length - 1)) {
                        Yup('.imageFocus').removeClass("imageFocus");
                        Yup('#accountContent-0-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                        keyHandlar.addSectionKeyIndex(0, parseInt(splitData[2]) + 1);
                        if (parseInt(splitData[2]) >= 2) {
                            Yup("#accountContent-0-" + (parseInt(splitData[2]) - 2)).hide();
                        }
                    }
                }

            }
            else if (source == "videoqualitySel") {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#radiobtn-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
                else if (Yup('#radiobtn-' + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#radiobtn-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
            }
            // else if(source == "langSelection"){
            //     if((id != 'lang-update' && id !='lang-select') && id !='lang-cancel'){
            //         var splitData = id.split('-');
            //         var count = systemConfigs.contentLanguages.length -1 ;
            //         if(parseInt(splitData[2]) + 3 <= count ){
            //             Yup(".imageFocus").removeClass("imageFocus");
            //             Yup("#accountContent-"+splitData[1] +'-'+(parseInt(splitData[2]) + 3) ).addClass("imageFocus");

            //         }
            //         else {
            //             if (parseInt(splitData[2]) + 2 == count) {
            //                 Yup(".imageFocus").removeClass("imageFocus");
            //                 Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 2)).addClass("imageFocus");
            //             }
            //             else if (parseInt(splitData[2]) + 1 == count) {
            //                 Yup(".imageFocus").removeClass("imageFocus");
            //                 Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");

            //             }
            //         }
            // var localId = Yup('.imageFocus').attr("id");
            // var sDataLang = localId.split('-');
            // if (parseInt(sDataLang[2]) > 14) {
            //     for (var u = 0; u < 3; u++) {
            //         Yup("#accountContent-" + sDataLang[1] + '-' + ((Math.floor(parseInt(sDataLang[2]) / 3) * 3) - 15 + u)).hide();
            //     }
            // }
            //     }
            // }
            //         else if(id =='lang-update'){
            //             Yup(".imageFocus").removeClass("imageFocus");
            //             Yup("#lang-select").addClass("imageFocus");
            //             }
            //         else if(id == 'lang-select'){
            //                 Yup(".imageFocus").removeClass("imageFocus");
            //                 Yup("#lang-cancel").addClass("imageFocus");
            //             }
            else if (source == "langSelection") {
                var splitData = id.split('-');
                var count = systemConfigs.contentLanguages.length - 1;
                if (parseInt(splitData[2]) + 3 <= count) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 3)).addClass("imageFocus");
                    keyHandlar.addPreviousLanguage(id)
                }
                else if (Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 3)).length == 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#lang-cancel").addClass("imageFocus");
                    keyHandlar.addPreviousLanguage(id)
                }
                else if ((parseInt(splitData[2]) - count) == "-2") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 2)).addClass("imageFocus");
                    keyHandlar.addPreviousLanguage(id)
                }
                else if ((parseInt(splitData[2]) + 1) == count) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#lang-cancel").addClass("imageFocus");
                    keyHandlar.addPreviousLanguage(id)
                }
                else if ((parseInt(splitData[2]) - count) == "-1") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#accountContent-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    keyHandlar.addPreviousLanguage(id)
                }
                else {
                    var colIndex = parseInt(splitData[2]);
                    while (colIndex >= 0) {
                        if (Yup('#accountContent-' + (parseInt(splitData[1])) + '-' + colIndex).length) {
                            // Yup('#dashbord-' +(parseInt(splIds[1]) - 1 )).css('display', 'none');
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('#accountContent-' + (parseInt(splitData[1])) + '-' + (colIndex)).addClass('imageFocus');
                            break;
                        }
                        colIndex = colIndex - 1;
                    }
                }
                var localId = Yup('.imageFocus').attr("id");
                var sDataLang = localId.split('-');
                // if (parseInt(sDataLang[2]) > 8) {
                //     for (var u = 0; u < 3; u++) {
                //         Yup("#accountContent-" + sDataLang[1] + '-' + ((Math.floor(parseInt(sDataLang[2]) / 3) * 3) - 9 + u)).hide();
                //     }
                // }
            }
            if (id == 'lang-select') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#lang-cancel").addClass("imageFocus");
            }
            else if (source == "filters") { //filters
                var splitData = id.split('-');
                var count = systemConfigs.networks.length - 1;
                if (parseInt(splitData[2]) + 4 <= count) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) + 4)).addClass("imageFocus");
                }
                else {
                    if (parseInt(splitData[2]) + 2 === count) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) + 2)).addClass("imageFocus");
                    }
                    else if (parseInt(splitData[2]) + 3 === count) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#filter-" + splitData[1] + '-' + (parseInt(splitData[2]) + 3)).addClass("imageFocus");
                    }
                }
                var localId = Yup('.imageFocus').attr("id");
                var sDataFilter = localId.split('-');
                if (parseInt(sDataFilter[2]) > 11) {
                    for (var u = 0; u < 4; u++) {
                        Yup("#filter-" + sDataFilter[1] + '-' + ((Math.floor(parseInt(sDataFilter[2]) / 4) * 4) - 12 + u)).hide();
                    }
                }
            }
            else if (source == "apply") {
                if (id == "filter_apply") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter_select").addClass("imageFocus");
                }
                else if (id == 'filter_select') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#filter_clear").addClass("imageFocus");

                }
            }
            else if (source == "deviceDetails") {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0 && presentPagedetails.activeSessions.deviceList.length > 1) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#device_Details-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
                else if (Yup('#device_Details-' + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#device_Details-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");

                    var focusIndex = parseInt(splitData[1]) + 1;
                    var itemHeight = (Yup('#device_Details-1').outerHeight() || (keyHandlar.isHD ? 104 : 136)) + (keyHandlar.isHD ? 10 : 16);
                    var containerHeight = Yup('#deviceListScrollContainer').height() || 700;
                    var itemsVisible = Math.floor(containerHeight / itemHeight);

                    var currentMargin = parseInt(Yup('#deviceListScrollInner').css('margin-top')) || 0;
                    var topVisible = currentMargin === 0 ? 1 : Math.round(Math.abs(currentMargin) / itemHeight) + 1;

                    if (focusIndex > topVisible + (itemsVisible - 1)) {
                        topVisible = focusIndex - (itemsVisible - 1);
                        var newMargin = topVisible === 1 ? 0 : -((topVisible - 1) * itemHeight);
                        Yup('#deviceListScrollInner').css('margin-top', newMargin + 'px');
                    }
                }
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.accountKeyEnter(id);
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (intiLangSel == false) {
                tempScroll = 0;
                window.scrollTo(0, 0);
                // Main.previousPage();
                if (popsource == "sign_out_btn") {
                    Yup("#popUpFDFS").html('');
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup("#account-6-0").addClass("imageFocus");
                }
                else {
                    if (isSidemenuOpened) {
                        Main.sidebarClose();
                        Yup(".imageFocus").removeClass("imageFocus");
                        Main.apiCall(firstMenu);
                    } else {
                        if (Yup('.top_profile.menu-active').length > 0) {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('.top_profile.menu-active').addClass('imageFocus');
                        } else {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('.side-menu-item').first().addClass('imageFocus');
                        }
                        Main.sidebarOpen();
                    }
                }
            }
            break;
        }
        case 461: {
            if (intiLangSel == false) {
                tempScroll = 0;
                window.scrollTo(0, 0);
                // Main.previousPage();
                if (popsource == "sign_out_btn") {
                    Yup("#popUpFDFS").html('');
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup("#account-6-0").addClass("imageFocus");
                }
                else {
                    if (isSidemenuOpened) {
                        Main.sidebarClose();
                        Yup(".imageFocus").removeClass("imageFocus");
                        Main.apiCall(firstMenu);
                    } else {
                        if (Yup('.side-menu-item.menu-active').length > 0) {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('.side-menu-item.menu-active').addClass('imageFocus');
                        } else {
                            Yup('.imageFocus').removeClass('imageFocus');
                            Yup('.side-menu-item').first().addClass('imageFocus');
                        }
                        Main.sidebarOpen();
                    }
                }
            }
            break;
        }
        default: {
            break;
        }
    }
}

keyHandlar.accountKeyEnter = function (id) {
    var source = Yup('#' + id).attr("source");
    var splitData = id.split('-');
    var popsource = Yup('.popupFocus').attr("source");
    var target = Yup('.popupFocus').attr("targetPath");
    var detailsText = Yup('#' + id).text();
    if (popsource == "sign_out_btn") {
        if (target == "signOut") {
            Yup("#popUpFDFS").html('');
            Main.popupData = {};
            Main.signout();
        }
        else {
            Yup("#popUpFDFS").html('');
            Yup('.imageFocus').removeClass("imageFocus");
            Yup("#account-6-0").addClass("imageFocus");
        }

    }
    else if (source == "headTab") {
        clevertapservice.sendCleverTapEvent('setting', {
            'category': detailsText ? detailsText : "",
        });
        var previousTabId = Yup(".toptab.active").attr('id');
        if (previousTabId != id) {
            Yup(".toptab.active").removeClass("active");
            Yup(".imageFocus").removeClass('imageFocus');
            Yup("#account-" + splitData[1] + '-' + splitData[2]).addClass("imageFocus");
            Yup("#account-" + splitData[1] + '-' + splitData[2]).addClass("active");
            if (Yup(".toptab.active").attr('subType') == 'accounts_details') { //account details
                presentPagedetails.sectionIndex = {};
                Yup('.account-page').html('');
                Yup(".account-page").html(Util.profileInfo());
                Main.accountQr();
            }
            if (Yup(".toptab.active").attr('subType') == 'Video_Quality') { // video quality
                Yup('.account-page').html('');
                Yup('.account-page').html(Util.GlobalvideoQuality());
                Yup(".imageFocus").removeClass('imageFocus');
                var GlobalQualitySelectedIndex = localStorage.getItem('GlobalQualitySelectedIndex')
                if (!!GlobalQualitySelectedIndex) {
                    Yup("#radiobtn-" + GlobalQualitySelectedIndex).addClass("imageFocus");
                }
                else {
                    Yup("#radiobtn-0").addClass("imageFocus");
                }
                // Main.offersPlans();
            }
            if (Yup(".toptab.active").attr('subType') == 'language_filters') {  // languages
                Yup('.account-page').html('');
                Yup('.account-page').html(Util.languagesListHTML());
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#lang-update").addClass("imageFocus");
            }
            if (Yup(".toptab.active").attr('subType') == 'Switch_Profiles') {// Profile Page
                // Yup('.account-page').html('');
                // Yup('.account-page').html(Util.settingProfilesPage());
                Main.getProfileApi()

            }
            if (Yup(".toptab.active").attr('subType') == 'terms_use') { // Terms & uses
                Yup('.account-page').html('');
                Yup('.account-page').html(Util.FaqDetails())
                var url = systemConfigs.configs.termsConditionsPageUrl
                // Yup('#faqQrcode').html("");
                Yup('#faqQrcode').html(Main.generateQrCode('faqQrcode', url));
                // Yup('.account-page').html(Util.languagesListHTML());

            }
            if (Yup(".toptab.active").attr('subType') == 'Device_details') { //manage devices
                // Yup('.account-page').html('');
                // Yup('.account-page').html(Util.aboutus());
                Main.getActiveProfiles(1, utilities.encryptData(Main.userProfile.mobile));
            }
            // case "3":{  // filters
            //     Yup('.account-page').html('');
            //     Yup('.account-page').html(Util.getFilters());
            //     break;
            // }
            // case "4":{  // About us
            //     Yup('.account-page').html('');
            //     Yup('.account-page').html(Util.aboutus());
            //     Main.aboutUs();
            //     break;
            // }

            // case "5":{  // Faq
            //     Yup('.account-page').html('');
            //     Yup('.account-page').html(Util.FaqDetails());
            //     Main.faqQr();
            //     break;
            // }
            // case "6":{  // grivance
            //     Yup('.account-page').html('');
            //     Yup('.account-page').html(Util.grivance());
            //     Main.grivanceQr();
            //     break;
            // }
            // case "7":{  // Device details
            //     Yup('.account-page').html('');
            //     Yup('.account-page').html(Util.DeviceDetails());
            //     break;
            // }
            if (Yup(".toptab.active").attr('subType') == 'signout') { //signout
                utilities.signOutPopupDetails();
            }
        }
        else {
            //video quality
            if (Yup(".toptab.active").attr('subType') == 'Video_Quality') {
                var GlobalQualitySelectedIndex = localStorage.getItem('GlobalQualitySelectedIndex')
                if (!!GlobalQualitySelectedIndex) {
                    Yup(".imageFocus").removeClass('imageFocus');
                    Yup("#radiobtn-" + GlobalQualitySelectedIndex).addClass("imageFocus");
                }
                else {
                    Yup(".imageFocus").removeClass('imageFocus');
                    Yup("#radiobtn-0").addClass("imageFocus");
                }
            }
            //language filters
            if (Yup(".toptab.active").attr('subType') == 'language_filters') {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#lang-update").addClass("imageFocus");
            }

            //manage profiles
            if (Yup(".toptab.active").attr('subType') == 'Switch_Profiles') {
                try {
                    var currentUserDetails = localStorage.getItem('currentUserDetails');
                    if (currentUserDetails) {
                        if (typeof currentUserDetails === 'string') {
                            currentUserDetails = JSON.parse(currentUserDetails);
                        } else {
                            currentUserDetails = userDetailsString;
                        }
                    }
                } catch (error) {
                    console.error("Error parsing currentUserDetails from localStorage:", error);
                }
                if (presentPagedetails.section.response.length > 0 && !!currentUserDetails) {
                    for (var i = 0; i < presentPagedetails.section.response.length; i++) {
                        var profilesData = presentPagedetails.section.response[i]
                        if (profilesData.profileId == currentUserDetails.profileId) {
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#profile-" + i).addClass('imageFocus');
                        }
                    }
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#profile-0").addClass('imageFocus');
                }
            }
            //manage devices
            if (Yup(".toptab.active").attr('subType') == 'Device_details') {
                if (presentPagedetails.activeSessions.deviceList.length > 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#device_Details-1").addClass("imageFocus");
                }
            }
            //signout
            if (Yup(".toptab.active").attr('subType') == 'signout') {
                utilities.signOutPopupDetails();
            }
        }
    }
    else if (source == 'accountSignin') {
        view = "signin";
        Main.processNext();
    }
    else if (source == 'deviceDetails') {
        var splitData = id.split('-');
        // Main.removeActiveSessions(splitData[1])
        Main.popupData = {
            popuptype: "deviceRemovee",
            message: 'You will not be able to watch ViMTV on the selected device. Do you want to proceed? ',
            buttonCount: 2,
            noTarget: 'close',
            noText: 'Cancel',
            yesText: 'Log Out',
            yesTarget: 'deviceRemovee',
            onBack: 'close',
            id: splitData[1]
        }
        Yup("#popUpFDFS").html(Util.signoutComformation());
        Yup("#popup-btn-1").addClass('popupFocus');
        //clevertap profile view appered event
        profilesPageAppeared.profilesPagePageName = 'manage device logout confirmation'
        clevertapservice.profilePageEvent();
        profilesPageAppeared.profilesPagePageName = "manage your devices"
        profilesPageAppeared.action = 'remove';
        clevertapservice.profileClickedEvent();

    }
    else if (source == "SettingsprofilePage") {
        keyHandlar.switchProfileEnter(id, source);
    }
    else if (source == "accountContent") {
        var elementType = Yup('#' + id).attr('type');
        if (elementType == 'changePassword') {
            view = "changePassword";
            Main.processNext();
        }
    }
    if (source == "langSelection" || source == "apply_buttons") {
        var idlocal = Yup(".toptab.active").attr("id");
        var splitDataLocal = idlocal.split('-');
        if (parseInt(splitDataLocal[1]) == 3) { //languages
            if (id == 'lang-update') {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("langItem selected");
                var finalData = [];

                if (objectData.length > 0) {
                    for (var i = 0; i < objectData.length; i++) {
                        finalData.push(objectData[i].attributes["value"].value);
                    }

                    if (finalData.length > 0) {
                        var languageList = finalData.join(',');
                        Main.updateLanguagePreference(languageList);
                        clevertapservice.sendCleverTapEvent('preferred language', {
                            'old languages': presentPagedetails.languageKeysArray,
                            'new languages': languageList,
                            'action': "Apply",
                            'source': "Button",
                            'tab': presentPagedetails.targetPath
                        });

                        intiLangSel = true;
                    } else {
                        utilities.genricPopup('Select at least one Language', 'info');
                    }
                } else {
                    utilities.genricPopup('Please select at least one language', 'info');
                }

            } else if (id == 'lang-cancel') { // clearing all selection
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("langItem selected");

                if (objectData) {
                    var localObjData = [];
                    for (var i = 0; i < objectData.length; i++) {
                        localObjData.push(objectData[i].id);
                    }
                    for (var i = 0; i < localObjData.length; i++) {
                        Yup("#" + localObjData[i]).attr("isSelected", "false");
                        Yup("#" + localObjData[i]).removeClass("selected");
                    }
                }
            }

            else if (id == 'lang-select') {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("langItem");

                if (objectData) {
                    var localObjData = [];
                    for (var i = 0; i < objectData.length; i++) {
                        localObjData.push(objectData[i].id);
                    }
                    for (var i = 0; i < localObjData.length; i++) {
                        Yup("#" + localObjData[i]).attr("isSelected", "true");
                        Yup("#" + localObjData[i]).addClass("selected");
                    }
                }
            }

            else {
                var objectData = document.getElementsByClassName("langItem selected");
                // if(!!systemConfigs.configs.maxLanguageCount){
                // if( objectData.length < systemConfigs.configs.maxLanguageCount){
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var isSelected = Yup("#" + id).attr("isSelected");
                if (isSelected == 'true') {
                    Yup("#" + id).attr("isSelected", "false");
                    Yup("#" + id).removeClass("selected");
                } else if (isSelected == 'false' && objectData.length < parseInt(systemConfigs.configs.languageMaxCount)) {
                    Yup("#" + id).attr("isSelected", "true");
                    Yup("#" + id).addClass("selected");
                }
                else {
                    if (systemConfigs.configs.languageSelectionText.match(/{.*?}/)) {
                        systemConfigs.configs.languageSelectionText = systemConfigs.configs.languageSelectionText.replace(/{.*?}/, parseInt(systemConfigs.configs.languageMaxCount));
                    }
                    Yup('.toastmsg_template').html(systemConfigs.configs.languageSelectionText)
                    Yup('.toastmsg_template').css('display', 'block');
                    setTimeout(function () {
                        Yup('.toastmsg_template').css('display', 'none');
                    }, 1000);
                }
            }
        }
    }
    else if (source == "videoqualitySel") {
        Yup(".imageFocus").removeClass('imageFocus');
        Yup("#" + id).addClass('imageFocus');
        Yup(".label_btn").removeClass("selected");
        // Yup(".label_btn").addClass("selected");
        Yup("#" + id + " .label_btn").addClass('selected');
        // Yup("#" + id + " input[type='label']").siblings('.label_btn ').addClass('selected');
        var maxBitrateSelected = Yup("#" + id).attr("data-maxBitRate");
        var minBitrateSelected = Yup("#" + id).attr("data-minBitRate");
        var QualitySelectedName = Yup("#" + id).text();
        var GlobalQualitySelectedIndex = id.split('-')
        GlobalQualitySelectedIndex = GlobalQualitySelectedIndex[1]
        localStorage.setItem('GlobalQualitySelectedIndex', GlobalQualitySelectedIndex);
        localStorage.setItem('MinQualitySelected', minBitrateSelected);
        localStorage.setItem('MaxQualitySelected', maxBitrateSelected);
        localStorage.setItem("QualitySelectedName", QualitySelectedName.trim());
        localStorage.removeItem("selectedvidIndex")
        Yup('.toastmsg_template').html('Video Quality Changed')
        Yup('.toastmsg_template').css('display', 'block');
        var previousBitrate = localStorage.getItem("oldQualitySelectedName");
        localStorage.setItem("oldQualitySelectedName", QualitySelectedName);
        clevertapservice.sendCleverTapEvent('video playback quality changed', {
            'new selection': QualitySelectedName,
            'old selection': previousBitrate ? previousBitrate : "",
            'source': ctEvent.tabName ? ctEvent.tabName : ""
        });
        setTimeout(function () {
            Yup('.toastmsg_template').css('display', 'none');
        }, 1000);
    }
    if (source == "filters" || source == "apply") {
        var idlocal = Yup(".toptab.active").attr("id");
        var splitDataLocal = idlocal.split('-');
        if (parseInt(splitDataLocal[1]) == 3) { //filters
            if (id == 'filter_apply') {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("image_box selected");
                var finalData = [];
                if (objectData) {
                    for (var i = 0; i < objectData.length; i++) {
                        finalData.push(objectData[i].attributes["value"].value);
                    }
                }
                if (finalData.length > 0) {
                    finalData = finalData.join(',');
                    Main.updateFilterPreference(finalData);
                    intiFilterSel = true;

                } else {
                    utilities.genricPopup('Select atleast one', 'info');
                }
            }
            else if (id == 'filter_clear') { // clearing all selection
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("image_box selected");

                if (objectData) {
                    var localObjData = [];
                    for (var i = 0; i < objectData.length; i++) {
                        localObjData.push(objectData[i].id);
                    }
                    for (var i = 0; i < localObjData.length; i++) {
                        Yup("#" + localObjData[i]).attr("isSelected", "false");
                        Yup("#" + localObjData[i]).removeClass("selected");
                    }
                }
            }
            else if (id == 'filter_select') {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var objectData = document.getElementsByClassName("image_box");

                if (objectData) {
                    var localObjData = [];
                    for (var i = 0; i < objectData.length; i++) {
                        localObjData.push(objectData[i].id);
                    }
                    for (var i = 0; i < localObjData.length; i++) {
                        Yup("#" + localObjData[i]).attr("isSelected", "true");
                        Yup("#" + localObjData[i]).addClass("selected");
                    }
                }
            }

            else {
                Yup(".imageFocus").removeClass('imageFocus');
                Yup("#" + id).addClass('imageFocus');
                var isSelected = Yup("#" + id).attr("isSelected");
                if (isSelected == 'true') {
                    Yup("#" + id).attr("isSelected", "false");
                    Yup("#" + id).removeClass("selected");
                } else {
                    Yup("#" + id).attr("isSelected", "true");
                    Yup("#" + id).addClass("selected");
                }
            }
        }
    }

    else if (source == "menus" || source == "search") {
        keyHandlar.menuKeyEnterHandular(id);
    }
}
// function updateSubtitlePosition(newBottom) {
//     // Check if a style element with a specific ID exists
//     var existingStyle = document.getElementById('subtitle-style');
//     // If it exists, remove it
//     if (existingStyle) {
//         existingStyle.remove();
//     }
//     var subtitleStyle = document.createElement('style');
//     subtitleStyle.type = 'text/css';
//     subtitleStyle.id = 'subtitle-style';
//     subtitleStyle.innerHTML ='video::-webkit-media-text-track-container {' + 'bottom: ' + newBottom + ' !important;' +'position: absolute;' + '}';
//     document.head.appendChild(subtitleStyle);
// }
function updateSubtitlePosition(newBottom) {
    if (window.tizen) {
        var existingStyle = document.getElementById('subtitle-style');
        if (existingStyle) {
            existingStyle.remove();
        }

        var bottomVal = (typeof newBottom === 'number') ? (newBottom + 'px') : String(newBottom);

        if (Yup(window).width() == 1280) { fontsize = 24 } else { fontsize = 36 }
        var subtitleStyle = document.createElement('style');
        subtitleStyle.type = 'text/css';
        subtitleStyle.id = 'subtitle-style';
        subtitleStyle.textContent =
            'video::-webkit-media-text-track-container{' +
            'bottom:' + bottomVal + ' !important;' +
            'position:absolute !important;' +
            'font-size:' + fontsize + 'px !important;' +
            'background:none !important;' +
            '}' +
            'video::-webkit-media-text-track-background{' +
            'background:none !important;' +
            '}' +
            'video::cue{' +
            'background:transparent !important;' +   // removes black box
            'font-family:Gotham-bold;' +
            'text-shadow:0 0 5px rgba(0,0,0,0.9);' +
            '}';

        document.head.appendChild(subtitleStyle);
    }
    else if (window.webOS) {
        var existingStyle = document.getElementById('subtitle-style');
        if (existingStyle) {
            existingStyle.remove();
        }

        var subtitleStyle = document.createElement('style');
        subtitleStyle.type = 'text/css';
        subtitleStyle.id = 'subtitle-style';
        var fontsize;
        if (Yup(window).width() == 1280) { fontsize = 24 } else { fontsize = 36 }
        subtitleStyle.innerHTML = '\
            /* Subtitle text styling */\n\
            video::cue {\n\
                font-size: ' + fontsize + 'px;\n\
                color: white;\n\
                text-align: center;\n\
                background: none;\n\
                font-family: "Gotham-bold";\n\
                text-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n\
            }\n\
        \n\
            /* Subtitle container positioning (Samsung + LG incl. webOS24) */\n\
            video::-webkit-media-text-track-display {\n\
                top: ' + newBottom + ' !important;\n\
            }\n';

        document.head.appendChild(subtitleStyle);
    }
}

keyHandlar.playEnterKeydown = function (id, source) {
    if (controlSuggestionControls != undefined) {
        clearTimeout(controlSuggestionControls);
        controlSuggestionControls = undefined;
    }
    ShakaPlayer.clearControls();
    var type = Yup('#' + id).attr("type");
    var detailsText = Yup('#' + id).text();
    var videoPlayact = {
        'action': detailsText ? detailsText : "player controls",
        'content id': presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
        'content name': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
        'content type': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
        'content model': presentPagedetails.attributes.payType === "P" ? "svod" : (presentPagedetails.attributes.payType === "F" || presentPagedetails.attributes.payType === "L") ? "avod" : "",
        'content partner name': presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
        'content tag': presentPagedetails.attributes.payType === "P" ? "paid" : "free",
        'tv show name': presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",


    }
    // if (presentPagedetails.constrolsShow == true) {
    if (nextVideoPreview == false) {
        ShakaPlayer.showPlayerDetails();
    }
    if (presentPagedetails.isCaptionsEnable == true) {
        if (keyHandlar.isHD) {
            Yup(".captions_data").css('bottom', '132px')
        }
        else {
            Yup(".captions_data").css('bottom', '200px')
        }
    }
    //content enter and seek ener later.
    var source = Yup('#' + id).attr("source");
    // --- ADS: Enter behaviour while ad is playing ---
    // --- ADS: Enter behaviour while ad is playing ---
    if (typeof adsManager !== 'undefined' && adsManager && adsManager.isAdPlaying) {

        // 1) Skip button: skip whole pod
        if (source === 'ad-container') {   // skip-ad-button has source="ad-container"
            if (typeof adsManager.skipAdPod === 'function') {
                adsManager.skipAdPod();
            }
            return;
        }

        // 2) Back icon: treat as "exit ads and go back to previous page"
        if (source === 'ad-back') {
            try {
                if (typeof adsManager.skipAdPod === 'function') {
                    adsManager.skipAdPod();   // end pod and cleanup
                }
            } catch (e) {
                console.warn('Failed to skip ad pod from back', e);
            }

            // now reuse your normal back behaviour (btn-0)
            // simplest way: call the same branch by faking id/type
            id = 'btn-0';
            type = 'back';
            source = 'icon';  // so your existing btn-0 logic runs
            // DON'T return here; fall through to rest of function
        }

        // 3) Play/Pause icon: toggle ad play/pause + icons
        if (source === 'ad_player_icon') {
            toggleAdPlayPause();
            return;
        }

        // any other ad focus: ignore for now
        if (source && source.indexOf('ad_') === 0) {
            return;
        }
    }

    //for when click enter after controls off
    var againId = Yup('.imageFocus').attr("id");
    if (againId == "playerBtn" && source != "sections") {
        id = 'playerBtn'
        // var source = Yup('#' + id).attr("source");
    }
    if (source == 'playPauseIcon') {
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
        ShakaPlayer.playOrPause();
    }
    // else if(id == 'btn-2'){ // playing from start
    //     Main.playerShowLoading();
    // 	ShakaPlayer.playerState = 'buffering';
    // 	ShakaPlayer.HandleBufferingEvent();
    //     ShakaPlayer.videoElement.currentTime = 0;
    //     ShakaPlayer.play();
    //     Main.playerHideLoading();
    //     Yup('.captions_data').css('display', 'none');
    //     presentPagedetails.isCaptionsEnable = "false";
    // }
    else if (id == "btn-0" && type == "back") {
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
        Main.playerHideLoading();
        analytics.plugin.handlePlayEndedByUser();
        pauseTimer();
        console.log('Total Elapsed Time: ', timerSeconds, ' seconds');
        if (presentPagedetails.steamResponse.streams.length > 0) {
            distroPlayingMacro = false
            skipIntroOnn = false;
            clickedSkipIntro = false
            Main.myRecoApi(myReco);
            ShakaPlayer.kill();
            // Check if a style element with a specific ID exists
            var existingStyle = document.getElementById('subtitle-style');
            // If it exists, remove it
            if (existingStyle) {
                existingStyle.remove();
            }
        }
        Main.ctVideoStopFunction()
        // localStorage.removeItem("selectedvidIndex");
        if (backData.length > 0 && (presentPagedetails.navigationFrom == 'tvshowDetails' || presentPagedetails.navigationFrom == "seasonsDetails" || presentPagedetails.navigationFrom == "movieDetails")) {
            var pasha = []
            pasha = backData
            var playerToDetails = pasha[pasha.length - 1];
            for (var i = backData.length - 1; i >= 0; i--) {
                if (presentPagedetails.navigationFrom == 'tvshowDetails') {
                    if (backData[i].view === "tvshowDetails") {
                        backData.splice(i, 1);
                    }
                }
                else if (presentPagedetails.navigationFrom == 'seasonsDetails') {
                    if (backData[i].view === "seasonsDetails") {
                        backData.splice(i, 1);
                    }
                }
                else if (presentPagedetails.navigationFrom == 'movieDetails') {
                    if (backData[i].view === "movieDetails") {
                        backData.splice(i, 1);
                    }
                }
            }
            Main.apiCall(playerToDetails.targetPath)
        }
        else {
            var previousBackPage = []
            previousBackPage = backData
            if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && backData[0].view == "switchProfile") {
                Main.apiCall(firstMenu)
            }
            else if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && previousBackPage[previousBackPage.length - 1].view == "plansUpgrade") {
                var pasha = []
                pasha = backData
                var playerToDetails = pasha[pasha.length - 1];
                for (var i = backData.length - 1; i >= 0; i--) {
                    if (presentPagedetails.navigationFrom == 'plansUpgrade') {
                        if (backData[i].view === "plansUpgrade") {
                            backData.splice(i, 1);
                        }
                    }
                }
                Main.previousPage();
            }
            else {
                Main.previousPage();
            }
        }
        try {
            media.pause();
            media.stop();
            media.unsetListener();
        }
        catch (e) { }
    }
    else if (type == 'subtitles' && id != "playerBtn") {
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
        if (Yup('#video_quality').css('display') == 'block') {
            Yup('#video_quality').hide();
            Yup("#player_setting.default").css("display", "");
            Yup("#player_setting.focused").css("display", "");
        }
        if (Yup('#subtitles_main').css('display') == 'block') {
            Yup("#subtitles_main").hide();
            Yup("#Subtitlesbtn.default").css("display", "none");
            Yup("#Subtitlesbtn.focused").css("display", "block");
            return;
        }
        Yup('#subtitles_main').html(Util.playerSubtitles());
        Yup("#subtitles_main").show();
        // if(Yup("#player_setting.focused").css("display", "block") == true){
        //     Yup("#player_setting.default").css("display", ""); 
        //     Yup("#player_setting.focused").css("display", "");
        // } 
        Yup("#Subtitlesbtn.default").css("display", "none");
        Yup("#Subtitlesbtn.focused").css("display", "block");
        Yup("#player_setting.default").css("display", "");
        Yup("#player_setting.focused").css("display", "");
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        // var subtitle_select = localStorage.getItem("closed_caption");
        // if (presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' &&presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0) { 
        // if (presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' &&presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0) { 
        if ((presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' && presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0) || !cc && _shaka && _shaka.getTextTracks().length > 0) {

            var subtitle_select = localStorage.getItem('selectedLanguage')
            if (subtitle_select != null && subtitle_select != '') {
                if (subtitle_select.toLowerCase() == 'eng') {
                    subtitle_select = 'English'
                }
            }
            var subtitle_elements = document.querySelectorAll('.subtitle')
            for (var i = 0; i < subtitle_elements.length; i++) {
                var subId = subtitle_elements[i].id.split('-');
                var elementBitrateValue = Yup("#subtitles-" + (parseInt(subId[1]))).attr("bitrateValue")
                if (elementBitrateValue == subtitle_select) {
                    var selecedBitrate = i;
                    var bitrateCondition = true;
                    if (!subtitle_select) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#subtitles-0").addClass("imageFocus")
                    }
                    else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#subtitles-" + (parseInt(subId[1]))).addClass("imageFocus");

                    }
                    break;
                }
                else {
                    Yup(".imageFocus").removeClass("imageFocus")
                    Yup("#subtitles-0").addClass("imageFocus")
                }
            }
        }
        else {
            // var AudiossTracks = Object.values(presentPagedetails.AudioTracks);
            // var audioVal = localStorage.getItem("selectedAudio");

            // for (var i = 0; i < AudiossTracks.length; i++) {
            //     var audioTrack = AudiossTracks[i];

            //     if (audioVal) {
            //         if (audioVal == audioTrack.label) {
            //             Yup(".imageFocus").removeClass("imageFocus");
            //             Yup("#audio-" + i).addClass("imageFocus");
            //         }
            // } else {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#audio-0").addClass("imageFocus");
            //     }
            // }


        }
    }
    else if (source == 'nextVideo_preview') {
        videoPlayact.action = "next episode";
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
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
        analytics.plugin.handlePlayEndedByUser();
        ShakaPlayer.stopInterval();
        Main.playerScreenSessionEnd();
        Main.myRecoApi(myReco);
        ShakaPlayer.kill();
        nextVideoPreview = false;
        // Check if a style element with a specific ID exists
        var existingStyle = document.getElementById('subtitle-style');
        // If it exists, remove it
        if (existingStyle) {
            existingStyle.remove();
        }
        var comingFromPlayerSections = false;
        Main.getNextVideo(presentPagedetails.targetPath, "", comingFromPlayerSections)
        resetNextPreviewState();
        // Main.apiCall(presentPagedetails.nextVideoDetails[0].target.path);
    }
    else if (source == "watch_credits_preview") {
        // hide preview UI and restore player controls & focus
        Yup("#watch_credits-preview").hide();
        Yup("#next-preview").hide();

        // Show player details/controls and restore focus to a known control
        try {
            // prefer public API
            if (typeof ShakaPlayer.showControls === 'function') {
                ShakaPlayer.showControls();
            } else if (typeof ShakaPlayer.showPlayerDetails === 'function') {
                ShakaPlayer.showPlayerDetails();
            }
            presentPagedetails && (presentPagedetails.constrolsShow = true);
        } catch (e) {
            // fallback UI focus management
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#playerBtn").addClass("imageFocus");
        }

        // mark as dismissed until user seeks back before preview start
        nextVideoPreview = false;
        nextVideoPreviewDismissed = true;
        ShakaPlayer._isNextPreviewAnimating = false;
        // force focus to player button so remote keys work
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#playerBtn").addClass("imageFocus");
        videoPlayact.action = "watch credits";
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)

    }




    else if (source == 'skipintro') {
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
        Yup("#skipintro").hide();
        Yup(".imageFocus").removeClass("imageFocus");
        Yup('#playerBtn').addClass("imageFocus");
        if (Yup("#playerBtn").hasClass('player_pause')) {
            Yup('#playerBtn').addClass("player_play");
            Yup('#playerBtn').removeClass("player_pause");
        }
        skipIntroOff = false;
        skipIntroOnn = false;
        clickedSkipIntro = false;
        Main.playerShowLoading();
        ShakaPlayer.playerState = 'buffering';
        ShakaPlayer.HandleBufferingEvent();
        ShakaPlayer.videoElement.currentTime = presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.streamStatus && presentPagedetails.steamResponse.streamStatus.skipIntroDetails && presentPagedetails.steamResponse.streamStatus.skipIntroDetails.skipIntroEndTimeInMillis ? (presentPagedetails.steamResponse.streamStatus.skipIntroDetails.skipIntroEndTimeInMillis / 1000) : "";
        ShakaPlayer.videoElement.currentTime = ShakaPlayer.videoElement.currentTime + 10
        ShakaPlayer.play();
    }
    else if (source == "ad-container") {
        adsManager.skipAdPod();
    }
    else if (adsManager && adsManager.isAdPlaying == true) {
        if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
            //   if(isPlayerLoad == false){
            ShakaPlayer.playOrPause();
            //   }
        }
        ShakaPlayer.showPlayerDetails();
    }
    else if (source == "subtitles") {
        var splitId = id.split('-');
        var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
        var cc;
        cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
        if (id != 'subtitles-0') {
            localStorage.setItem("closed_caption", true);
            presentPagedetails.isCaptionsEnable = true;
            var textContent = document.querySelector('#subtitles-' + parseInt(splitId[1]) + ' label .text').textContent;
            if (!!cc) {
                if (textContent == "indonesian" || textContent == "Indonesian") {
                    textContent = "id"
                }
                ShakaPlayer.setTitles(textContent);
                // utilities.setCCinfo(presentPagedetails.steamResponse.streams[(parseInt(splitId[1]) - 1 )].closeCaptions.ccList[(parseInt(splitId[1]) - 1 )].language)
            } else {
                // if(textContent == "indonesian" || textContent == "Indonesian"){
                //     textContent = "id"
                //     function selectSubtitleByLangCode(langCode) {
                //         var tracks = _shaka.getTextTracks();

                //         var targetTrack = tracks.find(t => t.language.toLowerCase() === langCode.toLowerCase());

                //         if (targetTrack) {
                //             _shaka.selectTextTrack(targetTrack);
                //             _shaka.setTextTrackVisibility(true);
                //         } else {
                //             console.warn('Subtitle track not found for language code:', langCode);
                //         }
                //     }
                //     selectSubtitleByLangCode(textContent); 
                // }
                // if(textContent == "telugu" || textContent == "Telugu"){
                //     textContent = "te"
                //     function selectSubtitleByLangCode(langCode) {
                //         var tracks = _shaka.getTextTracks();

                //         var targetTrack = tracks.find(t => t.language.toLowerCase() === langCode.toLowerCase());

                //         if (targetTrack) {
                //             _shaka.selectTextTrack(targetTrack);
                //             _shaka.setTextTrackVisibility(true);
                //         } else {
                //             console.warn('Subtitle track not found for language code:', langCode);
                //         }
                //     }
                //     selectSubtitleByLangCode(textContent); 
                // }
                // else{
                //     _shaka.selectTextTrack(textContent);
                //     _shaka.setTextTrackVisibility(true);
                // }
                // textContent is the full language name coming from UI (e.g., "Hindi", "Telugu", "English")
                selectSubtitleByDisplayName(textContent);

                // Check if a style element with a specific ID exists
                // var existingStyle = document.getElementById('subtitle-style');
                // // If it exists, remove it
                // if (existingStyle) {
                //     existingStyle.remove();
                // }
                // var subtitleStyle = document.createElement('style');
                // subtitleStyle.type = 'text/css';
                // subtitleStyle.id = 'subtitle-style';
                // subtitleStyle.innerHTML = `video::-webkit-media-text-track-container {bottom: 160px !important; position: absolute;}`;
                // updateSubtitlePosition("160px");
                if (keyHandlar.isHD) {
                    if (window.tizen) {
                        updateSubtitlePosition("120px");
                    }
                    else if (window.webOS) {
                        updateSubtitlePosition('533px');
                    }

                }
                else {
                    if (window.tizen) {
                        updateSubtitlePosition('180px');
                    }
                    else if (window.webOS) {
                        updateSubtitlePosition('800px');
                    }

                }
            }
            // ShakaPlayer.setTitles()
            // utilities.setCCinfo(presentPagedetails.steamResponse.streams[(parseInt(splitId[1]) - 1 )].closeCaptions.ccList[(parseInt(splitId[1]) - 1 )].language)
            Yup('.captions_data').css('display', 'block');
            if (textContent == "id") {
                textContent = "Indonesian"
            }
            localStorage.setItem("selectedLanguage", textContent)
            Yup("#subtitles_main").hide();
            Yup("#Subtitlesbtn.default").css("display", "");
            Yup("#Subtitlesbtn.focused").css("display", "");
            Yup(".imageFocus").removeClass("imageFocus")
            Yup("#btn-1").addClass("imageFocus");
            clevertapservice.sendCleverTapEvent('subtitles on off', {
                'action': "on",
                'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
                'content type': presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : ""

            });
            if (presentPagedetails.isCaptionsEnable == true) {
                if (keyHandlar.isHD) {
                    Yup(".captions_data").css('bottom', '132px')
                }
                else {
                    Yup(".captions_data").css('bottom', '200px')
                }
            }
        }
        else {
            presentPagedetails.isCaptionsEnable = false;
            localStorage.setItem("closed_caption", false);
            utilities.setCCinfo("off");
            if (!!cc) {
                // ShakaPlayer.setTitles();
            } else {
                _shaka.setTextTrackVisibility(false);
            }
            localStorage.setItem("selectedLanguage", 'off')
            Yup('.captions_data').css('display', 'none');
            Yup(".subtitles_main").hide();
            Yup("#Subtitlesbtn.default").css("display", "");
            Yup("#Subtitlesbtn.focused").css("display", "");
            // if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
            //     Yup(".imageFocus").removeClass("imageFocus")    
            //     Yup("#seekbar-live").addClass("imageFocus");
            // } else {
            clevertapservice.sendCleverTapEvent('subtitles on off', {
                'action': "off",
                'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
                'content type': presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : ""

            });
            Yup(".imageFocus").removeClass("imageFocus")
            Yup("#btn-1").addClass("imageFocus");
            // }
        }
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
    }
    else if (source == 'audio') {
        var splitId = id.split('-');
        var oldLanguage = localStorage.getItem("selectedAudio")
        var AudioVal = Yup("#audio-" + (parseInt(splitId[1]))).text()
        ShakaPlayer.SelectAudioTrack(AudioVal)
        localStorage.setItem("selectedAudio", AudioVal)
        Yup("#subtitles_main").hide();
        Yup(".imageFocus").removeClass("imageFocus")
        Yup("#btn-1").addClass('imageFocus');
        Yup("#Subtitlesbtn.default").css("display", "");
        Yup("#Subtitlesbtn.focused").css("display", "");
        clevertapservice.sendCleverTapEvent('audio language changed', {
            'new language': AudioVal,
            'old language': oldLanguage,
            'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
            'content type': presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : ""
        })
    }

    else if (id == "btn-2" && type == "startover") { // playing from start
        if (Yup('.imageFocus').hasClass('player_play')) {
            Yup('.imageFocus').removeClass('player_play');
            Yup('.imageFocus').addClass('player_pause');
        }
        else {
            Yup('.imageFocus').removeClass('player_pause');
            Yup('.imageFocus').addClass('player_play');
        }
        ShakaPlayer.playOrPause();
        Yup("#captions").html('')
        // if(Yup('#video_quality').css('display') == 'block'){
        Yup("#video_quality").css('display', 'none');
        Yup("#player_setting.default").css("display", "");
        Yup("#player_setting.focused").css("display", "");
        // Yup("#playerBtn").addClass("imageFocus");               
        // }
        // if(Yup('#subtitles_main').css('display') == 'block'){
        Yup("#subtitles_main").hide();
        Yup("#Subtitlesbtn.default").css("display", "");
        Yup("#Subtitlesbtn.focused").css("display", "");
        // Yup("#playerBtn").addClass("imageFocus");
        // } 
        Main.playerShowLoading();
        ShakaPlayer.playerState = 'buffering';
        ShakaPlayer.HandleBufferingEvent();
        ShakaPlayer.videoElement.currentTime = 0;
        ShakaPlayer.play();
        Yup('.play_pause').addClass("player_play");
        Yup('.play_pause').removeClass('player_pause');
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)

    }
    // else if (id == "btn-1"  ) { // playing Next Video
    //     Main.apiCall(presentPagedetails.nextVideoDetails[0].target.path);
    // }
    else if (id == "btn-3" && type == "nextbtn") { //nextVideo_preview
        Main.playerShowLoading();
        ShakaPlayer.playerState = 'buffering';
        distroPlayingMacro = false
        skipIntroOnn = false;
        clickedSkipIntro = false
        ShakaPlayer.HandleBufferingEvent();
        analytics.plugin.handlePlayEndedByUser();
        ShakaPlayer.stopInterval();
        Main.playerScreenSessionEnd();
        pauseTimer();
        console.log('Total Elapsed Time: ', timerSeconds, ' seconds');
        Main.myRecoApi(myReco);
        ShakaPlayer.kill();
        nextVideoPreview = false;
        // Check if a style element with a specific ID exists
        var existingStyle = document.getElementById('subtitle-style');
        // If it exists, remove it
        if (existingStyle) {
            existingStyle.remove();
        }
        var dontAddNewSection = false
        var data =
            presentPagedetails &&
            presentPagedetails.sections &&
            presentPagedetails.sections[0] &&
            presentPagedetails.sections[0].sectionData &&
            presentPagedetails.sections[0].sectionData.data;

        if (data && data.length > 30) {
            dontAddNewSection = true;
        }
        var comingFromPlayerSections = true;
        Main.getNextVideo(presentPagedetails.targetPath, dontAddNewSection, comingFromPlayerSections)
        // Main.apiCall(presentPagedetails.nextVideoDetails[0].target.path);
        // nextVideoPreview = true;
        resetNextPreviewState();
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)

    }
    else if (source == 'favourites') { // fav clicking
        if (presentPagedetails.pageButtons.isFavourite == true) {
            //remove from fav
            presentPagedetails.pageButtons.isFavourite = false;
            Yup('#favIcon').removeClass("addedFav");
            Yup('#favIcon').addClass("remFav");
            Yup("#favText").text("Add to Favorites");
            Main.addToFav(presentPagedetails.targetPath, 2, id);
        } else {
            //add to fav
            presentPagedetails.pageButtons.isFavourite = true;
            Yup('#favIcon').removeClass("remFav");
            Yup('#favIcon').addClass("addedFav");
            Yup("#favText").text("Remove from Favorites");
            Main.addToFav(presentPagedetails.targetPath, 1, id);
        }
    }
    else if (source == 'sections') {
        var targetPath = Yup('#' + id).attr("targetpath");
        var template = Yup('#' + id).attr("template");
        var targetPath = Yup('#' + id).attr("targetpath");
        // var templateDuplicheck = Yup('#'+id).attr("templateDup");
        if (template != undefined && template != null && template != "undefined") {
            var myobj = document.getElementById("contentTemp");
            if (!!myobj) {
                myobj.remove();
            }
            if (targetPath == undefined && targetPath == null) {
                presentPagedetails.templateData = {};
            }
            disBingelist = true
            templateCodeInfo = {};
            if (!!templateList) {
                for (var i = 0; i < templateList.length; i++) {
                    if (template == templateList[i].code) {
                        templateCodeInfo = templateList[i];
                        temflag = true;
                        break;
                    }
                }
            }
            if (!!temflag) {
                Main.getTemplateData(template, targetPath, id, source);
            }
            //     Yup('.imageFocus').removeClass('player_play');
            // Yup('.imageFocus').addClass('player_pause');
            // ShakaPlayer.playOrPause(); 
        }
        else {
            var splitData = id.split('-');
            var clickSection = {
                genre: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre : '',
                contentType: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType : '',
                contentLang: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.languageCode ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.languageCode : '',
                contentPartnerName: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName : '',
                contentId: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.id ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.id : '',
                tvshowname: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : '',
                model: (presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P") ? 'svod' : 'avod',
                tab: ctEvent.tabName ? ctEvent.tabName : "",
                contantTag: (presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P") ? 'paid' : 'free',
                contentName: !!presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : '',
                sourcePly: 'player recommendations',
                sourceSubDet: 'recommendations',
                souDet: (presentPagedetails.steamResponse.analyticsInfo.dataType == "web_series_episode" || presentPagedetails.steamResponse.analyticsInfo.dataType == "originals_series_episode" || presentPagedetails.steamResponse.pageAttributes.targetMenuCode == 'shows' || presentPagedetails.steamResponse.analyticsInfo.dataType == "sports_series_episode") ? 'Episodes' : (presentPagedetails.steamResponse.analyticsInfo.dataType == "movie") ? 'Browse More' : (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") ? 'Browse Suggestions' : ""

            }
            clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, ctEvent.carouselPositionn, ctEvent.contentPositionss));
            pauseTimer();
            console.log("playerRecommedation", myReco)
            Main.myRecoApi(myReco);
            Main.ctVideoStopFunction()
            distroPlayingMacro = false
            skipIntroOnn = false;
            clickedSkipIntro = false
            localStorage.removeItem("clicked-menu")
            analytics.plugin.handlePlayEndedByUser();
            ShakaPlayer.stopInterval();
            ShakaPlayer.kill();
            // Check if a style element with a specific ID exists
            var existingStyle = document.getElementById('subtitle-style');
            // If it exists, remove it
            if (existingStyle) {
                existingStyle.remove();
            }
            var dontAddNewSection = false
            if (presentPagedetails.sections[0].sectionData.data.length > 30) {
                dontAddNewSection = true
            }
            var comingFromPlayerSections = true;
            Main.apiCall(targetPath, "", "", dontAddNewSection, comingFromPlayerSections);
        }

    }
    else if (source == 'player_icon') {
        // Player.playOrPause();
        if (Yup('.imageFocus').hasClass('player_play')) {
            Yup('.imageFocus').removeClass('player_play');
            Yup('.imageFocus').addClass('player_pause');
        }
        else {
            Yup('.imageFocus').removeClass('player_pause');
            Yup('.imageFocus').addClass('player_play');
        }
        ShakaPlayer.playOrPause(videoPlayact);
    }
    else if (id == "btn-4") {
        clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
        var splitData = id.split('-');
        if (id == "btn-4" && ShakaPlayer.playerState != 'idle') {
            if (Yup('#video_quality').css('display') == 'block') {
                Yup("#video_quality").css('display', 'none');
                Yup("#player_setting.default").css("display", "none");
                Yup("#player_setting.focused").css("display", "block");
                return;
            }
            // var bitrate_container = document.querySelector('.bitrate_container')
            if (presentPagedetails.QulailtyTracks) {
                var keys = Object.keys(presentPagedetails.QulailtyTracks)
                if (keys.length > 6) {
                    Yup('.bitrate_container').addClass("height_set");
                }
            }
            if ((id == "btn-4" && localStorage.getItem("selectedRadio") == "auto") || (id == "btn-4" && localStorage.getItem("selectedRadio") == "null") || (id == "btn-4" && localStorage.getItem("selectedRadio") == "undefined")) {
                localStorage.setItem("video_quality", true);
                presentPagedetails.isVideoQualityEnable = "true";
                Yup("#player_quality").attr("src", "images/menu_icons/settings_selected.svg")
                if (Yup('#subtitles_main').css('display') == 'block') {
                    Yup('#subtitles_main').hide();
                    Yup("#Subtitlesbtn.default").css("display", "");
                    Yup("#Subtitlesbtn.focused").css("display", "");
                }
                if (Object.keys(presentPagedetails.QulailtyTracks).length > 0) {
                    clevertapservice.sendCleverTapEvent('video player actions', videoPlayact)
                    Yup('#video_quality').html(Util.videoQuality());
                    Yup("#video_quality").css('display', 'block');
                }
                if (Yup("#Subtitlesbtn.focused").css('display') == 'block') {
                    Yup("#Subtitlesbtn.default").css("display", "");
                    Yup("#Subtitlesbtn.focused").css("display", "");
                }
                Yup("#player_setting.default").css("display", "none");
                Yup("#player_setting.focused").css("display", "block");
                Yup("#player_setting.default").css("display", "none");
                Yup("#player_setting.focused").css("display", "block");
                Yup(".imageFocus").removeClass("imageFocus")
                Yup("#bitrate-0").addClass("imageFocus")
                Yup("#bitrate-0 input[name='video_quality'] + span.radio_btn").addClass('checked');
                localStorage.setItem("selectedRadio", "auto");
            }
            else {
                if (Yup('#subtitles_main').css('display') == 'block') {
                    Yup('#subtitles_main').hide();
                    Yup("#Subtitlesbtn.default").css("display", "");
                    Yup("#Subtitlesbtn.focused").css("display", "");
                }
                if (Object.keys(presentPagedetails.QulailtyTracks).length > 0) {
                    Yup('#video_quality').html(Util.videoQuality());
                    Yup("#video_quality").css('display', 'block');
                }
                Yup("#player_setting.default").css("display", "none");
                Yup("#player_setting.focused").css("display", "block");
                var bitrateLocal = localStorage.getItem("selectedRadio");
                var selectedvidIndex = localStorage.getItem("selectedvidIndex");
                var MinQualitySelected = localStorage.getItem("MinQualitySelected");
                var MaxQualitySelected = localStorage.getItem("MaxQualitySelected");
                var globalQualitySelectedName = localStorage.getItem("QualitySelectedName");
                var oldQualitySelectedName = localStorage.getItem("oldQualitySelectedName");
                var bitratesPlayer = document.querySelectorAll('.bitrate')
                for (var i = 0; i < bitratesPlayer.length; i++) {
                    var eleId = bitratesPlayer[i].id.split('-');
                    var elementBitrateValue = Yup("#bitrate-" + (parseInt(eleId[1]))).attr("bitrateValue")
                    var texthh = Yup("#bitrate-" + parseInt(eleId[1]) + " .text").text();
                    console.log(texthh)
                    // if(texthh && texthh == oldQualitySelectedName){
                    //     var bitrateCondition = true;  
                    //     Yup(".imageFocus").removeClass("imageFocus")
                    //     Yup(".checked").removeClass("checked")
                    //     Yup("#bitrate-" + (parseInt(eleId[1]))).addClass("imageFocus")
                    //     Yup("#bitrate-" + (parseInt(eleId[1])) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
                    //     break;
                    // }
                    if (presentPagedetails.selectedQuality && texthh && texthh == presentPagedetails.selectedQuality) {
                        var bitrateCondition = true;
                        Yup(".imageFocus").removeClass("imageFocus")
                        Yup(".checked").removeClass("checked")
                        Yup("#bitrate-" + (parseInt(eleId[1]))).addClass("imageFocus")
                        Yup("#bitrate-" + (parseInt(eleId[1])) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
                        break;

                    }
                    else if (!presentPagedetails.selectedQuality && globalQualitySelectedName && texthh && texthh == globalQualitySelectedName) {
                        var bitrateCondition = true;
                        Yup(".imageFocus").removeClass("imageFocus")
                        Yup(".checked").removeClass("checked")
                        Yup("#bitrate-" + (parseInt(eleId[1]))).addClass("imageFocus")
                        Yup("#bitrate-" + (parseInt(eleId[1])) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
                        break;
                    }
                    //    else if(selectedvidIndex != '' && selectedvidIndex != undefined && selectedvidIndex != null && (!texthh || !oldQualitySelectedName)){
                    //         var bitrateCondition = true;
                    //                 Yup(".imageFocus").removeClass("imageFocus")
                    //                 Yup(".checked").removeClass("checked")
                    //                 Yup("#bitrate-" + (parseInt(selectedvidIndex))).addClass("imageFocus")
                    //                 Yup("#bitrate-" + (parseInt(selectedvidIndex)) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
                    //                 var previousBitrate = localStorage.getItem("previousBitrateKey");
                    //                 localStorage.setItem("previousBitrateKey", elementBitrateValue);
                    //                 clevertapservice.sendCleverTapEvent('video playback quality changed', {
                    //                     'new selection': elementBitrateValue,
                    //                     'old selection': previousBitrate,
                    //                     'source': "player"
                    //                 });
                    //                 break;

                    //     }
                    //   else  if(parseInt(elementBitrateValue) >= parseInt(MinQualitySelected) && parseInt(elementBitrateValue) <= parseInt(MaxQualitySelected) && elementBitrateValue != 0) {                        // if (parseInt(elementBitrateValue) >= parseInt(bitrateLocal)) {
                    //         var selecedBitrate = i;
                    //         var bitrateCondition = true;
                    //         Yup(".imageFocus").removeClass("imageFocus")
                    //         Yup(".checked").removeClass("checked")
                    //         Yup("#bitrate-" + (parseInt(eleId[1]))).addClass("imageFocus")
                    //         Yup("#bitrate-" + (parseInt(eleId[1])) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
                    //         // Assuming you have a mechanism to store the previous bitrate state
                    //         var previousBitrate = localStorage.getItem("previousBitrateKey");
                    //         localStorage.setItem("previousBitrateKey", elementBitrateValue);
                    //         clevertapservice.sendCleverTapEvent('video playback quality changed', {
                    //             'new selection': elementBitrateValue,
                    //             'old selection': previousBitrate,
                    //             'source': "player"
                    //         });
                    //         // Update the previous bitrate in localStorage
                    //         break;
                    //     }
                }
                if (selecedBitrate >= 6) {
                    var hiddenBitrates = 1;
                    for (var i = 0; i < selecedBitrate - 5; i++) {
                        hiddenBitrates = hiddenBitrates + i
                        Yup("#bitrate-" + i).addClass("hidden");
                    }
                    for (var i = 6; i < hiddenBitrates + 6; i++) {
                        Yup("#bitrate-" + i).removeClass("hidden");
                    }
                }
                if (!bitrateCondition) {
                    Yup(".imageFocus").removeClass("imageFocus")
                    Yup(".checked").removeClass("checked")
                    Yup("#bitrate-0").addClass("imageFocus")
                    Yup("#bitrate-0 input[name='video_quality'] + span.radio_btn").addClass('checked');
                }
                Yup("#player_quality").attr("src", "images/menu_icons/settings_selected.svg")
            }
        } else {
            presentPagedetails.isVideoQualityEnable = false;
            localStorage.setItem("video_quality", false);
            // Yup('#video_quality').html(Util.videoQuality());
            Yup("#player_quality").attr("src", "images/menu_icons/settings_default.svg")
        }
    }
    else if (source == "bitrate") {
        var splitData = id.split('-');
        Yup(".imageFocus").removeClass("imageFocus")
        var splitData = id.split('-');
        Yup(".checked").removeClass("checked")
        Yup("#bitrate-" + (parseInt(splitData[1]))).addClass("imageFocus")
        Yup("#bitrate-" + (parseInt(splitData[1])) + " input[name='video_quality'] + span.radio_btn").addClass('checked');
        var bitrateVal = Yup("#bitrate-" + (parseInt(splitData[1]))).attr("bitrateValue")
        // var bitrateText = Yup("#bitrate-" + (parseInt(splitData[1])) + " input[name='video_quality'] + span + span").text()
        localStorage.setItem("selectedRadio", bitrateVal)
        localStorage.setItem("selectedvidIndex", splitData[1])
        // _shaka.selectVariantTrack(bitrateVal);
        // if(bitrateText == 'Best' && presentPagedetails.steamResponse.pageAttributes.networkName == "Play Flix"){
        //     var bitrateVal =  Yup("#bitrate-" + ((parseInt(splitData[1])) - 1)).attr("bitrateValue")
        //     ShakaPlayer.SelectQulaityTrack(bitrateVal);
        // }
        // else{
        var QualitySelectedName = Yup("#" + id).text().trim();
        presentPagedetails.selectedQuality = QualitySelectedName;
        var previousBitrate = localStorage.getItem("oldQualitySelectedName");
        localStorage.setItem("oldQualitySelectedName", QualitySelectedName);
        clevertapservice.sendCleverTapEvent('video playback quality changed', {
            'new selection': QualitySelectedName,
            'old selection': previousBitrate ? previousBitrate : "",
            'source': ctEvent.tabName ? ctEvent.tabName : ""
        });
        // ShakaPlayer.SelectQulaityTrack(bitrateVal);
        if (bitrateVal == "0" || bitrateVal == 0) {
            localStorage.removeItem("selectedvidIndex");
            _shaka.configure({
                abr: {
                    enabled: true
                }
            });
            presentPagedetails.abr_disabled = false;
        }
        else {
            ShakaPlayer.SelectCorrectQulaityTrack(bitrateVal);
        }
        // }
        Yup(".video_quality").hide();
        Yup("#player_setting.default").css("display", "");
        Yup("#player_setting.focused").css("display", "");
        // if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
        // Yup(".imageFocus").removeClass("imageFocus")

        // Yup("#seekbar-live").addClass("imageFocus");
        // } else {
        Yup(".imageFocus").removeClass("imageFocus")

        Yup("#btn-4").addClass("imageFocus");
        // }
    }
    // Player.playOrPause();
    if (presentPagedetails.constrolsShow != true && presentPagedetails.view == "player") {
        ShakaPlayer.playOrPause();
        // Player.showPlayerDetails();
        // ShakaPlayer.showPlayerDetails();
        if (presentPagedetails.isCaptionsEnable == true) {
            if (keyHandlar.isHD) {
                Yup(".captions_data").css('bottom', '132px')
            }
            else {
                Yup(".captions_data").css('bottom', '200px')
            }
        }
    }
    // }
}

keyHandlar.uniqueKeydown = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.imageFocus').attr("id");
    var splitData = id.split('-');
    switch (keycode) {
        case tvKeyCode.ArrowUp: {
            break;
        }
        case tvKeyCode.ArrowDown: {
            break;
        }
        case tvKeyCode.ArrowLeft: {
            if (view == 'introPageView') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#button_0").addClass('imageFocus');
                if (parseInt(splitData[1]) > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#button-" + (parseInt(splitData[1]) - 1)).addClass('imageFocus');
                }
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (view == 'introPageView') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#button_1").addClass('imageFocus');
                if (parseInt(splitData[1]) < (presentPagedetails.introPageBtnsLength - 1)) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#button-" + (parseInt(splitData[1]) + 1)).addClass('imageFocus');
                }
            }
            if (view == 'keyPadNumaric') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#button_1").addClass('imageFocus');
                if (parseInt(splitData[1]) < (presentPagedetails.introPageBtnsLength - 1)) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#button-" + (parseInt(splitData[1]) + 1)).addClass('imageFocus');
                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (view == 'introPageView') {
                // Main.popupData ={
                //     popuptype : 'noData',
                //     message : 'Are you sure want to exit '+appConfig.appName,
                //     buttonCount : 2,
                //     yesText : 'No',
                //     yesTarget : 'close',
                //     noText : 'Yes',
                //     noTarget : 'exit',
                //     onBack : 'close'
                // }
                // Yup("#popUpFDFS").html(Util.showPopup());
                // Yup("#popup-btn-1").addClass('popupFocus');
                Main.apiCall(firstMenu);
                Main.showMenu();
            } else if (view == 'signout') {
                view = '';
                isUserSignedOutinThisSession = true;
                Main.getLocation();
            } else if (view == 'noPackageView') {
                Main.previousPage();
            }
            break;
        }
        case 461: {
            if (view == 'introPageView') {
                // Main.popupData ={
                //     popuptype : 'noData',
                //     message : 'Are you sure want to exit '+appConfig.appName,
                //     buttonCount : 2,
                //     yesText : 'No',
                //     yesTarget : 'close',
                //     noText : 'Yes',
                //     noTarget : 'exit',
                //     onBack : 'close'
                // }
                // Yup("#popUpFDFS").html(Util.showPopup());
                // Yup("#popup-btn-1").addClass('popupFocus');
                Main.apiCall(firstMenu);
                Main.showMenu();
            } else if (view == 'signout') {
                view = '';
                isUserSignedOutinThisSession = true;
                Main.getLocation();
            } else if (view == 'noPackageView') {
                Main.previousPage();
            }
            break;
        }
        case tvKeyCode.Enter: {
            if (view == 'signout') {
                isUserSignedOutinThisSession = true;
                Main.getLocation();
            } else if (view == 'signinSuccess' || view == 'noPackageView') {
                Main.previousPage();
            }
            else if (view == 'introPageView') {
                var targetpath = Yup('.imageFocus').attr("targetpath");
                if (targetpath == 'signin') {
                    view = "signin";
                    Main.processNext();
                } else if (targetpath == 'otp') {
                    view = "passcode";
                    Main.processNext();
                }
                //Main.apiCall(firstMenu);
            }
            break;
        }
        default: {
            break;
        }
    }

}

keyHandlar.menuKeyHandular = function (id, event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('#' + id).attr("source");
    keyHandlar.stopPreviewTrailers();
    switch (keycode) {
        case tvKeyCode.ArrowUp: {
            if (isSidemenuOpened) {
                var splitData = id.split('-');
                var userDetails = localStorage.getItem('userDetails')
                if (id == "menu-0") {
                    if (!!userDetails && switchProfilesOption == true) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup(".top_profile").addClass('imageFocus')
                    }
                    else if (!!userDetails == false) {
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup(".top_profile").addClass('imageFocus')
                    }
                }
                else if (Yup('#menu-' + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#menu-' + (parseInt(splitData[1]) - 1)).addClass('imageFocus');
                }
            } else {
                Main.sidebarOpen();
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (isSidemenuOpened) {
                var splitData = id.split('-');
                if (id == "menu-profile") {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup("#menu-0").addClass('imageFocus');
                }
                else if (Yup('#menu-' + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#menu-' + (parseInt(splitData[1]) + 1)).addClass('imageFocus');
                }
            }
            else {
                Main.sidebarOpen();
            }
            break
        }
        case tvKeyCode.ArrowLeft: {
            break;
        }
        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            if (presentPagedetails.pageType == "details") {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == 0) {
                    if (presentPagedetails.avilablePagebuttonsLength >= 1) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#button-0").addClass('imageFocus');
                    } else if (presentPagedetails.favButtonAdded == true) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#favorites").addClass('imageFocus');
                    }
                    else if (Yup('#readMore').val() != undefined) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(".description").addClass('imageFocus');
                    }
                    Yup(".detailsContainer").animate({ 'margin-top': '0px' }, 300);
                } else {
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    Yup("#section-" + (parseInt(splitData[1]) + 1)).hide();
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-" + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass("imageFocus");
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) - 1), presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]);
                    } else {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-0").addClass("imageFocus");
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1]) - 1), 0);
                    }
                    if ((data && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true'))) {
                        keyHandlar.showCardLazyPreview();
                    }
                    else {
                        if (keyHandlar.isHD) {
                            Yup(".sectionsHome").css('margin-top', '100px')
                        }
                        else {
                            Yup(".sectionsHome").css('margin-top', '150px')
                        }

                        Yup('.active-banner-background').css('display', 'none');
                        Yup('.active-banner-background').removeClass('active-banner-background');
                    }
                }
            }
            else if (presentPagedetails.view == 'search') {
                Main.sidebarClose();
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#key-0").addClass("imageFocus");
                view = 'search'
            }
            else if (view == "accountDetails" || id == "account-0-0") {
                Main.sidebarClose();
                Yup(".imageFocus").removeClass("imageFocus");
                Yup(".toptab.active").addClass("imageFocus");
            }
            else if (presentPagedetails.previousTabbedPositionFocus && presentPagedetails.previousTabbedPositionFocus != undefined && presentPagedetails.previousTabbedPositionFocus != null) {
                Main.sidebarClose();
                Yup('.imageFocus').removeClass('imageFocus');
                Yup('#' + presentPagedetails.previousTabbedPositionFocus).addClass('imageFocus');
                var splitData = presentPagedetails.previousTabbedPositionFocus.split('-');
                var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1])), (parseInt(splitData[2])));
                presentPagedetails.previousTabbedPositionFocus = ""
            }
            else if (view == "content" && !presentPagedetails.currentSection && presentPagedetails.currentSection != undefined && presentPagedetails.currentSection != null && Yup('.banners').css('display') != 'block') {
                Main.sidebarClose();
                Yup('.imageFocus').removeClass('imageFocus');
                Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection]);
                keyHandlar.stopPreviewTrailers();
                keyHandlar.callPreviews("sections", presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection], data);
                // if ((data && data.cardType != "expand_preview_poster" && data.cardSubType != "tabbed-card" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true'))) {
                //     keyHandlar.showCardLazyPreview();
                // }
                //     else {
                //           if (presentPagedetails.targetPath != "favourites") {
                //         if (keyHandlar.isHD) {
                //             Yup(".sectionsHome").css('margin-top', '100px')
                //         }
                //         else {
                //             Yup(".sectionsHome").css('margin-top', '150px')
                //         }

                //         Yup('.active-banner-background').css('display', 'none');
                //         Yup('.active-banner-background').removeClass('active-banner-background');
                //     }
                // }
                if (splitData[1] != "tab") {
                    keyHandlar.settingMarginAndCardTypes(data);
                }
            }
            else if (Yup('.banners').css('display') == 'none' || presentPagedetails.banners.length == 0) {
                if (presentPagedetails.currentSection == undefined) {
                    if (Yup('#sectionItem-0-0').length > 0) {
                        Main.sidebarClose();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-0-0').addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
                        keyHandlar.stopPreviewTrailers();
                        keyHandlar.callPreviews("sections", 0, 0, data);
                        if ((data && data.cardSubType != "tabbed-card" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true'))) {
                            keyHandlar.showCardLazyPreview();
                        }
                        else {
                            if (keyHandlar.isHD) {
                                Yup(".sectionsHome").css('margin-top', '100px')
                            }
                            else {
                                Yup(".sectionsHome").css('margin-top', '150px')
                            }

                            Yup('.active-banner-background').css('display', 'none');
                            Yup('.active-banner-background').removeClass('active-banner-background');
                        }
                    }
                    else {

                    }
                }
                else {
                    if (presentPagedetails.previousTabbedPositionFocus && presentPagedetails.previousTabbedPositionFocus != undefined && presentPagedetails.previousTabbedPositionFocus != null) {
                        Main.sidebarClose();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#' + presentPagedetails.previousTabbedPositionFocus).addClass('imageFocus');
                        var splitData = presentPagedetails.previousTabbedPositionFocus.split('-');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, (parseInt(splitData[1])), (parseInt(splitData[2])));
                        presentPagedetails.previousTabbedPositionFocus = ""

                    }
                    else if (presentPagedetails.sectionIndex[presentPagedetails.currentSection] != undefined) {
                        Main.sidebarClose();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection]);
                        keyHandlar.stopPreviewTrailers();
                        keyHandlar.callPreviews("sections", presentPagedetails.currentSection, presentPagedetails.sectionIndex[presentPagedetails.currentSection], data);
                    }
                    else {
                        Main.sidebarClose();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#sectionItem-' + presentPagedetails.currentSection + '-0').addClass('imageFocus');
                        var data = keyHandlar.getSectionItemData(presentPagedetails, presentPagedetails.currentSection, 0);
                        keyHandlar.stopPreviewTrailers();
                        keyHandlar.callPreviews("sections", presentPagedetails.currentSection, 0, data);
                    }
                    //     if (data && data.cardType === "expand_preview_poster") {
                    //         keyHandlar.clearPreviousExpandPreview();
                    //             keyHandlar.handleExpandPreviewFocus(
                    //                 presentPagedetails.currentSection,
                    //                 0,
                    //                 data
                    //             );
                    //     }
                    //     else if (data && data.cardType == "floating_rail") {
                    //         if(presentPagedetails.targetPath != "favourites"){
                    //             if (keyHandlar.isHD) {
                    //                 Yup(".sectionsHome").css('margin-top', '100px')
                    //             }
                    //             else {
                    //                 Yup(".sectionsHome").css('margin-top', '150px')
                    //             }
                    //             Yup('.active-banner-background').css('display', 'none');
                    //         Yup('.active-banner-background').removeClass('active-banner-background');
                    //             }
                    //     }
                    //    else if ((data && data.cardSubType != "tabbed-card" && presentPagedetails.targetPath != "favourites" && (Yup('.imageFocus').attr('is_bg_available') == 'true'))) {
                    //         keyHandlar.showCardLazyPreview();
                    //  }
                    //         else{
                    //             if(keyHandlar.isHD){
                    //                 Yup(".sectionsHome").css('margin-top', '100px')
                    //             } 
                    //             else{
                    //                 Yup(".sectionsHome").css('margin-top', '150px')
                    //             } 

                    //             Yup('.active-banner-background').css('display', 'none');
                    //             Yup('.active-banner-background').removeClass('active-banner-background');
                    //         }
                    if (splitData[1] != "tab") {
                        keyHandlar.settingMarginAndCardTypes(data);
                    }
                }
                if (presentPagedetails && presentPagedetails.targetPath == "favourites" && presentPagedetails.sections && presentPagedetails.sections.length == 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    keyHandlar.stopPreviewTrailers()
                    Main.sidebarClose();
                }
                // var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');

            }
            else {
                if (presentPagedetails.banners.length > 0) {
                    var activeBanner = Yup(".active-banner").attr("id");
                    var splitData = id.split('-');
                    var splIds = activeBanner.split("-")
                    if (activeBanner) {
                        Main.sidebarClose();
                        keyHandlar.stopPreviewTrailers();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-' + (parseInt(splIds[1]))).addClass('imageFocus');
                        keyHandlar.callPreviews("banners", parseInt(splIds[1]))

                    }
                    else {
                        Main.sidebarClose();
                        keyHandlar.stopPreviewTrailers();
                        Yup('.imageFocus').removeClass('imageFocus');
                        Yup('#WatchBannerBtn-0').addClass('imageFocus');
                        //     if(presentPagedetails.banners[0].target.pageAttributes.isTrailerAvailable == "true"){
                        keyHandlar.callPreviews("banners", 0)
                    }
                }
                else if (Yup("#top-menu-container").length > 0 && Yup("#top-menu-container").css("display") !== "none") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (Yup(".top-menu-item.top-menu-active").length > 0) {
                        Yup(".top-menu-item.top-menu-active").addClass("imageFocus");
                    } else {
                        Yup(".top-menu-item").first().addClass("imageFocus");
                    }
                    Main.sidebarClose();
                }
            }
            // if (presentPagedetails.sectionIndex[presentPagedetails.currentSection] != undefined) {
            //     Yup('.imageFocus').removeClass('imageFocus');
            //     Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
            //     // keyHandlar.showCardLazyPreview();
            // }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.menuKeyEnterHandular(id);
        }
        default: {
            break;
        }
    }
}
keyHandlar.playKeydown = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    // --- Ad case: show controls for ANY key while ad is playing ---
    var isAdPlaying =
        typeof window.adsManager !== 'undefined' &&
        adsManager &&
        adsManager.isAdPlaying === true;

    // ===== AD MODE: handle everything here, then return =====
    if (isAdPlaying) {
        if (keycode === tvKeyCode.Return || keycode === 10009 || keycode === 27 || keycode === 461 || keycode === 8) {
            Main.previousPage();
            return;
        }
        // Always show/refresh ad controls
        if (!window.adControlsVisible) {
            showAdControls(true); // user-action -> force show
            return;
        } else {
            resetAdControlsHideTimer();
            ensureAdDefaultFocus();
        }

        var $focus = Yup('.imageFocus');
        var curId = $focus.attr('id') || '';
        var curSource = $focus.attr('source') || '';

        switch (keycode) {
            case tvKeyCode.ArrowUp: {
                // from play/pause or skip -> go to back
                if (curSource === 'ad_player_icon' || curId === 'skip-ad-button') {
                    $focus.removeClass('imageFocus');
                    Yup('#ad-btn-back').addClass('imageFocus');
                }
                break;
            }
            case tvKeyCode.ArrowDown: {
                // from back -> go to play/pause
                if (curSource === 'ad-back') {
                    $focus.removeClass('imageFocus');
                    Yup('#ad-playerBtn').addClass('imageFocus');
                }
                break;
            }
            case tvKeyCode.ArrowLeft:
            case tvKeyCode.ArrowRight: {
                // toggle between play/pause and skip (if visible)
                var $skip = Yup('#skip-ad-button');
                if ($skip.length && $skip.css('display') !== 'none') {
                    $focus.removeClass('imageFocus');
                    if (curId === 'ad-playerBtn') {
                        $skip.addClass('imageFocus');
                    } else {
                        Yup('#ad-playerBtn').addClass('imageFocus');
                    }
                }
                break;
            }
            case tvKeyCode.videoPlayPause:
            case tvKeyCode.MediaPlay:
            case tvKeyCode.MediaPause: {
                toggleAdPlayPause();
                break;
            }
            case tvKeyCode.Enter: {
                if (curId === 'skip-ad-button') {
                    // skip current ad (or pod – your choice)
                    if (adsManager.skipCurrentAd) {
                        adsManager.skipCurrentAd();
                    } else if (adsManager.skipAdPod) {
                        adsManager.skipAdPod();
                    }
                } else if (curId === 'ad-playerBtn') {
                    toggleAdPlayPause();
                } else if (curId === 'ad-btn-back') {
                    Main.previousPage();
                }
                break;
            }
            case tvKeyCode.Return:
            case 10009:
            case 27:
            case 461:
            case 8: {    // ← important
                Main.previousPage();
                break;
            }
        }

        return;  // don't fall through to content logic
    }
    var id = Yup('.imageFocus').attr("id");
    var source = Yup('.imageFocus').attr("source");
    // if(nextVideoPreview == true && keycode != 13 && keycode != 8 && keycode != 27 && keycode != tvKeyCode.ArrowRight && keycode != tvKeyCode.ArrowLeft){
    //     return;
    // }
    switch (keycode) {
        case tvKeyCode.videoPlayPause: {
            ShakaPlayer.playOrPause();
            break;
        }
        case tvKeyCode.ArrowLeft: {
            if (nextVideoPreview == true) {
                //     if (id == "watch_credits-preview"){
                //      Yup(".imageFocus").removeClass("imageFocus");
                //      Yup("#next-preview").addClass("imageFocus");
                //  }
                if (id == "next-preview") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#watch_credits-preview").addClass("imageFocus");
                }
                return;
            }
            if (presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block' && Yup(".playSugestions").css("display") != 'block') {
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
            // if(presentPagedetails.constrolsShow == true && Yup("#video_quality").css("display") !='block' && Yup("#subtitles_main").css("display") !='block'){
            //     ShakaPlayer.showPlayerDetails(); 
            // }
            if (source == "sections") {
                ShakaPlayer.clearSuggestionControls();
                var splitData = id.split('-');
                // if(parseInt(splitData[2]) != 0 ){
                //     Yup(".imageFocus").removeClass("imageFocus");
                //     Yup("#sectionItem-"+splitData[1] +'-'+(parseInt(splitData[2]) - 1) ).addClass("imageFocus");
                //     keyHandlar.addSectionKeyIndex(parseInt(splitData[1]),parseInt(splitData[2])-1);
                //     keyHandlar.liveScrollLeft(parseInt(splitData[1]),parseInt(splitData[2]) );
                // }
                if (parseInt(splitData[2]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) - 1)).addClass("imageFocus");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) - 1);
                    keyHandlar.liveScrollLeft(parseInt(splitData[1]), parseInt(splitData[2]));
                }
            }
            else if (source == 'player_icon') {
                if (presentPagedetails.isCaptionsEnable == true) {

                }
                var video = document.getElementById('video');
                if (video && video.currentTime > 2) {
                    ShakaPlayer.seekTo('prev', '');
                }
            }
            else if (source == "icon") {
                ShakaPlayer.clearControls();
                var splIds = id.split('-');
                if (parseInt(splIds[1]) > 0) {
                    var i = parseInt(splIds[1]);
                    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                        if (parseInt(splIds[1]) == 2) {
                            if (presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' && ((presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.length > 0) || Yup("#btn-1").css("display") == 'block')) {
                                i = i - 1;
                            } else {
                                i = i - 2;
                            }
                        }
                        else if (parseInt(splIds[1]) == 4)
                            if (presentPagedetails.nextVideoDetails && presentPagedetails.nextVideoDetails.length > 0 && (Yup("#btn-3").css("display") == 'block')) {
                                i = i - 1;
                            }
                            else {
                                i = i - 2;
                            }
                        else {
                            i = i - 1
                        }
                    }
                    else {
                        i = i - 4
                    }
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#btn-' + i).addClass('imageFocus');
                }

            }
            else if (source == "bitrate_cancel") {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#bitrate_apply_btn").addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (nextVideoPreview == true) {
                if (id == "watch_credits-preview") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#next-preview").addClass("imageFocus");
                }
                //   else  if (id == "next-preview"){
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         Yup("#watch_credits-preview").addClass("imageFocus");
                //     }
                return;
            }
            if (presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block' && Yup(".playSugestions").css("display") != 'block') {
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
            if (source == "sections") {
                ShakaPlayer.clearSuggestionControls();
                var splitData = id.split('-');
                // if(parseInt(splitData[2]) <=  presentPagedetails.sections[parseInt(splitData[1])].sectionControls.dataLength -1 ){
                //     if(Yup("#sectionItem-"+splitData[1] +'-'+(parseInt(splitData[2]) + 1) ).length > 0){
                //         Yup(".imageFocus").removeClass("imageFocus");
                //         Yup("#sectionItem-"+splitData[1] +'-'+(parseInt(splitData[2]) + 1) ).addClass("imageFocus");
                //         keyHandlar.addSectionKeyIndex(parseInt(splitData[1]),parseInt(splitData[2])+1);
                //     }
                //     if(parseInt(splitData[2]) == presentPagedetails.sections[parseInt(splitData[1])].sectionControls.dataLength - 3 && presentPagedetails.sections[parseInt(splitData[1])].sectionData.hasMoreData == true){
                //         Main.playSeasonsPagination(parseInt(splitData[1]))
                //     }  
                //     keyHandlar.liveScrollRight(parseInt(splitData[1]),parseInt(splitData[2]));
                // }
                if (parseInt(splitData[2]) < presentPagedetails.sections[parseInt(splitData[1])].sectionData.data.length - 1) {
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]) + 1);
                    keyHandlar.liveScrollRight(parseInt(splitData[1]), parseInt(splitData[2]));
                    if ((parseInt(splitData[2]) + 1) == presentPagedetails.sections[parseInt(splitData[1])].sectionData.data.length - 3 && presentPagedetails.sections[parseInt(splitData[1])].sectionData.hasMoreData == true) {
                        Main.playSeasonsPagination(parseInt(splitData[1]), parseInt(splitData[2]))
                    }
                    if (Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).length > 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + splitData[1] + '-' + (parseInt(splitData[2]) + 1)).addClass("imageFocus");
                    }
                }
            }
            else if (source == 'player_icon') {
                if (presentPagedetails.isCaptionsEnable == true) {

                }
                var video = document.getElementById('video');

                if (
                    video &&
                    ShakaPlayer.duration &&
                    (ShakaPlayer.duration - video.currentTime) <= SEEK_DISABLE_LAST_SECONDS && video.currentTime > 2
                ) {
                    console.warn("Seek blocked: near end of content");
                    return; //STOP HERE
                }
                ShakaPlayer.seekTo('next', '');
            }
            else if (source == "icon") {
                ShakaPlayer.clearControls();
                var splIds = id.split('-');
                if (parseInt(splIds[1]) < 4) {
                    var i = parseInt(splIds[1]);
                    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                        if (parseInt(splIds[1]) == 0) {
                            if (presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' && ((presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.length > 0) || Yup("#btn-1").css("display") == 'block')) {
                                i = i + 1;
                            } else {
                                i = i + 2;
                            }
                        }
                        else if (parseInt(splIds[1]) == 2)
                            if (presentPagedetails.nextVideoDetails && presentPagedetails.nextVideoDetails.length > 0 && (Yup("#btn-3").css("display") == 'block')) {
                                i = i + 1;
                            }
                            else {
                                i = i + 2;
                            }
                        else {
                            i = i + 1
                        }
                    }
                    else {
                        i = i + 4
                    }
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#btn-' + i).addClass('imageFocus');


                }

                if (source == "bitrate_apply") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#bitrate_cancel_btn").addClass("imageFocus");
                }
            }

            break;
        }
        case tvKeyCode.ArrowUp: {
            if (controlSuggestionControls != undefined) {
                clearTimeout(controlSuggestionControls);
                controlSuggestionControls = undefined;
            }
            if (nextVideoPreview == true) {
                return;
            }

            if (adsManager && adsManager.isAdPlaying) {
                ensureAdDefaultFocus(); // if needed

                var curSource = Yup('.imageFocus').attr('source') || '';

                if (curSource === 'ad_player_icon') {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#ad-btn-back').addClass('imageFocus');
                }
                return;
            }
            if (presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block' && Yup(".playSugestions").css("display") != 'block') {
                ShakaPlayer.showPlayerDetails();
                if (presentPagedetails.isCaptionsEnable == true) {
                    if (keyHandlar.isHD) {
                        Yup(".captions_data").css('bottom', '132px')
                    }
                    else {
                        Yup(".captions_data").css('bottom', '200px')
                    }
                }
                if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
                    if (keyHandlar.isHD) {
                        Yup("#skipintro").css('bottom', '160px')
                    }
                    else {
                        Yup("#skipintro").css('bottom', '240px')
                    }
                }
                return;
            }
            ShakaPlayer.clearControls();
            // else if(Yup("#video_quality").css("display") !='block' && Yup("#subtitles_main").css("display") !='block'){
            //     ShakaPlayer.showPlayerDetails();
            // }

            if (source == 'seekbar') {
                if (source == 'seekbar') {
                    // Add Focus to Start Over Button
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#btn-0").addClass('imageFocus');
                    // Yup("#playPauseIcon").show();
                    // Yup("#playPauseIcon").addClass("imageFocus");
                }
            }
            else if (source == "skipintro") {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup("#btn-0").addClass('imageFocus');
            }
            else if (source == 'seekbar-live') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#btn-0").addClass('imageFocus');
            }
            else if (source == 'playPauseIcon' || source == 'favourites' || source == 'playstartbtn' || source == 'playnextbtn') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#seekbar").addClass("imageFocus");
            }
            else if (source == "player_icon") {
                if (source == "player_icon" || source == "seekbar") {
                    if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block') {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#skipintro").addClass("imageFocus");
                    }
                    else {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#btn-0").addClass('imageFocus');
                    }
                }

            }
            else if (source == "nextVideo_preview") {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#btn-0").addClass('imageFocus');
            }
            else if (source == "bitrate") {
                var splitData = id.split('-');
                if (Yup('#bitrate-' + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus")
                    Yup("#bitrate-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus")
                    if (Yup('#bitrate-' + (parseInt(splitData[1]) - 5)).length && Yup('#bitrate-' + (parseInt(splitData[1]) + 1)).length) {
                        Yup('#bitrate-' + (parseInt(splitData[1]) + 1)).addClass('hidden');
                        Yup('#bitrate-' + (parseInt(splitData[1]) - 5)).removeClass('hidden');

                    }
                }
            }
            else if (source == "subtitles") {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#subtitles-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                }
            }
            else if (source == "audio") {
                var splitData = id.split('-');
                var keys = Object.keys(presentPagedetails.AudioTracks)
                if (splitData[1] == 0) {
                    var strms = ((presentPagedetails || {}).steamResponse || {}).streams;
                    var cc;
                    cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : cc;
                    if ((presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' && presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0) || !cc && _shaka && _shaka.getTextTracks().length > 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#subtitles-1").addClass("imageFocus");
                    }
                }
                else if (parseInt(splitData[1]) > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#audio-" + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                }
                if ((parseInt(splitData[1]) - 1) < keys.length) {
                    Yup('#audio-' + ((splitData[1] - 6))).css('display', 'block');
                }
            }
            else if (source == "bitrate_apply" || source == "bitrate_cancel") {
                Yup(".imageFocus").removeClass("imageFocus");
                var bitratelen = Object.keys(presentPagedetails.QulailtyTracks)
                Yup("#bitrate-" + (parseInt(bitratelen.length))).addClass("imageFocus")
            }
            else if (source == 'sections') {
                var splitData = id.split('-');
                if (parseInt(splitData[1]) == (presentPagedetails.sections.length - 1)) {
                    //   Yup(".visible").removeClass("visible");
                    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
                    Yup(".imageFocus").removeClass("imageFocus");
                    //   if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                    //     Yup("#seekbar").show();
                    //     Yup("#playPauseIcon").show();
                    //     Yup("#playPauseIcon").addClass("imageFocus");
                    //   }else {
                    //     Yup(".vod-title").addClass("imageFocus");
                    //    }
                    ShakaPlayer.showControls();
                    // if (presentPagedetails.steamResponse.analyticsInfo.contentType =="live") {
                    //     Yup("#seekbar-live").addClass("imageFocus");
                    // }
                    // else if(presentPagedetails.steamResponse.analyticsInfo.contentType !="live"){
                    Yup("#playerBtn").addClass("imageFocus");
                    // }

                }
                if (parseInt(splitData[1]) != 0) {
                    Yup("#section-" + (parseInt(splitData[1]) - 1)).show();
                    Yup(".imageFocus").removeClass("imageFocus");
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]) {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-" + presentPagedetails.sectionIndex[parseInt(splitData[1]) - 1]).addClass("imageFocus");
                    } else {
                        Yup("#sectionItem-" + (parseInt(splitData[1]) - 1) + "-0").addClass("imageFocus");
                    }
                    Yup("#section-" + (parseInt(splitData[1]))).hide();
                }
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.playEnterKeydown(id);
            break;
        }
        case tvKeyCode.videoPlay: {

            // if (presentPagedetails.steamResponse.analyticsInfo.contentType !="live"){
            // Player.play();
            ShakaPlayer.play();
            // }
            break;
        }
        case tvKeyCode.MediaPlay: {
            if (presentPagedetails.constrolsShow == false) {
                ShakaPlayer.showPlayerDetails();
            }
            // if (presentPagedetails.steamResponse.analyticsInfo.contentType !="live"){
            // Player.play();
            if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                Yup('.imageFocus').removeClass('player_pause');
                Yup('.imageFocus').addClass('player_play');
                ShakaPlayer.play();
                // }
            }
            break;
        }
        case tvKeyCode.videoStop: {
            Main.playerHideLoading();
            video.pause();
            video.stop();
            video.unsetListener();
            Main.previousPage();
            break;
        }
        case tvKeyCode.MediaStop: {
            Main.playerHideLoading();
            distroPlayingMacro = false
            skipIntroOnn = false;
            clickedSkipIntro = false
            ShakaPlayer.pause();
            ShakaPlayer.stopInterval();
            analytics.plugin.handlePlayEndedByUser()
            Main.myRecoApi(myReco);
            ShakaPlayer.kill();
            // Check if a style element with a specific ID exists
            var existingStyle = document.getElementById('subtitle-style');
            // If it exists, remove it
            if (existingStyle) {
                existingStyle.remove();
            }
            Main.previousPage();
            break;
        }
        case tvKeyCode.VideoPause: {
            if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                ShakaPlayer.pause();
            }
            break;
        }
        case tvKeyCode.MediaPause: {
            if (presentPagedetails.constrolsShow == false) {
                ShakaPlayer.showPlayerDetails();
            }
            if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                Yup('.imageFocus').removeClass('player_play');
                Yup('.imageFocus').addClass('player_pause');
                ShakaPlayer.pause();
            }
            break;
        }
        case tvKeyCode.MediaFastForward: {
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
            ShakaPlayer.seekTo('next', 'MediaFastForward');
            break;
        }
        case tvKeyCode.MediaRewind:
        case tvKeyCode.MediaBackward: {
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
            ShakaPlayer.seekTo('prev', 'MediaRewind');
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (adsManager && adsManager.isAdPlaying) {
                var curSource = Yup('.imageFocus').attr('source');

                // from back → go to play/pause
                if (curSource === 'ad-back') {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#ad-playerBtn').addClass('imageFocus');
                }
                // you could also move from skip → play/pause if required
                return;
            }
            if (nextVideoPreview == true) {
                return;
            }
            if (presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block' && Yup(".playSugestions").css("display") != 'block') {
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
            ShakaPlayer.clearControls();
            // else if(Yup("#video_quality").css("display") !='block' && Yup("#subtitles_main").css("display") !='block'){
            //     ShakaPlayer.showPlayerDetails();
            // }
            if (source == "nextVideo_preview") {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup("#playerBtn").addClass('imageFocus');
            }
            else if (source == "skipintro") {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup("#playerBtn").addClass('imageFocus');
            }
            else if (source == "icon" || source == "playstartbtn") {
                if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#playerBtn").addClass("imageFocus");
                }
                else if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block') {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#skipintro").addClass("imageFocus");
                }
                else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup("#playerBtn").addClass('imageFocus');
                }
            }

            else if (source == "bitrate") {
                var splitData = id.split('-');
                if (Yup("#bitrate-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus").length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#bitrate-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
            }
            else if (source == "subtitles") {
                var splitData = id.split('-');
                if (splitData[1] == 0 && Yup("#subtitles-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#subtitles-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
                else if (Yup("#subtitles-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#subtitles-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                }
                else if (Yup("#audio-0").length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#audio-0").addClass('imageFocus');
                }
            }
            else if (source == "audio") {
                var splitData = id.split('-');
                if (Yup("#audio-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#audio-" + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                    var keys = Object.keys(presentPagedetails.AudioTracks)
                    if ((parseInt(splitData[1]) + 1) > 6 && (parseInt(splitData[1]) + 1) <= keys.length - 1) {
                        Yup('#audio-' + ((splitData[1] - 6))).css('display', 'none');
                    }
                }
            }
            else if (source == "player_icon" || source == "seekbar-live") {
                if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
                    return
                }
                if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
                    // if(nextVideoPreview == false && presentPagedetails.nextVideoDetails.length != 0 && Player.playerState != "paused" && nextVideoBack == false){                 
                    //     Yup("#next_video").addClass("imageFocus");
                    // }else{
                    ShakaPlayer.showSuggsnControls();
                    if (presentPagedetails.isCaptionsEnable == true) {
                        if (keyHandlar.isHD) {
                            Yup(".captions_data").css('bottom', '273px')
                        }
                        else {
                            Yup(".captions_data").css('bottom', '410px')
                        }
                    }
                    if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0]) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-0-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                    }
                    else if (presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[0] && presentPagedetails.sections[0].sectionData && presentPagedetails.sections[0].sectionData.data) {
                        var idToMatch = presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.id;

                        var sectionDataList = [];

                        if (
                            presentPagedetails &&
                            presentPagedetails.sections &&
                            presentPagedetails.sections[0] &&
                            presentPagedetails.sections[0].sectionData &&
                            presentPagedetails.sections[0].sectionData.data
                        ) {
                            sectionDataList = presentPagedetails.sections[0].sectionData.data;
                        }
                        var itemMatched = false
                        for (var i = 0; i < sectionDataList.length; i++) {
                            var item = sectionDataList[i];
                            var targetId =
                                item &&
                                item.target &&
                                item.target.pageAttributes &&
                                item.target.pageAttributes.id;
                            if (targetId == idToMatch) {
                                itemMatched = true
                                if (i <= 27) {
                                    Yup("#section-" + (presentPagedetails.sections.length - 1)).show();
                                    Yup(".imageFocus").removeClass("imageFocus");
                                    Yup("#sectionItem-" + (presentPagedetails.sections.length - 1) + "-" + i).addClass("imageFocus");
                                    var focusedCard = Yup(".imageFocus");

                                    if (focusedCard.length > 0) {
                                        var card = focusedCard.closest(".section-card");

                                        var cardIndex = card.index(".section-card");

                                        var cardWidth = card.outerWidth(true); // includes margin
                                        if (cardIndex != -1 && cardIndex != 0) {
                                            var newLeft = -(cardWidth * cardIndex);
                                            Yup("#sectionhorizontal-0").css("left", (newLeft + 40) + "px");
                                        }
                                    }
                                    return;
                                }
                                else {
                                    Yup("#section-" + (presentPagedetails.sections.length - 1)).show();
                                    Yup(".imageFocus").removeClass("imageFocus");
                                    Yup("#sectionItem-" + (presentPagedetails.sections.length - 1) + "-0").addClass("imageFocus");
                                }
                            }

                        }
                        if (itemMatched == false) {
                            Yup("#section-" + (presentPagedetails.sections.length - 1)).show();
                            Yup(".imageFocus").removeClass("imageFocus");
                            Yup("#sectionItem-" + (presentPagedetails.sections.length - 1) + "-0").addClass("imageFocus");
                        }

                    } else {
                        Yup("#section-" + (presentPagedetails.sections.length - 1)).show();
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup("#sectionItem-" + (presentPagedetails.sections.length - 1) + "-0").addClass("imageFocus");
                    }

                }
            }
            else if (source == 'nextVideo_preview') { //nextVideo_preview
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#seekbar").addClass("imageFocus");
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        // if(nextVideoPreview == true ){
        //     return;
        // }
        case 10009: {
            if (Yup('#video_quality').css("display") == 'block') {
                Yup('#video_quality').hide();
                Yup("#player_setting.default").css("display", "");
                Yup("#player_setting.focused").css("display", "");
                ShakaPlayer.showControls();
                Yup("#btn-4").addClass("imageFocus");
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
            if (Yup('#subtitles_main').css("display") == 'block') {
                Yup('#subtitles_main').hide();
                Yup("#Subtitlesbtn.default").css("display", "");
                Yup("#Subtitlesbtn.focused").css("display", "");
                ShakaPlayer.showControls();
                Yup("#btn-1").addClass("imageFocus");
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
            else if (presentPagedetails.constrolsShow == false && nextVideoPreview == false && !adsManager.isAdPlaying) {

                var nextVideoElement = document.getElementById("nextVideo_bottom_id");
                if (nextVideoElement) nextVideoElement.remove();
                var watchCreditsElement = document.getElementById("watch_credits_bottom_id");
                if (watchCreditsElement) watchCreditsElement.remove();
                Main.playerHideLoading();
                try {
                    media.pause();
                    media.stop();
                    media.unsetListener();
                }
                catch (e) { }
                ShakaPlayer.stopInterval();
                analytics.plugin.handlePlayEndedByUser()
                pauseTimer();
                Main.myRecoApi(myReco);
                if (presentPagedetails.steamResponse.streams.length > 0) {
                    distroPlayingMacro = false
                    skipIntroOnn = false;
                    clickedSkipIntro = false
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
                }
                console.log("KeyBoardBackButton", myReco)
                Main.ctVideoStopFunction()
                // localStorage.removeItem("selectedvidIndex");
                if (backData.length > 0 && (presentPagedetails.navigationFrom == 'tvshowDetails' || presentPagedetails.navigationFrom == "seasonsDetails" || presentPagedetails.navigationFrom == "movieDetails")) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (presentPagedetails.navigationFrom == 'tvshowDetails') {
                            if (backData[i].view === "tvshowDetails") {
                                backData.splice(i, 1);
                            }
                        }
                        else if (presentPagedetails.navigationFrom == 'seasonsDetails') {
                            if (backData[i].view === "seasonsDetails") {
                                backData.splice(i, 1);
                            }
                        }
                        else if (presentPagedetails.navigationFrom == 'movieDetails') {
                            if (backData[i].view === "movieDetails") {
                                backData.splice(i, 1);
                            }
                        }
                    }
                    Main.apiCall(playerToDetails.targetPath)
                }
                else {
                    var previousBackPage = []
                    previousBackPage = backData
                    if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && backData[0].view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && previousBackPage[previousBackPage.length - 1].view == "plansUpgrade") {
                        var pasha = []
                        pasha = backData
                        var playerToDetails = pasha[pasha.length - 1];
                        for (var i = backData.length - 1; i >= 0; i--) {
                            if (presentPagedetails.navigationFrom == 'plansUpgrade') {
                                if (backData[i].view === "plansUpgrade") {
                                    backData.splice(i, 1);
                                }
                            }
                        }
                        Main.previousPage();
                    }
                    else {
                        Main.previousPage();
                    }
                }
                // localStorage.removeItem("selectedvidIndex");
                localStorage.removeItem("clicked-menu")
            }
            else if (presentPagedetails.constrolsShow == true && nextVideoPreview == false && !adsManager.isAdPlaying) {
                ShakaPlayer.hidePlayerDetails();
                // ShakaPlayer.clearControls();

            }
            else {
                var nextVideoElement = document.getElementById("nextVideo_bottom_id");
                if (nextVideoElement) nextVideoElement.remove();
                var watchCreditsElement = document.getElementById("watch_credits_bottom_id");
                if (watchCreditsElement) watchCreditsElement.remove();
                Main.playerHideLoading();
                try {
                    media.pause();
                    media.stop();
                    media.unsetListener();
                }
                catch (e) { }
                ShakaPlayer.stopInterval();
                analytics.plugin.handlePlayEndedByUser()
                pauseTimer();
                Main.myRecoApi(myReco);
                if (presentPagedetails.steamResponse.streams.length > 0) {
                    distroPlayingMacro = false
                    skipIntroOnn = false;
                    clickedSkipIntro = false
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
                }
                console.log("KeyBoardBackButton", myReco)
                Main.ctVideoStopFunction()
                // localStorage.removeItem("selectedvidIndex");
                if (backData.length > 0 && (presentPagedetails.navigationFrom == 'tvshowDetails' || presentPagedetails.navigationFrom == "seasonsDetails" || presentPagedetails.navigationFrom == "movieDetails")) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (presentPagedetails.navigationFrom == 'tvshowDetails') {
                            if (backData[i].view === "tvshowDetails") {
                                backData.splice(i, 1);
                            }
                        }
                        else if (presentPagedetails.navigationFrom == 'seasonsDetails') {
                            if (backData[i].view === "seasonsDetails") {
                                backData.splice(i, 1);
                            }
                        }
                        else if (presentPagedetails.navigationFrom == 'movieDetails') {
                            if (backData[i].view === "movieDetails") {
                                backData.splice(i, 1);
                            }
                        }
                    }
                    Main.apiCall(playerToDetails.targetPath)
                }
                else {
                    var previousBackPage = []
                    previousBackPage = backData
                    if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && backData[0].view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && previousBackPage[previousBackPage.length - 1].view == "plansUpgrade") {
                        var pasha = []
                        pasha = backData
                        var playerToDetails = pasha[pasha.length - 1];
                        for (var i = backData.length - 1; i >= 0; i--) {
                            if (presentPagedetails.navigationFrom == 'plansUpgrade') {
                                if (backData[i].view === "plansUpgrade") {
                                    backData.splice(i, 1);
                                }
                            }
                        }
                        Main.previousPage();
                    }
                    else {
                        Main.previousPage();
                    }
                }
                // localStorage.removeItem("selectedvidIndex");
                localStorage.removeItem("clicked-menu")
            }
            break;
        }
        case 461: {
            if (Yup('#video_quality').css("display") == 'block') {
                Yup('#video_quality').hide();
                Yup("#player_setting.default").css("display", "");
                Yup("#player_setting.focused").css("display", "");
                ShakaPlayer.showControls();
                Yup("#btn-4").addClass("imageFocus");
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
            if (Yup('#subtitles_main').css("display") == 'block') {
                Yup('#subtitles_main').hide();
                Yup("#Subtitlesbtn.default").css("display", "");
                Yup("#Subtitlesbtn.focused").css("display", "");
                ShakaPlayer.showControls();
                Yup("#btn-1").addClass("imageFocus");
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
            else if (presentPagedetails.constrolsShow == false && nextVideoPreview == false && !adsManager.isAdPlaying) {
                ShakaPlayer.showControls();
                if (presentPagedetails.isCaptionsEnable == true) {
                    if (keyHandlar.isHD) {
                        Yup(".captions_data").css('bottom', '132px')
                    }
                    else {
                        Yup(".captions_data").css('bottom', '200px')
                    }
                }
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#playerBtn").addClass("imageFocus");
                return;
            }
            else {
                var nextVideoElement = document.getElementById("nextVideo_bottom_id");
                if (nextVideoElement) nextVideoElement.remove();
                var watchCreditsElement = document.getElementById("watch_credits_bottom_id");
                if (watchCreditsElement) watchCreditsElement.remove();
                Main.playerHideLoading();
                try {
                    media.pause();
                    media.stop();
                    media.unsetListener();
                }
                catch (e) { }
                ShakaPlayer.stopInterval();
                analytics.plugin.handlePlayEndedByUser()
                pauseTimer();
                Main.myRecoApi(myReco);
                if (presentPagedetails.steamResponse.streams.length > 0) {
                    distroPlayingMacro = false
                    skipIntroOnn = false;
                    clickedSkipIntro = false
                    try {
                        var video = document.getElementById('video');
                        if (video) {
                            video.pause();
                            video.removeAttribute('src');
                            video.load();
                        }
                    } catch (e) { }
                    ShakaPlayer.kill();
                    //           // Check if a style element with a specific ID exists
                    var existingStyle = document.getElementById('subtitle-style');
                    // If it exists, remove it
                    if (existingStyle) {
                        existingStyle.remove();
                    }
                }
                console.log("KeyBoardBackButton", myReco)
                Main.ctVideoStopFunction()
                // localStorage.removeItem("selectedvidIndex");
                if (backData.length > 0 && (presentPagedetails.navigationFrom == 'tvshowDetails' || presentPagedetails.navigationFrom == "seasonsDetails")) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (presentPagedetails.navigationFrom == 'tvshowDetails') {
                            if (backData[i].view === "tvshowDetails") {
                                backData.splice(i, 1);
                            }
                        }
                        else if (presentPagedetails.navigationFrom == 'seasonsDetails') {
                            if (backData[i].view === "seasonsDetails") {
                                backData.splice(i, 1);
                            }
                        }
                    }
                    Main.apiCall(playerToDetails.targetPath)
                }
                else {
                    var previousBackPage = []
                    previousBackPage = backData
                    if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && backData[0].view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else if (presentPagedetails.navigationFrom == "plansUpgrade" && backData && backData[0] && previousBackPage[previousBackPage.length - 1].view == "plansUpgrade") {
                        var pasha = []
                        pasha = backData
                        var playerToDetails = pasha[pasha.length - 1];
                        for (var i = backData.length - 1; i >= 0; i--) {
                            if (presentPagedetails.navigationFrom == 'plansUpgrade') {
                                if (backData[i].view === "plansUpgrade") {
                                    backData.splice(i, 1);
                                }
                            }
                        }
                        Main.previousPage();
                    }
                    else {
                        Main.previousPage();
                    }
                }
                // localStorage.removeItem("selectedvidIndex");
                localStorage.removeItem("clicked-menu")
            }
            break;
        }
        default: {
            break;
        }
    }
}
keyHandlar.menuKeyEnterHandular = function (id) {
    backData = [];
    if (presentPagedetails) {
        presentPagedetails.isSideMenuClick = true;
    }
    var targetPath = Yup('#' + id).attr("targetpath");
    if (id != 'menu-profile' && (!userDetails && targetPath !== "favourites" && targetPath !== "settings")) {
        Yup("#mainContent").html('');
    }
    var data = utilities.getMenusData(data);
    presentPagedetails.menusList = data
    var targetPath = Yup('#' + id).attr("targetpath");
    localStorage.setItem('clicked-menu', (Yup('#' + id).text()));
    var dynamicTabName = targetPath;
    var autoSelectedSubTab = "";
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].targetPath === targetPath || data[i].code === targetPath) {
                dynamicTabName = data[i].displayText || data[i].title || targetPath;
                if (data[i].subMenus && data[i].subMenus.length > 0) {
                    autoSelectedSubTab = data[i].subMenus[0].displayText || data[i].subMenus[0].title || data[i].subMenus[0].targetPath;
                }
                break;
            }
            if (data[i].subMenus && data[i].subMenus.length > 0) {
                for (var j = 0; j < data[i].subMenus.length; j++) {
                    if (data[i].subMenus[j].targetPath === targetPath || data[i].subMenus[j].code === targetPath) {
                        dynamicTabName = data[i].subMenus[j].displayText || data[i].subMenus[j].title || targetPath;
                        autoSelectedSubTab = dynamicTabName;
                        break;
                    }
                }
            }
        }
    }
    ctEvent.tabName = dynamicTabName;
    ctEvent.currentTabName = dynamicTabName;
    ctEvent.subtabName = "";
    clevertapservice.sendCleverTapEvent('tab viewed', { 'tab': targetPath })
    clevertapservice.sendCleverTapEvent('hamburger menu', {
        'category': ctEvent.tabName
    })
    Main.sidebarClose();
    var userDetails = localStorage.getItem("userDetails");
    if (targetPath == 'profile selection' && switchProfilesOption != false) {
        //clevertapProfilepage appeared event
        profilesPageAppeared.profilesPageAppearedSource = 'profile selection'
        profilesPageAppeared.profilesPagePageName = 'profile selection'
        clevertapservice.profilePageEvent();
        var currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
        localStorage.setItem("currentUserDetails", JSON.stringify(currentUserDetails));
        view = "switchProfile";
        Main.processNext();
    }
    else if (userDetails || (!userDetails && targetPath !== "favourites" && targetPath !== "settings" && targetPath !== 'signIn')) {
        Yup(".menu-item.menu-active").removeClass("menu-active");
        Yup('.top-menu-active').removeClass('top-menu-active');
        Yup('#' + id).addClass("menu-active");
        Yup(".imageFocus").removeClass("imageFocus");
    }
    else {
        comingToSign = true;
    }

    if (id != 'menu-0') {
        if (userDetails || (!userDetails && targetPath !== "favourites" && targetPath !== "settings")) {
            presentPagedetails.menusEnterd = [];
            presentPagedetails.menusEnterd.push(id);
        }
        else {
            comingToSign = true;
        }

    }
    if (targetPath != 'settings' && targetPath != 'profile selection' && targetPath != 'introPage' && targetPath != "search" && targetPath != 'signIn') {
        // var clickedMenuIndex = Yup('#' + id).attr("index");
        commingFromMenus = true;
        // presentPagedetails.pageReload = true;
        // clickedMenu = presentPagedetails.menusList[clickedMenuIndex];
        // clickedMenu['index'] = clickedMenuIndex;
        var userDetails = localStorage.getItem("userDetails");
        if (targetPath == 'favourites' && !userDetails) {
            localStorage.setItem('selected_targetSign', targetPath);
            //clevertapProfilepage appeared event
            profilesPageAppeared.profilesPageAppearedSource = "my bingelist"
            profilesPageAppeared.profilesPagePageName = 'number submission'
            view = 'signin'
            Main.processNext();
        }
        else {
            if (targetPath === 'favourites') {
                Yup('#mainContent').empty();
            }
            Main.apiCall(targetPath);
        }
        if (targetPath != "favourites" && targetPath != "search" && targetPath != "signIn") {
            card_lazy_preview();
        }
    }
    else if (targetPath == "search") {
        view = 'search';
        Main.processNext(id);
    }
    else if (targetPath == 'settings') {
        //clevertapProfilepage appeared event
        profilesPageAppeared.profilesPageAppearedSource = "settings"
        profilesPageAppeared.profilesPagePageName = 'number submission'
        view = "accountDetails";
        Main.processNext();
    }
    // else if (targetPath == 'introPageView') {
    //     view = "introPageView";
    //     Main.processNext();
    // }
    else if (targetPath == 'signIn') {
        var clickedMenuIndex = Yup('#' + id).attr("index");
        var splitData = id.split('-');
        clevertapservice.sendCleverTapEvent('registration page viewed', {
            'tab': ctEvent.tabName,
            'source': ctEvent.tabName,
            'source details': "",
            'content name': "",
            'content partner name': "",
            'content model': "",
            'content tag': "",
            'content type': ""
        })
        // ctEvent.tabName="",
        localStorage.removeItem('selected_targetSign');
        //clevertapProfilepage appeared event
        profilesPageAppeared.profilesPageAppearedSource = "profile selection"
        profilesPageAppeared.profilesPagePageName = 'number submission'
        view = "signin";
        Main.processNext();
    }
}

keyHandlar.menuActiveHandular = function () {
    if (typeof Main !== "undefined" && typeof Main.addActiveMenu === "function") {
        Main.addActiveMenu();
    }
}

function add_program_name_behaviour(program, program_text) {
    if (program.outerWidth() <= program_text.outerWidth()) {
        program_text.addClass('namescroll')
        program.attr('title', program_text.text())
    }
}

function new_title_persistance() {
    var time_inner_left = Yup('.tvGuideTimeInner').css('left');
    var time_inner_left_milliseconds;
    if (Yup(window).width() == 1920) {
        time_inner_left_milliseconds = ((Math.abs(parseInt(time_inner_left.split('px')[0])) * 1800000) / 320);
    }
    if (Yup(window).width() == 1280) {
        time_inner_left_milliseconds = ((Math.abs(parseInt(time_inner_left.split('px')[0])) * 1800000) / 215);
    }
    for (var i = 0; i < persistanceData.length; i++) {
        var programId = persistanceData[i]['channelPrograms-' + i];
        var program_end_time = Yup('#' + programId).attr('endtime');
        var program_start_time = Yup('#' + programId).attr('starttime');
        var margin_in_milliseconds = ((presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) - program_start_time)
        if (parseInt(program_end_time) > presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) {
            var margin_in_px;
            if (Yup(window).width() == 1920) {
                margin_in_px = (320 * margin_in_milliseconds) / 1800000;
            }
            if (Yup(window).width() == 1280) {
                margin_in_px = (215 * margin_in_milliseconds) / 1800000;
            }
            Yup('#' + programId).children('.programText').css('margin-left', (margin_in_px) + 'px');
        }
        else {
            var element = persistanceData[i]['channelPrograms-' + i];
            element = element.split('-')
            var program_no = parseInt(element[2]);
            while (parseInt(Yup('#channelProgramsItem-' + element[1] + '-' + program_no).attr('endtime')) < presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) {
                program_no += 1;
            }
            var new_program_start_time = Yup('#channelProgramsItem-' + element[1] + '-' + program_no).attr('starttime')
            var margin_in_milliseconds = ((presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) - new_program_start_time);
            var margin_in_px;
            if (Yup(window).width() == 1920) {
                margin_in_px = (320 * margin_in_milliseconds) / 1800000;
            }
            if (Yup(window).width() == 1280) {
                margin_in_px = (215 * margin_in_milliseconds) / 1800000;
            }
            Yup('#channelProgramsItem-' + element[1] + '-' + program_no).children('.programText').css('margin-left', (margin_in_px) + 'px');
            persistanceData[i]['channelPrograms-' + i] = 'channelProgramsItem-' + element[1] + '-' + program_no
        }
    }
}

function new_remove_title_persistance() {
    var time_inner_left = Yup('.tvGuideTimeInner').css('left');
    var time_inner_left_milliseconds;
    if (Yup(window).width() == 1920) {
        time_inner_left_milliseconds = ((Math.abs(parseInt(time_inner_left.split('px')[0])) * 1800000) / 320);
    }
    if (Yup(window).width() == 1280) {
        time_inner_left_milliseconds = ((Math.abs(parseInt(time_inner_left.split('px')[0])) * 1800000) / 215);
    }
    for (var i = 0; i < persistanceData.length; i++) {
        var programId = persistanceData[i]['channelPrograms-' + i];
        var splIds = programId.split('-');
        var program_no = parseInt(splIds[2]);
        while (
            parseInt(Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).attr('starttime')) >= presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds ||
            parseInt(Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).attr('starttime')) < presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds
        ) {
            if (parseInt(Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).attr('starttime')) < presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) {
                var program_start_time = Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).attr('starttime')
                var margin_in_milliseconds = ((presentPagedetails.selectedDate.startTime + time_inner_left_milliseconds) - program_start_time);
                var margin_in_px;
                if (Yup(window).width() == 1920) {
                    margin_in_px = (320 * margin_in_milliseconds) / 1800000;
                }
                if (Yup(window).width() == 1280) {
                    margin_in_px = (215 * margin_in_milliseconds) / 1800000;
                }
                Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).children('.programText').css('margin-left', (margin_in_px) + 'px');
                break;
            }
            else {
                Yup('#channelProgramsItem-' + splIds[1] + '-' + program_no).children('.programText').css('margin-left', '0px');
                program_no -= 1;
            }
        }
        if (program_no < 0) program_no = 0;
        persistanceData[i]['channelPrograms-' + i] = 'channelProgramsItem-' + splIds[1] + '-' + program_no;
    }
}


keyHandlar.tvguideKeyHandular = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowUp: {
            if (source == 'tvguideTabs') {
                Yup(".imageFocus").removeClass("imageFocus");
                if (presentPagedetails.menuIndex >= 0) {
                    Yup("#menu-" + presentPagedetails.menuIndex).addClass("imageFocus");
                } else {
                    Yup("#menu-2").addClass("imageFocus");
                    keyHandlar.addMenuKeyIndex(0);
                }
            }
            else if (source == 'tvguideTimes') {
                Yup(".imageFocus").removeClass("imageFocus");
                if (presentPagedetails.sectionIndex && (presentPagedetails.sectionIndex[0] >= 0)) {
                    Yup("#tabItem-" + presentPagedetails.sectionIndex[0]).addClass("imageFocus");
                } else {
                    Yup(".tabItem.active").addClass("imageFocus");
                }
            }
            else if (source == 'tvguideProgram') {
                var spliIds = id.split("-");
                if (parseInt(spliIds[1]) == 0) {
                    if (presentPagedetails.activeTimeslot >= 0) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        Yup(".namescroll").removeClass("namescroll");
                        Yup("#timeItem-" + presentPagedetails.activeTimeslot).addClass("imageFocus");
                    } else {
                        for (var i = 0; i < 47; i++) {
                            var x = Yup("#timeItem-" + i).offset();
                            if ((parseInt(x.left) + parseInt(window.scrollX)) > 830) {
                                Yup(".imageFocus").removeClass("imageFocus");
                                Yup(".namescroll").removeClass("namescroll");
                                Yup("#timeItem-" + i).addClass("imageFocus");
                                break;
                            }
                        }
                    }
                } else {
                    var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (parseInt(presentPagedetails.activeTimeslot) * 1800000);
                    var endTime = startTime + 1800000;
                    var spliIds = id.split("-");
                    var channelProgramDetails = presentPagedetails.paginationSectionsData[(parseInt(spliIds[1]) - 1)].programs;

                    for (i = 0; i < channelProgramDetails.length; i++) {
                        var programStartTime = channelProgramDetails[i].target.pageAttributes.startTime;
                        var programEndTime = channelProgramDetails[i].target.pageAttributes.endTime;
                        if ((startTime >= parseInt(programStartTime) && endTime <= parseInt(programEndTime)) || (startTime <= parseInt(programStartTime) && endTime >= parseInt(programEndTime)) || ((startTime < parseInt(programStartTime)) && (endTime > parseInt(programEndTime))) || ((startTime > parseInt(programStartTime)) && (startTime < parseInt(programEndTime)))) {
                            Yup(".namescroll").removeClass("namescroll")
                            Yup(".imageFocus").removeClass("imageFocus");
                            var Focused_program = Yup("#channelProgramsItem-" + (parseInt(spliIds[1]) - 1) + '-' + i)
                            Focused_program.addClass("imageFocus");
                            var Program_text = Yup(".imageFocus").children(".programText")
                            add_program_name_behaviour(Focused_program, Program_text)
                            // Yup("#channelProgramsItem-"+(parseInt(spliIds[1])-1)+'-'+i ).addClass("imageFocus");
                            break;
                        }
                    }
                }
                if ((parseInt(spliIds[1]) - 5) >= 0) {
                    Yup("#channelRow-" + (parseInt(spliIds[1]) - 5)).show();
                }
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == "menus") {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == 'tvguideTabs') {
                if (presentPagedetails.activeTimeslot >= 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#timeItem-" + presentPagedetails.activeTimeslot).addClass("imageFocus");
                } else {
                    for (var i = 0; i < 47; i++) {
                        var x = Yup("#timeItem-" + i).offset();
                        if (Yup(window).width() == 1920) {
                            if ((parseInt(x.left) + parseInt(window.scrollX)) > 830) {
                                Yup(".imageFocus").removeClass("imageFocus");
                                Yup("#timeItem-" + i).addClass("imageFocus");
                                presentPagedetails.activeTimeslot = i;
                                break;
                            }
                        }
                        if (keyHandlar.isHD) {
                            if ((parseInt(x.left) + parseInt(window.scrollX)) > 560) {
                                Yup(".imageFocus").removeClass("imageFocus");
                                Yup("#timeItem-" + i).addClass("imageFocus");
                                presentPagedetails.activeTimeslot = i;
                                break;
                            }
                        }
                    }
                }

            }
            else if (source == 'tvguideTimes') {
                var spliIds = id.split("-");
                var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (parseInt(spliIds[1]) * 1800000);
                var endTime = startTime + 1800000;
                presentPagedetails.activeTimeslot = parseInt(spliIds[1]);
                var firstChannelProgramDetails = presentPagedetails.paginationSectionsData[0].programs;
                for (var i = 0; i < firstChannelProgramDetails.length; i++) {
                    var programStartTime = firstChannelProgramDetails[i].target.pageAttributes.startTime;
                    var programEndTime = firstChannelProgramDetails[i].target.pageAttributes.endTime
                    if ((startTime >= parseInt(programStartTime) && endTime <= parseInt(programEndTime)) || (startTime <= parseInt(programStartTime) && endTime >= parseInt(programEndTime)) || ((startTime < parseInt(programStartTime)) && (endTime > parseInt(programEndTime))) || ((startTime > parseInt(programStartTime)) && (startTime < parseInt(programEndTime)))) {
                        Yup(".imageFocus").removeClass("imageFocus");
                        var Focused_program = Yup("#channelProgramsItem-0-" + i);
                        Focused_program.addClass("imageFocus");
                        var Program_text = Yup(".imageFocus").children(".programText")
                        add_program_name_behaviour(Focused_program, Program_text)
                        break;
                    }
                }
            }
            else if (source == 'tvguideProgram') {
                var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (parseInt(presentPagedetails.activeTimeslot) * 1800000);
                var endTime = startTime + 1800000;
                var spliIds = id.split("-");
                if ((parseInt(spliIds[1]) + 1) < presentPagedetails.paginationSectionsData.length) {
                    var channelProgramDetails = presentPagedetails.paginationSectionsData[(parseInt(spliIds[1]) + 1)].programs;
                    for (i = 0; i < channelProgramDetails.length; i++) {
                        var programStartTime = channelProgramDetails[i].target.pageAttributes.startTime;
                        var programEndTime = channelProgramDetails[i].target.pageAttributes.endTime
                        if ((startTime >= parseInt(programStartTime) && endTime <= parseInt(programEndTime)) || (startTime <= parseInt(programStartTime) && endTime >= parseInt(programEndTime)) || ((startTime < parseInt(programStartTime)) && (endTime > parseInt(programEndTime))) || ((startTime > parseInt(programStartTime)) && (startTime < parseInt(programEndTime)))) {
                            Yup(".namescroll").removeClass("namescroll");
                            Yup(".imageFocus").removeClass("imageFocus");
                            var Focused_program = Yup("#channelProgramsItem-" + (parseInt(spliIds[1]) + 1) + '-' + i)
                            Focused_program.addClass("imageFocus");
                            var Program_text = Yup(".imageFocus").children(".programText")
                            add_program_name_behaviour(Focused_program, Program_text)
                            break;
                        }
                    }
                }
                if (((parseInt(spliIds[1]) + 1) == presentPagedetails.paginationSectionsData.length - 1) && presentPagedetails.paginationSections.length > 0) {
                    //tvguide pagination hit
                    presentPagedetails.paginationHitHappening = presentPagedetails.paginationSectionsData.length;
                    Main.getTvguideData(presentPagedetails.paginationSections.slice(0, 6));
                    presentPagedetails.paginationSections = presentPagedetails.paginationSections.slice(6, presentPagedetails.paginationSections.length);

                }
                if ((parseInt(spliIds[1])) >= 5 && presentPagedetails.paginationSectionsData.length > 6 && (parseInt(spliIds[1]) != (presentPagedetails.paginationSectionsData.length - 1))) {
                    Yup("#channelRow-" + (parseInt(spliIds[1]) - 5)).hide();
                }
            }
            break;
        }
        case tvKeyCode.ArrowLeft: {
            if (source == "menus" || source == 'search') {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == 'tvguideTabs') {
                var spliIds = id.split("-");
                var totalLength = Yup('#' + id).attr("totalLength");
                if (parseInt(spliIds[1]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tabItem-" + (parseInt(spliIds[1]) - 1)).addClass("imageFocus");
                    if (parseInt(spliIds[1]) <= (totalLength - 6)) {
                        Yup("#tabItem-" + (parseInt(spliIds[1]) - 2)).show();
                    }
                    keyHandlar.addSectionKeyIndex(0, (parseInt(spliIds[1]) - 1));
                }
            }
            else if (source == 'tvguideTimes') {
                var resolution = Yup(window).width()
                var spliIds = id.split("-");
                if (parseInt(spliIds[1]) != 0) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#timeItem-" + (parseInt(spliIds[1]) - 1)).addClass("imageFocus");
                    presentPagedetails.activeTimeslot = (parseInt(spliIds[1]) - 1);
                    var i = parseInt(spliIds[1]) - 1;
                    var existingleftValue;
                    if (i <= 2) {
                        existingleftValue = 0
                    }
                    else if (i >= 45) {
                        if (resolution == 1920) {
                            existingleftValue = (43 * (-320))
                        }
                        if (resolution == 1280) {
                            existingleftValue = (43 * (-215))
                        }
                    }
                    else if (i != keyHandlar.getMiddleTime()) {
                        if (resolution == 1920) {
                            existingleftValue = ((i - 2) * (-320))
                        }
                        if (resolution == 1280) {
                            existingleftValue = ((i - 2) * (-215))
                        }
                    }
                    Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                    Yup('.channelPrograms').css("left", existingleftValue + 'px');
                    //  add_title_persistance(existingleftValue)
                    new_remove_title_persistance();
                    if (1 == 1) keyHandlar.positonliveTag();
                }

            }
            else if (source == 'tvguideProgram') {
                clearTimeout(persistanceSubscribe);
                var resolution = Yup(window).width()
                var spliIds = id.split("-");
                if (Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) - 1)).attr("id") != undefined) {
                    Yup(".namescroll").removeClass("namescroll")
                    Yup(".imageFocus").removeClass("imageFocus");
                    var Focused_program = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) - 1))
                    Focused_program.addClass("imageFocus");
                    var Program_text = Yup(".imageFocus").children(".programText")
                    add_program_name_behaviour(Focused_program, Program_text)
                    // Yup(".imageFocus").removeClass("imageFocus");
                    // Yup("#channelProgramsItem-"+(parseInt(spliIds[1]))+'-'+(parseInt(spliIds[2])-1) ).addClass("imageFocus");
                }

                var programStartTime = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) - 1)).attr("starttime");
                var programEndTime = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) - 1)).attr("endtime");
                for (var i = 0; i < 47; i++) {
                    var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (i * 1800000);
                    var endTime = startTime + 1800000;
                    if ((startTime >= parseInt(programStartTime) && endTime <= parseInt(programEndTime)) || (startTime <= parseInt(programStartTime) && endTime >= parseInt(programEndTime)) || ((startTime < parseInt(programStartTime)) && (endTime > parseInt(programEndTime))) || ((startTime > parseInt(programStartTime)) && (startTime < parseInt(programEndTime)))) {
                        var existingleftValue;
                        if (i <= 2) {
                            existingleftValue = 0
                        }
                        else if (i >= 45 || programEndTime >= (parseInt(presentPagedetails.selectedDate.endTime) - (2 * 1800000))) {
                            if (resolution == 1920) {
                                existingleftValue = (43 * (-320))
                            }
                            if (resolution == 1280) {
                                existingleftValue = (43 * (-215))
                            }
                        }
                        else if (i != keyHandlar.getMiddleTime()) {
                            if (resolution == 1920) {
                                existingleftValue = ((i - 2) * (-320))
                            }
                            if (resolution == 1280) {
                                existingleftValue = ((i - 2) * (-215))
                            }
                        }
                        Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                        Yup('.channelPrograms').css("left", existingleftValue + 'px');
                        new_remove_title_persistance();
                        presentPagedetails.activeTimeslot = i;
                        break;
                    }
                }
                if (1 == 1) keyHandlar.positonliveTag();

            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == "menus" || source == 'search') {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == 'tvguideTabs') {
                var spliIds = id.split("-");
                var totalLength = Yup('#' + id).attr("totalLength");
                if (parseInt(spliIds[1]) < (totalLength - 1)) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#tabItem-" + (parseInt(spliIds[1]) + 1)).addClass("imageFocus");
                    if (parseInt(spliIds[1]) >= 6) {
                        Yup("#tabItem-" + (parseInt(spliIds[1]) - 6)).hide();
                    }
                    keyHandlar.addSectionKeyIndex(0, (parseInt(spliIds[1]) + 1));
                }
            }
            else if (source == 'tvguideTimes') {
                var resolution = Yup(window).width()
                var spliIds = id.split("-");
                if (parseInt(spliIds[1]) != 47) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#timeItem-" + (parseInt(spliIds[1]) + 1)).addClass("imageFocus");
                    presentPagedetails.activeTimeslot = (parseInt(spliIds[1]) + 1);
                    var i = parseInt(spliIds[1]) + 1;
                    var existingleftValue;
                    if (i <= 2) {
                        existingleftValue = 0
                    }
                    else if (i >= 45) {
                        if (resolution == 1920) {
                            existingleftValue = (43 * (-320))
                        }
                        if (resolution == 1280) {
                            existingleftValue = (43 * (-215))
                        }

                    }
                    else if (i != keyHandlar.getMiddleTime()) {
                        if (resolution == 1920) {
                            existingleftValue = ((i - 2) * (-320))
                        }
                        if (resolution == 1280) {
                            existingleftValue = ((i - 2) * (-215))
                        }
                    }
                    var exValue = Yup('.tvGuideTimeInner').css("left");
                    exValue = exValue.replace('px', '');
                    if (parseInt(exValue) != (43 * (-320)) || parseInt(exValue) != (43 * (-215))) {
                        Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                        Yup('.channelPrograms').css("left", existingleftValue + 'px');
                        // add_title_persistance(existingleftValue);
                        new_title_persistance();
                    }
                    if (1 == 1) keyHandlar.positonliveTag();

                }
            }
            else if (source == 'tvguideProgram') {
                var spliIds = id.split("-");
                var resolution = Yup(window).width();
                if (Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) + 1)).attr("id") != undefined) {
                    Yup(".namescroll").removeClass("namescroll")
                    Yup(".imageFocus").removeClass("imageFocus");
                    var Focused_program = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) + 1))
                    Focused_program.addClass("imageFocus");
                    var Program_text = Yup(".imageFocus").children(".programText")
                    add_program_name_behaviour(Focused_program, Program_text)
                    // Yup(".imageFocus").removeClass("imageFocus");
                    // Yup("#channelProgramsItem-"+(parseInt(spliIds[1]))+'-'+(parseInt(spliIds[2])+1) ).addClass("imageFocus");

                    var programStartTime = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) + 1)).attr("starttime");
                    var programEndTime = Yup("#channelProgramsItem-" + (parseInt(spliIds[1])) + '-' + (parseInt(spliIds[2]) + 1)).attr("endtime");
                    for (var i = 0; i < 47; i++) {
                        var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (i * 1800000);
                        var endTime = startTime + 1800000;
                        if ((startTime >= parseInt(programStartTime) && endTime <= parseInt(programEndTime)) || (startTime <= parseInt(programStartTime) && endTime >= parseInt(programEndTime)) || ((startTime < parseInt(programStartTime)) && (endTime > parseInt(programEndTime))) || ((startTime > parseInt(programStartTime)) && (startTime < parseInt(programEndTime)))) {
                            var existingleftValue;
                            if (i <= 2) {
                                existingleftValue = 0
                            }
                            else if (i >= 45 || programEndTime >= (parseInt(presentPagedetails.selectedDate.endTime) - (2 * 1800000))) {
                                if (resolution == 1920) {
                                    existingleftValue = (43 * (-320))
                                }
                                if (resolution == 1280) {
                                    existingleftValue = (43 * (-215))
                                }
                            }
                            else if (i != keyHandlar.getMiddleTime()) {
                                if (resolution == 1920) {
                                    existingleftValue = ((i - 2) * (-320))
                                }
                                if (resolution == 1280) {
                                    existingleftValue = ((i - 2) * (-215))
                                }
                            }
                            Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                            Yup('.channelPrograms').css("left", existingleftValue + 'px');
                            // add_title_persistance(existingleftValue)
                            new_title_persistance()
                            presentPagedetails.activeTimeslot = i;
                            break;
                        }
                        else if (programEndTime == parseInt(presentPagedetails.selectedDate.endTime)) {
                            var existingleftValue;
                            if (resolution == 1920) {
                                existingleftValue = (43 * (-320))
                            }
                            if (resolution == 1280) {
                                existingleftValue = (43 * (-215))
                            }
                            Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                            Yup('.channelPrograms').css("left", existingleftValue + 'px');
                            presentPagedetails.activeTimeslot = 47;
                        }

                    }
                    if (1 == 1) keyHandlar.positonliveTag();

                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            Main.previousPage();
            break;
        }
        case 461: {
            Main.previousPage();
            break;
        }
        case tvKeyCode.Enter: {
            if (source == "menus" || source == 'search') {
                keyHandlar.menuKeyHandular(id, event);
            }
            else if (source == "tvguideProgram") {
                if (Yup('#' + id).attr("target") != "" && Yup('#' + id).attr("target") != undefined && Yup('#' + id).attr("target") != null) {
                    keyHandlar.contentEnterHandlar(id, source);
                }
            }
            else {
                keyHandlar.tvguideEnterKeyHandular(id, source);
            }
            break;
        }
        default: {
            break;
        }
    }
}

keyHandlar.tvguideEnterKeyHandular = function (id, source) {
    if (source == 'tvguideTabs') {
        //get datewise data
        Yup(".tabItem.active").removeClass("active");
        Yup("#" + id).addClass("active");
        presentPagedetails.activeTimeslot = undefined;
        presentPagedetails.paginationSections = [];
        presentPagedetails.paginationSectionsData = [];
        persistanceData = [];
        var startTime = Yup('#' + id).attr("startTime");
        var endTime = Yup('#' + id).attr("endTime");
        var presentDate = new Date().getTime();
        presentPagedetails.selectedDate = {
            "endTime": parseInt(endTime),
            "startTime": parseInt(startTime),
            "isToday": (parseInt(startTime) <= presentDate && parseInt(endTime) >= presentDate) ? true : false
        }

        Yup('.tvGuideTimeInner').css("left", '0px');
        Yup('.channelPrograms').css("left", '0px');
        if (presentPagedetails.tvGuideChannelsData.data.length > 0) {
            for (var i = 0; i < presentPagedetails.tvGuideChannelsData.data.length; i++) {
                presentPagedetails.paginationSections.push(presentPagedetails.tvGuideChannelsData.data[i].id);
            }
            Yup(".tvGuideChannels").html("");
            Main.getTvguideData(presentPagedetails.paginationSections.slice(0, 6));
            presentPagedetails.paginationSections = presentPagedetails.paginationSections.slice(6, presentPagedetails.paginationSections.length);

        }
    }
}

keyHandlar.getMiddleTime = function () {
    for (var i = 0; i < 47; i++) {
        var x = Yup("#timeItem-" + i).offset();
        if ((parseInt(x.left) + parseInt(window.scrollX)) > 830) {
            return i;
        }
    }
}

keyHandlar.navigateLiveBar = function () {
    if (Yup('.tvGuideTimeInner').css("left") == '0px') {
        var resolution = Yup(window).width()
        var presentDate = new Date().getTime();
        for (var i = 0; i < 47; i++) {
            var startTime = parseInt(presentPagedetails.selectedDate.startTime) + (i * 1800000);
            var endTime = startTime + 1800000;
            if (startTime <= presentDate && endTime >= presentDate) {
                var existingleftValue;
                if (i <= 2) {
                    existingleftValue = 0
                }
                else if (i >= 45 || endTime >= (parseInt(presentPagedetails.selectedDate.endTime) - (2 * 1800000))) {
                    if (resolution == 1920) {
                        existingleftValue = (43 * (-320))
                    }
                    if (resolution == 1280) {
                        existingleftValue = (43 * (-215))
                    }
                }
                else if (i != keyHandlar.getMiddleTime()) {
                    if (resolution == 1920) {
                        existingleftValue = ((i - 2) * (-320))
                    }
                    if (resolution == 1280) {
                        existingleftValue = ((i - 2) * (-215))
                    }
                }
                Yup('.tvGuideTimeInner').css("left", existingleftValue + 'px');
                Yup('.channelPrograms').css("left", existingleftValue + 'px');
                presentPagedetails.activeTimeslot = i;
                keyHandlar.positonliveTag();
                keyHandlar.initLiveSubscribe();
                // add_title_persistance(existingleftValue)
                new_title_persistance();
                return;
            }
        }
    }
}

keyHandlar.positonliveTag = function () {
    var resolution = Yup(window).width();
    if ((presentPagedetails.selectedDate == undefined || presentPagedetails.selectedDate.isToday == undefined || presentPagedetails.selectedDate.isToday == false) && !!liveSubscribe) {
        clearInterval(liveSubscribe);
    }
    if (presentPagedetails.selectedDate != undefined && presentPagedetails.selectedDate.isToday == true) {
        Yup('.liveTag').show();
        var existingLeft = Yup('.tvGuideTimeInner').css("left");
        existingLeft = existingLeft.replace('px', '')
        //        var timeDIff = parseInt(existingLeft) - ( (  (parseInt(presentPagedetails.selectedDate.startTime) - (new Date().getTime())) /1000 ) / 5.625)  ; 
        var timeDIff;
        if (resolution == 1920) {
            //5.625 is the calculated value from width of the 30 min program in 1920 is 320px and 30min=1800sec then 1800/320 is 5.625
            timeDIff = parseInt(existingLeft) - (((parseInt(presentPagedetails.selectedDate.startTime) - (new Date().getTime())) / 1000) / 5.625);
        }
        // 8.372093023255814 is the calculated value width of the 30 min program in 1280 is 215px and 30min=1800sec then 1800/215 is  8.372093023255814
        if (resolution == 1280) {
            timeDIff = parseInt(existingLeft) - (((parseInt(presentPagedetails.selectedDate.startTime) - (new Date().getTime())) / 1000) / 8.372093023255814);
        }
        Yup('.liveTag').css("left", timeDIff + 'px');
    }
}

keyHandlar.initLiveSubscribe = function () {
    liveSubscribe = setInterval(function () { keyHandlar.positonliveTag() }, 5000);
}


keyHandlar.hideLiveTag = function () {
    Yup('.liveTag').hide();
}

//template key handular
keyHandlar.templateKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.btnFocus').attr("source");
    var id = Yup('.btnFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (source === 'tempBtns') {
                if (parseInt(splitData[1]) === 0 && Yup("#tempbtn-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup(".btnFocus").removeClass("btnFocus");
                    Yup("#tempbtn-" + (parseInt(splitData[1]) + 1)).addClass("btnFocus");
                } else if (presentPagedetails.templateData.templateCode === "TV_Suspended_popup") {
                    console.log("arrowDown");
                }
            }

            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (source == 'tempBtns') {
                if (parseInt(splitData[1]) > 0 && Yup("#tempbtn-" + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup(".btnFocus").removeClass("btnFocus");
                    Yup("#tempbtn-" + (parseInt(splitData[1]) - 1)).addClass("btnFocus");
                }
                else if (presentPagedetails.templateData.templateCode === "TV_Suspended_popup") {
                    console.log("arrowUp")
                }
            }

            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (presentPagedetails.templateData.templateCode) {
                if (presentPagedetails.templateData.templateCode == "deeplink_info") {
                    if (TemplateTimeoutId) {
                        clearTimeout(TemplateTimeoutId);
                    }
                    var myobj = document.getElementById("contentTemp");
                    myobj.remove();
                    presentPagedetails.templateData = {};
                }
                else {
                    var myobj = document.getElementById("contentTemp");
                    myobj.remove();
                    presentPagedetails.templateData = {};
                }
            }
            break;
        }
        case 461: {
            if (presentPagedetails.templateData.templateCode) {
                if (presentPagedetails.templateData.templateCode == "deeplink_info") {
                    if (TemplateTimeoutId) {
                        clearTimeout(TemplateTimeoutId);
                    }
                    var myobj = document.getElementById("contentTemp");
                    myobj.remove();
                    presentPagedetails.templateData = {};
                }
                else {
                    var myobj = document.getElementById("contentTemp");
                    myobj.remove();
                    presentPagedetails.templateData = {};
                }
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.templateEnterHandlar(id);
            break;
        }
        default: {
            break;
        }
    }
}

//template Enter Key Handular
keyHandlar.templateEnterHandlar = function (id) {
    var btnType = Yup('#' + id).attr("btnType");
    var btnname = Yup('#' + id).attr("btnName");
    var source = Yup('#' + id).attr("source");
    var template = Yup('#' + id).attr("template");
    // var targetPath =  Yup('#'+id).attr("targetpath");
    if (source == 'tempBtns') {
        if (template == "next_episode_subscription_overlay") {
            keyHandlar.stopPreviewTrailers();
            var btnTemplate = Yup('#' + id).attr("btnTemplate");
            if (!!btnTemplate) {
                for (var i = 0; i < templateList.length; i++) {
                    if (btnTemplate == templateList[i].code) {
                        templateCodeInfo = templateList[i];
                        break;
                    }
                }
                templateCodename = btnTemplate
                var myobj = document.getElementById("contentTemp");
                if (!!myobj) {
                    myobj.remove();
                }
                presentPagedetails.templateData = {};
                var targetPath = Yup('.imageFocus').attr("targetpath");
                Main.getTemplateData(templateCodename, targetPath)
            }
            else {
                var targetPath = Yup('#' + id).attr("targetpath");
                // view = "plansUpgrade"
                var subscriptionNextEpiOverlayClicked = true
                var userDetails = JSON.parse(localStorage.getItem('userDetails'));
                if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "SECONDARY") {
                    Main.addToPlansPostPaid("subscription overlay", "", targetPath);
                }
                else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userStatus.toUpperCase() == "SUSPENDED") {
                    Main.addToPlansPostPaid("subscription overlay", "", targetPath);
                }
                else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "COCP") {
                    Main.addToPlansPostPaid("subscription overlay", "", targetPath);
                }
                else if (userDetails && userDetails.userCategory == 2) {
                    Main.addToPlansPostPaid("subscription overlay", "", targetPath);
                }
                else {
                    Main.addToPlansPostPaid("subscription overlay", "", targetPath);
                }
                var myobj = document.getElementById("contentTemp");
                if (!!myobj) {
                    myobj.remove();
                }
                presentPagedetails.templateData = {};
            }
        }
        else if (btnType == 'signin') {
            view = "introPageView";
            Main.processNext();
        }
        else if (btnname == "Ok") {
            Main.ctDammyPopupEvent(id, "button clicked", btnname)
            var myobj = document.getElementById("contentTemp");
            myobj.remove();
            presentPagedetails.templateData = {};
        }
        else if (btnType == 'watchnow') {
            keyHandlar.contentEnterHandlar(id, btnType);
            presentPagedetails.templateData = {};
        } else if (btnType == 'watchlive') {
            // Calculate Live Program
            //keyHandlar.getCurrentTimeProgram();
            keyHandlar.contentEnterHandlar(id, btnType);
        }
        else if (btnType == "CANCEL") {
            var detailsText = Yup('#' + id).text();
            if (detailsText == "CANCEL") {
                if (TemplateTimeoutId) {
                    clearTimeout(TemplateTimeoutId);
                }
                Main.ctDammyPopupEvent(id, "button clicked", detailsText)

            }
            var myobj = document.getElementById("contentTemp");
            if (!!myobj) {
                myobj.remove();
            }
            presentPagedetails.templateData = {};
        }
        else if (btnType == "PROCEED") {
            var detailsText = Yup('#' + id).text();
            if (detailsText == "PROCEED") {
                if (TemplateTimeoutId) {
                    clearTimeout(TemplateTimeoutId);
                }
                Main.ctDammyPopupEvent(id, "button clicked", detailsText)
                var watchnowTarget = Yup('#' + id).attr("targetpath");
                var myobj = document.getElementById("contentTemp");
                if (!!myobj) {
                    myobj.remove();
                }
                presentPagedetails.templateData = {};
                Main.contentPatner(watchnowTarget)
            }
            else if (detailsText == "GOT IT") {
                Main.ctDammyPopupEvent(id, "button clicked", detailsText)
                var myobj = document.getElementById("contentTemp");
                if (!!myobj) {
                    myobj.remove();
                }
                presentPagedetails.templateData = {};
            }
        }
        else if (btnType == 'close') {
            var templateSource = Yup('#' + presentPagedetails.templateData.lastClickedCardId).attr("source");
            var detailsText = Yup('#' + id).text();
            var splitData = id.split('-');
            if (detailsText == "CANCEL") {
                if (TemplateTimeoutId) {
                    clearTimeout(TemplateTimeoutId);
                }
            }
            Main.ctDammyPopupEvent(id, "button clicked", detailsText)
            var myobj = document.getElementById("contentTemp");
            myobj.remove();
            presentPagedetails.templateData = {};
        }

        else if (btnType == 'subscribe') { // if it is subscribe button
            if (Main.userProfile.userStatus) {
                view = "noPackageView";
                Main.processNext();
            } else {  // not loggoed in
                view = 'signin';
                Main.processNext();
            }
            var myobj = document.getElementById("contentTemp");
            if (!!myobj) {
                myobj.remove();
            }
            presentPagedetails.templateData = {};
        }
        else if (btnname == presentPagedetails.templateData.btnname) {
            Main.ctDammyPopupEvent(id, "button clicked", detailsText)
            var myobj = document.getElementById("contentTemp");
            myobj.remove();
            presentPagedetails.templateData = {};
        }
        else if (btnType == 'favourite') {
            if (Main.userProfile.userStatus) {
                for (var i = 0; i < presentPagedetails.templateData.tembutns.length; i++) {
                    var tar;
                    if (presentPagedetails.templateData.tembutns[i].name == "favourite" && presentPagedetails.templateData.tembutns[i].displayCondition == 'true') {
                        if (presentPagedetails.templateData.tembutns[i].data == "Add to Favourite") {
                            //add from fav
                            // presentPagedetails.templateData.tembutns[i].data = "Remove Favourite";
                            tar = presentPagedetails.templateData.tembutns[i].target;
                            Main.addToFav(tar, 1, id);
                            // Yup('#' + id).text("Remove Favourite");
                            Yup('.toastmsg_template').html('Added to Bingelist')
                            Yup('.toastmsg_template').css('display', 'block');
                            setTimeout(function () {
                                Yup('.toastmsg_template').css('display', 'none');
                            }, 1000);
                            break;
                        }
                        else {
                            //remove to fav
                            var targetPath = Yup('#' + id).attr("targetpath");
                            tar = targetPath
                            presentPagedetails.templateData.tembutns[i].data = "Add to Favourite";
                            Main.addToFav(tar, 2, id);
                            Yup('.toastmsg_template').html('Removed from Bingelist')
                            Yup('.toastmsg_template').css('display', 'block');
                            setTimeout(function () {
                                Yup('.toastmsg_template').css('display', 'none');
                            }, 1000);
                            if (presentPagedetails.view != 'list') {
                                setTimeout(function () {
                                    Main.apiCall('favourites')
                                }, 1000);
                            }
                            else {
                                setTimeout(function () {
                                    Main.apiCall(presentPagedetails.targetPath)
                                }, 1000);
                            }
                            // Yup('#' + id).text("Add to Favourite");

                            var myobj = document.getElementById("contentTemp");
                            myobj.remove();
                            presentPagedetails.templateData = {};
                            if (presentPagedetails.clickedCard && presentPagedetails.clickedCard != '' && presentPagedetails.clickedCard != undefined) {
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup("#" + presentPagedetails.clickedCard).addClass('imageFocus');
                            }
                            else {
                                Yup('.imageFocus').removeClass('imageFocus');
                                Yup('#sectionItem-0-0').addClass('imageFocus');
                            }
                            // Yup('#' + id).text("Add to Favourite");
                            Yup('.toastmsg_template').html('Removed from Bingelist')
                            Yup('.toastmsg_template').css('display', 'block');

                            // setTimeout(function() {
                            //     Yup('.toastmsg_template').css('display', 'none');
                            //     }, 1000);
                            break;
                        }
                    }
                }
            }
            else {
                Main.popupData = {
                    popuptype: 'info',
                    message: 'Please Login to Add Favorites',
                    buttonCount: 1,
                    yesText: 'Sign In',
                    yesTarget: 'gotosignin',
                    onBack: 'close'
                }
                Yup("#popUpFDFS").html(Util.showPopup());
                Yup("#popup-btn-1").addClass('popupFocus');

            }
        }
        else {
            keyHandlar.contentEnterHandlar(id, btnType);
            if (presentPagedetails.targetPath != "favourites") {
                Main.hideMenu();
            }
        }
    }
}

//Passcode KeyHandler
keyHandlar.PasscodeKeyhandler = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    switch (keycode) {
        case tvKeyCode.ArrowUp: {
            if (source == 'passcodeBtn') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#Passcodenum").addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == 'passcodeBtnView') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#signUpBtn1").addClass("imageFocus");
            }
            break;
        }

        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (tokenSubscribe != undefined || tokenSubscribe != null)
                clearInterval(tokenSubscribe);
            Main.previousPage();
            break;
        }
        case 461: {
            if (tokenSubscribe != undefined || tokenSubscribe != null)
                clearInterval(tokenSubscribe);
            Main.previousPage();
            break;
        }
        case tvKeyCode.Enter: {

            if (source == 'passcodeBtn') {

                if (1 == 1) Main.getActivateDeviceAPI(true);
                // if()
                if (1 == 1) {
                    Yup(".imageFocus").removeClass("imageFocus");
                    Yup("#Passcodenum").addClass("imageFocus");
                }
                break;
            }
            break;

        }
        default: {
            break;
        }
    }
}

keyHandlar.streamPinformkeyHandlar = function (e) {
    var keycode = (window.event) ? e.keyCode : e.which;
    var source = Yup('.imageFocus').attr("source");
    var index = parseInt(Yup('.imageFocus').attr("index"));
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == 'keyPadNumaric') {
                if (index != 1) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index - 1)).addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (index == 13) index = 12;
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#numeric-' + (index)).addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowUp: {
            if (source == 'keyPadNumaric') {
                if (index > 3) {
                    if (index == 11) { index = 9 }
                    else (index = index - 3)
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (index == 12) index = 10;
                if (index == 13) index = 11;
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#numeric-' + (index)).addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            if (source == 'keyPadNumaric') {
                if (index < 12) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index + 1)).addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                if (index == 12) index = 13;
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#numeric-' + (index)).addClass("imageFocus");
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            if (source == 'keyPadNumaric') {
                if (index < 10) {
                    if (index == 9) { index = 11; }
                    else if (index == 7 || index == 8) { index = 10; }
                    else { index = index + 3; }
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-' + (index)).addClass("imageFocus");
                } else {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#numeric-13').addClass("imageFocus");
                }
            } else if (source == 'actionKey') {
                break;
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (ShakaPlayer.playerState == "paused") {
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
                //sectionItem-0-0
                if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] >= 0) {
                    Yup('#sectionItem-0-' + presentPagedetails.sectionIndex[0]).addClass('imageFocus');
                }
                else {
                    Yup('#sectionItem-0-0').addClass('imageFocus');
                }
            }
            else {
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
                Main.previousPage();
            }
            break;
        }
        case 461: {
            if (ShakaPlayer.playerState == "paused") {
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
                //sectionItem-0-0
                if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] >= 0) {
                    Yup('#sectionItem-0-' + presentPagedetails.sectionIndex[0]).addClass('imageFocus');
                }
                else {
                    Yup('#sectionItem-0-0').addClass('imageFocus');
                }
            }
            else {
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
                Main.previousPage();
            }
            break;
        }
        case tvKeyCode.Enter: {
            keyHandlar.streamPinformEnterkeyHandlar(e);
            break;
        }
        default: {
            break;
        }
    }
}

keyHandlar.streamPinformEnterkeyHandlar = function (e) {
    var source = Yup('.imageFocus').attr("source");
    var index = parseInt(Yup('.imageFocus').attr("index"));
    if (source == 'keyPadNumaric') {
        if (index <= 10) {
            if (Yup(".input-active").val().length < 4) {
                Yup(".input-active").val(Yup(".input-active").val() + Yup("#numeric-" + index).text());
            }
            if (Yup(".input-active").val().length == 4) {
                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#numeric-13').addClass("imageFocus");
                var pin = Yup('.input-active').val();
                Main.getStream(presentPagedetails.res, presentPagedetails.responseArray, pin);
            }
        }
        else if (index == 11) { //  Delete
            Yup('.input-active').val(Yup('.input-active').val().substring(0, Yup('.input-active').val().length - 1));
        }
    }
    else if (source == 'actionKey') {
        if (index == 12) { //clicked on cancle
            if (ShakaPlayer.playerState == "paused") {
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
                if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[0] >= 0) {
                    Yup('#sectionItem-0-' + presentPagedetails.sectionIndex[0]).addClass('imageFocus');
                }
                else {
                    Yup('#sectionItem-0-0').addClass('imageFocus');
                }
                return;
            }
            else {
                presentPagedetails = {};
                Yup('#popUpFDFS').html('');
                Main.popupData = undefined;
            }
            Main.previousPage();
        }
        else if (index == 13) { 	//adding focus to Password
            if (view == 'player') {
                var pin = Yup('.input-active').val();
                if (pin.length == 4) {
                    Main.getStream(presentPagedetails.res, presentPagedetails.responseArray, pin);
                }
                else {
                    Yup(".Invalidpin").css('display', 'block');
                    setTimeout(function () {
                        Yup(".Invalidpin").css('display', 'none')
                    }, 5000);
                }
            }
        }
    }
}
// autoBanner
function BannerMove() {
    var bannerScrollTime = systemConfigs && systemConfigs.configs && systemConfigs.configs.bannersautoscrolltime ? systemConfigs.configs.bannersautoscrolltime : "5000";
    if (bannerScrollTime == 0) {
        return;
    }
    if (!!bannerScrollListner) { clearInterval(bannerScrollListner) }
    bannerScrollListner = setInterval(function () {
        if (typeof isSidemenuOpened !== 'undefined' && isSidemenuOpened) return;
        var source = Yup('.imageFocus').attr("source");
        if (source == "bannerBtn") {
            e = tvKeyCode.ArrowRight;
            Main.eventGenerate(e);
        }
        else if (source == 'menus' && view != 'search') {
            var active_banner = Yup('.active-banner').attr("id");
            var splIds = active_banner.split('-');
            var bannerBtn = document.getElementById('bannerBtn-' + (parseInt(splIds[1]) + 1));
            if (bannerBtn) {
                var bannerImage = document.getElementById('bannerImage-' + (parseInt(splIds[1]) + 1));
                if (bannerImage) {
                    if (Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).length > 0) {
                        if (Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).length > 0) {
                            Yup('.active-banner').removeClass('active-banner');
                            Yup('#bannerImage-' + splIds[1]).css('display', 'none');
                            Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#WatchBannerBtn-' + parseInt(splIds[1])).css('display', 'none');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            // Yup('#WatchBannerBtn-' + parseInt(splIds[1])).removeClass('imageFocus');
                            // Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('imageFocus');
                            Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                            Yup('#partner-logo-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]))).css('display', 'none');
                            // Yup('#bannerTitle-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('active-banner');
                            keyHandlar.addBannerCurrSection((parseInt(splIds[1]) + 1))
                        }
                    }
                }
            }
            else if (parseInt(splIds[1]) == (presentPagedetails.bannersLength - 1)) {
                Yup('.active-banner').removeClass('active-banner');
                Yup('#bannerImg-' + splIds[1]).css('display', 'none');
                Yup('#bannerImg-0').css('display', 'block');
                Yup('#bannerBtn-0').addClass('active-banner');
                keyHandlar.addBannerCurrSection(0)
            }
        }
        else {
            clearInterval(bannerScrollListner)
        }
    }, bannerScrollTime);
}

//history of current_section focus
keyHandlar.addCurrentSection = function (v_index) {
    presentPagedetails.currentSection = v_index
}
keyHandlar.addBannerCurrSection = function (v_index) {
    presentPagedetails.bannerCurrSection = v_index
}
keyHandlar.addPreviousLanguage = function (id) {
    presentPagedetails.previousLanguage = id
}
keyHandlar.plansKeyhandler = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.imageFocus').attr("id");
    var type = Yup('.imageFocus').attr("btntype");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var splitData = id.split('-');
            if (currentSlideIndex > 0 && Yup('#package_item-' + (parseInt(splitData[1]) - 1)).length > 0) {
                currentSlideIndex--;
                var slideWidth = Yup('.package_item').outerWidth(true);
                var newPosition = -(currentSlideIndex * slideWidth);

                Yup('.package_row').css({
                    transition: 'transform 0.5s ease',
                    transform: 'translateX(' + newPosition + 'px)'
                });

                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#package_item-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                clevertapservice.sendCleverTapEvent('subscription page appeared', {
                    'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
                    'page name': 'postpaid confirmation',
                    'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.packages[0].salePrice : "",
                    'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.master.name ? presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.master.name : ""
                })
            }
            break;
        }

        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            var totalCards = Yup('.package_item').length;
            var maxVisibleCards = 1;
            var maxIndex = totalCards - maxVisibleCards;

            if (currentSlideIndex < maxIndex && Yup('#package_item-' + (parseInt(splitData[1]) + 1)).length > 0) {
                currentSlideIndex++;
                var slideWidth = Yup('.package_item').outerWidth(true);
                var newPosition = -(currentSlideIndex * slideWidth);

                Yup('.package_row').css({
                    transition: 'transform 0.5s ease',
                    transform: 'translateX(' + newPosition + 'px)'
                });

                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#package_item-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                clevertapservice.sendCleverTapEvent('subscription page appeared', {
                    'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
                    'page name': 'postpaid confirmation',
                    'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.packages[0].salePrice : "",
                    'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.master.name ? presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.master.name : ""
                })
            }

            break;
        }
        case tvKeyCode.Enter: {
            var splitData = id.split('-');
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                     var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if ((backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") && !clickedCardForPostPaid) {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        if (type == "success") {
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                            localStorage.removeItem('clickedCardForPostPaid');
                        }
                        else {
                            Main.previousPage();
                        }

                    }
                    else if (playerToDetails.view === "content" || playerToDetails.view === "list" || playerToDetails.view === "seasonsDetails" || playerToDetails.view === "list") {
                       if (type == "success") {
                            var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                           if (clickedCardForPostPaid && clickedCardForPostPaid.indexOf("plans/list") !== -1) {
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                            localStorage.removeItem('clickedCardForPostPaid');
                            }
                            else{
                            Main.apiCall(clickedCardForPostPaid, function () {
                            Main.getUserInfo(true);
                            backData = [];
                            localStorage.removeItem('clickedCardForPostPaid');
                            });
                            }
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                    else {
                        if (playerToDetails.view == "switchProfile") {
                            if (type == "success") {
                                var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                                Main.apiCall(clickedCardForPostPaid)
                                Main.getUserInfo(true);
                                localStorage.removeItem('clickedCardForPostPaid');
                            }
                            else {
                                Main.apiCall(firstMenu)
                                localStorage.removeItem('clickedCardForPostPaid');
                            }
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (splitData[0] == "package_item") {
                var itemIdx = parseInt(splitData[1]);
                var packData = null;
                if (presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[itemIdx]) {
                    packData = presentPagedetails.response.packages[itemIdx];
                } else if (presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[itemIdx]) {
                    packData = presentPagedetails.response.packages[itemIdx];
                }

                var isDxlJuspay = false;
                if (packData && packData.supportedGateway && packData.supportedGateway[0] && packData.supportedGateway[0].code == "dxl_juspay") {
                    isDxlJuspay = true;
                }

                if (isDxlJuspay) {
                    // Step 1: Find the target sub-package object dynamically from the clicked package's sub-packages list.
                    // We loop through the packages array to find the first valid package option.
                    var targetPackage = null;
                    if (packData && packData.packageInfo && packData.packageInfo.packages) {
                        for (var k = 0; k < packData.packageInfo.packages.length; k++) {
                            if (packData.packageInfo.packages[k]) {
                                targetPackage = packData.packageInfo.packages[k];
                                break; // Found the package, stop the loop.
                            }
                        }
                    }

                    // Step 2: Extract the key 'tv_qr_code_plans_page_elements' which contains the layout configuration.
                    var encryptedData = targetPackage && targetPackage.features && targetPackage.features.tv_qr_code_plans_page_elements;
                    var upiData = null;

                    if (encryptedData) {
                        try {
                            var decryptedString;
                            // Check if the data is a URL-encoded string (starts with %7B or contains %).
                            // If yes, decode it; if no, decrypt it using the utility function.
                            if (typeof encryptedData === "string" && (encryptedData.indexOf("%7B") === 0 || encryptedData.indexOf("%22") === 0 || encryptedData.includes("%"))) {
                                decryptedString = decodeURIComponent(encryptedData);
                            } else {
                                decryptedString = utilities.decryptData(encryptedData);
                            }
                            // Parse the decoded/decrypted string to a JSON object.
                            upiData = JSON.parse(decryptedString);
                        } catch (e) {
                            console.error("Error decrypting/parsing tv_qr_code_plans_page_elements:", e);
                            // Fallback 1: Try parsing the raw string directly as JSON.
                            try {
                                upiData = JSON.parse(encryptedData);
                            } catch (err) {
                                // Fallback 2: Try decoding and parsing as a last resort.
                                try {
                                    upiData = JSON.parse(decodeURIComponent(encryptedData));
                                } catch (err2) {
                                    console.error("All fallback parsing methods failed:", err2);
                                }
                            }
                        }
                    }

                    var upiPrice = "";
                    if (upiData && upiData.price !== undefined && upiData.price !== null) {
                        upiPrice = upiData.price;
                    } else if (upiData && upiData.salePrice !== undefined && upiData.salePrice !== null) {
                        upiPrice = upiData.salePrice;
                    } else if (targetPackage && targetPackage.salePrice !== undefined && targetPackage.salePrice !== null) {
                        upiPrice = targetPackage.salePrice;
                    }

                    // Step 3: Populate the popupData object, using the parsed JSON properties with fallback defaults.
                    var popupData = {
                        planName: (upiData && (upiData.planName || upiData.plan_name || upiData.name)) || (packData.packageInfo && packData.packageInfo.master && packData.packageInfo.master.name) || "",
                        price: upiPrice,
                        features: (upiData && (upiData.benefits || upiData.features || upiData.featureList || upiData.plan_features)) || [],
                        qrUrl: (upiData && (upiData.qrUrl || upiData.qr_url || upiData.qrCode || upiData.qrcode_url)) || "",
                        expiryTimeSeconds: upiData && upiData.expiry_seconds ? upiData.expiry_seconds : 300,
                        orderstatusrefreshseconds: upiData && upiData.order_status_refresh_seconds ? upiData.order_status_refresh_seconds : 5,
                        // Extra dynamic UI labels and configurations from the API response:
                        planSelectedLabel: upiData && upiData.plan_selected_label,
                        informationTitle: upiData && upiData.information_title,
                        qrTitle: upiData && upiData.qr_section && upiData.qr_section.title,
                        qrSubtitle: upiData && upiData.qr_section && upiData.qr_section.subtitle,
                        supportedApps: upiData && upiData.qr_section && upiData.qr_section.supportedApps,
                        baseImageUrl: upiData && upiData.base_image_url,
                        fallbackText: upiData && upiData.qr_section && upiData.qr_section.fallback_text,
                        expiryText: upiData && upiData.qr_section && upiData.qr_section.expiry_text,
                        expiredQrCodeText: upiData && ((upiData.qr_section && upiData.qr_section.expired_qr_code_text) || upiData.expired_qr_code_text),
                        expiredQrCodeImage: upiData && upiData.qr_section && upiData.qr_section.expired_qr_code_image,
                        refreshQrButtonIcon: upiData && upiData.refresh_qr_button_icon,
                        refreshQrButtonTitle: upiData && upiData.refresh_qr_button_title
                    };

                    // Push current plans page to history
                    // presentPagedetails.dom = document.getElementById('mainContent').cloneNode(true);
                    // backData.push(presentPagedetails);

                    Main.popupData = Main.popupData || {};
                    Main.popupData.addBillID = itemIdx;
                    var detailsText = Yup('#' + id).text();
                    Main.directAddPostPaidBillClick(detailsText, popupData);

                    if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                        var sourceDetailsPop = ctEvent.topBanner;
                    } else {
                        var sourceDetailsPop = ctEvent.carouselName;
                    }
                    clevertapservice.sendCleverTapEvent('subscription page clicked', {
                        'page name': 'pro subscription',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'action': popupData.planName,
                        'movies pack price': popupData.price,
                        'pack name': popupData.planName
                    });
                    clevertapservice.sendCleverTapEvent('subscription page appeared', {
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'page name': 'upi payment confirmation',
                        'movies pack price': popupData.price,
                        'pack name': popupData.planName
                    });
                } else {
                    // Yup('.imageFocus').removeClass("imageFocus");
                    var plansData = null;
                    var plansDataV3 = null;

                    try {
                        var rawDataV3 = systemConfigs.configs.tvappPlansPageV3;
                        if (typeof rawDataV3 === "string") {
                            plansDataV3 = JSON.parse(rawDataV3);
                        } else if (typeof rawDataV3 === "object" && rawDataV3 !== null) {
                            plansDataV3 = rawDataV3;
                        }
                    } catch (e) {
                        console.error("Error parsing tvappPlansPageV3:", e);
                    }

                    if (plansDataV3) {
                        plansData = plansDataV3.sdpse;
                    }

                    if (!plansData || !plansData.confirmation_popup) {
                        try {
                            var rawData = systemConfigs.configs.tvappPlansPage;
                            if (typeof rawData === "string") {
                                plansData = JSON.parse(rawData);
                            } else if (typeof rawData === "object" && rawData !== null) {
                                plansData = rawData;
                            } else {
                                plansData = {}; // fallback
                            }
                        } catch (e) {
                            console.error("Error while parsing tvappPlansPage:", e);
                            plansData = {};
                        }
                    }

                    if (plansData) {
                        presentPagedetails.cancelText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel';
                        presentPagedetails.confirmText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm';
                    }
                    Main.popupData = {
                        popuptype: 'addPostpaidBill',
                        message: plansData && plansData.confirmation_popup && plansData.confirmation_popup.title ? plansData.confirmation_popup.title : 'You will be charged in your upcoming postpaid bill.',
                        message2: plansData && plansData.confirmation_popup && plansData.confirmation_popup.description ? plansData.confirmation_popup.description : 'Confirm to start the selected subscription now.',
                        buttonCount: 2,
                        noTarget: 'billClose',
                        noText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel',
                        yesText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm',
                        yesTarget: 'addToBill',
                        onBack: 'close',
                        addBillID: parseInt(splitData[1])

                    }
                    Yup("#popUpFDFS").html(Util.postpaidPlansConfirmation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                        var sourceDetailsPop = ctEvent.topBanner
                    }
                    else {
                        var sourceDetailsPop = ctEvent.carouselName
                    }
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup displayed',
                        'label': 'postpaid confirmation',
                        'popup name': 'postpaid confirmation',
                        'button label': '',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (postPaidPopContentData && postPaidPopContentData.searchSource === "search" ? "search" : "carousel"),
                        'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
                        'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                        'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                        'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                        'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                        'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                        'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                        'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                        'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                        'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                        'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                        'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
                    })

                    clevertapservice.sendCleverTapEvent('subscription page clicked', {
                        'page name': 'pro subscription',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'action': presentPagedetails && presentPagedetails.btnTitle ? presentPagedetails.btnTitle : "Add to Bill",
                        'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
                        'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
                    })
                    clevertapservice.sendCleverTapEvent('subscription page appeared', {
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'page name': 'postpaid confirmation',
                        'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
                        'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
                    })
                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        Main.apiCall(playerToDetails.targetPath , function () {
                        Main.getUserInfo(true);
                        	});
                    }
                   else if (playerToDetails.view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else {
                        Main.previousPage();
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (view == "plansUpgrade") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                if (presentPagedetails && presentPagedetails.comingFromSwitchProfile && presentPagedetails.comingFromSwitchProfile == true) {
                    Main.apiCall(firstMenu);
                }
                else {
                    Main.previousPage();
                }
                currentSlideIndex = 0;
            }
            break;
        }
        case 461: {
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                         Main.apiCall(playerToDetails.targetPath , function () {
                        Main.getUserInfo(true);
                         });
                    }
                   else if (playerToDetails.view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else {
                        Main.previousPage();
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (view == "plansUpgrade") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                if (presentPagedetails && presentPagedetails.comingFromSwitchProfile && presentPagedetails.comingFromSwitchProfile == true) {
                    Main.apiCall(firstMenu);
                }
                else {
                    Main.previousPage();
                }
                currentSlideIndex = 0;
            }
            break;
        }
    }
};

keyHandlar.bannersPlansKeyhandler = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.imageFocus').attr("id");
    var type = Yup('.imageFocus').attr("btntype");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var splitData = id.split('-');
            if (currentSlideIndex > 0 && Yup('#package_item-' + (parseInt(splitData[1]) - 1)).length > 0) {
                currentSlideIndex--;
                var slideWidth = Yup('.package_item').outerWidth(true);
                var newPosition = -(currentSlideIndex * slideWidth);

                Yup('.package_row').css({
                    transition: 'transform 0.5s ease',
                    transform: 'translateX(' + newPosition + 'px)'
                });

                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#package_item-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");
                clevertapservice.sendCleverTapEvent('subscription page appeared', {
                    'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
                    'page name': 'postpaid confirmation',
                    'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.packages[0].salePrice : "",
                    'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.master.name ? presentPagedetails.response.packages[(parseInt(splitData[1]) - 1)].packageInfo.master.name : ""
                })
            }
            break;
        }

        case tvKeyCode.ArrowRight: {
            var splitData = id.split('-');
            var totalCards = Yup('.package_item').length;
            var maxVisibleCards = 1;
            var maxIndex = totalCards - maxVisibleCards;

            if (currentSlideIndex < maxIndex && Yup('#package_item-' + (parseInt(splitData[1]) + 1)).length > 0) {
                currentSlideIndex++;
                var slideWidth = Yup('.package_item').outerWidth(true);
                var newPosition = -(currentSlideIndex * slideWidth);

                Yup('.package_row').css({
                    transition: 'transform 0.5s ease',
                    transform: 'translateX(' + newPosition + 'px)'
                });

                Yup('.imageFocus').removeClass("imageFocus");
                Yup('#package_item-' + (parseInt(splitData[1]) + 1)).addClass("imageFocus");
                clevertapservice.sendCleverTapEvent('subscription page appeared', {
                    'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
                    'page name': 'postpaid confirmation',
                    'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.packages[0].salePrice : "",
                    'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)] && presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.master.name ? presentPagedetails.response.packages[(parseInt(splitData[1]) + 1)].packageInfo.master.name : ""
                })
            }

            break;
        }
        case tvKeyCode.Enter: {
            var splitData = id.split('-');
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        if (type == "success") {
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                        }
                        else {
                            Main.previousPage();
                        }

                    }
                    else if (playerToDetails.view === "content" || playerToDetails.view === "list" || playerToDetails.view === "seasonsDetails" || playerToDetails.view === "list") {
                        if (type == "success") {
                            var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                           if (clickedCardForPostPaid && clickedCardForPostPaid.indexOf("plans/list") !== -1) {
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                            localStorage.removeItem('clickedCardForPostPaid');
                            }
                            else{
                            Main.apiCall(clickedCardForPostPaid, function () {
                            Main.getUserInfo(true);
                            backData = [];
                            localStorage.removeItem('clickedCardForPostPaid');
                            });
                            }
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                    else {
                        if (playerToDetails.view == "switchProfile") {
                            if (type == "success") {
                                var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                                Main.apiCall(clickedCardForPostPaid)
                                Main.getUserInfo(true);
                            }
                            else {
                                Main.apiCall(firstMenu)
                            }
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (splitData[0] == "package_item") {
                var itemIdx = parseInt(splitData[1]);
                var packData = null;
                if (presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[itemIdx]) {
                    packData = presentPagedetails.response.packages[itemIdx];
                } else if (presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[itemIdx]) {
                    packData = presentPagedetails.response.packages[itemIdx];
                }

                var isDxlJuspay = false;
                if (packData && packData.supportedGateway && packData.supportedGateway[0] && packData.supportedGateway[0].code == "dxl_juspay") {
                    isDxlJuspay = true;
                }

                if (isDxlJuspay) {
                    // Step 1: Find the target sub-package object dynamically from the clicked package's sub-packages list.
                    // We loop through the packages array to find the first valid package option.
                    var targetPackage = null;
                    if (packData && packData.packageInfo && packData.packageInfo.packages) {
                        for (var k = 0; k < packData.packageInfo.packages.length; k++) {
                            if (packData.packageInfo.packages[k]) {
                                targetPackage = packData.packageInfo.packages[k];
                                break; // Found the package, stop the loop.
                            }
                        }
                    }

                    // Step 2: Extract the key 'tv_qr_code_plans_page_elements' which contains the layout configuration.
                    var encryptedData = targetPackage && targetPackage.features && targetPackage.features.tv_qr_code_plans_page_elements;
                    var upiData = null;

                    if (encryptedData) {
                        try {
                            var decryptedString;
                            // Check if the data is a URL-encoded string (starts with %7B or contains %).
                            // If yes, decode it; if no, decrypt it using the utility function.
                            if (typeof encryptedData === "string" && (encryptedData.indexOf("%7B") === 0 || encryptedData.indexOf("%22") === 0 || encryptedData.includes("%"))) {
                                decryptedString = decodeURIComponent(encryptedData);
                            } else {
                                decryptedString = utilities.decryptData(encryptedData);
                            }
                            // Parse the decoded/decrypted string to a JSON object.
                            upiData = JSON.parse(decryptedString);
                        } catch (e) {
                            console.error("Error decrypting/parsing tv_qr_code_plans_page_elements:", e);
                            // Fallback 1: Try parsing the raw string directly as JSON.
                            try {
                                upiData = JSON.parse(encryptedData);
                            } catch (err) {
                                // Fallback 2: Try decoding and parsing as a last resort.
                                try {
                                    upiData = JSON.parse(decodeURIComponent(encryptedData));
                                } catch (err2) {
                                    console.error("All fallback parsing methods failed:", err2);
                                }
                            }
                        }
                    }

                    var upiPrice = "";
                    if (upiData && upiData.price !== undefined && upiData.price !== null) {
                        upiPrice = upiData.price;
                    } else if (upiData && upiData.salePrice !== undefined && upiData.salePrice !== null) {
                        upiPrice = upiData.salePrice;
                    } else if (targetPackage && targetPackage.salePrice !== undefined && targetPackage.salePrice !== null) {
                        upiPrice = targetPackage.salePrice;
                    }

                    // Step 3: Populate the popupData object, using the parsed JSON properties with fallback defaults.
                    var popupData = {
                        planName: (upiData && (upiData.planName || upiData.plan_name || upiData.name)) || (packData.packageInfo && packData.packageInfo.master && packData.packageInfo.master.name) || "",
                        price: upiPrice,
                        features: (upiData && (upiData.benefits || upiData.features || upiData.featureList || upiData.plan_features)) || [],
                        qrUrl: (upiData && (upiData.qrUrl || upiData.qr_url || upiData.qrCode || upiData.qrcode_url)) || "",
                        expiryTimeSeconds: upiData && upiData.expiry_seconds ? upiData.expiry_seconds : 300,
                        orderstatusrefreshseconds: upiData && upiData.order_status_refresh_seconds ? upiData.order_status_refresh_seconds : 5,
                        // Extra dynamic UI labels and configurations from the API response:
                        planSelectedLabel: upiData && upiData.plan_selected_label,
                        informationTitle: upiData && upiData.information_title,
                        qrTitle: upiData && upiData.qr_section && upiData.qr_section.title,
                        qrSubtitle: upiData && upiData.qr_section && upiData.qr_section.subtitle,
                        supportedApps: upiData && upiData.qr_section && upiData.qr_section.supportedApps,
                        baseImageUrl: upiData && upiData.base_image_url,
                        fallbackText: upiData && upiData.qr_section && upiData.qr_section.fallback_text,
                        expiryText: upiData && upiData.qr_section && upiData.qr_section.expiry_text,
                        expiredQrCodeText: upiData && ((upiData.qr_section && upiData.qr_section.expired_qr_code_text) || upiData.expired_qr_code_text),
                        expiredQrCodeImage: upiData && upiData.qr_section && upiData.qr_section.expired_qr_code_image,
                        refreshQrButtonIcon: upiData && upiData.refresh_qr_button_icon,
                        refreshQrButtonTitle: upiData && upiData.refresh_qr_button_title
                    };

                    // Push current plans page to history
                    // presentPagedetails.dom = document.getElementById('mainContent').cloneNode(true);
                    // backData.push(presentPagedetails);

                    Main.popupData = Main.popupData || {};
                    Main.popupData.addBillID = itemIdx;
                    var detailsText = Yup('#' + id).text();
                    Main.directAddPostPaidBillClick(detailsText, popupData);

                    if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                        var sourceDetailsPop = ctEvent.topBanner;
                    } else {
                        var sourceDetailsPop = ctEvent.carouselName;
                    }
                    clevertapservice.sendCleverTapEvent('subscription page clicked', {
                        'page name': 'pro subscription',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'action': popupData.planName,
                        'movies pack price': popupData.price,
                        'pack name': popupData.planName
                    });
                    clevertapservice.sendCleverTapEvent('subscription page appeared', {
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'page name': 'upi payment confirmation',
                        'movies pack price': popupData.price,
                        'pack name': popupData.planName
                    });
                } else {
                    // Yup('.imageFocus').removeClass("imageFocus");
                    var plansData = null;
                    var plansDataV3 = null;

                    try {
                        var rawDataV3 = systemConfigs.configs.tvappPlansPageV3;
                        if (typeof rawDataV3 === "string") {
                            plansDataV3 = JSON.parse(rawDataV3);
                        } else if (typeof rawDataV3 === "object" && rawDataV3 !== null) {
                            plansDataV3 = rawDataV3;
                        }
                    } catch (e) {
                        console.error("Error parsing tvappPlansPageV3:", e);
                    }

                    if (plansDataV3) {
                        plansData = plansDataV3.sdpse;
                    }

                    if (!plansData || !plansData.confirmation_popup) {
                        try {
                            var rawData = systemConfigs.configs.tvappPlansPage;
                            if (typeof rawData === "string") {
                                plansData = JSON.parse(rawData);
                            } else if (typeof rawData === "object" && rawData !== null) {
                                plansData = rawData;
                            } else {
                                plansData = {}; // fallback
                            }
                        } catch (e) {
                            console.error("Error while parsing tvappPlansPage:", e);
                            plansData = {};
                        }
                    }

                    if (plansData) {
                        presentPagedetails.cancelText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel';
                        presentPagedetails.confirmText = plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm';
                    }
                    Main.popupData = {
                        popuptype: 'addPostpaidBill',
                        message: plansData && plansData.confirmation_popup && plansData.confirmation_popup.title ? plansData.confirmation_popup.title : 'You will be charged in your upcoming postpaid bill.',
                        message2: plansData && plansData.confirmation_popup && plansData.confirmation_popup.description ? plansData.confirmation_popup.description : 'Confirm to start the selected subscription now.',
                        buttonCount: 2,
                        noTarget: 'billClose',
                        noText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button ? plansData.confirmation_popup.cancel_button : 'Cancel',
                        yesText: plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button ? plansData.confirmation_popup.confirm_button : 'Confirm',
                        yesTarget: 'addToBill',
                        onBack: 'close',
                        addBillID: parseInt(splitData[1])

                    }
                    Yup("#popUpFDFS").html(Util.postpaidPlansConfirmation());
                    Yup("#popup-btn-1").addClass('popupFocus');
                    if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
                        var sourceDetailsPop = ctEvent.topBanner
                    }
                    else {
                        var sourceDetailsPop = ctEvent.carouselName
                    }
                    clevertapservice.sendCleverTapEvent('popup', {
                        'action': 'popup displayed',
                        'label': 'postpaid confirmation',
                        'popup name': 'postpaid confirmation',
                        'button label': '',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (postPaidPopContentData && postPaidPopContentData.searchSource === "search" ? "search" : "carousel"),
                        'source details': sourceDetailsPop && sourceDetailsPop ? sourceDetailsPop : '',
                        'content name': postPaidPopContentData && postPaidPopContentData['content name'] ? postPaidPopContentData['content name'] : "",
                        'content id': postPaidPopContentData && postPaidPopContentData['content id'] ? postPaidPopContentData['content id'] : "",
                        'content language': postPaidPopContentData && postPaidPopContentData['content language'] ? postPaidPopContentData['content language'] : "",
                        'carousel position': ctEvent && ctEvent.carouselPositionn ? ctEvent.carouselPositionn : '',
                        'carousel name': ctEvent && ctEvent.carouselName ? ctEvent.carouselName : '',
                        'content position': ctEvent && ctEvent.contentPositionss ? ctEvent.contentPositionss : '',
                        'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : '',
                        'content model': postPaidPopContentData && postPaidPopContentData['content model'] ? postPaidPopContentData['content model'] : "",
                        'content partner name': postPaidPopContentData && postPaidPopContentData['content partner name'] ? postPaidPopContentData['content partner name'] : "",
                        'content type': postPaidPopContentData && postPaidPopContentData['content type'] ? postPaidPopContentData['content type'] : "",
                        'tv show name': postPaidPopContentData && postPaidPopContentData['tv show name'] ? postPaidPopContentData['tv show name'] : "",
                    })

                    clevertapservice.sendCleverTapEvent('subscription page clicked', {
                        'page name': 'pro subscription',
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'action': presentPagedetails && presentPagedetails.btnTitle ? presentPagedetails.btnTitle : "Add to Bill",
                        'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
                        'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
                    })
                    clevertapservice.sendCleverTapEvent('subscription page appeared', {
                        'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : ""),
                        'page name': 'postpaid confirmation',
                        'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
                        'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
                    })
                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        Main.apiCall(playerToDetails.targetPath)
                        Main.getUserInfo(true);
                    }
                    else if (playerToDetails.view === "content" || playerToDetails.view === "list" || playerToDetails.view === "seasonsDetails" || playerToDetails.view === "list") {
                        if (type == "success") {
                            
                            // var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                   else if (playerToDetails.view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else {
                        Main.previousPage();
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (view == "bannersPlansUpgrade") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                if (presentPagedetails && presentPagedetails.comingFromSwitchProfile && presentPagedetails.comingFromSwitchProfile == true) {
                    Main.apiCall(firstMenu);
                }
                else {
                    Main.previousPage();
                }
                currentSlideIndex = 0;
            }
            break;
        }
        case 461: {
            if (id == "plans_page-0") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                currentSlideIndex = 0;
                if (backData.length > 0) {
                    var pasha = []
                    pasha = backData
                    var playerToDetails = pasha[pasha.length - 1];
                    for (var i = backData.length - 1; i >= 0; i--) {
                        if (backData[i].view === "tvshowDetails" || backData[i].view === "movieDetails" || backData[i].view === "channelDetails") {
                            backData.splice(i, 1);
                        }
                    }
                    if (playerToDetails.view === "tvshowDetails" || playerToDetails.view === "movieDetails" || playerToDetails.view === "channelDetails") {
                        Main.apiCall(playerToDetails.targetPath)
                        Main.getUserInfo(true);
                    }
                     else if (playerToDetails.view === "content" || playerToDetails.view === "list" || playerToDetails.view === "seasonsDetails" || playerToDetails.view === "list") {
                        if (type == "success") {
                            
                            // var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid')
                            Main.apiCall(playerToDetails.targetPath)
                            Main.getUserInfo(true);
                        }
                        else {
                            Main.previousPage();
                        }
                    }
                   else if (playerToDetails.view == "switchProfile") {
                        Main.apiCall(firstMenu)
                    }
                    else {
                        Main.previousPage();
                    }
                }
                else {
                    Main.previousPage();
                }
            }
            else if (view == "bannersPlansUpgrade") {
                if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
                if (presentPagedetails && presentPagedetails.comingFromSwitchProfile && presentPagedetails.comingFromSwitchProfile == true) {
                    Main.apiCall(firstMenu);
                }
                else {
                    Main.previousPage();
                }
                currentSlideIndex = 0;
            }
            break;
        }
    }
};



keyHandlar.signinDeviceLimitHanadular = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var source = Yup('.imageFocus').attr("source");
    var id = Yup('.imageFocus').attr("id");
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
        }
        case tvKeyCode.ArrowRight: {
            break;
        }
        case tvKeyCode.ArrowUp: {
            var splitData = id.split('-');
            if (source == "signin_device_limit") {
                if (Yup('#signin_device-' + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#signin_device-' + (parseInt(splitData[1]) - 1)).addClass("imageFocus");

                    var focusIndex = parseInt(splitData[1]) - 1;
                    var itemHeight = (Yup('#signin_device-0').outerHeight() || (keyHandlar.isHD ? 93 : 140)) + 20;
                    var currentMargin = parseInt(Yup('#signinDeviceScrollInner').css('margin-top')) || 0;
                    var topVisible = currentMargin === 0 ? 0 : Math.round(Math.abs(currentMargin) / itemHeight);

                    if (focusIndex < topVisible) {
                        topVisible = focusIndex;
                        var newMargin = topVisible === 0 ? 0 : -(topVisible * itemHeight);
                        Yup('#signinDeviceScrollInner').css('margin-top', newMargin + 'px');
                    }
                }
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            var splitData = id.split('-');
            if (source == "signin_device_limit") {
                var nextIndex = -1;
                if (parseInt(splitData[1]) == 0 && presentPagedetails.activeSessions.deviceList.length > 1) {
                    nextIndex = parseInt(splitData[1]) + 1;
                }
                else if (Yup('#signin_device-' + (parseInt(splitData[1]) + 1)).length > 0) {
                    nextIndex = parseInt(splitData[1]) + 1;
                }

                if (nextIndex > 0) {
                    Yup('.imageFocus').removeClass("imageFocus");
                    Yup('#signin_device-' + nextIndex).addClass("imageFocus");

                    var itemHeight = (Yup('#signin_device-0').outerHeight() || (keyHandlar.isHD ? 93 : 140)) + 20;
                    var containerHeight = Yup('#signinDeviceScrollContainer').height() || (keyHandlar.isHD ? 466 : 700);
                    var itemsVisible = Math.floor(containerHeight / itemHeight);

                    var currentMargin = parseInt(Yup('#signinDeviceScrollInner').css('margin-top')) || 0;
                    var topVisible = currentMargin === 0 ? 0 : Math.round(Math.abs(currentMargin) / itemHeight);

                    if (nextIndex >= topVisible + itemsVisible) {
                        topVisible = nextIndex - itemsVisible + 1;
                        var newMargin = -(topVisible * itemHeight);
                        Yup('#signinDeviceScrollInner').css('margin-top', newMargin + 'px');
                    }
                }
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009: {
            Main.previousPage();
            break;
        }
        case 461: {
            Main.previousPage();
            break;
        }
        case tvKeyCode.Enter: {
            var splitData = id.split('-');
            Main.popupData = {
                popuptype: 'LogOut',
                message: 'You will not be able to watch ViMTV on the selected device. Do you want to proceed?',
                buttonCount: 2,
                noTarget: 'close',
                noText: 'Cancel',
                yesText: 'Log Out',
                yesTarget: 'logOut',
                onBack: 'close',
                logoutDeviceId: splitData[1]

            }
            Yup("#popUpFDFS").html(Util.signoutComformation());
            Yup("#popup-btn-1").addClass('popupFocus');
            //clevertap profile view appered event
            profilesPageAppeared.profilesPagePageName = 'manage device logout confirmation'
            clevertapservice.profilePageEvent();
            profilesPageAppeared.profilesPagePageName = "device limit reached"
            profilesPageAppeared.action = 'remove';
            clevertapservice.profileClickedEvent();
            break;
        }
        default: {
            break;
        }
    }
}

//Popup key handular
keyHandlar.exitPopupKeyHandlar = function (event, bannerAirmouse) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.popupFocus').attr("id");
    var btntype = Yup('.popupFocus').attr("btntype");
    var source = Yup('.popupFocus').attr("source");
    var target = (btntype == 'yes') ? Main.exitPopUpCallTemplate.yesTarget : Main.exitPopUpCallTemplate.noTarget;
    var buttonLab = Main.exitPopUpCallTemplate.yesTarget ? 'Confirm' : Main.exitPopUpCallTemplate.noTarget ? 'Cancel' : '';
    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            if (source == "popupbtn") {
                var splitData = id.split('-');
                if (splitData[2] == 2 && Main.exitPopUpCallTemplate.buttonCount == 2) {
                    Yup("#popup-btn-" + (parseInt(splitData[2]))).removeClass('popupFocus');
                    Yup("#popup-btn-" + (parseInt(splitData[2]) - 1)).addClass('popupFocus');
                }
            }
            else if (source == "exitSections") {
                var id = Yup('.popupFocus').attr("id");
                var splitData = id.split('-');
                if (Yup("#exitSectionItem-" + (parseInt(splitData[1]) - 1)).length > 0) {
                    Yup("#exitSectionItem-" + (parseInt(splitData[1]))).removeClass('popupFocus');
                    Yup("#exitSectionItem-" + (parseInt(splitData[1]) - 1)).addClass('popupFocus');
                }
            }

        }
            break;
        case tvKeyCode.ArrowRight: {
            // if(source == "popupbtn"){
            var splitData = id.split('-');
            if (Yup('.banners').css('display') == 'block' && presentPagedetails.banners.length > 0 && exitPopupShow == true) {
                var active_banner = Yup('.active-banner').attr("id");
                var splIds = active_banner.split('-');
                var bannerBtn = document.getElementById('bannerBtn-' + (parseInt(splIds[1]) + 1));
                if (bannerBtn && bannerAirmouse == true) {
                    keyHandlar.stopPreviewTrailers();
                    // Function to stop, pause, and destroy the Shaka Player instance
                    var bannerImage = document.getElementById('bannerImage-' + (parseInt(splIds[1]) + 1));
                    if (Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).length > 0) {
                        if (Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).length > 0) {
                            Yup('.active-banner').removeClass('active-banner');
                            Yup('#bannerImage-' + splIds[1]).css('display', 'none');
                            Yup('#bannerImage-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#WatchBannerBtn-' + parseInt(splIds[1])).css('display', 'none');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#WatchBannerBtn-' + parseInt(splIds[1])).removeClass('imageFocus');
                            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('imageFocus');
                            Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                            Yup('#partner-logo-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerDetails-' + (parseInt(splIds[1]))).css('display', 'none');
                            // Yup('#bannerTitle-' + (parseInt(splIds[1]) + 1)).css('display', 'block');
                            Yup('#bannerBtn-' + (parseInt(splIds[1]) + 1)).addClass('active-banner');
                            // keyHandlar.callPreviews("banners", (parseInt(splIds[1]) + 1))
                        }
                    }
                }
                if (parseInt(splIds[1]) == (presentPagedetails.banners.length - 1)) {
                    keyHandlar.stopPreviewTrailers();
                    Yup('.active-banner').removeClass('active-banner');
                    Yup('#bannerImage-' + splIds[1]).css('display', 'none');
                    Yup('#WatchBannerBtn-' + parseInt(splIds[1])).css('display', 'none');
                    Yup('#WatchBannerBtn-0').css('display', 'block');
                    Yup('#WatchBannerBtn-' + parseInt(splIds[1])).removeClass('imageFocus');
                    Yup('#WatchBannerBtn-0').addClass('imageFocus');
                    Yup('#bannerDetails-' + parseInt(splIds[1])).css('display', 'none');
                    Yup('#bannerDetails-0').css('display', 'block');
                    Yup('#bannerImage-0').css('display', 'block');
                    Yup('#bannerBtn-0').addClass('active-banner');
                    Yup('#partner-logo-' + splIds[1]).css('display', 'none');
                    Yup('#partner-logo-0').css('display', 'block');
                    // keyHandlar.callPreviews("banners",0)
                }
                // }


            }
            if (source == "popupbtn" && splitData[2] == 1 && Main.exitPopUpCallTemplate.buttonCount == 2 && !bannerAirmouse && source != "exitSections") {
                Yup("#popup-btn-" + (parseInt(splitData[2]))).removeClass('popupFocus');
                Yup("#popup-btn-" + (parseInt(splitData[2]) + 1)).addClass('popupFocus');
            }
            if (source == "exitSections" && !bannerAirmouse && source != "popupbtn") {
                var id = Yup('.popupFocus').attr("id");
                var splitData = id.split('-');
                if (Yup("#exitSectionItem-" + (parseInt(splitData[1]) + 1)).length > 0) {
                    Yup("#exitSectionItem-" + (parseInt(splitData[1]))).removeClass('popupFocus');
                    Yup("#exitSectionItem-" + (parseInt(splitData[1]) + 1)).addClass('popupFocus');
                }
            }
            bannerAirmouse = false
        }
            break;
        case tvKeyCode.ArrowUp: {
            if (source == "popupbtn") {
                if (Main.exitPopupDataCards && Main.exitPopupDataCards.data[0] && Main.exitPopupDataCards.data[0].section && Main.exitPopupDataCards.data[0].section.sectionData && Main.exitPopupDataCards.data[0].section.sectionData.data.length > 0) {
                    if (Yup("#exitSectionItem-0").length > 0) {
                        Yup(".popupFocus").removeClass('popupFocus');
                        Yup("#exitSectionItem-0").addClass("popupFocus");
                    }
                }
            }
        }
            break;
        case tvKeyCode.ArrowDown: {
            if (source == "exitSections") {
                if (Yup("#popup-btn-1").length > 0) {
                    Yup(".popupFocus").removeClass('popupFocus');
                    Yup("#popup-btn-1").addClass("popupFocus");
                }
            }
        }
            break;
        case 8:
        case tvKeyCode.Return:
        case 461: {
            if (Main.exitPopUpCallTemplate) {
                if (Main.exitPopUpCallTemplate.onBack == 'close') {
                    exitPopupShow = false
                    Yup("#popUpFDFS").html('');
                }
                else if (Main.exitPopUpCallTemplate.onBack == 'exit') {
                    exitPopupShow = false
                    Yup("#popUpFDFS").html('');
                }
            }
        }
        case 10009: {
            if (Main.exitPopUpCallTemplate) {
                if (Main.exitPopUpCallTemplate.onBack == 'close') {
                    exitPopupShow = false
                    Yup("#popUpFDFS").html('');
                }
                else if (Main.exitPopUpCallTemplate.onBack == 'exit') {
                    exitPopupShow = false
                    Yup("#popUpFDFS").html('');
                }
            }
        }
            break;
        case tvKeyCode.Enter: {
            if (source == "popupbtn") {
                if (target == 'exit_Sections') {
                    var detailsText = Yup('#' + id).text();
                    clevertapservice.sendCleverTapEvent('exit popup', {
                        'action': 'clicked',
                        'click label': detailsText,
                        'tab': "Home",
                    })
                    Yup("#popUpFDFS").html('');
                    exitPopupShow = false
                    ctEvent.comingFromExitList = "exit popup explore more";
                    Main.sidebarClose();
                    var targetPath = Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.data && Main.exitPopUpCallTemplate.data.target_details ? Main.exitPopUpCallTemplate.data.target_details : firstMenu;
                    keyHandlar.stopPreviewTrailers();
                    Main.apiCall(targetPath);
                }
                else if (target == 'exit') {
                    exitPopupShow = false
                    var detailsText = Yup('#' + id).text();
                    clevertapservice.sendCleverTapEvent('exit popup', {
                        'action': 'clicked',
                        'click label': detailsText,
                        'tab': "Home",
                    })
                    Yup("#popUpFDFS").html('');
                    toast.application.exit();
                }
            }
            else if (source == 'exitSections') {
                var id = Yup('.popupFocus').attr("id");
                var splitData = id.split('-');
                splitData[1] = parseInt(splitData[1])
                if (splitData[1] && Main.exitPopupDataCards && Main.exitPopupDataCards.data[0] && Main.exitPopupDataCards.data[0].section && Main.exitPopupDataCards.data[0].section.sectionData && Main.exitPopupDataCards.data[0].section.sectionData.data[splitData[1]] && Main.exitPopupDataCards.data[0].section.sectionData.data[splitData[1]].target && Main.exitPopupDataCards.data[0].section.sectionData.data[splitData[1]].target.pageAttributes && !!Main.exitPopupDataCards.data[0].section.sectionData.data[splitData[1]].target.pageAttributes) {
                    var exitCTdata = Main.exitPopupDataCards.data[0].section.sectionData.data[splitData[1]].target.pageAttributes
                    clevertapservice.sendCleverTapEvent('exit popup', {
                        'action': 'clicked',
                        'click label': detailsText,
                        'content name': exitCTdata && exitCTdata.contentName ? exitCTdata.contentName : "",
                        'content language': exitCTdata && exitCTdata.language ? exitCTdata.language : "",
                        'content position': splitData[1] ? splitData[1] : "",
                        'tab': "Home",
                        'content model': exitCTdata && exitCTdata.payType == "P" ? 'svod' : 'avod',
                        'content tag': exitCTdata && exitCTdata.payType == "P" ? "paid" : "free",
                        'content partner name': exitCTdata && exitCTdata.networkName ? exitCTdata && exitCTdata.networkName : "",
                        'content type': exitCTdata && exitCTdata.contentType ? exitCTdata.contentType : "",
                        'tv show name': exitCTdata && exitCTdata.tvShowName ? exitCTdata.tvShowName : "",
                    })

                    var exitClickSection = {
                        genre: exitCTdata && exitCTdata.contentName ? exitCTdata.contentName : "",
                        contentType: exitCTdata && exitCTdata.contentType ? exitCTdata.contentType : "",
                        contentLang: exitCTdata && exitCTdata.language ? exitCTdata.language : "",
                        contentPartnerName: exitCTdata && exitCTdata.networkName ? exitCTdata && exitCTdata.networkName : "",
                        contentId: exitCTdata && exitCTdata.networkName ? exitCTdata && exitCTdata.networkName : "",
                        tvshowname: exitCTdata && exitCTdata.tvShowName ? exitCTdata.tvShowName : "",
                        model: exitCTdata && exitCTdata.payType == "P" ? 'svod' : 'avod',
                        tab: "Home",
                        contantTag: exitCTdata && exitCTdata.payType == "P" ? "paid" : "free",
                        contentName: exitCTdata && exitCTdata.contentName ? exitCTdata.contentName : "",
                        souDet: "",
                        sourceSubDet: "",
                        module_tracking_id: Main.exitPopupDataCards.data[0].section.sectionData.myRecoTrackingId ? Main.exitPopupDataCards.data[0].section.sectionData.myRecoTrackingId : "",
                        module_tracking_name: Main.exitPopupDataCards.data[0].section.sectionData.myRecoTrackingId ? "myreco" : "",
                        btn: "content clicked"
                    };
                    clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(exitClickSection, "", splitData[1], "clicked", true));
                    //for video stop event from Exit popup cards
                    ctEvent.contentPositionss = splitData[1];
                    var parsedMenus = utilities.getMenusData();
                    var fallbackMenuObj = (parsedMenus && parsedMenus.length > 0) ? parsedMenus[0] : null;
                    ctEvent.tabName = fallbackMenuObj ? (fallbackMenuObj.displayText || fallbackMenuObj.title) : "home";
                    ctEvent.currentTabName = ctEvent.tabName;
                    ctEvent.moduleTrackerId = Main.exitPopupDataCards.data[0].section.sectionData.myRecoTrackingId ? Main.exitPopupDataCards.data[0].section.sectionData.myRecoTrackingId : "";
                    ctEvent.comingFromExit = "exit popup"
                }
                var userDetails = localStorage.getItem("userDetails");
                if (userDetails != undefined && userDetails != null && userDetails != "") {
                    exitPopupShow = false
                    var targetPath = Yup('#' + id).attr("targetpath");
                    Yup("#popUpFDFS").html('');
                    keyHandlar.stopPreviewTrailers();
                    Main.apiCall(targetPath);
                }
                else {
                    keyHandlar.stopPreviewTrailers();
                    exitPopupShow = false
                    var targetPath = Yup('#' + id).attr("targetpath");
                    localStorage.setItem('selected_targetSign', targetPath)
                    Yup("#popUpFDFS").html('');
                    view = 'signin'
                    Main.processNext();
                }
            }

        }
            break;
        default: {
            break;
        }
    }
}

keyHandlar.moveSectionByMagicRemote = function (id) {
    var splitData = id.split('-')
    // var focusedCard = Yup(".imageFocus");

    // if (focusedCard.length > 0) {
    //     var card = focusedCard.closest(".section-card");

    //     var cardIndex = card.index(".section-card");

    //     var cardWidth = card.outerWidth(true); // includes margin
    //     if (cardIndex != -1) {
    //         var newLeft = -(cardWidth * cardIndex);
    //         Yup("#sectionhorizontal-" + parseInt(splitData[1])).css("left", newLeft + "px");
    //     }
    // }

    var sectionContainer = Yup("#sectionhorizontal-" + parseInt(splitData[1]));

    var card = Yup(".imageFocus").closest(".section-card");

    var cardIndex = sectionContainer.find(".section-card").index(card);

    var cardWidth = card.outerWidth(true);

    var newLeft = -(cardWidth * cardIndex);
    sectionContainer.css("left", newLeft + 30 + "px");

    keyHandlar.addSectionKeyIndex(parseInt(splitData[1]), parseInt(splitData[2]));
    if (presentPagedetails.view == "movieDetails") {
        if (keyHandlar.isHD) {
            Yup(".detailsContainer").animate({ 'margin-top': '-153px' }, 300);
        }
        else {
            Yup(".detailsContainer").animate({ 'margin-top': '-230px' }, 300);
        }
        Yup('.detailsContainer').css('display', 'none');
        if (keyHandlar.isHD) {
            Yup('.sectionsHome').css('margin-top', '320px')
        }
        else {
            Yup('.sectionsHome').css('margin-top', '480px')
        }
        card_lazy_preview();
    }
}

keyHandlar.handleExpandPreviewFocus = function (vIndex, hIndex, data) {

    var previewKey = ++keyHandlar.lastPreviewKey;

    hIndex = parseInt(hIndex, 10);

    var cardId = "sectionItem-" + vIndex + "-" + hIndex;
    var cardEl = document.getElementById(cardId);
    if (!cardEl || cardEl.classList.contains("view_all")) return;

    keyHandlar.currentPreviewCard = cardEl;

    var nextIndexId = hIndex + 1;

    var posterImg = cardEl.querySelector(".poster-img");
    var liImg = cardEl.querySelector(".expand-liimage");

    if (posterImg) posterImg.removeAttribute("style");
    if (liImg) liImg.removeAttribute("style");

    if (keyHandlar.expandDelayTimer) {
        clearTimeout(keyHandlar.expandDelayTimer);
    }

    keyHandlar.expandDelayTimer = setTimeout(function () {

        if (previewKey !== keyHandlar.lastPreviewKey) return;
        if (!cardEl.classList.contains("imageFocus")) return;

        // CSS class handles the fade transition between poster and liImage

        cardEl.classList.add("expand-active");

    }, 450);


    var userDetails = null;
    try {
        userDetails = JSON.parse(localStorage.getItem("userDetails"));
    } catch (e) {
        userDetails = null;
    }


    if (keyHandlar.previewTimer) {
        clearTimeout(keyHandlar.previewTimer);
    }

    keyHandlar.previewTimer = setTimeout(function () {

        if (previewKey !== keyHandlar.lastPreviewKey) return;
        if (!keyHandlar.currentPreviewCard) return;
        if (keyHandlar.currentPreviewCard !== cardEl) return;
        if (!cardEl.classList.contains("imageFocus")) return;
        if (!cardEl.classList.contains("expand-active")) return;


        var section = presentPagedetails &&
            presentPagedetails.sections &&
            presentPagedetails.sections[vIndex];

        var itemData = section &&
            section.sectionData &&
            section.sectionData.data &&
            section.sectionData.data[hIndex];


        if (userDetails && itemData && itemData.target && itemData.target.pageAttributes &&
            itemData.target.pageAttributes.isTrailerAvailable === "true") {

            Main.expandPreviewtrailerGetStream(
                itemData.target.path,
                vIndex,
                hIndex,
                itemData.target.pageAttributes.trailerStreamType
            );

        } else {

            if (keyHandlar.previewImageChangeTimer) {
                clearTimeout(keyHandlar.previewImageChangeTimer);
            }

            var delay;

            // More time when trailer is NOT available
            delay = userDetails ? 2000 : 2000;

            keyHandlar.previewImageChangeTimer = setTimeout(function () {
                if (!cardEl.classList.contains("imageFocus")) return;

                var nextSelector = "#sectionItem-" + vIndex + "-" + nextIndexId;
                var nextItem = Yup(nextSelector);

                if (nextItem && nextItem.length > 0) {

                    // MOVE RIGHT
                    Yup(".imageFocus").removeClass("imageFocus");
                    nextItem.addClass("imageFocus");

                    keyHandlar.addSectionKeyIndex(vIndex, nextIndexId);
                    keyHandlar.addCurrentSection(vIndex);

                    keyHandlar.ExpandScrollRight(vIndex, nextIndexId);

                    keyHandlar.clearPreviousExpandPreview();

                    // Skip expand animation if nextItem is a view_all card
                    if (!nextItem.hasClass("view_all")) {
                        keyHandlar.handleExpandPreviewFocus(
                            vIndex,
                            nextIndexId,
                            data
                        );
                    }

                }

            }, delay);
        }

    }, 1400);
};


keyHandlar.stopExpandPreviewTrailers = function () {

    // stop videos
    var videos = document.querySelectorAll("video.preview-video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].pause();
        videos[i].remove();
    }

    var cards = document.querySelectorAll(".expand_preview_poster");
    for (var i = 0; i < cards.length; i++) {

        /* remove expand */
        cards[i].classList.remove("expand-active");

        /* remove li image */
        var li = cards[i].querySelector(".expand-liimage");
        if (li) li.style.display = "none";

        /* restore original poster */
        var posterImg = cards[i].querySelector(".poster-img");
        if (posterImg) posterImg.style.opacity = "1";
    }

};




keyHandlar.clearPreviousExpandPreview = function () {
    keyHandlar.lastPreviewKey++;

    if (keyHandlar.expandDelayTimer) {
        clearTimeout(keyHandlar.expandDelayTimer);
        keyHandlar.expandDelayTimer = null;
    }

    if (keyHandlar.previewTimer) {
        clearTimeout(keyHandlar.previewTimer);
        keyHandlar.previewTimer = null;
    }
    if (keyHandlar.previewImageChangeTimer) {
        clearTimeout(keyHandlar.previewImageChangeTimer);
        keyHandlar.previewImageChangeTimer = null;
    }
    /* Stop any playing videos immediately */
    var videos = document.querySelectorAll("video.preview-video");
    for (var i = 0; i < videos.length; i++) {
        videos[i].pause();
        videos[i].remove();
    }

    keyHandlar.currentPreviewCard = null;
    var cards = document.querySelectorAll(".expand_preview_poster");

    for (var i = 0; i < cards.length; i++) {

        var card = cards[i];
        card.classList.remove("expand-active");

        var li = card.querySelector(".expand-liimage");
        if (li) li.style.display = "none";

        var poster = card.querySelector(".poster-img");
        if (poster) poster.style.opacity = "1";
    }
};
keyHandlar.ExpandScrollRight = function (v_index, h_index) {

    var cardType = Yup("#sectionItem-" + v_index + "-" + h_index).attr('cardtype');
    var noOfCardsForRow = noOfCardForARow(cardType);
    var h_length = presentPagedetails.sections[parseInt(v_index)].sectionControls.dataLength;

    try {

        // allow scroll even on last card
        if (h_index < h_length) {

            if (noOfCardsForRow == 8) {

                if (h_index >= 4 && h_index <= h_length - 4) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }

            }
            else if (noOfCardsForRow == 7) {

                keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);

            }
            else {

                if (h_index >= 1 && h_index <= h_length - 1) {
                    keyHandlar.liveScrollRightWrapper(v_index, 'right', cardType);
                }

            }

        }

    } catch (e) { }
};

// Top Menu Key Handler
keyHandlar.topMenuKeyHandlar = function (event) {
    var keycode = (window.event) ? event.keyCode : event.which;
    var id = Yup('.imageFocus').attr("id");
    if (!id) return;

    var splitData = id.split('-');
    var currentIndex = parseInt(splitData[2]);

    switch (keycode) {
        case tvKeyCode.ArrowLeft: {
            var prevTopMenu = Yup('.top-menu-item').eq(Yup('.top-menu-item').index(Yup('#' + id)) - 1);
            if (Yup('.top-menu-item').index(Yup('#' + id)) > 0 && prevTopMenu.length > 0) {
                Yup('.imageFocus').removeClass('imageFocus');
                prevTopMenu.addClass('imageFocus');
            } else {
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item').eq(1).length > 0 ? Yup('.side-menu-item').eq(1).addClass('imageFocus') : Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            break;
        }
        case tvKeyCode.ArrowRight: {
            var nextTopMenu = Yup('.top-menu-item').eq(Yup('.top-menu-item').index(Yup('#' + id)) + 1);
            if (nextTopMenu.length > 0) {
                Yup('.imageFocus').removeClass('imageFocus');
                nextTopMenu.addClass('imageFocus');
            }
            break;
        }
        case tvKeyCode.ArrowDown: {
            Main.sidebarClose();
            if (presentPagedetails.banners && presentPagedetails.banners.length > 0) {
                var activeBanner = Yup(".active-banner").attr("id");
                if (activeBanner) {
                    var splIds = activeBanner.split("-");
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('#WatchBannerBtn-' + parseInt(splIds[1])).addClass("imageFocus");
                    keyHandlar.callPreviews("banners", parseInt(splIds[1]));
                } else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup("#WatchBannerBtn-0").addClass("imageFocus");
                    keyHandlar.callPreviews("banners", 0);
                }
            } else if (Yup("#WatchBannerBtn-0").length > 0) {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup("#WatchBannerBtn-0").addClass("imageFocus");
            } else if (!!presentPagedetails.currentSection) {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup('#sectionItem-' + presentPagedetails.currentSection + '-' + presentPagedetails.sectionIndex[presentPagedetails.currentSection]).addClass('imageFocus');
            } else if ((presentPagedetails.sections && presentPagedetails.sections.length > 0) || Yup("#sectionItem-0-0").length > 0) {
                Yup('.imageFocus').removeClass('imageFocus');
                Yup("#sectionItem-0-0").addClass("imageFocus");
            } else {
                // Default fallback to side menu if content doesn't exist
                if (Yup('.side-menu-item.menu-active').length > 0) {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item.menu-active').addClass('imageFocus');
                } else {
                    Yup('.imageFocus').removeClass('imageFocus');
                    Yup('.side-menu-item').first().addClass('imageFocus');
                }
                Main.sidebarOpen();
            }
            break;
        }
        case tvKeyCode.Enter: {
            var targetPath = Yup('#' + id).attr('targetpath') || Yup('#' + id).attr('targetPath');
            if (targetPath) {
                backData = [];
                var topMenuName = Yup('#' + id).text().trim() || targetPath;
                ctEvent.subtabName = topMenuName;
                clevertapservice.sendCleverTapEvent('tab viewed', { 'tab': ctEvent && ctEvent.tabName ? ctEvent.tabName : "", 'sub tab': targetPath });
                presentPagedetails.isTopMenuClick = true;

                Main.apiCall(targetPath, function () {
                    presentPagedetails.activemainmenu =
                        Yup('.side-menu-item.menu-active').attr('targetpath') ||
                        Yup('.side-menu-item.menu-active').attr('targetPath');
                });
            }
            break;
        }
        case 8:
        case tvKeyCode.Return:
        case 10009:
        case 461: {
            Main.popupData = {
                popuptype: 'noData',
                message: 'Are you sure you want to exit ?',
                buttonCount: 2,
                yesText: 'Exit',
                yesTarget: 'exit',
                noText: 'Cancel',
                noTarget: 'close',
                onBack: 'close'
            }
            Yup("#popUpFDFS").html(Util.signoutComformation());
            Yup("#popup-btn-1").addClass('popupFocus');
            clevertapservice.sendCleverTapEvent('popup', {
                'action': 'popup displayed',
                'label': 'exit',
                'popup name': 'exit',
                'button label': '',
                // 'tab':ctEvent.tabName,  
            })
            break;
        }
    }
};
