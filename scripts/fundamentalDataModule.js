// fundamentalDataModule.js

const fetchFundamentalData = async (symbol, overview_url, api_key) => {
  try {
    const response = await fetch(`${overview_url}${symbol}&apikey=${api_key}`);
    const data = await response.json();

    document.getElementById('fundamentalSymbol').innerHTML = `<strong>Symbol:</strong> ${data['Symbol']}`;
    document.getElementById('fundamentalName').innerHTML = `<strong>Name:</strong> ${data['Name']}`;
    document.getElementById('fundamentalIndustry').innerHTML = `<strong>Industry:</strong> ${data['Industry']}`;
    document.getElementById('fundamentalMarketCap').innerHTML = `<strong>Market Cap:</strong> $${Number(data['MarketCapitalization']).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    document.getElementById('fundamentalExchange').innerHTML = `<strong>Exchange:</strong> ${data['Exchange']}`;
    document.getElementById('fundamental52WeekHigh').innerHTML = `<strong>52 Week High:</strong> ${data['52WeekHigh']}`;
    document.getElementById('fundamental52WeekLow').innerHTML = `<strong>52 Week Low:</strong> ${data['52WeekLow']}`;
    document.getElementById('fundamental50DayMovingAverage').innerHTML = `<strong>50 Day Moving Average:</strong> ${data['50DayMovingAverage']}`;
    document.getElementById('fundamental200DayMovingAverage').innerHTML = `<strong>200 Day Moving Average:</strong> ${data['200DayMovingAverage']}`;
    document.getElementById('fundamentalSharesOutstanding').innerHTML = `<strong>Shares Outstanding:</strong> ${Number(data['SharesOutstanding']).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  } catch (error) {
    console.error('Error fetching fundamental data:', error);
  }
};

export { fetchFundamentalData };