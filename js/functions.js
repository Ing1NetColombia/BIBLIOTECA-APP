function cargarFormulario(nameForm,url) {
   
    //declaracion de variables para el llamado de los formularios
    //var url = 'libros.html';

    // Obtener el elemento por su ID
    var limpiar = document.getElementById(nameForm);

    // Limpiar el contenido utilizando innerHTML
    limpiar.innerHTML = '';

    // Realizar una solicitud de red mediante fetch
    fetch(url)
        .then(response => response.text())  // Obtener el contenido del archivo como texto
        .then(data => {
            // Insertar el contenido del formulario en el contenedor
            document.getElementById(nameForm).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el formulario:', error));

}

function iniciarSesion() {
    let usuario = document.getElementById("usuario").value;
    let contra = document.getElementById("contra").value;
    
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    console.log(usuarios);
    var usuarioLog = usuarios.filter(function(usuarioF){
        return (usuarioF["usuario"] == usuario);
    });

    if(usuarioLog.length == 0){
        alert("Usuario no encontrado");
        return;
    }

    if(usuarioLog[0]["contra"] != contra){
        alert("Contraseña incorrecta");
        return;
    }
    localStorage.setItem("usuario", JSON.stringify(usuarioLog[0]));
    window.location.href = "../pages/home.html";
}

function registroLibro(){
    let n_book = document.getElementById("name-book").value;
    let autor = document.getElementById("book-author").value;
    let editorial = document.getElementById("book-editorial").value;
    let y_public = document.getElementById("book-publication").value;
    let genero = document.getElementById("book-gender").value;

    var book = JSON.parse(localStorage.getItem("book")) || [];
       //alerta(book);
    var bookLog = book.filter(function(books_f){
        return (books_f["name-book"] == n_book);
    });

    if(bookLog.length > 0){
        alert("Usuario ya existe");
        return;
    }
    let booksT = { "name-book" : n_book,"book-author":autor, "book-editorial":editorial, "book-publication" : y_public, "book-gender" :genero }
    book.push(booksT);

    localStorage.setItem("book", JSON.stringify(book));
    alert("Registro completo");
    document.getElementById("formRegistro").reset();
}

