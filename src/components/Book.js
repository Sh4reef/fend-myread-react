import React from 'react'
import {Card, Image, Form} from 'semantic-ui-react'

const shelfSelect = (props) => {
  return (
    <select defaultValue={props.currentShelf} name="shelf" onChange={(event) => props.onSelect(event, props.bookId)}>
      {props.children}
    </select>
  )
}

const Book = ({thumbnail, title, authors, onSelect, options, id, currentShelf, publishedDate, description}) => {
  return (
    <Card centered>
      <Image src={thumbnail}/>
      <Card.Content>
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Meta>
          {authors}
        </Card.Meta>
        <Card.Description>
          <Form size={'mini'}>
            <Form.Field control={shelfSelect} bookId={id} onSelect={onSelect} currentShelf={currentShelf}>
              <option>None</option>
              {options.map((opt, index) => {
                return <option key={index} value={opt.value}>{opt.text}</option>
              })}
            </Form.Field>
          </Form>
        </Card.Description>
      </Card.Content>
      <Card.Content>
        <span>Published {publishedDate}</span>
      </Card.Content>
    </Card>
  )
}

export default Book