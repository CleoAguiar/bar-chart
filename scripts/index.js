$(document).ready(function(){
    
    // set the dimensions and margins of the graph
    var margin = {top: 10, bottom: 50, left: 50, right: 50},
        width = 800,
        height = 400,
        barWidth = width / 275;

    var tooltip = d3.select('.barChart')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0);

    var overlay = d3.select('.barChart')
                    .append('div')
                    .attr('class', 'overlay')
                    .style('opacity', 0);

    // append the svg object to the body of the page
    var svg = d3.select(".barChart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
    
    d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(function(data){

        svg.append('text')
           .attr('transform', 'rotate(-90)')
           .attr('x', -200)
           .attr('y', 80)
           .text('Gross Domestic Product');

        svg.append('text')
           .attr('x', width/2 + 120)
           .attr('y', height + 50)
           .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
           .attr('class', 'info');

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

        // Scale to axi X
        var xMax = new Date(d3.max(yearsDate));
        xMax.setMonth(xMax.getMonth() + 3);

        var xScale = d3.scaleTime()
                       .range([0, width])
                       .domain([d3.min(yearsDate), xMax]);

        var xAxis = d3.axisBottom().scale(xScale);

        var xAxisGroup = svg.append('g')
                            .call(xAxis)
                            .attr('id', 'x-axis')
                            .attr('transform', 'translate(60, 400)');

        // GDP Data
        var GDP = data.data.map(item => item[1]);
        var scaleGGP = [];
        
        var gdpMin = d3.min(GDP), 
            gdpMax = d3.max(GDP);

        // Linear Scale
        var linearscale = d3.scaleLinear()
                       .domain([0, gdpMax])
                       .range([0, height]);

        scaleGGP = GDP.map(item => linearscale(item));

        // Scale to axi Y
        var yAxisScale = d3.scaleLinear()
                       .domain([0, gdpMax])
                       .range([height, 0]);

        var yAxis = d3.axisLeft(yAxisScale);

        var yAxisGroup = svg.append('g')
                            .call(yAxis)
                            .attr('id', 'y-axis')
                            .attr('transform', 'translate(60, 0)');

        var mouseover = function(d, i){
            overlay.transition()
                   .duration(0)
                   .style('height', d + 'px')
                   .style('width', barWidth + 'px')
                   .style('opacity', .9)
                   .style('left', (i * barWidth) + 230 + 'px')
                   .style('top', height - d + 158 + 'px')
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
            tooltip.transition()
                   .duration(200)
                   .style('opacity', 0);
            overlay.transition()
                   .duration(200)
                   .style('opacity', 0);
        };

        // Bar
        d3.select('svg').selectAll('rect')
           .data(scaleGGP)
           .enter().append('rect')
           .attr('data-date', (d, i) => data.data[i][0])
           .attr('data-gdp', (d, i) => data.data[i][1])
           .attr('class', 'bar')
           .attr('x', (d, i) => xScale(yearsDate[i]))
           .attr('y', (d, i) => height - d)
           .attr('width', barWidth)
           .attr('height', d => d)
           .attr('transform', 'translate(60, 0)')
           .on('mouseover', mouseover)
           .on('mouseout', mouseout);
    });

});