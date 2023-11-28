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

            var datosGuardados = JSON.parse(localStorage.getItem("book"));

            switch (url) {
                case "catalago.html":
                    
                datosGuardados.forEach(element => {
                    
                    var plantilla = `<div class="container col-xxl-8 px-4 py-5">
                        <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                        <div class="col-10 col-sm-8 col-lg-6">
                            <img src="./assets/libro2.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
                        </div>
                        <div class="col-lg-6">
                            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${element["name-book"]}</h1>
                            <h4 class="fw-bold text-body-emphasis">Autor: ${element["book-author"]}</h4>
                            <h4 class="fw-bold text-body-emphasis">Año de edicion: ${element["book-publication"]}</h4>
                            <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                            <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                            </div>
                        </div>
                        </div>
                        </div>
                    
                         <div class="b-example-divider"></div>`
                
                        document.getElementById("libroteca").innerHTML += plantilla;    

                   });

                    break;
                case "reserva.html":

                   datosGuardados.forEach(element => {

                    var reservados = ` 
                    <div class="col">
                      <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('unsplash-photo-1.jpg');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                          <h3 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${element["name-book"]}</h3>
                          <ul class="d-flex list-unstyled mt-auto">
                            <li class="me-auto">
                              <img src="./assets/libro1.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                            </li>
                            <li class="d-flex align-items-center me-3">
                              <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"/></svg>
                              <small>Earth</small>
                            </li>
                            <li class="d-flex align-items-center">
                              <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#calendar3"/></svg>
                              <small>3d</small>
                            </li>
                          </ul>
                        </div>
                      </div>
                    `
 
                    document.getElementById("ticket").innerHTML += reservados;    


                   })

                    break;
            
                default:
                    break;
            }



            if (url == "catalago.html"){
                var datosGuardados = JSON.parse(localStorage.getItem("book"));
                console.log(datosGuardados)
            //    alert(datosGuardados)
                

                datosGuardados.forEach(element => {
                    
                    var plantilla = `<div class="container col-xxl-8 px-4 py-5">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <div class="col-10 col-sm-8 col-lg-6">
                        <img src="./assets/libro2.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
                      </div>
                      <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${element["name-book"]}</h1>
                        <h4 class="fw-bold text-body-emphasis">Autor: ${element["book-author"]}</h4>
                        <h4 class="fw-bold text-body-emphasis">Año de edicion: ${element["book-publication"]}</h4>
                        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                          <button type="button" class="btn btn-primary btn-lg px-4 me-md-2">Primary</button>
                          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Default</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div class="b-example-divider"></div>`
                
                    document.getElementById("libroteca").innerHTML += plantilla;    

                });

            }

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



