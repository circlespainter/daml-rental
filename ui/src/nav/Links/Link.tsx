import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import useStyles from '../../material-styles/DashboardMaterialStyle'

type Props = {
    to: string,
    text: string,
    icon: any
} & RouteComponentProps

const navigationItem: React.FC<Props> = React.memo(props => {
    useStyles()

    return (
        <ListItem button onClick={() => props.history.push(props.to)}>
            <ListItemIcon>
                <props.icon/>
            </ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItem>
    )
})

export default withRouter(navigationItem)