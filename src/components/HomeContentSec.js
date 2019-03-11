import React, { Component } from "react";

import bgImg from "../assets/images/content-img.png";

export class HomeContentSec extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      props: { stitle, title, description, imagelink, btntext }
    } = this;
    return (
      <div className="next-content-1">
        <div className="next-sec-1">
          <h5>{stitle}</h5>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="write-btn-1">
            <a href="#">
              {btntext}
              <svg className="Icon Link-icon" role="img" viewBox="0 0 50 50">
                <g>
                  <path d="M30.1,5.3L50,25.1L30.1,45h-6.6l18-17.6H0v-4.8h41.5l-18-17.6h6.6V5.3z" />
                </g>
              </svg>
            </a>
          </div>
        </div>
        <div
          className="next-sec-2"
          style={{
            backgroundColor: "red",
            backgroundImage: `url(${imagelink ? imagelink : bgImg})`
          }}
        />
      </div>
    );
  }
}
