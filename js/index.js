// UNCOMMENT TO ENABLE STATES --- (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
//Using https://medium.com/@benjamin.c.coleman/the-beginners-guide-to-beginning-three-js-c36b8947c2aa
// https://codepen.io/riktar/pen/YVJvyW

var renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// add a renderer
var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true, alpha: true});
renderer.setClearColor(0x000000, 0.0);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
window.addEventListener ( 'resize', function( )
{
var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize ( width, height );
camera.aspect = width / height;
camera.updateProjectionMatrix ( );
});
// RENDERER ENDS

var geometry = new THREE.SphereGeometry( 8 );
var material = new THREE.MeshBasicMaterial( {
    color: 0xFF5733,
    wireframe: true
} );

var sphere = new THREE.Mesh( geometry, material );
var sizer = true;

scene.add( sphere );
camera.position.z = 5;

function render() {
    requestAnimationFrame( render );
    sphere.rotation.x += 0.001;
    sphere.rotation.y += 0.001;

    renderer.render( scene, camera );
}

render();


// THREE JS ENDS

// BODY MOVING JS

var animation = bodymovin.loadAnimation ({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json'
})
