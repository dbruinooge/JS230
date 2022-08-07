// function colorGeneration(num) {
//   if (num < 1) return;
//   let gen = 1;
//   let nodes = [document.getElementById(1)];
//   while (gen < num) {
//     nodes = getAllChildren(nodes);
//     gen += 1;
//   }

//   nodes.forEach(node => node.classList.add('generation-color'));
// }


// function getAllChildren(nodes) {
//   const result = [];
//   nodes.forEach(node => result.push(...(node.children)));
//   return result;
// }

function colorGeneration(num) {
  if (num < 1) return;
  let gen = 1;
  let nodes = [document.getElementById(1)];
  while (gen < num) {
    nodes = nodes.map(node => [].slice.call(node.children)).flat();
    gen += 1;
  }

  nodes.forEach(node => node.classList.add('generation-color'));
}
