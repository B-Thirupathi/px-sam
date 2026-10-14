var analytics = {
	plugin: {}
}
var userDetails = JSON.parse(localStorage.getItem('userDetails'));
analytics.load = function () {
	try {
		connectionType=navigator.connection ?navigator.connection.type:"unknown";
		var setLocationData = {};
		setLocationData = {
			'hbRate': locationData && locationData.analyticsInfo && locationData.analyticsInfo.hbRateInMillis ? locationData.analyticsInfo.hbRateInMillis/2000 : "",
			'authKey':locationData && locationData.analyticsInfo && locationData.analyticsInfo.authKey ? locationData.analyticsInfo.authKey : "", // session-id
			'trueIp': locationData && locationData.ipInfo && locationData.ipInfo.trueIP ? locationData.ipInfo.trueIP : "", // Client ip
			'environment': 'live', 
			'ClientID': ''
		}
		analytics.plugin = VideoAnalyticsPlugins.load(setLocationData)
	}
	catch (e) {
		console.log(e);
	}
}
analytics.setMetaData = function (custom_data, comingFrom) {
    var userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var currentUserDetails =JSON.parse(utilities.getFromLocalStorage('currentUserDetails'));
    var videoContentType = (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.contentType) ? presentPagedetails.steamResponse.pageAttributes.contentType : ''
    var playerEventsVersion = appConfig.playerVersion
    var videoPlayerName = appConfig.playerName
    var customData = {};

if (presentPagedetails &&
    presentPagedetails.steamResponse &&
    presentPagedetails.steamResponse.analyticsInfo &&
    presentPagedetails.steamResponse.analyticsInfo.customData) {

  var data = presentPagedetails.steamResponse.analyticsInfo.customData;

  if (typeof data === 'string') {
    try {
      customData = JSON.parse(data);
    } catch (e) {
      customData = {};
    }
  } else {
    customData = data;
  }
}

    if(!!comingFrom && comingFrom == "trailers"){
        playerEventsVersion = appConfig.HlsplayerVersion
        videoPlayerName = appConfig.HlsplayerName
        if(custom_data.contentType == "tvshowdetails" || custom_data.mediaContentType == "TV Shows"){
            var shows_name = custom_data.contentName
            custom_data.grouplistName = custom_data.contentName
            videoContentType = custom_data.trailerStreamType ? custom_data.trailerStreamType : ''
        }
        else{
            var shows_name = custom_data ? custom_data.contentName : ""
             videoContentType =  custom_data.trailerStreamType ? custom_data.trailerStreamType : ''
        }
    }
   else if(presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo.dataType == 'movie'){
        var shows_name = presentPagedetails && presentPagedetails.pageContent[0]&& presentPagedetails.pageContent[0].title ? presentPagedetails.pageContent[0].title : ""
        
    }
    else{
        var shows_name = (presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.contentName)? presentPagedetails.attributes.contentName : ""
        custom_data.grouplistName = (presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.tvShowName) ? presentPagedetails.attributes.tvShowName : ""
    }
    var myRecoForVideoraphy = {
        carouselPosition: String(ctEvent.carouselPositionn) ? String(ctEvent.carouselPositionn):"",
        trackingId: (presentPagedetails && presentPagedetails.sections[0]&& presentPagedetails.sections[0].sectionData && presentPagedetails.sections[0].sectionData.myRecoTrackingId )? presentPagedetails.sections[0].sectionData.myRecoTrackingId  : "",
        contentPosition:String(ctEvent.contentPositionss) ? String(ctEvent.contentPositionss):"",
        originSource:"AppOpen",
        sourceTab: ctEvent.tabName ? ctEvent.tabName: "",
        contentPath: presentPagedetails.targetPath ? presentPagedetails.targetPath :"",
        originName: ctEvent.carouselName ? ctEvent.carouselName: "",
        originMedium: myReco.originMedium ? myReco.originMedium : "",
        myRecoContentType: presentPagedetails.attributes && presentPagedetails.attributes.mediaContentType ? presentPagedetails.attributes.mediaContentType : "",
        myRecoContentId: (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.id: '',
        
    };
    //mapping the data
    try {
        var analyticsMetaData ={}
        analyticsMetaData.locationData = {
            'hbRate': locationData.analyticsInfo.hbRateInMillis/2000 ? locationData.analyticsInfo.hbRateInMillis/2000 : '',
            'authKey': locationData.analyticsInfo.authKey ? locationData.analyticsInfo.authKey : '',
            'clientId': '',
            'vendorId': Main.tenantCode ? Main.tenantCode : '',
            'countryName': locationData.ipInfo.country ? locationData.ipInfo.country : '',
            'state': locationData.ipInfo.region ? locationData.ipInfo.region : '',
            'city': locationData.ipInfo.city ? locationData.ipInfo.city : '',
            'trueIp': locationData.ipInfo.trueIP ? locationData.ipInfo.trueIP : '',
            'environment': 'live',
            'circleID' : (presentPagedetails && presentPagedetails.steamResponse && customData) ? customData.circleId: '',
            'circleCode' : (presentPagedetails && presentPagedetails.steamResponse && customData) ? customData.circleCode: ''
        };

        analyticsMetaData.playerMetaData = {
            'playerName': videoPlayerName ? videoPlayerName : "",
            'playerVersion': playerEventsVersion ? playerEventsVersion : ''
        };

        analyticsMetaData.clientMetaData = {
            'appVersion': appConfig.staticSubVersion,
            'connectionType': navigator && navigator.connection && navigator.connection.type ? navigator.connection.type : "",
            'clientIP':  locationData.ipInfo.trueIP ? locationData.ipInfo.trueIP : '',
            'NWProvider': '',
            'ISProvider': '',
            'deviceType': appConfig.deviceType,
            'deviceClient': appConfig.deviceName,
            'deviceId': appConfig.APPID,
            'deviceOS': appConfig.deviceOs,
            'deviceOSVersion': device_info && device_info.version ? device_info.version : "" ,
            'deviceBrand': appConfig.deviceName,
            'deviceModel': device_info && device_info.model ? device_info.model : ""
        };

        analyticsMetaData.contentMetaData = {
            'channelId': custom_data.channelId ? custom_data.channelId: '',
            'channelName': custom_data.networkName ? custom_data.networkName: '',
            'programId': (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.id: '',
            'programName': shows_name ? shows_name : '',
            'genre': custom_data.subCategory ? custom_data.subCategory: '',
            'subCategory': custom_data.subCategory ? custom_data.subCategory: '',
            'contentType': videoContentType ? videoContentType : '',
            'CDNetwork': custom_data.networkName ? custom_data.networkName: '',
            'navigationFrom': '',
            'lang': (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.language) ? presentPagedetails.steamResponse.pageAttributes.language : '',
            'isSubscribed': (userDetails.packages.length > 0) ? 1 : 0, //if packages is avaialbe show 1 else 0
            'epgStartTime': '',
            'epgEndTime': '',
            'attribute1': custom_data ? JSON.stringify(custom_data) : '',
            'attribute2': myRecoForVideoraphy ? JSON.stringify(myRecoForVideoraphy) : '',
            'attribute3': '',
            'dataType' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.dataType : '',
            'dataKey' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.dataKey: '',
            'metaDataID'  : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.dataKey: '',
            'show_id' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.tvShowId) ? presentPagedetails.steamResponse.pageAttributes.tvShowId : '', //only for shows
            'show_name' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.tvShowName) ? presentPagedetails.steamResponse.pageAttributes.tvShowName : '', //only for shows
            'grouplistName' : custom_data.grouplistName?custom_data.grouplistName: "", //only for shows
            'languageCode' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.languageCode) ? presentPagedetails.steamResponse.pageAttributes.languageCode  : '',
            'genreCode' : (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.genreCode) ? presentPagedetails.steamResponse.pageAttributes.genreCode: ''

        };

        analyticsMetaData.userMetaData = {
            'userId': userDetails.userId ? userDetails.userId : '',
            'boxId': Main.getBOXID(),
            'partnerId': custom_data.networkId ? custom_data.networkId : '',
            'partnerName': custom_data.networkName ? custom_data.networkName: '',
            'masterpackage_name' : custom_data.masterPackageName ? custom_data.masterPackageName: '',
            'package_duration' :(presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.analyticsInfo) ? presentPagedetails.steamResponse.analyticsInfo.packageDuration: '',
            'package_type' : custom_data.packageType ? custom_data.packageType: '',
            'package_id' : custom_data.packageId ? custom_data.packageId: '',
            'profileId':currentUserDetails && currentUserDetails.isMasterProfile == false && currentUserDetails.profileId ? currentUserDetails.profileId : '',
        };

        analyticsMetaData.videoMetaData = {
            'autoplay': 'false', //live true if not false
            'videoList': '',
            'productName': 'vodafone-idea',
            'streamURL': (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.streams[0].url) ?presentPagedetails.steamResponse.streams[0].url : '',
            'seasonNumber': (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.seasonSeqNo) ? presentPagedetails.steamResponse.pageAttributes.seasonSeqNo : '',
            'episodeNumber': (presentPagedetails && presentPagedetails.steamResponse && presentPagedetails.steamResponse.pageAttributes.episodeSeqNo) ? presentPagedetails.steamResponse.pageAttributes.episodeSeqNo : '',
            'isPromotional': '',
            'vodNumber': ''
        };

        analytics.plugin.setMetaData(analyticsMetaData);
    } catch (e) {
        console.log(e.message);
    }
};


    
