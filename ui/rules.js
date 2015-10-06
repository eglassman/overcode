RegExp.quote = function(str) {
    return (str).replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
};

var drawRules = function() {
	var ruleList = d3.select("#rule-list");

	var ruleItem = ruleList.selectAll("li.rule-item").data(rules, function(d) {return d.id;});

	var ruleEnter = ruleItem.enter().insert("li")
			.attr("class", "list-group-item rule-item")
	var ruleCode = ruleEnter.append("span")
			.attr("class", "code")
			.html(function(rule) {
				return "Rewrite <b>" + rule.pattern + "</b> as <b>" + rule.repl + "</b>";
			});
	var ruleDeleteButton = ruleEnter.append("span")
			.attr("class", "badge")
			.text("x");
	ruleDeleteButton.on("click", function(rule) {
                logAction("deleteRule", [rule.pattern, rule.repl]);
		var index = 0;
		rules.forEach(function(r, i) { if (r.id == rule.id) index = i;});
		rules.splice(index, 1);
		redraw();
                logAction("postmerge", [mergedStacks.length, mergedPhrases.length, mergedVariables.length]);
                logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
	});

	ruleItem.exit().remove();
};

var previewRule = debounce(function() {
	var pattern = $("#pattern-input").val().trim();
	var repl = $("#repl-input").val().trim();
	if (pattern.length == 0) {
		previewing = false;
                drawStacks();
	} else if (repl.length == 0) {
		// SEARCH HIGHLIGHT
		previewing = true;
		mergedPhrases.forEach(function(phrase) { previewSearch(phrase, pattern); });
		drawStacks();
	} else {
		// SEARCH AND REPLACE
		previewing = true;
		mergedPhrases.forEach(function(phrase) { previewReplace(phrase, pattern, repl); });
		drawStacks();
	}
}, 250);

var previewSearch = function(phrase, pattern) {
	var patternRegexp = new RegExp("("+RegExp.quote(pattern)+")", "g");
	phrase.previewCode = phrase.code.replace(patternRegexp, "<span class='highlighted'>$1</span>");
};

var previewReplace = function(phrase, pattern, repl) {
	var patternRegexp = new RegExp("("+RegExp.quote(pattern)+")", "g");
	phrase.previewCode = phrase.code.replace(patternRegexp, "<span class='line-remove'>$1</span><span class='line-insert'>"+repl+"</span>");
};

var addRule = function() {
	var pattern = $("#pattern-input").val().trim();
	var repl = $("#repl-input").val().trim();
	if (pattern == "" || repl == "")
		return;

	logAction("rewrite", [pattern, repl]);
	var newRuleID = (rules.length > 0) ? rules[rules.length - 1].id + 1 : 1;
	var rule = {
		id: newRuleID,
		pattern: pattern,
		repl: repl
	};
	rules.push(rule);
	$("#pattern-input").val("");
	$("#repl-input").val("");
	previewing = false;
	redraw();
        logAction("postmerge", [mergedStacks.length, mergedPhrases.length, mergedVariables.length]);
        logAction("progress", [numDoneSolutions + " of " + numTotalSolutions, (100*numDoneSolutions/numTotalSolutions).toFixed(2) + "%"]);
};

var applyRules = function() {
	// create deep copies of the mergedPhrases and mergedStacks
	mergedPhrases = allPhrases.map(function(phrase) {return copyObject(phrase);});
	mergedStacks = allStacks.map(function(stack) {return copyObject(stack);});
	mergedVariables = allVariables.map(function(variable) {return copyObject(variable);});

	// apply each rule in sequence
	rules.forEach(applyRule);
};

var applyRule = function(rule) {
	var mergePhraseMap = {};
	var mergeStackMap = {};
	var mergeVariableMap = {};

	// build a dictionary of original phrases
	var phraseDict = {};
	mergedPhrases.forEach(function(phrase) { phraseDict[phrase.code] = phrase.id; });

	// apply the rule to each phrase
	mergedPhrases.forEach(function(phrase) {
        var patternRegexp = new RegExp(RegExp.quote(rule.pattern), "g");
		var newCode = phrase.code.replace(patternRegexp, rule.repl);
		// mark for merge
		if (newCode in phraseDict && phraseDict[newCode] != phrase.id) {
			mergePhraseMap[phrase.id] = phraseDict[newCode];
			phrase.merged = true;
		}

		// update line of code
		phrase.code = newCode;
	});

	// build a dictionary of original variables
	var variableDict = {};
	mergedVariables.forEach(function(variable) { variableDict[variable.varName] = variable.id; });

	// apply the rule to each variable
	mergedVariables.forEach(function(variable) {
		var newCode = variable.varName.replace(rule.pattern, rule.repl);
		// mark for merge
		if (newCode in variableDict && variableDict[newCode] != variable.id) {
			variable.merged = true;
			mergeVariableMap[variable.id] = variableDict[newCode];
        }
	});

	// build a dictionary of original stack phrase sets
	var stackDict = {};
	mergedStacks.forEach(function(stack) { 
		var phraseString = stack.phraseIDs.join(',');
		stackDict[phraseString] = stack;
	});

	// merge phrases and variables by carrying out merge map
	var mergePhraseKeys = Object.keys(mergePhraseMap);
	var mergeVariableKeys = Object.keys(mergeVariableMap);
	mergedStacks.forEach(function(stack) {
		mergePhraseKeys.forEach(function(fromPhraseID) {
			fromPhraseID = parseInt(fromPhraseID);
			var index = stack.phraseIDs.indexOf(fromPhraseID);
			if (index != -1) {
				stack.phraseIDs[index] = mergePhraseMap[fromPhraseID];
				stack.lines = stack.lines.map(function(line) {
					if (line.phraseID == fromPhraseID)
						line.phraseID = mergePhraseMap[fromPhraseID];
					return line;
				});
			}
		});
		stack.phraseIDs.sort(d3.ascending);

		// if resulting phrase set already in the dictionary
		// then merge
		var phraseString = stack.phraseIDs.join(',');
		if (phraseString in stackDict && stackDict[phraseString].id != stack.id) {
			var newStack = stackDict[phraseString];
			newStack.solutions = newStack.solutions.concat(stack.solutions);
	        newStack.originalStacks = newStack.originalStacks.concat(stack.originalStacks);
	        // propagate category
	        allStacks.forEach(function(s) {
	          if (newStack.originalStacks.indexOf(s.id) != -1)
	            s.category = newStack.category;
	        });
			stack.merged = true;
		}
        // merge variables
		mergeVariableKeys.forEach(function(fromVariableID) {
			fromVariableID = parseInt(fromVariableID);
			var index = stack.variableIDs.indexOf(fromVariableID);
			if (index != -1)
				stack.variableIDs[index] = mergeVariableMap[fromVariableID];
		});
		stack.variableIDs.sort(d3.ascending);
	});

	mergedPhrases = mergedPhrases.filter(function(p) { return !p.merged; });
	mergedVariables = mergedVariables.filter(function(p) { return !p.merged; });
	mergedStacks = mergedStacks.filter(function(p) { return !p.merged; });
};
