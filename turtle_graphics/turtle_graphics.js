class Turtle {
    constructor(x, y){        
        this.x = x;
        this.y = y;
        this.way = 'east'
        this.p = []    
    }

    forward(num){
        if(this.way === 'east'){
              for(let i = 1 ; i <= num; i++){
              this.p.push([this.x + num, this.y])
              }
              this.x += num
          } else if(this.way === 'south'){
              for(let i = 1; i <= num; i++){
              this.p.push([this.x, this.y + i])
              }
              this.y += num
          } else if(this.way === 'west'){
              for(let i = 1; i <= num; i++){
              this.p.push([this.x - i, this.y])
              }
              this.x -= num
          } else if(this.way === 'north'){
              for(let i = 1; i <= num; i++){
              this.p.push([this.x, this.y - i])
              }
              this.y -= num
          }
        return this
    }

    right(){
        if(this.way === 'east'){
            this.way = 'south'
        } else if(this.way === 'south'){
            this.way = 'west'
        } else if(this.way === 'west'){
            this.way = 'north'
        } else if(this.way === 'north'){
            this.way = 'east'
        }
        return this
    }

    left(){
        if(this.way === 'east'){
            this.way = 'north'
        } else if(this.way === 'north'){
            this.way = 'west'
        } else if(this.way === 'west'){
            this.way = 'south'
        } else if(this.way === 'south'){
            this.way = 'east'
        }
        return this
    }

    allPoints(){
        console.log(this.p)
        return this        
    }






}

const flash = new Turtle(0, 0).forward(3).left().forward(3);
flash.allPoints()