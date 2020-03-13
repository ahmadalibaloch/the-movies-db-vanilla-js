const BASE_URL = 'https://api.themoviedb.org/3';
export const moviesAPI = {
    discover: async (sortby = 'vote_average.asc', newMovies = false) => {
        let discover_url = `${BASE_URL}/discover/movie?sort_by=${sortby}`
        if (newMovies) {
            let today = new Date();
            let month = today.getMonth() + 1;
            month = month < 10 ? '0' + month : month;
            today = `${today.getFullYear()}-${month}-${today.getDate()}`
            discover_url += `&primary_release_date.gte=${today}`
        }
        const url = appendApiKey(discover_url);
        return await (await fetch(url)).json();
    }
}

export const api_key = "";
export const appendApiKey = url => `${url}&language=en-US&api_key=${api_key}`;