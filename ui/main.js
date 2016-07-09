var baseDir;

var miscBottom = true;
hljs.initHighlightingOnLoad();

var allPhrases, allSolutions, allStacks, allVariables;
var rules;
// var stacksByOutput = {
//   // 0: [],
//   // 12: [],
//   // null: [], // Why, Javascript?
//   // 36: []
// }

var mergedPhrases = [], mergedVariables = [];
var mergedStacks = [], filteredStacks = [];

var filterPhrases = []; filterVariables = [];

var numTotalSolutions = 0, numDoneSolutions = 0;

var previewing = false, rewriting = false;

var stackPairToMerge = {mouseDownStack: null, mouseUpStack: null};

function logAction(action, other) {
  var date = moment().format("HH:mm:ss");
  var dateUnix = moment().unix();
  var params = [date, dateUnix, action].concat(other);
  console.log(params.join("\t\t"));
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
  $( "#lineThresh" ).val( Math.ceil(parseFloat($( "#slider-threshold-phrases" ).slider( "value" ))) );
  $('#lineThresh').keyup(function () {
        //isn't selecting the correct value with this line here
        var position = parseInt($('#lineThresh').val(),10);
        $("#slider-threshold-phrases").slider("option","value", position);
        drawPhrases()
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
  allStacks = []; allPhrases = []; allVariables = []; allSolutions = [];
  filterPhrases = [];
  filterVariables = [];
  mergedPhrases = []; mergedStacks = []; mergedVariables = [];
  rules = [];
  numTotalSolutions = 0;
  numDoneSolutions = 0;

  $("#pattern-input").val("");
  $("#repl-input").val("");
  previewing = false;

  $("#testcase").html("");

  redraw();

  // load the new data
  // TODO: is there a JS equivalent of os.path.join?
  var outputPath = baseDir + '/output/';
  d3.json(outputPath + 'phrases.json', function(error, phrases) {
    allPhrases = phrases.map(function(d) {
      d.merged = false;
      return d;
    });

    d3.json(outputPath + 'solutions.json', function(error, solutions) {
      allSolutions = solutions;

      d3.json(outputPath + 'variables.json', function(error, variables) {
        allVariables = variables.map(function(d) { d.merged = false; return d;});

        // fill allStacks as single-solution stacks
        initializeStacks();
        numTotalSolutions = allStacks.reduce(function(prev, stack) {
        // numTotalSolutions = getCurrentStack().reduce(function(prev, stack) {
          return prev + stackCount(stack);
        }, 0);

        redraw();
        //logAction("loaded", [baseDir, mergedStacks.length, mergedPhrases.length, mergedVariables.length]);

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

var drawSidebarList = function(type, allData, filterData) {
  var filterContainer = "#filter-"+type+"s";
  //var codeField = type == 'phrase' ? 'code' : 'varNameAndSeq';
  var codeField = type == 'phrase' ? 'code' : 'sequence';
  if (filterData.length == 0)
    $("#nothing").show();
  else
    $("#nothing").hide();

   // Draw the filter items
  var filterList = d3.select(filterContainer);
  var filterItem = filterList.selectAll("li")
      .data(filterData, function(d) {return d.id;});

  var filterEnter = filterItem.enter().append("li")
    .append("a").attr("href", "#");
  filterEnter.append("span")
    .attr("class", "badge")
    .text("x");
  filterEnter.append("code").append("pre")
    .html(function(d) {return d[codeField];});
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
    //a_indent = a.indent;
    //b_indent = b.indent;
    //if (a_indent > b_indent) return 1;
    //if (b_indent > a_indent) return -1;
    a = a[codeField];
    b = b[codeField];
    return b > a ? -1 : b < a ? 1 : 0;
  });

  // Draw the remaining items
  var remainingContainer = "#remaining-"+type+"s";
  var remainingList = d3.select(remainingContainer);
  var remainingItem = remainingList.selectAll("li")
      .data(remainingData, function(d) {return d.id;});

  remainingItem.each(function(d) {
    $(this).find(".badge").html(d.count);
    $(this).find("code").html(d[codeField]);
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
  var suffix_re = /___(\d+)/g;
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

var drawVariables = function() {
  mergedVariables.sort(function(a,b) {
    a = a.varName;
    b = b.varName;
    return b > a ? -1 : b < a ? 1 : 0;
  });
  var variableList = d3.select("#variable-list");
  var variableItem = variableList.selectAll("li")
      .data(mergedVariables, function(d) { return d.id; });

  variableItem.each(function(d) {
    $(this).find("code").html(d.varName);
    //var sequence = d.varNameAndSeq.replace(/^.*?:/, "");
    var sequence = d.sequence.join(' &rarr; ');
    $(this).find(".sequence").html(sequence);
  });

  var variableEnter = variableItem.enter().insert("li")
      .attr("class", "list-group-item");
  variableEnter.append("code")
      .html(function(d) { return d.varName; });
  variableEnter.append("small")
      .attr("class", "sequence text-muted")
      .html(function(d) {
        var testcases = Object.getOwnPropertyNames(d.sequence);
        // console.log(testcases)
        return d.sequence[testcases[0]].join(' &rarr; ');
      }); //return d.varNameAndSeq.replace(/^.*?:/, "");
  variableEnter.on("click", function(d) {
    //logAction("clickVariableForFiltering", [d.id, d.varName]);
    filterVariables.push(d);
    ////logAction("filter", [p.id, p.code]);
    redraw();
  });

  variableItem.exit().remove();
};

var copyObject = function(obj) { return JSON.parse(JSON.stringify(obj)); };

var redraw = function() {
  applyRules();
  applyFilters();
  drawRules();
  drawPhrases();
  drawVariables();
  drawStacks();
  updateProgress();
};
