import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form";
import { projectSchema } from "../../../schemas/project.schema";
import { Button } from "../../Button";
import { Input } from "../../Input"
import { Column } from "../../Layouts/Column";

type Props = {
  initialValue?: string;
  handleConfirm: (title: string) => void;
}

export const NewProjectModal = ({handleConfirm, initialValue}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  const handleSave = async (data: FieldValues) => {
    handleConfirm(data.title);
    console.log(data);
    reset();
  }

  return (
    <Column as="form" onSubmit={handleSubmit((data)=>handleSave(data))} gap="8px">
      <Input
        placeholder='Título'
        error={errors.title?.message?.toString()}
        {...register('title')}
      />
      <Button type="submit" ><p>Salvar</p></Button>
    </Column>
  );
}