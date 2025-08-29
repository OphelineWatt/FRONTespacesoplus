import API from "./api";

export const addFavorite = (data) => API.post('/addfavorite',data ,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const Favorites = () => API.get('/favorites',{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const deleteFavorite = (idPlace) => API.delete(`/deletefavorite/${idPlace}`,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }

});