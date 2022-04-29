console.log("included js");

function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
function Display() {

}

Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let books = localStorage.getItem("books");
    let tbody = document.getElementById("tbody");
    if (books == null) {
        booksList = [];
    }
    else {
        booksList = JSON.parse(localStorage.getItem("books"));
    }
    booksList.push(book);
    localStorage.setItem("books", JSON.stringify(booksList));
    let deleteBtn = `<button type="button" class="btn btn-primary btn-sm">Delete</button>`;
    let html = `  
         <tr>
        
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.type}</td>
        <td>${deleteBtn}</td>
      </tr>`;
    tbody.innerHTML += html
    //   console.log(book)
 
}






Display.prototype.validate = function (book) {
    if (book.name.length < 3 || book.author.length < 3) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type, message) {
    let msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <strong>Message: </strong>${message}
         
                        </div>`
    setTimeout(function () {
        msg.innerHTML = "";
    }, 3000);
}







Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset("");
}
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let bookName = document.getElementById("bookname").value;
    let bookAuthor = document.getElementById("author").value;
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let fiction = document.getElementById("fiction");
    let type;
    if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    else {
        type = fiction.value;
    }

    console.log("form", bookAuthor, bookName, type)
    let book = new Book(bookName, bookAuthor, type);
  
    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added!')
    }
    else {
        display.show('danger', 'Your characters contain at least 3 characters')
    }


}



