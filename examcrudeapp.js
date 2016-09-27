/**
* Created by authorName.
*/
		
import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import moduleNameComponent from './moduleName.component';
import ocLazyLoad from 'oclazyload';

let examcrudeappModule = angular.module('examcrudeapp', [
  uiRouter
  , ocLazyLoad
])

.config(($stateProvider, $compileProvider) => {
  "ngInject";
  $stateProvider
    .state('examcrudeapp', {
      url: '/examcrudeapp',
      template: '<examcrudeapp></examcrudeapp>'
      ,

     resolve: {

        loadComponent: ($q, $ocLazyLoad,$translatePartialLoader) => {
          $translatePartialLoader.addPart('examcrudeapp');

           var deferred = $q.defer();

           require.ensure([], function(require) {
           let component = require('./examcrudeapp.component');

              $ocLazyLoad.inject([
               // component.name
             ])
            .then(

            	() => $compileProvider.directive('examcrudeapp', 
            		    function (){
            			   return component;
					          }
            		)
            	)

            .then(deferred.resolve);

          }, 'examcrudeapp'); // Name our bundle so it shows up pretty in the network tab

           return deferred.promise
         }
      }
    });
});
export default examcrudeappModule;

