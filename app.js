//api key = 7c1036ddfe7bb328dfb9f941f670c99e;

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
          url: 'http://api.openweathermap.org/data/2.5/weather?APPID=7c1036ddfe7bb328dfb9f941f670c99e',
          method: 'GET',
          params: {
            lat: lat,
            lon: lng
          }
        }

        $http(req).then(function success(res){
          console.log('success: ', res);
          $rootScope.res = res.data;
        }, function error(res){
          console.log('error: ', res);
        })
      });
    } else {
      alert('No Browser Supported geolocation');
    }
  }

  getLocation();
}])

.controller('weatherCtrl', ['$scope', '$http', function($scope, $http){
  console.log($scope.res);

  $scope.showInfo = function() {
    console.log($scope.res);
  }
}]);