/**
 * Essa factory esconde e exibe as tabs
 * Ao chama - las, todas são falsas (para exibir) por padrão.
 * Para chamar é so passar "true" na tab que deseja exibir
 */

(function() {
    angular.module('primeiraApp').factory('tabs', [ TabsFactory])

    function TabsFactory() {

        function show(owner, {
            tabList = false,
            tabCreate = false,
            tabUpdate = false,
            tabDelete = false
        }) {
            owner.tabList = tabList
            owner.tabCreate = tabCreate
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
        }

        return { show }
    }
})()