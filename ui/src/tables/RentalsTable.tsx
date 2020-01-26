import React, { useState, useEffect, useMemo} from 'react'
import { connect } from 'react-redux'

import MaterialTable from 'material-table'
import useStyles from '../material-styles/DashboardMaterialStyle'
import { updateObject } from '../utils/ts'
import DataService from '../svc/DataService'
import { Grid, Paper } from '@material-ui/core'
import { AppState } from '..'
import Spinner from '../widgets/Spinner'

interface State {
    loading: boolean
    rows?: any[]
    error?: string
}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps

const never = 'never' as 'never'

const RentalsTable: React.FC<Props> = props => {
    const classes = useStyles()()

    const [state, setState] = useState<State>({
        loading: true,
        rows: []
    })

    const columns = [
        { title: 'Contract ID', field: 'contractId', editable: never },
        { title: 'Landlord', field: 'payload.landlord', editable: never },
        { title: 'Agency', field: 'payload.agency', editable: never },
        { title: 'Tenant', field: 'payload.tenant', editable: never },
        { title: 'Authority', field: 'payload.authority', editable: never },
        { title: 'Register ID', field: 'payload.registerId', editable: never },
    ]

    const loadData = useMemo(() => async () => {
        setState(prev => updateObject(prev, { loading: true }))

        try {
            const res = await DataService.loadContracts({moduleName: 'Rental', entityName: 'Rental'})
            setState(prev => updateObject(prev, { loading: false, rows: res }))
        } catch (err) {
            setState(prev => updateObject(prev, { loading: false, error: err, rows: [] }))
        }
    }, [])
    useEffect(() => { loadData() }, [loadData])
    
    return <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2} direction="column">
                        <Grid item container justify="center">

                            {state.loading ? <Spinner/> :
                                <MaterialTable
                                    title=''
                                    columns={columns}
                                    components={{
                                        Container: props => <div>{props.children}</div>
                                    }}
                                    data={state.rows ? state.rows : []}
                                />
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
}

export default connect<StateProps, DispatchProps, OwnProps, AppState>(null)(RentalsTable)