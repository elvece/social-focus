
// *** GLOBALS *** //
var twitterData = [];
var instaData = [];
var currentCount;
var nextCount;
var diff;
var svg = d3.select('svg');

//initaliztion of stream and action functions
window.setInterval(init, 1000);

function init(){
  nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_network']
  ).pipe(nio.func(seperateStreams));
  if (twitterData.length > 2){
    getDifference();
    makeCircleArray();
    $('#twitter').html('Difference in Twitter counts: '+diff);
    $('#insta').html('Difference in Instagram counts: '+diff);
  }
}

// *** HELPER FUNCTIONS ** //
function seperateStreams(chunk){
  if(chunk.type === "twitter"){
    twitterData.push(chunk.count_per_sec);
  } else {
    instaData.push(chunk.count_per_sec);
  }
}

function getDifference(data){
  var comparison = data.splice(0,2);
  nextCount = comparison[1];
  currentCount = comparison[0];
  diff = nextCount - currentCount;
  diff = Math.round(diff);
}

//with sample values to start
var circleArray = [10, 20, 30];

function makeCircleArray(){
  //if diff is positive, thus an increase
  if (diff >= 1) {
    console.log('greater or equal to 1: '+diff)
    //adds a number for circle to array
    for (var i = 0; i < diff; i++) {
      //needs to not produce 0
      var num = Math.floor(Math.random() * 10);
      circleArray.push(num);
      console.log('positive: '+circleArray)
    }
  }
  //if diff is negative, thus a decrease
  if (diff < 0){
    var val = Math.abs(diff);
    //whatever diff is, splice off that many items from array
    console.log('less than 0: '+val)
    circleArray.splice(0, val);
    console.log('negative: '+circleArray)
  }
  updateCircles(circleArray);
}

function updateCircles(data){
  //compute data join, returns the update selection
  var circle = svg.selectAll('circle')
    .data(data);

  //add incoming circles
  circle.enter().append('circle')
    // .attr('r', function(d) { return Math.sqrt(d); })
    .attr('cy', -10)
    .attr('r', 10);

  //remove old
  circle
    .exit()
    .transition()
    .delay(function(d, i) {
      return i * 100;
    })
    .duration(1000)
    .attr('cy',-10)
    .remove();

  //set attributes
  circle
    .transition()
    .delay(function(d, i) {
      return i * 100;
    })
    .duration(1000)
    .attr('cy', 60)
    .attr('cx', function(d, i) { return i * 25 + 30; });
}



