export class Dna{
constructor(word){
    this.dna=word;
    this.fitness=0;
    this.normalizedfitness=0;
    this.dnalength=word.length;
}
calcfitness(target){
    this.fitness=0;
    for(let i=0;i<this.dnalength;i++){
        if(this.dna[i]===target[i]){
            this.fitness++;
        }
    }
}
}