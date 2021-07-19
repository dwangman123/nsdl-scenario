function addToolbarButton(text, func) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "cesium-button";
    button.onclick = function () {
        func();
		var numButtons = document.getElementById("toolbar").children.length;
		for(var i = 0; i < numButtons; i++){
			document.getElementById("toolbar").children[i].style.color = "white";
		}
		button.style.color = "orange";
    };
    button.textContent = text;
    document.getElementById("toolbar").appendChild(button);
};


function hprC(heading, pitch, roll){
    var headingR = Cesium.Math.toRadians(heading);
    var pitchR = Cesium.Math.toRadians(pitch);
    var rollR = Cesium.Math.toRadians(roll);
    return new Cesium.HeadingPitchRoll(headingR, pitchR, rollR);
};


function orientationC(position, heading, pitch, roll){
    var hpr  = hprC(heading, pitch, roll);
    return Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
};


function reset() {
    viewer.dataSources.removeAll();
    viewer.entities.removeAll();
    document.querySelector("#text").innerHTML = "";
    for (var i = 0; i< scene.primitives._primitives.length; i++){
        if (scene.primitives._primitives[i]._pointPrimitives != undefined){
            scene.primitives._primitives[i].destroy();
        }
    }

}; 



function addText(text){
    document.getElementById("text").innerHTML = text;
};


function flyTo( position , duration , orientation){
    if (orientation == undefined ){
        orientation = orientationC(position, 0,0,0)
    }
    if (duration == undefined){
        duration = 5;
    }
    viewer.scene.camera.flyTo({
        destination: position,
        orientation: orientation,
        duration: duration
    });
}


function addMultipleText(strArr){
    var counter = 0;
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        if (counter >= strArr.length){
            handler.destroy();
        }else{
            addText(strArr[counter]);
            counter++;
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

}


function locDet(){
	var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
	handler.setInputAction(function (movement) {
	  var cartesian = viewer.camera.pickEllipsoid(
		movement.position,
		scene.globe.ellipsoid
	  );
	  if (cartesian) {
		var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
		var longitudeString = Cesium.Math.toDegrees(
		  cartographic.longitude
		).toFixed(2);
		var latitudeString = Cesium.Math.toDegrees(
		  cartographic.latitude
		).toFixed(2);

		console.log("lon: "+longitudeString + ", lat: "+ latitudeString);
	  } else {
		//entity.label.show = false;
	  }
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
};




function initClock(){
    const timeLength = 623;
	const timeStepInSeconds = 3; 
	const totalSeconds = timeStepInSeconds * (timeLength - 1);
	const start = Cesium.JulianDate.fromIso8601("2023-04-09T23:10:00Z");
	const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
	viewer.clock.startTime = start.clone();
	viewer.clock.stopTime = stop.clone();
	viewer.clock.currentTime = start.clone();
	viewer.timeline.zoomTo(start, stop);
	viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; 
	viewer.clock.multiplier = 1500;
	viewer.clock.shouldAnimate = true;
}


function addHead(text){
    document.getElementById("head").innerHTML = text;
}