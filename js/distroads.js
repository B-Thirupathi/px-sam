var nonceLoader;
var nanceToken = '';
var distroPassData = {
    palnToken:'',
    deviceMake:'',
    userAgent:'',
    playbackId:'',
    connectionNetworkType:'',
    appVersion:'',
    width:'',
    height:''
};

function generateNonce(callback) {
    var nonceLoader = new window.goog.pal.NonceLoader();
    var request = new goog.pal.NonceRequest();
    request.adWillAutoPlay = true;
    request.adWillPlayMuted = true;
    request.continuousPlayback = false;
    request.descriptionUrl = 'https://example.com';
    request.iconsSupported = true;
    request.playerType = 'Sample Player Type';
    request.playerVersion = '1.0';
    request.ppid = 'Sample PPID';
    request.sessionId = 'Sample SID';
    // Player support for VPAID 2.0, OMID 1.0, and SIMID 1.1
    request.supportedApiFrameworks = '2,7,9';
    request.url = 'https://developers.google.com/ad-manager/pal/html5';
    request.videoHeight = 480;
    request.videoWidth = 640;

    var managerPromise = nonceLoader.loadNonceManager(request);
    managerPromise.then(function(manager) {
        var nonceManager = manager;
        distroPassData.palnToken = nonceManager.getNonce();
        // Execute the callback after everything is done
        if (typeof callback === 'function') {
            callback();
        }
    }).catch(function(error) {
        console.log('Error generating nonce: ' + error);
        if (typeof callback === 'function') {
            callback(error);
        }
    });
}
function callingMacros(){
    distroPassData.palnToken = '',
    distroPassData.deviceMake = 'Lg',
    distroPassData.userAgent = window.navigator.userAgent,
    distroPassData.connectionNetworkType = navigator.connection.type,
    distroPassData.appVersion = appConfig.staticSubVersion,
    distroPassData.width = window.innerWidth,
    distroPassData.height = window.innerHeight
    generateNonce()
}

function updateUrl(url, newValue,paramType) {
    var urlParts = url.split('&');    
    for (var i = 0; i < urlParts.length; i++) {
        var param = urlParts[i].split('=');        
        if (param[0] === paramType) {
            param[1] = encodeURIComponent(newValue);
            urlParts[i] = param.join('=');
            break;
        }
    }
    return stream_url = urlParts.join('&');
}

function generateGUID() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    var randomGuid =  s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    distroPassData.playbackId = randomGuid
    return randomGuid
}
function replaceUrl (){
    updateUrl(stream_url, distroPassData.deviceMake, "ads.deviceMake")
    updateUrl(stream_url, distroPassData.playbackId, "ads.playbackId")
    updateUrl(stream_url, distroPassData.connectionNetworkType, "ads.deviceConnectionType")
    updateUrl(stream_url, distroPassData.appVersion, "ads.app_version")
    updateUrl(stream_url, distroPassData.width, "ads.width")
    updateUrl(stream_url, distroPassData.height, "ads.height")
    updateUrl(stream_url, distroPassData.palnToken, "ads.paln")
}
