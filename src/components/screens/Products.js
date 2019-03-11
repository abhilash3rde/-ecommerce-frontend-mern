import React, { Component } from "react";
import SelectMulti from "react-select";
import { Icon } from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md/ic_clear";
import { classNames } from "classnames";
import { selectStyle } from "../Constants";
import { CatProductSlider } from "../";
// import { categoryList } from "../Constants";
import { getProductByCat, getAllCategory } from "../../services/api";
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.getProductByCategory = this.getProductByCategory.bind(this);
    this.state = {
      productList: this.props.products || [
        {
          img: "http://via.placeholder.com/700x500",
          title: "demo product",
          link: "#",
          basePrice: "2000",
          sizes: ["200ml", "100ml"]
        },
        {
          img: "http://via.placeholder.com/700x500",
          title: "demo product",
          link: "#",
          basePrice: "2000",
          sizes: ["200ml", "100ml"]
        },
        {
          img: "http://via.placeholder.com/700x500",
          title: "demo product",
          link: "#",
          basePrice: "2000",
          sizes: ["200ml", "100ml"]
        },
        {
          img: "http://via.placeholder.com/700x500",
          title: "demo product",
          link: "#",
          basePrice: "2000",
          sizes: ["200ml", "100ml"]
        },
        {
          img: "http://via.placeholder.com/700x500",
          title: "demo product",
          link: "#",
          basePrice: "2000",
          sizes: ["200ml", "100ml"]
        }
      ],
      productByCategory: [],
      introList: [
        // {
        //   title: "Cleanse",
        //   desc:
        //     "Cleansing skin of daily grime, sweat and other impurities forms the foundation of an intelligent skin care regimen."
        // }
      ],
      categoryList: []
    };
  }
  componentDidMount() {
    this.getCategories();
  }
  getCategories() {
    getAllCategory()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          this.setState(
            {
              categoryList: resJson.categories
            },
            () => {
              console.log({ categoryList: this.state.categoryList });
              this.getProductByCategory();
            }
          );
        }
      });
  }
  getProductByCategory() {
    const { categoryList } = this.state;
    categoryList.map((el, index) => {
      getProductByCat(el.categorytitle)
        .then(res => res.json())
        .then(resJson => {
          console.log({ resCategory: resJson });
          if (resJson.success) {
            this.setState(
              prevState => ({
                productByCategory: [
                  ...prevState.productByCategory,
                  {
                    productArr: [...resJson.products],
                    categoryName: el.categorytitle
                  }
                ],
                introList: [
                  ...prevState.introList,
                  {
                    title: el.categorytitle,
                    desc:
                      el.catdescription ||
                      "Cleansing skin of daily grime, sweat and other impurities forms the foundation of an intelligent skin care regimen."
                  }
                ]
              }),
              () => {
                console.log(this.state.productByCategory);
              }
            );
          }
        });
    });
  }

  renderCateRow() {
    const { productByCategory, introList } = this.state;
    let categories = introList;
    return productByCategory.map((el, index) => {
      console.log(el);
      // categories[0].title = el.categoryName
      console.log({ legn: el.productArr.length });
      if (el.productArr.length <= 0) {
        return null;
      } else
        return (
          <CatProductSlider
            key={index}
            countryCode={this.props.countryCode}
            rowClassName={index % 2 ? "light" : "dark"}
            intro={introList[index]}
            productsArr={el.productArr}
          />
        );
    });
  }
  render() {
    const {
      state: { productList, introList }
    } = this;

    return (
      <div className="">
        <div className="CPBody CPBody--activeCategory">
          {this.renderCateRow()}
          {/* <CatProductSlider
            rowClassName="light"
            intro={introList[0]}
            productsArr={productList}
          />
          <CatProductSlider
            rowClassName="dark"
            intro={introList[0]}
            productsArr={productList}
          /> */}
        </div>
      </div>
    );
  }
}
