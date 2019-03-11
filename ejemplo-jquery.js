
var personas = [];

function validar_telefono( tel ) {
  /* para simplificar en este ejemplo, asumimos que los teléfonos
   * son compuestos de 7 dígitos exclusivamente
   */
  return ( typeof(tel) == 'string' && tel.search(/^\d{7}$/) !== -1 );
}

function mostrar_nombres() {
  var cadena = '';

  if ( personas.length > 0 ) {
    // con JQuery podemos recorrer utilizando un iterador, además de la manera tradicional
    $.each( personas, function( indice, valor ){
      cadena += (indice+1) + '.- '+ valor.nombre + ' ' +
                valor.apellido + ' (' + valor.telefono + ')' +  "<br>";
    });
  }
  else {
    cadena = 'No hay invitados a la reunión';
  }
  $('#invitados').html( cadena );
}

function agregar_invitado( nom, ape, tel ) {
  // verificamos que ambos valores (argumentos a la función) no estén vacíos
  if ( nom != '' && ape != '' && validar_telefono(tel) ) {
    // creamos nuevo objeto con los datos suministrados
    var persona = { nombre: nom, apellido: ape, telefono: tel };
    // agregamos objeto al arreglo
    personas.push( persona );

    mostrar_nombres();
    ocultar_formulario();
  }
  else {
    alert( "Datos inválidos o incompletos" );
  }
}

function mostrar_formulario() {
  //Antes: document.getElementById('nuevo_invitado').style.display = 'block';
  $('#nuevo_invitado').show();
}

function ocultar_formulario() {
  $('#frm_nuevo_invitado')[0].reset();
  $('#nuevo_invitado').hide();
}

/* En JQuery, comúnmente asociamos los eventos a elementos del documento
 * desde el bloque JavaScript, en lugar de hacerlo directamente en la
 * definición HTML.  Para agregar código que se ejecute al finalizar
 * la carga de la página (en lugar de <body onload="..."> podemos utilizar
 * $( document ).ready.  Nótese que en nuestro caso no es estrictamente
 * necesario, ya que estamos cargando el script al final del cuerpo del
 * documento. Pero así podemos cargar el .js al final o en el <head>
 */
$( document ).ready(function() {
  mostrar_nombres();

  // asociar eventos a otros elementos
  $('#link_agregar_invitado').click(function(){
    mostrar_formulario();
  });

  $('#btn_agregar_invitado').click(function(){
    agregar_invitado( $('#nombre').val(), $('#apellido').val(), $('#telefono').val() );
  });

  $('#btn_cancelar').click(function(){
    ocultar_formulario();
  });

  // Asociaremos el evento "keyup" del campo de teléfono para
  // mostrar cuántos dígitos faltan o sobran mientras se escribe
  $('#telefono').keyup(function(){
    // podemos hacer referencia directamente al objeto que desencadena el evento con $(this)
    var longitud = $( this ).val().length;
    if ( longitud < 7 ) {
      // nótese que podemos "encadenar" llamadas a métodos sobre un objeto con JQuery:
      $('#ayuda_telefono').text('Faltan ' + (7 - longitud) + ' dígitos' ).css('color', 'red');
    }
    else if ( longitud > 7 ) {
      $('#ayuda_telefono').text('Sobran ' + (longitud - 7) + ' dígitos' ).css('color', 'red');
    }
    else {
      // para mejor legibilidad, podemos encadenar en líneas distintas:
      $('#ayuda_telefono').text('¡7 dígitos!' )
                          .css('color', 'green');
    }
  });

});