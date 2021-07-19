function scene5() {
    reset();
	
	addText("U.S. sends Carrier Strike Group to assert freedom of navigation in international waters, locate source of GPS spoofing, and provide evidence that China is illegaly interfering with activities protected by international law.");

    addIsland();

    addCsgs();

    var positionCamera = Cesium.Cartesian3.fromDegrees(114.44, 11.49, 20000)
    flyTo(positionCamera , 5, hprC(-65, -15 ,0));

}