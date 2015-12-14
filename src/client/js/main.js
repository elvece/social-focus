// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
});

nio.source.socketio(
'http://brand.nioinstances.com',
['count_by_time']
).pipe(nio.log());
