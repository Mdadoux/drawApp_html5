    var canvas = document.getElementById('canvas');
    var context = canvas.getContext( '2d' );   
   

    var radius =  15;
    var isDraging = false;
	var cvH =  600;
	var cvW = 800;


canvas.width = cvW;
canvas.height = cvH;

window.onresize= function(){
    var image = context.getImageData(0,0,canvas.width,canvas.height);
    canvas.width = cvW;
    canvas.height = cvH;
    context.putImageData(image,0,0);    

   

}


// supprimer toute pixel dans la vue 
function clearCanvas(canvas){
    canvas.width = canvas.width;

}
// dessiner des lignes 
var dessinerPoint = function(e){  
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
    // au glissement de la souris 
    if (isDraging) {
		// on fait unelihne depuis la pos ition de la souris 
       // context.lineTo(e.clientX,e.clientY);
	    context.lineTo(mouseX,mouseY);
        context.stroke();
        context.beginPath(); //commence un nouveau dessin   
    //  arc prend en param x, y angle radius;      
		context.arc(mouseX,mouseY,radius,0,2*Math.PI);		
        context.fill(); // dessiner une ligne 
        context.beginPath();
        context.moveTo(mouseX,mouseY); // potionenement de la souris 
    }
    
   //console.log(evt.offsetX);
};

// verifier si la sourisest appuyée avant d'appeler la function dessiner 
var engage = function(e){    
     isDraging = true;
     dessinerPoint(e);
};

// la souris est relachée 
var desengage = function(){
     isDraging = false;
     context.beginPath();
};

// écouter les event de la souris 
canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', desengage);
canvas.addEventListener('mousemove',dessinerPoint);



function finillCanvas (){
     context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

}