import React from 'react'

const NewsItem =(props)=>{
    let {title,desc,imageUrl,newsUrl,author,publishAt,source}=props;
    return (
      
        <div className="card my-2">
        <img src={imageUrl?imageUrl:"https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <span className="badge rounded-pill text-bg-info">{source}</span>
          <p className="card-text">{desc}...</p>
          <p className="card-text"><small className="text-body-secondary">By-{author?author:"Unknown"} on {new Date(publishAt).toGMTString()}</small></p>
          <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
}
export default NewsItem