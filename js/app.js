// Variables
const carrito = document.querySelector('#carrito');
const listaPeliculas = document.querySelector('#lista-peliculas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     listaPeliculas.addEventListener('click', agregarPelicula);
     carrito.addEventListener('click', eliminarPelicula);
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
     //DevuelveObj.addEventListener('click', DevuelveObj) 

}

//API

var requestOptions = {
     method: 'GET',
     redirect: 'follow'
};

function BuscarPeliculaID() {
     /*
     let response = fetch("http://omdbapi.com//?apikey=e9e3ed03&i=tt0000001&plot=short&r=json&callback=Movieresult", requestOptions)
     .then(response => response.json())
     .then((json) => {
          console.log('this is the json data', response)
     })
     .catch(error => console.log('error', error));
     return response;
     */
     var settings = {
          "url": "http://omdbapi.com//?apikey=e9e3ed03&i=tt0000001&plot=short&r=json",
          "method": "GET",
          "timeout": 0,
     };

     $.ajax(settings).done(function (response) {
          console.log(response);
          //var plano = response.text();
          //console.log(plano);
          //var response2 = response.Movieresult;
          console.log(response.Ratings[0].Source);
          document.getElementById("imagen").src = response.Poster;
          document.getElementById("rating").innerHTML = response.imdbRating;
          document.getElementById("titulo").innerHTML = response.Title;
          //document.getElementById("demo");

     });
}

function mostPopular(){

     var settings = {
          "url": "http://omdbapi.com//?t=marvel&type=movie&plot=short&r=json&apikey=e9e3ed03",
          "method": "GET",
          "timeout": 0,
        };
        
        $.ajax(settings).done(function (response) {
          console.log(response);
        });
        
}
function movieArray(){

var settings = {
     "url": "http://omdbapi.com//?s=avengers&type=movie&r=json&page=1&apikey=e9e3ed03",
     "method": "GET",
     "timeout": 0,
   };
   
   $.ajax(settings).done(function (response) {
     console.log(response);
   });
}

function DevuelveObj(obj) {
     /*
          const objeto = BuscarPeliculaID();
          const promise1 = Promise.resolve(objeto);
     
          //const objeto = JSON.parse(jsonMovie);
         // var objeto = JSON.parse(jsonMovie);
          //console.log('El titulo es: ' + objeto.Title + 'El year es:' + objeto.Year);
          console.log(objeto);
          console.log(promise1);
          //console.log(promise1);
          return objeto;
          */
}
// Funciones

function agregarPelicula(e) {
     e.preventDefault();

     if (e.target.classList.contains('agregar-carrito')) {
          const pelicula = e.target.parentElement.parentElement;
          leerDatosPelicula(pelicula);
     }
}

// Lee los datos
function leerDatosPelicula(pelicula) {
     const infoPelicula = {
          imagen: pelicula.querySelector('img').src,
          titulo: pelicula.querySelector('h4').textContent,
          precio: pelicula.querySelector('.precio').textContent,
          id: pelicula.querySelector('a').getAttribute('data-id'),
          cantidad: 1
     }


     if (articulosCarrito.some(pelicula => pelicula.id === infoPelicula.id)) {
          const peliculas = articulosCarrito.map(pelicula => {
               if (pelicula.id === infoPelicula.id) {
                    pelicula.cantidad++;
                    return pelicula;
               } else {
                    return pelicula;
               }
          })
          articulosCarrito = [...peliculas];
     } else {
          articulosCarrito = [...articulosCarrito, infoPelicula];
     }

     console.log(articulosCarrito)




     carritoHTML();
}

// Elimina
function eliminarPelicula(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-pelicula')) {

          const peliculaId = e.target.getAttribute('data-id')

          articulosCarrito = articulosCarrito.filter(pelicula => pelicula.id !== peliculaId);

          carritoHTML();
     }
}


function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(pelicula => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${pelicula.imagen}" width=100>
               </td>
               <td>${pelicula.titulo}</td>
               <td>${pelicula.precio}</td>
               <td>${pelicula.cantidad} </td>
               <td>
                    <a href="#" class="borrar-pelicula" data-id="${pelicula.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });
}

function vaciarCarrito() {


     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}
