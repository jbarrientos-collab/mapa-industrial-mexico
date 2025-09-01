// Inicializar mapa en México
const map = L.map('map').setView([23.6345, -102.5528], 5);

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Cargar CSV con PapaParse
Papa.parse("csv/prospectos_industriales.csv", {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(row => {
      if (row.Lat && row.Lng) {
        // Color según prioridad
        const color = row.Prioridad === "Alta" ? "red" :
                      row.Prioridad === "Media-Alta" ? "orange" : "blue";

        // Agregar marcador
        L.circleMarker([row.Lat, row.Lng], {
          radius: 6,
          color: color,
          fillOpacity: 0.8
        }).addTo(map)
          .bindPopup(`<b>${row.Nombre}</b><br>${row.Sector}<br>${row.Ciudad}, ${row.Estado}<br>${row.Notas}`);
      }
    });
  }
});
