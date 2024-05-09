import React, { useEffect, useRef, useState } from "react";
import News from "./News";
import "./NewsApp.css";

const apiKey = "6f11f3c247ca46c0b864014b4e1eb5d1";

function NewsApp() {
  const [query, setQuery] = useState("tesla");
  const [newsList, setNewsList] = useState([]);
  const queryInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2024-04-09&sortBy=publishedAt&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();

        setNewsList(jsonData.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Handle error - display a message or fallback
      }
    };

    // Debounce input change to prevent rapid API calls
    const delayTimer = setTimeout(() => {
      fetchData();
    }, 500); // Adjust debounce delay as needed

    return () => clearTimeout(delayTimer); // Clear timeout on unmount or query change

  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryValue = queryInputRef.current.value.trim();
    if (queryValue) {
      setQuery(queryValue);
    }
  };

  return (
    <div className="news-app">
      <h1 className="app-title">News Daily</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="query-input"
          type="text"
          ref={queryInputRef}
          placeholder="Search..."
        />
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
      <div className="news-container">
       {
         // newsList && newsList.length > 0 ?
           
          newsList.map((news) => (
            <News key={news.url} news={news} />
          ))
         
  // : (
  //         <p>No news found></p>
  //       )
          }
      </div>
    </div>
  );
}

export default NewsApp;
