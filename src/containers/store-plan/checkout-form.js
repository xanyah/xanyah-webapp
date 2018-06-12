import React from 'react'
import {
  CardElement,
  injectStripe,
} from 'react-stripe-elements'

class CheckoutForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()

    this.props.stripe
      .createToken()
      .then(({token}) =>
        this.props.onSubmit(token))
  }

  render() {
    return (
      <form className="checkout-form" onSubmit={e => this.handleSubmit(e)}>
        <h1>Pay for your subscription</h1>
        <CardElement hidePostalCode />
        <button type="submit">Button</button>
      </form>)
  }
}

export default injectStripe(CheckoutForm)

