# Daml Rental

A toy property rental process built on the [Daml Smart Contract Platform](https://daml.com/).

It includes:

- A [Daml model](https://docs.daml.com/daml/intro/0_Intro.html).
- A [Daml trigger](https://docs.daml.com/triggers/index.html).
- A partial [React](https://reactjs.org/) UI built with [`create-react-app --typescript`](https://reactjs.org/docs/create-a-new-react-app.html) and leveraging [React-Redux](https://redux.js.org/basics/usage-with-react), [Axios](https://github.com/axios/axios), [Material UI](https://material-ui.com) with `dark` palette type, [Material Table](https://material-table.com) and the [Daml JSON API](https://docs.daml.com/json-api/index.html). It is inspired by the Material UI Sign-in example, the Material UI Dashboard example (both available [here](https://material-ui.com/getting-started/templates/)) and most of the [theme configuration](ui/src/material-style/DashboardMaterialStyle.tsx) is actually taken verbatim from the latter (so due credits apply and the Material UI license may also apply to that code portion).

Also, many of the React/TS patterns come from [React - The Complete Guide (incl Hooks, React Router, Redux)](https://www.udemy.com/course/react-the-complete-guide-incl-redux).

## Notes

The JWT tokens in [`AuthService`](ui/src/svc/AuthService.tsx) have ben generated via https://jwt.io and can be decoded and inspected there.

## Limitations

At present only two choices are implemented and the rest are left out as an exercise to the reader ;) : `Authority` registers a property and `Landlord` puts it to rent; the rest of the steps have to be carried out using the [Daml Navigator](https://docs.daml.com/tools/navigator/index.html) UI.

## Getting started

Running it requires the [Daml SDK](https://docs.daml.com/0.13.46/index.html) (0.13.46 or above) as well as [`yarn`](https://yarnpkg.com/) (and their respective prerequisites).

In the first terminal:

```bash
cd ledger

daml build

daml sandbox --wall-clock-time --ledgerid rental .daml/dist/rental-0.0.1.dar
```

In the second terminal:
```bash
cd ledger

daml json-api --ledger-host localhost --ledger-port 6865 --http-port 7575
```

In the third terminal:

```bash
cd cleanup-trigger

daml build

daml trigger -w --dar .daml/dist/cleanup-trigger-0.0.1.dar --trigger-name CleanupTrigger:cleanupTrigger --ledger-host localhost --ledger-port 6865 --ledger-party Agency
```

In the fourth terminal:

```bash
cd ui

yarn

yarn start
```

Access http://localhost:3000 and log in as `Authority` to start the process. You can add a property in the "Properties" tab
by pressing the `+` button next to the search. Use `Authority`, `Landlord` and `Tenant` as the parties and anything you like as the register ID.

Now log out and log in again as `Landlord`: in the "Properties" tab you should see your property and you can rent it by pressing the "home" button to the left of it, in the "Actions" column. The property should now have disappeared from "Properties" and appeared in "Rentals".

Currently, the React UI has full display support but it only allows two actions: an authority can create a property and a landlord can rent it; all other actions need to be carried out through the Daml navigator.

## Users and roles

1. `Authority`: a well-known authority that registers properties as DAML contracts to their landlords and grants licenses to rental agencies.
1. `Landlord`: owns a property and can delegate its rental to an agency.
1. `Agency`: can accept to rent a property and governs the whole rental process on behalf of the landlord.
1. `Tenant`: is the current tenant of a property, agrees and runs property visits.
1. `Renter1` and `Renter2`: two prospect renters that can be invited to visits by the agency.

## The full "happy path"

1. The authority registers a property to a landlord (and to a tenant) and offers a license to a rental agency.
1. The agency accepts the license.
1. The landlord puts the property for rent and offers to delegate the rental (exclusively) to an agency.
1. The agency accepts the rental and invites one or more prospect renters (that made initial contact outside of the application) for a visit.
1. The prospect renter(s) ask the current tenant to schedule a visit.
1. The current tenant schedules (and runs) the visit(s).
1. The prospect renter(s) may apply for the rental.
1. The agency may accept _at most one_ application and emits a corresponding rental contract offer while locking the rental and preventing further applications from being accepted.
1. The prospect renter that has been offered a contract may accept it.

The property is now rented to a new tenant!

## Gotchas

Of course any stage can fail: the agency license can be withdrawn and any offer / invitation can be rejected. This means that visitors and applicants can become stuck and the trigger takes care of these cases

## TODOs

Besides the limitations noted above, lots of, as further exercises left to the reader :)

## LICENSE

0BSD (i.e. no limitations whatsoever).
