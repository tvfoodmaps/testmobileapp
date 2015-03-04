 // The camera overlay I want displayed over the camera
    var camera_overlay = Ti.UI.createView({
        top : 0,
        left : 0,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL
    });

    var take_picture = Ti.UI.createButton({
        height : Ti.UI.SIZE,
        width : Ti.UI.SIZE,
        bottom : 50,
        title : 'Take Picture'
    });
    
    
    take_picture.addEventListener('click', function() {
        Ti.Media.takePicture();
    });
    
    

if (Ti.Geolocation.locationServicesEnabled) {
    Ti.Geolocation.purpose = 'Get Current Heading';
 
    // make a single request for the current heading
    Ti.Geolocation.getCurrentHeading(function(e) {
        Ti.API.info(e.heading);
    });
 
    // Set 'heading' event for continual monitoring
    Ti.Geolocation.addEventListener('heading', function(e) {
        if (e.error) {
            alert('Error: ' + e.error);
        } else {
            //Ti.API.info("heading="+e.heading);
           // Ti.API.info("trueheading="+e.heading.trueHeading);
           //  $.magheading.setText(e.heading.magneticHeading);
            // $.heading.setText(e.heading.trueHeading);
             var magheading=e.heading.magneticHeading;
             var direction;
     
            if(magheading>337 || magheading < 22)
           		direction="N";
           	else if(magheading > 292)
           		direction="NW";
           	else if(magheading > 247)
           		direction="W";
           	else if(magheading > 202)
           		direction="SW";
           	else if(magheading > 157)
           		direction="S";
           	else if(magheading > 112)
           		direction="SE";
           	else if(magheading > 67)
           		direction="E";
           	else
           		direction="NE";
           		//$.direction.setText(direction);
           		
           	 take_picture.setTitle(direction);
        }
    });
} else {
    alert('Please enable location services');
}
   // take_picture.setTitle("TEST");
    
    camera_overlay.add(take_picture);

    // The actual show camera part
    Ti.Media.showCamera({
        success : function(e) {
            alert('success');
            // I want this!
        },
        cancel : function(e) {
        },
        error : function(error) {
        },
        autohide : false,
        showControls : false,
        mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO],
        overlay : camera_overlay // The camera overlay being added to camera view
    });
//$.showwin.open();
