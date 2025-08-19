import { data } from "react-router-dom";
import API from "./api";

export const login = (data) => API.post('/login',data);