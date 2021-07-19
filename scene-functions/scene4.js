function scene4(){
	//this scene simulates the US tanker and the Chinese coast guard cutter colliding
		
	//set up the scene
	reset();
	
	//changes the text to display within the text box
	addText("An accidental collision results in an international incident, including pressure for an official U.S response. ");

	addIsland(); 

    flyTo(Cesium.Cartesian3.fromDegrees(110.61966507339565,13.454530812881677, 75000), 5, hprC(115, -45, 0));
	
	//create the data for the paths that the boats will travel along
	const tankerPathData = JSON.parse(
		'[{"longitude": 111.62546893497948, "latitude": 13.558125364954922, "height": 0.0}, {"longitude": 111.42, "latitude": 13.29, "height": 0.0}, {"longitude": 111.38, "latitude": 13.22, "height": 0.0}]'
	);
	const cutterPathData = JSON.parse(
		'[{"longitude": 110.97861814702314, "latitude": 12.821265812808873, "height": 0.0}, {"longitude": 111.32, "latitude": 13.13, "height": 0.0}, {"longitude": 111.38, "latitude": 13.24, "height": 0.0}]'
	);

	//Initialize the viewer clock:
	const timeStepInSeconds = 10;
	const totalSeconds = timeStepInSeconds * (tankerPathData.length - 1);
	const start = Cesium.JulianDate.fromIso8601("2023-03-09T23:10:00Z");
	const stop = Cesium.JulianDate.addSeconds(start, totalSeconds, new Cesium.JulianDate());
	viewer.clock.startTime = start.clone();
	viewer.clock.stopTime = stop.clone();
	viewer.clock.currentTime = start.clone();
	viewer.timeline.zoomTo(start, stop);
	// Speed up the playback speed 1x.
	viewer.clock.multiplier = 1;
	// Start playing the scene.
	viewer.clock.shouldAnimate = true;

	// The SampledPositionedProperty stores the position and timestamp for each sample along the radar sample series.
	const tankerPositionProperty = new Cesium.SampledPositionProperty(); //stores position and timestamp for the US tanker
	const cutterPositionProperty = new Cesium.SampledPositionProperty(); //stores position and timestamp for the Chinese cutter
	//plot out the tanker's path based on tankerPathData
	for (let i = 0; i < tankerPathData.length; i++) {
		const tankerDataPoint = tankerPathData[i];

		// Declare the time for this individual sample and store it in a new JulianDate instance.
		const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
		const tankerPosition = Cesium.Cartesian3.fromDegrees(tankerDataPoint.longitude, tankerDataPoint.latitude, tankerDataPoint.height);
		// Store the position along with its timestamp.
		// Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
		tankerPositionProperty.addSample(time, tankerPosition);

		viewer.entities.add({
			description: `Location: (${tankerDataPoint.longitude}, ${tankerDataPoint.latitude}, ${tankerDataPoint.height})`,
			position: tankerPosition,
			point: { pixelSize: 10, color: Cesium.Color.BLUE }
			});
	}
	//plot out the cutter's path based on cutterPathData
	for (let i = 0; i < cutterPathData.length; i++) {
		const cutterDataPoint = cutterPathData[i];

		// Declare the time for this individual sample and store it in a new JulianDate instance.
		const time = Cesium.JulianDate.addSeconds(start, i * timeStepInSeconds, new Cesium.JulianDate());
		const cutterPosition = Cesium.Cartesian3.fromDegrees(cutterDataPoint.longitude, cutterDataPoint.latitude, cutterDataPoint.height);
		// Store the position along with its timestamp.
		// Here we add the positions all upfront, but these can be added at run-time as samples are received from a server.
		cutterPositionProperty.addSample(time, cutterPosition);

		viewer.entities.add({
			description: `Location: (${cutterDataPoint.longitude}, ${cutterDataPoint.latitude}, ${cutterDataPoint.height})`,
			position: cutterPosition,
			point: { pixelSize: 10, color: Cesium.Color.RED }
			});
	}
	
	//load the models of the boats
	var positionCargo = new Cesium.Cartesian3.fromDegrees(111.62546893497948, 13.558125364954922 );
	var cargo = viewer.entities.add({
		id: "cargo",
        name: "cargo",
		availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
        position: tankerPositionProperty,
        model: {
            uri: "assets/vehicles/ships/tanker.glb",
            minimumPixelSize:8000,
            maximumScale: 2000
        },
		orientation: orientationC(positionCargo, 220, 0, 0),
         
		path: new Cesium.PathGraphics({ width: 3, material: Cesium.Color.BLUE})
    });
	var positionCutter = new Cesium.Cartesian3.fromDegrees(110.97861814702314, 12.821265812808873 );
    var cutter = viewer.entities.add({
        name: "cutter",
		availability: new Cesium.TimeIntervalCollection([ new Cesium.TimeInterval({ start: start, stop: stop }) ]),
        position: cutterPositionProperty,
        model: {
            uri: "assets/vehicles/ships/CCGC_Boat.glb",
            minimumPixelSize:8000,
            maximumScale: 400
        },
        orientation: orientationC(positionCutter, 30, 0, 0),
		path: new Cesium.PathGraphics({ width: 3, material: Cesium.Color.RED})
    });

	
}





