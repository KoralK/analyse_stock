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

    Plotly.newPlot('chartContainer', [trace], layout);
}

function fetchAndPlotData() {
    const apiKey = 'PFWM5H94IR01A1HR';
    const ticker = document.getElementById('stockTicker').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&apikey=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const timeSeries = data['Time Series (Daily)'];
            const dates = [];
            const prices = [];

            for (let date in timeSeries) {
                if (date >= startDate && date <= endDate) {
                    dates.push(date);
                    prices.push(parseFloat(timeSeries[date]['4. close']));
                }
            }

            // Plot the data using Plotly.js
            plotData(dates, prices);
        })
        .catch(error => {
            console.error("Error fetching stock data:", error);
        });
}

