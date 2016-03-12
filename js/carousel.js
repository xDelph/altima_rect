import React, { Component } from 'react';
import Slider from 'react-slick';

class RightNavButton extends Component {
  render() {
    return <button {...this.props}>Previous one</button>  
  }
}

class LeftNavButton extends Component {
  render() {
    return <button {...this.props}>Next</button>  
  }
}

class Carousel extends Component {
    render () {
        var settings = {
            //dots: true,
            // infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            arrows: true,
            nextArrow: LeftNavButton,
            prevArrow: RightNavButton
        }

        return (
            <div id="carousel">
                Découvrer les dernières nouveautés
                <Slider {...settings}>
                    <div><img src="http://fakeimg.pl/50x40/eee/c33/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/693/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/e33/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/c33/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/693/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/e33/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/c33/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/693/?retina=true" /></div>
                    <div><img src="http://fakeimg.pl/50x40/eee/e33/?retina=true" /></div>
                </Slider>
            </div>
        );
    }
};

export default Carousel;