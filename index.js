import { Movie } from "./movie.js";
import { moviesAPI } from './moviesAPI.js';

/**
 * Declerations
 */
let moviesDiv;
let searchInput
let sortSelect;
let filtertSelect;
let resultsDescription;
let resultsLabel;
const movies = [];

/**
 * Main application element, simply registers elements and starts movie fetching & rendering
 */
const app = async () => {
    customElements.define('movie-elem', Movie);
    searchInput = document.querySelector('#searchField');
    sortSelect = document.querySelector('.select-sort');
    filtertSelect = document.querySelector('.select-filter');
    resultsDescription = document.querySelector('.results-description');
    resultsLabel = document.querySelector('.results-label');
    searchInput.oninput = onSearch;
    sortSelect.onchange = onSortChange;
    filtertSelect.onchange = onFilterChange;
    await fetchMovies();
    renderMovies(movies);
};

/**
 * Fetch Movies, supports sort by and new movies
 */
const fetchMovies = async (sort_by, newMovies = false) => {
    movies.length = 0;
    const response = (await moviesAPI.discover(sort_by, newMovies));
    response.results.forEach(movie => {
        movies.push(movie);
    });
}

/**
 * Render movies to DOM
 */
const renderMovies = (renderMovies) => {
    moviesDiv = document.querySelector('.movies-list');
    moviesDiv.innerHTML = '';
    renderMovies.forEach((movie) => {
        moviesDiv.appendChild(createMovieElement(movie));
    });
    resultsDescription.textContent = `Showing ${renderMovies.length} of total of ${movies.length} movies`
}


/**
 * Clone Movie HTML template and return a DOM element of movie with data and events
 */
const createMovieElement = (movie) => {
    var movieTemplate = document.getElementsByTagName("template")[0];
    const movieTmplt = movieTemplate.content.cloneNode(true)
    movieTmplt.querySelector('.name').textContent = movie.title;
    movieTmplt.querySelector('.year').textContent = `(${(movie.release_date || '....').substring(0, 4)})`;
    movieTmplt.querySelector('.description').textContent = movie.overview;
    movieTmplt.querySelector('.thumbnail').src = getImgSrc(movie.poster_path);
    const btnFav = movieTmplt.querySelector('.btn-favorite');
    const imgFav = movieTmplt.querySelector('.fav-icon');
    if (movie.favorite) {
        imgFav.src = 'assets/favorite.svg';
    } else {
        imgFav.src = 'assets/favorite-border.svg';
    }
    btnFav.onclick = function (event) {
        const theMovie = movies.find(mov => mov.id === movie.id);
        theMovie.favorite = !(theMovie.favorite || false);
        if (theMovie.favorite) {
            imgFav.src = 'assets/favorite.svg';
        } else {
            imgFav.src = 'assets/favorite-border.svg';
        }
    };
    return movieTmplt;
}

/**
 * Util function to get movie img from img name
 */
const getImgSrc = imgName => `https://image.tmdb.org/t/p/w185_and_h278_bestv2${imgName}`;

/**
 * On Search input change
 */
const onSearch = async (ev) => {
    const filtered_movies = movies.filter(movie => movie.title.includes(ev.target.value));
    renderMovies(filtered_movies);
}

/**
 * On sort selection change
 */
const onSortChange = async (ev) => {
    console.log('filter', ev);
    await fetchMovies(ev.target.value);
    renderMovies(movies);
}

/**
 * On fulter selection change
 */
const onFilterChange = async (ev) => {
    const fitlerValue = ev.target.value;
    if (fitlerValue === 'fav') {
        renderMovies(movies.filter(m => m.favorite === true));
        resultsLabel.textContent = 'Favorite Movies';
    } else if (fitlerValue === 'new') {
        await fetchMovies(undefined, true);
        renderMovies(movies);
        resultsLabel.textContent = 'New Movies';
        return;
    } else if (fitlerValue === 'all') {
        await fetchMovies();
        renderMovies(movies);
        resultsLabel.textContent = 'All Movies';
    }

}


/**
 * Bootstrape the app
 */
document.addEventListener("DOMContentLoaded", app);