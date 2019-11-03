angular.module('whatsapp').controller('HomeController', (API_URL, $http, $scope) => {
    $scope.error = false;
    $scope.instances = [];
    $scope.input = {
        instance: null
    };

    $scope.list = () => {
        $http({
            url: API_URL + '/instances'
        }).then((response) => {
            $scope.instances = response.data.instances || [];
        }).catch(() => {
            $scope.error = true;
        });
    };

    $scope.start = () => {
        $http({
            url: API_URL + '/start/' + $scope.input.instance,
            method: 'POST'
        }).then((response) => {
            $scope.input.instance = null;
            $scope.list();
        })
    };

    $scope.list();

    return this;
});