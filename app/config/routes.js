(function() {
    // esses modulos fazem parte do ui-router (angular)
    // templates sao carregados no ui-view no index.hmml
    // ui-sref = state('dashboard'...)

    angular.module('primeiraApp').config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider.state('dashboard', {
                url: "/dashboard",
                templateUrl: "dashboard/dashboard.html"
            }).state('billingCycle', {
                url: "/billingCycles",
                templateUrl: "billingCycle/tabs.html"
            })

            $urlRouterProvider.otherwise('/dashboard')
        }
    ])

})()
