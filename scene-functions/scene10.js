function scene10(){
    reset();

    addIsland();

    addText("Although only three users are shown, WGS provides critical communication for hundreds of users that can be located almost anywhere within the satellite's footprint.");

    addWGS();

    var points = scene.primitives.add(new Cesium.PointPrimitiveCollection());
    addWGSpoint(points);
    addVSATpoint(points);
    addRHNpoint(points);
    addSCSpoint(points);

    initClock();

    addBeams(positionVSAT, positionWGS);
    addBeams(positionRHN, positionWGS);
    addBeams(positionSCS, positionWGS);

    flyTo(satelliteFrame, 5);


}