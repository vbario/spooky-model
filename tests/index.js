var spookyModel = require('../index');

spookyModel.init( require('./model/boo'), 'en' );

var content = spookyModel.getContent('spook');

console.log('content: ', content);