function scene1(){
    reset();
	
	//changes the text to display within the text box
	addText("U.S Cargo ship traveling through the South China Sea in its shipping lane.");

    var cargoPromise = viewer.dataSources.add(
        Cesium.CzmlDataSource.load("assets/cargocourse.czml")
    );

    flyTo(routeFramePos);

    viewer.animation.viewModel.faster();

};