// var addOutputChoice = function(output) {
//   $('#output-select').append($('<option>', { value: output, text: output }));
// }

var initializeStacks = function() {
  // allStacks = [];
  allSolutions.forEach(function(solution, i) {
    // console.log('solution id ' + i + ' has output ' + solution.output);
    solution.phraseIDs.sort(d3.ascending);
    solution.variableIDs.sort(d3.ascending);
    var stack = { id: i+1,
                  solutions: [solution],
                  phraseIDs: solution.phraseIDs.slice(),
                  variableIDs: solution.variableIDs.slice(),
                  lines: solution.lines.slice(),
                  merged: false,
                  category: 'unread',
                  originalStacks: [i+1], //what is this?
                  correct: solution.correct
                };
    allStacks.push(stack);
    // if (solution.output in stacksByOutput) {
    //   stacksByOutput[solution.output].push(stack);
    // } else {
    //   stacksByOutput[solution.output] = [stack]
    //   addOutputChoice(solution.output)
    // }
  });
  // console.log('stacksByOutput:', stacksByOutput);
}

var stackCopy = function(stack) {
  return { id: stack.id,
          solutions: stack.solutions.slice(),
          phraseIDs: stack.phraseIDs.slice(),
          variableIDs: stack.variableIDs.slice(),
          lines: stack.lines.slice(),
          merged: stack.merged,
          category: stack.category,
          correct: stack.correct
        };
};

// var getCurrentStack = function() {
//   var current_output = $('#output-select').val()
//   current_stack = stacksByOutput[current_output]
//   if (current_stack === undefined) {
//     var everything = []
//     $.each(stacksByOutput, function(out) {
//       everything = everything.concat(stacksByOutput[out])
//     });
//     return everything
//   }
//   return current_stack !== undefined ? current_stack : [];
// }

var generateRewriteRule = function(downStack,upStack) {
  var diff1, diff2;
  //console.log(downStack.lines)
  //console.log(upStack.lines)

  //initialized some sets for holding phraseIDs
  //var upStackLines = new Set(upStack.lines);
  //var downStackLines = new Set(downStack.lines);

    diff1 = _.difference(upStack.phraseIDs,downStack.phraseIDs);
    diff2 = _.difference(downStack.phraseIDs,upStack.phraseIDs);
    if ((diff1.length == 1) && (diff2.length == 1)) {
        //we have a potential rewrite rule!
        //console.log('potential rewrite rule:',diff1,diff2);
        //console.log(_.where(allPhrases,{id:diff1[0]})[0].code);
        //console.log(_.where(allPhrases,{id:diff2[0]})[0].code); 
        $("#repl-input").val(_.where(allPhrases,{id:diff1[0]})[0].code);
        $("#pattern-input").val(_.where(allPhrases,{id:diff2[0]})[0].code);
    } else {
        console.log('cannot yet predict rewrite rule');
    };
};

var stackCount = function(stack) {
  return stack.solutions.reduce(function(prev, solution) {
    //console.log('solution.correct',solution.correct,solution.correct=='true')
    return prev + solution.count;
  }, 0);
};
var stackCorrectCount = function(stack) {
  return stack.solutions.reduce(function(prev, solution) {
    if (solution.correct){
      return prev + solution.count;
    } else {
      return prev;
    }
  }, 0);
};

var stackMembers = function(stack) {
  return stack.solutions.reduce(function(prev, solution) {
      // console.log(solution.members)
      //console.log(solution.members.split(','))
    return prev.concat(solution.members); //string.split(',')
  }, []);
};

var fetchExamplePyFiles = function(solutionIDs,divToAppendTo) {
  // baseDir is defined in main.js
  if (baseDir === undefined) return;

  var dataSource = baseDir + '/data/'
  var maxSolExamples = Math.min(solutionIDs.length,100);
  for (i = 0; i < maxSolExamples; i++) {
    solFileName = solutionIDs[i] + ".py";
    //get solFileName
    d3.text(dataSource + solFileName, function(text) {
      var data = d3.csv.parseRows(text).map(function(row) {
        return row.map(function(value) {
          return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        });
      });
      var codeEx = "<pre><code><span>";
      codeEx+= data.join("</span><br><span>");
      codeEx += "</span></code></pre>";
      divToAppendTo.append(codeEx);
    });
  }
}

var generateCode = function(lines, referencePhraseIDs) {
  code = "<pre><code>";
  lines.forEach(function(line, i) {
    var phrase = mergedPhrases.filter(function(p) {return p.id == line.phraseID;})[0];
    var codeIndent = Array(line.indent).join(" ");
    var codeLine;
    if (previewing && rewriting) {
      codeLine = phrase.previewCode;
    } else {
      codeLine = phrase.code;
    }

    var suffix_re = /___(\d+)/g
    var subscripted_line = codeLine.replace(suffix_re, function(match, digit) {
      return "<sub>" + digit + "</sub>";
    });

    if (referencePhraseIDs.indexOf(line.phraseID) == -1)
      code += codeIndent + subscripted_line + "<br>";
    else
      code += codeIndent + "<span class='dimmed'>" + subscripted_line + "</span>" + "<br>";
  });
  code += "</code></pre>";
  return code;
};

var emptyStacks = function() {
  d3.select("#grid-colA").selectAll("div.stack")
      .data([], function(d) {return d.id;})
      .exit().remove();
  d3.select("#grid-colB").selectAll("div.stack")
      .data([], function(d) {return d.id;})
      .exit().remove();
};

var drawStacks = function() {
  filteredStacks.sort(function(a, b) {
    if (a.id == "miscellaneous" && miscBottom)
      return 1;
    else if (b.id == "miscellaneous" && miscBottom)
      return -1;
    else
      return d3.descending(stackCount(a), stackCount(b));
  });

  var referenceStacks = [], referencePhraseIDs = [];
  if (filteredStacks.length > 0) {
    var firstStack = filteredStacks[0];
    referencePhraseIDs = firstStack.lines.map(function(line) {return line.phraseID;});
    referenceStacks = [firstStack];
  }

  drawStackColumn("#grid-colA", referenceStacks, referencePhraseIDs, true);
  drawStackColumn("#grid-colB", filteredStacks.slice(1), referencePhraseIDs, false);

  if (filterPhrases.length == 0) {
    $("#num-filtered-stacks").hide();
    $("#num-filtered-correct-stacks").hide();
    $("#num-filtered-solutions").hide();
    $("#num-filtered-correct-solutions").hide();
  } else {
    $("#num-filtered-stacks").show();
    $("#num-filtered-correct-stacks").show();
    $("#num-filtered-solutions").show();
    $("#num-filtered-correct-solutions").show();
  }
  var numSolutionsData = filterPhrases.length > 0 ?
  [filteredStacks.reduce(function(prev, stack) {
    return prev + stackCount(stack);
  }, 0)] : [];
  var numTotalSolutionsData = [numTotalSolutions];
  
  var numCorrectSolutionsData = filterPhrases.length > 0 ?
  [filteredStacks.reduce(function(prev, stack) {
    return prev + stackCorrectCount(stack);
  }, 0)] : [];
  var numTotalCorrectSolutionsData = [numTotalCorrectSolutions];
  
  var numStacksData = filterPhrases.length > 0 ? [filteredStacks.length] : [];
  var numTotalStacksData = [mergedStacks.length];

  var numCorrectStacksData = filterPhrases.length > 0 ? [filteredStacks.reduce(function(prev, stack) {
    if (stack.correct){
      return prev + 1;
    } else {
      return prev;
    }
  }, 0)] : [];
  var numTotalCorrectStacksData = [mergedStacks.reduce(function(prev, stack) {
    if (stack.correct){
      return prev + 1;
    } else {
      return prev;
    }
  }, 0)];

  var numSolutionsSpan = d3.select("#num-solutions").selectAll("span")
      .data(numSolutionsData);
  numSolutionsSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numSolutionsSpan.enter().append("span")
      .text(function(d) { return d; });
  numSolutionsSpan.exit().remove();

  var numTotalSolutionsSpan = d3.select("#total-solutions").selectAll("span")
      .data(numTotalSolutionsData);
  numTotalSolutionsSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numTotalSolutionsSpan.enter().append("span")
      .text(function(d) { return d; });
  numTotalSolutionsSpan.exit().remove();

  var numCorrectSolutionsSpan = d3.select("#num-correct-solutions").selectAll("span")
      .data(numCorrectSolutionsData);
  numCorrectSolutionsSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numCorrectSolutionsSpan.enter().append("span")
      .text(function(d) { return d; });
  numCorrectSolutionsSpan.exit().remove();

  var numTotalCorrectSolutionsSpan = d3.select("#total-correct-solutions").selectAll("span")
      .data(numTotalCorrectSolutionsData);
  numTotalCorrectSolutionsSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numTotalCorrectSolutionsSpan.enter().append("span")
      .text(function(d) { return d; });
  numTotalCorrectSolutionsSpan.exit().remove();

  var numStacksSpan = d3.select("#num-stacks").selectAll("span")
      .data(numStacksData);
  numStacksSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numStacksSpan.enter().append("span")
      .text(function(d) { return d; });
  numStacksSpan.exit().remove();

  var numTotalStacksSpan = d3.select("#total-stacks").selectAll("span")
      .data(numTotalStacksData);
  numTotalStacksSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numTotalStacksSpan.enter().append("span")
      .text(function(d) { return d; });
  numTotalStacksSpan.exit().remove();

  var numCorrectStacksSpan = d3.select("#num-correct-stacks").selectAll("span")
      .data(numCorrectStacksData);
  numCorrectStacksSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numCorrectStacksSpan.enter().append("span")
      .text(function(d) { return d; });
  numCorrectStacksSpan.exit().remove();

  var numTotalCorrectStacksSpan = d3.select("#total-correct-stacks").selectAll("span")
      .data(numTotalCorrectStacksData);
  numTotalCorrectStacksSpan
      .style("font-weight", "bold")
      .style("color", "#c7254e")
      .transition().duration(1000)
      .tween("text", interpolateNumber)
      .transition().duration(1000)
      .style("color", "black")
      .style("font-weight", "normal");
  numTotalCorrectStacksSpan.enter().append("span")
      .text(function(d) { return d; });
  numTotalCorrectStacksSpan.exit().remove();
};

var interpolateNumber = function(d) {
  var i = d3.interpolate(this.textContent, d);
  return function(t) {
    this.textContent = Math.round(i(t));
  };
};

var drawStackColumn = function(selector, stackData, referencePhraseIDs, isReference) {
  var column = d3.select(selector);
  var stack = column.selectAll("div.stack")
    .data(stackData, function(d) {return d.id;});
    //  .data(stackData.slice(0,200), function(d) {return d.id;});

  // UPDATE
  stack.selectAll(".code").on("click", null);
  stack.each(function(d) {
    $(this).find(".badge").html(stackCount(d));
    var codeDiv = $(this).find("div.code");
    var code = d.id == "miscellaneous" ?
          "<pre><h3>VARIOUS</h3></pre>" :
          generateCode(d.lines, referencePhraseIDs);
    code+="<div class='codeEx'></div>";
    codeDiv.html(code);
      //fetchExamplePyFiles(stackMembers(d).slice(0,10),$(this).find(".codeEx"));
      fetchExamplePyFiles(stackMembers(d),$(this).find(".codeEx"));

    if (code.length > 0)
      hljs.highlightBlock(codeDiv.find("code")[0]);

    $(this).find(".code").unbind();
    $(this).find(".code").on("click", function(){
      if (d.category == 'done') {
        d.category = 'undone';
        $(this).removeClass("read");
      } else {
        d.category = 'done';
        $(this).addClass("read");
      }

      allStacks.forEach(function(s) {
      // getCurrentStack().forEach(function(s) {
        if (d.originalStacks.indexOf(s.id) != -1)
          s.category = d.category;
      });
      updateProgress();
      //logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
    });
    $(this).find(".code").on("dblclick", function(){
      $(this).find(".codeEx").toggle();
      //logAction('dblclick read members', [d.id, stackMembers(d).slice(0,10)]);
    });
  });

  // ENTER
  var stackEnter = stack.enter().insert("div")
      .attr("class", "stack");

  var stackWidthOnScreen = $($('.stack')[0]).width();
  
  var stackBadge = stackEnter.append("span")
    .attr("class", "badge")
    .style("margin", "5px")
    .style("width",function(d) {
      //console.log(numTotalSolutions,stackWidthOnScreen,stackCount(d),parseInt(totalNumSolutions),stackCount(d)/parseInt(totalNumSolutions))
      return Math.max(30,Math.ceil(stackCount(d)*stackWidthOnScreen/parseInt(numTotalSolutions))).toString()+"px";
    })
    .text(function(d) {return stackCount(d);});
  //stackEnter.append("span").attr("class", "stackid text-muted").text(function(d) { return "id: " + d.id; });

  var stackCode = stackEnter.append("div")
    .attr("class", function(d) {
      var classes = "code";
      if (d.category == 'done') {
        classes += " read";
      }
      //console.log('d.solutions[0].correct',d.solutions[0].correct)
      if (!(d.solutions[0].correct)) {
        classes += " incorrect-code"
        // consoe.log('incorrect code:',d.id)
      } else {
        //console.log('variables in correct sol',d.variableIDs)
        d.variableIDs.forEach(function(item){
          varIDsInCorrectSolutions.add(item);
        });
      }
      return classes
    });
  stackCode.html(function(d) {
      code = d.id == "miscellaneous" ?
          "<pre><h3>VARIOUS</h3></pre>" :
          generateCode(d.lines, referencePhraseIDs);
        code+="<div class='codeEx'></div>";
        return code;
      }).each(function(d) {
        //fetchExamplePyFiles(stackMembers(d).slice(0,10),$(this).find(".codeEx"));
        fetchExamplePyFiles(stackMembers(d),$(this).find(".codeEx"));
        var code = $(this).find("code");
        if (code.length > 0)
          hljs.highlightBlock(code[0]);
      });

  if (false && ! isReference)
    stackEnter.style("left", "800px")
        .transition().duration(900)
        .style("left", "0px");

  stackCode.on("click", function(d){
    if (d.category == 'done') {
      d.category = 'undone';
      $(this).removeClass("read");
    } else {
      d.category = 'done';
      $(this).addClass("read");
    }
    //logAction('read', [d.id, stackCount(d)]);
    //logAction('read members', [d.id, stackMembers(d), stackMembers(d).length]);
    allStacks.forEach(function(s) {
    // getCurrentStack().forEach(function(s) {
      if (d.originalStacks.indexOf(s.id) != -1)
        s.category = d.category;
    });
    updateProgress();
    //logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
  });
  stackCode.on("dblclick", function(d){
      $(this).find(".codeEx").toggle();
       //logAction('dblclick read members', [d.id, stackMembers(d).slice(0,10)]);
  });
  // stackCode.on("mousedown",function(d){
  //   stackPairToMerge.mouseDownStack = stackCopy(d);  //d.id;
  //   //logAction('mousedown', [d.id, stackCount(d)]);
  // });
  // stackCode.on("mouseup",function(d){
  //   stackPairToMerge.mouseUpStack = stackCopy(d); //d.id;
  //   //logAction('mouseup', [d.id, stackCount(d)]);
  //   //console.log(stackPairToMerge.mouseUpStack.lines)
  //   //console.log(stackPairToMerge.mouseDownStack.lines)
  //     if (stackPairToMerge.mouseDownStack.id === stackPairToMerge.mouseUpStack.id) {
  //           console.log('this is the same stack--no rewrite rules necessary')
  //       } else {
  //           generateRewriteRule(stackPairToMerge.mouseDownStack,stackPairToMerge.mouseUpStack)
  //       }
  // });

  // EXIT
  var stackExit = stack.exit()
  if (false && ! isReference)
      stackExit.transition().duration(900)
      .style("left", function(d) { if (!isFinite(d.id)) { return "0px"; } else { return "1000px"; }});
  stackExit.remove();
};
