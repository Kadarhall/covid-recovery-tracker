import React, { useEffect, useState } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//import Dashboard from './Dashboard';
import Map from './Map';
//import NotFound from './NotFound';
//import PageTemplate from './PageTemplate';
//import useInterval from 'useInterval';
import { getUSStates } from './services';

import './App.css';
import '../node_modules/react-vis/dist/style.css';

// export const paths = {
//   dashboard: {
//     name: 'Dashboard',
//     path: '/dashboard',
//   },
//   map: {
//     name: 'World Map',
//     path: '/',
//   },
// };

function App() {
  const [totals, setTotals] = useState({
    active: 0,
    affectedCountries: 0,
    cases: 0,
    deaths: 0,
    prevActive: 0,
    prevCases: 0,
    prevDeaths: 0,
    prevRecovered: 0,
    recovered: 0,
    tests: 0,
    updated: null,
  });

  const [localData, setLocalData] = useState(null);
  const _getTotals = async () => {
    const { data } = await getUSStates();
    let caseCnt = 0, activeCnt = 0, deathsCnt = 0, recoveredCnt = 0;

    setLocalData({
      ...data,
    });

    data.map( d => {
      caseCnt = d.cases + caseCnt;
      activeCnt = d.active + activeCnt;
      deathsCnt = d.deaths + deathsCnt;
      recoveredCnt = d.recovered + recoveredCnt;
    });
    //console.log(data);

    totals.active = activeCnt;
    totals.cases = caseCnt;
    totals.deaths = deathsCnt;
    totals.recovered = recoveredCnt;

    setTotals({
      prevActive: totals.active,
      prevCases: totals.cases,
      prevDeaths: totals.deaths,
      prevRecovered: totals.recovered,
      cases: caseCnt,
      active: activeCnt,
      deaths: deathsCnt,
      recovered: recoveredCnt,
    });
  };

  // Get total data every 2 minutes
  //useInterval(_getTotals, 1000 * 60 * 2);

  // On mount
  useEffect(() => {
    // Initialize Google Analytics
    // ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    // ReactGA.pageview(window.location.pathname + window.location.search);

    _getTotals();
  }, []); // eslint-disable-line

  return (
    <Map totals={totals} />
  );
}

export default App;