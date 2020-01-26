import React, { useEffect, ReactNode } from 'react'

import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'

import { connect } from 'react-redux'
import { restoreAuth } from './store/actions/auth'
import { ThunkDispatch } from 'redux-thunk'

import Auth from './sections/Auth'

import { AppState } from '.'

import useStyles from './material-styles/DashboardMaterialStyle'
import Layout from './Layout'
import { Container } from '@material-ui/core'
import AgencyLicensesTable from './tables/AgencyLicensesTable'
import AgencyLicenseOffersTable from './tables/AgencyLicenseOffersTable'
import PropertiesTable from './tables/PropertiesTable'
import RentalsTable from './tables/RentalsTable'
import RentalDelegateOffersTable from './tables/RentalDelegateOffersTable'
import VisitScheduleRequestsTable from './tables/VisitScheduleRequestsTable'
import CompletedVisitsTable from './tables/CompletedVisitsTable'
import RentalApplicationsTable from './tables/RentalApplicationsTable'
import RentalContractOffersTable from './tables/RentalContractOffersTable'
import RentalPendingContractsTable from './tables/RentalPendingContractsTable'
import RentalContractsTable from './tables/RentalContractsTable'

interface OwnProps {}

interface StateProps {
  isLoggedIn: boolean
}

interface DispatchProps {
  onRestoreAuth: () => void
}

type Props = OwnProps & StateProps & DispatchProps

interface MatchParams {
  node: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {}

const App: React.FC<Props> = props => {
  const classes = useStyles()()

  const { onRestoreAuth } = props
  useEffect(() => {
    onRestoreAuth()
  }, [onRestoreAuth])

  const authRedirect = (originalUrl: string) => <Redirect to={{pathname: '/auth', state: { originalUrl: originalUrl } }}/>

  const layout = (sectionName: string, body: JSX.Element) =>
    <Layout section={sectionName}>
      {body}
    </Layout>

  const Section: React.FC<{children: ReactNode}> = props => {
    const classes = useStyles()()
  
    return (
        <div>
          <Container maxWidth="xl" className={classes.container}>
              {props.children}
          </Container>
        </div>
    )
  }

  const section = (comp: JSX.Element) => <Section>{comp}</Section>
  
  const sections: Record<string, JSX.Element> = {
    "/agencyLicenses" : layout("agencyLicenses", section(<AgencyLicensesTable/>)),
    "/agencyLicenseOffers" : layout("agencyLicenseOffers", section(<AgencyLicenseOffersTable/>)),
    "/properties" : layout("properties", section(<PropertiesTable/>)),
    "/rentals" : layout("rentals", section(<RentalsTable/>)),
    "/rentalDelegateOffers" : layout("rentalDelegateOffers", section(<RentalDelegateOffersTable/>)),
    "/visitScheduleRequests" : layout("visitScheduleRequests", section(<VisitScheduleRequestsTable/>)),
    "/completedVisits" : layout("completedVisits", section(<CompletedVisitsTable/>)),
    "/rentalApplications" : layout("rentalApplications", section(<RentalApplicationsTable/>)),
    "/rentalContractOffers" : layout("rentalContractOffers", section(<RentalContractOffersTable/>)),
    "/rentalPendingContracts" : layout("rentalPendingContracts", section(<RentalPendingContractsTable/>)),
    "/rentalContracts" : layout("rentalContracts", section(<RentalContractsTable/>))
  }

  const routes = Object.keys(sections).map(url =>
    <Route path={url} render={({match}: MatchProps) => (
      props.isLoggedIn ? sections[url] : authRedirect(match.url)
    )} key={url}/>)

  return (
    <div className={classes.root}>
      <Switch>

        <Route path="/auth" >
          <Auth/>
        </Route>

        {routes}

        <Redirect to="/rentals"/>

      </Switch>
    </div>
  )
}

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
  isLoggedIn: state.auth.token !== null
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, _: OwnProps): DispatchProps => ({
  onRestoreAuth: () => restoreAuth(dispatch)
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(App)