import React, {useEffect, useState} from 'react';
import {items, slideCount, slidesToShow} from '../../utils';
import Slider from './Slider'
import "./CustomSlider.scss";

const length = items.length;
items.push(...items);

const keys = Array.from(Array(items.length).keys());

const sleep = (ms: number = 0) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const CarouselSlideItem = () => {
    const [items, setItems] = useState(keys);
    const [isTicking, setIsTicking] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [activeIdx, setActiveIdx] = useState(0);
    const bigLength: number = items.length;
    const slideWidth: string = (slideCount / slidesToShow).toFixed(2);

    const prevClick = (jump: number = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev: any) => {
                return prev.map((_: any, i: number) => prev[(i + jump) % bigLength]);
            });
        }
    };

    const nextClick = (jump: number = 1) => {
        if (!isTicking) {
            setIsTicking(true);
            setItems((prev: any) => {
                return prev.map(
                    (_: any, i: number) => prev[(i - jump + bigLength) % bigLength],
                );
            });
        }
    };

    const handleDotClick = (idx: any) => {
        if (idx < activeIdx) prevClick(activeIdx - idx);
        if (idx > activeIdx) nextClick(idx - activeIdx);
    };

    useEffect(() => {
        if (isTicking) sleep(300).then(() => setIsTicking(false));
    }, [isTicking]);

    useEffect(() => {
        setActiveIdx((length - (items[0] % length)) % length) // prettier-ignore
    }, [items]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }, []);

    return (
        <div className="carousel__wrap">
            <div className="carousel__inner">
                <button className="carousel__btn carousel__btn--prev" onClick={() => prevClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--left"/>
                </button>
                <div className="carousel__container">
                    <ul className="carousel__slide-list">
                        {items && items.map((pos, i) => (
                            <Slider
                                isLoading={isLoading}
                                slidesToShow={slidesToShow}
                                slideWidth={slideWidth}
                                key={i}
                                idx={i}
                                pos={pos}
                                activeIdx={activeIdx}
                            />
                        ))}
                    </ul>
                </div>
                <button className="carousel__btn carousel__btn--next" onClick={() => nextClick()}>
                    <i className="carousel__btn-arrow carousel__btn-arrow--right"/>
                </button>
                <div className="carousel__dots">
                    {items.slice(0, length).map((pos: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={i === activeIdx ? 'dot active' : 'dot'}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselSlideItem;


