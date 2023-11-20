  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      editable: true,
      locale: "es",
      //Selecciona la fecha
      initialView: 'dayGridMonth',
      selectable: true,
      themeSystem: 'bootstrap',
      eventDrop:function(info){
        $('#txtID').val(info.event.id);
        $('#txtTitulo').val(info.event.title);
        //Mostrar la informacion del evento
        $('#txtDescripcion').val(info.event.extendedProps.description);
        $('#txtColor').val(info.event.backgroundColor);
        $('#txtFecha').val(info.event.startStr);
        $('#txtFechados').val(info.event.endStr);
        RecolectarDatosGUI();
        enviarInformacion('modificar', NuevoEvento);
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      dateClick: function(info) {
        $('#btnAgregarClase').prop("disabled", false);
        $('#btnModificarClase').prop("disabled", true);
        $('#btnEliminarClase').prop("disabled", true);
        limpiarFormulario();
        $('#txtFecha').val(info.dateStr);
        $("#modalEventos").modal('toggle');
      },
      events: {
        url: '../php/eventos.php',
        method: 'POST',
        extraParams: function () {
          return {
            custom_param: 'value'
          };
        },
        failure: function() {
          alert('Hubo un error al cargar los eventos.');
        }
      },
      eventClick: function(info) {
        $('#btnAgregarClase').prop("disabled", true);
        $('#btnModificarClase').prop("disabled", false);
        $('#btnEliminarClase').prop("disabled", false);
        $('#tituloEvento').html(info.event.title);
        //Mostrar la informacion del evento
        $('#txtDescripcion').val(info.event.extendedProps.description);
        $('#txtID').val(info.event.id);
        $('#txtTitulo').val(info.event.title);
        $('#txtColor').val(info.event.backgroundColor);
        $('#txtFecha').val(info.event.startStr);
        $('#txtFechados').val(info.event.endStr);
        $("#modalEventos").modal('toggle');
      }
    });
    calendar.render();

    var buttons = document.querySelectorAll('.fc-prev-button, .fc-next-button, .fc-today-button, .fc-timeGridDay-button, .fc-timeGridWeek-button, .fc-dayGridMonth-button');
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Agrega o quita la clase 'custom-button-styles' según sea necesario
        button.classList.toggle('custom-button-styles');
      });
    });

    var NuevoEvento;

    $('#btnEliminarClase').click(function() {
      RecolectarDatosGUI();
      enviarInformacion('eliminar', NuevoEvento);
    });

    $('#btnModificarClase').click(function() {
      RecolectarDatosGUI();
      enviarInformacion('modificar', NuevoEvento);
    });

    $('#btnAgregarClase').click(function() {
      RecolectarDatosGUI();
      enviarInformacion('agregar', NuevoEvento);
    });

    function RecolectarDatosGUI() {
      NuevoEvento = {
        id: $('#txtID').val(),
        title: $('#txtTitulo').val(),
        description: $('#txtDescripcion').val(),
        start: $('#txtFecha').val(),
        end: $('#txtFechados').val(),
        color: $('#txtColor').val(),
      };
    }

    function enviarInformacion(accion, objEvento) {
      $.ajax({
        type: 'POST',
        url: '../php/eventos.php?accion=' + accion,
        data: objEvento,
        success: function(msg) {
          if (msg) {
            calendar.refetchEvents(); // Actualiza los eventos en el calendario
            $("#modalEventos").modal('hide'); // Cierra el modal
          }
        },
        error: function() {
          alert("Hay un error");
        }
      });
    }
  });
function limpiarFormulario(){
  $('#txtID').val('');
  $('#txtTitulo').val('');
  //Mostrar la informacion del evento
  $('#txtDescripcion').val('');
  $('#txtColor').val('');
  $('#txtFecha').val('');
  $('#txtFechados').val('');
}