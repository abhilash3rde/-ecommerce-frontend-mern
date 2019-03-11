import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Flickity from "react-flickity-component";
export class CatProductSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langCode: window.location.pathname.split("/")[1]
    };
  }
  returnBasePriceVaritionProduct(arr) {
    console.log("try");
    console.log({ arr });
    let value = 0;
    if (arr) {
      if (arr.constructor === Array) {
        if (arr[2]) {
          if (arr[2].sale_price) {
            value = arr[2].sale_price;
          }
        }
      }
    }
    return value;
  }

  generateCategorySlug(title) {
    const slug = title.replace(/\//g, "!");
    return `/${this.props.countryCode}/category/${slug}`;
  }
  renderProducts(arr) {
    return arr.map((el, index) => {
      const { langCode } = this.state;
      const { imgXL, imgLg, img, title, link, basePrice, sizes } = el;
      console.log({ product: el });
      const {
        productid: { producttitle, productdescription, sku },
        variation,
        producttype,
        galleryimgdetails,
        attributes,
        _id: metaId
      } = el;
      let productSize = [];
      attributes.map(el => {
        if (el) {
          if (el.names === "size") {
            if (el.values) {
              productSize = el.values;
            }
          }
        }
      });
      return (
        <div
          key={index}
          className={`CPBodyRow-scrollableProduct CPBodyRow-scrollableProduct--${index} has-overflowHidden CPSubcatProduct`}
        >
          <div className="CPSubcatProduct-wrapper">
            {/* <a href={link}> */}
            <Link to={`/${langCode}/shop/${metaId}`}>
              <picture className="Picture ProductPicture CPSubcatProduct-picture">
                {imgXL && <source srcSet={imgXL} media="(min-width: 1025px)" />}
                {imgLg && <source srcSet={imgLg} media="(min-width: 640px)" />}
                <source
                  srcSet={galleryimgdetails[0]}
                  media="(min-width: 0px)"
                />
                <img alt={title} />
              </picture>
            </Link>
            {/* </a> */}
            <div className="CPSubcatProductSizePrice">
              {/* <a href={link}> */}
              <Link to={`/${langCode}/shop/${metaId}`}>
                <h5 className="CPSubcatProductSizePrice-name">
                  {producttitle}
                </h5>
                <div className="CPSubcatProductSizePrice-info false">
                  <span>{productSize.length} Sizes</span>
                  <span className="CPSubcatProductSizePrice-separator">/</span>
                  <span>
                    From $
                    {producttype === "variable" &&
                      this.returnBasePriceVaritionProduct(variation)
                    // variation[3].sale_price
                    }
                  </span>
                </div>
              </Link>
              {/* </a> */}
            </div>
          </div>
        </div>
      );
    });
  }
  redirectToCategory(categoryTitle) {
    window.location.href = this.generateCategorySlug(categoryTitle);
  }
  render() {
    const {
      props: {
        productsArr,
        rowClassName,
        intro: { title, desc }
      }
    } = this;

    const flickityOptions = {
      initialIndex: 0,
      pageDots: false,
      cellAlign: "left",
      contain: true
    };
    return (
      <div className={`CPBodyRow CPBodyRow--${rowClassName}`}>
        <div className="CPSubcatIntro CPBodyRow-intro">
          <div className="CPSubcatIntroDescription">
            <button
              className="CPSubcatIntroDescription-btn"
              onClick={() => {
                this.redirectToCategory(title);
              }}
              type="button"
            >
              <h2 className="CPSubcatIntroDescription-name">{title}</h2>
            </button>
            <p className="CPSubcatIntroDescription-info">{desc}</p>
          </div>
          <div className="CPSubcatIntroCTA">
            <button
              onClick={() => {
                this.redirectToCategory(title);
              }}
              className="CPSubcatIntroCTA-btn"
              type="button"
            >
              <div className="CPSubcatIntroCTA-wrapper">
                <span className="CPSubcatIntroCTA-text">
                  See all {title} ({productsArr.length})
                </span>
                <svg
                  aria-labelledby="58bc44ca-c20b-4103-bce2-9377bccdcbf4"
                  className="Icon CPSubcatIntroCTA-icon"
                  role="img"
                  viewBox="0 0 50 50"
                >
                  <title id="58bc44ca-c20b-4103-bce2-9377bccdcbf4">
                    See all 6 Cleansers
                  </title>
                  <g>
                    <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
        <div className="CPBodyScrollable">
          <div className="CPBodyScrollable-wrapper">
            {/* <Flickity
                className={"carousel"} // default ''
                elementType={"div"} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={false} // default false
                reloadOnUpdate // default false
                flickityRef={c => (this.flkty = c)}
              > */}
            {this.renderProducts(productsArr)}
            {/* </Flickity> */}
          </div>
          <div className="CPBodyScrollable-nav">
            <div className="CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--left is-disabled">
              <button
                className="CPBodyScrollable-navBtn"
                disabled=""
                tabIndex="-1"
              >
                <div className="CPBodyScrollable-navBtnWrapper">
                  <svg
                    aria-labelledby="f7ce7cf1-489f-4a8e-97b6-f282be26b629"
                    className="Icon CPBodyScrollable-navBtnIcon"
                    role="img"
                    viewBox="0 0 50 50"
                  >
                    <title id="f7ce7cf1-489f-4a8e-97b6-f282be26b629">
                      Scroll left
                    </title>
                    <g>
                      <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
            <div className="CPBodyScrollable-navBtnTrigger CPBodyScrollable-navBtnTrigger--right">
              <button className="CPBodyScrollable-navBtn" tabIndex="-1">
                <div className="CPBodyScrollable-navBtnWrapper">
                  <svg
                    aria-labelledby="fe43df96-3faa-4f0d-89af-423aa37f6562"
                    className="Icon CPBodyScrollable-navBtnIcon"
                    role="img"
                    viewBox="0 0 50 50"
                  >
                    <title id="fe43df96-3faa-4f0d-89af-423aa37f6562">
                      Scroll right
                    </title>
                    <g>
                      <polygon points="25,31.3 4.2,10.5 0.1,14.6 25,39.5 50,14.6 45.9,10.5 " />
                    </g>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
