import React from 'react';
import ReactDOM from 'react-dom';
import {Fonts, COLOR_ITEMS} from '../../core/constants';
   
class SettingChapter extends React.Component{

    onColorChange = (id) => {
        
        const arr = COLOR_ITEMS;

        const item = arr.find(f=>f.id === id);

        if(item){
            const {setting} = this.props;
            setting.inColor = item.inColor;
            setting.outColor = item.outColor;
            setting.textColor = item.textColor;

            this.props.onChangeSetting(setting);
        }
    }

    onFontTypeChange = (event) => {
        const {setting} = this.props;
        setting.fontType = event.target.value;

        this.props.onChangeSetting(setting);
    }

    onFontSizeChange = (value) => {
        const {setting} = this.props;
        setting.fontSize = setting.fontSize + value;

        this.props.onChangeSetting(setting);
    }


    renderSelect = (data, name) => {  
        let select = [];

        data.forEach(item => {
            select.push(<option key={item.value} value={item.value}>{item.label}</option>);
        });

        return(
            <select name={name} className="popup-dropdown" onChange={this.onFontTypeChange} value={this.props.setting.fontType} >
                {select}
            </select>
        );
    }

    renderModal = () => {
        if(!this.props.show){
            return;
        }

        return ReactDOM.createPortal(
            <div className="ui dimmer modals visible active chapter-popup" onClick={this.props.onDismiss}>
                <div className="ui standard modal visible active" onClick={(e) => e.stopPropagation()}>
                    <div className="header">
                        <div className="ui grid">
                            <div className="five wide column chapter-setting-content">
                                <span className="popup-label">Màu nền</span>
                            </div>
                            <div className="eleven wide column list-color">
                                <div className="ui horizontal list">
                                    <div className="item">
                                        <span className="circular-label active color-item-1" onClick={()=>this.onColorChange(1)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-2" onClick={()=>this.onColorChange(2)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-3" onClick={()=>this.onColorChange(3)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-4" onClick={()=>this.onColorChange(4)}></span>
                                    </div>                                    
                                </div>
                                <div className="ui horizontal list">
                                    <div className="item">
                                        <span className="circular-label color-item-5" onClick={()=>this.onColorChange(5)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-6" onClick={()=>this.onColorChange(6)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-7" onClick={()=>this.onColorChange(7)}></span>
                                    </div>
                                    <div className="item">
                                        <span className="circular-label color-item-8" onClick={()=>this.onColorChange(8)}></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui grid">
                            <div className="five wide column chapter-setting-content">
                                <span className="popup-label">Phông chữ</span>                                
                            </div>
                            <div className="eleven wide column list-color">
                                {this.renderSelect(Fonts, "fonts")}
                            </div>
                        </div>
                        <div className="ui grid">
                            <div className="five wide column chapter-setting-content">
                                <span className="popup-label">Cỡ chữ</span>  
                            </div>
                            <div className="eleven wide column list-color">
                                <div id="popup-setting-fontsize">
                                    <button className="ui button left-button" onClick={() => this.onFontSizeChange(-1)}>-</button>
                                    <span className="popup-label">{this.props.setting.fontSize}</span>
                                    <button className="ui button right-button" onClick={() => this.onFontSizeChange(1)}>+</button>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>,
            document.querySelector('#modal')
        );
    }

    render(){
        
        return(
            <>
                {this.renderModal()}
            </>
        );
        
    }
}

export default SettingChapter;