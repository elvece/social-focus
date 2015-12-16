window.init = function(){

  var services = {},
      colors = { 'instagram': '#10347A', 'twitter': '#E7AC14', 'negative': 'red'};

  function start(){
    nio.source.socketio(
    'http://brand.nioinstances.com',
    ['count_by_network']
    ).pipe(nio.func(seperateStreams));
    // if (twitterData.length >= 2 && instaData.length >= 2){}
      setStreams();
  }

  function seperateStreams(chunk){
    if (!services[chunk.type]){
      services[chunk.type] = {data: [chunk.count_per_sec], color: colors[chunk.type] , diff: 0, circles: [] };
    } else {
      services[chunk.type].data.push(chunk.count_per_sec);
    }
  }

  function setStreams(){
    Object.keys(services).forEach(function(key){
      var service = services[key];
      service.diff = getDifference(service.data, service.diff);
      var svg = d3.select('#'+key+'-bowl');
      makeCircleArray(service.circles, service.diff, svg, service.color);
      $('#'+key).html('Difference in '+key+ ' counts: '+service.diff);
      // console.log(service);
    });
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
      for (var i = 0; i < diff; i++) {
        //needs to not produce 0
        var num = Math.floor(Math.random() * 10);
        data.push(num);
      }
    }
    if (diff < 0){
      var val = Math.abs(diff);
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
