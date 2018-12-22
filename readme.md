# SEO Stats Utility

This utility helps to generate a JSON file which contains the total no. of elements in a web page and no. of elements which does not have given attribute or if attribute is empty.


## Usage
To use you can simply copy the code from src/main.js and paste in the console of chrome developer tools. It will print a table on console and generate a JSON file, which can be saved for reference later.

```js
/* Configuration object
*
* 'key' is element tag,
* 'value' could be empty string, an atrribute or an array of attributes. 
* Util will check for those elements on which this attribute is empty or not applied.
* If an attribute with its data is passed in object value, for example { 'meta': 'name=keywords' }, 
* then util will give count of no. of elements available in page with this attribute and data
*
*/
const tagsForSEO = {
    'h1':'',
    'img':['alt', 'title'], 
    'a':'href',
    'meta':[
        'name=keywords', 
        'name=author', 
        'name=description', 
        'name=robots'
    ],
};

/*
* This function generates SEO stats and creates a JSON file, first parameter will be configuration object i.e. which elements needs to be checked
* Second parameter is option, It is fileName with .json extension
*/
SeoStatsModule.generateSeoStats(tagsForSEO);

```

# Working Demo

To view a working demo clone this repo and execute below mentioned commands

```js
    yarn install
    npm run start
```
It will open a demo page on http://localhost:8080, open console you will see a table with result. You will also get a browser popup to save the JSON file. 
