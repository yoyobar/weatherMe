import { useContext, useState } from 'react';
import { WeatherStateContext } from '../App';
import { weatherApiSearch } from '../api/apiRequest';

const cityDataKr = ['서울', '부산', '대구', '대전', '광주', '인천'];
const cityData = ['Seoul', 'Busan', 'Daegu', 'Daejeon', 'Gwangju', 'Incheon'];

export default function Search() {
    const { setWeather } = useContext(WeatherStateContext);
    const [visible, setVisible] = useState(false);
    const [search, setInput] = useState('');

    //input Change
    const inputChange = (e) => {
        setInput(e.target.value);
    };
    //city button
    const citySelect = (e) => {
        weatherApiSearch(e.target.value).then((geoData) => {
            setWeather(geoData);
        });
    };

    //city search
    const searchSubmit = () => {
        const location = search.trim().toUpperCase();
        const cityDataUpper = cityData.map((item) => item.toUpperCase());

        if (cityDataKr.includes(location, 0)) {
            const index = cityDataKr.indexOf(location, 0);
            weatherApiSearch(cityData[index]).then((geoData) => {
                setWeather(geoData);
            });
            setInput('');
            return;
        }

        if (cityDataUpper.includes(location, 0)) {
            const index = cityDataUpper.indexOf(location, 0);
            weatherApiSearch(cityData[index]).then((geoData) => {
                setWeather(geoData);
            });
            setInput('');
            return;
        }

        return alert('지원하지 않는 지역입니다.');
    };

    //search focusing
    const searchFocus = () => {
        setVisible(true);
    };

    //search blur
    const searchBlur = () => {
        setTimeout(() => {
            setVisible(false);
        }, 100);
    };

    return (
        <div className='relative w-full flex-col justify-center mt-12'>
            <input
                value={search}
                onFocus={searchFocus}
                onBlur={searchBlur}
                onChange={inputChange}
                className='focus:bg-slate-400 w-full p-1 pl-8 rounded-lg outline-none bg-slate-200 placeholder:text-slate-600'
                placeholder='Search Location...'
            ></input>
            {visible && (
                <div className='absolute flex flex-col ml-4 mr-4 top-10 w-full z-10'>
                    {cityData.map((item, index) => (
                        <button
                            onClick={citySelect}
                            value={item}
                            className='w-36 text-center rounded-sm hover:bg-slate-600 hover:text-white font-mono text-slate-600 bg-slate-400 mb-1 border-b border-slate-700'
                            key={index}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        onClick={searchSubmit}
                        className='absolute hover:bg-green-800 disabled:bg-slate-600 font-mono top-0 left-40 text-white bg-green-600 hover: p-1 rounded-lg'
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
