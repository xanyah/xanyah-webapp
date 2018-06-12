import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Select from 'react-select'
import { I18n } from 'react-redux-i18n'

import './style.css'

import Navbar from '../../components/navbar'
import { countryList } from '../../utils/countries-helper'
import { slugify } from '../../utils/data-helper'
import { createStore } from '../../actions/stores'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      country: '',
      key: '',
      name: '',
    }
  }

  handleSubmit(e) {
    const { address, country, key, name } = this.state
    e.preventDefault()

    this.props.createStore({
      address,
      country: country.value,
      key,
      name,
    })

    this.props.history.push('/')
  }

  render() {
    return (
      <div className="store-new">
        <Navbar />
        <div className="page-container">
          <form onSubmit={e => this.handleSubmit(e)}>
            <h1>{I18n.t('pages.storeNew.form.title')}</h1>
            <input
              onChange={e =>
                this.setState({
                  key: slugify(e.target.value),
                  name: e.target.value,
                })
              }
              placeholder={I18n.t('pages.storeNew.form.name')}
              type="text"
              value={this.state.name}
            />
            <input
              onChange={e => this.setState({ key: slugify(e.target.value) })}
              type="text"
              placeholder={I18n.t('pages.storeNew.form.key')}
              value={this.state.key}
            />
            <Select
              name="form-field-name"
              value={this.state.country}
              onChange={e => this.setState({ country: e })}
              options={countryList}
              placeholder={I18n.t('pages.storeNew.form.country')}
            />
            <textarea
              onChange={e => this.setState({ address: e.target.value })}
              placeholder={I18n.t('pages.storeNew.form.address')}>
              {this.state.address}
            </textarea>
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ stores: { stores } }) => ({
  stores,
})

const mapDispatchToProps = dispatch => ({
  createStore: params => dispatch(createStore(params)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
)
