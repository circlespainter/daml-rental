import React from 'react'

import clsx from 'clsx';

import { Drawer, IconButton, Divider } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Links from './Links/Links';
import useStyles from '../material-styles/DashboardMaterialStyle';

type Props = {
    open: boolean,
    drawerCloseClicked: () => void
}

const drawer: React.FC<Props> = React.memo(props => {
    const classes = useStyles()()

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.drawerCloseClicked}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <Links />
        </Drawer>
    )
})

export default drawer