import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class BookSearch extends Component {
    state = {
        query: "",
        books: []
    };

    updateResults = query => {

	    const trimmedQuery = query.trim();

        if (!trimmedQuery) {
	    	this.setState({
	            query: "",
	            books: []
	        });

            return;
	    }

        const booksOnShelves = this.props.booksOnShelves.map(b => b.id);

	    BooksAPI
            .search(trimmedQuery)
            .then(books => (!books || "error" in books) ? [] : books)
            .then(books => {
                books.map(book => {
                    if (!booksOnShelves.includes(book.id)) {
                        book["shelf"] = "none";
                        return book;
                    }

                    const index = booksOnShelves.indexOf(book.id);
                    book["shelf"] = this.props.booksOnShelves[index].shelf;
                    return book;
                })

                this.setState({
                    query: query,
                    books: books
                });
            })
            .catch(error => {
                alert('An error ocurred while the search was executed.');
            });
    }

    render() {
        const { moveBook } = this.props;

        const { books, query } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            minLength={1}
                            debounceTimeout={500}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={event => this.updateResults(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.map(book => (
                            <Book
                                key={book.id}
                                book={book}
                                onShelfChange={moveBook}
                            />
                            ))
                        }
                        {(query.length > 0 && books.length === 0) && <li> No books match your search query! </li>}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch