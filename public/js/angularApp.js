
var root = angular.module('root', ['ngResource','ngRoute']);
root.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html', 
            controller: 'MainController'
        })
        .otherwise('/');
});
root.controller('MainController', function($scope, socket, $log){
    $scope.title = "Socket io app";
    $scope.newTitle = "";
    $scope.changeTitle = function(){
        //$log.log($scope.newTitle);
        socket.emit('messages', { title: $scope.newTitle }, function(result){
            //$log.log(result);
        });
    } 
    socket.on('messages', function(data){
        $log.log(data);
        $scope.title = data.title; 
    });
});
root.factory('socket', function($rootScope){
    var socket = io.connect('http://localhost:8080');
    return{
        on: function(eventName, callback){
            socket.on(eventName, function(data){
                var args = arguments;
                $rootScope.$apply(function(){
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback){
            // console.log(data);
            // console.log(eventName);
            socket.emit(eventName, data, function(){
                var args = arguments;
                $rootScope.$apply(function(){
                    if(callback){
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }

});