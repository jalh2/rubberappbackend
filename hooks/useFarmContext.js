import { FarmContext } from "../context/farmContext"
import { useContext } from "react"

export const useFarmContext = () => {
  const fcontext = useContext(FarmContext)

  if(!fcontext) {
    throw Error('useFarmContext must be used inside an FarmContextProvider')
  }

  return fcontext
}