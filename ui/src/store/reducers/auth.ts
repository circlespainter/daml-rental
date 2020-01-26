import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../utils/ts'
import { AuthSuccess, AuthFailed, Action } from '../actions/auth';

export interface AuthState {
    token: string | null
    userId: string | null
    error: string | null
    loading: boolean
}

const initialState: AuthState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const authStart = (state: AuthState) =>
    updateObject(state, { error: null, loading: true })

const authSuccess = (state: AuthState, action: AuthSuccess) =>
    updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })

const authFailed = (state: AuthState, action: AuthFailed) =>
    updateObject(state, {
        ...initialState,
        error: action.error
    })

const authLogout = (state: AuthState) =>
    updateObject(state, {
        ...initialState
    })

const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state)

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action as AuthSuccess)

        case actionTypes.AUTH_FAILED:
            return authFailed(state, action as AuthFailed)

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state)
    
        default:
    }
    return state
}

export default reducer