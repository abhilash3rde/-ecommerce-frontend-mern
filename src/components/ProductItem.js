import React, { Component } from "react";
import { Link } from "react-router-dom";
export class ProductItem extends Component {
  render() {
    const {
      product: {
        productid: { producttitle: productName, featurefilepath: mainImage },
        _id
      },
      countryCode
    } = this.props;
    return (
      <div className="CPBodyRow-subcategoryProducts has-overflowHidden is-odd CPSubcatProduct CPSubcatProduct--hasVariants CPSubcatProduct--hasAddToCart">
        <div className="CPSubcatProduct-wrapper">
          <Link to={`/${countryCode}/shop/${_id}`}>
            <picture className="Picture ProductPicture CPSubcatProduct-picture">
              <source
                srcSet={mainImage || "http://via.placeholder.com/500x600"}
                media="(min-width: 0px)"
              />
              <img alt={productName} />
            </picture>
          </Link>
          <div className="CPSubcatProductSizePrice">
            <Link to={`/${countryCode}/shop/${_id}`}>
              <h5 className="CPSubcatProductSizePrice-name">{productName}</h5>
              <div className="CPSubcatProductSizePrice-info false">
                <span>2 Sizes</span>
                <span className="CPSubcatProductSizePrice-separator">/</span>
                <span>From $240.00</span>
              </div>
            </Link>
            {/* <div className="CPSubcatProductVariantList">
              <label className="FormRadio">
                <input
                  type="radio"
                  className="FormRadio-input"
                  name="B100SK61"
                  value="100 mL "
                />
                <span className="FormRadio-pseudoElement" />
                <span className="FormRadio-focusElement" />
                <span className="FormRadio-label">100 mL </span>
              </label>
              <label className="FormRadio">
                <input
                  type="radio"
                  className="FormRadio-input"
                  name="ASK61"
                  value="200 mL "
                />
                <span className="FormRadio-pseudoElement" />
                <span className="FormRadio-focusElement" />
                <span className="FormRadio-label">200 mL </span>
              </label>
            </div> */}
          </div>
          <Link to={`/${countryCode}/shop/${_id}`}>
            <div className="CPSubcatProductDetails">
              <ul className="CPSubcatProductDetails-list">
                <li className="CPSubcatProductDetails-listItem">
                  <div className="CPSubcatProductDetails-title">Suited to</div>
                  <div className="CPSubcatProductDetails-content">
                    Combination skin
                  </div>
                </li>
                <li className="CPSubcatProductDetails-listItem">
                  <div className="CPSubcatProductDetails-title">Skin Feel</div>
                  <div className="CPSubcatProductDetails-content">
                    Purified, soft, refreshed
                  </div>
                </li>
              </ul>
            </div>
          </Link>
          {/* <div className="CPSubcatProduct-ctaWrapper">
            <button
              className="btnAs btnAs--action btnAs--filled CPSubcatProduct-cta"
              type="button"
            >
              <div className="btnAs-content">
                <span className="btnAs-label">Add to your cart — $345.00</span>
                <span className="btnAs-label btnAs-label--action">
                  Added to your cart
                </span>
                <span className="LoadingIndicator LoadingIndicator--light">
                  <span className="LoadingIndicator-dot" />
                  <span className="LoadingIndicator-dot" />
                  <span className="LoadingIndicator-dot" />
                </span>
              </div>
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
