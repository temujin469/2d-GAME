const c = myCanvas
c.width = w = window.innerWidth
c.height = h = window.innerHeight
const ctx = c.getContext("2d")
const board = document.getElementById('rock');

const keys = []

player = {
    x:32,
    y:48,
    width:40,
    height:56,
    frameX:0,
    frameY:0,
    speed:16,
    zam:0,
    moving:false,
    rockCount:0
}

class Rock {
    constructor(width,height){
        this.width=width
        this.height = height;
        this.speed = Math.floor(Math.random()*0)
        this.x = Math.floor(Math.random()*w)
        this.y = Math.floor(Math.random()*h)
        this.dx =this.x- player.x
        this.dy = this.y -player.y
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = 'brown'
        ctx.fillRect(this.x,this.y,this.width,this.height);
        ctx.fill();
    }
    update(){
        this.x+=this.speed;
        this.y+= this.speed;
    }
    
}
let hasRock = 0
const rockCount = 10;
const rocks = []
for(let i=0;i<rockCount;i++){
    const rock = new Rock(20,20);
    rocks.push(rock)
}
// console.log(enemys)

const playerChar = new Image()
playerChar.src = "img/hulk.png"

// const backround = new Image()
// backround.src = "img/jungle.jpg"

function drawChar(img,sX,sY,sW,sH,dX,dY,dW,dH){
    ctx.drawImage(img,sX,sY,sW,sH,dX,dY,dW,dH)
}

// collision 
function isCollision(obj1,obj2){
        return (obj1.x < obj2.x+obj2.width&&
            obj1.x+obj1.width >obj2.x&&
            obj1.y< obj2.y+obj2.height&&
            obj1.y+obj1.height> obj2.y)
}

function animate(){
    ctx.clearRect(0,0,c.width,c.height)
    // ctx.drawImage(backround,0,0,w,h)

    rocks.forEach((rock,index)=>{
        rock.draw()
        rock.update()

        if(isCollision(player,rock)){
            rocks.splice(index,1)
            board.innerHTML = hasRock++
        }
    })

    drawChar(playerChar,player.width*player.frameX,player.height*player.frameY,player.width,player.height,player.x,player.y,player.width,player.height)

    if(player.zam%5 == 0){
        movePlayer()
        stepAnimate()
        
    }
    requestAnimationFrame(animate)
    player.zam++

}
animate()

// window.addEventListener('keydown',movePlayer)
window.addEventListener('keydown',function(e){
    keys[e.keyCode] = true
    player.moving = true
})

window.addEventListener('keyup',function(e){
    delete keys[e.keyCode]
    player.moving = false
})

/* ----------------------------- throw the rock ----------------------------- */
c.addEventListener("click",(e)=>{
    // ctx.beginPath()
    ctx.rect(c.width/2,c.height/2,20,20)
    ctx.stroke()
    console.log(e.clientX,e.clientY)
})
/* ------------------------------------ / ----------------------------------- */


function movePlayer(){
    if(keys[69]&& player.y>0){
        player.y -= player.speed
        player.frameY = 3
    }
    else if(keys[68]&& player.y<c.height-player.height){
        player.y += player.speed
        player.frameY = 0
    }
    else if(keys[70]&& player.x<c.width-player.width){
        player.x += player.speed
        player.frameY = 2
    }
    else if(keys[83]&& player.x>0){
        player.x -= player.speed    
        player.frameY = 1
    }
    
}

function stepAnimate(){
    if(player.frameX<3 && player.moving) player.frameX++
    else player.frameX = 0;
}