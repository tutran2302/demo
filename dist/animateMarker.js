//leaflet-rotatedmarker.js"
var animateIcon = L.icon({
    iconUrl: 'icon/car_1.png',
    iconSize:[50,39],
    iconAchor:[20,20],
    popupAnchor:[0,0]
});
var state=["run","stop"],animateState=state[0],myreg;
function run(markersList,speed){
    marker = L.marker(markersList[0].getLatLng(), {icon: animateIcon}).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).addTo(map).openPopup();
    markEnd = L.marker(markersList[markersList.length-1].getLatLng(), {icon: animateIcon}).setRotationAngle(markersList[markersList.length-1].properties.carHeading).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).addTo(map);
    var length = markersList.length-1;
    var j=0;
    animateState=state[0];
    myreg =window.requestAnimationFrame(jump);
    function jump() {
        if (j===length) {
            animateState=state[1];
            map.removeLayer(marker);
            markEnd.openPopup();
        } else {
            if(animateState==="stop") {
                marker.openPopup();
                window.cancelAnimationFrame(myreg);
            } else{
            marker.setLatLng(markersList[j].getLatLng()).setPopupContent(markersList[j]._popup._content).setRotationAngle(markersList[j].properties.carHeading).openPopup();
            var mapbound = map.getBounds();
            var inbound = mapbound.contains(marker.getLatLng());
            if (!inbound) map.setView(marker.getLatLng());
            window.cancelAnimationFrame(myreg);
            if (markersList[j].properties.type==="stop") {
                setTimeout(function () {
                    j++;
                    myreg=window.requestAnimationFrame(jump);
                },1000)}
                else {
                    setTimeout(function () {
                        j++;
                        myreg=window.requestAnimationFrame(jump);
                    },1000/speed)
                }}}}
    marker.on('click', function () {
        if (animateState===state[1]) {
            animateState = state[0];
            myreg=window.requestAnimationFrame(jump);
        }
        else animateState=state[1];
    });}
