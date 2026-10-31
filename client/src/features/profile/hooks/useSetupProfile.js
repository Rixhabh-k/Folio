import { useContext } from "react";
import {SetupProfileContext} from "../completeProfile.context"

export function useSetupProfile(){
    const context = useContext(SetupProfileContext)
    return context
}
