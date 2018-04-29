import React from 'react'
import BookList from './BookList'
import {Link} from 'react-router-dom'
import {Container, Button, Responsive} from 'semantic-ui-react'
import {getAll as getAllBooks, update as updateBook} from '../api/BooksAPI'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      cols: 3,
      isLoading: true,
      books: []
    }
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    getAllBooks().then(data => {
      this.setState({
        books: data,
        isLoading: false,
        categoryOptions: [
          {value: 'currentlyReading', text: 'Currently Reading'},
          {value: 'wantToRead', text: 'Want To Read'},
          {value: 'read', text: 'Read'}
        ]
      })
    })
  }

  onSelect(event, bookId) {
    const book = this.state.books.find((book) => book.id === bookId)
    const updatedBook = this.state.books.find((book) => book.id === bookId)
    updatedBook[event.target.name] = event.target.value
    this.setState({
      books: [updatedBook].concat(this.state.books.filter((book) => book.id !== bookId))
    })
    updateBook(book, event.target.value)
  }


  handleOnUpdate = (event, {width}) => {
    if (width <= 375) {
      this.setState({cols: 1})
    }
    else if (width <= 768) {
      this.setState({cols: 2})
    } else {
      this.setState({cols: 3})
    }
  }

  render() {
    return (
      <div id={'home'}>
        <Container>
          <Responsive as={'div'} fireOnMount onUpdate={this.handleOnUpdate}>
            <BookList isLoading={this.state.isLoading} onSelect={this.onSelect} categories={this.state.categoryOptions}
                      bookList={this.state.books} cols={this.state.cols}/>
          </Responsive>
        </Container>
        <Link to="/search"><Button className={'add-book-button'} circular icon={'plus'}
                                   size={'massive'}></Button></Link>
      </div>
    )
  }
}

export default Home