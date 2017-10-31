'use strict';

/* Controllers */

var productApp = angular.module('productApp', []);

productApp.controller('productControl', function ($scope) {
    $scope.products = [
        {
            'id': 'rc670-10x15',
            'title': '10x15 cm ramme - Sølvfarvet alu ramme - PhoEco 670',
            'color': 'Sølv',
            'material': 'Aluminium',
            'outerWidth': '108',
            'outerHeight': '158',
            'innerWidth': '100',
            'innerHeight': '150',
            'price': '49,00 DKK',
            'url': 'https://www.hennetec.dk/rammer/?size=10x15cm',
            'stock': true
        },
        {
            'id': 'rc672-10x15',
            'title': '10x15 cm ramme - Mat sort aluramme - PhoEco 672',
            'color': 'Mat sort',
            'material': 'Aluminium',
            'outerWidth': '108',
            'outerHeight': '158',
            'innerWidth': '100',
            'innerHeight': '150',
            'price': '49,00 DKK',
            'url': 'https://www.hennetec.dk/rammer/sort672/10x15cm_rc672',
            'stock': true
        },
        {
            'id': 'rc7301-13x18',
            'title': '13x18 cm guld ramme - PhoEco 7301',
            'color': 'Guld',
            'material': 'Opskummet plastic',
            'outerWidth': '148',
            'outerHeight': '198',
            'innerWidth': '130',
            'innerHeight': '180',
            'price': '39,00 DKK',
            'url': 'https://www.hennetec.dk/rammer/guld7301/13x18cm_rc7301',
            'stock': false
        }
    ];

    $scope.selectedProducts = [];

    $scope.addItem = function(newProduct){
        $scope.selectedProducts.push(newProduct)
    }
})
    .component('draggableFrame', {
        templateUrl: 'templates/draggable.template.html',
        controllerAs: 'ctrl',
        replace: true,
        bindings: {
            product: '<'
        },
        controller: function($element) {
            console.log($element);
            var ctrl = this;

            ctrl.isRotated = false;


            ctrl.$onInit = function() {
                setDefaultDimensions();
                var $draggable = $($element);


                $draggable.draggable({
                    grid: [1, 1],
                    scroll: true,
                    containment: "parent"
                });

            }

            ctrl.rotate = function() {

                    if (!ctrl.isRotated) {
                        ctrl.outerWidth = ctrl.product.outerHeight;
                        ctrl.outerHeight = ctrl.product.outerWidth;
                        ctrl.innerWidth = ctrl.product.innerHeight;
                        ctrl.innerHeight = ctrl.product.innerWidth;
                    } else {
                        setDefaultDimensions()
                    }
                ctrl.isRotated = !ctrl.isRotated;

            }

            function setDefaultDimensions() {
                ctrl.outerWidth = ctrl.product.outerWidth;
                ctrl.outerHeight = ctrl.product.outerHeight;
                ctrl.innerWidth = ctrl.product.innerWidth;
                ctrl.innerHeight = ctrl.product.innerHeight;
            }

        }
    });
