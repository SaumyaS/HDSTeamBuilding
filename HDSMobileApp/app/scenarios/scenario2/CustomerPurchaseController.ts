"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class CustomerPurchaseController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupCustomerPurchaseDirective(ngApp);
    }


    public setupCustomerPurchaseDirective(ngApp: ng.IModule) {

        // define a directive and now we can use products in the html
        ngApp.directive("customerTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/scenario2/customer-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {
                    
                    //get all the territories and set them as an instance variable for the controller
                    this.customers = Data.getCustomers().slice(0,50);
                    console.log(this.customers);

                    // set an initial value to sort by
                    $scope.predicate = 'customerID';
                    // set an initial reverse value
                    // false is ascending true is decending
                    // Made a decision to start by decending because the data looked nicer that way on the table
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

                    //this function is called when a user clicks on a table row
                    //the product the user clicked on is passed in as product
                    $scope.showTerritory = function (territory) {
                        //var tempObj = {};
                        //jQuery.extend(tempObj, territory);
                        //jQuery.extend(tempObj, Data.getSalesPeopleByTerritoryId(territory.territoryId));
                        //jQuery.extend(tempObj, tempObj.businessEntityId);
                        var person = Data.getPersonById();
                        var employees = Data.getEmployees();

                        for (var i = 0; i < salesPeople.length; i++) {

                            for (var j = 0; j < employees.length; j++) {

                                if (salesPeople[i].businessEntityId == employees[j].businessEntityId) {
                                    jQuery.extend(salesPeople[i], employees[j]);
                                }
                            }
                        }
                        console.log(salesPeople);
                        $scope.terrSalesPeople = salesPeople;
                        $scope.territory = territory;
                    };
                }],
                // add an alias for a controller
                controllerAs: "CustomerCtrl"
            };
        });
    }

    public deregister(appTools: Main, view: CustomerPurchaseController) {

    }

}

export = CustomerPurchaseController;