import { Input } from "../../Input"
import { Column } from "../../Layouts/Column"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editProfileSchema } from "../../../schemas/profile.schema"
import { PasswordEditPayload } from "../../../../data/interfaces/profile"
import { useState } from "react"
import { Button } from "../../Button"
import { editPasswordSchema } from "../../../schemas/password.schema"

type Props = {
    handleSave: (data: PasswordEditPayload) => void
    loading: boolean
}

export const EditPasswordModal = ({ handleSave, loading }: Props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editPasswordSchema),
    })

    return (
        <Column
            as='form'
            onSubmit={handleSubmit((data) => handleSave({password: data.password}))}
            gap='8px'
        >
        <Input
            type="password"
            placeholder='Nova senha'
            error={errors.password?.message?.toString()}
            {...register('password')}
        />
        <Input
            type="password"
            placeholder='Confirme a senha'
            error={errors.confirm?.message?.toString()}
            {...register('confirm')}
        />
        <Button loading={loading} type='submit'>
            <p>Salvar</p>
        </Button>
    </Column>
    )
}