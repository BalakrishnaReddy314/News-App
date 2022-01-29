import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={imageUrl} className="card-img-top" alt="..." />
        <span className="badge bg-primary" style={{borderRadius:"0"}}>{source}</span>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author?author: "Unknown"} at {new Date(publishedAt).toUTCString()} </small></p>
            <a
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
              rel="noreferrer"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
