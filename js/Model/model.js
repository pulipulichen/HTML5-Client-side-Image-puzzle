/**
	@author: Peda Venkateswarlu Pola
	Email : pola.venki@gmail.com
	YIM : pola_venki  Gtalk : pola.venki  Skype : pola.venki
*/
;(function(w,s){
    s.model = function () {
        console.log("start model");
        
        s.m.size = slider.tileSize;
        s.m.tileSize = (500 / s.m.size);
        s.m.emptyTile = "tile" + (s.m.size-1) + "" + (s.m.size-1);
	//console.log(s.m.emptyTile);
        
        // 這個要改成隨機產生...
        var shuffle = function(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        };
        
        var _tiles = [];
        for (var _x = 0; _x < s.m.size; _x++) {
            for (var _y = 0; _y < s.m.size; _y++) {
                _tiles.push("tile" + _x + "" + _y);
            }
        }
        
        /*
        s.m.solution = [["tile00","tile01","tile02","tile03"],
		               ["tile10","tile11","tile12","tile13"],
		               ["tile20","tile21","tile22","tile23"],
		               ["tile30","tile31","tile32","tile33"]];
	*/
        s.m.solution = [];
        var _line = [];
        for (var _i = 0; _i < _tiles.length; _i++) {
            _line.push(_tiles[_i]);
            if (_line.length === s.m.size) {
                s.m.solution.push(_line);
                _line = [];
            }
        }
        
        var _do_shuffle = slider.enableSuffle;
        if (_do_shuffle) {
            shuffle(_tiles);
        }
        else {
            _tiles[(_tiles.length-2)] = "tile" + (s.m.size-1) + "" + (s.m.size-1);
            _tiles[(_tiles.length-1)] = "tile" + (s.m.size-1) + "" + (s.m.size-2);
        }
        
        /*
	s.m.state =	[["tile33","tile02","tile21","tile32"],
	               ["tile11","tile13","tile12","tile30"],
	               ["tile31","tile10","tile23","tile03"],
	               ["tile22","tile20","tile01","tile00"]];
        */
       
        s.m.state = [];
        var _line = [];
        for (var _i = 0; _i < _tiles.length; _i++) {
            _line.push(_tiles[_i]);
            
            
            if (_tiles[_i] === "tile" + (s.m.size-1) + "" + (s.m.size-1)) {
                s.m.emptyRef = {"y" : (_i % s.m.size ) , "x" : s.m.state.length};
            }
            
            if (_line.length === s.m.size) {
                s.m.state.push(_line);
                _line = [];
            }
        }
        
        // s.m.emptyRef = {"x" : 1 , "y" : 0};
        //console.log(s.m.emptyRef);
        
        var style = document.createElement('style');
        style.type = 'text/css';
        style.id="tile_style";
        var _tileStyle = [];
        for (var _x = 0; _x < s.m.size; _x++) {
            for (var _y = 0; _y < s.m.size; _y++) {
                var _classname = ".tile.tile" + _y + "" + _x;
                // 設定這個tile的background-position
                var _x_px = (_x * s.m.tileSize * -1) + "px";
                var _y_px = (_y * s.m.tileSize * -1) + "px";
                //var _classname = ".tile." + _tiles[_i];
                //console.log(_tiles[_i]);
                //document.getElementsByClassName(_tiles[_i]).style.backgroundPosition = _x + " " + _y;
                _tileStyle.push(_classname + " {background-position: " + _x_px + " " + _y_px + " !important} ");
            }
        }
        _tileStyle.push(".tile {width: " + s.m.tileSize + "px !important; height: " + s.m.tileSize + "px !important} ");
        _tileStyle.push("." + s.m.emptyTile + " {background: #666666 !important;cursor: default;} ");
        style.innerHTML = _tileStyle.join("\n");
        //console.log(_tileStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
        
	s.m.timeElapsed = 0; // Time in seconds
    };
})(window,slider);