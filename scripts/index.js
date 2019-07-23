$(document).ready(function(){
	
	// set the dimensions and margins of the graph
	var margin = {top: 50, bottom: 60, left: 60, right: 0},
		width = 1000 - margin.left - margin.right,
		height = 600 - margin.top - margin.bottom,
		barWidth = width / 344;

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

		var tooltip = d3.select('.barChart')
						.append('div')
						.attr('id', 'tooltip')
						.style('fill', '#555');

		var mouseover = function(d, i){
			d3.select(this)
			  .transition()
			  .duration(0)
			  .style('height', d + 'px')
			  .style('width', barWidth + 'px')
			  .style('left', (i * barWidth) + 0 + 'px')
			  .style('opacity', .9)
			  .style('transform', 'translateX(60px)');

			tooltip.transition()
				   .duration(200)
				   .style('opacity', .9);

			var tooltipText = years[i] + '<br>' + '$' + GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion';

			tooltip.html(tooltipText)
				   .attr('data-date', data.data[i][0])
				   .style('left', (i * barWidth) + 30 + 'px')
				   .style('top', height - 100 + 'px')
				   .style('transform', 'translateX(60px)');
		};

		var mouseout = function(d){
			// svg.transition()
			// 	   .duration(200)
			// 	   .style('opacity', 0);
			// svg.transition()
			// 	   .duration(200)
			// 	   .style('opacity', 0);
		};

		// Bar
		 svg.selectAll('rect')
		   .data(scaleGGP)
		   .enter().append('rect')
		   .attr('data-date', (d, i) => data.data[i][0])
		   .attr('data-gdp', (d, i) => data.data[i][1])
		   .attr('class', 'bar')
		   .attr('x', (d, i) => xscale(yearsDate[i]))
		   .attr('y', (d, i) => height - d)
		   .attr('width', barWidth)
		   .attr('height', d => d)
		   .on('mouseover', mouseover)
		   .on('mouseout', mouseout);
	});

});