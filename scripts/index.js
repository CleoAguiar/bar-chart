var data = [1, 2, 4, 7, 12, 20, 33, 54, 88, 143, 232, 376, 609, 986, 1596];
var width = 400, height = 400;

$(document).ready(function(){
	
	// set the dimensions and margins of the graph
	var margin = {top: 30, right: 30, bottom: 70, left: 100},
	width = 460 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select(".barChart")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	d3.csv('https://raw.githubusercontent.com/CleoAguiar/bar-chart/master/public/dataset.csv').then(function(data){
		// Sort Data
		data = data.slice(0, 10);
		data.sort((b, a) => a.Habitantes - b.Habitantes);

		var xscale = d3.scaleBand()
					   .range([0, width])
					   .domain(data.map((d) => d.Pais));

		var yscale = d3.scaleLinear()
					   .domain([0, d3.max(data).Habitantes])
					   .range([height, 0]);

		// Scale to axis
		var x_axis = d3.axisBottom()
				       .scale(xscale);

		var y_axis = d3.axisLeft()
					   .scale(yscale);

		var g = svg.append('g')
				   .attr('transform', 'translate( 0,' + height + ')');
		
		g.append('g')
		   .attr('id', 'y-axis')
		   .call(y_axis);
			
		g.append('g')
		   .attr('id', 'x-axis')
		   .call(x_axis)
		   .selectAll("text")
		   .attr("transform", "translate(-10,0)rotate(-45)")
		   .style("text-anchor", "end");
	});

	// svg.append('text')
	//    .attr('x', (width/2))
	//    .attr('text-anchor', 'middle')
	//    .text('Sum of Fibonacci Numbers');

	// // Scale
	// var xscale = d3.scaleLinear()
	// 			   .domain([0, d3.max(data)])
	// 			   .range([0, width - 100]);

	// var yscale = d3.scaleLinear()
	// 			   .domain([0, d3.max(data)])
	// 			   .range([height/2, 0]);

	//  // Scale to axis
	// var x_axis = d3.axisBottom()
	// 			   .scale(xscale);

	// var y_axis = d3.axisLeft()
	// 			   .scale(yscale);

	// var g = svg.append('g')
	// 		   .attr('transform', 'translate(' + 10 + ',' + 0 + ')');

	// g.append('g')
	//    .attr('transform', 'translate(50, 10)')
	//    .attr('id', 'y-axis')
	//    .call(y_axis);
	
	// var xAxisTranslate = height/2 + 10;
	// g.append('g')
	//    .attr('transform', 'translate(50, ' + xAxisTranslate  +')')
	//    .attr('id', 'x-axis')
	//    .call(x_axis);
});