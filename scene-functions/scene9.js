function scene9(){
    reset();

    addText("A third critical group of users of MILSATCOM is the CSG in the South China Sea. ");

    addIsland();

    addCsgs();

    var positionCamera = new Cesium.Cartesian3.fromDegrees(114.44, 11.49, 20000) ;
    flyTo(positionCamera, 8, hprC(-65, -15 ,0));
}