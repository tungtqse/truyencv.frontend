import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {search} from '../../actions/chapterActs'
import '../../styles/story/story-show.css';
import {SKIP_DEFAULT, CHAPTER_TAKE_DEFAULT} from '../../core/constants';
import Paging from '../Common/Paging/Paging';

class GetStoryChapter extends React.Component {
    state = {id: this.props.id ,skip : SKIP_DEFAULT, take : CHAPTER_TAKE_DEFAULT}

    componentDidMount(){        
        this.props.search(this.state);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
            this.props.search(this.state);
        }        
    }

    pageOnClick = (skip) => {          
        var data = this.state;
        data.skip = skip;
        this.props.search(this.state);    
    }
   
    renderList = () => {
        if(!this.props.chapters){
            return;
        }
        
        return this.props.chapters.map((item) =>{
            return(
                <div className="column" key={item.id}>
                    <Link className="link" to={`/chapter/${this.state.id}/${item.numberChapter}`}>
                        {item.title}
                    </Link>
                </div>
            )
        });
        
    }

    render(){
        return(           
            <div>
                <div className="ui three column grid story-chapter">
                    {this.renderList()}
                </div>
                <br/>
                <Paging count={this.props.count} take={CHAPTER_TAKE_DEFAULT} pageOnClick={this.pageOnClick}/>   
            </div>
        )
    }

}

const mapStateToProps = (state) => {        
    return{
        chapters : Object.values(state.chapter.data),
        count : state.chapter.count
    }
}

export default connect(mapStateToProps, {search}) (GetStoryChapter);
