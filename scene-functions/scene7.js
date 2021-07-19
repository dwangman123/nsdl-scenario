function scene7(){
    reset();
    	
	addText("Mobile tactical users use portable VSAT terminals with a diameter of about 1 meter. This one is located at the Kunsan Air Force Base in South Korea.");

    addVSAT();

    var positionCamera = Cesium.Cartesian3.fromDegrees(126.615, 35.90, 206)
    flyTo(positionCamera, 8)


}