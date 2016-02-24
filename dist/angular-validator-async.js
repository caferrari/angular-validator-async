'use strict';

(function (angular) {
  'use strict';

  angular.module('asyncValidator').directive('asyncValidator', ['$q', '$timeout', asyncValidator]);

  function asyncValidator($q, $timeout) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        validator: '&asyncValidator'
      },
      link: function link(scope, element, attrs, ngModel) {

        var tout = undefined;

        ngModel.$asyncValidators.async = function (modelValue, viewValue) {
          var defered = $q.defer();
          $timeout.cancel(tout);
          tout = $timeout(function () {
            $q.when(scope.validator({ $value: modelValue })).then(defered.resolve).catch(defered.reject);
          }, 500);

          return defered.promise;
        };
      }
    };
  }
})(angular);