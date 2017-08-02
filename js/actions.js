var toolbar = __get('toolbar');



var updateRadius = function(newsRad){
    
    if (newsRad < minRadius) {
        newsRad = minRadius;
    }else if(newsRad > maxRadius){
        newsRad = maxRadius;        
    }
    
    radius = newsRad;
    context.lineWidth = radius*2;
    radSpan.innerHTML = newsRad;
};


var minRadius = 0.5,
    maxRadius  = 100,
    defaultRadius = 5,
    coef = 5,
    radSpan = document.getElementById('radVal'),
    decRad = document.getElementById('decRad'),
    incRad = document.getElementById('incRad');
    
// diminuer le rayon 
decRad.addEventListener('click',function(){

    updateRadius(radius-coef);
})

// augmenter le rayon 
incRad.addEventListener('click',function(){

    updateRadius(radius+coef);
});

updateRadius(defaultRadius);


function __get(id){
    return document.getElementById(id);
}

/*=====================================================
                    GESTION DES COULEURS 
========================================================*/

var colors = [
                "black",
                "red",
                "blue",
                "yellow",
                "orange",
                "indigo",
                "violet",
                "#fff"

        ];

// recupération des éléments de la plaette de couleur 

var palettes = document.getElementsByClassName('color_palet'); 


// les couleur du tableau son lié a la bar couleurs
for (var i = 0; i < colors.length; i++) {
   
   var palette = document.createElement("div"); 
   palette.className = "color_palet";
   palette.style.backgroundColor = colors[i];
   palette.addEventListener('click', setPalette);
   document.getElementById("colors").appendChild(palette);

   
};

function getColor(color){
    //changer la couleur du fille dans la vue
    context.fillStyle = color;
    //changer la couleur des lihnes dans la vue 
    context.strokeStyle = color;

    var active = document.getElementsByClassName('active')[0];

    if (active) {

        active.className = "color_palet";
    };


}


function setPalette(evt){
    var palette = evt.target;
    //identifier l'éléments clické
    getColor(palette.style.backgroundColor);
    //injecter la couleur 
    palette.className += " active";
    // injecter la class active dans l'element courant

}

setPalette({target : document.getElementsByClassName('color_palet')[0]});


/*==================================
    sauvegarder une image
===================================*/

var saveBtn = __get('saveBtn');// boouton souvegarder

saveBtn.addEventListener('click',saveImage);

function saveImage(){
    var data = canvas.toDataURL();
    var left  = (window.innerWidth)/2 ,
        top = (window.innerHeight)/2;  

    window.open(data,'_blank','location=0, scrollbars=0,scrollbars=0');
}