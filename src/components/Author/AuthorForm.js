import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import InputCore from '../Common/Fields/InputCore';

class AuthorForm extends React.Component{

    onSubmit = (formValues) => {     
        this.props.onSubmit(formValues);
    }

    onCancel = () => {        
        this.props.onCancel();
    }

    renderInput = (fieldProps) => {
        return <InputCore fieldProps={fieldProps}/>
    } 

    renderForm = () => {
        if(!this.props.initialValues){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }

        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" component={this.renderInput} label="Name"/>              
                <Field name="link" component={this.renderInput} label="Link"/>
                <button className="ui button common-button">Submit</button>
                <button className="ui button common-button" onClick={this.onCancel}>Cancel</button>
            </form>
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

const validate = (formValues) => {    
    const errors = {};

    if(!formValues.name){
        errors.name = 'You must enter a name';
    }

    if(!formValues.link){
        errors.link = 'You must enter a link';
    }    

    return errors;
}

const mapStateToProps = (state) => {   
         
    return{
        initialValues: state.author.data
    }
}

export default connect(
    mapStateToProps
  )(reduxForm({
        form: 'storyForm', // a unique identifier for this form
        validate,
        enableReinitialize: true
  })(AuthorForm))