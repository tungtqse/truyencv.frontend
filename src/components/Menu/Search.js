import React from 'react';
import history from '../../history';
import {search} from '../../actions/storyActs';
import {connect} from 'react-redux';
import {SKIP_DEFAULT, TAKE_DEFAULT} from '../../core/constants';

class Search extends React.Component {
   
    state = {keyword : '', skip : SKIP_DEFAULT, take : TAKE_DEFAULT}

    onClick = () => {  
        history.push(`/search/${this.state.keyword}`); 
    }       
    
    onChange = (event) => {
        this.setState({keyword : event.target.value});
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state !== prevState){
            this.props.search(this.state);
        }
    }   

    render(){
        return(
            <div className="ui category search">
                <div className="ui icon input">
                    <input className="prompt" type="text" placeholder="Search story..." onChange={this.onChange} onClick={this.onClick} />
                    <i className="search icon"></i>
                </div>
                <div className="results">
                    {/* {this.renderSuggession()} */}
                </div>
            </div>
        );
    }
}

export default connect(null, {search}) (Search);