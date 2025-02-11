import { PropsWithChildren } from 'react'
import { showToast } from '../utils/showToast'

type Props = {
  text: string
}

export const WithCopy = ({ text, children }: PropsWithChildren<Props>) => {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        navigator.clipboard.writeText(text)
        showToast('Copiado com sucesso!', 'info')
      }}
    >
      {children}
    </div>
  )
}
