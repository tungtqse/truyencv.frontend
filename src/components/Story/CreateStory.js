import React from 'react';
import {connect} from 'react-redux';
import {create} from '../../actions/storyActs';
import StoryForm from './StoryForm';
import history from '../../history';

class CreateStory extends React.Component {

    onSubmit = (data) => {          
        this.props.create(data);
    }

    onCancel = () => {
        history.push(`/`);
    }

    renderForm = () => {       
        return(
            <div>            
                <h3>Create Story</h3>
                <StoryForm 
                    onSubmit={this.onSubmit}   
                    onCancel={this.onCancel}                    
                />
            </div>
        );
    }

    render(){
        return(
            <div className="ui container">
                {this.renderForm()}
            </div>
        );
    }

}

export default connect(null, {create})(CreateStory);