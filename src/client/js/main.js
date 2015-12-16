
///// *** GLOBALS *** /////
var twitterData = [],
    instaData = [],
    twitterDiff,
    instaDiff,
    twitterSvg = d3.select('#twitter-bowl'),
    instaSvg = d3.select('#insta-bowl'),
    twitterColor = '#10347A',
    instaColor = '#E7AC14',
    //with sample values to start
    twitterCircleArray = [10, 20, 30],
    instaCircleArray = [10, 20, 30];

///// *** INITALIZATION ** /////
window.setInterval(init, 1000);

function init(){
  nio.source.socketio(
  'http://brand.nioinstances.com',
  ['count_by_network']
  ).pipe(nio.func(seperateStreams));
  if (twitterData.length >= 2 && instaData.length >= 2){
    setStreams();
  }
}

///// *** HELPER FUNCTIONS ** /////
function seperateStreams(chunk){
  if(chunk.type === "twitter"){
    twitterData.push(chunk.count_per_sec);
  } else {
    instaData.push(chunk.count_per_sec);
  }
}

function setStreams(){
  twitterDiff = getDifference(twitterData, twitterDiff);
  instaDiff = getDifference(instaData, instaDiff);
  makeCircleArray(twitterData, twitterDiff, twitterSvg, twitterColor);
  makeCircleArray(instaData, instaDiff, instaSvg, instaColor);
  $('#twitter').html('Difference in Twitter counts: '+twitterDiff);
  $('#insta').html('Difference in Instagram counts: '+instaDiff);
}

function getDifference(data, diff){
  var comparison = data.splice(0,2),
      nextCount = comparison[1],
      currentCount = comparison[0];
  diff = nextCount - currentCount;
  diff = Math.round(diff);
  return diff;
}

function makeCircleArray(data, diff, svg, color){
  //if diff is positive, thus an increase
  if (diff >= 1) {
    console.log('greater or equal to 1: '+diff);
    //adds a number for circle to array
    for (var i = 0; i < diff; i++) {
      //needs to not produce 0
      var num = Math.floor(Math.random() * 10);
      data.push(num);
      console.log('positive: '+data);
    }
  }
  //if diff is negative, thus a decrease
  if (diff < 0){
    var val = Math.abs(diff);
    //whatever diff is, splice off that many items from array
    console.log('less than 0: '+val);
    data.splice(0, val);
    console.log('negative: '+data);
  }
  updateCircles(data, svg, color);
}

function updateCircles(data, svg, color){
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
    .attr('fill', color)
    .attr('cy', 60)
    .attr('cx', function(d, i) { return i * 25 + 30; });
}



