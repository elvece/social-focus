window.constructCircles = (function () {

  function makeCircleArray(data, diff, svg, color){
    if (diff >= 0.1) {
      for (var i = 0; i < diff; i++) {
        data.push(10);
      }
    }
    if (diff < 0){
      var val = Math.abs(diff);
      data.splice(0, val);
    }
    updateCircles(data, svg, color);
  }

  function updateCircles(data, svg, color){
    //compute data join
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

  function generatePulse(location){
    var d3 = require('d3'),
        y = d3.scale.ordinal().domain(d3.range(1)).rangePoints([0, 0]),
        svg = d3.select(location);
    svg.selectAll('circle')
      .data(y.domain())
      .enter()
      .append('circle')
      .attr('stroke-width', 20)
      .attr('r', 10)
      .attr('cx', 50)
      .attr('cy', 50)
      .each(pulse);

    function pulse() {
      var circle = svg.select('circle');
      (function repeat() {
        circle = circle.transition()
          .duration(2000)
          .attr('stroke-width', 20)
          .attr('r', 10)
          .transition()
          .duration(2000)
          .attr('stroke-width', 0.25)
          .attr('r', 50)
          .ease('sine')
          .each('end', repeat);
      })();
    }
  }
  return {
    makeCircleArray: makeCircleArray,
    generatePulse: generatePulse
  };
})();
