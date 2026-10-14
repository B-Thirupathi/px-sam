



//for test
// var getJsonPath = " https://d1keqtsg5img48.cloudfront.net/test/vfplay.json"; //beta
var getJsonPath = "https://d1keqtsg5img48.cloudfront.net/prod/vfplay.json"; //prod
//local
var jsFilePaths = 'https://vimtv-samsung.vodafoneplay.in/VodafoneFiles.txt';



var Yup = jQuery.noConflict();
var appConfig = {
	staticColudPath: 'http://ottapps.revlet.net/apps/samsung/firstshows/',
	viStaticColudPath :'https://d1keqtsg5img48.cloudfront.net/lg_samsung/images/',
	passwordMinLength: 4,
	passwordMaxLength: 16,
	APPID: 17,  //17-Samsung 16-LG
	deviceType: 'TV',   //tizen //webos 	
	deviceName: 'SAMSUNG',
	deviceOs: 'tizen',  //SAMSUNG //LG
	GAId: "",
	appName: "Vi Movies and TV",
	playerName:"Shaka Player",
	playerVersion: '4.14.0',
	HlsplayerVersion:"1.5.12",
	HlsplayerName:"Hls Player",
	showSubscribeText : true,
	enableMyLibrary : false,	
	GAEnable: false,
	forgetpassword : false,
	tvshowDetalsFullImageView:true,
	channelshowDetalsFullImageView:true,
	ssha : 'c000a1967a974f1d9a1c3018a40d8a6e',
	ivKey : '617afb54b1dfbedb',
	appVersion:"1.2.0",
    staticSubVersion : "1.2.0_47",
	staticVersion : "47"
};
var checknetworkType = true;
var connectionType='';
var systemConfigs = {};
var systemFeatures = {};
var tempObjectData = {};
var airMouse = false;
var isLoading = false;
var tvKeyCode = {};
var showIntrovideo=false;
var isStartOverBtn=false;
var isSidemenuOpened = false;
var menubarhoverd = false;
var scount = 0,mainCount = 0;
var clevertap;
var Main = {
	locationApi: "",
	mainApi: "",
	searchApi: "",
	tenantCode: "",
	productCode: "",
	BOXID: '',
	SessionID: '',
	countryCode: '',
	country: '',
	countryFlag: '',
	mobileCode: '',	
	userProfile: {
		cardStatus: 0,
		email: '',
		mobile: "",
		mobileStatus: 0,
		mobileUpdatable: '',
		name: "",
		userId: '',
		nextPage: '',
		zipCode: '',
		emailStatus: '',
		userStatus : false,
		languages : '',
		filters : ''
	},
	preferences: {},
	devices: [],
	packages:[]
}

function appStart(){
	Main.getBOXID();
	Yup.ajax({
		url: getJsonPath,
		type: "GET",
		data: {},
		success: function (data) {
			result = data;
			if (result) {
				if(typeof(result) == "string"){
					result = JSON.parse(result);
				}
				Main.locationApi = result.default.location;
				Main.mainApi = result.default.api;
				Main.searchApi = result.default.search;
				Main.tenantCode = result.default.tenantCode;
				Main.productCode = result.default.product;
				Main.getLocation();
			} else {
				if(checknetworkType == false){
					Main.popupData ={
						popuptype : 'netWorkError',
						message : "Please check your internet connection",       
						buttonCount : 1,
						yesText : 'Okay',
						yesTarget : 'retrynet',
						onBack : 'close'
					}
					Yup("#popUpFDFS").html(Util.showPopup());	
					Yup("#popup-btn-1").addClass('popupFocus');
				}
				else{
				Main.popupData ={
					popuptype : 'unknown',
					message : "Something Went Wrong, Please Try again Later.",       
					buttonCount : 1,
					yesText : 'Okay',
					yesTarget : 'exit',
					onBack : 'exit'
				}
				Yup("#popUpFDFS").html(Util.showPopup());	
				Yup("#popup-btn-1").addClass('popupFocus');
			}
		}
		},
		error: function (errObj) {
			Main.HideLoading();		
			Main.popupData ={
				popuptype : 'netWorkError',
				message : "Please check you internet connection",       
				buttonCount : 1,
				yesText : 'Okay',
				yesTarget : 'exit',
				onBack : 'exit'
			}
			Yup("#popUpFDFS").html(Util.showPopup());	
			Yup("#popup-btn-1").addClass('popupFocus');
		},
		timeout: 30000
	});
}

var app = {
	initialize: function () {
		Main.ShowLoading();
		// document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		this.onDeviceReady();
	},
	onDeviceReady: function () {
		Main.HideLoading();		
        this.receivedEvent('deviceready'); 
		if(showIntrovideo){
			Main.showSplash("video");
			try{
				document.getElementById('introvideo').addEventListener('ended',appStart,false)
			}
			catch(error){
				appStart();
			}
		}
	    else{
			Main.showSplash();
			// try { if (typeof prepareAndSend === 'function') prepareAndSend({ type:'splashShown', message:'splashShown' }); else if (typeof vfplay_reportNow === 'function') vfplay_reportNow('splashShown'); } catch(e) {}
			setTimeout(function(){
				appStart();
			},500)
		}
	},
	receivedEvent: function (id) {
		getSupportedKeys(function (keys) {
			for (var i = 0, len = keys.length; i < len; i++) {
				tvKeyCode[keys[i].name] = keys[i].code;
				if (['MediaPlay', 'MediaPause', 'MediaFastForward', 'MediaRewind', 'MediaStop', '0','1','2','3','4','5','6','7','8','9'].indexOf(keys[i].name) >= 0) {
					registerKey(function(){}, function(){}, [keys[i].name]);
				}
			}
		});
		window.addEventListener('keydown', function (e) {
			airMouse =false;							
			if(isLoading == false ){
				if(menubarhoverd == true){
					Main.sidebarClose();
					menubarhoverd=false
				}
				var id = Yup('.mouseFocus').attr("id");  
				if(id) {	Yup('#'+id).removeClass('mouseFocus'); }
				Main.processTrigger(e);
			}				
		});		
	}
};



//app starts here

app.appPreLoad = function () {	
	Yup.ajax({
		type: "GET",
		url: jsFilePaths + "?v=" + new Date().getTime()
	})
    .done(function (msg) {
        try {
			if(typeof msg == "string"){
				vers = JSON.parse(msg)
			}
			else{
				vers = msg
			}
          
            if (vers.mainFiles) {
                for (var i = 0; i < vers.mainFiles.length; i++) {
                    if (vers.mainFiles[i].FileName.indexOf('css') != -1) {
                        var link = document.createElement('link');
                        link.setAttribute('rel', 'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', "" + vers.mainFiles[i].FileName + "?v=" + vers.mainFiles[i].VersionNo + "");
                        document.getElementsByTagName('head')[0].appendChild(link);

                        if (link.addEventListener) {
                            link.addEventListener('load', function () {
                                mainCount++; if (mainCount == vers.mainFiles.length) app.checkMainFilesStatus();
                            }, false);
                        } else if (link.onreadystatechange) {
                            link.onreadystatechange = function () {
                                var state = link.readyState;
                                if (state === 'loaded' || state === 'complete') {
                                    link.onreadystatechange = null;
                                    mainCount++; if (mainCount == vers.mainFiles.length) app.checkMainFilesStatus();
                                }
                            };
                        } else {
                            link.onload = function () {
                                mainCount++; if (mainCount == vers.mainFiles.length) app.checkMainFilesStatus();
                            };
                        }
                    }
                    else {
                        var fileref = document.createElement('script');
                        if (typeof fileref != "undefined") {
                            fileref.src = "" + vers.mainFiles[i].FileName + "?v=" + vers.mainFiles[i].VersionNo + "";
                            document.getElementsByTagName("head")[0].appendChild(fileref);
                            if (fileref.onreadystatechange) {
                                fileref.onreadystatechange = function () {
                                    if (this.readyState == 'complete') mainCount++; if (mainCount == vers.mainFiles.length) app.checkMainFilesStatus();
                                }
                            }
                            else {
                                fileref.onload = function () {
                                    mainCount++; if (mainCount == vers.mainFiles.length) app.checkMainFilesStatus();
                                }
                            }
                        }
                    }
                }
			}							
        }
        catch (e) {
			console.log(e);
			app.errorLoad();			
		}

    }).error(function (err) {
        console.log(err);
		app.errorLoad();		
    })
    .fail(function (err) {
        console.log(err);
		app.errorLoad();			
    });
}

app.checkMainFilesStatus = function () {
	function checkMainFiles() {
		try {
			app.loadMeta();
		}
		catch (e) {
			clearInterval(loadTimeInterval);
			loadTimeInterval = '';
			loadTimeInterval = setTimeout(checkMainFiles, 100);
		}
	}
	var loadTimeInterval = setTimeout(checkMainFiles, 100);
}

app.loadMeta = function () {
	try {
		if (vers.files) {
			for (var i = 0; i < vers.files.length; i++) {
				if (vers.files[i].FileName.indexOf('css') != -1) {
					var link = document.createElement('link');
					link.setAttribute('rel', 'stylesheet');
					link.setAttribute('type', 'text/css');
					link.setAttribute('href', "" + vers.files[i].FileName + "?v=" + vers.files[i].VersionNo + "");
					document.getElementsByTagName('head')[0].appendChild(link);

					if (link.addEventListener) {
						link.addEventListener('load', function () {
							scount++; if (scount == vers.files.length) app.initialize();
						}, false);
					} else if (link.onreadystatechange) {
						link.onreadystatechange = function () {
							var state = link.readyState;
							if (state === 'loaded' || state === 'complete') {
								link.onreadystatechange = null;
								scount++; if (scount == vers.files.length) app.initialize();
							}
						};
					} else {
						link.onload = function () {
							scount++; if (scount == vers.files.length) app.initialize();
						};
					}
				}
				else {
					var fileref = document.createElement('script');
					if (typeof fileref != "undefined") {
						fileref.src = "" + vers.files[i].FileName + "?v=" + vers.files[i].VersionNo + "";
						document.getElementsByTagName("head")[0].appendChild(fileref);
						if (fileref.onreadystatechange) {
							fileref.onreadystatechange = function () {
								if (this.readyState == 'complete') scount++; if (scount == vers.files.length) app.initialize();
							}
						}
						else {
							fileref.onload = function () {
								scount++; if (scount == vers.files.length) app.initialize();
							}
						}
					}
				}
			}
		}
	}
	catch (e) {
		if (!!document.getElementById("customMessage")) {
			document.getElementById("customMessage").style.display = "block";
			document.getElementById("customMessage").innerHTML = "<p class='loadNot'><img style='width: 70px;vertical-align: -25px;padding-right: 14px;' src='https://d20w296omhlpzq.cloudfront.net/devices/common/shape-9@3x.png'/>Unable to load necessary modules, Please check your internet connection and relaunch the application.</p>";
		}
	}
}

app.errorLoad =function(){
	if (!!document.getElementById("customMessage")) {
		document.getElementById("customMessage").style.display = "block";
		document.getElementById("customMessage").innerHTML = "<p class='loadNot'><img style='width: 70px;vertical-align: -25px;padding-right: 14px;' src='https://d20w296omhlpzq.cloudfront.net/devices/common/shape-9@3x.png'/>Unable to load necessary modules, Please check your internet connection and relaunch the application.</p>";
	}
	window.addEventListener('keydown', function (e) {						
		app.reloadApp(e);
	});
}

app.reloadApp  = function (event){
	var keycode = (window.event) ? event.keyCode : event.which;
	if( keycode == 13){
		document.getElementById("customMessage").style.display = "none";
		location.reload();
	}else if(keycode == 8 || keycode == 27){
		window.close();
	}			
}
window.addEventListener('load', function () {
    try {
        // loadSUNNXTSDK(function () {
        initializeCleverTap();
        // });
    } catch (err) {
        console.log('Error during SDK initialization:', err);
    }
});

// SUNNXT SDK Loader
// function loadSUNNXTSDK(callback) {
//     try {
//         var script = document.createElement("script");
//         script.type = "text/javascript";
//         script.src = "https://samsunglg.sunnxt.com/samsung-websdk/prod/SUNNXT_SAM_SDK.min.js";
//         script.onload = function () {
//             console.log("SUNNXT LG SDK loaded successfully.");
//             if (callback) callback(); 
//         };
//         script.onerror = function (error) {
//             console.error("Failed to load SUNNXT LG SDK:", error);
//         };
//         document.head.appendChild(script);
//     } catch (err) {
//         console.error("SUNNXT SDK loading error:", err);
//     }
// }
// CleverTap Initialization
function initializeCleverTap() {
	try {
		clevertap = { event: [], profile: [], account: [], onUserLogin: [], notifications: [], privacy: [],region:'in1' };
		// replace with the CLEVERTAP_ACCOUNT_ID with the actual ACCOUNT ID value from your Dashboard -> Settings page
		domainName = 'production';

		if (domainName === 'production') {
			clevertap.account.push({ "id": "67K-58R-K96Z" }); // for production
			// clevertap.account.push({"token": "2b5-3a6"}); 
		} else if (domainName === 'Test') {
			clevertap.account.push({ "id": "TEST-77K-58R-K96Z" }); // for pre-production
			clevertap.account.push({"token": "TEST-2b5-3aa"});  
		}

		clevertap.privacy.push({ optOut: false }); //set the flag to true, if the user of the device opts out of sharing their data
		clevertap.privacy.push({ useIP: false }); //set the flag to true, if the user agrees to share their IP data
		(function () {
			var wzrk = document.createElement('script');
			wzrk.type = 'text/javascript';
			wzrk.async = true;
			wzrk.src = ('https:' == document.location.protocol ? 'https://d2r1yp2w7bby2u.cloudfront.net' : 'http://static.clevertap.com') + '/js/clevertap_legacy.min.js';
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(wzrk, s);
		})();
	} catch (err) {
		console.log('clevertap: ', err)
	}

}

function getSupportedKeys(success, fail, args) {
	try {
	  if (window.tizen) {
		supportedKeys = tizen.tvinputdevice.getSupportedKeys();
		supportedKeys.push({ name: "ArrowUp", code: 38 });
		supportedKeys.push({ name: "ArrowDown", code: 40 });
		supportedKeys.push({ name: "ArrowLeft", code: 37 });
		supportedKeys.push({ name: "ArrowRight", code: 39 });
		supportedKeys.push({ name: "Enter", code: 13 });
		supportedKeys.push({ name: "Return", code: 10009 });
		supportedKeys.push({name:"Escape",code:10009});
	  } else {
		supportedKeys = [
		  { name: "ArrowUp", code: 38 },
		  { name: "ArrowDown", code: 40 },
		  { name: "ArrowLeft", code: 37 },
		  { name: "ArrowRight", code: 39 },
		  { name: "Enter", code: 13 },
		  { name: "Return", code: 461 },
		  { name: "ColorF0Red", code: 403 },
		  { name: "ColorF1Green", code: 404 },
		  { name: "ColorF2Yellow", code: 405 },
		  { name: "ColorF3Blue", code: 406 },
		  { name: "MediaStop", code: 413 },
		  { name: "MediaFastForward", code: 417 },
		  { name: "MediaPlay", code: 415 },
		  { name: "MediaPause", code: 19 },
		  { name: "MediaRewind", code: 412 },
		  { name: "0", code: 48 },
		  { name: "1", code: 49 },
		  { name: "2", code: 50 },
		  { name: "3", code: 51 },
		  { name: "4", code: 52 },
		  { name: "5", code: 53 },
		  { name: "6", code: 54 },
		  { name: "7", code: 55 },
		  { name: "8", code: 56 },
		  { name: "9", code: 57 },
		  {name:"Escape",code:10009},
		];
	  }
	  setTimeout(function () {
		success(supportedKeys);
	  }, 0);
	} catch (e) {
	  var error = new Error(e.message);
	  error.name = e.name;
	  setTimeout(function () {
		fail(e);
	  }, 0);
	}
  }

  function registerKey(success, fail, args) {
	try {
	  //samsung
	  if (tizen) {
		tizen.tvinputdevice.registerKey(args[0]);
		setTimeout(function () {
		  success();
		}, 0);
	  }
	  //Lg
	  else {
		for (var i = 0; i < supportedKeys.length; i++) {
		  if (supportedKeys[i].name == args[0]) {
			break;
		  }
		}
		if (i == supportedKeys.length) {
		  var error = new RangeError("keyName is not in the supported keys set.");
		  error.name = "RangeError";
		  setTimeout(function () {
			fail(error);
		  }, 0);
		} else {
		  setTimeout(function () {
			success();
		  }, 0);
		}
	  }
	} catch (e) {
	  var error;
	  if (e.name == "InvalidValuesError") {
		error = new RangeError(e.message);
	  } else {
		error = new Error(e.message);
	  }
	  error.name = e.name;
	  setTimeout(function () {
		fail(error);
	  }, 0);
	}
  }
app.appPreLoad();
