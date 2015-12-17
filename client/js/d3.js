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

  function makeLine(svg){
    svg.append('line')
      .attr('y1', 50)
      .attr('y2', 150)
      .attr('x1', 450)
      .attr('x2', 450)
      .attr('stroke', 'black')
      .attr('stroke-width', '2')
      .transition()
      .duration(1000);
  }

  return {
    makeCircleArray: makeCircleArray,
    makeLine: makeLine
  };
})();
