import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {search} from '../../actions/storyActs'
import '../../styles/story/story-list.css';
import {SKIP_DEFAULT, TAKE_DEFAULT, MAX_PAGE} from '../../core/constants';

class ListStory extends React.Component {   

    state = {keyword: '' ,skip : SKIP_DEFAULT, take: TAKE_DEFAULT, paging: {currentPage: 0, nextPage: 1, previousPage: 0}}

    componentDidMount(){
        this.props.search(this.state);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
            this.props.search(this.state);
        }
        
    }

    pageOnClick = (page) => {          
        let {currentPage, nextPage, previousPage} = this.state.paging;

        if(page !== currentPage){
            currentPage = page;
            nextPage = (page !== this.props.count) ? page + 1 : page;
            previousPage = (page !== 0) ? page - 1 : 0;
            let skipNew = page * TAKE_DEFAULT;

            this.setState({
                skip: skipNew,
                paging :{currentPage : currentPage, nextPage:nextPage, previousPage:previousPage}
            });
        }        
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

    renderPagination = () => {        

        let page = [];

        if(!this.props.count){
            return;
        } 

        var totalPage = Math.ceil(this.props.count / this.state.take);

        if(this.state.paging.currentPage !== 0){
            page.push(<span value="0" title="First Page" type="firstItem" className="item"> « </span>);
            page.push(<span value={this.state.paging.previousPage} title="Previous Page" type="prevItem" className="item"> ⟨ </span>);
        }
       
        for (let index = 0; index < totalPage; index++) {

            if(index === MAX_PAGE){               
                break;
            }
          
            page.push(<span value={index} type="pageItem" className={(index === this.state.paging.currentPage) ? "active item" : "item"} onClick={() => this.pageOnClick(index)}> {index + 1} </span>);       
        }       

        if(this.state.paging.currentPage < totalPage){
            page.push(<span value={this.state.paging.nextPage} title="Next Page" type="nextItem" className="item"> ⟩ </span>);
            page.push(<span value={totalPage} title="Last Page" type="lastItem" className="item"> » </span>);
        }        

        return page;
    }

    render(){
        return(
            <div>
                <table className="ui single line table">
                    <thead></thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>    
                <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu" id="story-pagination">
                    {this.renderPagination()}
                </div>            
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