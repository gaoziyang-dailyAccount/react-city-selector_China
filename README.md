# react-city-selector_China
**A ReactJS component to render a city selector for Chinese Cities.**
## Installation

Install `react-city-selector` with [npm](https://www.npmjs.com/):

```
$ npm install react-city-selector
```
## Usage

Very easy to use. Just provide props with total amount of things that you want to display on the page.

```js
import React, { Component } from "react";
import ReactDOM from "react-dom";
import CitySelector from "react-city-selector";

ReactDom.render(
    <CitySelector onTabsChange={onTabsChange} onCityChange={onCityChange}/>,  document.getElementById("root")
)
```
## Params

Name | Type | Default | Description
--- | --- | --- | --- |
`onTabsChange` | Function | | cities’ first letter tabs change handler
`onCityChange` | Function | | selected city change handler. Receive selected name as arg

