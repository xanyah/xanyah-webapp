import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { replace } from 'react-router-redux'
import {
  loadTranslations,
  setLocale,
} from 'react-redux-i18n'
import PropTypes from 'prop-types'

import Dashboard from '../dashboard'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import Store from '../store'
import StoreNew from '../store-new'
import StorePlan from '../store-plan'

import translations from '../../i18n'
import { xanyahApi } from '../../utils/xanyah-api'
import { getPlans } from '../../actions/plans'
import { getStores } from '../../actions/stores'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.props.dispatch(loadTranslations(translations))
    this.props.dispatch(setLocale('en'))
  }

  componentDidMount() {
    xanyahApi
      .get('auth/validate_token')
      .then(({ data: { data: { locale } } }) => {
        this.props.dispatch(setLocale(locale))
        this.props.getPlans()
        this.props.getStores()
      })
      .catch(() => {
        if (!['/sign-in', '/sign-up'].includes(window.location.pathname)) {
          this.props.goTo('/sign-in')
        }
      })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/stores/new" component={StoreNew} />
          <Route exact path="/stores/:id" component={Store} />
          <Route exact path="/stores/:id/plans" component={StorePlan} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  getStores: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  getPlans: () => dispatch(getPlans()),
  getStores: () => dispatch(getStores()),
  goTo: route => dispatch(replace(route)),
})

export default withRouter(connect(null, mapDispatchToProps)(App))
