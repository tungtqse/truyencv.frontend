import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {show} from '../../actions/chapterActs'
import '../../styles/chapter/chapter-show.css';
import '../../styles/chapter/chapter-popup.css';
import SettingChapter from './SettingChapter';
import {CHAPTER_SETTING, DEFAULT_CHAPTER_SETTING} from '../../core/constants';

class GetChapter extends React.Component{

    state = {show : false, outColor : DEFAULT_CHAPTER_SETTING.outColor, inColor: DEFAULT_CHAPTER_SETTING.inColor, fontSize : DEFAULT_CHAPTER_SETTING.fontSize, fontType : DEFAULT_CHAPTER_SETTING.fontType, textColor: DEFAULT_CHAPTER_SETTING.textColor }

    componentDidMount(){        
        const {storyId,numberChapter} = this.props.match.params;

        this.props.show(storyId,numberChapter);

        var chapterSetting = localStorage.getItem(CHAPTER_SETTING);
        
        if(chapterSetting != null){            
            const {outColor, inColor, fontSize, fontType, textColor} = JSON.parse(chapterSetting);
            this.setState({outColor, inColor, fontSize, fontType, textColor});           
        }       
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params !== nextProps.match.params) {
            const {storyId,numberChapter} = nextProps.match.params;            
            nextProps.show(storyId,numberChapter);
        }
    }

    onClickSetting = () => {
        if(!this.state.show){
            this.setState({show:true});
        }
    }

    onChangeSetting = (setting) => {
        this.setState({setting});
        localStorage.setItem(CHAPTER_SETTING, JSON.stringify(setting));
    }

    onDismiss = () => {        
        this.setState({show:false});
    }
    
    renderContent = () => {
        if(!this.props.chapter){
            return;
        }
        
        const {title, author, content, modifiedDate, nextNumberChapter, preNumberChapter, storyId, story} = this.props.chapter; 
       
        return(
            <div className="ui container">
                <div className="chapter-header">
                    <h2 className="ui header">{title}</h2>
                    <Link className="link" to={`/story/${storyId}`}><h5>{story}</h5></Link>
                </div>
                <div className="chapter-info">
                    <div className="ui horizontal list">
                        <div className="item">
                            <i className="user icon" />
                            <Link to="/" className="link">{author}</Link>
                        </div>
                        <div className="item">
                            <i className="file alternate outline icon" />
                            {`${this.countWord(content)} chữ`}
                        </div>
                        <div className="item">
                            <i className="clock outline icon" />
                            {new Date(modifiedDate).toLocaleString()}
                        </div>
                    </div>
                </div>
                {this.renderChapterSetting(storyId, nextNumberChapter,preNumberChapter)}
                <div className="chapter-content-info">
                    <div className="chapter-subheader">
                        <h4 className="ui header">{title}</h4>
                    </div>
                    <div className="chapter-content">
                        <div dangerouslySetInnerHTML={{__html: content}} />
                    </div>
                </div>
                {this.renderChapterSetting(storyId, nextNumberChapter,preNumberChapter)}
            </div>
        );
    }

    renderChapterSetting = (storyId, nextChapter, preChapter) => {
        let navis = [];

        if(preChapter !== -1){
            navis.push(<Link key={0} className="ui button chapter-button" data-tooltip="Chương trước" to={`/chapter/${storyId}/${preChapter}`}><i className="inverted fitted big long arrow alternate left icon"/></Link>)
        }

        navis.push(<button key={1} className="ui button chapter-button" data-tooltip="Cài đặt"><i className="inverted fitted big cog icon" onClick={this.onClickSetting}/></button>);

        if(nextChapter !== -1){
            navis.push(<Link key={2} className="ui button chapter-button" data-tooltip="Chương sau" to={`/chapter/${storyId}/${nextChapter}`}><i className="inverted fitted big long arrow alternate right icon"/></Link>);
        }

        return(<div className="chapter-setting">{navis}</div>);
    }

    countWord = (words) => {
        if(!words) return 0;

        return words.split(' ').length;
    }

    render(){
        return(
            <div className="chapter-background">
                {this.renderContent()}
                <SettingChapter show={this.state.show} onDismiss={this.onDismiss} onChangeSetting={this.onChangeSetting} setting={this.state}/>
            </div>            
        );
    }
}

const mapStateToProps = (state) => {        
    return{
        chapter : state.chapter.data
    }
}

export default connect(mapStateToProps, {show}) (GetChapter);