//backbone example

// Create a model for the books
var Book = Backbone.Model.extend({

    // Will contain three attributes.
    // These are their default values

    defaults:{
        title: '',
        checked_out: false
    },

    // Helper function for checking out a book
    toggleCheckedOut: function(){
        this.set('checked_out', !this.get('checked_out'));
    }
});

// Create a collection of books
var BooksList = Backbone.Collection.extend({

    // Will hold objects of the Book model
    model: Book,

    // Return an array only with the checked out books
    getCheckedOutBooks: function(){
        return this.where({checked_out:true});
    },
    // Return an array only with the checked books
    getReturnedBooks: function(){
        return this.where({checked_out:false});
    }
});

// Prefill the collection with a number of books.
var books = new BooksList([
    new Book({ title: 'Seventh Winter', checked_out: false}),
    new Book({ title: 'The Smooth Flame', checked_out: false}),
    new Book({ title: 'Snake of Thief', checked_out: false}),
    new Book({ title: 'Slave in the Predator', checked_out: true}),
    new Book({ title: 'Secrets of Shards', checked_out: true})
]);

// This view turns a Book model into HTML. Will create LI elements.
var BookView = Backbone.View.extend({
    tagName: 'li',
    checkOutBookMarkup: '<button type="button" class="btn btn-info btn-xs checkout-book">Checkout Book</button>',
    returnBookMarkup: '<button type="button" class="btn btn-warning btn-xs return-book">Return Book</button>',


    events:{
        'click .btn': 'toggleBook'
    },

    initialize: function(){

        // Set up event listeners. The change backbone event
        // is raised when a property changes (like the checked out field)

        this.listenTo(this.model, 'change', this.render);
    },

    render: function(){

        // Create the HTML and show proper button

        //first check book checked out status
        var checkedOut = this.model.get("checked_out");
        var buttonHtml = "";

        if (checkedOut) {
            buttonHtml = this.returnBookMarkup
        } else {
            buttonHtml = this.checkOutBookMarkup
        }

        this.$el.html(this.model.get('title')+buttonHtml);

        // Returning the object is a good practice
        // that makes chaining possible
        return this;
    },

    toggleBook: function(){
        this.model.toggleCheckedOut();
    }
});

// The main view of the application
var App = Backbone.View.extend({

    // Base the view on an existing element
    el: $('.container'),

    initialize: function(){

        this.availableBooksList = $('#available-books');
        this.checkedOutBooksList = $('#checked-out-books');
        this.bookNameInput = $('#book-name');

        // Listen for the change event on the collection.
        // This is equivalent to listening on every one of the 
        // book objects in the collection.
        this.listenTo(books, 'change', this.render);
        this.listenTo(books, 'add', this.render);

        // Create views for every one of the books in the
        // collection and add them to the page
        this.render()
    },

    render: function(){

        // Refreshes proper book lists as the collection changes
        this.availableBooksList.empty();
        this.checkedOutBooksList.empty();

        books.each(function(book){

            var view = new BookView({ model: book });

            if (book.get("checked_out"))
                this.checkedOutBooksList.append(view.render().el);
            else
                this.availableBooksList.append(view.render().el);

        }, this);	// "this" is the context in the callback

        return this;
    },

    addBook: function(e){
        e.preventDefault();
//        alert("adding book"+this.bookNameInput.val());
        var bookName = this.bookNameInput.val();
        var newBook = new Book({ title: bookName});

        books.add(newBook);
    },

    events: {
        'click #add-book': 'addBook'
    }

});

new App();
