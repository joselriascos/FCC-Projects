import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export function useAppContext() {
  const appContext = useContext(AppContext)

  return appContext
}
