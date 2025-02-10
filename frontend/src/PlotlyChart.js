
import React from 'react';
import Plot from 'react-plotly.js';
import dataPoints from './data.json'; // Ensure this path is correct

export function PlotWaterTemps() {
    // Extract x and y values from the JSON data
    const xValues = dataPoints.map(point => point.timestamp);
    const yValues = dataPoints.map(point => point.watertemp);

    // Prepare the data object for Plotly
    const data = [
        {
            x: xValues,
            y: yValues,
            type: 'scatter',          // 'scatter' for line charts
            mode: 'lines+markers',    // Include both lines and markers
            marker: { color: 'blue' },
        }
    ];

    // Define the layout for the plot
    const layout = {
        title: 'Water Temperature',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Water temperature' },
    };

    return (
        <div>
            <h2>Water Temperature</h2>
            <Plot
                data={data}
                layout={layout}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export function PlotAirTemps() {
    // Extract x and y values from the JSON data
    const xValues = dataPoints.map(point => point.timestamp);
    const yValues = dataPoints.map(point => point.airtemp);

    // Prepare the data object for Plotly
    const data = [
        {
            x: xValues,
            y: yValues,
            type: 'scatter',          // 'scatter' for line charts
            mode: 'lines+markers',    // Include both lines and markers
            marker: { color: 'grey' },
        }
    ];

    // Define the layout for the plot
    const layout = {
        title: 'Air Temperature',
        xaxis: { title: 'Date' },
        yaxis: { title: 'Air temperature' },
    };

    return (
        <div>
            <h2>Air Temperature</h2>
            <Plot
                data={data}
                layout={layout}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

//export default PlotWaterTemps;
