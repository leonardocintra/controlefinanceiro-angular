/*
 * messages = factory mensagemFactory
 * tabs = factory tabsFactory
 */

(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        'messages',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, messages, tabs) {
        const vm = this /* VM = View Model (padrao Jonh Papper) */
        const url = "https://controlefinanceiro-api.herokuapp.com/api/billingCycles"

        /* GET */
        vm.refresh = function() {
            $http.get(url).then(function(response) {
                vm.billingCycle = {}
                vm.billingCycles = response.data
                tabs.show(vm, {tabList: true, tabCreate: true})
            })
        }

        /* POST */
        vm.create = function() {
            $http.post(url, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Operação realizada com sucesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        /* DELETE */
        vm.delete = function() {
            // não precisou passar o parametro, pois ja vem no metodo showTabDelete que ja seta o billingCycle
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Registro excluido com sucesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        
        vm.showTabUpdate = function(billingCycle) {
            vm.billingCycle = billingCycle
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle) {
            vm.billingCycle = billingCycle
            tabs.show(vm, {tabDelete: true})
        }

        vm.refresh()
    }

})()