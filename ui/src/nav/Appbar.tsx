import React, { useState, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'

import clsx from 'clsx'

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import useStyles from '../material-styles/DashboardMaterialStyle'
import { AppState } from '..'
import { logout } from '../store/actions/auth'

interface OwnProps extends RouteComponentProps {
  open: Boolean
  section: string
  drawerOpenClicked: () => void
}

interface StateProps {
  user: String | null
}

interface DispatchProps {
    onLogout: () => void
}

type Props = OwnProps & StateProps & DispatchProps

const appbar: React.FC<Props> = React.memo(props => {
    const classes = useStyles()()

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event: SyntheticEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <AppBar position="absolute" className={clsx(classes.appBar, props.open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={props.drawerOpenClicked}
            className={clsx(classes.menuButton, props.open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="center">
            DAML Rental Demo
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
              <Typography>
                {props.user}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose() ; props.onLogout() }}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    )
})

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
  user: state.auth.userId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, _: OwnProps): DispatchProps => ({
  onLogout: () => dispatch(logout())
})

export default withRouter(connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(appbar))