var baseDir;

var miscBottom = true;
hljs.initHighlightingOnLoad();

var allPhrases, allLines, allSolutions, allStacks, allVariables;
var rules;
var varIDsInCorrectSolutions = new Set();
// var stacksByOutput = {
//   // 0: [],
//   // 12: [],
//   // null: [], // Why, Javascript?
//   // 36: []
// }

var mergedPhrases = [], mergedVariables = [];
var mergedStacks = [], filteredStacks = [];

var filterPhrases = [], filterTemplates = [], filterVariables = [];

var numTotalSolutions = 0, numTotalCorrectSolutions = 0, numDoneSolutions = 0;

var previewing = false, rewriting = false;

var stackPairToMerge = {mouseDownStack: null, mouseUpStack: null};

function logAction(action, other) {
  var date = moment().format("HH:mm:ss");
  var dateUnix = moment().unix();
  var params = [date, dateUnix, action].concat(other);
  console.log(params.join("\t\t"));
}

/** Input: a string that may or may not represent a number.
Output: if the string is a float, it only has two decimal places */
function renderFloatsTo2DecimalPlaces(stringThatMightBeAFloat){
  var parsedIntObj = parseInt(stringThatMightBeAFloat);
  var parsedFloatObj = parseFloat(stringThatMightBeAFloat);
  
  if (isNaN(parsedFloatObj)) {
    //if it does not parse as a float, return it unchanged
    return stringThatMightBeAFloat;
  } else {
    if (parsedFloatObj==parsedIntObj){
      //if its actually really just an integer
      return stringThatMightBeAFloat;
    } else {
      //otherwise, fix it to 2 decimal places
      return parsedFloatObj.toFixed(2).toString();
    }
  }
}

$(function() {
  //logAction("start", []);
  // Sliders for phrase and variable thresholds
  $( "#slider-threshold-phrases" ).slider({
    range: "max",
    min: 1,
    max: 300,
    value: 50,
    slide: function( event, ui ) {
        $( "#lineThresh" ).val( ui.value );
        drawPhrases()
    },
    stop: function( event, ui) {
      //logAction("slider", [ui.value]);
      drawPhrases()
    }
  });
  $( "#slider-threshold-templates" ).slider({
    range: "max",
    min: 1,
    max: 300,
    value: 50,
    slide: function( event, ui ) {
        $( "#templateThresh" ).val( ui.value );
        drawTemplates()
    },
    stop: function( event, ui) {
      //logAction("slider", [ui.value]);
      drawTemplates()
    }
  });
  $( "#lineThresh" ).val( Math.ceil(parseFloat($( "#slider-threshold-phrases" ).slider( "value" ))) );
  $('#lineThresh').keyup(function () {
        //isn't selecting the correct value with this line here
        var position = parseInt($('#lineThresh').val(),10);
        $("#slider-threshold-phrases").slider("option","value", position);
        drawPhrases();
    });
  $( "#templateThresh" ).val( Math.ceil(parseFloat($( "#slider-threshold-templates" ).slider( "value" ))) );
  $('#templateThresh').keyup(function () {
        //isn't selecting the correct value with this line here
        var position = parseInt($('#templateThresh').val(),10);
        $("#slider-threshold-templates").slider("option","value", position);
        drawTemplates();
    });

  // Constrain various lists to the browser height
  $("#main, #sidebar").css("height", $(window).innerHeight());
  $("#grid-colB,#grid-colA").css("height", $("#main").innerHeight() - $("#header").outerHeight() - $("#header").position().top - 5);
  $("#filter-container").css("height", $("#header").outerHeight());
  $("#remaining-phrases").css("height", $("#sidebar").innerHeight() - $("#sidebar-nav").outerHeight() - $("#sidebar-top").outerHeight() - 15);
  $("#variable-list").css("height", $("#sidebar").innerHeight() - $("#sidebar-nav").outerHeight() - $("#variables-header").outerHeight() - 130);
  $("#rewrite-rules").css("height", $("#sidebar").innerHeight() - $("#sidebar-nav").height());

  // Event Handlers
  $("#output-select").on('change', redraw);
  $("#pattern-input, #repl-input").on('keyup', previewRule);
  $("#add-rule-btn").on('click', addRule);
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var activeTab = $(e.target).attr("class");
    //logAction("switchTab", [activeTab]);
    rewriting = (activeTab == "rewrite");
    if (previewing)
      drawStacks();
  });
  $('#filter-type-select').click(function(e){
    $('#slider-threshold-phrases').toggle();
    $('#slider-threshold-templates').toggle();
    $('#remaining-phrases').toggle();
    $('#remaining-templates').toggle();
  });
  $('input:checkbox[name=var-in-correct]').on('change',function(e){
    $('.var-in-correct').toggle();
  });
  $('input:checkbox[name=var-in-incorrect]').on('change',function(e){
    $('.var-in-incorrect').toggle();
  });
  $('#filter-by-stack').click(function(e){
    //$('.variable-list-item').show();
    if ($('input:checkbox[name=var-in-correct]:checked').length){
      $('.var-in-correct').show();
    }
    if ($('input:checkbox[name=var-in-incorrect]:checked').length){
      $('.var-in-incorrect').show();
    }
    $('#filter-by-stack').hide();
  });

  getBaseDir(function(error, returnedBaseDir) {
    if (error) throw error;

    baseDir = returnedBaseDir;
    // Load the default dataset
    loadData();
  });
});

// Load initial phrases and representative solutions
var loadData = function(e) {
  // first, empty everything
  allStacks = []; allPhrases = []; allLines = []; allVariables = []; allSolutions = [];
  filterPhrases = [];
  filterVariables = [];
  mergedPhrases = []; mergedStacks = []; mergedVariables = [];
  rules = [];
  numTotalSolutions = 0;
  numDoneSolutions = 0;

  $("#pattern-input").val("");
  $("#repl-input").val("");
  previewing = false;

  redraw();

  // load the new data
  // TODO: is there a JS equivalent of os.path.join?
  var outputPath = baseDir + '/output/';
  console.log(outputPath);
  d3.json(outputPath + 'expressions.json', function(error, expressions) {
    console.log(error);
    allExpressions = expressions;

    d3.json(outputPath + 'solutions_temp.json', function(error, solutions) {
      console.log(error);
      allSolutions = solutions;

      d3.json(outputPath + 'subtrees.json', function(error, subtrees) {
        console.log(error);
        //allVariables = variables.map(function(d) { d.merged = false; return d;});
        allSubtrees = subtrees;
        
        console.log('allExpressions',allExpressions);
        console.log('allSolutions',allSolutions);
        console.log('allSubtrees',allSubtrees);

        //initializeStacks();
        numTotalSolutions = allSolutions.length;
        numTotalSubtrees = allSubtrees.length;
        numTotalExpressions = allExpressions.length;
        console.log('numTotalSolutions, numTotalExpressions, numTotalSubtrees');
        console.log(numTotalSolutions, numTotalExpressions, numTotalSubtrees);
        console.log('testing')

        redraw();
        
      });
    });
  });
};

var hasAllPhrases = function(object, phrases) {
  var hasAll = true;
  phrases.forEach(function(phrase) {
    if (object.phraseIDs.indexOf(phrase.id) == -1)
      hasAll = false;
  });
  return hasAll;
};

var hasAllVariables = function(object, variables) {
  var hasAll = true;
  variables.forEach(function(variable) {
    if (object.variableIDs.indexOf(variable.id) == -1)
      hasAll = false;
  });
  return hasAll;
};

var drawPhrases = function() {
  drawSidebarList("phrase", mergedPhrases, filterPhrases);
};

var drawTemplates = function() {
  drawSidebarList("template", [], []);
};

var drawSidebarList = function(type, allData, filterData) {
  var filterContainer = "#filter-"+type+"s";
  //var codeField = type == 'phrase' ? 'code' : 'varNameAndSeq';
  var codeField = '';
  if (type=='phrase'){
    codeField = 'code';
  }
  if (type=='template'){
    codeField = 'template';
  }
  if (codeField == '') {alert('unknown type specified for sidebar list')};

   // Draw the filter items
  var filterList = d3.select(filterContainer);
  var filterItem = filterList.selectAll("li")
      .data(filterData, function(d) {return d.id;});

  var filterEnter = filterItem.enter().append("li")
    .append("a").attr("href", "#");
  filterEnter.append("span")
    .attr("class", "badge")
    .text("x");
  var suffix_re = /___(\d+)/g;
  filterEnter.append("code").append("pre")
    .html(function(d) {return d[codeField].replace(suffix_re, function(match, digit) {
      return "<sub>" + digit + "</sub>";
    });
  });
  filterEnter.selectAll(".badge")
    .on("click", function(d) {
      //logAction("unfilter", [d.id, d.code]);
      var index;
      filterData.forEach(function(filterDatum, i) {if (filterDatum.id == d.id) index = i;});
      filterData.splice(index, 1);
      redraw();
    });

  var filterExit = filterItem.exit().remove();

  var thresholdValue = $("#slider-threshold-"+type+"s").slider("value");

  // Get a list of remaining items and sort alphabetically
  var filterIDs = filterData.map(function(d) {return d.id;});
  var remainingData = allData.filter(function(d) {
    return  filterIDs.indexOf(d.id) == -1
            && ! d.merged
            && d.count >= thresholdValue;
  });
  remainingData.sort(function(a,b) {
    a = a[codeField];
    b = b[codeField];
    return b > a ? -1 : b < a ? 1 : 0;
  });

  // Draw the remaining items
  var remainingContainer = "#remaining-"+type+"s";
  var remainingList = d3.select(remainingContainer);
  var remainingItem = remainingList.selectAll("li")
      .data(remainingData, function(d) {return d.id;});

  var suffix_re = /___(\d+)/g;
  remainingItem.each(function(d) {
    $(this).find(".badge").html(d.count);
    $(this).find("code").html(d[codeField].replace(suffix_re, function(match, digit) {
        return "<sub>" + digit + "</sub>";
      }));
  });

  var remainingEnter = remainingItem.enter().insert("li");
  remainingEnter.on("mouseenter", function(d,a,b) {
    $(this).find(".code").css("background-color", "#ddd");
  });
  remainingEnter.on("mouseleave", function(d,a,b) {
    $(this).find(".code").css("background-color", "#fff");
  });

  var remainingBadge = remainingEnter.append("div")
      .attr("class", "badge")
      .text(function(d) {return d.count;});

  var remainingCode = remainingEnter.append("div")
      .attr("class", "code")
    .append("a")
      .attr("href", "#");
  //var suffix_re = /___(\d+)/g;
  remainingCode.append("code").append("pre")
    .html(function(d) {return d[codeField].replace(suffix_re, function(match, digit) {
          return "<sub>" + digit + "</sub>";
        });
      }); //added calls that remove ___2 and makes it a subscript 2
  remainingCode.on("click", function(p) {
    filterData.push(p);
    //logAction("filter", [p.id, p.code]);
    redraw();
  });

  var remainingExit = remainingItem.exit().remove();
};


function originalVarNameComparator(a,b){
  return b > a ? -1 : b < a ? 1 : 0;
}

function varNameComparator(var1,var2){
  //console.log(var1,var2)
  name1 = var1.varName;
  name2 = var2.varName;
  var name1_split = name1.split('___');
  var name2_split = name2.split('___');
  if (name1_split[0] !== name2_split[0]){ //if they don't have the same base name
    a = name1_split[0];
    b = name2_split[0];
    return originalVarNameComparator(a,b);
  } else { //they have the same name
    //if they don't both have subscripts
    if (name1_split.length !== name2_split.length) {
      a = name1_split.length;
      b = name2_split.length;
      return originalVarNameComparator(a,b);
    } else {//they both have subscripts
      a = parseInt(name1_split[1]);
      b = parseInt(name2_split[1]);
      return originalVarNameComparator(a,b);
    }
  }
}

var drawVariables = function() {
  mergedVariables.sort(varNameComparator);
  var variableList = d3.select("#variable-list");
  var variableItem = variableList.selectAll("li")
      .data(mergedVariables, function(d) { return d.id; });

  var extractSequences = function(dsequence){
    //console.log('prejoin',d.sequence)
    var alltests = []
    for (var key in dsequence) {
      if (dsequence.hasOwnProperty(key)) {
        if (key.startsWith("print ")){
          var test = key.substring(6);
        } else {
          var test = key;
        }
        var sequence_to_render = _.map(dsequence[key],function(var_value){
          return renderFloatsTo2DecimalPlaces(var_value);
        });
        //console.log(test + ": " + d.sequence[key].join(' &rarr; '));
        alltests.push("<div class='testCase col-xs-5'>"+test + "</div>" + "<div class='var-value-sequence col-xs-7'>" + sequence_to_render.join(' &rarr; ') + "</div></div>");
      }
    }
    //console.log('alltests',alltests)
    //var sequence = alltests.join('<br>');
    return alltests.join('');
  };

  variableItem.each(function(d) {
    var suffix_re = /___(\d+)/g;
    var varNameSubScripted = d.varName.replace(suffix_re, function(match, digit) {
      return "<sub>" + digit + "</sub>";
    });
    $(this).find("div.varName").html("<div class='col-xs-12'><code>"+varNameSubScripted+"</code></div");
    //var sequence = d.varNameAndSeq.replace(/^.*?:/, "");
    var sequence = extractSequences(d.sequence);
    $(this).find(".sequence").html(sequence);
  });

  var variableEnter = variableItem.enter().insert("li")
      .attr("class",function(d){
        var varClass = "var-in-incorrect";
        //console.log('var id',d.id)
        if (varIDsInCorrectSolutions.has(d.id)){
          varClass = "var-in-correct";
        }
        return "list-group-item variable-list-item " + varClass + ' varID-'+d.id;
      });
      //.attr("class", "list-group-item");
  var suffix_re = /___(\d+)/g;
  variableEnter.append("div").attr("class", "row varName")
      .append("div").attr("class","col-xs-12")
      .append("code")
      .html(function(d) { return d.varName.replace(suffix_re, function(match, digit) {
          return "<sub>" + digit + "</sub>";
        }); 
      });
  variableEnter.append("div").attr("class","row text-muted")
      // .append("small").attr("class", "sequence text-muted")
      .html(function(d) {
        return extractSequences(d.sequence); //d.sequence[testcases[0]].join(' &rarr; ');
      }); 
  // The following code is broken; TODO: fix filtering by variable
  // variableEnter.on("click", function(d) {
  //   //logAction("clickVariableForFiltering", [d.id, d.varName]);
  //   filterVariables.push(d);
  //   ////logAction("filter", [p.id, p.code]);
  //   redraw();
  // });

  variableItem.exit().remove();
};

var copyObject = function(obj) { return JSON.parse(JSON.stringify(obj)); };

var redraw = function() {
  applyRules();
  applyFilters();
  drawRules();
  drawPhrases();
  drawTemplates();
  drawStacks();
  drawVariables();
  updateProgress();
};
