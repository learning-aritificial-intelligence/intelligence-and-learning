let canvas=document.getElementById("canvas");
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight
let grid=[]
let stack=[]
let cols=50;
let rows=50;
let size=10;
let gridshift=10;
let curr=0;
const fps = 1000;
let prev=null;
function getindex(i,j){
    if(i<0 || j<0 || i>=cols || j>=rows){
        return -1;
    }
    return i+j*cols;
}
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function removewalls(curr,next){
    if(grid[curr].x-1===grid[next].x && grid[curr].y===grid[next].y){//top
        grid[curr].walls[0]=false;
        grid[next].walls[2]=false;
    }
    else if(grid[curr].x===grid[next].x && grid[curr].y+1===grid[next].y){//right
        grid[curr].walls[1]=false;
        grid[next].walls[3]=false;
    }
    else if(grid[curr].x+1===grid[next].x && grid[curr].y===grid[next].y){//bottom
        grid[curr].walls[2]=false;
        grid[next].walls[0]=false;
    }
    else{//left
        grid[curr].walls[3]=false;
        grid[next].walls[1]=false;
    }
}
class cell{
constructor(x,y,size,shift){
    this.x=y;
    this.y=x;
    this.calx=x*size+shift;
    this.caly=y*size+shift;
    this.size=size;
    this.walls=[true,true,true,true]//top,right,bottom,left
    this.visitedarr=[]
    this.visited=false;
    this.head=false;
}
drawline(c,x1,y1,x2,y2){
    c.moveTo(x1,y1)
    c.lineTo(x2,y2)
}
display(c){
c.beginPath()
if(this.walls[0]){
    this.drawline(c,this.calx,this.caly,this.calx+this.size,this.caly)//top
}
if(this.walls[1]){
    this.drawline(c,this.calx+this.size,this.caly,this.calx+size,this.caly+size)//right
}
if(this.walls[2]){
    this.drawline(c,this.calx+size,this.caly+size,this.calx,this.caly+size)//bottom
}
if(this.walls[3]){
    this.drawline(c,this.calx,this.caly+size,this.calx,this.caly)//left
}
if(this.visited){
    
    if(this.head){
        c.fillStyle="blue"
    }
    else{
        c.fillStyle="red"
    }
    c.fillRect(this.calx,this.caly,this.size,this.size)
    
}
c.stroke()
}
getneighbours(){
    this.visitedarr=[]
    let top=getindex(this.x-1,this.y)//top
    let right=getindex(this.x,this.y+1)//right
    let bottom=getindex(this.x+1,this.y)//bottom
    let left=getindex(this.x,this.y-1)//left
    // console.log(top,"t",this.x-1,this.y,"top",right,"r",this.x,this.y+1,"right",bottom,"b",this.x+1,this.y,"bottom",left,"l",this.x,this.y-1,"left")
    console.log(top,right,bottom,left)
    if(top!==-1 && !grid[top].visited){
        this.visitedarr.push(top);
    }
    if(right!==-1 && !grid[right].visited){
        this.visitedarr.push(right);
    }
    if(bottom!==-1 && !grid[bottom].visited){
        this.visitedarr.push(bottom);
    }
    if(left!==-1 && !grid[left].visited){
        this.visitedarr.push(left);
    }
    if(this.visitedarr.length===0){
        return -1;
    }
    
    let ret=randomIntFromInterval(0,this.visitedarr.length-1);
   console.log(this.visitedarr,this.visitedarr[ret])
    return this.visitedarr[ret];
}
}

function initiate(){
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            grid.push(new cell(i,j,size,gridshift))
        }
    }
}
initiate()


function animate(){
    c.clearRect(0,0,innerWidth,innerHeight)
    grid[curr].visited=true;
    grid[curr].head=true;//for seeing the head
    let next=grid[curr].getneighbours()
    prev=curr;//for seeing the head
    if(next!==-1){
        stack.push(curr)
        removewalls(curr,next)
       
        curr=next;
    }
    else{
        if(stack.length!==0){ 
            curr=stack.pop()
        }
        
    }
    
    for(let i=0;i<grid.length;i++){
        grid[i].display(c)
    }
    
    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / fps);
     
      grid[prev].head=false;//for seeing the head
}

animate()