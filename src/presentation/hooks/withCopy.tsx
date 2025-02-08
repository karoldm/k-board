import { PropsWithChildren, ReactNode } from "react";
import { toast } from "react-toastify";


export const withCopy = (element: ReactNode, text: string) => {
    return (
        <div style={{cursor: "pointer"}} onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success('Text copied successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: false,
              });
          }}
        >
            {element}
        </div>
    );
}