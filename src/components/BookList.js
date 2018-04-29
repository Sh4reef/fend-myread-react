import React from 'react'
import {Grid, Segment, Loader} from 'semantic-ui-react'
import Book from './Book'

class BookList extends React.Component {

  getBooksByCategory = (shelf) => {
    const {bookList} = this.props
    return bookList.filter((book) => {
      return book.shelf === shelf
    })
  }

  getBookThumbnail = (link) => {
    if (link.endsWith('&zoom=1&edge=curl&source=gbs_api')) {
      return link.slice(0, -32)
    }
    if (link.endsWith('&zoom=1&source=gbs_api')) {
      return link.slice(0, -22)
    }
    return link
  }

  bookColumn = (book) => {
    const {onSelect, categories} = this.props
    return (
      <Grid.Column key={book.id} className={'book-column'}>
        <Book thumbnail={book.imageLinks && this.getBookThumbnail(book.imageLinks.thumbnail)} title={book.title}
              id={book.id}
              authors={book.authors}
              publishedDate={book.publishedDate}
              currentShelf={book.shelf}
              options={categories}
              onSelect={onSelect}
              description={book.description}/>
      </Grid.Column>
    )
  }

  render() {
    const {cols, isLoading} = this.props
    return (
      <Grid>
        <Grid.Row className={'category-row'} centered>
          <Segment className={'category-segment'} color={'green'}>
            Currently Reading
          </Segment>
        </Grid.Row>
        <Grid.Row className={'books-row'} columns={cols}>
          {isLoading ? <Loader active/> :
            this.getBooksByCategory('currentlyReading').map((book) => {
              return this.bookColumn(book)
            })
          }
        </Grid.Row>
        <Grid.Row className={'category-row'} centered>
          <Segment className={'category-segment'} color={'blue'}>
            Want to Read
          </Segment>
        </Grid.Row>
        <Grid.Row className={'books-row'} columns={cols}>
          {isLoading ? <Loader active/> :
            this.getBooksByCategory('wantToRead').map((book) => {
              return this.bookColumn(book)
            })
          }
        </Grid.Row>
        <Grid.Row className={'category-row'} centered>
          <Segment className={'category-segment'} color={'teal'}>
            Read
          </Segment>
        </Grid.Row>
        <Grid.Row className={'books-row'} columns={cols}>
          {isLoading ? <Loader active/> :
            this.getBooksByCategory('read').map((book) => {
              return this.bookColumn(book)
            })
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default BookList