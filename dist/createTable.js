function CreateTableFromJSON(data) {
    // EXTRACT VALUE FOR HTML HEADER.
    // ('Book ID', 'Book Name', 'Category' and 'Price')
    var rows = [];
    rows.push(Object.keys(data.geometry)[1]);
    for (var key in data.properties) {
        if (rows.indexOf(key) === -1) {
            rows.push(key);
        }
    }
    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.
    var tr=table.insertRow(-1);
    var cell =tr.insertCell(-1);
    cell.colSpan=2;
    cell.innerHTML='<h3>'+data.properties.deviceId+'</h3>';
    tr=table.insertRow(-1);
    var cell0 =tr.insertCell(-1);
    cell0.innerHTML=rows[0];
    var cell1=tr.insertCell(-1);
    cell1.innerHTML=data.geometry[rows[0]];
    for (var i = 1; i <rows.length; i++) {
        tr = table.insertRow(-1);
        cell0=tr.insertCell(-1);
        cell0.innerHTML = rows[i];
        cell1=tr.insertCell(-1);
        cell1.innerHTML = data.properties[rows[i]]
    }


    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    return table;
}