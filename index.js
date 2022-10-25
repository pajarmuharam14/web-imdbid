// // SEARCH MOVIES
// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=85421276&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += showCards(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       // SHOW DETAILS
//       const modalDetailButton = document.querySelectorAll(".modal-detail-button");
//       modalDetailButton.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=85421276&i=" + imdbid)
//             .then((response) => response.json())
//             .then((m) => {
//               const movieDetail = showMovieDetail(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

// SEARCH MOVIES
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUi(movies);
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=85421276&s=" + keyword)
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUi(movies) {
  let cards = "";
  movies.forEach((m) => (cards += showCards(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

// SHOW DETAIL
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateUiDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch("http://www.omdbapi.com/?apikey=85421276&i=" + imdbid)
    .then((response) => response.json())
    .then((m) => m);
}

function updateUiDetail(m) {
  const movieDetail = showMovieDetail(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

// FUNCTION FOR SHOW CARDS AND SHOW MOVIE DETAI
function showCards(m) {
  return ` <div class="col-md-4 my-5">
    <div class="card">
      <img
        src="${m.Poster}"
        class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${m.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
        <a
          href="#"
          class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-imdbid="${m.imdbID}" 
          data-bs-target="#movieDetailModal"
          >Show details</a
        >
      </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img
          src="${m.Poster}"
          class="img-fluid" />
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
          <li class="list-group-item"><strong>Genre: </strong>${m.Genre}</li>
          <li class="list-group-item"><strong>Runtime: </strong>${m.Runtime}</li>
          <li class="list-group-item"><strong>Released: </strong>${m.Released}</li>
          <li class="list-group-item"><strong>Rated: </strong>${m.Rated}</li>
        </ul>
      </div>
    </div>
  </div>`;
}
