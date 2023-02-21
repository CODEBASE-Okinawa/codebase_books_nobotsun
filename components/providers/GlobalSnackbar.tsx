import { FC, ReactNode, useContext, createContext, useState, useMemo, useCallback } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

/** SnackbarContext コンテキストオブジェクトの型 */
export type SnackbarContextType = {
  /** Snackbar に表示する文字列。空文字列のときは Snackbar を表示しないことを意味します */
  message: string

  /** Snackbar の色 */
  severity: AlertColor // 'error' | 'warning' | 'info' | 'success'

  /** Snackbar を表示したいときに呼び出します */
  showSnackbar: (message: string, severity: AlertColor) => void
}

/** スナックバーの表示状態を管理するコンテキストオブジェクト */
export const SnackbarContext = createContext<SnackbarContextType>({
  message: '', // デフォルト値
  severity: 'error', // デフォルト値
  showSnackbar: (_message: string, _severity: AlertColor) => {}, // ダミー関数
})

/**
 * SnackbarContext コンテキストオブジェクトを提供するコンポーネント。
 *
 * このコンポーネント以下に配置した子コンポーネントであれば、
 * useSnackbar フック関数を呼び出すことができます。
 */
export const SnackbarContextProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const context: SnackbarContextType = useContext(SnackbarContext)
  const [message, setMessage] = useState(context.message)
  const [severity, setSeverity] = useState(context.severity)

  // コンテクストオブジェクトに自分自身の値を変更する関数をセットする
  const newContext: SnackbarContextType = useMemo(
    () => ({
      message,
      severity,
      showSnackbar: (message: string, severity: AlertColor) => {
        setMessage(message)
        setSeverity(severity)
      },
    }),
    [message, severity, setMessage, setSeverity]
  )

  // スナックバーを閉じるためのハンドラー関数
  const handleClose = useCallback(() => {
    setMessage('')
  }, [setMessage])

  return (
    <SnackbarContext.Provider value={newContext}>
      {children}
      <Snackbar open={newContext.message !== ''} onClose={handleClose} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={newContext.severity}>{newContext.message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

/** SnackbarContext を簡単に使うためのユーティリティ関数 */
export function useSnackbar(): SnackbarContextType {
  return useContext(SnackbarContext)
}
