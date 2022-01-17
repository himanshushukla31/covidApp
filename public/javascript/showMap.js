mapboxgl.accessToken = mapToken
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: coordinate, // starting position [lng, lat]
  zoom: 2, // starting zoom
})

const marker1 = new mapboxgl.Marker().setLngLat(coordinate).addTo(map)
