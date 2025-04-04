import { Input } from "../../Input"
import { Column } from "../../Layouts/Column"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editProfileSchema } from "../../../schemas/profile.schema"
import { ProfileEditPayload } from "../../../../data/interfaces/profile"
import { useState } from "react"
import { Button } from "../../Button"
import { useUser } from "../../../../hooks/useUser"
import { Avatar } from "../../Avatar"

type Props = {
    handleSave: (data: ProfileEditPayload) => void
    loading: boolean,
    initialName: string,
    initialPhoto: string
}

export const EditProfileModal = ({ handleSave, loading, initialName, initialPhoto }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: initialName
        }
    })

    const [file, setFile] = useState<File | undefined>()
    const [imageUrl, setImageUrl] = useState<string | null>(null)

    return (
        <Column
            as='form'
            onSubmit={handleSubmit((data) => handleSave({name: data.name, photo: file}))}
            gap='8px'
        >
        <Avatar
            style={{height: "120px", width: "120px"}} 
            image={imageUrl || initialPhoto}
         />
        <Input
            type='file'
            accept="image/png, image/jpeg"
            placeholder='Foto'
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0])
                    setImageUrl(URL.createObjectURL(e.target.files[0]))
                }
            }}
        />
        <Input
            placeholder='Nome completo'
            error={errors.name?.message?.toString()}
            {...register('name')}
        />
        <Button loading={loading} type='submit'>
            <p>Salvar</p>
        </Button>
    </Column>
    )
}