var db = null;

angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite,$window) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
 
      db = window.openDatabase("mydb","default","Demo","sqlitedemo"); //device
    

    // db = window.openDatabase("mydb","1.0","Demo","sqlitedemo");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXIST people (id integer primary key, firstname text, lastname text)");
  });
})

.controller('AccountController', function($scope, $cordovaSQLite) {

  $scope.accounts = function() {
    var query = "SELECT firstname, lastname FROM people";
    $cordovaSQLite.execute(db, query);
  }

  $scope.addAccount = function(){
    var query = "INSERT INTO people (firstname, lastname) VALUES (?, ?)";
    $cordovaSQLite.execute(db, query, [$scope.firstnameText, $scope.lastnameText]);
    $scope.firstnameText = '';
    $scope.lastnameText = '';
  }

});