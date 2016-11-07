//api key =   sz4GkqTfOW0YRndljAcQ3lWV45rAnFyF;
//http://api.openweathermap.org/img/w/{code}.png

angular.module('weatherApp', [])

.run(['$rootScope', '$http', function($rootScope, $http){

  function getLocation(){
    if(navigator.geolocation){
      // console.log(navigator.geolocation.getCurrentPositon());
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var req = {
          url: '//api.openweathermap.org/data/2.5/weather?APPID=7c1036ddfe7bb328dfb9f941f670c99e',
          method: 'GET',
          params: {
            lat: lat,
            lon: lng,
            units: 'imperial'
          }
        }

        $http(req).then(function success(res){
          console.log('success: ', res);
          $rootScope.res = res.data;
          $rootScope.temp = Math.floor(res.data.main.temp);
          $rootScope.icon = res.data.weather[0].description;
          console.log("Icon:", $rootScope.icon);

          setIcon();

        }, function error(res){
          console.log('error: ', res);
        })
      });
    } else {
      alert('No Browser Supported geolocation');
    }

    //-------------------------------------------------
    function setIcon(){

      var icons = new Skycons({"color": "#eeb154"});

      var giph;

      console.log($rootScope.icon);

      switch($rootScope.icon) {
        case "mist": 
          giph = "fog"
          break;
        case "broken clouds":
          giph = "partly-cloudy-day"
          break;
        case "few clouds": 
          giph = "partly-cloudy-day"
          break;
        case "clear sky":
          giph = "clear-day"
          break;
        case "scattered clouds":
          giph = "cloudy"
          break;
        case "overcast clouds":
          giph = "cloudy"
          break;
        case "rain":
          giph = "rain"
          break;
        case "shower rain":
          giph = "rain"
          break;
        case "thunderstorm":
          giph = "rain"
          break;
        case "snow":
          giph = "snow"
          break;
        case "heavy intensity rain":
          giph = "rain"
          break;
      }
     
      icons.set("icon1", giph);

      icons.play();

    }
    
  }

  getLocation();
}])

.controller('weatherCtrl', ['$scope', '$http', function($scope, $http){

  $scope.letter = "F";

  $scope.toggleDegrees = function(){
    if($scope.letter === "F"){
      $scope.letter = "C";
      $scope.temp = Math.floor(($scope.temp - 32) * (5/9));
    } else {
      $scope.letter = "F";
      $scope.temp = Math.ceil(($scope.temp * (9/5)) + 32);
    }
  }

}]);