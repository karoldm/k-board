import { useState } from "react"
import { Button } from "../../Button";
import { Input } from "../../Input"
import { ModalTaskContent } from "./style";

type Props = {
  handleConfirm: (title: string) => void;
}

export const NewProjectModal = ({handleConfirm}: Props) => {
  const [title, setTitle] = useState("");
  
  return (
    <ModalTaskContent gap="8px">
      <Input 
        value={title} 
        id='project-title'
        placeholder='Título' 
        setValue={setTitle} 
      />
      <Button onclick={() => handleConfirm(title)} ><p id="text-button">Criar</p></Button>
    </ModalTaskContent>
  );
}