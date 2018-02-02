var interval;
function run(a) {
    length=a;
    marker = L.marker(markersList[length-1].getLatLng(), {icon: carIcon}).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).openPopup().addTo(map);
    markEnd = L.marker(markersList[0].getLatLng(), {icon: carIcon}).setRotationOrigin('center center').bindPopup(markersList[0]._popup._content).addTo(map);
    var delay = 10;
    var j = length-2;
    interval = setInterval(jump, delay);
    function jump() {
        if (j <=0) {
            marker.openPopup();
            stoploop();
        }
        else {
            //map.removeLayer(marker);
            //marker = markersList[j].setIcon(carIcon).setRotationAngle(data[j].properties.carHeading).openPopup().addTo(map);
            marker.setLatLng(markersList[j].getLatLng()).setPopupContent(markersList[j]._popup._content).setRotationAngle(markersList[j].properties.carHeading).update();
            var mapbound = map.getBounds();
            var inbound = mapbound.contains(marker.getLatLng());
            if (!inbound) map.setView(marker.getLatLng());
            stoploop();
            if (markersList[j].properties.delay > 0 && delay <= 50) {
                delay = markersList[j].properties.delay;
            } else if (markersList[j].properties.delay === 0 && delay > 50) {
                delay = 10;
            }
            j--;
            startloop(jump, delay);
        }
    }

    marker.on('click', function () {
        if (interval) stoploop();
        else if (!interval) startloop(jump,delay)
    });
}
function stoploop(){
    clearInterval(interval);
    interval=null;
}
function startloop(jump,delay){
    interval=setInterval(jump,delay)
}
