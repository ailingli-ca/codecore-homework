#! /usr/bin/env node    
function drawLine (num) {  
    let line = []
    const base = "\u2501"
    for (let i = 0; i < num; i++){
        line += base;
    }
    return line;
}

function drawTopBorder (num) {    
    const left = "\u250F";
    let line = drawLine(num);
    const right = "\u2513";
    return left + line + right;
}

function drawMiddleBorder (num) {
    const left = "\u2523";
    let line = drawLine(num);
    const right = "\u252B";
    return left + line + right;
}

function drawBottomBorder (num) {
    const left = "\u2517";
    let line = drawLine(num);
    const right = "\u251B";
    return left + line + right;
}

function drawBarsAround (str){                       
    const left = "\u2503";
    const right = "\u2503";
    return left + str + right;
}

function boxIt(arr){
    let max = 0 ;
    let line = '';
    if (arr.length === 0) {        
        return drawTopBorder(0)+'\n'+drawBottomBorder(0) ;
    }
    if( arr.length === 1) {
        return drawTopBorder(arr[0].length) + '\n' + drawBarsAround(arr[0])+ '\n' + drawBottomBorder(arr[0].length)
    }
      
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > max ){
            max = arr[i].length
        }     
    }  

    line += drawTopBorder(max)+'\n';
    for (let i = 0; i < arr.length; i++){
        let total = arr[i];
        if (arr[i].length < max){
            for (let space = 0; space < max - arr[i].length; space++){
                total +=" ";
            }
        }

        if(i === arr.length-1){
            line += drawBarsAround(total)+"\n"+drawBottomBorder(max)
        } else {
            line += drawBarsAround(total)+"\n"+drawMiddleBorder(max)+"\n"
        }
    }
    return line;
}

//console.log(boxIt(['Joe Snow','Cersei Lannister'])); //'Joe Snow','Cersei Lannister','Daenerys Targaryen'

//Turn file into a script to use if from command line : $ node boxit.js 
let script = process.argv.slice(2);
console.log(boxIt(script));

//STRETCH  
//1) Add "#! /usr/bin/env node" at the first line of the file, and run "chmod +x boxit.js" in terminal
// ./boxit.js 'Joe Snow' 'Cersei Lannister' 'Daenerys Targaryen'

//2) 
// npm install csv-parser
const csv = require(`csv-parser`);
const fs = require(`fs`);
let results = [] ;

fs.createReadStream(`characters.csv`)
    .pipe(csv({headers:false}))
    .on('data',(data) => results.push([data]))
    .on('end', ()=> {
        const csvArray = [];
        for (i of results){
            if (script[0].includes(".csv")){
            let j = results[i[i]]+ "\u2503" +results[i[i+1]]
            csvArray.push(j);
            }
         }        
        //console.log(boxIt(csvArray));
    });







