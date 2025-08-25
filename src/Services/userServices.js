import { data } from "react-router-dom";
import API from "./api";

export const login = (data) => API.post('/login',data);
export const register = (data) => API.post('/register',data);
export const profileUser= () => API.get('/profile',{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updateUsername= (data) => API.put('/profile/updateUsername',data,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updateMail= (data) => API.put('/profile/updateMail',data,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const updatePassword= (data) => API.put('/profile/updatePassword',data,{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});