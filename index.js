var Signal = require('signals').Signal;
var traverse = require('traverse');

function localize(obj, lang) {
    if (Array.isArray(obj)) {
        return obj.map(function(e) {
            return localize(e, lang);
        });
    } else if (typeof obj === 'object' && lang in obj) {
        return obj[lang];
    } else {
        return obj;
    }
}

function localizeModel(obj, lang) {
    return traverse(obj).map(function(node) {
        return localize(node, lang);
    });
}

var SpookyModel = {

    onLanguageChanged: new Signal(),

    init: function(data, lang){
        if (lang){
            this.language = lang;
        }
        this.data = data;
    },

    setLanguage: function(lang){
        this.language = lang;
        this.onLanguageChanged.dispatch(lang);
    },

    getContent: function(modelID){
        if (!this.data) return null;
        var data = this.data[modelID];
        if (this.language){
            return localizeModel(data, this.language);
        } else {
            return data;
        }
    }

}

module.exports = SpookyModel;