import React, { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";
import Spinner from "react-bootstrap/Spinner";
import Header from "../Header";
import SuccessView from "../SuccessView";
import BookCard from "../BookCard";
import FailureView from "../FailureView";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function UploadPage() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState("");
  const [coverImageUrl, setCoverImage] = useState("");
  const [shortDescription, setDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isbn, setIsbn] = useState("");
  const [uploadBookData, setUploadData] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const jwtToken = Cookies.get("jwt_token");

  const uploadBook = async (event) => {
    event.preventDefault();
    const bookDetails = {
      title,
      genre: genre.split(","),
      author,
      coverImageUrl,
      shortDescription,
      isbn: parseInt(isbn, 10),
    };
    const uploadUrl = `http://localhost:5000/api/v1/`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(bookDetails),
    };
    setApiStatus(apiStatusConstants.inProgress);
    try {
      const response = await fetch(uploadUrl, options);
      const data = await response.json();
      if (response.ok) {
        Cookies.set("data", JSON.stringify(data), { expires: 20 });
        const dataToken = Cookies.get("data");
        if (dataToken) {
          setUploadData(JSON.parse(dataToken));
        }
        setApiStatus(apiStatusConstants.success);
      } else {
        setShowError(true);
        setErrorMsg(data.message);
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      setErrorMsg(error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };
  const handleCoverChange = (event) => {
    setCoverImage(event.target.value);
  };
  const handleDescrpChange = (event) => {
    setDescription(event.target.value);
  };
  const handleIsbnChange = (event) => {
    setIsbn(event.target.value);
  };

  const renderUpload = () => {
    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="upload-page-container ">
          <h1>Upload a book</h1>
          <form className="upload-form-container" onSubmit={uploadBook}>
            <label htmlFor="title">Title</label>
            <textarea
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="input"
              placeholder="title of the book"
            />
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              value={genre}
              onChange={handleGenreChange}
              className="input"
              placeholder="genre of the book"
            />
            <label htmlFor="author">Author</label>
            <input
              id="author"
              value={author}
              onChange={handleAuthorChange}
              className="input"
              placeholder="author of the book"
            />
            <label htmlFor="coverImage">Cover Image</label>
            <input
              id="coverImage"
              value={coverImageUrl}
              onChange={handleCoverChange}
              className="input"
              placeholder="image url"
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={shortDescription}
              onChange={handleDescrpChange}
              className="input"
              placeholder="short description about the book"
            />
            <label htmlFor="isbn">ISBN</label>
            <input
              id="isbn"
              value={isbn}
              onChange={handleIsbnChange}
              className="input"
              placeholder="isbn"
            />
            <button className="button" type="submit">
              Upload Book
            </button>
          </form>
          {showError && <p className="text-danger">*{errorMsg}</p>}
        </div>
      </div>
    );
  };

  const renderSuccessview = () => (
    <div>
      <SuccessView />
      <BookCard book={uploadBookData} />
    </div>
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
      case apiStatusConstants.initial:
        return renderUpload();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessview();
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

export default UploadPage;
