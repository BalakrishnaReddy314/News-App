import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1, totalResults: 0 };
  }

  updateNews() {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab4818364c34ee9ae6f3a2dcfbedad9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: data.articles,
          totalResults: data.totalResults,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cab4818364c34ee9ae6f3a2dcfbedad9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: this.state.articles.concat(data.articles),
          // totalResults: data.totalResults,
          loading: false,
        });
      });

  }

  // clickNextHandler = () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // clickPrevHandler = () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  render() {
    return (
      <>
      <div>
          <h1 className="text-center" style={{ margin: "30px 0" }}>
            NewsMonkey - Top Headlines
          </h1>
          {/* {this.state.loading && <Loader />} */}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loader />}
        >
          <div className="container">
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((article) => {
                return (
                  <div key={article.url} className="col-md-4">
                    <NewsItem
                      title={article.title ? article.title : ""}
                      description={
                        article.description ? article.description : ""
                      }
                      imageUrl={article.urlToImage}
                      newsUrl={article.url}
                      author={article.author}
                      publishedAt={article.publishedAt}
                      source={article.source.name}
                    />
                  </div>
                );
              })}
          </div>
          </div>
          </InfiniteScroll>
          </div>
      </>
    );
  }
}

export default News;
