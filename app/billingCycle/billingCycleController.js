/*
 * messages = factory mensagemFactory
 * tabs = factory tabsFactory
 */

(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'messages',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, messages, tabs) {
        const vm = this /* VM = View Model (padrao Jonh Papper) */
        const apiUrl = "https://controlefinanceiro-api.herokuapp.com/api/billingCycles"

        /* GET */
        vm.refresh = function() {
            const page = parseInt($location.search().page) || 1
            const urlPage = `${apiUrl}?skip=${(page - 1) * 4}&limit=4`
            /* paginacao com node-restful - Ver documentacao abaixo
               https://github.com/baugarten/node-restful#limiting-the-number-and-skipping-items */ 
            $http.get(urlPage).then(function(response) {
                vm.billingCycle = {credits: [{}], debts: [{}]}
                vm.billingCycles = response.data
                vm.calculateValues()

                $http.get(`${apiUrl}/count`).then(function(response) {
                    vm.pages = Math.ceil(response.data.value / 4)
                    tabs.show(vm, {tabList: true, tabCreate: true})
                })
            })
        }

        /* POST */
        vm.create = function() {
            $http.post(apiUrl, vm.billingCycle).then(function(response) {
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
            const deleteUrl = `${apiUrl}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle).then(function(response) {
                vm.refresh()
                messages.addSuccess('Registro excluido com sucesso!')
            }).catch(function(response) {
                messages.addError(response.data.errors)
            })
        }

        /* PUT (update) */
        vm.update = function() {
            const updateUrl = `${apiUrl}/${vm.billingCycle._id}`
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
            vm.calculateValues()
        }

        vm.deleteCredit = function(index) {
            if (vm.billingCycle.credits.length > 1) {
                vm.billingCycle.credits.splice(index, 1)
                vm.calculateValues()
            }
        }

        /* DEBITOS */
        vm.addDebt = function(index) {
            vm.billingCycle.debts.splice(index + 1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}) {
            vm.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            vm.calculateValues()
        }

        vm.deleteDebt = function(index) {
            if (vm.billingCycle.debts.length > 1) {
                vm.billingCycle.debts.splice(index, 1)
                vm.calculateValues()
            }
        }

        
        vm.showTabUpdate = function(billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle) {
            vm.billingCycle = billingCycle
            vm.calculateValues()
            tabs.show(vm, {tabDelete: true})
        }

        vm.calculateValues = function() {
            vm.credit = 0
            vm.debt = 0

            if (vm.billingCycle) {
                vm.billingCycle.credits.forEach(function({value}) {
                    // se o valor nao tiver setado ou nao for um numero
                    vm.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                })

                vm.billingCycle.debts.forEach(function({value}) {
                    vm.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                })
            }

            vm.total = vm.credit - vm.debt
        }

        vm.refresh()
    }

})()