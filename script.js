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
            console.log("API Response:", data);  // Log the API response

            // Check if the expected keys are present in the response

            if (data['s'] && data['s'] === 'no_data') {
                console.error("No data available for the selected stock and date range.");
                // Optionally, display a message to the user on the webpage
                document.getElementById('results').innerHTML = "<p>No data available for the selected stock and date range.</p>";
            } else if (data['t'] && data['c']) {
                const dates = data['t'].map(timestamp => new Date(timestamp * 1000).toISOString().split('T')[0]);
                const prices = data['c'];
                plotData(dates, prices);
            } else {
                console.error("Unexpected data format:", data);
            }
                        
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
