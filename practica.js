var personas = [];

function validar_telefono( tel ) {
  /* para simplificar en este ejemplo, asumimos que los teléfonos
   * son compuestos de 7 dígitos exclusivamente
   */
  return ( typeof(tel) == 'string' && tel.search(/^\d{7}$/) !== -1 );
}

function mostrar_nombres() {
  var cadena = '';
  // recorremos todos los elementos del arreglo
  if ( personas.length > 0 ) {
    for ( var i = 0; i < personas.length; i++ ) {
      cadena += (i+1) + '.- '+ personas[i].nombre + ' ' +
                personas[i].apellido + ' (' + personas[i].telefono + ')' +  "<br>";
    }
  }
  else {
    cadena = 'No hay invitados a la reunión';
  }
  document.getElementById('invitados').innerHTML = cadena;
}

function agregar_invitado( nom, ape, tel ) {
  // validaciones básicas
  if ( nom != '' && ape != '' && validar_telefono(tel) ) {
    // creamos nuevo objeto con los datos suministrados
    var persona = { nombre: nom, apellido: ape, telefono: tel };
    // agregamos objeto al arreglo
    personas[personas.length] = persona;

    mostrar_nombres();
    ocultar_formulario();
  }
  else {
    alert( "Datos inválidos o incompletos" );
  }
}

function mostrar_formulario() {
  document.getElementById('nuevo_invitado').style.display = 'block';
}

function ocultar_formulario() {
  document.getElementById('frm_nuevo_invitado').reset();
  document.getElementById('nuevo_invitado').style.display = 'none';
}

/* Asociar eventos */

window.onload = mostrar_nombres;

document.getElementById('link_agregar_invitado').addEventListener('click', function(e){
  mostrar_formulario();
  e.preventDefault();
});

document.getElementById('btn_agregar_invitado').addEventListener( 'click', function() {
  agregar_invitado( document.getElementById('nombre').value,
                    document.getElementById('apellido').value,
                    document.getElementById('telefono').value
                  );
});

document.getElementById('btn_cancelar').addEventListener('click', ocultar_formulario);
