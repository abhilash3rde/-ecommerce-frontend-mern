import React, { Component } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  ImageWithZoom,
  Image
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { zoomIn } from "react-icons-kit/icomoon/";
import { heart, heartO } from "react-icons-kit/fa/";

import imgSliderMed1 from "../assets/images/slider-medicine-1.png";
import imgSliderMed2 from "../assets/images/slider-medicine-2.png";
import imgSliderMed3 from "../assets/images/slider-medicine-3.png";

export class ProductViewSlider extends Component {
  constructor(props) {
    super(props);
    this.renderSlides = this.renderSlides.bind(this);
    this.state = {
      zoom: true,
      products: [
        {
          img: imgSliderMed1
        },
        {
          img: imgSliderMed2
        },
        {
          img: imgSliderMed3
        }
      ],
      fav: false
    };
  }
  renderSlides(arr) {
    console.log(arr);
    return arr.map((product, index) => {
      console.log({ product });
      // console
      return (
        <Slide key={index} index={index}>
          {this.state.zoom ? (
            <ImageWithZoom src={product.img} />
          ) : (
            <Image src={product.img} />
          )}
        </Slide>
      );
    });
  }
  render() {
    const { fav } = this.state;
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={80}
        totalSlides={this.props.imgArr.length}
        className="product-view"
      >
        <Slider>{this.renderSlides(this.props.imgArr)}</Slider>
        {this.props.imgArr.length > 1 && (
          <div className="slider-navs">
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
            <DotGroup />
          </div>
        )}
        {/* <div
          className="toggle-zoom"
          onClick={() => {
            this.setState(prevState => ({
              zoom: prevState.zoom
            }));
          }}
        >
          <span>
            <Icon icon={zoomIn} />
          </span>
        </div> */}
        <div
          className={classNames("toggle-fav", {
            fav: fav
          })}
          onClick={() => {
            this.setState(prevState => ({
              fav: !prevState.fav
            }));
          }}
        >
          <span>
            <Icon icon={fav ? heart : heartO} />
          </span>
        </div>
        {/* <div className={classNames("size-display")}>
          <span>30 ml</span>
        </div> */}
      </CarouselProvider>
    );
  }
}
