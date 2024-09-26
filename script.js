const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultsDisplay = document.getElementById('resultsDisplay');

// RapidAPI Headers for Travel Advisor API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e377129c33mshb5b7890985593b2p11de28jsn9cedfc5985a9Y',  // Replace with your own RapidAPI key
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};

searchBtn.addEventListener('click', function () {
    const city = cityInput.value;
    if (city) {
        fetchCityData(city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchCityData(city) {
    // Properly encode the city name for URL
    const encodedCity = encodeURIComponent(city);
    const url = `https://travel-advisor.p.rapidapi.com/locations/search?query=${encodedCity}`; // Dynamically insert the city

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching travel data. Please try again later.');
    }
}

function displayResults(data) {
    resultsDisplay.innerHTML = '';  // Clear previous results
    const locations = data.data;

    if (locations && locations.length > 0) {
        locations.forEach(location => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${location.result_object.name}</h3>
                <p>Type: ${location.result_type}</p>
                <p>Rating: ${location.result_object.rating || 'No rating'}</p>
                <p>Address: ${location.result_object.address || 'No address'}</p>
            `;
            resultsDisplay.appendChild(resultItem);
        });
    } else {
        resultsDisplay.innerHTML = '<p>No results found. Try a different city.</p>';
    }
}
