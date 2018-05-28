import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.css';

import Navbar from '../../components/navbar';

const Dashboard = ({ stores }) => (
  <div className="dashboard">
    <Navbar />
    <div className="page-container">
      <div className="table-header">
        <h3>Your stores ({stores.length})</h3>
        <Link to="/stores/new">+ Create a store</Link>
      </div>
      <div className="stores">
        {stores.map(store => (
          <div className="store" key={store.id}>
            <div className="name">
              <Link to="#">{store.name}</Link>
            </div>
            <div className="country">{store.country}</div>
            <div className="created-at">{store.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ stores: { stores } }) => ({
  stores
});

export default connect(mapStateToProps)(Dashboard);
