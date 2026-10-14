var Util = {};
var characterArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    '.', '<span class="caplock-icon-pos"></span>', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '_', '-'
];
var specialCharArray = ['!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '_', unescape("&#8377"), '{', '|',
    '}', '<span class="caplock-icon-pos"></span>', '~', unescape("\u20AC"), '^', 'æ', 'Ø', 'ø', '₤', 'Ȫ', 'Ȱ'
];
var Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var timesList = ['00:00 AM', '00:30 AM', '01:00 AM', '01:30 AM', '02:00 AM', '02:30 AM', '03:00 AM', '03:30 AM', '04:00 AM', '04:30 AM', '05:00 AM', '05:30 AM', '06:00 AM', '06:30 AM', '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM']
Util.splashHtml = function (loadingType) {

    var Text = ''
    var height, width;
    var resolution = Yup(window).width()
    if (resolution == 1920) {
        width = 1920;
        height = 1080;
    }
    else if (resolution == 1280) {
        width = 1280;
        height = 720;
    }

    //background:url(images/splash.png); background-size:cover;backgfround-position:center center;
    Text += '<div class="splash_main">'
    if (loadingType == "video") {
        Text += '<video id="introvideo" width="' + width + '" height="' + height + '" autoplay muted>'
        Text += '<source src="intro_video.mp4" type="video/mp4">'
        Text += '</video>';
        Text += '</div>';
    }
    else {
        Text += '<div class="splash">'
        Text += '<img src="' + appConfig.viStaticColudPath + 'Splash_smart_TV.png">'
        Text += '</div>'
    }
    return Text;
}
Util.getLogo = function () {
    var Text = '';
    Text += '<div class="wrapper_logo"> <img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    return Text;
}

Util.showPopup = function () {
    if (Main.popupData) {
        var Text = '';
        Text += '<div class="popupDiv">'
        Text += '<div class="overlay-screen ' + Main.popupData.popuptype + '">'
        Text += '<div class="popup-Title">'
        if (!!Main.popupData.headerTitle) {
            Text += '<h4 class="popup-Header">' + Main.popupData.headerTitle + '</h4>'
        }
        if (!!Main.popupData.message) {
            Text += '<p class="popup-subhead">' + Main.popupData.message + '</p>'
        }
        Text += '</div>'
        Text += '<div class="popup-btn-wrap ">'
        if (Main.popupData.buttonCount == 1) {
            Text += '<button id="popup-btn-1" class="btn-default popup-button" btnType="yes" > ' + Main.popupData.yesText + ' </button>'
        }
        else {
            Text += '<button id="popup-btn-1" class="btn-default popup-button mr70" btnType="yes" source="popupbtn"> ' + Main.popupData.yesText + ' </button>'
            Text += '<button id="popup-btn-2" class="btn-default popup-button " btnType="no" source="popupbtn"> ' + Main.popupData.noText + ' </button>'
        }
        Text += '</div>'
        Text += '</div>'
        Text += '</div>'

        return Text;
    }
}

Util.getImages = function (url) {
    if (url == "") {
        return "";
    }
    else if (url.indexOf(",") == -1) {
        return url;
    }
    else if (url.indexOf("https") === 0) {
        return url;
    } else {
        // var urlSplitList = url.split(',');
        // var updatedUrl = urlSplitList.join().
        // for (var i = 0; i < systemConfigs.resourceProfiles.length; i++) {
        //     if (urlSplitList[0] == systemConfigs.resourceProfiles[i].code) {
        //         return systemConfigs.resourceProfiles[i].urlPrefix + urlSplitList[1];
        //     }
        // }
        var urlSplitList = url.split(',');

        // Remove the first element and join the rest with commas
        var remainingUrl = urlSplitList.slice(1).join(',');

        for (var i = 0; i < systemConfigs.resourceProfiles.length; i++) {
            if (urlSplitList[0] == systemConfigs.resourceProfiles[i].code) {
                return systemConfigs.resourceProfiles[i].urlPrefix + remainingUrl;
            }
        }
    }
}

Util.getMenuImages = function (url) {
    return Util.getImages('menu,' + url + '.png');
}

Util.getContentHTML = function (data, id, targetpath) {
    var Text = '';
    if (commingFromMenus == true) {
        commingFromMenus = false;
        presentPagedetails.isCustomHeaderAdded = true;
    }
    if (view == 'content') {
        if (presentPagedetails.targetPath == 'favourites') {
            Text += Util.favorite();
        }
    }
    if (data.pageType == 'list') {
        presentPagedetails.isMenuPathforGrid = false;
        for (var i = 0; i < systemConfigs.menus.length; i++) {
            if (systemConfigs.menus[i].targetPath == data.targetPath) {
                presentPagedetails.isMenuPathforGrid = true;
                break;
            }
        }
        Text += '<div class="menus-content">'
        Text += Util.getGridSections(data)
        Text += '</div>'
    }
    else if (data.pageType == 'details') {
        presentPagedetails.menusList = [];
        if (data.pageSubType == 'tvshowDetails' && data.pageSubType != 'channelDetails' && data.pageSubType != 'movieDetails') {
            if (data.pageSubType == 'tvshowDetails' && isComingFromBanners == true) {
                // isComingFromBanners = false
                tvDetails = true
                Text += Util.getTVDetailsPage(data);
                tvDetails = false
                Text += '<div id="backgroundPoster" class="sectionBanner">'
                Text += '</div>'

            }
        } else if (data.pageSubType == 'movieDetails' || data.pageSubType == 'channelDetails') {
            Text += Util.getMovieDetailsPage(data);
            Text += '<div id="backgroundPoster" class="sectionBanner">'
            Text += '</div>'
        }
        else if (data.pageSubType == 'channelDetails' && data.pageSubType != 'tvshowDetails' && data.pageSubType != "movieDetails") {
            if (data.pageSubType == 'channelDetails' && isComingFromBanners == true) {
                // isComingFromBanners = false
                Text += Util.getChannelDetailsPage(data);
            } else {
                Text += Util.getGridSections(data)
            }
        }
        if (data.pageSubType == 'seasonDetails' && data.pageSubType != 'tvshowDetails' && data.pageSubType != "movieDetails") {
            Text += Util.getSectionsSeason(data)

        }
    }
    else {  // defaults to content
        if (presentPagedetails.targetPath != "search") {
            Text += Util.getLogo();
        }
        // Text += '<div class="menus-content">'
        // if (data.pageSubType && data.pageSubType == 'networkDetails') {
        //     Text += Util.getNetworkDetails();
        // }
        if (presentPagedetails.isCustomHeaderAdded == true && clickedMenu && data.pageType == 'content') {  //to display title-header like List pages when cliked on menes
            presentPagedetails.clickedMenu = clickedMenu;
            // Text += Util.pageHeader(clickedMenu.displayText);
        }
        Text += Util.getTopMenuHTML(targetpath, id);
        if (data.banners && data.banners.length > 0) {
            Text += Util.getBanners(data.banners)
        }
        // if (data.menusList && data.menusList.length > 0) {
        //     Text += Util.getMenus(data.menusList)
        // }
        if (data.sections) {
            if (data.sections.length > 0) {
                Text += '<div id="backgroundPoster" class="sectionBanner">'
                Text += '</div>'
                Text += Util.getSections(data.sections)
                // Text += (Util.getOverlaySection(data.sections,id));
            }
            else {
                if (presentPagedetails && presentPagedetails.targetPath != "favourites") {
                    Text += Util.ContentNotFound("Content not Found")
                }
            }
        }
        if (presentPagedetails.targetPath == "search") {
            // Text += Util.getGridSections(data)
            Text += Util.getSearchSections(data.response)
        }

        // Text +='</div>'
    }
    return Text;
}

Util.getChannelDetailsPage = function (data) {
    var Text = '';
    var tvshowContent = data.pageContent[0];
    Text += '<div class="tvShowDetails ' + presentPagedetails.tabsInfo.showTabs + '">'
    if (appConfig.channelshowDetalsFullImageView == true) {
        Text += Util.getDetailsPageContent(tvshowContent);
    } else {
        Text += Util.getDetailsPageContentWithHalfImage(tvshowContent);
    }
    if (presentPagedetails.tabsInfo.showTabs == true) { // showing tabwise sections
        if (data.sections) {
            //tabs
            Text += '<div class="suggestions"><ul>'
            for (var j = 0; j < data.sections.length; j++) {
                var focusClass = (j == 0) ? 'activeTab' : ''
                Text += '<li class="tabsTitle ' + focusClass + '" id="tabs-' + j + '" source="tabs" pagination="false" >' + data.sections[j].sectionInfo.name + '<span></span></li>'
            }
            for (var j = 0; j < data.paginationSectionsData.length; j++) {
                Text += '<li class="tabsTitle ' + focusClass + '" id="tabs-' + j + '" source="tabs" pagination="true" >' + data.sections[j].sectionInfo.name + '<span></span></li>'
            }
            Text += '</ul>'
            Text += '</div>'
            //tab data in sections
            if (data.sections.length > 0) {
                for (var i = 0; i < data.sections.length; i++) {
                    Text += Util.getdetailsPageSectionData(data.sections, i);
                }
                // Text += Util.getdetailsPageSectionData(data.sections, data.sections.length - 1);
            }
        }
    } else {
        if (data.sections) {
            Text += Util.getSections(data.sections);
        }
    }
    Text += '</div>'
    return Text;
}

Util.getTVDetailsPage = function (data) {
    var Text = '';
    var tvshowContent = data.pageContent[0];
    var dataRows = tvshowContent.dataRows;
    for (var i = 0; i < dataRows.length; i++) {
        var row = dataRows[i];
        if (row.elements && row.rowDataType === 'content') {
            for (var j = 0; j < row.elements.length; j++) {
                var element = row.elements[j];
                var elementSubtype = element.elementSubtype;
                if (elementSubtype == 'cast') {
                    presentPagedetails.castCrewSection = element;
                }
            }
        }
    }
    Text += '<div class="tvShowDetails ' + presentPagedetails.tabsInfo.showTabs + '">'
    if (appConfig.tvshowDetalsFullImageView == true) {
        Text += Util.getDetailsPageContent(tvshowContent);

    } else {
        Text += Util.getDetailsPageContentWithHalfImage(tvshowContent);
    }
    // if(presentPagedetails.tabsInfo.showTabs==true){ // showing tabwise sections
    // if (data.sections) {
    //     //tabs
    //     Text += '<div class="section_Home">'
    //     Text += '<div class="suggestions"><ul>'
    //     // for (var j = 0; j < data.sections.length; j++) {
    //     //     var focusClass = (j == 0) ? 'activeTab' : ''
    //     //     Text += '<li class="tabsTitle ' + focusClass + '" id="tabs-' + j + '" source="tabs" pagination="false" >' + data.sections[j].sectionInfo.name + '<span></span></li>'
    //     // }
    //     // for (var j = 0; j < data.paginationSectionsData.length; j++) {
    //     //     Text += '<li class="tabsTitle ' + focusClass + '" id="tabs-' + j + '" source="tabs" pagination="true" >' + data.sections[j].sectionInfo.name + '<span></span></li>'
    //     // }
    //     Text += '<li class="tabsTitle">' + data.sections[0].sectionInfo.name + '<span></span></li>'

    //     Text += '</ul>'
    //     Text += '</div>'
    //     //tab data in sections
    //     if (data.sections.length > 0) {
    //         // for (var i = 0; i < data.sections.length; i++) {
    //         //     Text += Util.getdetailsPageSectionData(data.sections, i);
    //         // }
    //         Text += Util.getdetailsPageSectionData(data.sections,data.sections.length - 1);
    //         Text += '</div>'
    //     }
    //  }
    // }else{
    if (data.sections) {
        Text += Util.getSections(data.sections);
    }
    // }
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    return Text;
}

Util.getdetailsPageSectionData = function (data, i) {
    var Text = '';
    // Text += '<div class="section_Home">'
    Text += '<div class="section_row"  id="section-' + 0 + '" style="transition: -webkit-transform 150ms linear;" >';
    if (data[i].sectionData && data[i].sectionData.data.length) {
        Text += '<div class="sectionhorizontal" id="sectionhorizontal-' + 0 + '">';
        var viewAllId = '';
        for (var j = 0; j < (data[i].sectionData && data[i].sectionData.data ? data[i].sectionData.data.length : 0); j++) {
            Text += Util.getCard(data[i].sectionData && data[i].sectionData.data[j], 'sectionItem-' + 0 + '-' + j);
            // viewAllId = 'sectionItem-' + i + '-' + (j + 1);
            viewAllId = 'sectionItem-' + 0 + '-' + (j + 1);
        }
        if (data[i].sectionControls.showViewAll == true) {
            Text += Util.getViewAllCard(data[i], viewAllId);
        }
        Text += '</div>'
    } else {
        // no data in tabs sections
    }
    Text += '</div>'
    // Text += '</div>'
    return Text;
}

Util.getMovieDetailsPage = function (data) {
    var tvshowContent = data.pageContent[0];
    var Text = '';
    Text += '<div class="movieDetails">'

    if (data.sections) {
        for (var i = 0; i < data.sections.length; i++) {
            if (data.sections[i].sectionInfo.code == 'movie_actors') {
                presentPagedetails.castCrewSection = data.sections[i];
                data.sections.splice(i, 1);
                break;
            }
        }
    }
    Text += Util.getDetailsPageContent(tvshowContent);
    if (data.sections && data.sections.length != 0) {
        for (var i = 0; i < data.sections.length; i++) {
            if (systemConfigs.configs.movieDetailsRecommendationText != undefined) {
            }
        }
        Text += Util.getSections(data.sections);
    }
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    return Text;
}

Util.getDetailsPageContentWithHalfImage = function (tvshowContent) {
    var Text = '';
    Text += '<div class="detailsContainerNew"><div class="detailsleftImg"><img class="main" src="' + Util.getImages(tvshowContent.backgroundImage) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png" /></div>';
    Text += '<div class="detainlsInfo">';
    Text += '<h1>' + tvshowContent.title + '</h1>';
    Text += Util.AddingDetailsPageContent(tvshowContent);
    Text += '</div></div>';
    Text += '<div class="detailsPage_bottom_gradient">';
    return Text;
}

Util.AddingDetailsPageContent = function (tvshowContent) {
    var Text = '';
    var ContentInfo = {
        rentalInfo: '',
        expiryInfo: []
    }
    var tvshowContent = presentPagedetails.pageContent[0];
    var dataRows = tvshowContent.dataRows;
    for (var i = 0; i < dataRows.length; i++) {
        var row = dataRows[i];
        if (row.elements && row.rowDataType === 'content') {
            for (var j = 0; j < row.elements.length; j++) {
                var element = row.elements[j];
                var elementSubtype = element.elementSubtype;
                if (elementSubtype == 'cast') {
                    presentPagedetails.castCrewSection = element;
                }
            }
        }
    }
    for (var i = 0; i < tvshowContent.dataRows.length; i++) {
        if (tvshowContent.dataRows[i].rowDataType == 'content') {
            if (tvshowContent.dataRows[i].elements[0].elementSubtype == "cast") {
                break;
            }
            Text += '<ul class="markers">'
            for (var j = 0; j < tvshowContent.dataRows[i].elements.length; j++) {
                var elements = tvshowContent.dataRows[i].elements[j];
                if (elements.elementType != 'image' && (elements.elementSubtype != 'rentalinfo' && elements.elementSubtype != 'title' && elements.elementSubtype != 'expiryInfo' && elements.elementSubtype != 'subscribeInfo')) {

                    if (elements.elementType == 'description' && elements.data.length > 170) {
                        presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        presentPagedetails.description = elements.data;
                        var readMoreData = elements.data.substr(0, 170);
                        // Append the description and "Read More" span
                        elements.data =
                            '<div id="descriptionText">' + readMoreData + '</div>' +
                            '<div id="readMoreContainer">' +
                            '<span id="readMore">Read More</span>' +
                            '</div>';
                    }
                    if (elements.elementSubtype == "subtitle") {
                        Text += '<li class="detailsContent ' + elements.elementType + ' ' + elements.elementSubtype + ' "  id="' + elements.elementType + '-' + i + '-' + j + '" source="' + elements.elementType + '"targetpath="' + elements.target + '" >' + elements.data + '</li>';
                    }
                    else {
                        Text += '<li class="detailsContent ' + elements.elementType + '" id="' + elements.elementType + '-' + i + '-' + j + '" source="' + elements.elementType + '"targetpath="' + elements.target + '" >' + elements.data + '</li>';
                    }
                } else if (elements.elementType == 'text' && elements.elementSubtype == 'rentalinfo') {
                    ContentInfo.rentalInfo = elements.data;
                }
                else if (elements.elementType == 'text' && elements.elementSubtype == 'subscribeInfo') {
                    ContentInfo.rentalInfo = elements.data;
                }
                else if (elements.elementType == 'text' && elements.elementSubtype == 'expiryInfo') {
                    ContentInfo.expiryInfo = elements.data.split('@ ');
                }
            }
            Text += '</ul>'
        }
    }
    if (presentPagedetails.castCrewSection) {
        //     var Actors=[];
        Text += '<ul class="markers">';
        // for (var k = 0; k < presentPagedetails.castCrewSection.sectionData.data.length; k++) {
        //     if(presentPagedetails.castCrewSection.sectionData.data[k].display.subtitle1=='Director'){
        //         // Text += '<li class="detailsContent castcrew text'+ '" id="castcrew'+'-' + k + '" source="text">Director : '+presentPagedetails.castCrewSection.sectionData.data[k].display.title+'</li>';
        //     }
        //     else{
        //         Actors.push(presentPagedetails.castCrewSection.sectionData.data[k].display.title);
        //     }
        // }
        if (elements.elementType == 'description' && presentPagedetails.castCrewSection.data.length > 103) {
            presentPagedetails.description = elements.data;
            presentPagedetails.castCrewSection.data = presentPagedetails.castCrewSection.data.substr(0, 103);
            presentPagedetails.castCrewSection.data += '....'
        }
        Text += '</ul>'
        Text += '<ul class="markers">';
        Text += '<li class="detailsContent castcrew text' + '" id="castcrew" source="text"><span style="font-family:gotham-medium">Cast : </span> ' + presentPagedetails.castCrewSection.data + '</li></ul>';
    }
    // var favButtonAdded =false; watchLive=false;
    // for (var i = 0; i < tvshowContent.dataRows.length; i++) {
    //     if(tvshowContent.dataRows[i].rowDataType == 'button'){
    //         Text += '<ul class="markers">'
    //         for (var j = 0; j < tvshowContent.dataRows[i].elements.length; j++) {
    //             var elements = tvshowContent.dataRows[i].elements[j];
    //            // if(elements.elementSubtype=='subscribe'){
    //                // Text += '<li class="detailsContent rentalInfo subscribeInfo" id="rentalInfo" source="subscribeText" targetpath=""><img class="infoIcon" src="images/info_icon.png">Please subscribe to watch this content'
    //             //}else{
    //                 Text += '<li class="detailsContent ' + elements.elementType + '" elementSubtype="'+elements.elementSubtype+'" id="' + elements.elementType + '-' + j + '" source="' + elements.elementType + '"targetpath="'+elements.target+'" >' + elements.data;
    //             //}
    //             if(elements.elementSubtype=='resume'){
    //             Text += '<div class="progress">'
    //             Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + parseInt(presentPagedetails.attributes.watchedPosition * 100) + '%">'
    //             Text += '</div></div>'
    //             }
    //             Text += '</li>';
    //         }
    //         // for (var k = 0; k < tvshowContent.dataRows[i].elements.length; k++) {
    //         //     if(tvshowContent.dataRows[i].elements[k].elementSubtype=='subscribe'){
    //         //         tvshowContent.dataRows[i].elements.splice(k, 1);
    //         //     }
    //         // }
    //         presentPagedetails.avilablePagebuttonsLength = tvshowContent.dataRows[i].elements.length;
    //         if(presentPagedetails.isComingTvguide==true){
    //             watchLive=true
    //             Text += '<li class="detailsContent button" id="watchLive" source="watchLive" targetpath="" >Watch Live</li>';
    //         }
    //          //fav button
    //         if(presentPagedetails.pageButtons && presentPagedetails.pageButtons.showFavouriteButton && presentPagedetails.pageButtons.showFavouriteButton == true  ){
    //             if(presentPagedetails.pageButtons.isFavourite == true){
    //                 // Text += '<li class="detailsContent fav" id="favorites" source="favorites" targetpath="favorites" > <div class="fav-icon removeWatch"></div></li>';
    //             }else{
    //                 // Text += '<li class="detailsContent fav" id="favorites" source="favorites" targetpath="favorites" > <div class="fav-icon addTowatch"></div></li>';
    //                 Text += '<li class="detailsContent button" id="favorites" source="favorites" targetpath="favorites" ><img src="images/Add to Bingelist.svg"/> Add to Bingelist</li>';
    //             }
    //             favButtonAdded = true;
    //             presentPagedetails.favButtonAdded = true;
    //         }
    //         // if(ContentInfo.expiryInfo.length>0){
    //         //     Text+= '<li class="detailsContent expiryInfo" id="expiryInfo" source="expiryInfo" targetpath=""><span style="color:red">'+ContentInfo.expiryInfo[0]+'</span><span>'+ContentInfo.expiryInfo[1]+'</li>'
    //         // }
    //         Text += '</ul>'
    //     }
    // }
    // if(favButtonAdded == false && presentPagedetails.pageButtons && presentPagedetails.pageButtons.showFavouriteButton && presentPagedetails.pageButtons.showFavouriteButton == true ){
    //     Text += '<ul class="markers" style="padding-bottom: 10px;">'
    //     if(watchLive==false && presentPagedetails.isComingTvguide==true){
    //         Text += '<li class="detailsContent button" id="watchLive" source="watchLive" targetpath="" >Watch Live</li>';
    //     }
    //     if(presentPagedetails.pageButtons.isFavourite == true){
    //         Text += '<li class="detailsContent fav" id="favorites" source="favorites" targetpath="favorites" > <img class="fav-icon" src="https://d2ivesio5kogrp.cloudfront.net/static/kandidtv/images/remove-watch-list.svg" ></li>';
    //     }else{

    //         Text += '<li class="detailsContent fav" id="favorites" source="favorites" targetpath="favorites" > <img class="fav-icon default-img" src="images/addToWatch.png"> <img class="fav-icon focus-image" src="images/addToWatchFocus.png"></li>';
    //     }
    //     // if(ContentInfo.expiryInfo.length>0){
    //     //     Text+= '<li class="detailsContent expiryInfo" id="expiryInfo" source="expiryInfo" targetpath=""><span style="color:red">'+ContentInfo.expiryInfo[0]+'</span><span>'+ContentInfo.expiryInfo[1]+'</li>'
    //     // }
    //     presentPagedetails.favButtonAdded = true;
    //     Text += '</ul>'
    // }
    if (ContentInfo.rentalInfo.length > 0) {
        Text += '<ul class="markers"><li class="detailsContent rentalInfo" id="rentalInfo" source="rentalInfo" targetpath=""><img class="infoIcon" src="images/info_icon.png">' + ContentInfo.rentalInfo + '</li></ul>'
    }
    return Text;
}

Util.getSections = function (data, startIndex) {
    var Text = "";
    var sIndex = startIndex !== undefined ? startIndex : 0;
    if (presentPagedetails.view == "player" && presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
        Text = "<div class=\"live_sectionsHome\">";
    } else if (typeof tvDetails !== "undefined" && tvDetails == true) {
        Text = "<div class=\"sectionsShowsHome\">";
    } else {
        Text = "<div class=\"sectionsHome\">";
    }
    for (var i = 0; i < data.length; i++) {
        var currentSectionIdx = sIndex + i;
        var section = data[i];
        var sInfo = section.sectionInfo || section;
        var sData = section.sectionData || section;
        var sControls = section.sectionControls || section;
        var sectionData = (sData && sData.data) ? sData.data : [];

        if (sControls.dataLength > 0) {
            if (sInfo.sectionPresentation == "tabbed_display") {
                Text += "<div class=\"section_row tabs_rail\" id=\"section-" + currentSectionIdx + "\">";
                if (sInfo.params && sInfo.params.showSectionTitle == "true") {
                    Text += "<h3 class=\"section-heading\">" + sInfo.name + "</h3>";
                }
                var tabsHtml = "<ul id=\"tabs-" + currentSectionIdx + "\">";
                if (sInfo.subSections) {
                    var subSectionsArr = sInfo.subSections.split(",");
                    for (var t = 0; t < subSectionsArr.length; t++) {
                        var tabCode = subSectionsArr[t];
                        var tabName = (section.subSectionInfo && section.subSectionInfo[t] && section.subSectionInfo[t].name) ? section.subSectionInfo[t].name : tabCode.replace(/-/g, " ").replace(/\b\w/g, function (l) { return l.toUpperCase(); });

                        var displayTabName = tabName;
                        if (tabName.length > 15) {
                            var truncated = tabName.substring(0, 14) + '...';
                            displayTabName = '<span class="tab-truncated">' + truncated + '</span><span class="namescroll tab-fulltext">' + tabName + '</span>';
                        }

                        var isActive = (section._activeTabIndex !== undefined) ? (t === section._activeTabIndex) : (t === 0);
                        tabsHtml += "<li id=\"tab-" + currentSectionIdx + "-" + t + "\" " + (isActive ? "class=\"imageFocus tabs_Sections active_tab\"" : "class=\"tabs_Sections\"") + " source=\"tabsSection\" data-section-index=\"" + currentSectionIdx + "\" data-tab-index=\"" + t + "\" data-code=\"" + tabCode + "\">" + displayTabName + "</li>";
                    }
                }
                tabsHtml += "</ul>";
                Text += tabsHtml;
            } else {
                var cardType = (sectionData.length > 0 && sectionData[0]) ? sectionData[0].cardType : "";
                if (cardType == "show_card") {
                    Text += "<div class=\"section_row show_card_sec\" id=\"section-" + currentSectionIdx + "\" style=\"transition: -webkit-transform 150ms linear;\">";
                    Text += "<h3 class=\"section-heading\">" + sInfo.name + "</h3>";
                } else if (cardType == "floating_rail") {
                    Text += "<div class=\"section_row floating_rail\" id=\"section-" + currentSectionIdx + "\" style=\"transition: -webkit-transform 150ms linear;\">";
                    var bannerImg = (sInfo.bannerImage) ? Util.getImages(sInfo.bannerImage) : "https://d1keqtsg5img48.cloudfront.net/lg_samsung/images/TV_brand_logo.png";
                    Text += "<img class=\"floating_img\" src=\"" + bannerImg + "\" />";
                } else {
                    Text += "<div class=\"section_row\" id=\"section-" + currentSectionIdx + "\" style=\"transition: -webkit-transform 150ms linear;\">";
                    Text += "<h3 class=\"section-heading\">" + sInfo.name + "</h3>";
                }
            }
            Text += "<div class=\"sectionhorizontal\" id=\"sectionhorizontal-" + currentSectionIdx + "\">";
            var viewAllId = "";
            // Use active tab data if it's a tabbed display
            if (sInfo.sectionPresentation == "tabbed_display" && section.subSectionInfo && section._activeTabIndex !== undefined && section.subSectionInfo[section._activeTabIndex] && section.subSectionInfo[section._activeTabIndex].sectionData) {
                sectionData = section.subSectionInfo[section._activeTabIndex].sectionData.data || [];
            }
            for (var j = 0; j < sectionData.length; j++) {
                if (sectionData[j]) {
                    if (sectionData[j].cardType == "top10_poster" || sectionData[j].cardType == "top10_movies_poster") {
                        presentPagedetails.topImages = (typeof utilities !== "undefined") ? utilities.topImages[j % utilities.topImages.length] : "";
                    }
                    Text += Util.getCard(sectionData[j], "sectionItem-" + currentSectionIdx + "-" + j);
                    viewAllId = "sectionItem-" + currentSectionIdx + "-" + (j + 1);
                }
            }
            if (sControls.showViewAll == true) {
                Text += Util.getViewAllCard(section, viewAllId);
            }
            Text += "</div></div>";
        }
    }
    Text += "</div><div class=\"toastmsg_template\"></div>";
    return Text;
};
Util.getSearchSections = function (data) {
    var targetSection = "trending-search";
    if (data && data.data && Array.isArray(data.data)) {
        var sections = data.data;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            // if (section.contentCode === targetSection) {
            var sectionData = section.section.sectionData;
            var Text = '<div class="search_sectionsHome">';
            Text += '<div class="sectionsHome">';
            Text += '<div class="section_row" id="section-' + i + '" style="transition: -webkit-transform 150ms linear;">';
            Text += '<h3 class="section-heading">' + section.section.sectionInfo.name + '</h3>';
            Text += '<div class="sectionhorizontal" id="sectionhorizontal-' + i + '">';
            var cardsForRow = 3;
            for (var j = 0; j < sectionData.data.length; j++) {
                var secDataLen = sectionData.data.length;
                var v_index = Math.floor(j / cardsForRow);
                var h_index = j % cardsForRow;
                if (h_index === 0) {
                    Text += "<div id='viewAllrow-" + v_index + "' class='row viewall_row'>";
                }
                Text += Util.getCard(sectionData.data[j], 'sectionItem-' + v_index + '-' + h_index);
                if (h_index === cardsForRow - 1) {
                    Text += "</div>";
                }
            }
            Text += '</div></div>';
            Text += '</div>';
            Text += '</div>';
            return Text;
            // }
        }
    }
    return '';
}






Util.getPaginationSections = function (data) {
    var Text = '';
    var dataLengthExistingSections = presentPagedetails.sections.length;
    for (var i = 0; i < data.length; i++) {
        if (data[i].sectionControls.dataLength > 0) {
            Text += '<div class="section_block">'
            if (data[i].sectionData && data[i].sectionData && data[i].sectionData.data && data[i].sectionData && data[i].sectionData.data.length > 0 && data[i].sectionData && data[i].sectionData.data[0] && data[i].sectionData && data[i].sectionData.data[0].cardType == "show_card") {
                // Text += '<div class="section_row show_card_sec"  id="section-' + i + '" style="transition: -webkit-transform 150ms linear;">';
                Text += '<div class="section_row show_card_sec"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
                Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>';
            }
            else if (data[i].sectionData && data[i].sectionData.data[0] && data[i].sectionData && data[i].sectionData.data[0].cardType == "floating_rail") {
                Text += '<div class="section_row floating_rail"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
                // Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>
                if (data[i] && data[i].sectionInfo && data[i].sectionInfo.bannerImage) {
                    Text += '<img class="floating_img" src="' + Util.getImages(data[i].sectionInfo.bannerImage) + '" />';
                }
                else {
                    Text += '<img class="floating_img" src="images/empty_state_sheet.png" />';
                }
            }
            else if (data[i].sectionInfo && data[i].sectionInfo.sectionPresentation == "tabbed_display") {
                Text += '<div class="section_row tabs_rail"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';

                if (data[i].sectionInfo && data[i].sectionInfo.name && data[i].sectionInfo && data[i].sectionInfo.params.showSectionTitle == "true") {
                    Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>'
                }
                var tabsHtml = '<ul id="tabs-' + (i + dataLengthExistingSections) + '">';

                if (data[i].sectionInfo &&
                    data[i].sectionInfo.subSections) {

                    var subSectionsArr = data[i].sectionInfo.subSections.split(',');

                    for (var t = 0; t < subSectionsArr.length; t++) {
                        var tabCode = subSectionsArr[t];
                        var tabName = (section.subSectionInfo && section.subSectionInfo[t] && section.subSectionInfo[t].name) ? section.subSectionInfo[t].name : tabCode.replace(/-/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); });

                        var displayTabName = tabName;
                        if (tabName.length > 15) {
                            var truncated = tabName.substring(0, 15) + '...';
                            displayTabName = '<span class="tab-truncated">' + truncated + '</span><span class="namescroll tab-fulltext">' + tabName + '</span>';
                        }

                        tabsHtml += '<li id="tab-' + (i + dataLengthExistingSections) + '-' + t + '" ' +
                            (t === 0 ? 'class="imageFocus tabs_Sections active_tab"' : 'class="tabs_Sections"') +
                            ' source="tabsSection" ' +
                            ' data-section-index="' + (i + dataLengthExistingSections) + '" ' +
                            ' data-tab-index="' + t + '" ' +
                            ' data-code="' + tabCode + '">' +
                            displayTabName +
                            '</li>';
                    }
                }

                tabsHtml += '</ul>';

                Text += tabsHtml;
            }
            else {
                Text += '<div class="section_row"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
                Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>';
            }
            // Text += '<div class="section_row"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
            // Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>';
            Text += '<div class="sectionhorizontal" id="sectionhorizontal-' + (i + dataLengthExistingSections) + '">';
            var viewAllId = ''
            for (var j = 0; j < (data[i].sectionData && data[i].sectionData.data ? data[i].sectionData.data.length : 0); j++) {
                if (data[i].sectionData && data[i].sectionData.data[j].cardType == "top10_poster" || data[i].sectionData && data[i].sectionData.data[j].cardType == "top10_movies_poster" || data[i].sectionData && data[i].sectionData.data[j].cardType == "top10_overlay_poster") {
                    var topimage = utilities.topImages[j % utilities.topImages.length];
                    presentPagedetails.topImages = topimage
                }
                Text += Util.getCard(data[i].sectionData && data[i].sectionData.data[j], 'sectionItem-' + (i + dataLengthExistingSections) + '-' + j);
                viewAllId = 'sectionItem-' + (i + dataLengthExistingSections) + '-' + (j + 1);
            }
            if (data[i].sectionControls.showViewAll == true) {
                Text += Util.getViewAllCard(data[i], viewAllId);
            }
            Text += '</div></div>'
            Text += '</div>'
        }
    }
    return Text;
}
Util.getTabbedPaginationSections = function (data) {
    var Text = '';
    var dataLengthExistingSections = presentPagedetails.sections.length;
    for (var i = 0; i < data.length; i++) {
        if (data[i].sectionControls.dataLength > 0) {
            if (data[i].sectionInfo && data[i].sectionInfo.sectionPresentation == "tabbed_display") {
                Text += '<div class="section_block">'
                Text += '<div class="section_row tabs_rail"  id="section-' + i + '" style="transition: -webkit-transform 150ms linear;">';
                if (data[i].sectionInfo && data[i].sectionInfo.name && data[i].sectionInfo && data[i].sectionInfo.params.showSectionTitle == "true") {
                    Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>'
                }
                // ----- Dynamic Tabs from subSections with IDs -----
                var tabsHtml = '<ul id="tabs-' + i + '">';

                if (data[i].sectionInfo &&
                    data[i].sectionInfo.subSections) {

                    var subSectionsArr = data[i].sectionInfo.subSections.split(',');

                    for (var t = 0; t < subSectionsArr.length; t++) {

                        var tabCode = subSectionsArr[t];

                        var tabName = tabCode
                            .replace(/-/g, ' ')
                            .replace(/\b\w/g, function (l) { return l.toUpperCase(); });

                        var displayTabName = tabName;
                        if (tabName.length > 15) {
                            var truncated = tabName.substring(0, 14) + '...';
                            displayTabName = '<span class="tab-truncated">' + truncated + '</span><span class="namescroll tab-fulltext">' + tabName + '</span>';
                        }

                        tabsHtml += '<li id="tab-' + i + '-' + t + '" ' +
                            (t === 0 ? 'class="tabs_Sections imageFocus active_tab"' : 'class="tabs_Sections"') +
                            ' source="tabsSection" ' +
                            ' data-section-index="' + i + '" ' +
                            ' data-tab-index="' + t + '" ' +
                            ' data-code="' + tabCode + '">' +
                            displayTabName +
                            '</li>';
                    }
                }

                tabsHtml += '</ul>';

                Text += tabsHtml;

                // else{
                //     Text += '<div class="section_row"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
                //     Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>';
                // }
                // Text += '<div class="section_row"  id="section-' + (i + dataLengthExistingSections) + '" style="transition: -webkit-transform 150ms linear;">';
                // Text += '<h3 class="section-heading">' + data[i].sectionInfo.name + '</h3>';
                Text += '<div class="sectionhorizontal" id="sectionhorizontal-' + (i) + '">';
                var section_has_bg = false;
                for (var j = 0; j < (data[i].sectionData && data[i].sectionData.data ? data[i].sectionData.data.length : 0); j++) {
                    if (data[i].sectionData && data[i].sectionData.data[j].cardType == "top10_poster" || data[i].sectionData && data[i].sectionData.data[j].cardType == "top10_movies_poster") {
                        var topimage = utilities.topImages[j % utilities.topImages.length];
                        presentPagedetails.topImages = topimage
                    }
                    var cardData = data[i].sectionData && data[i].sectionData.data[j];
                    Text += Util.getCard(cardData, 'sectionItem-' + (i) + '-' + j);
                    if (cardData && cardData.is_bg_available) section_has_bg = true;
                    viewAllId = 'sectionItem-' + (i) + '-' + (j + 1);
                }
                if (data[i].sectionControls && data[i].sectionControls.showViewAll == true) {
                    Text += Util.getViewAllCard(data[i], viewAllId, section_has_bg);
                }
                Text += '</div></div>'
                Text += '</div>'
            }
        }
    }
    return Text;
}

Util.getViewAllCard = function (data, id, section_has_bg) {
    if (!data.sectionData || !data.sectionData.data || data.sectionData.data.length == 0) return "";
    var Text = '<div class="section-card">'
    var cardType = data.sectionData.data[0].cardType;
    if (cardType == 'sheet_poster') {
        Text += '<div class="sheet_poster card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="sheet_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        Text += '</div>'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
    }
    else if (cardType == 'sheet_poster_2') {
        Text += '<div class="sheet_poster_2 card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="sheet_poster_2"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        Text += '</div>'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
    }
    else if (cardType == 'roller_poster') {
        Text += '<div class="roller_poster card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="roller_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        Text += '</div>'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
    }
    else if (cardType == 'overlay_poster') {
        Text += '<div class="overlay_poster card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="overlay_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        // Text += '<div class="outline-border"></div>'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    } else if (cardType == 'expand_roller_poster') {
        Text += '<div class="roller_poster card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="expand_roller_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        Text += '</div>'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
    } else if (cardType == 'square_poster') {
        Text += '<div class="square_poster card-details view_all " sub_source="view_all" source="sections" cardType="square_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    } else if (cardType == 'circle_poster') {
        Text += '<div class="circle_poster card-details view_all " sub_source="view_all" source="sections" cardType="circle_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    } else if (cardType == 'content_poster') {
        Text += '<div class="content_poster card-details view_all " sub_source="view_all" source="sections" cardType="content_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'top10_movies_poster') {
        Text += '<div class="top10_movies_poster card-details view_all " sub_source="view_all" source="sections" cardType="top10_movies_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'top10_overlay_poster') {
        Text += '<div class="top10_overlay_poster card-details view_all " sub_source="view_all" source="sections" cardType="top10_overlay_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'top10_poster') {
        Text += '<div class="top10_poster card-details view_all " sub_source="view_all" source="sections" cardType="top10_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'continue_watching_poster') {
        Text += '<div class="continue_watching_poster card-details view_all " sub_source="view_all" source="sections" cardType="continue_watching_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'roller_poster_2') {
        Text += '<div class="roller_poster_2 card-details view_all " sub_source="view_all" source="sections" cardType="roller_poster_2"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else if (cardType == 'expand_preview_poster') {
        Text += '<div class="expand_preview_poster card-details view_all " sub_source="view_all" source="sections" cardType="expand_preview_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        // Text += '<img src="images/view_all_roller.png" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/view_all_roller.png"  />'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name ellipsis">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
        Text += '</div>'
    }
    else {
        Text += '<div class="sheet_poster card-details view_all" is_bg_available="' + section_has_bg + '" sub_source="view_all" source="sections" cardType="sheet_poster"  targetPath = "' + data.sectionControls.viewAllTargetPath + '"   id="' + id + '" >'
        Text += '<div class="shows-image">'
        Text += '</div>'
        Text += '<div class="shows-content">'
        Text += '<div class="show-name">'
        Text += '<span class="view_all" >View All </span>'
        Text += '</div></div>'
        Text += '</div>'
    }
    Text += '</div>';
    // Util.getViewallOverlay(id);
    return Text;

}

Util.addPaginationViewAll = function (data) {

    var present_length = presentPagedetails.sections[0].sectionControls.dataLength;
    var noOfCardForARow = keyHandlar.noOfCardForARowInGrid(presentPagedetails.sections[0].sectionData.data[0].cardType);
    var lastRow = Math.floor((present_length - 1) / noOfCardForARow);
    var lastindexdiff = ((lastRow + 1) * noOfCardForARow) - present_length;

    if (lastindexdiff != 0) {
        var TextInsideRow = "";
        var currentRowData = [];
        for (var i = 0; i < lastindexdiff; i++) {
            TextInsideRow += Util.getCard(data.data[i], 'sectionItem-' + lastRow + '-' + ((noOfCardForARow - lastindexdiff) + i));
            presentPagedetails.sections[0].sectionData.data.push(data.data[i]);
            currentRowData.push(data.data[i]);
        }
        Yup("#viewAllrow-" + lastRow).append(TextInsideRow);
        presentPagedetails.arrayResults.push(currentRowData);  // Store current row data
    }

    data.data = data.data.slice(lastindexdiff, data.data.length);
    present_length = presentPagedetails.sections[0].sectionData.data.length;

    var Text = "";
    for (var i = 0; i < data.data.length; i++) {
        var v_index = Math.floor((i + present_length) / noOfCardForARow);
        var h_index = i % noOfCardForARow;
        if (h_index == 0) {
            Text += "<div id='viewAllrow-" + v_index + "' class='row viewall_row'>";
        }

        Text += Util.getCard(data.data[i], 'sectionItem-' + v_index + '-' + h_index);

        if (h_index == noOfCardForARow - 1 || i === data.data.length - 1) {
            Text += "</div>";
            presentPagedetails.arrayResults.push(data.data.slice(i - h_index, i + 1));  // Store each row data
        }

        presentPagedetails.sections[0].sectionData.data.push(data.data[i]);
    }

    Yup(".sectionsGrid_Items").append(Text);

    Main.HideLoading();

    presentPagedetails.sections[0].sectionData.hasMoreData = data.hasMoreData;
    presentPagedetails.sections[0].sectionData.lastIndex = data.lastIndex;
    presentPagedetails.sections[0].sectionControls.dataLength = presentPagedetails.sections[0].sectionData.data.length;
}

Util.comingSoon = function () {
    return '<div class="coomingSoon"><h3 class="nodataFound"> Coming Soon </h3></div>';
}

Util.noDataFound = function () {

    if (presentPagedetails.targetPath == 'my_library' || presentPagedetails.targetPath == 'mylibrary') {
        if (Main.userProfile.userStatus == true) {
            var Text = '';
            Text += '<div class="uniquePage" id="myLibrary">'
            Text += '<div class="container">'
            Text += '<h1 class="main-heading textCenter"> No Content Found </h1>'
            Text += '<h3 class="sub-heading textCenter"> Content from your subscriptions and purchases will appear here</h3>'
            Text += '</div>'
            Text += '</div>'
            return Text;
        } else {
            var Text = '';
            Text += '<div class="uniquePage" id="myLibrary">'
            Text += '<div class="container">'
            Text += '<h1 class="main-heading textCenter"> Please Sign In to view <span> \'My Library\'</span> </h1>'
            Text += '<div class="btn-wrap">'
            // Text += '<button type="button" id="signin-0" source="uniqueButtons" targetPath="signup" class="grey-btn library-button mr50 "> Sign up </button>'
            Text += '<button type="button" id="signin-1" source="uniqueButtons" targetPath="signin" class="grey-btn library-button"> Sign In </button>'
            Text += '</div>'
            Text += '</div>'
            Text += '</div>'
            return Text;
        }
    }

    else if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath || presentPagedetails.targetPath == 'favorites') {
        if (Main.userProfile.userStatus == true) {
            var Text = '';
            Text += '<div class="uniquePage" id="myLibrary">'
            Text += '<div class="container">'
            Text += '<img src="images/no_favourites.png"/>'
            Text += '<h1 class="main-heading textCenter">Looks like you don’t have any favourites yet!</h1>'
            Text += '<h3 class="sub-heading textCenter">Your favourite content will be listed here.</h3>'
            Text += '</div>'
            Text += '</div>'
            return Text;
        } else {
            var Text = '';
            Text += '<div class="uniquePage" id="myLibrary">'
            Text += '<div class="container">'
            Text += '<h1 class="main-heading textCenter"> Please Sign In to view <span> \'Favourites\'</span> </h1>'
            Text += '<div class="btn-wrap">'
            // Text += '<button type="button" id="signin-0" source="uniqueButtons" targetPath="signup" class="grey-btn library-button mr50 "> Sign up </button>'
            Text += '<button type="button" id="signin-1" source="uniqueButtons" targetPath="signin" class="grey-btn library-button"> Sign In </button>'
            Text += '</div>'
            Text += '</div>'
            Text += '</div>'
            return Text;
        }
    }
    else {
        return '<h3 class="nodataFound"> No Data Found </h3>';
    }
}

// cards designs
Util.getCard = function (data, id) {
    var showTitleFound = false;
    var is_bg_available = false;
    var elements = (data.display && data.display.elements) || (data.hover && data.hover.elements) || [];
    for (var k = 0; k < elements.length; k++) {
        if (elements[k].key === "bgImage" && elements[k].value !== "") {
            is_bg_available = true;
            break;
        }
    }
    data.is_bg_available = is_bg_available;
    var Text = '<div class="section-card">'
    if (data.cardType == 'sheet_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="sheet_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="sheet_poster" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"  id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="sheet_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="sheet_poster"  targetPath = "' + data.target.path + '"template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'freeepisodebadge') {  //for freeepisodebadge
                        Text += '<span class="freeepisodebadge_tag"><span class="freeepisode_badge"></span>' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'seek') {
                        // var percent = parseInt(data.display.markers[x].value) * 10;
                        var value = data.display.markers[x].value
                        var width;
                        if (value != '1' && value != '0') {
                            if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                                width = 1;
                            }
                            else {
                                width = parseInt((parseFloat(value) * 100).toString().substring(0, 2))
                            }
                        }
                        else if (val != '1') {
                            width = 100;
                        }
                        else {
                            width = 0;
                        }
                        Text += '<div class="progress" >'
                        Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                        Text += '</div></div>'
                    }
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'

            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }

    //   if (data.cardType == 'sheet_poster') {
    //     if(data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath!=systemConfigs.configs.favouriteMenuTargetPath ){  //if it is video card
    //         Text += '<div class="sheet_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="sheet_poster" contentType="video" targetPath = "' + data.target.path + '" template="'+data.template+'"  id="' + id + '" >'
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if(data.display.markers && data.display.markers.length > 0){
    //             for(var x=0;x<data.display.markers.length;x++){
    //                 if(data.display.markers[x].markerType == 'duration'){  //Program duration
    //                     Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                 }
    //                 // if(data.display.markers[x].markerType == 'seek'){
    //                 //     var percent = parseInt(data.display.markers[x].value * 100);
    //                 //     Text += '<div class="progress">'
    //                 //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
    //                 //     Text += '</div></div>'
    //                 // }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
    //         if(data.display.parentIcon != undefined && data.display.parentIcon != ""){
    //              Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
    //         }
    //         Text += '</div>'
    //         Text += '<div class="shows-content overlay">'
    //         Text += '<div class="show-name ellipsis">'
    //         if (window.innerWidth>1280 && data.display.title.length >= 28)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else if(window.innerWidth<=1280 && data.display.title.length >= 18 )
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else
    //             Text += '<span>' + data.display.title + '</span>'
    //             Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
    //         Text += '</div>'
    //     }else{  //default
    //         if (data.hover && data.hover.elements) {
    //             var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
    //             for (var k = 0; k < data.hover.elements.length; k++) {
    //                 if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
    //                     previewUrlValue = data.hover.elements[k].value;
    //                 }
    //             }
    //         }
    //         Text += '<div class="sheet_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' +(previewUrlValue ? previewUrlValue : "") +'" src="" source="sections" cardType="sheet_poster"  targetPath = "' + data.target.path + '"template="'+data.template+'"   id="' + id + '" >'
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
    //             Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
    //         }
    //         if (data.display.markers && data.display.markers.length > 0) {
    //             for (var x = 0; x < data.display.markers.length; x++) {
    //                  if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="Premium"){  //Program type
    //                     // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                     Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
    //                 }
    //                 if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="free_episode"){  //Program type
    //                     // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                     Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
    //                 }
    //                 if(data.display.markers[x].markerType == 'livebadge'){  //for live
    //                     Text+='<span class="live_tag"><span class="red_dot"></span>'+data.display.markers[x].value+'</span>'
    //                 }
    //                 if(data.display.markers[x].markerType == 'freeepisodebadge'){  //for freeepisodebadge
    //                     Text+='<span class="freeepisodebadge_tag"><span class="freeepisode_badge"></span>'+data.display.markers[x].value+'</span>'
    //                 }
    //                 if (data.display.markers[x].markerType == 'seek') {
    //                     // var percent = parseInt(data.display.markers[x].value) * 10;
    //                     var value = data.display.markers[x].value
    //                     var width;
    //                     if (value != '1' && value != '0') {
    //                         if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
    //                             width=1;
    //                         }
    //                         else{
    //                             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
    //                         }
    //                     }
    //                     else if(val != '1'){
    //                         width=100;
    //                     }
    //                     else{
    //                         width=0;
    //                     }
    //                     Text += '<div class="progress" >'
    //                     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
    //                     Text += '</div></div>'
    //                 }
    //                 if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
    //                 showTitleFound = true;
    //                 }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'

    //         Text += '</div>'
    //        if(showTitleFound == true){
    //         Text += '<div class="shows-content overlay">'
    //         // Text += '<div class="logo">'
    //         // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
    //         // Text += '</div>'
    //         Text += '<div class="show-name ">'
    //         if (window.innerWidth > 1280 ){
    //         if(data.display.title.length >37){
    //             // presentPagedetails.descriptionText = elements.data
    //             // var description_text = elements.data;
    //             // presentPagedetails.description= elements.data;
    //             data.display.title=data.display.title.substr(0, 37);
    //             data.display.title +='...'
    //         }
    //             Text += '<span class="namescroll">Blur</span>'
    //     }
    //         else if (window.innerWidth <= 1280){
    //             if(data.display.title.length >37){
    //                 // presentPagedetails.descriptionText = elements.data
    //                 // var description_text = elements.data;
    //                 // presentPagedetails.description= elements.data;
    //                 data.display.title=data.display.title.substr(0, 37);
    //                 data.display.title +='...'
    //             }
    //             Text += '<span class="namescroll">Blur</span>'
    //         }
    //         else
    //             Text += '<span>Blur</span>'
    //         Text += '<span class="subTitle ellipsis">Blur</span>'
    //         Text += "</div></div>"

    //         showTitleFound = false;
    //     }
    //     Text += '</div>'
    // }

    // }
    else if (data.cardType == 'show_card') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="show_card card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="show_card" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"  id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="show_card card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="show_card"  targetPath = "' + data.target.path + '"template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'freeepisodebadge') {  //for freeepisodebadge
                        Text += '<span class="freeepisodebadge_tag"><span class="freeepisode_badge"></span>' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'seek') {
                        // var percent = parseInt(data.display.markers[x].value) * 10;
                        var value = data.display.markers[x].value
                        var width;
                        if (value != '1' && value != '0') {
                            if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                                width = 1;
                            }
                            else {
                                width = parseInt((parseFloat(value) * 100).toString().substring(0, 2))
                            }
                        }
                        else if (val != '1') {
                            width = 100;
                        }
                        else {
                            width = 0;
                        }
                        Text += '<div class="progress" >'
                        Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                        Text += '</div></div>'
                    }
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'

            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis"><b>' + (data.display.subtitle1 ? data.display.subtitle1.replace(/\$/g, "•") : "") + '</b></span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'content_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="content_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="content_poster"  contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="content_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="content_poster" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else{
                    //         width=0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }
    }
    else if (data.cardType == 'overlay_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {
            Text += '<div class="overlay_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="overlay_poster" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png" /></div>'
            }
            Text += '</div>'
            if (data.display.title.trim().length != 0) {
                Text += '<div class="shows-content overlay">'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
                Text += '</div>'
            }
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="overlay_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="overlay_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '</div>'
            if (data.display.title.trim().length != 0) {
                if (showTitleFound == true) {
                    Text += '<div class="shows-content overlay">'
                    // Text += '<div class="logo">'
                    // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                    // Text += '</div>'
                    Text += '<div class="show-name ellipsis">'
                    if (window.innerWidth > 1280 && data.display.title.length >= 28)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else
                        Text += '<span>' + data.display.title + '</span>'
                    //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                    Text += "</div></div>"
                    showTitleFound = false;
                }
            }
            Text += '</div>'
        }
    }
    else if (data.cardType == 'roller_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src=""  source="sections" cardType="roller_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"
                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'floating_rail') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="floating_rail card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="floating_rail" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="floating_rail card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src=""  source="sections" cardType="floating_rail"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"
                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    //  else if (data.cardType == 'roller_poster') {
    //     if(data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath!=systemConfigs.configs.favouriteMenuTargetPath ){  //if it is video card
    //         Text += '<span></span><div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="'+data.template+'" >'
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if(data.display.markers && data.display.markers.length > 0){
    //             for(var x=0;x<data.display.markers.length;x++){
    //                 if(data.display.markers[x].markerType == 'duration'){  //Program duration
    //                     Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                 }
    //                 // if(data.display.markers[x].markerType == 'seek'){
    //                 //     var percent = parseInt(data.display.markers[x].value * 100);
    //                 //     Text += '<div class="progress">'
    //                 //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
    //                 //     Text += '</div></div>'
    //                 // }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
    //         if(data.display.parentIcon != undefined && data.display.parentIcon != ""){
    //              Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
    //         }
    //         Text += '</div>'
    //         Text += '<div class="shows-content overlay">'
    //         Text += '<div class="show-name ellipsis">'
    //         if (window.innerWidth>1280 && data.display.title.length >= 28)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else if(window.innerWidth<=1280 && data.display.title.length >= 18 )
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else
    //             Text += '<span>' + data.display.title + '</span>'
    //             //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
    //         Text += '</div>'
    //     }else{  //default
    //         if (data.hover && data.hover.elements) {
    //             var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
    //             for (var k = 0; k < data.hover.elements.length; k++) {
    //                 if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
    //                     previewUrlValue = data.hover.elements[k].value;
    //                 }
    //             }
    //         }
    //         Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' +(previewUrlValue ? previewUrlValue : "") +'" src=""  source="sections" cardType="roller_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="'+data.template+'"  >'
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
    //             Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
    //         }
    //              if(data.display.markers && data.display.markers.length > 0){
    //             for(var x=0;x<data.display.markers.length;x++){
    //                 if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
    //                     showTitleFound = true;
    //                     }
    //                     if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="Premium"){  //Program type
    //                         // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                         Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
    //                     }
    //                     if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="free_episode"){  //Program type
    //                         // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                         Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
    //                     }
    //                 if(data.display.markers[x].markerType == 'livebadge'){  //for live
    //                     Text+='<span class="live_tag"><span class="red_dot"></span>'+data.display.markers[x].value+'</span>'
    //                 }
    //                 // if(data.display.markers[x].markerType == 'seek'){
    //                 //     // var percent = parseInt(data.display.markers[x].value) * 10;
    //                 //     var value=data.display.markers[x].value
    //                 //     var width;
    //                 //     if(value != '1' && value != '0'){
    //                 //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
    //                 //             width=1;
    //                 //         }
    //                 //         else{
    //                 //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
    //                 //         }
    //                 //     }
    //                 //     else if(val != '1'){
    //                 //         width=100;
    //                 //     }
    //                 //     else {
    //                 //         width = 0;
    //                 //     }
    //                 //     Text += '<div class="progress">'
    //                 //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%">'
    //                 //     Text += '</div></div>'
    //                 // }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
    //         Text += '</div>'
    //        if(showTitleFound == true){
    //         Text += '<div class="shows-content overlay">'
    //         // Text += '<div class="logo">'
    //         // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
    //         // Text += '</div>'
    //         Text += '<div class="show-name ellipsis">'
    //         if (window.innerWidth > 1280 && data.display.title.length >= 28)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else
    //             Text += '<span>' + data.display.title + '</span>'
    //             //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
    //         Text +="</div></div>"
    //         showTitleFound = false;
    //     }
    //         Text += '</div>'
    // }

    // }
    else if (data.cardType == 'player-card') {
        if (data.target.pageAttributes.isDeeplinking == "true") {
            if (!!data.target.pageAttributes.template) {
                Text += '<div class="player-card card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="player-card"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.target.pageAttributes.template + '"  >'
            }
            else {
                Text += '<div class="player-card card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="player-card"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            }
        }
        else {
            Text += '<div class="player-card card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="player-card"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.target.pageAttributes.template + '"  >'

        }
        Text += '<div class="outline-border"></div>'
        Text += '<div class="shows-image">'
        if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
            Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
        }
        if (data.display.markers && data.display.markers.length > 0) {
            for (var x = 0; x < data.display.markers.length; x++) {
                if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                    showTitleFound = true;
                }
                if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                    // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                    Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                }
                if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                    // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                    Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                }
                if (data.display.markers[x].markerType == 'livebadge') {  //for live
                    Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                }
                if (data.display.markers[x].markerType == 'seek') {
                    // var percent = parseInt(data.display.markers[x].value) * 10;
                    var value = data.display.markers[x].value
                    var width;
                    if (value != '1' && value != '0') {
                        if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                            width = 1;
                        }
                        else {
                            width = parseInt((parseFloat(value) * 100).toString().substring(0, 2))
                        }
                    }
                    else if (val != '1') {
                        width = 100;
                    }
                    else {
                        width = 0;
                    }
                    Text += '<div class="progress" >'
                    Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    Text += '</div></div>'
                }
            }
        }
        Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
        Text += '</div>'
        if (data.display.title.trim().length != 0) {
            Text += '<div class="shows-content'
            if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
                Text += ' live overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altsrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
            }
            else {
                Text += '">'
            }
            if (presentPagedetails.steamResponse.analyticsInfo.dataType != "vod" && presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                Text += '<div class="show-name ">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 37) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 37);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '</div>'
            }
            if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
                Text += '<span class="subTitle duration">' + data.display.subtitle1 + '</span>'
            }
            Text += '</div>'
        }
        Text += '</div>'
    }
    // else if (data.cardType == 'expand_roller_poster') {
    //     if(data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath!=systemConfigs.configs.favouriteMenuTargetPath ){  //if it is video card
    //         Text += '<div class="expand_roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="expand_roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="'+data.template+'"  >'
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if(data.display.markers && data.display.markers.length > 0){
    //             for(var x=0;x<data.display.markers.length;x++){
    //                 if(data.display.markers[x].markerType == 'duration'){  //Program duration
    //                     Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                 }
    //                 // if(data.display.markers[x].markerType == 'seek'){
    //                 //     var percent = parseInt(data.display.markers[x].value * 100);
    //                 //     Text += '<div class="progress">'
    //                 //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
    //                 //     Text += '</div></div>'
    //                 // }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
    //         if(data.display.parentIcon != undefined && data.display.parentIcon != ""){
    //              Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
    //         }
    //         Text += '</div>'
    //         Text += '<div class="shows-content overlay">'
    //         Text += '<div class="show-name ellipsis">'
    //         if (window.innerWidth>1280 && data.display.title.length >= 28)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else if(window.innerWidth<=1280 && data.display.title.length >= 18 )
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else
    //             Text += '<span>' + data.display.title + '</span>'
    //        // Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
    //         Text += '</div>'
    //     }else{  //default
    //         if (data.hover && data.hover.elements) {
    //             var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
    //             for (var k = 0; k < data.hover.elements.length; k++) {
    //                 if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
    //                     previewUrlValue = data.hover.elements[k].value;
    //                 }
    //             }
    //         }
    //         Text += '<div class="expand_roller_poster  card-details" is_bg_available="' + is_bg_available + '" data-src="' +(previewUrlValue ? previewUrlValue : "") +'" src="" source="sections" cardType="expand_roller_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="'+data.template+'" >'
    //         // Text += '<img class="numbering" src="../images/number5.png" > trending '
    //         Text += '<div class="outline-border"></div>'
    //         Text += '<div class="shows-image">'
    //         if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
    //             Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
    //         }

    //         if(data.display.markers && data.display.markers.length > 0){
    //                     if(data.display.markers && data.display.markers.length > 0){
    //             for(var x=0;x<data.display.markers.length;x++){
    //                 if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
    //                     showTitleFound = true;
    //                     }
    //                     if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="Premium"){  //Program type
    //                         // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                         Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
    //                     }
    //                     if(data.display.markers[x].markerType == 'badge' && data.display.markers[x].value =="free_episode"){  //Program type
    //                         // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
    //                         Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
    //                     }
    //                 if(data.display.markers[x].markerType == 'livebadge'){  //for live
    //                     Text+='<span class="live_tag"><span class="red_dot"></span>'+data.display.markers[x].value+'</span>'
    //                 }
    //                 // if(data.display.markers[x].markerType == 'seek'){
    //                 //     // var percent = parseInt(data.display.markers[x].value) * 10;
    //                 //     var value=data.display.markers[x].value
    //                 //     var width;
    //                 //     if(value != '1' && value != '0'){
    //                 //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
    //                 //             width=1;
    //                 //         }
    //                 //         else{
    //                 //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
    //                 //         }
    //                 //     }
    //                 //     else if(val != '1'){
    //                 //         width=100;
    //                 //     }
    //                 //     else{
    //                 //         width=0;
    //                 //     }
    //                 //     Text += '<div class="progress">'
    //                 //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%">'
    //                 //     Text += '</div></div>'
    //                 // }
    //             }
    //         }
    //         Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
    //         Text += '</div>'
    //         if(showTitleFound == true){

    //         Text += '<div class="shows-content overlay">'
    //         // Text += '<div class="logo">'
    //         // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
    //         // Text += '</div>'
    //         Text += '<div class="show-name ellipsis">'
    //         if (window.innerWidth>1280 && data.display.title.length >= 28)
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else if(window.innerWidth<=1280 && data.display.title.length >= 18 )
    //             Text += '<span class="namescroll">' + data.display.title + '</span>'
    //         else
    //             Text += '<span>' + data.display.title + '</span>'
    //         //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
    //        /* Text += '<span class="oth_info">2021 | Hindi | Drama | 13+</span>' */ /* this is for trending section */
    //         Text += "</div></div>"
    //         showTitleFound = false;
    //     }
    //         Text += '</div>'

    // }
    //     } 
    // }
    else if (data.cardType == 'expand_roller_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="expand_roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="expand_roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            // Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="expand_roller_poster  card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="expand_roller_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            // Text += '<img class="numbering" src="../images/number5.png" > trending '
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }

            if (data.display.markers && data.display.markers.length > 0) {
                if (data.display.markers && data.display.markers.length > 0) {
                    for (var x = 0; x < data.display.markers.length; x++) {
                        if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                            showTitleFound = true;
                        }
                        if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                            // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                            Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                        }
                        if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                            // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                            Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                        }
                        if (data.display.markers[x].markerType == 'livebadge') {  //for live
                            Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                        }
                        // if(data.display.markers[x].markerType == 'seek'){
                        //     // var percent = parseInt(data.display.markers[x].value) * 10;
                        //     var value=data.display.markers[x].value
                        //     var width;
                        //     if(value != '1' && value != '0'){
                        //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                        //             width=1;
                        //         }
                        //         else{
                        //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                        //         }
                        //     }
                        //     else if(val != '1'){
                        //         width=100;
                        //     }
                        //     else{
                        //         width=0;
                        //     }
                        //     Text += '<div class="progress">'
                        //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%">'
                        //     Text += '</div></div>'
                        // }
                    }
                }
                Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
                Text += '</div>'
                if (showTitleFound == true) {

                    Text += '<div class="shows-content overlay">'
                    // Text += '<div class="logo">'
                    // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                    // Text += '</div>'
                    Text += '<div class="show-name ellipsis">'
                    if (window.innerWidth > 1280 && data.display.title.length >= 28)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else
                        Text += '<span>' + data.display.title + '</span>'
                    //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                    /* Text += '<span class="oth_info">2021 | Hindi | Drama | 13+</span>' */ /* this is for trending section */
                    Text += "</div></div>"
                    showTitleFound = false;
                }
                Text += '</div>'

            }
        }
    }
    else if (data.cardType == 'square_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is a video card
            Text += '<div class="square_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="square_poster" contentType="video" targetPath="' + data.target.path + '" id="' + id + '" template="' + data.template + '">';
            Text += '<div class="outline-border"></div>';
            Text += '<div class="shows-image">';

            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '">' + data.display.markers[x].value + '</span>';
                    }
                    // if (data.display.markers[x].markerType == 'seek') {
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">';
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%"></div>';
                    //     Text += '</div>';
                    // }
                }
            }

            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-empty.png"  />';
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>';
            }

            Text += '</div>';
            Text += '<div class="shows-content overlay">';
            Text += '<div class="show-name ellipsis">';
            if (window.innerWidth > 1280 && data.display.title.length >= 28) {
                Text += '<span class="namescroll">' + data.display.title + '</span>';
            } else if (window.innerWidth <= 1280 && data.display.title.length >= 18) {
                Text += '<span class="namescroll">' + data.display.title + '</span>';
            } else {
                Text += '<span>' + data.display.title + '</span>';
            }
            Text += '</div>';
            Text += '</div>';
            Text += '</div>';
        } else {  //default
            Text += '<div class="square_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="square_poster" targetPath="' + data.target.path + '" id="' + id + '" template="' + data.template + '">';
            Text += '<div class="outline-border"></div>';
            Text += '<div class="shows-image">';

            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }

            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    // if(data.display.markers[x].markerType == 'badge'){  //Program type
                    //     Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                    // }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>';
                    }
                    // if (data.display.markers[x].markerType == 'seek') {
                    //     var value = data.display.markers[x].value;
                    //     var width;
                    //     if (value != '1' && value != '0') {
                    //         if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                    //             width = 1;
                    //         } else {
                    //             width = parseInt((parseFloat(value) * 100).toString().substring(0, 2));
                    //         }
                    //     } else if (value != '1') {
                    //         width = 100;
                    //     } else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress" >';
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%"></div>';
                    //     Text += '</div>';
                    // }
                }
            }

            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-empty.png"  />';
            Text += '</div>';

            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">';
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                /* Text += '<span class="oth_info">2021 | Hindi | Drama | 13+</span>' */ /* this is for trending section */
                Text += "</div></div>"
                showTitleFound = false;
            }
            Text += '</div>'

        }
    }
    else if (data.cardType == 'circle_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="circle_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="circle_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                //  Text += '<span>' + data.display.title + '</span>'
                // Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
                Text += '</div>'
        } else {  //default
            Text += '<div class="circle_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="circle_poster"  targetPath = "' + data.target.path + '"   id="' + id + '"template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge') {  //Program type
                        Text += '<div class="brMarker br2"><img class="under_badge" src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                }
            }
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else{
                    //         width=0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    // Text += '<span>' + data.display.title + '</span>'
                    //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                    Text += "</div></div>"
                showTitleFound = false;
            }
            Text += '</div>'
        }
    }
    else if (data.cardType == 'top10_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="top10_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="top10_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }

            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'

            Text += '<img src="' + presentPagedetails.topImages + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'

            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                //  Text += '<span>' + data.display.title + '</span>'
                // Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
                Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="top10_poster" card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="top10_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'showTitle') {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png""/></div>';
                    }
                }
            }
            var urlBefore = data.display.imageUrl.split(':');
            if (urlBefore[0] == "https") {
                Text += '<img src="' + data.display.imageUrl + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            }
            else {
                Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            }
            Text += '<img src="' + presentPagedetails.topImages + '" class= "top_images"  onerror="this.src = Yup(this).attr(\'altSrc\')"     />'
            Text += '</div>'
            if (data.display.title.trim().length != 0) {
                if (showTitleFound == true) {
                    Text += '<div class="shows-content overlay">'
                    Text += '<div class="show-name ellipsis">'
                    if (window.innerWidth > 1280 && data.display.title.length >= 28)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else
                        Text += '<span>' + data.display.title + '</span>'
                    Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                    Text += '</div></div>'
                    showTitleFound = false;
                }
            }
            Text += '</div>'
        }
    }
    else if (data.cardType == 'top10_movies_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="top10_movies_poster card-details" is_bg_available="' + is_bg_available + '" source="sections"  cardType="top10_movies_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }

            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'

            Text += '<img src="' + presentPagedetails.topImages + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'

            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                //  Text += '<span>' + data.display.title + '</span>'
                // Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
                Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="top10_movies_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="top10_movies_poster" targetPath="' + data.target.path + '" id="' + id + '">';
            Text += '<div class="outline-border"></div>';

            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                }
            }
            var urlBefore = data.display.imageUrl.split(':');
            if (urlBefore[0] == "https") {
                Text += '<img src="' + data.display.imageUrl + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            }
            else {
                Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            }
            Text += '<img src="' + presentPagedetails.topImages + '" class= "top_images"  onerror="this.src = Yup(this).attr(\'altSrc\')"     />'
            Text += '</div>'
            if (data.display.title.trim().length != 0) {
                if (showTitleFound == true) {
                    Text += '<div class="shows-content overlay">'
                    Text += '<div class="show-name ellipsis">'
                    if (window.innerWidth > 1280 && data.display.title.length >= 28)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                        Text += '<span class="namescroll">' + data.display.title + '</span>'
                    else
                        Text += '<span>' + data.display.title + '</span>'
                    Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                    Text += '</div></div>'
                    showTitleFound = false;
                }
            }
            Text += '</div>'
        }
    }
    else if (data.cardType == 'continue_watching_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'seek') {
                        var percent = parseInt(data.display.markers[x].value * 100);
                        Text += '<div class="progress">'
                        Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                        Text += '</div></div>'
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="continue_watching_poster card-details" is_bg_available="' + is_bg_available + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" source="sections" cardType="continue_watching_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'seek') {
                        // var percent = parseInt(data.display.markers[x].value) * 10;
                        var value = data.display.markers[x].value
                        var width;
                        if (value != '1' && value != '0') {
                            if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                                width = 1;
                            }
                            else {
                                width = parseInt((parseFloat(value) * 100).toString().substring(0, 2))
                            }
                        }
                        else if (val != '1') {
                            width = 100;
                        }
                        else {
                            width = 0;
                        }
                        Text += '<div class="progress" >'
                        Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                        Text += '</div></div>'
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            // if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
            //     Text += '<div class="partner_logo"><img src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            // }
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 47) {
                        data.display.title = data.display.title.slice(0, 47);
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 47) {
                        data.display.title = data.display.title.slice(0, 47);
                        data.display.title
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                if (data.display.markers && data.display.markers.length > 0) {
                    for (var x = 0; x < data.display.markers.length; x++) {
                        if (data.display.markers[x].markerType == 'leftOverTime') {  //Program type
                            Text += '<span class="left_over">' + data.display.markers[x].value + '</span>'
                        }
                    }
                }
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'common_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="common_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" cardType="common_poster"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            // if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
            //     Text += '<div class="partner_logo"><img src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            // }
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 60) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 60);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 60) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 60);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'banner') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="roller_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            Text += '<div class="banner card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="banner"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge') {  //Program type
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + width + '%; background-color:#' + data.display.markers[x].bgColor + '">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            // if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
            //     Text += '<div class="partner_logo"><img src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            // }
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                //Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"
                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'sheet_poster_2') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="sheet_poster_2 card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="sheet_poster_2" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"  id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 50)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 34)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="sheet_poster_2 card-details" is_bg_available="' + is_bg_available + '" source="sections" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" cardType="sheet_poster_2"  targetPath = "' + data.target.path + '"template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if (data.display.markers[x].markerType == 'seek') {
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value = data.display.markers[x].value
                    //     var width;
                    //     if (value != '1' && value != '0') {
                    //         if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else{
                    //         width=0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'

            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 50) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 50);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 33) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 33);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'top10_overlay_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="top10_overlay_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="top10_overlay_poster" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"  id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 50)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 34)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="top10_overlay_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" cardType="top10_overlay_poster"  targetPath = "' + data.target.path + '"template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if (data.display.markers[x].markerType == 'seek') {
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value = data.display.markers[x].value
                    //     var width;
                    //     if (value != '1' && value != '0') {
                    //         if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else{
                    //         width=0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            Text += '<img src="' + presentPagedetails.topImages + '" class= "top_images"  onerror="this.src = Yup(this).attr(\'altSrc\')"     />'
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 50) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 50);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 33) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 33);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else if (data.cardType == 'expand_preview_poster') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="expand_preview_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="expand_preview_poster" contentType="video" targetPath = "' + data.target.path + '" template="' + data.template + '"  id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/partners-circle.png" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ellipsis">'
            if (window.innerWidth > 1280 && data.display.title.length >= 50)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 34)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="expand_preview_poster card-details" is_bg_available="' + is_bg_available + '" source="sections" lIimage="' + (data.target.pageAttributes.LImage ? data.target.pageAttributes.LImage : "") + '" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" cardType="expand_preview_poster"  targetPath = "' + data.target.path + '"template="' + data.template + '"   id="' + id + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if (data.display.markers[x].markerType == 'seek') {
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value = data.display.markers[x].value
                    //     var width;
                    //     if (value != '1' && value != '0') {
                    //         if (parseInt((parseFloat(value) * 100).toString().substring(0, 2)) == 0) {
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else{
                    //         width=0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                }
            }
            Text += '<img class="poster-img" src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            if (data.target.pageAttributes && data.target.pageAttributes.LImage) {
                Text += '<img class="expand-liimage" src="' + Util.getImages((data.target.pageAttributes.LImage ? data.target.pageAttributes.LImage : "")) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
            }
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 50) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 50);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 33) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 33);
                        data.display.title += '...'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }

    else if (data.cardType == 'roller_poster_2') {
        if (data.metadata && data.metadata.contentType && (data.metadata.contentType.value == 'video' || data.metadata.contentType.value == 'movie') && presentPagedetails.targetPath != systemConfigs.configs.favouriteMenuTargetPath) {  //if it is video card
            Text += '<div class="roller_poster_2 card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="roller_poster_2" contentType="video" targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '" >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType == 'duration') {  //Program duration
                        Text += '<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     var percent = parseInt(data.display.markers[x].value * 100);
                    //     Text += '<div class="progress">'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + percent + '%">'
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            }
            Text += '</div>'
            Text += '<div class="shows-content overlay">'
            Text += '<div class="show-name ">'
            if (window.innerWidth > 1280 && data.display.title.length >= 28)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                Text += '<span class="namescroll">' + data.display.title + '</span>'
            else
                Text += '<span>' + data.display.title + '</span>'
            //Text += '</div><span class="subTitle ellipsis">' + data.display.subtitle1 + '</span></div>'
            Text += '</div>'
        } else {  //default
            if (data.hover && data.hover.elements) {
                var previewUrlValue = ""; // Initialize previewUrlValue with an empty string
                for (var k = 0; k < data.hover.elements.length; k++) {
                    if (data.hover.elements[k].key === "previewUrl" && data.hover.elements[k].value !== "") {
                        previewUrlValue = data.hover.elements[k].value;
                    }
                }
            }
            Text += '<div class="roller_poster_2 card-details" is_bg_available="' + is_bg_available + '" source="sections" data-src="' + (previewUrlValue ? previewUrlValue : "") + '" src="" cardType="roller_poster_2"  targetPath = "' + data.target.path + '"   id="' + id + '" template="' + data.template + '"  >'
            Text += '<div class="outline-border"></div>'
            Text += '<div class="shows-image">'
            if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
                Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
            }
            if (data.display.markers && data.display.markers.length > 0) {
                for (var x = 0; x < data.display.markers.length; x++) {
                    if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                        showTitleFound = true;
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data.display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data.display.markers[x].value + '</span>'
                    }
                    // if(data.display.markers[x].markerType == 'seek'){
                    //     // var percent = parseInt(data.display.markers[x].value) * 10;
                    //     var value=data.display.markers[x].value
                    //     var width;
                    //     if(value != '1' && value != '0'){
                    //         if(parseInt((parseFloat(value)*100).toString().substring(0,2)) == 0){
                    //             width=1;
                    //         }
                    //         else{
                    //             width=parseInt((parseFloat(value)*100).toString().substring(0,2))
                    //         }
                    //     }
                    //     else if(val != '1'){
                    //         width=100;
                    //     }
                    //     else {
                    //         width = 0;
                    //     }
                    //     Text += '<div class="progress" >'
                    //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';  width:' + width + '%">';
                    //     Text += '</div></div>'
                    // }
                }
            }
            Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_roller.png"  />'
            // if (data.display.parentIcon != undefined && data.display.parentIcon != "") {
            //     Text += '<div class="partner_logo"><img src="' + Util.getImages(data.display.parentIcon) + '" /></div>'
            // }
            Text += '</div>'
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                // Text += '<div class="logo">'
                // Text += '<img src="' + Util.getImages(data.display.parentIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"/>'
                // Text += '</div>'
                Text += '<div class="show-name">'
                if (window.innerWidth > 1280) {
                    if (data.display.title.length > 60) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 60);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else if (window.innerWidth <= 1280) {
                    if (data.display.title.length > 60) {
                        // presentPagedetails.descriptionText = elements.data
                        // var description_text = elements.data;
                        // presentPagedetails.description= elements.data;
                        data.display.title = data.display.title.substr(0, 60);
                        data.display.title += '....'
                    }
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                }
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += "</div></div>"

                showTitleFound = false;
            }
            Text += '</div>'
        }

    }
    else {  // defaults to search-card
        Text += '<div class="search-card card-details" is_bg_available="' + is_bg_available + '" source="sections" cardType="search-card"  targetPath = "' + data.target.path + '"   id="' + id + '" >'
        Text += '<div class="outline-border"></div>'
        Text += '<div class="shows-image">'
        if (data.display.partnerIcon != undefined && data.display.partnerIcon != "") {
            Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(data.display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
        }
        if (data.display.markers && data.display.markers.length > 0) {
            for (var x = 0; x < data.display.markers.length; x++) {
                if (data.display.markers[x].markerType.toLowerCase() == 'showtitle' && data.display.markers[x].value == "true") {
                    showTitleFound = true;
                }
                if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "Premium") {  //Program type
                    // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                    Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                }
                if (data.display.markers[x].markerType == 'badge' && data.display.markers[x].value == "free_episode") {  //Program type
                    // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                    Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                }
            }
        }
        Text += '<img src="' + Util.getImages(data.display.imageUrl) + '" style="height: 100%;" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png"  />'
        Text += '</div>'
        if (data.display.title.trim().length != 0) {
            if (showTitleFound == true) {
                Text += '<div class="shows-content overlay">'
                Text += '<div class="show-name ellipsis">'
                if (window.innerWidth > 1280 && data.display.title.length >= 28)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else if (window.innerWidth <= 1280 && data.display.title.length >= 18)
                    Text += '<span class="namescroll">' + data.display.title + '</span>'
                else
                    Text += '<span>' + data.display.title + '</span>'
                Text += '<span class="subTitle ellipsis">' + data.display.subtitle1 + '</span>'
                Text += '</div></div>'
                showTitleFound = false;
            }
        }
        Text += '</div>'
    }
    Text += '</div>';
    // Util.getOverlaySection(data, id);
    return Text;
}

//net work details
// Util.getNetworkDetails = function () {
//     var Text = '';
//     if (presentPagedetails.pageContent && presentPagedetails.pageContent.length > 0) {
//         for (var i = 0; i < presentPagedetails.pageContent[0].dataRows.length; i++) {
//         Text = '<div class="partner-details">'
//         Text += '<div id="partnersTitle">'
//         Text += '<div class="partner_header"><div class="">'
//         // if (systemConfigs.networks) {
//         //     for (var j = 0; j < systemConfigs.networks.length; j++) {
//         //         if (presentPagedetails.pageContent[0].title == systemConfigs.networks[j].name) {
//         //             Text += '<div class="leftPanel col-md-6"><img src="' + Util.getImages(systemConfigs.networks[j].iconUrl) + '" />'
//         //             break;
//         //         }
//         //     }
//         // }
//         // Text += '<h3>' + presentPagedetails.pageContent[0].title + '</h3></div>'
//         Text += '<div class="rightPanel col-md-6">'
//         Text += '</div></div></div>'
//         Text+='</div>'
//         }
//     }
//     return Text;
// }

//view all page

Util.getGridSections = function (data) {
    // gridDatas = data;
    if (data.sections && data.sections[0] && data.sections[0].sectionData.data.length > 0) {
        var Text = '<div class="sectionsGrid">'
        Text += Util.getLogo()
        if (view == 'tvshowDetails') {

            Text += '<div class="header_shows" >'

            Text += '<div class="season_details">'
            Text += '<h1 class="show_name"> ' + data.attributes.tvShowName + '</h1>'
            Text += Util.getDetailsPageGenre();
            for (var i = data.tabsInfo.tabs.length - 1; i >= 0; i--) {
                Text += '<div id="season-' + i + '" source="season" class="season_name active">';
                Text += '<h1>Season ' + (i + 1);
                Text += '</h1>';
                Text += '</div>';
            }
            Text += '</div>'
        }
        if (presentPagedetails.isMenuPathforGrid == false) {
            Text += Util.pageHeader(data.sections[0].sectionInfo.name)
        }
        Text += '<div id="grid_items" class="container sectionsGrid_Items">';
        Text += Util.updatedGrid(data, 0)
        Text += '</div>'
        Text += '</div>';
        Text += '<div class="toastmsg_template">'
        Text += '</div>'
        return Text;
    } else {
        //NO DATA FOUND IN LIST PAGE
        var Text = '<div class="sectionsGrid">';
        if (presentPagedetails.isMenuPathforGrid == false) {
            Text += Util.pageHeader(presentPagedetails.listTitle);
        }
        Text += Util.noDataFound();
        Text += '</div>';
        return Text;
    }
}
Util.updatedGrid = function (data, j) {
    var Text = '';
    var cardsForRow = keyHandlar.noOfCardForARowInGrid(data.sections[j].sectionData.data[0].cardType);
    var secDataLen = data.sections[j].sectionData.data.length;
    presentPagedetails.arrayResults = []
    var currentRowData = [];
    for (var i = 0; i < secDataLen; i++) {
        var v_index = Math.floor(i / cardsForRow);
        var h_index = i % cardsForRow;
        currentRowData.push(data.sections[j].sectionData.data[i]);
        if (h_index == 0) {
            Text += "<div id='viewAllrow-" + v_index + "' class='row viewall_row'>";
        }
        Text += Util.getCard(data.sections[j].sectionData.data[i], 'sectionItem-' + v_index + '-' + h_index);
        if (h_index == cardsForRow - 1 || i === secDataLen - 1) {
            Text += "</div>";
            presentPagedetails.arrayResults.push(currentRowData);
            currentRowData = [];
        }
    }
    return Text;
};

Util.getSectionsSeason = function (data) {
    // gridDatas = data;
    if (data.sections && data.sections[0] && data.sections[0].sectionData.data.length > 0) {
        var Text = '<div class="sectionsGrid">'
        // if (view == 'tvshowDetails') {
        Text += Util.getLogo()

        var content = data.pageContent[0];
        var partnerIconData = '';

        if (content.dataRows) {
            for (var i = 0; i < content.dataRows.length; i++) {
                var elements = content.dataRows[i].elements;
                for (var j = 0; j < elements.length; j++) {
                    var element = elements[j];
                    if (element.elementType == 'image' && element.elementSubtype == 'bgImage') {
                        Text += '<img class="main" src="' + Util.getImages(element.data) + '" />'
                    }
                    if (element.elementType == 'image' && element.elementSubtype == '') {
                        partnerIconData = element.data;
                    }
                }
                if (partnerIconData !== '') {
                    break;
                }
            }
        }
        Text += '<div class="header_shows" >'
        Text += '<div class="season_details">'
        Text += '<img src="' + Util.getImages(partnerIconData) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/empty_state_sheet.png"/>'
        Text += '<h1 class="show_name"> ' + data.attributes.tvShowName + '</h1>'
        Text += Util.getDetailsPageGenre();
        for (var i = 0; i < data.sections.length; i++) {
            Text += '<div id="season-' + i + '" source="seasonsItems" class="season_name">';
            Text += '<h1>' + data.sections[i].sectionInfo.name;
            Text += '</h1>';
            Text += '</div>';
        }
        Text += '</div>'
        // }
        if (presentPagedetails.isMenuPathforGrid == false) {
            Text += Util.pageHeader(data.sections[0].sectionInfo.name)
        }
        Text += Util.seasonItems(data);
        Text += '</div>';
        return Text;
    }
}

Util.seasonItems = function (data) {
    gridDatas = data;
    var Text = "";

    for (var i = 0; i < data.tabsInfo.tabs.length; i++) {
        var displayStyle = i === 0 ? 'block' : 'none';
        Text += '<div id="grid_items-' + i + '" source="seasonsItems" class="container sectionsGrid_Items" style="display: ' + displayStyle + '">';
        Text += Util.updatedSeason(data, i); // Pass 'i' as the section index
        Text += '</div>';
    }

    return Text;
}

Util.updatedSeason = function (data, j) {
    var Text = '';
    // var cardsForRow = keyHandlar.noOfCardForARowInGrid(data.sections[j].sectionData.data[0].cardType);
    // Text += "<div class='section-container'>";
    if (data.sections[j] && data.sections[j].sectionData) {
        for (var i = 0; i < data.sections[j].sectionData.data.length; i++) {
            var sectionItem = data.sections[j].sectionData.data[i];
            Text += Util.getCard(sectionItem, 'sectionItem-' + (j) + '-' + i);
        }
    }
    // Text += "</div>";
    return Text;
}

// header in View all pages
Util.pageHeader = function (text) {
    if (utilities.validateString(text) == false) text = 'HOME';
    return '<div class="title-header" ><div class="container"><h1>' + text + '</h1></div></div>';
}

Util.searchHTML = function () {
    tabArray = JSON.parse(systemConfigs.configs.searchStaticMenus);
    presentPagedetails.tabsArray = tabArray;
    var Text = '';
    Text += '<div class="search-page">';
    Text += '<div class="searchBlock">';
    Text += '<img class="Logo" src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png">';
    Text += '<h2 class="searchText">Search</h2>';
    // Text += '<h3 class="searchName"></h3>';
    Text += '<div class="searchBox">';
    Text += '<div class="searchBoxLeft">';

    Text += '<div class="form-group">'
    Text += '<label id = "searchData" class="form-control" >Start Typing</label>'
    // Text += '<img class="search-icon" src="images/search_icon.png"/>'
    Text += '</div>'

    Text += '<div class="alphabetsBox">';
    for (var i = 0; i < letters.length; i++) {
        Text += '<div class="alphaBlock" id="key-' + i + '" keyValue="' + letters[i] + '"  type="button" source="letters">' + letters[i];

        Text += '</div>';
    }
    Text += '<div class="alphaBlock lastBtns" id="key-clear" source="settings"><span class="space">Clear</span></div>';
    Text += '<div class="alphaBlock lastBtns" id="key-space" source="settings"><span class="space">Space</span></div>';
    Text += '<div class="alphaBlock lastBtns" id="key-back" source="settings"><span class="searchBackicon"><img src="images/keypad_backspace_icon.png"/></span></div>';
    Text += '</div>';

    Text += '<div class="searchSuggestions"></div>';
    Text += '</div>';

    //search rightSide
    Text += '<div id="resultsCount" class="search_results"></div>';
    // Text += '<div class=searchRight>';

    //for search right data
    Text += '<div class="search_right_side">'
    Text += '<h3 id="searchName"></h3>'
    Text += '<div id="searchResults" class="searchRight"></div>';
    Text += '</div>'
    Text += '</div>';
    Text += '</div>';

    Text += '</div>';

    Text += '</div>'
    return Text;
}

Util.getSearchSuggestionsHTML = function (data) {
    var Text = '';
    Text += '<div class="suggesstion">';
    for (i = 0; i < data.length; i++) {
        Text += '<div class="suggResult" id="suggRes-' + i + '" source ="suggestion">' + data[i] + '</div>';
    }
    Text += '</div>';
    return Text;
}

// for showing serachResults error messages
Util.getResultsHTML = function (msg) {
    return '<h3 class="resultsCount"> ' + msg + '</h3>';
}

Util.getSearchResultsHTML = function (data, msg) {
    var Text = '';
    // Text += '<div id="resultsCount" class="search_results">';
    Text += Util.getSearchPageTabs();
    Text += '<div class="search_inner">';
    // Text += '<div id="searchCardsData"></div>'
    if (!!data && data.length) {
        Text += Util.getSearchResultsByTab(data);
    } else {
        // nodata Found
        Text += Util.getResultsHTML(msg);
    }
    Text += '</div>';
    return Text;
}

Util.getSearchPageTabs = function (data, activeTabIndx) {
    var Text = '';
    Text += '<div class="search_tabs">';
    Text += '<ul>'
    for (i = 0; i < tabArray.length; i++) {
        Text += '<li><span class="searchTab" id="searchTab-' + [i] + '" keyValue="' + tabArray[i].code + '" source="tabs">' + tabArray[i].displayName + '</span></li>'
    }
    Text += '</ul>';
    Text += '</div>';
    return Text;
}

Util.getSearchResultsByTab = function (data, indx) {
    var Text = '';
    var index = (!!indx) ? presentPagedetails.paginationIndex : 0;

    for (i = index; i < data.length; i++) {
        Text += '<div class="row">';
        Text += '<ul id="cardSection-' + i + '">';

        for (j = 0; j < data[i].length; j++) {
            var templateAttr = (data[i][j].template != undefined) ? 'template="' + data[i][j].template + '"' : '';

            Text += '<li class="cards" source="cards" id="card-' + i + '-' + j + '" ' + templateAttr + ' targetpath="' + data[i][j].target.path + '">';
            Text += '<div class="card">';
            Text += '<div class="card_inner"><span class="gradient"></span>';

            if (data[i][j].display.partnerIcon != undefined && data[i][j].display.partnerIcon != "") {
                Text += '<div class="partner_logo">';
                Text += '<img class="partner_logo_inner" src="' + Util.getImages(data[i][j].display.partnerIcon) + '" onerror="this.src=Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" />';
                Text += '</div>';
            }

            Text += '<img class="main" src="' + Util.getImages(data[i][j].display.imageUrl) + '" onerror="this.src=Yup(this).attr(\'altSrc\')" altSrc="images/empty_state_sheet.png">';

            Text += '<div class="card_footer">';
            if (data[i][j].display.markers && data[i][j].display.markers.length > 0) {
                for (var x = 0; x < data[i][j].display.markers.length; x++) {
                    if (data[i][j].display.markers[x].markerType == 'badge' && data[i][j].display.markers[x].value == "Premium") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="brMarker br2"><img src="' + appConfig.viStaticColudPath + 'premium_badge.png"/></div>';
                    }
                    if (data[i][j].display.markers[x].markerType == 'badge' && data[i][j].display.markers[x].value == "free_episode") {  //Program type
                        // Text+='<span class="brMarker br2"  style="background-color:#' + data.display.markers[x].bgColor.replace("FF", '') + ';color:#' + data.display.markers[x].textColor.replace("FF", '') + '" >'+data.display.markers[x].value+'</span>'
                        Text += '<div class="free_episod"><img src="' + appConfig.viStaticColudPath + 'free_episode.png"/></div>';
                    }
                    if (data[i][j].display.markers[x].markerType == 'livebadge') {  //for live
                        Text += '<span class="live_tag"><span class="red_dot"></span>' + data[i][j].display.markers[x].value + '</span>'
                    }
                    if (data[i][j].display.markers[x].markerType == 'freeepisodebadge') {  //for freeepisodebadge
                        Text += '<span class="freeepisodebadge_tag"><span class="freeepisode_badge"></span>' + data[i][j].display.markers[x].value + '</span>'
                    }
                }
            }
            // Text += '<h2>' + data[i][j].display.title + '</h2>';
            // Text += '<h6>' + data[i][j].display.subtitle1 + '</h6>';
            Text += '</div>';
            Text += '</div>';
            Text += '</div>';
            Text += '</li>';
        }

        Text += '</ul>';
        Text += '</div>';
    }

    return Text;
}

Util.addPaginationToSearchPage = function (data) {
    var splitData = Yup('.activeTab').attr("id").split('-');
    presentPagedetails.searchPaginationPage.lastdataLength = presentPagedetails.searchResults[parseInt(splitData[1])].data.length;
    for (var i = 0; i < presentPagedetails.searchResults.length; i++) {
        for (var j = 0; j < data.length; j++) {
            if (presentPagedetails.searchResults[i].sourceType == data[j].sourceType) {
                presentPagedetails.searchResults[i].count = presentPagedetails.searchResults[i].count + data[j].count;
                for (var k = 0; k < data[j].data.length; k++) {
                    presentPagedetails.searchResults[i].data.push(data[j].data[k]);
                }
            }
        }
    }
    var noOfCardForARow = keyHandlar.noOfCardForARowInGrid('search-card');
    var lastRow = Math.floor((presentPagedetails.searchPaginationPage.lastdataLength - 1) / noOfCardForARow);
    var lastindexdiff = ((lastRow + 1) * noOfCardForARow) - presentPagedetails.searchPaginationPage.lastdataLength;
    if (lastindexdiff != 0) {
        var TextInsideRow = "";
        for (var i = 0; i < lastindexdiff; i++) {
            TextInsideRow += Util.getCard(presentPagedetails.searchResults[parseInt(splitData[1])].data[i], 'sectionItem-' + lastRow + '-' + ((noOfCardForARow - lastindexdiff) + i));
        }
        Yup("#viewAllrow-" + lastRow).append(TextInsideRow);
        presentPagedetails.searchPaginationPage.lastdataLength = presentPagedetails.searchPaginationPage.lastdataLength + lastindexdiff;
    }
    // Adding Html to Pagination results on page
    Yup('.searchBtn-Tabs').html(Util.getSearchPageTabs(presentPagedetails.searchResults, parseInt(splitData[1])));
    Yup(".sectionsGrid_Items").append(Util.getSearchResultsByTab(presentPagedetails.searchResults, parseInt(splitData[1])));
}

// Util.signInHtml = function (formType) {
//     var Text = '';
//     Text += '<div  class="signInform" id="signInContent"><div class="container">'
//     // Text += '<div class="" id="headSignIn">'
//     // Text += '<div class=""><h2 class="signHead" id="signinTitle">Login with Vi Mobile Number</h2></div>'
//     Text += Util.getLogo()
//     // Text += '</div>'
//     Text += '<div class="row content-layout">'
//     Text += '<div class="col6" id="keyLayout">';
//     Text += '<h2 class="signHead" id="signinTitle">Login with Vi Mobile Number</h2>'

//     if(formType == 'email'){ //email
//         Text += Util.emailKeys('signin');
//         presentPagedetails.formType = 'email';
//     }else{
//         Text += Util.numberKeys('signin');
//         presentPagedetails.formType = 'mobile';
//     }
//     Text +='</div>'
//     Text += '<div class="col6" id="formLayout">';
//     if(formType == 'email'){
//         Text += Util.signForms('email');
//     }else{ //email
//         Text += Util.signForms('mobile');
//     }
//     Text += '</div>'
//     Text += '</div>'
//     Text += '</div>'
//     Text += '</div>'
//     return Text;
// }


Util.emailKeys = function (type) {
    var Text = '';
    Text += '<div class="keyboardCont emailkeys">';

    Text += '<span id="arrowNumPointer" class="arrow-right-email"></span>';
    Text += '<p id="headingText">Enter your  email</p>';
    Text += '<div class="keyboardBlock">'
    for (var i = 0; i < characterArray.length; i++) {
        var focusAdd = (i == 0) ? 'imageFocus' : ''
        Text += '<div id="emailKeys-' + i + '" index="' + i + '" class="keyboardKeys genkeys ' + focusAdd + '" source="keyPadEmail" >' + characterArray[i] + '</div>'
    }
    Text += '<div  id="emailKeys-40" index="40" class="keyboardKeys email-keys"  source="keyPadEmail">@hotmail.com</div>'
    Text += '<div  id="emailKeys-41" index="41" class="keyboardKeys email-keys"  source="keyPadEmail">@gmail.com</div>'
    Text += '<div  id="emailKeys-42" index="42" class="keyboardKeys email-keys"  source="keyPadEmail">@yahoo.com</div>'
    Text += '<div  id="emailKeys-43" index="43" class="keyboardKeys sp-keys"  source="keyPadEmail">!#$</div>'
    Text += '<div  id="emailKeys-44" index="44" class="keyboardKeys at-keys"  source="keyPadEmail">@</div>'
    Text += '<div  id="emailKeys-45" index="45" class="keyboardKeys dot-keys"  source="keyPadEmail">.</div>'
    Text += '<div  id="emailKeys-46" index="46" class="keyboardKeys com-keys"  source="keyPadEmail">.com</div>'
    Text += '<div  id="emailKeys-47" index="47" class="keyboardKeys backBtn"  source="keyPadEmail"><span></span></div>'
    Text += '</div>';
    if (type == 'signin') {
        Text += '<div id="emailKeys-48" index="48" class="keyboardKeys actionKey" source="actionKeyEmail" >Cancel</div>';
        Text += '<div id="emailKeys-49" index="49" class="keyboardKeys actionKey" source="actionKeyEmail" >Next</div>';
    }
    Text += '</div>';
    Text += '<div class="keyboardFooter">';
    if (type == 'signin') {  //signin with mobile button
        Text += '<div id="emailKeys-50" index="50" class="keyboardKeys actionKey" source="actionKeyEmail"  >Sign in with mobile</div>';
    }
    Text += '</div>';
    return Text;
}

Util.numberKeys = function (type, leftsignin) {
    var cfg = (systemConfigs && systemConfigs.configs) || {};

    var leftsidesign = {};
    try {
        leftsidesign = typeof cfg.signinPageInfo === 'string'
            ? JSON.parse(cfg.signinPageInfo)
            : (cfg.signinPageInfo || {});
    } catch (e) { }

    var otp_data = {};
    try {
        otp_data = typeof cfg.otppageinfo === 'string'
            ? JSON.parse(cfg.otppageinfo)
            : (cfg.otppageinfo || {});
    } catch (e) { }

    var Text = '';
    Text += '<div class="keyboardCont">'
    if (type == 'stream_pin') {
        Text += '<p id="headingText">Enter your 4-Digit PIN to watch this restricted content</p>';
    }
    else {
        Text += '<span id="arrowNumPointer" class="arrow-right-email"></span>';
        if (type == 'otp' || type == 'signupotp') {
            Text += '<div class="row signsubHead textCenter"> <span class="password-otp" id="signinSubTitle"> ' + otp_data.subtitile + '</span> </div>'
        }
        // else{
        //     Text += '<p id="headingText">Enter your mobile number</p>';
        // }
    }
    Text += '<div class="keyboardBlock">'
    for (var i = 1; i < 10; i++) {
        var focusAdd = (i == 1) ? 'imageFocus' : ''
        Text += '<div id="numeric-' + i + '" index="' + i + '" class="keyboardKeys ' + focusAdd + ' " source="keyPadNumaric">' + i + '</div>';
    }
    Text += '<div id="numeric-10" index="10" class="keyboardKeys keyboardKeys2" source="keyPadNumaric">0</div>'
    Text += '<div id="numeric-11" index="11" class="keyboardKeys backButton" source="keyPadNumaric"><span><img src="images/keypad_backspace_icon.png"/></span></div>';
    Text += '</div>';
    for (var i = 0; i < leftsidesign.length; i++) {
        var currentData = leftsidesign[i];

        // Check if the current object has a property named "qrCode"
        if (currentData.hasOwnProperty("buttons")) {
            Text += '<div id="numeric-12" index="12" class="keyboardKeys actionKey" source="actionKey" >' + currentData.buttons[0].buttonText1 + '</div>';
            if (type == "stream_pin") {
                Text += '<div id="numeric-13" index="13" class="keyboardKeys actionKey" type="' + type + '" source="actionKey" >Confirm</div>';
            }
            else {
                if (type == 'signin') {
                    Text += '<div id="numeric-13" index="13" class="keyboardKeys keyboardKeys2 actionKey" source="actionKey" >' + currentData.buttons[0].buttonText2 + '</div>';
                } else if (type == 'profilepin') {
                    Text += '<div id="numeric-13" index="13" class="keyboardKeys actionKey" type="' + type + '" source="actionKey" >Continue</div>';
                }
                else {
                    Text += '<div id="numeric-13" index="13" class="keyboardKeys keyboardKeys2 actionKey" type="' + type + '" source="actionKey" >Submit</div>';
                }
                Text += '</div>';
            }
        }

        Text += '<div class="keyboardFooter">';
        // if(type == 'signin'){
        //     Text += '<div id="numeric-15" index="15" class="keyboardKeys actionKey" source="actionKey"  >Change Your Mobile number</div>';
        // }
    }
    if (type == 'signupotp') {
        Text += '<div id="numeric-14" index="14" class="keyboardKeys actionKey resendButton" source="actionKey" btntype="resendBtn"  ><span class="timer-resend"></span></div>';
    }
    Text += '</div>';
    return Text;
}

Util.genericKeys = function (type) {
    var Text = '';
    Text += '<div class="keyboardCont">'
    if (type == 'reenterPassword' || type == 'updatePassword' || type == 'confirmPassword') {
        Text += '<span  id="arrowGenPointer" class="arrow-right-password new"></span>'
    } else if (type == 'changePassOld') {
        Text += '<span  id="arrowGenPointer" class="arrow-right-password first"></span>'
    }
    else {
        Text += '<span  id="arrowGenPointer" class="arrow-right-password"></span>'
    }
    if (type == 'signin' || type == 'signuppassword') {
        Text += '<p id="headingText">Enter Password</p>'
    } else if (type == 'newPassword') {
        Text += '<p id="headingText">Enter New Password</p>'
    } else if (type == 'reenterPassword' || type == 'updatePassword') {
        Text += '<p id="headingText">Re-enter New Password</p>'
    } else if (type == 'changePassOld') {
        Text += '<p id="headingText">Enter Old password</p>'
    } else if (type == 'confirmPassword') {
        Text += '<p id="headingText">Confirm password</p>'
    }
    Text += '<div class="keyboardBlock">'
    for (var i = 0; i < characterArray.length; i++) {
        var focusAdd = (i == 0) ? 'imageFocus' : ''
        Text += '<div id="defaultKeys-' + i + '" index="' + i + '" class="keyboardKeys genkeys  ' + focusAdd + '" source="keyPadGenric" >' + characterArray[i] + '</div>'
    }
    Text += '<div  id="defaultKeys-40" index="40" class="keyboardKeys sp-keys"  source="keyPadGenric">!#$</div>'
    Text += '<div  id="defaultKeys-41" index="41" class="keyboardKeys spaceBar" source="keyPadGenric"><span class="spacebar"></span></div>'
    Text += '<div  id="defaultKeys-42" index="42" class="keyboardKeys backBtn"  source="keyPadGenric"><span></span></div>'
    Text += '</div>'
    if (type == 'changePassOld') {
        Text += '<div  id="defaultKeys-43" index="43"  class="keyboardKeys actionKey" source="actionKeyGen">Cancel</div>'
    }
    else {
        Text += '<div  id="defaultKeys-43" index="43"  class="keyboardKeys actionKey" source="actionKeyGen">Previous</div>'
    }

    if (type == 'signin') {
        Text += '<div  id="defaultKeys-44" index="44" class="keyboardKeys actionKey"  source="actionKeyGen">Sign In</div>'
    } else if (type == 'newPassword' || type == 'changePassOld' || type == 'signuppassword') {
        Text += '<div  id="defaultKeys-44" index="44" class="keyboardKeys actionKey"  source="actionKeyGen">Next</div>'
    } else if (type == 'reenterPassword') {
        Text += '<div  id="defaultKeys-44" index="44" class="keyboardKeys actionKey"  source="actionKeyGen">Reset</div>'
    } else if (type == 'updatePassword') {
        Text += '<div  id="defaultKeys-44" index="44" class="keyboardKeys actionKey"  source="actionKeyGen">Update</div>'
    }
    else if (type == 'confirmPassword') {
        Text += '<div  id="defaultKeys-44" index="44" class="keyboardKeys actionKey"  source="actionKeyGen">Sign Up</div>'
    }
    Text += '</div>';
    Text += '<div class="row chkblock">'
    Text += '<div id="checkBox" class="checkBox">'
    Text += '<label class="control control--checkbox" >Show Password';
    if (presentPagedetails.isChecked == false) {
        Text += '<div class="control__indicator signShowPassowrd" id="defaultKeys-45" isChecked="no" source="actionKeyGen"  index="45"><span></span></div></label>';
    } else {
        Text += '<div class="control__indicator signShowPassowrd checked " id="defaultKeys-45" isChecked="yes" source="actionKeyGen"  index="45"><span></span></div></label>';
    }
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.signForms = function (type, leftsignin) {
    var Text = '';
    Text += '<div>'
    //mobilenumber
    if (type == 'mobile') {
        Text += '<div class="mobileNum">'
        // Text += '<div class="row country-mobile"><label class="authlabel">Mobile Number</label><div class="countryCode" class="col2"> '+Util.countryCodeForm() +'</div>';
        Text += '<div class="row country-mobile"><label class="authlabel">' + leftsignin.mobilenumberTitle + '</label>';
        Text += '<div class="mobile_number_from"><input type="text" keyType="numeric" index="0" class="inputForm input-active" formType="mobileNum" placeholder="" disabled name="mobileNumber" id="signInInput-0" value=""></div>'
        Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div></div>';
    }
    else {

    }
    return Text;
}

Util.forgetPasswordFrom = function () {
    var Text = '';
    Text += '<div>'
    Text += '<div class="mobileNum">'
    Text += '<div class="row country-mobile"><label class="authlabel">Mobile Number</label><div class="countryCode" class="col2"> ' + Util.countryCodeForm() + '</div>';
    Text += '<div class="mobile_number_from"><input type="text" keyType="numeric" index="0" class="inputForm input-active"  placeholder="Mobile Number" disabled name="mobileNumber" id="signInInput-0"></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div></div>'
    return Text;
}

Util.countryCodeForm = function () {
    var Text = '<div class="inside_countryCode"><img id="signInFlag" src="' + Main.countryFlag + '" alt="" />'
    Text += '<span class="signInCountryCode" id="signInCountryCode" >' + '+' + Main.mobileCode + '</span></div>';
    return Text;
}

Util.countryCodeSelectionHtml = function () {
    var Text = '';
    Text += '<div class="countrySelection">'
    Text += '<div class="row">'
    Text += '<div class="col12">'
    Text += '<div class="textCenter">'
    Text += '<h2 class="sign-head">Select Your Country Code</h2>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'

    Text += '<div class="row">'
    Text += '<div class="country-code-page">'
    for (var i = 0; i < countryList.length; i++) {
        var imageFoucs = (i == 0) ? 'imageFocus' : '';
        Text += '<div index="' + i + '" id="country-' + i + '" class="row country-normal ' + imageFoucs + '">';
        Text += '<div class="country-sections" > <img src="' + countryList[i].iconUrl + '" class="countryCodeFlag" alt=""/></div>'
        Text += '<div class="country-sections text-pad-top"> ' + countryList[i].name;
        Text += '<span class="countryCodeValue"> + ' + countryList[i].isdCode + ' </span> '
        Text += '</div> '
        Text += '</div>'
    }
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.forgetPasswordHTML = function () {
    var Text = '';
    Text += '<div class="forgetPasswordForm" id="signInContent"><div class="container">'
    Text += '<div class="row" id="headSignIn">'
    Text += '<div class=""><h2 class="signHead" id="signinTitle">Sign in to your account</h2></div>'
    Text += '<div class="row">'
    Text += '<div class="col6" id="keyLayout">'
    Text += Util.numberKeys('forget');
    Text += '</div>'
    Text += '<div class="col6" id="formLayout">'
    Text += Util.forgetPasswordFrom();
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.otpVerificationHTML = function () {
    var otp_data = JSON.parse(systemConfigs.configs.otppageinfo)
    var Text = '';
    Text += '<div class="otpVerifyFrom" id="signInContent"><div class="container">'
    Text += '<div class="row" id="headSignIn">'
    Text += '<div class="col2 headerLogo"> <img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    Text += '<div class=""><h2 class="signHead" id="signinTitle">' + otp_data.title + '</h2></div>'
    Text += '</div>'
    Text += '<div class="row">'
    Text += '<div class="col6" id="keyLayout">'
    Text += Util.numberKeys('otp');
    Text += '</div>'
    Text += '<div class="col6" id="formLayout">'
    Text += Util.resetPasswordFrom();
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.resetPasswordFrom = function () {
    var Text = '';

    Text += '<div class="otp">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Enter OTP</label> <input class="inputForm input-active" placeholder="" index="0" disabled keyType="numeric" type="text" name="text" id="signInInput-0" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'


    return Text;
}

Util.getAccountDetailsHTML = function () {
    // var appInfo = tizen.application.getAppInfo();
    //  var appVersion = webOS.appInfo.version; // for LG
    var appVersion = appConfig.appVersion
    var Text = '';
    // var systemFeatures=JSON.parse(utilities.getFromLocalStorage('systemFeature'));
    Text += '<div class="settings">'
    var userDetails = localStorage.getItem("userDetails");
    if (Main.userProfile.userId == '' && !userDetails) {
        // Text += "<div id='accountContent'>"
        // Text += "<div class='non_loggedin'>"
        // Text += "<div class='account-page'>"
        // Text += '<div class="container">'
        // // var deviceName = '';
        // // if (device.manufacturer == "unknown") {
        // //     deviceName = appConfig.deviceName;
        // // }
        // // else {
        // //     deviceName = device.manufacturer + ' (' + device.model + ') ' + device.platform;
        // // }
        // // Text += '<div  class="device-details"><table>'
        // // Text += '<tr> <td>Device Name</td><td>' + deviceName + '</td></tr>'
        // // Text += '<tr> <td>Device Version</td><td>' + device.version + '</td></tr>'
        // // Text += '<tr> <td>Box ID</td><td>' + Main.BOXID + '</td></tr>'
        // // Text += '</table></div>'
        // // Text += Util.getLogo()
        // Text += '<div class="display-table auto-center">'
        // Text += '<div class="deviceInfo display-table-cell">'
        // Text += "<h2 class='main-heading textCenter'>Please sign in to view 'Settings' Page.</h2>"
        // Text += '<button id="account-0-0" class="toptab accountSignin grey-btn" h_index="0" v_index="0" source="accountSignin" targetPath="introPage">Sign in</button>'
        // Text += '</div>'
        // Text += '</div></div></div></div>';
        view = 'signin'
        Main.processNext();
    } else {
        Text += "<div id='accountContent'>"

        Text += Util.getLogo();
        Text += '<div class="sidebar">'
        Text += '<div class="sidebar-body" id="accountSideBar"> '
        Text += '<p class="accountcontent_heading">Profile & more</p>'
        Text += '<ul>'
        if (switchProfilesOption != false) {
            Text += '<li class="toptab active"  id="account-0-0" source="headTab" h_index="0" v_index="0"  type="profileTab" subType="Switch_Profiles"><span >Switch Profiles</span></li>'
            Text += '<li class="toptab"  source="headTab" h_index="0" v_index="1" id="account-1-0" subType="accounts_details" type="profileTab"><span >Account</span></li>'
            Text += '<li class="toptab"  id="account-2-0" source="headTab" h_index="0" v_index="1"  type="profileTab" subType="Video_Quality"><span >Video Quality</span></li>'
            Text += '<li class="toptab"  id="account-3-0" source="headTab" h_index="0" v_index="1"  type="profileTab" subType="language_filters"><span >Language Filters</span></li>'
            Text += '<li class="toptab"  id="account-4-0" source="headTab" h_index="0" v_index="1"   type="profileTab" subType="terms_use"><span >Terms of Use</span></li>'
            Text += '<li class="toptab"  id="account-5-0" source="headTab" h_index="0" v_index="1" subType="Device_details"  type="profileTab"><span >Manage Devices</span></li>'
        }
        else {
            Text += '<li class="toptab active"  source="headTab" h_index="0" v_index="0" id="account-0-0" subType="accounts_details" type="profileTab"><span >Account</span></li>'
            Text += '<li class="toptab"  id="account-1-0" source="headTab" h_index="0" v_index="1"  type="profileTab" subType="Video_Quality"><span >Video Quality</span></li>'
            Text += '<li class="toptab"  id="account-2-0" source="headTab" h_index="0" v_index="1"  type="profileTab" subType="language_filters"><span >Language Filters</span></li>'
            Text += '<li class="toptab"  id="account-3-0" source="headTab" h_index="0" v_index="1"   type="profileTab" subType="terms_use"><span >Terms of Use</span></li>'
            Text += '<li class="toptab"  id="account-4-0" source="headTab" h_index="0" v_index="1" subType="Device_details"  type="profileTab"><span >Manage Devices</span></li>'
            // Text += '<li class="toptab"  id="account-4-0" source="headTab" h_index="0" v_index="1" subType="Device_details"  type="profileTab"><span >Manage Devices</span></li>'
        }
        // Text += '<li class="toptab"  id="account-4-0" source="headTab" h_index="0" v_index="1"  type="profileTab"><span >About Us</span></li>'
        // Text += '<li class="toptab"  id="account-5-0" source="headTab" h_index="0" v_index="1"  type="profileTab"><span >FAQ details</span></li>'
        // Text += '<li class="toptab"  id="account-6-0" source="headTab" h_index="0" v_index="1"  type="profileTab"><span >Grievance</span></li>'
        // Text += '<li class="toptab"  id="account-7-0" source="headTab" h_index="0" v_index="1"  type="profileTab"><span >Device details</span></li>'

        Text += '<div class="signout-bar">'
        if (switchProfilesOption != false) {
            Text += '<button class="toptab signout-btn grey-btn" id="account-6-0" source="headTab" h_index="0" v_index="2" subType="signout"  type="profileTab" >Sign Out</button>'
        }
        else {
            Text += '<button class="toptab signout-btn grey-btn" id="account-5-0" source="headTab" h_index="0" v_index="2" subType="signout"  type="profileTab" >Sign Out</button>'

        }
        Text += '<div class="device-details">';
        Text += '<div class="detail-row"><span class="detail-label">Version : </span><span>' + appVersion + '</span></div>';
        Text += '</div>';
        Text += '</div>'
        Text += '</div>'
        Text += '</div>'
        Text += '<div class="account-page">'
        if (switchProfilesOption == false) {
            Text += Util.profileInfo();
        }
        Text += '</div>'
        Text += '</div>'
    }
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

// ProfileInfo
Util.profileInfo = function () {
    var count = 1;
    var Text = '';
    Text += '<div class="fieldset" id="MyAccountContent">'
    // Text += '<p class="AccountTitle">Account Info</p>'
    Text += '<form>'
    Text += '<div class="form-group ">'
    // Text += '<div class="row pb40">'
    // Text += '<div class="col3"><label>Device Name</label></div>'
    // var deviceName = '';
    // if (device.manufacturer == "unknown") {
    //     deviceName = appConfig.deviceName;
    // }
    // else {
    //     deviceName = device.manufacturer + ' (' + device.model + ') ' + device.platform;
    // }
    // Text += '<div class="col9"><span>' + deviceName + '</span></div>'
    // Text += '</div>'
    // Text += '<div class="row pb40">'
    // Text += '<div class="col3"><label>Device Version</label></div>'
    // Text += '<div class="col9"><span>' + device.version + '</span></div>'
    // Text += '</div>'
    // Text += '<div class="row pb40">'
    // Text += '<div class="col3"><label>Box ID</label></div>'
    // Text += '<div class="col9"><span>' + Main.BOXID + '</span></div>'
    // Text += '</div>'
    // Text += '<div class="row pb40">'
    // Text += '<div class="col3"><label>Name</label></div>'
    // Text += '<div class="col9"><span>' + Main.userProfile.name + '</span></div>'
    // Text += '</div>'
    if (Main.userProfile.email || Main.userProfile.attributes.email_id) {

        Text += '<div class="form-group" id="" index="" count="' + count + '" source="accountContent">'
        Text += '<div class="row">'
        Text += '<div class="col4"><label>Email</label></div>'
        Text += '<div class="col8">'
        var emailId = (Main.userProfile.email) ? (Main.userProfile.email) : (Main.userProfile.attributes.email_id)
        Text += '<span>' + emailId + '</span>'
        Text += '</div></div></div>'
    }
    if (Main.userProfile) {
        Text += '<div class="form-group" id="information_page" index="" count="' + count + '" source="accountContent">'
        Text += '<h3>Account Details</h3>'
        Text += '<table class="contact_information" >'
        // Text += '<td>Name</td><td class="right_row">User 1</td></tr>'
        Text += '<tr>'
        Text += '<td>Mobile Number</td>'
        if (Main.userProfile.mobile) {
            Main.userProfile.mobile = Main.userProfile.mobile.replace(/^91-/, '');
            Text += '<td id="accountmobile" class="right_row">' + Main.userProfile.mobile + '</td>'
        }
        Text += '</tr>'
        // Text += '<tr><td>Country</td><td class="right_row">India</td></tr>'
        // Text += '<tr><td>Age</td><td class="right_row">30-40 Years</td></tr>'
        // Text += '<tr><td>Gender</td><td class="right_row">Male</td></tr>'
        Text += '</table>'
        // Text +='<tr class="plan_details">'
        // Text +='<td>Plan Details</td>'
        // if (Main.userProfile.packages != undefined && Main.userProfile.packages != '') {
        //     Text +='<td>'+ Main.userProfile.packages +'</td>'
        // }else{
        //     Text +='<td>No Active Plans</td>'
        // }
        Text += '<div class="subscription_table">'
        Text += '<h3>Subscriptions</h3>'
        Text += '<div id="user-active-packages">'
        Text += Util.getActivePackages();
        Text += '</div></div>'
        // Text += '<div id="user-active-packages">'
        // if (Main.userProfile.packages != undefined && Main.userProfile.packages != '') {
        // Text += Util.getActivePackages();
        // Text += '</div>'
        // // }else{
        // Text += '<tr class="plan_details">'
        // Text += '<td>Plan Details</td>'
        // Text += '<td>No Active Plans</td>'
        // }

        Text += '</div>'
        // Text +='<div class="manage_account">'
        // Text +='<div class=manage_account_left>'
        // Text +='<h4>Manage Account</h4>'
        // Text +='<p>Scan the QR code on the right to access and manage your account and subscriptions from the web</p>'
        // Text +='</div>'
        // Text +='<div class="manage_account_right">'
        // Text += '<div id="accountQr"></div>'
        // Text +='</div>'
        // Text +='</div>'
    }
    Text += '</form>';
    Text += '</div>'
    Text += '</div>'
    return Text;
}

// trancaction packages
Util.getBilling = function () {
    var Text = '';
    Text += '<div class="table-responsive">'
    if (presentPagedetails.transactionDetails.length > 0) {
        Text += '<table class="table active-packages">'
        Text += '<thead>'
        Text += '<tr>'
        Text += '<th>Package Name</th>'
        Text += '<th>Gateway</th>'
        Text += '<th>Currency</th>'
        Text += '<th>Amount</th>'
        Text += '<th>Order Id</th>'
        Text += '<th>Purchase Date</th>'
        Text += '<th>Status</th>'
        Text += '<th>Next Renew Date</th>'
        Text += '</tr>'
        Text += '</thead>'
        Text += '<tbody>'
        for (var i = 0; i < presentPagedetails.transactionDetails.length; i++) {
            Text += '<tr class="toptab" count=' + presentPagedetails.transactionDetails.length + '  index=' + i + ' id="accountContent-' + i + '" source="accountContent" type="activePkg">'
            Text += '<td><span class="pack_name_cell">' + presentPagedetails.transactionDetails[i].packageName + '</span></td>'
            Text += '<td>' + presentPagedetails.transactionDetails[i].gateway + '</td>'
            Text += '<td>' + presentPagedetails.transactionDetails[i].currency + '</td>'
            Text += '<td>' + presentPagedetails.transactionDetails[i].amount + '</td>'
            Text += '<td>' + presentPagedetails.transactionDetails[i].orderId + '</td>'
            Text += '<td>' + utilities.getRealDate(presentPagedetails.transactionDetails[i].purchaseTime) + '</td>'
            Text += '<td>' + presentPagedetails.transactionDetails[i].status + '</td>'
            Text += '<td>' + utilities.getRealDate(presentPagedetails.transactionDetails[i].expiryTime) + '</td>'
            Text += '</tr>'
        }
        Text += '</tbody>'
        Text += '</table>'
    }
    else {
        Text += "<div style='font-size: 36px;text-align: center;margin-top: 250px;'>No Transaction History</div>";
    }
    Text += '</div>'
    return Text;
}

// active packages
// Util.getActivePackages = function () {
//     var Text = '';
//     if (!!presentPagedetails.settingsActivepackages && presentPagedetails.settingsActivepackages.length > 0) {
//         Text += '<div class="fieldset" id="ActivePackageContent">'
//         Text += '<p class="AccountTitle">Plans Details</p>'
//         Text += '<form>'
//         Text += '<div class="form-group container">'
//         Text += '<div class="form-group-inner">'
//         for (var i = 0; i < presentPagedetails.settingsActivepackages.length; i++) {
//             Text += '<div class="form-group" count=' + presentPagedetails.settingsActivepackages.length + ' packName = ' + presentPagedetails.settingsActivepackages[i].name + ' subSource = "selectCurretnPack" index=' + i + ' id="accountContent-0-' + i + '" packid = ' + presentPagedetails.settingsActivepackages[i].id + ' packGateWay = ' + presentPagedetails.settingsActivepackages[i].gateway + ' source="accountContent" type="activePkgs">'
//             Text += '<div class="row">'
//             Text += '<div class="col4"><label>'+presentPagedetails.settingsActivepackages[i].name+'</label> </div>'
//             Text += '<div class="col8">'
//             Text += '<pre>' + presentPagedetails.settingsActivepackages[i].packageAmount +' / ' +presentPagedetails.settingsActivepackages[i].packageType + ' </pre>'
//             Text += '<pre>' + presentPagedetails.settingsActivepackages[i].message+'</pre>'
//             Text += '</div></div></div>'
//         }
//         Text += '</div>'
//         Text += '</form>'
//         Text += '</div>'
//     }else{
//         Text += '<table class="plan_details">'
//         Text += '<tr >'
//         Text += '<td>Plans Details</td>'
//         Text += '<td>No Active Plans</td>'
//         Text += '</tr>'
//         Text += '</table>'         
// }
//     return Text;
// }


//Faq HTML
Util.faqHTML = function () {
    return '<div id="faq_html" > <div class="container"><div class="row remove-margin "><div class="lang_eng col12 remove-padding ott-text-padding"><div class="row remove-margin ott-about-us"> <left-side-menu></left-side-menu><div class="col12 remove-padding ott-text-padding ott-about-section"><div class="col12 remove-padding"><div class="signle_head"><h1 class="about-h1"></h1></div><h1 class="about-h1">1. What is SRIFlix ?</h1><p>SRIFlix is an online OTT entertainment hub which has Live TV, Catch-up TV, TV SHOWS, Movies , drama and much more video content through a powerful engine built for delivering the video content through Smart Phones / TABs / PCs / Laptops etc.</p><h1 class="about-h1">2. How can I use the service?</h1><p>You can log on to <a href="https://www.sriflix.lk/" target="_blank">www.sriflix.lk</a> or download the app from android play store and iOS App store</p><h1 class="about-h1">3. How do I register on SRIFlix website?</h1><p>You can register by providing your Mobitel number. And for the moment it is available for Mobitel Customers only.</p><h1 class="about-h1">4. Is registration for SRIFlix chargeable?</h1><p> There are no charges for the registrations. However, subscription charges exist as per the selected SRIFlix package.</p><h1 class="about-h1">5. What are the charges or available packs?</h1><table class="table table-bordered"><thead><tr><th>Pack Name</th><th>Daily Pack (LKR)</th><th>Monthly Pack (LKR)</th></tr></thead><tbody><tr><td>All Local Channel pack</td><td>3.50 Per day</td><td>100 Per month</td></tr><tr><td>Each Premium Channels (including sports)</td><td>3.50 Per day</td><td>100 Per month</td></tr><tr><td>Video All Access Pack</td><td>5.00 Per day</td><td>150 Per month</td></tr><tr><td>Partner Packs</td><td>3.50 Per day</td><td>100 Per month</td></tr></tbody></table><p>*30 days FREE trial is applicable for all packages. Government TAX will be added on above charges.</p><h1 class="about-h1">6. What are devices that I can use SRIFlix?</h1><p>Mobile phones/ Tabs /PC / Laptop</p><h1 class="about-h1">7. Does SRIFlix auto-renew my subscription, after expiration of subscribed duration? If yes, how will I get billed?</h1><p>Based on the pack you have subscribed renewal will happen. If it’s a daily pack, you will be charged daily basis and monthly pack will be charged once in 30 days from the date of subscription.</p><h1 class="about-h1">8. How can I Cancel / Unsubscribe SRIFlix?</h1><p class="mb10">You can log on to your account and follow the below steps.</p><ul><li>Settings > My Subscriptions > Cancel subscription.</li><li>You can contact our customer by dialing 1717 from any network or visit your nearest Mobitel branch and cancel the subscription.</li></ul></div></div></div></div></div></div>'
}

//contact Us HTML
Util.contactUsHTML = function () {
    return '<div id="contact_us_html" > <div class="container"><div class="row remove-margin "><div class="col12 remove-padding ott-about-section"> <h3>Visit us</h3><div class="contact_block"><p>At our nearest outlet: <a href="https://www.mobitel.lk/store-find" target="_blank">Find Mobitel Store near you</a></p></div><h3>Email us</h3><div class="contact_block"><p>For Inquiries & Concerns: <a href="mailto:info@mobitel.lk" target="_blank">info@mobitel.lk</a></p></div><h3>Mail us</h3><div class="contact_block"><p>Regarding inquiries or concerns to Manager</p><p>Mobitel (Pvt) Ltd.</p><p>108,</p><p>W.A.D Ramanayake Mawatha,</p><p>Colombo 02,</p><p>Sri Lanka</p></div><h3>Call us</h3><div class="contact_block"><p>24 Hour Customer Service Hotline +94 (0) 712755777 or dial 1717 from any network in Sri Lanka</p><p>For Sinhala : Press1</p><p>For Tamil : Press2</p><p>For English : Press3</p><p>24 Hour Roaming Service Hotline +94 (0) 714555555</p><p>General Line - +94 (0) 112330550</p><p>(9.00 am to 5.00 pm) Weekdays</p></div><h3>Fax</h3><div class="contact_block"><p>for Customer Inquiries or Concerns - +94 (0)112330396</p></div></div><div class="col12 remove-padding ott-text-padding ott-social-section"><h1 class="about-h1">Follow us</h1><div class="col4"><div class="social-box textCenter"><div class="social-icon"> <img src="http://d3gt70lx5ulpl2.cloudfront.net/static/teleup/images/fb_square.svg" alt="" /></div> <span class="social-link">https://www.facebook.com/Mobitel</span></div></div><div class="col4"><div class="social-box textCenter"><div class="social-icon"> <img src="http://d3gt70lx5ulpl2.cloudfront.net/static/teleup/images/twitter_square.svg" alt="" /></div> <span class="social-link">https://twitter.com/MobitelSriLanka</span></div></div></div></div></div></div>'
}

Util.languagesListHTML = function () {
    var Text = '';
    Text += '<div class="lang_row">'
    Text += '<div id="lang_html" class="lang_column">'
    Text += '<div class="langPreData"> <div class="langTitle" >Select your languages of choice</div></div>'
    // Text += '<div class="langSubTitle" >You can get easy access to content you want</div> </div>'
    Text += '<div class="langList">'
    Text += '<div class="langlist_row">'
    var userProfileLanguages = {}; // Object to store user's profile languages
    if (Main.userProfile.languages) {
        var splitData = Main.userProfile.languages.split(',');
        for (var j = 0; j < splitData.length; j++) {
            userProfileLanguages[splitData[j]] = true;
        }
    }
    for (var i = 0; i < systemConfigs.contentLanguages.length; i++) {
        if (i > 0 && i % 3 === 0) {
            Text += '</div>';
            Text += '<div class="langlist_row" id="lang-row"> ';
        }
        var isSelected = userProfileLanguages.hasOwnProperty(systemConfigs.contentLanguages[i].code);
        Text += '<div class="toptab langItem' + (isSelected ? ' selected' : '') + '" isSelected="' + isSelected + '" id="accountContent-1-' + i + '" value="' + systemConfigs.contentLanguages[i].code + '" source="langSelection" >';
        Text += '<div class="langtext_type">';
        Text += '<div class="langtext">' + systemConfigs.contentLanguages[i].displayText + '</div>';
        Text += '<div class="langName">' + systemConfigs.contentLanguages[i].name + '</div></div>';
        Text += '<span class="checkmark"></span>';
        Text += '</div>';
    }
    var languageKeysArray = Object.keys(userProfileLanguages);
    presentPagedetails.languageKeysArray = languageKeysArray.join(',')
    if (systemConfigs.contentLanguages.length > 0 && systemConfigs.contentLanguages.length % 3 !== 0) {
        Text += '</div>';
    }
    Text += '</div>'
    Text += '</div>'


    Text += '<div class="lang_right_column" id="lang-right"><div class="update-button">  <button type="button" source="apply_buttons" id="lang-cancel" class="lang-btn toptab">Clear All</button> <button type="button" source="apply_buttons" id="lang-update" class="lang-btn toptab theme">Apply</button></div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}


// signOut Okay Page
Util.signout = function () {
    var Text = '';
    Text += '<div class="uniquePage" id="signoutSuccess" >'
    Text += '<div class="container">'
    Text += '<img class="success-image" src="images/success_icon.png" >'
    Text += '<h1 class="main-heading textCenter">You are successfully signed out</h1>'
    Text += '<button type="button" id="signout-0" source="signout" class="unique-page-btn grey-btn imageFocus">Okay,got it</button>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

// Plans Success Page
Util.plansSuccess = function () {
    if (typeof backData !== "undefined" && Array.isArray(backData)) {
        for (var i = backData.length - 1; i >= 0; i--) {
            if (backData[i] && (
                backData[i].view === "plansUpgrade" ||
                backData[i].view === "bannersPlansUpgrade" ||
                (typeof backData[i].view === "string" && backData[i].view.indexOf("plansUpgrade") !== -1) ||
                (typeof backData[i].targetPath === "string" && backData[i].targetPath.indexOf("plansUpgrade") !== -1)
            )) {
                backData.splice(i, 1);
            }
        }
    }
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }
        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="congratulations" >'
        Text += '<div class="container">'
        if (plansData.sdpse.success_page && plansData.sdpse.success_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.sdpse.success_page.heading + '</h1>'
        }
        Text += '<img class="success-image" src="' + appConfig.viStaticColudPath + 'Check_mark.png" >'
        if (plansData.sdpse.success_page && plansData.sdpse.success_page.description) {
            var description = plansData.sdpse.success_page.description;

            if (description.includes('$plan_name') && presentPagedetails.packName) {
                description = description.replace('$plan_name', presentPagedetails.packName);
            }
            Text += '<p>' + description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.sdpse.success_page && plansData.sdpse.success_page.button_title) {
            Text += '<button type="button" btntype="success" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.sdpse.success_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}


// Plans pending Page
Util.pendingSuccess = function () {
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }
        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="planspending" >'
        Text += '<div class="container">'
        if (plansData.sdpse.pending_page && plansData.sdpse.pending_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.sdpse.pending_page.heading + '</h1>'
        }
        Text += '<img class="failed-image" src="' + appConfig.viStaticColudPath + 'plans_faild.png"  >'
        if (plansData.sdpse.pending_page && plansData.sdpse.pending_page.description) {
            Text += '<p>' + plansData.sdpse.pending_page.description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.sdpse.pending_page && plansData.sdpse.pending_page.button_title) {
            Text += '<button type="button" btntype="pending" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.sdpse.pending_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}

// Plans Failed Page
Util.failedSuccess = function () {
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }

        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.log("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="plansFailed" >'
        Text += '<div class="container">'
        if (plansData.sdpse.failed_page && plansData.sdpse.failed_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.sdpse.failed_page.heading + '</h1>'
        }
        Text += '<div class="failed_image_container">'
        Text += '<img class="failed-image" src="' + appConfig.viStaticColudPath + 'Payment_Failure.png"  >'
        Text += '</div>'
        if (plansData.sdpse.failed_page && plansData.sdpse.failed_page.description) {
            Text += '<p>' + plansData.sdpse.failed_page.description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.sdpse.failed_page && plansData.sdpse.failed_page.button_title) {
            Text += '<button type="button" btntype="pending" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.sdpse.failed_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}
// Plans Success Page
Util.directPlansSuccess = function () {
    if (typeof backData !== "undefined" && Array.isArray(backData)) {
        for (var i = backData.length - 1; i >= 0; i--) {
            if (backData[i] && (
                backData[i].view === "plansUpgrade" ||
                backData[i].view === "bannersPlansUpgrade" ||
                (typeof backData[i].view === "string" && backData[i].view.indexOf("plansUpgrade") !== -1) ||
                (typeof backData[i].targetPath === "string" && backData[i].targetPath.indexOf("plansUpgrade") !== -1)
            )) {
                backData.splice(i, 1);
            }
        }
    }
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }
        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="congratulations" >'
        Text += '<div class="container">'
        if (plansData.dxl_juspay.success_page && plansData.dxl_juspay.success_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.dxl_juspay.success_page.heading + '</h1>'
        }
        Text += '<img class="success-image" src="' + appConfig.viStaticColudPath + 'Check_mark.png" >'
        if (plansData.dxl_juspay.success_page && plansData.dxl_juspay.success_page.description) {
            var description = plansData.dxl_juspay.success_page.description;

            if (description.includes('$plan_name') && presentPagedetails.packName) {
                description = description.replace('$plan_name', presentPagedetails.packName);
            }
            Text += '<p>' + description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.dxl_juspay.success_page && plansData.dxl_juspay.success_page.button_title) {
            Text += '<button type="button" btntype="success" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.dxl_juspay.success_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}


// Plans pending Page
Util.directPendingSuccess = function () {
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }
        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="planspending" >'
        Text += '<div class="container">'
        if (plansData.dxl_juspay.pending_page && plansData.dxl_juspay.pending_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.dxl_juspay.pending_page.heading + '</h1>'
        }
        Text += '<img class="failed-image" src="' + appConfig.viStaticColudPath + 'plans_faild.png"  >'
        if (plansData.dxl_juspay.pending_page && plansData.dxl_juspay.pending_page.description) {
            Text += '<p>' + plansData.dxl_juspay.pending_page.description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.dxl_juspay.pending_page && plansData.dxl_juspay.pending_page.button_title) {
            Text += '<button type="button" btntype="pending" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.dxl_juspay.pending_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}

// Plans Failed Page
Util.directfailedSuccess = function () {
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPageV3) {
            var rawData = systemConfigs.configs.tvappPlansPageV3;
        }

        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.log("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }


    var Text = '';
    if (!!plansData) {
        Text += '<div class="uniquePage uniquePage1" id="plansFailed" >'
        Text += '<div class="container">'
        if (plansData.dxl_juspay.failed_page && plansData.dxl_juspay.failed_page.heading) {
            Text += '<h1 class="main-heading textCenter">' + plansData.dxl_juspay.failed_page.heading + '</h1>'
        }
        Text += '<div class="failed_image_container">'
        Text += '<img class="failed-image" src="' + appConfig.viStaticColudPath + 'Payment_Failure.png"  >'
        Text += '</div>'
        if (plansData.dxl_juspay.failed_page && plansData.dxl_juspay.failed_page.description) {
            Text += '<p>' + plansData.dxl_juspay.failed_page.description.replace(/\n/g, '<br>') + '</p>';
        }
        if (plansData.dxl_juspay.failed_page && plansData.dxl_juspay.failed_page.button_title) {
            Text += '<button type="button" btntype="pending" id="plans_page-0" source="plansConfirm" class="unique-page-btn primary-btn">' + plansData.sdpse.failed_page.button_title + '</button>'
        }
        Text += '</div>'
        Text += '</div>'
    }
    return Text;
}


//player parental Rating
Util.parentalControl = function () {
    var Text = ''
    if (presentPagedetails.steamResponse.pageAttributes.pgRatingTitle != null && presentPagedetails.steamResponse.pageAttributes.pgRatingTitle != undefined && presentPagedetails.steamResponse.pageAttributes.pgRatingTitle != "") {
        Text += '<div class="parental_control" id="rating_part">'
        Text += '<h3>' + presentPagedetails.steamResponse.pageAttributes.pgRatingTitle + '</h3>'
        if (presentPagedetails.steamResponse.pageAttributes.pgRatingSubtitle != null && presentPagedetails.steamResponse.pageAttributes.pgRatingSubtitle != undefined && presentPagedetails.steamResponse.pageAttributes.pgRatingSubtitle != "")
            Text += '<h4>' + presentPagedetails.steamResponse.pageAttributes.pgRatingSubtitle + '</h4>'
        Text += '</div>'
    }
    return Text;
}
// Player Body
Util.playerBody = function () {
    var Text = '';
    Text += '<div class="player-bg">';
    Text += '<div class="top-left-icons" id="top-left-icon">'
    Text += '<div class="control_items" type="back" source="icon"  id="btn-0">'
    Text += '<img src="images/Player-Back.png" class="default" id="player_back" source = "player_back">'
    Text += '<img src="images/Back_Focused.png" class="focused" id="player_back" source = "player_back">'
    Text += '<div class="icon_name focused">Back</div>'
    Text += '</div>'
    // if (presentPagedetails.steamResponse.analyticsInfo.contentType !== 'live' &&((presentPagedetails.steamResponse.streams[0].closeCaptions && presentPagedetails.steamResponse.streams[0].closeCaptions.ccList.length > 0)  || audioTrackisAvailable == true)) {   
    //     Text += '<div class="control_items" source="icon" type="subtitles"  id="btn-1">'
    //     Text += '<img src="images/subtitles_default.png" id="Subtitlesbtn" source="subtitlesbtn"class="default">';
    //     Text += '<img src="images/subtitles_focused.png" id="Subtitlesbtn" source="subtitlesbtn" class="focused">';
    //     Text += '<div class="icon_name focused">Subtitles</div>'
    //     Text += '</div>'
    // }
    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
        Text += '<div class="control_items" type="startover"  source="icon"  id="btn-2">'
        Text += '<img src="images/play_from_beginning_Default.png" id="playstartbtn" source="playstartbtn" class="default">';
        Text += '<img src="images/play_from_beginning_Focused.png" id="playstartbtn" source="playstartbtn" class="focused">';
        Text += '<div class="icon_name focused">Start&nbspOver</div>'
        Text += '</div>'
    }
    //   if() {
    // if(presentPagedetails.steamResponse.analyticsInfo.contentType !="live" && presentPagedetails.nextVideoDetails.length > 0 &&  (presentPagedetails.attributes.showNextButton== "true" || nextVidDetails == true )){
    //     Text += '<div class="control_items" type="nextbtn" source="icon"  id="btn-3">'
    //     Text += '<img src="images/next_default.png" id="playstartbtn" source="playstartbtn"class="default">';
    //     Text += '<img src="images/next_focused.png" id="playstartbtn" source="playstartbtn" class="focused">';
    //     Text += '<div class="icon_name focused">Next</div>'
    //     Text += '</div>'

    // }
    Text += '<div class="control_items" type="quality" source="icon"  id="btn-4">'
    Text += '<img src="images/Player-Settings.png" class="default" id="player_setting" source = "player_setting">'
    Text += '<img src="images/Player-Settings_Focused.png" class="focused" id="player_setting" source = "player_setting">'
    Text += '<div class="icon_name focused">Video&nbspQuality</div>'
    Text += '</div>'
    Text += '</div>'
    if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
        Text += '<div class="bottom_icons_live" id="bottom-left-icon">'
    }
    else {
        Text += '<div class="bottom_icons" id="bottom-left-icon">'
    }
    Text += '<div class="play_pause player_play" source="player_icon"  id="playerBtn">'
    // if (presentPagedetails.steamResponse.analyticsInfo.contentType !="live") {
    Text += '<div class="icon_name play_selected_icon">Play</div>'
    Text += '<div class="icon_name pause_selected_icon">Pause</div>'
    Text += '<img src="images/Play.png" class="play_default_icon">';
    Text += '<img src="images/playbtn_focused.png" class="play_selected_icon">';
    Text += '<img src="images/Pause.png" class="pause_default_icon">';
    Text += '<img src="images/pausebtn_focused.png" class="pause_selected_icon">';

    // }
    Text += '</div>'
    Text += '</div>'
    if (presentPagedetails.attributes && presentPagedetails.attributes.introLabel) {
        Text += '<div class="skip_btn" id="skipintro" source="skipintro" ><span class="btn_text">' + presentPagedetails.attributes.introLabel + '</span></div>'
    }
    else {
        Text += '<div class="skip_btn" id="skipintro" source="skipintro" ><span class="btn_text">Skip Intro</span></div>'
    }
    Text += '<div class="watch_credits_bottom" id="watch_credits_bottom_id">'
    Text += '<div id="watch_credits-preview" class="watch_credits-previewId" source="watch_credits_preview">'
    Text += '</div>'
    Text += '</div>'
    Text += '<div class="nextVideo_bottom" id="nextVideo_bottom_id">'
    Text += '<div id="next-preview" class="next-previewId" source="nextVideo_preview">'
    Text += '</div>'
    Text += '</div>'
    Text += '<div id="play_btn">'
    Text += '<div class = "video_quality" id = "video_quality">'
    Text += '</div>'
    Text += '<div class = "subtitles_main" id = "subtitles_main">'
    Text += '</div>'
    Text += '</div>'
    Text += Util.parentalControl();
    setTimeout(function () {
        var parentalControlElement = document.querySelector('.parental_control');
        if (parentalControlElement) {
            parentalControlElement.style.display = 'none';
        }
    }, 5000);
    Text += '<div class="playerControls" target="playerControls">';
    // Text += '<img id="playerBackImg" src="' + Util.getImages(presentPagedetails.pageContent[0].backgroundImage) + '"  onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/actionbar_brand_logo.png"/> ';
    // if(presentPagedetails.sections.length > 0)
    if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
        // if(presentPagedetails.steamResponse.analyticsInfo.contentType =="live"){
        //     Text += '<div class="browseSuggns" id="browseSuggns" source="browseSuggns"><div class="browseText upArrow strong " id="browseText"><p >Browse Suggestions</p> <img class="upArrowImg" src="images/Episodes_down_arrow.png"></div><div class"" class="browseText downArrow strong" id="browseText"><p >Browse Suggestions</p></div></div>'
        // }
        if (presentPagedetails.steamResponse.analyticsInfo.dataType == "web_series_episode" || presentPagedetails.steamResponse.pageAttributes.targetMenuCode == 'shows') {
            Text += '<div class="browseSuggns" id="browseSuggns" source="browseSuggns"><div class="browseText upArrow strong " id="browseText"><p >Episodes</p> <img class="upArrowImg" src="images/Episodes_down_arrow.png"></div><div class"" class="browseText downArrow strong" id="browseText"><p >Episodes</p></div></div>'
        }
        else if (presentPagedetails.steamResponse.analyticsInfo && presentPagedetails.steamResponse.analyticsInfo.dataType == "originals_series_episode" || presentPagedetails.steamResponse.analyticsInfo.dataType == "sports_series_episode") {
            Text += '<div class="browseSuggns" id="browseSuggns" source="browseSuggns"><div class="browseText upArrow strong " id="browseText"><p >Browse More</p> <img class="upArrowImg" src="images/Episodes_down_arrow.png"></div><div class"" class="browseText downArrow strong" id="browseText"><p >Browse More</p></div></div>'
        }
        else if (presentPagedetails.steamResponse.analyticsInfo.dataType == "movie") {
            Text += '<div class="browseSuggns" id="browseSuggns" source="browseSuggns"><div class="browseText upArrow strong " id="browseText"><p >Browse More</p> <img class="upArrowImg" src="images/Episodes_down_arrow.png"></div><div class"" class="browseText downArrow strong" id="browseText"><p >Browse More</p></div></div>'
        }
    }
    Text += '<div class="play-but playerMouse" id="play-but" source="playBtn"></div>'
    if (presentPagedetails.steamResponse.analyticsInfo.contentType != "live") {
        Text += '<div class="seekbar" id="seekbar" source="seekbar">'
        Text += '<div class="seekbar-run" id="seekbar-run"></div>'
        Text += '<div class="seek-picker-time seek-picker-runtime" id="seek-picker-runtime"></div>'
        Text += '<div class="seek-picker" id="seek-picker"></div>'
        Text += '<span class="seek-picker-time seek-picker-start" id="seek-picker-start">00:00:00</span>'
        Text += '<span class="seek-picker-time seek-picker-end" id="seek-picker-end">00:00:00</span>'
        Text += '</div>'
    }
    if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
        // Text += '<div class="seekbar-live playerMouse" id="seekbar-live" source="seekbar-live">'
        Text += '<div class="seekbar-live">'
        // Text += '<div class="seekbar-run-live" id="seekbar-run-live"></div>'
        // Text += '<div class="seek-picker-time-live seek-picker-runtime-live" id="seek-picker-runtime-live"></div>'
        // Text += '<div class="seek-picker-live" id="seek-picker-live"></div>'
        if (presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.categoryType && presentPagedetails.attributes.categoryType && presentPagedetails.attributes.categoryType.toLowerCase() == "simulcast") {
            Text += '<div class = "seek-live-text"> <span class="red_dot"></span>Streaming</div>'
        }
        else {
            Text += '<div class = "seek-live-text"> <span class="red_dot"></span>LIVE</div>'

        }
        Text += '</div>'
    }
    Text += '<div class="vod-title playerMouse" id="vod-title" source="vodTitle">'
    if (presentPagedetails.attributes && presentPagedetails.attributes.tvShowName != '' && presentPagedetails.attributes.tvShowName != undefined) {
        Text += '<h4 class="vodname">' + presentPagedetails.attributes.tvShowName + '</h4>'
    } else {
        Text += '<h4 class="vodname">' + presentPagedetails.pageContent[0].title + '</h4>'
    }
    for (var i = 0; i < presentPagedetails.pageContent[0].dataRows.length; i++) {
        if (presentPagedetails.pageContent[0].dataRows[i].rowDataType == 'content') {
            for (var j = 0; j < presentPagedetails.pageContent[0].dataRows[i].elements.length; j++) {
                var elements = presentPagedetails.pageContent[0].dataRows[i].elements[j];
                if (elements.elementType == 'text' && elements.elementSubtype == 'subtitle') {
                    Text += '<p class="vodInfo">' + elements.data + '</p>';
                    presentPagedetails.attributes.contentEpisode = elements.data;
                    break;
                }
            }
        }
    }
    Text += '</div>'

    Text += '</div>'
    if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
        Text += '<div class="playSugestions" target="playSugestions">';
        for (i = 0; i < presentPagedetails.sections.length; i++) {
            if (presentPagedetails.sections[i].sectionInfo.dataType == 'actor') {
                presentPagedetails.sections.splice(i, 1);
                break;
            }
        }
        for (i = 0; i < presentPagedetails.sections.length; i++) {
            Yup("#section-" + i).hide();
            if (presentPagedetails.sections[i].sectionControls.dataLength > 0) {
                for (var j = 0; j < presentPagedetails.sections[i].sectionData.data.length; j++) {
                    presentPagedetails.sections[i].sectionData.data[j].cardType = 'player-card';
                }
            }
        }
        Text += Util.getSections(presentPagedetails.sections);
    }
    Text += '</div></div>'
    Text += '<div id="playerHTML5"></div>'
    Text += '<div class="captions_data"><p id="captions"></p></div>'
    return Text;
}

Util.changePasswordHTML = function () {
    var Text = '';
    Text += '<div class="otpVerifyFrom" id="signInContent"><div class="container">'
    Text += '<div class="row" id="headSignIn">'
    Text += '<div class="col2 headerLogo"> <img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    Text += '<div class="col8"><h2 class="signHead textCenter" id="signinTitle" >Change Password</h2></div>'
    Text += '<div class="col2"></div>'
    Text += '</div>'
    Text += '<div class="row">'
    Text += '<div class="col6" id="keyLayout">'
    Text += Util.genericKeys('changePassOld');
    Text += '</div>'
    Text += '<div class="col6" id="formLayout">'
    Text += Util.chnagePasswordFrom();
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.chnagePasswordFrom = function () {
    var Text = '';
    Text += '<div class="old">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Enter your Old password</label> <input class="inputForm input-active" placeholder="Enter Old password" index="0" disabled keyType="defaultKeys" type="password" name="oldPassword" id="signInInput-0" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'

    Text += '<div class="newPassword">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Enter your new password</label> <input class="inputForm" placeholder="Enter New password" index="1" disabled keyType="defaultKeys" type="password" name="newPassword" id="signInInput-1" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-1" class="errorInput" ></label></div></div>'

    Text += '<div class="reEnterNewPassword">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Re-enter your new password</label> <input class="inputForm" placeholder="Re-enter New Password" index="2" disabled keyType="defaultKeys" type="password" name="reenterPassword" id="signInInput-2" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-2" class="errorInput" ></label></div></div>'

    return Text;
}

Util.signUpHtml = function () {
    var Text = '';
    Text += '<div  class="signUpform" id="signInContent"><div class="container">'
    Text += '<div class="row" id="headSignIn">'
    Text += '<div class="col2 headerLogo"> <img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    Text += '<div class="col8"><h2 class="signHead textCenter" id="signinTitle">Create your ' + appConfig.appName + ' account</h2></div>'
    Text += '<div class="col2"></div>'
    if (systemConfigs.configs && systemConfigs.configs.signupFreeTrailDescription && appConfig.showSubscribeText) {
        Text += '<div class="row signsubHead textCenter"> <span class="" id="signinSubTitle"> ' + systemConfigs.configs.signupFreeTrailDescription + '</span> </div>'
    }
    Text += '</div>'
    Text += '<div class="row">'
    Text += '<div class="col6" id="keyLayout">'
    Text += Util.numberKeys('signup');
    Text += '</div>'
    Text += '<div class="col6" id="formLayout">'
    Text += Util.signupForms();
    Text += '<div class="row mt45">'
    Text += '<div class="col12"><div class="signUpLabelpar"><label class="signUpLabel authlabel">Have an account ?</label></div>'
    Text += '<div id="signupBtn" class="keyboardKeys btn-default " source="signupBtn">Sign in</div>'
    Text += '</div></div>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.signupForms = function () {
    var Text = '';
    Text += '<div>'
    Text += '<div class="mobileNum">'
    Text += '<div class="row country-mobile"><label class="authlabel">Mobile Number</label><div class="countryCode" class="col2"> ' + Util.countryCodeForm() + '</div>';
    Text += '<div class="mobile_number_from"><input type="text" keyType="numeric" index="0" class="inputForm input-active" formType="mobileNum" placeholder="Mobile Number" disabled name="mobileNumber" id="signInInput-0"></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div></div>'
    Text += '<div class="password">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Password</label> <input class="inputForm" formType="password" placeholder="Password" index="1" disabled keyType="defaultKeys" type="password" name="Password" id="signInInput-1" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-1" class="errorInput" ></label></div></div>'
    Text += '<div class="reEnterPassword">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Confirm Password</label> <input class="inputForm" formType="password" placeholder="Password" index="2" disabled keyType="defaultKeys" type="password" name="confirmPassword" id="signInInput-2" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-2" class="errorInput" ></label></div></div>'
    Text += '</div>'
    return Text;
}

// Util.signupOTPVerificationHTML =function (){
//     var Text = '';
//     Text += '<div  class="sigupOtpVerifyFrom" id="signInContent"><div class="container">'
//     Text += '<div class="" id="headSignIn">'
//     Text += '<div class=""><h2 class="signHead" id="signinTitle">Sign in to your account</h2></div>'
//     Text += '<div class="headerLogo"> <img src="images/logo_test.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
//     Text += '</div>'
//     Text += '<div class="content-layout">'
//     Text += '<div class="row">'
//     Text += '<div class="col6" id="keyLayout">'
//     Text += Util.numberKeys('signupotp');
//     Text +='</div>'
//     Text += '<div class="col6" id="formLayout">'
//     Text += Util.signupOTP();
//     Text +='</div>'
//     Text +='</div>'
//     Text +='</div>'
//     Text += '</div>'
//     return Text;
// }
Util.profilePinVerificationHTML = function (data) {
    var Text = '';
    Text += '<div  class="ProfileOtpVerifyFrom" id="signInContent"><div class="container">'
    Text += '<div class="" id="headSignIn">'
    Text += '<div class="profile_header">'
    var imgUrl = (data && data.profileImageUrl) ? data.profileImageUrl : 'images/Profile-default.svg';
    Text += '<img src="' + imgUrl + '" class="profile_user_img">'
    if (data && data.name) {
        Text += '<h1>Hi ' + data.name + '</h1>'
    }
    if (data && data.profileId) {
        Text += '<input type="hidden" id="selectedProfileID" value="' + data.profileId + '">'
    }
    Text += '<h2>Enter your 4 Digit PIN to access your profile</h2>'
    Text += '</div>'
    Text += '<div class="headerLogo"> <img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    Text += '</div>'
    Text += '<div class="content-layout">'
    Text += '<div class="row">'
    Text += '<div class="col6" id="keyLayout">'
    Text += Util.numberKeys('profilepin');
    Text += '</div>'
    Text += '</div>'
    Text += '<div class="col6" id="formLayout">'
    Text += Util.profilePIN();
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    return Text;
}

// Util.profilePIN =function () {
//     var Text = '';
//     Text +='<div>'
//     Text += '<div class="password">'
//     // if(view == "profileLockOtpVerification"){
//     //         Text +='<div class="row country-mobile"> <label class="authlabel"></label> <input class="inputForm input-active" formType="otp" placeholder="Enter PIN" index="0" disabled keyType="numeric" pin_bar="profile_pin" type="text" name="otp" id="signInInput-0"></div>'
//     // Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'
//     // }
//     Text +='<div class="row country-mobile"> <label class="authlabel"></label> <input class="inputForm input-active" formType="otp" placeholder="Enter PIN" index="0" disabled keyType="numeric" type="text" name="otp" id="signInInput-0"></div>'
//     Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'
//     return Text;
// }
Util.profilePIN = function () {
    var Text = '';
    Text += '<div>'
    Text += '<div class="password">'
    // Text +='<div class="row country-mobile"> <label class="authlabel"></label> <input class="inputForm input-active" formType="otp" placeholder="Enter PIN" index="0" disabled keyType="numeric" type="text" name="otp" id="signInInput-0"></div>'
    // Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'
    Text += '<form class="myForms">'
    Text += '<input  type="text" name="profPin1" maxlength="1" class="pinNum" id="pin1"></input>'
    Text += '<input  type="text" name="profPin2" maxlength="1" class="pinNum" id="pin2"></input>'
    Text += '<input  type="text"  name="profPin3" maxlength="1" class="pinNum" id="pin3"></input>'
    Text += '<input  type="text" name="profPin4" maxlength="1" class="pinNum" id="pin4"></input>'
    Text += '</form>'
    Text += '<p id="errorDisplay">Invalid Profile PIN.Please enter a valid PIN to continue</p>'
    return Text;
}

Util.signupOTP = function () {
    var Text = '';
    Text += '<div>'
    Text += '<div class="password">'
    Text += '<div class="row country-mobile"> <label class="authlabel">Enter OTP</label> <input class="inputForm input-active" formType="otp" placeholder="" value = "" index="0" disabled keyType="numeric" type="password" name="otp" id="signInInput-0" ></div>'
    Text += '<div class="error-block"><label id="signInErrLabel-0" class="errorInput" ></label></div></div>'
    return Text;
}

// Signup Success Page
Util.signUpSuccess = function (msg) {
    var Text = '';
    Text += '<div class="uniquePage" id="signupSuccess">'
    Text += '<div class="container">'
    Text += '<img class="success-image" src="images/success_icon.png" >'
    Text += '<h1 class="main-heading textCenter"> ' + msg + '</h1>'
    if (systemConfigs.configs && systemConfigs.configs.signupFreeTrailDescription && appConfig.showSubscribeText) {
        Text += '<h3 class="sub-heading textCenter"> ' + systemConfigs.configs.signupFreeTrailDescription + '</h3>'
    }
    Text += '<button type="button" id="signout-0" source="signout" class="unique-page-btn grey-btn imageFocus"> Continue Browsing </button>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.noPackagesPage = function () {
    var Text = '';
    Text += '<div class="uniquePage" id="noPackage" style="overflow:hidden;height:100%;width:100%;background: url(images/noSubPage.png);background-size:cover;background-position:center center;position:absolute;padding: 0;margin: 0;">'
    Text += '<div class="logo">'
    Text += '<div class="headerLogo"><img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
    Text += '</div>'
    Text += '<div class="container">'
    Text += '<h1 class="main-heading textCenter">Watch with ' + appConfig.appName + '</h1>'
    Text += '<h3 class="sub-heading textCenter">Your account '
    Text += (Main.userProfile.email) ? (Main.userProfile.email) : (Main.userProfile.mobile)
    Text += ' is not Subscribed to ' + appConfig.appName + '</h3>'
    Text += '<h3 class="sub-heading sub-heading1 textCenter">To watch this content, subscribe on www.vodafone.com from web browser</h3>'
    Text += '<button type="button" id="browseBtn-0" source="noSubView" class="unique-page-btn grey-btn imageFocus">Back to Browse</button>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}



Util.tvGuideDatesHtml = function (data) {
    var Text = '';
    // Text +=Util.getMenus(data.menusList)
    Text += '<div class="menus-content">'
    Text += '<div class="tvGuideDates">';
    Text += '<div class="tvGuideClassInner">'
    var today_index = 0
    for (var i = 0; i < data.tvGuideChannelsData.tabs.length; i++) {
        if (data.tvGuideChannelsData.tabs[i].title == 'Today') {
            today_index = i;
            break;
        }
    }

    for (var i = 0; i < data.tvGuideChannelsData.tabs.length; i++) {
        if (today_index > 6) {
            if (i < today_index - 6) {
                Text += '<div class="tabItem ' + ((data.tvGuideChannelsData.tabs[i].isSelected == true) ? 'active imageFocus' : '') + ' " source="tvguideTabs" totalLength="' + data.tvGuideChannelsData.tabs.length + '" id="tabItem-' + i + '" startTime="' + data.tvGuideChannelsData.tabs[i].startTime + '" endTime="' + data.tvGuideChannelsData.tabs[i].endTime + '" style="display:none;"  >';
                Text += data.tvGuideChannelsData.tabs[i].title == 'Today' ? '<div class="tabTitle"> Today </div>' : '<div class="tabTitle">' + data.tvGuideChannelsData.tabs[i].title + '&nbsp&nbsp' + data.tvGuideChannelsData.tabs[i].subtitle + '</div>'
                Text += '</div>';
            } else {
                Text += '<div class="tabItem ' + ((data.tvGuideChannelsData.tabs[i].isSelected == true) ? 'active imageFocus' : '') + ' " source="tvguideTabs" totalLength="' + data.tvGuideChannelsData.tabs.length + '" id="tabItem-' + i + '" startTime="' + data.tvGuideChannelsData.tabs[i].startTime + '" endTime="' + data.tvGuideChannelsData.tabs[i].endTime + '" style="display:inline-block"  >';
                Text += data.tvGuideChannelsData.tabs[i].title == 'Today' ? '<div class="tabTitle"> Today </div>' : '<div class="tabTitle">' + data.tvGuideChannelsData.tabs[i].title + '&nbsp&nbsp' + data.tvGuideChannelsData.tabs[i].subtitle + '</div>'
                Text += '</div>';
            }
        }
        else {
            if (i > 6) {
                Text += '<div class="tabItem ' + ((data.tvGuideChannelsData.tabs[i].isSelected == true) ? 'active imageFocus' : '') + ' " source="tvguideTabs" totalLength="' + data.tvGuideChannelsData.tabs.length + '" id="tabItem-' + i + '" startTime="' + data.tvGuideChannelsData.tabs[i].startTime + '" endTime="' + data.tvGuideChannelsData.tabs[i].endTime + '" style="display:none;"  >';
                Text += data.tvGuideChannelsData.tabs[i].title == 'Today' ? '<div class="tabTitle"> Today </div>' : '<div class="tabTitle">' + data.tvGuideChannelsData.tabs[i].title + '&nbsp&nbsp' + data.tvGuideChannelsData.tabs[i].subtitle + '</div>'
                Text += '</div>';
            }
            else {
                Text += '<div class="tabItem ' + ((data.tvGuideChannelsData.tabs[i].isSelected == true) ? 'active imageFocus' : '') + ' " source="tvguideTabs" totalLength="' + data.tvGuideChannelsData.tabs.length + '" id="tabItem-' + i + '" startTime="' + data.tvGuideChannelsData.tabs[i].startTime + '" endTime="' + data.tvGuideChannelsData.tabs[i].endTime + '" style="display:inline-block"  >';
                Text += data.tvGuideChannelsData.tabs[i].title == 'Today' ? '<div class="tabTitle"> Today </div>' : '<div class="tabTitle">' + data.tvGuideChannelsData.tabs[i].title + '&nbsp&nbsp' + data.tvGuideChannelsData.tabs[i].subtitle + '</div>'
                Text += '</div>';
            }
        }
    }

    Text += '</div>'
    Text += '<div class="tvGuideTimeInner">'
    for (var i = 0; i < timesList.length; i++) {
        Text += '<div class="timeItem" source="tvguideTimes" id="timeItem-' + i + '">';
        Text += '<div class="timeTitle"> ' + timesList[i] + ' <span class="time_devider"></span></div>';
        Text += '</div>';
    }
    Text += '</div>'

    var presentDate = new Date().getTime();
    if (parseInt(presentPagedetails.selectedDate.startTime) <= presentDate && parseInt(presentPagedetails.selectedDate.endTime) >= presentDate) {
        presentPagedetails.selectedDate.isToday = true;
        Text += '<div class="liveTag">'
        Text += '<span class="livename"> LIVE </span>'
        Text += '<span class="liveline"></span>'
        Text += '<span class="live">'
        Text += '</div>'
    }

    Text += '<div class="tvGuideChannels">'
    Text += '</div>'
    Text += '</div>';
    Text += '</div>';

    return Text;
}


Util.tvguide = function (tvguideSectionsData) {
    var currentTime = new Date().getTime();
    var resolution = Yup(window).width();
    if (presentPagedetails.paginationSectionsData.length == 0)
        persistanceData = []
    var i = 0;
    var arrayLength = tvguideSectionsData.length;
    if (presentPagedetails.paginationHitHappening != 0 && presentPagedetails.paginationHitHappening != undefined) {
        arrayLength = presentPagedetails.paginationSectionsData.length;
        i = presentPagedetails.paginationHitHappening;

    }
    for (i; i < arrayLength; i++) {
        var Text = '';
        Text += '<div class="channelRow" id="channelRow-' + i + '">'
        Text += '<div class="channelIcon">'
        Text += '<img id="channelIconImg" source="tvguideChannel" src="' + Util.getTvChannelIconImage(presentPagedetails.paginationSectionsData[i].channelId) + '"  onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/> ';
        Text += '</div>'
        Text += '<div class="channelPrograms" source="tvguideProgram"   id="channelPrograms-' + i + '" >'
        for (var j = 0; j < presentPagedetails.paginationSectionsData[i].programs.length; j++) {
            var programduration = presentPagedetails.paginationSectionsData[i].programs[j].target.pageAttributes.endTime - presentPagedetails.paginationSectionsData[i].programs[j].target.pageAttributes.startTime;
            //           var width = (programduration / 5625) + 'px' ;
            var program_in_min = programduration / 60000;
            var _width;
            if (resolution == 1920) {
                _width = (320 * program_in_min) / 30;
            }
            if (resolution == 1280) {
                _width = (215 * program_in_min) / 30;
            }
            Text += '<div class="channelProgramsList">'
            Text += '<div class="channelProgramsItem" source="tvguideProgram" template="' + presentPagedetails.paginationSectionsData[i].programs[j].template + '" targetPath="' + presentPagedetails.paginationSectionsData[i].programs[j].target.path + '" id="channelProgramsItem-' + i + '-' + j + '" programduration="' + programduration + '" style="width:' + _width + 'px" startTime="' + presentPagedetails.paginationSectionsData[i].programs[j].target.pageAttributes.startTime + '" endTime="' + presentPagedetails.paginationSectionsData[i].programs[j].target.pageAttributes.endTime + '" target="' + presentPagedetails.paginationSectionsData[i].programs[j].target.path + '" >'
            Text += '<span class="programText">' + presentPagedetails.paginationSectionsData[i].programs[j].display.title
            Text += '</span></div>'
            Text += '</div>'
            if (j == 0) {
                var obj = {}
                if (i >= persistanceData.length) {
                    obj["channelPrograms-" + i + ""] = "channelProgramsItem-" + i + "-" + j + ""
                    persistanceData.push(obj);
                }
            }
        }
        Text += '</div>'
        Text += '</div>'
        Yup(".tvGuideChannels").append(Text);
    }

    if (presentPagedetails.paginationHitHappening != 0 && presentPagedetails.paginationHitHappening != undefined) {
        presentPagedetails.paginationHitHappening = undefined;
        var existingleftValue = Yup('.tvGuideTimeInner').css("left");
        Yup('.channelPrograms').css("left", existingleftValue);
    }
}

Util.getTvChannelIconImage = function (channelId) {
    for (var i = 0; i < presentPagedetails.tvGuideChannelsData.data.length; i++) {
        if (channelId == presentPagedetails.tvGuideChannelsData.data[i].id) {
            return Util.getImages(presentPagedetails.tvGuideChannelsData.data[i].display.imageUrl);
        }
    }
}

Util.showTemplate = function () {
    var Text = '';
    Text += '<div class="contentTemplate" id="contentTemp">'
    if (presentPagedetails.templateData.image && !presentPagedetails.templateData.image.data) {
        Text += '<div class="templateOverlay" style="background-image:url(' + presentPagedetails.templateData.image.data + ')">'
    }
    if (presentPagedetails.templateData.templateCode == "deeplink_info") {
        Text += '<div class="dis_template">';
    }
    else {
        Text += '<div class="suspend_template">';
    }
    if (presentPagedetails.targetPath != "favourites" && presentPagedetails.templateData.templateCode != "deeplink_info") {
        Text += Util.getLogo();
    }
    if (presentPagedetails.templateData.templateCode == "deeplink_info") {
        Text += '<div class="disImage">';
        Text += '<img class="" src=' + presentPagedetails.templateData.image.data + '></img>'
        Text += '</div>';
    }
    // if( presentPagedetails.templateData.image && presentPagedetails.templateData.image.displayCondition=='true'){
    //     Text +='<img class="main" src="' + presentPagedetails.templateData.image.data + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/actionbar_brand_logo.png" />';
    // }

    Text += '<div class="templateTitle">'
    if (presentPagedetails.templateData.title && presentPagedetails.templateData.title.displayCondition == 'true') {
        Text += "<h1>" + presentPagedetails.templateData.title.data + "</h1>";
    }
    if (presentPagedetails.templateData.subtitle && presentPagedetails.templateData.subtitle.displayCondition == 'true') {
        if (presentPagedetails.templateData.templateCode == "deeplink_info") {
            var userDetails = JSON.parse(localStorage.getItem('userDetails'));
            userDetails.phoneNumber = userDetails.phoneNumber.replace(/^91-/, '');
            var disNumber = presentPagedetails.templateData.subtitle.data.replace(/\$mobile\$/g, userDetails.phoneNumber);
            Text += "<h5>" + disNumber + "</h5>";
        } else {
            Text += "<h5>" + presentPagedetails.templateData.subtitle.data + "</h5>";
        }
    }
    if (presentPagedetails.templateData.pgrating && presentPagedetails.templateData.pgrating.displayCondition == 'true') {
        Text += "<h5 class='rating'>" + presentPagedetails.templateData.pgrating.data + "</h5>";
    }
    if (presentPagedetails.templateData.description && presentPagedetails.templateData.description.displayCondition == 'true') {
        Text += '<div class="templateDes">' + presentPagedetails.templateData.description.data + '</div>'
    }
    // if(presentPagedetails.templateData.cast && presentPagedetails.templateData.cast.displayCondition=='true'){
    //     Text += "<h5 class='cast'>Cast & Crew:"+presentPagedetails.templateData.cast.data+"</h5>";
    // }
    if (presentPagedetails.templateData.languageDisplayText && presentPagedetails.templateData.languageDisplayText.displayCondition == 'true') {
        Text += "<h5> Available In:" + presentPagedetails.templateData.languageDisplayText.data + "</h5>";
    }
    Text += '</div>'
    Text += '<div class="templateButns">'
    var btnFocus = false;
    presentPagedetails.templateData.btnsCount = 0;
    for (var i = 0; i < presentPagedetails.templateData.tembutns.length; i++) {
        if (presentPagedetails.templateData.tembutns[i] && presentPagedetails.templateData.tembutns[i].displayCondition == 'true') {
            if (presentPagedetails.templateData.templateCode === "TV_COCP_popup") {
                Text += '<button id="special-btn-' + presentPagedetails.templateData.btnsCount + '" class="btn-special btnFocus template_over"';
                if (!btnFocus) {
                    Text += "btnFocus";
                    btnFocus = true;
                }
                Text += '" btnType="' + presentPagedetails.templateData.tembutns[i].name + '" btnName ="' + presentPagedetails.templateData.tembutns[i].buttonName + '"  source="tempBtns" targetpath="' + presentPagedetails.templateData.tembutns[0].target + '" >' + presentPagedetails.templateData.tembutns[i].data + '</button>';
                ++presentPagedetails.templateData.btnsCount;
                presentPagedetails.templateData.btnname = presentPagedetails.templateData.tembutns[i].buttonName;
                // Break the loop after adding one button
                break;
            } else {
                Text += '<button id="tempbtn-' + presentPagedetails.templateData.btnsCount + '" class="btn-default  template_over ';
                if (!btnFocus) {
                    Text += 'btnFocus';
                    btnFocus = true;
                }
                Text += '" btnType="' + presentPagedetails.templateData.tembutns[i].name + '" btnName ="' + presentPagedetails.templateData.tembutns[i].buttonName + '"  source="tempBtns" targetpath="' + presentPagedetails.templateData.tembutns[0].target + '" >' + presentPagedetails.templateData.tembutns[i].data + '</button>';
                ++presentPagedetails.templateData.btnsCount;
            }
        }
    }


    Text += '</div>'
    Text += '</div>'
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.showBingelistTemplate = function () {
    var Text = '';
    Text += '<div class="contentTemplate" id="contentTemp">'
    if (presentPagedetails.templateData.image && !presentPagedetails.templateData.image.data) {
        Text += '<div class="templateOverlay" style="background-image:url(' + presentPagedetails.templateData.image.data + ')">'
    }
    Text += '<div class="templateInfo">';
    if (presentPagedetails.targetPath != "favourites") {
        Text += Util.getLogo();
    }
    // if( presentPagedetails.templateData.image && presentPagedetails.templateData.image.displayCondition=='true'){
    //     Text +='<img class="main" src="' + presentPagedetails.templateData.image.data + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/actionbar_brand_logo.png" />';
    // }

    Text += '<div class="templateTitle">'
    if (presentPagedetails.templateData.title && presentPagedetails.templateData.title.displayCondition == 'true') {
        Text += "<h1>" + presentPagedetails.templateData.title.data + "</h1>";
    }
    if (presentPagedetails.templateData.subtitle.data.length > 33) {
        // var description_text = elements.data;
        // presentPagedetails.description= presentPagedetails.templateData.subtitle.data;
        presentPagedetails.templateData.subtitle.data = presentPagedetails.templateData.subtitle.data.substr(0, 33);
        presentPagedetails.templateData.subtitle.data += '....';
    }
    if (presentPagedetails.templateData.subtitle && presentPagedetails.templateData.subtitle.displayCondition == 'true') {
        Text += "<h5>" + presentPagedetails.templateData.subtitle.data + "</h5>";
    }
    if (presentPagedetails.templateData.pgrating && presentPagedetails.templateData.pgrating.displayCondition == 'true') {
        Text += "<h5 class='rating'>" + presentPagedetails.templateData.pgrating.data + "</h5>";
    }
    if (presentPagedetails.templateData.description && presentPagedetails.templateData.description.displayCondition == 'true') {
        Text += '<div class="templateDes">' + presentPagedetails.templateData.description.data + '</div>'
    }
    // if(presentPagedetails.templateData.cast && presentPagedetails.templateData.cast.displayCondition=='true'){
    //     Text += "<h5 class='cast'>Cast & Crew:"+presentPagedetails.templateData.cast.data+"</h5>";
    // }
    if (presentPagedetails.templateData.languageDisplayText && presentPagedetails.templateData.languageDisplayText.displayCondition == 'true') {
        Text += "<h5> Available In:" + presentPagedetails.templateData.languageDisplayText.data + "</h5>";
    }
    Text += '</div>'
    Text += '<div class="templateButns">'
    var btnFocus = false;
    presentPagedetails.templateData.btnsCount = 0;
    for (var i = 0; i < presentPagedetails.templateData.tembutns.length; i++) {
        if (presentPagedetails.templateData.tembutns[i] && presentPagedetails.templateData.tembutns[i].displayCondition == 'true') {
            if (presentPagedetails.templateData.tembutns.length === 1) {
                Text += '<button id="special-btn-' + presentPagedetails.templateData.btnsCount + '" class="btn-special btnFocus template_over"';
                if (!btnFocus) { Text += 'btnFocus'; btnFocus = true; }
                Text += '"btnType="' + presentPagedetails.templateData.tembutns[i].name + '" template ="' + presentPagedetails.templateData.tembutns[i].template + '"  btnName ="' + presentPagedetails.templateData.tembutns[i].buttonName + '"  source="tempBtns" targetpath="' + presentPagedetails.templateData.tembutns[0].target + '" >' + presentPagedetails.templateData.tembutns[i].data + '</button>';
                ++presentPagedetails.templateData.btnsCount;
                presentPagedetails.templateData.btnname = presentPagedetails.templateData.tembutns[i].buttonName
            }
            else {
                Text += '<button id="tempbtn-' + presentPagedetails.templateData.btnsCount + '" class="btn-default  template_over ';
                if (!btnFocus) {
                    Text += 'btnFocus';
                    btnFocus = true;
                }
                Text += '" btnType="' + presentPagedetails.templateData.tembutns[i].name + '" btnName="' + presentPagedetails.templateData.tembutns[i].buttonName + '" source="tempBtns" targetpath="' + presentPagedetails.templateData.tembutns[0].target + '"';
                if (presentPagedetails.templateData.tembutns[i].buttonName !== "Remove from list") {
                    Text += ' template="' + (presentPagedetails.templateData.tembutns[i].template ? presentPagedetails.templateData.tembutns[i].template : '') + '"';
                }
                Text += '>';
                Text += presentPagedetails.templateData.tembutns[i].data;
                Text += '</button>';
                ++presentPagedetails.templateData.btnsCount;
            }
        }
    }

    Text += '</div>'
    Text += '</div>'
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.nonViUserPopUp = function (nonViData) {
    var Text = '';
    console.log(nonViData)
    var subtitle = nonViData.subtitle
    // Replace "or" with "or" surrounded by new lines and replace \\n with actual line breaks
    subtitle = subtitle
        .replace(/\s+or\s+/g, '<br><span class="center-or">or</span><br>') // Add <br> for spacing and wrap "or" in a span
        .replace(/\\n/g, '<br><br>'); Text += '<div class="contentTemplate">'
    Text += '<div class="transBlock" id="templetoverlay_Bingelist" source="transBlock">'
    Text += Util.getLogo();
    Text += '<div class="templetoverlay" id="templetoverlay">'
    Text += '<h1>' + nonViData.title + '</h1>'
    Text += '<p>' + subtitle + '</p>'
    Text += '<div class="qr_img">'
    Text += '<div id="nonViqrcode" class="passcode_rq" title="http://www.vodafone.com/device?auth_code=ILNH"></div>'
    Text += '</div>'
    Text += '<button id="nonVi_close" type="button" source="nonVi" btnType="yes" class="nonreg_btn">' + Main.popupData.yesText + '</button>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.introPageView = function (result) {
    var Text = '';
    Text += '<div class="uniquePage" id="introPage" >'
    Text += '<div class="backimage">'
    Text += '<img class="" src="' + systemConfigs.configs.landingPageImageUrl + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  style="width:100%" altSrc="images/intro_page.png"/>'
    Text += '</div>';
    Text += '<div class="container">'
    if (result.status == true && result.response.data !== undefined && result.response.data.length > 0) {
        for (var k = 0; k < result.response.data.length; k++) {
            if (result.response.data[k].paneType == 'content') {
                for (var i = 0; i < result.response.data[k].content.dataRows.length; i++) {
                    for (var j = 0; j < result.response.data[k].content.dataRows[i].elements.length; j++) {
                        var elements = result.response.data[k].content.dataRows[i].elements[j];
                        if (elements.elementType == 'image') {
                            Text += '<img class="" src="' + elements.data + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/introPageIcon.png"/>'
                        }
                        else if (elements.elementType == 'text' && (elements.elementSubtype == '' || elements.elementSubtype == 'subtitle') && elements.data != "OR") {
                            Text += '<h1 class="'
                            if (elements.elementSubtype == '') { Text += 'main-heading ' }
                            else { Text += 'subtitle ' }
                            Text += 'strong row" id="' + elements.elementType + '-' + i + '" source="' + elements.elementType + '"targetpath="' + elements.target + '" >' + elements.data + '</h1>';
                        }
                    }
                }
            }
        }
        presentPagedetails.introPageBtnsLength = 0;
        for (var k = 0; k < result.response.data.length; k++) {
            if (result.response.data[k].paneType == 'content') {
                Text += '<div class="Buttons_IntroPage">'
                for (var i = 0; i < result.response.data[k].content.dataRows.length - 1; i++) {
                    for (var j = 0; j < result.response.data[k].content.dataRows[i].elements.length; j++) {
                        var elements = result.response.data[k].content.dataRows[i].elements[j];
                        if (elements.elementType == 'text' && elements.elementSubtype == '' && elements.elementSubtype != 'subtitle' && elements.data == 'OR') {
                            Text += '<span class="or" id="' + elements.elementType + '-' + i + '" source="' + elements.elementType + '"targetpath="' + elements.target + '" >' + elements.data + '</span>';
                        }
                        if (elements.elementType == 'button') {
                            Text += '<button type="button" ' + 'id="' + elements.elementType + '-' + presentPagedetails.introPageBtnsLength + '" source="button" targetpath="' + elements.target + '" class="unique-page-btn grey-btn'
                            if (presentPagedetails.introPageBtnsLength == 0) { Text += ' imageFocus' }
                            Text += '">' + elements.data + '</button>';
                            ++presentPagedetails.introPageBtnsLength;
                        }
                    }
                }
            }
        }
    } else {
        Text += '<img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png"/>'
        Text += '<h1 class="main-heading strong row">Your OTT, Your way!</h1>'
        Text += '<h3 class="subtitle strong row">Stream your favourite Movies, Live Sports, Shows,<br/> Web Series and more.</h3>'
        Text += '<div class="Buttons_IntroPage">'
        Text += '<button type="button" id="button_0" index="0" source="button" targetpath="signin" class="unique-page-btn grey-btn imageFocus">Sign in with Mobile</button>'
        Text += '<span class="or" id="" source="" targetpath="" > OR </span>';
        Text += '<button type="button" id="button_1" index="1" source="passcodeBtn" targetpath="otp" class="unique-page-btn grey-btn">Sign in with Passcode</button>'
    }
    Text += '</div></div></div>'
    return Text;
}

Util.DeviceDetails = function (result) {
    var Text = '';
    Text += '<div class="settings">'
    Text += "<div id='accountContent'>"
    Text += "<div class='no-sidebar'>"
    Text += "<div class='account-page'>"
    Text += '<div class="container">'
    var deviceName = '';
    if (device.manufacturer == "unknown") {
        deviceName = appConfig.deviceName;
    }
    else {
        deviceName = device.manufacturer + ' (' + device.model + ') ' + device.platform;
    }
    Text += '<div  class="device-details"><table>'
    Text += '<tr> <td>Device Name</td><td>' + deviceName + '</td></tr>'
    Text += '<tr> <td>Device Version</td><td>' + device.version + '</td></tr>'
    Text += '<tr> <td>Box ID</td><td>' + Main.BOXID + '</td></tr>'
    Text += '</table></div>'


    Text += '</div></div></div></div>'
    return Text;
}


Util.stream_pin_popup = function () {
    // from signInHtml
    var Text = '';
    Text += '<div class="stream_pin_popup" id="streampinpopup">'
    Text += '<div  class="stream_pin_form" id="stremPinContent"><div class="container">'
    Text += '<div class="form-group">'
    Text += '<input type="password" id = "searchData" class="form-control input-active"  placeholder="- - - -"/>'
    Text += '</div>'
    Text += '<div class="col6 forPin" id="keyLayout">';
    Text += Util.numberKeys('stream_pin');
    presentPagedetails.formType = 'stream_pin';
    Text += '</div>'
    Text += '<div class="Invalidpin"><p>Invalid PIN</p></div>';
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.nextVideoPlay = function (movieType) {
    var Text = '';
    Text += '<div class="container">'
    Text += '<div class="layer1">'
    Text += '<p class="textContainer">' + movieType + '</p>'
    Text += '</div>'

    Text += '<div class="layer2" id="nextloader">'
    Text += '<p class="textContainer">' + movieType + '</p>'
    Text += '</div>'
    Text += '</div>'

    return Text;
}
Util.watchCredits = function (movieType) {
    var Text = '';
    Text += '<div class="watchCredits_container">'
    Text += '<div class="watchCredits">'
    Text += '<p class="watchCredits_textContainer">Watch Credits</p>'
    Text += '</div>'

    // Text += '<div class="layer2" id="nextloader">'
    // Text += '<p class="textContainer">'+movieType+'</p>'
    //   Text += '</div>'
    // Text += '</div>'

    return Text;
}
Util.menusProfile = function () {
    var currentUserDetails = utilities.getFromLocalStorage('currentUserDetails'); // Don't merge ds line to tv
    if (typeof currentUserDetails == 'string') {
        currentUserDetails = JSON.parse(currentUserDetails)
    }
    var Text = '';
    var profileIconUrl = (currentUserDetails && currentUserDetails.profileImageUrl) ? currentUserDetails.profileImageUrl : 'images/Profile-default.svg';
    Text += '<div class="top_profile menu-item" source="menus"  targetPath ="settings"  id="menu-profile"><div class="menu-item-icon"><img src="' + profileIconUrl + '" /></div>'
    if (switchProfilesOption != false) {
        if (currentUserDetails && currentUserDetails.name != undefined && currentUserDetails.name != null) {
            var phoneNumber = currentUserDetails.name;
            if (phoneNumber.indexOf("91-") === 0) {
                phoneNumber = phoneNumber.substring(3);
                Text += '<div class="menu-item-name"> ' + phoneNumber + ' </div>'
            }
            else {
                Text += '<div class="menu-item-name"> ' + currentUserDetails.name + ' </div>'
            }
            // if (currentUserDetails.name.length > 9) {
            //     currentUserDetails.name = currentUserDetails.name.substr(0, 9);
            //     currentUserDetails.name += '..'
            // }
        }
        else {
            if (userDetails && userDetails.name != undefined && userDetails.name != null) {
                var phoneNumber = userDetails.phoneNumber;
                if (phoneNumber.indexOf("91-") === 0) {
                    phoneNumber = phoneNumber.substring(3);
                }
                Text += '<div class="menu-item-name"> ' + phoneNumber + ' </div>'
            } else {
                var phoneNumber = Main.userProfile.mobile;
                if (phoneNumber.indexOf("91-") === 0) {
                    phoneNumber = phoneNumber.substring(3);
                }
                Text += '<div class="menu-item-name"> ' + phoneNumber + ' </div>'
            }
        }
    } else {
        if (userDetails && userDetails.name != undefined && userDetails.name != null) {
            var phoneNumber = userDetails.phoneNumber;
            if (phoneNumber.indexOf("91-") === 0) {
                phoneNumber = phoneNumber.substring(3);
            }
            Text += '<div class="menu-item-name"> ' + phoneNumber + ' </div>'
        } else {
            var phoneNumber = Main.userProfile.mobile;
            if (phoneNumber.indexOf("91-") === 0) {
                phoneNumber = phoneNumber.substring(3);
            }
            Text += '<div class="menu-item-name"> ' + phoneNumber + ' </div>'
        }
    }
    Text += '</div>'
    // Text += '<hr  class="menu_hr_line"/>'
    return Text;
}
Util.getMenus = function () {
    var menu_id = 0;
    var Text = '';

    Text += '<div class="side-menu">';
    Text += '<div class="overlay"></div>';
    Text += '<div class="menus">';

    // Profile
    Text += '<div id="menu-profile-name">';
    if (isUserSignedOutinThisSession == false) {
        Text += Util.menusProfile();
    } else {
        Text += '<div class="top_profile menu-item" source="menus" targetPath="signIn" id="menu-profile">';
        Text += '<div class="menu-item-icon"><img src="images/Profile-default.svg" /></div>';
        Text += '<div class="menu-item-name">Sign In</div>';
        Text += '</div>';
    }
    Text += '</div>';

    var sideMenus = [];
    var allMenus = utilities.getMenusData();
    for (var i = 0; i < allMenus.length; i++) {
        if (allMenus[i].isActive) {
            sideMenus.push(allMenus[i]);
        }
    }
    sideMenus.sort(function (a, b) { return a.orderIndex - b.orderIndex; });

    sideMenus.forEach(function (menu, i) {
        menu.originalIndex = i; // keep original index for keyHandler
        Text += '<div id="menu-' + i + '" class="menu-item side-menu-item" source="menus" targetPath="' + menu.targetPath + '" menu-code="' + menu.code + '">';
        Text += '<div class="menu-item-icon">';
        Text += '<img src="' + menu.default_icon + '" attr="' + menu.title + '" class="menu_icon_default"/>';
        Text += '<img src="' + menu.selected_icon + '" attr="' + menu.title + '" class="menu_icon_selected"/>';
        if (menu.focused_icon) {
            Text += '<img src="' + menu.focused_icon + '" attr="' + menu.title + '" class="menu_icon_focused"/>';
        }
        Text += '</div>';
        Text += '<div class="menu-item-name">' + menu.displayText + '</div>';
        Text += '</div>';
    });

    Text += '</div>'; // menus
    Text += '</div>'; // side-menu

    return Text;
};

Util.getTopMenuHTML = function (targetpath, id) {
    var Text = '';
    var targetCode = Yup('#' + id).attr('menu-code');

    // If a top menu item is clicked and the top menu container already exists, 
    // simply return the existing HTML so it doesn't get removed.
    if (Yup('#' + id).hasClass('top-menu-item') && Yup('#top-menu-container').length > 0) {
        var existingHTML = Yup('#top-menu-container')[0].outerHTML;
        if (existingHTML) {
            return existingHTML;
        }
    }

    var activeMenu = null;

    if (typeof utilities !== "undefined" && utilities.rawMenuData) {
        for (var i = 0; i < utilities.rawMenuData.length; i++) {
            var menu = utilities.rawMenuData[i];

            if (menu.targetPath === targetpath && menu.subMenus && menu.subMenus.length > 0) {
                activeMenu = menu;
                break;
            }

            // if (menu.subMenus && menu.subMenus.length > 0) {
            //     var isSubMenuActive = false;
            //     for (var j = 0; j < menu.subMenus.length; j++) {
            //         if (menu.subMenus[j].targetPath === targetpath) {
            //             isSubMenuActive = true;
            //             break;
            //         }
            //     }
            //     if (isSubMenuActive) {
            //         activeMenu = menu;
            //         break;
            //     }
            // }
        }
    }

    var topMenus = [];
    if (activeMenu && activeMenu.subMenus && activeMenu.subMenus.length > 0) {
        topMenus = activeMenu.subMenus;
    }

    Text += '<div class="top-menu" id="top-menu-container" style="display: ' + (topMenus.length > 0 ? 'block' : 'none') + ';">';
    Text += '<div class="top-menus-list">';

    topMenus.forEach(function (subMenu, i) {
        Text += '<div id="top-menu-' + i + '" class="top-menu-item" source="topMenus" targetPath="' + subMenu.targetPath + '" menu-code="' + subMenu.code + '">';

        Text += '<div class="top-menu-item-icon">';
        var defaultIcon = subMenu.iconUrl || '';
        if (defaultIcon) {
            Text += '<img src="' + defaultIcon + '" attr="' + (subMenu.displayText || '') + '" class="menu_icon_default"/>';
            Text += '<img src="' + defaultIcon + '" attr="' + (subMenu.displayText || '') + '" class="menu_icon_selected"/>';
            Text += '<img src="' + defaultIcon + '" attr="' + (subMenu.displayText || '') + '" class="menu_icon_focused"/>';
        }
        Text += '</div>';

        Text += '<div class="top-menu-item-name">' + subMenu.displayText + '</div>';
        Text += '</div>';
    });

    Text += '</div>'; // top-menus-list
    Text += '</div>'; // top-menu

    return Text;
};

//profile
// Util.getProfileHTML = function () {
//     var Text = ''; 
//     Text += '<div class="profile-menu">'
//     Text += Util.getLogo();
//     Text += '<div class="profile_content">'
//     Text += '<h2>Who’s Watching ?</h2>'
//     Text +='<div class="profile-box">'
//     Text += '<div class="profile-block" source="profilePage" id="profile">'
//     Text += '<div class="profile_icon">'
//     Text += '<img src="https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/profile-pic1.svg" class="profile_img">'
//     Text += '</div>'
//     Text += '<h3 class="profile-text">Vamshi</h3>'
//     Text += '<img src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-vector-lock-icon-png-image_318067.jpg" class="lock_image">'
//     Text += '</div>'
//     Text +='</div>'
//     Text += '</div>'
//     Text += '<div class="profile-pin-wrapper" id="profile-pin-wrapper"></div>'
//     Text += '</div>'
//     return Text;
// }
Util.getProfileHTML = function (data, comingFromProfileMenus) {
    presentPagedetails.profileDetails = data;
    var Text = '';

    // Extract background images
    var bgImages = [];
    var endPoint = "";
    var bgData = null;
    if (systemConfigs && systemConfigs.configs && systemConfigs.configs.profileBgImages) {
        try {
            if (typeof systemConfigs.configs.profileBgImages === "string") {
                bgData = JSON.parse(systemConfigs.configs.profileBgImages);
            } else {
                bgData = systemConfigs.configs.profileBgImages;
            }
            endPoint = bgData.end_point || "";
            bgImages = bgData.images || [];
        } catch (e) {
            console.log("Error parsing profileBgImages", e);
        }
    }

    Text += '<div class="profile-bg-container" id="profile-bg-container">';
    if (bgImages.length > 0) {
        var isRandom = false;
        if (bgData && (bgData.randomize === true || bgData.randomize === "true")) {
            isRandom = true;
        }
        var startIndex = isRandom ? Math.floor(Math.random() * bgImages.length) : 0;
        for (var j = 0; j < bgImages.length; j++) {
            var activeClass = j === startIndex ? "active" : "";
            Text += '<div class="profile-bg-image ' + activeClass + '" style="background-image: url(' + endPoint + bgImages[j] + ')"></div>';
        }
    }
    Text += '<div class="profile-bg-overlay"></div>';
    Text += '</div>';

    Text += '<div class="profile-menu">'
    // Text += Util.getLogo();
    Text += '<div class="profile_content">'
    if (comingFromProfileMenus == true) {
        // Main.showMenu();
        Text += '<h2 class="profile-title">Switch Profile</h2>'
        presentPagedetails.profileScreenType = "Switch Profile"
    }
    else {
        Main.hideMenu();
        Text += '<h2 class="profile-title">Who’s Watching ?</h2>'
        presentPagedetails.profileScreenType = "who watching"

    }
    Text += '<div class="profile-box">'
    var maxProfileLimit = (systemFeatures &&
        systemFeatures.userprofiles &&
        systemFeatures.userprofiles.fields &&
        systemFeatures.userprofiles.fields.max_profile_limit)
        ? systemFeatures.userprofiles.fields.max_profile_limit
        : data.response.length; // Fallback to data.response.length if undefined
    var customProfileCount = 0;
    for (var i = 0; i < Math.min(data.response.length, maxProfileLimit); i++) {
        Text += '<div class="profile-block" profile-id="' + data.response[i].profileId + '" name="' + data.response[i].name + '" source="profilePage" id="profile-' + i + '" isProfileLockActive="' + data.response[i].isProfileLockActive + '">';
        Text += '<div class="profile_icon">';

        var profileImageUrl = "https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/profile-pic1.svg"; // Default

        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.profileImages) {
            var profileImages;

            if (typeof systemConfigs.configs.profileImages === "string") {
                try {
                    profileImages = JSON.parse(systemConfigs.configs.profileImages);
                } catch (e) {
                    profileImages = {}; // Fallback to empty object if JSON parsing fails
                }
            } else {
                profileImages = systemConfigs.configs.profileImages;
            }

            if (data.response[i].isMasterProfile) {
                profileImageUrl = profileImages["Default"] || profileImageUrl;
            } else if (data.response[i].isChildren) {
                profileImageUrl = profileImages["kids"] || profileImageUrl;
            } else if (data.response[i].isDevotional) {
                profileImageUrl = profileImages["devotional"] || profileImageUrl;
            } else {
                if (data.response[i].profileCode == "custom") {
                    customProfileCount++;
                    if (customProfileCount === 1) {
                        profileImageUrl = profileImages["Default1"] || profileImageUrl;
                    }
                    else if (customProfileCount === 2) {
                        profileImageUrl = profileImages["Default2"] || profileImageUrl;
                    } else {
                        profileImageUrl = profileImages["Default3"] || profileImageUrl;
                    }
                }
            }
        }

        Text += '<img src="' + profileImageUrl + '" class="profile_img" />';

        Text += '</div><div class="profile_details">';

        if (data.response[i].isChildren) {
            Text += '<span class="profile-child">' + data.response[i].name + '</span>';
        }
        if (!data.response[i].isChildren) {
            Text += '<span class="profile-text">' + data.response[i].name + '</span>';
        }

        if (data.response[i].isProfileLockActive) {
            Text += '<img src="' + appConfig.viStaticColudPath + 'profile_lock.png" class="lock_image">';
        }

        Text += '</div></div>';
    }

    Text += '</div>'
    Text += '</div>'
    Text += '<div class="profile-pin-wrapper" id="profile-pin-wrapper"></div>'
    // if (comingFromProfileMenus == true) {
    Text += '<p class="profile-note">Note: You can add or manage new profiles using the mobile app and web</p>'
    // }

    // Logo at bottom right
    Text += '<div class="profile-logo-bottom-right">';
    Text += '<img src="' + appConfig.viStaticColudPath + 'TV_brand_logo.png" />';
    Text += '</div>';
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    Text += '</div>'

    return Text;
}

Util.profileBgInterval = null;
Util.startProfileBgRotation = function () {
    if (Util.profileBgInterval) {
        clearInterval(Util.profileBgInterval);
    }
    var bgImageDuration = 10000; // 10 seconds variable
    Util.profileBgInterval = setInterval(function () {
        var images = document.querySelectorAll(".profile-bg-image");
        if (images.length <= 1) {
            clearInterval(Util.profileBgInterval);
            return;
        }
        var activeIndex = -1;
        for (var i = 0; i < images.length; i++) {
            if (images[i].classList.contains("active")) {
                activeIndex = i;
                break;
            }
        }
        if (activeIndex >= 0) {
            images[activeIndex].classList.remove("active");
        }
        var nextIndex = (activeIndex + 1) % images.length;
        images[nextIndex].classList.add("active");
    }, bgImageDuration);
};


// Util.getFilters = function () {
//     var Text = '';
//     Text += '<div class="filter_container">';
//     Text += '<h1>Select Content Partner Filters</h1>';
//     Text += '<h2>You can easily filter content list using various categories.</h2>';
//     Text += '<div class="image_container">';
//     Text += '<div class="row_container">';

//     for (var i = 0; i < systemConfigs.networks.length; i++) {

//         if (i > 0 && i % 4 === 0) {
//             Text += '</div>';
//             Text += '<div class="row_container">';
//         }
//         if(Main.userProfile.filters){
//             var splitData = Main.userProfile.filters.split(',');
//             var isFound =false;
//             for(var j=0;j<splitData.length;j++){
//                 if(splitData[j] ==systemConfigs.networks[i].code){
//                  isFound = true;
//                  break;
//                 }
//             }
//             if(isFound == true){
//                 Text += '<div class="image_box selected" isSelected="true" value="' + systemConfigs.networks[i].code + '" id="filter-0-' + i + '" source ="filters">';
//             }else{
//                 Text += '<div class="image_box" isSelected="false" value="' + systemConfigs.networks[i].code + '" id="filter-0-' + i + '" source ="filters">';
//             }
//          }else{
//             Text += '<div class="image_box selected" isSelected="true" value="' + systemConfigs.networks[i].code + '" id="filter-0-' + i + '" source ="filters">';
//         }

//         Text += '<div class="image_sub_box">';
//         Text += '<div class="image_inside_box">';
//         Text += '<img src="' + Util.getImages(systemConfigs.networks[i].iconUrl) + '">';
//         Text += '<span class="checkmark"></span>'
//         Text += '</div>';
//         Text += '<h3>' + systemConfigs.networks[i].name + '</h3>';

//         Text += '</div>';
//         Text += '</div>';
//     }

//     Text += '</div>';
//     Text += '</div>';
//     Text += '</div>';
//     Text += '</div>';
//     Text += '<div class="apply_container"><div class="button_container"><button class="button buttonFocus" source = "apply" id="filter_apply">Apply</button><button class="button" source = "apply" id="filter_select">Select All</button><button class="button" source = "apply" id="filter_clear">Clear All</button></div></div>';

//     return Text;
// }                    

//Banners
Util.getBanners = function (data) {
    var Text = '';
    Text += '<div class="banners">';

    for (var i = 0; i < data.length; i++) {
        Text += '<div id="top_bannerimg-' + i + '" class="bannerimg ' + ((data.length == 1) ? 'singleBanner' : '') + '">';
        Text += '<img source="banners" ' + data[i].title + '" targetPath="' + data[i].target.path + '" code="' + data[i].code + '" movieID="' + data[i].id + '" index="' + i + '" count="' + data.length + '" id="bannerImage-' + i + '" class="banner-image" data-u="image" style="display: ' + (i === 0 ? 'block' : 'none') + ';" src="' + Util.getImages(data[i].imageUrl) + '" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/empty_state_sheet.png" />';
        // Text += '<video   autoplay="autoplay" mute="false" crossorigin="anonymous" data-src="" id="bannerImage-' + i + '" src="" type="video/mp4" >'


        // Check if networkIcon is defined
        if (data[i].networkIcon != undefined && data[i].networkIcon != "") {
            Text += '<div class="partner_logo" id="partner-logo-' + i + '" style="display: ' + (i === 0 ? 'block' : 'none') + ';"><img class="partner_logo_inner" src="' + Util.getImages(data[i].networkIcon) + '"  onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
        }

        Text += '</div>';
    }



    Text += '<div class="banner-btns">'
    for (var i = 0; i < data.length; i++) {
        Text += '<span class="banner-btn" source="bannerBtn" id="bannerBtn-' + [i] + '"></span>'
    }
    Text += '</div>';
    Text += '<div class="banner_actions">';
    for (var i = 0; i < data.length; i++) {
        Text += '<div class="banner-details" id="bannerDetails-' + i + '" style="display:none;">';
        Text += '<div class="play_btn" id="WatchBannerBtn-' + i + '" source="bannerBtn">'
        Text += '<button class="Banner_playbtn"> ' + data[i].buttonText + '</button>';
        Text += '</div>'
        // Text += '<h1 class="banner_title" id="bannerTitle-' + [i] + '">' + (data[i].title || '') + '</h1>';
        // Text += '<h6 class="banner_Descr" id="bannerDescr-' + [i] + '">' + (data[i].subtitle || '') + '</h6>';
        Text += '</div>';
    }
    Text += '</div>';
    Text += '</div>';
    Text += '</div>';

    return Text;
}



//offers & plans
Util.offers = function (result) {
    var Text = '';
    Text += '<div class="offers_modal">';
    Text += '  <div class="offers_container">';
    Text += '      <div class="offers_header">' + result.plansPageInfo.title + '</div>';
    var subtitle = result.plansPageInfo.subTitle;

    // Replace #...# with a span of yellow color
    subtitle = subtitle.replace(/#(.*?)#/g, '<span style="color: yellow;">$1</span>');

    Text += '      <div class="offers_subheader">' + subtitle + '</div>';
    // Left Column: Title, SubTitle, Logos, Watch Text
    Text += '    <div class="offers_whole">';
    Text += '    <div class="offers_left">';
    Text += '      <div class="logo_grid">';

    var icons = result.plansPageInfo.inclusions.split(';');
    icons = icons.filter(function (icon) {
        return icon.trim() !== '';
    });

    var count = 0;

    for (var i = 0; i < icons.length; i++) {
        var icon = icons[i].trim();

        if (count % 3 === 0) {
            Text += '<div class="logo_row">';
        }

        // Show full 9 if total <= 9
        if (icons.length <= 9) {
            Text += '<div class="logo_card">';
            Text += '<img src="' + icon + '" alt:"img">';
            Text += '</div>';
            count++;
        }

        // Show only 8 logos + 1 & More if total > 9
        else {
            if (count < 8) {
                Text += '<div class="logo_card">';
                Text += '<img src="' + icon + '" alt:"img">';
                Text += '</div>';
                count++;
            } else if (count === 8) {
                Text += '<div class="logo_card logo_more_card"><span>& More</span></div>';
                count++;
            }
        }

        if (count % 3 === 0 || i === icons.length - 1 || count === 9) {
            Text += '</div>'; // close row
        }

        if (count === 9) break;
    }

    Text += '      </div>'; // close logo_grid

    Text += '    <div class="icons_bottom_text">';
    Text += '    <div class="icons_bottom_text_inner">';
    Text += '<img src="' + result.plansPageInfo.deviceAllowedImage + '"  onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="">';
    Text += '    </div>';
    Text += '      <p class="watch_text">' + result.plansPageInfo.deviceAllowedText + '</p>';
    Text += '    </div>';
    Text += '    </div>';

    // Right Column: QR Code & Caption
    Text += '    <div class="offers_right">';
    Text += '    <div class="offers_right_inside">';
    Text += '      <div id="offersPlansQr" class="qr_box"></div>';
    Text += '      <div class="qr_caption">' + result.plansPageInfoQrCode.subtitle + '</div>';
    Text += '    </div>';
    Text += '    </div>';
    Text += '    </div>';
    // Close Button
    Text += '    <div class="offers_bottom">';
    Text += '    <button class="offers_close" id="offers_close">CLOSE</button>';
    Text += '  </div>';
    Text += '  </div>';
    Text += '</div>';

    return Text;
}
// Util.offers = function (result) {
//     var Text = '';
//     Text += '<div class="offers_modal">';
//     Text += '  <div class="offers_container">';
//     Text += '      <div class="offers_header">' + result.plansPageInfo.title + '</div>';

//     var subtitle = result.plansPageInfo.subTitle;
//     subtitle = subtitle.replace(/#(.*?)#/g, '<span style="color: yellow;">$1</span>');
//     Text += '      <div class="offers_subheader">' + subtitle + '</div>';

//     // Left Column: Title, SubTitle, Logos, Watch Text
//     Text += '    <div class="offers_whole">';
//     Text += '    <div class="offers_left">';
//     Text += '      <div class="logo_grid">';

//     var icons = result.plansPageInfo.inclusions.split(';');
//     var logoLimit = 8;
//     var count = 0;

//     for (var i = 0; i < icons.length; i++) {
//         var icon = icons[i].trim();
//         if (!icon) continue;

//         if (count % 3 === 0) {
//             Text += '<div class="logo_row">';
//         }

//         if (count < logoLimit) {
//             Text += '<img src="' + icon + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/logo_test.png">';
//         }

//         count++;

//         if (count % 3 === 0 || count === logoLimit) {
//             if (count === logoLimit && i + 1 < icons.length) {
//                 Text += '<div class="logo_more">& More</div>';
//             }
//             Text += '</div>'; // close .logo_row
//         }

//         if (count === logoLimit) break;
//     }

//     Text += '      </div>'; // close .logo_grid

//     // Bottom icons text
//     Text += '    <div class="icons_bottom_text">';
//     Text += '    <div class="icons_bottom_text_inner">';
//     Text += '<img src="' + result.plansPageInfo.deviceAllowedImage + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="">';
//     Text += '    </div>';
//     Text += '      <p class="watch_text">' + result.plansPageInfo.deviceAllowedText + '</p>';
//     Text += '    </div>';
//     Text += '    </div>';

//     // Right Column: QR Code & Caption
//     Text += '    <div class="offers_right">';
//     Text += '    <div class="offers_right_inside">';
//     Text += '      <div id="offersPlansQr" class="qr_box"></div>';
//     Text += '      <div class="qr_caption">' + result.plansPageInfoQrCode.subtitle + '</div>';
//     Text += '    </div>';
//     Text += '    </div>';
//     Text += '    </div>';

//     // Close Button
//     Text += '    <div class="offers_bottom">';
//     Text += '    <button class="offers_close" id="offers_close">CLOSE</button>';
//     Text += '  </div>';
//     Text += '  </div>';
//     Text += '</div>';

//     return Text;
// };





// favourite page 
Util.favorite = function () {
    var Text = '';
    Text += '<div class="my_favorite_page">'
    Text += '<div class="favorite_heading">'
    Text += '<h2>My Bingelist</h2>'
    Text += '</div></div>'
    var userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
        view = 'signin'
        Main.processNext();
    }
    return Text;
}

Util.GlobalvideoQuality = function () {
    var qualityOptionsss = JSON.parse(systemConfigs.configs.videoQualitySettings);

    var Text = '';
    Text += '<div class="video_quality_Settpage">';
    Text += '<div class="video_quality_pageinner">';
    Text += '<h2>Select Default Video Quality</h2>';
    Text += '<ul>';
    var storedQualitySelectedName = localStorage.getItem("QualitySelectedName");

    for (var i = 0; i < qualityOptionsss.length; i++) {
        Text += '<li class = "videoqualitySel" source="videoqualitySel" id="radiobtn-' + i + '" data-maxBitRate="' + qualityOptionsss[i].maxBitRate + '"';

        if (qualityOptionsss[i].minBitRate !== undefined) {
            Text += ' data-minBitRate="' + qualityOptionsss[i].minBitRate + '"';
        }
        if (storedQualitySelectedName == qualityOptionsss[i].displayTitle) {
            Text += '><label class="label_btn selected ">';
        }
        else if (i === 0 && !storedQualitySelectedName) {
            Text += '><label class="label_btn selected ">';
        } else {
            Text += '><label class="label_btn">';
        }

        Text += qualityOptionsss[i].displayTitle + '<input type="radio" name="video_quality" id="radio"';
        Text += '>';


        Text += '<span class="radio_btn"></span>';

        Text += '</label></li>';
    }

    Text += '</ul>';
    Text += '</div></div>';
    return Text;
}




Util.getActivePackages = function () {
    var Text = '';
    if (!!presentPagedetails.settingsActivepackages && presentPagedetails.settingsActivepackages.length > 0) {
        Text += '<div>'
        Text += '<table class="plan_details">'
        Text += '<tr>'
        for (var i = 0; i < presentPagedetails.settingsActivepackages.length; i++) {
            Text += '<td>Active Plan</td>'
            Text += '<div class="form-group" count=' + presentPagedetails.settingsActivepackages.length + ' packName = ' + presentPagedetails.settingsActivepackages[i].name + ' subSource = "selectCurretnPack" index=' + i + ' id="accountContent-0-' + i + '" packid = ' + presentPagedetails.settingsActivepackages[i].id + ' packGateWay = ' + presentPagedetails.settingsActivepackages[i].gateway + ' source="accountContent" type="activePkgs">'
            Text += '<td class="right_row">' + presentPagedetails.settingsActivepackages[i].name + '</td> </tr>'
            Text += '<tr>'
            Text += '<td>Expiry Date </td>'
            Text += '<td class="right_row">'
            // Text += '<span>' + presentPagedetails.settingsActivepackages[i].packageAmount +' / ' +presentPagedetails.settingsActivepackages[i].packageType + ' </span>'
            Text += '<span>' + presentPagedetails.settingsActivepackages[i].message + '</span>'
            Text += '</td></tr>'
            Text += '<tr>'
            Text += '<td  colspan="2">'
            Text += '<hr class="divider">'
            Text += '</td>'
            Text += '</tr>'

        }
        Text += '</table>'
        Text += '</div>'
    }
    else {
        Text += '<table class="plan_details">'
        Text += '<tr >'
        Text += '<td>Plans Details</td>'
        Text += '<td class="right_row">No Active Plans</td>'
        Text += '</tr>'
        Text += '</table>'
    }
    return Text;
}

// upgradePopup
Util.upgradePopup = function () {
    var Text = '';
    Text += '<div class="upgrade_popup">'
    Text += '<div class="upgrade_popup_inner">'
    Text += '<h1>Watch with Super Plus plan </h1>'
    Text += '<h3>Watch with <span class="super">Super</span> Plan & Get access to 15 OTT s at just <span class="price"> &#8377;349 </span> / month</h3>'
    Text += '<div class="upgrade_box">'
    Text += '<div class="upgrade_left"></div>'
    Text += '<div class="upgrade_right">'
    Text += '<div class="upgrade_right_inner">'
    Text += '<div class="upgrade_rq">'
    Text += '<img src="images/qr.png"/>'
    Text += '</div>'
    Text += '<p>Scan the QR code,select the plan of your choice and complete the payment</p>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '<div class="close_btn"><button type="button">Close</button></div>'
    Text += '</div></div>'
    return Text;
}
//card preview cards html
Util.getOverlaySection = function (data, id) {
    var Text = '';
    var splIds = id.split('-');
    Text += '<div id="overlaySectionItem-' + splIds[1] + '-' + splIds[2] + '"  style="display:none">';

    Text += '<div class="sectionBanner_overlay">';
    Text += '</div>';

    if (data && data.cardType == "show_card") {
        Text += '<div class="banner_preview full_preview" id="banner_preview-' + splIds[1] + '-' + splIds[2] + '">';
    }
    else {
        Text += '<div class="banner_preview" id="banner_preview-' + splIds[1] + '-' + splIds[2] + '">';
    }
    var bgImageUrl = '';
    if (data && data.cardType == "show_card") {
        bgImageUrl = presentPagedetails.sections && presentPagedetails.sections[splIds[1]] && presentPagedetails.sections[splIds[1]].sectionInfo && presentPagedetails.sections[splIds[1]].sectionInfo.bannerImage ? presentPagedetails.sections[splIds[1]].sectionInfo.bannerImage : '';
    }
    else {
        for (var i = 0; i < data.hover.elements.length; i++) {
            if (data.hover.elements[i].key === 'bgImage') {
                bgImageUrl = data.hover.elements[i].value;
                break;
            }
        }
    }
    if (bgImageUrl) {
        Text += '<img src="' + Util.getImages(bgImageUrl) + '"  onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/empty_state_sheet.png"/>'
    } else {
        Text += '<img src="images/empty_state_sheet.png"/>';
    }

    Text += '</div>';
    if (data && data.cardType != "show_card") {
        Text += Util.getOverlaymetaData(data);
    }

    Text += '</div>';

    if (presentPagedetails.overlayData == undefined) {
        presentPagedetails.overlayData = '';
    }

    presentPagedetails.overlayData += Text;

    return Text;
};

//card preview meta
Util.getOverlaymetaData = function (data) {
    var Text = ''
    Text += '<div class ="overlayBanner_info">'
    if (presentPagedetails.view != "content") {
        if (!!data.display.partnerIcon) {
            Text += '<img src="' + Util.getImages(data.display.partnerIcon) + '" style="width:70px; height:70px;"/>'
        }
    }
    Text += Util.getOverlaySectionTitle(data);
    Text += Util.getOverlaymetaDatasubtitles(data);
    Text += '</div>'
    return Text;
}

Util.getOverlaySectionTitle = function (data) {
    var Text = ''
    if (data.display.title) {
        Text += '<h1 class="title">' + data.display.title + '</h1>';
    }
    return Text;

}

Util.getOverlaymetaDatasubtitles = function (data) {
    var Text = '';
    Text += '<div class = "subTitles">'
    var inputString = data.target.path;
    var parts = inputString.split("/"); // Split the string by "/"
    var movie = parts[0];

    if (movie == 'movie' || movie == "vod") {
        // Text += '<p>' + data.display.subtitle1 + '</p>';
        // Text += '<p >' + data.display.subtitle2 + '</p>';

    }
    else if (movie == 'live') {
        // Text += '<p >' + data.display.subtitle5 + '</p>';
    }
    if (data.hover.elements != undefined) {

        for (var i = 0; i < data.hover.elements.length; i++) {
            if (data.hover.elements[i].key === "subtitle1" || data.hover.elements[i].key === "subtitle") {
                Text += '<p class="sub_title">' + data.hover.elements[i].value + '</p>';
            }
        }
        for (var i = 0; i < data.hover.elements.length; i++) {
            if (data.hover.elements[i].key === "description") {
                if (data.hover.elements[i].value.length > 160) {
                    // var description_text = elements.data;
                    presentPagedetails.description = data.hover.elements[i].value;
                    data.hover.elements[i].value = data.hover.elements[i].value.substr(0, 160);
                    data.hover.elements[i].value += '....';
                }
                Text += '<p class="description">' + data.hover.elements[i].value + '</p>';
                break;
            }
        }
    }
    Text += '</div>'
    return Text;

}
//view-all card preview
Util.getViewallOverlay = function (vindex, hindex) {
    var Text = '';
    //    var splIds = id.split('-');
    Text += '<div id="overlaySectionItem-' + vindex + '-' + hindex + '" style="display:none" class="view-all-overlay">'
    Text += '<div class="sectionBanner_overlay">'
    Text += '</div>'
    Text += '<div class="banner_preview">'
    Text += '<img src=' + systemConfigs.configs.viewallBgimageUrl + ' alt="" height="100%" width="100%"/>'
    Text += '</div>'
    Text += '<div class ="overlayBanner_info">'
    Text += '<h1 class="title">' + systemConfigs.configs.viewAllText + '</h1>';
    Text += '</div>'
    Text += '</div>'
    presentPagedetails.overlayData += Text;
}


Util.getDetailsPageContent = function (tvshowContent, targetpath) {
    var isCast = '';
    if (presentPagedetails.castCrewSection) (isCast = 'isCast');
    var Text = '';
    Text += Util.getLogo();
    Text += '<div class="detailsContainer ' + isCast + '" id="details_Container"><img class="main" src="' + Util.getImages(tvshowContent.backgroundImage) + '" /><span class="overlay"></span>';
    Text += '<div class="detainlsInfo">';
    Text += '<div class="detainlsInfoInner">'
    var partnerIconData = '';
    if (tvshowContent.dataRows) {
        for (var i = 0; i < tvshowContent.dataRows.length; i++) {
            var elements = tvshowContent.dataRows[i].elements;
            for (var j = 0; j < elements.length; j++) {
                var element = elements[j];
                if (element.elementSubtype === 'partnerIcon') {
                    partnerIconData = element.data;
                    break;
                }
            }
            if (partnerIconData !== '') {
                break;
            }
        }
    }
    if (!!partnerIconData) {
        Text += '<img class="partner_logo_inner" src="' + Util.getImages(partnerIconData) + '"/>'
    }
    Text += '<h1>' + tvshowContent.title + '</h1>';
    Text += Util.AddingDetailsPageContent(tvshowContent);
    Text += '</div>'
    var favButtonAdded = false; watchLive = false;
    for (var i = 0; i < tvshowContent.dataRows.length; i++) {
        if (tvshowContent.dataRows[i].rowDataType == 'button') {
            Text += '<ul class="markers">';

            for (var j = 0; j < tvshowContent.dataRows[i].elements.length; j++) {
                var currentElement = tvshowContent.dataRows[i].elements[j];

                if (currentElement.elementType == "button") {

                    if (currentElement.elementSubtype == "watch_latest_episode" || currentElement.elementSubtype == "watchnow" || currentElement.data == "Watch Now" || currentElement.data == "Watch Live") {
                        if (currentElement.properties != undefined) {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '" template="' + (currentElement.properties.template ? currentElement.properties.template : '') + '" elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '" targetpath="' + currentElement.target + '"><img class= "fav_icon" src="images/Subscribe to watch CTA.png"/>' + currentElement.data + '</li>';

                        }
                        else {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '" targetpath="' + currentElement.target + '"><img class= "fav_icon" src="images/Subscribe to watch CTA.png"/>' + currentElement.data + '</li>';
                        }
                    }
                    else if (currentElement.elementSubtype == "signin") {
                        Text += '<li class="detailsContent ' + currentElement.elementType + '" elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '" targetpath="' + currentElement.target + '">' + currentElement.data + '</li>';
                    } else if (currentElement.elementSubtype == 'resume') {
                        if (currentElement.properties != undefined && currentElement.properties.template) {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template="' + (currentElement.properties.template ? currentElement.properties.template : '') + '" source="' + currentElement.elementType + '"targetpath="' + currentElement.target + '" ><img class= "resume" src="images/Subscribe to watch CTA.png"/>' + currentElement.data;
                            Text += '</li>';
                        }
                        else {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '"targetpath="' + currentElement.target + '" ><img class= "resume" src="images/Subscribe to watch CTA.png"/>' + currentElement.data;
                            Text += '</li>';
                        }
                        // Text += '<div class="progress details_page">'
                        // if(presentPagedetails.attributes.watchedPosition*100 < 100){
                        // Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + parseInt(presentPagedetails.attributes.watchedPosition*100) + '%">'
                        // }
                        // else{
                        //     Text += '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="4" aria-valuemin="0" aria-valuemax="70" style="width:' + parseInt(presentPagedetails.attributes.watchedPosition) + '%">'

                        // }
                        // Text += '</div></div>'

                    } else if (currentElement.elementSubtype == 'startover') {
                        if (currentElement.properties != undefined && currentElement.properties.template) {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template="' + (currentElement.properties.template ? currentElement.properties.template : '') + '" source="' + currentElement.elementType + '"targetpath="' + currentElement.target + '" ><img class= "start_over" src="images/play_from_beginning_Default.png"/>' + currentElement.data;
                            Text += '</li>';
                        }
                        else {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '"targetpath="' + currentElement.target + '" ><img class= "start_over" src="images/play_from_beginning_Default.png"/>' + currentElement.data;
                            Text += '</li>';
                        }
                    } else if (currentElement.elementSubtype == 'browseEpisodes') {
                        Text += '<li class="detailsContent ' + currentElement.elementType + '" elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '" targetpath="' + currentElement.target + '"><img class= "fav_icon" src="images/Browse Episodes.png"/>' + currentElement.data + '</li>';
                    } else if (currentElement.elementSubtype.toLowerCase() == 'favourite') {
                        if (currentElement.properties.isFavourite == "true") {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '  fav"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '"targetpath="' + targetpath + '" ><img class= "fav_icon" src="images/Added to Bingelist.png"/> ' + currentElement.data;
                            Text += '</li>';
                            presentPagedetails.pageButtons.isFavourite = true
                        }
                        else {
                            Text += '<li class="detailsContent ' + currentElement.elementType + '  fav"  elementSubtype="' + currentElement.elementSubtype + '" id="' + currentElement.elementType + '-' + j + '" template source="' + currentElement.elementType + '"targetpath="' + targetpath + '" ><img class= "fav_icon" src="images/Add to Bingelist CTA.png"/> ' + currentElement.data;
                            Text += '</li>';
                            presentPagedetails.pageButtons.isFavourite = false
                        }
                    }
                }
            }

            Text += '</ul>';
            presentPagedetails.avilablePagebuttonsLength = tvshowContent.dataRows[i].elements.length;

            if (presentPagedetails.isComingTvguide == true) {
                watchLive = true;
                Text += '<li class="detailsContent button" id="watchLive" source="watchLive" targetpath=""> Watch Live</li>';
            }

            Text += '</ul>';
        }
    }
    Text += '</div>';
    Text += '</div>';
    Text += '<div class="detailsPage_bottom_gradient"></div>';
    return Text;
}




Util.getDetailsPageGenre = function () {
    var Text = "";
    // Text += '<p class="lang_time">' + presentPagedetails.attributes.genre + ' | ' + presentPagedetails.attributes.mediaContentType + ' | ' + presentPagedetails.attributes.networkName +'Mins</p>'
    Text += '<p class="lang_time">' + presentPagedetails.pageContent[0].dataRows[1].elements[0].data + '</p>'

    return Text;
}

Util.upGradePlan = function (result) {
    if (typeof result == 'string') {
        presentPagedetails.data = JSON.parse(result);
    }
    else {
        presentPagedetails.data = result;
    }
    var Text = "";
    Text += '<div class="signinprocess">'
    Text += '<div class="signinprocess_inner">'
    Text += '<h1>' + presentPagedetails.data.browser.title + '</h1>'
    Text += '<hr class="divider">'
    Text += '<div class="signinprocess_down">'
    Text += '<div class="signinprocess_left">'
    Text += '<ul class="signinprocess_info">'
    if (!!result) {
        for (var i = 0; i < presentPagedetails.data.browser.subTitle.length; i++) {
            var subtitle = presentPagedetails.data.browser.subTitle[i];
            subtitle = subtitle.replace(/%n(https?:\/\/\S+)%n/g, '<span class="link">$1</span>');
            Text += '<li class="info_list">' + subtitle + '</li>'
        }
    }
    Text += '</ul>'
    // Text +='<div class="vertical-divider"></div>'
    Text += '</div>'
    // Text +='<div class="signinprocess_right">'
    // Text +='<div id="upgrade_qrcode" class="signinprocess_qr" title="http://www.vodafone.com/device?auth_code=ILNH"></div>'
    // Text +='<ul class="signinprocess_info">'
    // if (!!result) {
    //     for (var i = 0; i < presentPagedetails.data.qrCode.subTitle.length; i++) {
    // Text +='<li class="info_list">' + presentPagedetails.data.qrCode.subTitle[i] + '</li>'
    //     }
    // }
    // Text +='</ul>'
    // Text +='</div>'
    Text += '</div>'
    Text += '<hr class="divider">'
    Text += '</div></div>'
    return Text;
}

// Util.passcodeView=function(result){
//     presentPagedetails.data = result;
//     var Text ="";
//     Text +='<div class="passcode_page">'
//     Text += '<div class="headerLogo"> <img src="images/logo_test.png" class="img-responsive" onerror="this.src = Yup(this).attr(\'altSrc\')"  altSrc="images/logo_test.png"/></div>'
//     Text +='<div class="passcode_inner">'
//     Text +='<div class="passcode_left">'
//     Text +='<img src="' + presentPagedetails.data.browser.imageUrl + '">'
//     Text +='<h4>' + presentPagedetails.data.browser.title + '</h4>'
//     Text +='<ul class="signinprocess_info">'
//     if (!!result) {
//         for (var i = 0; i < presentPagedetails.data.browser.subTitle.length; i++) {
//     Text +='<li class="info_list">' + presentPagedetails.data.browser.subTitle[i] + '</li>'
//         }
//     }
//     Text +='</ul>'
//     Text += '<div class="left_bottom"><span id="Passcodenum" class="code" source="passcodeBtnView">' + presentPagedetails.passcode + '</span> '
//     Text +='<div class="code_button"><a id="signUpBtn1" class="btn-default grey-btn passcode-retry" source="passcodeBtn"> Get New Code </a></div>'
//     Text +='<p class="code_msg">Once done this screen will automatically update</p>'
//     Text +='<span class="line"></span>'
//     Text +='</div>'
//     Text +='</div>'
//     Text +='<div class="passcode_right">'
//     Text +='<div id="qrcode" class="passcode_rq" title="http://www.vodafone.com/device?auth_code=ILNH"></div>'
//     Text +='<h4>Scan QR code</h4>'
//     Text +='<ul class="signinprocess_info">'
//     if (!!result) {
//         for (var i = 0; i < presentPagedetails.data.qrCode.subTitle.length; i++) {
//             Text += '<li class="info_list">' + presentPagedetails.data.qrCode.subTitle[i] + '</li>'
//         }
//     }
//     Text +='</ul>'
//     Text +='</div>'
//     Text +='</div>'
//     Text +='</div>'
//     return Text;
// }

Util.subscriptionUserPopup = function (targetJson) {
    var subscriptionData = JSON.parse(targetJson)
    var Text = '';
    Text += '<div class="transBlock subscribe" id="templetoverlay_Bingelist" source="transBlock">'
    Text += Util.getLogo();
    Text += '<div class="templetoverlay" id="templetoverlay">'
    Text += '<h1 class="subscribe">Subscription Required</h1>'
    Text += '<p>Subscribe now to watch this 1500+ moives and shows.</p>'
    Text += '<p>Check out Vi movies & TV mobile app to explore more about subscription plans.</p>'
    Text += '<button type="button" class="btn primary">Got it</button>'
    // Text += '<ul class="markers">'
    //     if(presentPagedetails.templateData.tembutns[0] && presentPagedetails.templateData.tembutns[0].displayCondition=='true'){
    //     Text += '<li class="detailsContent button fav btnFocus" btnType ='+presentPagedetails.templateData.tembutns[0].name+' id="favorites-0" source="tempBtns" targetpath="'+presentPagedetails.templateData.title.movieTaretPath+'" >'+ presentPagedetails.templateData.tembutns[0].data+'</li>';
    // }
    // if(presentPagedetails.templateData.tembutns[1].displayCondition == 'true'){
    //     Text += '<li class="detailsContent button fav" id="favorites-1" btnType ='+presentPagedetails.templateData.tembutns[1].name+' source="tempBtns" targetpath="'+presentPagedetails.templateData.title.movieTaretPath+'"" >'+ presentPagedetails.templateData.tembutns[1].data+'</li>';
    // }
    // Text += '</ul>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.activeScreenPopup = function () {
    if (Main.popupData) {
        var Text = '';
        Text += '<div class="activepopupDiv">'
        Text += '<div class="active-overlay-screen ' + Main.popupData.popuptype + '">'
        Text += '<div class="activepopup-Title">'
        if (!!Main.popupData.headerTitle) {
            Text += '<h4 class="activepopup-Header">' + Main.popupData.headerTitle + '</h4>'
        }
        if (!!Main.popupData.message) {
            Text += '<h4 class="activepopup-subhead">' + Main.popupData.message + '</h4>'
        }
        Text += '</div>'
        Text += '<div class="activepopup-btn-wrap ">'
        if (Main.popupData.buttonCount == 1) {
            Text += '<button id="popup-btn-1" class="activebtn-default popup-button" btnType="yes" source="popupbtn"> ' + Main.popupData.yesText + ' </button>'
        }
        else {
            Text += '<button id="popup-btn-1" class="activebtn-default popup-button mr70" btnType="yes" btnTarget=' + Main.popupData.yesTarget + ' source="popupbtn"> ' + Main.popupData.yesText + ' </button>'
            Text += '<button id="popup-btn-2" class="activebtn-default popup-button " btnType="no" btnTarget=' + Main.popupData.noTarget + ' source="popupbtn"> ' + Main.popupData.noText + ' </button>'
        }
        Text += '</div>'
        Text += '</div>'
        Text += '</div>'

        return Text;
    }
}
Util.FaqDetails = function () {
    var Text = '';
    Text += '<div class="faq_page">'
    Text += '<div class="faq_page_inner">'
    Text += '<h3 class="faq_heading">Terms of Use</h3>'
    Text += '<div class="forLine"></div>'
    Text += '<p class="faq_para"> Scan the QR code for Terms and Conditions </p>'
    // Text += '<a href="" class="faq_link">'+ systemConfigs.configs.faqPageUrl +'</a>'
    Text += '<div id="faqQrcode"></div>'
    Text += '<div class="version_control">'
    Text += '<span>' + appConfig.staticVersion + '</span>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'

    return Text;
}
Util.addToPlansPostpaid = function (data) {
    var plansData = null;
    var plansDataV3 = null;
    var isDxlJuspayGlobal = false;

    if (data && data.packages) {
        var validPackages = [];
        for (var p = 0; p < data.packages.length; p++) {
            if (data.packages[p] && data.packages[p].packageInfo && data.packages[p].packageInfo.packages && data.packages[p].packageInfo.packages[0] && data.packages[p].packageInfo.packages[0].isSubscribed != true) {
                validPackages.push(data.packages[p]);
            }
        }
        data.packages = validPackages;
        if (typeof presentPagedetails !== "undefined" && presentPagedetails.response) {
            presentPagedetails.response.packages = validPackages;
        }
        if (typeof presentPagedetails !== "undefined" && presentPagedetails.postpaid) {
            presentPagedetails.postpaid.packages = validPackages;
        }
    }

    // Check if there is any dxl_juspay in the packages
    if (data && data.packages) {
        for (var i = 0; i < data.packages.length; i++) {
            if (data.packages[i] && data.packages[i].supportedGateway && data.packages[i].supportedGateway[0] && data.packages[i].supportedGateway[0].code == "dxl_juspay") {
                isDxlJuspayGlobal = true;
                break;
            }
        }
    }

    try {
        var rawDataV3 = systemConfigs.configs.tvappPlansPageV3;
        if (typeof rawDataV3 === "string") {
            plansDataV3 = JSON.parse(rawDataV3);
        } else if (typeof rawDataV3 === "object" && rawDataV3 !== null) {
            plansDataV3 = rawDataV3;
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPageV3:", e);
    }

    if (plansDataV3) {
        if (isDxlJuspayGlobal) {
            plansData = plansDataV3.dxl_juspay;
        } else {
            plansData = plansDataV3.sdpse;
        }
    } else {
        // Fallback to old tvappPlansPage config if V3 is not configured
        try {
            var rawData = systemConfigs.configs.tvappPlansPage;
            if (typeof rawData === "string") {
                plansData = JSON.parse(rawData);
            } else if (typeof rawData === "object" && rawData !== null) {
                plansData = rawData;
            } else {
                plansData = {};
            }
        } catch (e) {
            console.error("Error while parsing tvappPlansPage:", e);
            plansData = {};
        }
    }

    var Text = '';

    if (!!plansData) {
        Text += '<div class="packages_page">';
        Text += '<div class="packages_page_inner">';
        Text += '<div class="packages_head">';

        var title = "";
        if (plansDataV3 && plansDataV3.title) {
            title = plansDataV3.title;
        } else if (plansData && plansData.title) {
            title = plansData.title;
        }
        if (!!title) {
            Text += '<h3 class="packages_heading">' + title + '</h3>';
        }

        if (!!plansData.description) {
            Text += '<p class="main">' + plansData.description + '</p>';
        }

        Text += '</div>'; // packages_head
        Text += '<div class="package_row">';

        for (var i = 0; i < data.packages.length; i++) {
            Text += '<div class="package_item" id="package_item-' + i + '">';
            Text += '<div class="package_left">';

            if (data.packages[i] && data.packages[i].packageInfo && data.packages[i].packageInfo.master && data.packages[i].packageInfo.master.name) {
                Text += '<div class="package_name">' + data.packages[i].packageInfo.master.name + '</div>';
                presentPagedetails.packName = data.packages[i].packageInfo.master.name;
                if (data.packages[0] && data.packages[0].packageInfo && data.packages[0].packageInfo.master && data.packages[0].packageInfo.master.name) {
                    presentPagedetails.firstPackName = data.packages[0].packageInfo.master.name;
                }
            }

            for (var j = 0; j < data.packages[i].packageInfo.packages.length; j++) {
                var packageData = data.packages[i].packageInfo.packages[j];

                if (packageData && (packageData.salePrice || packageData.salePrice === 0)) {
                    Text += '<div class="package_price">₹ ' + packageData.salePrice + ' / ' +
                        (data.packages[i].packageInfo.master && data.packages[i].packageInfo.master.attributes && data.packages[i].packageInfo.master.attributes.Duration
                            ? data.packages[i].packageInfo.master.attributes.Duration
                            : "Monthly") +
                        '</div>';

                    presentPagedetails.firstPackPrice = packageData.salePrice;
                }

                var packageDesc = (packageData && packageData.features &&
                    packageData.features["tv-apps-plan-desc"])
                    ? packageData.features["tv-apps-plan-desc"]
                    : "";

                Text += '<div class="package_desc">' + packageDesc + '</div>';
            }

            var isDxlJuspay = false;
            if (data.packages[i] && data.packages[i].supportedGateway && data.packages[i].supportedGateway[0] && data.packages[i].supportedGateway[0].code == "dxl_juspay") {
                isDxlJuspay = true;
            }

            var btnTitle = "";
            if (plansDataV3) {
                if (isDxlJuspay && plansDataV3.dxl_juspay) {
                    btnTitle = plansDataV3.dxl_juspay.button_title;
                } else if (plansDataV3.sdpse) {
                    btnTitle = plansDataV3.sdpse.button_title;
                }
            }
            if (!btnTitle && plansData && plansData.button_title) {
                btnTitle = plansData.button_title;
            }

            if (!!btnTitle) {
                Text += '<button id="addBill-' + i + '" class="add_to_bill">' + btnTitle + '</button>';
                presentPagedetails.btnTitle = btnTitle;
            }

            Text += '</div>'; // package_left

            Text += '<div class="package_right">';
            Text += '<div class="packages_row">';

            var networkInclusions = (data.packages[i].packageInfo && data.packages[i].packageInfo.packages && data.packages[i].packageInfo.packages[0] && data.packages[i].packageInfo.packages[0].networkInclusions) || [];
            var totalNetworks = networkInclusions.length;

            var normalShowCount = (totalNetworks > 16) ? 15 : totalNetworks;

            for (var k = 0; k < normalShowCount; k++) {
                Text += '<div class="channel">';
                Text += '<div class="channel_inner">';
                Text += '<img class="channel_inner_img" src="' + Util.getImages(networkInclusions[k]) + '" alt="" />';
                Text += '</div>';
                Text += '</div>';
            }

            if (totalNetworks > 16) {
                var remaining = totalNetworks - 15;
                Text += '<div class="channel">';
                Text += '<div class="channel_inner_more">';
                Text += '<span>+' + remaining + '</span>';
                Text += '<span>More</span>';
                Text += '</div>';
                Text += '</div>';
            }

            Text += '</div>'; // packages_row
            Text += '</div>'; // package_right
            Text += '</div>'; // package_item
        }
        Text += '</div>'; // package_row
        Text += '</div>'; // packages_page_inner
        Text += '</div>'; // packages_page
    }

    return Text;
};




Util.postpaidPlansConfirmation = function () {
    var plansData = null;

    try {
        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPage) {
            var rawData = systemConfigs.configs.tvappPlansPage;
        }
        if (typeof rawData === "string") {
            plansData = JSON.parse(rawData);
        } else if (typeof rawData === "object" && rawData !== null) {
            plansData = rawData;
        } else {
            plansData = {}; // fallback for null, undefined, or unexpected types
        }
    } catch (e) {
        console.error("Error while parsing tvappPlansPage:", e);
        plansData = {};
    }
    var Text = '';
    Text += '<div class="signout_content">';

    // Check if popuptype is "addPostpaidBill" and add the appropriate template class
    if (Main.popupData.popuptype === "addPostpaidBill" || Main.popupData.popuptype === "bannerAddPostpaidBill") {
        Text += '<div class="addBillConfirm_template">';
    } else {
        Text += '<div class="signout_template">';
    }

    // Add the first message if it exists
    if (plansData && plansData.confirmation_popup && plansData.confirmation_popup.title) {
        Text += '<h1>' + plansData.confirmation_popup.title + '</h1>';
    }

    // Add the second message if it exists
    if (plansData && plansData.confirmation_popup && plansData.confirmation_popup.description) {
        Text += '<div class="addBillMessage">' + plansData.confirmation_popup.description + '</div>';
    }

    // Add action buttons
    Text += '<div class="actions_btns">';
    if (plansData && plansData.confirmation_popup && plansData.confirmation_popup.confirm_button) {
        Text += '<button type="button" id="popup-btn-1" source="up" btnType="yes" class="signout_btn">' + plansData.confirmation_popup.confirm_button + '</button>';
    }
    if (plansData && plansData.confirmation_popup && plansData.confirmation_popup.cancel_button) {
        Text += '<button type="button" id="popup-btn-2" source="up" btnType="no" class="signout_btn">' + plansData.confirmation_popup.cancel_button + '</button>';
    }
    Text += '</div>';  // Close actions_btns

    Text += '</div>';  // Close template
    Text += '</div>';  // Close signout_content

    return Text;
};
Util.adultPopupConfirmation = function (adultData) {
    // var adultData = null;

    // try {
    //     if (systemConfigs && systemConfigs.configs && systemConfigs.configs.tvappPlansPage) {
    //         var rawData = systemConfigs.configs.tvappPlansPage;
    //     }
    //     if (typeof rawData === "string") {
    //         plansData = JSON.parse(rawData);
    //     } else if (typeof rawData === "object" && rawData !== null) {
    //         plansData = rawData;
    //     } else {
    //         plansData = {}; // fallback for null, undefined, or unexpected types
    //     }
    // } catch (e) {
    //     console.error("Error while parsing tvappPlansPage:", e);
    //     plansData = {};
    // }
    var Text = '';
    Text += '<div class="signout_content">';

    // Check if popuptype is "addPostpaidBill" and add the appropriate template class
    if (Main.popupData.popuptype === "adultPopup") {
        Text += '<div class="adultPopup_template">';
    }

    // Add the first message if it exists
    if (adultData && adultData.popup && adultData.popup.heading) {
        Text += '<h1>' + adultData.popup.heading + '</h1>';
    }

    // Add the second message if it exists
    if (adultData && adultData.popup && typeof adultData.popup.description === 'string') {
        var description = adultData.popup.description;

        // Check if there is a double newline and split there
        if (description.indexOf('\n\n') !== -1) {
            // Replace the first double newline with a line break
            description = description.replace('\n\n', '<br><br>');
        }

        Text += '<div class="addBillMessage">' + description + '</div>';
    }


    // Add action buttons
    Text += '<div class="actions_btns">';
    if (adultData && adultData.popup && adultData.popup.button_title) {
        Text += '<button type="button" id="popup-btn-1" source="up" btnType="yes" class="signout_btn">' + adultData.popup.button_title + '</button>';
    }
    if (adultData && adultData.close_enabled && adultData.close_enabled == true) {
        Text += '<button type="button" id="popup-btn-2" source="up" btnType="no" class="signout_btn">Cancel</button>';
    }
    Text += '</div>';  // Close actions_btns

    Text += '</div>';  // Close template
    Text += '</div>';  // Close signout_content

    return Text;
};
Util.signoutComformation = function () {
    var Text = '';
    Text += '<div class="signout_content">'
    Text += '<div class="signout_template">'
    if (!!Main.popupData.message) {
        Text += '<h1>' + Main.popupData.message + '</h1>';
    }
    Text += '<div class="actions_btns">'
    Text += '<button type="button" id="popup-btn-1" source = "up" btnType = "yes" class="signout_btn"> ' + Main.popupData.yesText + ' </button>'
    Text += '<button type="button" id="popup-btn-2" source ="up"  btnType = "no" class="signout_btn">' + Main.popupData.noText + ' </button>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.signoutExitComformation = function () {
    var Text = '';
    Text += '<div class="exit_content">';
    Text += '<div class="exit_template">';

    // Header message
    if (Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.data) {
        Text += '<h2>' + Main.exitPopUpCallTemplate.data.name + '</h2>';
        Text += '<p>' + Main.exitPopUpCallTemplate.data.description + '</p>';
    }

    // Recommended movies section
    Text += '<div class="recommendations">';
    var count = 0;

    if (Main && Main.exitPopupDataCards && Main.exitPopupDataCards.data) {
        for (var i = 0; i < Main.exitPopupDataCards.data.length; i++) {
            var firstData = Main.exitPopupDataCards.data[i];

            if (firstData.section && firstData.section.sectionData && firstData.section.sectionData.data) {
                for (var j = 0; j < firstData.section.sectionData.data.length; j++) {
                    if (count >= 3) {
                        break; // Stops adding more than 3 images
                    }
                    Text += '<div class="exitRoller_poster exit_card"   source="exitSections" cardType="exitRoller_poster"  targetPath = "' + firstData.section.sectionData.data[j].target.path + '"template="' + firstData.section.sectionData.data[j].template + '"   id="exitSectionItem-' + j + '" >'
                    Text += '<div class="shows-image">';
                    if (firstData.section.sectionData.data[j].display.partnerIcon != undefined && firstData.section.sectionData.data[j].display.partnerIcon != "") {
                        Text += '<div class="partner_logo"><img class="partner_logo_inner" src="' + Util.getImages(firstData.section.sectionData.data[j].display.partnerIcon) + '" onerror="this.src = Yup(this).attr(\'altSrc\')" altSrc="images/partners-circle.png" /></div>';
                    }
                    Text += '<img class="exit_images" src="images/empty_state_roller.png" ' + 'data-src="' + Util.getImages(firstData.section.sectionData.data[j].display.imageUrl) + '" ' + 'alt="Movie Image" onload="loadActualImage(this)">';
                    Text += '</div>';
                    Text += '</div>';
                    count++;
                }
            }
            if (count >= 3) {
                break; // Exits outer loop once 3 images are added
            }
        }
    }
    Text += '</div>'; // Closing recommendations div
    Main.exitPopUpCallTemplate.buttonCount = 0;
    if (Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.data) {
        var buttonIndex = 1; // Start indexing from 1

        // Action buttons
        Text += '<div class="actions_btns">';

        if (!!Main.exitPopUpCallTemplate.data.subscribe && Main.exitPopUpCallTemplate.data.show_subscribe == "true") {
            Main.exitPopUpCallTemplate.buttonCount++;
            Text += '<button type="button" id="popup-btn-' + buttonIndex + '" source="popupbtn" btnType="yes" class="exitdataPop_btn">'
                + Main.exitPopUpCallTemplate.data.subscribe + '</button>';
            buttonIndex++; // Increment the button index
        }

        if (Main.exitPopUpCallTemplate.data.close && Main.exitPopUpCallTemplate.data.show_close == "true") {
            Main.exitPopUpCallTemplate.buttonCount++;
            Text += '<button type="button" id="popup-btn-' + buttonIndex + '" source="popupbtn" btnType="no" class="exitdataPop_btn">'
                + Main.exitPopUpCallTemplate.data.close + '</button>';
            buttonIndex++; // Increment the button index
        }

        Text += '</div>'; // Closing actions_btns div
    }

    Text += '</div>'; // Closing signout_template div
    Text += '</div>'; // Closing signout_content div

    return Text;
};
function loadActualImage(imgElement) {
    var actualSrc = imgElement.getAttribute("data-src");
    var tempImg = new Image();

    tempImg.onload = function () {
        imgElement.src = actualSrc;
    };

    tempImg.onerror = function () {
        console.error("Image failed to load:", actualSrc);
    };

    tempImg.src = actualSrc;
}

Util.playerSubtitles = function () {
    var Text = '';
    Text += '<div class="subtitles_page">';
    Text += '<div class="subtitles_pageinner">';

    var strms = ((presentPagedetails || {}).steamResponse || {}).streams || [];
    var cc = strms.length ? ((strms[0] || {}).closeCaptions || {}).ccList : null;

    var isLiveContent = false;
    if (presentPagedetails &&
        presentPagedetails.steamResponse &&
        presentPagedetails.steamResponse.analyticsInfo &&
        presentPagedetails.steamResponse.analyticsInfo.contentType === 'live') {
        isLiveContent = true;
    }

    var shakaTracks = _shaka.getTextTracks();

    var useCC = cc && cc.length > 0 && cc[0] && cc[0].filePath != '';
    var useShaka = !useCC && shakaTracks.length > 0;

    // Parse language config mapping
    var languageMap = {};
    try {
        var langConfig = JSON.parse(systemConfigs.configs.filterLanguagesList);
        (langConfig.items || []).forEach(function (item) {
            if (item.code && item.title) {
                var code = item.code.toLowerCase();
                // Keep only first mapping if duplicates exist
                if (!languageMap[code]) {
                    languageMap[code] = item.title;
                }
            }
        });
    } catch (e) {
        console.error('Invalid language config', e);
    }

    if ((useCC || useShaka) && !isLiveContent) {
        Text += '<div class="player_subtitles">';
        Text += '<h2>Subtitles</h2>';
        Text += '<ul class="bitrate_container">';

        var selectedLanguage = localStorage.getItem("selectedLanguage");
        if (selectedLanguage) {
            selectedLanguage = selectedLanguage.toLowerCase();
        }

        var subtitleList = [];
        var selectedIsPresent = false;
        var englishIsPresent = false;

        if (useCC) {
            for (var j = 0; j < cc.length; j++) {
                var langCode = cc[j] && cc[j].language ? cc[j].language.toLowerCase() : undefined;
                if (!langCode) continue;

                var title = languageMap[langCode] || langCode;
                var titleDuplicate = title
                if (selectedLanguage && titleDuplicate.toLowerCase() === selectedLanguage.toLowerCase()) selectedIsPresent = true;
                if (langCode === 'eng' || langCode === 'en' || langCode === "english") englishIsPresent = true;

                subtitleList.push({ language: langCode, displayLang: title });
            }
        } else if (useShaka) {
            for (var j = 0; j < shakaTracks.length; j++) {
                var langCode = shakaTracks[j] && shakaTracks[j].language ? shakaTracks[j].language.toLowerCase() : undefined;
                if (!langCode) continue;

                var title = languageMap[langCode] || langCode;
                var titleDuplicate = title
                if (selectedLanguage && titleDuplicate.toLowerCase() === selectedLanguage.toLowerCase()) selectedIsPresent = true;
                if (langCode === 'eng' || langCode === 'en' || langCode === "english") englishIsPresent = true;

                subtitleList.push({ language: langCode, displayLang: title });
            }
        }

        var shouldCheckOff = !selectedLanguage || selectedLanguage === 'off' || (!selectedIsPresent && !englishIsPresent);

        // Off option
        Text += '<li source="subtitles" id="subtitles-0" class="subtitle" bitrateValue="off">';
        Text += '<label><input type="radio" name="subtitle_quality" id="radio">';
        Text += '<span class="radio_btn ' + (shouldCheckOff ? 'checked' : '') + '"></span>';
        Text += '<span class="text">Off</span></label></li>';

        // Language options
        var isCheckedDone = shouldCheckOff;
        for (var i = 0; i < subtitleList.length; i++) {
            var lang = subtitleList[i].language;
            var displayLang = subtitleList[i].displayLang;
            if (!lang || !displayLang) continue;

            var isChecked = false;
            var displayLangDuplicate = displayLang
            if (!isCheckedDone) {
                if (selectedLanguage && selectedIsPresent && (lang === selectedLanguage || displayLangDuplicate.toLowerCase() == selectedLanguage.toLowerCase())) {
                    isChecked = true;
                    isCheckedDone = true;
                } else if (!selectedIsPresent && englishIsPresent && (lang === 'eng' || lang === 'en' || lang === "english")) {
                    isChecked = true;
                    isCheckedDone = true;
                }
            }

            Text += '<li source="subtitles" class="subtitle" id="subtitles-' + (i + 1) + '" bitrateValue="' + lang + '">';
            Text += '<label><input type="radio" name="subtitle_quality" id="radio">';
            Text += '<span class="radio_btn ' + (isChecked ? 'checked' : '') + '"></span>';
            Text += '<span class="text">' + (displayLang.charAt(0).toUpperCase() + displayLang.slice(1).toLowerCase()) + '</span>';
            Text += '</label></li>';
        }

        Text += '</ul></div>';
    }

    // Audio Track Rendering
    var AudiossTracks = presentPagedetails && presentPagedetails.AudioTracks ? Object.keys(presentPagedetails.AudioTracks).map(function (key) {
        return presentPagedetails.AudioTracks[key];
    }) : [];
    var audioVal = localStorage.getItem("selectedAudio");
    var hasNonNullLabels = AudiossTracks.some(a => a.label !== null);

    if (hasNonNullLabels && AudiossTracks.length > 1) {
        Text += '<div class="player_audio">';
        Text += '<h2>Audio</h2>';
        Text += '<ul class="bitrate_container">';

        var previousAudioMatched = false;
        for (var j = 0; j < AudiossTracks.length; j++) {
            if (audioVal === AudiossTracks[j].label) {
                previousAudioMatched = true;
                break;
            }
        }

        for (var i = 0; i < AudiossTracks.length; i++) {
            var audioTrack = AudiossTracks[i];
            if (audioTrack.label !== null) {
                var isChecked = false;
                if (audioVal === audioTrack.label && previousAudioMatched) {
                    isChecked = true;
                } else if (i === 0 && !previousAudioMatched) {
                    isChecked = true;
                }

                Text += '<li source="audio" id="audio-' + i + '" class="bitrate" bitrateValue="' + audioTrack.language + '">';
                Text += '<label><input type="radio" name="audio_quality" id="subtitle-off">';
                Text += '<span class="radio_btn ' + (isChecked ? 'checked' : '') + '"></span>';
                Text += '<span class="text">' + audioTrack.label + '</span>';
                Text += '</label></li>';
            }
        }

        Text += '</ul></div>';
    }

    Text += '</div>'; // subtitles_pageinner
    Text += '</div>'; // subtitles_page

    return Text;
};



Util.videoQuality = function () {
    var Text = '';
    Text += '<div class="video_quality_page">'
    Text += '<div class="video_quality_pageinner">'
    Text += '<h2>Video Quality</h2>'
    Text += '<ul class="bitrate_container">'
    if (presentPagedetails.QulailtyTracks) {
        var keys = Object.keys(presentPagedetails.QulailtyTracks);
        var nextid = 1;
        var quality_limits = JSON.parse(systemConfigs.configs.videoQualitySettings);
        Text += '<li  source="bitrate" id="bitrate-0" class="bitrate" bitrateValue="0"><label > <input type="radio" name="video_quality" id="radio" ><span class="radio_btn checked"></span> <span class="text">Auto</span></label></li>';
        var bitrateRanges = {};

        for (var j = 0; j < quality_limits.length; j++) {
            var minBitRate = quality_limits[j].minBitRate;
            var maxBitRate = quality_limits[j].maxBitRate;
            var maxBitrateInRange = -1;

            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];

                if (minBitRate <= key && key < maxBitRate) {
                    if (!bitrateRanges[j] || key > bitrateRanges[j]) {
                        maxBitrateInRange = Math.max(maxBitrateInRange, key);
                    }
                }
            }

            if (maxBitrateInRange !== -1) {
                bitrateRanges[j] = maxBitrateInRange;
                Text += '<li source="bitrate" id="bitrate-' + (nextid) + '" class="bitrate" bitrateValue=' + bitrateRanges[j] + '><label><input type="radio" name="video_quality" id="radio"><span class="radio_btn"></span><span class="text">' + quality_limits[j].displayTitle + '</span></label></li>';
                nextid++;
            }
        }

        Text += '</ul>';
    }

    Text += '</div>'
    // Text += '<div class="update_btns"> <button type="button" id="bitrate_apply_btn" source ="bitrate_apply" class="grey-btn">APPLY</button><button type="button"  id="bitrate_cancel_btn" source ="bitrate_cancel" class="grey-btn ">CANCEL</button></div>'

    Text += '</div>'
    return Text;
}
Util.signInHtml = function (data) {
    var signdata = JSON.parse(systemConfigs.configs.signinPageInfo)

    var Text = '';
    Text += '<div class="signInBackgr">'
    Text += '<img src="images/bg_landing_screen.png" class="img-backgr"  />'
    Text += '<div  class="signInform" id="signInContent">'
    Text += '<div class="container">'
    Text += Util.getLogo()
    Text += '<div class="row content-layout">'
    Text += '<div id = "signInLeftSide"></div>'
    Text += '<div class="vr_line"><span class="or">Or</span></div>'
    Text += '<div class="col6 passcode" >';
    for (var i = 0; i < signdata.length; i++) {
        var currentData = signdata[i];
        if (currentData.hasOwnProperty("qrCode")) {
            Text += '<h2 class="signHead" id="signinTitle">' + currentData.qrCode.title + '</h2>'
            Text += '<div id="qrcode" class="qr_code" title="http://www.vodafone.com/device?auth_code=ILNH"></div>'
            Text += '<div class="hr_line"><span class="or">Or</span></div>'
            var subTitle = currentData.qrCode.subTitle[0];
            highlightedSubTitle = subTitle.replace(/%b(.*?)%b/g, '<span style="color: #fff; font-family: Gotham-bold;">$1</span>');
            Text += '<p>' + highlightedSubTitle + '</p>';
        }
    }
    Text += '<p class="code">' + presentPagedetails.passcode + '</p>'
    Text += '<p id="passcode_msg">Passcode expired, Please generate new code.</p>'
    Text += '<div class=bottom_bnts> <button type="button" id ="passcodeBtn-0" class="code_btn" source ="passcode"> Get New Code </button></div>'
    Text += '<p class="update_msg">Once done this screen will automatically update</p>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    Text += '<div class="toastmsg_template">'
    Text += '</div>'
    return Text;
}
// Text += '<div class="qr_center"><span id="Passcodenum" class="code" source="passcodeBtnView">' + presentPagedetails.passcode + '</span><p id="passcode_msg">Passcode expired, Please generate new code.</p> <a id="signUpBtn1" class="btn-default grey-btn passcode-retry" source="passcodeBtn"> Get New Code </a></div>'

Util.signupOTPVerificationHTML = function () {
    var Text = '';
    Text += '<div class="col6" id="keyLayout">'
    Text += '<h2 class="signHead" id="signinTitle">Sign in to your account</h2>'
    Text += '<div class="formlayout" id="formLayout">';
    Text += Util.signupOTP();
    Text += Util.numberKeys('signupotp');
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    // Text += '<div class="vr_line"><span class="or"></span></div>'
    // Text += '<div class="col6 passcode" >';
    // Text += '<h2 class="signHead" id="signinTitle">Scan QR code to Activate</h2>'
    // Text += '<div id="qrcode" class="qr_code" title="http://www.vodafone.com/device?auth_code=ILNH"></div>' 
    // Text += '<div class="hr_line"><span class="or"></span></div>'
    // Text +='<p>Go to https://www.myvi.in/activate/device or On your Mobile app select <span class="strong"> Activate TV </span>from the menu and enter the below code</p>'
    // Text += '<p class="code">'+ presentPagedetails.passcode+'</p>'
    // Text +='<div class=bottom_bnts> <button type="button" class="code_btn"> Get New Code </button></div>'
    // Text +='</div>'
    Text += '</div>'
    return Text;
}

Util.signMobileHtml = function () {
    var leftsignin = JSON.parse(systemConfigs.configs.signinPageInfo)
    var Text = '';
    Text += '<div class="col6" id="keyLayout">';
    for (var i = 0; i < leftsignin.length; i++) {
        var currentData = leftsignin[i];
        if (currentData.hasOwnProperty("buttons")) {
            Text += '<h2 class="signHead" id="signinTitle">' + currentData.subtitle + '</h2>'
            Text += '<div class="formlayout" id="formLayout">';
            Text += Util.signForms('mobile', currentData);
            Text += '</div>'
            Text += Util.numberKeys('signin', currentData);
        }
    }
    presentPagedetails.formType = 'mobile';
    Text += '</div>'
    Text += '</div>'
    return Text;
}

Util.ContentNotFound = function (data, code) {
    if (presentPagedetails.targetPath != "favourites") {
        Main.sidebarOpen()
    }
    var Text = '';
    Text += '<div class="contentnot_found">'
    Text += Util.getLogo()
    Text += '<div class="container">'
    if (presentPagedetails.targetPath == "favourites" || presentPagedetails.targetPath == "signupOtpVerification") {
        Text += '<div class="contentnot_inner_fav">'
        Text += '<p>' + data + '</p>'
    }
    else {
        if (code != -16) {
            Text += '<div class="contentnot_inner">'
            Text += '<h1>CONTENT NOT FOUND</h1>'
            Text += '<img src="images/Content not found image.png">'
        }
        if (data) {
            var pasha = data.toLowerCase().indexOf("maturity rating") !== -1;
        }
        if (Yup(window).width() == 1920) {
            if (pasha == true) {
                Text += '<div class="contentnot_inner" style="line-height:0px;">';

            }
            else {
                Text += '<div class="contentnot_inner" style="line-height: 604px;">';
            }
        }
        else {
            if (pasha == true) {
                Text += '<div class="contentnot_inner" style="line-height:0px;">';
            }
            else {
                Text += '<div class="contentnot_inner" style="line-height: 380px;">';
            }
        }

        Text += '<p>' + data + '</p>'
    }
    // Text += '<button class="grey-btn imageFocus" type="button" >Back</button>'
    Text += '</div>'
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.deviceHTML = function (data) {
    var Text = '';
    Text += '<div class="activeDeviceList">'
    Text += '<div class="inner">'
    Text += '<h1>To watch on this device, please close at least one active screen from the list below</h1>'
    for (var i = 0; i < presentPagedetails.Activescreens.length; i++) {
        if (presentPagedetails.Activescreens[i].isCurrentDevice != true) {
            Text += '<div class="list" id="list-' + (i) + '">'
            Text += '<div class="icon">'
            Text += '<img src="' + presentPagedetails.Activescreens[i].deviceIconUrl + '">'
            Text += '</div>'

            Text += '<span class="tv_name">' + presentPagedetails.Activescreens[i].deviceName + '</span>'
            Text += '<button class="activeScreen_Btn" id="close_screen_btn-' + (i) + '">Close Screen</button>'
            Text += '</div>'
        }
    }
    Text += '</div></div>'
    return Text;
}

Util.ActiveScreens = function () {
    var Text = "";
    Text += '<div class= "active-screens-parent">'
    if (!!presentPagedetails.Activescreens && presentPagedetails.Activescreens.length > 0) {
        Text += '<table class="active_screen_table">'
        Text += '<tr class = "active_heading">'
        Text += '<td>Device Type</td>'
        Text += '<td>Device Name</td>'
        Text += '<td>Action</td>'
        Text += '</tr>'
        for (var i = 0; i < presentPagedetails.Activescreens.length; i++) {
            Text += '<tr class="active-screen" source="active_screen" id="screenContent-0-' + i + '">'
            Text += '<td> ' + presentPagedetails.Activescreens[i].deviceTypeDetails.name + '</td>'
            Text += '<td> ' + presentPagedetails.Activescreens[i].deviceSubtype + '</td>'
            if (Main.BOXID === presentPagedetails.Activescreens[i].boxId) {
                Text += '<td><form source="close_screen">Primary Device</form></td>'
            }
            else {
                Text += '<td><form class="closescreen" source="close_screen">Remove Device</form></td>'
            }
            Text += '</tr>'
        }
        Text += '</table>'
    }
    else {
        Text += '<span class="act-screen">No Active screens found</span>'
    }
    Text += '</div>'
    return Text;
}

Util.deviceLimitScreen = function (data) {
    var Text = "";
    // Text += '<div class="deviceLim" id="deviceLim">'
    Text += '<div class="deviceLimit" id="deviceLimit" index="" count="" source="deviceLimit">';
    Text += '<h3>Manage Devices</h3>';
    if (data && data.data && data.data.subtitle) {
        data.data.subtitle = data.data.subtitle.replace(/\\n/g, ' ');
        Text += '<h4>' + data.data.subtitle + '</h4>';
    }
    var currentDeviceIndex = -1;
    for (var i = 0; i < data.deviceList.length; i++) {
        if (data.deviceList[i].isCurrentDevice === true) {
            currentDeviceIndex = i;
            break;
        }
    }
    if (currentDeviceIndex > 0) {
        var currentDevice = data.deviceList.splice(currentDeviceIndex, 1)[0];
        data.deviceList.unshift(currentDevice);
    }

    if (data.deviceList.length > 0) {
        // Render Current Device (index 0) fixed at the top
        Text += '<div class="deviceDetails" source="deviceDetails" id="device_Details-0">';
        if (!!data.deviceList[0].deviceLogo) {
            Text += '<div class="firstImg">';
            Text += '<img class="device_image" src="' + data.deviceList[0].deviceLogo + '" class="mutipleDevices">';
            Text += '</div>';
        }
        Text += '<div class="secondDetails">';
        Text += '<span class="displayTitle">' + data.deviceList[0].deviceSubType + '</span>';
        Text += '<span>Type: ' + data.deviceList[0].deviceType + '</span>';
        Text += '<span>Last Logged In: ' + data.deviceList[0].lastUsedDate + '</span>';
        Text += '</div>';
        Text += '<div class="logOutBtn">';
        Text += '<button>Current Device</button>';
        Text += '</div>';
        Text += '</div>';
    }

    // Wrap the rest of the devices in a scrollable container
    Text += '<div id="deviceListScrollContainer">';
    Text += '<div id="deviceListScrollInner">';

    for (var i = 1; i < data.deviceList.length; i++) {
        Text += '<div class="deviceDetails" source="deviceDetails" id="device_Details-' + i + '">';
        if (!!data.deviceList[i].deviceLogo) {
            Text += '<div class="firstImg">';
            Text += '<img class="device_image" src="' + data.deviceList[i].deviceLogo + '" class="mutipleDevices">';
            Text += '</div>';
        }
        Text += '<div class="secondDetails">';
        Text += '<span class="displayTitle">' + data.deviceList[i].deviceSubType + '</span>';
        Text += '<span>Type: ' + data.deviceList[i].deviceType + '</span>';
        Text += '<span>Last Logged In: ' + data.deviceList[i].lastUsedDate + '</span>';
        Text += '</div>';

        Text += '<div class="logOutBtn">';
        Text += '<button>Remove</button>';
        Text += '</div>';

        Text += '</div>';
    }

    Text += '</div></div>';

    Text += '</div>';

    // Text += '</div>'
    return Text;
};


Util.afterSignActiveScreen = function (deviceData) {
    var Text = "";
    Text += '<div class="device_limit">'
    Text += '<div class="left_sidePart">'
    Text += '<div class="image">'
    if (!!deviceData.data.imageUrl) {
        Text += '<img src="' + deviceData.data.imageUrl + '" alt="">'
    }
    Text += '</div>'
    Text += '<h2>' + deviceData.data.title + '</h2>'
    Text += '<p>' + deviceData.data.subtitle + '</p>'
    Text += '<div class="separate_line"></div>'
    Text += '</div>'
    Text += '<div class="right_sidePart">'
    Text += '<div id="signinDeviceScrollContainer">'
    Text += '<div id="signinDeviceScrollInner">'
    for (var i = 0; i < deviceData.deviceList.length; i++) {
        Text += '<div class="right_inner" source="signin_device_limit" id="signin_device-' + i + '">'
        Text += '<div class="firstImg">'
        Text += '<img src="' + deviceData.deviceList[i].deviceLogo + '" class="mutipleDevices">'
        Text += '</div>'
        Text += '<div class="secondDetails">'
        Text += '<span class="displayTitle">' + deviceData.deviceList[i].deviceType + '</span>'
        Text += '<span>Type : ' + deviceData.deviceList[i].deviceSubType + '</span>'
        Text += '<span>Last Logged In : ' + deviceData.deviceList[i].lastUsedDate + '</span>'
        Text += '</div>'
        Text += '<div class="removeBtn">'
        Text += '<button>Remove</button>'
        Text += '</div>'
        Text += '</div>'
    }
    Text += '</div></div>'
    Text += '</div>'
    return Text;
}

Util.settingProfilesPage = function (profileData) {
    presentPagedetails.profileDetails = profileData;
    var Text = "";
    Text += '<div class="setProfile">'
    Text += '<h3>Switch Profile</h3>'
    Text += '<div class="circleProfile">'
    presentPagedetails.profileScreenType = "Switch Profile"
    var maxProfiles = systemFeatures && systemFeatures.userprofiles && systemFeatures.userprofiles.fields && systemFeatures.userprofiles.fields.max_profile_limit
        ? systemFeatures.userprofiles.fields.max_profile_limit
        : profileData.response.length; // Default to all profiles if limit is missing
    var customProfileCount = 0;
    for (var i = 0; i < Math.min(profileData.response.length, maxProfiles); i++) {
        Text += '<div class="singleProfile" profile-id="' + profileData.response[i].profileId + '" name="' + profileData.response[i].name + '" source="SettingsprofilePage" id="profile-' + i + '" isProfileLockActive="' + profileData.response[i].isProfileLockActive + '">';
        Text += '<div class="pic">';

        var profileImageUrl = "https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/profile-pic1.svg"; // Default image

        if (systemConfigs && systemConfigs.configs && systemConfigs.configs.profileImages) {
            var profileImages;

            if (typeof systemConfigs.configs.profileImages === "string") {
                try {
                    profileImages = JSON.parse(systemConfigs.configs.profileImages);
                } catch (e) {
                    profileImages = {}; // Prevent errors if JSON parsing fails
                }
            } else {
                profileImages = systemConfigs.configs.profileImages;
            }

            if (profileData.response[i].isMasterProfile) {
                profileImageUrl = profileImages["Default"] || profileImageUrl;
            } else if (profileData.response[i].isChildren) {
                profileImageUrl = profileImages["kids"] || profileImageUrl;
            } else if (profileData.response[i].isDevotional) {
                profileImageUrl = profileImages["devotional"] || profileImageUrl;
            } else {
                if (profileData.response[i].profileCode == "custom") {
                    customProfileCount++;
                    if (customProfileCount === 1) {
                        profileImageUrl = profileImages["Default1"] || profileImageUrl;
                    }
                    else if (customProfileCount === 2) {
                        profileImageUrl = profileImages["Default2"] || profileImageUrl;
                    } else {
                        profileImageUrl = profileImages["Default3"] || profileImageUrl;
                    }
                }
            }
        }

        Text += '<img src="' + profileImageUrl + '" class="profile_img" />';
        Text += '</div><div class="profile_details">';

        if (profileData.response[i].isProfileLockActive) {
            Text += '<img src="' + appConfig.viStaticColudPath + 'profile_lock.png" class="lock_image">';
        }
        if (profileData.response[i].isChildren) {
            Text += '<span class="profile-child">' + profileData.response[i].name + '</span>';
        }
        if (!profileData.response[i].isChildren) {
            var pName = profileData.response[i].name || "";
            Text += '<span class="profile-text">' + pName + '</span>';
        }

        Text += '</div></div>';
    }

    Text += '</div>'
    Text += '<p>Note: You can add or manage new profiles using the mobile app and web</p>'
    Text += '</div>'
    return Text;
}
Util.showNudgeNoPlans = function () {
    if (presentPagedetails.templateData) {
        var Text = '';
        Text += '<div class="noplansDiv" id="contentTemp">'
        Text += '<div class="overlay-screen No_plans_nudge">'
        Text += '<div class="popup-Title">'
        if (!!presentPagedetails.templateData.title.data) {
            var text = presentPagedetails.templateData.title.data;
            if (text.includes("$")) {
                text = text.replace(/\$(.*?)\$/g, '<span style="color: yellow;">$1</span>');
            }
            Text += '<h4 class="popup-Header">' + text + '</h4>'
        }
        if (!!presentPagedetails.templateData.description.data && presentPagedetails.templateData.description.displayCondition == "true") {
            Text += '<p class="popup-subhead">' + presentPagedetails.templateData.description.data + '</p>'
        }
        Text += '</div>'
        Text += '<div class="popup-btn-wrap ">'
        if (presentPagedetails.templateData.tembutns.length == 1 && presentPagedetails.templateData.tembutns[0].displayCondition == "true") {
            Text += '<button id="popup-btn-1" ' +
                'btnTemplate="' + (presentPagedetails.templateData.tembutns[0].template ? presentPagedetails.templateData.tembutns[0].template : "") + '" ' +
                'class="btn-default template_over" ' +
                'targetpath="' + (presentPagedetails.templateData.tembutns[0].target ? presentPagedetails.templateData.tembutns[0].target : "") + '" ' +
                'source="tempBtns" ' +
                'template="' + (presentPagedetails.templateData.templateCode ? presentPagedetails.templateData.templateCode : "") + '">' +
                (presentPagedetails.templateData.tembutns[0].data ? presentPagedetails.templateData.tembutns[0].data : "") +
                '</button>';

            // Text += '<button id="popup-btn-1" btnTemplate="'+presentPagedetails.templateData.tembutns[0].template ? presentPagedetails.templateData.tembutns[0].template: "" +'" class="btn-default template_over" targetpath="'+presentPagedetails.templateData.tembutns[0].target+'" source="tempBtns" template="'+presentPagedetails.templateData.templateCode+'" > ' + presentPagedetails.templateData.tembutns[0].data + ' </button>'
        }
        Text += '</div>'
        Text += '</div>'
        Text += '</div>'

        return Text;
    }
}
Util.ybbPopUpComformation = function (data) {
    var Text = '';
    Text += '<div class="ybb_content">'
    Text += '<div class="ad_modal">'
    Text += '<img src=' + data.image + ' />';
    if (data.show_button == "true") {
        Text += '<div class="ybb_actions_btns">'
        Text += '<button type="button" id="popup-btn-1" source = "up" btnType = "yes" class="ybbClose_btn">' + data.button + '</button>'
        Text += '</div>'
    }
    Text += '</div>'
    Text += '</div>'
    return Text;
}
Util.getPaginationShimmer = function (count) {
    var text = '<div id="pagination-shimmer">';

    for (var i = 0; i < count; i++) {
        text += '<div class="section_row shimmer_section">';
        text += '<div class="shimmer_heading"></div>';
        text += '<div class="sectionhorizontal">';

        for (var j = 0; j < 8; j++) {
            text += '<div class="shimmer_card"></div>';
        }

        text += '</div></div>';
    }

    text += '</div>';
    return text;
};


// UPI Payment Details Popup with Countdown Timer
Util.upiPaymentPopup = function (data) {
    data = data || {};
    var expiryTimeSeconds = data.expiryTimeSeconds || 20;

    Util.upiPageExpired = false;
    Util.upiPaymentData = data;
    Util.upiExpiryTimeSeconds = expiryTimeSeconds;

    // Format the initial countdown time string (MM:SS)
    var initMin = Math.floor(expiryTimeSeconds / 60);
    var initSec = expiryTimeSeconds % 60;
    var initTimeStr = (initMin < 10 ? "0" + initMin : initMin) + ":" + (initSec < 10 ? "0" + initSec : initSec);

    // Setup self-cleaning timer callback after HTML renders if qrUrl is already present
    setTimeout(function () {
        try {
            if (data.qrUrl && document.getElementById("upiQrCodeContainer")) {
                Main.generateQrCodeForPayments("upiQrCodeContainer", data.qrUrl);
                Util.startUpiCountdown(data, expiryTimeSeconds);
            }
        } catch (e) {
            console.error("Error generating QR code in UPI Payment popup:", e);
        }
    }, 0);

    var Text = '';
    Text += '<div class="upi_payment_page" id="upi_payment_page">';
    Text += '  <div class="upi_payment_container">';

    // Left card (Plan details & Benefits)
    Text += '    <div class="upi_plan_card">';
    Text += '      <div class="upi_plan_header">' + (data.planSelectedLabel || "") + '</div>';
    Text += '      <div class="upi_plan_title">' + (data.planName || "") + '</div>';
    Text += '      <div class="upi_plan_price">&#8377;' + (data.price !== undefined && data.price !== null ? data.price : "") + '</div>';
    Text += '      <div class="upi_plan_divider"></div>';
    Text += '      <div class="upi_plan_info_title">' + (data.informationTitle || "") + '</div>';
    Text += '      <ul class="upi_plan_features">';

    // Loop through the benefits/features array dynamically
    var features = data.features || [];
    for (var i = 0; i < features.length; i++) {
        Text += '        <li>' + features[i] + '</li>';
    }

    Text += '      </ul>';
    Text += '    </div>';

    // Right card (QR Code and UPI Logos)
    Text += '    <div class="upi_pay_card">';
    Text += '      <div class="upi_pay_title">' + (data.qrTitle || "") + '</div>';
    Text += '      <div class="upi_pay_subtitle">' + (data.qrSubtitle || "") + '</div>';

    // UPI App logos row
    Text += '      <div class="upi_logos_row">';

    // Render supported app logos dynamically if base URL and supportedApps array are present
    var baseUrl = data.baseImageUrl || "";
    if (data.supportedApps && data.supportedApps.length > 0) {
        for (var j = 0; j < data.supportedApps.length; j++) {
            var appLogo = data.supportedApps[j];
            var logoUrl = baseUrl + appLogo;
            Text += '        <div class="upi_logo_wrapper">';
            Text += '          <img class="upi_app_logo_img" src="' + logoUrl + '" alt="' + appLogo + '" style="width: 100%; height: 100%; object-fit: contain;" />';
            Text += '        </div>';
        }
    }
    Text += '      </div>';
    Text += '      <div class="upi_pay_app_text">' + (data.fallbackText || "") + '</div>';

    // QR Code Canvas Container
    Text += '      <div class="upi_qr_wrapper" id="upiQrWrapper">';
    Text += '        <div id="upiQrCodeContainer" class="upi_qr_container">';
    if (data && data.qrUrl) {
        // QRCode JS will render into container
    } else {
        Text += '          <div class="upi_qr_loader_box"><img src="images/loader.png" class="upi_qr_loader_img" /></div>';
    }
    Text += '        </div>';
    Text += '      </div>';

    // Expiration Timer Message (Replaces %n$mins placeholder with our active countdown span element)
    var expiryTextTemplate = data.expiryText || "";
    var expiryHtml = expiryTextTemplate.replace(/%n\$mins\s*(min|mins|minute|minutes|seconds|sec|secs)?/gi, function (match, unit) {
        var timerSpan = '<span class="upi_timer" id="upi_payment_timer">' + initTimeStr + '</span>';
        if (unit) {
            return timerSpan + ' <span class="upi_timer">' + unit + '</span>';
        }
        return timerSpan;
    });
    // Remove extra formatting delimiters like %n if present
    if (data && data.qrUrl) {
        Text += '      <div class="upi_expire_text">' + expiryHtml + '</div>';
    } else {
        Text += '      <div class="upi_expire_text"></div>';
    }
    Text += '    </div>';

    Text += '  </div>';
    Text += '  <div class="toastmsg_template"></div>';
    Text += '</div>';

    return Text;
};

Util.showUpiExpiredState = function (data) {
    if (Util.upiTimerInterval) {
        clearInterval(Util.upiTimerInterval);
        Util.upiTimerInterval = null;
    }
    if (!!postpaidBillListener) {
        clearTimeout(postpaidBillListener);
        postpaidBillListener = null;
    }
    var timerEl = document.getElementById("upi_payment_timer");
    if (timerEl) {
        timerEl.textContent = "00:00";
    }

    var popupData = data || Util.upiPaymentData || Main.upiPopupData;
    var expiredQrCodeText = (popupData && popupData.expiredQrCodeText) || "";
    var baseUrl = (popupData && popupData.baseImageUrl) || "";
    var expiredQrCodeImage = (popupData && popupData.expiredQrCodeImage) || "";
    var expiredQrCodeImageUrl = expiredQrCodeImage ? baseUrl + expiredQrCodeImage : "";

    var container = document.getElementById("upiQrCodeContainer");
    if (container && expiredQrCodeImageUrl) {
        container.innerHTML = '<img src="' + expiredQrCodeImageUrl + '" style="width: 100%; height: 100%; object-fit: contain;" />';
    }
    var qrWrapper = document.getElementById("upiQrWrapper");
    if (qrWrapper) {
        qrWrapper.classList.add("upi_expired");
    }
    var expireTextEl = document.querySelector(".upi_expire_text");
    if (expireTextEl) {
        expireTextEl.textContent = expiredQrCodeText;
    }
    Util.upiPageExpired = true;

    Yup(".imageFocus").removeClass("imageFocus");
    Yup("#upiQrCodeContainer").addClass("imageFocus");
};

Util.startUpiCountdown = function (data, expiryTimeSeconds) {
    if (Util.upiTimerInterval) {
        clearInterval(Util.upiTimerInterval);
        Util.upiTimerInterval = null;
    }
    Util.upiPageExpired = false;

    if (data) {
        Util.upiPaymentData = data;
    }

    var expirySec = expiryTimeSeconds || (data && data.expiryTimeSeconds) || Util.upiExpiryTimeSeconds || 300;
    Util.upiExpiryTimeSeconds = expirySec;
    Util.upiExpirationTimestamp = Date.now() + (expirySec * 1000);

    var duration = expirySec;
    var initMin = Math.floor(duration / 60);
    var initSec = duration % 60;
    var initTimeStr = (initMin < 10 ? "0" + initMin : initMin) + ":" + (initSec < 10 ? "0" + initSec : initSec);

    var popupData = data || Util.upiPaymentData || Main.upiPopupData;
    var expiryTextTemplate = (popupData && popupData.expiryText) || "";

    var expiryHtml = expiryTextTemplate.replace(/%n\$mins\s*(min|mins|minute|minutes|seconds|sec|secs)?/gi, function (match, unit) {
        var timerSpan = '<span class="upi_timer" id="upi_payment_timer">' + initTimeStr + '</span>';
        if (unit) {
            return timerSpan + ' <span class="upi_timer">' + unit + '</span>';
        }
        return timerSpan;
    });
    expiryHtml = expiryHtml.replace(/%n/g, "");

    var expireTextEl = document.querySelector(".upi_expire_text");
    if (expireTextEl) {
        expireTextEl.innerHTML = expiryHtml;
    }

    var timerEl = document.getElementById("upi_payment_timer");
    if (timerEl) {
        timerEl.textContent = initTimeStr;
    }

    Util.upiTimerInterval = setInterval(function () {
        var timerEl = document.getElementById("upi_payment_timer");
        if (!timerEl) {
            clearInterval(Util.upiTimerInterval);
            Util.upiTimerInterval = null;
            return;
        }

        var remainingSec = Math.ceil((Util.upiExpirationTimestamp - Date.now()) / 1000);
        if (remainingSec <= 0) {
            Util.showUpiExpiredState(data);
            return;
        }
        var minutes = Math.floor(remainingSec / 60);
        var seconds = remainingSec % 60;
        timerEl.textContent = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    }, 1000);
};

Util.refreshUpiPayment = function () {
    if (typeof Main !== "undefined" && typeof Main.refreshUpiPayment === "function") {
        Main.refreshUpiPayment();
    }
};
