var data = [4, 8, 15, 16, 23, 42];

$(document).ready(function(){
	d3.select('.barChart').append('p').selectAll('p').data(data).enter().append('p').text((d) => d);
});