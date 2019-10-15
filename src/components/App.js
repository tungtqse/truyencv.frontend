import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import history from '../history';
import Header from './Menu/Header';
import ListStory from './Story/ListStory';
import ShowStory from './Story/GetStory';
import CreateStory from './Story/CreateStory';
import EditStory from './Story/EditStory';
import DeleteStory from './Story/DeleteStory';

const App = () => {
    return(
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/" exact component={ListStory}/>
                        <Route path="/story/:id" exact component={ShowStory}/>
                        <Route path="/story/new" exact component={CreateStory}/>
                        <Route path="/story/edit/:id" exact component={EditStory}/>
                        <Route path="/story/delete/:id" exact component={DeleteStory}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;