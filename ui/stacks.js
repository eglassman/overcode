var addOutputChoice = function(output) {
  $('#output-select').append($('<option>', { value: output, text: output }));
}

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
                  originalStacks: [i+1]
                };
    // allStacks.push(stack);
    if (solution.output in stacksByOutput) {
      stacksByOutput[solution.output].push(stack);
    } else {
      stacksByOutput[solution.output] = [stack]
      addOutputChoice(solution.output)
    }
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
          category: stack.category
        };
};

var getCurrentStack = function() {
  var current_output = $('#output-select').val()
  current_stack = stacksByOutput[current_output]
  if (current_stack === undefined) {
    var everything = []
    $.each(stacksByOutput, function(out) {
      everything = everything.concat(stacksByOutput[out])
    });
    return everything
  }
  return current_stack !== undefined ? current_stack : [];
}

var generateRewriteRule = function(downStack,upStack) {
  var diff1, diff2;
  console.log(downStack.lines)
  console.log(upStack.lines)

  //initialized some sets for holding phraseIDs
  //var upStackLines = new Set(upStack.lines);
  //var downStackLines = new Set(downStack.lines);

    diff1 = _.difference(upStack.phraseIDs,downStack.phraseIDs);
    diff2 = _.difference(downStack.phraseIDs,upStack.phraseIDs);
    if ((diff1.length == 1) && (diff2.length == 1)) {
        //we have a potential rewrite rule!
        console.log('potential rewrite rule:',diff1,diff2);
        console.log(_.where(allPhrases,{id:diff1[0]})[0].code);
        console.log(_.where(allPhrases,{id:diff2[0]})[0].code); 
        $("#repl-input").val(_.where(allPhrases,{id:diff1[0]})[0].code);
        $("#pattern-input").val(_.where(allPhrases,{id:diff2[0]})[0].code);
    } else {
        console.log('cannot yet predict rewrite rule');
    };
};

var stackCount = function(stack) {
  return stack.solutions.reduce(function(prev, solution) {
    return prev + solution.count;
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
  for (i = 0; i < solutionIDs.length; i++) {
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

var generateCode = function(lines, referencePhraseIDs, correct) {
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
    if (referencePhraseIDs.indexOf(line.phraseID) == -1)
      code += codeIndent + codeLine + "<br>";
    else
      code += codeIndent + "<span class='dimmed'>" + codeLine + "</span>" + "<br>";
  });
  code += "</code>"

  var correctness;
  if (!correct) {
    code += '<div class="results"> <span class="incorrect-results">Tests failed:</span> Test 1, Test 2</div>';
  }
  code += "</pre>";
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

  var correctStacks = filteredStacks.slice(1, 10);
  var incorrectStacks = filteredStacks.slice(10);

  drawStackColumn('#reference', filteredStacks.slice(0, 1), referencePhraseIDs, false, true);
  drawStackColumn("#grid-colA", correctStacks, referencePhraseIDs, false, true);
  drawStackColumn("#grid-colB", incorrectStacks, referencePhraseIDs, false, false);

  setColOffsets();

  if (filterPhrases.length == 0) {
    $("#num-filtered-stacks").hide();
    $("#num-filtered-solutions").hide();
  } else {
    $("#num-filtered-stacks").show();
    $("#num-filtered-solutions").show();
  }
  var numSolutionsData = filterPhrases.length > 0 ?
  [filteredStacks.reduce(function(prev, stack) {
    return prev + stackCount(stack);
  }, 0)] : [];
  var numTotalSolutionsData = [numTotalSolutions];
  var numStacksData = filterPhrases.length > 0 ? [filteredStacks.length] : [];
  var numTotalStacksData = [mergedStacks.length];

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
};

var interpolateNumber = function(d) {
  var i = d3.interpolate(this.textContent, d);
  return function(t) {
    this.textContent = Math.round(i(t));
  };
};

var drawStackColumn = function(selector, stackData, referencePhraseIDs, isReference, correct) {
  var column = d3.select(selector);
  var stack = column.selectAll("div.stack")
      .data(stackData.slice(0,200), function(d) {return d.id;});

  // UPDATE
  stack.selectAll(".code").on("click", null);
  stack.each(function(d) {
    $(this).find(".badge").html(stackCount(d));
    var codeDiv = $(this).find("div.code");
    var code = d.id == "miscellaneous" ?
          "<pre><h3>VARIOUS</h3></pre>" :
          generateCode(d.lines, referencePhraseIDs, correct);
    //get ids of first ten examples
    //var first10Examples = stackMembers(d).slice(0, 10);
    //console.log(first10Examples);
    //console.log(d.id+' dataSource: '+ dataSource);
    //d3.text("data/testnh.csv", function(text) {  console.log(d3.csv.parseRows(text)); });

      //get raw, append
      //code += codeexamples (where codeexamples is generated by something like generateCode but fetches .py files
      //exampleCode = fetchExamplePyFiles(stackMembers(d).slice(0,10));
      code+="<div class='codeEx'></div>";
    codeDiv.html(code);
      //fetchExamplePyFiles(stackMembers(d).slice(0,10),$(this).find(".codeEx"));
      fetchExamplePyFiles(stackMembers(d),$(this).find(".codeEx"));

    if (code.length > 0)
      hljs.highlightBlock(codeDiv.find("code")[0]);

    $(this).find(".code").unbind();
    $(this).find(".code").on("click", function(){
      if (d.category == 'done') return;

      logAction('read', [d.id, stackCount(d)]);
      logAction('read members', [d.id, stackMembers(d), stackMembers(d).length]);
      d.category = 'done';
      $(this).addClass("read");

      // allStacks.forEach(function(s) {
      getCurrentStack().forEach(function(s) {
        if (d.originalStacks.indexOf(s.id) != -1)
          s.category = d.category;
      });
      updateProgress();
      logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
    });
    $(this).find(".code").on("dblclick", function(){
      $(this).find(".codeEx").toggle();
      logAction('dblclick read members', [d.id, stackMembers(d).slice(0,10)]);
    });
    $(this).find(".code").on("mousedown",function(d){
      stackPairToMerge.mouseDownStack = stackCopy(d);  //d.id;
      logAction('mousedown', [d.id, stackCount(d)]);
    });
    $(this).find(".code").on("mouseup",function(d){
      stackPairToMerge.mouseUpStack = stackCopy(d);  //d.id;
      logAction('mouseup', [d.id, stackCount(d)]);
      //console.log(stackPairToMerge.mouseUpStack.lines)
      //console.log(stackPairToMerge.mouseDownStack.lines)
        if (stackPairToMerge.mouseDownStack.id === stackPairToMerge.mouseUpStack.id) {
            console.log('this is the same stack--no rewrite rules necessary')
        } else {
            generateRewriteRule(stackPairToMerge.mouseDownStack,stackPairToMerge.mouseUpStack)
        }
    });
  });

  // ENTER
  var stackEnter = stack.enter().insert("div")
      .attr("class", "stack");

  var stackBadge = stackEnter.append("span")
    .attr("class", "badge")
    .style("margin", "5px")
    .text(function(d) {return stackCount(d);});
  // id, now removed
  // stackEnter.append("span").attr("class", "stackid text-muted").text(function(d) { return "id: " + d.id; });

  // correctness badge
  var icon = correct ? "glyphicon-ok" : "glyphicon-remove";
  var correctnessClass = correct ? "correct-background" : "incorrect-background";
  stackEnter.append("span")
    .attr("class", "badge correctness-class " + correctnessClass)
    .append("span")
    .attr("class", "glyphicon " + icon)

  var stackCode = stackEnter.append("div")
    .attr("class", function(d) {
      return (d.category == 'done') ? "code read" : "code";
    });
  stackCode.html(function(d) {
      code = d.id == "miscellaneous" ?
          "<pre><h3>VARIOUS</h3></pre>" :
          generateCode(d.lines, referencePhraseIDs, correct);
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
    if (d.category == 'done') return;

    logAction('read', [d.id, stackCount(d)]);
    logAction('read members', [d.id, stackMembers(d), stackMembers(d).length]);
    d.category = 'done';
    $(this).addClass("read");

    // allStacks.forEach(function(s) {
    getCurrentStack().forEach(function(s) {
      if (d.originalStacks.indexOf(s.id) != -1)
        s.category = d.category;
    });
    updateProgress();
    logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
  });
  stackCode.on("dblclick", function(d){
      $(this).find(".codeEx").toggle();
       logAction('dblclick read members', [d.id, stackMembers(d).slice(0,10)]);
  });
  stackCode.on("mousedown",function(d){
    stackPairToMerge.mouseDownStack = stackCopy(d);  //d.id;
    logAction('mousedown', [d.id, stackCount(d)]);
  });
  stackCode.on("mouseup",function(d){
    stackPairToMerge.mouseUpStack = stackCopy(d); //d.id;
    logAction('mouseup', [d.id, stackCount(d)]);
    //console.log(stackPairToMerge.mouseUpStack.lines)
    //console.log(stackPairToMerge.mouseDownStack.lines)
      if (stackPairToMerge.mouseDownStack.id === stackPairToMerge.mouseUpStack.id) {
            console.log('this is the same stack--no rewrite rules necessary')
        } else {
            generateRewriteRule(stackPairToMerge.mouseDownStack,stackPairToMerge.mouseUpStack)
        }
  });

  // EXIT
  var stackExit = stack.exit()
  if (false && ! isReference)
      stackExit.transition().duration(900)
      .style("left", function(d) { if (!isFinite(d.id)) { return "0px"; } else { return "1000px"; }});
  stackExit.remove();
};


// FAKEY FAKEY FAKE
// TODO: look into Bootstrap Scrollspy!!!

var colAOrderedOffsets = []
var colBOrderedOffsets = []
var setColOffsets = function() {
  var corrects = $('#grid-colA').find('.stack');
  corrects.each(function() {
    colAOrderedOffsets.push($(this).prop('offsetTop'))
  });
  // console.log('offsets, col B:', colAOrderedOffsets);

  // When this is real, this will have to be the offset of the first incorrect
  // stack that goes with each correct stack. Right now it assumes 1-to-1
  var incorrects = $('#grid-colB').find('.stack');
  incorrects.each(function() {
    colBOrderedOffsets.push($(this).prop('offsetTop'));
  });
  // console.log('offsets, col C:', colBOrderedOffsets);
}

var lastColBScrollTop, lastColAScrollTop;
var ignoreScrollEvents = false;
var setStackScrollHandlers = function() {
  /*
  $('#grid-colA').scroll(function() {
    if (ignoreScrollEvents) { return; }
    var colAScrollTop = $(this).scrollTop();
    var stackIndex = 0;
    for (stackIndex = 0; stackIndex < colAOrderedOffsets.length; stackIndex++) {
      var nextOffset = colAOrderedOffsets[stackIndex+1];
      if (nextOffset === undefined || nextOffset > colAScrollTop) {
        break
      }
    }

    var colBScrollTop = $('#grid-colB').scrollTop();
    var nextColBOffset = colBOrderedOffsets[stackIndex+1];
    var currentColBOffset = colBOrderedOffsets[stackIndex];
    var previousColBOffset = stackIndex === 0 ? 0 : colBOrderedOffsets[stackIndex-1];
    // console.log('At stack number', stackIndex, 'with C offset', currentColBOffset);

    var tooFar = nextColBOffset !== undefined && colBScrollTop >= nextColBOffset;
    var notFarEnough = colBScrollTop < currentColBOffset;

    if (tooFar || notFarEnough) {
      if (lastColBScrollTop !== currentColBOffset) {
        ignoreScrollEvents = true;
        $('#grid-colB').animate({ scrollTop: currentColBOffset }, 300, function() {
          // animation done
          ignoreScrollEvents = false;
        });
        lastColBScrollTop = currentColBOffset;
        // console.log('scrolling to:',currentColBOffset);
      }
    }
  });

  $('#grid-colB').scroll(function() {
    if (ignoreScrollEvents) { return; }
    var colBScrollTop = $(this).scrollTop();
    var stackIndex = 0;
    for (stackIndex = 0; stackIndex < colBOrderedOffsets.length; stackIndex++) {
      var nextOffset = colBOrderedOffsets[stackIndex+1];
      if (nextOffset === undefined || nextOffset > colBScrollTop) {
        break
      }
    }

    // console.log('At stack number', stackIndex);
    var colAScrollTop = $('#grid-colA').scrollTop();
    var nextColAOffset = colAOrderedOffsets[stackIndex+1];
    var currentColAOffset = colAOrderedOffsets[stackIndex];
    // console.log('At stack number', stackIndex, 'with C offset', currentColAOffset);

    var tooFar = nextColAOffset !== undefined && colAScrollTop >= nextColAOffset;
    var notFarEnough = colAScrollTop < currentColAOffset;

    if (tooFar || notFarEnough) {
      if (lastColAScrollTop !== currentColAOffset) {
        ignoreScrollEvents = true;
        $('#grid-colA').animate({ scrollTop: currentColAOffset }, 300, function() {
          // animation done
          ignoreScrollEvents = false;
        });
        lastColAScrollTop = currentColAOffset;
        // console.log('scrolling to:',currentColAOffset);
      }
    }
  }); */
}
