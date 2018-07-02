import React, { Component } from 'react'
import config from './CityConfig';
import CitySelectorPYContent from './CitySelectorPYContent';
import Util from './Util';

import '../css/city-selector.css';
class CitySelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !Util.shallowEqual(nextProps, this.props) ||
            !Util.shallowEqual(this.state, nextState);
    }
    getCitysTabs() {
        let tabsTitle = [];
        config.TABS.forEach(function (tabName, tabIndex) {
            tabsTitle.push(
                <li onClick={() => { this.onTabsChange(tabIndex) }}
                    key={tabIndex + tabName}
                    className={this.state.tabIndex === tabIndex ? 'on' : ''}>
                    {tabName}
                </li>);
        }, this);
        return tabsTitle
    }
    onTabsChange(i) {
        if (this.state.tabIndex !== i) {
            this.setState({
                tabIndex: i
            });
            this.props.onTabsChange && this.props.onTabsChange(i, config.TABS[this.state.tabIndex]);
        }
    }
    getCitysList() {
        let selectedList = config.CITYS[config.TABS[this.state.tabIndex]];
        let citys = [];
        for (let key in selectedList) {
            citys.push(<CitySelectorPYContent onCityChange={this.props.onCityChange} className={key} key={key} pyFirst={key} pyValues={selectedList[key]} />)
        }
        return citys;
    }
    render() {
        return (
            <div className='dataviz-cityselector'>
                <ul>
                    {this.getCitysTabs()}
                </ul>
                <div className='city'>
                    {this.getCitysList()}
                </div>
            </div>
        )
    }
}
export default CitySelector;