(function() {
    angular.module('primeiraApp').controller('DashboardCtrl', [
        '$http',
        DasboardController
    ])

    function DasboardController($http) {
        const self = this
        self.getSummary = function() {
            const url = 'https://controlefinanceiro-api.herokuapp.com/api/billingSummary'
            $http.get(url).then(function(response) {
                const { credit = 0, debt = 0} = response.data
                self.credit = credit
                self.debt = debt
                self.total = credit - debt    
            })
        }

        self.getSummary()
    }
})()

