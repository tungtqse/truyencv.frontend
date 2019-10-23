import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../history';
import Header from './Menu/Header';
import ListStory from './Story/ListStory';
import ShowStory from './Story/GetStory';
import CreateStory from './Story/CreateStory';
import EditStory from './Story/EditStory';
import DeleteStory from './Story/DeleteStory';
import ShowChapter from './Chapter/GetChapter';
import ListAuthor from './Author/ListAuthor';
import ShowAuthor from './Author/GetAuthor';
import CreateAuthor from './Author/CreateAuthor';
import EditAuthor from './Author/EditAuthor';
import Search from './Search/SearchResult';
// import DeleteAuthor from './Author/DeleteAuthor';
import '../styles/common.css'

const App = () => {
    return(
        <div className="ui">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ListStory}/>
                        <Route path="/author" exact component={ListAuthor}/>
                        <Route path="/author/new" exact component={CreateAuthor}/>
                        <Route path="/author/:id" exact component={ShowAuthor}/>                        
                        <Route path="/author/edit/:id" exact component={EditAuthor}/>
                        {/* <Route path="/author/delete/:id" exact component={DeleteAuthor}/> */}
                        <Route path="/story/new" exact component={CreateStory}/>
                        <Route path="/story/:id" exact component={ShowStory}/>                        
                        <Route path="/story/edit/:id" exact component={EditStory}/>
                        <Route path="/story/delete/:id" exact component={DeleteStory}/>
                        <Route path="/chapter/:storyId/:numberChapter" exact component={ShowChapter}/>
                        <Route path="/search" exact component={Search}/>   
                        <Route path="/search/:keyword" exact component={Search}/>   
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;