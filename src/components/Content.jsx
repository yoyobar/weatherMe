import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Carousel from './Carousel';
import { WeatherStateContext } from '../App';
import { useContext } from 'react';

export default function Content() {
    const { weather, setSlide } = useContext(WeatherStateContext);
    const isUpdate = Object.keys(weather).length !== 0;

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        className: 'slides',
        beforeChange: (slide, nextSlide) => setSlide(nextSlide),
        appendDots: (dots) => (
            <div
                style={{
                    borderRadius: '10px',
                    padding: '10px',
                }}
            >
                <ul style={{ margin: '20px' }}> {dots} </ul>
            </div>
        ),
    };
    return (
        <div className='w-full h-full flex justify-center mt-8'>
            <div
                className={isUpdate ? 'w-full' : 'animate-pulse'}
                style={isUpdate ? { width: '100%' } : { width: 'calc(100% - 30px)' }}
            >
                {isUpdate ? (
                    <Slider {...settings}>
                        {weather.map((item, index) => (
                            <Carousel key={item} index={index} weather={weather[index] ? weather[index] : null} />
                        ))}
                    </Slider>
                ) : (
                    <Carousel />
                )}
            </div>
        </div>
    );
}
