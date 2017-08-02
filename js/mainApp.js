    var canvas = document.getElementById('canvas');
    var context = canvas.getContext( '2d' );
    
    var radius =  5;
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

context.lineWidth = radius*2;


var dessinerPoint = function(e){  
    // au glissement de la souris 
    if (isDraging) {
//        on fait unelihne depuis la pos ition de la souris 
        context.lineTo(e.clientX,e.clientY);
        context.stroke();
        context.beginPath(); //commence un nouveau dessin   
    //    arc prend en param x, y angle   radius;    
        context.arc(e.clientX, e.clientY,radius,0,2*Math.PI);
    //    context.arc(e.offsetX, e.offsetY,radius,0,2*Math.PI);
        context.fill(); // dessine une ligne 
        context.beginPath();
        context.moveTo(e.clientX,e.clientY); // potionenement de la souris 
    }
    
   //console.log(evt.offsetX);
};

var engage = function(e){    
     isDraging = true;
     dessinerPoint(e);
};

var desengage = function(){
     isDraging = false;
     context.beginPath();
};

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mouseup', desengage);
canvas.addEventListener('mousemove',dessinerPoint);