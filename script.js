// config.js will be generated during deployment and contains the API_KEY
// const API_KEY = 'your-api-key'; // This line will be replaced during build

function plotData(dates, prices) {
    const trace = {
        type: 'scatter',
        mode: 'lines',
        name: 'Stock Price',
        x: dates,
        y: prices,
        line: { color: '#17BECF' }
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

            if (data['s'] && data['s'] === 'no_data') {
                console.error("No data available for the selected stock and date range.");
                document.getElementById('results').innerHTML = "<p class='text-danger'>No data available for the selected stock and date range.</p>";
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
            document.getElementById('results').innerHTML = "<p class='text-danger'>Error fetching data.</p>";
        });
}

function populateStockSymbols() {
    const url = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Stock Symbols API Response:", data);  // Log the API response

            if (Array.isArray(data)) {  // Check if data is an array
                const stockDropdown = document.getElementById('stock');
                data.forEach(stock => {
                    const option = document.createElement('option');
                    option.value = stock.symbol;
                    option.textContent = stock.description;
                    stockDropdown.appendChild(option);
                });
            } else {
                console.error("Unexpected data format for stock symbols:", data);
            }
        })
        .catch(error => {
            console.error('Error fetching stock symbols:', error);
        });
}

window.onload = populateStockSymbols;
