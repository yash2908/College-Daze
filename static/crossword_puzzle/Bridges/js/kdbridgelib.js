var puzzleType = 'Bridge';

var myPuzzle, puzzleID;

var defaultPuzzlePrefs = {'autoCheckAnswers':true};
var puzzlePrefs = defaultPuzzlePrefs; // setup by puzSettings
var gCanv;
var gDC;

var gIsDragging = false;

var gCellWidth = Math.floor(gPuzzleWidth / 9);
var gCellHeight = Math.floor(gPuzzleHeight / 9);
var gFontHeight = Math.round((25/50)*gCellHeight);
var doSuccessAnimation = false;
var doSuccessAnimationTS = 0;
var doSuccessDuration = 1*1000;
var gPuzzleIsComplete = false;

gCurrentTool = 'mark';
gCurrentOwner = -1;

var myIslands = [];
var myEdges = [];

function getMaxPuzzlesPerBook(kind) {
  var perBook = {'9x9':32,'22x14':16,'20x25':8,'25x25':8};
  if (kind in perBook) {
    return perBook[kind];
  } else {
    return 8;
  }
}

function initNewPuzzle()
{
  setStatus("");
  if (initStatus != '') {
    puzzleMessage([initStatus]);
  }

	startTime = (new Date()).getTime();

  for (var i = 0; i < myEdges.length; ++i) {
    myEdges[i].flag = 0;
    myEdges[i].blocked = false;
  }

  if ($.cookie('bridge_edges') && 
      $.cookie('bridge_islands') && 
      $.cookie('bridge_solution_id',{useLocalStorage: false}) == puzzleID) {
    console.log("Loading old cookie data");
    myEdges = $.parseJSON($.cookie('bridge_edges'));
    myIslands = $.parseJSON($.cookie('bridge_islands'));
    startTime = $.cookie('bridge_startTime');
    // console.log("saved startTime: " + startTime);
    // console.log("current time: " + (new Date()).getTime());
    // Walk through solution....
  }
  else {
    if (! $.cookie(currentPuzzleType.toLowerCase() + '_startTime')) {
      setTimeout( provideInstructions, 4000);
    }
    $.cookie('bridge_startTime', startTime, {expires:14});
  }

  setEdgeBlocks();
  classifyIslands();

  if (checkIfSolved()) {
      gPuzzleIsComplete = true;
  }
  refreshCanvas();
  $('#spinnercontainer').hide();
  setTimeout(function(){
    $('#logocontainer').fadeOut('slow');
  },1000);
}

function addrInPuzzle(addr) { // used to skip invalid cells in loops
  return true;
}

var puzzleInstructions = [
    "Connect these islands with bridges until each island can be reached from any other island, and each island has as many outgoing bridges as its number.  You may only connect islands vertically or horizontally and bridges may not cross.  There may be one or two bridges connecting pairs of islands, but no more than two.  Each puzzle has a unique solution that can be found without making guesses.",
    "",
    "<a href=\"http://en.wikipedia.org/wiki/Hashiwokakero\" target=\"blank\">This Wikipedia Article</a> has some useful tips.",
];

function fillCircle(x,y,rad) {
  gDC.beginPath();
  gDC.arc(x,y,rad,0,2*Math.PI,false);
  gDC.fill();
}

function strokeCircle(x,y,rad) {
  gDC.beginPath();
  gDC.arc(x,y,rad,0,2*Math.PI,false);
  gDC.stroke();
}

function fillAndStrokeCircle(x,y,rad) {
  gDC.beginPath();
  gDC.arc(x,y,rad,0,2*Math.PI,false);
  gDC.fill();
  gDC.stroke();
}

function drawLine(px1,py1,px2,py2) {
  gDC.beginPath();
  gDC.moveTo(px1,py1);
  gDC.lineTo(px2,py2);
  gDC.stroke();
}

function drawX(x,y) {
  var xrad = gCellWidth/10;
  drawLine(x-xrad,y-xrad,x+xrad,y+xrad);
  drawLine(x-xrad,y+xrad,x+xrad,y-xrad);
}

function refreshCanvas()
{
  if (gDC == null)
    return;
  var ts = (new Date()).getTime();
  var durMS = ts - doSuccessAnimationTS;

  gDC.lineCap = 'round';
  gDC.lineJoin = 'round';
  var pw = gPuzzleWidth;
  var ph = gPuzzleHeight;
  var lm = gPuzzMarginH;
  var tm = gPuzzMarginV;
  var cw = gCellWidth;
  var ch = gCellHeight;
  var dotRadius = cw/20;
  var circRadius = cw/2;

  // Draw frame
  gDC.fillStyle = '#FFF';
  gDC.lineWidth = cw*3/50;
  gDC.fillRect(0,0,pw,ph); // lm-2,tm-2,4+pw-lm*2,4+ph-tm*2);
  // gDC.fillRect(lm-2,tm-2,4+pw-lm*2,4+ph-tm*2);
  // gDC.strokeRect(lm,tm,pw-lm*2,ph-tm*2);

  if ('error' in pRec)
    return;

  // Draw dots
  if (!gPuzzleIsComplete) {
    gDC.fillStyle = '#777';
    for (var y = 0; y < puzzHeight; ++y) {
      for (var x = 0; x < puzzWidth; ++x) {
        var px = lm + x*cw + cw/2;
        var py = tm + y*ch + ch/2;
        fillCircle(px, py, dotRadius);
      }
    }
  }

  // Draw edges
  gDC.strokeStyle = '#000';
  gDC.lineWidth = dotRadius*2;
  for (var i in myEdges) {
    var edge = myEdges[i];
    if (edge.state == 0) {
      continue;
    }
    var px1 = lm + edge.x1*cw + cw/2;
    var py1 = tm + edge.y1*ch + ch/2;
    var px2 = lm + edge.x2*cw + cw/2;
    var py2 = tm + edge.y2*ch + ch/2;
    var stroke;
    // we allow a 1 on a 2
    if (edge.blocked)
      stroke = '#770';
    else if ((puzzlePrefs.autoCheckAnswers && edge.state > edge.answer) || edge.flag)
      stroke = '#F00';
    else
      stroke = '#000';
    gDC.strokeStyle = stroke;
    if (doSuccessAnimation) {
      var a = durMS*Math.PI*2/doSuccessDuration;
      gDC.lineWidth  = dotRadius*2 + dotRadius*Math.sin(a);
    }

    if (edge.state == 1) {
      drawLine(px1,py1,px2,py2);
    } else if (edge.state == 2) {
      // console.log ("  rr " + [edge.x1,edge.y1,edge.x2,edge.y2]);
      var xo = (edge.x1 == edge.x2 ? dotRadius*2.5 : 0);
      var yo = (edge.y1 == edge.y2 ? dotRadius*2.5 : 0);
      gDC.strokeStyle = '#FFF';
      drawLine(px1,py1,px2,py2);
      gDC.strokeStyle = stroke;
      drawLine(px1-xo,py1-yo,px2-xo,py2-yo);
      drawLine(px1+xo,py1+yo,px2+xo,py2+yo);
    }
  }

  // Draw islands
  gDC.strokeStyle = '#000';
  gDC.fillStyle = '#FFF';
  gDC.lineWidth = cw/20;

  for (var i in myIslands) {
    var island = myIslands[i];
    var px = lm + island.x * cw + cw/2;
    var py = tm + island.y * ch + ch/2;
    var fill, stroke;
    if (puzzlePrefs.autoCheckAnswers) {
      switch (island.islandClass) {
      case 0: fill = '#FFF';  stroke = '#000';  break; // normal
      case 1: fill = '#4FF';  stroke = '#000';  break; // solved  was DFD
      case 2: fill = '#FFF';  stroke = '#F00';  break; // overbridged
      case 3: fill = '#F4F';  stroke = '#000';  break; // orphaned was FDD
      }
    } else {
      switch (island.islandClass) {
      case 1: fill = '#DFD';  stroke = '#000';  break; // solved
      default:  fill = '#FFF';  stroke = '#000';  break; // normal
      }
    }
    gDC.strokeStyle = stroke;
    gDC.fillStyle = fill;
    fillAndStrokeCircle(px,py,circRadius);
  }
  gDC.lineWidth = 1;

  // Draw clues...
  gDC.strokeStyle = '#000';
  gDC.fillStyle = '#000';
  gDC.font = 'bold ' + gFontHeight + 'px futura,arial,helvetica,sans-serif';
  gDC.textAlign = 'center';

  for (var i in myIslands) {
    var island = myIslands[i];
    var px = lm + island.x * cw + cw/2;
    var py = tm + island.y * ch + ch/2 + gFontHeight*.35;
    gDC.fillText(''+island.clue, px, py);
  }

}

function edgesCross(edge1, edge2) {
  var res = false;
  if (edge1.y1 == edge1.y2 && edge2.x1 == edge2.x2) {  // edge 1 is horizontal, edge 2 is vertical
    res = edge2.x1 > edge1.x1 && edge2.x1 < edge1.x2 &&
          edge1.y1 > edge2.y1 && edge1.y1 < edge2.y2;
    if (res && edge2.state > 0) { 
      // console.log('   h/v block '  + [edge1.x1,edge1.y1,edge1.x2,edge1.y2] + ' <=> ' + [edge2.x1,edge2.y1,edge2.x2,edge2.y2]);
    }
  } else if (edge1.x1 == edge1.x2 && edge2.y1 == edge2.y2) {  // edge 1 is vertical, edge 2 is horiz
    res = edge2.y1 > edge1.y1 && edge2.y2 < edge1.y2 &&
          edge1.x1 > edge2.x1 && edge1.x1 < edge2.x2;
    if (res && edge2.state > 0) { 
      // console.log('   v/h block ' + [edge1.x1,edge1.y1,edge1.x2,edge1.y2] + ' <=> ' + [edge2.x1,edge2.y1,edge2.x2,edge2.y2]);
    }
  }
  return res;
}

function setEdgeBlocks() {
  for (var i = 0; i < myEdges.length; ++i) {
    myEdges[i].blocked = false;
  }
  for (var i = 0; i < myEdges.length; ++i) {
    var edge1 = myEdges[i];
    if (edge1.state > 0) {
      // check for crosses and mark them
      for (var j = 0; j < myEdges.length; ++j) {
        var edge2 = myEdges[j];
        if (j == i || 
            !edgesCross(edge1,edge2)) {
          continue;
        }
        edge2.blocked = true;
        // console.log("Found block: " + [edge1.x1,edge1.y1,edge1.x2,edge1.y2] + ' <=> ' + [edge2.x1,edge2.y1,edge2.x2,edge2.y2]);
      }
    }
  }
}

function classifyIslands() {
  for (var i in myIslands) {
    var island = myIslands[i];
    var nbrSet = 0;
    var nbrAvailable = 0;
    for (j in island.outbridges) {
      var edge = myEdges[island.outbridges[j]];
      if (!edge.blocked) {
        nbrAvailable += 2 - edge.state;
      }
      nbrSet += edge.state;
    }
    if (nbrSet + nbrAvailable < island.clue) {
      island.islandClass = 3; // orphaned
    } else if (nbrSet > island.clue) {
      island.islandClass = 2; // overbridged
    } else if (nbrSet == island.clue) {
      island.islandClass = 1; // perfect
    } else {
      island.islandClass = 0; // in play
    }
    // console.log("Island " + [i,island.clue,nbrSet,nbrAvailable,island.islandClass]);
  }
  // flag islands as 0->normal, 1->complete, 2->overbridged, 3->orphaned
}

function checkIfSolved() {
  for (var i = 0; i < myEdges.length; ++i) {
    var edge = myEdges[i];
    if (edge.state != edge.answer) {
      return false;
    }
  }
  return true;
}


function checkForErrors() {
  var nbrErrors = 0;
  for (var i = 0; i < myEdges.length; ++i) {
    var edge = myEdges[i];
    if (edge.state == 0)
      continue;
    if (edge.state > edge.answer) { 
      edge.flag = 1;
      nbrErrors += 1;
    }
  }
  return nbrErrors;
}

function isLegalEdge(addr) {
  if (addr == -1)
    return false;
  if (myEdges[addr].blocked) {
    return false;
  }
  // !! return false if it intersects an existing set edge...
  return true;
}

var wasInIsland = false;

function ApplyMove(moveRec) {
  if (moveRec.tool == 'loadanswer') {
    loadMyAnswer();
  } else if (moveRec.tool == 'clearpuzzle') {
    clearMyPuzzle();
    initNewPuzzle();
  } else if (moveRec.tool == 'setedge') {
    var edge = myEdges[moveRec.addr];
    edge.state = moveRec.state;
    edge.flag = 0;
    setEdgeBlocks();
    classifyIslands();
    if (checkIfSolved()) {
      gPuzzleIsComplete = true;
      gIsDragging = false;
      gCurrentTool = 'mark';
      DebutSuccessAnimation();
      SuccessLog();
    } else {
      gPuzzleIsComplete = false;
    }
  }
}

function UnapplyMove(moveRec) {
  if (moveRec.tool == 'loadanswer' || moveRec.tool == 'clearpuzzle') {
    // console.log("Restoring puzzle");
    myIslands = $.parseJSON(moveRec.prevIslands);
    myEdges = $.parseJSON(moveRec.prevEdges);
    setEdgeBlocks();
    classifyIslands();
  } else if (moveRec.tool == 'setedge') {
    var edge = myEdges[moveRec.addr];
    edge.state = moveRec.lastState;
    edge.flag = moveRec.lastFlag;
    setEdgeBlocks();
    classifyIslands();
  }
  lastX = -1;
  lastY = -1;
  wasInIsland = false;
  gPuzzleIsComplete = false;
}

function tapPuzzle(px,py,tool) {
  // First check if we tapped a seed, if so, go into seed-color mode

}

function canvasClick(e) {
  // e.preventDefault();

  if (doSuccessAnimation) {
    return;
  }

  var tm = (new Date()).getTime();

  var ofst = $(this).offset();
  var first = e;
  if ("touches" in e.originalEvent) {
    first = e.originalEvent.touches[0];
  } else if ("changedTouches" in e.originalEvent) {
    first = e.originalEvent.changedTouches[0];
  }
  if (ofst == undefined) {
    ofst = $(e.target).offset();
  }
  var px = first.pageX - ofst.left;
  var py = first.pageY - ofst.top;

  var tool = gCurrentTool;
  if (e.shiftKey) {
    tool = 'clear';
  } else if (e.altKey) { // alt-click for double-bridge
    tool = 'double';
  } else if (e.metaKey || e.ctrlKey) {
    tool = 'brand';
  }
  if ("button" in e.originalEvent) { // right click for double-bridge
    if (e.button == 2) {
      tool = 'double';
    }
  }

  if (tool == 'mark' || tool == 'clear' || tool == 'double') {
    gCurrentTool = 'mark';

    var inIsland = getIsland(px,py) != -1;

    var addr = getEdge(px,py);
    var state = 0;
    // console.log("  edge: " + addr);
    if (addr != -1 && isLegalEdge(addr)) {
      var edge = myEdges[addr];
      if (gIsDragging && !inIsland && !wasInIsland) {
        if (lastSource == edge.state && !inIsland) { // while dragging keeping doing same source->dest
          state = lastState;
        }
      }
      else {
        if (!inIsland) {
          lastSource = edge.state;
          if (tool == 'clear') {
            state = (edge.state != 0? 0 : 1);
          } else if (tool == 'double') {
            state = (edge.state != 0? 0 : 2);
          } else {
            state = (edge.state + 1) % 3;
          }
          lastState = state;
        }
        wasInIsland = inIsland;
      }
      var moveRec = {'tool':'setedge','addr':addr,'state':state,'lastState':edge.state,'lastFlag':edge.flag};
      PushMove(moveRec);

      // edge.flag = 0;
      // setEdgeBlocks();
      // classifyIslands();

    }
    lastX = px;
    lastY = py;
  }
}

numHorizontalEdges = 0;

function loadMyAnswer() {
  for (var i in myEdges) {
    var edge = myEdges[i];
    edge.state = edge.answer;
    edge.flag = 0;
    edge.blocked = false;
  }
  setEdgeBlocks();
  classifyIslands();
}

function createSweepCommand(tool) {
  var moveRec = {'tool':tool, 'prevIslands':JSON.stringify(myIslands), 'prevEdges':JSON.stringify(myEdges)};
  lastX = -1;
  lastY = -1;
  wasInIsland = false;
  return moveRec;
}

function clearMyPuzzle() {
  for (var i = 0; i < myEdges.length; ++i) {
    myEdges[i].state = 0;
    myEdges[i].flag = 0;
    myEdges[i].blocked= false;
  }
  gPuzzleIsComplete = false;
  saveSolutionCookies();
}

function saveSolutionCookies() {
  $.cookie(currentPuzzleType.toLowerCase() + '_islands', JSON.stringify(myIslands), {expires:14});
  $.cookie(currentPuzzleType.toLowerCase() + '_edges', JSON.stringify(myEdges), {expires:14});
  $.cookie(currentPuzzleType.toLowerCase() + '_solution_id', puzzleID, {useLocalStorage: false, expires:14});
}


function newEdge(isle1,isle2,sol) {
  var edge = {'isles':[isle1,isle2],'answer':sol,'state':0,'blocked':false,'flag':0,'idx':myEdges.length};
  edge.x1 = myIslands[isle1].x;
  edge.y1 = myIslands[isle1].y;
  edge.x2 = myIslands[isle2].x;
  edge.y2 = myIslands[isle2].y;
  // console.log(" new edge at " + [edge.x1,edge.y1,edge.x2,edge.y2,sol]);
  return edge;
}

function getAdjacentIsland(island, dx, dy) { // get island directly to the right or below this one (or return null)
  for (var i in myIslands) {
    var isl =  myIslands[i];
    if (dx == 0 && (isl.x != island.x || isl.y <= island.y))
      continue;
    if (dy == 0 && (isl.y != island.y || isl.x <= island.x))
      continue;
    return isl.idx;
  }
  return -1;
}

var lastX = -1, lastY = -1;
var lastSource;

function getIsland(px,py) { // convert pixel coords to island, if we're outside radius it doesn't count
  var x = px;
  var y = py;
  var rad2 = Math.pow(gCellWidth/2, 2);

  for (var i in myIslands) {
    var island = myIslands[i];
    var px = gPuzzMarginH + island.x * gCellWidth + gCellWidth/2;
    var py = gPuzzMarginV + island.y * gCellHeight + gCellHeight/2;
    var dx = px - x;
    var dy = py - y;
    if (dx*dx+dy*dy < rad2) {
      return island.idx;
    }
  }
  return -1;
}

function getEdge(px,py) { // convert pixel coords to nearest edge, if we're near an edge, else -1
  var x = px;
  var y = py;
  x -= gPuzzMarginH + gCellWidth/2;
  y -= gPuzzMarginV + gCellHeight/2;
  x /= gCellWidth;
  y /= gCellHeight;

  // don't choose when close to vertex - too much inaccuracy
  var dx = Math.abs(x - Math.round(x));
  var dy = Math.abs(y - Math.round(y));

  var cands = [];
  var edgeWindow = .3;
  // if (dx < 0.1 && dy < 0.1) // skip if close to a vertex (helps reduce errors)
  //   return -1;

  if (dx < edgeWindow) {
    // VERTICAL EDGE
    // don't work if not dragging vertically
    if (!(gIsDragging && Math.abs(px-lastX) > Math.abs(py-lastY)))
    {
      // console.log("Checking for vert edge at " + [x,y]);
      x = Math.round(x);
      // console.log("   at " + [x,y]);

      if ( x >= 0 && x < puzzWidth) {
        for (var i in myEdges) {
          var edge =  myEdges[i];
          // console.log("  checking " + [edge.x1,edge.y1,edge.x2,edge.y2]);
          if (edge.x1 == x && edge.x2 == x && y >= edge.y1 && y <= edge.y2 && !edge.blocked) {
            cands.push(edge);
            break;
          }
        }
      }
    }
  }
  if (dy < edgeWindow) {
    // HORIZONTAL EDGE
    if (!(gIsDragging && Math.abs(px-lastX) < Math.abs(py-lastY)))
    {
      // // Assume clicking on horizontal edge
      y = Math.round(y);
      // console.log("Checking for horz edge at " + [x,y]);
      if (y >= 0 && y < puzzHeight) {
        for (var i in myEdges) {
          var edge =  myEdges[i];
          if (edge.y1 == y && edge.y2 == y && x >= edge.x1 && x <= edge.x2 && !edge.blocked) {
            cands.push(edge);
            break;
          }
        }
      }
    }
  }
  if (cands.length == 0)
    return -1;
  else if (cands.length == 1) {
    return cands[0].idx;
  } else {
    return cands[dx < dy? 0 : 1].idx;
  }
}



$().ready( function() {
  if (!supports_canvas_text()) {
    setError("Sorry!<p>Interactive Puzzles are not supported on your web browser.<p>This puzzle works in...<p/>Internet Explorer 9 or later (requires Windows 7)<br/>Chrome<br/>Safari<br/>Firefox<br/>iPhones, iPads and Android</ul><p>IE8 and earlier are not supported");
    return;
  } else {
    setError("");
  }

  if (document.layers) { document.captureEvents(Event.KEYPRESS); }
  $(document).on('keydown',getKey);

// {"puzzle_data": {"passes": 73, "puzz": "3c4c2e2c5a4b3b1a3a3c3b2d1a3a2b1j2b2a2b4d1a4a2b4b2e2a3b3b4a4a2a3g2c1i3c4c3e2a4a3d1d2a1c2a2a2f2a2a3a3b2e4a3d2a3h2b3a4e2a4a2a2f2a3b4a2a1i2b3a4a3b2a2a3b3a1a1b3f2a2b2a1b1e2c2a3a3a2d2b5a5b2d3a2a4a3c4e3b2a3b3a3f4b4a5a3b1a2a3b3a4a3b1i2a2a1b2a4f5a5a1a2e3a3b2h1a2d1a3e1b3a2a4a2f3a3a4c5a4d2d2a2a3e2c1c3i1c1g3a3a3a3b3b3a2e6b6b2a3a3d2b2a4b4j2b2a3a3d4b4c2a2a3b3b3a3c3e4c3c2", "height": 25, "ptitle": "KD_Bridge_25x25_V3-B100-P6", "width": 25}, "puzzle_id": "KD_Bridge_25x25_V3-B100-P6", "success": true, "cookie_data": ["\"Guilt: the gift that keeps on giving.\"", "                                        -- Erma Bombeck"], "comments": "", "creation_date": "2014-12-11 17:13:38"}

  puzzWidth = 7;
  puzzHeight = 7;
  puzzMaxCells = 49;

  if ('error' in pRec && !('puzzle_data' in pRec)) {
    puzzleMessage([pRec.message]);
  } else {
    if ('message' in pRec && pRec.message != '') {
      puzzleMessage([pRec.message]);
    }

    myPuzzle = pRec['puzzle_data']['puzz'];
    mySolution = pRec['puzzle_data']['solved']; //list of (0,1, or 2) for each known edge...
    puzzWidth = parseInt(pRec['puzzle_data']['width']);
    puzzHeight = parseInt(pRec['puzzle_data']['height']);
    puzzMaxCells = puzzWidth * puzzHeight;
    puzzleID = pRec['puzzle_id'];

    gPuzzMarginH = 10;
    gPuzzMarginV = 10;
    gCellWidth = (gPuzzleWidth-gPuzzMarginH*2) / puzzWidth;
    gCellHeight = (gPuzzleWidth-gPuzzMarginV*2) / puzzWidth;
    gFontHeight = Math.round((20/50)*gCellHeight);

    myIslands = [];
    var x = 0;
    var y = 0;
    for (var i = 0; i < myPuzzle.length; ++i) {
      var ch = myPuzzle.charCodeAt(i);
      var repCnt = 0;
      if (ch >= 48 && ch <= 57) {
        myIslands.push({'x':x,'y':y,'clue':ch-48,'idx':myIslands.length,'outbridges':[],'islandClass':0});
        repCnt = 1;
      } else if (ch >= 97) {
        repCnt = (ch - 96);
      }
      while (repCnt--) {
        x++;
        if (x >= puzzWidth) {
          x = 0;
          ++y;
        }
      }
    }
    // console.log("Puzzle has " + myIslands.length + " islands");

    // console.log("Setting up edges\n");
    // Set up edge arrays for editable edges
    myEdges = [];
    // Create list of edges in the order they are encountered when we loop through islands
    var n = 0;
    for (var i in myIslands) {
      var island = myIslands[i];
      // !! if there is an island to the right
      var isleAIdx = getAdjacentIsland(island,1,0);
      if (isleAIdx != -1) {
        var edge = newEdge(island.idx,isleAIdx, parseInt(mySolution.substr(n,1)) );
        island.outbridges.push(myEdges.length);
        myIslands[isleAIdx].outbridges.push(myEdges.length);
        myEdges.push(edge);
        n += 1;
      }
      var isleBIdx = getAdjacentIsland(island,0,1);
      if (isleBIdx != -1) {
        var edge = newEdge(island.idx,isleBIdx, parseInt(mySolution.substr(n,1)) );
        island.outbridges.push(myEdges.length);
        myIslands[isleBIdx].outbridges.push(myEdges.length);
        myEdges.push(edge);
        n += 1;
      }
    }

  }

  gCanv = document.getElementById('puzzlecontainer');

  myResize();
  $(window).resize(myResize);

  gCanv.width = gPuzzleWidth;
  gCanv.height = gPuzzleHeight;
  gDC = gCanv.getContext('2d');

  var touchEvent = isTouchscreen? 'touchstart' : 'mousedown';
  var moveEvent = isTouchscreen? 'touchmove' : 'mousemove';
  var upEvent = isTouchscreen? 'touchend' : 'mouseup';

  // $('#puzzlecontainer').on('touchmove', canvasTouchDrag );
  $('#puzzlecontainer').on(touchEvent, function(e) {
    gIsDragging = false;
    canvasClick(e);
    gIsDragging = true;
    e.preventDefault();
  });
  $('#puzzlecontainer').on(upEvent, function(e) {
    gIsDragging = false;
    // $.cookie(currentPuzzleType.toLowerCase() + '_edges', JSON.stringify(myEdges), {expires:14});
    // $.cookie(currentPuzzleType.toLowerCase() + '_islands', JSON.stringify(myIslands), {expires:14});
    // $.cookie(currentPuzzleType.toLowerCase() + '_solution_id', puzzleID, {useLocalStorage: false, expires:14});
    e.preventDefault();
  });
  $('#puzzlecontainer').on(moveEvent, function(e) {
    if (gIsDragging) {
      e.preventDefault();
      canvasClick(e);
    }
  });
  // detect mouse up elsewhere...
  $(window).on(upEvent, function(e) {
    gIsDragging = false;
  });

  // since we are using right-click for double-bridges, prevent context-menu in puzzzle area.
  $('#puzzlecontainer').on('contextmenu', function (e) {
    return false;
  });

  // $('#tool_help').on(touchEvent, provideHint); // pullup for hint, check-answers, clear puzzle, instructions, calculator, setup marks, clear marks, clear all, test
  $('#tool_left').on(touchEvent, gotoPrevPuzzle); // prev puzzle
  $('#tool_search').on(touchEvent, launchNavigation); // search/nav dialog
  $('#tool_right').on(touchEvent, gotoNextPuzzle); // next puzzle
  $('#tool_settings').on(touchEvent, launchSettings); // settings dialog
  $('#tool_undo').on(touchEvent, UndoMove); // Undo
  $('#tool_redo').on(touchEvent, RedoMove); // Redo

  // $('#tool_clear').on(touchEvent, function(e) {
  //   generateKey(' ', 0,false);
  // });

  $('.tool-btn').on(touchEvent, function (e) {
      var tool = $(this).data('tool');
      gCurrentTool = tool;
      $('.tool-btn').removeClass('selected');
      $(this).addClass('selected');
  });

  ClearUndoHistory();
  if ($.cookie('bridge_edges') && 
      $.cookie('bridge_islands') && 
      $.cookie(currentPuzzleType.toLowerCase() + '_solution_id',{useLocalStorage: false}) == puzzleID) {
    LoadUndoCookie();
  }
  initNewPuzzle();
  SetUndoVisualState();

  $('.dropdown-toggle').dropdown();



});


