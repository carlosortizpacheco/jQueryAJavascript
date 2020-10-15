console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
};


const getUser = new Promise( function(todoBien,todoMal) {
  // setInterval se ejecuta cada cierto tiempo
  // setTimeout se ejecuta en un tiempo y ya
  setTimeout(function(){
    //luego de 3 segundos se ejecuta
    todoBien()
  },3000)
});

// getUser
//   .then(function(){
//     console.log('todo esta bien')
//   })
//   .catch(function(){
//     console.log('todo esta mal')
//   })


// Promise.all([getUser,getUser])
//   .then(function(){
//     console.log('todo bien, promise all')
//   })
//   .catch(function(){
//     console.log('todo mal')
//   })

// $.ajax('https://randomuser.me/api/',{
//   method:'GET',
//   success: function(data) {
//     console.log(data)
//   },
//   error: function(error){
//     console.log(error)
//   }
// })

// fetch('https://randomuser.me/api/')
//   .then(function(response){
//     return response.json()
//   })
//   .then(function(user){
//     console.log(user.results[0].name.first)
//   })
//   .catch(function(){
//     console.log('algo falló')
//   })

(async function load() {
  
  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function videoItemTemplate(movie){
    return (
      `<div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument()
    html.body.innerHTML=HTMLString
    return html.body.children[0]
  }

  function addEventClick($element) {
    $element.addEventListener('click',function(){
      showModal()
    })
  }

  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const terrorList = await getData('https://yts.mx/api/v2/list_movies.json?genre=terror')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
  
  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.querySelector('#drama')
  const $animationContainer = document.querySelector('#animation')
  
  const $featuringContainer = document.getElementById('featuring-container')
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')
  
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  function renderMoviesList(list,$container) {
    $container.children[0].remove()
    list.forEach( movie => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      
      addEventClick(movieElement)
    })
  }
 
  renderMoviesList(actionList.data.movies,$actionContainer)
  renderMoviesList(dramaList.data.movies,$dramaContainer)
  renderMoviesList(animationList.data.movies,$animationContainer)

  function setAttributes($element,attributes) {
    for(const attribute in attributes) {
      $element.setAttributes(attribute, attributes[attribute])
    }
  }

  $form.addEventListener('submit', function(event) {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src:'src/images/loader.gif',
      height: 50,
      width: 50
    })
  })

  function showModal() {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
  }

  $hideModal.addEventListener('click',hideModal)
  function hideModal() {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }


  

})()