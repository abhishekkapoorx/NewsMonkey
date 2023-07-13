import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=164380cd683f48649733dd9fe8c9bd3b";
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({articles: parsedData.articles, totalArticles: parsedData.totalResults})
    }

    handlePrevClick = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=164380cd683f48649733dd9fe8c9bd3b&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1
        })
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalArticles/20)){
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=164380cd683f48649733dd9fe8c9bd3b&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1
            })
            
        }

    }

    render() {
        return (
            <div className='container my-5'>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                            <NewsItem title={element.title?element.title.slice(0, 45) + "...":""} description={element.description?element.description.slice(0, 80) + "...":""} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2022/02/drawkit-illustrations-8iIUDnRq87o-unsplash-1.jpg?resize=1200,675"} newsUrl={element.url?element.url:""} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                        <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
