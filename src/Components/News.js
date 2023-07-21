import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalArticles: 0,
            hasMore: false
        }

    }

    // Props settings
    static defaultProps = {
        country: "in",
        apiKey: "164380cd683f48649733dd9fe8c9bd3b",
        category: "general",
        pageSize: 9,
    }

    static propTypes = {
        country: PropTypes.string,
        apiKey: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // Mounting methods
    componentDidMount(){
        this._isMounted = true;
        this.fetchArticle()
        console.log("in componentDidMount");
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log("in componentWillUnmount");
    }


    // Fetch data from api
    fetchArticle = async () => {
        if (this._isMounted){
            this.props.setProgress(10)
            // this.setState({loading: true})
            let url = `https://newsapi.org/v2/top-headlines?apiKey=${this.props.apiKey}&country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url);
            this.props.setProgress(30)
            let parsedData = await data.json()
            this.props.setProgress(60)
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalArticles: parsedData.totalResults,
                loading:false,
                page: this.state.page + 1,
                hasMore: parsedData.articles.length > 0
            })
            this.props.setProgress(90)
            document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
            this.props.setProgress(100)
        }
    }

    // Fetches data for next page
    fetchMoreData = async () => {
        // this.setState({page: this.state.page + 1})
        await this.fetchArticle()
        console.log("in fetchMoreData");
    }

    // handlePrevClick = async () => {
    //     let page = this.state.page - 1
    //     await this.fetchArticle(page)
    // }

    // handleNextClick = async () => {
    //     if ( this.state.page + 1 >! Math.ceil(this.state.totalArticles/this.props.pageSize)){
    //         let page = this.state.page + 1
    //         await this.fetchArticle(page)
    //     }

    // }




    render() {
        return (
            <div className='container my-5'>
                <h3 className='display-3 text-center my-5'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h3>

                {this.state.loading && <Loading />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<Loading />}
                >

                    <div className="container">
                        <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                                        <NewsItem author={element.author?element.author:"unknown"} title={element.title?element.title:""} description={element.description?element.description:""} source={element.source.name} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2022/02/drawkit-illustrations-8iIUDnRq87o-unsplash-1.jpg?resize=1200,675"} newsUrl={element.url?element.url:""} publishedAt={element.publishedAt?element.publishedAt:""} />
                                    </div>
                                })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
