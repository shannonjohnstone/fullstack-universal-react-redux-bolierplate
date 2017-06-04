/* global document */

import React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import reducers from './reducers'
import { addToCart } from './actions/cartActions'
import { postBooks, deleteBook, updateBook } from './actions/booksActions'
import BooksList from './components/pages/BooksList'

const middleware = applyMiddleware(logger)
const store = createStore(reducers, middleware)

render(
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
)

store.dispatch(postBooks([{
  id: 1,
  title: 'Book Title',
  description: 'Best book ever.',
  price: 20.00
},
{
  id: 2,
  title: 'Book Title 2',
  description: 'Best book ever.',
  price: 88.99
},
{
  id: 3,
  title: 'Book Title 2',
  description: 'Best book ever.',
  price: 88.99
}]
))

// store.dispatch(deleteBook({ id: 2 }))

// store.dispatch(updateBook({
//   id: 3,
//   title: 'New Book Title'
// }))

// store.dispatch(addToCart([{ id: 1 }]))
