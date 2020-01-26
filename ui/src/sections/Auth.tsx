import React, { useState, useMemo } from 'react'
import { Redirect, RouteComponentProps, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import { Container, Avatar, Typography, Button, makeStyles, TextField } from '@material-ui/core'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { AppState } from '..'
import { auth } from '../store/actions/auth'
import Spinner from '../widgets/Spinner'

interface OwnProps extends RouteComponentProps {}

interface StateProps {
    loading: boolean,
    isAuth: boolean,
    error?: string | null,
}

interface DispatchProps {
    onAuth: (user: string) => void,
}

type Props = OwnProps & StateProps & DispatchProps

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}))
    
const AuthComponent: React.FC<Props> = props => {
    const classes = useStyles()

    const [user, setUser] = useState<string>('')

    const { onAuth } = props

    const submitHandler = useMemo(() => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onAuth(user)
    }, [onAuth, user])

    if (props.loading)
        return <Spinner/>

    const error = props.error ? <Typography component="h1" variant="h6">{props.error}</Typography> : null

    const form = (!props.isAuth || !props.location.state) ? (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar>
                    <LockOutlinedIcon />
                </Avatar>
                <form className={classes.form} onSubmit={submitHandler}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={ev => setUser(ev.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>

                {error}
            </div>
        </Container>
    ) : <Redirect to={(props.location.state as any).originalUrl} exact/>

    return form
}

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, _: OwnProps): DispatchProps => ({
    onAuth: (user: string) => dispatch(auth(user))
})

export default withRouter(connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(AuthComponent))