import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Cookies from "js-cookie";
import FailureView from "../FailureView";
import "./index.css";
import BookCard from "../BookCard";
import Header from "../Header";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function MyBooks() {
  const jwtToken = Cookies.get("jwt_token");
  const [userBook, setUserBook] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getBookById = async () => {
    const apiURl = "http://localhost:5000/api/v1/user";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiURl, options);
    if (response.ok) {
      const data = await response.json();
      const updatedData = data.bookByUser.map((some) => ({
        id: some.id,
        title: some.title,
        author: some.author,
        coverImageUrl: some.coverImageUrl,
        createdBy: some.createdBy,
        genre: some.genre,
        shortDescription: some.shortDescription,
        isbn: some.isbn,
        cratedUser: some.user.firstName,
      }));
      console.log(updatedData);
      localStorage.setItem("userBooks", JSON.stringify(updatedData));
      const cachedData = JSON.parse(localStorage.getItem("userBooks"));
      setUserBook(cachedData);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  useEffect(() => {
    getBookById();
  }, []);

  const renderBook = () => (
    <ul className="unorderd">
      {userBook.length > 0 &&
        userBook.map((book) => <BookCard book={book} key={book.id} />)}
    </ul>
  );

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
        return renderBook();
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

export default MyBooks;
