var spookyModel = require('../index');

spookyModel.init( require('./model/boo'), 'en' );

var content = spookyModel.getContent('spook');
var content2 = spookyModel.get('spook.heading');

console.log('content: ', content, content2);