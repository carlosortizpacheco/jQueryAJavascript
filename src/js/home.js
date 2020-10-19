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

    if(data.data.movie_count > 0) {
      return data
    }
    throw new Error ("no se encontro ningun resultado")
  }

  function videoItemTemplate(movie,category){
    return (
      `<div class="primaryPlaylistItem" data-id='${movie.id}' data-category=${category}>
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
    $element.addEventListener('click',showModal($element))
  }

  const actionList = await cacheExist('action')
  const dramaList = await cacheExist('drama')
  const animationList = await cacheExist('animation')
  
  const $actionContainer = document.querySelector('#action')
  const $dramaContainer = document.querySelector('#drama')
  const $animationContainer = document.querySelector('#animation')
  
  async function cacheExist(category) {
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem(listName)
    if(cacheExist) {
      return JSON.parse(cacheList)
    }
    const { data : { movies: data } } =  await getData(`https://yts.mx/api/v2/list_movies.json?genre=${category}`)
    window.localStorage.setItem(listName,JSON.stringify(data))

    return data
  }

  const $featuringContainer = document.getElementById('featuring')
  const $form = document.getElementById('form')
  const $home = document.getElementById('home')

  const $modal = document.getElementById('modal')
  const $overlay = document.getElementById('overlay')
  const $hideModal = document.getElementById('hide-modal')
  
  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')

  function renderMoviesList(list,$container,category) {
    $container.children[0].remove()
    list.forEach( movie => {
      const HTMLString = videoItemTemplate(movie,category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement)
      const image = movieElement.querySelector('img')
      image.addEventListener('load', (event) => {
        event.target.classList.add('fadeIn')
      })
      addEventClick(movieElement)
    })
  }
 
  renderMoviesList(actionList,$actionContainer,'action')
  renderMoviesList(dramaList,$dramaContainer,'drama')
  renderMoviesList(animationList,$animationContainer,'animation')

  function setAttributes($element,attributes) {
    for(const attribute in attributes) {
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  function featuringTemplate(pelicula) {
    return (
      `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${pelicula.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${pelicula.title}</p>
        </div>
      </div>
      `
    )
  }

  $form.addEventListener('submit', async function(event) {
    event.preventDefault()
    $home.classList.add('search-active')
    const $loader = document.createElement('img')
    setAttributes($loader, {
      src:'src/images/loader.gif',
      height: 50,
      width: 50
    })
    $featuringContainer.append($loader)
    const data = new FormData($form)

    try {
      const { data: { movies: pelis } } = await getData(`https://yts.mx/api/v2/list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString
    } catch (error) {
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }


  })

  function findById (list,id) {
    return list.find(movie => movie.id === parseInt(id,10))
  }

  function findMovie(id,category) {
    switch(category) {
      case 'action': {
        return findById(actionList,id)
      }
      case 'drama': {
        return findById(dramaList,id)
      }
      default: {
        return findById(animationList,id)
      }
    }
  }

  function showModal($element) {
    $overlay.classList.add('active')
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id
    const category = $element.dataset.category
    const data = findMovie (id,category)

    $modalTitle.textContent = data.title
    $modalImage.setAttribute('src',data.medium_cover_image)
    $modalDescription.textContent = data.summary
  }
  
  $hideModal.addEventListener('click',hideModal)
  
  function hideModal() {
    $overlay.classList.remove('active')
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()