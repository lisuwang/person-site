//global var and default value

var cur_blank = null;
var cur_select = null;
var start_time = null;
var end_time = null;
var ROW = 4;
var COL = 4;
var cells = [];
var modal = null;
var trigger = null;
var closeButton = null;
var modal_content = null;
var seconds = null;
function set_select(val){
	cur_select = val;
	val.style.backgroundColor = '#45ADA8';
}

function set_blank(val){
	cur_blank = val;
	val.style.backgroundColor = 'white';
}
function get_blank(){
	return cur_blank;
}

function get_select(){
	return cur_select;
}

function get_row_index(str){
	return Number(str[1]);
}
function get_col_index(str){
	return Number(str[2]);
}

//all exception check is here
var get_row_col = function(){
	try{
		row = parseInt(document.getElementById('row').value);
		col = parseInt(document.getElementById('col').value);
		var regex=/^[0-9]+$/;
		if(!document.getElementById('row').value.match(regex)){
			throw new TypeError("行数必须是数字");
		}
		if(!document.getElementById('col').value.match(regex)){
			throw new TypeError("列数必须是数字");
		}
		if (isNaN(row)){
			throw new TypeError("行数必须是数字");
		}
		if (isNaN(col)){
			throw new TypeError("列数必须是数字");
		}
		if((row > 15 || col > 15) || (row == 1 || col == 1) || (row * col > 225)){
			throw new RangeError;
		}
		ROW = row;
		COL = col;
		delay();
	}catch(ex){
		if(ex instanceof TypeError )
			window.alert(ex.message);
		if(ex instanceof RangeError)
			window.alert("行数和列数都必须小于15 , 并且不能等于1");
	}
}
//click event handler here
function work(event){
	if(event.type == 'click'){
		if(event.currentTarget != get_blank()){		
			set_select(event.currentTarget);
		}else{
			return;
		}
	}else{
		return;
	}
	a = get_select();
	b = get_blank();
	if( a != b){
		set_select(a);
	}
	if(a != cur_blank && b == cur_blank){
		move(a,b);
	}
}

//swap the innerText here between select div and blank div
function move(a,b){
	if ( a == null || b == null)
		return;
	var abs_span_row = Math.abs(get_row_index(a.id)-get_row_index(b.id));
	var abs_span_col = Math.abs(get_col_index(a.id)-get_col_index(b.id));
	if((abs_span_row == 0 && abs_span_col == 1)||(abs_span_row == 1 && abs_span_col == 0)){
		cur_text = a.innerText;
		goal_text = b.innerText;
		if ( '' == goal_text){
			a.innerText = '';
			b.innerText = cur_text;
			set_blank(a);
			set_select(b);
			cur_select = null;
		}
	}
	congSuccess(checkSuccess(ROW,COL));
}
//default onload function
var delay = function(){
	modal = document.querySelector(".modal");
	modal_content = document.querySelector(".modal-content");
	closeButton = document.querySelector(".close-button");
	window.addEventListener("click",windowOnClick);
	closeButton.addEventListener("click", toggleModal);
	var main = document.getElementsByClassName('main-container');
	
	var myNode = main[0];
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	create_div(main[0],ROW,COL);
	start_time = new Date();
	
}

function windowOnClick(event){
		if(event.target == modal)
			toggleModal();
}

function toggleModal(){
	$("h1").text("真厉害! 花费 "+seconds.toString()+"秒就复原了");
	modal.classList.toggle("show-modal");
}
		
function create_div(root, row, col){
	var col_text = '';
	var row_text = '';
	if(root == null){
		return ;
	}
	
	var root_width = root.clientWidth - 1*root.offsetLeft;
	var root_height = root.clientHeight - 1*root.offsetTop;
	var square = '';
	var cell_height_line = Math.floor(root_height / row);
		
	var cell_width_line = Math.floor(root_width / col);
	if(cell_height_line < cell_width_line){
		square = ' ' + cell_height_line.toString() + 'px ';
	}else{
		square = ' ' + cell_width_line.toString() + 'px ';
	}
	for (i = 0; i!= row; i++){
		row_text += square;
	}
	for (j = 0; j!= col; j++){
		col_text += square;
	}
	root.style.display = 'grid';
	root.style.gridTemplateColumns = col_text ;
	root.style.gridTemplateRows = row_text ;
	var arr = new Array(row*col);
	for (i = 0; i < row*col; ++i) {
        arr[i] = i+1;
	}
	arr.sort(function() { return 0.5 - Math.random() });
	x1 = squence_count(arr);
	generate_right_squence(arr);
	x1 = squence_count(arr);
	console.log(arr);
	var n = 0;
	for( i = 0; i != row ; i++){
		for(  j = 0; j != col; j++){
			var cell = document.createElement("div");
			cell.className = 'com';
			cell.id = 'a'+i.toString()+j.toString();
			cell.innerText = arr[n].toString();
			cells[n] = cell;
			n++;
			cell.style.lineHeight = square.trim();
			cell.style.fontSize = (Math.floor(parseInt(cell.style.lineHeight)/1.5)).toString()+'px';
			cell.addEventListener("click", work);
			root.appendChild(cell);
		}
	}

	for( i = 0 ; i!= cells.length; i++){
		if(cells[i].innerText == (row*col).toString()){
			set_last_element_blank(cells[i]);		
		}
	}
	set_first_element_select();

}
var set_first_element_select = function(){
	var first_element = document.getElementById('a00');
	if(first_element != null){
		set_select(first_element);
	}
}
var set_last_element_blank = function(obj){
	if(obj != null){
		obj.innerText = '';

	}
	set_blank(obj);
}

var checkSuccess = function(row, col){
	for(i =0;i != row; i++){
		for(j = 0; j != col; j++){
			var ob = document.getElementById('a'+i.toString()+j.toString());
			if(ob.innerText == (i*col+j+1).toString() ){
				continue;
			}else{
				if(i == row -1 && j == col-1){
					return true;
				}else{
					return false;
				}
			}	
		}
	}

}
var congSuccess = function (ret){
	if(ret){
		end_time = new Date();
		var elapsed_ms = end_time - start_time;
		seconds = Math.round(elapsed_ms / 1000);
		var minutes = Math.round(seconds / 60);
		var hours = Math.round(minutes / 60);

		var sec = TrimSecondsMinutes(seconds);
		var min = TrimSecondsMinutes(minutes);

		function TrimSecondsMinutes(elapsed) {
			if (elapsed >= 60)
				return TrimSecondsMinutes(elapsed - 60);
			return elapsed;
		}
		toggleModal();
	}
}
//statitics the count of '逆序' 
function squence_count(arr){
	var value = 0;
	brr = arr;
	for( i = 0; i != brr.length; i++){
		if ( brr.length == 1){
			return value;
		}
		next = brr.slice(1, brr.length);
		value += comp(brr[0], next);
		brr = next;
		i = 0;
	}
	return value;
}
function comp(x, next){
		var count = 0;
		for( i = 0; i != next.length; i++){
			if(x > next[i])
				count++;
		}
		return count;
	}
	
function is_odd_squence(arr){
	return true ? squence_count(arr)%2 == 1 : squence_count(arr) % 2 == 0;
}

//according to the different array size to create the possible array
function generate_right_squence(arr){
	if((arr.length - 1) %2 == 0){
		if(is_odd_squence(arr)){
			tmp = arr[0];
			arr[0] = arr[1];
			arr[1] = tmp;
		}
	}else{
		if(!is_odd_squence(arr)){
			tmp = arr[0];
			arr[0] = arr[1];
			arr[1] = tmp;
		}
	}
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}