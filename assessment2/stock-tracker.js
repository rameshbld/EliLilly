	function getStockDetailsFormGraph(thisEle){
		var oldcanv = document.getElementById('graph');
		var wrapperDoc = document.getElementById('wrapper');
		wrapperDoc.removeChild(oldcanv)
		
		var canv = document.createElement('canvas');
		canv.id = 'graph';
		canv.width=500;
		canv.height=350;
		wrapperDoc.appendChild(canv);
		
		var symbol = thisEle.value;
		 getRequest(
		    "https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?apikey=6bc959709dce5360990e0bca9664b146&limit=24",
		    drawOutput
		  );
	}
	var symbol = 'AAPL';
	document.addEventListener('DOMContentLoaded', () => {
		  // https://financialmodelingprep.com/developer/docs
		  getRequest(
		    "https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?apikey=6bc959709dce5360990e0bca9664b146&limit=24",
		    drawOutput
		  );
		});
	
	function getRequest(url, success) {
	    var req = false;
	    try {
	      req = new XMLHttpRequest();
	    } catch (e) {
	      try {
	        req = new ActiveXObject("Msxml2.XMLHTTP");
	      } catch (e) {
	        try {
	          req = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (e) {
	          return false;
	        }
	      }
	    }
	    if (!req) return false;
	    if (typeof success != 'function') success = function() {};
	    req.onreadystatechange = function() {
	      if (req.readyState == 4) {
	        if (req.status === 200) {
	          success(req.responseText)
	        }
	      }
	    }
	    req.open("GET", url, true);
	    req.send(null);
	    return req;
	  }
		
	function drawOutput(responseText){
		var graph = document.getElementById("graph");
		var ctx = graph.getContext("2d");
		var tipCanvas = document.getElementById("tip");
		var tipCtx = tipCanvas.getContext("2d");

		var offsetX = 8;
		var offsetY = 69;
		
		// request mousemove events
		/*$("#graph").mousemove(function (e) {
		    handleMouseMove(e);
		});*/
		
		graph.addEventListener('mousemove', e => {
			  handleMouseMove(e);
			});
		 
		var graph;
		var xPadding = 30;
		var yPadding = 30;

		// Notice I changed The X values
		var data = {
		    values: [{
		        X: 0,
		        Y: 12
		    }, {
		        X: 2,
		        Y: 28
		    }, {
		        X: 3,
		        Y: 18
		    }, {
		        X: 4,
		        Y: 34
		    }, {
		        X: 5,
		        Y: 40
		    }, {
		        X: 6,
		        Y: 80
		    }, {
		        X: 7,
		        Y: 80
		    }, {
		        X: 8,
		        Y: 300
		    }]
		};
		
		var dataValues = [];
		var stockData = JSON.parse(responseText);
		for(var i=0; i <= 31; i++){
			var dataPoint = {};
			dataPoint.X = i;
			dataPoint.Y = stockData.historical[i].close;
			dataPoint.text = "Date : "+stockData.historical[i].date+" H: "+stockData.historical[i].high+" L: "+stockData.historical[i].low+" C: "+stockData.historical[i].close;
			dataValues.push(dataPoint);
		}
		data.values = dataValues;
		// define tooltips for each data point
		var dots = [];
		for (var i = 0; i < data.values.length; i++) {
		    dots.push({
		        x: getXPixel(data.values[i].X),
		        y: getYPixel(data.values[i].Y),
		        r: 4,
		        rXr: 16,
		        color: "red",
		        tip: data.values[i].text
		    });
		}

	

		// show tooltip when mouse hovers over dot
		function handleMouseMove(e) {
		    mouseX = parseInt(e.clientX - offsetX);
		    mouseY = parseInt(e.clientY - offsetY);

		    // Put your mousemove stuff here
		    var hit = false;
		    for (var i = 0; i < dots.length; i++) {
		        var dot = dots[i];
		        var dx = mouseX - dot.x;
		        var dy = mouseY - dot.y;
		        if (dx * dx + dy * dy < dot.rXr) {
		            tipCanvas.style.left = (dot.x) + "px";
		            tipCanvas.style.top = (dot.y - 40) + "px";
		            tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
		            //                  tipCtx.rect(0,0,tipCanvas.width,tipCanvas.height);
		            tipCtx.fillText(dot.tip, 5, 15);
		            hit = true;
		        }
		    }
		    if (!hit) {
		        tipCanvas.style.left = "-200px";
		    }
		}


		// unchanged code follows

		// Returns the max Y value in our data list
		function getMaxY() {
		    var max = 0;

		    for (var i = 0; i < data.values.length; i++) {
		        if (data.values[i].Y > max) {
		            max = data.values[i].Y;
		        }
		    }

		    max += 10 - max % 10;
		    return max;
		}

		// Returns the max X value in our data list
		function getMaxX() {
		    var max = 0;

		    for (var i = 0; i < data.values.length; i++) {
		        if (data.values[i].X > max) {
		            max = data.values[i].X;
		        }
		    }

		    // omited
		    //max += 10 - max % 10;
		    return max;
		}

		// Return the x pixel for a graph point
		function getXPixel(val) {
		    // uses the getMaxX() function
		    return ((graph.width - xPadding) / (getMaxX() + 1)) * val + (xPadding * 1.5);
		    // was
		    //return ((graph.width - xPadding) / getMaxX()) * val + (xPadding * 1.5);
		}

		// Return the y pixel for a graph point
		function getYPixel(val) {
		    return graph.height - (((graph.height - yPadding) / getMaxY()) * val) - yPadding;
		}

		graph = document.getElementById("graph");
		var c = graph.getContext('2d');

		c.lineWidth = 2;
		c.strokeStyle = '#333';
		c.font = 'italic 8pt sans-serif';
		c.textAlign = "center";

		// Draw the axises
		c.beginPath();
		c.moveTo(xPadding, 0);
		c.lineTo(xPadding, graph.height - yPadding);
		c.lineTo(graph.width, graph.height - yPadding);
		c.stroke();

		// Draw the X value texts
		var myMaxX = getMaxX();
		for (var i = 0; i <= myMaxX; i++) {
		    // uses data.values[i].X
		    c.fillText(i, getXPixel(i), graph.height - yPadding + 20);
		}
		/* was
		            for(var i = 0; i < data.values.length; i ++) {
		                // uses data.values[i].X
		                c.fillText(data.values[i].X, getXPixel(data.values[i].X), graph.height - yPadding + 20);
		            }
		            */

		// Draw the Y value texts
		c.textAlign = "right"
		c.textBaseline = "middle";

		for (var i = 0; i < getMaxY(); i += 50) {
		    c.fillText(i, xPadding - 10, getYPixel(i));
		}

		c.strokeStyle = '#f00';

		// Draw the line graph
		c.beginPath();
		c.moveTo(getXPixel(data.values[0].X), getYPixel(data.values[0].Y));
		for (var i = 1; i < data.values.length; i++) {
		    c.lineTo(getXPixel(data.values[i].X), getYPixel(data.values[i].Y));
		}
		c.stroke();

		// Draw the dots
		c.fillStyle = '#333';

		for (var i = 0; i < data.values.length; i++) {
		    c.beginPath();
		    c.arc(getXPixel(data.values[i].X), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
		    c.fill();
		}
	}