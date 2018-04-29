import React from 'react'
import {Grid, Loader} from 'semantic-ui-react'
import BookList from "./BookList"

class SearchList extends BookList {
  render() {
    const {cols, isLoading, bookList} = this.props
    if (isLoading) {
      return <Loader active/>
    }
    return (
      <Grid>
        <Grid.Row className={'books-row'} columns={cols}>
          {bookList.map((book) => {
              return this.bookColumn(book)
            })}
        </Grid.Row>
      </Grid>
    )
  }
}

// const SearchList = ({cols, isLoading, onSelect, categories, bookList}) => {
//   return (
//     <Grid>
//       <Grid.Row stacked>
//       </Grid.Row>
//     </Grid>
//   )
// }

export default SearchList