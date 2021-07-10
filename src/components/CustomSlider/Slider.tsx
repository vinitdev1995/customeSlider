import React from "react";
import {items} from "../../utils";
import placeHolder from "../../img/placeholder.png";

interface CarouselSlideItemProps {
    pos: any,
    idx: number,
    slideWidth: string,
    isLoading: boolean
    slidesToShow?: number
    activeIdx?: number
}

const createItem = (position : any, idx : any, slideWidth : any) => {
    return {
        styles: {
            transform: `translateX(${position * slideWidth}rem)`,
            width: `(${position * slideWidth}rem)`
        },
        slide: items[idx].slide,
    };
};

const Slider = ({pos, idx, slideWidth, isLoading} : CarouselSlideItemProps) => {
    const item = createItem(pos, idx, slideWidth);
    return (
        <li className="carousel__slide-item" style={item.styles}>
            <div className="carousel__slide-item-img-link">
                <img src={isLoading ? placeHolder : item.slide.image} alt='img'/>
            </div>
        </li>
    );
};

export default Slider
