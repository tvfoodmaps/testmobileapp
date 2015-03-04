//
// Push notifications
//
var deviceToken = null;
 
// Initialize PushNotification for Android
// and Obtaining a device token
function initializePushAndroid(){
	// Require the module
	var CloudPush = require('ti.cloudpush');
	CloudPush.debug = true;
CloudPush.enabled = true;
CloudPush.showTrayNotification = true;
CloudPush.showTrayNotificationsWhenFocused = true;
CloudPush.focusAppOnPush = false;
	// Initialize the module
	CloudPush.retrieveDeviceToken({
	    success: deviceTokenSuccess,
	    error: deviceTokenError
	});
 
	// Process incoming push notifications
	CloudPush.addEventListener('callback', function (evt) {
    	alert("Notification received: " + evt.payload);
	});
	
	CloudPush.addEventListener('trayClickLaunchedApp', function(evt) {
    Ti.API.info('Tray Click Launched App (app was not running)');
});
// Triggered when the push notifications is in the tray when the app is running
CloudPush.addEventListener('trayClickFocusedApp', function(evt) {
    Ti.API.info('Tray Click Focused App (app was already running)');
}); 
}
 
// Initialize PushNotification for iOS
// and Obtaining a device token
function initializePushIOS(){
	
       
       if (Ti.Platform.name == "iPhone OS" && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
 
 // Wait for user settings to be registered before registering for push notifications
    Ti.App.iOS.addEventListener('usernotificationsettings', function registerForPush() {
 
 // Remove event listener once registered for push notifications
        Ti.App.iOS.removeEventListener('usernotificationsettings', registerForPush); 
 
        Ti.Network.registerForPushNotifications({
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePushIOS
        });
    });
 
 // Register notification types to use
    Ti.App.iOS.registerUserNotificationSettings({
	    types: [
            Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND,
            Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE
        ]
    });
}
 
// For iOS 7 and earlier
else {
    Ti.Network.registerForPushNotifications({
 // Specifies which notifications to receive
        types: [
            Ti.Network.NOTIFICATION_TYPE_BADGE,
            Ti.Network.NOTIFICATION_TYPE_ALERT,
            Ti.Network.NOTIFICATION_TYPE_SOUND
        ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePushIOS
    });
}
       
       
	// Process incoming push notifications
	function receivePushIOS(e) {
	    alert('Received push: ' + JSON.stringify(e));
	}
}
 
 
// Enable push notifications for this device
// Save the device token for subsequent API calls
function deviceTokenSuccess(e) {
    deviceToken = e.deviceToken;
    console.info("Device Token received: " + deviceToken);
    
    subscribeToChannel();
}
 
function deviceTokenError(e) {
    alert('Failed to register for push notifications! ' + e.error);
}
 
//
// Subscribe with token
// 
 
// Require the Cloud module
var Cloud = require("ti.cloud");
 
function subscribeToChannel () {
	console.info("Subscribing to channel by using a Token ...");
    // Subscribes the device to the 'news_alerts' channel
    // Specify the push type as either 'android' for Android or 'ios' for iOS
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: 'news_alerts',
        type: Ti.Platform.name == 'android' ? 'android' : 'ios'
    }, function (e) {
        if (e.success) {
            //alert('Subscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}
 
 function unsubscribeToChannel () {
 // Unsubscribes the device from the 'test' channel
    Cloud.PushNotifications.unsubscribeToken({
        device_token: deviceToken,
        channel: 'news_alerts',
    }, function (e) {
 if (e.success) {
            alert('Unsubscribed');
        } else {
            alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
        }
    });
}
 
 
 function gotoMapWin()
{
		Alloy.createController("mappage").getView();
} 

 
 function gotoPlaceWin()
{
		Alloy.createController("place").getView();
} 

function gotoShowWin()
{
		Alloy.createController("show").getView();
} 


var osname = Ti.Platform.osname;
var win = Ti.UI.createWindow({
    backgroundColor: 'white',
    layout:'vertical',
    exitOnClose: true
});
var subscribe = Ti.UI.createButton({title:'Subscribe'});
subscribe.addEventListener('click', subscribeToChannel);
win.add(subscribe);
var unsubscribe = Ti.UI.createButton({title:'Unsubscribe'});
unsubscribe.addEventListener('click', unsubscribeToChannel);
win.add(unsubscribe);

var placebut=Ti.UI.createButton({title:'Place Page'});
placebut.addEventListener('click',gotoPlaceWin);
win.add(placebut);

var sbut=Ti.UI.createButton({title:'Show Page'});
sbut.addEventListener('click',gotoShowWin);
win.add(sbut);

var mapbut=Ti.UI.createButton({title:'Map Page'});
mapbut.addEventListener('click',gotoMapWin);
win.add(mapbut);
 
// This is a single context application with multiple windows in a stack

 
 
  
  
  	if (osname === 'android') {
	  initializePushAndroid();
	} else {
	  initializePushIOS();
	}
	


win.open();
