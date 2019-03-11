import React, { Component } from "react";
// import OwlCarousel from "react-owl-carousel";
import $ from "jquery";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";

import Flickity from "react-flickity-component";
import { Link } from "react-router-dom";

export class HomeSliderSection extends Component {
  constructor(props) {
    super(props);
    this.setLeft = this.setLeft.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.state = {
      flLeft: 0,
      langCode: window.location.pathname.split("/")[1],
      flWidth: "20%",
      isSmall: window.innerWidth >= 640 ? false : true
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize());
    window.addEventListener("load", this.handleResize());
    // You can register events in componentDidMount hook
    if (this.flkty) {
      this.flkty.on("scroll", progress => {
        // console.log(progress*100)
        // let Flwidth = 20;
        let left = `${progress * 80}%`;
        // this.setLeft(left)
        $(this.refs.slideDisplay).css({
          left: left
        });
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize());
    window.removeEventListener("load", this.handleResize());
  }
  handleResize() {
    this.setState({
      isSmall: window.innerWidth >= 640 ? false : true
    });
    // this.flkty
  }
  setLeft(flLeft) {
    this.setState({ flLeft });
  }
  renderSlides(arr) {
    const { langCode } = this.state;
    return arr.map((el, index) => {
      const { title, imgLg, imgsm, img, productid, _id: metaId } = el;
      return (
        <div className="MCItemCarousel-Item" key={index}>
          <div className="MCItemCarouselProduct">
            <a
              className="MCItemCarouselProduct-wrapper has-overflowHidden"
              href={`/${langCode}/shop/${metaId}`}
              // href={'#'}
              // to="product"
              // params={{ id: el._id }}
              // to={{ pathname: `product/${el.pId}`, state: { product: el } }}
            >
              <picture className="Picture ProductPicture MCItemCarouselProduct-picture">
                <source
                  srcSet={productid && productid.featurefilepath}
                  media="(min-width: 0px)"
                />
                <img alt={productid && productid.producttitle} />
              </picture>
            </a>
          </div>
          <div className="MCItemCarouselCaption has-intro">
            <a
              className="MCItemCarouselCaption-link"
              href={`/${langCode}/shop/${metaId}`}
            >
              <h5 className="MCItemCarouselCaption-title">
                {productid && productid.producttitle}
              </h5>
            </a>
          </div>
        </div>
      );
    });
  }
  ProductSliderEl() {
    const flickityOptions = {
      initialIndex: 0,
      pageDots: false,
      cellAlign: "left",
      contain: true
    };
    const { isSmall } = this.state;
    const { title, description, noTitle, productArr } = this.props;

    return (
      <div className="MCItemCarousel MCItemCarousel--hasIntro is-visible">
        <div className="MCItemCarousel-scrollable">
          {
            <div
              className="MCCarouselNav MCCarouselNav--prev"
              style={{ display: "flex" }}
            >
              <button className="MCCarouselNav-btn">
                <div className="MCCarouselNav-btnWrapper">
                  <svg
                    aria-labelledby="37f650ea-d1e7-4c52-b5bc-ce00d6f0e81a"
                    className="Icon MCCarouselNav-btnIcon"
                    role="img"
                    viewBox="0 0 50 50"
                  >
                    <title id="37f650ea-d1e7-4c52-b5bc-ce00d6f0e81a">
                      PREV
                    </title>
                    <g>
                      <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          }
          <div
            className="MCCarouselNav MCCarouselNav--next"
            style={{ display: "flex" }}
          >
            <button className="MCCarouselNav-btn">
              <div className="MCCarouselNav-btnWrapper">
                <svg
                  aria-labelledby="9ab42d0a-6c07-4f1a-8816-77b12d9d094d"
                  className="Icon MCCarouselNav-btnIcon"
                  role="img"
                  viewBox="0 0 50 50"
                >
                  <title id="9ab42d0a-6c07-4f1a-8816-77b12d9d094d">NEXT</title>
                  <g>
                    <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                  </g>
                </svg>
              </div>
            </button>
          </div>
          <div className="MCItemCarousel-viewport">
            <div className="MCItemCarousel-productWrapper flickity-enabled">
              <Flickity
                className={"carousel"} // default ''
                elementType={"div"} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                flickityRef={c => (this.flkty = c)}
              >
                {!isSmall && !noTitle && (
                  <div className="MCItemCarouselIntro">
                    <div className="MCItemCarouselIntro-wrapper">
                      <div className="MCItemCarouselIntro-group">
                        <h2 className="MCItemCarouselIntro-title">{title}</h2>
                      </div>
                      <div className="MCItemCarouselIntro-group">
                        <div className="MCItemCarouselIntro-copy">
                          <p className="MCItemCarouselIntro-copyParagraph">
                            {description}
                          </p>
                        </div>
                        <div>
                          <a
                            className="MCItemCarouselIntro-link"
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Explore winter skin care
                            <svg
                              className="Icon MCItemCarouselIntro-linkIcon"
                              role="img"
                              viewBox="0 0 50 50"
                            >
                              <g>
                                <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                              </g>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {this.renderSlides(productArr)}
              </Flickity>
              <div className="MCCarouselScrollbar">
                <div
                  className="MCCarouselScrollbar-bar"
                  ref="slideDisplay"
                  style={{ left: this.state.flLeft, width: this.state.flWidth }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const settings = {
      margin: 10,
      nav: true,
      loop: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    };
    const { productArr } = this.props;
    return (
      <div>
        {productArr.length > 0 && <div>{this.ProductSliderEl(productArr)}</div>}
      </div>
    );
  }
}
