import { useMutation } from "@tanstack/react-query"
import { PasswordEditPayload, ProfileEditPayload } from "../interfaces/profile"
import { profileService } from "../services/profileService"

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (payload: ProfileEditPayload) => profileService.editProfile(payload),
  })
}

export const useEditPassword = () => {
  return useMutation({
    mutationFn: (payload: PasswordEditPayload) => profileService.editPassword(payload),
  })
}