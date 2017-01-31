/*
 * msgs = factory mensagemFactory
 */

(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'msgs',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs) {
        const vm = this /* VM = View Model (padrao Jonh Papper) */
        const url = "https://controlefinanceiro-api.herokuapp.com/api/billingCycles"

        /* POST */
        vm.create = function() {
            $http.post(url, vm.billingCycle).then(function(response) {
            vm.billingCycle = {}
                msgs.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                msgs.addError(response.data.errors)
            })
        }
    }

})()