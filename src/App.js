import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookSearch from "./BookSearch";
import BookShelf from "./BookShelf";
import { Link, Route } from "react-router-dom";

class BooksApp extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI
            .getAll()
            .then((books) => {
                this.setState({ books })
            })
            .catch(error => {
                alert('An error ocurred while loading your books.');
            });
    }

    updateBookShelf = (book, shelf) => {
        const ids = this.state.books.map(b => b.id);
        const match = ids.includes(book.id);

        BooksAPI
            .update(book, shelf)
            .then(() => {
                if (!match) {
                    this.setState(state => ({
                        books: state.books.concat([book])
                    }));

                    return;
                }

                if (shelf === "none") {
                    this.setState((state) => ({
                        books: state.books.filter(b => b.id !== book.id)
                    }));

                    return;
                }

                this.setState(state => ({
                    books: state.books.map(b => {
                        if (b.id === book.id) {
                            b.shelf = shelf;
                        }

                        return b;
                    })
                }));
            })
            .then(
                BooksAPI.getAll().then(
                    books => this.setState({ books })
                )
            )
    }

    render() {

        const { books } = this.state;

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <BookShelf
                                move={this.updateBookShelf}
                                shelfName="Currently reading"
                                books={books.filter((book) => book.shelf === "currentlyReading")}
                            />

                            <BookShelf
                                move={this.updateBookShelf}
                                shelfName="Want to read"
                                books={books.filter((book) => book.shelf === "wantToRead")}
                            />

                            <BookShelf
                                move={this.updateBookShelf}
                                shelfName="Read"
                                books={books.filter((book) => book.shelf === "read")}
                            />
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({history}) => (
                    <BookSearch
                        booksOnShelves={books}
                        moveBook={(b, shelf) => {
                            this.updateBookShelf(b, shelf);
                            history.push("/")
                        }}
                    />
                )}/>
            </div>
        )
    }
}


export default BooksApp;