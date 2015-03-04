var win = Ti.UI.createWindow();
var Map = require('ti.map');
var bottomexpanded=0;
var pins = [];


var scrollableview=Ti.UI.createScrollableView({
 	    		showPagingControl:false,
 	    		top:'70%'
 	    	});
 	    	
 	    	
var mapview = Map.createView({
    mapType: Map.NORMAL_TYPE,
    region: {
        latitude:37.78739929199219,
        longitude:-122.4031982421875,
        latitudeDelta:.05,
        longitudeDelta:.05
    },
    animate:true,
    regionFit:true,
    userLocation:false,
    height:'100%',
    top:0
});


win.add(mapview);
	
 function showscrollableview()
 {
 	bottomexpanded=0;
 	    	 scrollableview.show();
             mapview.height='70%';
 }
 
 
 
 function closescrollableview()
 {
 	mapview.height='100%';
 	scrollableview.hide();
 	//showmap=0;
 	Ti.API.info('in here');
 	 scrollableview.top='70%';
 	
 }


mapview.addEventListener('click', function(evt)
{
        // get event properties
        var annotation = evt.source; //get the Myid from annotation
        var clicksource = evt.clicksource;
 		var title=evt.annotation.title;
 		Ti.API.info(annotation+" " +clicksource+ " "+title);
 		//Ti.API.info(JSON.stringify(evt.clicksource));
        if (clicksource=='pin'){  //leftButton event      
            //alert("leftButton of " + annotation + " has been clicked.");
            
           // Ti.API.info(scrollableview.getVisible());
       			if(scrollableview.getVisible()!=1)
            		showscrollableview();
            //	Ti.API.info(evt.annotation.myid);
            	scrollableview.scrollToView(evt.annotation.myid);
           
        }
        else if(clicksource=='annotation'){
        	//closescrollableview();
        }       
});


var url="http://www.tvfoodmaps.com/MobileAppServlet?ACTION=gpssearch&lat=37.785835&lng=-122.406417";
var xhr=Ti.Network.createHTTPClient({
	
	onload: function(e){
		var mydata=JSON.parse(this.responseText);
		var loadedViews = [];
		for (var i = 0, l = mydata.results.length; i < l; i++) {
        
					
				var Ann1 = Map.createAnnotation({
			    latitude:mydata.results[i].lat,
			    longitude:mydata.results[i].lng,
			    title:mydata.results[i].name,
			    pincolor:Map.ANNOTATION_RED,
			    animate:true,
			    myid:i // CUSTOM ATTRIBUTE THAT IS PASSED INTO EVENT OBJECTS
			});
			pins.push(Ann1);
			mapview.addAnnotation(Ann1);
			     
			var view = Titanium.UI.createView({
			   borderRadius:10,
			   backgroundColor:'white',
			   width:'100%',
			   height:'100%',
			   left:'0%',
			   top:0
			});
			
			
			var placedata=Titanium.UI.createView({
				left:0,
				top:5,
				width:'70%',
				height:100,
				layout:'vertical'
				
			});
					
			var label1=Titanium.UI.createLabel({text:mydata.results[i].name,left:'2%', color: '#000',width:'auto'});
			var label2=Titanium.UI.createLabel({text:mydata.results[i].streetAddress,left:'2%',font: { fontSize:12 }, color: '#000',width:'auto'});
			
			var myImage = Ti.UI.createImageView({
				width:Ti.UI.FILL,
				height:100,
				top:5,
				left:'70%',
				image:mydata.results[i].mainImage /* accepts URL, local path, or Ti.Filesystem.File */
			});

     		var fullshowname="As Seen On ";

			for (var i2 = 0, l2 = mydata.results[i].shows.length; i2 < l2; i2++) {
       		
       		var sname=mydata.results[i].shows[i2].escapedShowName;
       		fullshowname=fullshowname+sname;
       		if(i2< (l2-1))
       			fullshowname=fullshowname+" , ";
       		
			}

			var label3=Titanium.UI.createLabel({text:fullshowname,left:'2%',font: { fontSize:12 }, color: '#000',width:'auto'});
			

			placedata.add(label1);
			placedata.add(label2);
			placedata.add(label3);
			view.add(placedata);
			view.add(myImage);
			var view3 = Titanium.UI.createView({
			   borderRadius:10,
			   backgroundColor:'white',
			   width:'100%',
			   height:'100%',
			   left:'0%',
			   top:100
			});
			
			
			var nextindex=i+1;
			var nextindex2=i+2;
			var nextindex3=i+3;
			var nextindex4=i+4;
			if(i+4 >= l){
				nextindex=1;
				nextindex2=2;
				nextindex3=3;
				nextindex4=4;
			}
			var myImage3 = Ti.UI.createImageView({
				width:'25%',
				height:70,
				top:5,
				left:0,
				myid:nextindex,
				image:mydata.results[nextindex].mainImage /* accepts URL, local path, or Ti.Filesystem.File */
			});
			var myImage4 = Ti.UI.createImageView({
				width:'25%',
				height:70,
				top:5,
				left:'25%',
				myid:nextindex2,
				image:mydata.results[nextindex2].mainImage /* accepts URL, local path, or Ti.Filesystem.File */
			});
			var myImage5 = Ti.UI.createImageView({
				width:'25%',
				height:70,
				top:5,
				left:'50%',
				myid:nextindex3,
				image:mydata.results[nextindex3].mainImage /* accepts URL, local path, or Ti.Filesystem.File */
			});
			var myImage6 = Ti.UI.createImageView({
				width:'25%',
				height:70,
				top:5,
				left:'75%',
				myid:nextindex4,
				image:mydata.results[nextindex4].mainImage /* accepts URL, local path, or Ti.Filesystem.File */
			});
			
			myImage3.addEventListener('click',function(e)
			{
			   
			   scrollableview.scrollToView(e.source.myid);
			});
			
			myImage4.addEventListener('click',function(e)
			{
			   scrollableview.scrollToView(e.source.myid);
			});
			
			myImage5.addEventListener('click',function(e)
			{
			   scrollableview.scrollToView(e.source.myid);
			});
		
			myImage6.addEventListener('click',function(e)
			{
			  scrollableview.scrollToView(e.source.myid);
			});
			
			view3.add(myImage3);
			var labelnext=Titanium.UI.createLabel({text:mydata.results[nextindex].name,font: { fontSize:7 },top:90,left:'2%', color: '#000',width:'auto'});
			
			view3.add(labelnext);
			view3.add(myImage4);
			view3.add(myImage5);
			view3.add(myImage6);
					
			var hidebut=Titanium.UI.createLabel({text:'HIDE',top:110,left:'2%',font: { fontSize:12 }, color: '#000',width:'auto'});
			
hidebut.addEventListener('click',closescrollableview);
view3.add(hidebut);
			
			
			
			view.add(view3);
			
			
			loadedViews.push(view);
			     
 	    	
 	    	//win.add(view2);
			}
			
			
 	    	scrollableview.views=loadedViews;
 	    	scrollableview.addEventListener('scrollend', function(e)
			{
			    Ti.API.info("Image Scrolled current page: " + e.currentPage);
			    
			    mapview.selectAnnotation(pins[e.currentPage]);
			});
			
			scrollableview.addEventListener('click', function(e)
			{
			    	 
			    	 if(bottomexpanded==0){
			    	 	 bottomexpanded=1;
			    	 scrollableview.top='50%';
             		 mapview.height='50%';
			    	 }else{
			    	 	 //showmap=0;
			    	 	//closescrollableview();
			    	 }
			    	
			  
			});
 	    	scrollableview.hide();
 	    	win.add(scrollableview);
 	    	
	},
	onerror: function(e){
		Ti.API.info('ERROR');
	},
	timeout:5000
	
});

xhr.open("GET",url);
xhr.send();


win.open();

function doscrolltoview(id){
	scrollableview.scrollToView(id);
}
