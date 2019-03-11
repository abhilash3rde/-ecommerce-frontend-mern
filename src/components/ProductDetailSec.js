import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse,Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import SelectMulti from "react-select";
import classNames from "classnames";
import { Icon } from "react-icons-kit";
import { starFull, starEmpty, starHalf } from "react-icons-kit/icomoon/";
import { ProductViewSlider } from "./";
import waterfall from "async-waterfall";
import { selectStyle } from "./Constants";
import { addToCart } from "../actions";

class ProductDetailSec extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleModal=this.toggleModal.bind(this);
    this.varitionInit = this.varitionInit.bind(this);
    this.renderVariation = this.renderVariation.bind(this);
    this.varientChange = this.varientChange.bind(this);
    this.flavorChange = this.flavorChange.bind(this);
    this.qtyChange = this.qtyChange.bind(this);
    this.setSimpleProductPrice = this.setSimpleProductPrice.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleSubscribeChecked = this.handleSubscribeChecked.bind(this);
    this.state = {
      collapse: false,
      selectedVarient: null,
      selectedVarientErr: null,
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
      regular_price: 0,
      modal: false
    };
  }
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
      this.setSimpleProductPrice(this.props.product);
    }
  }
  toggle() {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
      
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
    //********************* */
  };
  susTimeChange = selectedSusTime => {
    this.setState({ selectedSusTime });
    //******************** */
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
  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
              console.log({ allOptions, newkey });
              // console.lg('myconsole',newkey, el[newkey], this.state[newkey], this.state)
              if (newkey) {
                if (!this.state[newkey]) {
                  this.setState({
                    myPrice: true
                  });
                  return;
                }
                if (this.state[newkey]) {
                  console.log(
                    "myconsole",
                    el[newkey],
                    this.state[newkey].value
                  );
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
                  } else if (this.state.size) {
                    if (el.size === this.state.size.value) {
                      this.setState({
                        myPrice: false,
                        sale_price: el.sale_price,
                        regular_price: el.regular_price
                      });
                    }
                  } else if (this.state.extract_flavor) {
                    if (el.extract_flavor === this.state.extract_flavor.value) {
                      this.setState({
                        myPrice: false,
                        sale_price: el.sale_price,
                        regular_price: el.regular_price
                      });
                    }
                  }
                }
              }
            });
          }
        });
        setTimeout(() => {
          console.log({ hasprice: this.state.myPrice, allOptions });
        }, 200);
      }
    );
  }
  setSimpleProductPrice(product) {
    if (product) {
      if (product.producttype === "simple") {
        if (product.regularprice) {
          this.setState(
            {
              myPrice: false,
              regular_price: product.regularprice
            },
            () => {
              console.log(this.state, "state print");
            }
          );
        }
        if (product.saleprice) {
          this.setState(
            {
              myPrice: false,
              sale_price: product.saleprice
            },
            () => {
              console.log(this.state, "state print");
            }
          );
        }
      }
    }
  }
  varitionInit(variations = []) {
    variations.map(el => {
      if (el) {
        const { names, values } = el;
        this.setState({
          [names]: null
        });
        let options = [];
        if (values) {
          if (values.constructor === String) {
            this.setState({
              [`${names}_options`]: [
                {
                  label: values.replace(/_/g, " "),
                  value: values
                }
              ]
            });
          } else if (values.constructor === Array) {
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
    // let productItem = {...product};
    let namesList = [];
    waterfall([
      done => {
        if (product.attributes) {
          product.attributes.map(el => {
            if (el) {
              namesList.push(el.names);
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
        let flag = true;
        let productItem = { ...product };
        const { selectedQty, extract_flavor, size } = this.state;
        if (namesList.includes("extract_flavor")) {
          if (extract_flavor) {
            if (!extract_flavor.value) {
              flag = false;
            } else {
              productItem.extract_flavor = extract_flavor;
            }
          } else {
          }
        }
        if (namesList.includes("size")) {
          console.log({ namesList });
          if (size) {
            if (!size.value) {
              flag = false;
            } else {
              productItem.size = size;
            }
          } else {
            flag = false;
          }
        }
        if (!selectedQty) {
          flag = false;
        } else {
          productItem.qty = selectedQty;
        }
        console.log({ myprodcudt: productItem });
        if (productItem.producttype === "variable") {
          if (productItem.size && productItem.extract_flavor) {
            productItem.variation.map(el => {
              if (
                el.size === productItem.size.value &&
                el.extract_flavor === productItem.extract_flavor.value
              ) {
                productItem = {
                  ...productItem,
                  regularprice: el.regular_price,
                  saleprice: el.sale_price
                };
              }
            });
          } else if (productItem.size) {
            productItem.variation.map(el => {
              if (el) {
                if (el.size === productItem.size.value) {
                  productItem = {
                    ...productItem,
                    regularprice: el.regular_price,
                    saleprice: el.sale_price
                  };
                }
              }
            });
          } else if (productItem.extract_flavor) {
            productItem.variation.map(el => {
              if (el) {
                if (el.extract_flavor === productItem.extract_flavor.value) {
                  productItem = {
                    ...productItem,
                    regularprice: el.regular_price,
                    saleprice: el.sale_price
                  };
                  
                }
              }
            });
            
          }
        }

        setTimeout(() => {
          if (flag) {
            this.props.addToCart(productItem);
            console.log(this.props);
            this.props.addToCart(productItem);
            this.setState({modal: true}, ()=>{
              setTimeout(()=>{
                this.setState({modal: false})
              }, 3000)
            })
          }
        }, 200);
        
      }
    ]);
    // this.props.addToCart(this.props.product)
    // console.log(this.state)
    
  }
  returnBasePriceVaritionProduct(qty) {
    
    console.log("try");
    const { sale_price, regular_price } = this.state;
    let value = 0;
    let qtyVal = 1;
    if (qty) {
      if (qty.value) {
        qtyVal = qty.value > 0 ? parseInt(qty.value) : 1;
      }
     // this.toggleModal;
    }
    let currency = `$`;
    if (sale_price) {
      value = sale_price;
    } else if (regular_price) {
      value = regular_price;
    }
    if (value) {
      
      return ` - ${currency}${value * qtyVal}`;
    }
    return ``;
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
                      </div>
                    </div>
                  </div>
                </div>
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
                            <div
                              style={{
                                width: "100%",
                                lineHeight: 1.4,
                                overflow: "hidden",
                                maxHeight: "1.4em"
                              }}
                            >
                              {/* {!this.state.collapse && `${keyingredients}`} */}
                              {keyingredients}
                            </div>
                            <Collapse isOpen={this.state.collapse}>
                              <div style={{ overflow: "hidden" }}>
                                <div style={{ marginTop: "-1.4em" }}>
                                  {keyingredients}
                                </div>
                              </div>
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
                          <div
                            className={classNames("cart-btn-right", {
                              // disable: checkItemIncart(this.props.product)
                            })}
                          >
                            <button onClick={this.addToCart} >
                              Add To Cart
                              {this.returnBasePriceVaritionProduct(
                                this.state.selectedQty
                              )}
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className + ' modal-dialog-right'}>
          <ModalHeader toggle={this.toggleModal}><h2>Added to your bag</h2></ModalHeader>
          <ModalBody>
             <div className="row">
             <div className="col-sm-3">
               <img src="https://maxxbio.s3.ap-south-1.amazonaws.com/1552054810990-prd-Schermata%202019-02-28%20alle%2018.32.52.png" className="cart-product-image-wrap-short" />
             </div>
             <div className="col-sm-9">
                <div className="">
                  <h2>Oil Tinctures/ Drops</h2>
                  <p>Size 30ml </p>
                  <p> $120.00 USD</p>
                  <p>Sub Total $120.00 USD</p>
                </div>
             </div>
             </div>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>VIEW BAG</Button>{' '}
            <Button color="danger" onClick={this.toggleModal}>CHECKOUT</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, "mapstate");
};

export default connect(
  mapStateToProps,
  { addToCart }
)(ProductDetailSec);
