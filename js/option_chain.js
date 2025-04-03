// js/option_chain.js

async function fetchOptionChain() {
    const ticker = document.getElementById('ticker').value.toUpperCase();
    const resultDiv = document.getElementById('result');
    
    if (!ticker) {
      resultDiv.innerHTML = '<p>Please enter a ticker symbol.</p>';
      return;
    }
  
    resultDiv.innerHTML = '<p>Loading data for ' + ticker + '...</p>';
  
    try {
      const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/options/${ticker}`);
      const data = await response.json();
  
      if (!data.optionChain || !data.optionChain.result[0]) {
        resultDiv.innerHTML = '<p>No option chain data available for ' + ticker + '.</p>';
        return;
      }
  
      const options = data.optionChain.result[0].options[0];
      const calls = options.calls.slice(0, 10); // Just display first 10 for demo purposes
      const puts = options.puts.slice(0, 10);
  
      let html = '<h3>Calls (Top 10)</h3><table><tr><th>Strike</th><th>Price</th><th>Open Interest</th></tr>';
      calls.forEach(call => {
        html += `<tr><td>${call.strike}</td><td>${call.lastPrice}</td><td>${call.openInterest}</td></tr>`;
      });
      html += '</table>';
  
      html += '<h3>Puts (Top 10)</h3><table><tr><th>Strike</th><th>Price</th><th>Open Interest</th></tr>';
      puts.forEach(put => {
        html += `<tr><td>${put.strike}</td><td>${put.lastPrice}</td><td>${put.openInterest}</td></tr>`;
      });
      html += '</table>';
  
      resultDiv.innerHTML = html;
  
    } catch (error) {
      console.error(error);
      resultDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
  }