var Signal = require('signals').Signal;
var traverse = require('traverse');
var _ = require('lodash/object');

function localize(obj, lang) {
    if (Array.isArray(obj)) {
        return obj.map(function(e) {
            return localize(e, lang);
        });
    } else if (typeof obj === 'object' && obj !== null && lang in obj) {
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

var contentCache = {};

var cacheContent = function(content, modelID){
    if (this.language){
        if (!contentCache[modelID]) contentCache[modelID] = {};
        contentCache[modelID][this.language] = content;
    } else {
        contentCache[modelID] = content;
    }
}

var getCachedContent = function(modelID){
    if (this.language){
        if (contentCache[modelID] && contentCache[modelID][this.language]){
            return contentCache[modelID][this.language];
        }
    } else {
        return this.data[modelID];
    }
    return null;
}

var SpookyModel = {

    onLanguageChanged: new Signal(),

    init: function(data, lang){
        if (lang){
            this.language = lang;
        }
        contentCache = {};
        this.data = data;
    },

    setLanguage: function(lang){
        this.language = lang;
        this.onLanguageChanged.dispatch(lang);
    },

    getContent: function(modelID){
        if (!this.data) return null;
        var checkCachedContent = getCachedContent.call(this, modelID);
        if (checkCachedContent){
            return checkCachedContent;
        }
        var content = null;
        if (this.language){
            content = localizeModel(this.data[modelID], this.language);
        } else {
            content = this.data[modelID];
        }
        cacheContent.call(this, content, modelID);
        return content;
    },

    get: function(path) {
        var content = localizeModel(this.data, this.language);
        return _.get(content, path, 'default');
    }

}

module.exports = SpookyModel;