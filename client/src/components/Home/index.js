import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { CiSearch } from "react-icons/ci";
import Spinner from "react-bootstrap/Spinner";
import "./index.css";
import Header from "../Header";
import FailureView from "../FailureView";
import BookCard from "../BookCard";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function Home() {
  const [booksData, setBooksData] = useState([]);
  const jwtToken = Cookies.get("jwt_token");
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [searchInput, setSearchInput] = useState("");

  const getBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const apiUrl = `http://localhost:5000/api/v1/`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const statusQue = await response.json();
      const updatedData = statusQue.bookData.map((book) => ({
        id: book.id,
        author: book.author,
        coverImageUrl: book.coverImageUrl,
        createdBy: book.createdBy,
        genre: book.genre,
        shortDescription: book.shortDescription,
        title: book.title,
        cratedUser: book.user.firstName,
      }));
      localStorage.setItem("booksData", JSON.stringify(updatedData));
      const cachedData = JSON.parse(localStorage.getItem("booksData"));
      setBooksData(cachedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const searchChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    getBooks();
  }, []);

  const renderBooks = () => {
    const booksLength = booksData.length > 0;
    return (
      <div className="container-fluid">
        <div className="row center-container">
          <div className="search-bar text-center">
            <input
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={searchChange}
            />
            <button className="search-button">
              <CiSearch className="search-icon" />
            </button>
          </div>
          <ul className="unordered-main-container">
            {booksLength &&
              booksData.map((book, index) => <BookCard book={book} />)}
          </ul>
        </div>
      </div>
    );
  };

  const renderFailureView = () => (
    <div className="d-flex text-center">
      <FailureView />
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader-container">
      <Spinner animation="grow" variant="#4a2c3d" />
    </div>
  );

  const renderAll = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderBooks();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="main-container">
      <Header />
      {renderAll()}
    </div>
  );
}

export default Home;
