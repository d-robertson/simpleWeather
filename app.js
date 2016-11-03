//api key = 7c1036ddfe7bb328dfb9f941f670c99e;
//http://api.openweathermap.org/img/w/{code}.png

angular.module('weatherApp', [])

.run(['$rootScope', '$http', function($rootScope, $http){
  // var list  = {
  //   "clear-day", //clear sky
  //   "partly-cloudy-day", // broken clouds, few clouds 
  //   "cloudy", //scattered clouds
  //   "rain", //rain, shower rain, thunderstorm
  //   "snow", //snow
  //   "fog"  //mist
  // }


  function getLocation(){
    if(navigator.geolocation){
      // console.log(navigator.geolocation.getCurrentPositon());
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var req = {
          url: 'http://api.openweathermap.org/data/2.5/weather?APPID=7c1036ddfe7bb328dfb9f941f670c99e',
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
          $rootScope.icon = res.data.weather[0].description;
          console.log("Icon:", $rootScope.icon)

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

      var icons = new Skycons();

      var giph;

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
      }
     
      icons.set("icon1", giph);

      icons.play();

    }
    
  }

  getLocation();
}])

.controller('weatherCtrl', ['$scope', '$http', function($scope, $http){

  $scope.toggleDegrees = function(){

  }

}]);