var puzzleType = 'Slitherlink';

var puzzleID;

var defaultPuzzlePrefs = {'autoX':true, 
                          'autoCheckAnswers':true};
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

function getMaxPuzzlesPerBook(kind) {
  var dimensions = kind.substr(0,kind.length-3);
  var perBook = {'penrose_sm':32,
                 'penrose_lg':16, 
                 'altair_smsq':32,
                 'altair_lg':8, 
                 'floret_md':16,
                 'floret_lg':8, 
                 'hexagons_sm':16, 
                 'hexagons_lg':8, 
                 'snowflake_lg':16, 
                 'snubsquare_md':16,
                 'snubsquare_lg':8, 
                 'laves_sm':32,
                 'laves_lg':8, 
                 'rhombille1_md':16,
                 'rhombille2_lg':8, 
                 'cairo_md':16,
                 'cairo_lg':8,
                 'septistar':8,
               };
  if (dimensions in perBook) {
    return perBook[dimensions];
  } else {
    return 8;
  }
}

var puzzleInstructions = [
    "In a Slitherlink Puzzle, you connect the dots to form a meandering path that forms a single loop, without crossing itself, or branching. The numbers indicate how many lines surround each cell. Empty cells may be surrounded by any number of line segments.",
    "",
    "There is one unique solution, and you should be able to find it without guessing.",
    "",
];

if (pkind.indexOf('penrose') > -1)
{
    puzzleInstructions.push( "The aperiodic 5-fold tiling in this puzzle is named for Sir Roger Penrose, who discovered it.<p>");
    puzzleInstructions.push( "Special thanks to Craig Kaplan for assistance.<p>");
}
else if (pkind.indexOf('laves') > -1)
{
    puzzleInstructions.push( "These tiles are named for crystalographer Fritz Laves.<p>");
    puzzleInstructions.push( "Special thanks to Craig Kaplan for suggesting their use.<p>");
}
else if (pkind.indexOf('altair') > -1)
{
    puzzleInstructions.push( "This puzzle uses a traditional Islamic design that appears in the books \"Altair Design\" by E. Holiday and \"Arabic Geometrical Pattern and Design\" by J. Bourgoin.<p>");
}

puzzleInstructions.push("<a href=\"http://en.wikipedia.org/wiki/Slitherlink\" target=\"blank\">This Wikipedia Article on square-grid slitherlink</a> has some useful tips.");

function drawEdgeMap(dc) {
  // blue == 255 indicates an edge, red/green encodes the edge index
  var pw = gPuzzleWidth;
  var ph = gPuzzleHeight;
  var cw = gCellWidth;
  var ch = gCellHeight;

  dc.fillStyle = '#000';
  dc.fillRect(0,0,pw,ph);

  dc.lineCap = 'butt';
  dc.lineJoin = 'bevel';

  dc.save();
  dc.translate(gPuzzMarginH,gPuzzMarginV); // margins?
  dc.scale(gPuzzleScale, gPuzzleScale);
  dc.translate(-mesh.bounds.x,-mesh.bounds.y);

  for (var i in myEdges) {
    var e = myEdges[i];
    var d1 = mesh.dots[e.d1];
    var d2 = mesh.dots[e.d2];
    dc.strokeStyle = 'rgb(' + (i >> 8) + ',' + (i & 0xFF) + ',255)';
    dc.lineWidth = 8/gPuzzleScale;
    drawLine(d1.x,d1.y,d2.x,d2.y)
  }

  gDC.fillStyle = '#000';
  var dotRadius = 4/gPuzzleScale;
  for (var i in mesh.dots) {
    var dot = mesh.dots[i];
    fillCircle(dot.x, dot.y, dotRadius);
  }
  dc.restore();
}

function drawCellMap(dc) {
  // blue == 255 indicates a cell, red/green encodes the edge index
  var pw = gPuzzleWidth;
  var ph = gPuzzleHeight;
  var cw = gCellWidth;
  var ch = gCellHeight;

  dc.fillStyle = '#000';
  dc.fillRect(0,0,pw,ph);

  dc.lineCap = 'round';
  dc.lineJoin = 'round';

  dc.save();
  dc.translate(gPuzzMarginH,gPuzzMarginV); // margins?
  dc.scale(gPuzzleScale, gPuzzleScale);
  dc.translate(-mesh.bounds.x,-mesh.bounds.y);

  for (var i in myCells) {
    var cell = myCells[i];
    dc.fillStyle = 'rgb(' + (i >> 8) + ',' + (i & 0xFF) + ',255)';
    gDC.beginPath();
    for (var j in cell.dots) {
      if (j == 0) {
        gDC.moveTo(mesh.dots[cell.dots[j]].x, mesh.dots[cell.dots[j]].y);
      } else {
        gDC.lineTo(mesh.dots[cell.dots[j]].x, mesh.dots[cell.dots[j]].y);
      }
    }
    gDC.closePath();
    gDC.fill();
  }


  dc.strokeStyle = '#000';
  dc.lineWidth = 3/gPuzzleScale;
  for (var i in myEdges) {
    var e = myEdges[i];
    var d1 = mesh.dots[e.d1];
    var d2 = mesh.dots[e.d2];
    drawLine(d1.x,d1.y,d2.x,d2.y)
  }

  dc.restore();
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
  var cw = gCellWidth;
  var ch = gCellHeight;

  gDC.fillStyle = '#FFF';
  gDC.fillRect(0,0,pw,ph);
  if ('error' in pRec)
    return;


  gDC.save();
  gDC.translate(gPuzzMarginH,gPuzzMarginV); // margins?
  gDC.scale(gPuzzleScale, gPuzzleScale);
  gDC.translate(-mesh.bounds.x,-mesh.bounds.y);

  var minLineWidth = 1/gPuzzleScale;
  var dotRadius = Math.max(2/gPuzzleScale, gAvgEdgeLength/16);

  gDC.strokeStyle = '#E3E3E3';
  gDC.lineWidth = Math.max(minLineWidth, dotRadius);

  // draw cell tinting
  for (var i in myCells) {
    var cell = myCells[i];
    var fill = cell.fill;
    if (fill != '') {
      gDC.fillStyle = fill;
      gDC.beginPath();
      for (var j in cell.dots) {
        if (j == 0) {
          gDC.moveTo(mesh.dots[cell.dots[j]].x, mesh.dots[cell.dots[j]].y);
        } else {
          gDC.lineTo(mesh.dots[cell.dots[j]].x, mesh.dots[cell.dots[j]].y);
        }
      }
      gDC.closePath();
      gDC.fill();
    }
  }

  // Draw mesh
  // console.log("Drawing mesh");
  // console.log(myEdges);
  for (var i in myEdges) {
    var e = myEdges[i];
    if (!(e.d1 in mesh.dots) || !(e.d2 in mesh.dots)) {
      // console.log("Invalid dots on edge " + i + " " + e.d1 + " x " + e.d2);
      break;
    }
    var d1 = mesh.dots[e.d1];
    var d2 = mesh.dots[e.d2];
    if (!('x' in d1) || !('y' in d1)) {
      // console.log("d1 is invalid " + d1);
      continue;
    }
    if (!('x' in d2) || !('y' in d2)) {
      // console.log("d2 is invalid " + d2);
      continue;
    }

    drawLine(d1.x,d1.y, d2.x,d2.y);
  }

  // Draw dots
  var a = durMS*Math.PI*2/doSuccessDuration;
  gDC.fillStyle = '#000';
  for (var i in mesh.dots) {
    var dot = mesh.dots[i];
    var r = doSuccessAnimation? dotRadius+dotRadius*Math.sin(a)/2 : dotRadius;
    fillCircle(dot.x, dot.y, r);
  }

  // Draw partial? solution
  gDC.strokeStyle = '#000';
  if (doSuccessAnimation) {
    gDC.lineWidth  = dotRadius*2 + dotRadius*Math.sin(a);
  }
  else {
    gDC.lineWidth = dotRadius*2;
  }

  for (var i in myEdges) {
    var e = myEdges[i];

    var d1 = mesh.dots[e.d1];
    var d2 = mesh.dots[e.d2];
    if (e.s == 2) {
      var strokeStyle = e.f > 0 || (puzzlePrefs.autoCheckAnswers && (e.s == 2) != (e.answer))? '#F00' : '#000';
      gDC.strokeStyle = strokeStyle;
      drawLine(d1.x,d1.y, d2.x,d2.y);
    }
  }

  // Draw Xs
  if (!gPuzzleIsComplete) {
    gDC.strokeStyle = '#777';
    gDC.lineWidth = Math.max(1/gPuzzleScale,gAvgEdgeLength/50);
    var xRad = gAvgEdgeLength/6;
    for (var i in myEdges) {
      var e = myEdges[i];
      var d1 = mesh.dots[e.d1];
      var d2 = mesh.dots[e.d2];
      var dx = d2.x - d1.x;
      var dy = d2.y - d1.y;
      var cx = d1.x + dx/2;
      var cy = d1.y + dy/2;
      var ang = Math.atan2(dy,dx);
      var x1Ang = ang+Math.PI/4;
      var x2Ang = ang-Math.PI/4;
      if (e.s == 1) {
        gDC.strokeStyle = e.f > 0? '#FAA' : '#AAA';
        drawLine(cx+Math.cos(x1Ang)*xRad, cy+Math.sin(x1Ang)*xRad, cx-Math.cos(x1Ang)*xRad, cy-Math.sin(x1Ang)*xRad);
        drawLine(cx+Math.cos(x2Ang)*xRad, cy+Math.sin(x2Ang)*xRad, cx-Math.cos(x2Ang)*xRad, cy-Math.sin(x2Ang)*xRad);
      }
    }
  }

  // Draw Clues
  var fontHeight = Math.max(12/gPuzzleScale, gFontHeight);
  // console.log("Font size = " + gFontHeight);
  gDC.fillStyle = '#000';
  gDC.font = 'bold ' + fontHeight + 'px futura,arial,helvetica,sans-serif';
  gDC.textAlign = 'center';
  for (var i in myCells) {
      var cell = myCells[i];
      // console.log(" cell " + [i,cell.clue,cell.cx,cell.cy]);
      if (cell.clue != -1 && cell.clue != '.') {
        var px = cell.cx + fontHeight*.05;
        var py = cell.cy + fontHeight*.35;
        gDC.fillText(cell.clue, px, py);
      }
  }

  gDC.restore();
}

var myCells = [];
var myEdges = [];
var gAvgEdgeLength = 10;

function equalsEdge(e, d1, d2) {
    return (e.d1 == d1 && e.d2 == d2) || (e.d2 == d1 && e.d1 == d2);
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

  puzzMaxCells = 49;

  if ('error' in pRec && !('puzzle_data' in pRec)) {
    puzzleMessage([pRec.message]);
  } else {
    if ('message' in pRec && pRec.message != '') {
      puzzleMessage([pRec.message]);
    }
    // console.log(pRec);
    var myPuzzle = pRec['puzzle_data']['puzz'];
    var solStr = pRec['puzzle_data']['solved']; // # parse for edge answers
    puzzMaxCells = mesh.cells.length;
    puzzleID = pRec['puzzle_id'];

    gPuzzMarginH = 10;
    gPuzzMarginV = 10; 

    // !!! setup myCells, myEdges, and gAvgEdgeLength (use instead of gCellWidth)

    // gCellWidth = Math.floor(gPuzzleWidth / (puzzWidth+1));
    // gCellHeight = Math.floor(gPuzzleHeight / (puzzHeight+1));
    // gFontHeight = Math.round((20/50)*gCellHeight);
    myCells = mesh.cells;
    myEdges = [];
    myVerts = mesh.dots;

    for (var n = 0; n < puzzMaxCells; ++n) {
      var ch = myPuzzle.charCodeAt(n);
      cell = myCells[n];
      cell.clue = myPuzzle.substr(n,1);
      cell.fill = '';
      cell.edges = [];
      var sumX = 0;
      var sumY = 0;
      for (var j = 0; j < cell.dots.length; ++j) {
        sumX += mesh.dots[cell.dots[j]].x;
        sumY += mesh.dots[cell.dots[j]].y;
        cell.edges.push(addEdge(cell.dots[j], cell.dots[(j+1) % cell.dots.length]));
      }
      cell.cx = sumX / cell.dots.length;
      cell.cy = sumY / cell.dots.length;
      // console.log(" cell cx = " + [cell.cx,myCells[n].cx]);
    }
    var sumEdgeLength = 0;
    for (var n in myEdges) {
      sumEdgeLength += myEdges[n].len;
    }
    gAvgEdgeLength = sumEdgeLength / myEdges.length;

    var eIdx = 0;
    for (var i = 0; i < solStr.length; ++i) {
      var nyb = parseInt(solStr.substr(i,1),16);
      for (var b = 0; b < 4; ++b) {
        if (eIdx < myEdges.length) {
          myEdges[eIdx].answer = (nyb & (1 << b)) != 0;
        }
        eIdx += 1;
      }
    }
  }

  slitherlinkCanvasSetup();

});


