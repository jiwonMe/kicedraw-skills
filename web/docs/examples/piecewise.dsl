@version: "1.1.0"
@frame: x=-3.6, y=-1.7, width=7.2, height=6.3
@axes: xMin=-3.2, xMax=3.2, yMin=-1.35, yMax=4.1, showLabels=false
left: Function("x+2", xMin=-2.8, xMax=0, endMark="open")
right: Function("x/2+1", xMin=0, xMax=2.8, startMark="closed")
---annotations---
fx: Text(x=2.1, y=3.28, text="$y=f(x)$", isLatex=true)
