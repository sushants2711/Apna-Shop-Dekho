import { toast } from "react-toastify";
import { Slide } from "react-toastify";

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
};