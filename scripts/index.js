$(document).ready(function(){
	
	// set the dimensions and margins of the graph
	var margin = {top: 50, bottom: 60, left: 60, right: 0},
		width = 1000 - margin.left - margin.right,
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

	d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(function(data){
	
		// Data map
		var years = data.data.map( (item) => {
			var quarter; // Trimestre
			var month = item[0].substring(5,7);
			switch(month){
				case '01':
					quarter = 'Q1';
					break;
				case '04':
					quarter = 'Q2';
					break;
				case '07':
					quarter = 'Q3';
					break;
				case '10':
					quarter = 'Q4';
					break;
			}
			return item[0].substring(0,4) + ' ' + quarter;			
		})

		var yearsDate = data.data.map(function(item) {
			return new Date(item[0]);
		});

		var xMax = new Date(d3.max(yearsDate));
		xMax.setMonth(xMax.getMonth() + 3);

		var GDP = data.data.map(item => item[1]);
		var scaleGGP = [];
		
		var gdpMin = d3.min(GDP), 
			gdpMax = d3.max(GDP);


		// Scale to axi X
		var xscale = d3.scaleTime()
					   .range([0, width])
					   .domain([d3.min(yearsDate), xMax]);
		
		svg.append('g')
		   .attr('transform', 'translate(0,' + height + ')')
		   .attr('id', 'x-axis')
		   .call(d3.axisBottom(xscale))
		   .selectAll('text')
		   .attr("transform", "translate(-10,0)rotate(-45)")
		   .style('text-anchor', 'end');
		
		// Linear Scale
		var linearscale = d3.scaleLinear()
					   .domain([0, gdpMax])
					   .range([0, height]);

		scaleGGP = GDP.map(item => linearscale(item));

		// Scale to axi Y
		var yscale = d3.scaleLinear()
					   .domain([0, gdpMax])
					   .range([height, 0]);

		svg.append('g')
		   .attr('id', 'y-axis')
		   .call(d3.axisLeft(yscale)
					// .tickFormat(d => d/100 + ' k')
					.ticks(10)
					);

		// Bar
		 svg.selectAll('rect')
		   .data(scaleGGP)
		   .enter().append('rect')
		   .attr('data-date', (d, i) => data.data[i][0])
		   .attr('data-gdp', (d, i) => data.data[i][1])
		   .attr('class', 'bar')
		   .attr('x', (d, i) => xscale(yearsDate[i]))
		   .attr('y', (d, i) => height - d)
		   .attr('width', width)
		   .attr('height', d => d);
	});

});