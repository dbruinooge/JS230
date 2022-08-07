function transformChildren(children) {
  return children.map(child => {
    if (child.children.length === 0) {
      return [child.tagName, []];
    } else {
      return [child.tagName, transformChildren([].slice.call(child.children))];
    }
  });
}

function nodesToArray() {
  let node = document.body;
  let children = [].slice.call(node.children);
  return ([node.tagName, transformChildren(children)]);
}

console.log(JSON.stringify(nodesToArray()));
