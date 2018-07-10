import React from "react";

function Book (props) {
    const { book, onShelfChange } = props;

    const thumb = book.imageLinks ? book.imageLinks.thumbnail : `http://via.placeholder.com/128x193?text=No%20Cover`;

    const divStyle = {
        backgroundImage: `url(${thumb})`
    };

    const isCurrentStatus = val => val === book.shelf ? " \u2705 " : undefined;

    const authors = book.hasOwnProperty('authors') && book.authors.join(', ');

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={divStyle}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={book.shelf} onChange={(e) => onShelfChange(book, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading {isCurrentStatus("currentlyReading")}</option>
                            <option value="wantToRead">Want to Read {isCurrentStatus("wantToRead")}</option>
                            <option value="read">Read {isCurrentStatus("read")}</option>
                            <option value="none">None {isCurrentStatus("none")}</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    )
}

export default Book;