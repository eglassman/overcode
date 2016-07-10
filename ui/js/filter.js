var applyFilters = function() {
  // filter the stacks by filterPhrases
  filteredStacks = [];
  if (filterPhrases.length == 0 && filterVariables.length == 0)  {
    filteredStacks = mergedStacks.filter(function(stack) { return (! stack.merged); });
  } else {
    mergedStacks.forEach(function(stack) {
      if (hasAllPhrases(stack, filterPhrases) && hasAllVariables(stack, filterVariables))
        filteredStacks.push(stack);
    });
  }

  // update the phrase counts
  mergedPhrases.forEach(function(phrase) { phrase.count = 0; });
  mergedTemplates.forEach(function(phrase) { template.count = 0; });
  filteredStacks.forEach(function(stack) {
    mergedPhrases.forEach(function(phrase) {
      if (stack.phraseIDs.indexOf(phrase.id) != -1)
        phrase.count += stackCount(stack);
    });
    mergedTemplates.forEach(function(phrase) {
      // if (stack.phraseIDs.indexOf(phrase.id) != -1)
      //   phrase.count += stackCount(stack);
      //TODO: EXTRACT TEMPLATES...
    });
  });
};
