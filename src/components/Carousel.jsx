import temp from '../assets/icon_temperature.png';
import location from '../assets/icon_location.png';
import template from '../assets/template.png';
import useTempData from '../hooks/useTempData';

export default function Carousel({ weather, index }) {
    const tempData = useTempData(weather, index);
    function dateData() {
        const splitDate = weather[0].date.split('-');
        const enDate = new Intl.DateTimeFormat('en', { month: 'short' }).format(splitDate[1]);
        return `${splitDate[0]}, ${enDate} ${splitDate[2]}`;
    }

    return (
        <div>
            <div className='w-full relative border-b-2 border-slate-600 flex justify-between flex-col gap-4 pt-6 pb-6 font-mono text-white rounded-3xl pl-2 pr-2 h-96 bg-gradient-to-tl to-purple-700 to-90% from-gray-700 from-30%'>
                <div className='text-xl flex'>
                    <img className='w-6 h-6 hover:brightness-75' src={location}></img>
                    <div className='wl'>{weather ? weather[0].city : '...'}</div>
                </div>
                <div className='flex pt-24 gap-4 justify-center items-center'>
                    <div className='relative text-5xl gap-4 font-sans flex justify-center items-center'>
                        <img className='w-3 h-10' src={temp}></img>
                        <div className='text-center w-24'>{weather ? tempData : '...'}</div>
                    </div>
                    <img
                        className='w-24 h-24 appearance-none'
                        src={
                            weather
                                ? `https://openweathermap.org/img/wn/${weather[index].weatherIcon}@2x.png`
                                : template
                        }
                    ></img>
                </div>
                <div className='cursor-pointer w-32 border-b border-slate-400'>{weather ? dateData() : '...'}</div>

                <aside className='w-full flex justify-between'>
                    <nav className='flex w-4/12 sm:text-xs md:text-lg lg:text-lg flex-col items-center'>
                        <div>습도</div>
                        <div>{weather ? weather[index].humidity + '%' : '...'}</div>
                    </nav>
                    <nav className='flex w-4/12 sm:text-xs md:text-lg lg:text-lg flex-col items-center'>
                        <div>시야</div>
                        <div>{weather ? weather[index].visibility / 1000 + 'km' : '...'}</div>
                    </nav>
                    <nav className='flex w-4/12 sm:text-xs md:text-lg lg:text-lg flex-col items-center'>
                        <div>기압</div>
                        <div>{weather ? weather[index].pressure + 'hpa' : '...'}</div>
                    </nav>
                    <nav className='flex w-4/12 sm:text-xs md:text-lg lg:text-lg flex-col items-center'>
                        <div>풍속</div>
                        <div>{weather ? weather[index].wind + 'm/s' : '...'}</div>
                    </nav>
                </aside>
            </div>
        </div>
    );
}
