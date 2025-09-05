import { data } from "react-router-dom";
import API from "./api";

export const login = (data) => API.post('/login',data);
export const register = (data) => API.post('/register',data);
export const profileUser= () => API.get('/profile',{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const allUsers= () => API.get('/allprofiles',{
        headers:{
        Authorization: `${localStorage.getItem('token')}`
    }
});

export const deleteUser= (idUser) => API.delete(`/profile/deleteUsers/${idUser}`,{
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


export const forgottenPassword =  (data) => API.post('/forgottenPassword', data);


export const passwordReset = (data, tokenReset) => API.post('/passwordReset', data, {
            headers: {
                Authorization: tokenReset
            }
        });