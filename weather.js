const API_KEY = "b402b1cab993347a4b8c4ff4a2c94cae";
const weatherIcons = {
    "Clear": "images/clear.jpg",
    "Clouds": "images/cloud.jpg",
    "Rain": "images/rain.jpg",
    "Snow": "images/snow.jpg",
   
};

function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = document.querySelector("#weather");
            const weatherType = data.weather[0].main;

            const iconURL = weatherIcons[weatherType];
            if (iconURL) {
                const img = document.createElement('img');
                img.src = iconURL;
                img.width = 250; 
                img.height = 250; 
                img.classList.add('weather-icon');
                weather.appendChild(img);
            } else {
                weather.innerText = `No image for ${weatherType}`;
            }

            const weatherText = document.createElement('div');
            weatherText.innerText = `${data.weather[0].main}`;
            weatherText.classList.add('weather-text');
            weather.appendChild(weatherText);

            
            const temperature = document.createElement('div');
            temperature.innerText = `${data.main.temp} ℃`;
            temperature.classList.add('temperature');
            weather.appendChild(temperature);
            
          
          
        })
}

function onGeoFail() {
    alert("현재 위치를 가져올 수 없습니다.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
