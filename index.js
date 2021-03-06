//Definições do game
const UPDATE_CICLE = 120
const WidthGame = window.innerWidth
const HeightGame = window.innerHeight
var player = []
var player_length = 3
var direction = 'right'
var direction_number = 4
var food_position = {}

// Definições de eventos
window.addEventListener('load', ()=>{
	setGameStage()
	createPlayer(player_length)
	createFood()			
	update()
})

window.addEventListener('resize', ()=>{
	setGameStage()
})

// Controla a snake pelas setas do teclado
document.addEventListener('keydown', (e)=>{
		direction = e.key.toString().replace('Arrow', '').toLowerCase()
})

// Controla a snake pelos toques na tela do dispositivo
document.addEventListener('click', (e)=>{
	if(e.clientX >= WidthGame/2){
		direction_number += 1
	}else{
		direction_number -= 1
	}
	direction_by_number()
	direction_cicle()
})

function direction_by_number(){
	if(direction_number == 1)
		direction = 'down'
	if(direction_number == 2)
		direction = 'left'
	if(direction_number == 3)
		direction = 'up'
	if(direction_number == 4)
		direction = 'right'
}

function direction_cicle(){
	if(direction_number == 5){
		direction_number = 1
		direction = 'down'
	}
	if(direction_number == 0){
		direction_number = 4
		direction = 'right'
	}
}

//Game functions
function setGameStage(){
	document.querySelector('.game').style.width = WidthGame
	document.querySelector('.game').style.height = HeightGame
}

function createPlayer(initial_length){
	for(let i=0;i<initial_length;i++){
		let player_square = document.createElement('div')		
		player_square.classList.add('player_square')
		player_square.classList.add('player_square'+i)
		addToGameStage(player_square)
		setElementSize('.player_square'+i, 10)
		point = {x: 10*i+50, y: 10}
		setPosition('.player_square'+i, point)
		position_player = point	
	}
	player = document.querySelectorAll('.player_square')
}

function growPlayer(){
		let player_square = document.createElement('div')		
		player_square.classList.add('player_square')
		player_square.classList.add('player_square'+player_length)
		addToGameStage(player_square)
		setElementSize('.player_square'+player_length, 10)
		setPosition('.player_square'+player_length, position_player)	
		player = document.querySelectorAll('.player_square')
}

function colisionPlayer(){			
	if(position_player.x <= food_position.x && position_player.x >= food_position.x - 9){
		if(position_player.y >= food_position.y && position_player.y <= food_position.y + 9){
			document.querySelector('.food').remove()
			createFood()
			player_length += 1
			growPlayer(player_length)
		}
	}
}
function update(){
	setInterval(()=>{	
		colisionPlayer()
		if(verifyGameBorder())
			updatePlayer()
	}, UPDATE_CICLE)	
}

function verifyGameBorder(){
	if(position_player.x <= WidthGame-(8) && position_player.x >= 8){
		if(position_player.y >= 8 && position_player.y <= HeightGame-(8))
			return true
		else
			return false
	}else{
		return false
	}
}

function updatePlayer(){
	if(direction == 'right'){
		position_player.x += 10
	}else if(direction == 'left'){
		position_player.x -= 10
	}else if(direction == 'up'){
		position_player.y -= 10
	}else{
		position_player.y += 10
	}
	colisionPlayer()
	renderPlayerPosition()
}
function renderPlayerPosition(){
	let player_square = document.createElement('div')		
	player_square.classList.add('player_square')
	player_square.classList.add('player_square'+position_player.x+position_player.y)
	addToGameStage(player_square)
	setElementSize('.player_square'+position_player.x+position_player.y, 10)
	point = {x: position_player.x, y: position_player.y}
	setPosition('.player_square'+position_player.x+position_player.y, point)
	player = document.querySelectorAll('.player_square')
	player[0].remove()
}
function createFood(){
	let food = document.createElement('div')
	food.classList.add('food')
	addToGameStage(food)
	setElementSize('.food', 10)
	randomPosition('.food')
}

function randomPosition(element){
	document.querySelector(element).style.position = 'absolute'
	setPosition(element, getRandomPoint(element))	
}

function getRandomPoint(element){
	let position_x = Math.round((Math.random() * (getGameStageWidth()-getElementSize(element)))/10)*10;
	let position_y = Math.round((Math.random() * (getGameStageHeight()-getElementSize(element)))/10)*10;
	let point = {
		x: position_x,
		y: position_y
	}			
	console.log(point)
	food_position = point;
	return point
}

function addToGameStage(element){
	document.querySelector('.game').appendChild(element)				
}

//** Shortcut functions ** //
function setElementSize(element, size){
	 document.querySelector(element).style.width=size+"px"			
	 document.querySelector(element).style.height=size+"px"
}

function getElementSize(element){
	return parseInt(document.querySelector(element).style.width.replace('px', ''))
}

function setPosition(element, point){
	document.querySelector(element).style.position = 'absolute'
	document.querySelector(element).style.left = point.x+'px'
	document.querySelector(element).style.top = point.y+'px'	
}
function getPositionX(element){
	return parseInt(document.querySelector(element).style.left.replace('px', ''))
}
function getGameStageWidth(){
	return WidthGame
}
function getGameStageHeight(){
	return HeightGame
}
