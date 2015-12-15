
var data = [
{ type: "twitter", count_per_sec: 37.5 },
{ type: "instagram", count_per_sec: 8.6 },
{ type: "twitter", count_per_sec: 50.5 },
{ type: "instagram", count_per_sec: 15.6 }];

//constant stream
// nio.source.socketio(
// 'http://brand.nioinstances.com',
// ['count_by_network']
// ).pipe(nio.pass(function(obj){
//   if (data.length <= 3){
//     data.push(obj);
//   } else {
//     data.splice(0,1);
//     data.push(obj);
//   }
// })).pipe(nio.log(data));


var svgContainer = d3.select('#visualization').append('svg');

//create boundaries
//make bubble appear based on size
