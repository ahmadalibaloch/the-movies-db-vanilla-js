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

export const authorization_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzkwNjdlZDJmNjZkNDM1Mjg2Yjg1MzRiYTlkN2UwOSIsInN1YiI6IjVlNjUyOTEyMzU3YzAwMDAxMTM3ZjZlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FA_HMYi2WKfMZBs1HEHx2vE98K-3jdMqQ3TxFUZR1gE";
export const api_key = "c79067ed2f66d435286b8534ba9d7e09";
export const appendApiKey = url => `${url}&language=en-US&api_key=${api_key}`;