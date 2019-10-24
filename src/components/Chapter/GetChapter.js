import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {show} from '../../actions/chapterActs'
import '../../styles/chapter/chapter-show.css';
import '../../styles/chapter/chapter-popup.css';
import SettingChapter from './SettingChapter';
import {CHAPTER_SETTING, DEFAULT_CHAPTER_SETTING, COLOR_ITEMS} from '../../core/constants';

class GetChapter extends React.Component{

    state = {show : false, fontSize : DEFAULT_CHAPTER_SETTING.fontSize, fontType : DEFAULT_CHAPTER_SETTING.fontType, idColor : 1 }

    componentDidMount(){        
        const {storyId,numberChapter} = this.props.match.params;

        this.props.show(storyId,numberChapter);

        var chapterSetting = localStorage.getItem(CHAPTER_SETTING);
        
        if(chapterSetting != null){            
            const {fontSize, fontType, idColor} = JSON.parse(chapterSetting);
            this.setState({fontSize, fontType, idColor});           
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
        
        const {fontSize, fontType, idColor} = setting;
        this.setState({fontSize, fontType, idColor});

        localStorage.removeItem(CHAPTER_SETTING);
        localStorage.setItem(CHAPTER_SETTING, JSON.stringify(setting));
    }

    onDismiss = () => {        
        this.setState({show:false});
    }

    getColorSetting = () => {
        const {idColor} = this.state;

        const item = COLOR_ITEMS.find(f=>f.id === idColor);

        if(item != null){
            return item;
        }

        return null;
    }
    
    renderContent = () => {
        if(!this.props.chapter){
            return;
        }
        
        const {title, author, content, modifiedDate, nextNumberChapter, preNumberChapter, storyId, story} = this.props.chapter; 

        const setting = this.getColorSetting();
        const {fontSize, fontType} = this.state;
       
        return(
            <div className="chapter-background" style={{backgroundColor: setting.outColor }}>
                <div className="ui container">
                    <div className="chapter-header">
                        <h2 className="ui header" style={{color: setting.titleColor}}>{title}</h2>
                        <Link className="link" to={`/story/${storyId}`}><h5>{story}</h5></Link>
                    </div>
                    <div className="chapter-info">
                        <div className="ui horizontal list">
                            <div className="item">
                                <i className="user icon" />
                                <Link to="/" className="link">{author}</Link>
                            </div>
                            <div className="item" style={{color: setting.titleColor}}>
                                <i className="file alternate outline icon" />
                                {`${this.countWord(content)} chữ`}
                            </div>
                            <div className="item" style={{color: setting.titleColor}}>
                                <i className="clock outline icon" />
                                {new Date(modifiedDate).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    {this.renderChapterSetting(storyId, nextNumberChapter,preNumberChapter)}
                    <div className="chapter-content-info" style={{backgroundColor: setting.inColor }}>
                        <div className="chapter-subheader">
                            <h4 className="ui header" style={{color: setting.titleColor}}>{title}</h4>
                        </div>
                        <div className="chapter-content" style={{fontFamily: fontType, fontSize: fontSize, color: setting.textColor}}>
                            <div dangerouslySetInnerHTML={{__html: content}} />
                        </div>
                    </div>
                    {this.renderChapterSetting(storyId, nextNumberChapter,preNumberChapter)}
                </div>
                <SettingChapter show={this.state.show} onDismiss={this.onDismiss} onChangeSetting={this.onChangeSetting} setting={this.state}/>
            </div>
        );
    }

    renderChapterSetting = (storyId, nextChapter, preChapter) => {
        let navis = [];

        if(preChapter !== -1){
            navis.push(<Link key={0} className="ui button chapter-button" data-tooltip="Chương trước" to={`/chapter/${storyId}/${preChapter}`}><i className="inverted fitted big long arrow alternate left icon"/></Link>)
        }

        navis.push(<button key={1} className="ui button chapter-button" data-tooltip="Cài đặt" onClick={this.onClickSetting}><i className="inverted fitted big cog icon"/></button>);

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
            <>
                {this.renderContent()}                
            </>            
        );
    }
}

const mapStateToProps = (state) => {        
    return{
        chapter : state.chapter.data
    }
}

export default connect(mapStateToProps, {show}) (GetChapter);