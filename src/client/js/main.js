
var twitterData = [];

var instaData = [];

//current index in array
var currentCount;
//next index in array
var nextCount;

var diff;

var count = 0;

//constant stream
//seperate into two arrays
nio.source.socketio(
'http://brand.nioinstances.com',
['count_by_network']
).pipe(nio.func(seperateStreams));

function seperateStreams(chunk){
  if(chunk.type === "twitter"){
    twitterData.push(chunk.count_per_sec);
    // console.log(twitterData);
  } else {
    instaData.push(chunk.count_per_sec);
    // console.log(instaData);
  }
}


var svgContainer = d3.select('#visualization').append('svg');

function compareDifference(){
  var comparison = twitterData.splice(0,2);
  console.log(comparison)
  nextCount = twitterData[1];
  currentCount = twitterData[2];
  diff = nextCount - currentCount;
  console.log(diff)
  // currentCount = nextCount;
  return Math.round(diff);
}

window.setTimeout(compareDifference, 5000)
window.setTimeout(makeCircles, 7000)

function makeCircles(){
  //if diff is positive, thus an increase
  if (diff > 0){
    count ++;
    $('#twitter').html(count);
    //make number of circles that is diff number
  } else { //if diff is negative, thus a decrease
    count --;
    $('#twitter').html(count);
    //remove circle of diff number
  }
}
