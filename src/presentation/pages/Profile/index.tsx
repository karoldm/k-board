import { FieldValues, useForm } from "react-hook-form"
import { useUser } from "../../../hooks/useUser"
import { Avatar } from "../../components/Avatar"
import { Input } from "../../components/Input"
import { Column } from "../../components/Layouts/Column"
import { Tag } from "../../components/Tag"
import { WithCopy } from "../../components/WithCopy"
import { zodResolver } from "@hookform/resolvers/zod"
import { editProfileSchema } from "../../schemas/profile.schema"
import { useState } from "react"
import { Row } from "../../components/Layouts/Row"
import { Button } from "../../components/Button"
import { Nav, Wrapper } from "./style"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { CustomModal } from "../../components/Modal"
import { EditProfileModal } from "../../components/Modal/EditProfileModal"
import { useEditPassword, useEditProfile } from "../../../data/repositories/profileRepository"
import { PasswordEditPayload, ProfileEditPayload } from "../../../data/interfaces/profile"
import { showToast } from "../../utils/showToast"
import { handleError } from "../../utils/handleError"
import { User } from "../../../data/interfaces/user"
import { EditPasswordModal } from "../../components/Modal/EditPasswordModal"


export const Profile = () => {
    const [profileModal, setProfileModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)

    const { userData, setUserData, clearUserData } = useUser()

    const navigate = useNavigate()
    const {
        isPending: isPendingEditProfile, 
        mutateAsync: mutateEditProfile,
    } = useEditProfile()

    const {
        isPending: isPendingEditPassword, 
        mutateAsync: mutateEditPassword,
    } = useEditPassword()

    const handleEditProfile = async (data: ProfileEditPayload) => {
        try {
            const updatedUser: User = await mutateEditProfile(data)
            setUserData({token: userData!.token, ...updatedUser})
            showToast("Perfil editado com sucesso", "success")
        } catch (error) {
            handleError(error)
        } finally {
            setProfileModal(false)
        }
    }
    
    const handleEditPassword = async (data: PasswordEditPayload) => {
        try {
            await mutateEditPassword(data)
            showToast("Senha atualizada com sucesso", "success")
            clearUserData()
            navigate("/login")
        } catch (error) {
            handleError(error)
        } finally {
            setPasswordModal(false)
        }
    }

    return (
        <Wrapper>
            <CustomModal
            title='Editar perfil'
            visible={profileModal}
            onHide={() => {
                setProfileModal(false)
                window.onscroll = function () {}
            }}
            >
                <EditProfileModal
                    handleSave={handleEditProfile} 
                    loading={isPendingEditProfile} 
                    initialName={userData?.name ?? ""}
                    initialPhoto={userData?.photoUrl ?? ""}
                />
            </CustomModal>

            <CustomModal
                title='Editar senha'
                visible={passwordModal}
                onHide={() => {
                setPasswordModal(false)
                window.onscroll = function () {}
                }}
            >
                <EditPasswordModal handleSave={handleEditPassword} loading={isPendingEditPassword} />
            </CustomModal>

            <Nav>
            <Link to={'/'}>
                <FaArrowLeft color='#212121' />
            </Link>
            </Nav>
            <Column alignItems="center" fullHeight fullWidth justifyContent="center" gap="16px" >
                <Avatar 
                    style={{
                        width: "120px",
                        height: "120px",
                    }} 
                    editable
                    onImageClick={() => {setProfileModal(true)}}
                    image={userData?.photoUrl} 
                />
                <Input
                    style={{
                        maxWidth: "300px"
                    }}
                    defaultValue={userData?.name}
                    placeholder='Nome'
                    disabled
                />
                <Row wrap gap="32px">
                    <Button 
                        width="134px" 
                        variant="secondary"
                        onClick={() => {setPasswordModal(true)}}
                    >
                        Editar senha
                    </Button>
                    <Button 
                        width="134px"
                        onClick={() => {setProfileModal(true)}}
                    >
                        <p style={{color: "white"}}>Editar perfil</p>
                    </Button>
                </Row>
            </Column>
        </Wrapper>
    )
}