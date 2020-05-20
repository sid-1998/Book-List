class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBook(book){
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class='delete'>X</a></td>
        `
        list.appendChild(row);
    }
    
    clearValues(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;

        div.appendChild(document.createTextNode(message));

        //get parent
        const card = document.querySelector('.card');
        //get child
        const form = document.querySelector('#book-form');

        //append element
        card.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);

    }
}
class Store{
     static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        console.log(isbn)
        const books = this.getBooks();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
    static displayBooks(){
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach(function(book){
            ui.addBook(book);
        })
    }
}
//Event Listners

//displaying books stored in LS
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//adding book after form submittion
document.getElementById('book-form').addEventListener('submit',
function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    if(title==='' || author==='' || isbn===''){
        ui.showAlert('Please check your inputs', 'danger');
    }
    else{
        // add book in UI
        ui.addBook(book);
        // add book in LS
        Store.addBook(book);
        //show alert
        ui.showAlert('Book Added!', 'success');
        //clear input fields after successful entry
        ui.clearValues();
    }
    e.preventDefault();
});

//remove book
document.getElementById('book-list').addEventListener('click',
function(e){
    const ui = new UI();
    //delete book from UI
    ui.deleteBook(e.target);
    //delete from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book Deleted', 'success');
    e.preventDefault();
});