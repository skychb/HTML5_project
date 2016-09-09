var container;

var camera, controls, scene, renderer;

var mesh, texture, material, geometry, parameters, i, h, color, sprite, size;

var worldWidth = 1024, worldDepth = 512,
worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;


var clock = new THREE.Clock();

init();
animate();

function init() {

	container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2( 0x000000, 0.00015 );

	controls = new THREE.FirstPersonControls( camera );
	controls.movementSpeed = 3000;
	controls.lookSpeed = 0.15;
	controls.constrainVertical = true;
	controls.verticalMin = 1.0;
	controls.minPolarAngle = 0; // radians
	controls.maxPolarAngle = Math.PI / 2; // radians

	var material = new THREE.SpriteMaterial( {
					map: new THREE.CanvasTexture( generateSprite() ),
					blending: THREE.AdditiveBlending
				} );

	for ( var i = 0; i < 2000; i++ ) {

					particle = new THREE.Sprite( material );

					initParticle( particle, i * 10 );
					initParticle1( particle, i * 10 );

					scene.add( particle );
				}

	data = generateHeight( worldWidth, worldDepth );

	camera.position.y = data[ worldHalfWidth + worldHalfDepth * worldWidth ] * 3 ;
	camera.position.x = -250000;
	//-250000

	var geometry = new THREE.PlaneBufferGeometry( 500000, 1000, worldWidth - 1, worldDepth - 1 );
	geometry.rotateX( - Math.PI / 2 );

	var vertices = geometry.attributes.position.array;

	for ( var i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

		vertices[ j + 1 ] = data[ i ] * 1;

	}

	texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
	texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;

	mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture } ) );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x000000, 1);
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container.innerHTML = "";

	container.appendChild( renderer.domElement );

	window.setInterval(function(){
		console.log(camera.position.x +","+ camera.position.y+","+camera.position.z);

	}, 1000);

	window.addEventListener( 'resize', onWindowResize, false );

	var x = window.innerWidth / 2 - 300;
	var infoArray = [["HTML5 FINAL", -240000],["Sung by Simon & gatfunkel", -230000],["Are you", -220000], ["going to", -216000], ["Scarboruogh Fair?", -210000], ["Parsley, Sage, Rosemary and Thyme", -190000],
	["Remember Me", -170000],["to one who lives there", -160000], ["True love of mine", -135000], ["Tell her", -120000], ["make me a cambric shirt", -110000], ["parsley", -97000],
	["Sage", -95000], ["Rosemary and Thyme", -92000], ["Without no seams", -70000], ["nor needle work", -60000], ["Then She'll be a true love of mine.", -45000]];
	for(var i =0; i<infoArray.length;i++){
		mesh = createLabel(infoArray[i][0], infoArray[i][1], 700, 0, 100, "white","black");
		scene.add(mesh);
	}
}

function createLabel(text, x, y, z, size, color, backGroundColor, backgroundMargin) {
	if(!backgroundMargin)
		backgroundMargin = 50;

	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	context.font = size + "pt Arial";
	var textWidth = context.measureText(text).width;
	canvas.width = textWidth + backgroundMargin;
	canvas.height = size + backgroundMargin;
	context = canvas.getContext("2d");
	context.font = size + "pt Arial";
	if(backGroundColor) {
		context.fillStyle = backGroundColor;
		context.fillRect(canvas.width / 2 - textWidth / 2 - backgroundMargin / 2, canvas.height / 2 - size / 2 - +backgroundMargin / 2, textWidth + backgroundMargin, size + backgroundMargin);
	}

	context.textAlign = "center";
	context.textBaseline = "middle";
	context.fillStyle = color;
	context.fillText(text, canvas.width / 2, canvas.height / 2);

	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;
	var material = new THREE.MeshBasicMaterial({
		map : texture
	});
	var mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width, canvas.height), material);
	// mesh.overdraw = true;
	mesh.doubleSided = true;
	mesh.position.x = x - canvas.width;
	// mesh.rotation.x = Math.PI /1.5;
	mesh.rotation.y = Math.PI *1.5;

	mesh.position.y = y - canvas.height;
	mesh.position.z = z;
	return mesh;
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

}

function generateSprite() {

	var canvas = document.createElement( 'canvas' );
	canvas.width = 16;
	canvas.height = 16;

	var context = canvas.getContext( '2d' );
	var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
	gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
	gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
	gradient.addColorStop( 0.4, 'rgba(0,0,64,1)' );
	gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

	context.fillStyle = gradient;
	context.fillRect( 0, 0, canvas.width, canvas.height );

	return canvas;

}

function initParticle( particle, delay ) {

				var particle = this instanceof THREE.Sprite ? this : particle;
				var delay = delay !== undefined ? delay : 0;

				particle.position.set( -50000, 300, 0 );
				particle.scale.x = particle.scale.y = Math.random() * 100 + 16;

				new TWEEN.Tween( particle )
					.delay( delay )
					.to( {}, 10000 )
					.onComplete( initParticle )
					.start();

				new TWEEN.Tween( particle.position )
					.delay( delay )
					.to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
					.start();

				new TWEEN.Tween( particle.scale )
					.delay( delay )
					.to( { x: 0.05, y: 0.01 }, 10000 )
					.start();

			}

function initParticle1( particle, delay ) {

	var particle = this instanceof THREE.Sprite ? this : particle;
	var delay = delay !== undefined ? delay : 0;

	particle.position.set( -5000, 300, 1000 );
	particle.scale.x = particle.scale.y = Math.random() * 100 + 16;

	new TWEEN.Tween( particle )
		.delay( delay )
		.to( {}, 10000 )
		.onComplete( initParticle )
		.start();

	new TWEEN.Tween( particle.position )
		.delay( delay )
		.to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
		.start();

	new TWEEN.Tween( particle.scale )
		.delay( delay )
		.to( { x: 0.05, y: 0.01 }, 10000 )
		.start();

}

function generateHeight( width, height ) {

	var size = width * height, data = new Uint8Array( size ),
	perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

	for ( var j = 0; j < 4; j ++ ) {

		for ( var i = 0; i < size; i ++ ) {

			var x = i % width, y = ( i / width );
			data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

		}

		quality *= 5;

	}

	return data;

}

function generateTexture( data, width, height ) {

	var canvas, canvasScaled, context, image, imageData,
	level, diff, vector3, sun, shade;

	vector3 = new THREE.Vector3( 1, 1, 0 );

	sun = new THREE.Vector3( 1, 1, 1 );
	sun.normalize();

	canvas = document.createElement( 'canvas' );
	canvas.width = width;
	canvas.height = height;

	context = canvas.getContext( '2d' );
	context.fillStyle = '#fff';
	context.fillRect( 0, 0, width, height );

	image = context.getImageData( 0, 0, canvas.width, canvas.height );
	imageData = image.data;

	for ( var i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

		vector3.x = data[ j - 2 ] - data[ j + 2 ];
		vector3.y = 2;
		vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
		vector3.normalize();

		shade = vector3.dot( sun );

		imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
		imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
		imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
	}

	context.putImageData( image, 0, 0 );

	// Scaled 4x

	canvasScaled = document.createElement( 'canvas' );
	canvasScaled.width = width * 4;
	canvasScaled.height = height * 4;

	context = canvasScaled.getContext( '2d' );
	context.scale( 4, 4 );
	context.drawImage( canvas, 0, 0 );

	image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
	imageData = image.data;

	for ( var i = 0, l = imageData.length; i < l; i += 4 ) {

		var v = ~~ ( Math.random() * 5 );

		imageData[ i ] += v;
		imageData[ i + 1 ] += v;
		imageData[ i + 2 ] += v;

	}

	context.putImageData( image, 0, 0 );

	return canvasScaled;

}

function animate() {

	requestAnimationFrame( animate );
	render();

}

function render() {
	TWEEN.update();
	controls.update( clock.getDelta() );
	renderer.render( scene, camera );

}