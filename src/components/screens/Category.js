import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../";
import { getProductByCat, getAllCategory } from "../../services/api";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.getProducts = this.getProducts.bind(this);
    this.state = {
      productList: [],
      categoryTitle: this.props.match.params.categoryTitle
    };
  }
  componentDidMount() {
    this.getProducts();
    this.getCategories();
  }
  returnProductInCat(arr) {
    return arr.map((el, index) => (
      <ProductItem
        countryCode={this.props.countryCode}
        product={el}
        key={index}
      />
    ));
  }
  getIdFromSlug(slug) {
    // const id = slug.replace(/%11223344/g, "/")
    const id = slug.replace(/!/g, "/");
    let cateId = decodeURI(id);
    // console.log({id, slug, cateId})
    return cateId;
  }
  getProducts() {
    const { categoryTitle } = this.state;
    const categorySlug = this.getIdFromSlug(categoryTitle);
    // console.log({categorySlug})
    // console.log({categoryTitle : this.state.categoryTitle})
    getProductByCat(categorySlug)
      .then(res => res.json())
      .then(resJson => {
        console.log({ resJson });
        const { success, products } = resJson;
        if (success) {
          this.setState({ productList: products });
        }
      });
  }

  getCategories() {
    getAllCategory()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          const { categoryTitle } = this.state;
          const categorySlug = this.getIdFromSlug(categoryTitle);
          console.log({ cate: resJson.categories });
          let category = {};
          resJson.categories.map(el => {
            console.log();
            if (el.categorytitle === categorySlug) {
              category = el;
            }
          });
          // let category = resJson.categories.filter((el)=>{
          //   return el.categorytitle === categorySlug
          // })

          this.setState(
            {
              // categoryList: resJson.categories
              category
            },
            () => {
              console.log(this.state.category);
            }
          );
        }
      });
  }
  render() {
    const {
      state: { productList, introList, category }
    } = this;
    return (
      <div className="CPBody CPBody--activeSubcategory">
        <div>
          <div className="CPBodyRow CPBodyRow--light CPBodyRow--activeSubcat">
            <div className="CPSubcatIntro CPBodyRow-intro">
              <div className="CPSubcatIntroDescription">
                <h5 className="CPSubcatIntroDescription-name">
                  {category && category.categorytitle}
                </h5>
                {/* <h2 className="CPSubcatIntroDescription-headline">Begin at the beginning</h2> */}
                <p className="CPSubcatIntroDescription-info">
                  {category && category.catdescription}
                  {/* Cleansing is a vital starting point to better skin. An effective yet gentle cleanser purifies the skin and readies it for toning and hydration. */}
                </p>
              </div>
            </div>
            {productList && this.returnProductInCat(productList)}
          </div>
        </div>
      </div>
    );
  }
}
