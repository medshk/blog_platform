import sport from '../../images/sport.jpg';
import food from '../../images/food.jpg';
import lifestyle from '../../images/lifestyle.jpg';
import animals from '../../images/animals.jpg';
import nature from '../../images/nature.jpg';
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'



// Import Swiper styles



import SwiperCore, {
    Navigation,Pagination
  } from 'swiper';
  SwiperCore.use([Navigation,Pagination]);

const TrendingTopics = () => {
  
    
    return (
        <div className="topics">
            <h1>Trending Topics</h1>
          <Swiper
            loop={true}
            spaceBetween={25.5}
            slidesPerView={6}
            navigation={true}
            onSlideChange={() => console.log("slide change")}
            onSwiper={swiper => console.log(swiper)} className="topics-box swiper" >
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={sport} alt="" /></a>
                    <div className="text-holder">Sport</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                   <a href=""> <img src={sport} alt="" /></a>
                   <div className="text-holder">Sport</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={animals} alt="" /></a>
                    <div className="text-holder">Animals</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={food} alt="" /></a>
                    <div className="text-holder">Food</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                   <a href=""> <img src={sport} alt="" /></a>
                   <div className="text-holder">Sport</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={lifestyle} alt="" /></a>
                    <div className="text-holder">LifeStyle</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={nature} alt="" /></a>
                    <div className="text-holder">Nature</div>
                </SwiperSlide>
                <SwiperSlide className="topic-container swiper-slide">
                    <a href=""><img src={nature} alt="" /></a>
                    <div className="text-holder">Nature</div>
                </SwiperSlide>
            </Swiper>
        </div>
      );

      
}
 
export default TrendingTopics;