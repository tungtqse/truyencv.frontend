import React from 'react';
import {search} from '../../actions/storyActs';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../styles/story/story-list.css';
import {SKIP_DEFAULT, TAKE_DEFAULT, MAX_PAGE} from '../../core/constants';
import Paging from '../Common/Paging/Paging';

class SearchResult extends React.Component{

    state = {keyword: '',skip : SKIP_DEFAULT, take: TAKE_DEFAULT, paging: {currentPage: 0, nextPage: 1, previousPage: 0}}

    componentDidMount(){
        debugger
        const data = {...this.state};
        data.keyword = this.props.match.params.keyword;   

        this.props.search(data);        
    } 

    componentWillReceiveProps(nextProps) {
        
        if(this.props.match.params !== nextProps.match.params) {
            const data = {...this.state};
            data.keyword = nextProps.match.params.keyword;   

            nextProps.search(data);   
        }
    }

    pageOnClick = (skip) => {          
        var data = this.state;
        data.skip = skip;
        this.props.search(this.state);    
    }

    renderContent = () => {

        const keyword = this.props.keyword;          
       
        if(!this.props.results || this.props.results.length === 0){
            return(
                <div className="ui header">                    
                    <h3 className="common-header float-center">Không tìm thấy nội dung bạn yêu cầu : {keyword}</h3>
                </div>
            )
        }

        return(
            <>
                <div className="ui header">
                    <h3 className="common-header">Tìm kiếm truyện : {keyword} </h3>
                </div>
                <table className="ui single line table">
                    <thead></thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>    
                <Paging count={this.props.count} take={TAKE_DEFAULT} pageOnClick={this.pageOnClick}/>    
            </>
        );
    }

    renderList = () => {        
        if(!this.props.results){
            return;
        }
        
        return this.props.results.map((item) => {
            return(
                <tr key={item.id}>
                   <td>
                        <h4 className="ui image header">
                            <img className="ui mini rounded image" alt="img" src="https://semantic-ui.com/images/avatar2/small/lena.png"/>
                            <div className="content">
                                <Link to={`/story/${item.id}`} className="header story-name">{item.name}</Link>
                                <div className="sub header">
                                    <Link to={`/author/${item.authorId}`} className="story-author">{item.author}</Link>
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
                            <div className="sub header story-modified">Updated {item.modifiedDateDisplay}</div>
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
                {this.renderContent()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {    
    return{
        keyword: ownProps.keyword,
        results : Object.values(state.story.data),
        count : state.story.count
    }
}

export default connect(mapStateToProps, {search}) (SearchResult);