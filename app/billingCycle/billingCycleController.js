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
                vm.billingCycle = {credits: [{}], debts: [{}]}
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
            /*   Em vm.delete e vm.update não precisa do paramtro pois o vm.biilingCycle é 
             * setado quando invoca o metodo showTabDelete e showTabUpdate */
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Registro excluido com sucesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        /* PUT (update) */
        vm.update = function() {
            const updateUrl = `${url}/${vm.billingCycle._id}`
            $http.put(updateUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Registro atualizado com sucoesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        /* CREDITOS */
        vm.addCredit = function(index) {
            // index = http://www.w3schools.com/jsref/jsref_splice.asp
            vm.billingCycle.credits.splice(index + 1, 0, {})
        }

        vm.cloneCredit = function(index, {name, value}) {
            vm.billingCycle.credits.splice(index + 1, 0, {name, value})
        }

        vm.deleteCredit = function(index) {
            if (vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1)
            }
        }

        /* DEBITOS */
        vm.addDebt = function(index) {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}) {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        }

        vm.deleteDebt = function(index) {
            if (vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
            }
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