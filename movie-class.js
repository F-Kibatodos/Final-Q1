(function() {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const list = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const movieClass = document.getElementById('movie-class')
  const dataPanel = document.getElementById('movies-panel')

  function displayDataList (data) {
    let htmlContent = ''
    data.forEach(function (item) {
      let genresArr = item.genres.sort(function(x, y) {
        return x - y
      }).reverse()
      htmlContent += `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card mb-2">
            <img class="card-img-top " src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h6 class="card-title">${item.title}</h5>
            </div>
            <div class="card-footer px-1">`
      let i = genresArr.length //想說避免巢狀
      while (i--) {
        //本來是用for迴圈加上去，現在用while要減回來讓genres的順序調正所以用reverse
        let genresName = genresArr[i] //也是避免巢狀
        htmlContent += `<span class="mx-1"> ${list[genresName]} </span>`
      }
      htmlContent +=`
           </div>
         </div>
       </div>
     `
    })
    dataPanel.innerHTML = htmlContent
  }

  //將電影類別依序排入左側
  for (let genres of Object.values(list)) {
    movieClass.innerHTML += `<li class="nav-item"><a class="nav-link" id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" href="#">${genres}</a></li>`
  }

  //稍微做一點類別區外觀
  const lis = document.querySelectorAll('li')
  for (let i = 0; i < lis.length; i++) {
    let li = lis[i]
    if (i % 2 === 1) li.style.backgroundColor = 'rgba(106, 175, 231, 0.2)'
  }

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayDataList(data)
  }).catch((err) => console.log(err))

  movieClass.addEventListener('click', event => {
    let results = []
    let e = event.target
    //遍歷每個data裡的element中有其中一個類別是符合的
    for (let movie of data) {
      let i = movie.genres.length
      while (i--) {
        let genresName = movie.genres[i]
        if (e.textContent === list[genresName]) results.push(movie)
      }
    }
    displayDataList(results);
  })
})()
