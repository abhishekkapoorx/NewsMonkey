import React from 'react'

export default function NewsItem(props) {
    let { author, title, description, source, imageUrl, newsUrl, publishedAt } = props;
    return (
        <>
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="..." />
                <span className="mt-1 me-1 position-absolute top-0 end-0 translate-end badge rounded-pill bg-dark">
                    {source}
                <span className="visually-hidden">Source Name</span>
                </span>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">By {author}</h6>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">On {new Date(publishedAt).toUTCString()}</small></p>
                    <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read Here</a>
                </div>
                
            </div>
        </>
    )
}
