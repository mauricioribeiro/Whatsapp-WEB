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

        $http.get(API_URL + '/status/' + params[params.length - 1])
            .then((response) => {
            $scope.instance = response.data;
        });
    };

    $scope.canSend = () => {
        return $scope.input.msg.to && $scope.input.msg.message && $scope.instance.status === 'CONNECTED';
    };

    $scope.send = () => {
        let msg = $scope.input.msg;
        msg.to = '55' + msg.to;

        $http.post(API_URL + '/send/' + $scope.instance.instance, msg)
            .then((response) => {
                alert('Mensagem enviada!');
            });
    };

    $scope.get();

    return this;
});