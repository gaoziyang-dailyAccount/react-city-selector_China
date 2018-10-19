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
        };
        this.onTabsChange = this.onTabsChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !Util.shallowEqual(nextProps, this.props) ||
            !Util.shallowEqual(this.state, nextState);
    }
    getCitysTabs() {
        let tabsTitle = [];
        config.TABS.forEach(function (tabName, tabIndex) {
            tabsTitle.push(
                <li 
                    key={tabIndex + tabName}
                    data-index={tabIndex}
                    className={this.state.tabIndex === tabIndex ? 'on' : ''}>
                    {tabName}
                </li>);
        }, this);
        return tabsTitle
    }
    onTabsChange(event) {
        let tabIndex = event.target.dataset.index;
        tabIndex = tabIndex && parseInt(tabIndex);
       // let index = event.target && event
        if (tabIndex && this.state.tabIndex !== tabIndex) {
            this.setState({
                tabIndex
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
                <ul onClick={this.onTabsChange}>
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