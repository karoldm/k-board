import { toast, TypeOptions } from 'react-toastify'

export const showToast = (message: string, type: TypeOptions) => {
  toast(message, {
    type: type,
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    draggable: false,
  })
}
