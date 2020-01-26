import React from 'react'
import { CircularProgress } from '@material-ui/core'

import useStyles from '../material-styles/DashboardMaterialStyle'

const spinner: React.FC = React.memo(() => {
    useStyles()

    return (
        <div>
            <CircularProgress color="secondary"/>
        </div>
    )
})

export default spinner