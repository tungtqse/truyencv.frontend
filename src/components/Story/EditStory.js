import React from 'react';
import {connect} from 'react-redux';
import {edit, show} from '../../actions/storyActs';
import StoryForm from './StoryForm';
import history from '../../history';

class EditStory extends React.Component {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.show(id);
    }

    onSubmit = (data) => {  
        this.props.edit(data);
    }

    onCancel = () => {
        const {id} = this.props.match.params;
        history.push(`/story/${id}`);
    }

    renderForm = () => {
        if(!this.props.story){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }

        return(
            <div>            
                <h3>Edit Story</h3>
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

const mapStateToProps = (state) => {
    
    return {
        story : state.story.data
    }
}

export default connect(mapStateToProps, {edit, show})(EditStory);