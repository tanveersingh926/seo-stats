// console save method to generate the JSON File
(function(console){

    console.save = function(data, filename){

        if(!data) {
            console.error('Console.save: No data');
            return;
        }

        if(!filename) filename = 'console.json';

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4);
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a');

        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
    };

})(console);


// Module pattern for the SEO stats util.
const SeoStatsModule = (()=> {
    
    let _seoReport = {}; // Object to hold final JSON which will be saved in the file
    let _elemsToFix = 0; // element count which are not found implementing attributes

    // Styles for the console message.
    let _consoleMsgStyle = {
        message: 'font-size: 14px; font-weight:bold; color: #05c705; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);',
        warning: 'font-size: 16px; font-weight:bold; color: #e47d00; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);',
        error: [
            'font-size: 20px;  color: #c70505; text-shadow: 1px 1px 0 rgba(0,0,0,0.1);', 
            'font-weight:bold'
        ]
    };
    
    // This method use querySelectorAll method and returns the count of the element as per configuration
    const retrieveElementsCount = (tagName, attr, tagReport) => {
        let noOfElems = 0;
        let totalNoOfElems = 0;
        let attrStatus = 'without';

        let domQueryString = `${tagName}:not([${attr}]), ${tagName}[${attr}=""]`;

        if (attr.indexOf('=') > -1) {
            domQueryString = `${tagName}[${attr}]`;
            attrStatus = 'with';
        }

        totalNoOfElems = document.querySelectorAll(tagName).length;
        tagReport.totalElements = totalNoOfElems;
    
        if(attr.trim().length) {
            noOfElems = document.querySelectorAll(domQueryString).length;
            _elemsToFix += noOfElems;
            tagReport[attrStatus + attr.charAt().toUpperCase() + attr.substr(1)] = noOfElems;
        }
        
        _seoReport[tagName] = tagReport;
    };


    // This functions checks for the attr type if it is an array it executes retrieveElementsCount the according to that
    const retrieveElementsByAttrType = (tagName, attrs='') => {
        var tagReport = {};
        if(attrs instanceof Array && attrs.length >= 1) {
            attrs.forEach(attr => {
                retrieveElementsCount(tagName, attr, tagReport);
            });
        } else if (typeof(attrs) === 'string') {
            retrieveElementsCount(tagName, attrs, tagReport);
        } else {
            console.error('Configuration Object is wrong. Please pass proper configuration object')
        }

    };

    // This function takes an arguement of type: object, which are basically tags and their values and outputs a json file with SEO stats 
    const generateSeoStats = (tagsForSEO, jsonFileName="seoStats.json") => {
        for (const [tagName, attrs] of Object.entries(tagsForSEO)) {
            retrieveElementsByAttrType(tagName, attrs);
        }

        console.table(_seoReport);

        if (_elemsToFix && _elemsToFix <= 2) {
            console.log(`%cYou can ignore it for now. But don't forget to fix this.`, _consoleMsgStyle.message);
        }

        if (_elemsToFix > 2 && _elemsToFix <= 5) {
            console.log(`%cThis looks bad. You should fix it now.`, _consoleMsgStyle.warning);
        }
           
        if (_elemsToFix >= 6) {
            console.log(`%cStop\nfix this first or %c\nI will hunt you down.`, _consoleMsgStyle.error[0], _consoleMsgStyle.error[0] + _consoleMsgStyle.error[1]);
        }

        console.save(_seoReport, jsonFileName);
    };

    return {
        generateSeoStats
    };

})();

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
    'h1':[],
    'img':['alt', 'title'], 
    'a':'href',
    'meta':['name', 'name=keywords', 'name=author', 'name=description', 'name=robots'],
};

/*
* This function generates SEO stats and creates a JSON file, first parameter will be configuration object i.e. which elements needs to be checked
* Second parameter is option, It is fileName with .json extension
*/
SeoStatsModule.generateSeoStats(tagsForSEO);
