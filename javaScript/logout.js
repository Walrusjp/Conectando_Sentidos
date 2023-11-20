document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logout').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('cuadro-dialogo').style.display = 'block';
      console.log("El script se está ejecutando");
    });
  
    document.getElementById('aceptar').addEventListener('click', function() {
      // Redirigir a la página "acceso.html" al hacer clic en Aceptar
      window.location.href = "acceso.html";
    });
  
    document.getElementById('cancelar').addEventListener('click', function() {
      // Ocultar el cuadro de diálogo al hacer clic en Cancelar
      document.getElementById('cuadro-dialogo').style.display = 'none';
    });
  });