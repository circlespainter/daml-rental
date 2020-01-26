import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App'
import * as serviceWorker from './serviceWorker'

import auth, { AuthState } from './store/reducers/auth'

import './index.css'

const composeEnhancers =
    (process.env.NODE_ENV === 'development' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface AppState {
    auth: AuthState
}

const rootReducer = combineReducers<AppState>({
    auth: auth
})

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const theme = createMuiTheme({
    palette: {
      type: 'dark'
    }
})

const app = (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <Provider store={store}>
            <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
                <App />
            </BrowserRouter>
        </Provider>
    </MuiThemeProvider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
