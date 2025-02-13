
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
//import dataPoints from './data.json'; // Ensure this path is correct


export function PlotWaterTemps() {

    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://127.0.0.1:5000/static/data.json')
                .then((res) => res.json())
                .then((jsonData) => setDataPoints(jsonData))
                .catch((error) => console.error('Error fetching JSON:', error));
        };

        // Fetch data once immediately
        fetchData();

        // Poll every 5 seconds (adjust as needed)
        const intervalId = setInterval(fetchData, 5000);

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Extract x and y values from the JSON data
    const xValues = dataPoints.map(point => new Date(point.timestamp * 1000).toISOString());
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
        xaxis: {
            title: 'Date',
            type: 'date', // Tells Plotly to interpret x values as dates.
            // Optionally, customize tick formatting:
            tickformat: '%d/%m/%Y',//'%Y-%m-%d',
        },
        yaxis: { title: 'Temperature' },
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

    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        // Fetch the JSON file from your backend
        fetch('http://127.0.0.1:5000/static/data.json')
            .then(res => res.json())
            .then(jsonData => setDataPoints(jsonData))
            .catch(error => console.error('Error fetching JSON:', error));
    }, []);

    // Extract x and y values from the JSON data
    const xValues = dataPoints.map(point => new Date(point.timestamp * 1000).toISOString()); //toLocaleDateString()
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
        xaxis: {
            title: 'Date',
            type: 'date', // Tells Plotly to interpret x values as dates.
            // Optionally, customize tick formatting:
            tickformat: '%d/%m/%Y',//'%Y-%m-%d',
        },
        yaxis: { title: 'Temperature' },
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
