
export const getItems = async (movie) => {

    // const API_URL = process.env.API;
    // const API = `${API_URL}&s=${movie}`;
    const API = `https://www.omdbapi.com/?i=tt3896198&apikey=457da402&s=${movie}`;

    const res = await fetch(API);
    const data = await res.json();
    return data;
}

export const getItemByID = async (id) => {
    const APIbyID = `https://www.omdbapi.com/?i=${id}&apikey=457da402`;

    const res = await fetch(APIbyID);
    const data = await res.json();
    return data;
}