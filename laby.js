let pile = []; //pile est un tableau rassemblant les coordonnées des intersections
let index = 0;
let x,y;
// let directionMax=[7,11,13,14];
let direction = [1,2,4,8];
let oldDir = 0;
let pileIncrease = true;


// définition de la taille du laby

taille = Math.floor(Math.random()*16)+10;
a = new Array(taille);
let disp = "";
for(let i=0;i<taille;i++)
{
    a[i] = new Array(taille);
}

// définition de l'entrée

xentree=Math.floor(Math.random()*taille);
if (xentree===0 || xentree===taille-1)
    yentree = (Math.floor(Math.random()*(taille-1)))+1;
else
    yentree = (Math.floor(Math.random()*2))*(taille-1);
// xsortie=Math.floor(Math.random()*taille)
// if (xsortie===0 || xsortie===taille-1)
//     ysortie=(Math.floor(Math.random()*(taille-1)))+1
// else
//     ysortie=(Math.floor(Math.random()*2))*(taille-1)
// while (xsortie===xentree & ysortie===xsortie)
// {
//     xsortie=Math.floor(Math.random()*taille)
//     if (xsortie===0 || xsortie===taille-1)
//         ysortie=(Math.floor(Math.random()*(taille-1)))+1
//     else
//         ysortie=(Math.floor(Math.random()*2))*(taille-1) 
// }
console.log("taille:"+taille);
console.log("xentrée:"+xentree);
console.log("yentrée:"+yentree);
// console.log("xsortie:"+xsortie)
// console.log("ysortie:"+ysortie)

// remplissage du carré du laby

for(let i=0;i<taille;i++)
{
    for(let j=0;j<taille;j++)
    {
        if((j==xentree) && (i==yentree)){
            a[j][i] = "E";
        }
        else{
            if((j>0 && j<taille-1) && (i>0 && i<taille-1)){
                a[j][i] = ".";
            }
            else{
                a[j][i] = "M";
            }
        }
        // disp += a[j][i] ;
    }
    // console.log(disp);
    // disp="";
}

// création de la première case à partie de l'entrée en fonction du cas de figure

if(yentree===0){
    pile[index] = {"x":xentree,"y":1,"direc":8};
    a[xentree][2] = "V";
}
if(yentree===taille-1){
    pile[index] = {"x":xentree,"y":taille-2,"direc":2};
    a[xentree][taille-3] = "V";
}
if(xentree===0){
    pile[index] = {"x":1,"y":yentree,"direc":4};
    a[2][yentree] = "V";
}
if(xentree===taille-1){
    pile[index] = {"x":taille-2,"y":yentree,"direc":1};
    a[taille-3][yentree] = "V";
}
x = pile[index].x;
y = pile[index].y;
a[x][y] = " ";
oldDir = pile[index].direc;
pileIncrease = true;
console.log("x"+x,"y"+y);

// creation du labyrinthe

choixDirection();
affichage();
// fonction choix aléatoire de la direction du creusement du laby
function dirAleatoire(){

    if(pile[index].direc >= 15){
        let last = pile.pop();
        index = (pile.length)-1;
        pileIncrease = false;
        console.log("last",last,index);
        if(index < 0)affichage();
        x = pile[index].x;
        y = pile[index].y;
    }

    let directionAleat = Math.floor(Math.random()*4);
    let dir = direction[directionAleat];
    console.log(directionAleat,dir,pile[index].direc,dir&pile[index].direc);
    if((dir & pile[index].direc)){
        dirAleatoire();
    }
    pile[index].direc += dir;
    return (dir);
}

function choixDirection(){
    let dir=dirAleatoire();

    if(dir===1){
        xtemp = x-1;
        ytemp = y;
    }
    if(dir===2){
        xtemp = x;
        ytemp = y-1;
    }
    if(dir===4){
        xtemp = x+1;
        ytemp = y;
    }
    if(dir===8){
        xtemp = x;
        ytemp = y+1;
    }
    console.log("dir",dir,xtemp,ytemp,a[xtemp][ytemp]);
    if(xtemp<=0 || xtemp>=taille-1 || ytemp<=0 || ytemp>=taille-1 || a[xtemp][ytemp]===" " || a[xtemp][ytemp]==="M"){
        choixDirection();
    }
    // ici il va falloir definir si lors du changement de direction la case dans le prolongement
    // de l'ancienne direction devient mur ou visitée (à faire!!!)

    casedispo(dir,xtemp,ytemp);

}



//fontion d'affichage du labyrinthe
function affichage(){
    for(let i=0;i<taille;i++)
{
    for(let j=0;j<taille;j++)
    {

        disp += a[j][i] ;
    }
    console.log(disp);
    disp = "";
}
}

function casedispo(dir,xtemp,ytemp){
    let xtemp2,xtemp3
    if(dir===2){
        xtemp2 = xtemp-1;
        xtemp3 = xtemp+1;
        caseAdj1 = a[xtemp2][ytemp];
        caseAdj2 = a[xtemp3][ytemp];
        if((caseAdj1==="M" || caseAdj1===".") && (caseAdj2==="M" || caseAdj2===".")){
            a[xtemp][ytemp] = " ";
            if(caseAdj1==="."){
                caseAdj1 = "V";
            }
            if(caseAdj2==="."){
                caseAdj2 = "V";
            }
        }
        else{

        }
    }
}