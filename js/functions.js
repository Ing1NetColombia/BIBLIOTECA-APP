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



