function scene2(){

    reset();

    addText("China has been spoofing GPS in the South China Sea from undetermined locations in order to assert territorial dominance in international waters.")

    var text = ["Consequently, the U.S. cargo ship strays off-course from its shipping lane because the GPS erroneously shows that the ship is still on-course."]
    addMultipleText(text);
    
    var cargoPromise = viewer.dataSources.add(
        Cesium.CzmlDataSource.load("assets/cargocourse-spoofed.czml")
    );
    
    addIsland();

    flyTo(routeFramePos);
}; 