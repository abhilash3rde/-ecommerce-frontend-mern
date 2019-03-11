import React, { Component } from "react";
import { Link } from "react-router-dom";
// import maxfireImg from "../assets/images/maxfire3.png";
import headerImg from "../assets/images/header_img.png";
// import headerImgSecA from "../assets/images/Aesop-Winter-Skin-Care-Mild-Landing-Page-Hero-50-50-TW-HK-Desktop-1440x1500px.jpg";
// import headerImgSecB from "../assets/images/Aesop-Winter-Skin-Care-Mild-Landing-Page-Hero-50-50-TW-HK-Mobile-640x640px.jpg";
// import headerImgSecC from "../assets/images/Aesop-Winter-Skin-Care-Mild-Landing-Page-Hero-50-50-TW-HK-Tablet-1536x950px.jpg";
export class Banner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      props: {
        title,
        description,
        btntext,
        imagelink,
        match: { params }
      }
    } = this;
    return (
      <div>
        <div className="img_header_sec">
          <div className="written_sec">
            <div className="written_sec_a">
              <div className="content_section">
                <h2>{title}</h2>
              </div>
              <div className="content_section_2">
                <p>{description}</p>
              </div>
              <div className="content_section_3">
                <Link
                  onClick={() => {
                    console.log(this.props);
                  }}
                  to={`product`}
                >
                  {btntext}
                  <svg
                    className="Icon Link-icon"
                    role="img"
                    viewBox="0 0 50 50"
                  >
                    <g>
                      <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                    </g>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          {/* <picture className="Picture MCHalfWidthFullBleedHero-img">
            <source srcSet={headerImgSecA} media="(min-width: 1025px)" />
            <source srcSet={headerImgSecB} media="(min-width: 640px)" />
            <source srcSet={headerImgSecC} media="(min-width: 0px)" />
            { <img alt="Winter skin mild illustration" />  }
          </picture> */}

          <div className="img_sec header-img-sec">
            <img src={imagelink ? imagelink : headerImg} alt="header-img" />
          </div>
        </div>
      </div>
    );
  }
}
