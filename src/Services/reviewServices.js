import API from "./api";

export const addReview = (data) => API.post('/addReview',data ,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const reviewsPlace = (placeId) => API.get(`/reviewsplace/${placeId}`);

export const deleteReviews = (idReviews) => API.delete(`/deletereview/${idReviews}`,{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updateReviews = (idReviews, data) => API.put(`/updatereview/${idReviews}`,data,{
            headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});