import { PropsWithChildren, ReactNode } from "react";
import { toast } from "react-toastify";

type Props = {
    text: string;
}

export const WithCopy = ({text, children}: PropsWithChildren<Props>) => {
    return (
        <div style={{cursor: "pointer"}} onClick={() => {
            navigator.clipboard.writeText(text);
            toast.success('Copiado com sucesso!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: false,
              });
          }}
        >
            {children}
        </div>
    );
}