$(document).ready(function(){
	
	// set the dimensions and margins of the graph
	var margin = {top: 50, bottom: 400, left: 50, right: 50},
		width = 660 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom;

	// append the svg object to the body of the page
	var svg = d3.select(".barChart")
				.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	// var g = svg.append('g')
	// 		   .attr('transform', 'translate(0,' + height + ')');

	d3.csv('https://raw.githubusercontent.com/CleoAguiar/bar-chart/master/public/dataset.csv').then(function(data){
	
		// Sort Data
		data = data.slice(0, 10);
		data.sort((b, a) => a.Habitantes - b.Habitantes);

		// Scale to axi X
		var xscale = d3.scaleBand()
					   .range([0, width])
					   .domain(data.map((d) => d.Pais))
					   .padding(.4);
		
		svg.append('g')
		   .attr('transform', 'translate(0,' + height + ')')
		   .attr('id', 'x-axis')
		   .call(d3.axisBottom(xscale))
		   .selectAll('text')
		   .attr("transform", "translate(-10,0)rotate(-45)")
		   .style('text-anchor', 'end');
	
		// Scale to axi Y
		var yscale = d3.scaleLinear()
					   .domain([0, d3.max(data).Habitantes])
					   .range([height, 0]);

		svg.append('g')
		   .attr('id', 'y-axis')
		   .call(d3.axisLeft(yscale)
					.tickFormat(d => d/1000000 + ' mi')
					.ticks(5));

		// Bar
		 svg.selectAll('.bar')
		   .data(data)
		   .enter().append('rect')
		   .attr('class', 'bar')
		   .attr('x', d => xscale(d.Pais))
		   .attr('y', d=> yscale(d.Habitantes))
		   .attr('width', xscale.bandwidth())
		   .attr('height', d => height - yscale(d.Habitantes));
	});

});