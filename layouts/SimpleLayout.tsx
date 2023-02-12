import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const SimpleLayout: FC<Props> = ({ children }) => {
  return <div>{children}</div>
}
