import React from 'react';

class SelectCore extends React.Component{

    state = {value : this.props.fieldProps.input.value, touched: false};

    componentDidUpdate(prevProps, prevState){                
        if(prevProps !== this.props){           
            this.setState({value : this.props.fieldProps.input.value});
        }         
    }

    handleChange = (event) => {        
        this.setState({value: event.target.value, touched:false});
        this.props.handleChange(event);
    }

    handleClick = (event) => {
        if(!event.target.value){
            this.setState({touched: true});
        }
    }

    renderSelect = (fieldProps) => {     
        const {touched} = this.state;
        const className = `field ${touched && fieldProps.meta.error ? 'error' : ''}`;
        return(
            <div className={className}>
                <label>{fieldProps.label}</label>               
                <select value={this.state.value} 
                        className="ui fluid selection dropdown select-core" 
                        name={fieldProps.input.name} 
                        onChange={this.handleChange}
                        disabled={fieldProps.disable}
                        onBlur={this.handleClick}>
                    <option className="select-option-default" value="" disabled>{`Select ${fieldProps.label}...`}</option>
                    {this.renderOptions(fieldProps.options)}
                    
                </select>
                <input type="hidden" name={fieldProps.input.name} value={this.state.value}/>
                {this.renderError(touched,fieldProps.meta.error)} 
            </div>                      
        );
    }

    renderOptions = (options) => {
        if(!options){
            return;
        }

        return options.map((option) => {
            return(
                <option key={option.value} value={option.value}>{option.label}</option>
            );
        });
    }

    renderError(touched, error){
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
                {this.renderSelect(this.props.fieldProps)}
            </>
        );
    }

}

export default SelectCore;