import React from 'react';
import './App.scss';

export default state => {
  console.log('State in popup = ', state);
  return (
    <div>
      <h1>My React App Works!!</h1>
      <button type="button" className="btn">Play</button>
      <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
          <button className="btn btn-primary" type="button">Go somewhere</button>
        </div>
      </div>
    </div>
  );
};
