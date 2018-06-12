import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './style.css'

import Navbar from '../../components/navbar'
import { createStore } from '../../actions/stores'
import { xanyahApi } from '../../utils/xanyah-api'

class Store extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      store: {},
    }
  }

  componentDidMount() {
    this.initStore(this.props)
  }

  componentWillReceiveProps(newProps) {
    this.initStore(newProps)
  }

  initStore(props) {
    this.setState({
      store: props.stores.find(store => store.id === props.match.params.id) || {},
      storeMemberships: [],
    })
    xanyahApi
      .get(
        'store_memberships',
        { params: { storeId: props.match.params.id }}
      )
      .then(({ data }) => this.setState({
        storeMemberships: data,
      }))
  }

  render() {
    return (
      <div className="store">
        <Navbar />
        <div className="page-container">
          {'id' in this.state.store
            ? (
              <p>{this.state.store.name}</p>)
            : <p>Loading</p>}
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
  connect(mapStateToProps, mapDispatchToProps)(Store)
)
