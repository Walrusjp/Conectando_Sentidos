document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    editable: true,
    locale: "es",
    initialView: 'dayGridMonth',
    selectable: true,
    themeSystem: 'bootstrap',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: function(info) {
      $('#btnAgregarClase').prop("disabled", false);
      $('#btnModificarClase').prop("disabled", true);
      $('#btnEliminarClase').prop("disabled", true);
      $('#btnUnirseClase').prop("disabled", true);
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
      $('#btnUnirseClase').prop("disabled", false);
      $('#tituloEvento').html(info.event.title);
      // Mostrar la información del evento
      $('#txtTitulo').val(info.event.title);
      $('#txtDescripcion').val(info.event.extendedProps.description);
      $('#txtID').val(info.event.id);

      var fechaHoraInicio = info.event.start;
      var fechaHoraFin = info.event.end;

      var fechaInicio = fechaHoraInicio.toISOString().slice(0, 10);
      var horaInicio = fechaHoraInicio.toISOString().slice(11, 16);
      var fechaFin = fechaHoraFin.toISOString().slice(0, 10);
      var horaFin = fechaHoraFin.toISOString().slice(11, 16);

      $('#txtFecha').val(fechaInicio);
      $('#txtHora').val(horaInicio);
      $('#txtFechados').val(fechaInicio);
      $('#txtHorados').val(horaFin);

      $("#modalEventos").modal('toggle');
    },
    eventDrop: function(info) {
      $('#txtID').val(info.event.id);
      $('#txtTitulo').val(info.event.title);
      // Mostrar la información del evento
      $('#txtDescripcion').val(info.event.extendedProps.description);
      $('#txtColor').val(info.event.backgroundColor);

      var fechaHoraInicio = info.event.start;
      var fechaHoraFin = info.event.end;

      var fechaInicio = fechaHoraInicio.toISOString().slice(0, 10);
      var horaInicio = fechaHoraInicio.toISOString().slice(11, 16);
      var fechaFin = fechaHoraFin.toISOString().slice(0, 10);
      var horaFin = fechaHoraFin.toISOString().slice(11, 16);

      $('#txtFecha').val(fechaInicio);
      $('#txtHora').val(horaInicio);
      $('#txtFechados').val(Inicio);
      $('#txtHorados').val(horaFin);

      RecolectarDatosGUI();
      enviarInformacion('modificar', NuevoEvento);
    },
  });

  calendar.render();

  var buttons = document.querySelectorAll('.fc-prev-button, .fc-next-button, .fc-today-button, .fc-timeGridDay-button, .fc-timeGridWeek-button, .fc-dayGridMonth-button');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
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
      start: $('#txtFecha').val() + 'T' + $('#txtHora').val(),
      end: $('#txtFecha').val() + 'T' + $('#txtHorados').val(),
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
          calendar.refetchEvents();
          $("#modalEventos").modal('hide');
        }
      },
      error: function() {
        alert("Hay un error");
      }
    });
  }

  function limpiarFormulario(){
    $('#txtID').val('');
    $('#txtTitulo').val('');
    $('#txtDescripcion').val('');
    $('#txtColor').val('');
    $('#txtFecha').val('');
    $('#txtHora').val('');
    $('#txtFechados').val('');
    $('#txtHorados').val('');
  }
});
