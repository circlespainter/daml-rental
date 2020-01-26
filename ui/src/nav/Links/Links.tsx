import React from 'react'

import { connect } from 'react-redux'

import DashboardIcon from '@material-ui/icons/Dashboard'

import Link from './Link'
import { AppState } from '../..'

interface OwnProps {}

interface StateProps {
    role: string | null
}

interface DispatchProps {}

type Props = OwnProps & StateProps & DispatchProps

const navigationItems: React.FC<Props> = React.memo(props => {

    const { role } = props
    
    return <div>
        { role === 'Authority' || role === 'Agency' ? <Link icon={DashboardIcon} to={`/agencyLicenses`} text="Licenses" /> : null }
        { role === 'Authority' || role === 'Agency' ? <Link icon={DashboardIcon} to={`/agencyLicenseOffers`} text="License Offers" /> : null }
        { role === 'Authority' || role === 'Landlord' ? <Link icon={DashboardIcon} to={`/properties`} text="Properties" /> : null }
        { role === 'Landlord' || role === 'Agency' ? <Link icon={DashboardIcon} to={`/rentals`} text="Rentals" /> : null }
        { role === 'Landlord' || role === 'Agency' ? <Link icon={DashboardIcon} to={`/rentalDelegateOffers`} text="Rental Offers" /> : null }
        { role !== 'Authority' ? <Link icon={DashboardIcon} to={`/visitScheduleRequests`} text="Visit Schedule Reqs." /> : null }
        { role !== 'Authority' && role !== 'Tenant' ? <Link icon={DashboardIcon} to={`/completedVisits`} text="Visited" /> : null }
        { role !== 'Authority' && role !== 'Tenant' ? <Link icon={DashboardIcon} to={`/rentalApplications`} text="Applications" /> : null }
        { role !== 'Authority' && role !== 'Tenant' ? <Link icon={DashboardIcon} to={`/rentalContractOffers`} text="Contract Offers" /> : null }
        { role !== 'Authority' && role !== 'Tenant' ? <Link icon={DashboardIcon} to={`/rentalPendingContract`} text="Pending" /> : null }
        { role !== 'Authority' && role !== 'Tenant' ? <Link icon={DashboardIcon} to={`/rentalContracts`} text="Contracts" /> : null }
    </div>
})

const mapStateToProps = (state: AppState, _: OwnProps): StateProps => ({
    role: state.auth.userId
})

export default connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps)(navigationItems)