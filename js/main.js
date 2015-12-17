window.init = function(){

  var nio = require('niojs'),
      d3 = require('d3'),
      services = {},
      colors = { 'instagram': '#E7AC14', 'twitter': '#10347A', 'negative': 'darkred'};

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
          svg = d3.select('#'+key+'-bowl'),
          location = '#'+key+'-pulse';
      service.diff = getDifference(service.data, key);
      window.constructCircles.makeCircleArray(service.circles, service.diff, svg, service.color);
      $('#'+key+'-diff').html(service.diff);
      if (service.data.length > 0){
        window.constructCircles.generatePulse(location);
      }
    });
  }

  function getDifference(data, key){
    var comparison = data.splice(0,2),
        nextCount = comparison[1],
        currentCount = comparison[0],
        diff;
    diff = nextCount - currentCount;
    diff = Math.round(diff);
    $('#'+key+'-count').html(Math.round(currentCount));
    return diff;
  }

  setInterval(start, 1000);
};
