function arrayToNodes(nodeArray) {
  let parent = document.body;
  function appendChildNodes(parent, nodeArray) {
    if (typeof nodeArray[0] === 'string') {
      const node = document.createElement(nodeArray[0]);
      parent.appendChild(node);
      parent = node;
      nodeArray[1].forEach(subarray => appendChildNodes(parent, subarray));
    } else {
      nodeArray.forEach(subarray => appendChildNodes(parent, subarray));
    }
  }

  appendChildNodes(parent, nodeArray[1]);
}
