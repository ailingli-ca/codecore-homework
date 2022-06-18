class Turtle {
    constructor(x, y){        
        this.x = x;
        this.y = y;
        this.way = 'east';
        this.p = [[x,y]];    
    }

    forward(num){
        if(this.way === 'east'){
              for(let i = 1 ; i <= num; i++){
              this.p.push([this.x + i, this.y])
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
            this.way = 'south';
        } else if(this.way === 'south'){
            this.way = 'west';
        } else if(this.way === 'west'){
            this.way = 'north';
        } else if(this.way === 'north'){
            this.way = 'east';
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
        return this        
    }

    print(){
        this.xMax = 0;
        this.yMax = 0;

        for (let i = 0; i < this.p.length; i++){
            let xVal = this.p[i][0];
            let yVal = this.p[i][1];

            if (xVal > this.xMax){
                this.xMax = xVal;                
            }
            
            if (yVal > this.yMax){
                this.yMax = yVal;
            }           
        };
        
        this.max = [this.xMax, this.yMax];
        //console.log(this.max); 

        let draw = "-- BEGIN LOG" +"\n";

        for (let i = 0; i <= this.max[1]; i++){
            for (let j = 0; j <= this.max[0]; j++){
                
                let square = false;

                for (let z = 0; z < this.p.length; z++){
                    if (this.p[z][0] === j && this.p[z][1] === i){

                        draw += '■ ';
                        square = true;
                        break;

                    };
                };

                if (square == false){
                    draw += '□ ';
                };
            };

            draw += '\n';

        };
        draw += '-- END LOG';

        console.log(draw);
        //return draw; 

    }

}

// const flash = new Turtle(0, 0).forward(3).right().forward(3);
// flash.allPoints()
// flash.print()

// new Turtle(0, 4)
// .forward(3)
// .left()
// .forward(3)
// .right()
// .forward(5)
// .right()
// .forward(8)
// .right()
// .forward(5)
// .right()
// .forward(3)
// .left()
// .forward(3)
// .print();

//STRETCH  
//As A Script

function forScript (string){

    let terminalInput = string.split('-');
   
    let turtleMove = [];
    
    for (let i = 0; i < terminalInput.length; i++){
        turtleMove.push(terminalInput[i]);
    }

    let start_x = 0;
    let start_y = 0;

    if (terminalInput[0].includes('t')){
        start_x = parseInt(terminalInput[0][1]);
        start_y = parseInt(terminalInput[0][3]);
    }

    const scriptTurtle = new Turtle (start_x, start_y);
    //console.log(scriptTurtle);
  
    for (let j = 0; j < turtleMove.length; j++){
        if(turtleMove[j].includes('f')){
            let count = parseInt(turtleMove[j].slice(1));
            scriptTurtle.forward(count);
        } else if(turtleMove[j].includes('r')){
            scriptTurtle.right();
        } else if(turtleMove[j].includes('l')){
            scriptTurtle.left();
        };
        
    };
    return scriptTurtle.print();
}

// $ node turtle_graphics.js t5,5-f10-r-f5-r-f10-r-f5-r-f2-r-f5-l-f2-l-f5


// 2) Save To a File

const fs = require("fs");

let fileInput = process.argv.slice(2);

if (fileInput[0].includes("--output")){
    const file = fileInput[0].split("=");
    
    fileName = file[1];
    //console.log(fileName);

    const result = forScript(fileInput[1]);

    fs.writeFile(fileName, result, (err) => {
        if (err) {
            console.log('Error', err)
        } else {
            console.log(`🐢 Drawing written to ${fileName}`)
        };
    })
} else {
    forScript(fileInput[0]);
}

// // $ node turtle_graphics.js --output=drawing.txt f10-r-f10-r-f10-r-f10
