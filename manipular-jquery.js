
var personas = [];

function validar_telefono( tel ) {
  /* para simplificar en este ejemplo, asumimos que los teléfonos
   * son compuestos de 7 dígitos exclusivamente
   */
  return ( typeof(tel) == 'string' && tel.search(/^\d{7}$/) !== -1 );
}

function mostrar_persona( persona ) {
  /*
   * En esta función agregamos los datos de una persona al final
   * del cuerpo de la tabla de invitados, asignando un id a la
   * nueva fila creada.  Nótese que utilizamos un atributo "data"
   * para identificar a cada fila según su posición en el arreglo
   */
  var id_persona = personas.length;
  // usamos un selector compuesto para ubicar el cuerpo (tbody) de la tabla
  // que tiene el id #invitados
  $('#invitados tbody').append( '<tr id="persona-'+ id_persona +'">'+
    '<td>'+ persona.nombre +'</td>'+
    '<td>'+ persona.apellido +'</td>'+
    '<td>'+ persona.telefono +'</td>'+
    '<td><a href="#" data-persona-id="'+ id_persona +'">Eliminar</a></td>'+
    "</tr>"
  );
  // cada vez que agregamos una nueva fila, asociamos de nuevo el evento correspondiente
  // en el enlace de "Eliminar"
  asociar_enlaces_eliminar();
}

function agregar_invitado( nom, ape, tel ) {
  // verificamos que ambos valores (argumentos a la función) no estén vacíos
  if ( nom != '' && ape != '' && validar_telefono(tel) ) {
    // creamos nuevo objeto con los datos suministrados
    var persona = { nombre: nom, apellido: ape, telefono: tel };
    // agregamos objeto al arreglo
    personas.push( persona );

    mostrar_persona( persona );
    $('#invitados tfoot').hide();
    ocultar_formulario();
  }
  else {
    alert( "Datos inválidos o incompletos" );
  }
}

function mostrar_formulario() {
  $('#nuevo_invitado').show();
}

function ocultar_formulario() {
  $('#frm_nuevo_invitado')[0].reset();
  $('#nuevo_invitado').hide();
}

function asociar_enlaces_eliminar() {
  /*
   * Nótese que utilizamos un selector compuesto para ubicar
   * (leyendo de derecha a izquierda, desde lo más específico)
   * los enlaces que contengan el texto "Eliminar" dentro del
   * cuerpo (tbody) de la tabla #invitados
   */
  $('#invitados tbody a:contains("Eliminar")').click(function(){
    var id = $( this ).data('persona-id'); // obtenemos el valor del atributo data

    $('#invitados tr#persona-'+id).remove(); // eliminamos la fila respectiva de la tabla

    // eliminamos la persona del arreglo
    // restamos 1 ya que las posiciones del arreglo comienzan en 0
    personas.splice( id-1, 1 );

    // si ya no quedan más personas, volvemos a mostrar el pie de la tabla
    if ( personas.length == 0 ) {
      $('#invitados tfoot').show();
    }
  });
}

/* En JQuery, comúnmente asociamos los eventos a elementos del documento
 * desde el bloque JavaScript, en lugar de hacerlo directamente en la
 * definición HTML.  Para agregar código que se ejecute al finalizar
 * la carga de la página (en lugar de <body onload="..."> podemos utilizar:
 */
$( document ).ready(function() {

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

  $('#link_vaciar_invitados').click(function(){
    /*
     * Al hacer clic en el enlace de vaciar invitados,
     * eliminamos todas las filas del cuerpo de la tabla,
     * mostramos el mensaje del pie de la tabla y
     * guardamos un arreglo vacío en la variable personas
     */
    $('#invitados tbody tr').remove();
    $('#invitados tfoot').show();
    personas = [];
  });

  $('#link_mostrar_apellidos').click(function(){
    /*
     * Para mostrar los apellidos, recorreremos todas las filas
     * del cuerpo de la tabla de invitados, y buscaremos el
     * texto de la segunda columna en cada fila (posicion 1, ya
     * que la numeración comienza en 0).
     */
    var apellidos = '';
    $('#invitados tbody tr').each(function(){
      var apellido = $( this ).children('td:eq(1)').text();
      apellidos += apellido + "\n"; // concatenamos con un salto de línea
    });
    if ( apellidos != '' ) {
      alert( apellidos );
    }
    else {
      alert( 'No hay invitados aún' );
    }
  });

});