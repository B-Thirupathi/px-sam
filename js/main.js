var locationApiRetryCount = 1;
var popupData = {};
var firstMenu = '';
var backData = [];
var presentPagedetails = {};
var view = '';
var currentWindow_Width = Yup(window).width();
var countryList;
var clickedMenu = {};
var commingFromMenus = true;
var tempScroll = 0;
var resetTimer;
var playreadyurl;
var isUserSignedOutinThisSession = true;
var analyticsData;
var locationData;
var staticPaths = ['search', 'signin', 'signup', 'countryCode', 'forgetPassword', 'otpVerification', 'signupOtpVerification', 'changePassword', 'accountDetails', 'signinSuccess'];
var intiLangSel = false;
var intiFilterSel = false;
var liveSubscribe;
var searchSubscribe;
var persistanceSubscribe;
var persistanceData = [];
var templateData = {};
var templateList;
var templateCode;
var templateCodeInfo = {};
var tokenSubscribe;
var isSearchLoad = true;
var isComingFromBanners = true;
var isStartOverBtn;
var secDataLen;
var prevActive;
var bgType;
var controlVisbletoken;
var comingFromSearch = false;
var seekToken = undefined;
var previousSeekposition;
var airmouseseek = undefined;
var switchProfilesOption;
var timeoutID;
var nextVidDetails = false;
var streamPollGlob = '';
var refreshFav = false;
var pollSessionExit = false;
var targetComingFromSign = false;
var refreshPage = false;
var comingFromTheSignin = false;
var tvDetails = false
var TemplateTimeoutId;
var playerSdksintializations = {
	sunSDK: false
}
var livePreview;
var hls = null;
var hasDynamicName = [];
var profilesPageAppeared = {
	profilesPageAppearedSource: '',
	profilesPagePageName: '',
	action: ''
}
var ybbPopUp = '';
var postpaidBillListener;
var currentUserDetails = '';
var comingFromTemplates = false; //for template to sunnxt api call, should not check template
// var mobileNum ="";
// var otpNum ="";
var myReco = {
	eventType: "Playback",
	eventName: "Played",
	userAgent: window.navigator.userAgent,
	network: "",
	appVersion: appConfig.staticSubVersion ? appConfig.staticSubVersion : "",
	device: "LGTV",
	value: "",
	trackingId: "",
	originSource: "AppOpen",
	originMedium: "carousel",
	contentPath: "",
	tabName: "",
	selectedAudioLanguage: "",
	carouselPosition: "",
	contentPosition: ""
};

var ctEvent = {
	originName: "",
	carouselPositionn: "",
	contentPositionss: "",
	tabName: "",
	currentTabName: "",
	carouselName: "",
	contentName: "",
	searchSource: "",
	sourceDetails: "",
	explbyName: "",
	youmayLike: "",
	topBanner: "",
	bannersObj: '',
	moduleTrackerId: '',
	itemForTrailer: '',
	comingFromExit: '',
	comingFromExitList: '',
	subtabName: ''
};

Yup.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	if (typeof systemConfigs !== 'undefined' && systemConfigs && systemConfigs.configs && systemConfigs.configs.isBoxIdRequiredInApi == "true") {
		if (options.url && options.url.indexOf("/service/api/auth/delink/device") === -1) {
			var boxId = (typeof Main !== 'undefined' && typeof Main.getBOXID === 'function') ? Main.getBOXID() : null;
			if (boxId) {
				var appendStr = "box_id=" + encodeURIComponent(boxId);
				options.url += (options.url.indexOf("?") !== -1 ? "&" : "?") + appendStr;
			}
		}
	}
});

Main.eventGenerate = function (keyCode) {
	var e = Yup.Event('keyup');
	e.which = keyCode;
	e.keyCode = keyCode;
	airMouse = true;
	var bannerAirmouse = true
	Main.processTrigger(e, bannerAirmouse);
}

Main.showSplash = function (loaderType) {
	view = "splash";
	Yup("#mainContent").css("display", "block");
	Yup("#mainContent").html(Util.splashHtml(loaderType));
}

Main.hideSplash = function () {
	Yup("#mainContent").hide();
}

Main.showArrows = function () {
	Yup("#leftArrow").fadeIn();
	Yup("#rightArrow").fadeIn();
	Yup("#upArrow").fadeIn();
	Yup("#downArrow").fadeIn();
	Yup("#backArrow").fadeIn();
}

Main.hideArrows = function () {
	Yup("#leftArrow").fadeOut();
	Yup("#rightArrow").fadeOut();
	Yup("#upArrow").fadeOut();
	Yup("#downArrow").fadeOut();
	Yup("#backArrow").fadeOut();
}

Main.ShowLoading = function () {
	try {
		isLoading = true;
		var el = document.getElementById("loading");
		if (!el) return;  // IGNORE if missing

		el.style.display = "block";
	} catch (e) {
		console.warn("ShowLoading error:", e);
	}
};


Main.HideLoading = function () {
	isLoading = false;   // always update state

	try {
		var el = document.getElementById("loading");
		if (!el) return;   // IGNORE if loader not present

		el.style.display = "none";
	} catch (e) {
		console.warn("HideLoading error:", e);
	}
};

Main.ShowSearchLoading = function () {
	document.getElementById("SearchLoading").style.display = "block";
	isSearchLoad = true;
}

Main.HideSearchLoading = function () {
	document.getElementById("SearchLoading").style.display = "none";
	isSearchLoad = false;
}

Main.playerShowLoading = function () {
	document.getElementById("playerLoading").style.display = "block";
}

Main.playerHideLoading = function () {
	document.getElementById("playerLoading").style.display = "none";
}

// Main.getBOXID = function () {
// 	if(utilities.validateString(Main.BOXID) == true){
// 		return Main.BOXID;
// 	}else if(utilities.validateString(utilities.getFromLocalStorage('boxId')) == true ) {
// 		Main.BOXID = utilities.getFromLocalStorage('boxId');
// 		return Main.BOXID;
// 	}else if (device.uuid) {
// 		Main.BOXID = device.uuid;
// 		utilities.setLocalStorage('boxId',device.uuid);
// 		return Main.BOXID;
// 	}else{
// 		try {
// 			var xhr = new XMLHttpRequest();
// 			var url = "http://www.yupptv.com/samsung/smarttvservice.aspx?tvmthod=gettoken&tvapi=12202011&tvdevid=16&tvpkid=1580&tvboxno=";
// 			xhr.open('GET', url, false);
// 			xhr.send();
// 			var tempxml = xhr.responseText;
// 			var parser = new DOMParser();
// 			var xmlDoc = parser.parseFromString(tempxml, "text/xml");
// 			var boxNo = xmlDoc.getElementsByTagName('boxno')[0].childNodes[0].nodeValue;
// 			Main.BOXID = boxNo;
// 			utilities.setLocalStorage('boxId',boxNo);
// 			return Main.BOXID;			
// 		} catch (e) {
// 			var boxNo = Math.random().toString(36).slice(2);
// 			Main.BOXID = boxNo;
// 			utilities.setLocalStorage('boxId',boxNo);
// 			return Main.BOXID;		
// 		}
// 	}	
// }
Main.getBOXID = function () {
	if (utilities.validateString(Main.BOXID) == true) {
		return Main.BOXID;
	} else if (
		utilities.validateString(utilities.getFromLocalStorage("boxId")) == true
	) {
		Main.BOXID = utilities.getFromLocalStorage("boxId");
		return Main.BOXID;
	} else {
		var boxNo = Math.random().toString(36).slice(2);
		Main.BOXID = boxNo;
		utilities.setLocalStorage("boxId", boxNo);
		return Main.BOXID;
	}
};
Main.getSessionID = function () {
	if (utilities.validateString(Main.sessionID) == true) {
		return Main.sessionID;
	} else if (utilities.validateString(utilities.getFromLocalStorage('sessionID')) == true) {
		Main.sessionID = utilities.getFromLocalStorage('sessionID');
		return Main.sessionID;
	} else {
		return '';
	}
}

Main.getSessionAPI = function (callbackData, callback) {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/get/token",
		type: "GET",
		data: {
			"tenant_code": Main.tenantCode,
			"box_id": Main.getBOXID(),
			"product": Main.productCode,
			"device_id": appConfig.APPID,
			"deviceName": appConfig.deviceName,
			"display_lang_code": "ENG",
			"device_sub_type": device_info && device_info.model ? device_info.model : "",
			'timezone': locationData.ipInfo.timezone,
			"ucv": "24",
			"client_app_version": appConfig.staticSubVersion,
		},
		success: function (data) {
			result = JSON.parse(data);
			if (result.status) {
				Main.sessionID = result.response.sessionId;
				utilities.setLocalStorage('sessionID', Main.sessionID);
				Main.countryCode = result.response.countryCode;
				utilities.setLocalStorage('countryCode', Main.countryCode);
				if (typeof callback === "function") {
					if (callbackData.type == 'config')
						callback();
					else if (callbackData.type == 'signin')
						callback(callbackData.force_login);
					else if (callbackData.type == 'apiCall')
						callback(callbackData.tragetPath);
					else
						callback();
				}
			} else {
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
				} else {
					Main.popupData = {
						popuptype: 'unknown',
						message: "Something Went Wrong, Please Try again Later.",
						buttonCount: 1,
						yesText: 'Try Again',
						yesTarget: 'tryAgainSession',
						onBack: 'exit',
						callbackData: callbackData,
						callback: callback
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
			}
		},
		error: function (errObj) {
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
			} else {
				Main.popupData = {
					popuptype: 'unknown',
					message: "Something Went Wrong, Please Try again Later.",
					buttonCount: 1,
					yesText: 'Try Again',
					yesTarget: 'tryAgainSession',
					onBack: 'exit',
					callbackData: callbackData,
					callback: callback
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			}
		},
		timeout: 60000
	});
}

Main.getLocation = function () {
	utilities.setDeviceInfo();
	Main.hideSplash();
	Main.ShowLoading();
	Yup.ajax({
		url: Main.locationApi + "/service/location/api/v1/locationinfo?tenant_code=" + Main.tenantCode + "&product=" + Main.productCode + "&client=tv",
		type: "GET",
		data: {},
		success: function (data) {
			result = JSON.parse(data);
			if (result) {
				locationData = result;
				var setLocationData = {};
				setLocationData = {
					'hbRate': result.analyticsInfo.hbRateInMillis / 2000 ? result.analyticsInfo.hbRateInMillis / 2000 : '',
					'authKey': result.analyticsInfo && result.analyticsInfo.authkey ? result.analyticsInfo.authkey : " ", // session-id
					'trueIp': result.ipInfo && result.ipInfo.trueIP ? result.ipInfo.trueIP : "", // Client ip
					'environment': 'live',
					'ClientID': '',
				}
				Main.country = result.ipInfo.country;
				localStorage.setItem("country", Main.country);
				Main.countryCode = result.ipInfo.countryCode;
				Main.city = result.ipInfo.city;
				Main.region = result.ipInfo.region;
				countryList = utilities.countryCodesList().response;
				for (var i = 0; i < countryList.length; i++) {
					if (Main.countryCode.trim() == countryList[i].code.trim()) {
						Main.countryFlag = countryList[i].iconUrl;
						Main.mobileCode = countryList[i].isdCode;
					}
				}
				localStorage.setItem("countryCode", Main.countryCode);
				Main.getConfig();
				// Main.getAppsystemFeature();
			} else {
				if (--locationApiRetryCount < 0) {
					locationApiRetryCount = 1;
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
							popuptype: 'unknown',
							message: "Something Went Wrong, Please Try again Later.",
							buttonCount: 1,
							yesText: 'Okay',
							yesTarget: 'exit',
							onBack: 'exit'
						}
						Yup("#popUpFDFS").html(Util.showPopup());
						Yup("#popup-btn-1").addClass('popupFocus');
					}
				} else {
					setTimeout(Main.getLocation(), 1000);
				}
			}
		},
		error: function (errObj) {
			if (--locationApiRetryCount < 0) {
				locationApiRetryCount = 1;
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
						popuptype: 'unknown',
						message: "Something Went Wrong, Please Try again Later.",
						buttonCount: 1,
						yesText: 'Okay',
						yesTarget: 'exit',
						onBack: 'exit'
					}

					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
					Main.HideLoading();
				}
			} else {
				setTimeout(Main.getLocation(), 1000);
			}
		},
		timeout: 60000
	});
}

Main.getUserInfo = function (comingFromSettings, comingFromRequestSignin) {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/user/info",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = JSON.parse(data);
			try {
				if (result.status == true) {
					if (result.response.attributes && result.response.attributes.template && result.response.attributes.template == "youbroadband_welcome_popup") {
						ybbPopUp = result.response.attributes.template
					}
					if (comingFromRequestSignin == true) {
						var userDetails = result.response
						localStorage.setItem("userDetails", JSON.stringify(userDetails));
						clevertapservice.sendCleverTapEvent('registration completed', {
							'mobile no': userDetails.phoneNumber,
							'source': ctEvent.tabName == "search" ? "search" : "carousel",
							'mode': "direct"
						})
						return;
					}
					utilities.settingUserData(result);
					var userDetails = result.response
					localStorage.setItem("userDetails", JSON.stringify(userDetails));
					if (comingFromSettings == false) {
						try {
							// window.removeEventListener('appcontrol');
							// window.addEventListener('appcontrol', deepLink);
							if (isUserSignedOutinThisSession == true) {
								isUserSignedOutinThisSession = false;
								if (switchProfilesOption != false) {
									var tempMenusList = presentPagedetails.menusList;
									presentPagedetails = {};
									presentPagedetails.view = view;
									presentPagedetails.targetPath = 'profile selection';
									presentPagedetails.view = 'switchProfile';
									presentPagedetails.menusList = tempMenusList;
									// if (!!currentUserDetails){
									// 	Main.hideMenu();
									// }
									localStorage.removeItem('currentUserDetails');
									view = 'switchProfile';
									var firstTimeLaunch = true
									//clevertapProfilepage appeared event
									profilesPageAppeared.profilesPageAppearedSource = 'launch'
									profilesPageAppeared.profilesPagePageName = 'profile selection'
									clevertapservice.profilePageEvent();
									Main.getProfileApi(firstTimeLaunch)
									// Yup('#menu-profile-name').html('');
									// Yup('#menu-profile-name').html(Util.menusProfile());
									// Main.apiCall(firstMenu);
								}
								else {
									Main.showMenu();
									Main.apiCall(firstMenu);
									Yup('#menu-profile-name').html('');
									Yup('#menu-profile-name').html(Util.menusProfile(result));
									clevertapservice.setUserSession();
									// Main.apiCall(firstMenu);
								}
							} else {
								deepLink();
							}
						} catch (e) {
							isUserSignedOutinThisSession = false;
							Main.showMenu();
							Main.apiCall(firstMenu);
							Yup('#menu-profile-name').html('');
							Yup('#menu-profile-name').html(Util.menusProfile());
						}
					} else {
						Main.getActivePackages();
					}
				} else if (view == 'splash' || view == 'signout' || view == "introPageView") {
					localStorage.removeItem('userDetails');
					localStorage.removeItem('currentUserDetails');
					localStorage.removeItem('selected_targetSign');
					view = "introPageView";
					presentPagedetails.view = view;
					// Main.apiCall('welcome');
					Main.showMenu();
					Main.apiCall(firstMenu);
				} else {
					view = "signin";
					Main.processNext();
				}
			} catch (e) {

			}
		},
		error: function (errObj, textStatus) {
			Main.HideLoading();
		},

		timeout: 60000
	});
}

Main.getConfig = function (comingFromSignOut) {
	Main.ShowLoading();
	if (Main.getSessionID() == '') {
		Main.getSessionAPI({ type: 'config' }, Main.getConfig);
	} else {
		Yup.ajax({
			url: Main.mainApi + "/service/api/v1/system/config",
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			success: function (data) {
				result = JSON.parse(data);
				if (result.status == true) {
					if ((view == "switchProfile" || view == "accountDetails" || view == "profileLockOtpVerification" || comingFromSignOut == true) && pollSessionExit != true) {
						if (systemConfigs.configs && systemConfigs.configs.exitPopupTemplate) {
							Main.getTemplateData(systemConfigs.configs.exitPopupTemplate);
						}
						comingFromSignOut = false
						systemConfigs = result.response;
						firstMenu = "home";
						ctEvent.tabName = "home";
						ctEvent.currentTabName = "home";
						utilities.enableMenus(systemConfigs.menus);
						Main.sideMenuHTML();
						Yup('.side-menu-item[menu-code="home_tv"]').addClass('menu-active');
						Yup('.top-menu-item').first().addClass('top-menu-active');
						Main.getAppsystemFeature();
						// Main.apiCall(firstMenu)
						return;
					}
					Main.getAppsystemFeature();
					var installItem = localStorage.getItem('installs')
					if (!installItem) {
						localStorage.setItem('installs', 'installs');

						// Set installs in localStorage
						// Check if installs is true in localStorage
						// if (localStorage.getItem('installs') === 'true') {
						clevertapservice.sendCleverTapEvent('Lg_Samsung_Installs', {
							"sdk version": appConfig.staticSubVersion,
							"OsVersion": device_info && device_info.OsVersion ? device_info.OsVersion : "",
							"tv_model": device_info && device_info.model ? device_info.model : "",
							"modelYearstr": device_info && device_info.modelYear ? device_info.modelYear : "",
							"userAgent": device_info && device_info.userAgent ? device_info.userAgent : "",
							"browserVersion": device_info && device_info.browserVersion ? device_info.browserVersion : "",
						});
					}
					// }	
					systemConfigs = result.response;
					firstMenu = "home";
					ctEvent.tabName = "home";
					ctEvent.currentTabName = "home";
					ctEvent.subtabName = "home";
					utilities.enableMenus(systemConfigs.menus);
					Main.sideMenuHTML();
					Yup('.side-menu-item[menu-code="home_tv"]').addClass('menu-active');
					Yup('.top-menu-item').first().addClass('top-menu-active');
					if (!Main.exitPopUpCallTemplate && systemConfigs.configs && systemConfigs.configs.exitPopupTemplate) {
						var comingFromLaunch = true
						Main.getTemplateData(systemConfigs.configs.exitPopupTemplate, "", "", "", comingFromLaunch);
					}
					Main.getUserInfo(false);
					Main.countryCodeList();
					analytics.load();
					Main.getTemplates();
					clevertapservice.sendCleverTapEvent('Lg_Samsung_Opens', {
						"sdk version": appConfig.staticSubVersion,
						"OsVersion": device_info && device_info.OsVersion ? device_info.OsVersion : "",
						"tv_model": device_info && device_info.model ? device_info.model : "",
						"modelYearstr": device_info && device_info.modelYear ? device_info.modelYear : "",
						"userAgent": device_info && device_info.userAgent ? device_info.userAgent : "",
						"browserVersion": device_info && device_info.browserVersion ? device_info.browserVersion : "",
					})
				} else if (result.status == false) {
					if (result.error.code == 401) {
						Main.getSessionAPI({ type: 'config' }, Main.getConfig);
					} else {
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
						} else {
							Main.popupData = {
								popuptype: 'unknown',
								message: "Something Went Wrong, Please Try again Later.",
								buttonCount: 1,
								yesText: 'Try Again',
								yesTarget: 'tryAgainConfig',
								onBack: 'exit'
							}
							Yup("#popUpFDFS").html(Util.showPopup());
							Yup("#popup-btn-1").addClass('popupFocus');
						}
					}
				}
			},
			error: function (errObj) {
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
				} else {
					Main.popupData = {
						popuptype: 'unknown',
						message: "Something Went Wrong, Please Try again Later.",
						buttonCount: 1,
						yesText: 'Try Again',
						yesTarget: 'tryAgainConfig',
						onBack: 'exit'
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
			},
			timeout: 60000
		});
	}
}

Main.getAppsystemFeature = function () {
	Main.ShowLoading();
	if (Main.getSessionID() == '') {
		Main.getSessionAPI({ type: 'feature' }, Main.getAppsystemFeature);
	} else {
		Yup.ajax({
			url: Main.mainApi + "/service/api/v1/system/feature",
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			success: function (data) {
				result = JSON.parse(data);
				if (result.status == true) {
					systemFeatures = result.response.systemFeatures;
					Main.systemFeatures = systemFeatures;
					switchProfilesOption = systemFeatures.userprofiles &&
						systemFeatures.userprofiles.fields &&
						typeof systemFeatures.userprofiles.fields.is_userprofiles_supported === "string"
						? JSON.parse(systemFeatures.userprofiles.fields.is_userprofiles_supported)
						: systemFeatures.userprofiles.fields.is_userprofiles_supported || false;
					localStorage.setItem("systemFeature", JSON.stringify(Main.systemFeatures));
				} else if (result.status == false) {

				}
			},
			error: function (errObj) {
				Main.HideLoading();
			},
			timeout: 60000
		});
	}
}


function deepLink() {
	Main.ShowLoading();
	var requestedAppControl = tizen.application.getCurrentApplication().getRequestedAppControl();
	var appControlData;
	var actionData;

	if (requestedAppControl) {
		appControlData = requestedAppControl.appControl.data;

		for (var i = 0; i < appControlData.length; i++) {
			if (appControlData[i].key == 'PAYLOAD') {
				actionData = JSON.parse(appControlData[i].value[0]).values;
				break;
			}
		}
		if (actionData) {
			var clickOn = JSON.parse(actionData).path;
			if (clickOn) {
				Main.HideLoading();
				Main.apiCall(clickOn);
			} else {
				Main.HideLoading();
				Main.apiCall(firstMenu);
			}
		}
		else {
			Main.HideLoading();
			Main.apiCall(firstMenu);
		}


	} else {
		Main.HideLoading();
		Main.apiCall(firstMenu);
	}
}


Main.countryCodeList = function () {
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/get/country",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				if (result.response.length > 0) {
					countryList = result.response;
					for (var i = 0; i < countryList.length; i++) {
						if (Main.countryCode.trim() == countryList[i].code.trim()) {
							Main.countryFlag = countryList[i].iconUrl;
							Main.mobileCode = countryList[i].isdCode;
						}
					}
				}
			} else if (result.status == false) {
				if (result.error.code == 401) {
					Main.getSessionAPI({ type: 'config' }, Main.getConfig);
				}
			}
		},
		error: function (errObj) {
		},
		timeout: 60000
	});
}

Main.signDeepCall = function (firstMenu, targetPath, callback) {
	var id = Yup('.imageFocus').attr("id");
	Yup('.mouseFocus').removeClass('mouseFocus');
	//tempObjectData = {};
	if (Main.getSessionID() == '') {
		Main.getSessionAPI({ type: 'apiCall', 'tragetPath': firstMenu }, Main.apiCall);
	}
	else {
		if (utilities.validateString(firstMenu) == true) {
			Main.ShowLoading();
			var headerJ = {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			};
			var count = (firstMenu.indexOf('section/') > -1) ? 24 : 10;
			try {
				Yup.ajax({
					url: Main.mainApi + "/service/api/v1/page/content?path=" + firstMenu + "&count=" + count,
					type: 'GET',
					headers: headerJ,

					success: function (data) {
						var result = JSON.parse(data);
						if (result.status == true) {
							Main.apicallResponse(result, firstMenu, id);
							if (callback && typeof callback === "function") {
								callback();
							}
						}
					},
					error: function (errObj) {
						Main.HideLoading();
						utilities.responseErrorCheck(errObj);
					},
					timeout: 60000
				});
			} catch (error) {
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
					utilities.genricPopup('Something Went Wrong', 'unknown');
				}
			}

		} else {
			utilities.genricPopup('Content you are looking for is not found', 'noData');
		}
	}
}
Main.exitPopUpCallTemplateData = function (targetPath, templateCodename, comingFromLaunch) {
	Main.ShowLoading();
	if (utilities.validateString(firstMenu) == true) {
		Main.ShowLoading();
		var headerJ = {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		};
		var count = (targetPath.indexOf('section/') > -1) ? 24 : 10;
		try {
			Yup.ajax({
				url: Main.mainApi + "/service/api/v1/page/content?path=" + targetPath + "&count=" + count,
				type: 'GET',
				headers: headerJ,

				success: function (data) {
					var result = JSON.parse(data);
					if (result.status == true) {
						Main.exitPopupDataCards = result.response
					}
				},
				error: function (errObj) {
					Main.HideLoading();
					utilities.responseErrorCheck(errObj);
				},
				timeout: 60000
			});
		} catch (error) {
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
				utilities.genricPopup('Something Went Wrong', 'unknown');
			}
		}

	} else {
		utilities.genricPopup('Content you are looking for is not found', 'noData');
	}
	if ((!!comingFromLaunch && comingFromLaunch == true) || (presentPagedetails && presentPagedetails.contentNotFound == true)) {
		comingFromLaunch = false
		Main.HideLoading();
	}
}
Main.apiCall = function (targetPath, comingFromTemplates, comingFromSignOut, dontAddNewSection, comingFromPlayerSections, callback) {
	if (typeof comingFromTemplates === 'function') {
		callback = comingFromTemplates;
		comingFromTemplates = undefined;
	}
	if (!!targetPath && targetPath == firstMenu) {
		ctEvent.tabName = targetPath
		ctEvent.currentTabName = targetPath
		ctEvent.subtabName = targetPath
	}

	Main.ShowLoading();
	var id = Yup('.imageFocus').attr("id");
	Yup('.mouseFocus').removeClass('mouseFocus');
	//tempObjectData = {};
	if (Main.getSessionID() == '') {
		Main.getSessionAPI(
			{ type: 'apiCall', targetPath: targetPath },
			function (path) {
				if (comingFromSignOut) {
					Main.getConfig(comingFromSignOut);
					setTimeout(function () {
						console.log("API Call Path:", path);
						Main.apiCall(targetPath, "", comingFromSignOut);
					}, 100); // Small delay to ensure config is set
				} else {
					Main.apiCall(path, comingFromTemplates, comingFromSignOut);
				}
			}
		);
	}

	else {
		if (utilities.validateString(targetPath) == true) {
			var headerJ = {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			};
			if (targetPath == "search") {
				var count = 30
			}
			else {
				var count = (targetPath.indexOf('section/') > -1) ? 24 : 10;
				if (targetPath.indexOf('tvshow/') > -1) {
					var count = 30;
				}
			}

			try {
				Yup.ajax({
					url: Main.mainApi + "/service/api/v1/page/content?path=" + targetPath + "&count=" + count,
					type: 'GET',
					headers: headerJ,

					success: function (data) {
						var result = JSON.parse(data);
						if (result.status == true) {
							keyHandlar.stopPreviewTrailers();
							if (result.response && result.response.data) {
								var arLength = result.response.data.length
								for (var i = 0; i < arLength; i++) {
									var secData = result.response.data[i];
									var section = secData ? section : '';
									if (section && section.sectionInfo && section.sectionInfo.params &&
										section.sectionInfo.params.hasDynamicName === "true") {
										hasDynamicName.push(secData ? contentCode : "");
									}
								}
							}
							if (result.response.info.attributes.json != undefined && result.response.info.attributes.json != null) {
								if (typeof targetComingFromSign !== 'undefined' && targetComingFromSign == true) {
									Yup("#mainContent").html('');
								}
								jsonUrl = result.response.info.attributes.json;
								var cardPlayTarget = targetPath
								var clickedCardForPostPaid = cardPlayTarget
								localStorage.setItem('clickedCardForPostPaid', clickedCardForPostPaid)
								targetPath = jsonUrl.replace(/@/g, ':');
								// view = "plansUpgrade"
								var userDetails = JSON.parse(localStorage.getItem('userDetails'));
								if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "SECONDARY") {
									if (view == "player") {
										Main.addToPlansPostPaid(targetPath, undefined, undefined, function () {
											Main.previousPage(); // runs only after API completes (success or error)
										});
									}
									else {
										Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
									}
								}
								else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userStatus.toUpperCase() == "SUSPENDED") {
									if (view == "player") {
										Main.addToPlansPostPaid(targetPath, undefined, undefined, function () {
											Main.previousPage(); // runs only after API completes (success or error)
										});
									}
									else {
										if (targetComingFromSign == true) {
											backData = [];
											
											Main.signDeepCall(firstMenu, targetPath, function () {
												Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
											});
										} else {
											Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
										}
									}
								}
								else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "COCP") {
									if (view == "player") {
										Main.addToPlansPostPaid(targetPath, undefined, undefined, function () {
											Main.previousPage(); // runs only after API completes (success or error)
										});
									}
									else {
										if (targetComingFromSign == true) {
											backData = [];
											// targetComingFromSign = false;
											Main.signDeepCall(firstMenu, targetPath, function () {
												Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
											});
										} else {
											Main.addToPlansPostPaid("carousel", comingFromSwitchProfile, targetPath);
										}
									}
								}
								else if (userDetails && userDetails.userCategory == 2) {
									if (result.response.info.attributes.exclusiveContentTag != undefined && result.response.info.attributes.exclusiveContentTag != null && result.response.info.attributes.exclusiveContentTag == "FIFA") {
										if (targetComingFromSign == true) {
											backData = [];
											// targetComingFromSign = false;
											Main.signDeepCall(firstMenu, targetPath, function () {
												Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
											});
										} else {
											Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
										}
									}
									else {
										var clickedCardForPostPaid = cardPlayTarget
										localStorage.setItem('clickedCardForPostPaid', clickedCardForPostPaid)
										ctEvent.carouselName = '';
										if (view == "switchProfile") {
											var comingFromSwitchProfile = true;
											if (targetComingFromSign == true) {
												backData = [];
												// targetComingFromSign = false;
												Main.signDeepCall(firstMenu, targetPath, function () {
													Main.addToPlansPostPaid("carousel", comingFromSwitchProfile);
												});
											} else {
												Main.addToPlansPostPaid("carousel", comingFromSwitchProfile);
											}
										}
										else {
											if (targetComingFromSign == true) {
												backData = [];
												// targetComingFromSign = false;
												Main.signDeepCall(firstMenu, targetPath, function () {
													presentPagedetails.comingFromSwitchProfile = true;
													Main.addToPlansPostPaid("carousel", true);
												});
											} else {
												Main.addToPlansPostPaid("carousel");
											}
										}
									}
								}
								else {
									if (view == "player") {
										Main.addToPlansPostPaid(targetPath, undefined, undefined, function () {
											Main.previousPage(); // runs only after API completes (success or error)
										});
									}
									else {
										if (targetComingFromSign == true) {
											backData = [];
											// targetComingFromSign = false;
											Main.signDeepCall(firstMenu, targetPath, function () {
												Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
											});
										} else {
											Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
										}
									}
								}
							}
							else if (result.response.info.attributes.template != undefined && result.response.info.attributes.template != null && (comingFromTemplates == false || comingFromTemplates == undefined)) {
								var templatePath = result.response.info.attributes.template;
								for (var i = 0; i < templateList.length; i++) {
									if (templatePath == templateList[i].code) {
										templateCodeInfo = templateList[i];
										break;
									}
								}
								templateCodename = templatePath
								if (targetComingFromSign == true) {
									backData = []
									targetComingFromSign = false
									Main.signDeepCall(firstMenu, targetPath, function () {
										Main.getTemplateData(templateCodename, targetPath);
									})
								}
								else {
									Main.getTemplateData(templateCodename, targetPath)
								}
							}
							else if (targetPath != 'welcome') {
								Main.apicallResponse(result, targetPath, id, dontAddNewSection, comingFromPlayerSections);
								if (typeof callback === 'function') {
									callback();
								}
							}
							else {
								Main.HideLoading();
								Yup("#mainContent").html('');
								Yup("#mainContent").append(Util.introPageView(result));
								Yup("#mainContent").show();
							}
							comingFromTemplates = false
						} else {
							Main.HideLoading();
							if (targetPath != 'welcome') {
								if (result.error && (result.error.code == 401 || result.error.code == 500)) {
									if (presentPagedetails.view == 'player') {
										analytics.plugin.handlePlayEndedByUser();
										try {
											video.pause();
											video.stop();
											video.unsetListener();
										}
										catch (e) { }
									}
									Main.SessionID = '';
									utilities.setLocalStorage('sessionID', '');
									if (Main.userProfile.userStatus == true) {
										utilities.resetUserData();
										Main.popupData = {
											popuptype: 'sessionLogout',
											headerTitle: result.error.message,
											message: result.error.details.description,
											buttonCount: 1,
											yesText: 'Okay',
											yesTarget: 'sessionLogout',
											onBack: 'sessionLogout',
										}
										Yup("#popUpFDFS").html(Util.showPopup());
										Yup("#popup-btn-1").addClass('popupFocus');
										userDetails = ''
										localStorage.removeItem('userDetails');
										localStorage.removeItem('currentUserDetails');
										localStorage.removeItem('selected_targetSign');
									} else { //automatic session retrive when session expires				
										Main.getSessionAPI({ type: 'apiCall', 'tragetPath': targetPath }, Main.apiCall);
									}
								}
								else if (checknetworkType == false) {
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
								} else if (result.error && result.error.message && (result.error.code == 404 || result.error.code == -16 || targetComingFromSign == true)) {
									if (view == "switchProfile" || targetComingFromSign == true) {
										backData = [];
										targetComingFromSign = false;
										Main.signDeepCall(firstMenu, targetPath, function () {
											utilities.genricPopup(result.error.message, 'noData');
										});
									} else {
										utilities.genricPopup(result.error.message, 'noData');
										targetComingFromSign = false;
									}
								}
								else if (result.error && result.error.message) {
									utilities.genricPopup(result.error.message, 'info');
								} else {
									utilities.genricPopup('Something Went Wrong', 'unknown');
								}
							}
							else {
								Yup("#mainContent").html('');
								Yup("#mainContent").append(Util.introPageView(result));
								Yup("#mainContent").show();
							}
						}
					},
					error: function (errObj) {
						Main.HideLoading();
						utilities.responseErrorCheck(errObj);
					},
					timeout: 60000
				});
			} catch (error) {
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
					utilities.genricPopup('Something Went Wrong', 'unknown');
				}
			}

		} else {
			Main.HideLoading();
			utilities.genricPopup('Content you are looking for is not found', 'noData');
		}
	}
}

Main.contentPatner = function (targetPath, sunPartner) {
	var comingFromPartner = true
	Main.myRecoApi(myReco, comingFromPartner);
	Main.HideLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	try {
		Yup.ajax({
			url: Main.mainApi + "/service/api/v1/page/deeplink?path=" + targetPath,
			type: 'GET',
			headers: headerJ,
			success: function (data) {
				var result = JSON.parse(data);
				//var hotCode = result.response.contentCode.match(/\d+/)[0];
				if (result.status == true) {
					Main.HideLoading();
					if (sunPartner == true) {
						sunPartner = false
						return
					}
					console.log("contentPatner came")
					var contentTgId = result.response.contentCode;
					var cpName = result.response.partnerCode
					if (cpName == "zee5") {
						var launchId = "com.zee5.app"
						var failQuery = 'category/GAME_APPS/com.zee5.app'
						var tagUrl = result.response.contentCode;
					}
					else if (cpName == "hotstar") {
						var launchId = "hotstar"
						var failQuery = 'category/GAME_APPS/hotstar'
						var tagUrl = result.response.contentCode

					}
					else if (cpName == "fancode") {
						var launchId = "com.fancode.app.streaming"
						var failQuery = 'category/GAME_APPS/com.fancode.app.streaming'
						var tagUrl = result.response.contentCode
					}
					clevertapservice.sendCleverTapEvent('app in app click', {
						'content partner name': presentPagedetails.attributes && presentPagedetails.attributes.networkName ? presentPagedetails.attributes && presentPagedetails.attributes.networkName : "",
						'content name': presentPagedetails.attributes && presentPagedetails.attributes.contentName ? presentPagedetails.attributes && presentPagedetails.attributes.contentName : "",
						'genre': presentPagedetails.attributes && presentPagedetails.attributes.genre ? presentPagedetails.attributes && presentPagedetails.attributes.genre : "",
						'languages': presentPagedetails.attributes && presentPagedetails.attributes.language ? presentPagedetails.attributes && presentPagedetails.attributes.language : "",
						'content type': presentPagedetails.attributes && presentPagedetails.attributes.contentType ? presentPagedetails.attributes && presentPagedetails.attributes.contentType : "",
						'show name': presentPagedetails.attributes && presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes && presentPagedetails.attributes.tvShowName : "",
						'source': (presentPagedetails.navigationFrom == "player") ? 'player recommendations' : (presentPagedetails.navigationFrom == "seasonsDetails") ? 'browse episodes' : (presentPagedetails.navigationFrom == "search") ? "search" : 'carousel',
						'source details': "",
						'sub source details': "",
						'content model': presentPagedetails.attributes && presentPagedetails.attributes.payType === "P" ? "svod" : (presentPagedetails.attributes && presentPagedetails.attributes.payType === "F" || presentPagedetails.attributes && presentPagedetails.attributes.payType === "L") ? "avod" : "",
						'content tag': presentPagedetails.attributes && presentPagedetails.attributes.payType === "P" ? 'paid' : 'free',
						'content position': ctEvent.contentPositionss ? ctEvent.contentPositionss : "",
						'carousel position': ctEvent.carouselPositionn ? ctEvent.carouselPositionn : "",
						'module tracking id': ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
						'tab': ctEvent.tabName ? ctEvent.tabName : "",
						'tv show name': presentPagedetails.attributes && presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes && presentPagedetails.attributes.tvShowName : "",
						'filter': ""
					})
					//var href = 'hostar'; // Use the Hotstar app ID here
					// var url = "https://livingroom.hotstar.com/" + hotCode + "/watch";
					webOSDev.launch({
						id: launchId,
						params: {
							tagId: tagUrl,
							contentId: contentTgId
						},
						onSuccess() {
							//Handler for successful launch
						},
						onFailure() {
							var request = webOS.service.request('luna://com.webos.applicationManager', {
								method: 'launch',
								parameters: {
									id: 'com.webos.app.discovery',
									params: {
										query: failQuery
									}
								},
								onSuccess: function (response) {
									console.log("App Store launched successfully:", response);
								},
								onFailure: function (error) {
									console.log("Failed to launch App Store:", error);
								}
							});
						},
					});
				} else {
					Main.HideLoading();
					utilities.genricPopup(result.error.message, 'info');
				}
			},
			error: function (errObj) {
				Main.HideLoading();
				utilities.responseErrorCheck(errObj);
			},
			timeout: 60000
		});
	} catch (error) {
		Main.HideLoading();
		utilities.genricPopup('Something Went Wrong', 'unknown');
	}
}
// window.addEventListener('focus', function () {
// 	console.log('App has regained focus');
// 	if (view == "player") {
// 		if (presentPagedetails.steamResponse.streams.length > 0) {
// 			//  if(Yup('.imageFocus').hasClass('player_play')){
//             //     Yup('.imageFocus').removeClass('player_play');
//             //     Yup('.imageFocus').addClass('player_pause');
//             // }
//             // else{
//             //     Yup('.imageFocus').removeClass('player_pause');
//             //     Yup('.imageFocus').addClass('player_play');
//             // }
//             ShakaPlayer.playOrPause();
// 		}
// 	}
// });
Main.apicallResponse = function (result, targetPath, id, dontAddNewSection, comingFromPlayerSections) {
	Main.playerHideLoading();
	var responseArray = {};
	var targetClickedath = targetPath
	//target Path
	responseArray.targetPath = targetPath;
	//search
	responseArray.searchBar = false;
	if (targetPath == firstMenu) {
		responseArray.searchBar = true;
		responseArray.pageSubType = 'home';
	}
	//pageType
	if (result.response.info) {
		if (result.response.info.pageType == 'details') {
			if (result.response.info.attributes && result.response.info.attributes.contentType && result.response.info.attributes.contentType == 'network') {
				responseArray.pageType = 'content';
				responseArray.pageSubType = 'networkDetails';
				responseArray.view = 'content';
				if (result && result.response && result.response.info && result.response.info.code) {
					responseArray.cpPartnerCode = result.response.info.code;
				}
			}
			else if (result.response.info.attributes && result.response.info.attributes.contentType && result.response.info.attributes.contentType == 'movie') {
				responseArray.pageType = 'details';
				responseArray.pageSubType = 'movieDetails';
				responseArray.view = 'movieDetails';
			}
			else if (result.response.info.attributes && result.response.info.attributes.contentType && (result.response.info.attributes.contentType == 'tvshowdetails' || result.response.info.attributes.contentType == 'grouplist_details')) {
				responseArray.pageType = 'details';
				responseArray.pageSubType = 'tvshowDetails';
				responseArray.view = 'tvshowDetails';
			}
			else if (result.response.info.attributes && result.response.info.attributes.contentType && (result.response.info.attributes.contentType == 'channel' || result.response.info.attributes.contentType == 'epgseriesdetails')) {
				responseArray.pageType = 'details';
				responseArray.pageSubType = 'channelDetails';
				responseArray.view = 'channelDetails';
			}
			else if (result.response.info.attributes && result.response.info.attributes.contentType && (result.response.info.attributes.contentType == 'channel' || result.response.info.attributes.contentType == 'tvshowSeasondetails')) {
				responseArray.pageType = 'details';
				responseArray.pageSubType = 'seasonDetails';
				responseArray.view = 'seasonsDetails';
			}
			else {
				responseArray.pageType = 'details';
				responseArray.pageSubType = 'movieDetails';
				responseArray.view = 'movieDetails';
			}
		} else if (result.response.info.pageType == 'list') {
			responseArray.pageType = 'list';
			responseArray.view = 'list';
		} else if (result.response.info.pageType == 'player' && result.response.info.attributes && result.response.info.attributes.playerType == 'trailer') {
			responseArray.pageType = 'player';
			responseArray.view = 'player';
			if (result.response.streamStatus) {
				if (result.response.streamStatus.trailerStreamStatus == false) {
					if (result.response.streamStatus.errorCode == -1000) {
						view = "signin";
						Main.processNext();
						return;
					}
					else if (result.response.streamStatus.errorCode == -4 || result.response.streamStatus.errorCode == -3 || result.response.streamStatus.errorCode == 402) {
						Main.HideLoading();
						if (result.response.streamStatus.errorCode == 402) {
							//utilities.detailsPagePopupDetails("Please go to '" + systemConfigs.configs.siteURL + "'  to buy  packages", 'Subscribe', 'info');
							view = "noPackageView";
							Main.processNext();
						} else {
							utilities.genricPopup(result.response.streamStatus.message, (result.response.streamStatus.errorCode == -3) ? 'noStream' : 'noData');
						}
						return;
					}
					else if (result.response.streamStatus.errorCode == -14) {
						//verify mobitle number after signin
						Main.HideLoading();
						Main.popupData = {
							popuptype: 'info',
							message: result.response.streamStatus.message,
							buttonCount: 1,
							yesText: 'Verify',
							yesTarget: 'gotoMobileVerification',
							onBack: 'close'
						}
						Yup("#popUpFDFS").html(Util.showPopup());
						Yup("#popup-btn-1").addClass('popupFocus');
						return;
					} else {
						//unknown error
					}
				} else {
					responseArray.hasStreamAccess = true;
					responseArray.streamStatus = result.response.streamStatus;
					responseArray.adUrlResponse = result.response.adUrlResponse

				}
			}
		} else if (result.response.info.pageType == 'player') {
			responseArray.pageType = 'player';
			responseArray.view = 'player';
			if (result.response.streamStatus) {
				if (result.response.streamStatus.hasAccess == false) {
					//backData.pop();
					if (result.response.streamStatus.errorCode == -1000) {
						//clevertapProfilepage appeared event
						profilesPageAppeared.profilesPageAppearedSource = "content click"
						profilesPageAppeared.profilesPagePageName = 'number submission'
						view = "signin";
						Main.processNext();
						return;
					}
					else if (result.response.streamStatus.errorCode == -4 || result.response.streamStatus.errorCode == -3 || result.response.streamStatus.errorCode == 402) {
						Main.HideLoading();
						if (result.response.streamStatus.errorCode == 402) {
							//utilities.detailsPagePopupDetails("Please go to '" + systemConfigs.configs.siteURL + "'  to buy  packages", 'Subscribe', 'info');
							view = "noPackageView";
							Main.processNext();
						} else {
							utilities.genricPopup(result.response.streamStatus.message, (result.response.streamStatus.errorCode == -3) ? 'noStream' : 'noData');
						}
						return;
					}
					else if (result.response.streamStatus.errorCode == -14) {
						//verify mobitle number after signin
						Main.HideLoading();
						Main.popupData = {
							popuptype: 'info',
							message: result.response.streamStatus.message,
							buttonCount: 1,
							yesText: 'Verify',
							yesTarget: 'gotoMobileVerification',
							onBack: 'close'
						}
						Yup("#popUpFDFS").html(Util.showPopup());
						Yup("#popup-btn-1").addClass('popupFocus');
						return;
					} else {
						//unknown error
					}
				} else {
					responseArray.hasStreamAccess = true;
					responseArray.streamStatus = result.response.streamStatus;
					responseArray.adUrlResponse = result.response.adUrlResponse

				}
			}
		} else if (result.response.info.pageType == 'content' && result.response.banners.length <= 0 && result.response.info.attributes && Object.keys(result.response.info.attributes).length === 0 && result.response.info.code != "kids" && result.response.info.code != "sports" && result.response.info.code != "favourites") {
			responseArray.pageType = 'content';
			responseArray.pageSubType = 'networkDetails';
			responseArray.view = 'content';
		}
		else {
			var cardType = Yup('.imageFocus').attr("cardType");
			if (presentPagedetails.targetPath == "sports" && cardType == 'square_poster') {
				responseArray.pageSubSubtype = 'sportsList';
			}
			else {
				responseArray.pageSubSubtype = '';
			}
			responseArray.pageType = 'content';
			responseArray.view = 'content';
		}
	}


	//banners
	if (result.response.banners) {
		var responseBanners = [];
		for (var i = 0; i < result.response.banners.length; i++) {
			if (result.response.banners[i].target.path != 'packages' || result.response.banners[i].target.path != 'pricing' || result.response.banners[i].target.path != 'package') {
				responseBanners.push(result.response.banners[i])
			}
		}
		responseArray.banners = responseBanners;
	}
	//page buttons
	responseArray.pageButtons = result.response.pageButtons;
	responseArray.tabsInfo = result.response.tabsInfo;

	// page Info Attributes 
	responseArray.attributes = result.response.info.attributes;
	//menus
	// var menusList = [];	
	// for(var i=0; i<systemConfigs.menus.length ; i++ ){

	// 	if(systemConfigs.menus[i].code != '' && systemConfigs.menus[i].code != 'packages' && systemConfigs.menus[i].code != 'package' && systemConfigs.menus[i].code != 'pricing' && systemConfigs.menus[i].code != 'schedule' && systemConfigs.menus[i].code != 'search'){
	// 		// if(systemConfigs.menus[i].code == 'my_library'){
	// 		// 	if(appConfig.enableMyLibrary == true)
	// 		// 		menusList.push(systemConfigs.menus[i])	
	// 		// }
	// 		// else{
	// 			menusList.push(systemConfigs.menus[i]);
	// 			if(result.response.info.pageType != 'details'){
	// 			Main.sideMenuHTML();
	// 			}
	// 		//}				
	// 	}

	// }	
	// responseArray.menusList = menusList;
	if (clickedMenu && clickedMenu.targetPath && responseArray.targetPath == firstMenu) {
		responseArray.backFocus = clickedMenu;
	}


	//sections
	if (result.response.data) {
		var responseSections = [];
		var paginationSections = [];
		var paginationSectionsData = [];
		var responseContent = [];
		var viewAllshow = systemConfigs.configs && systemConfigs.configs.showViewallLastindexMinimumValue ? systemConfigs.configs.showViewallLastindexMinimumValue : 9;
		for (var i = 0; i < result.response.data.length; i++) {
			if (responseArray.pageSubType == "tvshowDetails") {
				if (result.response.data[i].paneType == 'content') {
					responseContent.push(result.response.data[i].content);
				}
				// if(result.response.data[i].paneType == 'section' && result.response.data[i].contentCode == "you-may-also-like" || result.response.data[i].contentCode == "you-may-also-like-tvshows" || result.response.data[i].contentCode == "grouplist_recommendations" || result.response.data[i].contentCode == "recommendations"){
				if (result.response.data[i].paneType == 'section') {
					var sec = result.response.data[i].section;
					var sInfo = (sec && sec.sectionInfo) ? sec.sectionInfo : sec;
					var sData = (sec && sec.sectionData) ? sec.sectionData : sec;
					var sControls = (sec && sec.sectionControls) ? sec.sectionControls : sec;

					if (!!sec && (sData.data.length > 0 || (sInfo && sInfo.sectionPresentation == "tabbed_display"))) {
						if (sData.data.length > viewAllshow && sControls.showViewAll == true && responseArray.pageType != 'player') {
							sControls.showViewAll = true;
							sControls.dataLength = sData.data.length + 1;
						} else {
							sControls.showViewAll = false;
							sControls.dataLength = (sInfo && sInfo.sectionPresentation == "tabbed_display" && sData.data.length == 0) ? 1 : sData.data.length;
						}
						responseSections.push(sec);
					}
					else if (!!sec && sData.hasMoreData == true) {
						paginationSections.push(sInfo.code);
						paginationSectionsData.push(sec);
					}
				}
			}
			else if (responseSections.length == 0 && responseArray.pageType == "player" && result.response.data[i].paneType == 'section' && result.response.data[i].contentCode == "you-may-also-like" || result.response.data[i].contentCode == "you-may-also-like-tvshows" || result.response.data[i].contentCode == "grouplist_recommendations" || result.response.data[i].contentCode == "recommendations") {
				var sec = result.response.data[i].section;
				var sInfo = (sec && sec.sectionInfo) ? sec.sectionInfo : sec;
				var sData = (sec && sec.sectionData) ? sec.sectionData : sec;
				var sControls = (sec && sec.sectionControls) ? sec.sectionControls : sec;

				if (!!sec && sInfo.code == 'continue_watching') {
					responseArray.isContinueWatchingavailable = true;
				}
				if (!!sec && (sData.data.length > 0 || responseArray.pageSubType == "seasonDetails" || sInfo.sectionPresentation == "tabbed_display")) {
					if (sData.data.length > viewAllshow && sControls.showViewAll == true && responseArray.pageType != 'player') {
						sControls.showViewAll = true;
						sControls.dataLength = sData.data.length + 1;
					} else {
						sControls.showViewAll = false;
						sControls.dataLength = (sInfo.sectionPresentation == "tabbed_display" && sData.data.length == 0) ? 1 : sData.data.length;
					}
					responseSections.push(sec);
				}
				else if (!!sec && sData.hasMoreData == true) {
					paginationSections.push(sInfo.code);
					paginationSectionsData.push(sec);
				}
			}
			// if(result.response.data[i].paneType == 'content'){
			// 	responseContent.push(result.response.data[i].content);
			// }
			// if(result.response.data[i].paneType == 'specialcontent'){

			// 	if(result.response.data[i].specialContent.code=='tvguide'){
			// 		// responseArray.pageType= 'tvguide';
			// 		// responseArray.view = 'tvguide';			
			// 	}
			// }
			// }

			else {
				if (result.response.data[i].paneType == 'section') {
					var sec = result.response.data[i].section;
					var sInfo = (sec && sec.sectionInfo) ? sec.sectionInfo : sec;
					var sData = (sec && sec.sectionData) ? sec.sectionData : sec;
					var sControls = (sec && sec.sectionControls) ? sec.sectionControls : sec;

					if (!!sec && sInfo.code == 'continue_watching') {
						responseArray.isContinueWatchingavailable = true;
					}
					if (!!sec && (sData.data.length > 0 || responseArray.pageSubType == "seasonDetails" || sInfo.sectionPresentation == "tabbed_display")) {
						if (sData.data.length > viewAllshow && sControls.showViewAll == true && responseArray.pageType != 'player') {
							sControls.showViewAll = true;
							sControls.dataLength = sData.data.length + 1;
						} else {
							sControls.showViewAll = false;
							sControls.dataLength = (sInfo.sectionPresentation == "tabbed_display" && sData.data.length == 0) ? 1 : sData.data.length;
						}
						if (responseArray.pageType == "player") {
							// if (responseSections.length == 0) {
							responseSections.push(sec);
							// }
						} else {
							responseSections.push(sec);
						}
					}
					else if (!!sec && sData.hasMoreData == true) {
						paginationSections.push(sInfo.code);
						paginationSectionsData.push(sec);
					}
				}
				if (result.response.data[i].paneType == 'content') {
					responseContent.push(result.response.data[i].content);
				}
				if (result.response.data[i].paneType == 'specialcontent') {

					if (result.response.data[i].specialContent.code == 'tvguide') {
						// responseArray.pageType= 'tvguide';
						// responseArray.view = 'tvguide';			
					}
				}
			}
		}
		if (responseArray.pageType == 'list' && !!result.response.data[0].section) {
			responseArray.listTitle = result.response.data[0].section.sectionInfo.name;
		}

		// Reverse the sections on player page
		if (responseArray.view == 'player') {
			// if(responseSections.length>0) responseArray.sections=[responseSections.reverse()[0]];
			if (responseSections.length > 0) {
				// var splitData = id.split("-")
				// var haveSameSection = false
				if (responseArray.attributes.contentType == "tvshowepisode" || responseArray.attributes.contentType == "web_series_episode" || responseArray.attributes.contentType == "originals_series_episode" || responseArray.attributes.targetMenuCode == "shows" || responseArray.attributes.contentType == "sports_series_episode") {
					for (var i = 0; i < responseSections.length; i++) {
						if (responseArray.tabsInfo && responseArray.tabsInfo.selectedTab && responseArray.tabsInfo.selectedTab == responseSections[i].sectionInfo.code) {
							if (dontAddNewSection == true) {
								responseArray.sections = presentPagedetails.sections
							}
							else {
								responseArray.sections = [responseSections[i]];
							}
						}
						if (responseSections[i].sectionInfo.code == "recommendations" && (responseArray.attributes.targetMenuCode != "shows" && responseArray.attributes.contentType != "tvshowepisode" && responseArray.attributes.contentType != "web_series_episode" && responseArray.attributes.contentType != "originals_series_episode")) {
							responseArray.sections = [responseSections[i]];
						}
					}
				}
				else {
					if (responseArray.attributes.contentType == "web_series_episode" || responseArray.attributes.targetMenuCode == 'shows' && responseArray.tabsInfo.selectedTab != '' && responseArray.tabsInfo.selectedTab != undefined) {
						for (var i = 0; i < responseSections.length; i++) {
							var sectionName = responseSections[i].sectionInfo.name.toLowerCase();
							if (sectionName.includes("season")) {
								var childElement = document.getElementById(id);
								if (childElement) {
									var parentElement = childElement.parentElement;
									if (parentElement) {
										var grandparentElement = parentElement.parentElement;
										if (grandparentElement) {
											var grandparentId = grandparentElement.id;
										}
									}
									var splitData = grandparentId.split('-')
									if (presentPagedetails.view == "tvshowDetails" || presentPagedetails.view == "player") {
										splitData[1] = responseArray.attributes.seasonSeqNo - 1
										responseArray.sections = [responseSections[parseInt(splitData[1])]];
									}
									else if (splitData != '' && splitData != undefined) {
										responseArray.sections = [responseSections[parseInt(splitData[1])]];
									}
									else {
										responseArray.sections = [responseSections[1]];
									}
									break;
								}
								else {
									responseArray.sections = [responseSections[1]];
								}
							}
						}
					}
					else if (responseArray.attributes.contentType == "movie" || responseArray.attributes.targetMenuCode == 'movies' || responseArray.attributes.contentType == "epg") {
						responseArray.sections = [responseSections.reverse()[0]];
					}
				}
			}
			else responseArray.sections = [];
		} else {
			for (i = 0; i < responseSections.length; i++) {
				// if (responseSections[i].sectionInfo.dataType == 'banner') {
				// 	responseSections.splice(i, 1);
				// }
			}
			responseArray.sections = responseSections;
		}

		// Load tab data for tabbed sections
		if (responseArray && Array.isArray(responseArray.sections)) {
			for (var s = 0; s < responseArray.sections.length; s++) {
				var sectionObj = responseArray.sections[s];

				if (!sectionObj) continue;

				var sInfo = sectionObj.sectionInfo || sectionObj;

				if (
					sInfo &&
					typeof sInfo === "object" &&
					sInfo.sectionPresentation === "tabbed_display"
				) {
					if (typeof Main !== "undefined" && typeof Main.loadTabbedSectionData === "function") {
						Main.loadTabbedSectionData(sectionObj, responseArray.targetPath || null);
					}
				}
			}
		}

		responseArray.navigationFrom = presentPagedetails.view;
		responseArray.pageContent = responseContent;
		responseArray.paginationSections = paginationSections;
		responseArray.paginationSectionsData = paginationSectionsData;
	}


	//back data add
	if (presentPagedetails.isTopMenuClick !== true && presentPagedetails.isSideMenuClick !== true && presentPagedetails.targetPath != undefined && presentPagedetails.view != "plansUpgrade" && presentPagedetails.view != "upiPaymentPage" && responseArray.view != 'player' && presentPagedetails.view != "tvshowDetails" && (presentPagedetails.navigationFrom != "tvshowDetails" || presentPagedetails.pageSubType == "home")) {
		Main.addBackData(targetPath, result);
	}
	if (responseArray.view == 'list' && (presentPagedetails.targetPath == "favourites" || presentPagedetails.subView == "favourites_list")) {
		responseArray.subView = 'favourites_list'
	}
	//responseArray
	responseArray.menuIndex = 0;
	responseArray.sectionIndex = {};

	//html display

	//player
	if (responseArray.view == 'player') {
		responseArray.isvideoResume = presentPagedetails.isvideoResume;
		if (responseArray.attributes.networkName == "SunNxt" || responseArray.attributes.networkName == "Sun NXT") {
			presentPagedetails.sunnxtContentId = responseArray.attributes.assetId
			if (playerSdksintializations.sunSDK == false) {
				var sunPartner = true
				Main.contentPatner(targetPath, sunPartner)
				Main.contentPartnerCW(targetPath);
				Main.sunNxtSdk(Main.openSunPlayer.bind(Main));
			}
			else {
				var sunPartner = true
				Main.contentPatner(targetPath, sunPartner)
				Main.contentPartnerCW(targetPath);
				Main.openSunPlayer()
			}
		}
		else if (responseArray.attributes.isDeeplinking == "false") {
			if (comingFromPlayerSections == true) {
				responseArray.comingFromPlayerSections = true;
			}
			Main.getStream(result, responseArray);
		}
		else {
			if (targetComingFromSign == true) {
				Main.apiCall(firstMenu);
			}
			else {
				Main.contentPatner(targetPath)
			}
		}
		return;
	}
	else if (responseArray.view == 'tvguide' && presentPagedetails.view == 'content') {
		view = 'content';
		if (presentPagedetails.attributes.isDeeplinking == "false") {
			Main.getStream(result, responseArray);
		} else {
			Main.contentPatner()
		}
	}
	else {
		if (presentPagedetails.view == 'player') analytics.plugin.handlePlayEndedByUser();
		if (presentPagedetails.targetPath == "search" && !presentPagedetails.trendingSearch) {

		}
		else {
			view = responseArray.view;
			presentPagedetails = responseArray;
		}


		var tabbedSections = [];
		if (
			presentPagedetails &&
			Array.isArray(presentPagedetails.sections)
		) {
			for (var x = 0; x < presentPagedetails.sections.length; x++) {
				var section = presentPagedetails.sections[x];

				if (!section) continue;

				var sInfo = section.sectionInfo || section;

				if (
					sInfo &&
					typeof sInfo === "object" &&
					sInfo.sectionPresentation === "tabbed_display"
				) {
					if (Array.isArray(tabbedSections)) {
						tabbedSections.push(section);
					}
				}
			}
		}

		var currentRenderDetails = presentPagedetails;
		function renderNow() {
			if (presentPagedetails !== currentRenderDetails) {
				return;
			}
			if (presentPagedetails.targetPath == "search" && !presentPagedetails.trendingSearch) {
				presentPagedetails.trendingSearch = result
				Yup("#mainContent").append(Util.getContentHTML(presentPagedetails.trendingSearch, id, targetClickedath))
			}
			else {
				Yup("#mainContent").html(Util.getContentHTML(presentPagedetails, id, targetClickedath));
				if (ybbPopUp && ybbPopUp != "") {
					Main.getYbbTemplateData(ybbPopUp);
				}
			}

			if (view == 'seasonsDetails') {
				keyHandlar.stopPreviewTrailers();
				Yup(".imageFocus").removeClass("imageFocus");
				Yup('#sectionItem-0-0').addClass('imageFocus');
				Yup('#season-0').addClass('activeTab');
			}
			if (presentPagedetails.view == "tvshowDetails" || presentPagedetails.view == "movieDetails" || presentPagedetails.view == "channelDetails") {
				Main.hideMenu();
			}

			if (targetComingFromSign == true) {
				targetComingFromSign = false;
				backData = [];
			}

			if (((result.response && result.response.errorResponse) && (result.response.errorResponse.code == 404 || result.response.errorResponse.code == -4)) && presentPagedetails.targetPath != "search") {
				Yup("#mainContent").html("")
				Yup("#mainContent").html(Util.ContentNotFound(result.response.errorResponse.message));
				if (
					result.response.info &&
					(
						result.response.info.path === "favourites" ||
						result.response.info.code === "favourites"
					) &&
					result.response.info.pageType === "content"
				) {
					Main.sidebarOpen();
				}
			}

			Yup("#mainContent").show();
			if (presentPagedetails.targetPath == "home") {
				Main.sideMenuHTML();
				Yup('.side-menu-item[menu-code="home_tv"]').addClass('imageFocus');
			}
			keyHandlar.menuActiveHandular();  // add active class to present page menu
			if (presentPagedetails.targetPath &&
				presentPagedetails.targetPath.toLowerCase() == "fifa") {
				var clickedMenu = localStorage.getItem('clicked-menu');
				if (clickedMenu && clickedMenu.toLowerCase() == "sports" && presentPagedetails.navigationFrom == "switchProfile" && presentPagedetails.targetPath != "home") {
					if (utilities && utilities.menus) {
						var activeMenus = [];
						for (var j = 0; j < utilities.menus.length; j++) {
							if (utilities.menus[j].isActive) {
								activeMenus.push(utilities.menus[j]);
							}
						}
						activeMenus.sort(function (a, b) { return a.orderIndex - b.orderIndex; });
						for (var i = 0; i < activeMenus.length; i++) {
							var targetPath = activeMenus[i].targetPath ? activeMenus[i].targetPath.toLowerCase() : "";
							var displayText = activeMenus[i].displayText ? activeMenus[i].displayText.toLowerCase() : "";
							var title = activeMenus[i].title ? activeMenus[i].title.toLowerCase() : "";

							if (targetPath === "sports" || displayText === "sports" || title === "sports") {
								Yup('.menu-active').removeClass('menu-active');
								Yup('.top-menu-active').removeClass('top-menu-active');
								Yup("#menu-" + i).addClass("menu-active");
								localStorage.removeItem('clicked-menu');
								break;
							}
						}
					}
				}
			}
			if (view == "content" || view == "list") {
				Main.showMenu();
				Main.HideLoading();
			}

			//removeing player if exits
			try {
				media.pause();
				media.stop();
				media.unsetListener();
			}
			catch (e) { }

			//live bar unbscribe in tvguide
			if (!!liveSubscribe) {
				clearInterval(liveSubscribe);
			}
			//add first focus
			if (presentPagedetails.pageType == 'list') {
				if (presentPagedetails.isMenuPathforGrid == true) {
					Yup(".menu-item").addClass("imageFocus");
				}
				else if (presentPagedetails.sections && presentPagedetails.sections.length > 0 && presentPagedetails.sections[0].sectionData.data.length > 0) {
					Yup("#sectionItem-0-0").addClass("imageFocus");
				} else {
					Yup('.menu-item.menu-active').addClass('imageFocus');
				}
				Main.HideLoading();
			}
			else if (presentPagedetails.pageType == 'details') {
				if (presentPagedetails.avilablePagebuttonsLength >= 1) {
					Yup("#button-0").addClass('imageFocus');
					keyHandlar.stopPreviewTrailers();
					var userDetails = JSON.parse(localStorage.getItem('userDetails'));
					if (!!userDetails) {
						if (presentPagedetails.attributes.isTrailerAvailable && presentPagedetails.attributes.isTrailerAvailable == "true") {
							apiCallTimeout = setTimeout(() => {
								Main.trailerGetStream("detailsPage", presentPagedetails.targetPath, 0, 0, presentPagedetails.attributes.trailerStreamType)
							}, 1000);
						}
					}
				} else if (presentPagedetails.pageButtons && presentPagedetails.pageButtons.showFavouriteButton && presentPagedetails.pageButtons.showFavouriteButton == true && presentPagedetails.view != "seasonsDetails") {
					Yup("#favorites").addClass('imageFocus');
				}
				else if (presentPagedetails.sections && presentPagedetails.sections.length > 0) {
					Yup("#sectionItem-0-0").addClass("imageFocus");
				}
				if (presentPagedetails.sections && presentPagedetails.sections.length > 0 && presentPagedetails.pageSubType != 'movieDetails' && presentPagedetails.view != "seasonsDetails") {
					Yup("#section-0").addClass('activeSection');
				}
				else if (presentPagedetails.view == "seasonsDetails") {
					keyHandlar.stopPreviewTrailers();
					Yup("#sectionItem-0-0").addClass("imageFocus");
				}
				Main.HideLoading();
			}
			else if (view == 'content') {
				Yup('.imageFocus').removeClass('imageFocus')
				if (presentPagedetails.banners.length > 0) {
					Yup('#WatchBannerBtn-0').addClass('imageFocus')
					Yup("#bannerBtn-0").addClass('active-banner');
					Yup('#bannerDetails-0').css('display', 'block');
					BannerMove();
				}
				if (presentPagedetails.sections.length > 0) {
					if (presentPagedetails.banners.length <= 0) {
						Yup('#sectionItem-0-0').addClass('imageFocus')
						if (presentPagedetails.targetPath != "favourites") {
							var data = keyHandlar.getSectionItemData(presentPagedetails, 0, 0);
							if (data && hasBgImage(data)) {
								keyHandlar.showCardLazyPreview();
								if (keyHandlar.isHD) {
									Yup('.sectionsHome').css('margin-top', '333px')
								}
								else {
									Yup('.sectionsHome').css('margin-top', '500px')
								}
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
							keyHandlar.stopPreviewTrailers();
							var userDetails = JSON.parse(localStorage.getItem('userDetails'));
							if (!!userDetails) {
								if (presentPagedetails.sections[0].sectionData.data[0].target.pageAttributes.isTrailerAvailable && presentPagedetails.sections[0].sectionData.data[0].target.pageAttributes.isTrailerAvailable == "true") {
									apiCallTimeout = setTimeout(() => {
										Main.trailerGetStream("sections", presentPagedetails.sections[0].sectionData.data[0].target.path, 0, 0, presentPagedetails.sections[0].sectionData.data[0].target.pageAttributes.trailerStreamType)
									}, 1000);
								}
								else {
									var element = document.getElementById('sectionItem-' + 0 + '-' + 0);
									var datasrc = element.getAttribute('data-src');
									if (datasrc) {
										apiCallTimeout = setTimeout(() => {
											keyHandlar.createVideoTag("sections", datasrc, 0, 0)
										}, 1000);
									}
								}
							}
						}
						if (presentPagedetails.targetPath == "favourites") {
							Yup(".sectionsHome").css('margin-top', '0px')
						}
					}
					else {
						if (presentPagedetails.targetPath != "favourites") {
							if (keyHandlar.isHD) {
								Yup(".sectionsHome").css('margin-top', '-133px')
							}
							else {
								Yup(".sectionsHome").css('margin-top', '-200px')
							}
						}
						if (presentPagedetails.targetPath == "favourites") {
							Yup(".sectionsHome").css('margin-top', '0px')
						}
					}
				}
				else {
					if (targetPath == "favorites") {
						if (isUserSignedOutinThisSession == true) {
							Yup('#signin-1').addClass('imageFocus');
						}
						else {
							Yup('.menu-item.menu-active').addClass('imageFocus');
						}
					}
					else {
						if (((result.response && result.response.errorResponse) && (result.response.errorResponse.code == 404 || result.response.errorResponse.code == -4)) && targetPath != "search" && targetPath == "favourites") {
							Yup('.imageFocus').removeClass('imageFocus')
						}
						else {
							Yup('.menu-active').addClass('imageFocus');
						}
					}
				}

				//distro pixel analytics
				if ((presentPagedetails && presentPagedetails.cpPartnerCode == "distro") || (presentPagedetails && presentPagedetails.targetPath == "partner/distro")) {
					Main.distroChannelViewed();
				}
				Main.HideLoading();
			}
		}

		if (tabbedSections.length === 0) {
			renderNow();
		} else {
			var checkInterval = setInterval(function () {
				var allLoaded = true;
				for (var t = 0; t < tabbedSections.length; t++) {
					var sec = tabbedSections[t];
					if (!sec._tabsDataLoaded) {
						allLoaded = false;
						break;
					}
				}
				if (allLoaded) {
					clearInterval(checkInterval);
					renderNow();
				}
			}, 100);
		}
	}
}
Main.PlayerPaginationsections = function (target) {
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	try {
		Yup.ajax({
			url: Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + target + "&offset=-1&count=12",
			type: 'GET',
			headers: headerJ,

			success: function (data) {
				var result = JSON.parse(data);

				if (result.status == true) {
					presentPagedetails.sections = []
					presentPagedetails.sections = result.response

					Main.HideLoading();
				}
			},
			error: function (errObj) {
				Main.HideLoading();
				utilities.responseErrorCheck(errObj);
			},
			timeout: 60000
		});
	} catch (error) {
		Main.HideLoading();
		utilities.genricPopup('Something Went Wrong', 'unknown');
	}

}

// Main.loadTabbedSectionData = function (sectionObj) {

//     if (!sectionObj ||
//         !sectionObj.sectionInfo ||
//         !sectionObj.sectionInfo.subSections ||
//         sectionObj._tabsLoaded) {
//         return;
//     }

//     sectionObj._tabsLoaded = true;

//     var codes = sectionObj.sectionInfo.subSections.split(',');

//     var headerJ = {
//         "tenant-code": Main.tenantCode,
//         "box-id": Main.getBOXID(),
//         "session-id": Main.getSessionID(),
//         "ucv": "24"
//     };

//     Yup.ajax({
//         url: Main.mainApi +
//             "/service/api/v1/section/data?path=" +
//             presentPagedetails.targetPath +
//             "&code=" + codes.join(',') +
//             "&offset=-1&count=12",
//         type: 'GET',
//         headers: headerJ,

//         success: function (data) {

//             var result = JSON.parse(data);
//             if (!result.status || !result.response) return;

//             for (var i = 0; i < result.response.length; i++) {

//                 var res = result.response[i];
//                 var resCode = '';

//                 if (res.section && res.section.sectionData) {
//                     resCode = res.section.sectionData.section;
//                 } else {
//                     resCode = res.section;
//                 }

//                 for (var k = 0; k < sectionObj.subSectionInfo.length; k++) {

//                     if (sectionObj.subSectionInfo[k].code == resCode) {

//                         if (!sectionObj.subSectionInfo[k].sectionData) {
//                             sectionObj.subSectionInfo[k].sectionData = {
//                                 data: [],
//                                 lastIndex: -1,
//                                 myRecoTrackingId: ""
//                             };
//                         }

//                         // assign tab data
//                         if (res.section && res.section.sectionData) {
//                             sectionObj.subSectionInfo[k].sectionData.data =
//                                 res.section.sectionData.data || [];

//                             sectionObj.subSectionInfo[k].sectionData.lastIndex =
//                                 res.section.sectionData.lastIndex || -1;
//                         } else {
//                             sectionObj.subSectionInfo[k].sectionData.data =
//                                 res.data || [];

//                             sectionObj.subSectionInfo[k].sectionData.lastIndex =
//                                 res.lastIndex || -1;
//                         }

//                         sectionObj.subSectionInfo[k].sectionData.myRecoTrackingId =
//                             res.myRecoTrackingId || "";

//                         break;
//                     }
//                 }
//             }

//             /* =========================
//                SET FIRST TAB DATA TO MAIN SECTION
//                ========================= */
//             if (sectionObj.subSectionInfo.length > 0) {

//                 var firstTab = sectionObj.subSectionInfo[0];

//                 if (firstTab.sectionData && firstTab.sectionData.data.length > 0) {

//                     // ensure main sectionData exists
//                     if (!sectionObj.sectionData) {
//                         sectionObj.sectionData = {
//                             data: [],
//                             lastIndex: -1,
//                             myRecoTrackingId: ""
//                         };
//                     }

//                     sectionObj.sectionData.data = firstTab.sectionData.data;
//                     sectionObj.sectionData.lastIndex = firstTab.sectionData.lastIndex;
//                     sectionObj.sectionData.myRecoTrackingId = firstTab.sectionData.myRecoTrackingId;
// 					sectionObj.sectionControls.dataLength = firstTab.sectionData.data.length;
//                 }
//             }
//         },

//         timeout: 60000
//     });
// };


// to get the response of pagination sections and append the sections to page
Main.loadTabbedSectionData = function (sectionObj, targetPath) {

	if (!sectionObj || sectionObj._tabsLoaded) {
		return;
	}

	var sInfo = sectionObj.sectionInfo || sectionObj;
	if (!sInfo.subSections) {
		return;
	}

	sectionObj._tabsLoaded = true;

	if (!sectionObj.subSectionInfo) {
		sectionObj.subSectionInfo = [];
		var codesArr = sInfo.subSections.split(',');
		for (var k = 0; k < codesArr.length; k++) {
			sectionObj.subSectionInfo.push({
				code: codesArr[k],
				name: codesArr[k].replace(/-/g, ' ').replace(/\b\w/g, function (l) { return l.toUpperCase(); }),
				sectionData: null
			});
		}
	}

	var codes = sInfo.subSections.split(',');

	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};

	// Helper to mark tabbed cards
	function markTabbedCards(cards) {
		if (!cards || !cards.length) return;
		for (var c = 0; c < cards.length; c++) {
			cards[c].cardSubType = "tabbed-card";
		}
	}

	var sPath = targetPath || presentPagedetails.targetPath;

	Yup.ajax({
		url: Main.mainApi +
			"/service/api/v1/section/data?path=" +
			sPath +
			"&code=" + codes.join(',') +
			"&offset=-1&count=12",
		type: 'GET',
		headers: headerJ,

		success: function (data) {

			var result = JSON.parse(data);
			if (!result.status || !result.response) return;

			for (var i = 0; i < result.response.length; i++) {

				var res = result.response[i];
				var resCode = '';

				if (res.section && res.section.sectionData) {
					resCode = res.section.sectionData.section;
				} else {
					resCode = res.section;
				}

				for (var k = 0; k < sectionObj.subSectionInfo.length; k++) {

					if (sectionObj.subSectionInfo[k].code == resCode) {

						if (!sectionObj.subSectionInfo[k].sectionData) {
							sectionObj.subSectionInfo[k].sectionData = {
								data: [],
								lastIndex: -1,
								myRecoTrackingId: ""
							};
						}

						// assign tab data
						if (res.section && res.section.sectionData) {

							sectionObj.subSectionInfo[k].sectionData.data =
								res.section.sectionData.data || [];

							sectionObj.subSectionInfo[k].sectionData.lastIndex =
								res.section.sectionData.lastIndex || -1;

						} else {

							sectionObj.subSectionInfo[k].sectionData.data =
								res.data || [];

							sectionObj.subSectionInfo[k].sectionData.lastIndex =
								res.lastIndex || -1;
						}

						// ADD: mark cards
						markTabbedCards(sectionObj.subSectionInfo[k].sectionData.data);

						sectionObj.subSectionInfo[k].sectionData.myRecoTrackingId =
							res.myRecoTrackingId || "";

						break;
					}
				}
			}

			/* =========================
			   SET FIRST TAB DATA TO MAIN SECTION
			   ========================= */
			if (sectionObj.subSectionInfo.length > 0) {

				var firstTab = sectionObj.subSectionInfo[0];

				if (firstTab.sectionData && firstTab.sectionData.data.length > 0) {

					if (!sectionObj.sectionData) {
						sectionObj.sectionData = {
							data: [],
							lastIndex: -1,
							myRecoTrackingId: ""
						};
					}

					sectionObj.sectionData.data = firstTab.sectionData.data;
					sectionObj.sectionData.lastIndex = firstTab.sectionData.lastIndex;
					sectionObj.sectionData.myRecoTrackingId = firstTab.sectionData.myRecoTrackingId;
					sectionObj.sectionControls.dataLength = firstTab.sectionData.data.length;

					// ADD: mark main section cards
					markTabbedCards(sectionObj.sectionData.data);
				}
			}
			sectionObj._tabsDataLoaded = true;
		},
		error: function () {
			sectionObj._tabsDataLoaded = true;
		},
		timeout: 60000
	});
};
Main.onTabSelect = function (sectionIndex, tabIndex) {

	var sectionObj = presentPagedetails.sections[sectionIndex];
	if (!sectionObj ||
		!sectionObj.subSectionInfo ||
		!sectionObj.subSectionInfo[tabIndex]) {
		return;
	}

	var tabData = sectionObj.subSectionInfo[tabIndex].sectionData
		? sectionObj.subSectionInfo[tabIndex].sectionData.data
		: [];

	// Update main section data reference (important for navigation logic)
	sectionObj.sectionData.data = tabData;
	sectionObj.sectionControls.dataLength = tabData.length;

	// Remove old cards and render new ones
	var containerId = "#sectionhorizontal-" + sectionIndex;
	var html = "";
	var viewAllId = "";

	for (var j = 0; j < tabData.length; j++) {
		html += Util.getCard(tabData[j], 'sectionItem-' + sectionIndex + '-' + j);
		viewAllId = 'sectionItem-' + sectionIndex + '-' + (j + 1);
	}

	if (sectionObj.sectionControls.showViewAll === true) {
		html += Util.getViewAllCard(sectionObj, viewAllId);
	}

	Yup(containerId).html(html);
	Yup(containerId).css({
		left: '40px',
	});
	// // ===== Animation =====
	// var $cards = Yup(containerId + " .section-card");
	// $cards.addClass("tab-enter");

	// // Trigger animation in next frame
	// setTimeout(function () {
	// 	$cards.addClass("tab-enter-active");
	// }, 20);
	// ===== Wave Animation =====
	var $cards = Yup(containerId + " .section-card");
	$cards.addClass("wave-enter");

	// Slow wave effect
	$cards.each(function (index) {
		var el = this;

		// Limit total delay (important for TV performance)
		var delay = Math.min(index * 80, 600);

		setTimeout(function () {
			Yup(el).addClass("wave-enter-active");
		}, delay);
	});
	// Yup(".imageFocus").removeClass("imageFocus");
	// Yup("#sectionItem-" + sectionIndex + "-0").addClass("imageFocus");
};


Main.Paginationsections = function () {
	// Main.ShowLoading();	
	var params = '';
	var hasName = false;
	if (presentPagedetails.paginationSections.length > 3) {
		var presentSections = presentPagedetails.paginationSections.slice(0, 3)
		for (var i = 0; i < hasDynamicName.length; i++) {
			for (var j = 0; j < presentSections.length; j++) {
				var value = hasDynamicName[i];
				if (value == presentSections[j]) {
					hasName = true;
					break;
				}
			}
		}
		params = presentSections.join(',');
		presentPagedetails.paginationSections = presentPagedetails.paginationSections.slice(3, presentPagedetails.paginationSections.length);
	} else {
		params = presentPagedetails.paginationSections.join(',');
		presentPagedetails.paginationSections = [];
	}

	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	// show shimmer at bottom
	if (!Yup('#pagination-shimmer').length) {
		Yup(".sectionsHome").append(Util.getPaginationShimmer(3)); // 3 fake sections
	}
	try {
		Yup.ajax({
			// url: Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + params + "&offset=-1&count=10",
			url: Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + params + "&hasDynamicExpression=" + hasName + "&offset=-1&count=12",
			type: 'GET',
			headers: headerJ,

			success: function (data) {
				var result = JSON.parse(data);

				if (result.status == true) {
					var pageSections = []
					var viewAllshow = systemConfigs.configs && systemConfigs.configs.showViewallLastindexMinimumValue ? systemConfigs.configs.showViewallLastindexMinimumValue : 9;
					for (var i = 0; i < result.response.length; i++) {
						var tempSections = {};
						for (var j = 0; j < presentPagedetails.paginationSectionsData.length; j++) {

							var sectionObj = presentPagedetails.paginationSectionsData[j];
							var sInfo = sectionObj.sectionInfo || sectionObj;
							var resSection = result.response[i];

							if (sInfo && sInfo.sectionPresentation == "tabbed_display" && sInfo.code == resSection.section) {

								tempSections = sectionObj;

								// Ensure sectionData exists
								if (!tempSections.sectionData) {
									tempSections.sectionData = {
										data: [],
										lastIndex: -1,
										myRecoTrackingId: ""
									};
								}

								var sControls = tempSections.sectionControls || tempSections;
								sControls.dataLength = 1;

								// Load tab data async
								Main.loadTabbedSectionData(sectionObj, presentPagedetails.targetPath);

								break;
							}


							if (!!resSection.section && !!resSection.section.sectionData) {
								if (resSection.section.sectionData.section == sInfo.code) {
									if (resSection.section.sectionData.data.length > 0) {
										tempSections = sectionObj;
										tempSections.sectionData.data = resSection.section.sectionData.data;
										tempSections.sectionData.lastIndex = resSection.section.sectionData.lastIndex;
										sInfo.name = resSection.section.sectionInfo ? resSection.section.sectionInfo.name : (resSection.section.name || sInfo.name);
										tempSections.sectionData.myRecoTrackingId = resSection && resSection.myRecoTrackingId ? resSection.myRecoTrackingId : "";
									}
									break;
								}
							}
							else if (resSection.section == sInfo.code) {
								if (resSection.data && resSection.data.length > 0) {
									tempSections = sectionObj;
									tempSections.sectionData.data = resSection.data;
									tempSections.sectionData.lastIndex = resSection.lastIndex;
									tempSections.sectionData.myRecoTrackingId = resSection && resSection.myRecoTrackingId ? resSection.myRecoTrackingId : "";
								}
								break;
							}
						}
						if (tempSections.sectionData) {
							if (tempSections.sectionData.data.length > viewAllshow && tempSections.sectionControls.showViewAll == true && presentPagedetails.pageType != 'player') {
								tempSections.sectionControls.showViewAll = true;
								tempSections.sectionControls.dataLength = tempSections.sectionData.data.length + 1;
							} else {
								tempSections.sectionControls.showViewAll = false;
								tempSections.sectionControls.dataLength = tempSections.sectionData.data.length;
							}
							pageSections.push(tempSections);
						}
					}
					if (pageSections) {

						presentPagedetails.overlayData = '';

						var tabbedSections = [];
						for (var x = 0; x < pageSections.length; x++) {
							var sec = pageSections[x];
							var sInfo = sec.sectionInfo || sec;
							if (sInfo && sInfo.sectionPresentation == "tabbed_display") {
								tabbedSections.push(sec);
							}
						}

						// No tabbed sections → render immediately
						if (tabbedSections.length === 0) {

							Yup(".sectionsHome").append(Util.getPaginationSections(pageSections));
							// remove shimmer
							Yup('#pagination-shimmer').remove();
							for (var i = 0; i < pageSections.length; i++) {
								presentPagedetails.sections.push(pageSections[i]);
							}

						} else {

							// Wait until all tabbed data loads
							var checkInterval = setInterval(function () {

								var allLoaded = true;

								for (var t = 0; t < tabbedSections.length; t++) {
									var sec = tabbedSections[t];

									if (!sec.sectionData ||
										!sec.sectionData.data ||
										sec.sectionData.data.length === 0) {
										allLoaded = false;
										break;
									}
								}

								if (allLoaded) {
									clearInterval(checkInterval);

									Yup(".sectionsHome").append(Util.getPaginationSections(pageSections));

									// remove shimmer here (VERY IMPORTANT)
									Yup('#pagination-shimmer').remove();
									for (var i = 0; i < pageSections.length; i++) {
										presentPagedetails.sections.push(pageSections[i]);
									}
								}

							}, 100); // check every 100ms
						}
					}

					else {
						Main.HideLoading();
					}
					if (!presentPagedetails.paginationSections) {
						presentPagedetails.paginationSectionsData = [];
					}

				} else {
					Main.HideLoading();
				}
			},
			error: function (errObj) {
				Yup('#pagination-shimmer').remove(); // prevent stuck shimmer
				Main.HideLoading();
				utilities.responseErrorCheck(errObj);
			},
			timeout: 60000
		});
	} catch (error) {
		Yup('#pagination-shimmer').remove(); // prevent stuck shimmer
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
			utilities.genricPopup('Something Went Wrong', 'unknown');
		}
	}

}

// get apgiantion data in view all pages
Main.viewAllPagination = function () {
	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[0].sectionData.section + "&offset=" + presentPagedetails.sections[0].sectionData.lastIndex + "&count=48";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[0].sectionData.lastIndex + "&count=48"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					Util.addPaginationViewAll(pageSections);
				} else {
					Main.HideLoading();
					presentPagedetails.sections[0].sectionData.hasMoreData = false;
				}
			} else {
				Main.HideLoading();
				presentPagedetails.sections[0].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[0].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}
Main.viewAllPaginationDetails = function (k) {
	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[k].sectionData.section + "&offset=" + (presentPagedetails.sections[k].sectionData.lastIndex) + "&count=48";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[k].sectionData.lastIndex + "&count=48"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					Util.addPaginationViewAllDetails(pageSections, k);
				} else {
					Main.HideLoading();
					presentPagedetails.sections[k].sectionData.hasMoreData = false;
				}
			} else {
				Main.HideLoading();
				presentPagedetails.sections[k].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[k].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}


//get search suggestions
Main.getSearchSuggestion = function (query, addFocus) {
	if (query.trim().length == 0) {
		return;
	}
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	Yup.ajax({
		url: Main.searchApi + "/search/api/v1/search/suggestions?query=" + query,
		type: 'GET',
		headers: headerJ,
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true && result.response.length > 0) {
				presentPagedetails.addSuggResultFocus = "";
				Yup('.searchSuggestions').html(Util.getSearchSuggestionsHTML(result.response));
				if (Yup(window).width() > 1280) {
					Yup('.searchSuggestions').animate({ height: 55 }, 200);
				}
				else {
					Yup('.searchSuggestions').animate({ height: 45 }, 200);
				}
				presentPagedetails.sectionIndex[0] = 0;
				presentPagedetails.searchSuggestion = result.response;
				if (addFocus == true) { keyHandlar.addFocusOnClickSearchSuggestions() }
			}
			else {
				Yup('.searchSuggestions').html('');
				if (Yup(window).width() > 1280) {
					Yup('.searchSuggestions').animate({ height: 55 }, 200);
				}
				else {
					Yup('.searchSuggestions').animate({ height: 45 }, 200);
				}
				presentPagedetails.searchSuggestion = {};
				if (addFocus == true) { keyHandlar.addFocusOnClickSearchSuggestions() }
			}
		},
		error: function (errObj) {
			Yup('.searchSuggestions').html('');
			if (Yup(window).width() > 1280) {
				Yup('.searchSuggestions').animate({ height: 55 }, 200);
			}
			else {
				Yup('.searchSuggestions').animate({ height: 45 }, 200);
			}
			presentPagedetails.searchSuggestion = {};
			if (addFocus == true) { keyHandlar.addFocusOnClickSearchSuggestions() }
		},
		timeout: 60000
	});
}

//get search Results
Main.getSearchResults = function (query, tabValue) {
	isSearching = true;
	Main.ShowSearchLoading();
	presentPagedetails.searchedText = query;
	if (!tabValue) {
		presentPagedetails.searchTabsVal = "all";
	} else {
		presentPagedetails.searchTabsVal = tabValue;
	}
	if (query.trim().length == 0) {
		Yup('#searchResults').html('');
		presentPagedetails.searchResults = [];
		return;
	}
	if (presentPagedetails.searchPaginationPage.page == 0) {
		(presentPagedetails.searchResults = []);
		var searchStaticMenus = JSON.parse(systemConfigs.configs.searchStaticMenus);
		presentPagedetails.searchStaticMenus = searchStaticMenus;
		// presentPagedetails.activeSearchTab = "searchTab-0";
	}
	if (!!presentPagedetails.pagination && presentPagedetails.pagination == true) {
		var url = Main.searchApi + "/search/api/v3/get/search/query?query=" + query + '&bucket=' + presentPagedetails.searchTabsVal + '&page_size=30&last_doc=' + presentPagedetails.lastDoc + '&last_search_order=' + presentPagedetails.lastSearchOrder;
	} else if (!!tabValue) {
		var url = Main.searchApi + "/search/api/v3/get/search/query?query=" + query + '&bucket=' + presentPagedetails.searchTabsVal + '&page_size=30';
	} else {
		var url = Main.searchApi + "/search/api/v3/get/search/query?query=" + query + '&bucket=' + presentPagedetails.searchStaticMenus[0].code + '&page_size=30';
	}
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true && result.response.searchResults.data.length > 0) {
				Yup('#resultsCount').html('');
				if (!!presentPagedetails.pagination) {
					presentPagedetails.pagination = false;
					presentPagedetails.lastDoc = result.response.lastDoc;
					presentPagedetails.lastSearchOrder = result.response.lastSearchOrder;
					presentPagedetails.searchResults = result.response.searchResults.data;
					// presentPagedetails.arrayResults.push(...Main.divideArray(presentPagedetails.searchResults,3));
					presentPagedetails.arrayResults = presentPagedetails.arrayResults.concat(Main.divideArray(presentPagedetails.searchResults, 3));
					// Yup('#searchResults').html(Util.getSearchResultsHTML(presentPagedetails.arrayResults));
					Yup('.search_inner').append(Util.getSearchResultsByTab(presentPagedetails.arrayResults, true));
					if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
						// presentPagedetails.pagination = true;
						presentPagedetails.paginationIndex = presentPagedetails.arrayResults.length;
					}
					Main.HideSearchLoading();

				} else {
					presentPagedetails.searchResults = [];
					presentPagedetails.previousCardFocus = { row: 0, column: 0 };
					presentPagedetails.lastDoc = result.response.lastDoc;
					presentPagedetails.lastSearchOrder = result.response.lastSearchOrder;
					// presentPagedetails.searchResults.push(...result.response.searchResults.data);
					var newData = result.response.searchResults.data;
					var searchResults = presentPagedetails.searchResults;
					for (var i = 0; i < newData.length; i++) {
						searchResults.push(newData[i]);
					}
					presentPagedetails.arrayResults = Main.divideArray(presentPagedetails.searchResults, 3);
					Yup('#searchResults').html('');
					Yup('#searchResults').html(Util.getSearchResultsHTML(presentPagedetails.arrayResults));
					if (presentPagedetails.lastDoc != "done" || presentPagedetails.lastSearchOrder != "done") {
						// presentPagedetails.pagination = true;
						presentPagedetails.paginationIndex = presentPagedetails.arrayResults.length;
					}
					if (!!presentPagedetails.activeSearchTab) {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup("#" + presentPagedetails.activeSearchTab).addClass("imageFocus");
						Yup(".imageFocus").removeClass("activeTab");
						Yup("#" + presentPagedetails.activeSearchTab).addClass("activeTab");
					} else {
						Yup(".imageFocus").removeClass("activeTab");
						Yup("#searchTab-0").addClass("activeTab");
					}
					isSearching = false;
					Main.HideSearchLoading();
				}
				for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
					if (presentPagedetails.tabsArray[i].code == presentPagedetails.searchTabsVal) {
						presentPagedetails.tabsArray[i].data = presentPagedetails.arrayResults;
						presentPagedetails.tabsArray[i].lastDoc = result.response.lastDoc;
						presentPagedetails.tabsArray[i].lastSearchOrder = result.response.lastSearchOrder;
						break;
					}
				}
			} else {
				if (result.error.code == 401) {
					Main.popupData = {
						popuptype: 'sessionLogout',
						headerTitle: result.error.message,
						message: result.error.details.description,
						buttonCount: 1,
						yesText: 'Okay',
						yesTarget: 'sessionLogout',
						onBack: 'sessionLogout',
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
				else if (!!tabValue) {
					for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
						if (presentPagedetails.tabsArray[i].code == presentPagedetails.searchTabsVal) {
							presentPagedetails.tabsArray[i].data = '';
							presentPagedetails.tabsArray[i].lastDoc = '';
							presentPagedetails.tabsArray[i].lastSearchOrder = '';
							presentPagedetails.tabsArray[i].errorMsg = '';
							break;
						}
					}
					Yup('#searchResults').html(Util.getSearchResultsHTML(false, result.error.message));
					Yup(".imageFocus").removeClass("imageFocus");
					Yup("#" + presentPagedetails.activeSearchTab).addClass("imageFocus");
					Yup(".imageFocus").removeClass("activeTab");
					Yup("#" + presentPagedetails.activeSearchTab).addClass("activeTab");
				} else if (result.error.code == 404) {
					for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
						presentPagedetails.tabsArray[i].data = '';
						presentPagedetails.tabsArray[i].lastDoc = '';
						presentPagedetails.tabsArray[i].lastSearchOrder = '';
						presentPagedetails.tabsArray[i].errorMsg = "";
					}
					Yup('#searchResults').html(Util.getSearchResultsHTML(false, result.error.message));
					if (!!presentPagedetails.suggestionClicked) {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup("#key-5").addClass("imageFocus");
						presentPagedetails.suggestionClicked = false;
					}
				}
				isSearching = false;
				Main.HideSearchLoading();
			}
		},
		error: function (errObj) {
			if (!!tabValue) {
				for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
					if (presentPagedetails.tabsArray[i].code == presentPagedetails.searchTabsVal) {
						presentPagedetails.tabsArray[i].data = '';
						presentPagedetails.tabsArray[i].lastDoc = '';
						presentPagedetails.tabsArray[i].lastSearchOrder = '';
						presentPagedetails.tabsArray[i].errorMsg = 'no data Found';
						break;
					}
				}
				Yup('#searchResults').html(Util.getSearchResultsHTML(false, 'no data Found'));
				Yup("#" + presentPagedetails.activeSearchTab).addClass("imageFocus");
				Yup("#" + presentPagedetails.activeSearchTab).addClass("activeTab");
			} else if (result.error.code == 404) {
				for (var i = 0; i < presentPagedetails.tabsArray.length; i++) {
					presentPagedetails.tabsArray[i].data = '';
					presentPagedetails.tabsArray[i].lastDoc = '';
					presentPagedetails.tabsArray[i].lastSearchOrder = '';
					presentPagedetails.tabsArray[i].errorMsg = "";

				}
				Yup('#searchResults').html(Util.getSearchResultsHTML(false, result.error.message));
			}
			Main.HideSearchLoading();

		},
		timeout: 60000
	});
	Main.HideSearchLoading();
}

// key handular trigger method
Main.processTrigger = function (event, bannerAirmouse) {
	if ((!!presentPagedetails.isSunnxtSdk) && (presentPagedetails.isSunnxtSdk == true)) {
		return
	}
	if (!!airMouse) { Main.showArrows(); }
	else { Main.hideArrows(); }

	var source = Yup('.imageFocus').attr("source");


	if (Main.popupData && Main.popupData.popuptype) {
		if (Main.popupData.popuptype == "Stream_pin_validation") {
			keyHandlar.streamPinformkeyHandlar(event);
		}
		else {
			keyHandlar.popupKeyHandlar(event);
		}
	}
	else if (source == "topMenus") {
		keyHandlar.topMenuKeyHandlar(event);
		return;
	}
	else if (!!Main.exitPopUpCallTemplate && Main.exitPopUpCallTemplate.popuptype && presentPagedetails.pageSubType == "home" && exitPopupShow == true) {
		keyHandlar.exitPopupKeyHandlar(event, bannerAirmouse);
	}
	else if (presentPagedetails.templateData && presentPagedetails.templateData.templateCode && view != "noPackageView") {
		keyHandlar.templateKeyHandlar(event);
	} else {
		if (view == 'content') {
			keyHandlar.contentKeyHandlar(event);
		}
		// else if(view == 'content' && presentPagedetails.targetPath == "favourites"){
		// 	keyHandlar.favKeyHandlar(event);
		// }
		else if (view == 'list') {
			keyHandlar.listKeyHandlar(event);
		}
		else if (view == 'search') {
			keyHandlar.searchKeyHandlar(event);
		}
		else if (view == 'movieDetails' || view == 'channelDetails') {
			keyHandlar.detailsPageKeyHandlar(event);
		}
		else if (view == 'tvshowDetails') {
			keyHandlar.detailsPageKeyHandlar(event)
		}
		else if (view == "seasonsDetails") {
			keyHandlar.seasonPageKeyHandlar(event)
		}
		else if (view == "player") {
			keyHandlar.playKeydown(event);
		}
		else if (view == 'signin' || view == 'forgetPassword' || view == 'otpVerification' || view == 'changePassword' || view == 'signup' || view == 'signupOtpVerification' || view == 'profileLockOtpVerification' || view == 'introPageView') {
			keyHandlar.AuthKeyhandler(event);
		}
		else if (view == 'passcode') {
			keyHandlar.PasscodeKeyhandler(event);
		}
		else if (view == 'accountDetails') {
			keyHandlar.accountKeydown(event);
		}
		else if (view == 'signinSuccess' || view == 'signout' || view == 'introPageView' || view == 'noPackageView') {
			keyHandlar.uniqueKeydown(event);
		}
		else if (view == 'countryCode') {
			keyHandlar.countryCodeKyeHandular(event);
		}
		else if (view == 'tvguide') {
			keyHandlar.tvguideKeyHandular(event);
		}
		else if (view == 'switchProfile') {
			keyHandlar.switchProfile(event);
		}
		else if (view == 'bannersPlansUpgrade') {
			keyHandlar.bannersPlansKeyhandler(event);
		}
		else if (view == 'plansUpgrade') {
			keyHandlar.plansKeyhandler(event);
		}
		else if (view == 'upiPaymentPage') {
			keyHandlar.upiPaymentPageKeyhandler(event);
		}
		else if (view == 'activeScreens') {
			keyHandlar.activeScreensKeyHandular(event);
		}
		else if (view == 'profileDevicesLimit') {
			keyHandlar.signinDeviceLimitHanadular(event)
		}
		else {
			keyHandlar.contentKeyHandlar(event);
		}
	}
};

// static page html display
Main.processNext = function () {
	Main.ShowLoading();

	//player stopp
	keyHandlar.stopPreviewTrailers();
	if (!!pollstart) {
		ShakaPlayer.stopInterval();
	}
	Main.playerHideLoading();
	Yup('.mouseFocus').removeClass('mouseFocus');
	if (pollSessionExit == false) {
		Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});
	}
	else {
		pollSessionExit = false;
	}

	//removeing player if exits
	try {
		media.stop();
		media.unsetListener();
	}
	catch (e) { }
	if (view == 'search') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'search';
		presentPagedetails.searchSuggestion = {};
		presentPagedetails.sectionIndex = {};
		presentPagedetails.searchResults = [];
		presentPagedetails.searchPaginationPage = {
			'page': 0,
			'searchPaginationHit': true,
			'lastdataLength': 0
		}
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.searchHTML());
		Main.apiCall(presentPagedetails.targetPath)
		Yup(".imageFocus").removeClass("imageFocus");
		Yup("#key-0").addClass("imageFocus");
		Yup("#menu-0").addClass("active")

		Main.HideLoading();
	}
	else if (view == 'signin') {
		Main.ShowLoading();
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'signin';
		presentPagedetails.isChecked = false;
		presentPagedetails = {};
		presentPagedetails.view = view;
		// presentPagedetails.targetPath = 'otp';
		Yup("#mainContent").html('');
		Main.hideMenu();
		Main.getActivateDeviceAPI(false);
		// Yup("#mainContent").html('');
		// Yup("#mainContent").html(Util.signInHtml());
		// setTimeout(function(){
		// 	Main.hideMenu();
		// },1000);
		Main.HideLoading();
		// if(1==1){ Main.proccessAuthData(); }				
	}
	else if (view == 'signup') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'signup';
		presentPagedetails.isChecked = false;
		tempObjectData.password = undefined;
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.signUpHtml());
		Main.HideLoading();
	}
	else if (view == 'countryCode') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'countryCode';
		Yup("#mainCOntent").html('');
		Yup("#mainContent").html(Util.countryCodeSelectionHtml());
		Main.HideLoading();
	}
	else if (view == 'forgetPassword') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'forgetPassword';
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.forgetPasswordHTML());
		Main.HideLoading();
		if (1 == 1) { Main.proccessAuthData(); }
	}
	else if (view == 'otpVerification') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'otpVerification';
		presentPagedetails.isChecked = false;
		//clevertapProfilepage appeared event
		profilesPageAppeared.profilesPagePageName = "otp submission"
		clevertapservice.profilePageEvent();
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.otpVerificationHTML());
		Main.HideLoading();
		if (1 == 1) { Main.proccessAuthData(); }
	}
	else if (view == 'signupOtpVerification') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'signupOtpVerification';
		//clevertap Profilepage appeared event
		profilesPageAppeared.profilesPagePageName = "otp submission"
		clevertapservice.profilePageEvent();
		Yup("#signInLeftSide").html("")
		Yup("#signInLeftSide").html(Util.signupOTPVerificationHTML());
		Main.HideLoading();
		if (1 == 1) { Main.proccessAuthData(); }
	}
	else if (view == 'changePassword') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'changePassword';
		presentPagedetails.isChecked = false;
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.changePasswordHTML());
		Main.HideLoading();
	}
	else if (view == 'accountDetails') {
		var tempMenusList = presentPagedetails.menusList;
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'settings';
		presentPagedetails.sectionIndex = {};
		presentPagedetails.menusList = tempMenusList;
		tempObjectData.landingFromSettings = false;
		if (Main.userProfile.userStatus) {
			Main.getUserInfo(true);
		}
		Yup("#mainContent").html('');
		// Yup(".coomingSoon").html('');
		Yup("#mainContent").html(Util.getAccountDetailsHTML());
		Yup(".imageFocus").removeClass("imageFocus");
		Yup("#account-0-0").addClass("imageFocus");
		if (isUserSignedOutinThisSession == false) {
			if (switchProfilesOption != false) {
				Main.getProfileApi(false, true);
			} else {
				Main.accountQr();
			}
		}
		// Yup(".imageFocus").removeClass("imageFocus");
		// Yup("#account-0-0").addClass("imageFocus");
		Main.sidebarClose();
		if (1 == 1) {
			keyHandlar.menuActiveHandular();
			// Yup(".imageFocus").removeClass("imageFocus");
			// Yup(".menu-item.active").addClass("imageFocus");
		}
		Main.HideLoading();
	} else if (view == 'signinSuccess') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'signinSuccess';
		//remove history of signin and signup pages
		utilities.removeAuthHistory();
		Yup("#mainContent").html('');
		// Yup("#mainContent").html(Util.signUpSuccess(tempObjectData.signUpMsg));	
		Main.showMenu();
		Main.apiCall(firstMenu)
		Main.HideLoading();
	}
	else if (view == 'noPackageView') {
		Yup("#mainContent").html('');
		Main.hideMenu();
		Yup("#mainContent").append(Util.noPackagesPage());
		Main.HideLoading();
	}
	else if (view == "passcode") {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'otp';
		Main.getActivateDeviceAPI(false);
	}
	else if (view == 'filters') {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'partner/watcho';
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.getFilters());
		Main.apiCall();
		Main.HideLoading();
	}
	else if (view == "language") {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'language';
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.languagesListHTML());
		Main.HideLoading();
	} else if (view == "introPageView") {
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'introPage';
		Yup("#mainContent").html('');
		Main.hideMenu();
		Yup("#mainContent").append(Util.signInHtml());
		Yup("#button_0").addClass('imageFocus');
		Main.HideLoading();
	}
	else if (view == "switchProfile") {
		var tempMenusList = presentPagedetails.menusList;
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'profile selection';
		presentPagedetails.menusList = tempMenusList;
		//	Main.hideMenu();
		Main.getProfileApi();
	}
	else if (view == 'profileLockOtpVerification') {
		//clevertapProfilepage appeared event
		profilesPageAppeared.profilesPagePageName = 'enter pin'
		clevertapservice.profilePageEvent();
		presentPagedetails = {};
		presentPagedetails.view = view;
		presentPagedetails.targetPath = 'profileLockOtpVerification';
		var clickedProfile = JSON.parse(utilities.getFromLocalStorage('clickedProfile'));
		Yup("#mainContent").html('');
		Yup("#mainContent").html(Util.profilePinVerificationHTML(clickedProfile));
		Main.hideMenu();
		Main.HideLoading();
	}
	// else if(view == "plansUpgrade"){
	// 	// var tempMenusList = presentPagedetails.menusList;
	// 	presentPagedetails = {};
	// 	presentPagedetails.view = view;
	// 	presentPagedetails.targetPath = 'plansUpgrade';
	// 	// presentPagedetails.menusList =  tempMenusList;
	// 	// Main.getProfileApi()
	// 	Main.getUpgradeData()
	// 	Main.hideMenu();
	// 	Main.HideLoading();	
	// }
	// else if(view == "tvshowDetails"){
	// 	Main.apiCall(presentPagedetails.tabsInfo.tabs[i])
	// }
	Yup("#mainContent").show();
}

// getting previous page a from back data and rendering. 
Main.previousPage = function () {
	Main.playerHideLoading();
	if (backData.length > 0) {
		Main.ShowLoading();
		presentPagedetails = backData[backData.length - 1];
		(tempObjectData.context == 'login' && (tempObjectData.context = '', tempObjectData.password = ''));
		if (checknetworkType == false) {
			presentPagedetails.pageReload = false;
			presentPagedetails.refreshContinueWatching = false;
			utilities.responseErrorCheck({ responseText: '' });
		}
		// (presentPagedetails.targetPath == 'section/continue_watching') && (presentPagedetails.pageReload=true); // viewall continue watching refresh
		if (presentPagedetails.pageReload && presentPagedetails.pageReload == true && presentPagedetails.targetPath != 'search') {
			backData.pop();
			if (presentPagedetails.targetPath == 'settings') {
				view = presentPagedetails.view;
				Main.processNext();
			} else {
				if (presentPagedetails.isCustomHeaderAdded == true) {
					commingFromMenus = true;
					clickedMenu = presentPagedetails.clickedMenu;;
				}
				persistanceData = []
				Main.apiCall(presentPagedetails.targetPath);
			}
		}
		else if (refreshPage == true && navigatFavListToDetails == true) {
			refreshPage = false
			// navigatFavListToDetails = false
			Main.showMenu();
			Main.apiCall(presentPagedetails.targetPath);
			backData.pop();
		}
		else {
			presentPagedetails.pageReload = false;
			// Yup("#mainContent").html('');
			// Yup("#mainContent").html(presentPagedetails.htmlData);
			var main = document.getElementById("mainContent");
			main.innerHTML = "";
			if (presentPagedetails.dom) {
				var targetDom = presentPagedetails.dom;
				while (targetDom && targetDom.id === "mainContent" && targetDom.children.length === 1 && targetDom.firstElementChild && targetDom.firstElementChild.id === "mainContent") {
					targetDom = targetDom.firstElementChild;
				}
				if (targetDom.id === "mainContent") {
					while (targetDom.firstChild) {
						main.appendChild(targetDom.firstChild);
					}
				} else {
					main.appendChild(targetDom);
				}
			}
			if (Yup('.banners').css('display') == 'block' && presentPagedetails.banners.length > 0) {
				if (!!presentPagedetails.clickedBannerPosition) {
					keyHandlar.callPreviews("banners", presentPagedetails.clickedBannerPosition)
				}
				BannerMove();
			}
			//check when already have selected the profile and coming back without clicking pin otp verification of profile page to show menus
			var currentUserDetails = localStorage.getItem('currentUserDetails');
			// if (!!currentUserDetails && view == "profileLockOtpVerification" && presentPagedetails && presentPagedetails.profileScreenType != "who watching") {
			// 	Main.showMenu();
			// }
			if (view != "profileLockOtpVerification" && presentPagedetails.view != "channelDetails" || presentPagedetails.view == "accountDetails") {
				Main.showMenu();
				if (typeof keyHandlar !== "undefined" && typeof keyHandlar.menuActiveHandular === "function") {
					keyHandlar.menuActiveHandular();
				}
				// Guarantee top-menu-container visibility on pages with active submenus after navigation
				if (Yup('.top-menu-item.top-menu-active').length > 0) {
					Yup("#top-menu-container").show();
					Yup("#top-menu-container").css("display", "block");
				}
			}
			if (presentPagedetails.view == "seasonsDetails" || presentPagedetails.view == "tvshowDetails" || presentPagedetails.view == "introPageView" || presentPagedetails.view == "movieDetails" || presentPagedetails.view == 'player' || presentPagedetails.view == 'plansUpgrade' || presentPagedetails.view == 'bannersPlansUpgrade') {
				Main.hideMenu();
			}
			if (view == "signin" && presentPagedetails.targetPath == "home") {
				if (!!presentPagedetails.clickedCard) {
					Yup(".imageFocus").removeClass("imageFocus");
					Yup('#' + presentPagedetails.clickedCard + '').addClass('imageFocus');
					presentPagedetails.clickedCard = ''
					if (Yup('.banners').css('display') == 'block' && presentPagedetails.banners.length > 0) {
						BannerMove();
					}
				}
				else {
					Yup('.imageFocus').removeClass('imageFocus');
					Yup('.menu-active').removeClass('menu-active');
					Yup('.top-menu-active').removeClass('top-menu-active');
					Yup('.side-menu-item[menu-code="home_tv"]').addClass('menu-active');
					Yup('.top-menu-item').first().addClass('top-menu-active');
					Yup('.side-menu-item[menu-code="home_tv"]').addClass("imageFocus");
					Main.sidebarOpen();
					if (Yup('.banners').css('display') == 'block' && presentPagedetails.banners.length > 0) {
						BannerMove();
					}
				}
			}
			else if (view == "signin" && comingToSign == true) {
				Yup(".imageFocus").removeClass("imageFocus");
				// Yup('#'+presentPagedetails.menusEnterd[0] +'').addClass('imageFocus');
				Yup('.menu-active').addClass('imageFocus');
				comingToSign = false
				Main.sidebarOpen();
				backData = []
			}
			// else{
			// 	Yup(".imageFocus").removeClass("imageFocus");
			// 	Yup("#WatchBannerBtn-0").addClass("imageFocus")

			// }

			// contnue watching section update
			if (presentPagedetails.refreshContinueWatching == true) {
				presentPagedetails.refreshContinueWatching = false;
				if (
					Main.userProfile.userStatus == true &&
					presentPagedetails.isContinueWatchingavailable == true &&
					isUserSignedOutinThisSession == false
				) {
					Main.updateContinueWatchingData();
				}
			}
			if (presentPagedetails.view == "player") {
				utilities.refreshContinueWatching();
			}

			Main.HideLoading();
			backData.pop();
			view = presentPagedetails.view;
			// if(view == 'signin' || view == 'forgetPassword' || view =='signup' ){  //After code selection refecting on signin pages
			// 	Yup(".countryCode").html('');
			// 	Yup(".countryCode").html(Util.countryCodeForm());
			// }
			// if(presentPagedetails.targetPath == 'switchProfile'){
			// 	view = presentPagedetails.view;
			// 	Main.hideMenu();
			// }
			// if(view == 'tvguide'){
			// 	keyHandlar.positonliveTag();
			// 	keyHandlar.initLiveSubscribe();
			// }
			if (comingFromSearch == true && presentPagedetails.view == 'content') {
				Yup(".imageFocus").removeClass("imageFocus");
				Yup("#menu-0").addClass('imageFocus');
				comingFromSearch = false;
			}
			if (presentPagedetails.view == 'content' && presentPagedetails.targetPath == 'favourites') {
				Yup(".imageFocus").removeClass("imageFocus");
				Yup('#' + presentPagedetails.clickedCard + '').addClass('imageFocus');
			}
			if (presentPagedetails.view == "signin") {
				Main.hideMenu();
			}
			var id = Yup('.imageFocus').attr("id");
			if (id && view == "content") {
				var splitData = id.split('-');
				var data = keyHandlar.getSectionItemData(presentPagedetails, parseInt(splitData[1]), parseInt(splitData[2]));
				var focusClassName = Yup('.imageFocus').attr("class");
				if (focusClassName && focusClassName.includes("expand_preview_poster") && focusClassName.includes("view_all") != true) {
					keyHandlar.clearPreviousExpandPreview();
					keyHandlar.handleExpandPreviewFocus(
						splitData[1],
						parseInt(splitData[2]),
						data
					);
					return;
				}
				else {
					keyHandlar.callPreviews("sections", splitData[1], splitData[2], data)
				}
			}
			Main.proccessAuthData();
			// Main.getActivateDeviceAPI();
		}

	}
	else {
		if (presentPagedetails.targetPath != 'home' || presentPagedetails.pageSubType != "home") {
			if (typeof adsManager !== "undefined" && adsManager !== null) {
				if (adsManager.isAdPlaying === true) {
					if (typeof adsManager.destroy === "function") {
						try {
							adsManager.destroy();
						} catch (e) {
							console.log("Error while destroying adsManager:", e);
						}
					}
				}
			}
			Main.apiCall(firstMenu);
		}
	}
}

// storing the back DATA
Main.addBackData = function (targetPath, result) {
	if (Yup('.banners').css('display') == 'block' && presentPagedetails.banners && presentPagedetails.banners.length > 0) {
		BannerMove();
	}
	// presentPagedetails.htmlData=(Yup('#mainContent').html() ).toString();
	var mainEl = document.getElementById('mainContent');
	if (mainEl) {
		while (mainEl && mainEl.id === 'mainContent' && mainEl.children.length === 1 && mainEl.firstElementChild && mainEl.firstElementChild.id === 'mainContent') {
			mainEl = mainEl.firstElementChild;
		}
		presentPagedetails.dom = mainEl.cloneNode(true);
	}
	if (targetPath == firstMenu) {
		backData = [];
	}
	else if (presentPagedetails && presentPagedetails.pageType == 'details') {
		if (result && result.response && result.response.info && result.response.info.attributes && result.response.info.attributes.contentType && result.response.info.pageType == 'details' && result.response.info.attributes.contentType == 'movie' && presentPagedetails.pageSubType == 'movieDetails') {
			//previous pageType and Sub PageType is same as next or current resposne page type
		} else if (result && result.response && result.response.info && result.response.info.attributes && result.response.info.attributes.contentType && result.response.info.attributes.contentType == 'tvshowDetails' && presentPagedetails.pageSubType == 'tvshowDetails') {
			//previous pageType and Sub PageType is same as next or current resposne page type
		}
		else if (result && result.response && result.response.info && result.response.info.attributes && result.response.info.attributes.contentType && result.response.info.attributes.contentType == 'channel' && presentPagedetails.pageSubType == 'channelDetails') {
			//previous pageType and Sub PageType is same as next or current resposne page type
		}
		else {
			if (presentPagedetails.targetPath != targetPath) {
				backData.push(presentPagedetails);
			}
		}
	}
	else if (presentPagedetails && presentPagedetails.pageType == 'content') {
		if (presentPagedetails.targetPath != targetPath) {
			var contentCount = 0;
			var contentIndex = [];
			if (backData.length > 3) {
				for (var i = backData.length - 1; i >= 0; i--) {
					if (backData[i].pageType == 'content') {
						for (var j = 0; j < systemConfigs.menus.length; j++) {
							if (systemConfigs.menus[j].targetPath == backData[i].targetPath) {
								contentCount++;
								contentIndex.push(i);
							}
						}
					}
				}
			}
			if (contentCount < 5) {
				backData.push(presentPagedetails);
			} else {
				backData.splice(contentIndex[contentIndex.length - 1], 1);
				backData.push(presentPagedetails);
			}
		}
	}
	else if (presentPagedetails && presentPagedetails.pageType == 'player') {
	}
	else {
		if (presentPagedetails.targetPath != targetPath && presentPagedetails.targetPath != 'settings' && presentPagedetails.targetPath != 'activeScreens') {
			backData.push(presentPagedetails);
		}
		else if (targetPath == "profileLockOtpVerification" && presentPagedetails.targetPath == 'settings') {
			backData.push(presentPagedetails);
		}
	}

}

// signIn Api
Main.requestSignIn = function (forceLogin) {
	Main.ShowLoading();
	var api_toCall;
	var num = '';
	if (!!tempObjectData.isMobile) { num = Main.mobileCode; }
	num = "91" + tempObjectData.mobileNo
	var data = {
		"login_id": num,
		"login_key": tempObjectData.password,
		"login_mode": (tempObjectData.context == 'login') ? 2 : 1,
		"manufacturer": "123",
		"ucv": "24",
		"force_login": false
	};
	// if(forceLogin == true){
	// 	data["force_login"]=true;
	// }
	if (systemConfigs.configs.encryptAuthApi == "true") {
		data['login_mode'] = '' + data['login_mode'];
		if (forceLogin == true) {
			data["force_login"] = 'true';
		}
		api_toCall = "/service/api/v1/send";
		data = JSON.stringify({
			'data': utilities.encryptData(data),
			'metadata': utilities.encryptData(JSON.stringify({ "request": "signin" })),
		})
	} else {
		data['login_mode'] = parseInt(data['login_mode']);
		api_toCall = (tempObjectData.context == 'login') ? "/service/api/auth/v1/signin" : "/service/api/auth/v1/signin";
		if (data['login_mode'] === 1) {
			clevertapservice.sendCleverTapEvent('otp generated', {
				'status': "success",
				'reason for failure': ""
			});
		}
	}
	Yup.ajax({
		url: Main.mainApi + api_toCall,
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			if (systemConfigs.configs.encryptAuthApi == "true") {
				var info = JSON.parse(data);
				var result = utilities.decryptData(info.data);
				result = JSON.parse(result);
			} else {
				var result = JSON.parse(data);
			}

			if (result.status == true) {
				// Main.getActiveProfiles(2,utilities.encryptData(Main.userProfile.mobile));
				var userDetails = result.response
				localStorage.setItem("userDetails", JSON.stringify(userDetails));
				utilities.settingUserData(result);
				var userDetails = JSON.parse(localStorage.getItem('userDetails'));
				userDetails.phoneNumber = userDetails.phoneNumber.replace(/^91-/, '');
				var comingFromRequestSignin = true
				Main.getUserInfo(true, comingFromRequestSignin);
				clevertapservice.sendCleverTapEvent('Lg_Samsung_Opens', {
					"sdk version": appConfig.staticSubVersion,
					"OsVersion": device_info && device_info.OsVersion ? device_info.OsVersion : "",
					"tv_model": device_info && device_info.model ? device_info.model : "",
					"modelYearstr": device_info && device_info.modelYear ? device_info.modelYear : "",
					"userAgent": device_info && device_info.userAgent ? device_info.userAgent : "",
					"browserVersion": device_info && device_info.browserVersion ? device_info.browserVersion : "",
				})
				if (result.response.actionCode == 2 || result.response.actionCode == 4) {
					tempObjectData.actionCode = result.response.actionCode;
					tempObjectData.context = 'login';
					Main.sendOTP();
				} else {
					var selected_targetSign = localStorage.getItem('selected_targetSign');

					if (!!selected_targetSign && (selected_targetSign !== 'favourites' || switchProfilesOption == false)) {
						if (switchProfilesOption != false) {
							Main.getProfileApi(false, false, true);
						}
						var userDetails = JSON.parse(localStorage.getItem('userDetails'));
						setTimeout(function () {
							clevertapservice.setUserSession();
							console.log("clevertapservice.setUserSession", clevertapservice.setUserSession)
						}, 500);
						tempObjectData = {};
						targetComingFromSign = true
						Main.apiCall(selected_targetSign)
						Yup('#menu-profile-name').html(Util.menusProfile());
						localStorage.removeItem('selected_targetSign');
						refreshHome = true;
						backData = []
					}
					else if (switchProfilesOption != false) {
						clevertapservice.setUserSession();
						//(tempObjectData.context=='login') && (backData.pop());
						tempObjectData = {};
						// Main.apiCall(firstMenu);	
						view = 'switchProfile';
						Main.processNext();
					}
					else {
						var userDetails = JSON.parse(localStorage.getItem('userDetails'));
						setTimeout(function () {
							clevertapservice.setUserSession();
							console.log("clevertapservice.setUserSession", clevertapservice.setUserSession)

						}, 500);
						tempObjectData = {};
						Yup('#menu-profile-name').html(Util.menusProfile());
						Main.showMenu();
						Main.apiCall(firstMenu);
					}
					//(tempObjectData.context=='login') && (backData.pop());

					// view = 'switchProfile';
					// Main.processNext();
				}
				backData = [];
			} else if (result.status == false) {
				Main.HideLoading();
				if (result.error.code == '-6') { // non-mobile verified user trying to Login					
					// Main.popupData ={
					// 	popuptype : 'info',
					// 	message : result.error.message,
					// 	buttonCount : 1,
					// 	yesText : 'Okay',
					// 	yesTarget : 'close',
					// 	onBack : 'close'
					// }
					// Yup("#popUpFDFS").html(Util.showPopup());
					// Yup("#popup-btn-1").addClass('popupFocus');
					tempObjectData.actionCode = (!!result.error.actionCode) ? result.error.actionCode : result.error.code;
					tempObjectData.context = 'login';
					Main.sendOTP();
				}
				else if (result.error.code == '-3') {
					clevertapservice.sendCleverTapEvent('registration failed', {
						'reason': "Invalid OTP",
						'mobile no': "",
						'source': view == "search" ? "search" : "carousel",
					});
					utilities.genricPopup(result.error.message, 'info');
				}
				else if (result.error.code == '-17') {  //session alerady registerd
					Main.SessionID = '';
					utilities.setLocalStorage("sessionId", '');
					Main.getSessionAPI({ type: 'signin', 'force_login': forceLogin }, Main.requestSignIn);
				}
				else if (result.error.code == '101') { // Max sessions reached
					comingFromTheSignin = true
					Yup('.toastmsg_template').html(result.error.message)
					Yup('.toastmsg_template').css('display', 'block');
					setTimeout(function () {
						Yup('.toastmsg_template').css('display', 'none');
					}, 1000);
					Main.getActiveProfiles(2, utilities.encryptData(num));

				}
				else if (result.error.code == 401 || result.error.code == 500) {  // if session expires
					Main.SessionID = '';
					utilities.setLocalStorage('sessionID', '');
					Main.getSessionAPI({ type: 'signin', 'force_login': forceLogin }, Main.requestSignIn);
				}

				else {
					utilities.genricPopup(result.error.message, 'info');
				}
			}
		},
		error: function (e) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);

		},
		timeout: 60000
	});
}

Main.sendOTP = function () {
	Main.ShowLoading();
	var data, apiUrl;
	var data = { "context": "login", "mobile": "91" + tempObjectData.mobileNo };
	// if(!!tempObjectData.isMobile){data["mobile"]= Main.mobileCode +tempObjectData.mobileNo}
	// else{data["email"]=tempObjectData.mobileNo}	
	// {"mobileno":"8074824703"};
	//if(!!tempObjectData.isMobile)
	//{data["mobile"]= Main.mobileCode +tempObjectData.mobileNo}
	// else{data["email"]=tempObjectData.mobileNo}	
	apiUrl = '/service/api/auth/get/otp'; // get otp API for forgetpassword	
	Yup.ajax({
		url: Main.mainApi + apiUrl,
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				clevertapservice.sendCleverTapEvent('otp submission page viewed', {
					'moblie number': result.response.target
				})

				// tempObjectData.referenceId = result.response.referenceId;
				// if(view == 'forgetPassword'){
				// 	view = 'otpVerification';
				// 	Main.processNext();
				// }
				// else if(view == 'signup' || view == 'signin'){
				// 	view = 'signupOtpVerification';
				// 	Main.processNext();
				// }				
			}
			if (result.status == true) {
				profilesPageAppeared.profilesPagePageName = "number submission"
				profilesPageAppeared.action = 'get otp';
				clevertapservice.profileClickedEvent();
				tempObjectData.referenceId = result.response.referenceId;
				//tempObjectData.referenceId = result.response.details.otpReferenceId
				if (view == 'forgetPassword') {
					view = 'otpVerification';
					Main.processNext();
				}
				else if (view == 'signup' || view == 'signin') {
					view = 'signupOtpVerification';
					Main.processNext();
				}
			}
			else if (result.status == false) {
				if (result.error.code == -1000) {
					profilesPageAppeared.profilesPagePageName = "number submission"
					profilesPageAppeared.action = 'get otp';
					clevertapservice.profileClickedEvent();
					Main.requestSignUpV2();
				}
				else if (result.error.code == 403) {
					profilesPageAppeared.profilesPagePageName = "number submission"
					profilesPageAppeared.action = 'get otp';
					clevertapservice.profileClickedEvent();
					Main.nonViUserData()
				}
				else if (result.error && result.error.message) {
					profilesPageAppeared.profilesPagePageName = "number submission"
					profilesPageAppeared.action = 'get otp';
					clevertapservice.profileClickedEvent();
					utilities.genricPopup(result.error.message, 'info');
				}
				else {
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
						utilities.genricPopup('Something Went Wrong', 'unknown');
					}
				}
			}
		},
		error: function (e) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

//get profile API
Main.getProfileApi = function (firstTimeLaunch, fromSettingsLoad, silentFetchMaster) {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + '/service/api/auth/list/user/profile',
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (result.status == true) {
				if (result.response.length > 0) {
					if (silentFetchMaster) {
						var masterProfile = result.response[0];
						for (var m = 0; m < result.response.length; m++) {
							if (result.response[m].isMasterProfile) {
								masterProfile = result.response[m];
								break;
							}
						}

						var profileImageUrl = "https://d2ivesio5kogrp.cloudfront.net/static/watcho/images/profile-pic1.svg";
						if (typeof systemConfigs !== 'undefined' && systemConfigs.configs && systemConfigs.configs.profileImages) {
							var profileImages = {};
							if (typeof systemConfigs.configs.profileImages === "string") {
								try {
									profileImages = JSON.parse(systemConfigs.configs.profileImages);
								} catch (e) { }
							} else {
								profileImages = systemConfigs.configs.profileImages;
							}
							profileImageUrl = profileImages["Default"] || profileImageUrl;
						}
						masterProfile.profileImageUrl = profileImageUrl;

						localStorage.setItem('currentUserDetails', JSON.stringify(masterProfile));
						isUserSignedOutinThisSession = false;
						Yup('#menu-profile-name').html(Util.menusProfile());
						return;
					}
					backData = [];
					presentPagedetails.section = result
					if (view == 'accountDetails') {
						Yup('.account-page').html('');
						Yup('.account-page').html(Util.settingProfilesPage(result));
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
							var isProfileMatched = false;
							for (var i = 0; i < presentPagedetails.section.response.length; i++) {
								var profilesData = presentPagedetails.section.response[i]
								if (profilesData.profileId == currentUserDetails.profileId) {
									Yup(".imageFocus").removeClass("imageFocus");
									Yup("#profile-" + i).addClass('imageFocus');
									isProfileMatched = true;
								}
							}
							if (!isProfileMatched) {
								Yup(".imageFocus").removeClass("imageFocus");
								Yup("#profile-0").addClass('imageFocus');
							}
						}
						else {
							Yup(".imageFocus").removeClass("imageFocus");
							Yup("#profile-0").addClass('imageFocus');
						}
						Yup('.account-page').removeClass("deviceLimitScreens");
						profilesPageAppeared.profilesPagePageName = 'profile selection'
						//clevertapProfilepage appeared event
						clevertapservice.profilePageEvent();
					}
					else {
						Main.hideMenu();
						var currentUserDetails = JSON.parse(localStorage.getItem('currentUserDetails'));
						if (switchProfilesOption != false && !currentUserDetails) {
							Yup("#mainContent").show();
							Yup("#mainContent").html('');
							Yup("#mainContent").html(Util.getProfileHTML(result));
							Util.startProfileBgRotation();
							Yup(".imageFocus").removeClass("imageFocus");
							Yup("#profile-0").addClass('imageFocus');
							Yup('.account-page').removeClass("deviceLimitScreens");
							if (firstTimeLaunch != true) {
								profilesPageAppeared.profilesPagePageName = 'profile selection'
								//clevertapProfilepage appeared event
								clevertapservice.profilePageEvent();
							}
						}
						else if (switchProfilesOption != false && !!currentUserDetails) {
							if (firstTimeLaunch == true) {
								Yup("#mainContent").show();
								Yup("#mainContent").html('');
								Yup("#mainContent").html(Util.getProfileHTML(result));
								Util.startProfileBgRotation();
							}
							else {
								var comingFromProfileMenus = true
								Yup("#mainContent").html('');
								Yup("#mainContent").html(Util.getProfileHTML(result, comingFromProfileMenus));
								Util.startProfileBgRotation();
								comingFromProfileMenus = false
							}
							// try {
							// 	var currentUserDetails = localStorage.getItem('currentUserDetails');
							// 	if (currentUserDetails) {
							// 		if (typeof currentUserDetails === 'string') {
							// 			currentUserDetails = JSON.parse(currentUserDetails);
							// 		} else {
							// 			currentUserDetails = userDetailsString;
							// 		}
							// 	}
							// } catch (error) {
							// 	console.error("Error parsing currentUserDetails from localStorage:", error);
							// }
							if (presentPagedetails.section.response.length > 0 && !!currentUserDetails && firstTimeLaunch != true) {
								var isProfileMatched = false;
								for (var i = 0; i < presentPagedetails.section.response.length; i++) {
									var profilesData = presentPagedetails.section.response[i]
									if (profilesData.profileId == currentUserDetails.profileId) {
										Yup(".imageFocus").removeClass("imageFocus");
										Yup("#profile-" + i).addClass('imageFocus');
										isProfileMatched = true;
									}
								}
								if (!isProfileMatched) {
									Yup(".imageFocus").removeClass("imageFocus");
									Yup("#profile-0").addClass('imageFocus');
								}
							}
							else {
								Yup(".imageFocus").removeClass("imageFocus");
								Yup("#profile-0").addClass('imageFocus');
							}
							Yup('.account-page').removeClass("deviceLimitScreens");
							if (firstTimeLaunch == false) {
								profilesPageAppeared.profilesPagePageName = 'profile selection'
								//clevertapProfilepage appeared event
								clevertapservice.profilePageEvent();
							}
							firstTimeLaunch = false
						}
						else {
							Main.showMenu();
							Main.apiCall(firstMenu)
						}
					}
				}
				// }
				else {
					isUserSignedOutinThisSession = false
					Main.showMenu();
					Main.apiCall(firstMenu)
				}
			} else {
				if (result.error.code == 401) {
					Main.HideLoading()
					Main.popupData = {
						popuptype: 'unknown',
						message: result.error.message,
						buttonCount: 1,
						yesText: 'Try Again',
						yesTarget: 'sessionLogout',
						onBack: 'exit',
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
				else if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				} else {
					utilities.genricPopup('Something Went Wrong', 'unknown');
				}
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	})
}

// get user profile API 
Main.getSwitchProfileApi = function (fromLockPinProfile) {
	Main.ShowLoading();
	if (tempObjectData.profilepassword != undefined && tempObjectData.profilepassword !== null && tempObjectData.isProfileLockActive != "false") {
		var data = JSON.stringify({ 'profileId': +tempObjectData.selectProfileId, 'passCode': tempObjectData.profilepassword })
	} else {
		var data = JSON.stringify({ 'profileId': +tempObjectData.profileId })
	}

	Yup.ajax({
		url: Main.mainApi + '/service/api/auth/activate/user/profile',
		type: "POST",
		data: data,
		contentType: "application/json; charset=utf-8",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				isUserSignedOutinThisSession = false;
				// Yup('.toastmsg_template').html(result.response.message)
				// Yup('.toastmsg_template').css('display', 'block');
				// setTimeout(function() {
				//     Yup('.toastmsg_template').css('display', 'none');
				//     }, 1000);
				if (view == "profileLockOtpVerification") {
					Main.previousPage();
				}
				var profileDetailsResponse = presentPagedetails.profileDetails.response
				for (var i = 0; i < profileDetailsResponse.length; i++) {
					if (profileDetailsResponse[i].profileId == tempObjectData.profileId) {
						var currentUserDetails = profileDetailsResponse[i];
						var clickedProfile = JSON.parse(localStorage.getItem("clickedProfile"));
						if (clickedProfile && clickedProfile.profileImageUrl) {
							currentUserDetails.profileImageUrl = clickedProfile.profileImageUrl;
						}
						var oldProfile = JSON.parse(localStorage.getItem("currentUserDetails")); // Get the old profile details
						localStorage.setItem("currentUserDetails", JSON.stringify(currentUserDetails)); // Update localStorage with new profile
						if (currentUserDetails.isDevotional == true) {
							profilesPageAppeared.action = "devotional"
						}
						else {
							profilesPageAppeared.action = 'select user'
						}
						if (fromLockPinProfile != true) {
							clevertapservice.profileClickedEvent();
						}
						var tab;
						if (view == 'accountDetails') {
							tab = 'settings'
						}
						else {
							tab = 'profile selection'
						}
						if (presentPagedetails && presentPagedetails.profileScreenType != "who watching") {
							if (!!oldProfile && !!currentUserDetails && currentUserDetails.profileId != oldProfile.profileId) {
								clevertapservice.sendCleverTapEvent('profile switched', {
									'old profile': oldProfile && oldProfile.name ? oldProfile.name : "",
									'new profile': currentUserDetails.name ? currentUserDetails.name : "",
									'tab': tab ? tab : ''

								})
							}
						}
						fromLockPinProfile = false
					}
				}
				Main.getUserInfo(true);
				Main.getConfig();
				Main.sideMenuHTML();
				Main.showMenu();
				var selected_targetSign = localStorage.getItem('selected_targetSign');

				if (!!selected_targetSign) {
					if (switchProfilesOption != false) {
						Main.getProfileApi(false, false, true);
					}
					targetComingFromSign = true
					Yup('#mainContent').html('');
					Main.apiCall(selected_targetSign)
					Yup('#menu-profile-name').html(Util.menusProfile());
					localStorage.removeItem('selected_targetSign');
					refreshHome = true;
					backData = []
				}
				else {
					Yup('#mainContent').html('');
					Main.apiCall(firstMenu);
				}
			} else if (result.status == false) {
				Main.HideLoading();
				if (result.error.code == -4) {
					// Yup('.toastmsg_template').html('Please enter Valid PIN.')
					// Yup('.toastmsg_template').css('display', 'block');
					// setTimeout(function() {
					Yup('#errorDisplay').css('display', 'block');
					// 	}, 1000);

				}
				else if (result.error.code == 401) {
					Main.HideLoading();
					Main.popupData = {
						popuptype: 'unknown',
						message: result.error.message,
						buttonCount: 1,
						yesText: 'Try Again',
						yesTarget: 'sessionLogout',
						onBack: 'sessionLogout',
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
				else if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				}
				else {
					utilities.genricPopup('Something Went Wrong', 'unknown');
				}
			}
			else {
				Main.HideLoading();
				if (result.error.code == 401) {
					Main.popupData = {
						popuptype: 'unknown',
						message: result.error.message,
						buttonCount: 1,
						yesText: 'Try Again',
						yesTarget: 'sessionLogout',
						onBack: 'sessionLogout',
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
			}
		},
		error: function (errObj) {
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	})
}

// get userinfo API 
// Main.getProfileInfo = function () {
// 	Yup.ajax({
// 		url: Main.mainApi +  '/service/api/auth/user/info',
// 		type: "GET",
// 		headers: {
// 			"tenant-code": Main.tenantCode,
// 			"box-id": Main.getBOXID(),
// 			"session-id": Main.getSessionID(),
// 		},
// 		success: function (data) {
// 			result = JSON.parse(data);
// 			Main.HideLoading();	
// 			if(result.status == true){
// 				Main.apiCall(firstMenu);	
// 			}else{
// 				if(result.error && result.error.message ){
// 					utilities.genricPopup(result.error.message,'info');						
// 				}else{
// 					utilities.genricPopup('Something Went Wrong','unknown');
// 				}
// 			}
// 		},
// 		error: function (errObj) {
// 			Main.HideLoading();		
// 			utilities.responseErrorCheck(errObj);
// 		},
// 		timeout: 60000
// });
// }

// settings page
Main.getActivePackages = function () {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/user/activepackages",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = JSON.parse(data);
			presentPagedetails.settingsActivepackages = result.response;
			Yup('#user-active-packages').html('');
			Yup('#user-active-packages').html(Util.getActivePackages());
			if ((!presentPagedetails.profileScreenType && presentPagedetails.view != "profileLockOtpVerification" && view != "plansUpgrade" && view != "bannersPlansUpgrade" ) || (presentPagedetails && presentPagedetails.contentNotFound == true) || (presentPagedetails && presentPagedetails.view == 'accountDetails')) {
				Main.HideLoading();
			}
		},
		error: function (errObj) {
			presentPagedetails.settingsActivepackages = [];
			Main.HideLoading();
		},
		timeout: 60000
	});
}

Main.getTranctionDetails = function () {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/transaction/history",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: {
			"page": 0
		},
		success: function (data) {
			result = JSON.parse(data);
			presentPagedetails.transactionDetails = result.response;
			Main.HideLoading();
		},
		error: function (errObj) {
			presentPagedetails.transactionDetails = [];
			Main.HideLoading();
		},
		timeout: 60000
	});
}

Main.signout = function () {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/signout",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			signOutProccess();
			clevertapservice.sendCleverTapEvent('popup', {
				'action': 'button clicked',
				'label': 'Button',
				'popup name': 'signout',
				'button label': "confirm",
				'tab': ctEvent.tabName,
			})
			Main.HideLoading();
		},
		error: function (errObj) {
			signOutProccess();
			Main.HideLoading();
		},
		timeout: 60000
	});
}

function signOutProccess() {
	Main.BOXID = '';
	Main.sessionID = '';
	backData = [];
	presentPagedetails = {};
	popupData = {};
	utilities.setLocalStorage('sessionID', '');
	utilities.setLocalStorage('boxNo', '');
	utilities.resetUserData();
	userDetails = ''
	profilesPageAppeared.profilesPageAppearedSource = ''
	profilesPageAppeared.profilesPagePageName = ''
	localStorage.removeItem('currentUserDetails');
	localStorage.removeItem('userDetails');
	localStorage.removeItem('selected_targetSign');
	localStorage.removeItem("selectedvidIndex");
	localStorage.removeItem("clickedProfile")
	view = "signout";
	isUserSignedOutinThisSession = true;
	clickedMenu = {};
	commingFromMenus = false;
	Yup('.toastmsg_template').html('Logged out succesfully')
	Yup('.toastmsg_template').css('display', 'block');
	setTimeout(function () {
		Yup('.toastmsg_template').css('display', 'none');
		var comingFromSignOut = true
		Main.apiCall(firstMenu, '', comingFromSignOut)
	}, 1000);

	// Yup('#mainContent').html(Util.signout());

}
Main.verifyOtpForgetPassword = function (recivedOtp) {
	Main.ShowLoading();
	var data = {
		"otp": parseInt(recivedOtp),
		"password": tempObjectData.password,
		"mobile": "91" + tempObjectData.mobileNo
	};
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/update/password",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (result.status == true) {
				Main.popupData = {
					popuptype: 'info',
					message: result.response.message,
					buttonCount: 1,
					yesText: 'Sign In',
					yesTarget: 'goto_signin_from_password_reset',
					onBack: 'goto_signin_from_password_reset'
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			} else if (result.status == false) {
				if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				} else {
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
						utilities.genricPopup('Something Went Wrong', 'unknown');
					}
				}
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

// get Stream
Main.getStream = function (res, responseArray, hasPin, id, clicked) {
	var route = res.response.info.path
	var api_toCall, type, encryptObj;
	if (res.response.info.attributes && res.response.info.attributes.playerType == 'trailer') {
		api_toCall = "/service/api/v1/page/stream?path=" + route + "&&stream_type=trailer";
		type = "GET";
	} else {
		if (hasPin == undefined && responseArray.streamStatus && responseArray.streamStatus.isParentControlled) {
			if (view == 'player') {
				ShakaPlayer.pause();
			}
			else {
				view = 'player';
				Main.addBackData(responseArray.targetPath, res);
				presentPagedetails = {};
			}
			presentPagedetails.responseArray = responseArray;
			presentPagedetails.res = res;
			Yup('.imageFocus').removeClass('imageFocus')
			Main.popupData = {
				popuptype: "Stream_pin_validation"
			}
			Yup('#popUpFDFS').html(Util.stream_pin_popup());
			Main.HideLoading();
			return;
		}
		//Check for Adult Popup condition
		else if (Main.shouldShowAdultPopup(responseArray, clicked)) {
			Main.popupData = {
				popuptype: 'adultPopup',
				message: '',
				message2: '',
				buttonCount: 2,
				noTarget: 'close',
				noText: 'Cancel',
				yesText: 'Confirm',
				yesTarget: 'adultPopup',
				onBack: 'close',
			};

			if (view == 'player') {
				ShakaPlayer.pause();
			} else {
				view = 'player';
				Main.addBackData(responseArray.targetPath, res);
				presentPagedetails = {};
			}

			presentPagedetails.responseArray = responseArray;
			presentPagedetails.res = res;

			var config = systemConfigs && systemConfigs.configs && systemConfigs.configs.adultContentWarningPopup;
			// Parse config if it's a string
			if (typeof config === 'string') {
				try {
					config = JSON.parse(config);
				} catch (e) {
					console.log("Invalid adult popup config");
					return false;
				}
			}
			Yup("#popUpFDFS").html(Util.adultPopupConfirmation(config));
			Yup("#popup-btn-1").addClass('popupFocus');
			Main.HideLoading();
			clevertapservice.sendCleverTapEvent('popup', {
				'action': 'popup displayed',
				'label': 'explicit content',
				'popup name': 'adult content warning',
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
			})
			return;
		}
		if (Main.systemFeatures && Main.systemFeatures.encryptApisList && Main.systemFeatures.encryptApisList.fields.stream == 'true') {
			type = "POST";
			api_toCall = "/service/api/v1/send";
			if (hasPin) {
				encryptObj = {
					"data": utilities.encryptData(JSON.stringify({ "path": route, "pin": hasPin })),
					"metadata": utilities.encryptData(JSON.stringify({ "request": "page/stream" })),
				}
			} else {
				encryptObj = {
					"data": utilities.encryptData(JSON.stringify({ "path": route })),
					"metadata": utilities.encryptData(JSON.stringify({ "request": "page/stream" })),
				}
			}
		} else {
			if (hasPin) {
				api_toCall = "/service/api/v1/page/stream?path=" + route + "&pin=" + hasPin.trim();
				type = "GET";
			} else {
				api_toCall = "/service/api/v1/page/stream?path=" + route + "&include_ads=true"
				type = "GET";
			}
		}
	}
	Yup.ajax({
		url: Main.mainApi + api_toCall,
		type: type,
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(encryptObj),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.ShowLoading();
			if (Main.systemFeatures && Main.systemFeatures.encryptApisList && Main.systemFeatures.encryptApisList.fields.stream == 'true') {
				var info = JSON.parse(data);
				var result;
				if (info.data && typeof info.data == 'string') { //if encrypted response
					result = JSON.parse(utilities.decryptData(info.data));
				}
				else { //no encrypted response
					result = info;
				}
			} else {
				var result = JSON.parse(data);
			}
			if (result.status == true) {
				responseArray.steamResponse = result.response;
				responseArray.navigationFrom = presentPagedetails.view;
				responseArray.adUrlResponse = result.response.adUrlResponse
				if (responseArray.steamResponse && responseArray.steamResponse.sessionInfo) {
					streamPollGlob = responseArray.steamResponse.sessionInfo.streamPollKey
				}
				if (responseArray.steamResponse.streamStatus && responseArray.steamResponse.streamStatus.seekPositionInMillis && responseArray.steamResponse.streamStatus.seekPositionInMillis > 0 && presentPagedetails.isvideoResume == true) { // For startOver and Resume
					// Main.popupData ={
					// 	popuptype : 'startOver',
					// 	headerTitle:"Would you like to Resume at",
					// 	message : utilities.toHHMMSS(responseArray.steamResponse.streamStatus.seekPositionInMillis),
					// 	buttonCount : 2,  
					// 	yesText:'Resume',
					// 	yesTarget:'resume',       
					// 	noTarget:'startOver',
					// 	noText:'Start Over',
					// 	onBack : 'close',
					// 	responseArray : responseArray,
					// 	result : res,
					// }
					// Yup("#popUpFDFS").html(Util.showPopup());	
					// Yup("#popup-btn-1").addClass('popupFocus');
					responseArray.isResume = true;
				} else {
					responseArray.isResume = false;
				}
				if (presentPagedetails.view == 'player') {
					analytics.plugin.handlePlayEndedByUser();
					try {
						media.pause();
						media.stop();
						media.unsetListener();
					}
					catch (e) { }
				}
				if (hasPin == undefined && targetComingFromSign == false && presentPagedetails.view != "upiPaymentPage") {
					Main.addBackData(responseArray.targetPath, res);
				}
				Yup('#popUpFDFS').html('');
				Main.popupData = {}
				view = 'player';
				presentPagedetails = responseArray;
				presentPagedetails.nextVideoDetails = [];
				if (result.response.info && result.response.info.attributes.contentType == 'tvshowepisode') (Main.getNextVideo(result.response.info.path));
				else {
					ShakaPlayer.callingPlayer();
					if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
						var durationWatched = "na"
						var totalDurationInMillisRound = "na"
					}
					else {
						var totalDurationInMillis = (presentPagedetails.steamResponse.streamStatus.totalDurationInMillis / 1000);
						var totalDurationInMillisRound = totalDurationInMillis.toFixed(0);
						var durationWatched = ((timerSeconds / totalDurationInMillis) * 100).toFixed(0)

					}
					// var durationViewed = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
					// var roundedDuration = durationViewed.toFixed(2);
					// var PreComp = (presentPagedetails.steamResponse.streamStatus.seekPositionInMillis /presentPagedetails.steamResponse.streamStatus.totalDurationInMillis) *100;
					// var PreCompRound =PreComp.toFixed(2);

					var aa = localStorage.getItem('clicked-menu');
					clevertapservice.sendCleverTapEvent('video started', {
						'source': ctEvent.comingFromExitList ? ctEvent.comingFromExitList : (ctEvent.comingFromExit ? ctEvent.comingFromExit : (presentPagedetails.navigationFrom === "player") ? "player recommendations" : (presentPagedetails.navigationFrom === "seasonsDetails") ? "browse episodes" : (presentPagedetails.navigationFrom === "search") ? "search" : postPaidPopContentData && postPaidPopContentData["searchSource"] ? postPaidPopContentData["searchSource"] : "carousel"),
						'sub source details': (presentPagedetails.navigationFrom === "player" || ctEvent.youmayLike === 'recommendations') ? 'recommendations' : (aa === 'My Bingelist') ? 'My Bingelist' : (ctEvent.explbyNamea ? ctEvent.explbyNamea : ''),
						'source details': postPaidPopContentData && postPaidPopContentData["source details"] ? postPaidPopContentData["source details"] : ctEvent.carouselName,
						'carousel position': ctEvent.carouselPositionn,
						'content position': ctEvent.contentPositionss,
						'content id': presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
						'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
						'content language': presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
						'content partner name': presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
						'content model': (presentPagedetails.attributes.networkPayType === "Paid" || presentPagedetails.attributes.networkPayType === "P") ? "svod" : "avod",
						'content tag': presentPagedetails.attributes.payType === "P" ? "paid" : "free",
						'content type': view == "tvshowDetails" ? presentPagedetails.attributes.mediaContentType : presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
						'content genre': presentPagedetails.attributes.genre ? presentPagedetails.attributes.genre : "",
						'consumption type': "streaming",
						'tv show name': presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
						'content duration': totalDurationInMillisRound ? totalDurationInMillisRound : "",
						// 'duration viewed': timerSeconds ? timerSeconds :"",
						// '%completed': durationWatched ? durationWatched:"",
						'tab': ctEvent.tabName,
						'sub tab': ctEvent && ctEvent.subtabName ? ctEvent.subtabName : "na",
						'subtitles': localStorage.selectedLanguage ? "on" : "off",
						'subtitles language': localStorage.selectedLanguage,
						// 'chromecast enabled': "",
						'audio language': "",
						'module tracking id': ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
						'module tracking name': ctEvent.moduleTrackerId ? "myreco" : ""
					})
				}
				// ctEvent.youmayLike="";
				if (!!presentPagedetails.nextVideoDetails && presentPagedetails.targetPath && result.response.analyticsInfo.contentType != "live" && result.response.analyticsInfo.dataType != "epg") {
					nextVidDetails = true;
					Main.getNextVideo(presentPagedetails.targetPath);
					resetNextPreviewState();

				}
				// if(responseArray.attributes.contentType == 'sports_series_episode'){
				// 	Main.PlayerPaginationsections(responseArray.tabsInfo.selectedTab)
				// }
			} else {
				if (result.error.code == -823) {
					Yup(".Invalidpin").css('display', 'block');
					setTimeout(function () {
						Yup(".Invalidpin").css('display', 'none')
					}, 5000);
				}
				else if (result.error.code == -1000) {
					view = 'signin'
					Main.processNext()
				}
				else if (result.error.code == 404 && view == 'player') {
					Main.previousPage()
					Main.popupData = {
						popuptype: 'info',
						message: result.error.message,
						buttonCount: 1,
						yesText: 'Okay',
						yesTarget: 'close',
						onBack: 'close'
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
				else if (result.error && result.error.code == 402 && view == 'signupOtpVerification') {
					if (view == "switchProfile" || targetComingFromSign == true) {
						presentPagedetails.contentNotFound = true
						view = "switchProfile";
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.ContentNotFound(result.error.message, result.error.code));
						targetComingFromSign = false;
					}
					else {
						utilities.genricPopup(result.error.message, 'noData');
					}
				}
				else if(result.error && result.error.code == 200 && (view == "bannersPlansUpgrade" || view == "plansUpgrade")){
					Main.apiCall(firstMenu)
					Main.getUserInfo(true);
				}
				// else if(result.error.code == 405 ){
				// 	view = "plansUpgrade";
				// 	Main.processNext();
				// }
				else {
					Main.popupData = {
						popuptype: 'info',
						message: result.error.message,
						buttonCount: 1,
						yesText: 'Okay',
						yesTarget: 'close',
						onBack: 'close'
					}
					Yup("#popUpFDFS").html(Util.showPopup());
					Yup("#popup-btn-1").addClass('popupFocus');
				}
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);

		},
		timeout: 60000
	});
};
Main.shouldShowAdultPopup = function (responseArray, clicked) {
	var config = systemConfigs && systemConfigs.configs && systemConfigs.configs.adultContentWarningPopup;

	// Parse config if it's a string
	if (typeof config === 'string') {
		try {
			config = JSON.parse(config);
		} catch (e) {
			console.log("Invalid adult popup config");
			return false;
		}
	}

	if (!config || !config.enabled) {
		return false;
	}

	var pageAttributes = responseArray.attributes || {};
	var cpNames = config.cp_names || [];
	var ratings = config.ratings || [];

	var networkName = (pageAttributes.networkName || '').toLowerCase();
	var pgRatingTitle = (pageAttributes.pgRatingTitle || '').toUpperCase().trim();

	// Remove "RATED " prefix if present
	if (pgRatingTitle.indexOf('RATED ') === 0) {
		pgRatingTitle = pgRatingTitle.substring(6).trim();
	}

	// Check CP match using for loop
	var isCpMatch = false;
	for (var i = 0; i < cpNames.length; i++) {
		if (networkName === cpNames[i].toLowerCase()) {
			isCpMatch = true;
			break;
		}
	}

	// Check rating match using for loop
	var isRatingMatch = false;
	for (var j = 0; j < ratings.length; j++) {
		if (pgRatingTitle === ratings[j].toUpperCase()) {
			isRatingMatch = true;
			break;
		}
	}

	var currentUserDetails = null;
	try {
		currentUserDetails = JSON.parse(localStorage.getItem("currentUserDetails"));
	} catch (e) {
		console.log("Invalid currentUserDetails in localStorage");
	}

	var popupClickedUsers = {};
	try {
		popupClickedUsers = JSON.parse(localStorage.getItem("popupClickedUsers") || "{}");
	} catch (e) {
		console.log("Invalid popupClickedUsers in localStorage");
	}

	var profileId = currentUserDetails && currentUserDetails.profileId;

	// Conditions not matched
	if (!isCpMatch || !isRatingMatch) {
		return false;
	}

	// If user already confirmed earlier, don't show again
	if (clicked !== true && profileId && popupClickedUsers[profileId]) {
		console.log("Popup already confirmed for profileId:", profileId);
		return false;
	}

	// Save confirmation to localStorage if user just clicked
	if (clicked === true && profileId) {
		popupClickedUsers[profileId] = true;
		localStorage.setItem("popupClickedUsers", JSON.stringify(popupClickedUsers));
		return false;
	}

	// Show popup if all checks pass and user hasn't confirmed yet
	return true;
};



// get Stream
Main.trailerGetStream = function (comingFrom, trailerPath, trailerID, h_indexs, playStreamType) {
	// var route = res.response.info.path
	var api_toCall, type, encryptObj;
	// if(presentPagedetails.banners.target.info.attributes && res.response.info.attributes.playerType == 'trailer'){
	api_toCall = "/service/api/v1/page/stream?path=" + trailerPath + "&&stream_type=" + playStreamType;
	type = "GET";
	// }
	// Assign the AJAX request to a variable so we can abort it if needed
	keyHandlar.trailerAjaxRequest = Yup.ajax({
		url: Main.mainApi + api_toCall,
		type: type,
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(encryptObj),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			// Focus check: Ensure focus hasn't moved before we start the trailer
			var currentFocusId = Yup('.imageFocus').attr('id');
			var expectedId = (comingFrom === "sections") ? "sectionItem-" + trailerID + "-" + h_indexs : "WatchBannerBtn-" + trailerID;

			if (currentFocusId !== expectedId && comingFrom != "detailsPage") {
				console.log("trailerGetStream focus changed, expected: " + expectedId + ", current: " + currentFocusId);
				keyHandlar.trailerAjaxRequest = null;
				return;
			}

			keyHandlar.trailerAjaxRequest = null;
			// Main.ShowLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				presentPagedetails.steamResponse = result.response;
				var userDetails = JSON.parse(localStorage.getItem('userDetails'));
				if (!!userDetails) {
					var liveVideo = document.querySelector("video");
					if (liveVideo) {
						liveVideo.pause();
						liveVideo.src = "";
						liveVideo.load();
						liveVideo.onended = null;
						liveVideo.onpause = null;
						liveVideo.onplaying = null;
						liveVideo.onplay = null;
						liveVideo.ontimeupdate = null;
						liveVideo.parentElement.removeChild(liveVideo);
					}
					var liveVideo = document.createElement("video");

					liveVideo = document.createElement("video");
					liveVideo.setAttribute("autoplay", "autoplay");
					liveVideo.setAttribute("muted", "false");
					liveVideo.setAttribute("crossorigin", "anonymous");
					liveVideo.setAttribute("data-src", "");
					liveVideo.setAttribute("type", "video/mp4");
					liveVideo.style.top = "0";
					liveVideo.style.left = "0";
					if (comingFrom == "sections") {
						liveVideo.style.position = "absolute";
						if (keyHandlar.isHD) {
							liveVideo.style.width = "685px";
							liveVideo.style.height = "384px";
						}
						else {
							liveVideo.style.width = "1024px";
							liveVideo.style.height = "576px";
						}
						// liveVideo.style.objectFit = "cover";
						// liveVideo.style.objectFit = "cover";
						// liveVideo.setAttribute("background-color", "transparent");
						liveVideo.style.objectFit = "fill";
						var detailsContainer = document.getElementById("banner_preview-" + trailerID + '-' + h_indexs);
						if (!!detailsContainer && !!liveVideo) {
							detailsContainer.appendChild(liveVideo);
						} else {
							console.error("details_Container does not exist in the DOM.");
						}
						console.log("banner_preview", presentPagedetails)
						var clickSection = {
							genre: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.genre ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.genre : '',
							contentType: 'trailer',
							contentLang: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.language ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.language : '',
							contentPartnerName: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkName ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkName : '',
							contentId: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.id ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.id : '',
							tvshowname: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.tvShowName ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.tvShowName : '',
							model: (presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkPayType === "Paid" || presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkPayType === "P") ? 'svod' : 'avod',
							tab: ctEvent.tabName ? ctEvent.tabName : "",
							contantTag: 'free',
							contentName: presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.tvShowName ? presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.tvShowName : "",
							souDet: presentPagedetails.sections[trailerID].sectionInfo.name,
							sourceSubDet: ctEvent.explbyNamea ? ctEvent.explbyNamea : "",
							module_tracking_id: ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
							module_tracking_name: (ctEvent.moduleTrackerId.length > 0) ? "myreco" : "",
							consumption_type: "autoplay",
							duration_viewed: liveVideo.currentTime ? liveVideo.currentTime : ""
						}
					}
					else if (comingFrom == "banners") {
						//  liveVideo.setAttribute("id", "sectionItem-" + vert_index+ '-' +hori_index);
						liveVideo.style.position = "fixed";
						liveVideo.style.width = "100vw";
						liveVideo.style.height = "100vh";
						liveVideo.style.objectFit = "cover";
						var detailsContainer = document.getElementById("top_bannerimg-" + trailerID);
						if (!!detailsContainer && !!liveVideo) {
							detailsContainer.appendChild(liveVideo);
						} else {
							console.error("details_Container does not exist in the DOM.");
						}
					}
					else if (comingFrom == "detailsPage") {
						//  liveVideo.setAttribute("id", "sectionItem-" + vert_index+ '-' +hori_index);
						liveVideo.style.position = "fixed";
						liveVideo.style.width = "100vw";
						liveVideo.style.height = "100vh";
						liveVideo.style.objectFit = "cover";
						liveVideo.style.zIndex = "1";
						liveVideo.muted = false;
						if (presentPagedetails.view != "player" && presentPagedetails.view != "seasonsDetails" && presentPagedetails.targetPath != "favourites") {
							var detailsContainer = document.getElementById("details_Container");
							if (!!detailsContainer && !!liveVideo) {
								detailsContainer.appendChild(liveVideo);
							} else {
								console.error("details_Container does not exist in the DOM.");
							}
							console.log("details_Container", presentPagedetails)
							var clickSection = {
								genre: presentPagedetails.attributes.genre ? presentPagedetails.attributes.genre : "",
								contentType: "trailer",
								contentLang: presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
								contentPartnerName: presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
								contentId: presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
								tvshowname: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
								model: (presentPagedetails.attributes.networkPayType === "Paid" || presentPagedetails.attributes.networkPayType === "P") ? "svod" : "avod",
								tab: ctEvent.tabName ? ctEvent.tabName : "",
								contantTag: 'free',
								contentName: presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
								souDet: ctEvent.itemForTrailer ? ctEvent.itemForTrailer : "",
								btn: "",
								module_tracking_id: ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
								module_tracking_name: (ctEvent.moduleTrackerId.length > 0) ? "myreco" : "",
								consumption_type: "autoplay",
								duration_viewed: liveVideo.currentTime ? liveVideo.currentTime : ""
							}
						}
					}
					if (presentPagedetails && clickSection && clickSection != undefined && clickSection != null) {
						presentPagedetails.clickSection = clickSection
						if (trailerID != null && trailerID != undefined && h_indexs != null && h_indexs != undefined) {
							presentPagedetails.trailerID = trailerID + 1
							presentPagedetails.h_indexs = h_indexs + 2
						}
					}

					// Destroy HLS instance if it already exists
					if (hls) {
						try {
							hls.destroy();
							hls = null;
							console.log("HLS instance destroyed.");
						} catch (error) {
							console.error("Error destroying HLS instance:", error);
						}
					}
					if (Hls.isSupported()) {
						if (livePreview) {
							liveVideo.pause();
							livePreview.destroy();
							livePreview = null;
						}
						var trailerEvent = false
						var hlsConfig = {};
						var isPlayflix = false;
						if (comingFrom === "detailsPage") {
							isPlayflix = presentPagedetails &&
								presentPagedetails.attributes &&
								presentPagedetails.attributes.networkName &&
								(
									presentPagedetails.attributes.networkName.toLowerCase() === "playflix" ||
									presentPagedetails.attributes.networkName.toLowerCase() === "play flix"
								);
						} else {
							isPlayflix = presentPagedetails &&
								presentPagedetails.sections &&
								presentPagedetails.sections[trailerID] &&
								presentPagedetails.sections[trailerID].sectionData &&
								presentPagedetails.sections[trailerID].sectionData.data &&
								presentPagedetails.sections[trailerID].sectionData.data[h_indexs] &&
								presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target &&
								presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes &&
								presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkName &&
								(
									presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkName.toLowerCase() === "playflix" ||
									presentPagedetails.sections[trailerID].sectionData.data[h_indexs].target.pageAttributes.networkName.toLowerCase() === "play flix"
								);
						}

						if (isPlayflix) {
							hlsConfig.startLevel = 0;
							console.log("hlsConfig.startLevel = 0")
						}
						else {
							hlsConfig.startLevel = -1;
							hlsConfig.autoStartLoad = true
							console.log("hlsConfig.startLevel = -1")
						}

						hls = new Hls(hlsConfig);
						hls.loadSource(result.response.streams[0].url);
						hls.attachMedia(liveVideo);
						hls.on(Hls.Events.MANIFEST_PARSED, function () {
							console.log("HLS Manifest loaded successfully!");
							liveVideo.play();
							liveVideo.muted = false;
						});
						hls.on(Hls.Events.ERROR, function (event, data) {
							console.error("HLS Error:", data);

							if (data.fatal) {
								switch (data.type) {
									case Hls.ErrorTypes.NETWORK_ERROR:
										// console.error("Fatal network error. Trying to recover...");
										hls.startLoad();
										break;
									case Hls.ErrorTypes.MEDIA_ERROR:
										// console.error("Fatal media error encountered. Trying to recover...");
										hls.recoverMediaError();
										break;
									default:
										// console.error("Unrecoverable error. Destroying HLS instance.");
										hls.destroy();
										break;
								}
							}
						});

						hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
							// console.log("Switching to level:", data.level);

							if (data.level !== 0 && isPlayflix) {
								hls.currentLevel = 0;
							}
						});
						hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
							// console.log("Available quality levels:", hls.levels);
							// console.log("Playing at quality level:", hls.currentLevel);
							if (hls.currentLevel !== 0 && isPlayflix) {
								hls.currentLevel = 0;
							}
						});
						hls.on(Hls.Events.LEVEL_LOADED, function (event, data) {
							// console.log("Available quality levels:", hls.levels);
							// console.log("Playing at quality level:", hls.currentLevel);
						});
						liveVideo.addEventListener('ended', function () {
							// console.log("Video has ended.");

							analytics.plugin.handlePlayCompleted();

							var liveVideo = document.querySelector("video");
							if (liveVideo && liveVideo.parentElement) {
								liveVideo.parentElement.removeChild(liveVideo);
							}

							keyHandlar.stopPreviewTrailers();

							if (comingFrom == "banners") {
								BannerMove();
							}

							clevertapservice.sendCleverTapEvent(
								'video stopped',
								utilities.sendEventItems(clickSection, trailerID + 1, h_indexs + 2)
							);

							ctEvent.itemForTrailer = "";
						});


						liveVideo.addEventListener('pause', function () {
							clevertapservice.sendCleverTapEvent('video stopped', utilities.sendEventItems(clickSection, trailerID + 1, h_indexs + 2));
							ctEvent.itemForTrailer = ""
							console.log("Video is paused.");
						});
						liveVideo.addEventListener('playing', function () {
							if (trailerEvent == false) {
								trailerEvent = true
								analytics.setMetaData(result.response.pageAttributes, "trailers");
								analytics.plugin.thumbnailVideoClick();
								analytics.plugin.handlePlayStarted();
								clevertapservice.sendCleverTapEvent('video started', utilities.sendEventItems(clickSection, trailerID + 1, h_indexs + 2));
							}
						});
						liveVideo.addEventListener('play', function () {
							// console.log("Video is playing.");
						});

						liveVideo.addEventListener('timeupdate', function () {
							// console.log("Current playback time:", liveVideo.currentTime);
						});
					}
					else {
						console.error("HLS playback is not supported in this browser.");
					}

					// Set up Shaka Player event listeners
					// listener.listen(livePreview, 'error', function (event) {
					// 	console.error('Shaka Player error:', event.detail);
					// });

					// listener.listen(livePreview, 'loading', function () {
					// 	console.log("Video is loading...");
					// });

					// listener.listen(livePreview, 'trackschanged', function () {
					// 	console.log("Tracks changed.");
					// });

					// listener.listen(livePreview, 'buffering', function (event) {
					// 	console.log("Buffering status:", event.buffering);
					// });

					// listener.listen(livePreview, 'adaptation', function () {
					// 	console.log("Adaptation event: the player has adapted to a new track.");
					// });

					// Listen for video element events
					// }
					//  else {
					// 	console.error('Shaka Player is not supported in this browser.');
					// }
				}
			}
			// else if (result.error.code == 401) {
			// 	Main.HideLoading()
			// 	Main.popupData = {
			// 		popuptype: 'unknown',
			// 		message: result.error.message,
			// 		buttonCount: 1,
			// 		yesText: 'Try Again',
			// 		yesTarget: 'sessionLogout',
			// 		onBack: 'exit',
			// 	}
			// 	Yup("#popUpFDFS").html(Util.showPopup());
			// 	Yup("#popup-btn-1").addClass('popupFocus');
			// }
			Main.HideLoading();
		},
		error: function (errObj) {
			keyHandlar.trailerAjaxRequest = null;
			Main.HideLoading();
			// utilities.responseErrorCheck(errObj);

		},
		timeout: 60000
	});
};
Main.proccessAuthData = function () {
	if (view == 'signin') {
		//mobile value integration
		if (utilities.validateString(tempObjectData.mobileNo))
			Yup("#signInInput-0").val(tempObjectData.mobileNo);
		// if( utilities.validateString(tempObjectData.password))
		// 	Yup("#signInInput-1").val(tempObjectData.password);
	}
	else if (view == 'signup') {
		if (utilities.validateString(tempObjectData.mobileNo))
			Yup("#signInInput-0").val(tempObjectData.mobileNo);
	}
	else if (view == 'forgetPassword') {
		if (utilities.validateString(tempObjectData.mobileNo))
			Yup("#signInInput-0").val(tempObjectData.mobileNo);
		tempObjectData.referenceId = undefined;
	}
	else if (view == 'otpVerification' || view == 'signupOtpVerification') {
		//presentPagedetails.enableOtpResendBtnIn = (systemConfigs.configs.enableOtpResendBtnIn && systemConfigs.configs.enableOtpResendBtnIn.length>0) ? parseInt(systemConfigs.configs.enableOtpResendBtnIn) : 120;
		presentPagedetails.enableOtpResendBtnIn = 59;
		Main.startTimer();
	}
}

Main.startTimer = function () {
	var enableOtpResendBtnIn = presentPagedetails.enableOtpResendBtnIn;
	if (resetTimer != undefined) {
		clearTimeout(resetTimer);
		resetTimer = undefined;
	}
	resetTimer = setInterval(function () {
		if (enableOtpResendBtnIn != 0) {
			var minutes = Math.floor((enableOtpResendBtnIn) / 60)
			var seconds = Math.floor((enableOtpResendBtnIn) % 60)
			if (seconds < 10) seconds = '0' + seconds;
			enableOtpResendBtnIn = enableOtpResendBtnIn - 1;
			Yup(".resendButton").addClass('disabled');
			presentPagedetails.resendButton = false;
			Yup(".timer-resend").text(' Resend OTP (' + minutes + ' : ' + seconds + ' sec)')
		} else {
			Main.stopTimer();
		}
	}, 1000);
}

Main.stopTimer = function () {
	Yup(".resendButton").removeClass('disabled');
	Yup(".timer-resend").text('Resend OTP');
	presentPagedetails.resendButton = true;
	clearInterval(resetTimer);
}

Main.resendOTP = function () {
	Main.ShowLoading();
	var data;
	if (tempObjectData.context == "verify_mobile") {
		data = JSON.stringify({
			"reference_id": +tempObjectData.referenceId,
		});
	} else {
		data = JSON.stringify({
			"reference_id": +tempObjectData.referenceId,
		});
		// if(!!tempObjectData.isMobile){data["mobile"]= Main.mobileCode +tempObjectData.mobileNo}
		// else{data["email"]=tempObjectData.mobileNo}	
	}
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/resend/otp",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"Content-type": "application/json",
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",

		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				Main.startTimer();
				var id = Yup('.imageFocus').attr("btntype");
				if (id == 'resendBtn') {

					Main.eventGenerate(tvKeyCode.ArrowLeft);
				}
				utilities.genricPopup(result.response.message, 'info');
			} else if (result.status == false) {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (e) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.updatePassword = function (oldOne, newOne) {
	Main.ShowLoading();
	clearInterval(resetTimer);
	data = JSON.stringify({
		"oldPassword": oldOne,
		"newPassword": newOne
	});
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/change/password",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				Main.popupData = {
					popuptype: 'info',
					message: result.response.message,
					buttonCount: 1,
					yesText: 'Okay',
					yesTarget: 'navigateBack',
					onBack: 'navigateBack'
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			} else if (result.status == false) {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.requestSignUpV2 = function () {
	var api_toCall;
	var num = tempObjectData.mobileNo;
	var data = JSON.stringify({
		"password": '123456',
		"mobile": "91" + num,
		'additional_params': {
			'isOptedForPromotions': "true"
		}
		// "context": signup,
	});
	var paramData;
	if (systemConfigs.configs.encryptAuthApi == "true") {
		api_toCall = "/service/api/v1/send";
		d = Main.encryptData(data);
		m = Main.encryptData(JSON.stringify({ "request": "signup" }));
		paramData = JSON.stringify({
			'data': d,
			'metadata': m,
		})
	} else {
		api_toCall = "/service/api/auth/signup/validate";
		paramData = data;
	}
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + api_toCall,
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: paramData,
		contentType: "application/json; charset=utf-8",
		success: function (responsedata) {
			if (systemConfigs.configs.encryptAuthApi == "true") {
				var info = JSON.parse(responsedata);
				var result = Main.decryptData(info.data);
				result = JSON.parse(result);
			} else {
				var result = JSON.parse(responsedata);
			}
			if (result.status == false) {
				if (result.error.code == -40) {	//otp required to create Account									
					tempObjectData.context = 'signup';
					tempObjectData.registationRefaranceID = result.error.details.referenceId;
					Main.sendOTP();
					Main.HideLoading();
				} else {	//some other error occured.
					utilities.genricPopup(result.error.message, 'info');
					Main.HideLoading();
				}
			} else if (result.status == true) {
				tempObjectData.referenceId = result.response.details.otpReferenceId;
				tempObjectData.registationRefaranceID = result.response.details.referenceKey
				tempObjectData.mobileNo = num;
				tempObjectData.context = 'signup';
				view = 'signupOtpVerification';
				Main.processNext();
			} else {  //account create with out OTP verification
				Main.userProfile.cardStatus = result.response.cardStatus;
				Main.userProfile.email = result.response.email;
				Main.userProfile.emailStatus = result.response.isEmailVerified;
				Main.userProfile.mobile = result.response.phoneNumber;
				Main.userProfile.mobileStatus = result.response.isPhoneNumberVerified;
				Main.userProfile.name = result.response.name;
				Main.userProfile.userId = result.response.userId;
				Main.userProfile.userStatus = true;
				Main.userProfile.languages = result.response.languages;
				// Main.userProfile.networks = result.response.networks;
				tempObjectData = {};
				Main.HideLoading();
				tempObjectData.signUpMsg = result.response.message;
				view = 'signinSuccess';
				Main.processNext();
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.completeRegistation = function (OTP) {

	var num = "91" + tempObjectData.mobileNo
	var data = JSON.stringify({
		"reference_key": tempObjectData.registationRefaranceID,
		"mobile": num,
		"otp": parseInt(OTP),
	});

	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/signup/complete",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				Main.userProfile.cardStatus = result.response.cardStatus;
				Main.userProfile.email = result.response.email;
				Main.userProfile.emailStatus = result.response.isEmailVerified;
				Main.userProfile.mobile = result.response.phoneNumber;
				Main.userProfile.mobileStatus = result.response.isPhoneNumberVerified;
				Main.userProfile.name = result.response.name;
				Main.userProfile.userId = result.response.userId;
				Main.userProfile.userStatus = true;
				Main.userProfile.languages = result.response.languages;
				// Main.userProfile.networks = result.response.networks;
				// Main.HideLoading();
				tempObjectData = {};
				// tempObjectData.signUpMsg = result.response.message;
				// view = 'signinSuccess';
				// Main.processNext();
				var userDetails = result.response.userDetails
				localStorage.setItem("userDetails", JSON.stringify(userDetails));
				var selected_targetSign = localStorage.getItem('selected_targetSign');

				if (!!selected_targetSign && (selected_targetSign !== 'favourites' || switchProfilesOption == false)) {
					if (switchProfilesOption != false) {
						Main.getProfileApi(false, false, true);
					}
					var userDetails = JSON.parse(localStorage.getItem('userDetails'));
					setTimeout(function () {
						clevertapservice.setUserSession();
						console.log("clevertapservice.setUserSession", clevertapservice.setUserSession)
					}, 500);
					tempObjectData = {};
					targetComingFromSign = true
					Main.apiCall(selected_targetSign)
					Yup('#menu-profile-name').html(Util.menusProfile());
					localStorage.removeItem('selected_targetSign');
					refreshHome = true;
					backData = []
				}
				else if (switchProfilesOption != false) {
					clevertapservice.setUserSession();
					//(tempObjectData.context=='login') && (backData.pop());
					tempObjectData = {};
					// Main.apiCall(firstMenu);	
					view = 'switchProfile';
					Main.processNext();
				}
				else {
					var userDetails = JSON.parse(localStorage.getItem('userDetails'));
					setTimeout(function () {
						clevertapservice.setUserSession();
						console.log("clevertapservice.setUserSession", clevertapservice.setUserSession)

					}, 500);
					tempObjectData = {};
					Yup('#menu-profile-name').html(Util.menusProfile());
					Main.showMenu();
					Main.apiCall(firstMenu);
				}
			} else if (result.status == false) {
				if (result.error.code == "-203") {
					utilities.genricPopup(result.error.message, 'info');
					Main.HideLoading();
				} else {
					utilities.genricPopup(result.error.message, 'info');
					Main.HideLoading();
				}
			}
		},
		error: function (e) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.updateLanguagePreference = function (lang) {
	Main.ShowLoading();
	data = JSON.stringify({
		"selected_lang_codes": lang
	});
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/update/session/preference",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				Main.userProfile.languages = lang;
				utilities.refreshAllbackData();
				if (intiLangSel == true) {
					intiLangSel = false;
					Yup('.toastmsg_template').html('Filter(s) Applied Succesfully')
					Yup('.toastmsg_template').css('display', 'block');
					setTimeout(function () {
						Yup('.toastmsg_template').css('display', 'none');
						Main.apiCall(firstMenu)
					}, 1000);
				} else {
					utilities.genricPopup(result.response.message, 'info');
				}
			} else if (result.status == false) {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.updateFilterPreference = function (filter) {
	Main.ShowLoading();
	data = JSON.stringify({
		"networks": filter
	});
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/update/session/preference",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				Main.userProfile.filters = filter;
				utilities.refreshAllbackData();
				if (intiFilterSel == true) {
					intiFilterSel = false;
					Main.apiCall(firstMenu)
				} else {
					utilities.genricPopup(result.response.message, 'info');
				}
			} else if (result.status == false) {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.updateContinueWatchingData = function () {
	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + '&code=continue_watching&offset=-1&count=12',
		type: 'GET',
		headers: headerJ,
		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				if (result.response[0].data.length > 0) {
					var matchFound = false;
					var viewAllshow = systemConfigs.configs && systemConfigs.configs.showViewallLastindexMinimumValue ? systemConfigs.configs.showViewallLastindexMinimumValue : 9;
					for (var i = 0; i < presentPagedetails.sections.length; i++) {
						if (presentPagedetails.sections[i].sectionInfo.code == 'continue_watching') {

							//previous focus element
							var focusedElement = Yup('.imageFocus').attr("id");
							var splitData = focusedElement.split('-');
							var splitData = splitData[1];

							presentPagedetails.sections[i].sectionData.data = [];
							presentPagedetails.sections[i].sectionData.data = result.response[0].data;
							presentPagedetails.sections[i].sectionControls.dataLength = result.response[0].data.length;
							Yup("#section-" + i + " .sectionhorizontal").html("");
							// Yup('#sectionhorizontal-'+i).css("left","75px");
							var Text = '';
							var viewAllId = '';
							for (var j = 0; j < presentPagedetails.sections[i].sectionData.data.length; j++) {
								var container = document.getElementById('overlaySectionItem-' + i + '-' + j);
								if (container && container.parentNode) container.parentNode.removeChild(container);
								// Util.getOverlaySection(presentPagedetails.sections[i].sectionData.data[j], 'sectionItem-' + i + '-' + j);
								Text += Util.getCard(presentPagedetails.sections[i].sectionData.data[j], 'sectionItem-' + i + '-' + j);
								viewAllId = 'sectionItem-' + i + '-' + (j + 1);
							}
							Yup("#backgroundPoster").append(presentPagedetails.overlayData);
							presentPagedetails.overlayData = ''
							// keyHandlar.showCardLazyPreview()
							if (presentPagedetails.sections[i].sectionControls.showViewAll == true && presentPagedetails.sections[i].sectionControls.dataLength >= viewAllshow) {
								presentPagedetails.sections[i].sectionControls.dataLength = (presentPagedetails.sections[i].sectionControls.dataLength + 1);
								Text += Util.getViewAllCard(presentPagedetails.sections[i], viewAllId);
								Util.getViewallOverlay(viewAllId);
								Yup("#backgroundPoster").append(presentPagedetails.overlayData);
							}

							Yup("#section-" + i + " .sectionhorizontal").append(Text);
							if (presentPagedetails.sectionIndex && presentPagedetails.sectionIndex[i]) {
								presentPagedetails.sectionIndex[i] = 0;
								Yup("#section-" + i + " .sectionhorizontal").css("left", "40px")
							}
							if (splitData == i) {
								Yup("#sectionItem-" + i + "-0").addClass('imageFocus');
								Yup("#section-" + i + " .sectionhorizontal").css("left", "40px")
								var data = keyHandlar.getSectionItemData(presentPagedetails, i, 0);
								if (data && hasBgImage(data)) {
									keyHandlar.showCardLazyPreview()
								}
								if (data && data.cardType === "expand_preview_poster") {
									if (typeof keyHandlar.clearPreviousExpandPreview === "function") {
										keyHandlar.clearPreviousExpandPreview();
									}
									if (typeof keyHandlar.handleExpandPreviewFocus === "function") {
										keyHandlar.handleExpandPreviewFocus(i, 0, data);
									}
								}
							}
							matchFound = true;
							break;
						}
					}
					//if continue watching session data avilbale , but previously no continue watching session avilable.
					if (matchFound == false) {
						presentPagedetails.pageReload = true;
					}
				}
			} else {
				Main.HideLoading();
			}
		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}

//fav add and remove
Main.addToFav = function (path, action, id) {
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/user/favourite/item?path=" + path + "&action=" + action,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {

		},
		error: function (errObj) {

		},
		timeout: 60000
	});
}

Main.verifyOtpGenral = function () {
	Main.ShowLoading();
	var data = JSON.stringify({
		"target_type": "mobile",
		"context": "verify_mobile"
	})
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/user/get/otp",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (result.status == true) {
				tempObjectData.referenceId = result.response.details.otpReferenceId;
				tempObjectData.context = "verify_mobile";
				view = 'signupOtpVerification';
				Main.processNext();
			} else {
				if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				} else {
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
						utilities.genricPopup('Something Went Wrong', 'unknown');
					}
				}
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.verifyOtp = function (otp) {
	Main.ShowLoading();
	var data = { "context": (tempObjectData.context == 'login') ? 'signin' : tempObjectData.context, "otp": parseInt(otp) };
	if (!!tempObjectData.isMobile) { data["mobile"] = Main.mobileCode + tempObjectData.mobileNo }
	else { data["email"] = tempObjectData.mobileNo }
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/verify/otp",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (result.status == true) {
				utilities.settingUserData(result);
				tempObjectData = {};
				Main.apiCall(firstMenu);
			} else {
				if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				} else {
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
						utilities.genricPopup('Something Went Wrong', 'unknown');
					}
				}
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

Main.verifyMobile = function (otp) {
	Main.ShowLoading();
	var data = JSON.stringify({
		"mobile": Main.userProfile.mobile,
		"otp": parseInt(otp)
	})
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/verify/mobile",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: data,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				tempObjectData = {};
				Main.popupData = {
					popuptype: 'info',
					message: result.response.message,
					buttonCount: 1,
					yesText: 'Okay',
					yesTarget: 'navigateBack',
					onBack: 'navigateBack'
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			} else {
				if (result.error && result.error.message) {
					utilities.genricPopup(result.error.message, 'info');
				} else {
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
						utilities.genricPopup('Something Went Wrong', 'unknown');
					}
				}
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

//get TV guide channels
Main.getTvguideChannelsList = function () {
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/tvguide/channels",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			presentPagedetails.paginationSections = [];
			if (result.status == true) {
				presentPagedetails.tvGuideChannelsData = result.response;
				if (result.response.data.length > 0) {
					for (var i = 0; i < result.response.data.length; i++) {
						presentPagedetails.paginationSections.push(result.response.data[i].id);
					}
					for (var i = 0; i < presentPagedetails.tvGuideChannelsData.tabs.length; i++) {
						if (presentPagedetails.tvGuideChannelsData.tabs[i].isSelected == true) {
							presentPagedetails.selectedDate = presentPagedetails.tvGuideChannelsData.tabs[i];
							break;
						}
					}
					Yup("#mainContent").html(Util.tvGuideDatesHtml(presentPagedetails));
					keyHandlar.menuActiveHandular();
					Main.getTvguideData(presentPagedetails.paginationSections.slice(0, 6));
					presentPagedetails.paginationSections = presentPagedetails.paginationSections.slice(6, presentPagedetails.paginationSections.length);
				}
				else {
					//NO DATA FOUND IN CONTENT PAGE
					Yup("#mainContent").append(Util.noDataFound());
				}
			}
			else {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
}

//get Next Videos
Main.getNextVideo = function (targetPath, dontAddNewSection, comingFromPlayerSections) {
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/next/videos?path=" + targetPath + "&count=1",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				presentPagedetails.nextVideoDetails = result.response.data;
				resetNextPreviewState();
			}

			if (nextVidDetails != true) {
				if (result.response.data[0].target.pageAttributes && result.response.data[0].target.pageAttributes.template != undefined && result.response.data[0].target.pageAttributes.template != null) {
					var templatePath = result.response.data[0].target.pageAttributes.template;
					for (var i = 0; i < templateList.length; i++) {
						if (templatePath == templateList[i].code) {
							templateCodeInfo = templateList[i];
							break;
						}
					}
					templateCodename = templatePath
					Main.getTemplateData(templateCodename, result.response.data[0].target.path, "nextVideo")
				}
				else if (result.response.data[0].target.pageAttributes && result.response.data[0].target.pageAttributes.json != undefined && result.response.data[0].target.pageAttributes.json != null) {
					jsonUrl = result.response.data[0].target.pageAttributes.json;
					targetPath = jsonUrl.replace(/@/g, ':');
					// view = "plansUpgrade"
					var userDetails = JSON.parse(localStorage.getItem('userDetails'));
					if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "SECONDARY") {
						Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
					}
					else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userStatus.toUpperCase() == "SUSPENDED") {
						Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
					}
					else if (userDetails && userDetails.userCategory == 2 && userDetails.attributes && userDetails.attributes.userStatus && userDetails.attributes.userType && userDetails.attributes.userType.toUpperCase() == "COCP") {
						Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
					}
					else if (userDetails && userDetails.userCategory == 2) {
						Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
					}
					else {
						Main.addToPlansPostPaid("", comingFromSwitchProfile, targetPath);
					}
				}
				else {
					if (presentPagedetails.nextVideoDetails[0].target.pageAttributes.contentType == "movie") {
						presentPagedetails.nextVideoDetails[0].target.path = presentPagedetails.nextVideoDetails[0].target.path.replace("movie/", "movie/play/");
					}
					// var comingFromPlayerSections = true;
					Main.apiCall(presentPagedetails.nextVideoDetails[0].target.path, "", "", dontAddNewSection, comingFromPlayerSections);
				}
				if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
					var durationWatched = "0"
					var totalDurationInMillisRound = '0'
				}
				else {
					var durationWatched = ((timerSeconds / totalDurationInMillis) * 100).toFixed(0)
					var totalDurationInMillis = (presentPagedetails.steamResponse.streamStatus.totalDurationInMillis / 1000);
					var totalDurationInMillisRound = totalDurationInMillis.toFixed(0);
				}
				// var durationViewed = presentPagedetails.steamResponse.streamStatus.seekPositionInMillis / 1000;
				// var roundedDuration = durationViewed.toFixed(2);
				// var PreComp = (presentPagedetails.steamResponse.streamStatus.seekPositionInMillis /presentPagedetails.steamResponse.streamStatus.totalDurationInMillis) *100;
				// var PreCompRound =PreComp.toFixed(2);

				var aa = localStorage.getItem('clicked-menu');
				pauseTimer();
				console.log("NextVideoKillsPlayer", myReco)
				Main.myRecoApi(myReco);
				Main.ctVideoStopFunction()
				localStorage.removeItem("clicked-menu")
				// localStorage.removeItem("selectedvidIndex");
			}
			if (nextVidDetails == true) {
				nextVidDetails = false
			}
			if (presentPagedetails.steamResponse.analyticsInfo && presentPagedetails.steamResponse.analyticsInfo.contentType != "live" && presentPagedetails.nextVideoDetails.length > 0 && presentPagedetails.attributes.contentType != 'movie') {
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
		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}

//tv Guide channels Data
Main.getTvguideData = function (channelsIds) {
	Main.ShowLoading();
	var initRequest = (presentPagedetails.paginationSectionsData.length == 0) ? true : false;
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/static/tvguide?channel_ids=" + channelsIds.join() + "&start_time=" + presentPagedetails.selectedDate.startTime + "&end_time=" + presentPagedetails.selectedDate.endTime,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				if (result.response.data.length > 0) {

					for (var i = 0; i < result.response.data.length; i++) {
						if (result.response.data[i].programs.length > 0) {
							result.response.data[i].programs[0].target.pageAttributes.startTime = presentPagedetails.selectedDate.startTime;
							result.response.data[i].programs[result.response.data[i].programs.length - 1].target.pageAttributes.endTime = presentPagedetails.selectedDate.endTime;
						}
						else { //pushing empty program data if channel program list is empty							  							 
							var randomID = Math.floor((Math.random() * 100000) + 1);
							for (var j = 0; j < 48; j++) {
								result.response.data[i].programs.push(
									{
										"id": randomID,
										"metadata": {
											"id": "" + randomID
										},
										"template": "tvguide_overlay",
										"target": {
											"path": "",
											"pageType": "player",
											"pageAttributes": {
												"contentType": "epg",
												"startTime": "" + (presentPagedetails.selectedDate.startTime + (j * 1800000)),
												"endTime": "" + ((presentPagedetails.selectedDate.startTime + (j * 1800000)) + 1800000),
											}
										},
										"display": {
											"subtitle3": "",
											"subtitle2": "",
											"markers": {
												"startTime": {
													"value": "" + (presentPagedetails.selectedDate.startTime + (j * 1800000)),
												},
												"endTime": {
													"value": "" + ((presentPagedetails.selectedDate.startTime + (j * 1800000)) + 1800000),
												},
												"special": {
													"value": "playable"
												}
											},
											"subtitle1": "",
											"title": "Program not Available",
											"imageUrl": ""
										}
									}
								)
							}

						}
						presentPagedetails.paginationSectionsData.push(result.response.data[i]);
					}
					for (var i = 0; i < result.response.data.length; i++) {
						var programs = result.response.data[i].programs;
						var duplicate_programs = [];
						var j = 0;
						while (j < programs.length) {
							if (j == 0) {
								duplicate_programs.push(programs[j])
							}
							else {
								var previous_program_endtime = parseInt(programs[j - 1].target.pageAttributes.endTime);
								var current_program_starttime = parseInt(programs[j].target.pageAttributes.startTime);
								if (current_program_starttime - previous_program_endtime == 0) {
									duplicate_programs.push(programs[j])
								}
								else {
									var randomID = Math.floor((Math.random() * 100000) + 1);
									var dummy_start_time = programs[j - 1].target.pageAttributes.endTime;
									var dummy_end_time;
									if (j != programs.length - 1) {
										dummy_end_time = programs[j].target.pageAttributes.startTime;
									}
									else {
										dummy_end_time = presentPagedetails.selectedDate.endTime;
									}
									var dummy_program = {
										"id": randomID,
										"metadata": {
											"id": "" + randomID
										},
										"template": "tvguide_overlay",
										"target": {
											"path": "",
											"pageType": "player",
											"pageAttributes": {
												"contentType": "epg",
												"startTime": "" + dummy_start_time,
												"endTime": "" + dummy_end_time,
											}
										},
										"display": {
											"subtitle3": "",
											"subtitle2": "",
											"markers": {
												"startTime": {
													"value": "" + dummy_start_time,
												},
												"endTime": {
													"value": "" + dummy_end_time,
												},
												"special": {
													"value": "playable"
												}
											},
											"subtitle1": "",
											"title": "Program not Available",
											"imageUrl": ""
										}
									}
									duplicate_programs.push(dummy_program);
									duplicate_programs.push(programs[j]);
								}
							}
							j = j + 1;
						}
						result.response.data[i].programs = duplicate_programs;
					}
				}
				Util.tvguide(result.response.data);
				if (1 == 1) {
					Main.HideLoading();
					if (presentPagedetails.selectedDate.isToday == true && initRequest == true) {

						keyHandlar.navigateLiveBar();
					} else if (presentPagedetails.selectedDate.isToday != true) {
						keyHandlar.hideLiveTag();
						if (!!liveSubscribe) {
							clearInterval(liveSubscribe);
						}

					}
				}
			}
			else {
				Main.HideLoading();
			}

		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}

Main.templateOfContentPartner = function (targetPath, splitIdData, source, comingFrom) {
	try {
		if (presentPagedetails.view == "player" || presentPagedetails.view == "plansUpgrade") {
			var templateDataSave = presentPagedetails.templateData
			Main.previousPage();
			presentPagedetails.templateData = templateDataSave
			Yup("#mainContent").append(Util.showTemplate());
		}
		else {
			Yup("#mainContent").append(Util.showTemplate());
		}
		if (TemplateTimeoutId) {
			clearTimeout(TemplateTimeoutId);
		}
		TemplateTimeoutId = setTimeout(function () {
			var myobj = document.getElementById("contentTemp");
			if (myobj) {
				myobj.remove();
			}
			presentPagedetails.templateData = {};
			try {
				//send event for adding to CW data for app to app redirection
				Main.contentPartnerCW(targetPath);
			}
			catch (e) { console.log(e) }
			if (comingFrom == "player") {
				Main.contentPatner(targetPath);
			}
			else if (source == "button") {
				if (
					presentPagedetails &&
					presentPagedetails.attributes &&
					(
						presentPagedetails.attributes.networkName === "hotstar" ||
						presentPagedetails.attributes.networkName === "ZEE5" ||
						presentPagedetails.attributes.networkName === "Fancode"
					)
				) {
					Main.contentPatner(targetPath)
				}
			}
			else if ((source == "cards" && view == "search") || view == 'list') {
				if (
					splitIdData &&
					splitIdData[1] &&
					splitIdData[2] &&
					presentPagedetails &&
					presentPagedetails.arrayResults &&
					presentPagedetails.arrayResults[splitIdData[1]] &&
					presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]] &&
					presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target &&
					presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes &&
					(
						presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "hotstar" ||
						presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "ZEE5" ||
						presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "Fancode"
					)
				) {
					Main.contentPatner(targetPath)
				}
			}
			else {
				if (
					splitIdData &&
					splitIdData[1] &&
					splitIdData[2] &&
					presentPagedetails &&
					presentPagedetails.sections &&
					presentPagedetails.sections[splitIdData[1]] &&
					presentPagedetails.sections[splitIdData[1]].sectionData &&
					presentPagedetails.sections[splitIdData[1]].sectionData.data &&
					presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] &&
					presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target &&
					presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes &&
					(presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "hotstar" || presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "ZEE5" || presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Fancode")) {

					Main.contentPatner(targetPath)
				}
				else if (!!targetPath) {
					Main.contentPatner(targetPath)
				}
			}
		}, presentPagedetails.templateData.target_auto_close_duration);
	}
	catch (e) {

	}
}
//get Template Data
Main.getTemplateData = function (templateCode, targetPath, redirectId, source, comingFromLaunch) {
	if (redirectId && redirectId != "nextVideo") {
		var splitIdData = redirectId.split("-")
	}
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/template/data?template_code=" + templateCode + "&path=" + targetPath,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (window.tizen) {
				if (result.status == true) {
					if (result.response.templateCode == "exit_popup") {
						Main.exitPopUpCallTemplate = result.response
						if (result.response.data && result.response.data.target_details) {
							Main.exitPopUpCallTemplateData(result.response.data.target_details, "", comingFromLaunch);
						}
						return;
					}
					var resolution = Yup(window).width()
					presentPagedetails.templateData = {
						templateCode: result.response.templateCode,
						tembutns: []
					};
					var watchNowbtn = false
					var closebtn = false
					for (var i = 0; i < templateCodeInfo.rows.length; i++) {
						for (var j = 0; j < templateCodeInfo.rows[i].templateElements.length; j++) {
							if (templateCodeInfo.rows[i].templateElements[j].elementType == "image") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": Util.getImages(result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode]) }
							}
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "description") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] }
							}
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "text" && templateCodeInfo.rows[i].templateElements[j].elementSubtype == "title") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementSubtype] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "movieTaretPath": result.response.data.target_watchnow, "action": templateCodeInfo.rows[i].templateElements[j].data, "contentTitle": result.response.data.subtitle }
							}
							//for subtitle, 1 , 2 , 3 ,4 we are considering 
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "text" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "title") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] }
							}
							// mapping all types aof buttons like watchlive ,watchnow, browseepisodes, resume, startorver, watchlatestepisode,....
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "form-field" && (templateCodeInfo.rows[i].templateElements[j].elementCode != 'startover_live' && templateCodeInfo.rows[i].templateElements[j].elementCode != 'startover_past')) {
								// if(templateCodeInfo.code == "deeplink_info"){
								// 	var buttonData = '';
								// 	// Conditionally set the button data (watchnow or close)
								// 		if (result.response.data.show_watchnow === "true" && watchNowbtn == false) {
								// 			buttonData = result.response.data.watchnow;
								// 			 watchNowbtn = true
								// 			 var target_watchnow = result.response.data.target_watchnow
								// 		} else if (result.response.data.show_close === "true" && closebtn == false) {
								// 			buttonData = result.response.data.close;
								// 			closebtn = true
								// 		}

								// 		// Push the processed button data into the templateData.tembutns array
								// 		presentPagedetails.templateData.tembutns.push({
								// 			"displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")],
								// 			"data": buttonData.toUpperCase(),
								// 		 //    "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")],
								// 		 //    "seekedValue": result.response.data.watchedPosition,
								// 		 //    "name": templateCodeInfo.rows[i].templateElements[j].elementSubtype,
								// 			"buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode],
								// 			"target":target_watchnow ? target_watchnow: ""

								// 		});
								// }
								if (templateCodeInfo.rows[i].templateElements[j].data == "CANCEL") {
									presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": templateCodeInfo.rows[i].templateElements[j].data, "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], "seekedValue": result.response.data.watchedPosition, 'name': templateCodeInfo.rows[i].templateElements[j].elementSubtype, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] });
								}
								else if (templateCodeInfo.code == "next_episode_subscription_overlay") {
									var buttonData = '';
									// Conditionally set the button data (subscribe)
									if (result.response.data.show_button === "true" && watchNowbtn == false) {
										buttonData = result.response.data.button;
										var target_button = result.response.data.target_button
										//  if(buttonData.toUpperCase() == "PROCEED"){
										watchNowbtn = true
										//  }
										presentPagedetails.templateData.tembutns.push({
											"displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")],
											"data": buttonData.toUpperCase(),
											"template": result.response.data.template ? result.response.data.template : "",
											//    "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")],
											//    "seekedValue": result.response.data.watchedPosition,
											//    "name": templateCodeInfo.rows[i].templateElements[j].elementSubtype,
											"buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode],
											"target": target_button ? target_button : ""

										});
									}
								}
								else {
									presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "template": result.response.data.template ? result.response.data.template : '', "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], "seekedValue": result.response.data.watchedPosition, 'name': templateCodeInfo.rows[i].templateElements[j].elementSubtype, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] });
								}
							}
							//  startover_live' , startover_past' buttons
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "form-field" && (templateCodeInfo.rows[i].templateElements[j].elementCode == 'startover_live' || templateCodeInfo.rows[i].templateElements[j].elementCode == 'startover_past')) {
								presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": templateCodeInfo.rows[i].templateElements[j].data, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], 'name': templateCodeInfo.rows[i].templateElements[j].elementCode });
							}
							//  commenting record ,delete,Extend Expiration Dates Butns Now
							// else if(templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].templateElements[j].elementSubtype == "form-field"){
							// 	presentPagedetails.templateData.tembutns.push({ "displayCondition" : result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:","")] ,"data" : templateCodeInfo.rows[i].templateElements[j].data,"target" : templateCodeInfo.rows[i].templateElements[j].target,'name':templateCodeInfo.rows[i].templateElements[j].elementCode});
							// }
						}
					}
					if (presentPagedetails.templateData.templateCode == "deeplink_info") {
						if (presentPagedetails.view == "player") {
							if (presentPagedetails.view == "player") {
								//first episode free after next video
								if (!!redirectId && redirectId == "nextVideo") {
									var templateDataSave = presentPagedetails.templateData
									Main.previousPage();
									presentPagedetails.templateData = templateDataSave
									Yup("#mainContent").append(Util.showTemplate());
								}
								else if (splitIdData && splitIdData[1] && splitIdData[2] && presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[splitIdData[1]] &&
									presentPagedetails.sections[splitIdData[1]].sectionData &&
									presentPagedetails.sections[splitIdData[1]].sectionData.data &&
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] &&
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target &&
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes && (presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "SunNxt" || presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Sun NXT")) {
									presentPagedetails.templateData = {};
									Main.apiCall(targetPath);
								}
								else {
									var templateDataSave = presentPagedetails.templateData
									Main.previousPage();
									presentPagedetails.templateData = templateDataSave
									Yup("#mainContent").append(Util.showTemplate());
								}
							}
						}
						else if (source == "button") {
							if (presentPagedetails && presentPagedetails.attributes && (presentPagedetails.attributes.networkName === "SunNxt" || presentPagedetails.attributes.networkName === "Sun NXT")) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else if (presentPagedetails &&
								presentPagedetails.attributes && (presentPagedetails.attributes.networkName == "hotstar" || presentPagedetails.attributes.networkName == "ZEE5" || presentPagedetails.attributes.networkName == "Fancode")) {
								if (presentPagedetails.view == "player") {
									var templateDataSave = presentPagedetails.templateData
									Main.previousPage();
									presentPagedetails.templateData = templateDataSave
									Yup("#mainContent").append(Util.showTemplate());
								}
								else {
									Yup("#mainContent").append(Util.showTemplate());
								}
							}
						}
						else if ((source == "cards" && view == "search") || view == 'list') {
							if (splitIdData && splitIdData[1] && splitIdData[2] && presentPagedetails && presentPagedetails.arrayResults && presentPagedetails.arrayResults[splitIdData[1]] && presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]] && presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target && presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes && (presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "hotstar" || presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "ZEE5" || presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "Fancode")) {
								if (presentPagedetails.view == "player") {
									var templateDataSave = presentPagedetails.templateData
									Main.previousPage();
									presentPagedetails.templateData = templateDataSave
									Yup("#mainContent").append(Util.showTemplate());
								}
								else {
									Yup("#mainContent").append(Util.showTemplate());
								}
							}
							else if (splitIdData && splitIdData[1] && splitIdData[2] && presentPagedetails && presentPagedetails.arrayResults &&
								presentPagedetails.arrayResults[splitIdData[1]] &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]] &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes &&
								(presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "SunNxt" || presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "Sun NXT")) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
						}
						else {
							// Start the API call if the networkName is "SunNxt" or "Sun NXT"
							if (splitIdData && splitIdData[1] && splitIdData[2] && presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[splitIdData[1]] && presentPagedetails.sections[splitIdData[1]].sectionData && presentPagedetails.sections[splitIdData[1]].sectionData.data && presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] && presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target && presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes && (
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "hotstar" ||
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "ZEE5" ||
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Fancode")) {
								if (presentPagedetails.view == "player") {
									var templateDataSave = presentPagedetails.templateData
									Main.previousPage();
									presentPagedetails.templateData = templateDataSave
									Yup("#mainContent").append(Util.showTemplate());
								}
								else {
									Yup("#mainContent").append(Util.showTemplate());
								}
							}
							else if (splitIdData && splitIdData[1] && splitIdData[2] && presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[splitIdData[1]] && presentPagedetails.sections[splitIdData[1]].sectionData && presentPagedetails.sections[splitIdData[1]].sectionData.data && presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes && (
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "SunNxt" ||
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Sun NXT"
								)) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else if (presentPagedetails.navigationFrom == "switchProfile") {
								Yup("#mainContent").append(Util.showTemplate());
							}
							else {
								Yup("#mainContent").append(Util.showTemplate());
							}
						}
					}
					else if (presentPagedetails.templateData.templateCode == 'TV_COCP_popup' || presentPagedetails.templateData.templateCode == 'TV_Suspended_popup') {
						if (presentPagedetails.view == "player") {
							var templateDataSave = presentPagedetails.templateData
							Main.previousPage();
							presentPagedetails.templateData = templateDataSave
							Yup("#mainContent").append(Util.showTemplate());
						}
						else {
							Yup("#mainContent").append(Util.showTemplate());
						}
					}
					else if (presentPagedetails.targetPath != "favourites" && presentPagedetails.view != 'list') {
						if (presentPagedetails.view == "player") {
							var templateDataSave = presentPagedetails.templateData
							Main.previousPage();
							presentPagedetails.templateData = templateDataSave
							if (presentPagedetails.templateData.templateCode == "next_episode_subscription_overlay") {
								Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
								Yup("#popup-btn-1").addClass('btnFocus');
							}
							else {
								// Yup("#mainContent").append(Util.showTemplate());
								Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
								Yup("#popup-btn-1").addClass('btnFocus');
							}
						}
						else {
							// Yup("#mainContent").append(Util.showTemplate());
							Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
							Yup("#popup-btn-1").addClass('btnFocus');
						}
					}

					if (Yup('.banners').css('display') == 'none') {
						card_lazy_preview();
					}
					if (resolution == 1920) {
						Yup('.templateOverlay').animate({ height: 900 }, 200);
					}
					if (resolution == 1280) {
						Yup('.templateOverlay').animate({ height: 630 }, 200);
					}
				}
			}
			else if (window.webOS) {
				if (result.status == true) {
					if (result.response.templateCode == "exit_popup") {
						Main.exitPopUpCallTemplate = result.response
						if (result.response.data && result.response.data.target_details) {
							Main.exitPopUpCallTemplateData(result.response.data.target_details, "", comingFromLaunch);
						}
						return;
					}
					var resolution = Yup(window).width()
					presentPagedetails.templateData = {
						templateCode: result.response.templateCode,
						tembutns: []
					};
					var watchNowbtn = false
					var closebtn = false
					for (var i = 0; i < templateCodeInfo.rows.length; i++) {
						for (var j = 0; j < templateCodeInfo.rows[i].templateElements.length; j++) {
							if (templateCodeInfo.rows[i].templateElements[j].elementType == "image") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": Util.getImages(result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode]) }
							}
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "description") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] }
							}
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "text" && templateCodeInfo.rows[i].templateElements[j].elementSubtype == "title") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementSubtype] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "movieTaretPath": result.response.data.target_watchnow, "action": templateCodeInfo.rows[i].templateElements[j].data, "contentTitle": result.response.data.subtitle }
							}
							//for subtitle, 1 , 2 , 3 ,4 we are considering 
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "text" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "title") {
								presentPagedetails.templateData[templateCodeInfo.rows[i].templateElements[j].elementCode] = { "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] }
							}
							// mapping all types aof buttons like watchlive ,watchnow, browseepisodes, resume, startorver, watchlatestepisode,....
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].rowDataType != "content" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "form-field" && (templateCodeInfo.rows[i].templateElements[j].elementCode != 'startover_live' && templateCodeInfo.rows[i].templateElements[j].elementCode != 'startover_past')) {
								if (templateCodeInfo.code == "deeplink_info") {
									var buttonData = '';
									// Conditionally set the button data (watchnow or close)
									if (result.response.data.show_watchnow === "true" && watchNowbtn == false) {
										buttonData = result.response.data.watchnow;
										watchNowbtn = true
										var target_watchnow = result.response.data.target_watchnow
									} else if (result.response.data.show_close === "true" && closebtn == false) {
										buttonData = result.response.data.close;
										closebtn = true
									}
									if (!presentPagedetails.target_auto_close_duration) {
										presentPagedetails.templateData.target_auto_close_duration = result.response.data && result.response.data.target_auto_close_duration ? result.response.data.target_auto_close_duration : "";
									}
									// Push the processed button data into the templateData.tembutns array
									presentPagedetails.templateData.tembutns.push({
										"displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")],
										"data": buttonData.toUpperCase(),
										//    "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")],
										//    "seekedValue": result.response.data.watchedPosition,
										//    "name": templateCodeInfo.rows[i].templateElements[j].elementSubtype,
										"buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode],
										"target": target_watchnow ? target_watchnow : "",
										"time_duration": result.response.data.target_auto_close_duration ? result.response.data.target_auto_close_duration : "3000"

									});
								}
								else if (templateCodeInfo.rows[i].templateElements[j].data == "CANCEL") {
									presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": templateCodeInfo.rows[i].templateElements[j].data, "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], "seekedValue": result.response.data.watchedPosition, 'name': templateCodeInfo.rows[i].templateElements[j].elementSubtype, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] });
								}
								else if (templateCodeInfo.code == "next_episode_subscription_overlay") {
									var buttonData = '';
									// Conditionally set the button data (subscribe)
									if (result.response.data.show_button === "true" && watchNowbtn == false) {
										buttonData = result.response.data.button;
										var target_button = result.response.data.target_button
										//  if(buttonData.toUpperCase() == "PROCEED"){
										watchNowbtn = true
										//  }
										presentPagedetails.templateData.tembutns.push({
											"displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")],
											"data": buttonData.toUpperCase(),
											"template": result.response.data.template ? result.response.data.template : "",
											//    "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")],
											//    "seekedValue": result.response.data.watchedPosition,
											//    "name": templateCodeInfo.rows[i].templateElements[j].elementSubtype,
											"buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode],
											"target": target_button ? target_button : ""

										});
									}
								}
								else {
									presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "template": result.response.data.template ? result.response.data.template : '', "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], "seekedValue": result.response.data.watchedPosition, 'name': templateCodeInfo.rows[i].templateElements[j].elementSubtype, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode] });
								}
							}
							//  startover_live' , startover_past' buttons
							else if (templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].templateElements[j].elementSubtype != "form-field" && (templateCodeInfo.rows[i].templateElements[j].elementCode == 'startover_live' || templateCodeInfo.rows[i].templateElements[j].elementCode == 'startover_past')) {
								presentPagedetails.templateData.tembutns.push({ "displayCondition": result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:", "")], "data": templateCodeInfo.rows[i].templateElements[j].data, "buttonName": result.response.data[templateCodeInfo.rows[i].templateElements[j].elementCode], "target": result.response.data[templateCodeInfo.rows[i].templateElements[j].target.replace("key:", "")], 'name': templateCodeInfo.rows[i].templateElements[j].elementCode });
							}
							//  commenting record ,delete,Extend Expiration Dates Butns Now
							// else if(templateCodeInfo.rows[i].templateElements[j].elementType == "button" && templateCodeInfo.rows[i].templateElements[j].elementSubtype == "form-field"){
							// 	presentPagedetails.templateData.tembutns.push({ "displayCondition" : result.response.data[templateCodeInfo.rows[i].templateElements[j].displayCondition.replace("key:","")] ,"data" : templateCodeInfo.rows[i].templateElements[j].data,"target" : templateCodeInfo.rows[i].templateElements[j].target,'name':templateCodeInfo.rows[i].templateElements[j].elementCode});
							// }
						}
					}
					if (presentPagedetails.templateData.templateCode == "deeplink_info") {
						if (presentPagedetails.view == "player") {
							//first episode free after next video
							if (redirectId == "nextVideo") {
								Main.templateOfContentPartner(targetPath, splitIdData, source, "player");
							}
							else if (
								splitIdData &&
								splitIdData[1] &&
								splitIdData[2] &&
								presentPagedetails &&
								presentPagedetails.sections &&
								presentPagedetails.sections[splitIdData[1]] &&
								presentPagedetails.sections[splitIdData[1]].sectionData &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes &&
								(
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "SunNxt" ||
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Sun NXT"
								)
							) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else {
								Main.templateOfContentPartner(targetPath, splitIdData, source, "player");
							}
						}
						else if (source == "button") {
							if (
								presentPagedetails &&
								presentPagedetails.attributes &&
								(
									presentPagedetails.attributes.networkName === "SunNxt" ||
									presentPagedetails.attributes.networkName === "Sun NXT"
								)
							) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else {
								Main.templateOfContentPartner(targetPath, splitIdData, source);
							}
						}
						else if ((source == "cards" && view == "search") || view == 'list') {
							if (splitIdData &&
								splitIdData[1] &&
								splitIdData[2] &&
								presentPagedetails &&
								presentPagedetails.arrayResults &&
								presentPagedetails.arrayResults[splitIdData[1]] &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]] &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target &&
								presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes &&
								(
									presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "SunNxt" ||
									presentPagedetails.arrayResults[splitIdData[1]][splitIdData[2]].target.pageAttributes.networkName === "Sun NXT"
								)
							) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else {
								Main.templateOfContentPartner(targetPath, splitIdData, source);
							}
						}
						else {
							if (
								splitIdData &&
								splitIdData[1] &&
								splitIdData[2] &&
								presentPagedetails &&
								presentPagedetails.sections &&
								presentPagedetails.sections[splitIdData[1]] &&
								presentPagedetails.sections[splitIdData[1]].sectionData &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]] &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target &&
								presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes &&
								(
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "SunNxt" ||
									presentPagedetails.sections[splitIdData[1]].sectionData.data[splitIdData[2]].target.pageAttributes.networkName === "Sun NXT"
								)
							) {
								presentPagedetails.templateData = {};
								comingFromTemplates = true;
								Main.apiCall(targetPath, comingFromTemplates);
							}
							else {
								Main.templateOfContentPartner(targetPath, splitIdData, source);
							}
						}
					}
					else if (presentPagedetails.templateData.templateCode == 'TV_COCP_popup' || presentPagedetails.templateData.templateCode == 'TV_Suspended_popup') {
						if (presentPagedetails.view == "player") {
							var templateDataSave = presentPagedetails.templateData
							Main.previousPage();
							presentPagedetails.templateData = templateDataSave
							Yup("#mainContent").append(Util.showTemplate());
						}
						else {
							Yup("#mainContent").append(Util.showTemplate());
						}
					}
					else if (presentPagedetails.targetPath != "favourites" && presentPagedetails.view != 'list') {
						if (presentPagedetails.view == "player") {
							var templateDataSave = presentPagedetails.templateData
							Main.previousPage();
							presentPagedetails.templateData = templateDataSave
							if (presentPagedetails.templateData.templateCode == "next_episode_subscription_overlay") {
								Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
								Yup("#popup-btn-1").addClass('btnFocus');
							}
							else {
								// Yup("#mainContent").append(Util.showTemplate());
								Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
								Yup("#popup-btn-1").addClass('btnFocus');
							}
						}
						else {
							// Yup("#mainContent").append(Util.showTemplate());
							Yup("#popUpFDFS").html(Util.showNudgeNoPlans());
							Yup("#popup-btn-1").addClass('btnFocus');
						}
					}
					if (Yup('.banners').css('display') == 'none') {
						card_lazy_preview();
					}
					if (resolution == 1920) {
						Yup('.templateOverlay').animate({ height: 900 }, 200);
					}
					if (resolution == 1280) {
						Yup('.templateOverlay').animate({ height: 630 }, 200);
					}
				}
			}

		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}
Main.getYbbTemplateShown = function (versions, identifieeer) {
	Main.ShowLoading();
	var data = {
		"showYBBWelcomePopup": "false"
	};
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/update/preference",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				// presentPagedetails.activeSessions = result.response
			}
			else {
				Main.HideLoading()
				Main.popupData = {
					popuptype: 'unknown',
					message: result.error.message,
					buttonCount: 1,
					yesText: 'Try Again',
					yesTarget: 'close',
					onBack: 'close',
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');

			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
	Main.HideLoading();
}
Main.getYbbTemplateData = function (templateCode) {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/template/data?template_code=" + templateCode,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			Main.HideLoading();
			if (result.status == true) {
				var ybbData = result.response
				Main.popupData = {
					popuptype: 'ybbConfirmation',
					message: '',
					buttonCount: 1,
					yesText: 'close',
					yesTarget: 'close',
					noText: 'Cancel',
					noTarget: 'close',
					onBack: 'close'
				}
				Yup("#popUpFDFS").html(Util.ybbPopUpComformation(ybbData.data));
				Yup("#popup-btn-1").addClass('popupFocus');
				clevertapservice.sendCleverTapEvent('popup', {
					'action': 'popup displayed',
					'popup name': 'you broadband welcome',
					'tab': "home",
				})
				ybbPopUp = ""
				Main.getYbbTemplateShown()

			}
		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}
//get Template List
Main.getTemplates = function () {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/templates",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				templateList = result.response;
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}
//get passscode
Main.getActivateDeviceAPI = function (retrycount) {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/generate/passcode",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				if (tokenSubscribe != undefined || tokenSubscribe != null)
					clearInterval(tokenSubscribe);
				var data = {
					token: result.response.passcode,
					login_mode: 1
				}
				presentPagedetails.passcode = result.response.passcode;
				presentPagedetails.passcode_expiry = parseInt(result.response.expiry);
				presentPagedetails.passcode_pullInterval = parseInt(result.response.pullInterval) * 1000;

				Main.userPasscodeValidating(JSON.stringify(data));
				if (retrycount == false) {
					// Yup("#mainContent").html('');
					Main.getPasscodeData();
					// setTimeout(function(){
					// 	Main.hideMenu();
					// },1000);
					// Yup("#mainContent").html(Util.passcodeView());
				} else {
					Yup(".code").text(presentPagedetails.passcode);
					var url = systemConfigs.configs.passcodeUrl + '/' + presentPagedetails.passcode
					Yup('#qrcode').html("");
					Yup('#qrcode').html(Main.generateQrCode('qrcode', url));
				}
				//  Yup("#signUpBtn1").removeClass("mouseFocus");
				//  Yup("#Passcodenum").addClass("imageFocus");
				Yup("#signUpBtn1").addClass("imageFocus")
				var currentTimestamp = Math.floor(Date.now());
				passcode_expiry_time = parseInt(presentPagedetails.passcode_expiry - currentTimestamp);
				if (timeoutID) {
					clearTimeout(timeoutID);
					timeoutID = null;
				}
				timeoutID = setTimeout(function () {
					Yup('#passcode_msg').css('display', 'block');
				}, passcode_expiry_time);
				Main.HideLoading()
			}
			else {
				Main.HideLoading()
				Main.popupData = {
					popuptype: 'unknown',
					message: result.error.message,
					buttonCount: 1,
					yesText: 'Try Again',
					yesTarget: 'sessionLogout',
					onBack: 'exit',
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			}
		},
		error: function (request, status, error) {
			Main.HideLoading();
			Main.popupData = {
				popuptype: 'unknown',
				message: result.error.message,
				buttonCount: 1,
				yesText: 'Try Again',
				yesTarget: 'sessionLogout',
				onBack: 'close',
			}
			Yup("#popUpFDFS").html(Util.showPopup());
			Yup("#popup-btn-1").addClass('popupFocus');
		},
		timeout: 60000
	});
}

// QR code
Main.generateQrCode = function (key, code) {
	if (!utilities.validateString(key)) {
		throw "QR_API_FAILED"
	}
	if (!utilities.validateString(code)) {
		throw "QR_API_FAILED"
	}
	var qrcode = new QRCode(key);
	qrcode.clear();
	qrcode.makeCode(code);
}
Main.generateQrCodeForPayments = function (key, code) {
	if (!utilities.validateString(key)) {
		throw "QR_API_FAILED"
	}
	if (!utilities.validateString(code)) {
		throw "QR_API_FAILED"
	}
	var el = document.getElementById(key);
	var size = (el && el.offsetWidth > 0) ? el.offsetWidth : ((window.innerWidth <= 1280) ? 240 : 360);
	if (el) {
		el.innerHTML = "";
	}
	var qrcode = new QRCode(key, {
		width: size,
		height: size
	});
	qrcode.clear();
	qrcode.makeCode(code);
}
//validating passcode
Main.userPasscodeValidating = function (data) {
	tokenSubscribe = setInterval(function () {
		if (new Date().getTime() < presentPagedetails.passcode_expiry) {
			Yup.ajax({
				url: Main.mainApi + "/service/api/auth/passcode/signin",
				type: "POST",
				headers: {
					"tenant-code": Main.tenantCode,
					"box-id": Main.getBOXID(),
					"session-id": Main.getSessionID(),
					"ucv": "24"
				},
				data: data,
				contentType: "application/json",
				success: function (data) {
					Main.HideLoading();
					result = JSON.parse(data);
					if (result.status == true) {
						var userDetails = result.response
						presentPagedetails = {};
						//if asset selects without signin
						var selected_targetSign = localStorage.getItem('selected_targetSign');
						if (!!selected_targetSign && (selected_targetSign !== 'favourites' || switchProfilesOption == false)) {
							if (switchProfilesOption != false) {
								Main.getProfileApi(false, false, true);
							}
							isUserSignedOutinThisSession = false;
							targetComingFromSign = true
							Main.apiCall(selected_targetSign)
							localStorage.setItem("userDetails", JSON.stringify(userDetails));
							utilities.settingUserData(result);
							Yup('#menu-profile-name').html(Util.menusProfile());
							localStorage.removeItem('selected_targetSign');
							backData = []
							refreshHome = true;
						}
						else if (switchProfilesOption != false) {
							//(tempObjectData.context=='login') && (backData.pop());
							tempObjectData = {};
							// Main.apiCall(firstMenu);	
							view = 'switchProfile';
							Main.processNext();
						}
						//from signinmenu
						else {
							Main.getUserInfo(false);
							// Main.showMenu();
							// clearInterval(tokenSubscribe);
							// var userDetails = result.response
						}
						setTimeout(function () {
							clevertapservice.setUserSession();
							Main.HideLoading();
						}, 500);
						localStorage.setItem("userDetails", JSON.stringify(userDetails));
						Main.getUserInfo();
						clevertapservice.sendCleverTapEvent('registration completed', {
							'mobile no': userDetails.phoneNumber ? userDetails.phoneNumber : "",
							'source': ctEvent.tabName == "search" ? "search" : "carousel",
							'activation method': 'passcode/qrcode',
							'mode': 'direct'
						})
					}
				},
				error: function (errObj) {
					Main.HideLoading();
				},
				timeout: 60000
			});
		}
		else {
			clearInterval(tokenSubscribe);
		}
	}, presentPagedetails.passcode_pullInterval)
}
//To get Dynamic passcode Data 
Main.getPasscodeData = function (responseArray) {
	Yup.ajax({
		url: systemConfigs.configs.passcodeJson,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json",
		success: function (data) {
			var result = data;
			if (result) {
				if (Object.keys(result).length > 0) {
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

					//clevertapProfilepage appeared event
					clevertapservice.profilePageEvent();
					Yup("#mainContent").html('');
					Main.hideMenu();
					Yup("#mainContent").html(Util.signInHtml());
					Yup("#signInLeftSide").html(Util.signMobileHtml());
					var url = systemConfigs.configs.passcodeUrl + '/' + presentPagedetails.passcode
					Yup('#qrcode').html("");
					Yup('#qrcode').html(Main.generateQrCode('qrcode', url));
					Yup("#signUpBtn1").addClass("imageFocus")
				}
				else {
					utilities.genricPopup(result.error.message, 'info');
				}
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
};
Main.sideMenuHTML = function () {
	Yup('#menusWrapper').html('');
	Yup('#menusWrapper').html(Util.getMenus());
}

Main.hideMenu = function () {
	Yup('#menusWrapper').hide();
}

Main.showMenu = function () {
	Yup('#menusWrapper').show();
	// Main.addActiveMenu();
}

Main.addActiveMenu = function () {
	var menuD = utilities.getMenusData();

	// Capture the current side menu before clearing
	var currentActiveSideCode = Yup('.side-menu-item.menu-active').attr('menu-code');

	Yup('.menu-active').removeClass('menu-active');
	Yup('.top-menu-active').removeClass('top-menu-active');

	var activePath = presentPagedetails.targetPath || presentPagedetails.view;
	var isTopMenuMatched = false;
	var topMenuItems = Yup('.top-menu-item');

	// 1. Process Top Menus first to see if we are inside a submenu
	if (topMenuItems.length > 0) {
		for (var i = 0; i < topMenuItems.length; i++) {
			var targetPath = Yup(topMenuItems[i]).attr("targetPath");
			var menuCode = Yup(topMenuItems[i]).attr("menu-code");
			if (targetPath == activePath || menuCode == activePath || targetPath == presentPagedetails.view) {
				Yup(topMenuItems[i]).addClass("top-menu-active");
				isTopMenuMatched = true;
				break;
			}
		}

		var isParentMenuMatched = false;
		for (var m = 0; m < menuD.length; m++) {
			if (menuD[m].targetPath == activePath || menuD[m].code == activePath || menuD[m].targetPath == presentPagedetails.view) {
				if (menuD[m].subMenus && menuD[m].subMenus.length > 0) {
					isParentMenuMatched = true;
				}
				break;
			}
		}

		if (!isTopMenuMatched && isParentMenuMatched) {
			topMenuItems.first().addClass("top-menu-active");
			// If we fallback to the first top menu, we are still within the context of the submenus
			isTopMenuMatched = true;
		}

		if (isTopMenuMatched) {
			Yup("#top-menu-container").show();
		} else {
			Yup("#top-menu-container").hide();
		}
	} else {
		Yup("#top-menu-container").hide();
	}

	// 2. Process Side Menus
	if (isTopMenuMatched && currentActiveSideCode) {
		// If we are in a submenu, retain the parent side menu's active state
		Yup('.side-menu-item[menu-code="' + currentActiveSideCode + '"]').addClass("menu-active");
	} else {
		// Otherwise, find the correct side menu matching the active path
		var isSideAdded = false;
		for (var i = 0; i < menuD.length; i++) {
			if (menuD[i].targetPath == activePath || menuD[i].code == activePath || menuD[i].targetPath == presentPagedetails.view) {
				if (Yup('.side-menu-item[menu-code="' + menuD[i].code + '"]').length > 0) {
					isSideAdded = true;
					Yup('.side-menu-item[menu-code="' + menuD[i].code + '"]').addClass("menu-active");
					break;
				}
			}
		}

		if (!isSideAdded) {
			// Fallback to finding side menu by matching targetPath directly in DOM, or fallback to home
			if (Yup('.menu-item[targetPath="' + activePath + '"]').length > 0) {
				Yup('.menu-item[targetPath="' + activePath + '"]').addClass("menu-active");
			} else if (Yup('.menu-item[targetPath="' + presentPagedetails.view + '"]').length > 0) {
				Yup('.menu-item[targetPath="' + presentPagedetails.view + '"]').addClass("menu-active");
			} else {
				if (currentActiveSideCode) {
					Yup('.side-menu-item[menu-code="' + currentActiveSideCode + '"]').addClass("menu-active");
				} else {
					Yup('.side-menu-item[menu-code="home_tv"]').addClass("menu-active");
				}
			}
		}
	}
}

//sideBar open
Main.sidebarOpen = function () {
	isSidemenuOpened = true;
	if (Yup(window).width() == 1920) {
		Yup('.side-menu').animate({
			width: '450px'
		}, 170, function () {
		});
	}
	else {
		Yup('.side-menu').animate({
			width: '280px'
		}, 170, function () {
		});
	}
	Yup(".side-menu").addClass('open');
	Yup("body").addClass("menu-open");
}

//sideBare Close
Main.sidebarClose = function () {
	isSidemenuOpened = false;
	Yup('.active-play-btn').removeClass('active-play-btn')
	if (Yup(window).width() == 1920) {
		Yup('.side-menu').animate({
			width: '120px'
		}, 170, function () {

		});
	} else {
		Yup('.side-menu').animate({
			width: '80px'
		}, 170, function () {

		});
	}
	Yup(".side-menu").removeClass('open');
	Yup("body").removeClass("menu-open");
}

Main.divideArray = function (array, chunkSize) {
	var dividedArrays = [];
	var index = 0;

	while (index < array.length) {
		dividedArrays.push(array.slice(index, index + chunkSize));
		index += chunkSize;
	}

	return dividedArrays;
}

//Offers and plans Qr scanner
Main.offersPlans = function () {
	var url = systemConfigs.configs.flexiPlanUrl
	Yup('#offersPlansQr').html("");
	Yup('#offersPlansQr').html(Main.generateQrCode('offersPlansQr', url));
}

//aboutUs Qr scanner
Main.aboutUs = function () {
	var url = systemConfigs.configs.aboutUsPageUrl
	Yup('#aboutusQr').html("");
	Yup('#aboutusQr').html(Main.generateQrCode('aboutusQr', url));
}

//faqQr Qr scanner
Main.faqQr = function () {
	var url = systemConfigs.configs.faqPageUrl
	Yup('#faqQr').html("");
	Yup('#faqQr').html(Main.generateQrCode('faqQr', url));
}

//faqQr Qr scanner
Main.grivanceQr = function () {
	var url = systemConfigs.configs.grievanceRedressalUrl
	Yup('#grivanceQr').html("");
	Yup('#grivanceQr').html(Main.generateQrCode('grivanceQr', url));
}

//accountQr Qr scanner
Main.accountQr = function () {
	var url = systemConfigs.configs.accountUrl
	Yup('#accountQr').html("");
	Yup('#accountQr').html(Main.generateQrCode('accountQr', url));
}
Main.cleveTapError = function (data) {
	// cleverTap.errorSource = "Network loss";
	// cleverTap.reasonForfailure = "network loss";
	try {
		errorEncounteredEvent(data);
	}
	catch (e) {
		console.log('Main.clevetTap Error: ', e)
	}
	// cleverTap.reset();
}
Main.getUpgradeData = function (targetPath, subscriptionNextEpiOverlayClicked, eventAlreadySent, doneCb, detailsText) {
	Main.ShowLoading();
	Yup.ajax({
		url: targetPath,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json",
		success: function (data) {
			var result = data;
			if (result) {
				if (Object.keys(result).length > 0) {
					if (result.plansPageInfo) {
						Main.popupData = result;
						Main.popupData.popuptype = "plansNew";
						if (subscriptionNextEpiOverlayClicked === true) {
							Main.popupData.subscriptionClicked = "subscription overlay";
						}
						Yup("#popUpFDFS").html('');
						Yup("#popUpFDFS").html(Util.offers(result));
						Yup("#offers_close").addClass('popupFocus');
						var url = result.plansPageInfoQrCode.targetPath;
						Yup('#offersPlansQr').html("");
						Yup('#offersPlansQr').html(Main.generateQrCode('offersPlansQr', url));

						if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
							var sourceDetailsPop = ctEvent.topBanner;
						}
						var subtitle =
							Main &&
							Main.popupData &&
							Main.popupData.plansPageInfo &&
							Main.popupData.plansPageInfo.subTitle;

						var match = subtitle && subtitle.match(/#(.*?)#/);

						var price = match && match[1] ? match[1] : "";


						if (view == "seasonsDetails" && eventAlreadySent !== true) {
							clevertapservice.sendCleverTapEvent('subscription page appeared', {
								'tab': ctEvent && ctEvent.tabName,
								'source': "Browse episodes",
								'page name': 'plans',
								'movies pack price': price ? price : "unknown"
							});
						}
						else if (view == "content" && eventAlreadySent !== true) {
							clevertapservice.sendCleverTapEvent('subscription page appeared', {
								'tab': ctEvent && ctEvent.tabName,
								'source': sourceDetailsPop ? sourceDetailsPop : "carousel",
								'page name': 'plans',
								'movies pack price': price ? price : "unknown"
							});
						}
						else if ((view == "movieDetails" || view == "tvshowDetails") && eventAlreadySent !== true) {
							if (detailsText && detailsText != "" && detailsText != undefined) {
								detailsText = detailsText
							}
							else {
								detailsText = ""
							}
							clevertapservice.sendCleverTapEvent('subscription page appeared', {
								'tab': ctEvent && ctEvent.tabName,
								'source': 'content ' + detailsText ? 'content ' + detailsText.toLowerCase() : "carousel",
								'page name': 'plans',
								'movies pack price': price ? price : "unknown"
							});
						}
					} else {
						view = "plansUpgrade";
						Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});
						Yup("#mainContent").html('');
						presentPagedetails = {};
						presentPagedetails.view = 'plansUpgrade';
						presentPagedetails.targetPath = 'plansUpgrade';
						Main.hideMenu();
						Yup("#mainContent").html(Util.upGradePlan(result));
					}
				} else {
					utilities.genricPopup(result.error && result.error.message, 'info');
				}
			}

			if (targetComingFromSign === true) {
				backData = [];
				targetComingFromSign = false;
			}

			Main.HideLoading();
			Main.playerHideLoading();

			// call callback after everything is done
			if (typeof doneCb === "function") {
				doneCb();
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			Main.cleveTapError(errObj);
			utilities.responseErrorCheck(errObj);

			//  if you ALSO want to go back even on error, keep this:
			if (typeof doneCb === "function") {
				doneCb();
			}
		},
		timeout: 60000
	});
};

Main.subscribeData = function (targetPath) {
	Yup.ajax({
		url: targetPath,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json",
		success: function (data) {
			var result = data;
			if (result) {
				if (Object.keys(result).length > 0) {
					Yup("#popUpFDFS").html('');
					// Main.hideMenu();
					Yup("#popUpFDFS").html(Util.upGradePlan(result));
					// var url = systemConfigs.configs.upgradeUrl
					// Yup('#upgrade_qrcode').html("");
					// Yup('#upgrade_qrcode').html(Main.generateQrCode('upgrade_qrcode', url));
				}
				else {
					utilities.genricPopup(result.error.message, 'info');
				}
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			Main.HideLoading();
			Main.cleveTapError(errObj)
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});
};
Main.nonViUserData = function () {
	var nonViParse = JSON.parse(systemConfigs.configs.nonViLoginPopup)
	Main.popupData = {
		popuptype: 'info',
		buttonCount: 1,
		yesText: 'Close',
		yesTarget: 'close',
		onBack: 'close',
	}
	Yup('#popUpFDFS').html("");
	Yup("#popUpFDFS").html(Util.nonViUserPopUp(nonViParse));
	clevertapservice.sendCleverTapEvent('popup', {
		'action': 'popup displayed',
		'label': 'non vi number',
		'popup name': 'non vi user',
		'button label': "na",
		'tab': ctEvent.tabName,
	})
	clevertapservice.sendCleverTapEvent('registration initiated', {
		'status': "failed",
		'mobile no': result.error.message,
		'reason': 'Not a vi number',
		'source': view == "search" ? "search" : "carousel"
	});
	var url = nonViParse.target
	Yup('#nonViqrcode').html("");
	Yup('#nonViqrcode').html(Main.generateQrCode('nonViqrcode', url));
	// Yup('.imageFocus').removeClass("imageFocus");
	Yup("#nonVi_close").addClass("popupFocus");

};
Main.callPollApi = function () {
	var formData = new FormData();
	if (!!presentPagedetails.steamResponse.sessionInfo && presentPagedetails.steamResponse.sessionInfo.streamPollKey != undefined && presentPagedetails.steamResponse.sessionInfo.streamPollKey != null) {
		formData.append('poll_key', presentPagedetails.steamResponse.sessionInfo.streamPollKey);
	}
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/stream/poll",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		processData: false,
		contentType: false,
		cache: false,
		data: formData,
		success: function (data) {
			Main.HideLoading();
			Main.playerHideLoading();
			if (typeof (data) == "string") {
				result = JSON.parse(data);
			}
			else {
				result = data
			}
			if (result.status == true) {
			}
			else if (result.error.code == 401) {
				ShakaPlayer.pause();
				Main.popupData = {
					popuptype: result.error.message,
					headerTitle: result.error.message,
					message: result.error.details.description,
					buttonCount: 1,
					yesText: 'Okay',
					yesTarget: 'sessionLogout',
					onBack: 'sessionLogout',
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
				// Yup("#popUpFDFS").html(Util.activeScreenPopup());	
				// Yup("#popup-btn-1").addClass('popupFocus'); 
				ShakaPlayer.stopInterval();
			}
			else if ((result.error.code == -4001)) {
				ShakaPlayer.pause();
				Main.popupData = {
					popuptype: result.error.message,
					headerTitle: result.error.message,
					message: result.error.details.description,
					buttonCount: 2,
					yesText: 'Active Screens',
					yesTarget: 'goToSettings',
					noText: 'Close',
					noTarget: 'navigateBackFromPlayer',
					onBack: 'navigateBackFromPlayer'
				}
				// Yup("#popUpFDFS").html(Util.showPopup());
				// Yup("#popup-btn-1").addClass('popupFocus');	
				Yup("#popUpFDFS").html(Util.activeScreenPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
				ShakaPlayer.stopInterval();
			}
			else if (result.status == false && ((result.error.code == -4000) || (result.error.code == -4401) || (result.error.code == -4402))) {
				ShakaPlayer.pause();
				Main.popupData = {
					popuptype: result.error.message,
					headerTitle: result.error.message,
					message: result.error.details.description,
					buttonCount: 1,
					yesText: 'Close',
					yesTarget: 'navigateBackFromPlayer',
					onBack: 'navigateBackFromPlayer'
				}
				// Yup("#popUpFDFS").html(Util.showPopup());
				// Yup("#popup-btn-1").addClass('popupFocus');	
				Yup("#popUpFDFS").html(Util.activeScreenPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
				ShakaPlayer.stopInterval();
			}
		},
		error: function (errObj) {
			Main.HideLoading();
		},
		timeout: 60000
	});
}

Main.seasonsHeadPagination = function (seasonNum) {
	var sectionNum = seasonNum

	// Main.ShowLoading();	
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[sectionNum].sectionData.section + "&offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=48";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=48"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					if (pageSections.data.length < 48) {
						presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;

					}
					presentPagedetails.sections[sectionNum].sectionData.lastIndex += pageSections.data.length
					var prePosition = presentPagedetails.sections[sectionNum].sectionData.data.length;
					for (var i = 0; i < pageSections.data.length; i++) {
						var sectionItem = pageSections.data[i];
						presentPagedetails.sections[sectionNum].sectionData.data.push(pageSections.data[i]);
						// if(presentPagedetails.view == 'player'){
						// 	Yup(".playSugestions").append(Util.getPaginationSections(pageSections));
						// }
						// else{
						Yup("#grid_items-" + seasonNum).append(Util.getCard(sectionItem, 'sectionItem-' + seasonNum + '-' + (prePosition + i)));
						// }
					}
					Yup("#grid_items-" + parseInt(seasonNum)).css('display', 'block');
					// Yup(".imageFocus").removeClass("imageFocus");
					// Yup("#sectionItem-" + splitData[1] + '-' + "0").addClass("imageFocus");
					if (presentPagedetails.sectionIndex[seasonNum] != undefined) {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup('#sectionItem-' + seasonNum + '-' + presentPagedetails.sectionIndex[seasonNum]).addClass('imageFocus');
					}
					else {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup("#sectionItem-" + seasonNum + '-' + "0").addClass("imageFocus");
					}

					Main.HideLoading();

				} else {
					Main.HideLoading();
					presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
				}
			} else {
				Main.HideLoading();
				presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}
Main.seasonsPagination = function (seasonNum) {
	var sectionNum = seasonNum

	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[sectionNum].sectionData.section + "&offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=48";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=48"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					if (pageSections.data.length < 48) {
						presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;

					}
					presentPagedetails.sections[sectionNum].sectionData.lastIndex += pageSections.data.length
					var prePosition = presentPagedetails.sections[sectionNum].sectionData.data.length;
					for (var i = 0; i < pageSections.data.length; i++) {
						var sectionItem = pageSections.data[i];
						presentPagedetails.sections[sectionNum].sectionData.data.push(pageSections.data[i]);
						// if(presentPagedetails.view == 'player'){
						// 	Yup(".playSugestions").append(Util.getPaginationSections(pageSections));
						// }
						// else{
						Yup("#grid_items-" + seasonNum).append(Util.getCard(sectionItem, 'sectionItem-' + seasonNum + '-' + (prePosition + i)));
						// }
					}
					Yup("#grid_items-" + parseInt(seasonNum)).css('display', 'block');

					Main.HideLoading();

				} else {
					Main.HideLoading();
					presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
				}
			} else {
				Main.HideLoading();
				presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}
Main.exploreOttPagination = function (ottposition, pasha) {
	// Main.ShowLoading();	
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[pasha].sectionData.section + "&offset=" + ottposition + "&count=13";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[pasha].sectionData.lastIndex + "&count=13"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					presentPagedetails.sections[pasha].sectionData.lastIndex += pageSections.data.length
					var prePosition = presentPagedetails.sections[pasha].sectionData.data.length;
					presentPagedetails.sections[pasha].sectionControls.dataLength = presentPagedetails.sections[pasha].sectionData.lastIndex + 1;
					presentPagedetails.sections[pasha].sectionData.hasMoreData = result.response[0].hasMoreData
					for (var i = 0; i < pageSections.data.length; i++) {
						var sectionItem = pageSections.data[i];
						presentPagedetails.sections[pasha].sectionData.data.push(pageSections.data[i]);
						Yup("#sectionhorizontal-" + pasha).append(Util.getCard(sectionItem, 'sectionItem-' + pasha + '-' + (prePosition + i)));
					}
					// Main.HideLoading();

				} else {
					// Main.HideLoading();
					presentPagedetails.sections[pasha].sectionData.hasMoreData = false;
				}
			} else {
				// Main.HideLoading();
				presentPagedetails.sections[pasha].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			// Main.HideLoading();					
			presentPagedetails.sections[pasha].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}

Main.playSeasonsPagination = function (seasonNum) {
	var sectionNum = seasonNum

	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + presentPagedetails.sections[sectionNum].sectionData.section + "&offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=13";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=13"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				var pageSections = result.response[0];
				if (pageSections.data.length > 0) {
					// if(pageSections.data.length < 13){
					// 	presentPagedetails.sections[sectionNum].sectionData.hasMoreData =false;

					// }
					presentPagedetails.sections[sectionNum].sectionData.lastIndex += pageSections.data.length
					var prePosition = presentPagedetails.sections[sectionNum].sectionData.data.length;
					presentPagedetails.sections[sectionNum].sectionControls.dataLength = presentPagedetails.sections[sectionNum].sectionData.lastIndex + 1;
					for (var i = 0; i < pageSections.data.length; i++) {
						var sectionItem = pageSections.data[i];
						presentPagedetails.sections[sectionNum].sectionData.data.push(pageSections.data[i]);
						// if(presentPagedetails.view == 'player'){
						sectionItem.cardType = 'player-card';
						// Yup("#grid_items-" + seasonNum).append(Util.getCard(sectionItem, 'sectionItem-' + seasonNum + '-' + (prePosition + i)));
						// }
						// else{
						Yup("#sectionhorizontal-" + seasonNum).append(Util.getCard(sectionItem, 'sectionItem-' + seasonNum + '-' + (prePosition + i)));
						// }
					}
					// Yup(".sectionhorizontal").append(Util.playSuggestionHtml(pageSections));

					Main.HideLoading();

				} else {
					Main.HideLoading();
					presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
				}
			} else {
				Main.HideLoading();
				presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}
Main.playerScreenSessionEnd = function () {
	Main.ShowLoading();
	var formData = new FormData();
	if (!!streamPollGlob && streamPollGlob !== undefined && streamPollGlob !== null) {
		formData.append('poll_key', streamPollGlob);
	}

	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/stream/session/end",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		processData: false,
		contentType: false,
		cache: false,
		data: formData,
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);

		},
		error: function (errObj) {
			Main.HideLoading();
			// presentPagedetails.ActivescreenSessionEnd= [];
		},
		timeout: 60000
	});
}
Main.ActivescreenSessionEnd = function (id) {
	Main.ShowLoading();
	var formData = new FormData();
	var splitData = id.split('-');
	for (var i = 0; i < presentPagedetails.Activescreens.length; i++) {
		if (i === parseInt(splitData[1])) {
			formData.append("poll_key", presentPagedetails.Activescreens[i].streamPollKey);
			// presentPagedetails.Activescreens.splice(i, 1);
			break;
		}
		formData.append("session_id", presentPagedetails.Activescreens[i].appSessionId);
		// presentPagedetails.Activescreens.splice(i,1);
	}

	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/stream/session/end",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		processData: false,
		contentType: false,
		cache: false,
		data: formData,
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			// Yup('#mainContent').html('');
			Main.popupData = {
				popuptype: 'info',
				message: result.response.message,
				buttonCount: 1,
				yesText: 'Continue',
				yesTarget: 'activeClose',
			}
			Yup("#popUpFDFS").html(Util.showPopup());
			Yup("#popup-btn-1").addClass('popupFocus');
			// Main.previousPage();
			// Yup('.account-page').html(Util.ActiveScreens());
			// utilities.ActivescreenSessionEndPopup(result.response);
		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.ActivescreenSessionEnd = [];
		},
		timeout: 60000
	});
}

Main.getActiveScreen = function () {
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/stream/active/sessions",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			var screenArray = []
			var screenDevices = result.response
			for (i = 0; i < screenDevices.length; i++) {
				if (Main.BOXID === screenDevices[i].boxId) {
					screenArray.push(result.response[i])
					screenDevices.splice(i, 1);
				}
			}
			for (i = 0; i < screenDevices.length; i++) {
				screenArray.push(result.response[i])
			}
			presentPagedetails = {};
			presentPagedetails.Activescreens = screenArray;
			Yup('#mainContent').html('');
			Yup('#mainContent').html(Util.deviceHTML());
			Yup(".imageFocus").removeClass("imageFocus");
			Yup("#close_screen_btn-0").addClass("imageFocus");
			view = 'activeScreens'
			presentPagedetails.view = view;
			presentPagedetails.targetPath = 'activeScreens';
			Main.HideLoading();
		},
		error: function (errObj) {
			presentPagedetails.Activescreens = [];

			Main.HideLoading();
		},
		timeout: 60000
	});
}
Main.getActiveProfiles = function (versions, identifieeer) {
	Main.ShowLoading();
	var data = {
		"version": versions,
		"identifierType": "mobile",
		"identifier": identifieeer
	};
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/linked/v3/devices/list",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			result = JSON.parse(data);
			if (result.status == true) {
				presentPagedetails.activeSessions = result.response
				if (comingFromTheSignin == true) {
					profilesPageAppeared.profilesPagePageName = 'device limit reached'
					clevertapservice.profilePageEvent();
					comingFromTheSignin = false
					view = 'profileDevicesLimit'
					presentPagedetails = {};
					presentPagedetails.view = view;
					presentPagedetails.targetPath = 'profileDevicesLimit';
					presentPagedetails.activeSessions = result.response
					Yup('#mainContent').html('');
					Yup("#mainContent").html(Util.afterSignActiveScreen(result.response));
					Main.hideMenu();
					if (presentPagedetails.activeSessions.deviceList.length > 1) {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup("#signin_device-0").addClass("imageFocus");
					}
				}
				else {
					Yup('.account-page').html('');
					Yup(".account-page").html(Util.deviceLimitScreen(result.response));
					Yup('.account-page').addClass("deviceLimitScreens");
					profilesPageAppeared.profilesPagePageName = 'manage your devices'
					clevertapservice.profilePageEvent();
					comingFromTheSignin = false
					if (presentPagedetails.activeSessions.deviceList.length > 1) {
						Yup(".imageFocus").removeClass("imageFocus");
						Yup("#device_Details-1").addClass("imageFocus");
					}
					else {
						Yup(".toptab.active").removeClass("active");
						Yup(".imageFocus").removeClass('imageFocus');
						Yup("#account-5-0").addClass("imageFocus");
						Yup("#account-5-0").addClass("active");
					}
				}
			}
			else if (result.error.code == -1) {
				Main.requestSignIn()
			}
			else {
				Main.HideLoading()
				Main.popupData = {
					popuptype: 'unknown',
					message: result.error.message,
					buttonCount: 1,
					yesText: 'Try Again',
					yesTarget: 'sessionLogout',
					onBack: 'exit',
				}
				Yup("#popUpFDFS").html(Util.showPopup());
				Yup("#popup-btn-1").addClass('popupFocus');
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
	Main.HideLoading();
}
// Main.getActiveProfiles = function () {
// 	Main.ShowLoading();
// 		Yup.ajax({
// 			url: Main.mainApi + "/service/api/auth/list/user/profile",
// 			type: "GET",
// 		headers: {
// 			"tenant-code": Main.tenantCode,
// 			"box-id": Main.getBOXID(),
// 			"session-id": Main.getSessionID(),
// 			"ucv":"20"
// 		},
// 				contentType: "application/json; charset=utf-8",
// 		success: function (data) {
// 			Main.HideLoading();
// 			result = JSON.parse(data);
// 			if (result.status == true) {
// 		// if(comingFromTheSignin == true){
// 		// 	comingFromTheSignin = false
// 		// 	Yup('.account-page').html('');
// 		// 	Yup(".account-page").html(Util.afterSignActiveScreen(result.response));	
// 		// }
// 		// else{
// 		// 	Yup('.account-page').html('');
// 		// 	Yup(".account-page").html(Util.deviceLimitScreen(result.response));	
// 		// 	comingFromTheSignin = false
// 		// }
// 			}
// 			else if(result.error.code != -1){
// 				utilities.genricPopup(result.error.message,'info');
// 			}	
// 		},
// 		error: function (errObj) {
// 			Main.HideLoading();
// 			utilities.genricPopup('Something Went Wrong','unknown');	

// 		},
// 		timeout: 60000
// 	});
// }

Main.removeActiveSessions = function (id) {
	Main.ShowLoading();
	var data;
	var data = { "box_id": presentPagedetails.activeSessions.deviceList[id].boxId, "device_type": presentPagedetails.activeSessions.deviceList[id].deviceId };
	Yup.ajax({
		url: Main.mainApi + "/service/api/auth/delink/device",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				if (view == 'profileDevicesLimit') {
					Main.popupData = {};
					Main.requestSignIn()
				}
				else {
					Main.popupData = {};
					Yup('.toastmsg_template').html(result.response.message)
					Yup('.toastmsg_template').css('display', 'block');
					setTimeout(function () {
						Yup('.toastmsg_template').css('display', 'none');
					}, 1500);
					Main.getActiveProfiles(1, utilities.encryptData(Main.userProfile.mobile));
				}
			}
			else {
				utilities.genricPopup(result.error.message, 'info');

			}

		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
}

Main.events_callback = function (event) {
	// console.log("events_callback--->>",event)

}
Main.close_callback = function (data) {
	presentPagedetails.isSunnxtSdk = false
	Main.previousPage()
	if (presentPagedetails.backFocusId) {
		Yup(".imageFocus").removeClass("imageFocus");
		Yup("#" + presentPagedetails.backFocusId).addClass('imageFocus')
		presentPagedetails.backFocusId = ""
	}
	console.log("close_callback-->>", data)
}

Main.player_error_callback = function (error) {
	utilities.genricPopup(error, 'info');
	presentPagedetails.isSunnxtSdk = false
	if (presentPagedetails.backFocusId) {
		Yup(".imageFocus").removeClass("imageFocus");
		Yup("#" + presentPagedetails.backFocusId).addClass('imageFocus')
		presentPagedetails.backFocusId = ""
	}
	console.log("player_error_callback)-->>", error)
}

Main.sunnxtSdkinitializationCallback = function (open_player_callback, sdk_status_data) {
	if (sdk_status_data.status == true) {
		playerSdksintializations.sunSDK = true
		if (!!open_player_callback) {
			open_player_callback()

		}
	}
	else {
		playerSdksintializations.sunSDK = false
		if (sdk_status_data.error.message) {
			utilities.genricPopup(sdk_status_data.error.message, 'info');
		}
		else {
			utilities.genricPopup('Something Went Wrong', 'unknown');
		}
	}
}

Main.openSunPlayer = function () {
	console.log('open sunplayer')
	Main.ShowLoading();
	var playerOptions = {
		"containerId": "mainContent",
		"contentId": presentPagedetails.sunnxtContentId.replace("sunnxt", ''),
		"contentType": "Movies",
		"autoplay": true,
		"cc": false,
		"ccPrefrence": "",
		"mute": false
	}

	try {
		if (window.tizen) {
			window.SUNNXT_SAM_SDK.InitPlayer(playerOptions, Main.events_callback.bind(Main), Main.close_callback.bind(Main), Main.player_error_callback.bind(Main));
		}
		else if (window.webOS) {
			window.SUNNXT_LG_SDK.InitPlayer(playerOptions, Main.events_callback.bind(Main), Main.close_callback.bind(Main), Main.player_error_callback.bind(Main));

		}
		presentPagedetails.backFocusId = Yup('.imageFocus').attr("id");
		Yup(".imageFocus").removeClass("imageFocus");
		Main.hideMenu();
		utilities.refreshContinueWatching();
		if (targetComingFromSign == true) {
			backData = []
			targetComingFromSign = false
		}
		else {
			Main.addBackData("sunPlayer");
		}
		Yup("#mainContent").html('');
		presentPagedetails.isSunnxtSdk = true;

	} catch (error) {
	}


	Main.HideLoading();
}

Main.sunNxtSdk = function (open_player_callback) {
	Main.ShowLoading();
	var userDetails = JSON.parse(localStorage.getItem('userDetails'));
	var numberOne = userDetails.phoneNumber
	if (numberOne) {
		if (numberOne.indexOf("91-") !== 0) {
			numberOne = "91-" + numberOne;
		}
	}
	Yup.ajax({
		url: Main.mainApi + "/service/api/v1/crete/tag?mobile=" + numberOne + "&vendor_code=sunnxt",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (data) {
			result = typeof (data) == 'object' ? data : JSON.parse(data);

			try {
				Main.HideLoading();
				if (result.status == true) {
					console.log("result---->>", result)
					if (window.tizen) {
						var option = {
							"tag": result.response.tag,
							"UniqueId": numberOne,
							"syp": "VIMTV",
							"deviceId": "VIMTV",
							"devicename": "VIMSAMSUNG",
							"debuglevel": true,
							"deviceType": "OPEN"
						}
					}
					else if (window.webOS) {
						var option = {
							"tag": result.response.tag,
							"UniqueId": numberOne,
							"syp": "VIMTV",
							"deviceId": "VIMTV",
							"devicename": "VIMLG",
							"debuglevel": true,
							"deviceType": "OPEN",
							"airmouseEnable": true
						}
					}

					try {
						console.log()
						if (window.tizen) {
							window.SUNNXT_SAM_SDK.Init(option, Main.sunnxtSdkinitializationCallback.bind(Main, open_player_callback))
						}
						else if (window.webOS) {
							window.SUNNXT_LG_SDK.Init(option, Main.sunnxtSdkinitializationCallback.bind(Main, open_player_callback))

						}

					} catch (e) { console.log(e) }

				}
				else {
					utilities.genricPopup(result.error.message, 'info');

				}
			} catch (e) {

			}
		},
		error: function (errObj, textStatus) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');
		},

		timeout: 60000
	});
	Main.HideLoading();
}

Main.distroChannelViewed = function () {
	Main.ShowLoading();
	var DistroContentViewed = "https://i.jsrdn.com/i/1.gif?dpname='vodafone'&r=" + Date.now() + "&e='ff'&u=" + generateGUID() + "&i='ff'&v='ff'&m='vodafone'&p=''&show=''&ep=''&dv='ctv'&f=''"
	Yup.ajax({
		url: DistroContentViewed,
		type: "GET",
		data: {},
		success: function (data) {
			console.log("distro_viewed")
		},
		error: function (errObj) {
		},
		timeout: 60000
	});
	Main.HideLoading();
}
Main.distroContentPlaying = function (Vidurl) {
	Main.ShowLoading();
	if (!distroPassData.playbackId) {
		generateGUID();
	}
	// Encoded the streamUrl
	var encoVidurl = encodeURIComponent(Vidurl);
	var distroCustom_data = JSON.parse(presentPagedetails.steamResponse.analyticsInfo.customData);
	var DistroContentUrl = "https://i.jsrdn.com/i/1.gif?dpname=vodafone&r=" + Date.now() +
		"&e=vplay&u=" + distroPassData.playbackId +
		"&i=&v=&m=vodafone&p=" + distroCustom_data.cpContentProviderId +
		"&show=" + distroCustom_data.cpShowId +
		"&ep=" + distroCustom_data.cpEpisodeId +
		"&dv=ctv&f=" + encoVidurl;
	Yup.ajax({
		url: DistroContentUrl,
		type: "GET",
		data: {}, // No additional data needed
		success: function (data) {
			console.log("distro_played");
		},
		error: function (errObj) {
			console.error("Error in AJAX request:", errObj);
		},
		timeout: 60000 // Timeout set to 60 seconds
	});

	Main.HideLoading();
}

//myReco
Main.myRecoApi = function (data, comingFromPartner) {
	Main.ShowLoading();
	var selectedLan = localStorage.getItem("selectedAudio")
	if (comingFromPartner !== true) {
		var currentAudioTrack = ''
		if (_shaka != undefined) {
			currentAudioTrack = _shaka.getVariantTracks().find(function (track) {
				return track.active;
			});
		}
		if (currentAudioTrack && currentAudioTrack.language && currentAudioTrack.language !== "und") {
			if (systemConfigs && systemConfigs.contentLanguages) {
				for (var i = 0; i < systemConfigs.contentLanguages.length; i++) {
					// for(var j=0;j<systemConfigs.contentLanguages[i].name;j++){
					var langName = systemConfigs.contentLanguages[i].name.substring(0, 2).toLowerCase();
					if (langName == currentAudioTrack.language.toLowerCase()) {
						var selectedLang = systemConfigs.contentLanguages[i].name;
						break;
					}
					else {
						var selectedLang = currentAudioTrack.language;
					}
					// }
				}

			}
			else {
				var selectedLang = currentAudioTrack.language;
			}
		} else if (presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.language) {
			var selectedLang = presentPagedetails.attributes.language;
		} else if (selectedLan) {
			var selectedLang = selectedLan;
		}
	} else {
		var selectedLang = presentPagedetails && presentPagedetails.attributes && presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "";
	}

	if (comingFromPartner == true) {
		var totalDurationInMillisRound = 1
	}
	else if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
		if (!!timerSeconds) {
			var totalDurationInMillisRound = timerSeconds
		}
		else {
			var totalDurationInMillisRound = 1
		}
	}
	else {
		if (!!timerSeconds) {
			if (typeof timerSeconds === 'string') {
				var totalDurationInMillisRound = JSON.parse(timerSeconds);
			} else {
				var totalDurationInMillisRound = timerSeconds;
			}
		}
		else {
			var totalDurationInMillis = (presentPagedetails.steamResponse.streamStatus.totalDurationInMillis / 1000);
			var totalDurationInMillisRound = totalDurationInMillis.toFixed(0);
			if (typeof totalDurationInMillisRound === 'string') {
				totalDurationInMillisRound = JSON.parse(totalDurationInMillisRound);
			} else {
				totalDurationInMillisRound = totalDurationInMillisRound;
			}
		}


	}
	var userDetails = JSON.parse(localStorage.getItem('userDetails'));
	var updateForMyReco = {
		trackingId: myReco.trackingId ? myReco.trackingId : "",
		originMedium: myReco.originMedium ? myReco.originMedium : "",
		originName: ctEvent.carouselName ? ctEvent.carouselName : "",
		contentPath: presentPagedetails.targetPath ? presentPagedetails.targetPath : "",
		tabName: ctEvent.tabName ? ctEvent.tabName : "",
		selectedAudioLanguage: selectedLang ? selectedLang : "",
		network: navigator && navigator.connection && navigator.connection.type ? navigator.connection.type : "",
		carouselPosition: String(ctEvent.carouselPositionn) ? String(ctEvent.carouselPositionn) : "",
		contentPosition: String(ctEvent.contentPositionss) ? String(ctEvent.contentPositionss) : "",
		value: totalDurationInMillisRound ? totalDurationInMillisRound : "",
		sdkVersion: device_info && device_info.sdkVersion ? device_info.sdkVersion : "",
		userId: userDetails.userId ? userDetails.userId : ''
	};
	for (var key in updateForMyReco) {
		if (updateForMyReco.hasOwnProperty(key)) {
			data[key] = updateForMyReco[key];
		}
	}

	var jsonData = JSON.stringify(data);
	Yup.ajax({
		url: Main.mainApi + '/service/api/v1/send/myreco/events',
		type: "POST",
		data: jsonData,
		contentType: "application/json; charset=utf-8",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (response) {
			var result = JSON.parse(response);
			if (result.status === true && result.status.code === 200) {
				// utilities.genricPopup(result.response.message, 'info');
			} else if (result.error && result.error.message && result.error.code === 404) {
				utilities.genricPopup(result.error.message, 'noData');
			} else if (result.error && result.error.message) {
				utilities.genricPopup(result.error.message, 'info');
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.responseErrorCheck(errObj);
		},
		timeout: 60000
	});

	Main.HideLoading();
};

Main.ctVideoStopFunction = function () {
	var oldLanguage = localStorage.getItem("selectedAudio")
	var aa = localStorage.getItem('clicked-menu');
	if (presentPagedetails.steamResponse.analyticsInfo.contentType == "live") {
		var durationWatched = "na"
		var totalDurationInMillisRound = "na"
	}
	else {
		var totalDurationInMillis = (presentPagedetails.steamResponse.streamStatus.totalDurationInMillis / 1000);
		var totalDurationInMillisRound = totalDurationInMillis.toFixed(0);
		var durationWatched = ((timerSeconds / totalDurationInMillis) * 100).toFixed(0)
	}
	clevertapservice.sendCleverTapEvent('video stopped', {
		'source': ctEvent.comingFromExitList ? ctEvent.comingFromExitList : (ctEvent.comingFromExit ? ctEvent.comingFromExit : (presentPagedetails.navigationFrom === "player") ? "player recommendations" : (presentPagedetails.navigationFrom === "seasonsDetails") ? "browse episodes" : (presentPagedetails.navigationFrom === "search") ? "search" : postPaidPopContentData && postPaidPopContentData["searchSource"] ? postPaidPopContentData["searchSource"] : "carousel"),
		'sub source details': (presentPagedetails.navigationFrom === "player" || ctEvent.youmayLike === 'recommendations') ? 'recommendations' : (aa === 'My Bingelist') ? 'My Bingelist' : (ctEvent.explbyNamea ? ctEvent.explbyNamea : ''),
		'source details': postPaidPopContentData && postPaidPopContentData["source details"] ? postPaidPopContentData["source details"] : ctEvent.carouselName,
		'carousel position': ctEvent.carouselPositionn,
		'content position': ctEvent.contentPositionss,
		'content id': presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
		'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
		'content language': presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
		'content partner name': presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
		'content model': (presentPagedetails.attributes.networkPayType === "Paid" || presentPagedetails.attributes.networkPayType === "P") ? "svod" : "avod",
		'content tag': presentPagedetails.attributes.payType === "P" ? "paid" : "free",
		'content type': view == "tvshowDetails" ? presentPagedetails.attributes.mediaContentType : presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
		'content genre': presentPagedetails.attributes.genre ? presentPagedetails.attributes.genre : "",
		'consumption type': "streaming",
		'tv show name': presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : "",
		'content duration': totalDurationInMillisRound ? totalDurationInMillisRound : "",
		'duration viewed': timerSeconds ? timerSeconds : "",
		'%completed': durationWatched ? durationWatched : "",
		'tab': ctEvent.tabName,
		'sub tab': ctEvent && ctEvent.subtabName ? ctEvent.subtabName : "na",
		'subtitles': localStorage.selectedLanguage ? "on" : "off",
		'subtitles language': localStorage.selectedLanguage,
		// 'chromecast enabled': "",
		'audio language': oldLanguage ? oldLanguage : "",
		'module tracking id': ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
		'module tracking name': ctEvent.moduleTrackerId ? "myreco" : ""
	})
	// making value empty
	timerSeconds = 0;
	isTimerRunning = false;
	ctEvent.carouselName = "";
	ctEvent.explbyNamea = "";
	ctEvent.youmayLike = "";
	ctEvent.carouselPositionn = "";
	ctEvent.topBanner = "";
	ctEvent.bannersObj = '';
	// ctEvent.tabName = "";
	ctEvent.comingFromExit = "";
	ctEvent.comingFromExitList = "";
	localStorage.removeItem("clicked-menu")
}

Main.ctClickEvent = function (id) {
	var substring = 'view_all';
	var splitData = id.split('-');
	var classname = Yup('.imageFocus').attr("class");
	ctEvent.carouselName = '';
	var aa = localStorage.getItem('clicked-menu');
	ctEvent.moduleTrackerId = (view != 'search' && presentPagedetails.sections[0].sectionData.myRecoTrackingId ? presentPagedetails.sections[0].sectionData.myRecoTrackingId : "")
	if (view === "list") {
		ctEvent.carouselName = presentPagedetails.sections[0].sectionInfo.name ? presentPagedetails.sections[0].sectionInfo.name : "na";
		if (ctEvent && ctEvent.topBanner) {
			ctEvent.topBanner = ""
		}
	} else if (view == "search") {
		ctEvent.carouselName = presentPagedetails.trendingSearch.response.data[0].section.sectionInfo.name ? presentPagedetails.trendingSearch.response.data[0].section.sectionInfo.name : 'na'
		if (ctEvent && ctEvent.topBanner) {
			ctEvent.topBanner = ""
		}
	}
	//  else if(classname.indexOf(substring) !== -1){
	//     ctEvent.carouselName = "na";
	// }
	else if (presentPagedetails.targetPath == "favourites") {
		ctEvent.carouselName = presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : 'na';
		if (ctEvent && ctEvent.topBanner) {
			ctEvent.topBanner = ""
		}
	} else {
		ctEvent.carouselName = presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : "na";
		if (ctEvent && ctEvent.topBanner) {
			ctEvent.topBanner = ""
		}
	}

	var clickSection = {}

	if (classname.indexOf(substring) !== -1) {
		clickSection = {}
	} else if (view == 'search') {
		myReco.originMedium = "search"
		if (presentPagedetails.trendingSearch.response.data.length > 0 && presentPagedetails.searchResults.length === 0) {
			clickSection = {
				genre: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre : "",
				contentType: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType : "",
				contentLang: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.language ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.language : '',
				contentPartnerName: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName : '',
				contentId: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.id ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.id : '',
				tvshowname: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : '',
				model: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'svod' : 'avod',
				tab: ctEvent.tabName ? ctEvent.tabName : "",
				contantTag: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType == "P" ? 'paid' : 'free',
				contentName: presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : presentPagedetails.trendingSearch.response.data[0].section.sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentName,
				sourcePly: "carousel",
			};
		} else {
			var searchResult = presentPagedetails.searchResults && presentPagedetails.searchResults[parseInt(splitData[1])];
			var targetAttributes = searchResult && searchResult.target && searchResult.target.pageAttributes;
			clickSection = {
				genre: targetAttributes && targetAttributes.genre ? targetAttributes.genre : "",
				contentType: targetAttributes && targetAttributes.contentType ? targetAttributes.contentType : "",
				contentLang: targetAttributes && targetAttributes.language ? targetAttributes.language : "",
				contentPartnerName: targetAttributes && targetAttributes.networkName ? targetAttributes.networkName : "",
				contentId: targetAttributes && targetAttributes.id ? targetAttributes.id : "",
				tvshowname: targetAttributes && targetAttributes.tvShowName ? targetAttributes.tvShowName : "",
				model: targetAttributes && targetAttributes.payType === "P" ? "svod" : "avod",
				tab: ctEvent && ctEvent.tabName ? ctEvent.tabName : "",
				contantTag: targetAttributes && targetAttributes.payType === "P" ? "paid" : "free",
				contentName: targetAttributes && targetAttributes.tvShowName ? targetAttributes.tvShowName : "",
				sourcePly: "search"
			};


		}

	} else if (view === 'list') {
		myReco.originMedium = "carousel"
		myReco.trackingId = presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[0] && presentPagedetails.sections[0].sectionData && presentPagedetails.sections[0].sectionData.myRecoTrackingId ? presentPagedetails.sections[0].sectionData.myRecoTrackingId : ""
		clickSection = {
			genre: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.genre : '',
			contentType: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.contentType : '',
			contentLang: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.language ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.language : '',
			contentPartnerName: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.networkName : '',
			contentId: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.id ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.id : '',
			tvshowname: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : '',
			model: (presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P") ? 'svod' : 'avod',
			tab: ctEvent.tabName ? ctEvent.tabName : "",
			contantTag: (presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.payType === "P") ? 'paid' : 'free',
			contentName: presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[1])].target.pageAttributes.tvShowName : '',

		}
	} else if (view === "seasonsDetails") {
		myReco.originMedium = "carousel"
		if (presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[parseInt(splitData[1])] && presentPagedetails.sections[parseInt(splitData[1])].sectionData
			&& presentPagedetails.sections[parseInt(splitData[1])].sectionData.data && presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])] && presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target
			&& presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes) {
			// myReco.trackingId = presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[0] && presentPagedetails.sections[0].sectionData && presentPagedetails.sections[0].sectionData.myRecoTrackingId ? presentPagedetails.sections[0].sectionData.myRecoTrackingId : ""
			clickSection = {
				genre: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.genre ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.genre : '',
				contentType: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType : '',
				contentLang: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.language ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.language : '',
				contentPartnerName: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName : '',
				contentId: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id : '',
				tvshowname: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName : '',
				model: (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P") ? 'svod' : 'avod',
				tab: ctEvent.tabName ? ctEvent.tabName : "",
				contantTag: (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P") ? 'paid' : 'free',
				contentName: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName : '',

			}
		}
	}
	else {
		myReco.originMedium = "carousel"
		myReco.trackingId = presentPagedetails && presentPagedetails.sections && presentPagedetails.sections[parseInt(splitData[1])] && presentPagedetails.sections[parseInt(splitData[1])].sectionData && presentPagedetails.sections[parseInt(splitData[1])].sectionData.myRecoTrackingId ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.myRecoTrackingId : ""
		clickSection = {
			genre: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.genre ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.genre : '',
			contentType: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType : '',
			contentLang: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.language ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.language : '',
			contentPartnerName: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName : '',
			contentId: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id : '',
			tvshowname: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName : '',
			model: (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P") ? 'svod' : 'avod',
			tab: ctEvent.tabName ? ctEvent.tabName : "",
			contantTag: (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.payType === "P") ? 'paid' : 'free',
			contentName: presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName : (presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentName ? presentPagedetails.sections[parseInt(splitData[1])].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentName : (presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.code === "explore-tab" ? presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name : "")),
			souDet: presentPagedetails.sections[parseInt(splitData[1])].sectionInfo.name,
			sourceSubDet: ctEvent.explbyNamea ? ctEvent.explbyNamea : (aa == 'My Bingelist') ? 'My Bingelist' : (ctEvent.youmayLike === 'recommendations') ? 'recommendations' : "",
			module_tracking_id: ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
			module_tracking_name: (ctEvent.moduleTrackerId.length > 0) ? "myreco" : "",
		};
	}
	clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, (parseInt(splitData[1]) + 1), (parseInt(splitData[2]) + 1)));
	if (view != 'search') {
		clevertapservice.sendCleverTapEvent('carousel clicked', utilities.sendEventItems(clickSection, (parseInt(splitData[1]) + 1), (parseInt(splitData[2]) + 1), id));
		clevertapservice.sendCleverTapEvent('video details viewed', utilities.sendEventItems(clickSection, (parseInt(splitData[1]) + 1), (parseInt(splitData[1]) + 2), id));
	}


}

Main.ctDammyPopupEvent = function (templateSource, btnAction, btnLabel) {
	// presentPagedetails.templateData.lastClickedCardId = id
	if (templateSource == "sections" || templateSource == "cards") {
		clevertapservice.sendCleverTapEvent('popup', {
			'label': (presentPagedetails.templateData.templateCode == 'TV_Suspended_popup') ? "suspended" : ((presentPagedetails.templateData.templateCode == 'TV_COCP_popup') ? "cocp" : 'redirection consent'),
			'popup name': (presentPagedetails.templateData.templateCode == 'TV_Suspended_popup') ? "suspended" : ((presentPagedetails.templateData.templateCode == 'TV_COCP_popup') ? "cocp" : "app in app redirection popup"),
			'action': btnAction ? btnAction : "",
			'button label': btnText ? btnText : "na",
			'source': "carousel",
			'source details': ctEvent.carouselName,
			'content name': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentName
				? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentName : "",
			'content id': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id
				? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.id : "",
			'carousel position': ctEvent.carouselPositionn,
			'carousel name': ctEvent.carouselName,
			'tab': ctEvent.tabName,
			'content position': ctEvent.contentPositionss,
			'content partner name': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName
				? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.networkName : "",
			'content type': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType
				? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.contentType : "",
			'tv show name': presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName
				? presentPagedetails.sections[0].sectionData.data[parseInt(splitData[2])].target.pageAttributes.tvShowName
				: ""
		})
	}
	else if (templateSource == "button") {
		clevertapservice.sendCleverTapEvent('popup', {
			'label': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
				: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "redirection consent",
			'popup name': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
				: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "app in app redirection popup",
			'action': btnAction ? btnAction : "",
			'button label': btnLabel ? btnLabel : "",
			'source': "carousel",
			'source details': "",
			'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
			'content id': presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
			'content language': presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
			'carousel position': ctEvent.carouselPositionn,
			'carousel name': ctEvent.carouselName,
			'tab': ctEvent.tabName,
			'content position': ctEvent.contentPositions,
			'content partner name': presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
			'content type': presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
			'tv show name': presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : ""
		})
	} else if (presentPagedetails.view == "search") {
		var id = Yup('.imageFocus').attr("id");
		var splitData = id.split('-');
		if (presentPagedetails.searchResults.length > 0) {
			clevertapservice.sendCleverTapEvent('popup', {
				'label': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
					: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "redirection consent",
				'popup name': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
					: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "app in app redirection popup",
				'action': btnAction ? btnAction : "",
				'button label': btnLabel ? btnLabel : "",
				'source': "carousel",
				'source details': "",
				'content name': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.contentName : "",
				'content id': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.id ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.id : "",
				'content language': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.language ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.language : "",
				'carousel position': ctEvent.carouselPositionn,
				'carousel name': ctEvent.carouselName,
				'tab': ctEvent.tabName,
				'content position': ctEvent.contentPositions,
				'content partner name': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.networkName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.networkName : "",
				'content type': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.mediaContentType ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.mediaContentType : "",
				'tv show name': presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.tvShowName ? presentPagedetails.searchResults[parseInt(splitData[1])].target.pageAttributes.tvShowName : "",
			})

		}
	} else {
		clevertapservice.sendCleverTapEvent('popup', {
			'label': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
				: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "redirection consent",
			'popup name': (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_Suspended_popup') ? "suspended"
				: (presentPagedetails.templateData && presentPagedetails.templateData.templateCode === 'TV_COCP_popup') ? "cocp" : "app in app redirection popup",

			'action': btnAction ? btnAction : "",
			'button label': btnLabel ? btnLabel : "",
			'source': "carousel",
			'source details': "",
			'content name': presentPagedetails.attributes.contentName ? presentPagedetails.attributes.contentName : "",
			'content id': presentPagedetails.attributes.id ? presentPagedetails.attributes.id : "",
			'content language': presentPagedetails.attributes.language ? presentPagedetails.attributes.language : "",
			'carousel position': ctEvent.carouselPositionn,
			'carousel name': ctEvent.carouselName,
			'tab': ctEvent.tabName,
			'content position': ctEvent.contentPositions,
			'content partner name': presentPagedetails.attributes.networkName ? presentPagedetails.attributes.networkName : "",
			'content type': presentPagedetails.attributes.contentType ? presentPagedetails.attributes.contentType : "",
			'tv show name': presentPagedetails.attributes.tvShowName ? presentPagedetails.attributes.tvShowName : ""
		})
	}
	// presentPagedetails.templateData.lastClickedCardId = id


}

Main.ctForTopbanner = function (splIds) {
	ctEvent.topBanner = 'top banner'
	var carP = 1;
	var contP = parseInt(splIds[1]) + 1;
	ctEvent.carouselPositionn = carP;
	ctEvent.contentPositionss = contP;
	var clickSection = {
		genre: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.genre ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.genre : "",
		contentType: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.mediaContentType ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.mediaContentType : "",
		contentLang: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.language ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.language : "",
		contentPartnerName: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.networkName ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.networkName : "",
		contentId: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.id ? presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.id : "",
		tvshowname: "",
		model: presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.payType == "P" ? 'svod' : 'avod',
		tab: ctEvent.tabName ? ctEvent.tabName : "",
		contantTag: (presentPagedetails.banners[parseInt(splIds[1])].target.pageAttributes.payType == "P") ? "paid" : "free",
		contentName: presentPagedetails.banners[parseInt(splIds[1])].title ? presentPagedetails.banners[parseInt(splIds[1])].title : "",
		souDet: 'top banner',
		module_tracking_id: ctEvent.moduleTrackerId ? ctEvent.moduleTrackerId : "",
		module_tracking_name: (ctEvent.moduleTrackerId.length > 0) ? "myreco" : "",

	}
	myReco.originMedium = "banners"
	clevertapservice.sendCleverTapEvent('click event', utilities.sendEventItems(clickSection, 1, (parseInt(splIds[1]) + 1)));
	clevertapservice.sendCleverTapEvent('carousel clicked', utilities.sendEventItems(clickSection, 1, (parseInt(splIds[1]) + 1)));
	clevertapservice.sendCleverTapEvent('video details viewed', utilities.sendEventItems(clickSection, 1, (parseInt(splIds[1]) + 1)));
}
Main.contentPartnerCW = function (targetPath) {
	Main.HideLoading();
	var data = {
		"content_path": targetPath,
	}; var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	try {
		Yup.ajax({
			url: Main.mainApi + "/service/click/analytics/v1/send/data",
			type: 'POST',
			data: data,
			headers: headerJ,
			success: function (data) {
				// if (result.status == true) {
				// 	console.log("api true")

				// } else {
				// 	console.log("api false")
				// }
				Main.HideLoading();
			},
			error: function (errObj) {
				Main.HideLoading();
			},
			timeout: 60000
		});
	} catch (error) {
		Main.HideLoading();
	}
}

Main.addToPlansPostPaid = function (detailsText, comingFromSwitchProfile, targetPath, doneCb) {
	if (typeof targetPath === 'function') {
		doneCb = targetPath;
		targetPath = undefined;
	}
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/package/api/v1/packages/info?skip_package_content=false",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				if (result.response && (result.response.packages == 0 || (Array.isArray(result.response.packages) && result.response.packages.length == 0))) {
					var upgradePath = targetPath || (typeof detailsText === 'string' && (detailsText.indexOf('/') > -1 || detailsText.indexOf(':') > -1) ? detailsText : '');
					var isOverlayClicked = (detailsText === "subscription overlay");
					Main.getUpgradeData(upgradePath, isOverlayClicked, undefined, doneCb, detailsText);
					return;
				}
				Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});



				if (Yup('.banners').css('display') == 'block') {
					view = 'bannersPlansUpgrade';
					presentPagedetails = {};
					if (!!result.response) {
						presentPagedetails.response = result.response
					}
					if (comingFromSwitchProfile == true || targetComingFromSign == true) {
						presentPagedetails.comingFromSwitchProfile = true;
						targetComingFromSign = false;
					}
					view = 'bannersPlansUpgrade';
					presentPagedetails.view = 'bannersPlansUpgrade';
					presentPagedetails.targetPath = 'bannersPlansUpgrade';
				}
				else {
					presentPagedetails = {};
					if (!!result.response) {
						presentPagedetails.response = result.response
					}
					if (comingFromSwitchProfile == true || targetComingFromSign == true) {
						presentPagedetails.comingFromSwitchProfile = true;
						targetComingFromSign = false;
					}
					view = 'plansUpgrade';
					presentPagedetails.view = 'plansUpgrade';
					presentPagedetails.targetPath = 'plansUpgrade';
				}
				if (comingFromSwitchProfile == true || targetComingFromSign == true) {
					presentPagedetails.comingFromSwitchProfile = true;
					targetComingFromSign = false;
				}
				Main.hideMenu();
				Yup("#mainContent").html('');
				Yup("#mainContent").append(Util.addToPlansPostpaid(result.response));
				Yup("#package_item-0").addClass("imageFocus")
				if (detailsText && (detailsText.toLowerCase() == 'watch now' || detailsText.toLowerCase() == 'watch live')) {
					detailsText = "content Watch Now"
				}
				else {
					detailsText = detailsText
				}
				if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
					var sourceDetailsPop = ctEvent.topBanner
				}
				clevertapservice.sendCleverTapEvent('subscription page appeared', {
					'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (detailsText ? detailsText.toLowerCase() : ""),
					'page name': 'pro subscription',
					'pack name': presentPagedetails && presentPagedetails.firstPackName ? presentPagedetails.firstPackName : "",
					'movies pack price': presentPagedetails && presentPagedetails.firstPackPrice ? presentPagedetails.firstPackPrice : ""
				})
				presentPagedetails.btnText = detailsText
				if (typeof doneCb === "function") {
					doneCb();
				}
			}
			else {
				utilities.genricPopup(result.error.message, 'info');
				if (typeof doneCb === "function") {
					doneCb();
				}
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			presentPagedetails.Activescreens = [];

			Main.HideLoading();
			if (typeof doneCb === "function") {
				doneCb();
			}
		},
		timeout: 60000
	});
};

Main.addPostPaidBillClick = function (detailsText) {
	Main.ShowLoading();
	var data;
	if (view == 'bannersPlansUpgrade') {
		data = { "packages": JSON.stringify(presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].id), "gateway": presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].gateway };
	}
	else {
		data = { "packages": JSON.stringify(presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].id), "gateway": presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].gateway };
	}
	Yup.ajax({
		url: Main.mainApi + "/payment/api/v1/order/checkout",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				Yup("#popUpFDFS").html('');
				if (view == 'bannersPlansUpgrade') {
					clevertapservice.sendCleverTapEvent('subscription page clicked', {
						'page name': 'postpaid confirmation',
						'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
						'action': detailsText ? detailsText : "confirm",
						'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
						'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
					})
					presentPagedetails.orderID = result.response.orderId
					var statusToPlansPpId = Main.popupData.addBillID
					Main.bannersStatusToPlansPostPaid(statusToPlansPpId);
					Main.popupData = {};
				}
				else {
					clevertapservice.sendCleverTapEvent('subscription page clicked', {
						'page name': 'postpaid confirmation',
						'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
						'action': detailsText ? detailsText : "confirm",
						'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
						'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : ""
					})
					presentPagedetails.orderID = result.response.orderId
					var statusToPlansPpId = Main.popupData.addBillID
					Main.statusToPlansPostPaid(statusToPlansPpId);
					Main.popupData = {};
				}
			}
			else {
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
				if (!!plansData) {
					Main.previousPage();
					utilities.postpaidPaymentFailedPopup(plansData.error_page.description, plansData.error_page.heading, plansData.error_page.button_title);
				}


			}

		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
};
Main.bannerAddPostPaidBillClick = function (detailsText) {
	Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});
	Main.ShowLoading();
	var data;
	var data = { "packages": Main.popupData.bannersAddBillID, "gateway": Main.popupData.bannersAddBillGateway };
	Yup.ajax({
		url: Main.mainApi + "/payment/api/v1/order/checkout",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				Yup("#popUpFDFS").html('');
				// clevertapservice.sendCleverTapEvent('subscription page clicked', {
				// 	'page name': 'postpaid confirmation',
				// 	'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase(): "",
				// 	'action':detailsText ? detailsText : "confirm",
				// 	'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
				// 	'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : "" 
				// })
				presentPagedetails.orderID = result.response.orderId
				var statusToPlansPpId = Main.popupData.addBillID
				Main.bannersStatusToPlansPostPaid(statusToPlansPpId);
				Main.popupData = {};
			}
			else {
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
				if (!!plansData) {
					// Main.previousPage();
					utilities.postpaidPaymentFailedPopup(plansData.error_page.description, plansData.error_page.heading, plansData.error_page.button_title);
				}


			}

		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
};
Main.statusToPlansPostPaid = function (statusToPlansPpId) {
	Main.ShowLoading();
	var attemptCount = 0;
	var pendingShowed = false

	function checkStatus() {
		if (attemptCount >= 8) {
			Main.HideLoading();
			return;
		}

		attemptCount++;
		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				Main.HideLoading();
				var result = JSON.parse(data);
				if (result.status === true) {
					var status = result.response.status;
					if (status.toLowerCase() === "s") {
						view = 'plansUpgrade';
						presentPagedetails.packName = result.response.planName
						if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.plansSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'success',
							'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})
					} else if (status.toLowerCase() == "p") {
						if (pendingShowed == false) {
							view = 'plansUpgrade';
							Yup("#mainContent").html("")
							Yup("#mainContent").html(Util.pendingSuccess());
							Yup(".imageFocus").addClass("imageFocus")
							Yup("#plans_page-0").addClass("imageFocus")
							clevertapservice.sendCleverTapEvent('subscription page appeared', {
								'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
								'page name': 'incomplete payment',
								'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
								'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
							})
							pendingShowed = true
						}
						postpaidBillListener = setTimeout(checkStatus, 3000);
					}
					else if (status.toLowerCase() == "f") {
						view = 'plansUpgrade';
						if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.failedSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'failure',
							'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})
					}

				} else {
					Yup("#mainContent").html("")
					Yup("#mainContent").html(Util.failedSuccess());
				}
			},
			error: function (errObj) {
				Main.HideLoading();
				utilities.genricPopup("An error occurred during the request.", 'info');
				console.error("API Error: ", errObj);
			},
			timeout: 60000
		});
	}

	checkStatus();
};
Main.bannersStatusToPlansPostPaid = function (statusToPlansPpId) {
	Main.ShowLoading();
	var attemptCount = 0;
	var pendingShowed = false

	function checkStatus() {
		if (attemptCount >= 8) {
			Main.HideLoading();
			return;
		}

		attemptCount++;
		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				Main.HideLoading();
				var result = JSON.parse(data);
				if (result.status === true) {
					Main.hideMenu();
					var status = result.response.status;
					if (status.toLowerCase() === "s") {
						if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
						view = 'bannersPlansUpgrade';
						presentPagedetails.packName = result.response.planName
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.plansSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'success',
							// 'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							// 'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : "" 
						})
					} else if (status.toLowerCase() == "p") {
						if (pendingShowed == false) {
							view = 'bannersPlansUpgrade';
							Yup("#mainContent").html("")
							Yup("#mainContent").html(Util.pendingSuccess());
							Yup(".imageFocus").addClass("imageFocus")
							Yup("#plans_page-0").addClass("imageFocus")
							clevertapservice.sendCleverTapEvent('subscription page appeared', {
								'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
								'page name': 'incomplete payment',
								// 'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
								// 'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""  
							})
							pendingShowed = true
						}
						postpaidBillListener = setTimeout(checkStatus, 3000);
					}
					else if (status.toLowerCase() == "f") {
						if (!!postpaidBillListener) { clearInterval(postpaidBillListener) }
						view = 'bannersPlansUpgrade';
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.failedSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'failure',
							// 'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							// 'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : "" 
						})
					}

				} else {
					Yup("#mainContent").html("")
					Yup("#mainContent").html(Util.failedSuccess());
				}
			},
			error: function (errObj) {
				Main.HideLoading();
				utilities.genricPopup("An error occurred during the request.", 'info');
				console.error("API Error: ", errObj);
			},
			timeout: 60000
		});
	}

	checkStatus();
};

Main.moreSeasonPlayerEpisodePagination = function (seasonNum, targetpath, responseArray) {
	var sectionNum = seasonNum

	Main.ShowLoading();
	var headerJ = {
		"tenant-code": Main.tenantCode,
		"box-id": Main.getBOXID(),
		"session-id": Main.getSessionID(),
		"ucv": "24"
	};
	var url = Main.mainApi + "/service/api/v1/section/data?path=" + presentPagedetails.targetPath + "&code=" + targetpath + "&offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=30";
	if (presentPagedetails.targetPath == systemConfigs.configs.favouriteMenuTargetPath) {
		url = Main.mainApi + "/service/api/auth/user/favourites/list?offset=" + presentPagedetails.sections[sectionNum].sectionData.lastIndex + "&count=48"
	}
	Yup.ajax({
		url: url,
		type: 'GET',
		headers: headerJ,

		success: function (data) {
			var result = JSON.parse(data);
			if (result.status == true) {
				responseArray.sections = []
				responseArray.sections[0] = []
				responseArray.sections[0].sectionData = result.response[0]
			}

		},
		error: function (errObj) {
			Main.HideLoading();
			presentPagedetails.sections[sectionNum].sectionData.hasMoreData = false;
		},
		timeout: 60000
	});
}




Main.expandPreviewtrailerGetStream = function (
	trailerPath,
	vIndex,
	hIndex,
	playStreamType
) {
	keyHandlar.stopPreviewTrailers();
	var apiUrl =
		Main.mainApi +
		"/service/api/v1/page/stream?path=" +
		trailerPath +
		"&&stream_type=" +
		playStreamType;

	Yup.ajax({
		url: apiUrl,
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		success: function (res) {

			var result = JSON.parse(res);
			if (!result || result.status !== true) return;

			var streamUrl = result.response.streams[0].url;
			if (!streamUrl) return;

			var cardEl = document.getElementById(
				"sectionItem-" + vIndex + "-" + hIndex
			);
			if (!cardEl) return;

			var posterImg = cardEl.querySelector(
				".shows-image > img:not(.partner_logo_inner)"
			);
			if (!posterImg) return;

			var container = posterImg.parentElement;

			/* ---- cleanup old video ---- */
			var oldVideo = container.querySelector("video.preview-video");
			if (oldVideo) {
				oldVideo.pause();
				oldVideo.parentElement.removeChild(oldVideo);
			}

			/* ---- create video ---- */
			var video = document.createElement("video");
			video.className = "preview-video";
			video.autoplay = true;
			video.muted = false;
			video.playsInline = true;
			video.setAttribute("webkit-playsinline", "true");
			posterImg.setAttribute("data-preview-hidden", "true");
			/* ---- hide poster ---- */
			posterImg.style.opacity = "0";

			container.appendChild(video);

			/* ---- analytics payload ---- */
			var clickSection = {
				genre: presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.genre || "",
				contentType: "trailer",
				contentLang: presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.language || "",
				contentPartnerName: presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkName || "",
				contentId: presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.id || "",
				tvshowname: presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.tvShowName || "",
				model:
					(presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkPayType === "Paid" ||
						presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkPayType === "P")
						? "svod"
						: "avod",
				tab: ctEvent.tabName || "",
				contantTag: "free",
				contentName:
					presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.tvShowName || "",
				souDet: presentPagedetails.sections[vIndex].sectionInfo.name || "",
				module_tracking_id: ctEvent.moduleTrackerId || "",
				module_tracking_name: ctEvent.moduleTrackerId ? "myreco" : "",
				consumption_type: "autoplay"
			};

			/* ---- HLS playback ---- */
			var trailerEvent = false;
			var hls = null;

			if (window.Hls && Hls.isSupported()) {

				var hlsConfig = {};

				var isPlayflix = presentPagedetails &&
					presentPagedetails.sections &&
					presentPagedetails.sections[vIndex] &&
					presentPagedetails.sections[vIndex].sectionData &&
					presentPagedetails.sections[vIndex].sectionData.data &&
					presentPagedetails.sections[vIndex].sectionData.data[hIndex] &&
					presentPagedetails.sections[vIndex].sectionData.data[hIndex].target &&
					presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes &&
					presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkName &&
					(
						presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkName.toLowerCase() === "playflix" ||
						presentPagedetails.sections[vIndex].sectionData.data[hIndex].target.pageAttributes.networkName.toLowerCase() === "play flix"
					);

				if (isPlayflix) {
					hlsConfig.startLevel = 0;
					console.log("hlsConfig.startLevel = 0")
				}
				else {
					hlsConfig.startLevel = -1;
					hlsConfig.autoStartLoad = true
					console.log("hlsConfig.startLevel = -1")
				}

				hls = new Hls(hlsConfig);
				hls.loadSource(streamUrl);
				hls.attachMedia(video);

				hls.on(Hls.Events.MANIFEST_PARSED, function () {
					video.play();
				});

				hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
					if (data.level !== 0 && isPlayflix) {
						hls.currentLevel = 0;
					}
				});
				hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
					if (hls.currentLevel !== 0 && isPlayflix) {
						hls.currentLevel = 0;
					}
				});

			} else {
				video.src = streamUrl;
				video.play();
			}

			/* ---- video events ---- */
			video.addEventListener("playing", function () {
				if (!trailerEvent) {
					trailerEvent = true;
					analytics.setMetaData(result.response.pageAttributes, "trailers");
					analytics.plugin.thumbnailVideoClick();
					analytics.plugin.handlePlayStarted();
					clevertapservice.sendCleverTapEvent(
						"video started",
						utilities.sendEventItems(clickSection, vIndex + 1, hIndex + 1)
					);
				}
			});
			video.addEventListener("ended", function () {

				analytics.plugin.handlePlayCompleted();

				clevertapservice.sendCleverTapEvent(
					"video stopped",
					utilities.sendEventItems(clickSection, vIndex + 1, hIndex + 1)
				);

				if (hls) {
					hls.destroy();
					hls = null;
				}

				if (video.parentElement) {
					video.parentElement.removeChild(video);
				}

				// Ensure we only show the expanded image (liimage) and keep the small poster hidden
				// as we are still in the expanded state.
				var liImage = cardEl.querySelector(".expand-liimage");
				if (liImage) {
					liImage.style.opacity = "1";
					liImage.style.display = "block";
				}
				if (posterImg) {
					posterImg.style.opacity = "0";
				}

				if (keyHandlar.trailerEndTimer) {
					clearTimeout(keyHandlar.trailerEndTimer);
				}
				var nextIndexId = parseInt(hIndex, 10) + 1;
				keyHandlar.trailerEndTimer = setTimeout(function () {
					if (!cardEl.classList.contains("imageFocus")) return;

					var nextIndexId = parseInt(hIndex, 10) + 1;

					var nextSelector = "#sectionItem-" + vIndex + "-" + nextIndexId;
					var nextItem = Yup(nextSelector);

					if (nextItem && nextItem.length > 0) {

						Yup(".imageFocus").removeClass("imageFocus");
						nextItem.addClass("imageFocus");

						keyHandlar.addSectionKeyIndex(vIndex, nextIndexId);
						keyHandlar.addCurrentSection(vIndex);

						keyHandlar.ExpandScrollRight(vIndex, nextIndexId);

						keyHandlar.clearPreviousExpandPreview();

						keyHandlar.handleExpandPreviewFocus(
							vIndex,
							nextIndexId
						);

					}

				}, 2000);
			});
		},

		error: function (errObj) {
			utilities.responseErrorCheck(errObj);
		},

		timeout: 60000
	});
};
Main.directAddPostPaidBillClick = function (detailsText, popupData) {
	Main.upiDetailsText = detailsText;
	Main.upiPopupData = popupData;

	Main.popupData = Main.popupData || {};
	if (Main.popupData.addBillID !== undefined) {
		Main.upiAddBillID = Main.popupData.addBillID;
	} else if (Main.upiAddBillID !== undefined) {
		Main.popupData.addBillID = Main.upiAddBillID;
	}

	var addBillID = Main.popupData.addBillID;

	var packObj = null;
	if (presentPagedetails) {
		if (presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[addBillID]) {
			packObj = presentPagedetails.response.packages[addBillID];
		} else if (presentPagedetails.postpaid && presentPagedetails.postpaid.packages && presentPagedetails.postpaid.packages[addBillID]) {
			packObj = presentPagedetails.postpaid.packages[addBillID];
		}
	}

	var data;
	if (packObj && packObj.packageInfo && packObj.packageInfo.packages && packObj.packageInfo.packages[0]) {
		data = {
			"packages": JSON.stringify(packObj.packageInfo.packages[0].id),
			"gateway": packObj.packageInfo.packages[0].gateway
		};
	}

	var packSalePrice = (packObj && packObj.packageInfo && packObj.packageInfo.packages && packObj.packageInfo.packages[0] && packObj.packageInfo.packages[0].salePrice) ? packObj.packageInfo.packages[0].salePrice : "";
	var packMasterName = (packObj && packObj.packageInfo && packObj.packageInfo.master && packObj.packageInfo.master.name) ? packObj.packageInfo.master.name : "";
	var btnSource = (presentPagedetails && presentPagedetails.btnText) ? presentPagedetails.btnText.toLowerCase() : "";

	var previousView = view;

	if (popupData) {
		if (previousView !== 'upiPaymentPage') {
			Main.addBackData('upiPaymentPage', {});
		}
		var pagedata = (presentPagedetails && presentPagedetails.response) ? presentPagedetails.response : (presentPagedetails && presentPagedetails.postpaid ? presentPagedetails.postpaid : null);
		presentPagedetails = {};
		presentPagedetails.view = 'upiPaymentPage';
		presentPagedetails.targetPath = 'upiPaymentPage';
		presentPagedetails.response = pagedata;
		if (btnSource) {
			presentPagedetails.btnText = btnSource;
		}
		view = 'upiPaymentPage';
		Yup("#mainContent").html(Util.upiPaymentPopup(popupData));
	} else {
		Main.ShowLoading();
	}

	Yup.ajax({
		url: Main.mainApi + "/payment/api/v1/order/checkout",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			var result;
			try {
				result = typeof data === "string" ? JSON.parse(data) : data;
			} catch (e) {
				result = {};
			}

			if (result && result.status == true) {
				Yup("#popUpFDFS").html('');
				clevertapservice.sendCleverTapEvent('subscription page clicked', {
					'page name': 'postpaid confirmation',
					'source': btnSource,
					'action': detailsText ? detailsText : "confirm",
					'movies pack price': packSalePrice,
					'pack name': packMasterName
				});

				if (result.response && result.response.orderId) {
					presentPagedetails.orderID = result.response.orderId;
				}

				if (popupData) {
					if (result.response && result.response.upiPay && result.response.upiPay.payment && result.response.upiPay.payment.authentication && result.response.upiPay.payment.authentication.url) {
						popupData.qrUrl = result.response.upiPay.payment.authentication.url;
					}
					if (popupData.qrUrl && document.getElementById("upiQrCodeContainer")) {
						Main.generateQrCodeForPayments("upiQrCodeContainer", popupData.qrUrl);
						if (typeof Util !== "undefined" && typeof Util.startUpiCountdown === "function") {
							Util.startUpiCountdown(popupData, (popupData && popupData.expiryTimeSeconds) || Util.upiExpiryTimeSeconds || 300);
						}
					}
					if (previousView == 'bannersPlansUpgrade') {
						Main.bannersDirectStatusToPlansPostPaid(addBillID);
					} else {
						Main.directStatusToPlansPostPaid(addBillID);
					}
				} else {
					if (previousView == 'bannersPlansUpgrade') {
						Main.bannersStatusToPlansPostPaid(addBillID);
					} else {
						Main.directStatusToPlansPostPaid(addBillID);
					}
				}
				Main.popupData = {};
			}
			else {
				Main.HideLoading();
				if (typeof Util !== "undefined" && Util.upiTimerInterval) {
					clearInterval(Util.upiTimerInterval);
					Util.upiTimerInterval = null;
				}
				if (typeof postpaidBillListener !== "undefined" && !!postpaidBillListener) {
					clearTimeout(postpaidBillListener);
					postpaidBillListener = null;
				}
				var errorMsg = (result && result.response && result.response.message) ? result.response.message : (result && result.message ? result.message : (result && result.error && result.error.message ? result.error.message : 'Something Went Wrong'));
				Yup('.toastmsg_template').html(errorMsg);
				Yup('.toastmsg_template').css('display', 'block');
				setTimeout(function () {
					Yup('.toastmsg_template').css('display', 'none');
					if (view === 'upiPaymentPage') {
						Main.previousPage();
					}
				}, 2000);
			}
		},
		error: function (errObj) {
			Main.HideLoading();
			if (typeof Util !== "undefined" && Util.upiTimerInterval) {
				clearInterval(Util.upiTimerInterval);
				Util.upiTimerInterval = null;
			}
			if (typeof postpaidBillListener !== "undefined" && !!postpaidBillListener) {
				clearTimeout(postpaidBillListener);
				postpaidBillListener = null;
			}
			Yup('.toastmsg_template').html('Something Went Wrong');
			Yup('.toastmsg_template').css('display', 'block');
			setTimeout(function () {
				Yup('.toastmsg_template').css('display', 'none');
				if (view === 'upiPaymentPage') {
					Main.previousPage();
				}
			}, 2000);
		},
		timeout: 60000
	});
};
Main.directAddToPlansPrepaidUser = function (detailsText, comingFromSwitchProfile) {
	Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});
	Main.ShowLoading();
	Yup.ajax({
		url: Main.mainApi + "/package/api/v1/packages/info?skip_package_content=false",
		type: "GET",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {



				if (Yup('.banners').css('display') == 'block') {
					view = 'bannersPlansUpgrade';
					if (!!result.response) {
						presentPagedetails.response = result.response
					}
				}
				else {
					presentPagedetails = {};
					if (!!result.response) {
						presentPagedetails.response = result.response
					}
					if (comingFromSwitchProfile == true) {
						presentPagedetails.comingFromSwitchProfile = true;
					}
					view = 'plansUpgrade';
					presentPagedetails.view = 'plansUpgrade';
					presentPagedetails.targetPath = 'plansUpgrade';
				}
				if (comingFromSwitchProfile == true) {
					presentPagedetails.comingFromSwitchProfile = true;
				}
				Main.hideMenu();
				Yup("#mainContent").html('');
				Yup("#mainContent").append(Util.addToPlansPostpaid(result.response));
				Yup("#package_item-0").addClass("imageFocus")
				if (detailsText && (detailsText.toLowerCase() == 'watch now' || detailsText.toLowerCase() == 'watch live')) {
					detailsText = "content Watch Now"
				}
				else {
					detailsText = detailsText
				}
				if (!!ctEvent.topBanner && ctEvent.topBanner == 'top banner') {
					var sourceDetailsPop = ctEvent.topBanner
				}
				clevertapservice.sendCleverTapEvent('subscription page appeared', {
					'source': sourceDetailsPop ? sourceDetailsPop.toLowerCase() : (detailsText ? detailsText.toLowerCase() : ""),
					'page name': 'pro subscription',
					'pack name': presentPagedetails && presentPagedetails.firstPackName ? presentPagedetails.firstPackName : "",
					'movies pack price': presentPagedetails && presentPagedetails.firstPackPrice ? presentPagedetails.firstPackPrice : ""
				})
				presentPagedetails.btnText = detailsText
			}
			else {
				utilities.genricPopup(result.error.message, 'info');
			}
			Main.HideLoading();
		},
		error: function (errObj) {
			presentPagedetails.Activescreens = [];

			Main.HideLoading();
		},
		timeout: 60000
	});
};

Main.directBannerAddPostPaidBillClick = function (detailsText) {
	Main.addBackData((view != 'accountDetails' ? view : 'settings'), {});
	Main.ShowLoading();
	var data;
	var data = { "packages": Main.popupData.bannersAddBillID, "gateway": Main.popupData.bannersAddBillGateway };
	Yup.ajax({
		url: Main.mainApi + "/payment/api/v1/order/checkout",
		type: "POST",
		headers: {
			"tenant-code": Main.tenantCode,
			"box-id": Main.getBOXID(),
			"session-id": Main.getSessionID(),
			"ucv": "24"
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			Main.HideLoading();
			result = JSON.parse(data);
			if (result.status == true) {
				Yup("#popUpFDFS").html('');
				// clevertapservice.sendCleverTapEvent('subscription page clicked', {
				// 	'page name': 'postpaid confirmation',
				// 	'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase(): "",
				// 	'action':detailsText ? detailsText : "confirm",
				// 	'movies pack price':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.packages[0].salePrice : "",
				// 	'pack name':presentPagedetails.response.packages && presentPagedetails.response.packages[Main.popupData.addBillID] && presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name ? presentPagedetails.response.packages[Main.popupData.addBillID].packageInfo.master.name : "" 
				// })
				presentPagedetails.orderID = result.response.orderId
				var statusToPlansPpId = Main.popupData.addBillID
				Main.directStatusToPlansPostPaid(statusToPlansPpId);
				Main.popupData = {};
			}
			else {
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
				if (!!plansData) {
					// Main.previousPage();
					utilities.postpaidPaymentFailedPopup(plansData.dxl_juspay.error_page.description, plansData.dxl_juspay.error_page.heading, plansData.dxl_juspay.error_page.button_title);
				}


			}

		},
		error: function (errObj) {
			Main.HideLoading();
			utilities.genricPopup('Something Went Wrong', 'unknown');

		},
		timeout: 60000
	});
};
Main.directStatusToPlansPostPaid = function (statusToPlansPpId) {
	if (!!postpaidBillListener) {
		clearTimeout(postpaidBillListener);
	}

	var refreshInterval = 3000;
	if (Main.upiPopupData && Main.upiPopupData.orderstatusrefreshseconds) {
		refreshInterval = Main.upiPopupData.orderstatusrefreshseconds * 1000;
	} else if (Util.upiPaymentData && Util.upiPaymentData.orderstatusrefreshseconds) {
		refreshInterval = Util.upiPaymentData.orderstatusrefreshseconds * 1000;
	}

	function checkStatus() {
		if (Util.upiPageExpired) {
			if (!!postpaidBillListener) {
				clearTimeout(postpaidBillListener);
			}
			return;
		}

		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				var result = JSON.parse(data);
				var isFinalStatus = false;
				if (result.status === true) {
					var status = result.response.status;
					if (status.toLowerCase() === "s") {
						isFinalStatus = true;
						view = 'plansUpgrade'
						presentPagedetails.packName = result.response.planName
						if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.directPlansSuccess());
						Yup(".imageFocus").removeClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'success',
							'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})

					}
					else if (status.toLowerCase() == "f") {
						isFinalStatus = true;
						view = 'plansUpgrade'
						if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.directfailedSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'failure',
							'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})
					}
					else {
						// isFinalStatus = true;
						// if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						// if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						// Yup("#mainContent").html("")
						// Yup("#mainContent").html(Util.directfailedSuccess());
						// Yup(".imageFocus").addClass("imageFocus")
						// Yup("#plans_page-0").addClass("imageFocus")
						// clevertapservice.sendCleverTapEvent('subscription page appeared', {
						// 	'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
						// 	'page name': 'failure',
						// 	'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
						// 	'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						// })
					}
				}
				if (!isFinalStatus && !Util.upiPageExpired) {
					postpaidBillListener = setTimeout(checkStatus, refreshInterval);
				}
			},
			error: function (errObj) {
				console.error("API Error: ", errObj);
				if (!Util.upiPageExpired) {
					postpaidBillListener = setTimeout(checkStatus, refreshInterval);
				}
			},
			timeout: 10000
		});
	}

	checkStatus();
};
Main.bannersDirectStatusToPlansPostPaid = function (statusToPlansPpId) {
	if (!!postpaidBillListener) {
		clearTimeout(postpaidBillListener);
	}

	var refreshInterval = 3000;
	if (Main.upiPopupData && Main.upiPopupData.orderstatusrefreshseconds) {
		refreshInterval = Main.upiPopupData.orderstatusrefreshseconds * 1000;
	} else if (Util.upiPaymentData && Util.upiPaymentData.orderstatusrefreshseconds) {
		refreshInterval = Util.upiPaymentData.orderstatusrefreshseconds * 1000;
	}

	function checkStatus() {
		if (Util.upiPageExpired) {
			if (!!postpaidBillListener) {
				clearTimeout(postpaidBillListener);
			}
			return;
		}

		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				var result = JSON.parse(data);
				var isFinalStatus = false;
				if (result.status === true) {
					var status = result.response.status;
					if (status.toLowerCase() === "s") {
						isFinalStatus = true;
						view = 'bannersPlansUpgrade'
						presentPagedetails.packName = result.response.planName
						if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.directPlansSuccess());
						Yup(".imageFocus").removeClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'success',
							'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})

					}
					else if (status.toLowerCase() == "f") {
						isFinalStatus = true;
						view = 'bannersPlansUpgrade'
						if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						Yup("#mainContent").html("")
						Yup("#mainContent").html(Util.directfailedSuccess());
						Yup(".imageFocus").addClass("imageFocus")
						Yup("#plans_page-0").addClass("imageFocus")
						clevertapservice.sendCleverTapEvent('subscription page appeared', {
							'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
							'page name': 'failure',
							'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
							'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						})
					}
					else {
						// isFinalStatus = true;
						// if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
						// if (Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
						// Yup("#mainContent").html("")
						// Yup("#mainContent").html(Util.directfailedSuccess());
						// Yup(".imageFocus").addClass("imageFocus")
						// Yup("#plans_page-0").addClass("imageFocus")
						// clevertapservice.sendCleverTapEvent('subscription page appeared', {
						// 	'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
						// 	'page name': 'failure',
						// 	'movies pack price': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.packages[0].salePrice : "",
						// 	'pack name': presentPagedetails.response.packages && presentPagedetails.response.packages[statusToPlansPpId] && presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name ? presentPagedetails.response.packages[statusToPlansPpId].packageInfo.master.name : ""
						// })
					}
				}
				if (!isFinalStatus && !Util.upiPageExpired) {
					postpaidBillListener = setTimeout(checkStatus, refreshInterval);
				}
			},
			error: function (errObj) {
				console.error("API Error: ", errObj);
				if (!Util.upiPageExpired) {
					postpaidBillListener = setTimeout(checkStatus, refreshInterval);
				}
			},
			timeout: 10000
		});
	}

	checkStatus();
};

Main.refreshUpiPayment = function () {
	if (typeof Util !== "undefined" && Util.upiTimerInterval) {
		clearInterval(Util.upiTimerInterval);
		Util.upiTimerInterval = null;
	}
	if (!!postpaidBillListener) {
		clearTimeout(postpaidBillListener);
		postpaidBillListener = null;
	}

	if (typeof Util !== "undefined") {
		Util.upiPageExpired = false;
	}
	Yup("#upiQrCodeContainer").removeClass("imageFocus");

	var qrContainer = document.getElementById("upiQrCodeContainer");
	if (qrContainer) {
		qrContainer.innerHTML = '<div class="upi_qr_loader_box"><img src="images/loader.png" class="upi_qr_loader_img" /></div>';
	}
	var qrWrapper = document.getElementById("upiQrWrapper");
	if (qrWrapper) {
		Yup(qrWrapper).removeClass("upi_expired");
	}
	var expireTextEl = document.querySelector(".upi_expire_text");
	if (expireTextEl) {
		expireTextEl.innerHTML = "";
	}

	function doUpdateNewQr() {
		if (Main.upiPopupData) {
			delete Main.upiPopupData.qrUrl;
		}
		if (typeof Util !== "undefined" && Util.upiPaymentData) {
			delete Util.upiPaymentData.qrUrl;
		}
		Main.directAddPostPaidBillClick(Main.upiDetailsText, Main.upiPopupData);
	}

	if (presentPagedetails && presentPagedetails.orderID) {
		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				try {
					var result = typeof data === "string" ? JSON.parse(data) : data;
					if (result && result.status === true && result.response && result.response.status) {
						var status = result.response.status.toLowerCase();
						if (status === "s") {
							view = 'plansUpgrade';
							presentPagedetails.packName = result.response.planName;
							if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
							if (typeof Util !== "undefined" && Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
							Yup("#mainContent").html("");
							Yup("#mainContent").html(Util.directPlansSuccess());
							Yup(".imageFocus").removeClass("imageFocus");
							Yup("#plans_page-0").addClass("imageFocus");
							var addBillID = (Main.upiAddBillID !== undefined) ? Main.upiAddBillID : (Main.popupData && Main.popupData.addBillID);
							if (typeof clevertapservice !== "undefined" && clevertapservice.sendCleverTapEvent) {
								clevertapservice.sendCleverTapEvent('subscription page appeared', {
									'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
									'page name': 'success',
									'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[addBillID] && presentPagedetails.response.packages[addBillID].packageInfo && presentPagedetails.response.packages[addBillID].packageInfo.packages && presentPagedetails.response.packages[addBillID].packageInfo.packages[0] && presentPagedetails.response.packages[addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[addBillID].packageInfo.packages[0].salePrice : "",
									'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[addBillID] && presentPagedetails.response.packages[addBillID].packageInfo && presentPagedetails.response.packages[addBillID].packageInfo.master && presentPagedetails.response.packages[addBillID].packageInfo.master.name ? presentPagedetails.response.packages[addBillID].packageInfo.master.name : ""
								});
							}
							return;
						} else if (status === "f" || status === "p") {
							doUpdateNewQr();
							return;
						}
					}
				} catch (e) {
					console.error("Error parsing order status in refreshUpiPayment:", e);
				}
				doUpdateNewQr();
			},
			error: function (errObj) {
				console.error("Error checking status on refresh:", errObj);
				doUpdateNewQr();
			},
			timeout: 10000
		});
	} else {
		doUpdateNewQr();
	}
};

Main.handleUpiBackNavigation = function () {
	if (Main.isUpiBackChecking) {
		return;
	}

	if (typeof Util !== "undefined" && Util.upiTimerInterval) {
		clearInterval(Util.upiTimerInterval);
		Util.upiTimerInterval = null;
	}
	if (!!postpaidBillListener) {
		clearTimeout(postpaidBillListener);
		postpaidBillListener = null;
	}

	if (presentPagedetails && presentPagedetails.orderID) {
		Main.isUpiBackChecking = true;
		Main.ShowLoading();
		Yup.ajax({
			url: Main.mainApi + "/payment/api/v1/order/status?order_id=" + presentPagedetails.orderID,
			type: "GET",
			headers: {
				"tenant-code": Main.tenantCode,
				"box-id": Main.getBOXID(),
				"session-id": Main.getSessionID(),
				"ucv": "24"
			},
			contentType: "application/json; charset=utf-8",
			success: function (data) {
				Main.isUpiBackChecking = false;
				Main.HideLoading();
				try {
					var result = typeof data === "string" ? JSON.parse(data) : data;
					if (result && result.status === true && result.response && result.response.status) {
						var status = result.response.status.toLowerCase();
						if (status === "s") {
							view = 'plansUpgrade';
							presentPagedetails.packName = result.response.planName;
							if (!!postpaidBillListener) { clearTimeout(postpaidBillListener); postpaidBillListener = null; }
							if (typeof Util !== "undefined" && Util.upiTimerInterval) { clearInterval(Util.upiTimerInterval); Util.upiTimerInterval = null; }
							Yup("#mainContent").html("");
							Yup("#mainContent").html(Util.directPlansSuccess());
							Yup(".imageFocus").removeClass("imageFocus");
							Yup("#plans_page-0").addClass("imageFocus");
							var addBillID = (Main.upiAddBillID !== undefined) ? Main.upiAddBillID : (Main.popupData && Main.popupData.addBillID);
							if (typeof clevertapservice !== "undefined" && clevertapservice.sendCleverTapEvent) {
								clevertapservice.sendCleverTapEvent('subscription page appeared', {
									'source': presentPagedetails && presentPagedetails.btnText ? presentPagedetails.btnText.toLowerCase() : "",
									'page name': 'success',
									'movies pack price': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[addBillID] && presentPagedetails.response.packages[addBillID].packageInfo && presentPagedetails.response.packages[addBillID].packageInfo.packages && presentPagedetails.response.packages[addBillID].packageInfo.packages[0] && presentPagedetails.response.packages[addBillID].packageInfo.packages[0].salePrice ? presentPagedetails.response.packages[addBillID].packageInfo.packages[0].salePrice : "",
									'pack name': presentPagedetails && presentPagedetails.response && presentPagedetails.response.packages && presentPagedetails.response.packages[addBillID] && presentPagedetails.response.packages[addBillID].packageInfo && presentPagedetails.response.packages[addBillID].packageInfo.master && presentPagedetails.response.packages[addBillID].packageInfo.master.name ? presentPagedetails.response.packages[addBillID].packageInfo.master.name : ""
								});
							}
							return;
						} else if (status === "p") {
							var clickedCardForPostPaid = localStorage.getItem('clickedCardForPostPaid');
							if (backData && backData.length > 0) {
								// if (typeof currentSlideIndex !== "undefined") {
								// 	currentSlideIndex = 0;
								// }
								Main.previousPage();
								// Remove plansUpgrade, bannersPlansUpgrade, and upiPaymentPage entries from backData
								// for (var i = backData.length - 1; i >= 0; i--) {
								// 	if (backData[i] && (backData[i].view === "plansUpgrade" || backData[i].view === "bannersPlansUpgrade" || backData[i].view === "upiPaymentPage" || backData[i].targetPath === "plansUpgrade" || backData[i].targetPath === "bannersPlansUpgrade" || backData[i].targetPath === "upiPaymentPage")) {
								// 		backData.splice(i, 1);
								// 	}
								// }
								// Remove details pages from backData if no clickedCardForPostPaid
								// if (!clickedCardForPostPaid) {
								// 	for (var j = backData.length - 1; j >= 0; j--) {
								// 		if (backData[j] && (backData[j].view === "tvshowDetails" || backData[j].view === "movieDetails" || backData[j].view === "channelDetails")) {
								// 			var targetToCalls = clickedCardForPostPaid || (backData ? backData[j].targetPath : null);
								// 			backData.splice(j, 1);
								// 		}
								// 	}
								// }
								// Take targetpath of before page, do apiCall with it, and remove that before page from backData
								// if (backData.length > 0) {
								// 	var targetToCall = clickedCardForPostPaid || (targetToCalls ? targetToCalls : null);
								// 	if(clickedCardForPostPaid){
								// 		Main.previousPage();
								// 		localStorage.removeItem('clickedCardForPostPaid');
								// 	}
								// 	else{
								// 		if(targetToCall){
								// 		Main.apiCall(targetToCall);
								// 		localStorage.removeItem('clickedCardForPostPaid');
								// 		Main.getUserInfo(true);
								// 		}
								// 		else if(backData[0].view === "content"){
								// 		Main.apiCall(backData[0].targetPath);
								// 		localStorage.removeItem('clickedCardForPostPaid');
								// 		Main.getUserInfo(true);
								// 		}
								// 		else{
								// 		Main.previousPage();
								// 		localStorage.removeItem('clickedCardForPostPaid');
								// 		}
										
								// 	}
								// } else {
								// 	if (clickedCardForPostPaid) {
								// 		Main.previousPage();
								// 		localStorage.removeItem('clickedCardForPostPaid');										
								// 	} else {
								// 		if(clickedCardForPostPaid){
								// 		Main.apiCall(clickedCardForPostPaid);
								// 		}
								// 		localStorage.removeItem('clickedCardForPostPaid');
								// 		Main.getUserInfo(true);
								// 	}
								// }
							} else {
							// if (clickedCardForPostPaid) {
							// 			Main.previousPage();
							// 			localStorage.removeItem('clickedCardForPostPaid');										
							// 		} else {
							// 			Main.apiCall(clickedCardForPostPaid);
							// 			localStorage.removeItem('clickedCardForPostPaid');
							// 			Main.getUserInfo(true);
							// 		}
							Main.apiCall(firstMenu)
							}
							return;
						}
					}
				} catch (e) {
					console.error("Error checking order status on UPI back:", e);
				}
				Main.previousPage();
			},
			error: function (errObj) {
				Main.isUpiBackChecking = false;
				Main.HideLoading();
				console.error("Error checking order status on UPI back:", errObj);
				Main.previousPage();
			},
			timeout: 10000
		});
	} else {
		Main.previousPage();
	}
};

