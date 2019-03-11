import React, { Component } from "react";
// import { Icon } from 'react-icons-kit';
// import { star } from 'react-icons-kit/icomoon/star';
import { Collapse } from "reactstrap";
import SelectMulti from "react-select";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { starFull, starEmpty, starHalf } from "react-icons-kit/icomoon/";
// import imgSliderMed1 from "../assets/images/slider-medicine-1.png";
import { ProductViewSlider } from "./";
import waterfall from "async-waterfall";
import { selectStyle } from "./Constants";

export class ProductDetailSec extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.varitionInit = this.varitionInit.bind(this);
    this.renderVariation = this.renderVariation.bind(this);
    this.varientChange = this.varientChange.bind(this);
    this.flavorChange = this.flavorChange.bind(this);
    this.qtyChange = this.qtyChange.bind(this);
    this.handleSubscribeChecked = this.handleSubscribeChecked.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.state = {
      collapse: false,
      varientOptions: [
        {
          label: "CDB Strength",
          value: "CDB_Strength"
        },
        {
          label: "CDB op2",
          value: "CDB_op2"
        },
        {
          label: "CDB op3",
          value: "CDB_op3"
        }
      ],
      selectedVarient: null,
      selectedVarientErr: null,
      flavorOptions: [
        {
          label: "Flavor",
          value: "Flavor"
        },
        {
          label: "Flavor 2",
          value: "Flavor_2"
        },
        {
          label: "Flavor 3",
          value: "Flavor_3"
        }
      ],
      selectedFlavor: null,
      selectedFlavorErr: null,
      qtyOptions: [
        {
          label: "1",
          value: "1"
        },
        {
          label: "2",
          value: "2"
        },
        {
          label: "3",
          value: "3"
        },
        {
          label: "4",
          value: "4"
        },
        {
          label: "5",
          value: "5"
        },
        {
          label: "6",
          value: "6"
        },
        {
          label: "7",
          value: "7"
        },
        {
          label: "8",
          value: "8"
        },
        {
          label: "9",
          value: "9"
        },
        {
          label: "10",
          value: "10"
        }
      ],
      selectedQty: null,
      selectedQtyErr: null,
      susTimeOptions: [
        {
          label: "1 Month",
          value: "1"
        },
        {
          label: "3 Months",
          value: "3"
        },
        {
          label: "1 Year",
          value: "12"
        }
      ],
      selectedSusTime: {
        label: "1 Month",
        value: "1"
      },
      subscribeChecked: false,
      sale_price: 0,
      regular_price: 0
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log({nextState,state: this.state})
  //   return (
  //     // nextProps.product != this.props.product ||
  //     nextState != this.state
  //   );
  // }
  componentDidMount() {
    if (this.props.product.producttype === "variable") {
      this.setState({
        isVariable: true
      });
      this.varitionInit(this.props.product.attributes);
    } else {
      this.setState({
        isVariable: false
      });
    }
  }
  addToCart(item = {}) {
    // this.setState({id: this.state.id + 1})
    console.log({ pp: item });
    const { cookies, allCookies } = this.props;
    // console.log({pp1: allCookies.cart})
    if (!allCookies.cart) {
      cookies.set("cart", [item], { path: "/" });
    }
    let newCart = [];
    if (allCookies.cart) {
      if (allCookies.cart.length < 1) {
        cookies.set("cart", [item], { path: "/" });
        return;
      } else {
        allCookies.cart.map(el => {
          if (el.cartItemId === item.cartItemId && item.cartItemId) {
            console.log("already added", el.pId, item.pId);
          } else {
            newCart = [...allCookies.cart, item];

            // cookies.set("cart", {aa:"aa", newCart}, { path: "/" });
          }
        });
        console.log({ newCart });
        setTimeout(() => {
          cookies.set("cart", [{}, {}, ...newCart], { path: "/" });
        }, 2000);
      }
    }
    // if (item) cookies.set("cart", [...allCookies.cart, item], { path: "/" });
  }
  toggle() {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  }
  varientChange = selectedVarient => {
    this.setState({ selectedVarient, selectedVarientErr: false });
  };
  handleSubscribeChecked() {
    this.setState(prevState => ({
      subscribeChecked: !prevState.subscribeChecked
    }));
  }
  flavorChange = selectedFlavor => {
    this.setState({ selectedFlavor, selectedFlavorErr: false });
  };
  qtyChange = selectedQty => {
    this.setState({ selectedQty, selectedQtyErr: false });
  };
  susTimeChange = selectedSusTime => {
    this.setState({ selectedSusTime });
  };
  renderReviewIcons() {
    return (
      <div className="rating-icon">
        <Icon icon={starFull} />
        <Icon icon={starFull} />
        <Icon icon={starFull} />
        <Icon icon={starHalf} />
        <Icon icon={starEmpty} />
        <h4 style={{ display: "inline-block", paddingLeft: 10 }}> 5 reviews</h4>
      </div>
    );
  }
  changeVariations(e, names) {
    const {
      product: { variation, attributes }
    } = this.props;
    console.log({ e, names, product: this.props.product });
    let newOptions = [],
      otherOptions = [],
      allOptions = [];
    attributes.map(el => {
      if (el) {
        if (!(el.names === names)) {
          newOptions.push({
            names: el.names,
            values: []
          });
          otherOptions.push(el.names);
        }
        allOptions.push(el.names);
      }
    });
    variation.map(el => {
      // console.log(el)
      if (el) {
        if (el[names] === e.value) {
          otherOptions.map((newItem, index) => {
            if (newOptions[index].values) {
              if (!newOptions[index].values.includes(el[newItem])) {
                newOptions[index].values.push({
                  label: el[newItem].replace(/_/g, " "),
                  value: el[newItem]
                });
              }
            } else {
              newOptions[index].values.push({
                label: el[newItem].replace(/_/g, " "),
                value: el[newItem]
              });
            }
          });
        }
      }
    });
    console.log({
      newOptions,
      otherOptions
    });
    newOptions.map(el => {
      this.setState({
        [`${el.names}_options`]: el.values
      });
    });
    this.setState(
      {
        [names]: e,
        [`${names}Err`]: false,
        myPrice: true
      },
      () => {
        // allOptions.map()
        variation.map(el => {
          // el
          if (el) {
            allOptions.map(newkey => {
              // console.lg('myconsole',newkey, el[newkey], this.state[newkey], this.state)
              if (!this.state[newkey]) {
                this.setState({
                  myPrice: true
                });
                return;
              }
              if (this.state[newkey]) {
                console.log("myconsole", el[newkey], this.state[newkey].value);
                if (this.state.extract_flavor && this.state.size) {
                  if (
                    el.extract_flavor === this.state.extract_flavor.value &&
                    el.size === this.state.size.value
                  ) {
                    this.setState({
                      myPrice: false,
                      sale_price: el.sale_price,
                      regular_price: el.regular_price
                    });
                  }
                }
                // if(!(el[newkey] === this.state[newkey].value)){
                //   this.setState({
                //     myPrice: false,
                //     sale_price: el.sale_price,
                //     regular_price: el.regular_price
                //   })
                // }else{
                //   this.setState({
                //     // myPrice: false
                //   })
                // }
              }
              // else{
              //   this.setState({
              //     myPrice: true
              //   })
              // }
              // if()
            });
          }
        });
        setTimeout(() => {
          console.log({ hasprice: this.state.myPrice, allOptions });
        }, 200);
      }
    );
  }
  varitionInit(variations = []) {
    variations.map((el, index) => {
      if (el) {
        const { names, values } = el;
        this.setState({
          [names]: null
        });
        let options = [];
        if (values) {
          values.map(element => {
            options.push({
              label: element.replace(/_/g, " "),
              value: element
            });
          });
          this.setState({
            [`${names}_options`]: options
          });
        }
      }
    });
  }
  renderVariation(variations = []) {
    return variations.map((el, index) => {
      if (el) {
        const { names, values } = el;
        let options = [];
        if (values) {
          values.map(element => {
            options.push({
              label: element.replace(/_/g, " "),
              value: element
            });
          });
        }
        return (
          <div
            key={index}
            className={classNames("pt-3 col-sm-6 selector-wrapper animated", {
              shake: this.state[`${names}Err`]
            })}
          >
            <SelectMulti
              id={names}
              styles={selectStyle}
              value={this.state[names]}
              isMulti={false}
              placeholder={names}
              onChange={e => {
                this.changeVariations(e, names);
              }}
              options={this.state[`${names}_options`]}
            />
          </div>
        );
      }
    });
  }
  addToCart() {
    const { product } = this.props;
    const { selectedVarient, selectedFlavor, selectedQty } = this.state;
    console.log({ aa: product });

    let productItem = product;

    waterfall([
      done => {
        if (product.attributes) {
          product.attributes.map(el => {
            if (el) {
              if (!this.state[el.names]) {
                this.setState({ [`${el.names}Err`]: false }, () => {
                  this.setState({ [`${el.names}Err`]: true });
                  setTimeout(() => {
                    this.setState({ [`${el.names}Err`]: false });
                  }, 500);
                });
              }
            }
          });
          if (!this.state.selectedQty) {
            this.setState({ [`selectedQtyErr`]: false }, () => {
              this.setState({ [`selectedQtyErr`]: true });
              setTimeout(() => {
                this.setState({ [`$selectedQtyErr`]: false });
              }, 500);
            });
          }
        }

        return done();
      },
      done => {
        console.log({
          state: this.state
        });
        const { extract_flavor, size } = this.state;
        if (extract_flavor && size && selectedQty) {
          if (extract_flavor.value && size.value) {
            productItem.cartItemId = `${product._id}!${extract_flavor.value}!${
              size.value
            }`;
            productItem.qty = selectedQty;
            productItem.extract_flavor = extract_flavor;
            productItem.size = size;
            setTimeout(() => {
              // this.addToCart(productItem);
              this.props.addToCart(productItem);
            }, 2000);
          }
        }
        return done();
      }
    ]);
  }
  returnBasePriceVaritionProduct() {
    console.log("try");
    // console.log({ arr });
    const { sale_price, regular_price } = this.state;
    let value = 0;
    let currency = `$`;
    // if (arr) {
    //   if (arr.constructor === Array) {
    //     if (arr[2]) {
    //       if (arr[2].sale_price) {
    //         value = arr[2].sale_price;
    //       }
    //     }
    //   }
    // }
    if (sale_price) {
      value = sale_price;
    }
    if (value) {
      return ` - ${currency}${value}`;
    }
    return ``;
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
    const {
      state: {
        varientOptions,
        selectedVarient,
        selectedVarientErr,
        flavorOptions,
        selectedFlavor,
        selectedFlavorErr,
        qtyOptions,
        selectedQty,
        selectedQtyErr,
        subscribeChecked,
        selectedSusTime,
        susTimeOptions,
        isVariable
      },
      props: {
        product: {
          productid: {
            producttitle: productName,
            productdescription: productDesc,
            featurefilepath: mainImage
          },
          galleryimgdetails,
          keyingredients,
          variation,
          attributes
        },
        checkItemIncart
      }
    } = this;
    let productImageArr = [];
    if (mainImage) {
      productImageArr.push({ img: mainImage });
    }
    if (galleryimgdetails) {
      if (galleryimgdetails.constructor === Array) {
        galleryimgdetails.map(img => {
          productImageArr.push({ img });
        });
      }
    }
    return (
      <div className="first_sec">
        <div className="container-fluid">
          <div className="large-container" style={{ paddingBottom: 100 }}>
            <div className="row">
              <div className="col-md-6">
                <div className="display-product-wrapper">
                  <div className="display-product-inner">
                    <div className="image-view text-center">
                      <div>
                        <ProductViewSlider imgArr={productImageArr} />
                        {/* <img
                          src={imgSliderMed1}
                          className="img-fluid"
                        /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="bullet-icon-wrapper">
                  <div className="bullt-icon-inner">
                    <form>
                      <input type="radio" name="quantity" value="100" /> <label> 100 ml </label>
                      <input type="radio" name="quantity" value="125" /> <label> 125 ml </label>
                      <input type="radio" name="quantity" value="150" /> <label> 150 ml  </label>
                    </form>
                  </div>
                </div> */}
              </div>
              <div className="col-md-6">
                <div className="product-detail-data">
                  <div className="product-detail-inner">
                    <div className="product-summary">
                      <h1 className="product-title">
                        {productName}
                        {this.renderReviewIcons()}
                      </h1>

                      <p className="product-description">{productDesc}</p>
                    </div>
                    <div className="ProductDetails">
                      <ul className="ProductDetails-list">
                        <li className="ProductDetails-listItem ProductDetails-listItem--0">
                          <div className="ProductDetails-itemTitle">
                            Skin feel
                          </div>
                          <div className="ProductDetails-itemDescription">
                            Nourished, supple, with a grease-less finish
                          </div>
                        </li>
                        <li className="ProductDetails-listItem ProductDetails-listItem--1">
                          <div className="ProductDetails-itemTitle">Aroma</div>
                          <div className="ProductDetails-itemDescription">
                            Citrus, woody, herbaceous
                          </div>
                        </li>
                        <li className="ProductDetails-listItem ProductDetails-listItem--2">
                          <div className="ProductDetails-itemTitle">
                            Key ingredients
                            <button
                              aria-label="View more ingredients"
                              className="ProductDetails-moreBtn"
                              data-ref="ingredientOverlay-toggle"
                              type="button"
                              onClick={this.toggle}
                            >
                              <svg
                                className="Icon ProductDetails-moreBtnIcon"
                                data-ref="ingredientOverlay-icon"
                                role="img"
                                viewBox="0 0 50 50"
                              >
                                <g>
                                  <circle
                                    className="Glyph-addAndCloseWithCircle--circle"
                                    cx="25"
                                    cy="25"
                                    r="22"
                                    fill="none"
                                  />
                                  <polygon
                                    className="Glyph-addAndCloseWithCircle--plus"
                                    points="26.2,15.2 23.8,15.2 23.8,23.9 15,23.9 15,26.4 23.8,26.4 23.8,35.1 26.2,35.1 26.2,26.4 35,26.4 35,23.9 26.2,23.9 "
                                  />
                                  <polygon
                                    className="Glyph-addAndCloseWithCircle--close"
                                    points="32.9,19 31.2,17.3 25,23.4 18.8,17.2 17,19 23.3,25.2 17.1,31.3 18.8,33 25,26.9 31.2,33.1 33,31.3 26.7,25.1 "
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                          <div className="ProductDetails-itemDescription">
                            <div style={{ width: "100%" }}>
                              {!this.state.collapse && `${keyingredients}`}
                            </div>
                            <Collapse isOpen={this.state.collapse}>
                              <div>{keyingredients}</div>
                            </Collapse>
                          </div>
                        </li>
                        <li className=" ProductDetails-listItem--2">
                          <div className="">
                            <div className="row">
                              <div
                                className={classNames(
                                  "pt-3 col-sm-6 selector-wrapper animated",
                                  {
                                    shake: selectedQtyErr
                                  }
                                )}
                              >
                                <SelectMulti
                                  id={"selectVarient"}
                                  styles={selectStyle}
                                  value={selectedQty}
                                  isMulti={false}
                                  input={false}
                                  placeholder={"Quantity"}
                                  onChange={this.qtyChange}
                                  options={qtyOptions}
                                />
                              </div>
                              {isVariable && this.renderVariation(attributes)}
                              {/* <div className={classNames("pt-3 col-sm-6 selector-wrapper animated", {
                                "shake" : selectedVarientErr
                              })}>
                                <SelectMulti
                                  id={"selectVarient"}
                                  styles={selectStyle}
                                  value={selectedVarient}
                                  isMulti={false}
                                  placeholder={"CDB Strength"}
                                  onChange={this.varientChange}
                                  options={varientOptions}
                                />
                              </div>
                              <div className={classNames("pt-3 col-sm-6 selector-wrapper animated", {
                                "shake" : selectedFlavorErr
                              })}>
                                <SelectMulti
                                  id={"selectVarient"}
                                  styles={selectStyle}
                                  value={selectedFlavor}
                                  isMulti={false}
                                  placeholder={"Flavor"}
                                  onChange={this.flavorChange}
                                  options={flavorOptions}
                                />
                            </div>*/}
                              <div className="pt-3 col-sm-6">
                                <div className="has-inputs has-checkbox-input">
                                  <input
                                    type="checkbox"
                                    checked={subscribeChecked}
                                    id="subscribeCheckBox"
                                    onChange={this.handleSubscribeChecked}
                                  />
                                  <label htmlFor="subscribeCheckBox">
                                    <span
                                      className={classNames("CheckIcon", {
                                        checked: subscribeChecked
                                      })}
                                    />
                                    Subscribe &amp; save 10%
                                  </label>
                                </div>
                              </div>
                              {subscribeChecked && (
                                <div className="pt-3 col-12">
                                  <SelectMulti
                                    id={"selectVarient"}
                                    styles={selectStyle}
                                    value={selectedSusTime}
                                    isMulti={false}
                                    onChange={this.susTimeChange}
                                    options={susTimeOptions}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </li>

                        {/* My Work */}
                        <li className="ProductDetails-addtocart ProductDetails-listItem ProductDetails-addtocart-2">
                          {/* <div className="cart-quantity">
                            <button>-</button>
                            <input type="text" value="1" />
                            <button className="sub-btn" style={{ fontSize: 19, }}>+</button>
                          </div> */}
                          <div
                            className={classNames("cart-btn-right", {
                              // disable: checkItemIncart(this.props.product)
                            })}
                          >
                            <button onClick={this.addToCart}>
                              Add To Cart
                              {this.returnBasePriceVaritionProduct(variation)}
                            </button>
                          </div>
                        </li>
                        {/* <li className="ProductDetails-listItem ProductDetails-listItem--4">
                          <div className="ProductDetails-itemTitle">
                            FAQ
                            <button
                              aria-label="View more ingredients"
                              className="ProductDetails-moreBtn"
                              data-ref="ingredientOverlay-toggle"
                              typel="button"
                              onClick={
                                ()=>{

                                }
                                // this.toggle
                              }
                            >
                              <svg
                                className="Icon ProductDetails-moreBtnIcon"
                                data-ref="ingredientOverlay-icon"
                                role="img"
                                viewBox="0 0 50 50"
                              >
                                <g>
                                  <circle
                                    className="Glyph-addAndCloseWithCircle--circle"
                                    cx="25"
                                    cy="25"
                                    r="22"
                                    fill="none"
                                  />
                                  <polygon
                                    className="Glyph-addAndCloseWithCircle--plus"
                                    points="26.2,15.2 23.8,15.2 23.8,23.9 15,23.9 15,26.4 23.8,26.4 23.8,35.1 26.2,35.1 26.2,26.4 35,26.4 35,23.9 26.2,23.9 "
                                  />
                                  <polygon
                                    className="Glyph-addAndCloseWithCircle--close"
                                    points="32.9,19 31.2,17.3 25,23.4 18.8,17.2 17,19 23.3,25.2 17.1,31.3 18.8,33 25,26.9 31.2,33.1 33,31.3 26.7,25.1 "
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                          {<div className="ProductDetails-itemDescription">
                            Nourished, supple, with a grease-less finish
                          </div> }
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
