function scene8(){
    reset();

    addText("A regional hub node is a large gateway antenna that carries large volumes of data. There resides one at Andersen Air Force base in Guam.");

    addRHN();

    var positionCamera = Cesium.Cartesian3.fromDegrees(144.903680, 13.563532, 500);
    flyTo(positionCamera, 8)
    
    
}