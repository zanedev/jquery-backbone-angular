//angular example

var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('LibraryCtrl', function ($scope) {

    $scope.availableBooks = [
        {'title': 'Seventh Winter'},
        {'title': 'The Smooth Flame'},
        {'title': 'Snake of Thief'}
    ];
    $scope.checkedOutBooks = [
        {'title': 'Slave in the Predator'},
        {'title': 'Secrets of Shards'}
    ];

    $scope.checkoutBook = function(index) {
//        alert("checking out book: ", index);
        $scope.checkedOutBooks.push($scope.availableBooks[index]);
        $scope.availableBooks.splice(index,1)
    };

    $scope.returnBook = function(index) {
        $scope.availableBooks.push($scope.checkedOutBooks[index]);
        $scope.checkedOutBooks.splice(index,1)
    };

    $scope.addBook = function(book) {
//        console.log("adding book!", book);
        $scope.availableBooks.push({'title':book});
    };
});