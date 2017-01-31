(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        BillingCycleController
    ])

    function BillingCycleController($http) {
        const vm = this /* VM = View Model (padrao Jonh Papper) */

        /* POST */
        vm.create = function() {
            const url = "https://controlefinanceiro-api.herokuapp.com/api/billingCycles"
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.billingCycle = {}
                console.log('Sucesso!')
            })
        }
    }

})()