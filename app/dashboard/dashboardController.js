(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        '$http',
        DasboardController
    ])

    function DasboardController($http) {
        /* vm = ViewModel */
        const vm = this 
        vm.getSummary = function() {
            const url = 'https://controlefinanceiro-api.herokuapp.com/api/billingSummary'
            $http.get(url).then(function(response) {
                const { credit = 0, debt = 0} = response.data
                vm.credit = credit
                vm.debt = debt
                vm.total = credit - debt    
            })
        }

        vm.getSummary()
    }
})()

