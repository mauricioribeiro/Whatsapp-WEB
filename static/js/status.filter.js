angular.module('whatsapp').filter('status', ($sce) => {
    return (status) => {
        let label = '';

        if (status === 'STARTING')
            label = '<span class="badge badge-warning">Iniciando</span>';

        if (status === 'QR_CODE')
            label = '<span class="badge badge-info">Aguardando QR</span>';

        if (status === 'CONNECTED')
            label = '<span class="badge badge-success">Conectado</span>';

        if (status === 'DISCONNECTED')
            label = '<span class="badge badge-secondary">Offline</span>';

        return $sce.trustAsHtml(label);
    };
  });