import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { I18n } from 'react-redux-i18n'
import {
  Elements,
  StripeProvider,
} from 'react-stripe-elements'
import CheckoutForm from './checkout-form'

import './style.css'

import Navbar from '../../components/navbar'
import Switch from '../../components/switch'
import { createStore } from '../../actions/stores'
import { xanyahApi } from '../../utils/xanyah-api'

class StorePlan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      plan: {},
      yearly: false,
    }
  }

  handleSubmit(token) {
    xanyahApi
      .post(
        'subscriptions',
        {
          subscription: {
            frequency: this.state.yearly ? 'yearly' : 'monthly',
            planId: this.state.plan.id,
            storeId: this.props.match.params.id,
            stripeTokenId: token.id,
          },
        })
  }

  render() {
    return (
      <div className="store-plan">
        <Navbar />
        <div className="page-container">
          {'id' in this.state.plan
            ? (
              <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TOKEN}>
                <Elements>
                  <CheckoutForm onSubmit={token => this.handleSubmit(token)} />
                </Elements>
              </StripeProvider>)
            : [
              <h1 key="title">{I18n.t('pages.storePlan.form.title')}</h1>,
              <Switch
                key="switch"
                checked={this.state.yearly}
                labels={[
                  I18n.t('plans.periods.monthly'),
                  I18n.t('plans.periods.yearly'),
                ]}
                onChange={e => this.setState({ yearly: e.target.checked })}
              />,
              <div className="plans" key="plans">
                {this.props.plans.map(plan => (
                  <div
                    className={`plan plan-${plan.gatewayId}`}
                    key={plan.gatewayId}
                  >
                    <h2>{I18n.t(`plans.${plan.gatewayId}.title`)}</h2>
                    <h3>{I18n.t(`plans.${plan.gatewayId}.description`)}</h3>
                    <ul>
                      <li>
                        {plan.maxUsers > 0
                          ? I18n.t('pages.storePlan.form.maxUsers', {count: plan.maxUsers})
                          : I18n.t('pages.storePlan.form.unlimitedUsers')}
                      </li>
                      <li>
                        {plan.maxVariants > 0
                          ? I18n.t('pages.storePlan.form.maxVariants', {count: plan.maxVariants})
                          : I18n.t('pages.storePlan.form.unlimitedVariants')}
                      </li>
                    </ul>
                    <p className="price">
                      {this.state.yearly
                        ? plan.humanizedYearlyPrice
                        : plan.humanizedMonthlyPrice} €
                    </p>
                    <button onClick={() => this.setState({ plan })}>
                      Select
                    </button>
                  </div>))}
              </div>,
            ]}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ plans: { plans }, stores: { stores } }) => ({
  plans,
  stores,
})

const mapDispatchToProps = dispatch => ({
  createStore: params => dispatch(createStore(params)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StorePlan)
)
