import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {show} from '../../actions/storyActs'
import '../../styles/story/story-show.css';
import Tab from '../Common/Tab/Tab';
import Tabs from '../Common/Tab/Tabs';
import GetStoryChapter from './GetStoryChapter';
import {CHAPTER_READING} from '../../core/constants';

class GetStory extends React.Component{

    state = {chapter: 0};

    componentDidMount(){        
        const {id} = this.props.match.params;

        this.props.show(id);
        this.getChapterSetting(id);
    }

    getChapterSetting = (storyId) => {
        let chapters = localStorage.getItem(CHAPTER_READING);

        if(chapters != null){
            let list = JSON.parse(chapters);
            var item = list.find(f=>f.storyId === storyId);

            if(item != null){
                this.setState({chapter: item.chapter});
            }
        }
    }

    renderContent = () => {         
        if(!this.props.story){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }

        const {id, name, progressStatus, totalChapter, author} = this.props.story;

        return(
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="three wide column">
                        <img alt="storyCover" src="https://truyencv.com/images/poster/tong-chu-nha-ta-co-chut-yeu-poster-1568161616-220x330.jpg"/>
                    </div>
                    <div className="ten wide column">
                        <div className="header story-header">
                            <h3 className="ui center aligned left"> {name}</h3>
                            <Link to={`/story/edit/${id}`} data-tooltip="edit"><i className="fitted edit outline icon"/></Link>
                        </div>
                        <br/>
                        <div className="content">
                            <div className="ui grid story-info">
                                <div className="four wide column"><p>Tác giả : </p></div>
                                <div className="four wide column"><Link to="" className="link">{author}</Link></div>
                                <div className="eight wide column"></div>
                                <div className="four wide column"><p>Tình trạng : </p></div>
                                <div className="four wide column">{progressStatus}</div>
                                <div className="eight wide column"></div>
                                <div className="four wide column"><p>Chương : </p></div>
                                <div className="four wide column"><Link to={`/chapter/${id}/${totalChapter}`} className="link">{totalChapter}</Link></div>
                                <div className="eight wide column"></div>
                                <br/>
                                <div className="sixteen wide column">
                                    {this.state.chapter === 0 ?
                                        (<Link to={`/chapter/${id}/1`} className="ui button primary story-start-read">Đọc từ đầu</Link>)
                                        : (<Link to={`/chapter/${id}/${this.state.chapter}`} className="ui button primary story-cont-read">Xem tiếp</Link>)
                                    }                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="three wide column">
                        <img alt="storyRank"/>
                    </div>
                </div>                
            </div>
        );
    }

    renderTab = () => {
        if(!this.props.story){
            return(
                <div className="ui segment">
                    <div className="ui active loader"></div>                    
                </div>
            );
        }
        
        const {id, description} = this.props.story;

        return(
            <Tabs>
                <Tab label={'Giới thiệu'}>
                    <div className="story-description">
                        <p>{description}</p>
                    </div>
                </Tab>
                <Tab label={'Danh sách chương'}>
                    <GetStoryChapter id={id}/>
                </Tab>
                <Tab label={'Bình luận'}>
                    <p>Bình luận</p>
                </Tab>
            </Tabs>            
        );
    }

    render(){
        return(
            <div className="ui container">
                {this.renderContent()}
                {this.renderTab()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {        
    return{
        story : state.story.data
    }
}

export default connect(mapStateToProps, {show}) (GetStory);