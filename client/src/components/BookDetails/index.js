import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../Header";
import FailureView from "../FailureView";
import { HiOutlinePencil } from "react-icons/hi2";

import Spinner from "react-bootstrap/Spinner";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function BookDetails() {
  const { id } = useParams();
  const [bookDetail, setBookDetail] = useState([]);
  const jwtToken = Cookies.get("jwt_token");
  const [rate, setRate] = useState(0);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const getBookDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress);
    const bookDetailsUrl = `http://localhost:5000/books/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(bookDetailsUrl, options);
    if (response.ok) {
      const statusQue = await response.json();
      const bookdetailData = statusQue.bookDataId;

      Cookies.set("data", JSON.stringify(bookdetailData), { expires: 20 });
      const dataToken = Cookies.get("data");
      if (dataToken) {
        setBookDetail(JSON.parse(dataToken));
      }
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const editBook = () => {
    alert("please contact admin");
  };

  const deleteBook = () => {
    alert("please contact admin");
  };

  useEffect(() => {
    getBookDetails();
  }, [id]);

  const renderBookDetail = () => (
    <div className="d-flex flex-column justify-content-center">
      <Link to="/" className="link">
        <button className="arrow-button">
          <FaArrowLeft size={30} color="#4a4141" />
        </button>
      </Link>
      <div className="column-container">
        <div className="book-detail-container">
          <div className="book-detail" key={bookDetail.id}>
            <img
              className="detail-image"
              src={bookDetail.coverImageUrl}
              alt={bookDetail.id}
            />
            <div className="text-container">
              <h1 className="detail-head">{bookDetail.title}</h1>
              <p className="author">{bookDetail.author}</p>
              <p>{bookDetail.shortDescription}</p>
              <div className="d-flex">
                <p className="genre-list-item">Genres:</p>
                <ul className="genre-container">
                  {bookDetail.genre &&
                    bookDetail.genre.length > 0 &&
                    bookDetail.genre.map((some, index) => (
                      <li className="genre-list-item" key={index}>
                        <p>{some}</p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <button type="button" onClick={editBook} className="pencil-button">
              <HiOutlinePencil />
            </button>
            <button
              type="button"
              onClick={deleteBook}
              className="pencil-button"
            >
              <MdDelete />
            </button>
          </div>
        </div>
        <h4 className="text-center">Give your rating</h4>
        <div className="rating-container">
          <Container>
            {[...Array(5)].map((item, index) => {
              const givenRating = index + 1;
              return (
                <label>
                  <Radio
                    key={index}
                    type="radio"
                    value={givenRating}
                    onClick={() => {
                      setRate(givenRating);
                    }}
                  />
                  <Rating>
                    <FaStar
                      color={
                        givenRating < rate || givenRating === rate
                          ? "#FFD700"
                          : "rgb(192,192,192)"
                      }
                    />
                  </Rating>
                </label>
              );
            })}
          </Container>
        </div>
        <div className="review-container">
          <h1 className="author">What Do You Think ?</h1>
          <div>
            <p className="rate-this-book">Rate This Book</p>
            <button type="button" className="button">
              Write a review
            </button>
          </div>
        </div>
        <div className="user-info-container">
          <h1 className="diff-font">Readers Reviews</h1>
          <div className="row-container">
            <div className="username-review">
              <h1 className="author">User Name</h1>
              <p>0 review</p>
            </div>
            <div className="username-review">
              <h1 className="author">0000-00-00</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                nam fuga ad exercitationem id nemo placeat reiciendis tenetur
                delectus aperiam. In dolorum nisi iusto quidem perspiciatis sed
                temporibus dignissimos. Ut.
              </p>
            </div>
          </div>
          <div className="row-container">
            <div className="username-review">
              <h1 className="author">User Name</h1>
              <p>0 review</p>
            </div>
            <div className="username-review">
              <h1 className="author">0000-00-00</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                nam fuga ad exercitationem id nemo placeat reiciendis tenetur
                delectus aperiam. In dolorum nisi iusto quidem perspiciatis sed
                temporibus dignissimos. Ut.
              </p>
            </div>
          </div>
          <div className="d-flex">
            <div className="username-review">
              <h1 className="author">User Name</h1>
              <p>0 review</p>
            </div>
            <div className="username-review">
              <h1 className="author">0000-00-00</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                nam fuga ad exercitationem id nemo placeat reiciendis tenetur
                delectus aperiam. In dolorum nisi iusto quidem perspiciatis sed
                temporibus dignissimos. Ut.
              </p>
            </div>
          </div>
        </div>
      </div>
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
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderBookDetail();
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

export default BookDetails;
