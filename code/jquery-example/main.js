//jquery example

//function myfunction(bird, car, cat){
//    alert("my bird: "+bird);
//    alert("my car: "+car);
//}
//
//var myObject = {
//    "one": 1,
//    "two": 2,
//    "myarray": [
//        "bird",
//        "car",
//        "cat"
//    ],
//    "myfunction":function(bird, car, cat){
//        alert("my bird: "+bird);
//        alert("my car: "+car);
//    },
//    "myChildObject":{
//        "test":"myobject",
//        "testObject":{}
//    }
//
//};
//
//myObject["this prop"] = 3



//console.log("my console", myObject);


//cache our book lists dom elements
var availableBooks = $('#available-books');
var checkedOutBooks = $('#checked-out-books');

//checkout book
$(".checkout-book").click(function(){
//    alert("checking out book");
    var book = $(this).parent('li');
    checkedOutBooks.append(book);
});

//return book
$(".return-book").click(function(){
//    alert("returning book");
    var book = $(this).parent('li');
    availableBooks.append(book);
});

//add new book
$("#add-book").click(function(e){
    e.preventDefault();
//    alert("adding book");
    var newBookName = $('#book-name').val();
//    alert("new book name: ", newBookName);
    availableBooks.append('<li>'+newBookName+'<button type="button" class="btn btn-info btn-xs checkout-book">Checkout Book</button></li>');

});


$('li').hover(

    function(){
        console.log("this: ", this);
        $(this).find(".btn").removeClass("hidden");
    },

    function(){
        $(this).find(".btn").addClass("hidden");
    }
);