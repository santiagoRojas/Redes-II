function creaarBat()
{
    var textToWrite = document.getElementById("inputTextToSave").value;
    var comandoRuta = "echo este programa mostrara la ruta para llegar a "+textToWrite+" \n\r pause \n\r tracert ";
    var comandoGuardarTxt=" > ruta.txt \n\r pause";
    var textFileAsBlob = new Blob([comandoRuta+textToWrite+comandoGuardarTxt], {type:'text/plain'});
    var fileNameToSaveAs = "Ruta.bat";


    var downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;

    downloadLink.innerHTML = "My Hidden Link";


    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

var archivoTxt = new XMLHttpRequest();
var fileRuta = ruta.txt";
function leerArchivo() {
  archivoTxt.open("GET",fileRuta,false);
  archivoTxt.send(null);
  var txt = archivoTxt.responseText;
  mostrarContenido(txt);
}
function mostrarContenido(archivo){
  var accionador = false;
  var ip = "";
  for (var i=0; i<archivo.length; i++)
      {
        var caracter = archivo[i];
        if (caracter == "]"){
            accionador=false;
            buscarGeolocation(ip);
            ip = "";
          }
        if(accionador == true){
          ip += caracter;
        }
        if (caracter == "["){
            accionador=true;
          }

      }
}

function buscarGeolocation(ip){
  var requestURL = 'http://ip-api.com/json/'+ip;
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
  var geolocation = request.response;
  escribir(geolocation);
  dibujar(geolocation);
}
}
var allDirection = "<br>Estos son los saltos para llegar a DESTINO: <br>";
function escribir(jsonObj) {
  allDirection +="<br> Direccion ip: "+ jsonObj['query']+" <br> Pais: "+jsonObj['country']+" <br> Ciudad: "+jsonObj['city']+" <br> ISP: "+jsonObj['isp']+"<br> <br>";
   document.getElementById("geolocal").innerHTML = allDirection;
}
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
center: {lat: 43.5293, lng: -5.6773},
    zoom: 3,
  });
  }
  var flightPlanCoordinates =[];
function dibujar(jsonObj) {

   var marker = new google.maps.Marker({
     position: {lat: jsonObj['lat'], lng: jsonObj['lon']},
     map: map
   });
   flightPlanCoordinates.push({lat: jsonObj['lat'], lng: jsonObj['lon']});
}
function trazar(){
  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);

}
