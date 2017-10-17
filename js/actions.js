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

// la premire couleur est sélectionée par défaut
setPalette({target : document.getElementsByClassName('color_palet')[0]});


// function pour gestion des outils 


var tools = document.querySelectorAll(".spanTools");

for (var i = 0; i < tools.length; i++) {
    
    tool  = tools[i].addEventListener('click',function(evt){

        var selectedTool = this;
        var currentItem = document.getElementsByClassName('currentTool')[0];

        if (currentItem){

            currentItem.classList.remove('currentTool');
        }
        selectedTool.classList.add('currentTool');
        // recuperer le nom de l'outil grace à son id 
        var selectedTool_name = selectedTool.getAttribute('id');
        // si on choisi la gomme on met la couleur blanc   
        if (selectedTool_name === 'eraserTool') {
            context.fillStyle = '#fff';
            //changer la couleur des lignes dans la vue 
            context.strokeStyle = '#fff';
            radius = 15;
        }else if(selectedTool_name === 'pentTool'){

            getActiveColor();
        }
    })
};


/*trouver la couleur actuellement utilisée pour dessiner*/

function getActiveColor(){
   var currentColor = document.getElementsByClassName('active')[0];   
    if (currentColor) {

        var $activeColor = currentColor.getAttribute("style").split(":");
        var codeColor = $activeColor[1].toString();
        console.log(codeColor.slice(0,-1));
        
        context.fillStyle = codeColor;
            //changer la couleur des lignes dans la vue 
        context.strokeStyle = codeColor;
        dessinerPoint;

    };



}



/*==================================
    sauvegarder une image
===================================*/


function saveImage(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}


var saveBtn = __get('saveBtn');// boouton souvegarder
saveBtn.addEventListener('click', saveImage(this, 'canvas', 'imageFromCanvas.png'),false);

/*
function saveImage(){
    var data = canvas.toDataURL();
    var left  = (window.innerWidth)/2,
        top = (window.innerHeight)/2; 
    window.open(data,'_blank','location=0, menubar=0');
}
*/

/*==================
 nettoyer le canvas 
====================*/
var clearBtn = __get("btnClear");
 clearBtn.addEventListener('click',function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
 });
