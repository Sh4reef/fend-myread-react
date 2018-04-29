import React from 'react'
import {Container, Responsive, Input, Button, Segment} from 'semantic-ui-react'
import {search as searchBooks, update as updateBook} from '../api/BooksAPI'
import debounce from 'lodash.debounce'
import uniqBy from 'lodash.uniqby'
import Home from "./Home"
import SearchList from './SearchList'

class Search extends Home {

  constructor(props, context) {
    super(props, context)
    this.state = {
      results: [],
      books: [],
      isLoading: false,
      categoryOptions: [
        {value: 'currentlyReading', text: 'Currently Reading'},
        {value: 'wantToRead', text: 'Want To Read'},
        {value: 'read', text: 'Read'}
      ]
    }
    this.onChange = this.onChange.bind(this)
    this.emitChangeDebounced = debounce(this.onSearch, 500)
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel()
  }

  handleOnUpdate = (event, {width}) => {
    if (width <= 375) {
      this.setState({cols: 1})
    }
    else if (width <= 768) {
      this.setState({cols: 2})
    } else {
      this.setState({cols: 5})
    }
  }

  onChange(event) {
    this.setState({isLoading: true})
    this.emitChangeDebounced(event.target.value)
  }

  onSearch(value) {
    if (value.length > 0) {
      const currentBooks = this.state.books.filter((book) => {
        return book.title.includes(value)
      })
      console.log(currentBooks)
      searchBooks(value).then(data => {
        if (data.error) {
          this.setState({results: currentBooks, isLoading: false})
        } else {
          this.setState({results: uniqBy(currentBooks.concat(data), 'id'), isLoading: false})
        }
      })
    } else {
      this.setState({results: [], isLoading: false})
    }
  }

  onSelect(event, bookId) {
    const book = this.state.results.find((book) => book.id === bookId)
    const updatedBook = this.state.results.find((book) => book.id === bookId)
    updatedBook[event.target.name] = event.target.value
    this.setState({
      results: [updatedBook].concat(this.state.results.filter((book) => book.id !== bookId))
    })
    updateBook(book, event.target.value)
  }

  render() {
    return (
      <div id="search">
        <Container>
          <Segment>
            <Button floated={'left'} icon={'arrow left'} onClick={(event) => this.props.history.push('/')}/>
            <Input fluid placeholder='Search...' onChange={this.onChange}/>
          </Segment>
          <Responsive as={'div'} fireOnMount onUpdate={this.handleOnUpdate}>
            <SearchList isLoading={this.state.isLoading} onSelect={this.onSelect}
                        categories={this.state.categoryOptions}
                        bookList={this.state.results} cols={this.state.cols}/>
          </Responsive>
        </Container>
      </div>
    )
  }
}

export default Search