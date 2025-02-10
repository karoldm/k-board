import { Button } from "../../Button";
import { Column } from "../../Layouts/Column";
import { Row } from "../../Layouts/Row";

type Props = {
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({onConfirm, onCancel, text}: Props) => {
  return (
    <Column gap="16px">
      <p>{text}</p>
      <Row fullWidth gap="8px">
        <Button onClick={onCancel} variant="secondary" ><p>Cancelar</p></Button>
        <Button onClick={onConfirm}><p>Continuar</p></Button>
      </Row>
    </Column>
  );
}