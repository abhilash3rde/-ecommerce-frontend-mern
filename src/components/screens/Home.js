import React, { Component } from "react";
import axios from "axios";
import { baseUrl } from "../Constants";
import { Banner, HomeSliderSection, HomeContentSec, Quate } from "../";
import { mainProducts, countryList } from "../Constants";
import { getCountryName } from "../../services/extra";
import { getAllProductApi } from "../../services/api";
class Home extends Component {
  constructor(props) {
    super(props);
    this.fetchHomeContent = this.fetchHomeContent.bind(this);
    this.state = {
      pageContent: {},
      featureProducts: [],
      loaded: false
    };
  }
  componentDidMount() {
    this.fetchHomeContent();
    this.getFeatureProduct();
    // window.addEventListener('load', this.fetchHomeContent)
  }
  componentWillUnmount() {
    // window.removeEventListener('load', this.fetchHomeContent)
  }
  fetchHomeContent() {
    const { countryCode } = this.props;
    // console.log({countryCode})
    let countryName = getCountryName(countryCode);
    console.log({ countryName });
    console.log("fetchstart", `${baseUrl}/pages/pagecontent/`);
    axios
      .get(`${baseUrl}/pages/pagecontent/`, {
        params: {
          layout: "home",
          country: countryName || "Hong Kong"
        }
      })
      .then(response => {
        console.log(response, "fetch success");
        if (response.data) {
          if (response.data.success);
          this.setState({
            pageContent: response.data.content.pagecontent,
            loaded: true
          });
        }
      })
      .catch(function(error) {
        console.log(error, "fetch error");
      });
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
      });
  }
  render() {
    const {
      featureProducts,
      pageContent: {
        firstsection,
        secondsection,
        thirdsection,
        fourthsection,
        fifthsection,
        sixthsection
      }
    } = this.state;
    return (
      <div>
        {/* <button
        onClick={()=>{
          console.log(this.state)
        }}
        >test</button> */}
        {firstsection && (
          <Banner
            title={firstsection.title}
            imagelink={firstsection.imagelink}
            btntext={firstsection.btntext}
            description={firstsection.description}
            {...this.props}
          />
        )}
        {secondsection && featureProducts.length > 0 && (
          <HomeSliderSection
            title={secondsection.title}
            // productArr={mainProducts}
            productArr={featureProducts}
            noTitle={false}
            description={secondsection.description}
            {...this.props}
          />
        )}
        {thirdsection && (
          <HomeContentSec
            title={thirdsection.title}
            imagelink={thirdsection.imagelink}
            btntext={thirdsection.btntext}
            description={thirdsection.description}
            {...this.props}
          />
        )}
        {fourthsection && (
          <HomeContentSec
            title={fourthsection.title}
            imagelink={fourthsection.imagelink}
            btntext={fourthsection.btntext}
            description={fourthsection.description}
            {...this.props}
          />
        )}
        {fifthsection && (
          <HomeContentSec
            title={fifthsection.title}
            imagelink={fifthsection.imagelink}
            btntext={fifthsection.btntext}
            description={fifthsection.description}
            {...this.props}
          />
        )}
        {sixthsection && (
          <Quate
            title={sixthsection.title}
            description={sixthsection.description}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

export default Home;
