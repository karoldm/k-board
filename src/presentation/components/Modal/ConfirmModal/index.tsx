import { Button } from "../../Button";
import { Column } from "../../Layouts/Column";
import { Row } from "../../Layouts/Row";

type Props = {
  text: string;
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
}

export const ConfirmModal = ({onConfirm, onCancel, text, loading}: Props) => {
  return (
    <Column gap="16px">
      <p>{text}</p>
      <Row fullWidth gap="8px">
        <Button loading={loading} onClick={onCancel} variant="secondary" ><p>Cancelar</p></Button>
        <Button loading={loading} onClick={onConfirm}><p>Continuar</p></Button>
      </Row>
    </Column>
  );
}