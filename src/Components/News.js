import React, {useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News (props) {

    const [articles, setarticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    // const [totalArticles, setTotalArticles] = useState(0)
    const [hasMore, setHasMore] = useState(false)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Fetch data from api
    const fetchArticle = async () => {
        props.setProgress(10)
        
        // get data from api
        let url = `https://newsapi.org/v2/top-headlines?apiKey=${props.apiKey}&country=${props.country}&category=${props.category}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(40)

        // parse data into json
        let parsedData = await data.json()
        props.setProgress(60)

        // Set state to update data
        setarticles(articles.concat(parsedData.articles))
        // setTotalArticles(parsedData.totalResults)
        setLoading(false)
        setPage(page+1)
        setHasMore(parsedData.articles.length>0)
        props.setProgress(90)

        // set title of page
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        props.setProgress(100)
    }
    
    // Fetches data for next page
    const fetchMoreData = async () => {
        fetchArticle()
        console.log("in fetchMoreData");
    }

    useEffect(() => {
        fetchArticle()
        console.log("in useEffect")
    }, [])
    


    return (
        <div className='container my-5'>
            <h3 className='display-3 text-center my-5'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h3>

            {loading && <Loading />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loading />}
            >

                <div className="container">
                    <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4 my-2" key={element.url?element.url:""}>
                                    <NewsItem author={element.author?element.author:"unknown"} title={element.title?element.title:""} description={element.description?element.description:""} source={element.source.name} imageUrl={element.urlToImage?element.urlToImage:"https://techcrunch.com/wp-content/uploads/2022/02/drawkit-illustrations-8iIUDnRq87o-unsplash-1.jpg?resize=1200,675"} newsUrl={element.url?element.url:""} publishedAt={element.publishedAt?element.publishedAt:""} />
                                </div>
                            })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

News.defaultProps = {
    country: "in",
    apiKey: "164380cd683f48649733dd9fe8c9bd3b",
    category: "general",
    pageSize: 9,
}

News.propTypes = {
    country: PropTypes.string,
    apiKey: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
}

// export default News