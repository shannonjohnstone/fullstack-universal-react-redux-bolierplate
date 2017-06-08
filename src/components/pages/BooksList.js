import React, { Component } from 'react'
import { connect } from 'react-redux'
import { arrayOf, object } from 'prop-types'
import { getBooks } from '../../actions/booksActions'
import BookItem from './BookItem'
import BooksForm from './BooksForm'
import Cart from './Cart'
import Navigation from '../Navigation'

class BooksList extends Component {
  static propTypes = {
    books: arrayOf(object).isRequired
  }
  componentDidMount() {
    // this.props.getBooks()
  }
  render() {
    // spreading array into a new array so the reverse does not effect the orginal books array
    // reverse() will mutate the orginal/reference array and does not create a new version
    const books = [...this.props.books].reverse().map(book => <BookItem key={book.id} book={book} />)
    return (
      <div className="row">
        <h1>Books List</h1>
        <div className="row">
          <div className="col-6">
            <BooksForm />
          </div>
          <div className="col-6">
            <ul className="list--clean">
              {books}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps, { getBooks })(BooksList)
