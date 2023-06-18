import { Dna } from "./Dna.js";
let canvas=document.getElementById('canvas');

canvas.width=innerWidth;
canvas.height=innerHeight;
let c=canvas.getContext("2d");
let target="hello";
function text(c,text,x,y,size){
    c.font = size+"px Arial";
    c.fillText(text, x, y);   
}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function giverandomchar(){
    let randomchoice=["a", "b", "c","d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"," "]
    return randomchoice[randomIntFromInterval(0,randomchoice.length-1)];
}
class Population{
    constructor(populationsize,mutation,target,populationbreedingsize){
        this.pop=[];
        this.largepop=[]
        this.largepopsize=populationbreedingsize;
        this.popsize=populationsize;
        this.mutation=mutation;
        this.target=target;
        this.targetsize=target.length;
        this.totalfitness=0;
        this.averagefitness=0;
        this.generation=0;
        this.fitest="generation one";
    }
    createPopulation(){
        for(let i=0;i<this.popsize;i++){
            let ret="";
            for(let j=0;j<this.targetsize;j++){
                ret+=giverandomchar();
            }
            this.pop.push(new Dna(ret));
        }
    }
    updatefitness(){
        this.totalfitness=0
        for(let i=0;i<this.popsize;i++){
            this.pop[i].calcfitness(target)
            this.totalfitness+=this.pop[i].fitness;
        }  
        this.averagefitness=this.totalfitness;
        
    }
    createlargepopulationpool(){
        this.largepop=[]
       for(let i=0;i<this.popsize;i++){
        this.pop[i].normalizedfitness=Math.floor((this.pop[i].fitness/this.averagefitness)*this.largepopsize);
       }
       
       for(let i=0;i<this.popsize;i++){
        for(let j=0;j<this.pop[i].fitness;j++){
            this.largepop.push(new Dna(this.pop[i].dna))
        }
       }
       
       this.largepopsize=this.largepop.length
    }
    mixdna(dna1,dna2){
        
        let s1=`${dna1.dna}`.slice(0,this.targetsize/2);
        let s2=`${dna2.dna}`.slice(this.targetsize/2,this.targetsize);
        
        let mixeddna=new Dna(s1+s2);
     
        return mixeddna;
    }
    selection(){
        let newpopulation=[];
        for(let i=0;i<this.popsize;i++){
            newpopulation.push(this.mixdna(this.largepop[randomIntFromInterval(0,this.largepopsize-1)],this.largepop[randomIntFromInterval(0,this.largepopsize-1)]))
        }
        this.pop=newpopulation;
    }
    fitestfinder(){
        let ret=`${this.pop[0].dna}`;
        let max=this.pop[0].fitness;
       
        for(let i=1;i<this.pop.length;i++){
            if(max<this.pop[i].fitness){
                max=this.pop[i].fitness;
                ret=`${this.pop[i].dna}`;
            }
           
        }
        
        return ret;
    }
    reproduce(){
        this.updatefitness();
        this.createlargepopulationpool();
        this.selection();
        this.updatefitness();
        this.fitest=this.fitestfinder()
    }
    dispaly()
    {
        let y=30;
        for(let i=0;i<this.popsize;i++){
            text(c,this.pop[i].dna,innerWidth/2,y,20);
            y+=20;
        }      
        text(c,"populationsize is: "+this.popsize,100,50);
        text(c,"mutation rate: "+this.mutation,100,20);
        text(c,this.target,100,100); 
        text(c,this.fitest,100,150); 
    }    
    mutate(){
        
    }
}

let pop=new Population(5000,0.1,target,100);
pop.createPopulation()
pop.reproduce()
text(c,target,10,50,20)

const fps = 0.1;
var myReq;
function animate() {
  // perform some animation task here
  c.clearRect(0,0,innerWidth,innerHeight)
  requestAnimationFrame(animate);
  pop.mutate()
  pop.reproduce()
  
  pop.dispaly()
  setTimeout(() => {
    myReq=requestAnimationFrame(animate);
  }, 1000 / fps);
  if(target===pop.fitest){
    cancelAnimationFrame(myReq);
  }
}
animate();

