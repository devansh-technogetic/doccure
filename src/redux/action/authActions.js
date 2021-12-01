import { message } from "antd"
import { handleResponseMsg } from "../../utils/globalFunctions"
import { LOGIN_ERROR, LOGIN_LOAD, LOGIN_SUCCESS } from "../types"

export const loginAction = () => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_LOAD,
            payload: true
        })
        try {
            return dispatch({
                type: LOGIN_SUCCESS,
                message: handleResponseMsg(message)
                
            })
        } catch (err) {
            return dispatch({
                type: LOGIN_ERROR,
                message: err?.message
            })
        }
    }
}
