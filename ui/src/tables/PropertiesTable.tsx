import React, { useState, useEffect, useMemo} from 'react'
import { connect } from 'react-redux'

import MaterialTable from 'material-table'

import { Grid, TextField, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { updateObject } from '../utils/ts'
import useStyles from '../material-styles/DashboardMaterialStyle'
import DataService, { PropertyData } from '../svc/DataService'
import { AppState } from '..'
import Spinner from '../widgets/Spinner'

interface State {
    loading: boolean
    creating: boolean
    rows?: any[]
    error?: string | null
}

interface OwnProps {}

interface StateProps {
    user: string | null
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps

const never = 'never' as 'never'

const PropertiesTable: React.FC<Props> = props => {
    const classes = useStyles()()

    const [state, setState] = useState<State>({
        loading: true,
        creating: false,
        rows: []
    })

    const [form, setForm] = useState<PropertyData>({
        authority: '',
        landlord: '',
        tenant: '',
        registerId: ''
    })

    const columns = [
        { title: 'Contract ID', field: 'contractId', editable: never },
        { title: 'Authority', field: 'payload.authority', editable: never},
        { title: 'Landlord', field: 'payload.landlord', editable: never},
        { title: 'Tenant', field: 'payload.tenant', editable: never},
        { title: 'Register ID', field: 'payload.registerId', editable: never}
    ]

    const loadData = useMemo(() => async () => {
        setState(prev => updateObject(prev, { loading: true }))

        try {
            const res = await DataService.loadContracts({moduleName: 'Rental', entityName: 'Property'})
            setState(prev => updateObject(prev, { loading: false, rows: res }))
        } catch (err) {
            setState(prev => updateObject(prev, { loading: false, error: err.message}))
        }
    }, [])
    useEffect(() => { loadData() }, [loadData])

    const handleCancel = () => setState(prev => updateObject(prev, { creating : false }))

    const handleSubscribe = async () => {
        setState(prev => updateObject(prev, { creating : false }))
        setState(prev => updateObject(prev, { loading: true }))

        try {
            await DataService.newProperty(form) // TODO this should really be done via redux
            await loadData()
            setState(prev => updateObject(prev, { loading: false }))
        } catch (err) {
            setState(prev => updateObject(prev, { loading: false, error: err.message}))
        }
    }

    const handleCloseError = async () => {
        setState(prev => updateObject(prev, { loading: false, error: null}))
    }

    const handleRent = async (contractId: string) => {
        setState(prev => updateObject(prev, { loading: true }))

        try {
            await DataService.rentProperty(contractId) // TODO this should really be done via redux
            await loadData()
            setState(prev => updateObject(prev, { loading: false }))
        } catch (err) {
            setState(prev => updateObject(prev, { loading: false, error: err.message}))
        }
    }

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
                                    actions={ props.user === "Authority" ? [{
                                        icon: 'add',
                                        tooltip: 'Add Property',
                                        isFreeAction: true,
                                        onClick: () => setState(prev => updateObject(prev, { creating : true }))
                                    }] : [{
                                        icon: 'homework',
                                        tooltip: 'Rent Property',
                                        onClick: (_, rowData) => handleRent(rowData.contractId)
                                    }]}
                                />
                            }
                        </Grid>
                        { state.error ?
                            <Grid item container justify="center">
                                <Dialog open={!!state.error} onClose={handleCloseError} aria-labelledby="form-dialog-title" aria-describedby="alert-dialog-description">
                                    <DialogTitle id="form-dialog-title">Error</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {state.error}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseError} color="primary">
                                            Close
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            : null
                        }
                        <Grid item container justify="center">
                            <Dialog open={state.creating} onClose={handleCancel} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Create Property</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="authority"
                                        label="Authority"
                                        type="text"
                                        fullWidth
                                        onChange={ev => setForm(prev => updateObject(prev, {authority : ev.target.value}))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="landlord"
                                        label="Landlord"
                                        type="text"
                                        fullWidth
                                        onChange={ev => setForm(prev => updateObject(prev, {landlord : ev.target.value}))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="tenant"
                                        label="Tenant"
                                        type="text"
                                        fullWidth
                                        onChange={ev => setForm(prev => updateObject(prev, {tenant : ev.target.value}))}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="registerId"
                                        label="Register ID"
                                        type="text"
                                        fullWidth
                                        onChange={ev => setForm(prev => updateObject(prev, {registerId : ev.target.value}))}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCancel} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleSubscribe} color="primary">
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
}

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
    user: state.auth.userId
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps)(PropertiesTable)