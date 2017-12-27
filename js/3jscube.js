// UNCOMMENT TO ENABLE STATES --- (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()
//tuto using https://medium.com/@benjamin.c.coleman/the-beginners-guide-to-beginning-three-js-c36b8947c2aa

// HTML EMBED = <canvas id="myCanvas" style="position:absolute; left:0%; top:0%; border:none;"></canvas>
    var renderer,
    	scene,
    	camera,
    	myCanvas = document.getElementById('myCanvas');

//set the scene
var scene = new THREE.Scene();
//add a camera
var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 0.1, 1000 );
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


//add geometry
//create new
var geometry = new THREE.BoxGeometry( 2, 2, 2);
var cubeMaterials = [
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/eos.png'), side: THREE.DoubleSide }), //Right, Left, Top, Bottom, Front, Back
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/polkadot.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/redbelly.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/eos.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/polkadot.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( 'images/3d/redbelly.png'), side: THREE.DoubleSide }),
];
var material = new THREE.MeshFaceMaterial ( cubeMaterials ); // create a material
//add the geometry to the mesh, and apply the material to it
var cube = new THREE.Mesh( geometry, material );
scene.add( cube )


var geometry = new THREE.BoxGeometry( 4, 4, 4);
var material = new THREE.MeshBasicMaterial( {
 color: "", wireframe: true, transparent: true
})
var wireframeCube = new THREE.Mesh ( geometry, material )
scene.add( wireframeCube )


camera.position.z = 7;
camera.position.x = -2;

//add point light
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );

//add ambient light
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); //soft white light(color,intensity)
scene.add(ambientLight);

//render loop
var render = function () {
  requestAnimationFrame( render );

  //add the geometry to the renderer
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  wireframeCube.rotation.x += 0.01;
  wireframeCube.rotation.y += 0.01;
  //camera.updateProjectionMatrix();

  renderer.render(scene, camera);
};

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
