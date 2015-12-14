
nio.source.socketio(
'http://brand.nioinstances.com',
['count_by_network']
).pipe(nio.log());

nio.source.generate({
   test_a: 1,
   test_b: 2
}).pipe(nio.pass(function(chunk) {
   console.log("My value is " + chunk.test_a);
}));
