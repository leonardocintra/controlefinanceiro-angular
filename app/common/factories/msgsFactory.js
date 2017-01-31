(function() {

    angular.module('primeiraApp').factory('msgs', [
        'toastr',
        MsgsFactory
    ])

    function MsgsFactory(toastr) {
        
        /* Metodo interno - Nao retorna */
        function addMessage(msgs, title, method) {
            if (msgs instanceof Array) {
                // percorre o arry de mensagens para mandar uma por uma
                msgs.forEach(msg => toastr[method](msg, title))
            }
            else {
                toastr[method](msgs, title)
            }
        }

        function addSuccess(msgs) {
            addMessage(msgs, 'Sucesso', 'success')
        }

        function addError(msgs) {
            addMessage(msgs, 'Erro', 'error')
        }

        // TO DO: addWarning

        return { addSuccess, addError }
    }
})()