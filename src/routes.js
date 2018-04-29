import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Search from "./components/Search"

const routes = (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/search" component={Search}/>
  </Switch>
)

export default routes