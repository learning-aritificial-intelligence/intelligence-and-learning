let canvas=document.getElementById("canvas")
canvas.width=innerWidth
canvas.height=innerHeight
let c=canvas.getContext("2d")
let rows=40;
let cols=40;
let cellsize=10;
let grid=[]
let stack=[]
function getindex(i,j){
    if(i<0 || j< 0 || i>=rows || j>=cols){
        return -1;
    }
    return i*rows+j;
}
function drawline(c,x1,y1,x2,y2){
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
class cell{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.cellsize=cellsize;
        this.walls=[true,true,true,true]
        this.visitedarr=[]
        //walls=top,right,bottom,left
        this.shift=100;
        this.visited=false;
        this.calx=this.shift+this.y*this.cellsize;
        this.caly=this.shift+this.x*this.cellsize;
    }
    checkneighbours(){
        
        let top=getindex(this.x-1,this.y)//top
        let right=getindex(this.x,this.y+1)//right
        let bottom=getindex(this.x+1,this.y)//bottom
        let left=getindex(this.x,this.y-1)//left
        
        if(top!=-1){
            if(!grid[top].visited){
                this.visitedarr.push(top)
            }
        }
        if(right!=-1){
            if(!grid[right].visited){
                this.visitedarr.push(right)
            }
        }
        if(bottom!=-1){
            if(!grid[bottom].visited){
                this.visitedarr.push(bottom)
            }
        }
        if(left!=-1){
            if(!grid[left].visited){
                this.visitedarr.push(left)  
            }
        }
        if(this.visitedarr.length===0){
            return -1;
        }
        else{
            let rand=randomIntFromInterval(0,this.visitedarr.length-1);
            return this.visitedarr[rand]
        }
        
    }
    display(c){
        c.beginPath();
        if(this.walls[0]){
            drawline(c,this.calx,this.caly,this.calx+this.cellsize,this.caly);//top
        }
        if(this.walls[1]){
            drawline(c,this.calx+this.cellsize,this.caly,this.calx+this.cellsize,this.caly+this.cellsize);//right
        }
        if(this.walls[2]){
            drawline(c,this.calx+this.cellsize,this.caly+this.cellsize,this.calx,this.caly+this.cellsize);//bottom
        }
        if(this.walls[3]){
            drawline(c,this.calx,this.caly+this.cellsize,this.calx,this.caly);//left
        }
        c.stroke();
        if(this.visited){
        c.fillRect(this.calx,this.caly,this.cellsize,this.cellsize);
        c.fillStyle="red";
        }
    }
}
// function depthfirstsearch(i){
// if(!grid[i].visited){
//     grid[i].visited=true;
// // let next=grid[i].checkneighbours()
// let top=getindex(grid[i].x-1,grid[i].y)//top
// let right=getindex(grid[i].x,grid[i].y+1)//right
// let bottom=getindex(grid[i].x+1,grid[i].y)//bottom
// let left=getindex(grid[i].x,grid[i].y-1)//left
// if(top!=-1 && !grid[top].visited){
//     grid[i].walls[0]=false;
//     grid[top].walls[2]=false;
    
//     depthfirstsearch(top)
// }
// if( right!=-1 && !grid[right].visited){
    
//     grid[i].walls[1]=false;
//     grid[right].walls[3]=false;
//     depthfirstsearch(right)
// }
// if(bottom!=-1 && !grid[bottom].visited){
//     grid[i].walls[2]=false;
//     grid[bottom].walls[0]=false;
    
//     depthfirstsearch(bottom)
// }
// if(left!=-1 && !grid[left].visited){
//     grid[i].walls[3]=false;
//     grid[left].walls[1]=false;
    
//     depthfirstsearch(left)
// }
// }
// }
function removewalls(curr,next){
    
    if(curr.x-1===next.x && curr.y===next.y){//top
        curr.walls[0]=false;
        next.walls[2]=false;
        
    }
    else if(curr.x===next.x && curr.y+1===next.y){//right
        curr.walls[1]=false;
        next.walls[3]=false;
    }
    else if(curr.x+1===next.x && curr.y===next.y){//bottom
        curr.walls[2]=false;
        next.walls[0]=false;
    }
    else{//left
        curr.walls[3]=false;
        next.walls[1]=false;
    }
}
function depthfirstsearch(i){
    if(!grid[i].visited){
        grid[i].visited=true;
    let next=grid[i].checkneighbours()
    if(next!=-1){
    stack.push(i)
    removewalls(grid[i],grid[next]);    
    depthfirstsearch(next)
    }
    
    }
    else{
        if(stack.length>0){
            let curr=stack.pop();
            let next=grid[curr].checkneighbours()
            if(next!=-1){
                removewalls(grid[curr],grid[next]);  
                depthfirstsearch(next);
            }
            next=grid[curr].checkneighbours()
            if(next!=-1){
                // removewalls(grid[curr],grid[next]);  
                depthfirstsearch(next);
            }
            next=grid[curr].checkneighbours()
            if(next!=-1){
                // removewalls(grid[curr],grid[next]);  
                depthfirstsearch(next);
            }
            
        }
    }
    }
   
    

function initialize(){
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            grid.push(new cell(i,j))
        }
    }   
    // grid[0].walls[1]=false;
    // let i=1;
    // let j=0;
    // grid[10].walls[3]=false;
   
    // grid[getindex(1,0)].visited=true;
    
    
}

function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    requestAnimationFrame(animate)
    for(let i=0;i<grid.length;i++){
        grid[i].display(c);
    }
    depthfirstsearch(0);
    
}
alert("refresh page for new random maze")
initialize()
animate()
