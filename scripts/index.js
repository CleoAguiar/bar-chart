var data = [4, 8, 15, 16, 23, 42];
var width = 400, height = 100;



$(document).ready(function(){
	// SVG
	var svg = d3.select('.barChart')
	.append('svg')
	.attr('width', width)
	.attr('height', height);

	// Scale
	var scale = d3.scaleLinear()
	.domain([d3.min(data), d3.max(data)])
	.range([0, width - 100]);

	// Scale to axis
	var x_axis = d3.axisBottom()
	.scale(scale);

	svg.append('g').call(x_axis);
});