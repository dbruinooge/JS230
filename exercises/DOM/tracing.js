function nodeWithSiblings(node) {
  const parent = node.parentNode;
  const siblings = parent.children;
  return [].slice.call(siblings).map(sibling => sibling.tagName);
}

function domTreeTracer(id) {
  const tree = [];
  let node = document.getElementById(id);
  while (node.tagName !== 'ARTICLE') {
    tree.push(nodeWithSiblings(node));
    node = node.parentNode;
  }

  tree.push(['ARTICLE']);
  return tree;
}

[1, 2, 22].forEach(id => console.log(domTreeTracer(id)));
