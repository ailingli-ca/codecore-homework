function drawLine (num) {  
    let line = []
    const base = "\u2501"
    for (let i = 0; i < num; i++){
        line += "─"
    }
    return line;
}
//console.log(drawLine(4)); //for check

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






