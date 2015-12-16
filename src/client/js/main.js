window.init = function(){

  var twitterData = [],
      instaData = [],
      twitterDiff,
      instaDiff,
      twitterSvg = d3.select('#twitter-bowl'),
      instaSvg = d3.select('#insta-bowl'),
      twitterColor = '#10347A',
      instaColor = '#E7AC14',
      twitterCircleArray = [],
      instaCircleArray = [];

  function start(){
    nio.source.socketio(
    'http://brand.nioinstances.com',
    ['count_by_network']
    ).pipe(nio.func(seperateStreams));
    if (twitterData.length >= 2 && instaData.length >= 2){
      setStreams();
    }
  }

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

    //not working correctly?
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
    if (diff >= 1) {
      console.log('greater or equal to 1: '+diff);
      for (var i = 0; i < diff; i++) {
        //needs to not produce 0
        var num = Math.floor(Math.random() * 10);
        data.push(num);
      }
    }
    if (diff < 0){
      var val = Math.abs(diff);
      console.log('less than 0: '+val);
      data.splice(0, val);
    }
    updateCircles(data, svg, color);
  }

  function updateCircles(data, svg, color){
    //compute data join, returns the update selection
    var circle = svg.selectAll('circle')
      .data(data);

    //add incoming circles
    circle.enter().append('circle')
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
      .attr('cy', 100)
      .attr('cx', function(d, i) { return i * 25 + 30; });
  }

  setInterval(start, 1000);
};
