
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';


d3.json(url).then(data => {
    console.log(data);

  const margin = { top: 20, right: 20, bottom: 50, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select('#chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);


  const xScale = d3.scaleTime()
                   .domain([new Date(data.data[0][0]), new Date(data.data[data.data.length - 1][0])])
                   .range([0, width]);

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(data.data, d => d[1])])
                   .range([height, 0]);
  

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);


  svg.append('g')
     .attr('id', 'x-axis')
     .attr('transform', `translate(0, ${height})`)
     .call(xAxis);

  svg.append('g')
     .attr('id', 'y-axis')
     .call(yAxis);


  svg.selectAll('.bar')
     .data(data.data)
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('data-date', d => d[0])
     .attr('data-gdp', d => d[1])
     .attr('x', d => xScale(new Date(d[0])))
     .attr('y', d => yScale(d[1]))
     .attr('width', width / data.data.length)
     .attr('height', d => height - yScale(d[1]))
     .on('mouseover', (d) => {
      tooltip.style('opacity', 1);
      tooltip.attr('data-date', d[0])
             .html(`Date: ${d[0]}<br>GDP: $${d[1]} billion`)
             .style('left', `${d3.event.pageX}px`)
             .style('top', `${d3.event.pageY}px`);
            //.style('left', `${d3.pointer(event)[0]}px`)
            //.style('top', `${d3.pointer(event)[1]}px`);
   })
     .on('mouseout', () => {

       tooltip.style('opacity', 0);
     });


  const tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('opacity', 0);
});
