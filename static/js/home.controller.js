angular.module('whatsapp').controller('HomeController', ($http, $scope) => {
    const api = 'http://localhost:8080/api';

    $scope.error = false;
    $scope.instances = [];
    $scope.input = {
        instance: null
    };

    $scope.list = () => {
        $http({
            url: api + '/instances'
        }).then((response) => {
            $scope.instances = response.data.instances || [];
        }).catch(() => {
            $scope.error = true;
        });
    };

    $scope.start = () => {
        $http({
            url: api + '/start/' + $scope.input.instance,
            method: 'POST'
        }).then((response) => {
            $scope.input.instance = null;
            $scope.list();
        })
    };

    $scope.list();

    return this;
});