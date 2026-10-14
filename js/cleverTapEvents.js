var clevertapservice;
var dataLayerJson = ""
clevertapservice ={
    cTapEvents:["click event","tab viewed","searched","carousel clicked","video stopped","video details viewed","video started","view all clicked","preferred language","hamburger menu",
    "video playback quality changed","subtitles on off","audio language changed","added removed to watchlist","otp generated","otp submission page viewed",
    "video player actions","registration completed","registration initiated","registration failed","registration page viewed","popup","signout completed","Lg_Samsung_Opens","Lg_Samsung_Installs",
    'setting','subscription page appeared','profiles page appeared','profiles page clicked','profile switched', 'exit popup','subscription page clicked'
]};
clevertapservice.isCTap = true;
var userDetails = JSON.parse(localStorage.getItem('userDetails'));

clevertapservice.setUserSession = function () {
    var userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var currentUserDetails =JSON.parse(utilities.getFromLocalStorage('currentUserDetails'));
	userDetails.phoneNumber = userDetails.phoneNumber.replace(/^91-/, '');
    if (!!clevertapservice.isCTap) {
        if (userDetails !== undefined && userDetails !== null){   
            var dd ={};
            dd["Identity"]= userDetails.phoneNumber ? userDetails.phoneNumber: "", 
            dd["Phone"]= userDetails.phoneNumber ?userDetails.phoneNumber: "",
            dd["mobile"]=  userDetails.phoneNumber ? userDetails.phoneNumber : "",
            dd["platform"]= "SamsungTV"
            dd["city"]=Main.city,
            dd["device type"]="tv",
            dd["os"]=appConfig.deviceOs,
            dd["user id"]  = userDetails.userId ? userDetails.userId : '';
            dd["profile name"] = currentUserDetails && currentUserDetails.name ? currentUserDetails.name :"";
            if(!!dataLayerJson && !!dataLayerJson["no of profiles"]){
            dataLayerJson["no of profiles"] =userDetails && userDetails.profileParentalDetails && userDetails.profileParentalDetails.length 
            ? userDetails.profileParentalDetails.length 
            : "";
        }
            // dd["user phone plan"] = userDetails && userDetails.userCategory && userDetails.userCategory == 2 ? "postpaid" : userDetails && userDetails.userCategory && userDetails.userCategory == 1 ? "prepaid" : 'na';
            if (userDetails && userDetails.userCategory !== undefined) {
                if (userDetails.userCategory == 2) {
                    dd["user phone plan"] = "postpaid";
                    dd["user_category"] = "vi";
                } else if (userDetails.userCategory == 1) {
                    dd["user phone plan"] = "prepaid";
                    dd["user_category"] = "vi";
                } 
                else if (userDetails.userCategory == 3) {
                    dd["user phone plan "] = "non-vi";
                    dd["user_category"] = "non-vi";
                }else {
                    dd["user phone plan"] = "na";
                    dd["user_category"] = "na";
                }
            } else {
                dd["user phone plan"] = "na";
                dd["user_category"] = "na";
            };
            if (userDetails && userDetails.userCategory !== undefined) {
                var att = userDetails.attributes;
            if (userDetails.userCategory == 3) {
                dd["circle"] = "non-vi";
            }
            else{
                dd["circle"] = att.circleCode;
            }
        }
            dd["preferred language"] = userDetails.languages;
            if (!!userDetails) {
                var att = userDetails.attributes;
                var packages = userDetails.packages;
                var activePackName = att && att.activePackName;
                var planDetails;
                dd["movies subscription status"] = userDetails.packages.length==0 ? "free":"";
                // Loop through packages to find the matching plan
                    for (var i = 0; i < packages.length; i++) {
                    if (packages[i].name === activePackName) {
                        planDetails = packages[i];
                        dd["active_packs"] = packages.length ? packages.length : "";
                        dd["movies pack id"]=planDetails.id;
                        dd["movies pack name"] = planDetails.name;
                        dd["movies subscription status"] = planDetails.name ? "paid":"free";
                        dd["movies pack start date epoch"] = planDetails.effectiveFrom;
                        dd["movies pack end date epoch"] = planDetails.expiryDate;
                        // Format effectiveFrom date
                        var effectiveFrom = new Date(planDetails.effectiveFrom);
                        var yearStart = effectiveFrom.getFullYear();
                        var monthStart = effectiveFrom.getMonth() + 1;
                        var dayStart = effectiveFrom.getDate();
                        var formattedDateStart = yearStart + '-' + (monthStart < 10 ? '0' : '') + monthStart + '-' + (dayStart < 10 ? '0' : '') + dayStart;
                        dd["movies pack start date"] = formattedDateStart;
                        // Format expiryDate
                        var expiryDate = new Date(planDetails.expiryDate);
                        var yearEnd = expiryDate.getFullYear();
                        var monthEnd = expiryDate.getMonth() + 1;
                        var dayEnd = expiryDate.getDate();
                        var formattedDateEnd = yearEnd + '-' + (monthEnd < 10 ? '0' : '') + monthEnd + '-' + (dayEnd < 10 ? '0' : '') + dayEnd;
                        dd["movies pack end date"] = formattedDateEnd;
                        // Calculate validity remaining days
                        var today = new Date();
                        var validityRemainingMs = planDetails.expiryDate - today.getTime();
                        var validityRemainingDays = Math.ceil(validityRemainingMs / (1000 * 60 * 60 * 24));
                        dd["movies pack validity remaining"] = validityRemainingDays;
        
                        break;
                    }
                }
                }
                else {
                console.log('userDetails is not defined.');
                }
            if (userDetails && userDetails.isPhoneNumberVerified) {
                dd["registered user"] = userDetails.isPhoneNumberVerified ? "yes" : "no";
            } else {
                dd["registered user"] = "Unkown";
            }
            // if (userDetails && userDetails.attributes && userDetails.attributes.circleCode) {
            //     dd["circle"] = userDetails.attributes.circleCode;
            // } else {
            //     dd["circle"] = "";
            // }
        try {
            clevertap.onUserLogin.push({
                	"Site": dd
                  })
            console.log("User session data pushed to CleverTap",dd);
        } catch (e) {
            console.error("Error pushing user session data to CleverTap:", e);
        }
        }
    }else{
        console.log("User is not loggedIn")
    }
};

clevertapservice.sendCleverTapEvent = function (eventName, eventData) {
    var userDetails = JSON.parse(localStorage.getItem('userDetails'));
    var currentUserDetails =JSON.parse(utilities.getFromLocalStorage('currentUserDetails'));
    if (!!clevertapservice.isCTap && clevertapservice.cTapEvents.includes(eventName) ) {
        var dataLayerJson = JSON.parse(JSON.stringify(eventData));
        // dataLayerJson["user phone plan"] = userDetails && userDetails.userCategory && userDetails.userCategory == 2 ? "postpaid" : userDetails && userDetails.userCategory && userDetails.userCategory == 1 ? "prepaid" : 'na';
        if (userDetails && userDetails.userCategory !== undefined) {
            if (userDetails.userCategory == 2 && !!dataLayerJson) {
                dataLayerJson["user phone plan"] = "postpaid";
                dataLayerJson["user_category"] = "vi";
            } else if (userDetails.userCategory == 1&& !!dataLayerJson) {
                dataLayerJson["user phone plan"] = "prepaid";
                dataLayerJson["user_category"] = "vi";
            } 
           else if (userDetails.userCategory == 3 && !!dataLayerJson) {
                dataLayerJson["user phone plan "] = "non-vi";
                dataLayerJson["user_category"] = "non-vi";
            }else {
                if(!!dataLayerJson){
                dataLayerJson["user phone plan"] = "na";
                dataLayerJson["user_category"] = "na";
                dataLayerJson["user phone plan "] = "na";
                }
            }
        } else {
            if(!!dataLayerJson){
            dataLayerJson["user phone plan"] = "na";
            }
        }
        if(!!dataLayerJson){
        dataLayerJson["carrier"] = "" // backend dependencey
        }
        // dataLayerJson["preferred language"] = userDetails.languages
        if (userDetails && userDetails.userCategory !== undefined) {
        if (userDetails && userDetails.languages && !!dataLayerJson) {
            dataLayerJson["preferred language"] = userDetails.languages;
        } else {
            if(!!dataLayerJson){
            dataLayerJson["preferred language"] = "";
            }
        } 
    }   
        if(!!dataLayerJson){    
        dataLayerJson["platform"] = "SamsungTV"
        dataLayerJson["os"] = appConfig.deviceOs
        dataLayerJson["service name"] = appConfig.appName
        dataLayerJson["city"]= Main.city
        dataLayerJson["state"] = Main.region
        dataLayerJson["device type"] = "tv"
        dataLayerJson["app version"]= appConfig.staticSubVersion ? appConfig.staticSubVersion :"";
        dataLayerJson["profile name"] =currentUserDetails && currentUserDetails.name ? currentUserDetails.name :"";
        dataLayerJson["no of profiles"] =userDetails && userDetails.profileParentalDetails && userDetails.profileParentalDetails.length 
        ? userDetails.profileParentalDetails.length 
        : "";
        }

        if (!!userDetails) {
        var att = userDetails.attributes;
        var packages = userDetails.packages;
        var activePackName = att && att.activePackName;
        var planDetails;
        if(!!dataLayerJson){
        dataLayerJson["movies subscription status"] = userDetails.packages.length==0 ? "free":"";
        }
        if (userDetails.userCategory == 3 && !!dataLayerJson) {
            dataLayerJson["circle"] = "non-vi";
        }
        else{
            dataLayerJson["circle"] = att.circleCode;
        }
        // Loop through packages to find the matching plan
            for (var i = 0; i < packages.length; i++) {
            if (packages[i].name === activePackName) {
                planDetails = packages[i];
                if(!!dataLayerJson){
                dataLayerJson["active_packs"] = packages.length ? packages.length : "";
                dataLayerJson["movies pack id"]=planDetails.id;
                dataLayerJson["movies pack name"] = planDetails.name;
                dataLayerJson["movies subscription status"] = planDetails.name ? "paid":"free";
                dataLayerJson["movies pack start date epoch"] = planDetails.effectiveFrom;
                dataLayerJson["movies pack end date epoch"] = planDetails.expiryDate;
                }
                // Format effectiveFrom date
                var effectiveFrom = new Date(planDetails.effectiveFrom);
                var yearStart = effectiveFrom.getFullYear();
                var monthStart = effectiveFrom.getMonth() + 1;
                var dayStart = effectiveFrom.getDate();
                var formattedDateStart = yearStart + '-' + (monthStart < 10 ? '0' : '') + monthStart + '-' + (dayStart < 10 ? '0' : '') + dayStart;
                if(!!dataLayerJson){
                dataLayerJson["movies pack start date"] = formattedDateStart;
                }
                // Format expiryDate
                var expiryDate = new Date(planDetails.expiryDate);
                var yearEnd = expiryDate.getFullYear();
                var monthEnd = expiryDate.getMonth() + 1;
                var dayEnd = expiryDate.getDate();
                var formattedDateEnd = yearEnd + '-' + (monthEnd < 10 ? '0' : '') + monthEnd + '-' + (dayEnd < 10 ? '0' : '') + dayEnd;
                if(!!dataLayerJson){
                dataLayerJson["movies pack end date"] = formattedDateEnd;
                }
                // Calculate validity remaining days
                var today = new Date();
                var validityRemainingMs = planDetails.expiryDate - today.getTime();
                var validityRemainingDays = Math.ceil(validityRemainingMs / (1000 * 60 * 60 * 24));
                if(!!dataLayerJson){
                dataLayerJson["movies pack validity remaining"] = validityRemainingDays;
                }

                break;
            }
        }
        }else {
        console.log('userDetails is not defined.');
        }

        if (userDetails && userDetails.isPhoneNumberVerified && !!dataLayerJson) {
            dataLayerJson["registered user"] = (userDetails && userDetails.isPhoneNumberVerified && userDetails.isPhoneNumberVerified == true)? "yes" : "no";
        } else {
            if(!!dataLayerJson){
            dataLayerJson["registered user"] = "NA";
            }
        } 
        // if (userDetails && userDetails.attributes && userDetails.attributes.circleCode) {
        //     dataLayerJson["circle"] = userDetails.attributes.circleCode;
        // } else {
        //     dataLayerJson["circle"] = "";
        // } 
        if (!!userDetails && !!userDetails.userId && !!dataLayerJson) { //user logged in 
            dataLayerJson["ott_sms_id"] = (!!userDetails.externalUserId) ? ("" + userDetails.externalUserId) : '-1';
            dataLayerJson["user_type"] = userDetails.userCategory;
            dataLayerJson["user id"]  = userDetails.userId
        } else {
            if(!!dataLayerJson){
            dataLayerJson["user_type"] = "na";
            dataLayerJson["ott_sms_id"] = '-1';
            }
        }
        if(!!dataLayerJson){
        console.log(eventName, dataLayerJson)
        }
        try {
            if(!!dataLayerJson){
            clevertap.event.push(eventName, dataLayerJson);
            }
        }
        catch (e) {
            console.log(e);
        }
    }
}

clevertapservice.profilePageEvent = function(){
    var currentUserDetails =JSON.parse(utilities.getFromLocalStorage('currentUserDetails'));
    clevertapservice.sendCleverTapEvent('profiles page appeared', {
        'page name': profilesPageAppeared && profilesPageAppeared.profilesPagePageName ? profilesPageAppeared.profilesPagePageName: '',
        'age category':currentUserDetails && currentUserDetails.profileRating ? currentUserDetails.profileRating : "na",
        'source':profilesPageAppeared && profilesPageAppeared.profilesPageAppearedSource ? profilesPageAppeared.profilesPageAppearedSource : ""
    })
}
clevertapservice.profileClickedEvent = function(){
    var currentUserDetails =JSON.parse(utilities.getFromLocalStorage('currentUserDetails'));
    clevertapservice.sendCleverTapEvent('profiles page clicked', {
        'page name': profilesPageAppeared && profilesPageAppeared.profilesPagePageName ? profilesPageAppeared.profilesPagePageName: '',
        'age category':currentUserDetails && currentUserDetails.profileRating ? currentUserDetails.profileRating : "",
        'source':profilesPageAppeared && profilesPageAppeared.profilesPageAppearedSource ? profilesPageAppeared.profilesPageAppearedSource : "",
        'action': profilesPageAppeared && profilesPageAppeared.action ? profilesPageAppeared.action: ""
    })
}




