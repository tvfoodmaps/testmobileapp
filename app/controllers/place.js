

if (Ti.Geolocation.locationServicesEnabled) {
    Titanium.Geolocation.purpose = 'Get Current Location';
    //xTi.Geolocation.purpose = 'Determine Current Location';
    Titanium.Geolocation.addEventListener('location', function(e) {
        if (e.error) {
            Ti.API.error('Error: ' + e.error);
        } else {
            Ti.API.info('coors='+e.coords);
            
           // var payload=JSON.parse(e.coords);
           // Ti.API.info("lat="+e.coords.latitude + " lng="+e.coords.longitude);
            $.latlng.setText(e.coords.latitude+","+e.coords.longitude);
           // alert('got new lcoation');
        }
    });
} else {
    alert('Please enable location services');
}




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
             $.magheading.setText(e.heading.magneticHeading);
             $.heading.setText(e.heading.trueHeading);
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
           		$.direction.setText(direction);
        }
    });
} else {
    alert('Please enable location services');
}


$.placewin.open();
