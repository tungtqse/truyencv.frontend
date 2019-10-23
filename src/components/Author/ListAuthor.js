import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {search} from '../../actions/authorActs'
import '../../styles/author/author-list.css';
import {SKIP_DEFAULT, TAKE_DEFAULT, MAX_PAGE} from '../../core/constants';
import Paging from '../Common/Paging/Paging';

class ListAuthor extends React.Component{

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
        if(!this.props.authors){
            return;
        }
        
        return this.props.authors.map((item) => {
            return(
                <tr key={item.id}>
                   <td>
                        <h4 className="ui image header">
                            <img className="ui mini rounded image" alt="img" src="https://semantic-ui.com/images/avatar2/small/lena.png"/>
                            <div className="content">
                                <Link to={`/author/${item.id}`} className="header author-name">{item.name}</Link>                                                   
                            </div>
                        </h4>
                   </td>                                
                </tr>                
            )
        });
    }    

    render(){
        return(
            <div className="ui container" id="author-page">
                <div className="ui header">
                    <h3 className="common-header">Danh sách tác giả</h3>
                </div>
                <table className="ui single line table">
                    <thead></thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>    
                <Paging count={this.props.count} take={TAKE_DEFAULT} pageOnClick={this.pageOnClick}/>  
                <Link to="/author/new/" className="ui button common-button float-right" data-tooltip="Create Author"><i className="fitted plus icon"/></Link>          
            </div>
        )
    }
}

const mapStateToProps = (state) => {    
    return{
        authors : Object.values(state.author.data),
        count : state.author.count
    }
}

export default connect(mapStateToProps, {search}) (ListAuthor);