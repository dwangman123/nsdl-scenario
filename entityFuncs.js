function addIsland(){
    return viewer.entities.add({
        name: "artificial island",
        position: positionIsland,
        model: {
            uri: "assets/context/temp_island.glb",
            minimumPixelSize:8000,
            maximumScale: 2000,
        },
        orientation: orientationC(positionIsland, 180, 0, 0),
    });
}



function addCargoShip(){
    var cargo = viewer.entities.add({
        name: "cargo",
        position: positionCargo,
        model: {
            uri: "assets/vehicles/ships/tanker.glb",
            minimumPixelSize:8000,
            maximumScale: 2000
        },
        orientation: orientationC(positionCargo, 220, 0, 0)
    });
}



function addCutter(){
    var cutter = viewer.entities.add({
        name: "cutter",
        position: positionCutter,
        model: {
            uri: "assets/vehicles/ships/CCGC_Boat.glb",
            minimumPixelSize:8000,
            maximumScale: 400
        },
        orientation: orientationC(positionCutter, 30, 0, 0),
    });
}



function addFog(){
    var fog =   viewer.entities.add({
        name:"fog",
        position: positionFog,
        model: {
            uri: "assets/context/fog_basic.glb",
            minimumPixelSize: 1000,
            maximumScale: 1000
        },
        orientation: orientationC(positionFog, 90, 0, 0)
    });
}



function addCsgs(){
    var promise1 = Cesium.IonResource.fromAssetId(507612).then(function (
        resource
    ) {
        return viewer.entities.add({
            name: "CSG 1",
            position: positionCsg1,
            model: {
                uri: resource,
                minimumPixelSize: 10000,
                maximumScale: 4000
            },
            orientation : orientationC(positionCsg1, 270, 0, 0)
        });
    });
    var promise2 = Cesium.IonResource.fromAssetId(507611).then(function (
        resource
    ) {
        return viewer.entities.add({
            name: "CSG 2",
            position: positionCsg2,
            model: {
                uri: resource,
                minimumPixelSize: 10000,
                maximumScale: 1000
            },
            orientation: orientationC(positionCsg2, 270, 0 ,0)

        });
    });
    var promise3 = Cesium.IonResource.fromAssetId(507606).then(function (
        resource
    ) {
        return viewer.entities.add({
            name: "CSG 3",
            position: positionCsg3,
            model: {
                uri: resource,
                minimumPixelSize: 10000,
                maximumScale: 1000
            },
        });
    });
};



function addWGS(){
    var WGS = viewer.entities.add({
        name: "WGS",
        position: positionWGS,
        model:{
            uri: "assets/vehicles/satellites/WGS_Satellite.glb",
            minimumPixelSize: 10000,
            maximumScale: 1000
        },
        orientation:orientationC(positionWGS, 45, 180, 0)
    });
};



function addWGSpoint(points){
    points.add({
        position: new Cesium.Cartesian3.fromDegrees(88.38, -0.01, 1000),
        color: Cesium.Color.SKYBLUE,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
        id: "loc of satellite",
        show: true,
        pixelSize: 10
    });
};



function addVSAT() {
    var VSAT = viewer.entities.add({
        name: "VSAT",
        position: positionVSAT,
        model:{
            uri: "assets/antennae/backpack_antenna.glb",
     
            maximumScale: 2
        },
        orientation: orientationC(positionVSAT, 180, 0, 0)
    });
}


function addVSATpoint(points){
    points.add({
            position: new Cesium.Cartesian3.fromDegrees(126.61583, 35.90361, 10000),
            color: Cesium.Color.RED,
            outlineWidth:3,
            id: "loc of VSAT",
            show:true,
            pixelSize:10
    }) 
}


function addRHN(){
    var RHN = viewer.entities.add({
        name: "RHN",
        position: positionRHN,
        model:{
            uri: "assets/antennae/hub_node.glb",
            minimumPixelSize: 50,
            maximumScale: 20
        },
        orientation: orientationC(positionRHN, 0,0,0)
    });
}

function addRHNpoint(points){
    points.add({
        position: new Cesium.Cartesian3.fromDegrees(144.905823, 13.56784, 10000),
        color: Cesium.Color.RED,
        outlineWidth:3,
        id: "loc of RHN",
        show: true,
        pixelSize:10
    });
}


function addSCS(){
    var SCS = viewer.entities.add({
        name: "SCS",
        position: positionSCS,
        model:{
            uri: "assets/antennae/hub_node.glb",
            minimumPixelSize: 1000,
            maximumScale: 100
        }
    });
};



function addSCSpoint(points){
    points.add({
        position: new Cesium.Cartesian3.fromDegrees(113.80507, 11.918456, 10000),
        color: Cesium.Color.RED,
        outlineWidth:3,
        id: "loc of hub",
        show: true,
        pixelSize:10
    });
};



function addBeams(origin, dest){
    var start = viewer.clock.startTime;
    var stop = viewer.clock.stopTime;
    var SamplePosition = new Cesium.SampledPositionProperty();
	SamplePosition.addSample(start, origin);
	SamplePosition.addSample(stop, dest);

	var jamSignal = viewer.entities.add({
		name: "jamSignal",
		availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: start, stop: stop })]),
		position: SamplePosition,
		model: {
			uri: "assets/RadioPulse2_White.glb",
			minimumPixelSize: 35,
            
            color: Cesium.Color.RED
		},
		path: {
			resolution: 1,
			material: new Cesium.PolylineGlowMaterialProperty({
				glowPower: 0.1,
				color: Cesium.Color.RED,
			}),
			width: 10,
		},
        orientation: new Cesium.VelocityOrientationProperty(SamplePosition)

	})
}




function addOverlay(user){
    viewer.entities.suspendEvents();


    for (var i = 0; i < user.length; i++) {
        var coordinates = user[i];
        var longitude = coordinates[0];
        var latitude = coordinates[1];
        var height = coordinates[2];

        var color = new Cesium.Color.fromHsl(0.65 - height * 0.00000045, 1.0, 0.5)
        var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
        var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, (height-3800000) /2);

        var polyline = new Cesium.PolylineGraphics();
        polyline.material = new Cesium.ColorMaterialProperty(color);
        polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);
        polyline.width = new Cesium.ConstantProperty(2);
        polyline.arcType = new Cesium.ConstantProperty(
            Cesium.ArcType.NONE
        );

        var entity = new Cesium.Entity({
            id: "data point #" + i,
            show: true,
            polyline: polyline,
            description: "data rate: " + height + " bits/sec; coordinates: " + longitude + ", " + latitude
        });

        viewer.entities.add(entity);
    }   
    
    viewer.entities.resumeEvents(); 
}






function addOverlayNew(user){
    viewer.entities.suspendEvents();

    for (var i = 0; i < user.length; i++) {
        var coordinates = user[i];
        var longitude = coordinates[0];
        var latitude = coordinates[1];
        var height = coordinates[2];

        var color = new Cesium.Color.fromHsl(0.65 - height * 0.0000000045, 1.0, 0.5)
        var surfacePosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0);
        var heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, (height-3800000)/2000);

        var polyline = new Cesium.PolylineGraphics();
        polyline.material = new Cesium.ColorMaterialProperty(color);
        polyline.positions = new Cesium.ConstantProperty([surfacePosition, heightPosition]);
        polyline.width = new Cesium.ConstantProperty(2);
        polyline.arcType = new Cesium.ConstantProperty(
            Cesium.ArcType.NONE
        );

        var entity = new Cesium.Entity({
            id: "data point #" + i,
            show: true,
            polyline: polyline,
            description: "data rate: " + height + " bits/sec; coordinates: " + longitude + ", " + latitude
        });

        viewer.entities.add(entity);
    }   
    
    viewer.entities.resumeEvents(); 
}