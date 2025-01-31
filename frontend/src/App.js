import logo from './logo.svg';
import React from 'react';
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';

import './App.css';

function App() {
    return (
        <>
            <Button variant="info" onClick={() => console.log('es hat gebuttoned')}>Wir waren baden</Button>
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={{width: 320, height: 240, title: {text: 'A Fancy Plot'}}}
            />
        </>

    );
}

export default App;
