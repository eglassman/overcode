var updateProgress = function() {
  numDoneSolutions = allStacks.reduce(function(prev, stack) {
  // numDoneSolutions = getCurrentStack().reduce(function(prev, stack) {
    if (stack.category == 'done')
      return prev + stackCount(stack)
    else
      return prev
  }, 0);

  var prog_bar = d3.select(".progress").selectAll("div").data([numDoneSolutions])

  // UPDATE
  prog_bar.style("width", function(d) {
    if (numTotalSolutions == 0) return "0%";
    var pctDone = 100*d/numTotalSolutions;
    return pctDone + "%";
  });

  return numDoneSolutions;
};
