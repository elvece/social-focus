
var twitterData = [];

var instaData = [];

//current index in array
var currentCount;
//next index in array
var nextCount;

var diff;

// var change = compareDifference();


function init(){
  console.log('init')
  nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_network']
  ).pipe(nio.func(seperateStreams));
  if (twitterData.length > 2){
    compareDifference();
    console.log(diff)
    $('#twitter').html(diff);
  }
}

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
    nextCount = comparison[1];
    currentCount = comparison[0];
    diff = nextCount - currentCount;
    console.log(diff)
    // currentCount = nextCount;
    return Math.round(diff);

}


function makeCircles(){
  //if diff is positive, thus an increase
  if (diff > 0){
    $('#twitter').html(diff);
    //make number of circles that is diff number
  } else { //if diff is negative, thus a decrease
    $('#twitter').html(diff);
    //remove circle of diff number
  }
}



window.setInterval(init, 1000);

