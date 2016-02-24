(angular => {
  'use strict';

  angular.module('asyncValidator')
  .directive('asyncValidator', ['$q', '$timeout', asyncValidator]);

  function asyncValidator($q, $timeout) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        validator: '&asyncValidator'
      },
      link: (scope, element, attrs, ngModel) => {

        let tout;

        ngModel.$asyncValidators.async = function(modelValue, viewValue) {
          const defered = $q.defer();
          $timeout.cancel(tout);
          tout = $timeout(() => {
            $q.when(scope.validator({ $value: modelValue }))
              .then(defered.resolve)
              .catch(defered.reject);
          }, 500);

          return defered.promise;
        };

      }
    };

  }

})(angular);
