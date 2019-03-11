import React, { Component } from "react";
import { connect } from "react-redux";
import SelectMulti from "react-select";
import classNames from "classnames";
import {
  isAlpha,
  isEmail,
  isEmpty,
  isMobilePhone,
  isPostalCode,
  isNumeric
} from "validator";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { selectStyle, countryList } from "./Constants";
import {
  countries,
  city_states
} from "../services/extra/countrySelectorOption";
import CartItemsSmall from "./CartItemsSmall";
import { clearCart } from "../actions";
import { placeOrderApi } from "../services/api";
class CheckOutForm extends Component {
  constructor(props) {
    super(props);
    this.countryChange = this.countryChange.bind(this);
    this.countryShippingChange = this.countryShippingChange.bind(this);
    this.regionShippingChange = this.regionShippingChange.bind(this);
    this.regionChange = this.regionChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.cityShippingChange = this.cityShippingChange.bind(this);
    this.handleSameShipping = this.handleSameShipping.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.fieldVaidation = this.fieldVaidation.bind(this);
    this.validateOnSubmit = this.validateOnSubmit.bind(this);
    this.generateOrder = this.generateOrder.bind(this);
    this.toggle = this.toggle.bind(this);
    this.modalDismis = this.modalDismis.bind(this);
    this.state = {
      selectedCountry: null,
      selectedRegion: null,
      selectedCity: null,
      selectedShippingRegion: null,
      selectedShippingCountry: null,
      selectedShippingCity: null,
      sameShipping: false,
      shipping_first_name: "",
      shipping_first_name_err: null,
      shipping_first_name_errMsg: "",
      shipping_last_name: "",
      shipping_last_name_err: null,
      shipping_last_name_errMsg: "",
      shipping_email_name: "",
      shipping_email_name_err: null,
      shipping_email_name_errMsg: "",
      shipping_phone_name: "",
      shipping_phone_name_err: null,
      shipping_phone_name_errMsg: "",
      shipping_address_name_01: "",
      shipping_address_name_01_err: null,
      shipping_address_name_01_errMsg: "",
      shipping_address_name_02: "",
      shipping_address_name_02_err: null,
      shipping_address_name_02_errMsg: "",
      shipping_address_town: "",
      shipping_address_town_err: null,
      shipping_address_town_errMsg: "",
      billing_first_name: "",
      billing_first_name_err: null,
      billing_first_name_errMsg: "",
      billing_last_name: "",
      billing_last_name_err: null,
      billing_last_name_errMsg: "",
      billing_email_name: "",
      billing_email_name_err: null,
      billing_email_name_errMsg: "",
      billing_phone_name: "",
      billing_phone_name_err: null,
      billing_phone_name_errMsg: "",
      billing_address_name_01: "",
      billing_address_name_01_err: null,
      billing_address_name_01_errMsg: "",
      billing_address_name_02: "",
      billing_address_name_02_err: null,
      billing_address_name_02_errMsg: "",
      billing_address_town: "",
      billing_address_town_err: null,
      billing_address_town_errMsg: "",
      shipping_zip_code: "",
      shipping_zip_code_err: null,
      shipping_zip_code_errMsg: "",
      billing_zip_code: "",
      billing_zip_code_err: null,
      billing_zip_code_errMsg: "",
      modal: false,
      modalData: "",
      clearCart: false,
      formResetValue: {
        shipping_first_name: "",
        shipping_last_name: "",
        shipping_email_name: "",
        shipping_phone_name: "",
        shipping_address_name_01: "",
        shipping_address_name_02: "",
        shipping_address_town: "",
        shipping_zip_code: "",
        billing_first_name: "",
        billing_first_name: "",
        billing_last_name: "",
        billing_email_name: "",
        billing_phone_name: "",
        billing_address_name_01: "",
        billing_address_name_02: "",
        billing_address_town: "",
        billing_zip_code: ""
      }
    };
  }
  componentDidMount() {
    console.log(Object.keys(countries));
    if (localStorage.getItem("checkoutFormResetData")) {
      const formOldData = JSON.parse(
        localStorage.getItem("checkoutFormResetData")
      );
      this.setState({
        formResetValue: formOldData
      });
      this.setState({
        shipping_first_name: formOldData.shipping_first_name,
        shipping_last_name: formOldData.shipping_last_name,
        shipping_email_name: formOldData.shipping_email_name,
        shipping_phone_name: formOldData.shipping_phone_name,
        shipping_address_name_01: formOldData.shipping_address_name_01,
        shipping_address_name_02: formOldData.shipping_address_name_02,
        shipping_address_town: formOldData.shipping_address_town,
        shipping_zip_code: formOldData.shipping_zip_code,
        billing_first_name: formOldData.billing_first_name,
        billing_last_name: formOldData.billing_last_name,
        billing_email_name: formOldData.billing_email_name,
        billing_phone_name: formOldData.billing_phone_name,
        billing_address_name_01: formOldData.billing_address_name_01,
        billing_address_name_02: formOldData.billing_address_name_02,
        billing_address_town: formOldData.billing_address_town,
        billing_zip_code: formOldData.billing_zip_code
      });
    }
    if (localStorage.getItem("selectedShippingRegionReset")) {
      this.setState({
        selectedShippingRegion: JSON.parse(
          localStorage.getItem("selectedShippingRegionReset")
        )
      });
      this.regionShippingChange(
        JSON.parse(localStorage.getItem("selectedShippingRegionReset"))
      );
      if (localStorage.getItem("selectedShippingCountryReset")) {
        this.setState({
          selectedShippingCountry: JSON.parse(
            localStorage.getItem("selectedShippingCountryReset")
          )
        });
        this.countryShippingChange(
          JSON.parse(localStorage.getItem("selectedShippingCountryReset"))
        );
        if (localStorage.getItem("selectedShippingCityReset")) {
          this.setState({
            selectedShippingCity: JSON.parse(
              localStorage.getItem("selectedShippingCityReset")
            )
          });
          this.cityShippingChange(
            JSON.parse(localStorage.getItem("selectedShippingCityReset"))
          );
        }
      }
    }
    if (localStorage.getItem("selectedRegionReset")) {
      this.setState({
        selectedRegion: JSON.parse(localStorage.getItem("selectedRegionReset"))
      });
      this.regionChange(
        JSON.parse(localStorage.getItem("selectedRegionReset"))
      );
      if (localStorage.getItem("selectedRegionReset")) {
        this.setState({
          selectedCountry: JSON.parse(
            localStorage.getItem("selectedCountryReset")
          )
        });
        this.countryChange(
          JSON.parse(localStorage.getItem("selectedCountryReset"))
        );
        if (localStorage.getItem("selectedCityReset")) {
          this.setState({
            selectedCity: JSON.parse(localStorage.getItem("selectedCityReset"))
          });
          this.cityChange(
            JSON.parse(localStorage.getItem("selectedCityReset"))
          );
        }
      }
    }
  }
  fieldVaidation(field, type) {
    // console.log({field, type})
    const typeArr = type.split(",");
    if (typeArr.includes("required")) {
      if (!isEmpty(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "can't be empty"
        });
        return;
      }
    }
    if (typeArr.includes("name")) {
      if (isAlpha(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Only Letters"
        });
        return;
      }
    }
    if (typeArr.includes("email")) {
      if (isEmail(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Email Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("phone")) {
      if (isMobilePhone(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Not Valid"
        });
        return;
      }
    }
    if (typeArr.includes("zipcode")) {
      // if(isPostalCode(this.state[field])){
      if (isNumeric(this.state[field])) {
        this.setState({
          [field + "_err"]: false,
          [field + "_errMsg"]: ""
        });
      } else {
        this.setState({
          [field + "_err"]: true,
          [field + "_errMsg"]: "Not Valid"
        });
        return;
      }
    }
  }
  validateOnSubmit() {
    const shippingFields = [
      {
        name: "shipping_first_name",
        type: "name,required"
      },
      {
        name: "shipping_last_name",
        type: "name,required"
      },
      {
        name: "shipping_email_name",
        type: "email,required"
      },
      {
        name: "shipping_phone_name",
        type: "phone,required"
      },
      {
        name: "shipping_address_name_01",
        type: "required"
      },
      {
        name: "shipping_address_town",
        type: "required"
      },
      {
        name: "shipping_zip_code",
        type: "required, zipcode"
      }
    ];
    const billingFields = [
      {
        name: "billing_first_name",
        type: "name,required"
      },
      {
        name: "billing_last_name",
        type: "name,required"
      },
      {
        name: "billing_email_name",
        type: "email,required"
      },
      {
        name: "billing_phone_name",
        type: "phone,required"
      },
      {
        name: "billing_address_name_01",
        type: "required"
      },
      {
        name: "billing_address_town",
        type: "required"
      },
      {
        name: "billing_zip_code",
        type: "required, zipcode"
      }
    ];
    const { sameShipping } = this.state;

    let validate = [];
    validate = [...billingFields, ...validate];
    if (!sameShipping) {
      validate = [...validate, ...shippingFields];
    }

    validate.map(el => {
      this.fieldVaidation(el.name, el.type);
    });

    const checkAll = validate.map(el => {
      return this.state[el.name + "_err"];
    });
    const flag = checkAll.some(a => {
      return a !== false;
    });

    console.log({ flag });
    return flag;
  }

  generateOrder() {
    this.validateOnSubmit();
    const {
      cart: { cart, shippingCharge, subTotal }
    } = this.props;
    const {
      billing_first_name,
      billing_last_name,
      billing_email_name,
      billing_phone_name,
      billing_address_name_01,
      billing_address_name_02,
      billing_address_town,
      shipping_first_name,
      shipping_last_name,
      shipping_email_name,
      shipping_phone_name,
      shipping_address_name_01,
      shipping_address_name_02,
      shipping_address_town,
      selectedShippingCity,
      selectedCity,
      selectedShippingCountry,
      selectedCountry,
      shipping_zip_code,
      billing_zip_code,
      sameShipping
    } = this.state;
    console.log(cart, this.props);

    let order = {};
    // order.subTotal = subTotal
    let country = "India";
    if (selectedShippingCountry) {
      country = selectedShippingCountry.label;
    } else if (selectedCountry) {
      country = selectedCountry.label || "India";
    }
    let state = "New Delhi";
    if (selectedShippingCity) {
      state = selectedShippingCity.label;
    } else if (selectedCity) {
      state = selectedCity.label || "New Delhi";
    }
    let zipcode = "452001";
    if (shipping_zip_code) {
      zipcode = shipping_zip_code;
    } else if (billing_zip_code) {
      zipcode = billing_zip_code;
    }
    order.orderproduct = cart.items.map(el => {
      let returnItem = {
        productmetaid: el._id,
        proucttitle: el.productid.producttitle,
        quantity: el.qty.value,
        singleprice: el.saleprice ? el.saleprice : el.regularprice,
        subtotal: 0,
        orderdate: Date(),
        country,
        isguest: true || false,
        userid: null
      };
      let subtotal =
        parseInt(returnItem.quantity || 1) *
        parseInt(returnItem.singleprice || 1);
      let attribute = {};
      if (el.size) {
        attribute = { ...attribute, size: el.size.value };
      }
      if (el.extract_flavor) {
        attribute = { ...attribute, extract_flavor: el.extract_flavor.label };
      }
      returnItem = { ...returnItem, subtotal, attribute };
      return { ...returnItem };
    });

    let shippingAddress = `${shipping_first_name} ${shipping_last_name}, ${shipping_address_name_01} ${shipping_address_name_02} ${shipping_address_town} `;
    let billingAddress = `${billing_first_name} ${billing_last_name}, ${billing_address_name_01} ${billing_address_name_02} ${billing_address_town} `;

    order.grandtotal =
      parseFloat(shippingCharge || 0) + parseFloat(subTotal || 0);
    order.coupondisc = "454";
    order.couponid = "123";
    order.country = country;
    order.offerprice = 100;
    order.shippingmethod = "Express shipping" || "Normal shipping";
    order.wholesubtotal = subTotal + shippingCharge;
    order.shippingcharge = shippingCharge || 0;
    order.paymentmethod = "Paypal";
    order.ordernote = "Make it quick";
    order.userid = "8486565658926546345415" || null;
    order.status = "in process";
    order.paymentstatus = "Processing";
    order.transactionid = "848484845454765";
    order.country_tax = "18";
    order.taxamount = "7412";
    order.userdetails = {
      country: country,
      firstname: billing_first_name,
      lastname: billing_last_name,
      shippingaddress: sameShipping ? billingAddress : shippingAddress,
      billingaddress: billingAddress,
      extraaddress: "jdjdjd",
      city: shipping_address_town
        ? shipping_address_town
        : billing_address_town,
      state: state,
      zipcode: zipcode,
      phonenumber: billing_phone_name
    };
    order.orderstatus = "Not delivered";

    return order;
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  modalDismis() {
    this.setState(prevState => ({
      modal: false
    }));

    if (this.state.clearCart) {
      console.log(this.props);
      this.props.clearCart();
    }
  }
  placeOrder() {
    const order = this.generateOrder();
    if (!this.validateOnSubmit()) {
      // alert("hh")
      console.log(order);
      placeOrderApi(order)
        .then(res => res.json())
        .then(resJson => {
          console.log({ resJson });
          if (resJson.success) {
            this.setState({
              modalData: "Order placed Successfully",
              modal: true,
              clearCart: true
            });
          }
        })
        .catch(err => {
          console.log({ err });
          this.setState({
            modalData: "something wrong",
            modal: true
          });
        });
    }
  }
  regionSelectOptions() {
    const Region = Object.keys(countries).map(el => {
      return {
        label: el,
        value: el
      };
    });
    return Region;
  }
  regionChange(selectedRegion) {
    this.setState({
      selectedRegion
    });

    localStorage.setItem("selectedRegionReset", JSON.stringify(selectedRegion));
  }
  countrySelectOptions(RegionName) {
    const coutnryList = countries[RegionName]
      ? countries[RegionName].split("|").map(el => {
          return {
            label: el,
            value: el
          };
        })
      : [
          {
            label: RegionName,
            value: RegionName
          }
        ];
    return coutnryList;
  }
  citySelectOptions(countryName) {
    const coutnryList = city_states[countryName]
      ? city_states[countryName].split("|").map(el => {
          // if(el){
          return {
            label: el,
            value: el
          };
          // }
        })
      : [
          {
            label: countryName,
            value: countryName
          }
        ];
    // console.log({coutnryList})
    return coutnryList;
  }
  countryChange(selectedCountry) {
    this.setState({
      selectedCountry
    });
    localStorage.setItem(
      "selectedCountryReset",
      JSON.stringify(selectedCountry)
    );
  }
  countryShippingChange(selectedShippingCountry) {
    this.setState({
      selectedShippingCountry
    });
    localStorage.setItem(
      "selectedShippingCountryReset",
      JSON.stringify(selectedShippingCountry)
    );
  }
  cityChange(selectedCity) {
    this.setState({
      selectedCity
    });
    localStorage.setItem("selectedCityReset", JSON.stringify(selectedCity));
  }
  cityShippingChange(selectedShippingCity) {
    this.setState({
      selectedShippingCity
    });
    localStorage.setItem(
      "selectedShippingCityReset",
      JSON.stringify(selectedShippingCity)
    );
  }
  regionChange(selectedRegion) {
    this.setState({
      selectedRegion
    });
    localStorage.setItem("selectedRegionReset", JSON.stringify(selectedRegion));
  }
  regionShippingChange(selectedShippingRegion) {
    this.setState({
      selectedShippingRegion
    });
    localStorage.setItem(
      "selectedShippingRegionReset",
      JSON.stringify(selectedShippingRegion)
    );
  }
  handleSameShipping(e) {
    this.setState({
      sameShipping: e.target.checked
    });
  }
  handleTextChange(e) {
    const id = e.target.id;
    // console.log(e.target.attributes)
    let type = "";
    if (e.target.attributes["data-validate"]) {
      type = e.target.attributes["data-validate"].value;
    }
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        this.fieldVaidation(id, type);
      }
    );
    switch (id) {
      case "shipping_first_name": {
        this.state.formResetValue.shipping_first_name = e.target.value;
        break;
      }
      case "shipping_last_name": {
        this.state.formResetValue.shipping_last_name = e.target.value;
        break;
      }
      case "shipping_email_name": {
        this.state.formResetValue.shipping_email_name = e.target.value;
        break;
      }

      case "shipping_phone_name": {
        this.state.formResetValue.shipping_phone_name = e.target.value;
        break;
      }
      case "shipping_address_name_01": {
        this.state.formResetValue.shipping_address_name_01 = e.target.value;
        break;
      }
      case "shipping_address_name_02": {
        this.state.formResetValue.shipping_address_name_02 = e.target.value;
        break;
      }
      case "shipping_address_town": {
        this.state.formResetValue.shipping_address_town = e.target.value;
        break;
      }
      case "shipping_zip_code": {
        this.state.formResetValue.shipping_zip_code = e.target.value;
        break;
      }
      case "billing_first_name": {
        this.state.formResetValue.billing_first_name = e.target.value;
        break;
      }
      case "billing_last_name": {
        this.state.formResetValue.billing_last_name = e.target.value;
        break;
      }
      case "billing_email_name": {
        this.state.formResetValue.billing_email_name = e.target.value;
        break;
      }
      case "billing_phone_name": {
        this.state.formResetValue.billing_phone_name = e.target.value;
        break;
      }
      case "billing_address_name_01": {
        this.state.formResetValue.billing_address_name_01 = e.target.value;
        break;
      }
      case "billing_address_name_02": {
        this.state.formResetValue.billing_address_name_02 = e.target.value;
        break;
      }
      case "billing_address_town": {
        this.state.formResetValue.billing_address_town = e.target.value;
        break;
      }
      case "billing_zip_code": {
        this.state.formResetValue.billing_zip_code = e.target.value;
        break;
      }
    }

    // console.log('xxxxxxxxxxxxxxxxxx', JSON.stringify(this.state.formResetValue));
    localStorage.setItem(
      "checkoutFormResetData",
      JSON.stringify(this.state.formResetValue)
    );

    // localStorage.setItem( 'checkoutFormResetData',JSON.stringify(this.state.formResetValue));
  }
  shippingAddressForm() {
    const {
      selectedShippingRegion,
      selectedShippingCountry,
      selectedShippingCity,
      shipping_first_name,
      shipping_first_name_err,
      shipping_first_name_errMsg,
      shipping_last_name,
      shipping_last_name_err,
      shipping_last_name_errMsg,
      shipping_email_name,
      shipping_email_name_err,
      shipping_email_name_errMsg,
      shipping_phone_name,
      shipping_phone_name_err,
      shipping_phone_name_errMsg,
      shipping_address_name_01,
      shipping_address_name_01_err,
      shipping_address_name_01_errMsg,
      shipping_address_name_02,
      shipping_address_name_02_err,
      shipping_address_name_02_errMsg,
      shipping_address_town,
      shipping_address_town_err,
      shipping_address_town_errMsg,
      shipping_zip_code,
      shipping_zip_code_err,
      shipping_zip_code_errMsg
    } = this.state;
    return (
      <div>
        <div className="row frm-details">
          <div
            className={classNames("col-12 has-input", {
              "has-error": shipping_first_name_err
            })}
          >
            <label>First Name*</label>
            <input
              id="shipping_first_name"
              data-validate={["name", "required"]}
              onChange={this.handleTextChange}
              value={shipping_first_name}
              type="text"
              name=""
            />
            {shipping_first_name_err && (
              <p className="error">{shipping_first_name_errMsg}</p>
            )}
          </div>
          <div
            className={classNames("col-12 has-input", {
              "has-error": shipping_last_name_err
            })}
          >
            <label>Last Name*</label>
            <input
              id="shipping_last_name"
              data-validate={["name", "required"]}
              onChange={this.handleTextChange}
              value={shipping_last_name}
              type="text"
              name=""
            />
            {shipping_last_name_err && (
              <p className="error">{shipping_last_name_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames("col-12 has-input", {
              "has-error": shipping_email_name_err
            })}
          >
            <label>Email Address*</label>
            <input
              id="shipping_email_name"
              data-validate={["email", "required"]}
              onChange={this.handleTextChange}
              value={shipping_email_name}
              type="text"
              name=""
            />
            {shipping_email_name_err && (
              <p className="error">{shipping_email_name_errMsg}</p>
            )}
          </div>

          <div
            className={classNames("col-12 has-input", {
              "has-error": shipping_email_name_err
            })}
          >
            <label>Phone Number*</label>
            <input
              id="shipping_phone_name"
              data-validate={["phone", "required"]}
              onChange={this.handleTextChange}
              value={shipping_phone_name}
              type="text"
              name=""
            />
            {shipping_phone_name_err && (
              <p className="error">{shipping_phone_name_err}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": shipping_address_name_01_err
              }
            )}
          >
            <label>Address*</label>
            <input
              id="shipping_address_name_01"
              data-validate={["required"]}
              onChange={this.handleTextChange}
              value={shipping_address_name_01}
              type="text"
              name=""
            />
            {shipping_address_name_01_err && (
              <p className="error">{shipping_address_name_01_errMsg}</p>
            )}
            <input
              id="shipping_address_name_02"
              onChange={this.handleTextChange}
              value={shipping_address_name_02}
              type="text"
              name=""
            />
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": shipping_address_town_err
              }
            )}
          >
            <label>City*</label>
            <input
              id="shipping_address_town"
              data-validate={["required"]}
              onChange={this.handleTextChange}
              value={shipping_address_town}
              type="text"
              name=""
            />
            {shipping_address_town_err && (
              <p className="error">{shipping_address_town_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": shipping_zip_code_err
              }
            )}
          >
            <label>Zip Code*</label>
            <input
              id="shipping_zip_code"
              data-validate={["required", "zipcode"]}
              onChange={this.handleTextChange}
              value={shipping_zip_code}
              type="text"
              name=""
            />
            {shipping_zip_code_err && (
              <p className="error">{shipping_zip_code_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div className="col-12">
            <label>Select Region*</label>
            <SelectMulti
              id="checkout-shipping-region"
              styles={selectStyle}
              value={selectedShippingRegion}
              isMulti={false}
              placeholder={"Select Country"}
              onChange={this.regionShippingChange}
              // options={this.state[`${names}_options`]}
              options={this.regionSelectOptions()}
            />
          </div>
        </div>
        {selectedShippingRegion && (
          <div className="row frm-details">
            <br />
            <div className="col-12">
              <label>Select Country*</label>
              <SelectMulti
                id="checkout-shipping-country"
                styles={selectStyle}
                value={selectedShippingCountry}
                isMulti={false}
                placeholder={"Select Country"}
                onChange={this.countryShippingChange}
                // options={this.state[`${names}_options`]}
                options={this.countrySelectOptions(
                  selectedShippingRegion ? selectedShippingRegion.value : ""
                )}
              />
            </div>
          </div>
        )}
        {selectedShippingCountry && (
          <div className="row frm-details">
            <div className="col-12">
              <br />
              <label>Select State/City*</label>
              <SelectMulti
                id="checkout-shipping-city"
                styles={selectStyle}
                value={selectedShippingCity}
                isMulti={false}
                placeholder={"Select Country"}
                onChange={this.cityShippingChange}
                // options={this.state[`${names}_options`]}
                options={this.citySelectOptions(
                  selectedShippingCountry ? selectedShippingCountry.value : ""
                )}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  billingAddressForm() {
    const {
      selectedRegion,
      selectedCountry,
      selectedCity,
      sameShipping,
      billing_first_name,
      billing_first_name_err,
      billing_first_name_errMsg,
      billing_last_name,
      billing_last_name_err,
      billing_last_name_errMsg,
      billing_email_name,
      billing_email_name_err,
      billing_email_name_errMsg,
      billing_phone_name,
      billing_phone_name_err,
      billing_phone_name_errMsg,
      billing_address_name_01,
      billing_address_name_01_err,
      billing_address_name_01_errMsg,
      billing_address_name_02,
      billing_address_name_02_err,
      billing_address_name_02_errMsg,
      billing_address_town,
      billing_address_town_err,
      billing_address_town_errMsg,
      billing_zip_code,
      billing_zip_code_err,
      billing_zip_code_errMsg
    } = this.state;

    return (
      <div className="billing-address-text">
        <h2>
          <span>1.</span>Billing Address
        </h2>
        <div className="row frm-details">
          <div
            className={classNames("col-12 has-input", {
              "has-error": billing_first_name_err
            })}
          >
            <label>First Name*</label>
            <input
              id="billing_first_name"
              value={billing_first_name}
              data-validate={["name", "required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_first_name_err && (
              <p className="error">{billing_first_name_errMsg}</p>
            )}
          </div>
          <div
            className={classNames("col-12 has-input", {
              "has-error": billing_last_name_err
            })}
          >
            <label>Last Name*</label>
            <input
              id="billing_last_name"
              value={billing_last_name}
              data-validate={["name", "required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_last_name_err && (
              <p className="error">{billing_last_name_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames("col-12 has-input", {
              "has-error": billing_email_name_err
            })}
          >
            <label>Email Address*</label>
            <input
              id="billing_email_name"
              value={billing_email_name}
              data-validate={["email", "required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_email_name_err && (
              <p className="error">{billing_email_name_errMsg}</p>
            )}
          </div>
          <div
            className={classNames("col-12 has-input", {
              "has-error": billing_phone_name_err
            })}
          >
            <label>Phone Number*</label>
            <input
              id="billing_phone_name"
              value={billing_phone_name}
              data-validate={["phone", "required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_phone_name_err && (
              <p className="error">{billing_phone_name_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": billing_address_name_01_err
              }
            )}
          >
            <label>Address*</label>
            <input
              id="billing_address_name_01"
              value={billing_address_name_01}
              data-validate={["required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_address_name_01_err && (
              <p className="error">{billing_address_name_01_errMsg}</p>
            )}
            <input
              id="billing_address_name_02"
              value={billing_address_name_02}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": billing_address_town_err
              }
            )}
          >
            <label>City*</label>
            <input
              id="billing_address_town"
              value={billing_address_town}
              data-validate={["required"]}
              onChange={this.handleTextChange}
              type="text"
              name=""
            />
            {billing_address_town_err && (
              <p className="error">{billing_address_town_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div
            className={classNames(
              "col-12 has-input custom-additions-checkout",
              {
                "has-error": billing_zip_code_err
              }
            )}
          >
            <label>Zip Code*</label>
            <input
              id="billing_zip_code"
              data-validate={["required", "zipcode"]}
              onChange={this.handleTextChange}
              value={billing_zip_code}
              type="text"
              name=""
            />
            {billing_zip_code_err && (
              <p className="error">{billing_zip_code_errMsg}</p>
            )}
          </div>
        </div>
        <div className="row frm-details">
          <div className="col-12">
            <label>Select Region*</label>
            <SelectMulti
              id="checkout-region"
              styles={selectStyle}
              value={selectedRegion}
              isMulti={false}
              placeholder={"Select Country"}
              onChange={this.regionChange}
              // options={this.state[`${names}_options`]}
              options={this.regionSelectOptions()}
            />
          </div>
        </div>
        {selectedRegion && (
          <div className="row frm-details">
            <br />
            <div className="col-12">
              <label>Select Country*</label>
              <SelectMulti
                id="checkout-country"
                styles={selectStyle}
                value={selectedCountry}
                isMulti={false}
                placeholder={"Select Country"}
                onChange={this.countryChange}
                // options={this.state[`${names}_options`]}
                options={this.countrySelectOptions(
                  selectedRegion ? selectedRegion.value : ""
                )}
              />
            </div>
          </div>
        )}
        {selectedCountry && (
          <div className="row frm-details">
            <div className="col-12">
              <br />
              <label>Select State/City*</label>
              <SelectMulti
                id="checkout-city"
                styles={selectStyle}
                value={selectedCity}
                isMulti={false}
                placeholder={"Select Country"}
                onChange={this.cityChange}
                // options={this.state[`${names}_options`]}
                options={this.citySelectOptions(
                  selectedCountry ? selectedCountry.value : ""
                )}
              />
            </div>
          </div>
        )}

        <div className="has-inputs has-checkbox-input">
          <br />
          <input
            type="checkbox"
            checked={sameShipping}
            id="subscribeCheckBox"
            onChange={this.handleSameShipping}
          />
          <label htmlFor="subscribeCheckBox">
            <span
              className={classNames("CheckIcon", {
                checked: sameShipping
              })}
            />
            Same Shipping Address
          </label>
        </div>
      </div>
    );
  }
  render() {
    const { sameShipping, modal, modalData } = this.state;
    return (
      <div className="">
        <div className="container">
          <div className="checkout-conatiner">
            <div className="row">
              <div className="col-md-12">
                <div className="express-checkout">
                  <h1 className="product-title">Checkout</h1>
                  <p>
                    Please Enter Your Details Below to Complete Your Purchase..
                  </p>
                </div>
              </div>
            </div>
            <div className="row purchase-details">
              <div className="col-md-4 billing">
                <div className="billing-address-text">
                  {this.billingAddressForm()}
                </div>
              </div>
              <div className="col-md-4 sipping">
                <div className="shipping-address-text">
                  <h2>
                    <span>2.</span>Shipping Address
                  </h2>
                  {!sameShipping && this.shippingAddressForm()}
                </div>
              </div>
              <div className="col-md-4 review">
                <div className="review-address-text">
                  <h2>
                    <span>3.</span>Review Your Order
                  </h2>
                  <CartItemsSmall />
                  <div>
                    <button
                      onClick={e => {
                        e.preventDefault();
                        this.placeOrder();
                        // console.log(this.generateOrder())
                      }}
                      className="btn-main p-3 w-100"
                      type="submit"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={modal} toggle={this.modalDismis} className={"center"}>
          <ModalBody>{modalData}</ModalBody>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
            <Button color="secondary" onClick={this.modalDismis}>
              Ok
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state, "from che")
  return state;
};
export default connect(
  mapStateToProps,
  { clearCart }
)(CheckOutForm);
