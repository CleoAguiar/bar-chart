var data = [4, 8, 15, 16, 23, 42];
var width = 400, height = 400;

$(document).ready(function(){
	// SVG
	var svg = d3.select('.barChart')
				.append('svg')
				.attr('width', width)
				.attr('height', height);

	// Scale
	var xscale = d3.scaleLinear()
				   .domain([0, d3.max(data)])
				   .range([0, width - 100]);

	var yscale = d3.scaleLinear()
				   .domain([0, d3.max(data)])
				   .range([height/2, 0]);

	 // Scale to axis
	var x_axis = d3.axisBottom()
				   .scale(xscale);

	var y_axis = d3.axisLeft()
				   .scale(yscale);

	var g = svg.append('g')
			   .attr('transform', 'translate(' + 10 + ',' + 0 + ')');

	g.append('g')
	   .attr('transform', 'translate(50, 10)')
	   .attr('id', 'y-axis')
	   .call(y_axis);
	
	var xAxisTranslate = height/2 + 10;
	g.append('g')
	   .attr('transform', 'translate(50, ' + xAxisTranslate  +')')
	   .attr('id', 'x-axis')
	   .call(x_axis);
});