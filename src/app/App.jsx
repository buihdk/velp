import React from 'react';
import { hot } from 'react-hot-loader/root';

import GoogleMaps from '../components/map/GoogleMap';

const App = () => (
  <>
    <h1>Velp</h1>
    <GoogleMaps />
  </>
);

export default hot(App);
