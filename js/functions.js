window.addEventListener("load", function(){
  if(document.getElementById("MenuLibros")){
    let usuAct = JSON.parse(localStorage.getItem("usuarioActual"));
  
    if(usuAct["rol"] == 2){
      document.getElementById("MenuLibros").style.display = "none";
    }
  }
  
})

function cargarFormulario(nameForm, url) {
  //declaracion de variables para el llamado de los formularios
  //var url = 'libros.html';

  // Obtener el elemento por su ID
  var limpiar = document.getElementById(nameForm);

  // Limpiar el contenido utilizando innerHTML
  limpiar.innerHTML = "";

  // Realizar una solicitud de red mediante fetch
  fetch(url)
    .then((response) => response.text()) // Obtener el contenido del archivo como texto
    .then((data) => {
      // Insertar el contenido del formulario en el contenedor
      document.getElementById(nameForm).innerHTML = data;

      var datosGuardados = JSON.parse(localStorage.getItem("book"));

      switch (url) {
        case "catalago.html":
          datosGuardados.forEach((element) => {
            var plantilla = `<div class="container col-xxl-8 px-4 py-5">
            <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div class="col-10 col-sm-8 col-lg-6">
                <img src="${element["book-image"]}" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
              </div>
              <div class="col-lg-6">
                <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${element["name-book"]}</h1>
                <h4 class="fw-bold text-body-emphasis">Autor: ${element["book-author"]}</h4>
                <h4 class="fw-bold text-body-emphasis">Año de edicion: ${element["book-publication"]}</h4>
                <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button onclick="eliminarLibro('${element["name-book"]}')" type="button" class="btn btn-danger btn-lg px-4 me-md-2">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        
          <div class="b-example-divider"></div>`;

            document.getElementById("libroteca").innerHTML += plantilla;
          });

          break;
        case "reserva.html":
          datosGuardados.forEach((element) => {
            var reservados = ` 
                    <div class="col">
                      <div class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg" style="background-image: url('${element["book-image"]}');">
                        <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                          <h4 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold text-dark" id = "name-book">${element["name-book"]}</h4>
                          <h6 class="fw-bold text-dark" id = "book-author">Autor: ${element["book-author"]}</h6>
                          <h6 class="fw-bold text-dark" id="book-editorial">Editorial: ${element["book-editorial"]}</h6>
                          <ul class="d-flex list-unstyled mt-auto">
                            <li class="me-auto">
                              <img src="${element["book-image"]}" alt="Bootstrap" width="32" height="32" class="rounded-circle border border-white">
                            </li>
                            <li class="d-flex align-items-center me-3">
                              <svg class="bi me-2" width="1em" height="1em"><use xlink:href="#geo-fill"/></svg>
                              <h5><a href="#" onclick="reservarLibro('${element["name-book"]}')">reserva ya</h5>
                            </li>
                          </ul>
                        </div>
                      </div>
                    `;

            document.getElementById("ticket").innerHTML += reservados;
          });

          break;

        case "historial.html":

        var datosGuardados = JSON.parse(localStorage.getItem("reserva"));

          document.getElementById("historial").innerHTML = ` 
                <div id = "historial" class="row">
                      <div class="col-md-12">
                      <div class="table-wrap">
                        <table class="table">
                          <thead class="thead-dark">
                            <tr>
                              <th>Libro</th>
                              <th>Autor</th>
                              <th>Editorial</th>
                              <th>Fecha de reserva</th>
                              <th>Usuario</th>
                            </tr>
                          </thead>
                          <tbody id="historialTablaBody">
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                </div>
                  
                `;

          datosGuardados.forEach((element) => {
            var historial = `<tr>
            <td>${element["name-book"]} </td>
            <td>${element["book-author"]} </td>
            <td>${element["book-editorial"]} </td>
            <td>${element["fecha_reserva"]} </td>
            </tr>
           
            `;

            document.getElementById("historialTablaBody").innerHTML +=
              historial;
          });

          break;

        default:
          break;
      }

      /*if (url == "catalago.html") {
        var datosGuardados = JSON.parse(localStorage.getItem("book"));
        console.log(datosGuardados);
        //    alert(datosGuardados)

        datosGuardados.forEach((element) => {
          var plantilla = `<div class="container col-xxl-8 px-4 py-5">
                    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <div class="col-10 col-sm-8 col-lg-6">
                        <img src="${element["book-image"]}" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
                      </div>
                      <div class="col-lg-6">
                        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${element["name-book"]}</h1>
                        <h4 class="fw-bold text-body-emphasis">Autor: ${element["book-author"]}</h4>
                        <h4 class="fw-bold text-body-emphasis">Año de edicion: ${element["book-publication"]}</h4>
                        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                          <button onclick="eliminarLibro('${element["name-book"]}')" type="button" class="btn btn-danger btn-lg px-4 me-md-2">Eliminar</button>
                          <button type="button" class="btn btn-warning btn-lg px-4">Editar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                  <div class="b-example-divider"></div>`;

          document.getElementById("libroteca").innerHTML += plantilla;
        });
      }*/
    })
    .catch((error) => console.error("Error al cargar el formulario:", error));
}

function iniciarSesion() {
  let usuario = document.getElementById("usuario_log").value;
  let contra = document.getElementById("contra_log").value;

  var users = JSON.parse(localStorage.getItem("user")) || [];
  var userLog = null;

  if (users.length > 0) {
    users.forEach(function (usuarios_f) {
      var nombreUsuario = usuarios_f["usuario_init"];

      if (nombreUsuario === usuario) {
        userLog = usuarios_f;
        return;
      }
    });
  } else {
    console.log("No hay usuarios almacenados en el localStorage");
  }

  if (!userLog) {

    Swal.fire({
      title: "Oops...",
      text: "Usuario no encontrado",
      icon: "error"
    });

    return;
  }

  if (userLog["contra_init"] !== contra) {
    
    Swal.fire({
      title: "Oops...",
      text: "Contraseña incorrecta",
      icon: "error"
    });

    return;
  }

  localStorage.setItem("usuarioActual", JSON.stringify(userLog));

  console.log("Antes de la redirección");

  // var local = window.location.href

  // Cambiar la ubicación (URL) a "login_2.html"
  window.location.href = "../index.html";
  // alert("ingresando")

  // Este mensaje puede no mostrarse inmediatamente debido a la redirección
  // console.log("Después de la redirección");
}


function cerrarSesion(){
  localStorage.removeItem("usuarioActual");
  window.location.href = "../login.html";
}

function eliminarLibro(nombreLibro) {
  var libros = JSON.parse(localStorage.getItem("book")) || [];

  // Encuentra el índice del libro con el nombre proporcionado
  var index = libros.findIndex(function(libro) {
    return libro["name-book"] === nombreLibro;
  });

  // Si se encuentra el libro, elimínalo
  if (index !== -1) {
    libros.splice(index, 1);
    localStorage.setItem("book", JSON.stringify(libros));
   // console.log(`Libro "${nombreLibro}" eliminado exitosamente.`);

    Swal.fire({
      title: "Registro Completo",
      text: "Libro eliminado exitosamente",
      icon: "success"
    });



  } else {
    //console.log(`Libro "${nombreLibro}" no encontrado en localStorage.`);
    Swal.fire({
      title: "Oops...",
      text: "No se encontro el libro",
      icon: "error"
    });


  }
}


function registroUsuarios() {
  let usuarios = document.getElementById("usuario_init").value;
  let password = document.getElementById("contra_init").value;
  let email = document.getElementById("Email").value;
  let rolForm = document.getElementById("dropdown").value;

  var user = JSON.parse(localStorage.getItem("userlog")) || [];
  //alerta(book);
  var userLog = user.filter(function (user_f) {
    return user_f["user"] == usuarios;
  });
  alert(usuarios);
  if (userLog.length > 0) {
    Swal.fire({
      title: "Oops...",
      text: "Usuario ya existe",
      icon: "error"
    });

    return;
  }
  let user_r = { usuario_init: usuarios, contra_init: password, Email: email, rol: rolForm };
  user.push(user_r);

  localStorage.setItem("user", JSON.stringify(user));

  Swal.fire({
    title: "Registro Completo",
    text: "Puedes continuar con el proceso",
    icon: "success"
  });
  document.getElementById("incio").reset();
}

function registroLibro() {
  let n_book = document.getElementById("name-book").value;
  let autor = document.getElementById("book-author").value;
  let editorial = document.getElementById("book-editorial").value;
  let y_public = document.getElementById("book-publication").value;
  let genero = document.getElementById("book-gender").value;

  // Obtener una referencia al input de tipo archivo
  const input = document.getElementById('image-input');

 // alert(input)

  // Verificar si se seleccionó un archivo
  if (input.files.length > 0) {
    const file = input.files[0];

    // Convertir la imagen a base64
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;

      // Guardar la imagen en localStorage
      localStorage.setItem('bookImage', base64Image);
    };

    reader.readAsDataURL(file);
  }

  var book = JSON.parse(localStorage.getItem("book")) || [];
  var bookLog = book.filter(function (books_f) {
    return books_f["name-book"] == n_book;
  });

  if (bookLog.length > 0) {
    Swal.fire({
      title: "Oops...",
      text: "El libro ya se encuentra registrado",
      icon: "error"
    });
    return;
  }

  let booksT = {
    "name-book": n_book,
    "book-author": autor,
    "book-editorial": editorial,
    "book-publication": y_public,
    "book-gender": genero,
    "book-image": localStorage.getItem('bookImage') || null // Obtener la imagen desde localStorage
  };

  book.push(booksT);

  localStorage.setItem("book", JSON.stringify(book));
  localStorage.removeItem('bookImage'); // Limpiar la imagen de localStorage después de usarla

  Swal.fire({
    title: "Registro Completo",
    text: "Puedes continuar con el proceso",
    icon: "success"
  }); 

  var formulario = document.getElementById('libros');
  formulario.reset();


}

function cargarImagen() {
  const input = document.getElementById('image-input');

  // Verificar si se seleccionó un archivo
  if (input.files.length > 0) {
    const file = input.files[0];
//
  localStorage.removeItem('bookImage');


    // Convertir la imagen a base64
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Image = e.target.result;

      // Guardar la imagen en localStorage
      localStorage.setItem('bookImage', base64Image);

      Swal.fire({
        title: "Completado",
        text: "Imagen cargada correctamente.",
        icon: "success"
      });

    };

    reader.readAsDataURL(file);
  } else {
    
    Swal.fire({
      title: "Oops...",
      text: "selecciona una imagen antes de intentar cargarla.",
      icon: "error"
    });

  }
}




function reservarLibro(name_book) {

  let fecha = new Date();
  let fechaReserva = fecha.toISOString();

  var reserva = JSON.parse(localStorage.getItem("reserva")) || [];

  alert(name_book);

  var ReservaLog = reserva.filter(function (reserva_l) {
    return reserva_l["name-book"] == name_book;
  });

    console.log(ReservaLog)

  if (ReservaLog.length > 0) {
    Swal.fire({
      title: "Oops...",
      text: "El libro ya se encuentra reservado",
      icon: "error"
    });
    return;

  }

  var book = JSON.parse(localStorage.getItem("book"))
  
  var ReservaLog = book.filter(function (reserva_l) {
    return reserva_l["name-book"] == name_book;
  });

    //alert("Usuario ya existe");
   console.log(ReservaLog)
   let ReservaL = {
     "name-book": ReservaLog[0]["name-book"],
     "book-author":  ReservaLog[0]["book-author"] ,
     "book-editorial":  ReservaLog[0]["book-editorial"] ,
      "fecha_reserva": fechaReserva,
   };
    reserva.push(ReservaL);
  
    alert(JSON.stringify(ReservaL));
    localStorage.setItem("reserva", JSON.stringify(reserva));
  
    Swal.fire({
      title: "Registro Completo",
      text: "Puedes continuar con el proceso",
      icon: "success"
    });

  }
  
  
  //document.getElementById("formRegistro").reset();


// Función para cargar dinámicamente el historial en la tabla
function cargarHistorial() {
  var tablaBody = document.getElementById("historialTablaBody");
  var datosGuardados = JSON.parse(localStorage.getItem("reserva"));

  datosGuardados.forEach((element) => {
    var fila = document.createElement("tr");

    var celdaLibro = document.createElement("td");
    celdaLibro.textContent = element["name-book"];
    fila.appendChild(celdaLibro);

    var celdaAutor = document.createElement("td");
    celdaAutor.textContent = element["book-author"]; // Corregido el nombre de la variable
    fila.appendChild(celdaAutor);

    var celdaEditorial = document.createElement("td");
    celdaEditorial.textContent = element["book-editorial"]; // Corregido el nombre de la variable
    fila.appendChild(celdaEditorial);

    var celdaFecha = document.createElement("td");
    celdaFecha.textContent = element["fecha_reserva"];
    fila.appendChild(celdaFecha);

    tablaBody.appendChild(fila);
  });
}
