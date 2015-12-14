
var data = [];

//constant stream
nio.source.socketio(
'http://brand.nioinstances.com',
['count_by_network']
).pipe(nio.pass(function(obj){
  if (data.length <= 3){
    data.push(obj);
  } else {
    data.splice(0,1);
    data.push(obj);
  }
})).pipe(nio.log(data));
