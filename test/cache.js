var tape = require('tape');
var faucet = require('faucet');
var model = require('../');

tape('cache', function(t){

    t.plan(3);

    model.init( {home:{title:'Home', sub:'Welcome'}} );

    var contentA = model.getContent('home');
    var contentB = model.getContent('home');

    console.log('contentA: ', contentA);

    t.equal(contentA, contentB);

    // Language test

    model.init( { home: { title: {en:'Home', fr:'maison'}, sub:{en:'Welcome', fr:'Accueil'} } }, 'en' );

    contentA = model.getContent('home');
    contentB = model.getContent('home');

    console.log('contentA en: ', contentA);

    t.equal(contentA, contentB);

    model.setLanguage('fr');
    contentA = model.getContent('home');
    contentB = model.getContent('home');

    console.log('contentA fr: ', contentA);

    t.equal(contentA, contentB);

});