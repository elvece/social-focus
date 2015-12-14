
var nio = require('niojs');

console.log('hi')

nio.source.socketio(
'http://brand.nioinstances.com',
['count_by_time']
).pipe(nio.log('hello world'));
