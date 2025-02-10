import { useState } from "react"
import { Button } from "../../Button";
import { Input } from "../../Input"

type Props = {
  handleConfirm: (title: string) => void;
}

export const NewProjectModal = ({handleConfirm}: Props) => {
  const [title, setTitle] = useState("");
  
  return (
    <>
      <Input 
        value={title} 
        id='project-title'
        placeholder='Título' 
        setValue={setTitle} 
      />
      <Button onClick={() => handleConfirm(title)} ><p>Criar</p></Button>
    </>
  );
}