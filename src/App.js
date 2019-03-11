import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import { withCookies, Cookies } from "react-cookie";
import { Footer, baseUrl } from "./components";
import Header from "./components/Header";
import WithoutLang from "./components/screens/WithoutLang";
import Home from "./components/screens/Home";
import ProductDetail from "./components/screens/ProductDetail";
import Cart from "./components/screens/Cart";
import Category from "./components/screens/Category";
import Checkout from "./components/screens/Checkout";
import RegistrationPage from "./components/screens/RegistrationPage";
import TemplatePage from "./components/screens/TemplatePage";
import Products from "./components/screens/Products";
import { CountryCodes } from "./services/extra";
import { getClientInfo } from "./services/api";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      pathname: window.location.pathname,
      url: window.location.href,
      origin: window.location.origin,
      gotCountry: false
    };
  }
  componentDidMount() {
    this.setThemeVar();
    this.getUserInfo();
  }
  getUserInfo() {
    if (
      localStorage.getItem("country_code") &&
      localStorage.getItem("continent_name")
    ) {
      this.setState(
        {
          country_code: localStorage.getItem("country_code"),
          continent_name: localStorage.getItem("continent_name"),
          gotCountry: true
        },
        () => {
          this.returnToCountry();
        }
      );
      return;
    }
    getClientInfo()
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        const {
          info: { country_code, continent_name },
          success
        } = resJson;
        if (success) {
          localStorage.setItem("country_code", country_code);
          localStorage.setItem("continent_name", continent_name);
          // localStorage.setItem("country_name", continent_name);
          this.setState(
            {
              country_code,
              continent_name,
              gotCountry: true
            },
            () => {
              this.returnToCountry();
            }
          );
        } else {
          this.returnToCountry();
        }
      })
      .catch(err => {
        console.log({ err });
        this.returnToCountry();
      });
  }
  returnToCountry() {
    const { pathname, gotCountry, country_code } = this.state;
    let countryCode = pathname.split("/")[1];
    if (CountryCodes.includes(countryCode.toUpperCase())) {
      this.setState({ headerPath: countryCode });
    } else {
      if (gotCountry) {
        if (true) window.location.pathname = `/${country_code}${pathname}`;
      } else {
        window.location.pathname = `/IN${pathname}`;
      }
    }
  }
  setThemeVar() {
    fetch(`${baseUrl}/options/getsitesettings`)
      .then(rs => rs.json())
      .then(res => {
        console.log({ colors: res });
        res.options.map(el => {
          document.body.style.setProperty(`--${el.optionname}`, el.optionvalue);
        });
      });
  }
  render() {
    const {
      cookies: { cookies }
      // allCookies: { cart }
    } = this.props;
    const { headerPath, country_code } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Header headerPath={headerPath} countryCode={country_code} />
          <Switch>
            <Route
              path="/:lang"
              exact
              component={props => (
                <Home countryCode={country_code} cookies={cookies} {...props} />
              )}
            />
            <Route
              path="/"
              exact
              component={props => (
                <WithoutLang
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/shop/:id"
              exact
              component={props => (
                <ProductDetail
                  cookies={this.props.cookies}
                  countryCode={country_code}
                  allCookies={this.props.allCookies}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/shop"
              exact
              component={props => (
                <Products
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/cart"
              exact
              component={props => (
                <Cart
                  cookies={this.props.cookies}
                  countryCode={country_code}
                  allCookies={this.props.allCookies}
                  removeCartByIndex={this.removeCartByIndex}
                  {...props}
                />
              )}
              addToCart={this.addToCart}
            />
            <Route
              path="/:lang/category/:categoryTitle"
              exact
              component={props => (
                <Category
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/checkout"
              exact
              component={props => (
                <Checkout
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                  addToCart={this.addToCart}
                />
              )}
            />
            <Route
              path="/:lang/registration"
              exact
              component={props => (
                <RegistrationPage
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                />
              )}
            />
            <Route
              path="/:lang/learn"
              exact
              component={props => (
                <TemplatePage
                  templateId={"t01"}
                  cookies={cookies}
                  countryCode={country_code}
                  {...props}
                />
              )}
            />
          </Switch>
          <Footer countryCode={country_code} />
        </div>
      </BrowserRouter>
    );
  }
}

export default withCookies(App);
