import { useActionData, useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Wrapper } from "./style";

export const NotFound = ( ) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <h1>404</h1>
      <span>Ops! Parece que esta rota não existe.</span>
      <Button width="240px" onclick={() => {navigate("/")}}>
        <p>
          Voltar página inicial
        </p>
      </Button>
    </Wrapper>
  );
}