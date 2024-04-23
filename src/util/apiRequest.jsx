//API DATA FILTER
export const dataSetting = (json, list) => {
    //API 요청으로 받아온 데이터의 필요한 데이터 포맷
    const weatherData = list.map((item) => {
        return {
            city: json.city.name,
            weather: item.weather[0].description,
            weatherIcon: item.weather[0].icon,
            temp: (item.main.temp - 273.15).toFixed(0),
            date: item.dt_txt.split(' ')[0],
            time: item.dt_txt.split(' ')[1],
            humidity: item.main.humidity,
            pressure: item.main.pressure,
            wind: item.wind.speed,
            visibility: item.visibility,
        };
    });
    //40개의 최종 데이터중 00:00:00에 해당하는 배열 제거
    const filteredData = weatherData.filter((item) => item.time !== '00:00:00');
    //35개의 array를 2중 depth로 7x5의 배열을 생성함
    const reducedData = filteredData.reduce((acc, curr, index) => {
        const chunkIndex = Math.floor(index / 7);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(curr);
        return acc;
    }, []);
    return reducedData;
};

//OPENWEATHER API DATA LOAD
export async function weatherApiCall(latitude, longitude) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&lang=KR&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
        );
        const json = await response.json();
        const { list } = json;
        return dataSetting(json, list);
    } catch (error) {
        console.error('WEATHER DATA ERROR', error);
    }
}

//OPENWEATHER API DATA REQUEST
export async function weatherApiSearch(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e83cbcd7f0cb5b4bb7a22680f6cdd447`
        );
        const [json] = await response.json();
        //도시정보 API와 날씨정보 API가 버전이 달라 실제 geo데이터가 다른경우가 있음
        let geoData = [];
        switch (json.name) {
            case 'Gwangju':
                geoData = [37.41, 127.2572];
                break;
            case 'Incheon':
                geoData = [37.45, 126.4161];
                break;
            default:
                geoData = [json.lat, json.lon];
                break;
        }
        return weatherApiCall(geoData[0], geoData[1]);
    } catch (error) {
        console.error('SEARCH DATA ERROR');
    }
}
