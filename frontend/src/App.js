import React from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';
import {PlotWaterTemps, PlotAirTemps} from './PlotlyChart';

function App() {
    const handleButtonClick = () => {
        fetch("http://127.0.0.1:5000/run-python-script", {
            method: "POST", // Ensure this is POST
            headers: {
                "Content-Type": "application/json",
            },
            // Optionally include a body if your endpoint expects one:
            // body: JSON.stringify({ key: "value" }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Response from server:", data);
            })
            .catch(error => {
                console.error("Error executing script:", error);
            });
    };

    return (
        <>
            <Button onClick={handleButtonClick} variant="info">Wir waren baden</Button>

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
