import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'
import PropTypes from 'prop-types'

class AddBook extends Component {
  state = {
    query:'',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  clearQuery = () => {
    this.updateQuery('')
    this.setState({ books: [] })
  } 

  render() {
    const searchingBooks = this.state.query === ''
      ? [] // when query clears books get's set to []
      : BooksAPI.search(this.state.query)
          .then(resSearch => {
            BooksAPI.getAll()
              .then(resAll => {
                resAll.map((b) => {
                  resSearch.forEach((element, index) => {
                    if(element.id === b.id) {
                      resSearch[index] = b
                    }
                  })
                })
                this.setState({ books: resSearch })
                console.log(resSearch)
              })            
          })

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'> 
            <button className="close-search"> </button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input 
              types='text' 
              placeholder="Search by title or author" 
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
            {this.state.books.length > 0 && (
              <div className="search-books-results">
                <BookCard
                  books={this.state.books}
                  bookToShelf={this.props.bookToShelf}
                />
              </div>)}
          </div>
        </div>
      </div>
    )
  }
}

AddBook.propTypes = {
  query: PropTypes.string,
  books: PropTypes.object,
  bookToShelf: PropTypes.func,  
}

export default AddBook