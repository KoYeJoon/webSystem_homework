import axios from 'axios';

const API_DEFAULT = "http://localhost:3030/";
const instance = axios.create({ baseURL: API_DEFAULT });

export async function getReviews() {
    const result = await instance.get('/');
    return result.data.review
}

export async function createReview({movie_name, review_content,rate}) {
    const result = await instance.post('/', {movie_name, review_content,rate});
    console.log(result);
    return result.data
}

export async function deleteReview({id}) {
    // console.log(id);
    const result = await instance.get('/'+id);
    return result.data
}
export default {
    getReviews,
    createReview,
    deleteReview
}