import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateToastr = () => {
  const customToastStyle = {
    top: "65px", // Set the y position of the toast
    width: "auto",
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={customToastStyle}
      />
    </div>
  );
};

export default CreateToastr;

// eslint-disable-next-line react-refresh/only-export-components
export const toastr = {
  success: (message: string, delay = 0) => {
    setTimeout(() => {
      toast.success(message + "!");
    }, delay);
  },
  warning: (message: string, delay = 0) => {
    setTimeout(() => {
      toast.warning(message + "!");
    }, delay);
  },
  error: (message: string, delay = 0) => {
    setTimeout(() => {
      toast.error(message + "!");
    }, delay);
  },
  info: (message: string, delay = 0) => {
    setTimeout(() => {
      toast.info(message + "!");
    }, delay);
  },
};
