import React, { Component } from "react";
import axios from "axios";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import { baseUrl } from "../Constants";
import { HomeSliderSection, ProductUse, Reviews, Faqs } from "../";
import ProductDetailSec from "../ProductDetailSec";
import classNames from "classnames";
import { mainProducts } from "../Constants";
import { getCountryName } from "../../services/extra";
import { getProductDetailApi, getAllProductApi } from "../../services/api";
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.fetchHomeContent = this.fetchHomeContent.bind(this);
    this.getProductDetail = this.getProductDetail.bind(this);
    this.state = {
      pageContent: {},
      productId: this.props.match.params.id,
      product: null,
      loaded: false,
      featureProducts: [],
      activeTab: "1"
    };
  }
  componentDidMount() {
    this.fetchHomeContent();
    this.getProductDetail();
    this.getFeatureProduct();
    // alert('hii')
    // console.log({ props: this.props }, this.props.location.state);
  }
  fetchHomeContent() {
    const { countryCode } = this.props;
    let countryName = getCountryName(countryCode);
    axios
      .get(`${baseUrl}/pages/pagecontent/`, {
        params: {
          layout: "home",
          country: countryName || "Hong Kong"
        }
      })
      .then(response => {
        console.log(response);
        if (response.data) {
          if (response.data.success);
          this.setState({
            pageContent: response.data.content.pagecontent,
            loaded: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getProductDetail() {
    // ;
    if (this.state.product) return;

    getProductDetailApi(this.props.match.params.id)
      .then(res => res.json())
      .then(resJson => {
        console.log({ ProductDetail: resJson });
        this.setState({ product: resJson.product_details });
      });
    // mainProducts.map(product => {
    //   // console.log(`hii ${product.pId} ${this.props.match.id} ${this.state.productId}`)
    //   if (product.pId === this.props.match.params.id) {
    //     this.setState({ product });
    //   }
    // });
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
      pageContent: { secondsection },
      product
    } = this.state;
    return (
      <div>
        {product && (
          <ProductDetailSec
            addToCart={this.props.addToCart}
            allCookies={this.props.allCookies}
            cookies={this.props.cookies}
            // checkItemIncart={this.props.checkItemIncart}
            product={product}
          />
        )}
        <ProductUse product={product} />
        {product && (
          <div className="container-padding top-gap">
            <Nav tabs className={"border-bottom2"}>
              <NavItem>
                <NavLink
                  className={classNames(
                    "MCItemCarouselIntro-title cus-nav-link",
                    { active: this.state.activeTab === "1" }
                  )}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  FAQ
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames(
                    "MCItemCarouselIntro-title cus-nav-link",
                    { active: this.state.activeTab === "2" }
                  )}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Reviews
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab || 2}>
              <TabPane tabId="1">
                <Faqs faqList={product.faqcontent} />
              </TabPane>
              <TabPane tabId="2">
                <Reviews />
              </TabPane>
            </TabContent>
            {/* <Reviews />
            <Faqs faqList={product.faqcontent} /> */}
          </div>
        )}
        {secondsection && (
          <HomeSliderSection
            title={secondsection.title}
            productArr={featureProducts}
            description={secondsection.description}
          />
        )}
      </div>
    );
  }
}
export default ProductDetail;
