import React, { Component } from 'react'
import '../utils/App.css'
import PropTypes from 'prop-types'

class BookCard extends Component {
  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <div className='book'>
                <div className="book-top">
                  {typeof book.imageLinks !== "undefined" &&
                    <div 
                      className="book-cover" 
                      style={{ width: 128, height: 193, backgroundImage:
                        `url(${book.imageLinks.smallThumbnail})`}}>
                    </div> }
                  <div className="book-shelf-changer">
                    <select 
                      defaultValue={book.shelf || "none"}
                      onChange={ event => this.props.bookToShelf(event, book)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

BookCard.propTypes = {
  book: PropTypes.object,
  bookToShelf: PropTypes.func, 
}

export default BookCard