"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class SalesPersonController implements WidgetView<any>{

    public initView(appTools: Main, ngApp: ng.IModule) {
        this.setupSalesPersonLookupDirective(ngApp);
    }

    public setupSalesPersonLookupDirective(ngApp: ng.IModule) {
        ngApp.directive('salesTable', function () {
            return {
                restrict: "E",
                templateUrl: "/app/scenarios/scenario1/salesperson-table.html",
                controller: ["$scope", "$http", function ($scope, $http) {
                    var salesPersons = [],
                        sales = this;

                    salesPersons = Data.getSalesPersons();

                    console.log(salesPersons);

                    sales.salesPersonFull = SalesPersonController.joinSalesData(salesPersons);
                    var peopleArray = sales.salesPersonFull;

                    console.log(sales.salesPersonFull);

                    $scope.inputClear = function () {
                        $scope.searchTerm = "";
                        jQuery('.salesSearch').focus();
                    };

                    $scope.doSearch = function () {
                        var searchTerm = this.value,
                            tempArray = peopleArray,
                            namesReturned = [];
                        console.log("test1", searchTerm);

                        if (searchTerm == "") {
                            return;
                        } else {
                            for (var i = 0; i < tempArray.length; i++) {
                                var firstName = tempArray[i].firstName;
                                var lastName = tempArray[i].lastName;

                                firstName = angular.lowercase(firstName);
                                lastName = angular.lowercase(lastName);

                                if (firstName.indexOf(searchTerm) > -1) {
                                    namesReturned[i] = tempArray[i];
                                    //$scope.tempArray.splice(i, 1);
                                }

                            }

                            //sales.salesPersons = namesReturned;
                            console.log("tesst", namesReturned);
                        }


                        
                    };
                    // TODO debugging

                    // console.log("starting controller SalesPersonsController, sales=", Data.getSalesPersons());
                }],
                controllerAs: "salesPersonCtrl"               
            };
        });

        //ngApp.directive('ngModelSearchuser', function () {
        //    return {
        //        restrict: "A",
        //        require: 'ngModel',
        //        priority: 1,
        //        link: function (scope, elm, attr, ngModelCtrl) {
        //            elm.bind('blur', function () {
        //                scope.$apply(function () {
        //                    ngModelCtrl.$setViewValue(elm.val());
        //                });
        //            });
        //        }
        //    };     
        //});
    }

    public static joinSalesData(salesPersons: Models.SalesPerson[]): Models.SalesPerson[] {
        // loop through all sales people
        for (var i = 0; i < salesPersons.length; i++) {
            // loop through all employees to find a record that matches for the current sales person in loop
            var employee = Data.getEmployeeById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], employee);

            // loop through all person records for a matching sales person
            var person = Data.getPersonById(salesPersons[i].businessEntityId);
            jQuery.extend(salesPersons[i], person);
        }

        return salesPersons;
    }
 

    public deregister(appTools: Main, view: SalesPersonController) {

    }

}

export = SalesPersonController;