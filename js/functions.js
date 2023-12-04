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
                            <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3" id = "name-book">${element["name-book"]}</h1>
                            <h4 class="fw-bold text-body-emphasis" id = "book-author">Autor: ${element["book-author"]}</h4>
                            <h4 class="fw-bold text-body-emphasis" id = "book-publication">Año de edicion: ${element["book-publication"]}</h4>
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
                          <h4 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold" id = "name-book">${element["name-book"]}</h4>
                          <h6 class="fw-bold" id = "book-author">Autor: ${element["book-author"]}</h6>
                          <h6 class="fw-bold" id="book-editorial">Editorial: ${element["book-editorial"]}</h6>
                          <ul class="d-flex list-unstyled mt-auto">
                            <li class="me-auto">
                              <img src="./assets/libro1.png" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                            </li>
                            <li class="d-flex align-items-center me-3">
                              <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"/></svg>
                              <h5><a href="#" onclick="reservarLibro()">reserva ya</h5>
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
  let usuario = document.getElementById("usuario_init").value;
  let contra = document.getElementById("contra_init").value;

  var users = JSON.parse(localStorage.getItem("user")) || [];
  
  // Buscar el usuario en el array
  var userLog = users.find(function(user) {
  
    return user["user"] === usuario;
  });

  if (!userLog) {
    alert("Usuario no encontrado");
    return;
  }

  if (userLog["pass"] !== contra) {
    alert("Contraseña incorrecta");
    return;
  }

  localStorage.setItem("usuarioActual", JSON.stringify(userLog));
  
  console.log("Antes de la redirección");
  
  // Cambiar la ubicación (URL) a "catalogo.html"
  window.location.href = "catalogo.html";
  
  // Este mensaje puede no mostrarse inmediatamente debido a la redirección
  console.log("Después de la redirección");
}

function registroUsuarios(){
  let usuarios = document.getElementById("usuario_init").value;
  let password = document.getElementById("contra_init").value;
  let email = document.getElementById("Email").value;

  var user = JSON.parse(localStorage.getItem("userlog")) || [];
       //alerta(book);
    var userLog = user.filter(function(user_f){
        return (user_f["user"] == usuarios);
    });
    alert(usuarios)
   if(userLog.length > 0){
      alert("Usuario ya existe");
      return;
  }
  let user_r = { "usuario_init" : usuarios,"contra_init":password,"Email" : email}
  user.push(user_r);

  localStorage.setItem("user", JSON.stringify(user));
    alert("Registro completo");
    document.getElementById("incio").reset();

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

function reservarLibro(){
  let name_book1 = document.getElementById("name-book");
  let name_book = name_book1.innerText;
  let autor1 = document.getElementById("book-author");
  let autor = autor1.innerText;
  let editorial1 = document.getElementById("book-editorial");
  let editorial = editorial1.innerText;
  let fecha = new Date();
  let fechaReserva = fecha.toISOString(); 


  var reserva = JSON.parse(localStorage.getItem("reserva")) || [];
     
  alert(name_book)

  var ReservaLog = reserva.filter(function(reserva_l){
      return (reserva_l["name-book"] == name_book);
  });

  if(ReservaLog.length > 0){
      alert("Usuario ya existe");
      return;
  }
  let ReservaL = { "name-book" : name_book,"book-author":autor, "book-editorial":editorial,"fecha_reserva" :fechaReserva }
  reserva.push(ReservaL);

  alert(JSON.stringify(ReservaL));  
  localStorage.setItem("reserva", JSON.stringify(reserva));
  alert("Registro completo");
  //document.getElementById("formRegistro").reset();
}

// Función para cargar dinámicamente el historial en la tabla
function cargarHistorial() {
  var tablaBody = document.getElementById("historialTablaBody");
  var datosGuardados = JSON.parse(localStorage.getItem("reserva"));

  datosGuardados.forEach(element => {
    var fila = document.createElement("tr");

    var celdaLibro = document.createElement("td");
    celdaLibro.textContent = element["name-book"];
    fila.appendChild(celdaLibro);

    var celdaAutor = document.createElement("td");
    celdaAutor.textContent = element["book-author"];  // Corregido el nombre de la variable
    fila.appendChild(celdaAutor);

    var celdaEditorial = document.createElement("td");
    celdaEditorial.textContent = element["book-editorial"];  // Corregido el nombre de la variable
    fila.appendChild(celdaEditorial);

    var celdaFecha = document.createElement("td");
    celdaFecha.textContent = element["fecha_reserva"];
    fila.appendChild(celdaFecha);

    tablaBody.appendChild(fila);
  });
}



