const API_KEY = 'cjiacb9r01qonds7mqhgcjiacb9r01qonds7mqi0'; // Replace with your Finnhub API key

function fetchData() {
    const stockSymbol = document.getElementById('stock').value;
    const startDate = new Date(document.getElementById('startDate').value).getTime() / 1000; // Convert to UNIX timestamp
    const endDate = new Date(document.getElementById('endDate').value).getTime() / 1000; // Convert to UNIX timestamp

    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${stockSymbol}&resolution=D&from=${startDate}&to=${endDate}&token=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Display the data (for demonstration purposes, you can format it as you like)
            document.getElementById('results').innerText = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
