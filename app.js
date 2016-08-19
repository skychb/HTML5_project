var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function webgl_support() { 
   try{
    var canvas = document.createElement( 'canvas' ); 
    return !! window.WebGLRenderingContext && ( 
         canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
   }catch( e ) { return false; } 
 };
 
 function checkWebGl(){
	 if(!webgl_support()){
	 	console.log("This browser doesn't support WebGl, Please Update your browser!");
		return false;
	 }else{
		console.log("this browser works!");
		return true;
	 }
 };
 
 checkWebGl();

 canvas.addEventListener('keydown', doKeyDown, true);
 ctx.fillRect(100,100,50,30);

 var x = 100;
 var y = 100;

 function doKeyDown(e){
 	// Key W
 	if(e.keyCode == 87 || e.keyCode == 38){
 		clearCanvas();
 		y = y-10;
 		ctx.fillRect(x,y,50,30);
 	}
 	// Key S
 	if(e.keyCode == 83 || e.keyCode == 40){
 		clearCanvas();
 		y = y+10;
 		ctx.fillRect(x, y, 50, 30);
 	}
 	// Key A
 	if(e.keyCode == 65 || e.keyCode == 37){
 		clearCanvas();
 		x = x-10;
 		ctx.fillRect(x,y,50,30);
 	}
 	//Key D
 	if(e.keyCode == 68 || e.keyCode == 39){
 		clearCanvas();
 		x = x+10;
 		ctx.fillRect(x,y,50,30);
 	}
 };

 	function clearCanvas(){
 		canvas.width = canvas.width;
 	};
 
 