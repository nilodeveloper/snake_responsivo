//Definições do game

var player = [] // Posição dos quadrados do player
var player_initial_length = 3
const UPDATE_CICLE = 1000
var move_square = 0
// Definições de eventos
window.addEventListener('load', ()=>{
	setGameStage()
	createPlayer(player_initial_length)
	createFood()			
	update()
})

window.addEventListener('resize', ()=>{
	setGameStage()
})

//Game functions
function setGameStage(){
	document.querySelector('.game').style.width = window.innerWidth
	document.querySelector('.game').style.height = window.innerHeight
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
	}
	player = document.querySelectorAll('.player_square')
	console.log('player', player)
}

function update(){
	setInterval(()=>{
		updatePlayer()
	}, UPDATE_CICLE)	
}

function updatePlayer(){
	renderPlayer()
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
	let position_x = Math.random() * (getGameStageWidth()-getElementSize(element));
	let position_y = Math.random() * (getGameStageHeight()-getElementSize(element));
	let point = {
		x: position_x,
		y: position_y
	}
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
	return window.innerWidth
}
function getGameStageHeight(){
	return window.innerHeight
}
