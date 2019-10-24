import React from 'react';
import ReactDOM from 'react-dom';
import {Fonts} from '../../core/constants';
   
class SettingChapter extends React.Component{

    onColorChange = (id) => {
        
        const {setting} = this.props;
        setting.idColor = id;           

        this.props.onChangeSetting(setting);
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

    renderColor = () => {
        const maxColor = 8;
        const {idColor} = this.props.setting;

        let colors = [];

        for (let index = 1; index <= maxColor; index++) {  
            const className = `circular-label ${idColor === index ? 'active' : ''} color-item-${index}`;    

            colors.push(
                <div key={index} className="item item-circular">
                    <span className={className} onClick={()=>this.onColorChange(index)}></span>
                </div>
            );
        }

        return(
            <div className="ui horizontal list">
                {colors}
            </div>
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
                                {this.renderColor()}  
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