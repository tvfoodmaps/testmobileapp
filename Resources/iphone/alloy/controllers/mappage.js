function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function showscrollableview() {
        bottomexpanded = 0;
        scrollableview.show();
        mapview.height = "70%";
    }
    function closescrollableview() {
        mapview.height = "100%";
        scrollableview.hide();
        Ti.API.info("in here");
        scrollableview.top = "70%";
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mappage";
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
    $.__views.mappagewin = Ti.UI.createWindow({
        backgroundColor: "white",
        id: "mappagewin"
    });
    $.__views.mappagewin && $.addTopLevelView($.__views.mappagewin);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = Ti.UI.createWindow();
    var Map = require("ti.map");
    var bottomexpanded = 0;
    var pins = [];
    var scrollableview = Ti.UI.createScrollableView({
        showPagingControl: false,
        top: "70%"
    });
    var mapview = Map.createView({
        mapType: Map.NORMAL_TYPE,
        region: {
            latitude: 37.78739929199219,
            longitude: -122.4031982421875,
            latitudeDelta: .05,
            longitudeDelta: .05
        },
        animate: true,
        regionFit: true,
        userLocation: false,
        height: "100%",
        top: 0
    });
    win.add(mapview);
    mapview.addEventListener("click", function(evt) {
        var annotation = evt.source;
        var clicksource = evt.clicksource;
        var title = evt.annotation.title;
        Ti.API.info(annotation + " " + clicksource + " " + title);
        if ("pin" == clicksource) {
            1 != scrollableview.getVisible() && showscrollableview();
            scrollableview.scrollToView(evt.annotation.myid);
        } else "annotation" == clicksource;
    });
    var url = "http://www.tvfoodmaps.com/MobileAppServlet?ACTION=gpssearch&lat=37.785835&lng=-122.406417";
    var xhr = Ti.Network.createHTTPClient({
        onload: function() {
            var mydata = JSON.parse(this.responseText);
            var loadedViews = [];
            for (var i = 0, l = mydata.results.length; l > i; i++) {
                var Ann1 = Map.createAnnotation({
                    latitude: mydata.results[i].lat,
                    longitude: mydata.results[i].lng,
                    title: mydata.results[i].name,
                    pincolor: Map.ANNOTATION_RED,
                    animate: true,
                    myid: i
                });
                pins.push(Ann1);
                mapview.addAnnotation(Ann1);
                var view = Titanium.UI.createView({
                    borderRadius: 10,
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    left: "0%",
                    top: 0
                });
                var placedata = Titanium.UI.createView({
                    left: 0,
                    top: 5,
                    width: "70%",
                    height: 100,
                    layout: "vertical"
                });
                var label1 = Titanium.UI.createLabel({
                    text: mydata.results[i].name,
                    left: "2%",
                    color: "#000",
                    width: "auto"
                });
                var label2 = Titanium.UI.createLabel({
                    text: mydata.results[i].streetAddress,
                    left: "2%",
                    font: {
                        fontSize: 12
                    },
                    color: "#000",
                    width: "auto"
                });
                var myImage = Ti.UI.createImageView({
                    width: Ti.UI.FILL,
                    height: 100,
                    top: 5,
                    left: "70%",
                    image: mydata.results[i].mainImage
                });
                var fullshowname = "As Seen On ";
                for (var i2 = 0, l2 = mydata.results[i].shows.length; l2 > i2; i2++) {
                    var sname = mydata.results[i].shows[i2].escapedShowName;
                    fullshowname += sname;
                    l2 - 1 > i2 && (fullshowname += " , ");
                }
                var label3 = Titanium.UI.createLabel({
                    text: fullshowname,
                    left: "2%",
                    font: {
                        fontSize: 12
                    },
                    color: "#000",
                    width: "auto"
                });
                placedata.add(label1);
                placedata.add(label2);
                placedata.add(label3);
                view.add(placedata);
                view.add(myImage);
                var view3 = Titanium.UI.createView({
                    borderRadius: 10,
                    backgroundColor: "white",
                    width: "100%",
                    height: "100%",
                    left: "0%",
                    top: 100
                });
                var nextindex = i + 1;
                var nextindex2 = i + 2;
                var nextindex3 = i + 3;
                var nextindex4 = i + 4;
                if (i + 4 >= l) {
                    nextindex = 1;
                    nextindex2 = 2;
                    nextindex3 = 3;
                    nextindex4 = 4;
                }
                var myImage3 = Ti.UI.createImageView({
                    width: "25%",
                    height: 70,
                    top: 5,
                    left: 0,
                    myid: nextindex,
                    image: mydata.results[nextindex].mainImage
                });
                var myImage4 = Ti.UI.createImageView({
                    width: "25%",
                    height: 70,
                    top: 5,
                    left: "25%",
                    myid: nextindex2,
                    image: mydata.results[nextindex2].mainImage
                });
                var myImage5 = Ti.UI.createImageView({
                    width: "25%",
                    height: 70,
                    top: 5,
                    left: "50%",
                    myid: nextindex3,
                    image: mydata.results[nextindex3].mainImage
                });
                var myImage6 = Ti.UI.createImageView({
                    width: "25%",
                    height: 70,
                    top: 5,
                    left: "75%",
                    myid: nextindex4,
                    image: mydata.results[nextindex4].mainImage
                });
                myImage3.addEventListener("click", function(e) {
                    scrollableview.scrollToView(e.source.myid);
                });
                myImage4.addEventListener("click", function(e) {
                    scrollableview.scrollToView(e.source.myid);
                });
                myImage5.addEventListener("click", function(e) {
                    scrollableview.scrollToView(e.source.myid);
                });
                myImage6.addEventListener("click", function(e) {
                    scrollableview.scrollToView(e.source.myid);
                });
                view3.add(myImage3);
                var labelnext = Titanium.UI.createLabel({
                    text: mydata.results[nextindex].name,
                    font: {
                        fontSize: 7
                    },
                    top: 90,
                    left: "2%",
                    color: "#000",
                    width: "auto"
                });
                view3.add(labelnext);
                view3.add(myImage4);
                view3.add(myImage5);
                view3.add(myImage6);
                var hidebut = Titanium.UI.createLabel({
                    text: "HIDE",
                    top: 110,
                    left: "2%",
                    font: {
                        fontSize: 12
                    },
                    color: "#000",
                    width: "auto"
                });
                hidebut.addEventListener("click", closescrollableview);
                view3.add(hidebut);
                view.add(view3);
                loadedViews.push(view);
            }
            scrollableview.views = loadedViews;
            scrollableview.addEventListener("scrollend", function(e) {
                Ti.API.info("Image Scrolled current page: " + e.currentPage);
                mapview.selectAnnotation(pins[e.currentPage]);
            });
            scrollableview.addEventListener("click", function() {
                if (0 == bottomexpanded) {
                    bottomexpanded = 1;
                    scrollableview.top = "50%";
                    mapview.height = "50%";
                }
            });
            scrollableview.hide();
            win.add(scrollableview);
        },
        onerror: function() {
            Ti.API.info("ERROR");
        },
        timeout: 5e3
    });
    xhr.open("GET", url);
    xhr.send();
    win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;