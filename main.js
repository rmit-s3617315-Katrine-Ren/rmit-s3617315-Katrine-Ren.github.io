
//functional component
class TypeWriter{

	constructor(txtElement,words,wait=3000){

		this.txtElement = txtElement;
		this.words = words;
		this.txt = '';
		this.wordIndex = 0;
		this.wait = parseInt(wait,10);
		//this.type();//alternative:the type() can be defined inside the constructor
		this.isDeleting = false;

	}

 	//class method
	type(){

	//current index of word
	//Initially, wordIndex==0,words.length==3, 0%3==0,so the current=0
	const current = this.wordIndex % this.words.length;
	//get full text of current word
	const fullTxt = this.words[current];

	// const header = document.querySelector('h1');

	// const halo = window.getComputedStyle(header,'::after');
	//console.log(halo);

	//console.log(fullTxt);
	//check if deleted
	if(this.isDeleting){
		//Remove letter
		this.txt = fullTxt.substring(0,this.txt.length-1)
		console.log(this.txt);

	}else{
		//Add letter one by one into the empty string(this.txt)
		this.txt = fullTxt.substring(0,this.txt.length+1)
		console.log(this.txt);
	}

	//insert TXT into element
	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
	//halo.content = `${header}+${this.txt}`;

	//set type speed
	let typeSpeed = 300;
	if(this.isDeleting){
		typeSpeed /= 2;/* it's equals to typeSpeed = typeSpeed/2 */
	}

	//check if the single word complete
	//This if-elseif will be ignored if the typing or deleting is not finished
	if(!this.isDeleting && this.txt === fullTxt){
		console.log(this.isDeleting);
		//make a pause
		typeSpeed = this.wait;
		//set delete to true
		this.isDeleting = true;

		//after deleting, go on typing next world
	}else if(this.isDeleting&&this.txt ===''){
		this.isDeleting = false;
		//Move to next word
		this.wordIndex++;
		console.log(this.wordIndex);
		//Pause before start typing
		typeSpeed = 500;

	}
	//call the type() method every 0.5 sec
	setTimeout(()=> this.type(),typeSpeed)

	}

	

}

//Type Method, it's alternative way to define type(),outside the class
// TypeWriter.prototype.type = function(){
// 	//current index of word
// 	const current = this.wordIndex % this.words.length;
// 	//get full text of current word
// 	const fullTxt = this.words[current];

// 	//console.log(fullTxt);
// 	//check if deleted
// 	if(this.isDeleting){
// 		//Remove letter
// 		this.txt = fullTxt.substring(0,this.txt.length-1)

// 	}else{
// 		//Add letter one by one
// 		this.txt = fullTxt.substring(0,this.txt.length+1)
// 	}

// 	//insert TXT into element
// 	this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

// 	//set type speed
// 	let typeSpeed = 300;
// 	if(this.isDeleting){
// 		typeSpeed /= 2;/* it's equals to typeSpeed = typeSpeed/2 */
// 	}

// 	//check if the single word complete
// 	if(!this.isDeleting && this.txt === fullTxt){
// 		//make a pause
// 		typeSpeed = this.wait;
// 		//set delete to true
// 		this.isDeleting = true;

// 	}else if(this.isDeleting&&this.txt ===''){
// 		this.isDeleting = false;
// 		//Move to next word
// 		this.wordIndex++;
// 		//Pause before start typing
// 		typeSpeed = 500;

// 	}

// 	setTimeout(()=> this.type(),typeSpeed)
// }

//Init On DOM Load
document.addEventListener('DOMContentLoaded',init);


//init app function
function init(){
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	//init TypeWriter
	//alternative: new TypeWriter(txtElement,words,wait); => call the constructor directly
	const typeWriter = new TypeWriter(txtElement,words,wait);
	typeWriter.type();

}