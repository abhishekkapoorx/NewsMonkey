import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }

    fetchArticle = async (page, pageSize) => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=164380cd683f48649733dd9fe8c9bd3b&page=${page}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        return parsedData
    }
    async componentDidMount(){
        this.setState({loading: true})
        let page = this.state.page
        let pageSize = this.props.pageSize
        let parsedData = await this.fetchArticle(page, pageSize)
        this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults, loading:false})
    }

    handlePrevClick = async () => {
        this.setState({loading: true})
        let page = this.state.page - 1
        let pageSize = this.props.pageSize
        let parsedData = await this.fetchArticle(page, pageSize)
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading:false
        })
    }

    handleNextClick = async () => {
        if ( this.state.page + 1 >! Math.ceil(this.state.totalArticles/this.props.pageSize)){
            this.setState({loading: true})
            let page = this.state.page + 1
            let pageSize = this.props.pageSize
            let parsedData = await this.fetchArticle(page, pageSize)
            this.setState({
                articles: parsedData.articles,
                page: page,
                loading:false
            })

        }

    }

    render() {
        return (
            <div className='container my-5'>
                <h1>NewsMonkey - Your daily bite of NEWS</h1>

                {this.state.loading && <Loading />}

                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                            <NewsItem title={element.title?element.title.slice(0, 45) + "...":""} description={element.description?element.description.slice(0, 80) + "...":""} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2022/02/drawkit-illustrations-8iIUDnRq87o-unsplash-1.jpg?resize=1200,675"} newsUrl={element.url?element.url:""} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
