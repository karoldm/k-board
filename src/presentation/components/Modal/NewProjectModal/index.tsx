import { useState } from "react"
import { Button } from "../../Button";
import { Input } from "../../Input"
import { Column } from "../../Layouts/Column";

type Props = {
  initialValue?: string;
  handleConfirm: (title: string) => void;
}

export const NewProjectModal = ({handleConfirm, initialValue}: Props) => {
  const [title, setTitle] = useState(initialValue ?? "");
  
  return (
    <Column gap="8px">
      <Input
        value={title} 
        id='project-title'
        placeholder='Título' 
        setValue={setTitle} 
      />
      <Button onClick={() => handleConfirm(title)} ><p>Salvar</p></Button>
    </Column>
  );
}