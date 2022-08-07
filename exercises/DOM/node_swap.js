function nodeSwap(id1, id2) {
  const first = document.getElementById(id1);
  const second = document.getElementById(id2);

  if (!first || !second || first.contains(second) || second.contains(first)) {
    return undefined;
  }

  const temp = document.createElement("div");

  first.parentNode.replaceChild(temp, first);
  second.parentNode.replaceChild(first, second);
  temp.parentNode.replaceChild(second, temp);

  return true;
}
