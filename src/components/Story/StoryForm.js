import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {storyProgressStatus} from '../../core/constants';
import SelectCore from '../Common/Fields/SelectCore';
import InputCore from '../Common/Fields/InputCore';
import {search} from '../../actions/authorActs';


class StoryForm extends Component{

    state = {authorId : this.props.initialValues.authorId, progressStatus : this.props.initialValues.progressStatus}

    componentDidMount(){
        const data = {keyword : '', skip: 0, take : 1000}
        this.props.search(data);      
    }

    onSubmit = (formValues) => {                     
        const data = {...formValues};       
        
        this.props.onSubmit(data);
    }

    onCancel = () => {        
        this.props.onCancel();
    }

    handleSelect = (e) => {        
        // Code for select change
    }
  
    renderSelect = (fieldProps) => {          
        return <SelectCore fieldProps={fieldProps} handleChange = {this.handleSelect}/>
    }

    renderInput = (fieldProps) => {
        return <InputCore fieldProps={fieldProps}/>
    }  

    remapAuthor = () => {
        let authors = [];

        if(!this.props.author){
            return authors;
        }
        
        const {author} = this.props;
        
        if(author.length > 0){
            author.forEach(item => {
                authors.push({value: item.id, label: item.name});
            });
        }        

        return authors;
    }

    renderForm = () => {   
             
        if(!this.props.initialValues){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }

        let {progressStatus,authorId} = this.props.initialValues;       
        
        const authors = this.remapAuthor();

        return(
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="name" component={this.renderInput} label="Title"/>
                <Field name="authorId" component={this.renderSelect} label="Author" options={authors} value={authorId}/>
                <Field name="progressStatus" component={this.renderSelect} label="Progess Status" options={storyProgressStatus} value={progressStatus}/>
                <Field name="source" component={this.renderInput} label="Source"/>
                <Field name="link" component={this.renderInput} label="Link"/>
                <Field name="totalChapter" component={this.renderInput} label="Chapters" disable/>
                <button className="ui button common-button" type="submit">Submit</button>
                <button className="ui button common-button" onClick={this.onCancel}>Cancel</button>
            </form>
        );
    }

    render(){      
        return(
            <div className="ui container">
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

    if(!formValues.source){
        //errors.source = 'You must enter a source';
    }

    if(!formValues.link){
        errors.link = 'You must enter a link';
    }

    if(!formValues.authorId){
        errors.authorId = 'You must select a author';
    }

    if(!formValues.progressStatus){
        errors.progressStatus = 'You must select a status';
    }

    return errors;
}

const mapStateToProps = (state) => {   
         
    return{
        initialValues: state.story.data,
        author : Object.values(state.author.data)
    }
}

export default connect(
    mapStateToProps,
    {search}
  )(reduxForm({
        form: 'storyForm', // a unique identifier for this form        
        enableReinitialize: true,
        validate
  })(StoryForm))