import React from 'react';

class TextareaCore extends React.Component {

    renderTextarea = (fieldProps) =>{    
        debugger
        const className = `field ${fieldProps.meta.touched && fieldProps.meta.error ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{fieldProps.label}</label>
                <textarea {...fieldProps.input} autoComplete="off" disabled={fieldProps.disable}/>
                {this.renderError(fieldProps.meta)} 
            </div>                      
        );
    }

    renderError({touched, error}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>

            );
        }
    }

    render(){
        if(!this.props.fieldProps){
            return;
        }

        return(
            <>
                {this.renderTextarea(this.props.fieldProps)}
            </>
        );
    }
    
}

export default TextareaCore;