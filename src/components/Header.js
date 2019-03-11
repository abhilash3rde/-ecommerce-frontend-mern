import React, { Component } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import axios from "axios";
import $ from "jquery";
import { Link } from "react-router-dom";
// import icon from "../assets/images/icon.png";
// import searchIcon from "../assets/images/search.png";
import { Icon } from "react-icons-kit";
import { ic_close } from "react-icons-kit/md/ic_close";
import { baseUrl } from "./Constants";
import maxfireImg from "../assets/images/maxfire3.png";
import productImage from "../assets/images/Aesop-Skin-Blue-Chamomile-Facial-Hydrating-Masque-60mL-large.png";
import { getAllCategory } from "../services/api/";

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.fetchSetting = this.fetchSetting.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.state = {
      scrollPos: 0,
      scrolledUp: false,
      category: [
        {
          key: "tinctures",
          val: "Tinctures"
        },
        {
          key: "capsules",
          val: "Capsules"
        },
        {
          key: "sprays",
          val: "Sprays"
        },
        {
          key: "pain_relief",
          val: "Pain Relief"
        },
        {
          key: "skin_care",
          val: "Skin Care"
        },
        {
          key: "pets",
          val: "Pets"
        },
        {
          key: "vapes",
          val: "Vapes"
        },
        {
          key: "workout",
          val: "Workout"
        },
        {
          key: "edibles",
          val: "Edibles"
        }
      ],
      productsByCat: {
        tinctures: [
          {
            name: "CBD Drops -Full Spectrum"
          },
          {
            name: "CBD Drops -Isolate"
          }
        ],
        capsules: [
          {
            name: "CBD Capsules - Full Spectrum"
          },
          {
            name: "CBD Capsules -Isolates -25mg"
          }
        ],
        sprays: [
          {
            name: "CBD Pain Support Spray"
          },
          {
            name: "CBD Better Sleep Spray"
          }
        ],
        pain_relief: [
          {
            name: "CBD Pain Relief Roll-On"
          },
          {
            name: "CBD Instant Freeze Rub"
          },
          {
            name: "CBD Healing Pain Rub"
          }
        ],
        skin_care: [
          {
            name: "CBD Dead Sea Mud Mask"
          },
          {
            name: "CBD Massage Oil"
          },
          {
            name: "CBD Body Butter"
          },
          {
            name: "CBD Salve"
          }
        ],
        pets: [
          {
            name: "CBD Drops for Pets"
          },
          {
            name: "CBD Chewable Pet Treats"
          },
          {
            name: "CBD Stress Relief Pets Spray"
          },
          {
            name: "CBD Pain Relief for Pets Spray"
          }
        ],
        vapes: [
          {
            name: "CBD Vape Oil"
          }
        ],
        workout: [
          {
            name: "Pre Workout Capsules"
          },
          {
            name: "Total Body Capsules"
          }
        ],
        edibles: [
          {
            name: "Coffee Natural- 500mg"
          },
          {
            name: "Chocolate Bars"
          },
          {
            name: "CBD Gummies"
          },
          {
            name: "CBD Chewing Gum"
          }
        ]
      },
      openedMenu: null,
      isSubMenuOpen: false,
      selectedMainMenu: "",
      isSmall: window.innerWidth >= 640 ? false : true,
      logoUrl: null,
      options: []
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
    console.log({ headerprops: this.props });
    this.fetchSetting();
    this.getCategories();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }
  fetchSetting() {
    // console.log(baseUrl)
    axios
      .get(`${baseUrl}/options/getsitesettings`)
      .then(response => {
        console.log(response);
        if (response.data) {
          if (response.data.success);
          this.setState({ options: response.data.options }, () => {
            this.state.options.map(option => {
              if (option.optionname === "logo")
                this.setState({ logoUrl: option.optionvalue });
            });
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  filterCategory(arr, country = "") {
    let newArr = arr.filter(item => {
      if (item.blockedcountries) {
        return item.blockedcountries.includes(country);
      }
      return true;
    });

    return newArr;
  }
  generateCategorySlug(title) {
    const slug = title.replace(/\//g, "!");
    return `/${this.props.countryCode}/category/${slug}`;
  }
  getCategories() {
    getAllCategory()
      .then(res => res.json())
      .then(resJson => {
        if (resJson.success) {
          const category = resJson.categories.map(el => ({
            key: el.categoryslug,
            val: el.categorytitle,
            slug: this.generateCategorySlug(el.categorytitle)
          }));
          console.log({ category });
          const filteredCategory = this.filterCategory(
            category,
            this.props.countryCode
          );
          this.setState({
            category: filteredCategory
          });
        }
      });
  }
  handleScroll(e) {
    const { scrollPos } = this.state;
    let currentScrollPos = $(window).scrollTop();
    if (scrollPos < currentScrollPos) this.setState({ scrolledUp: true });
    else {
      this.setState({ scrolledUp: false });
    }
    this.setState({ scrollPos: currentScrollPos });

    // $(window).scroll(function() {
    //   if ($(this).scrollTop() > 0) {
    //     $(".logo").fadeOut();
    //   } else {
    //     $(".logo").fadeIn();
    //   }
    // });
  }
  handleHover(e) {}
  handleResize() {
    this.setState({ isSmall: window.innerWidth >= 640 ? false : true });
  }
  showSubMenu(menuName) {
    console.log(menuName);
    const { openedMenu, isSubMenuOpen } = this.state;
    if (openedMenu === menuName && isSubMenuOpen) {
      this.hideSubMenu();
      return;
    }
    // $(this.refs.submenus).slideDown();
    this.setState({ openedMenu: menuName, isSubMenuOpen: true });
  }
  hideSubMenu() {
    $(this.refs.submenus).slideUp();
    this.setState({ openedMenu: "", isSubMenuOpen: false });
  }
  submenu(menuName) {
    const { category, productsByCat } = this.state;
    if (menuName === "Shop") {
      return (
        <ul className="sub-menu-item-ul">
          {category.map((el, index) => {
            console.log(el.key);
            return (
              <li key={index}>
                <span>{el.val}</span>
                <ul className="sub-menu-item-data">
                  {productsByCat[el.key].map((item, index) => (
                    <li key={index}>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      );
    }
  }
  renderHoverMenu() {
    return (
      <div className="hover-menu">
        <div>
          <h3>title</h3>
          <ul>
            <li>
              <Link to="/">data</Link>
            </li>
            <li>
              <Link to="/">data</Link>
            </li>
            <li>
              <Link to="/">data</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  render() {
    const { scrollPos, scrolledUp, isSmall, logoUrl } = this.state;
    const { cart } = this.props;
    // console.log(this.props, "props from header")
    const LearnPage = `/${this.props.headerPath}/learn`;
    return (
      <div
        className={classNames("whole-header", {
          // top: scrollPos === 0,
          // "hide-up": scrolledUp,
          // "show-up": !scrolledUp
        })}
      >
        <div className="upper-header">
          <div className="upper-header-inner text-right text-white">
            <p>Hong Kong</p>
          </div>
        </div>
        <div className="inner-header">
          {/* <div className="logo">
            <img src={maxfireImg} />
          </div> */}
          <div className="header_1">
            <div className="">
              <nav className="Nav">
                <div
                  className={classNames("Nav-header", {
                    "Nav-large": !isSmall,
                    "Nav-small": isSmall,
                    "is-fixed-hidden": scrollPos > 80 && scrolledUp,
                    "is-fixed-visible": scrollPos > 0 && !scrolledUp
                  })}
                >
                  {/* <div className="NavBarAlertBanner is-closed" role="alert">
                    <div className="NavBarAlertBanner-wrapper">
                      <p className="NavBarAlertBanner-description">
                        Parsley Seed Anti-Oxidant Facial Treatment added to the
                        cart
                      </p>
                    </div>
                  </div> */}
                  {isSmall && (
                    <ul className="Nav-list Nav-list--small">
                      <li className="Nav-listItem">
                        <Link
                          className="NavLogo"
                          to={`/${this.props.headerPath}`}
                        >
                          <img
                            src={logoUrl ? logoUrl : maxfireImg}
                            alt="logo"
                          />
                        </Link>
                      </li>
                    </ul>
                  )}
                  {!isSmall && (
                    <ul
                      className={classNames("Nav-list", {
                        "Nav-list--small": isSmall,
                        "Nav-list--inline Nav-list--mainNav": !isSmall
                      })}
                      role="menu"
                      ref="menuList"
                    >
                      <li className="Nav-listItem">
                        <Link
                          className="NavLogo"
                          to={`/${this.props.headerPath}`}
                        >
                          <img
                            src={logoUrl ? logoUrl : maxfireImg}
                            alt="logo"
                          />
                        </Link>
                      </li>
                      <li className="Nav-listItem">
                        <Link
                          className="Link Nav-listLink"
                          to={`/${this.props.headerPath}/shop`}
                        >
                          <span className="Link-content">Shop</span>
                        </Link>
                        <ul className="inner_submenu">
                          {this.state.category.map((el, index) => (
                            <li key={index}>
                              {/* <Link className="Link Nav-listLink" to={el.slug ? el.slug : "#"}> */}
                              <a
                                className="Link Nav-listLink"
                                href={el.slug ? el.slug : "#"}
                              >
                                <span className="Link-content">{el.val}</span>
                              </a>
                              {/* </Link> */}
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="Nav-listItem">
                        <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                          onClick={() => {
                            this.showSubMenu("Faq");
                          }}
                        >
                          <span className="Link-content">Faq</span>
                        </a>
                      </li>
                      <li className="Nav-listItem">
                        {/* <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                        > */}
                        <Link className="Link Nav-listLink" to={LearnPage}>
                          <span className="Link-content">Learn</span>
                        </Link>
                        {/* </a> */}
                      </li>
                      <li className="Nav-listItem">
                        <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                          onClick={() => {
                            this.showSubMenu("Contact");
                          }}
                        >
                          <span className="Link-content">Contact</span>
                        </a>
                      </li>
                      <li className="Nav-listSpacer" />
                    </ul>
                  )}
                  {!isSmall && (
                    <ul className="Nav-list Nav-list-loginAndCart Nav-list--inline">
                      <li className="Nav-listSpacer" />
                      <li className="Nav-listItem Nav-listItem--noMargin">
                        <a className="Link Nav-listLink" href="#">
                          <span className="Link-content">Login</span>
                        </a>
                      </li>
                      <li className="Nav-listItem Nav-listItem--cart Nav-listItem--noBorder">
                        <Link to={`/${this.props.headerPath}/cart`}>
                          <button
                            className="Nav-cart"
                            data-count={cart ? cart.items.length : 0}
                            onClick={() => {
                              // this.props.history.push("/cart")
                            }}
                            type="button"
                          />
                        </Link>
                      </li>
                    </ul>
                  )}
                  {isSmall && (
                    <ul className="Nav-list Nav-list-loginAndCart Nav-list--small">
                      <li className="Nav-listItem ">
                        <Link to={`/${this.props.headerPath}/cart`}>
                          <button
                            className="Nav-cart"
                            data-count={cart ? cart.items.length : 0}
                            type="button"
                          />
                        </Link>
                      </li>
                      <li className="Nav-listItem">
                        <button className="Nav-panelToggle" type="button" />
                      </li>
                    </ul>
                  )}
                  {false && (
                    <ul
                      className={classNames("Nav-list", {
                        "Nav-list--small": isSmall,
                        "Nav-list--inline Nav-list--mainNav": !isSmall
                      })}
                      role="menu"
                      ref="menuList"
                    >
                      <li className="Nav-listItem">
                        <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                          onClick={() => {
                            this.showSubMenu("Shop");
                          }}
                        >
                          <span className="Link-content">Shop</span>
                        </a>
                        <ul className="inner_submenu">
                          <li>
                            <a className="Link Nav-listLink" href="#">
                              <span className="Link-content">dummy</span>
                            </a>
                          </li>
                          <li>
                            <a className="Link Nav-listLink" href="#">
                              <span className="Link-content">dummy</span>
                            </a>
                          </li>
                          <li>
                            <a className="Link Nav-listLink" href="#">
                              <span className="Link-content">dummy</span>
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="Nav-listItem">
                        <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                          onClick={() => {
                            this.showSubMenu("Faq");
                          }}
                        >
                          <span className="Link-content">Faq</span>
                        </a>
                      </li>
                      <li className="Nav-listItem">
                        {/* <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                        > */}
                        <Link className="Link Nav-listLink" to={LearnPage}>
                          <span className="Link-content">Learn</span>
                        </Link>
                        {/* </a> */}
                      </li>
                      <li className="Nav-listItem">
                        <a
                          className="Link Nav-listLink"
                          href="#"
                          role="menuitem"
                          onClick={() => {
                            this.showSubMenu("Contact");
                          }}
                        >
                          <span className="Link-content">Contact</span>
                        </a>
                      </li>
                      <li className="Nav-listSpacer" />
                    </ul>
                  )}
                </div>
                {/*!isSmall && (
                  <Link className="NavLogo" to="/">
                    <img src={logoUrl ? logoUrl : maxfireImg} alt="logo" />
                  </Link>
                )*/}
              </nav>
            </div>
          </div>
        </div>
        <div ref="submenus" className={classNames("submenus")}>
          <div
            className="submenu-close"
            onClick={() => {
              this.hideSubMenu();
            }}
          >
            <span
              style={{
                fontSize: 20
              }}
            >
              <Icon icon={ic_close} />
            </span>
          </div>
          {this.submenu(this.state.openedMenu)}
          <div className="menu-cart">
            <div className="menu-cart-image">
              <div className="menu-cart-image-inner">
                <img src={productImage} alt="image" />
              </div>
            </div>
            <div className="cart-btn-right">
              <button>Add To Cart - $2,000</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, "header");
  return state.cart;
};
export default connect(mapStateToProps)(Header);
