window.init = function(){

  var services = {},
      colors = { 'instagram': '#10347A', 'twitter': '#E7AC14', 'negative': 'darkred'};

  function start(){
    nio.source.socketio(
    'http://brand.nioinstances.com',
    ['count_by_network']
    ).pipe(nio.func(seperateStreams));
      setStreams();
  }

  function seperateStreams(chunk){
    if (!services[chunk.type]){
      services[chunk.type] = {
        data: [chunk.count_per_sec],
        color: colors[chunk.type] ,
        diff: 0,
        circles: []
      };
    } else {
      services[chunk.type].data.push(chunk.count_per_sec);
    }
  }

  function setStreams(){
    Object.keys(services).forEach(function(key){
      var service = services[key],
          svg = d3.select('#'+key+'-bowl');

      service.diff = getDifference(service.data);

      window.constructCircles.makeLine(svg);

      window.constructCircles.makeCircleArray(service.circles, service.diff, svg, service.color);

      $('#'+key).html('Difference in '+key+ ' counts: '+service.diff);
    });
  }

  function getDifference(data){
    var comparison = data.splice(0,2),
        nextCount = comparison[1],
        currentCount = comparison[0],
        diff;
    diff = nextCount - currentCount;
    diff = Math.round(diff);
    return diff;
  }

  setInterval(start, 1000);
};
