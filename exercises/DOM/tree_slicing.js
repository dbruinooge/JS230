function sliceTree(start, end) {
  const tree = [];
  let node = document.getElementById(end);

  while (node) {
    tree.unshift(node);
    if (tree[0].id === String(start)) {
      return tree.map(({tagName}) => tagName);
    }

    node = node.parentNode;
  }
}

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
