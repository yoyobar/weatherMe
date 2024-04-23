import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
import { weatherApiCall } from './util/apiRequest';

export const WeatherStateContext = createContext();
export const CheckStateContext = createContext();

function App() {
    const [check, setCheck] = useState(false);
    const [weather, setWeather] = useState({});
    const [slide, setSlide] = useState(0);
    const checkHandler = () => {
        setCheck(!check);
    };

    //GEO LOCATION SETTING
    const accessGeo = ({ coords }) => {
        const { latitude, longitude } = coords;
        weatherApiCall(latitude, longitude).then((geoData) => {
            setWeather(geoData);
        });
    };

    //GEO LOCATION LOAD
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(accessGeo, (err) => {
            if (err.code === 1) {
                return alert('CHECK GPS PERMISSION');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='main bg-slate-900 '>
            <WeatherStateContext.Provider value={{ weather, setWeather, slide, setSlide }}>
                <CheckStateContext.Provider value={{ check, checkHandler }}>
                    <Header />
                    <Content />
                    <Footer />
                </CheckStateContext.Provider>
            </WeatherStateContext.Provider>
        </div>
    );
}

export default App;
