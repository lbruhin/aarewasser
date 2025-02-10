import React from 'react';
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';

import './App.css';
import {PlotWaterTemps, PlotAirTemps} from './PlotlyChart';

function App() {

    return (
        <>
            <Button variant="info" onClick={() => console.log('es hat gebuttoned')}>Wir waren baden</Button>

            <div className="App">
                <PlotWaterTemps/>
            </div>
            <div className="App">
                <PlotAirTemps/>
            </div>
        </>

    );
}

export default App;
