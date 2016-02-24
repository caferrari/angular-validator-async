(angular => {
  'use strict';

  angular.module('validatorAsync', [])
  .directive('validatorAsync', ['$q', '$timeout', validatorAsync]);

  function validatorAsync($q, $timeout) {

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        validator: '&validatorAsync'
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
