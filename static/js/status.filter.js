angular.module('whatsapp').filter('status', ($sce) => {
    return (status) => {
        let label = '';

        if (status === 'STARTING')
            label = '<span class="badge badge-warning">Iniciando</span>';

        if (status === 'READY')
            label = '<span class="badge badge-info">Aguardando QR</span>';

        if (status === 'ONLINE')
            label = '<span class="badge badge-success">Online</span>';

        if (status === 'OFFLINE')
            label = '<span class="badge badge-secondary">Offline</span>';

        return $sce.trustAsHtml(label);
    };
  });