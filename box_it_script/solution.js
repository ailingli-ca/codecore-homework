function drawLine (num) {  
    let line = []
    for (let i = 0; i < num; i++){
        line += "─"
    }
    return line;
}
console.log(drawLine(4));