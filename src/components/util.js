function entryToMarkdown(entry) {
  return entry.title + " (#" + entry.issue_number + ")";
}

function entriesToMarkdown(entries) {
  return entries.reduce(function(total, current) {
    return total + "  * " + entryToMarkdown(current) + "\n";
  }, "");
}

function notesToMarkdown(notes) {
  return notes.sections.reduce(function(total, current) {
    return (
      total + "# " + current.name + "\n" + entriesToMarkdown(current.entries)
    );
  }, "");
}

export { notesToMarkdown };
