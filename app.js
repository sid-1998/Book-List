function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


function UI() {}

UI.prototype.addBook = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
}

UI.prototype.clearValues = function(){
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
}
document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    book = new Book(title, author, isbn);
    
    const ui = new UI();
    ui.addBook(book);
    ui.clearValues();
    e.preventDefault();
})