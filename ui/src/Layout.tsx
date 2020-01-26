import React, { useState, ReactNode } from 'react'

import { connect } from 'react-redux'

import { AppState } from '.'

import useStyles from './material-styles/DashboardMaterialStyle'
import Appbar from './nav/Appbar'
import Drawer from './nav/Drawer'

interface State {
    open : boolean
}

interface OwnProps {
    section: string
    children: ReactNode
}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps

const Layout: React.FC<Props> = props => {
    const classes = useStyles()()

    const [state, setState] = useState<State>({
        open: true
    })

    const sideDrawerOpenHandler = () => {
        setState({ open: true })
    }

    const sideDrawerCloseHandler = () => {
        setState({ open: false })
    }

    return (
        <React.Fragment>
            <Appbar
                open={state.open}
                drawerOpenClicked={sideDrawerOpenHandler}
                section={props.section}/>
            <Drawer
                open={state.open}
                drawerCloseClicked={sideDrawerCloseHandler}/>

            <main className={classes.content}>
                {/* <div className={classes.appBarSpacer} /> */}
                {props.children}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
    isAuthenticated: state.auth.token !== null
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps)(Layout)