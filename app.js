//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {}

//UI prototype

//adding a book
UI.prototype.addBook = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

// clearing values after submition
UI.prototype.clearValues = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
//showing alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));

    // get parent
    const card = document.querySelector('.card');
    //get child
    const form = document.querySelector('#book-form');

    card.insertBefore(div, form);
    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)
}
//deleting a book
UI.prototype.deleteBook = function(target){
    console.log("I am here")
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}



//Event Listners
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    const book = new Book(title, author, isbn);
    const ui = new UI();

    //Validation
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please enter valid inputs', 'danger')
    }
    else{
        //add a book
        ui.addBook(book);
        //show success alert
        ui.showAlert("Book Added!!", 'success')
        //clear input fields after submitting
        ui.clearValues();
    }
    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert("Book deleted!", "success")
    e.preventDefault();
});

