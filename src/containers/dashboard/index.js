import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { I18n } from 'react-redux-i18n'

import './style.css'

import Navbar from '../../components/navbar'

const Dashboard = ({ stores }) => (
  <div className="dashboard">
    <Navbar />
    <div className="page-container">
      <div className="table-header">
        <h3>{I18n.t('pages.dashboard.storesCount', { count: stores.length })}</h3>
        <Link to="/stores/new">+ {I18n.t('pages.dashboard.createStore')}</Link>
      </div>
      <div className="stores">
        {stores.map(store => (
          <div className="store" key={store.id}>
            <div className="name">
              <Link to={`/stores/${store.id}`}>{store.name}</Link>
            </div>
            <div className="country">{store.country}</div>
            <div className="created-at">{store.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ stores: { stores } }) => ({
  stores,
})

export default connect(mapStateToProps)(Dashboard)
