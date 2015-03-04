function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function initializePushAndroid() {
        var CloudPush = require("ti.cloudpush");
        CloudPush.debug = true;
        CloudPush.enabled = true;
        CloudPush.showTrayNotification = true;
        CloudPush.showTrayNotificationsWhenFocused = true;
        CloudPush.focusAppOnPush = false;
        CloudPush.retrieveDeviceToken({
            success: deviceTokenSuccess,
            error: deviceTokenError
        });
        CloudPush.addEventListener("callback", function(evt) {
            alert("Notification received: " + evt.payload);
        });
        CloudPush.addEventListener("trayClickLaunchedApp", function() {
            Ti.API.info("Tray Click Launched App (app was not running)");
        });
        CloudPush.addEventListener("trayClickFocusedApp", function() {
            Ti.API.info("Tray Click Focused App (app was already running)");
        });
    }
    function initializePushIOS() {
        function receivePushIOS(e) {
            alert("Received push: " + JSON.stringify(e));
        }
        if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
            Ti.App.iOS.addEventListener("usernotificationsettings", function registerForPush() {
                Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
                Ti.Network.registerForPushNotifications({
                    success: deviceTokenSuccess,
                    error: deviceTokenError,
                    callback: receivePushIOS
                });
            });
            Ti.App.iOS.registerUserNotificationSettings({
                types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
            });
        } else Ti.Network.registerForPushNotifications({
            types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
            success: deviceTokenSuccess,
            error: deviceTokenError,
            callback: receivePushIOS
        });
    }
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
        console.info("Device Token received: " + deviceToken);
        subscribeToChannel();
    }
    function deviceTokenError(e) {
        alert("Failed to register for push notifications! " + e.error);
    }
    function subscribeToChannel() {
        console.info("Subscribing to channel by using a Token ...");
        Cloud.PushNotifications.subscribeToken({
            device_token: deviceToken,
            channel: "news_alerts",
            type: "ios"
        }, function(e) {
            e.success || alert("Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function unsubscribeToChannel() {
        Cloud.PushNotifications.unsubscribeToken({
            device_token: deviceToken,
            channel: "news_alerts"
        }, function(e) {
            alert(e.success ? "Unsubscribed" : "Error:\n" + (e.error && e.message || JSON.stringify(e)));
        });
    }
    function gotoMapWin() {
        Alloy.createController("mappage").getView();
    }
    function gotoPlaceWin() {
        Alloy.createController("place").getView();
    }
    function gotoShowWin() {
        Alloy.createController("show").getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 12
        },
        text: "Hello, World",
        id: "label"
    });
    $.__views.index.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var deviceToken = null;
    var Cloud = require("ti.cloud");
    var osname = Ti.Platform.osname;
    var win = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        exitOnClose: true
    });
    var subscribe = Ti.UI.createButton({
        title: "Subscribe"
    });
    subscribe.addEventListener("click", subscribeToChannel);
    win.add(subscribe);
    var unsubscribe = Ti.UI.createButton({
        title: "Unsubscribe"
    });
    unsubscribe.addEventListener("click", unsubscribeToChannel);
    win.add(unsubscribe);
    var placebut = Ti.UI.createButton({
        title: "Place Page"
    });
    placebut.addEventListener("click", gotoPlaceWin);
    win.add(placebut);
    var sbut = Ti.UI.createButton({
        title: "Show Page"
    });
    sbut.addEventListener("click", gotoShowWin);
    win.add(sbut);
    var mapbut = Ti.UI.createButton({
        title: "Map Page"
    });
    mapbut.addEventListener("click", gotoMapWin);
    win.add(mapbut);
    "android" === osname ? initializePushAndroid() : initializePushIOS();
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;