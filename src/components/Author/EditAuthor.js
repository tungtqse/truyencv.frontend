import React from 'react';
import {connect} from 'react-redux';
import {edit, show} from '../../actions/authorActs';
import AuthorForm from './AuthorForm';
import history from '../../history';

class EditAuthor extends React.Component{
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.show(id);
    }

    onSubmit = (data) => {
        this.props.edit(data);
    }

    onCancel = () => {
        const {id} = this.props.match.params;
        history.push(`/author/${id}`);
    }

    renderForm = () => {
        if(!this.props.author){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }

        return(
            <div className="ui container">            
                <h3>Edit Author</h3>
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

const mapStateToProps = (state) => {
    return{
        author : state.author.data
    }
}

export default connect(mapStateToProps, {edit, show})(EditAuthor);