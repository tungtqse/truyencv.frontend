import React from 'react';
import {show} from '../../actions/authorActs';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../../styles/author/author-show.css';
import '../../styles/story/story-list.css';

class GetAuthor extends React.Component{

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.show(id);        
    }

    renderContent(){

        if(!this.props.author){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }    
        
        const {id, name, stories} = this.props.author;
        
        return(
            <div className="author-info">
                <div className="ui header author-header">
                    <h4 className="author-header">Tác giả: {name}</h4>
                    <Link to={`/author/edit/${id}`} data-tooltip="edit"><i className="fitted edit outline icon"/></Link>
                </div>
                <table className="ui single line table">
                    <thead></thead>
                    <tbody>
                        {this.renderListStory(stories)}
                    </tbody>
                </table>  
            </div>
        );
    }

    renderListStory = (stories) => {

        if(!stories){
            return;
        }

        return stories.map(item => {
            return(
                <tr key={item.id}>
                    <td>
                        <h4 className="ui image header">
                            <img className="ui mini rounded image" alt="img" src="https://semantic-ui.com/images/avatar2/small/lena.png"/>
                            <div className="content">
                                <Link to={`/story/${item.id}`} className="header link story-name">{item.name}</Link>                               
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
                        </div>                        
                   </td>
                   <td>
                        <div className="content">                         
                            <div className="story-modified">Updated {item.modifiedDateDisplay}</div>
                        </div>                        
                   </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div className="ui container">
               {this.renderContent()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return{
        author : state.author.data
    }
}

export default connect(mapStateToProps, {show}) (GetAuthor);
