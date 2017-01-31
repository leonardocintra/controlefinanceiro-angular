/* 
    model: '=' . 
    É um binding de duas direcoes, ou seja, o controller é alimentado por aqui, algo assim: 
    Tudo que for alterado no componente sera refletido no controller e vice e versa
    Acaba usando uma diretiva do Angular (controller) ng-model (ver template abaixo)
    explicacao para relembrar: https://www.udemy.com/mean-primeira-aplicacao-do-zero/learn/v4/t/lecture/6192108

    minuto da explicacao: 9:31 min
*/

(function() {
    angular.module('primeiraApp').component('field', {
        bindings:{
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=',
        },
        controller: [
            'gridSystem',
            function(gridSystem) {
                const self = this
                this.$onInit = function() {
                    self.gridClasses = gridSystem.toCssClasses(self.grid)
                };
            }
        ],
        template: `
            <div class="{{ $ctrl.gridClasses }}">
                <div class="form-group">
                    <label for="{{ $ctrl.id}}">{{ $ctrl.label }}</label>
                    <input id="{{ $ctrl.id}}" class="form-control" placeholder="{{ $ctrl.placeholder }}"
                        type="{{ $ctrl.type }}" ng-model="$ctrl.model" >
                </div>
            </div>
        `
    })
})()