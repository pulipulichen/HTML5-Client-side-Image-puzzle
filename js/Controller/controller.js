/**
	@author: Peda Venkateswarlu Pola
	Email : pola.venki@gmail.com
	YIM : pola_venki  Gtalk : pola.venki  Skype : pola.venki
*/
;(function(w,s){
    s.controller = function () {
	s.c.sliderSize = slider.tileSize;
	
	s.c.isMovelLegal = function(x, y){
		var retValue = {"isLegal" : false};
                
                
            if (slider.enable === false) {
                return retValue;
            }
		if(s.m.emptyRef["x"]===x && s.m.emptyRef["y"]!==y){
			retValue = {"isLegal" : true , "direction" : "y" , "displacement" : s.m.emptyRef["y"]-y};
		}else if(s.m.emptyRef["y"]===y && s.m.emptyRef["x"]!==x){
			retValue = {"isLegal" : true , "direction" : "x" , "displacement" : s.m.emptyRef["x"]-x};
		}
                //console.log(retValue);
		return retValue;
	};
	
	s.c.swap = function(source, direction , displacement){
            
		var noOfIterations,previousEmptyRef;
		noOfIterations = (displacement<0) ? displacement * -1  : displacement;
		previousEmptyRef = {"x" : s.m.emptyRef["x"] , "y" : s.m.emptyRef["y"]};
			
		for(var i = 0 , x = tempx = s.m.emptyRef["x"] , y = tempy = s.m.emptyRef["y"] ; i <= noOfIterations ; i++){
			s.m.state[tempx][tempy] = s.m.state[x][y];
			tempx = x;
			tempy = y;
			if(direction==="y"){
				y = (displacement<0) ? y +1  : y -1; 
			}else{
				x = (displacement<0) ? x +1  : x -1;
			}
		}
		// Updating game state in model
		s.m.emptyRef["x"] = source["x"];
		s.m.emptyRef["y"] = source["y"];
		s.m.state[source["x"]][source["y"]] = s.m.emptyTile;
		
		// Swap the tiles in the UI
		s.v.puzzle.swapTiles(previousEmptyRef ,direction , displacement);
	
            if (s.m.state.join()===s.m.solution.join()) {
            //if (true) {
                clearInterval(slider.timer);
                document.getElementById("gameBoardPlaying").style.display = "none";
                document.getElementById("gameBoardFinish").style.display = "block";
                if (slider.imageURL === undefined) {
                    document.getElementById("share").style.display = "none";
                }
                
                var _time = document.getElementById("timeElapsed").innerText;
                var _step = document.getElementById("stepElapsed").innerText;
                ga('send', 'event', "finish_puzzle", "time:"+_time + ",step:" + _step + ",size:"+slider.tileSize, "url:" + slider.imageURL);
                slider.enable = false;
                setTimeout(function () {
                    alert("恭喜您完成拼圖了！您的完成時間是："+ _time + "，總共花了" + _step + "步。");
                    //slider.stopTimer = true;
                }, 0);
            }
	};
	
    };
})(window,slider);