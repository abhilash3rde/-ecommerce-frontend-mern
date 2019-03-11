import React, { Component } from "react";
import SelectMulti from "react-select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { ic_clear, ic_close, ic_add } from "react-icons-kit/md";
import { Collapse } from "reactstrap";
import classNames from "classnames";
import { getCountryName } from "../../services/extra";
import { getAllProductApi } from "../../services/api";
import { selectStyle, countryList } from "../Constants";
import { HomeSliderSection } from "../";
import { removeFromCart, modifyItem } from "../../actions";
import secImage from "../../assets/images/getseal.gif";
import { getItemTotal } from "../../services/extra/cartHealpers";
import PaypalBtn from "../PaypalBtn";
class Cart extends Component {
  constructor(props) {
    super(props);

    this.varientChange = this.varientChange.bind(this);
    this.flavorChange = this.flavorChange.bind(this);
    this.qtyChange = this.qtyChange.bind(this);
    this.shippingChange = this.shippingChange.bind(this);
    this.toggleTaxCol = this.toggleTaxCol.bind(this);
    this.changeTaxInValue = this.changeTaxInValue.bind(this);
    this.renderCartItem = this.renderCartItem.bind(this);
    this.renderCartContainer = this.renderCartContainer.bind(this);
    this.getFeatureProduct = this.getFeatureProduct.bind(this);
    this.state = {
      shippingOptions: [
        {
          label: "India",
          value: "india"
        },
        {
          label: "USA",
          value: "usa"
        },
        {
          label: "hong kong",
          value: "hongKong"
        }
      ],
      selectedShipping: {
        label: "India",
        value: "india"
      },
      selectedVarient: null,
      selectedFlavor: null,
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
      isTaxOpen: false,
      taxInValue: "",
      shippingCharge: 10,
      featureProducts: []
    };
  }
  componentDidMount() {
    this.getFeatureProduct();
  }
  shippingChange = selectedShipping => {
    this.setState({ selectedShipping });
  };
  varientChange = selectedVarient => {
    this.setState({ selectedVarient });
  };
  flavorChange = selectedFlavor => {
    this.setState({ selectedFlavor });
  };
  qtyChange = selectedQty => {
    this.setState({ selectedQty });
  };
  toggleTaxCol() {
    this.setState(prevState => ({
      isTaxOpen: !prevState.isTaxOpen
    }));
  }
  changeTaxInValue(e) {
    this.setState({
      taxInValue: e.target.value
    });
  }
  countrySelectOptions() {
    const newCountryList = countryList.map(el => {
      return {
        label: el.title,
        value: el.code
      };
    });
    return newCountryList;
  }
  myArrFilter(fullArr, key, value) {
    console.log({ fullArr, key, value });
    let returnVal = fullArr.map(el => {
      if (el) {
        if (el[key] === value) return el;
      }
    });
    if (returnVal) return returnVal;
  }
  updateCartItem(item) {
    console.log(this.props);
  }
  changeVariations(e, names, item) {
    this.props.modifyItem({
      oldItem: item,
      newItem: { ...item, [names]: e }
    });
  }
  renderVariation(item) {
    console.log({ item });
    let varientOption = {};
    // item.variations.map()
    let sortedVarition = {};
    let unSortedVarition = {};
    if (item.producttype === "variable") {
      item.attributes.map(el => {
        if (el) {
          const { names, values } = el;
          sortedVarition[names] = this.myArrFilter(
            item.variation,
            names,
            item[names].value
          );
          unSortedVarition[names] = [...item.variation];
          unSortedVarition[names] = unSortedVarition[names].filter(el => {
            return el !== undefined && el !== null;
          });
          sortedVarition[names] = sortedVarition[names].filter(function(
            element
          ) {
            return element !== undefined;
          });
        }
      });
    }
    console.log({ sortedVarition, unSortedVarition });
    return item.attributes.map((el, index) => {
      if (el) {
        const { names, values } = el;
        console.log({ sortedVarition, names });
        let options = [];
        if (names === "extract_flavor") {
          if (sortedVarition.size) {
            options = sortedVarition.size.map(el => {
              return {
                label: el.extract_flavor.replace(/_/g, " "),
                value: el.extract_flavor
              };
            });
          } else {
            options = unSortedVarition.extract_flavor.map(el => ({
              label: el.extract_flavor.replace(/_/g, " "),
              value: el.extract_flavor
            }));
          }
        }
        if (names === "size") {
          if (sortedVarition.extract_flavor) {
            options = sortedVarition.extract_flavor.map(el => {
              return {
                label: el.size.replace(/_/g, " "),
                value: el.size
              };
            });
          } else {
            options = unSortedVarition.size.map(el => ({
              label: el.size.replace(/_/g, " "),
              value: el.size
            }));
          }
        }
        return (
          <div
            key={index}
            className={classNames("pt-3 col-sm-6 selector-wrapper animated", {
              // shake: this.state[`${names}Err`]
            })}
          >
            <SelectMulti
              id={names}
              styles={selectStyle}
              value={item[names]}
              isMulti={false}
              placeholder={names}
              onChange={e => {
                this.changeVariations(e, names, item);
              }}
              // options={this.state[`${names}_options`]}
              options={options}
            />
          </div>
        );
      }
    });
  }
  returnPrice(saleprice, regularprice) {
    let price = ``;
    if (saleprice) price = `$${saleprice}`;
    else if (regularprice) price = `$${regularprice}`;

    return price;
  }
  renderCartItem(items) {
    const {
      state: {
        varientOptions,
        selectedVarient,
        flavorOptions,
        selectedFlavor,
        qtyOptions,
        selectedQty,
        shippingOptions,
        selectedShipping,
        isTaxOpen,
        taxInValue
      }
    } = this;
    return items.map((item, index) => {
      console.log({ myitem: item });
      const {
        regularprice,
        saleprice,
        _id,
        qty,
        productid: { featurefilepath, producttitle }
      } = item;
      return (
        <div className="cart-product-div" key={index}>
          <div
            className="cart-product-remove"
            onClick={() => {
              // console.log(this.props);
              this.props.removeFromCart(item);
            }}
          >
            <Icon icon={ic_clear} />
          </div>
          <div className="cart-product-image-wrap">
            <img src={featurefilepath} alt="product" />
            <div className="cart-product-price">
              <p>{this.returnPrice(saleprice, regularprice)}</p>
            </div>
          </div>
          <div className="cart-product-detail">
            <div className="cart-product-name">{producttitle}</div>
            <div className="product-options">
              <div className="col-12">
                <div className="row">
                  <div className="col-xl-10">
                    <div className="row">
                      <div className="pt-3 pl-2 pr-2 col-xs-6 col-lg-3">
                        <SelectMulti
                          id={"selectedQty"}
                          styles={selectStyle}
                          value={qty}
                          isMulti={false}
                          input={false}
                          placeholder={"Qty"}
                          // onChange={this.qtyChange}
                          onChange={e => {
                            this.changeVariations(e, "qty", item);
                          }}
                          options={qtyOptions}
                        />
                      </div>
                      {this.renderVariation(item)}
                    </div>
                  </div>
                  <div className="col-xl-2">
                    <div className="product-info ">
                      <p className="product-info-price">
                        ${getItemTotal(item) || 0}
                      </p>
                      {/* <p className="product-info-price">${item.basePrice}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-info text-left">
              {/* <p className="product-info-price">${getItemTotal(item) || 0}</p> */}
              <p className="product-info-shipping">FREE RETURN SHIPPING.</p>
            </div>
          </div>
        </div>
      );
    });
  }
  getCartPrice(extra = 0) {
    const { cart } = this.props;
    console.log("get price ", this.props);
    if (!cart) return 0;
    if (cart.subTotal);
    return cart.subTotal + extra;

    return 0;
  }
  renderCartContainer() {
    const {
      state: {
        shippingOptions,
        selectedShipping,
        isTaxOpen,
        taxInValue,
        shippingCharge
      },
      props: {
        cart: { cart }
      }
    } = this;
    const checkoutPage = `/${this.props.match.params.lang}/checkout/`;
    console.log({ cart });
    return (
      <div className="cart-page-container">
        <div className="container-extend">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-heading">
                <h3 className="MCItemCarouselIntro-title">
                  My Bag ({cart ? cart.items.length : 0})
                </h3>
              </div>
              <div className="cart-product-container">
                <div className="cart-product-inner">
                  <div className="cart-product-header">
                    <p className="sm-title">Product</p>
                  </div>
                  <div className="cart-product-body">
                    <div className="cart-product-list">
                      {this.renderCartItem(cart ? cart.items : [])}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 offset-xl-1 col-lg-4">
              <div className="order-summary-wrapper">
                <div className="cart-heading">
                  <h3 className="sm-title">ORDER SUMMARY</h3>
                </div>
                <div className="order-summary-form">
                  <form
                    onSubmit={e => {
                      e.preventDafault();
                    }}
                  >
                    <div className="order-summary-row lr">
                      <p className="order-summary-label">SUBTOTAL</p>
                      <p className="value">${this.getCartPrice()}</p>
                    </div>
                    <div className="order-summary-row lr nbr">
                      <p className="order-summary-label">ESTIMATED TAX</p>
                      <Icon
                        onClick={this.toggleTaxCol}
                        icon={isTaxOpen ? ic_close : ic_add}
                      />
                    </div>
                    <div className="order-summary-row lr">
                      <Collapse isOpen={this.state.isTaxOpen}>
                        <div className="container">
                          <div className="row">
                            <div className="row">
                              <div className="col-5 has-input">
                                <input
                                  type="text"
                                  onChange={this.changeTaxInValue}
                                  value={taxInValue}
                                />
                              </div>
                              <div className="col-7 has-input">
                                <input
                                  type="button"
                                  className="btn btn-red"
                                  value={"Calculate"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Collapse>
                    </div>
                    <div className="order-summary-row lr nbr">
                      <p className="order-summary-label">SHIPPING</p>
                      <p className="value">${shippingCharge}</p>
                    </div>
                    <div className="order-summary-row">
                      <div>
                        <SelectMulti
                          id={"selectedQty"}
                          styles={selectStyle}
                          value={selectedShipping}
                          isMulti={false}
                          input={false}
                          placeholder={"Quantity"}
                          onChange={this.shippingChange}
                          // options={shippingOptions}
                          options={this.countrySelectOptions()}
                        />
                      </div>
                    </div>
                    <div className="order-summary-row lr nbr">
                      <p className="order-summary-label">ORDER TOTAL</p>
                      <p className="value">
                        ${this.getCartPrice(shippingCharge)}
                      </p>
                    </div>
                    <div className="order-summary-row order-summary-footer">
                      <div className="order-summary-btns">
                        <Link to={checkoutPage}>
                          <span className="btn or-btn btn-red btn-icon">
                            Checkout
                          </span>
                        </Link>
                        {/* <span className="btn or-btn btn-blue btn-icon">
                          Paypal
                        </span> */}
                        <PaypalBtn total={this.getCartPrice(shippingCharge)} />
                        <span className="btn or-btn btn-light-grey btn-icon">
                          Express
                        </span>
                        <span className="btn or-btn btn-outline-shopping btn-icon">
                          continue shopping
                        </span>
                      </div>
                      <div className="text-center">
                        <img
                          src={secImage}
                          alt="secure"
                          className="img-fluid "
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isVisible(type, visibilitytype, blockedcountries) {
    let result = false;
    if (type === "featured") {
      if (visibilitytype === "show") {
        if (blockedcountries) {
          if (
            !blockedcountries.includes(getCountryName(this.props.countryCode))
          ) {
            result = true;
          }
        } else {
          result = true;
        }
      }
    }
    return result;
  }
  getFeatureProduct() {
    getAllProductApi()
      .then(res => res.json())
      .then(resJson => {
        console.log({ fproduct: resJson });
        const { products } = resJson;
        if (products) {
          const featureProducts = products.filter(product => {
            const {
              type,
              visibilitytype,
              productid: { blockedcountries }
            } = product;
            return this.isVisible(type, visibilitytype, blockedcountries);
          });
          this.setState({ featureProducts }, () => {
            console.log({ featureProdu: this.state.featureProducts });
          });
        }
      });
  }
  renderEmptyCart() {
    const productPage = `/${this.props.match.params.lang}/shop/`;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4 text-center">
            <h1 className="product-title">0 ITEMS</h1>
            <br />
            <h1 className="product-title">
              There Are No Items
              <br />
              In Your Bag
            </h1>
            <br />
            <br />
            <Link to={productPage}>
              <span className="btn or-btn btn-outline-shopping btn-icon">
                continue shopping
              </span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {
      cart: { cart }
    } = this.props;
    const { featureProducts } = this.state;
    console.log({ cart });
    return (
      // <div className="start-section">
      <div className={classNames("start-section")}>
        {/* <Header /> */}
        {cart.items.length > 0 && this.renderCartContainer()}
        {cart.items.length <= 0 && this.renderEmptyCart()}
        {featureProducts.length > 0 && (
          <HomeSliderSection productArr={featureProducts} noTitle={true} />
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, "from cart");
  return state;
};
export default connect(
  mapStateToProps,
  { removeFromCart, modifyItem }
)(Cart);
