import API from "./api";

export const places = () => API.get('/places');

export const addPlace = (data) => API.post('/teams',data ,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});