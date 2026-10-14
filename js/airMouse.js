// to enable the Airmouse keys in body
Yup(document).ready(function () {

    //air mouse to show arrows
    Yup(document).on('mousemove', 'body', function (e) {
        if (view != "") {
            airMouse = true;
            Main.showArrows();
        }
    });

    // add hightlight on Cards on mouse over
    Yup(document).on('mouseover', '.menuBar,.grey-btn, .exitdataPop_btn, .tabs_Sections, .card-details, .exit_card, .search-keys, .btn-default, .btn-special, .suggestionItem, .btn-search ,#signUpBtn,.keyboardKeys,.signShowPassowrd ,.toptab, .label_btn, #radiobtn, .channelProgramsItem, .country-normal, .detailsContent', function (event) {
        if (this.className == "label_btn") {
            var id = Yup(this).parent().attr('id');
            // Yup(".imageFocus").removeClass("imageFocus");
            Yup('#' + id).addClass('mouseFocus');
        }
        else {
            var id = Yup(this).attr("id");

            if (id) {
                Yup(".mouseFocus").removeClass("mouseFocus");
                Yup('#' + id).addClass('mouseFocus');
            }
        }
    });
    // player   
    // Yup(document).on('mousemove','.seekbar',function(e){
    //              var id = Yup(this).attr("id");
    //     if(id) { 
    //         Yup('#'+id).addClass('mouseFocus');
    //     }
    //     ShakaPlayer.progressIconHandle(e,'mousemove',id);
    // }); 
    Yup(document).on('mouseout', '.seekbar', function (e) {
        var id = Yup(this).attr("id");
        ShakaPlayer.progressIconHandle(e, 'mouseout', id);
    });
    // player   
    Yup(document).on('mouseover', '.seekbar', function (e) {
        var id = Yup(this).attr("id");
        if (id) {
            Yup('#' + id).addClass('mouseFocus');
        }
        ShakaPlayer.progressIconHandle(e, 'mouseover', id);
    });

    // Yup(document).on('click','.playerMouse, .player-bg, #playerHTML5', function(e){
    Yup(document).on('click', '.seekbar, #playerHTML5', function (e) {
        var id = Yup(this).attr("id");
        ShakaPlayer.progressIconHandle(e, 'click', id);
    });
    Yup(document).on('click', '.watchCredits', function (e) {
        var id = Yup(".watch_credits-previewId ").attr("id");
        keyHandlar.playEnterKeydown(id, tvKeyCode.Enter);
    });
    Yup(document).on('click', '.nextVideo_bottom', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.playEnterKeydown(id, tvKeyCode.Enter);
    });
    Yup(document).on('click', '.next-previewId', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.playEnterKeydown(id, tvKeyCode.Enter);
    });

    Yup(document).on('click', '#video', function (e) {
        var id = Yup(this).attr("id");
        if (nextVideoPreview == false) {
            ShakaPlayer.showControls(e, id)
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
            if (skipIntroOnn == true && Yup("#skipintro").css("display") == 'block' && presentPagedetails.constrolsShow == false && Yup("#video_quality").css("display") != 'block' && Yup("#subtitles_main").css("display") != 'block') {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#skipintro").addClass("imageFocus");
            }
            else {
                Yup(".imageFocus").removeClass("imageFocus");
                Yup("#playerBtn").addClass("imageFocus");
            }
        }
    });
    Yup(document).on('click', '.browseText, #browseText', function (e) {
        var id = Yup(this).attr("id");
        var comingFromAirmouse = true
        ShakaPlayer.showSuggsnControls(comingFromAirmouse)
    });

    //remove hightLight on mouse removal
    Yup(document).on('mouseout', function (event) {
        var id = Yup('.mouseFocus').attr("id");
        if (id) {
            Yup('#' + id).removeClass('mouseFocus');
        }
        //remove hightLight on popup buttons
        var id = Yup('.popupMouse').attr("id");
        if (id) {
            Yup('#' + id).removeClass('popupMouse');
        }
    });

    // add hightlight on popup buttons
    Yup(document).on('mouseover', '.popup-button', function (event) {
        var id = Yup(this).attr("id");
        if (id) {
            Yup('#' + id).addClass('popupMouse');
        }
    });

    //airmouse for nav keys
    Yup(document).on("mouseover", '#downArrow,#upArrow,#leftArrow,#rightArrow,#backArrow', function () {
        Yup(this).css("opacity", '1');
    });
    Yup(document).on("mouseout", '#downArrow,#upArrow,#leftArrow,#rightArrow,#backArrow', function () {
        Yup(this).css("opacity", '0.5');
    });
    Yup("#leftArrow").click(function (e) {
        e = tvKeyCode.ArrowLeft;
        Main.eventGenerate(e);
    });
    Yup("#upArrow").click(function (e) {
        e = tvKeyCode.ArrowUp;
        Main.eventGenerate(e);
    });
    Yup("#downArrow").click(function (e) {
        e = tvKeyCode.ArrowDown;
        Main.eventGenerate(e);
    });
    Yup("#rightArrow").click(function (e) {
        e = tvKeyCode.ArrowRight;
        Main.eventGenerate(e);
    });
    Yup("#backArrow").click(function (e) {
        e = tvKeyCode.Return;
        Main.eventGenerate(e);
    });

    //airmouse  for content and list page Enter
    Yup(document).on('click', ' #signUpBtn , .menus-list-item, .btn-search ,.slick-active img ,.card-details,.library-button,#WatchBannerBtn', function (e) {
        var id = Yup(this).attr("id");
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        keyHandlar.stopPreviewTrailers();
        if (!!presentPagedetails.currentSection) {
            var parentDiv = document.getElementById('overlaySectionItem-' + presentPagedetails.currentSection + '-0');
        }
        if (!!parentDiv) {
            var bannerPreviewDiv = parentDiv.querySelector('.banner_preview');
            if (bannerPreviewDiv) {
                var imgElement = bannerPreviewDiv.querySelector('img');
                if (imgElement && imgElement.hasAttribute('altsrc')) {
                    if (presentPagedetails.targetPath != "favourites") {
                        keyHandlar.showCardLazyPreview();
                    }
                }
            }
        }
        if (presentPagedetails.view == "content" || presentPagedetails.view == "movieDetails" || presentPagedetails.view == "tvshowDetails") {
            keyHandlar.moveSectionByMagicRemote(id)
        }
        keyHandlar.contentEnterHandlar(id, '');
    });
    Yup(document).on('click', '.slick-active img ', function (e) {
        var id = Yup(this).attr("id");
        var source = Yup(this).attr("source");
        keyHandlar.stopPreviewTrailers();
        keyHandlar.contentEnterHandlar(id, source);
    });
    Yup(document).on('click', '.top-menu-item ', function (e) {
        var id = Yup(this).attr("id");
        Yup(".imageFocus").removeClass("imageFocus");
        if (id) {
            Yup("#" + id).addClass("imageFocus");
        }
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
    });
    Yup(document).on('click', '.tabs_Sections ', function (e) {
        var id = Yup(this).attr("id");
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
    });
    Yup(document).on('click', '.skip_btn, #next_video', function (e) {
        var id = Yup(this).attr("id");
        var source = Yup(this).attr("source");
        keyHandlar.playEnterKeydown(id, source);
    });

    //airmouse for Search keys Enter   
    Yup(document).on('click', '.search-keys , .suggestionItem , .alphaBlock, .searchBtn-Tabs .grey-btn', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.searchEnterHandlar(id);
    });

    //airmouse for details page
    Yup(document).on('click', '.tabsTitle,.detailsContent', function (e) {
        var id = Yup(this).attr("id");
        // if(Yup(".activeTab").attr("id")!= id){
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
        // }       
    });
    //airmouse for exit popup cards
    //airmouse for package items (plans upgrade)
    Yup(document).on('click', '.package_item', function (e) {
        var id = Yup(this).attr("id");
        // if(view != "bannersPlansUpgrade"){
        // Yup(".popupFocus").removeClass("popupFocus");
        // Yup("#"+id).addClass("popupFocus")  
        // }
        // if(Main.popupData && Main.popupData.popuptype == "addPostpaidBill"){
        //     return;
        // }
        if (id) {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup("#" + id).addClass("imageFocus");

            var splitData = id.split('-');
            if (splitData.length > 1) {
                var itemIndex = parseInt(splitData[1]);
                if (!isNaN(itemIndex)) {
                    currentSlideIndex = itemIndex;
                    var slideWidth = Yup('.package_item').outerWidth(true) || 0;
                    var newPosition = -(currentSlideIndex * slideWidth);
                    Yup('.package_row').css({
                        transition: 'transform 0.5s ease',
                        transform: 'translateX(' + newPosition + 'px)'
                    });
                }
            }
        }

        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
        // }       
    });
    //airmouse for exit popup cards
    Yup(document).on('click', '.exit_card', function (e) {
        var id = Yup(this).attr("id");
        Yup(".popupFocus").removeClass("popupFocus");
        Yup("#" + id).addClass("popupFocus")
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
        // }       
    });
    //airmouse for popup
    Yup(document).on('click', '.signout_btn,.nonreg_btn,.popup-button', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.popupEnterHandlar(id);
    });
    //airmouse for offers close popup
    Yup(document).on('click', '.offers_close', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.popupEnterHandlar(id);
    });
    //airmouse for exit popup buttons
    Yup(document).on('click', '.exitdataPop_btn', function (e) {
        var id = Yup(this).attr("id");
        Yup(".popupFocus").removeClass("popupFocus");
        Yup("#" + id).addClass("popupFocus")
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
    });
    //airmouse on signin Page
    Yup(document).on('click', '.keyboardKeys,.signShowPassowrd,.code_btn', function (e) {
        var id = Yup(this).attr("id");
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
    });

    //airMouse Enter on countryCOde slection
    Yup(document).on('click', '.country-normal', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.countryCodeEnterHandular(id);
    });

    //airmouse Enter on TV guide
    Yup(document).on('click', '.channelProgramsItem', function (e) {
        var id = Yup(this).attr("id");
        var source = Yup(this).attr("source");
        if (Yup('#' + id).attr("target") != "" && Yup('#' + id).attr("target") != undefined && Yup('#' + id).attr("target") != null) {
            keyHandlar.contentEnterHandlar(id, source);
        }
    });

    //mouse enter on tvguideTabs
    Yup(document).on('click', '.tabItem', function (e) {
        var id = Yup(this).attr("id");
        var source = Yup(this).attr("source");
        keyHandlar.tvguideEnterKeyHandular(id, source);
    })

    //mouse enter on TVguide buttons
    Yup(document).on('click', '.template_over', function (e) {
        var id = Yup(this).attr("id");
        e = tvKeyCode.Enter;
        // Main.eventGenerate(e);
        keyHandlar.templateEnterHandlar(id)
    })

    //airMouse Enter on my settings
    Yup(document).on('click', '.toptab, .button, .image_box', function (e) {
        var id = Yup(this).attr("id");
        keyHandlar.accountKeyEnter(id);
    });
    Yup(document).on('click', '.videoqualitySel', function (e) {
        var id = Yup(this).attr("id");
        e = tvKeyCode.Enter;
        Main.eventGenerate(e);
        // keyHandlar.accountKeydown(tvKeyCode.Enter);
    });
    Yup(document).on('click', '.label_btn', function (e) {
        var id = Yup(this).parent().attr('id');
        // Yup(".imageFocus").removeClass("imageFocus");
        // Yup('#'+id).addClass('mouseFocus');

        // var id = Yup('.videoqualitySel').attr("id");
        // e = tvKeyCode.Enter;
        // Main.eventGenerate(e);
        keyHandlar.accountKeyEnter(id, tvKeyCode.Enter);
    });

    //airMouse Enter on detailsPage
    // Yup(document).on('click','.detailsContent', function(e){
    //             var id = Yup(this).attr("id"); 
    //     keyHandlar.detailsPageEnterHandlar(id);
    // });

    //airmouse Click on resend button
    Yup(document).on('click', '#resendBtn', function (e) {
        var id = Yup(this).attr("id");
        if (presentPagedetails.resendButton == true) {
            Main.resendOTP();
        }
    });

    //click on okay on Unique page
    Yup(document).on('click', '.unique-page-btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });


    //whell scroll handular
    document.getElementById("mainContent").addEventListener("wheel", function (event) {
        event.preventDefault();
        var e = 0;
        if (event.wheelDelta > 0) {
            e = tvKeyCode.ArrowUp;
        }
        else {
            e = tvKeyCode.ArrowDown;
        }
        Main.eventGenerate(e);
    });
    //whell scroll handular
    document.getElementById("menusWrapper").addEventListener("wheel", function (event) {
        event.preventDefault();
        var e = 0;
        if (event.wheelDelta > 0) {
            e = tvKeyCode.ArrowUp;
        }
        else {
            e = tvKeyCode.ArrowDown;
        }
        keyHandlar.stopPreviewTrailers();
        Main.eventGenerate(e);
    });

    // network connection
    window.addEventListener('online', function (e) {
        checknetworkType = true;
        if ((staticPaths.indexOf(presentPagedetails.targetPath)) < 0 && (presentPagedetails.view != 'player')) {
            Main.apiCall(presentPagedetails.targetPath);
        }
        else if (presentPagedetails.view == 'player' && presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
            // still popup exist
            if (Main.popupData.popuptype == 'netWorkError') {
                Yup("#popUpFDFS").html('');
                Main.popupData = {};
                ShakaPlayer.playStream(presentPagedetails.steamResponse.streams[0].url);
                media.seekTo(ShakaPlayer.currentPlayingSeekTime);
            }

        }
    });
    window.addEventListener('offline', function (e) {
        checknetworkType = false;

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
    });


    //airmouse on passcode
    Yup(document).on('click', '#signUpBtn1', function (e) {
        var id = Yup(this).attr('id');
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        Main.eventGenerate(tvKeyCode.Enter);
    });


    //airmouse on nextVideoBtn
    Yup(document).on('click', '#playnextbtn', function (e) {
        Yup(".imageFocus").removeClass("imageFocus");
        Yup("#" + id).addClass("imageFocus")
        Main.eventGenerate(tvKeyCode.Enter);
    });
    Yup(document).on('click', '.nextVideoTheme', '.activeScreen_Btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });
    Yup(document).on('click', '.menu-item', function (e) {
        var userDetails = localStorage.getItem("userDetails");
        if (this.id == "menu-profile" && (userDetails != undefined && userDetails != null && userDetails != '')) {
        }
        else {
            Yup(".imageFocus").removeClass("imageFocus");
            Yup(".active").removeClass("active");
            var id = Yup(this).attr('id');
            Yup(this).addClass('imageFocus')
            Yup(this).addClass('active')
            // Main.eventGenerate(tvKeyCode.Enter); 
            var source = Yup(this).attr("source");
            keyHandlar.stopPreviewTrailers();
            keyHandlar.menuKeyEnterHandular(id)
        }
    });

    //airmouse on profile-block
    Yup(document).on('click', '.profile-block', function (e) {
        var id = Yup(this).attr("id");
        var source = Yup(this).attr("source");
        Yup(".imageFocus").removeClass("imageFocus");
        Yup(this).addClass('imageFocus')
        keyHandlar.switchProfileEnter(id, source);
    });
    // player
    //     Yup(document).on('mouseover','.seekbar',function(e){
    //                 var id = Yup(this).attr("id");
    //        if(id) { 
    //            Yup('#'+id).addClass('mouseFocus');
    //        }
    //        else if(view == 'player'){
    //        Player.progressIconHandle(e,'over',id);
    //        }
    //    }); 
    Yup(document).on('click', '.settingsIcon', "#player_quality", function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on('click', '.bitrate', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on('click', '.subtitle', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });
    Yup(document).on("click", ".activebtn-default", function (e) {
        Yup(".imageFocus").removeClass("imageFocus");
        Yup(this).addClass("imageFocus");
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on("click", ".close_screen_btn", function (e) {
        Yup(".imageFocus").removeClass("imageFocus");
        Yup(this).addClass("imageFocus");
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on('click', '#bitrate_apply_btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on('click', '#bitrate_cancel_btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });

    Yup(document).on('click', '.control_items, .play_pause, #seek-picker, .seek-picker, .seek-picker-time', function (e) {
        if ((!!presentPagedetails.isSunnxtSdk) && (presentPagedetails.isSunnxtSdk == true)) {
            return
        }
        var id = Yup(this).attr('id');
        if (id != "seekbar") {
            Yup('.imageFocus').removeClass('imageFocus')
            Yup(this).addClass('imageFocus')

        }
        if (id == "playerBtn") {
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
        }
        Main.eventGenerate(tvKeyCode.Enter, id);

    });
    Yup(document).on('click', ' .top10_movies_poster', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);
    });
    Yup(document).on('click', ' #card, .cards', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter, id);
    });
    Yup(document).on('click', '.activeTab, #searchTab, .searchTab', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter, id);
    });
    Yup(document).on('click', '#seek-picker-start', '.season_name', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);

    });
    Yup(document).on('click', '.play_btn, #WatchBannerBtn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter);

    });
    Yup(document).on('click', '.season_name ,#season', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter, id);

    });
    Yup(document).on('click', '#account, .radio_btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        keyHandlar.accountKeyEnter(id, tvKeyCode.Enter, e)
    });
    Yup(document).on('click', '.selected .label_btn', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        keyHandlar.accountKeydown(id, tvKeyCode.Enter, e)
    });
    //banners
    Yup(document).on("click", ".banner-btn", function (event) {
        var id = Yup(this).attr("id");
        keyHandlar.stopPreviewTrailers();
        if (id) {
            var splIds = id.split('-');
            var copyId = Yup('.active-banner').attr("id");
            var copyId = copyId.split('-');
            Yup('.active-banner').removeClass('active-banner');
            Yup('#bannerImage-' + (parseInt(copyId[1]))).css('display', 'none');
            Yup('#bannerImage-' + (parseInt(splIds[1]))).css('display', 'block');
            Yup('#bannerDetails-' + parseInt(copyId[1])).css('display', 'none');
            Yup('#bannerDetails-' + (parseInt(splIds[1]))).css('display', 'block');
            Yup('#WatchBannerBtn-' + (parseInt(copyId[1]))).css('display', 'none');
            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]))).css('display', 'block');
            Yup(".imageFocus").removeClass("imageFocus");
            Yup('#WatchBannerBtn-' + (parseInt(splIds[1]))).addClass('imageFocus');
            Yup('#partner-logo-' + copyId[1]).css('display', 'none');
            Yup('#partner-logo-' + (parseInt(splIds[1]))).css('display', 'block');
            Yup('#bannerBtn-' + (parseInt(splIds[1]))).addClass('active-banner');
            keyHandlar.addBannerCurrSection((parseInt(splIds[1])))
            BannerMove();
        }
    });

    Yup(document).on('click', '.singleProfile', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter, id);

    });
    Yup(document).on('click', '.top_profile', function (e) {
        Yup('.imageFocus').removeClass('imageFocus')
        var id = Yup(this).attr('id');
        Yup(this).addClass('imageFocus')
        Main.eventGenerate(tvKeyCode.Enter, id);

    });
});
