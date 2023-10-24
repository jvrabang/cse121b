//Final Project in CSE121B
//Author: JV Rabang 10/24/2023

//Import ES Modules
import {qs, alertMessage} from "./alert.js"

// Defining the API key and URL
const API_KEY = 'TXGWHOHIPVV1GPA0'; //Set to demo during testing as there is a daily limit for AlphaVantage actual key TXGWHOHIPVV1GPA0 to insert during publication
const API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';
const DAILY_API_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';
const OVERVIEW_URL = 'https://www.alphavantage.co/query?function=OVERVIEW&symbol=';

// Store historical prices in an array
let historicalPrices = [];

// Function to fetch and store historical prices
const fetchHistoricalPrices = async (symbol) => {
  try {
    const response = await fetch(`${DAILY_API_URL}${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    historicalPrices = Object.entries(data['Time Series (Daily)']).map(([date, info]) => ({
      date,
      price: info['4. close'],
    }));
    displayHistoricalPrices();
  } catch (error) {
    console.error('Error fetching historical prices:', error);
  }
};

// Function to display historical prices
const displayHistoricalPrices = () => {
  const historicalPriceList = document.getElementById('historicalPriceList');
  historicalPriceList.innerHTML = '';

  historicalPrices.forEach((data) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${data.date}: $${data.price}`;
    listItem.dataset.date = data.date; 
    historicalPriceList.appendChild(listItem);
  });
};

// Filter function to display prices for a selected date
const filterHistoricalPrices = (selectedDate) => {
    const historicalPriceList = document.getElementById('historicalPriceList');
    const listItems = historicalPriceList.getElementsByTagName('li');
    let hasData = false;
  
    for (let i = 0; i < listItems.length; i++) {
      const listItem = listItems[i];
      const date = listItem.dataset.date;
  
      if (date === selectedDate) {
        listItem.style.display = 'block';
        hasData = true;
      } else {
        listItem.style.display = 'none';
      }
    }
  
    const noDataMessage = historicalPriceList.querySelector('.no-data-message');
    
    if (!hasData) {
      if (!noDataMessage) {
        // If no data found and no message exists, display the message
        const newNoDataMessage = document.createElement('p');
        newNoDataMessage.textContent = 'No Available Data for the Selected Date';
        newNoDataMessage.classList.add('no-data-message');
        historicalPriceList.appendChild(newNoDataMessage);
      }
    } else {
      // If data is found, remove any "No Available Data" message
      if (noDataMessage) {
        historicalPriceList.removeChild(noDataMessage);
      }
    }
  };
  
// Function to fetch and display current stock price
const fetchStockPrice = async (symbol) => {
  try {
    // Clear the current stock price and historical price list
    const stockInfoDiv = document.getElementById('stockInfo');
    stockInfoDiv.innerHTML = '';
    const historicalPriceList = document.getElementById('historicalPriceList');
    historicalPriceList.innerHTML = '';

    // Clear the historical prices array
    historicalPrices.length = 0;

    const response = await fetch(`${API_URL}${symbol}&interval=5min&apikey=${API_KEY}`);
    const data = await response.json();

    if (data['Error Message']) {
      alertMessage('No data available for the entered stock symbol. Please enter a valid symbol.');
      return;
    }

    const timeSeries = data['Time Series (5min)'];
    const latestData = timeSeries[Object.keys(timeSeries)[0]];
    const stockPrice = latestData['4. close'];
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const timezone = data['Meta Data']['6. Time Zone'];

    // Display the current stock price
    stockInfoDiv.innerHTML = `<strong>Current Stock Price:</strong> $${stockPrice}`;
    stockInfoDiv.innerHTML += `<br><strong>Last Refreshed:</strong> ${lastRefreshed} ${timezone}`;
  } catch (error) {
    console.error('Error fetching stock price:', error);
    alertMessage('Error fetching stock price. Please try again later.');
  }
};

// Function to fetch and display fundamental data
const fetchFundamentalData = async (symbol) => {
    try {
      const response = await fetch(`${OVERVIEW_URL}${symbol}&apikey=${API_KEY}`);
      const data = await response.json();
  
      document.getElementById('fundamentalSymbol').innerHTML = `<strong>Symbol:</strong> ${data['Symbol']}`;
      document.getElementById('fundamentalName').innerHTML = `<strong>Name:</strong> ${data['Name']}`;
      document.getElementById('fundamentalIndustry').innerHTML = `<strong>Industry:</strong> ${data['Industry']}`;
      document.getElementById('fundamentalMarketCap').innerHTML = `<strong>Market Cap:</strong> $${Number(data['MarketCapitalization']).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
      document.getElementById('fundamentalExchange').innerHTML = `<strong>Exchange:</strong> ${data['Exchange']}`;
      document.getElementById('fundamental52WeekHigh').innerHTML = `<strong>52 Week High:</strong> ${data['52WeekHigh']}`;
      document.getElementById('fundamental52WeekLow').innerHTML = `<strong>52 Week Low:</strong> ${data['52WeekLow']}`;
      document.getElementById('fundamental50DayMovingAverage').innerHTML = `<strong>50 Day Moving Average:</strong> ${data['50DayMovingAverage']}`;
      document.getElementById('fundamental200DayMovingAverage').innerHTML = `<strong>200 Day Moving Average:</strong> ${data['200DayMovingAverage']}`;
      document.getElementById('fundamentalSharesOutstanding').innerHTML = `<strong>Shares Outstanding:</strong> ${Number(data['SharesOutstanding']).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
    } catch (error) {
      console.error('Error fetching fundamental data:', error);
    }
  };
  
// Event listener for the "Get Stock Price" button
document.getElementById('fetchStockPrice').addEventListener('click', () => {
  const symbol = document.getElementById('stockSymbol').value;
  if (symbol) {
    fetchStockPrice(symbol);
    fetchHistoricalPrices(symbol);
    fetchFundamentalData(symbol);
    alertMessage('Due to current limitation in Free API, kindly enter your query in 1 min interval to ensure accurate results. Thanks!.');
  } else {
    alertMessage('Please enter a valid stock symbol.');
  }
});

// Event listener for the date filter input
document.getElementById('dateFilter').addEventListener('input', (event) => {
  const selectedDate = event.target.value;
  filterHistoricalPrices(selectedDate);
});

// Event listener for the "Reset Filter" button
document.getElementById('resetFilter').addEventListener('click', () => {
  const dateFilterInput = document.getElementById('dateFilter');
  dateFilterInput.value = ''; // Clear the date filter input

  // Show all historical data (reset any previous filtering)
  const listItems = document.querySelectorAll('#historicalPriceList li');
  listItems.forEach((item) => {
    item.style.display = 'block';
  });

  // Remove the "No Available Data" message, if it exists
  const noDataMessage = document.querySelector('.no-data-message');
  if (noDataMessage) {
    noDataMessage.remove();
  }
});