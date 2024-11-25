import React from "react";
import { Link } from "react-router-dom";

function BookCard(props) {
  const { book } = props;

  return (
    <Link className="link" to={`/books/${book.id}`} key={book.id}>
      <div className="list-item col-lg-4 col-sm-12 col-md-6">
        <img src={book.coverImageUrl} alt={book.id} className="image" />
        <h1 className="heading">{book.title}</h1>
        <p>{book.author}</p>
        <ul className="unordered-container">
          {book.genre.length > 0 &&
            book.genre.map((some, index) => (
              <li className="genre-list" key={index}>
                <p className="genre-para">{some}</p>
              </li>
            ))}
        </ul>
        <p>{book.shortDescription}</p>
      </div>
    </Link>
  );
}

export default BookCard;
