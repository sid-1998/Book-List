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

//Event Listners
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
        ui.addBook(book);
        ui.showAlert('Book Added!', 'success');
        ui.clearValues();
    }
    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',
function(e){
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Deleted', 'success');
    e.preventDefault();
});