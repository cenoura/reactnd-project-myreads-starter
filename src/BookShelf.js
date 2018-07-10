import React from "react";
import Book from "./Book";

function BookShelf (props) {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            onShelfChange={props.move}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;