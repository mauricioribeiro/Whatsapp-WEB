angular.module('whatsapp').controller('InstanceController', (API_URL, $http, $scope, $location) => {
    $scope.instance = {};
    $scope.input = {
        msg: {
            to: null,
            message: null
        },
        file: null
    };

    $scope.get = () => {
        let params = $location.absUrl().split('/');

        $http({
            url: API_URL + '/status/' + params[params.length - 1]
        }).then((response) => {
            $scope.instance = response.data;
        })
    };

    $scope.canSend = () => {
        return $scope.input.msg.to && $scope.input.msg.message && $scope.instance === 'ONLINE';
    };

    $scope.send = () => {

    };

    $scope.get();

    return this;
});