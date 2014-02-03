//angular example

var libraryApp = angular.module('libraryApp', []);

libraryApp.factory('AvailableBooks', function() {
    return [
        {'title': 'Seventh Winter'},
        {'title': 'The Smooth Flame'},
        {'title': 'Snake of Thief'}
    ]
});

libraryApp.factory('CheckedOutBooks', function() {
    return [
        {'title': 'Slave in the Predator'},
        {'title': 'Secrets of Shards'}
    ]
});

//inject these into the controller you want to use them in
libraryApp.controller('LibraryCtrl', function ($scope, AvailableBooks, CheckedOutBooks) {
    $scope.availableBooks = AvailableBooks;
    $scope.checkedOutBooks = CheckedOutBooks;

    $scope.checkoutBook = function(book) {
        $scope.checkedOutBooks.push(book);
        $scope.availableBooks.splice($scope.availableBooks.indexOf(book),1)
    };

    $scope.returnBook = function(book) {
        $scope.availableBooks.push(book);
        $scope.checkedOutBooks.splice($scope.checkedOutBooks.indexOf(book),1)
    };

    $scope.addBook = function(book) {
//        console.log("adding book!", book);
        $scope.availableBooks.push({'title':book});
    };
});