import React, { Component } from "react";
import { Icon } from "react-icons-kit";
import { Scrollbars } from "react-custom-scrollbars";
import { starFull, starEmpty } from "react-icons-kit/icomoon/";

export class Reviews extends Component {
  constructor() {
    super();
    this.handleReviewName = this.handleReviewName.bind(this);
    this.handleReviewContent = this.handleReviewContent.bind(this);
    this.handleReviewTitle = this.handleReviewTitle.bind(this);
    this.state = {
      reviewCount: 20,
      reviews: [
        {
          name: "PARRY",
          content: "Best cbd oil around.",
          title: "LOVE THIS PRODUCT",
          ratings: 5
        },
        {
          name: "JOHNNY",
          content:
            "You guys have a great product, but your shipping is horrible. A product this expensive should be shipped priority mail. This is definitely hurting your brand. Are you really all of the complaints? Hello Customer Service, wake up! I am going to go to a different provider. There are other good ones on the market, you just have to a little research.",
          title: "SHIPPING REALLY SUCKS...",
          ratings: 3
        },
        {
          name: "LOLA",
          content:
            "Love the taste of the mint chocolate! Fan of the product itself (first time user)",
          title: "GREAT PRODUCT",
          ratings: 4
        }
      ],
      reviewName: "",
      reviewContent: "",
      reviewTitle: ""
    };
  }
  handleReviewName(e) {
    this.setState({
      reviewName: e.target.value
    });
  }
  handleReviewContent(e) {
    this.setState({
      reviewContent: e.target.value
    });
  }
  handleReviewTitle(e) {
    this.setState({
      reviewTitle: e.target.value
    });
  }
  submitReview(e) {
    e.preventDefault();
  }
  renderReviews() {
    const { reviews } = this.state;
    const StarCount = [0, 1, 2, 3, 4];
    return reviews.map((review, index) => {
      const { name, content, title, ratings } = review;
      return (
        <div className="review-container" key={index}>
          <div className="review">
            <div className="review-title-container">
              <p className="review-title">{title}</p>
              <div className="review-icon">
                {StarCount.map((el, index) => {
                  if (ratings > index) {
                    return <Icon key={index} icon={starFull} />;
                  }
                  return <Icon key={index} icon={starEmpty} />;
                })}
              </div>
            </div>
            <div className="review-content-container">
              <p className="review-content">{content}</p>
              <div className="reviewer-name">
                <p>{name}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    const { reviewName, reviewContent, reviewTitle } = this.state;
    return (
      <div className="review-main-wrapper">
        {/* <div className="review-header">
          <h2 className="MCItemCarouselIntro-title">Reviews</h2>
          <h2 className="MCItemCarouselIntro-title review-count">
            {this.state.reviewCount} Reviews
          </h2>
        </div> */}
        <div className="review-container-wrapper">
          <Scrollbars style={{ height: 400 }}>
            {this.renderReviews()}
          </Scrollbars>
        </div>
        <div className="review-header">
          <h2 className="MCItemCarouselIntro-title">Add Reviews</h2>
        </div>
        <div className="review-container-wrapper">
          <div className="review-container">
            <div className="review-form">
              <form onSubmit={this.submitReview}>
                <div className="has-input has-inline-label">
                  <label htmlFor="review-name">Nickname</label>
                  <input
                    type="text"
                    id="review-name"
                    onChange={this.handleReviewName}
                    value={reviewName}
                  />
                </div>
                <div className="has-input has-inline-label">
                  <label htmlFor="review-title">Title</label>
                  <input
                    type="text"
                    id="review-title"
                    onChange={this.handleReviewTitle}
                    value={reviewTitle}
                  />
                </div>
                <div className="has-input has-inline-label">
                  <label htmlFor="review-content">Content</label>
                  <input
                    type="text"
                    id="review-content"
                    onChange={this.handleReviewContent}
                    value={reviewContent}
                  />
                </div>
                <div className="has-input has-inline-label has-input-submit">
                  <input
                    type="submit"
                    className="btn btn-main"
                    value="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
