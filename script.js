const API_KEY = 'cjiacb9r01qonds7mqhgcjiacb9r01qonds7mqi0'; // Replace with your Finnhub API key

function plotData(dates, prices) {
    const trace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Stock Price',
        x: dates,
        y: prices,
        line: {color: '#17BECF'}
    };

    const layout = {
        title: 'Stock Price Over Time',
        xaxis: {
            title: 'Date',
            type: 'date'
        },
        yaxis: {
            title: 'Price (in USD)'
        }
    };

    Plotly.newPlot('results', [trace], layout);
}

function fetchData() {
    const stockSymbol = document.getElementById('stock').value;
    const startDate = new Date(document.getElementById('startDate').value).getTime() / 1000; // Convert to UNIX timestamp
    const endDate = new Date(document.getElementById('endDate').value).getTime() / 1000; // Convert to UNIX timestamp

    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=D&from=${startDate}&to=${endDate}&token=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Assuming the 't' key in the response contains the dates (UNIX timestamps)
            console.log(data); 
            const dates = data['t'].map(timestamp => new Date(timestamp * 1000).toISOString().split('T')[0]);
            const prices = data['c'];

            // Plot the data using Plotly.js
            plotData(dates, prices);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}