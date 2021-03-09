/**
 * This is a basic example on how to instantiate sigma. A random graph is
 * generated and stored in the "graph" variable, and then sigma is instantiated
 * directly with the graph.
 *
 * The simple instance of sigma is enough to make it render the graph on the on
 * the screen, since the graph is given directly to the constructor.
 */
// Instantiate sigma:
s = sigma.parsers.json('data/'+task_name+'_graph.json', {
    renderer: {
        container: document.getElementById('graph-container'),
        type: 'canvas'
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
}, function(s) {
    s.bind('overNode clickNode', function(e) {
        var node_id = e.data.node.id;
        var node_size = e.data.node.size;
        node_size = parseInt(node_size * node_size);
        $('#current_state').attr('src', 'img/states/'+node_id+'.png');
        $('#current_state_caption').html('<strong>Current State (Size: '+node_size+')');
    });

    s.startForceAtlas2({worker: true, barnesHutOptimize: false, slowDown: 0.25, gravity: 0.25, strongGravityMode: true, scalingRatio: 100000000});

    setTimeout(function() { s.stopForceAtlas2(); }, 10000)
});
