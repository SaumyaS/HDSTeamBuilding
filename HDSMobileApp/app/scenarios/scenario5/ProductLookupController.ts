﻿"use strict";
import Services = require("../../services/Services");
import Data = require("../../modules/Data");

class ProductLookupController implements WidgetView<any> {

    public initView(appTools: Main, ngApp: ng.IModule) {
        // NOTE: DO NOT 'angular.module(...)', use the 'ngApp' parameter above
        this.setupProductLookupDirective(ngApp);
    }


    public setupProductLookupDirective(ngApp: ng.IModule) {

        // define a directive and now we can use products in the html
        ngApp.directive("productTable", function () {
            return {
                // E is for element we are defining our own element
                // A is for attribute if you were to use directive as an attribute
                restrict: "E",
                //point to html file
                templateUrl: "/app/scenarios/scenario5/product-table.html",
                //add in a controller
                controller: ["$scope", "$http", function ($scope, $http) {

                    //get all the products and set them as an instance variable for the controller
                    this.products = Data.getProducts();

                    // set an initial value to sort by
                    $scope.predicate = 'productId';
                    // set an initial reverse value
                    // false is ascending true is decending
                    // Made a decision to start by decending because the data looked nicer that way on the table
                    $scope.reverse = true;

                    $scope.order = function (predicate) {
                        // if the same header is clicked on again reverse the sort boolean and set the current predicate
                        $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
                        $scope.predicate = predicate;
                    };

                    //reset the searchTerm and refocus to the search box
                    $scope.inputClear = function () {
                        $scope.searchTerm = "";
                        jQuery('.salesSearch').focus();
                    };

                    //this function is called when a user clicks on a table row
                    //the product the user clicked on is passed in as product
                    $scope.showProduct = function (product) {
                        //set the scope variables 
                        $scope.product = product;
                    };
                }],
                // add an alias for a controller
                controllerAs: "ProdCtrl"
            };
        });
    }

    public deregister(appTools: Main, view: ProductLookupController) {

    }

}

export = ProductLookupController;