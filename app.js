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
	 }else{
		 console.log("this browser works!");
	 }
 };
 
 checkWebGl();
 