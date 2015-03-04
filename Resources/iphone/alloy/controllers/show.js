function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "show";
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
    $.__views.showwin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "showwin"
    });
    $.__views.showwin && $.addTopLevelView($.__views.showwin);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 12
        },
        text: "Show page",
        id: "label"
    });
    $.__views.showwin.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var camera_overlay = Ti.UI.createView({
        top: 0,
        left: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL
    });
    var take_picture = Ti.UI.createButton({
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        bottom: 50,
        title: "Take Picture"
    });
    take_picture.addEventListener("click", function() {
        Ti.Media.takePicture();
    });
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Get Current Heading";
        Ti.Geolocation.getCurrentHeading(function(e) {
            Ti.API.info(e.heading);
        });
        Ti.Geolocation.addEventListener("heading", function(e) {
            if (e.error) alert("Error: " + e.error); else {
                var magheading = e.heading.magneticHeading;
                var direction;
                direction = magheading > 337 || 22 > magheading ? "N" : magheading > 292 ? "NW" : magheading > 247 ? "W" : magheading > 202 ? "SW" : magheading > 157 ? "S" : magheading > 112 ? "SE" : magheading > 67 ? "E" : "NE";
                take_picture.setTitle(direction);
            }
        });
    } else alert("Please enable location services");
    camera_overlay.add(take_picture);
    Ti.Media.showCamera({
        success: function() {
            alert("success");
        },
        cancel: function() {},
        error: function() {},
        autohide: false,
        showControls: false,
        mediaTypes: [ Ti.Media.MEDIA_TYPE_PHOTO ],
        overlay: camera_overlay
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;