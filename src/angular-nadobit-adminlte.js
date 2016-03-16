require('./app.js');

angular.module('nadobit.adminlte', [
])

.directive('nbAdminLte', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $.AdminLTE.init();
        }
    };
})

;