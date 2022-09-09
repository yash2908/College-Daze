// VSlitherlinkUtils.js - Additional functions for Variety Slitherlink


function autoXPoint(dotIdx,addr) { // local implementation
  var key = dotIdx;
  if (!(key in autoXPts)) {
    autoXPts[key] = 1;
    var sum = 0;
    for (var i = addr + 1; i < myEdges.length; ++i) {
      var edge2 = myEdges[i];
      if (edge2.s != 2 || ((edge2.s == 2 != edge2.answer) && puzzlePrefs.autoCheckAnswers) ||
          ( (edge2.d1 != dotIdx) &&
            (edge2.d2 != dotIdx) ) ) {
        continue;
      }
      if ((edge2.d1 == dotIdx) ||
          (edge2.d2 == dotIdx)) 
      {
        // Junction found, automark all incoming edges
        for (var j = 0; j < myEdges.length; ++j) {
          var edge3 = myEdges[j];
          if (edge3.s != 0 ||
              ((edge3.d1 != dotIdx) &&
               (edge3.d2 != dotIdx) ) ) {
            continue;
          }
          edge3.s = 1;
        }
      }
    }
  }
}

var autoX = function(addr) { // override
  var junctions = [];
  // console.log("auto x call " + puzzlePrefs.autoCheckAnswers);
  autoXPts = {};
  for (var addr = 0; addr < myEdges.length; ++addr) {
    var edge = myEdges[addr];
    if (edge.s != 2 || ((edge.s == 2 != edge.answer) && puzzlePrefs.autoCheckAnswers)) {
      continue;
    }
    // console.log("got some");
    autoXPoint(edge.d1, addr);
    autoXPoint(edge.d2, addr);
  }
}

var wontMakeT = function(addr) { // override
  // make sure setting this edge won't produce 3 edges that share the same vertex.
  var edge = myEdges[addr];
  var pt = edge.d1;
  var sum = 0;
  for (var i = 0; i < myEdges.length; ++i) {
    if (myEdges[i].s != 2)
      continue;
    if (myEdges[i].d1 == pt || myEdges[i].d2 == pt) {
      sum += 1;
      if (sum == 2) {
        return false;
      }
    }
  }
  pt = edge.d2;
  x = edge.x2;
  y = edge.y2;
  sum = 0;
  for (var i = 0; i < myEdges.length; ++i) {
    if (myEdges[i].s != 2)
      continue;
    if (myEdges[i].d1 == pt || myEdges[i].d2 == pt) {
      sum += 1;
      if (sum == 2) {
        return false;
      }
    }
  }
  return true;
}

var localResize = function() // local implementation
{
  gFontHeight = Math.round((20/50)*gAvgEdgeLength);
  if ('fontScale' in mesh) {
    gFontHeight *= mesh['fontScale'];
  }
}


function isPointInPoly(cell, x,y){
  poly = cell.dots;
  for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
      ((mesh.dots[poly[i]].y <= y && y < mesh.dots[poly[j]].y) || (mesh.dots[poly[j]].y <= y && y < mesh.dots[poly[i]].y))
      && (x < (mesh.dots[poly[j]].x - mesh.dots[poly[i]].x) * (y - mesh.dots[poly[i]].y) / (mesh.dots[poly[j]].y - mesh.dots[poly[i]].y) + mesh.dots[poly[i]].x)
      && (c = !c);
  return c;
}

function isPointInTriangle(px,py,p0x,p0y,p1x,p1y,p2x,p2y) {
  var area = 0.5*(-p1y*p2x + p0y*(-p1x + p2x) + p0x*(p1y - p2y) + p1x*p2y);
  var s = 1/(2*area)*(p0y*p2x - p0x*p2y + (p2y - p0y)*px + (p0x - p2x)*py);
  var t = 1/(2*area)*(p0x*p1y - p0y*p1x + (p0y - p1y)*px + (p1x - p0x)*py);
  return (0 <= s && s <= 1 && 0 <= t && t <= 1 && (s+t) <= 1);
}

var getCell = function(x,y) // override
{
  x -= gPuzzMarginH;
  y -= gPuzzMarginV;

  x /= gPuzzleScale;
  y /= gPuzzleScale;

  x += mesh.bounds.x;
  y += mesh.bounds.y;

  if (x < mesh.bounds.x || y < mesh.bounds.y || x > mesh.bounds.x + mesh.bounds.w || y > mesh.bounds.y + mesh.bounds.h)
  {
    // console.log("out of bounds");
    return -1;
  }

  for (var i in myCells) {
    if (isPointInPoly(myCells[i], x,y)) {
      // console.log("cell " + i);
      return i;
    }
  }
  // console.log("no cell");
  return -1;
}

var angleGrace = Math.PI/6;// 6=30 degrees 9=20 degrees 12=15 degrees
var lastDistance;
var boundsGrace = 10;

function ptOnLine(idx,x,y,x1,y1,x2,y2) {
  var isHoriz = Math.abs(x2-x1) >= Math.abs(y2-y1) || Math.abs(x2-x1) > boundsGrace ;
  var isVert = Math.abs(x2-x1) <= Math.abs(y2-y1) || Math.abs(y2-y1) > boundsGrace;
  if ((isHoriz && (x < Math.min(x1,x2) || x > Math.max(x1,x2))) ||
      (isVert && (y < Math.min(y1,y2) || y > Math.max(y1,y2)))) {
    return false;
  }
  var angleDelta = Math.abs(Math.atan2(y2-y1,x2-x1) - Math.atan2(y-y1,x-x1));
  if (angleDelta > Math.PI)
    angleDelta = 2*Math.PI - angleDelta;
  if (angleDelta < angleGrace) {
    // lastAngleDelta = angleDelta;
    var dcx = (x2-x1)/2 - x;
    var dcy = (y2-y1)/2 - y;
    lastDistance = Math.sqrt(dcx*dcx+dcy*dcy);
    // console.log("last distance " + lastDistance);
    return true;
  }
  return false;
}

var getEdge = function(px,py) { // convert pixel coords to nearest edge, if we're near an edge, else -1
  var x = px;
  var y = py;

  x -= gPuzzMarginH;
  y -= gPuzzMarginV;

  x /= gPuzzleScale;
  y /= gPuzzleScale;

  x += mesh.bounds.x;
  y += mesh.bounds.y;

  // If it's in a cell, use the nearest edge based on triangles made with cell center
  for (var i in myCells) {
    var cell = myCells[i];
    if (isPointInPoly(cell, x,y)) {
      // console.log("cell " + i);
      // Get best matching edge for this cell...
      for (var j in cell.edges) 
      {
        var eIdx = cell.edges[j];
        var e = myEdges[eIdx];
        if (isPointInTriangle(x,y,cell.cx,cell.cy,mesh.dots[e.d1].x,mesh.dots[e.d1].y,mesh.dots[e.d2].x,mesh.dots[e.d2].y))
        {
          return eIdx;
        }          
      }
    }
  }

  // We are outside the puzzle, use the other algorithm...

  boundsGrace = 16/gPuzzleScale;

  var matchEdge = -1;
  var bestDistance = 10000;
  for (var i in myEdges) {
    var e = myEdges[i];
    if (ptOnLine(i,x,y, mesh.dots[e.d1].x,mesh.dots[e.d1].y,
                       mesh.dots[e.d2].x,mesh.dots[e.d2].y) && 
        lastDistance < bestDistance) {

      // reject if dragging and angle made with lastAngle isn't a reasonable match
      // for direction of drag
      if (gIsDragging) {
        var dragAngle = Math.atan2(py - lastY,px - lastX);
        var edgeAngle = e.angle;
        var eDelta = Math.abs(e.angle - dragAngle);
        if (eDelta > Math.PI) {
          eDelta = 2*Math.PI - eDelta;
        }
        if (eDelta > Math.PI/3 && eDelta < 2*Math.PI/3)
          continue;
      }
      matchEdge = i;
      bestDistance = lastDistance;
    }
  }
  return matchEdge;
}

var addEdge = function(d1, d2) { // override

  for (var i in myEdges) {
    var e = myEdges[i];
    if (equalsEdge(e,d1,d2))
      return e.id;
  }
  var dx = mesh.dots[d2].x - mesh.dots[d1].x;
  var dy = mesh.dots[d2].y - mesh.dots[d1].y;
  var len = Math.sqrt(dx*dx+dy*dy);
  var angle = Math.atan2(dy,dx);
  var e = {'id':myEdges.length, 'd1':d1, 'd2':d2, 'len':len, 'angle':angle, 'f':0, 's':0};
  myEdges.push(e);
  return e.id;
}

var CloneEdges = function(srcEdges) { // override
  // console.log("variety clone");
  var dstEdges = [];
  for (var key in srcEdges) {
    var e = srcEdges[key];
    var ne = {'id':e.id,  'd1':e.d1, 'd2':e.d2, 'len':e.len, 'angle':e.angle, 'f':e.f, 's':e.s, 'answer':e.answer};
    dstEdges.push(ne);
  }
  return dstEdges;
}


function setupCanvas()
{
  gCanv.width = gPuzzleWidth;
  gCanv.height = gPuzzleHeight;
  gDC = gCanv.getContext('2d');
}
