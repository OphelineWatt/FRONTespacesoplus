import API from "./api";

export const places = () => API.get('/places');

export const addPlace = (data) => API.post('/addplace',data ,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const contribution = () => API.get('/contribution',{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const deletePlace = (idPlace) => API.delete(`/deleteplace/${idPlace}`,{
                headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updatePlace = (idPlace) => API.put(`/updatestatus/${idPlace}`,{
                headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});