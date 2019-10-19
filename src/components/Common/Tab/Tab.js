import React from 'react';

class Tab extends React.Component {

    onClickTab = (event) => {
        event.preventDefault();
        this.props.onClick(this.props.tabIndex);
    }

    render(){
        return (
            <div className={`item ${this.props.isActive ? 'active' : ''}`} onClick={(event) => this.onClickTab(event)}>
                {this.props.label}
            </div>
        )
    }    
}


export default Tab;