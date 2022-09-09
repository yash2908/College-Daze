function renderBlank (size) {
	$("#kenken").empty()
	var dimension = $(window).height() / size * .9;
	
	for (var i = 0; i < size; i++){
		var tr = $('<tr></tr>')
		for (var j = 0; j < size; j++) {
			if(j%2==0)
			$("<td />").width(dimension).height(dimension).appendTo(tr)
			else
			$("<td />").width(dimension).height(dimension).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}


// sush added count here to make id's to each input 
var fixed = 0;
var count = 0;
var sol = 0;

// made list to get all the values of answer
var inputlist = new Array();
var checker_list = new Array();
function renderCell (cell, dimension, solve,ha,har) {
	var td = $("<td align='center'  />").width(dimension).height(dimension)
	
	var neighbors = cell.getNeighborsOriented(), groupID = cell.cellGroup.groupID
	td.css('border-top', (neighbors.up && (neighbors.up.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-bottom', (neighbors.down && (neighbors.down.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-left', (neighbors.left && (neighbors.left.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	td.css('border-right', (neighbors.right && (neighbors.right.cellGroup.groupID == groupID)) ? "1px dotted black" : "3px solid black")
	

	if (cell.cellGroup.currentSize === 1) {td.html(cell.value); fixed++;}
	else if (cell === cell.cellGroup.getTopLeft()) {
		td.html("<div class='hint'>>" + cell.cellGroup.operationDescription + "</div>" ); //(solve ? cell.value : "")
		if (ha >=0){
		checker_list.push([cell.value,har,ha]);}
	}
	else if (solve){
		// td.html(cell.value); 
		checker_list.push([cell.value,har,ha]); 
	}
	var st = ""
	st += "<input type='text' size='1' maxlength='1'  onkeypress='return event.charCode >= 48 && event.charCode <= 57' "
	
	// if(sol == 2){
	// 	st += "style='display:none';" 
	// }
	st+= "id = 'C" + count + "'";
	st += "></input>";
	// console.log(st)
	if (cell.cellGroup.currentSize !== 1){
		$(st).appendTo(td)
	}
	count++;
	return td
	
}

function renderKenken (kenken) {
	count = 0;
	$("#kenken").empty()
	var size = kenken.size,
		dimension = $(window).height() / size * .9
	var out = document.getElementById("accuracy");
	out.innerHTML = " ";
	for (var y = 0; y < size; y++){
		var tr = $('<tr />')
		for (var x = 0; x < size; x++) {
			renderCell(kenken.board[x][y], dimension).appendTo(tr)
		}
		$("#kenken").append(tr)
	}
}

function renderSolution (kenken) {

	var size_grid = parseInt(document.getElementById("size").value);
	
	var non_fixed = (size_grid * size_grid) - fixed;
	console.log(non_fixed)
	for (var j = 0;j<non_fixed;j++){
		try {
			var x = document.getElementById("C"+j).value;
		}catch (error) {
			if (error.name === 'TypeError')
			{
			  x = ""
			}
		}
		console.log(x)
		inputlist.push(x);
	}


	count = 0;
	sol = 2;
	$("#kenken").empty()
	var size = kenken.size,
		dimension = $(window).height() / size * .9
	fixed  = 0;
	for (var y = 0; y < size; y++){
		var tr = $('<tr />')
		for (var x = 0; x < size; x++) {
			renderCell(kenken.board[x][y], dimension, true,x,y).appendTo(tr)
		}
		$("#kenken").append(tr)	
	}
	sol = 0;
	for (var j = 0;j<(non_fixed);j++){
		try {
			document.getElementById("C"+j).value =  inputlist[j]
		}catch (error) {
			if (error.name === 'TypeError')
			{
				continue
			}
		}
			
	}

}

function outputfunc() {
	var accuracy_count = 0;
	var accuracy_list = new Array();
	var out = "";
	for (var h =0 ; h<inputlist.length;h++){
		if (inputlist[h] == checker_list[h][0] ){
			accuracy_count += 1;
			accuracy_list.push([checker_list[h][1],checker_list[h][2]])
			out += "Element at ("+[checker_list[h][1],checker_list[h][2]] +") position is correct , "
		}
	}
	var output = document.getElementById("accuracy")
	out += "Number of nonfixed elements correct is equal to " + accuracy_count + "  "
	output.innerHTML = out 
}