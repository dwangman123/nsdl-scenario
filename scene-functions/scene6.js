function scene6() {
	reset();

	addText("Many users rely on MILSATCOM in and around the South China Sea.");
	var text = ["The WGS satellite provides wideband communication for command and control as well as tactical communications."];
	addMultipleText(text);

	var artIsland = addIsland();

	addWGS();

	var points = scene.primitives.add(new Cesium.PointPrimitiveCollection());
	addWGSpoint(points);

	flyTo(satelliteFrame, 8);

}