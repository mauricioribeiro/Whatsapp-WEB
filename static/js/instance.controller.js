angular.module('whatsapp').controller('InstanceController', (API_URL, $http, $scope, $location) => {
    $scope.instance = {};
    $scope.messages = [];
    $scope.input = {
        msg: {
            to: null,
            message: null
        },
        file: null
    };

    let socket = io('http://localhost:8001');

    $scope.get = () => {
        let params = $location.absUrl().split('/');

        $http.get(API_URL + '/status/' + params[params.length - 1])
            .then((response) => {
                $scope.instance = response.data;

                socket.emit('subscribe', {channel: '/instances/' + $scope.instance.instance });

                socket.on('checkin', (instance) => {
                    console.log(instance);
                    $scope.instance = instance;
                    $scope.$apply();
                });

                socket.on('receive', (message) => {
                    console.log(message);
                    $scope.messages.unshift(message);
                    $scope.$apply();
                });
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

    $scope.stop = () => {
        $http.post(API_URL + '/stop/' + $scope.instance.instance)
            .then((response) => {
                alert('Instancia reiniciada!');
            });
    };

    $scope.isImage = (message) => {
        return message && message.match(/^\/[^"]*/gm) != null;
    };

    $scope.getImage = (image) => {
        return 'data:image/png;base64,' + image;
    };

    $scope.get();

    return this;
});