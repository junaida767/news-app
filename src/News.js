import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props)  { 
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    // document.title=`NewsApp-${this.props.category}`;
    News.defaultProps={
        country:'in',
        pageSize:9,
        category:'general'

    }
    News.propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    const updateNews=async()=>{
        props.setProgress(10)
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data=await fetch(url);
        props.setProgress(50)
        let parsedData = await data.json()
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)       
        props.setProgress(100)
    }
    useEffect(() => {
        updateNews()
         // eslint-disable-next-line
    },[])
    

   const fetchMoreData=async()=>{
    setPage(page + 1)
    const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true})
    let data=await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // this.updateNews()
   }

    return (
        <>
            <h1 className='text-center' style={{margin:'40px 0px' , marginTop:'80px'}}>NewsApp - Top Headlines</h1> 
            <h3 className='mx-2'>{props.category.toUpperCase()} NEWS</h3>
            {loading && <Loading/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Loading/>}
  >
    <div className='container'>
            <div className='row'>
            {articles.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                <NewsItem  title={element.title?element.title.slice(0,30):""} desc={element.description?element.description.slice(0,70):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishAt={element.publishedAt} source={element.source.name}></NewsItem>
            </div>
        })}
            </div>
            </div>
        </InfiniteScroll>
        </>
    )

}
