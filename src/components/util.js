function splitIssues(issues) {
  return issues.reduce(function(total, current) {
    // TODO sort labels, and if labels don't exist.
    var labelName = current.labels[0].name;
    if (!(labelName in total)) {
      total[labelName] = [];
    }
    current["specialthanks"] = true;
    total[labelName].push(current);
    return total;
  }, {});
}

function issueToMarkdown(issue) {
  // TODO special thanks
  // TODO make this a method so when filter members change, result will also change? It doesn't matter now because it's re-generated every time.
  var ret = " * " + issue.title + "(#" + issue.number + ")";
  if (issue.specialthanks) {
    ret += "\n   - Special thanks: @" + issue.user.login;
  }
  return ret;
}

function sectionToMarkdown(issues) {
  var ret = "";
  for (var issue in issues) {
    ret += issueToMarkdown(issues[issue]) + "\n";
  }
  return ret;
}

export { splitIssues, sectionToMarkdown };
