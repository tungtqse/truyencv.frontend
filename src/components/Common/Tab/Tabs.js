import React from 'react';

class Tabs extends React.Component {
    
    state = { activeTabIndex: 0};

    handleTabClick = (tabIndex) => {
        this.setState({
            activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

    renderChildrenWithTabsApiAsProps(){        
        return React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
                onClick : this.handleTabClick,
                tabIndex: index,
                isActive: index === this.state.activeTabIndex
            });
        });
    }

    // Render current active tab content
    renderActiveTabContent() {
        
        const {children} = this.props;
        const {activeTabIndex} = this.state;
        if(children[activeTabIndex]) {
            return children[activeTabIndex].props.children;
        }
    }

    render() {
        return (
            <div>
                <div className="ui top attached tabular menu">
                    {this.renderChildrenWithTabsApiAsProps()}                   
                </div>
                <div className="ui bottom attached tab segment active">
                    {this.renderActiveTabContent()}
                </div>
            </div>
            
        );
    }

}

export default Tabs;