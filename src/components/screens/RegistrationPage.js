import React, { Component } from "react";
import {
  isAlpha,
  isEmail,
  isEmpty,
  isMobilePhone,
  isPostalCode,
  isNumeric
} from "validator";
import { registerUserApi } from "../../services/api";
export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.handelTextChange = this.handelTextChange.bind(this);
    this.submitRegistration = this.submitRegistration.bind(this);
    this.state = {
      registration_firstName: "",
      registration_firstName_err: null,
      registration_firstName_errMsg: "",
      registration_lastName: "",
      registration_lastName_err: null,
      registration_lastName_errMsg: "",
      registration_email: "",
      registration_email_err: null,
      registration_email_errMsg: "",
      registration_phone: "",
      registration_phone_err: null,
      registration_phone_errMsg: "",
      registration_password: "",
      registration_password_err: null,
      registration_password_errMsg: "",
      registration_confirmPassword: "",
      registration_confirmPassword_err: null,
      registration_confirmPassword_errMsg: ""
    };
  }
  handelTextChange(e) {
    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        // this.validator.fieldValid('registration_userName')
      }
    );
  }
  submitRegistration(e) {
    e.preventDefault();
    console.log(this.state);
    const {
      registration_firstName,
      registration_lastName,
      registration_email,
      registration_phone,
      registration_password,
      registration_confirmPassword
    } = this.state;
    // this.validator.fieldValid('registration_userName')
    registerUserApi({
      email: registration_email,
      role: "customer",
      firstname: registration_firstName,
      lastname: registration_lastName,
      phonenumber: registration_phone,
      password: registration_password,
      password2: registration_confirmPassword
    })
      .then(res => res.json())
      .then(resJson => {
        console.log({ userRegistration: resJson });
      });
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
  render() {
    const {
      registration_firstName,
      registration_lastName,
      registration_email,
      registration_phone,
      registration_password,
      registration_confirmPassword
    } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center Regular">
            <div className="col-lg-5 p-5 col-md-6 shadow register">
              <h1 className="text-center text-uppercase">Registration</h1>

              <div className="inside-form Larger ">
                <form onSubmit={this.submitRegistration}>
                  <div className="has-input">
                    <label>First Name:</label>
                    <input
                      id="registration_firstName"
                      name="registration_firstName"
                      value={registration_firstName}
                      onChange={this.handelTextChange}
                      type="text"
                      name=""
                    />
                  </div>
                  <div className="has-input">
                    <label>Last Name:</label>
                    <input
                      id="registration_lastName"
                      name="registration_lastName"
                      value={registration_lastName}
                      onChange={this.handelTextChange}
                      type="text"
                      name=""
                    />
                  </div>
                  <div className="has-input">
                    <label>Email:</label>
                    <input
                      id="registration_email"
                      name="registration_email"
                      value={registration_email}
                      onChange={this.handelTextChange}
                      type="text"
                      name=""
                    />
                  </div>
                  <div className="has-input">
                    <label>Phone Number:</label>
                    <input
                      id="registration_phone"
                      name="registration_phone"
                      value={registration_phone}
                      onChange={this.handelTextChange}
                      type="text"
                      name=""
                    />
                  </div>
                  <div className="has-input">
                    <label>Password:</label>
                    <input
                      id="registration_password"
                      name="registration_password"
                      value={registration_password}
                      onChange={this.handelTextChange}
                      type="password"
                      name=""
                    />
                  </div>
                  <div className="has-input">
                    <label>Confirm Password:</label>
                    <input
                      id="registration_confirmPassword"
                      name="registration_confirmPassword"
                      value={registration_confirmPassword}
                      onChange={this.handelTextChange}
                      type="password"
                      name=""
                    />
                  </div>
                  <div>
                    <button type="submit" className="btn btn-main">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
