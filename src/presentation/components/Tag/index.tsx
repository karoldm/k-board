import { FaTimes } from "react-icons/fa";
import { getColorByContrast } from "../../utils/color";
import { Button } from "../Button";
import { Row } from "../Layouts/Row";
import { Wrapper } from "./style";

type Props = {
  label: string;
  color?: string;
  size?: "large" | "medium" | "small";
  onClick?: () => void;
  onRemove?: () => void;
}

export const Tag = ({label, color, size="medium", onClick, onRemove}: Props) => {
  return(
    <Wrapper onClick={onClick} style={onClick ? {cursor: 'pointer'} : {}} color={color} size={size}>
     <Row fullWidth gap="8px">
        <p style={color != null ? {color: getColorByContrast(color)} : {}}>
          {label}
        </p>
        {
          onRemove && (
            <Button variant="icon" noBorder onclick={onRemove}>
              <FaTimes size={10} color={color != null ? getColorByContrast(color) : "#666"}/>
            </Button>
          )
        }
     </Row>
    </Wrapper>
  );
}