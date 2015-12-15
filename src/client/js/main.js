
var twitterData = [
  { type: "twitter", count_per_sec: 46 },
  { type: "twitter", count_per_sec: 41.6 },
  { type: "twitter", count_per_sec: 45 },
  { type: "twitter", count_per_sec: 44 }
];

var instaData = [
  { type: "instagram", count_per_sec: 11.58 },
  { type: "instagram", count_per_sec: 11.58 },
  { type: "instagram", count_per_sec: 12.03 },
  { type: "instagram", count_per_sec: 13.05 }
];

//current index in array
var currentCount;
//next index in array
var nextCount;

//constant stream
//seperate into two arrays
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

function seperateStreams(chunk){
  if(chunk.type = "twitter"){
    twitterData.push(chunk.count_per_sec);
  } else {
    instaData.push(chunk.count_per_sec);
  }
}

var svgContainer = d3.select('#visualization').append('svg');

function compareDifference(){
  var diff = nextCount - currentCount;
  currentCount = nextCount;
  return Math.round(diff);
}

console.log(compareDifference());

function makeCircles(){
  //if diff is positive, thus an increase
  if (diff > 0){
    //make number of circles that is diff number
  } else { //if diff is negative, thus a decrease
    //remove circle of diff number
  }
}
