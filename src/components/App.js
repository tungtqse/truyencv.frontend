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
import '../styles/common.css'

const App = () => {
    return(
        <div className="ui">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ListStory}/>
                        <Route path="/story/new" exact component={CreateStory}/>
                        <Route path="/story/:id" exact component={ShowStory}/>                        
                        <Route path="/story/edit/:id" exact component={EditStory}/>
                        <Route path="/story/delete/:id" exact component={DeleteStory}/>
                        <Route path="/chapter/:storyId/:numberChapter" exact component={ShowChapter}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;