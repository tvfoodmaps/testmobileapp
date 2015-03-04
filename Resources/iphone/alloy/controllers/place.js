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
    this.__controllerPath = "place";
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
    $.__views.placewin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        layout: "vertical",
        fullscreen: false,
        navBarHidden: true,
        top: Alloy.Globals.top,
        exitOnClose: false,
        id: "placewin"
    });
    $.__views.placewin && $.addTopLevelView($.__views.placewin);
    $.__views.__alloyId0 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId0"
    });
    $.__views.placewin.add($.__views.__alloyId0);
    $.__views.label = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 12
        },
        text: "Place page",
        id: "label"
    });
    $.__views.__alloyId0.add($.__views.label);
    $.__views.latlng = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 12
        },
        text: "Test",
        id: "latlng"
    });
    $.__views.__alloyId0.add($.__views.latlng);
    $.__views.heading = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 12
        },
        text: "heading",
        id: "heading"
    });
    $.__views.__alloyId0.add($.__views.heading);
    $.__views.magheading = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 15
        },
        text: "heading",
        id: "magheading"
    });
    $.__views.__alloyId0.add($.__views.magheading);
    $.__views.direction = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: 22
        },
        text: "dir",
        id: "direction"
    });
    $.__views.__alloyId0.add($.__views.direction);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.Geolocation.locationServicesEnabled) {
        Titanium.Geolocation.purpose = "Get Current Location";
        Titanium.Geolocation.addEventListener("location", function(e) {
            if (e.error) Ti.API.error("Error: " + e.error); else {
                Ti.API.info("coors=" + e.coords);
                $.latlng.setText(e.coords.latitude + "," + e.coords.longitude);
            }
        });
    } else alert("Please enable location services");
    if (Ti.Geolocation.locationServicesEnabled) {
        Ti.Geolocation.purpose = "Get Current Heading";
        Ti.Geolocation.getCurrentHeading(function(e) {
            Ti.API.info(e.heading);
        });
        Ti.Geolocation.addEventListener("heading", function(e) {
            if (e.error) alert("Error: " + e.error); else {
                $.magheading.setText(e.heading.magneticHeading);
                $.heading.setText(e.heading.trueHeading);
                var magheading = e.heading.magneticHeading;
                var direction;
                direction = magheading > 337 || 22 > magheading ? "N" : magheading > 292 ? "NW" : magheading > 247 ? "W" : magheading > 202 ? "SW" : magheading > 157 ? "S" : magheading > 112 ? "SE" : magheading > 67 ? "E" : "NE";
                $.direction.setText(direction);
            }
        });
    } else alert("Please enable location services");
    $.placewin.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;