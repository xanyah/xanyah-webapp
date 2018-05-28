import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'

import Dashboard from '../dashboard'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import StoreNew from '../store-new'
import { xanyahApi } from '../../utils/xanyah-api'
import { getStores } from '../../actions/stores'

class App extends React.Component {
  componentDidMount() {
    xanyahApi
      .get('auth/validate_token')
      .then(() => this.props.getStores())
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
        <main>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/stores/new" component={StoreNew} />
        </main>
      </div>
    )
  }
}

App.propTypes = {
  getStores: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  getStores: () => dispatch(getStores()),
  goTo: route => dispatch(push(route)),
})

export default withRouter(connect(null, mapDispatchToProps)(App))
