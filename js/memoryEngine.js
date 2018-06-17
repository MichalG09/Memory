document.addEventListener("DOMContentLoaded", function(){
	
	
	var text = document.querySelector(".text .new");
	var startButton = document.querySelector("#buttonStart");
	var showResult = document.querySelector(".showResult");
	
	var numberColumns = document.forms["startForm"]["numberBlocksColumns"].value;
	var numberRows = document.forms["startForm"]["numberBlocksRows"].value;
	var waitToHideCards = true;
	var startTime;
	var timePlay;
	var howManyClick = 0;
	var numberCards;
	
	var inputNumberColumns = document.getElementById("inputFormColumns");
	inputNumberColumns.addEventListener("change", function(){
		setInputVariable();
		numberColumns = document.forms["startForm"]["numberBlocksColumns"].value
		});
	
	var inputNumberRows = document.getElementById("inputFormRows");	
	inputNumberRows.addEventListener("change", function(){
		numberRows = document.forms["startForm"]["numberBlocksRows"].value;
		});
		
	startButton.addEventListener("click", function() {
				
		numberCards = numberRows * numberColumns;
		startTime = new Date();
		
		setLocationBlocks();
		setSizeBlock(numberColumns);		
		
		var blocks = document.querySelectorAll('.blockMemory');
		var numberHiddenBlock = 0;
		var resultVisible = [];
		var howManySucces = 0;
			
			for(var l = 0 ; l < blocks.length ; l++){
				blocks[l].addEventListener("click", function(){
						
					if(waitToHideCards){
						var blocksToHidden = this.querySelector('.blockGround');
						
						if(blocksToHidden.style.visibility == "visible" && numberHiddenBlock < 2){
							blocksToHidden.style.visibility = "hidden";
							numberHiddenBlock ++;
							resultVisible.push(blocksToHidden.dataset.number);
					
							if(resultVisible.length === 2){
								howManyClick ++;
								
								if(resultVisible[0] === resultVisible[1]){	
									howManySucces ++;
									visibleCorrectFindBlocks(resultVisible[0]);
									numberHiddenBlock = 0;
									
									if(howManySucces == (numberCards / 2)){
										howManySucces = 0;
										endGameShowResult();
									}
								}
								
								else{
									console.log("błąd");
								}
								resultVisible = [];
							}
						}
						
						if (numberHiddenBlock === 2){
							waitToHideCards = false;
							setTimeout(function(){ 
								waitToHideCards = setAllVisible(); 
								numberHiddenBlock = 0;}, 1500);
							}	
					}							
					});
				}
			
	});
	
	function setAllVisible() {
		var blocks = document.querySelectorAll('.blockMemory .blockGround');
		for(var i = 0 ; i < blocks.length ; i++){
			blocks[i].style.visibility = "visible";
		}
		return true;
	}
	
	function visibleCorrectFindBlocks(indeks){
		var blocks = document.querySelectorAll('.blockMemory .blockGround');
		
		for(var i = 0 ; i < blocks.length ; i++){
			if(blocks[i].dataset.number === indeks){
					blocks[i].className = "blockGroundSucces"
			}
		}	
	}
	
	function randomShufleCard (number){
		
		var max = number / 2;
		var min = 0;
		var result = [];
		var temp = [];	
		var j = 0;
		var k = 0;

		for(var i = 1 ; i <= max ; i++){
			temp.push(i);
			temp.push(i);
			result.push(" ");
			result.push(" ");
		}

		while(result.includes(" ")){
	
		var rand = Math.floor((Math.random() * ((2 * max) - min + 1)) + min);
	
		if(result[rand] === " "){
			result[rand] = temp[j];
			j++;
		}
		k ++;
		}
	
		return result;	
	}
	
	function setSizeBlock(numberCards){
		
		var blockGround = document.getElementsByClassName("blockGround");
		var blockReal = document.getElementsByClassName("blockReal");
		var blockMemory = document.getElementsByClassName("blockMemory");
		var blockNew = document.getElementsByClassName("new");
		var size = Math.floor((818 / numberCards) - 4);
		for(var i = 0 ; i < blockGround.length ; i ++){
			blockGround[i].style.width = size + "px";
			blockGround[i].style.height = size + "px";
			blockReal[i].style.width = size + "px";
			blockReal[i].style.height = size + "px";
			blockMemory[i].style.width = size + "px";
			blockMemory[i].style.height = size + "px";
		}	
		blockNew[0].style.height = (numberRows * size) + (numberRows * 8) + 4;
	}
	
	function setInputVariable(){
		
			var NumberColumns = document.forms["startForm"]["numberBlocksColumns"].value;
			var inputNumberRows = document.getElementById("inputFormRows");
				inputNumberRows.innerHTML = "";
			for(var i = 2 ; i <= NumberColumns ; i++){
				inputNumberRows.innerHTML = inputNumberRows.innerHTML + '<option>' + i + '</option>';
			}
	}
	
	function setResult(currentresult){
		showResult.innerHTML = "<div> Obecny wynik to:" + currentresult + "/" + (numberCards / 2);
	}
	
	function endGameShowResult(){
		var containerText = document.querySelector(".text");
		var textTimePlay = " czas: ";
		containerText.innerHTML = "";
		showResult.innerHTML = "Koniec  <br><br> GRATULACJE  <br><br>";
		showResult.innerHTML = showResult.innerHTML + "ilość ruchów: " + howManyClick + "<br>";
		
		timePlay = Math.round((new Date() - startTime) / 1000);
		var timePlayInHour =  Math.floor(timePlay / (60 * 60));
		var timePlayInMinute =  Math.floor((timePlay / 60) - (timePlayInHour * 60));
		var timePlayInSecond =  Math.round((timePlay - (timePlayInHour * 60)) - (timePlayInMinute * 60));
		
		if(timePlayInHour > 0){
			textTimePlay = textTimePlay + timePlayInHour + " h ";
		}
		if(timePlayInMinute > 0){
			textTimePlay = textTimePlay + timePlayInMinute + " min ";
		}
		if(timePlayInSecond > 0){
			textTimePlay = textTimePlay + timePlayInSecond + " sec ";
		}
		showResult.innerHTML =  showResult.innerHTML + textTimePlay + "<br><br><div class='button'> <a class='link' href='memory.html' > ZAGRAJ PONOWNIE </a> </div>";
	}
	
	function setLocationBlocks(){
		
		var form = document.getElementsByClassName("containerMemory");
		form[0].innerHTML = "";
		
		var pleace = randomShufleCard(numberCards);
		console.log("tablica rozmieszczenia : " + pleace);
		
			var k = 0;
			text.innerHTML = "";
			for(var i = 0 ; i < numberColumns ; i++){
				for(var j = 0 ; j < numberRows ; j++){
					text.innerHTML = text.innerHTML + "<div class='blockMemory'>  <img class='blockGround' style='visibility:visible ; width: 10px ; height: 10px' data-number='" + pleace[k] + "' src='img/backGround.jpg'> <img class='blockReal' src='img/realmadryt" + pleace[k] + ".jpg'/>  </div>";
					k++;
				}
			}
		
	}
});