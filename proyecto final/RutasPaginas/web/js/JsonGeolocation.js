function buscarGeolocation(ip){
  var requestURL = 'http://ip-api.com/json/157.240.6.35';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
  var geolocation = request.response;
  populateHeader(geolocation);
}
}
function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['country'];
  header.appendChild(myH1);
  document.getElementsByName("pais").value = myH1;

  var myPara = document.createElement('p');
  myPara.textContent =  jsonObj['city'];
  header.appendChild(myPara);
}
