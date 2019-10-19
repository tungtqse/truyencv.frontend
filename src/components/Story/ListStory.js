import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {search} from '../../actions/storyActs'
import '../../styles/story/story-list.css';
import {SKIP_DEFAULT, TAKE_DEFAULT, MAX_PAGE} from '../../core/constants';
import Paging from '../Common/Paging/Paging';

class ListStory extends React.Component {   

    state = {keyword: '' ,skip : SKIP_DEFAULT, take: TAKE_DEFAULT, paging: {currentPage: 0, nextPage: 1, previousPage: 0}}

    componentDidMount(){
        this.props.search(this.state);
    } 

    pageOnClick = (skip) => {          
        var data = this.state;
        data.skip = skip;
        this.props.search(this.state);    
    }

    renderList = () => {        
        if(!this.props.stories){
            return;
        }

        return this.props.stories.map((item) => {
            return(
                <tr key={item.id}>
                   <td>
                        <h4 className="ui image header">
                            <img className="ui mini rounded image" alt="img" src="https://semantic-ui.com/images/avatar2/small/lena.png"/>
                            <div className="content">
                                <Link to={`/story/${item.id}`} className="header story-name">{item.name}</Link>
                                <div className="sub header">
                                    <Link to="" className="story-author">{item.author}</Link>
                                </div>                              
                            </div>
                        </h4>
                   </td> 
                   <td>
                        <div className="content">                                                      
                            <div className="story-status">{item.progressStatus}</div>
                        </div>  
                   </td>
                   <td>
                        <div className="content">
                            <Link to="" className="story-total-chapter">Chương {item.totalChapter}</Link>                           
                            <div className="sub header story-info">Updated {item.modifiedDateDisplay}</div>
                        </div>                        
                   </td>
                   <td>
                        <div className="content">
                            <Link to="" className="story-action-read">Xem Tiếp</Link>                             
                            <div className="sub header story-info">Đã đọc: 0/{item.totalChapter}</div>
                        </div>  
                        
                   </td>
                   <td>
                                          
                   </td>
                </tr>                
            )
        });
    }    

    render(){
        return(
            <div className="ui container" id="story-page">
                <table className="ui single line table">
                    <thead></thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>    
                <Paging count={this.props.count} take={TAKE_DEFAULT} pageOnClick={this.pageOnClick}/>  
                <Link to="/story/new/" className="ui button common-button float-right" data-tooltip="Create Story"><i className="fitted plus icon"/></Link>          
            </div>
        )
    }
}

const mapStateToProps = (state) => {    
    return{
        stories : Object.values(state.story.data),
        count : state.story.count
    }
}

export default connect(mapStateToProps, {search}) (ListStory);