﻿"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class DemoSalesPersonsController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupSalesTableDirective(ngApp);
    }


    public setupSalesTableDirective(ngApp: ng.IModule) {

        // define a directive and now we can use products in the html
        ngApp.directive("salesTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/demo/sales-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                    var sales = this;

                    console.log("starting controller DemoSalesPersonsController, Data=", Data.getCustomers());

                    var salesPersons = Data.getSalesPersons();

                    sales.salesPeopleFull = DemoSalesPersonsController.joinSalesData(salesPersons);
                    console.log("sales people full:", sales.salesPeopleFull);

                    // set an initial value to sort by
                    $scope.predicate = 'businessEntityId';
                    // set an initial reverse value
                    // false is ascending true is decending
                    $scope.reverse = false;

                    $scope.order = function (predicate) {
                        // if the same header is clicked on again reverse the sort boolean and set the current predicate
                        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : true;
                        $scope.predicate = predicate;
                    };

                    //reset the searchTerm and refocus to the search box
                    $scope.inputClear = function () {
                        $scope.searchTerm = "";
                        jQuery('.salesSearch').focus();
                    };
                }],
                // add an alias for a controller
                controllerAs: "SalesCtrl"
            };
        });
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


    public deregister(appTools: Main, view: DemoSalesPersonsController) {

    }

}

export = DemoSalesPersonsController;