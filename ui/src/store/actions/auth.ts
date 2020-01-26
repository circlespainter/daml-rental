import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import * as actionTypes from './actionTypes'

import AuthService from '../../svc/AuthService'
import { Dispatch } from 'react'

// Action Definition

export interface AuthStart {
    type: typeof actionTypes.AUTH_START
}

export interface AuthSuccess {
    type: typeof actionTypes.AUTH_SUCCESS
    idToken: string
    userId: string
}

export interface AuthFailed {
    type: typeof actionTypes.AUTH_FAILED
    error: string
}

export interface Logout {
    type: typeof actionTypes.AUTH_LOGOUT
}

// Union Action Types

export type Action = AuthStart | AuthSuccess | AuthFailed | Logout

// Action Creators

export const authStart = (): AuthStart => ({ type: actionTypes.AUTH_START })

export const authSuccess = (token: string, email: string): AuthSuccess =>
    ({ type: actionTypes.AUTH_SUCCESS, idToken: token, userId: email })

export const authFailed = (err: string): AuthFailed =>
    ({ type: actionTypes.AUTH_FAILED, error: err })

const clearAuthStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
    
export const logout = (): Logout => {
    clearAuthStorage()
    return { type: actionTypes.AUTH_LOGOUT }
}

// Action Orchestrators

const store = (token: string, user: string): void => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', user)
}

export const auth = (user: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => (
    async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
        dispatch(authStart())

        try {
            const token = await AuthService.signIn(user)
            store(token, user)
            dispatch(authSuccess(token, user))
        } catch (err) {
            dispatch(authFailed(err))
        }
    }
)

const authStore = () => ({ token: localStorage.getItem('token'), user: localStorage.getItem('user') })

export const restoreAuth = (dispatch: Dispatch<AnyAction>): void => {
    const authInfo = authStore()
    if (authInfo.token && authInfo.user)
        dispatch(authSuccess(authInfo.token, authInfo.user))
    else
        dispatch(logout())
}