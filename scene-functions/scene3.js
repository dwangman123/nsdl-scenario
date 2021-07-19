function scene3(){
    reset();
	addText("Unexpectedly, a Chinese Coast Guard cutter approaches, perhaps with the intent to board. ");

    addIsland();

    addCargoShip();

    addCutter();

    var positionCamera = Cesium.Cartesian3.fromDegrees(110.61966507339565,13.454530812881677, 75000);
    flyTo( positionCamera, 5, hprC(115, -45, 0));
    

    
}