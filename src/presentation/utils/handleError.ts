import { AxiosError } from 'axios'
import { showToast } from './showToast'

export const handleError = (error: any) => {
  console.error(error)
  const errorData = (error as AxiosError)?.response?.data as {
    message: string
    status: string
  }

  showToast(
    'Erro ao processar solicitação: ' +
      (errorData?.message || 'Erro desconhecido'),
    'error'
  )
}
