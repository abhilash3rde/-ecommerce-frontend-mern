import React, { Component } from "react";
import { Collapse, CardBody, Card, Modal } from "reactstrap";
import { Icon } from "react-icons-kit";
import { ic_close } from "react-icons-kit/md";
import classNames from "classnames";
import { regionsList, countryList } from "../components/Constants";
import { getCountryName } from "../services/extra";
export class Footer extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.countryToggle = this.countryToggle.bind(this);
    this.countrySearchHandler = this.countrySearchHandler.bind(this);
    this.renderCountryFilterForm = this.renderCountryFilterForm.bind(this);
    this.filterCountryList = this.filterCountryList.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.state = {
      collapse: false,
      collapse1: false,
      collapse2: false,
      collapse3: false,
      countryModal: false,
      showFooterCollapse: window.innerWidth > 640 ? false : true,
      countrySearch: "",
      filteredCountrySearch: null,
      selectedRegion: null
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }
  componentWillMount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.setState({
      showFooterCollapse: window.innerWidth > 640 ? false : true
    });
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggle1() {
    this.setState({ collapse1: !this.state.collapse1 });
  }
  toggle2() {
    this.setState({ collapse2: !this.state.collapse2 });
  }
  toggle3() {
    this.setState({ collapse3: !this.state.collapse3 });
  }
  countryToggle() {
    this.setState(prevState => ({
      countryModal: !prevState.countryModal
    }));
  }
  countrySearchHandler(e) {
    this.setState(
      {
        countrySearch: e.target.value
      },
      () => {
        this.filterCountryList();
      }
    );
  }
  filterCountryList() {
    const { countrySearch: query } = this.state;
    if (query.length < 3) {
      this.setState({ filteredCountrySearch: null });
      return;
    }
    let users = [];
    users = countryList.filter(function(country) {
      return country.title.toLowerCase().indexOf(query) !== -1; // returns true or false
    });
    this.setState({ filteredCountrySearch: users });
  }
  isRegion(name, arr) {
    // console.log({name, arr})
    let flag = false;
    if (arr) {
      arr.map(el => {
        if (el.region === name) flag = true;
      });
    }

    return flag;
  }
  renderFooterToggles() {
    return (
      <div className="footer-inside-content footer-inside-two">
        <div>
          <div
            className="toggle-footer"
            onClick={this.toggle}
            style={{ marginBottom: "1rem" }}
          >
            Customer Services
          </div>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <ul>
                  <li>Contact Us</li>
                  <li>My Account</li>
                  <li>Track My Order</li>
                  <li>Shipping &amp; Returns</li>
                  <li>FAQs</li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
          <div
            className="toggle-footer"
            onClick={this.toggle1}
            style={{ marginBottom: "1rem" }}
          >
            Company
          </div>
          <Collapse isOpen={this.state.collapse1}>
            <Card>
              <CardBody>
                <ul>
                  <li>About</li>
                  <li>Quality Guarantee</li>
                  <li>Affiliate program</li>
                  <li>Press</li>
                  <li>Policies</li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
          <div
            className="toggle-footer"
            onClick={this.toggle2}
            style={{ marginBottom: "1rem" }}
          >
            Social
          </div>
          <Collapse isOpen={this.state.collapse2}>
            <Card>
              <CardBody>
                <ul>
                  <li>Facebook</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                  <li>Pinterest</li>
                  <li>Newsletter</li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
          <div
            className="toggle-footer"
            onClick={this.toggle3}
            style={{ marginBottom: "1rem" }}
          >
            Terms
          </div>
          <Collapse isOpen={this.state.collapse3}>
            <Card>
              <CardBody>
                <ul>
                  <li>Privacy</li>
                  <li>Cookies</li>
                  <li>Accessibility</li>
                  <li>FDA</li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }
  renderFooterLists() {
    return (
      <>
        <div className="footer-inside-content footer-inside-two">
          <ul>
            <li>Customer Service</li>
            <li>Contact Us</li>
            <li>My Account</li>
            <li>Track My Order</li>
            <li>Shipping &amp; Returns</li>
            <li>FAQs</li>
          </ul>
        </div>
        <div className="footer-inside-content footer-inside-two">
          <ul>
            <li>Company</li>
            <li>About</li>
            <li>Quality Guarantee</li>
            <li>Affiliate program</li>
            <li>Press</li>
            <li>Policies</li>
          </ul>
        </div>
        <div className="footer-inside-content footer-inside-two">
          <ul>
            <li>Social</li>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>YouTube</li>
            <li>Pinterest</li>
            <li>Newsletter</li>
          </ul>
        </div>
        <div className="footer-inside-content footer-inside-two">
          <ul>
            <li>Terms</li>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Accessibility</li>
            <li>FDA</li>
          </ul>
        </div>
      </>
    );
  }
  renderCountryFilterForm() {
    const { countrySearch } = this.state;
    return (
      <form action="." className="LanguageModal-searchForm" data-ref="form">
        <svg
          className="Icon LanguageModal-searchIcon"
          role="img"
          viewBox="0 0 21 20"
        >
          <g strokeWidth="1" fillRule="evenodd">
            <g transform="translate(-198.000000, -67.000000)">
              <g id="Group-4" transform="translate(198.000000, 67.000000)">
                <rect
                  id="Rectangle"
                  transform="translate(16.353553, 16.353553) rotate(-45.000000) translate(-16.353553, -16.353553) "
                  x="15.3535534"
                  y="12.6109127"
                  width="2"
                  height="7.48528137"
                />
                <path
                  d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z M8.5,15 C12.0898509,15 15,12.0898509 15,8.5 C15,4.91014913 12.0898509,2 8.5,2 C4.91014913,2 2,4.91014913 2,8.5 C2,12.0898509 4.91014913,15 8.5,15 Z"
                  id="Oval"
                  fillRule="nonzero"
                />
              </g>
            </g>
          </g>
        </svg>
        <div className="FormText LanguageModal-search">
          <label>
            <input
              type="search"
              value={countrySearch}
              onChange={this.countrySearchHandler}
              className="FormText-input"
              name="languageSearch"
              placeholder=""
            />
            <span className="FormText-label" />
          </label>
        </div>
      </form>
    );
  }

  selectRegion(region) {
    this.setState(
      {
        selectedRegion: region.data,
        countrySearch: ""
      },
      this.filterCountryList
    );
  }
  renderRegionList(arr) {
    const { filteredCountrySearch } = this.state;
    return arr.map((region, index) => {
      return (
        <a
          key={index}
          onClick={() => {
            this.selectRegion(region);
          }}
          className={classNames("LanguageModal-region", {
            "LanguageModal-selectedRegion":
              region.data === this.state.selectedRegion &&
              filteredCountrySearch === null,
            "LanguageModal-inactiveRegion":
              filteredCountrySearch !== null &&
              !this.isRegion(region.data, filteredCountrySearch)
          })}
          data-ref="region"
          data-region={region.data}
        >
          {region.name}
        </a>
      );
    });
  }
  redirectToCountry(countryCode) {
    let pathArr = window.location.pathname.split("/");
    let newPath = pathArr.map((el, index) => {
      if (el === "") return "/";

      if (index === 1) return countryCode;

      return "/" + el;
    });
    return newPath.join("");
  }
  renderCountryList(arr) {
    const { filteredCountrySearch } = this.state;
    return arr.map((country, index) => {
      const { region, code, title } = country;
      return (
        <a
          key={index}
          className={classNames("LanguageModal-country", {
            matches:
              filteredCountrySearch !== null ||
              country.region === this.state.selectedRegion
          })}
          data-ref="country"
          data-country={title}
          data-region={region}
          data-href={`/${code}`}
          onClick={() => {
            localStorage.setItem("country_code", code);
            localStorage.setItem("continent_name", region);
            // console.log(this.redirectToCountry(code))
            window.location.href = this.redirectToCountry(code);
          }}
        >
          <span className="LanguageModal-country-link">{country.title}</span>
        </a>
      );
    });
  }
  render() {
    const { showFooterCollapse, filteredCountrySearch } = this.state;
    return (
      <div>
        <footer className="footer-sec">
          <div className="footer-inside">
            {showFooterCollapse && this.renderFooterToggles()}
            {!showFooterCollapse && this.renderFooterLists()}
            <div className="footer-inside-content-last">
              <div className="inside-content-last">
                <h4>
                  I would like to receive communications about
                  <br /> maxxbio products and, services.
                </h4>
                <div className="inputwrapper">
                  <input type="search" name="" placeholder="Subscribe" />
                  {/* <span className="input-search-icon">
                    <Icon Icon={arrowRight2} />
                  </span>  */}
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="copy">
          <div className="copy-left">
            <p>© MaxxBio</p>
          </div>
          <div className="copy-right">
            <p onClick={this.countryToggle}>
              {getCountryName(this.props.countryCode)}
            </p>
          </div>
        </div>
        <Modal
          isOpen={this.state.countryModal}
          toggle={this.countryToggle}
          className={"country-popup LanguageModal cus-modal"}
        >
          <div className="country-popup-inner Modal-body">
            <div className="LanguageModal-titleRow">
              <h1 className="LanguageModal-title">
                Select your shipping destination
              </h1>
              <button
                className="LanguageModal-closeButton"
                onClick={this.countryToggle}
                type="button"
              >
                <Icon icon={ic_close} style={{ color: "#fff" }} size={25} />
                {/* <svg className="Icon LanguageModal-navIcon" role="img" viewBox="0 0 50 50">
                  <g>
                    <polygon points="50,5 45,0 25,20 5,0 0,5 20,25 0,45 5,50 25,30 45,50 50,45 30,25"></polygon></g></svg> */}
              </button>
            </div>
            <div className="LanguageModal-container">
              <div className="LanguageModal-regionsContainer">
                <div className="LanguageModal-overflowContainer">
                  <div className="LanguageModal-scrollable">
                    {this.renderCountryFilterForm()}
                    {this.renderRegionList(regionsList)}

                    {/* <a className="LanguageModal-region" data-ref="region" data-region="oceania">Oceania</a>
                    <a className="LanguageModal-region LanguageModal-selectedRegion" data-ref="region" data-region="americas">Americas</a>
                    <a className="LanguageModal-region" data-ref="region" data-region="europe">Europe</a>
                    <a className="LanguageModal-region" data-ref="region" data-region="asia">Asia</a> */}
                  </div>
                </div>
              </div>
              <div className="LanguageModal-countriesContainer">
                <div className="LanguageModal-overflowContainer">
                  <div className="LanguageModal-scrollable">
                    <div className="LanguageModal-countries">
                      {/* <a className="LanguageModal-country" data-ref="country" data-country="andorra" data-region="europe" href="https://www.aesop.com/fr/en">
                        <span className="LanguageModal-country-link">Andorra</span>
                      </a> */}
                      {this.renderCountryList(
                        filteredCountrySearch
                          ? filteredCountrySearch
                          : countryList
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
