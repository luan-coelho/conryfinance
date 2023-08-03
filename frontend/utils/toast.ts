import { toast } from "react-toastify";

function buildToast() {
  return {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  } as {};
}

export function toastSuccess(content: string) {
  toast.success(content, buildToast());
}

export function toastWarn(content: string) {
  toast.warn(content, buildToast());
}

export function toastError(content: string) {
  toast.error(content, buildToast());
}