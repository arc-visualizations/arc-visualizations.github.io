// First, let's define a function to get the node type based on its color
function getNodeType(color) {
  console.log('node color: ' + color);
  switch (color) {
    case '#2ECC40':
      return 'Correct final state';
    case '#FF4136':
      return 'Incorrect final state';
    case 'orange':
    case 'rgba(100, 100, 100, 0.25)':
      return 'Intermediate state';
    case '#0074D9':
      return 'Initial state';
    default:
      return 'Unknown';
  }
}

s = sigma.parsers.json(
  'data/' + task_name + '_graph.json',
  {
    renderer: {
      container: document.getElementById('graph-container'),
      type: 'canvas',
    },
    settings: {
      borderSize: 1.5,
      enableCamera: false,
      enableHovering: true,
      edgeHoverSizeRatio: 1,
      nodeHoverPrecision: 10,
      defaultEdgeColor: 'grey',
      minNodeSize: 2,
      maxNodeSize: 12,
      minEdgeSize: 1,
      maxEdgeSize: 8,
      edgesPowRatio: 0.5,
    },
  },
  function (s) {
    // Create a new DOM element for the tooltip
    var tooltip = document.createElement('div');
    tooltip.id = 'node-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.zIndex = '999';
    tooltip.style.backgroundColor = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.border = '1px solid black';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    s.bind('overNode', function (e) {
      var node = e.data.node;
      var node_id = node.id;
      var node_size = parseInt(node.size * node.size);
      var node_type = getNodeType(node.color);

      $('#current_state').attr(
        'src',
        'img/states/' + node_id + '.png'
      );
      $('#current_state_caption').html(
        '<strong>Current State (Size: ' + node_size + ')'
      );

      // Update and show tooltip
      tooltip.innerHTML = node_type;
      tooltip.style.left = e.data.captor.clientX + 5 + 'px';
      tooltip.style.top = e.data.captor.clientY + 5 + 'px';
      tooltip.style.display = 'block';
    });

    s.bind('outNode', function (e) {
      // Hide tooltip when not hovering over a node
      tooltip.style.display = 'none';
    });

    s.startForceAtlas2({
      worker: true,
      barnesHutOptimize: false,
      slowDown: 0.25,
      gravity: 0.25,
      strongGravityMode: true,
      scalingRatio: 100000000,
    });

    setTimeout(function () {
      s.stopForceAtlas2();
    }, 10000);
  }
);
