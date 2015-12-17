window.constructVisual = (function () {

  function loop(arr, num){
    for (var i = 0; i < num; i++) {
      //push any num, circle needs a data value
      arr.push(10);
    }
  }

  function makeCircleArrays(pos, neg, diff, svg, color, negColor){
    console.log('diff: '+diff)
    var n = neg.length,
        p = pos.length,
        val = Math.abs(diff),
        num1 = diff - n,
        num2 = val - p;

    if (diff >= 1) {
      if (n > 0){
        if(n - diff > 0){
          neg.splice(0, diff);
        }
        if (diff > n){
          neg.splice(0, n);
          loop(pos, num1);
        }
      } else {
        loop(pos, diff);
      }
    }
    if (diff < 0){
      if (p > 0){
        //case for manipulating differences only on positive side
        if(p - val > 0){
          pos.splice(0, val);
        }
        //case for if difference is greater than the total number of items in the positive side
        if (val > p){
          pos.splice(0, p);
          loop(neg, num2);
        }
      } else {
        loop(neg, diff);
      }
    }
    console.log('pos: '+pos)
    console.log('neg: '+neg)
    updatePositiveCircles(pos, svg, color);
    updateNegativeCircles(neg, svg, negColor);
  }

  //need to have one function for positive side and another for negative side

  function updatePositiveCircles(data, svg, color){
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
      .attr('cx', function(d, i) { return i * 10 + 30; });
  }

  function updateNegativeCircles(data, svg, color){
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
      .attr('cx', function(d, i) { return i * 10 - 30; });
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
    makeCircleArrays: makeCircleArrays,
    makeLine: makeLine
  };
})();
