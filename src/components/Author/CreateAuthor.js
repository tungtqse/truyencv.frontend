import React from 'react';
import {connect} from 'react-redux';
import {create} from '../../actions/authorActs';
import AuthorForm from './AuthorForm';
import history from '../../history';

class CreateAuthor extends React.Component{

    onSubmit = (data) => {
        this.props.create(data);
    }

    onCancel = () => {
        history.push(`/author`);
    }

    renderForm = () => {
        return(
            <div className="ui container">            
                <h3>Create Author</h3>
                <AuthorForm 
                    onSubmit={this.onSubmit} 
                    onCancel={this.onCancel}                     
                />
            </div>
        );
    }

    render(){
        return(
            <div>
                {this.renderForm()}
            </div>
        )
    }
}

export default connect(null, {create})(CreateAuthor);


