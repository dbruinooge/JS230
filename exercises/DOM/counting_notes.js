function walk(node, callback) {
  for (let i = 0; i < node.childNodes.length; i += 1) {
    callback(node);
    walk(node.childNodes[i], callback);
  }
}

function childNodes(n) {
  let count = 0;
  const node = document.getElementById(n);
  walk(node, function (_) {
      count += 1;
    });
  const direct = node.childNodes.length;
  const indirect = count - direct;
  return [direct, indirect]
}

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(n => console.log(childNodes(n)));