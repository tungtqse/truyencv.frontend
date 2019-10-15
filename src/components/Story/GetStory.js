import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {search} from '../../actions/storyActs'
import '../../styles/story/story-list.css';

class GetStory extends React.Component{

    renderContent = () => {
        return(
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="three wide column">
                        <img alt="storyCover" src="https://truyencv.com/images/poster/tong-chu-nha-ta-co-chut-yeu-poster-1568161616-220x330.jpg"/>
                    </div>
                    <div className="ten wide column">
                        <div className="header">
                            <h3 className="ui center aligned left"> ABCD</h3>
                        </div>
                        <br/>
                        <div className="content">
                            <div className="ui grid">
                                <div class="four wide column"><p>Tác giả: </p></div>
                                <div class="four wide column">a</div>
                                <div class="eight wide column"></div>
                                <div class="four wide column"><p>Tình trạng: </p></div>
                                <div class="four wide column">a</div>
                                <div class="eight wide column"></div>
                                <div class="four wide column"><p>Chương: </p></div>
                                <div class="four wide column">a</div>
                                <div class="eight wide column"></div>
                                <br/>
                                <div class="sixteen wide column">
                                    <button className="ui button primary story-start-read">Đọc từ đầu</button>
                                    <button className="ui button primary story-cont-read">Xem tiếp</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="three wide column">
                        <img alt="storyRank"/>
                    </div>
                </div>                
            </div>
        );
    }

    renderTab(){
        return(
            <div>
                <div className="ui top attached tabular menu">
                    <div class="item active" data-tab="first">First</div>
                    <div class="item" data-tab="second">Second</div>
                    <div class="item" data-tab="third">Third</div>                
                </div>
                <div class="ui bottom attached tab segment active" data-tab="first">
                    First
                </div>
                <div class="ui bottom attached tab segment" data-tab="second">
                    Second
                </div>
                <div class="ui bottom attached tab segment" data-tab="third">
                    Third
                </div>
            </div>            
        );
    }

    render(){
        return(
            <div>
                {this.renderContent()}
                {this.renderTab()}
            </div>
        );
    }
}

export default GetStory;