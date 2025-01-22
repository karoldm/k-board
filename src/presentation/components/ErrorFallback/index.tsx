import { Container } from "./style";


export const ErrorFallback = (error: Error) => {
  return (
    <Container>
      <img src="" />
      <span>Algo deu errado durante a sua requisição: </span>
      <p>{error.message}</p>
    </Container>

  );
} 