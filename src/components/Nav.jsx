import logo from '../assets/Main.png';
export default function Nav() {
    return (
        <>
            <img className='w-16 absolute' src={logo}></img>
            <header className='pt-9 ml-14 mr-14 wrapper_header font-mono flex gap-14'>
                <a href='/' className='text-white cursor-pointer font-thin text-5xl flex-grow'>
                    WeatherMe
                </a>
                <div className='text-white font-bold border-b cursor-pointer border-b-gray-500 h-7'>Today</div>
                <div className='text-white font-thin cursor-pointer'>Tomorrow</div>
                <div className='text-white font-thin cursor-pointer'>Monthly Forecast</div>
            </header>
        </>
    );
}
