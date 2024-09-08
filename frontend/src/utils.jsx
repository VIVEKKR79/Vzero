import { toast } from "react-toastify";

export const hanndleSuccess = (msg) =>{
    toast.success(msg, {
        position: "top-right",
    });
}

export const hanndleError = (msg) =>{
    toast.error(msg, {
        position: "top-right",
    });
}