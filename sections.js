
//HEATMAP 

var margin = {top: 80, right: 25, bottom: 160, left: 200},
    width = 1500 - margin.left - margin.right,
    height = 2000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/karinanguyen/uyghurs/main/data/heatmap_data.csv", function(data) {


// Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3.map(data, function(d){return d.year;}).keys()
    var myVars = d3.map(data, function(d){return d.country;}).keys()

    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
    svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.15);
    svg.append("g")
    .style("font-size", 12)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    // Build color scale
    var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateBuPu)
    .domain([0,20])

    // create a tooltip
    var tooltip = d3.select("#my_dataviz")
    .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "2px")
        .style("padding", "5px")
        .style("position", "absolute")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
    tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
    tooltip
        .html(d.country + " " + d.uyghur_count)
        .style("left", (d3.event.pageX+20) + "px")
        .style("top", (d3.event.pageY-30) + "px")
    }
    var mouseleave = function(d) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
}

// add the squares
svg.selectAll("rect")
  .data(data, function(d) {return d.year+':'+d.country;})
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.year) })
    .attr("y", function(d) { return y(d.country) })
    .attr("rx", 3)
    .attr("ry", 3)
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth() )
    .style("fill", function(d) { return myColor(d.uyghur_count)})
    .style("stroke-width", 2)
    .style("stroke", "none")
    .style("opacity", 0.8)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)
})

function conversor(d){
    d.country = +d.country;
    d.year = +d.year;
    d.uyghur_count = +d.uyghur_count;
    return d;
}

// Add title to graph
svg.append("text")
      .attr("x", 10)
      .attr("y", -40)
      .attr("text-anchor", "left")
      .style("font-size", "18px")
      .text("Heatmap");

// Add subtitle to graph
svg.append("text")
      .attr("x", 10)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("Insight.");




// let dataset, svg
// let salarySizeScale, salaryXScale, categoryColorScale
// let simulation, nodes
// let categoryLegend, salaryLegend 


// const categories = ['Engineering', 'Business', 'Physical Sciences', 'Law & Public Policy', 'Computers & Mathematics', 'Agriculture & Natural Resources',
// 'Industrial Arts & Consumer Services','Arts', 'Health','Social Science', 'Biology & Life Science','Education','Humanities & Liberal Arts',
// 'Psychology & Social Work','Communications & Journalism','Interdisciplinary'] 

// const categoriesXY = {'Engineering': [0, 400, 57382, 23.9],
//                         'Business': [0, 600, 43538, 48.3],
//                         'Physical Sciences': [0, 800, 41890, 50.9],
//                         'Law & Public Policy': [0, 200, 42200, 48.3],
//                         'Computers & Mathematics': [200, 400, 42745, 31.2],
//                         'Agriculture & Natural Resources': [200, 600, 36900, 40.5],
//                         'Industrial Arts & Consumer Services': [200, 800, 36342, 35.0],
//                         'Arts': [200, 200, 33062, 60.4],
//                         'Health': [400, 400, 36825, 79.5],
//                         'Social Science': [400, 600, 37344, 55.4],
//                         'Biology & Life Science': [400, 800, 36421, 58.7],
//                         'Education': [400, 200, 32350, 74.9],
//                         'Humanities & Liberal Arts': [600, 400, 31913, 63.2],
//                         'Psychology & Social Work': [600, 600, 30100, 79.4],
//                         'Communications & Journalism': [600, 800, 34500, 65.9],
//                         'Interdisciplinary': [600, 200, 35000, 77.1]}


// const margin = {left: 170, top: 50, bottom: 50, right: 20}
// const width = 1000 - margin.left - margin.right
// const height = 950 - margin.top - margin.bottom


// d3.csv('data/heatmap_data.csv', function(d){
//     return {
//         Country: d.country,
//         Year: +d.year,
//         Mentions: +d.uyghur_count,
//     };
// }).then(data => {
//     dataset = data
//     console.log(dataset)
//     createScales()
//     setTimeout(drawInitial(), 100)
// })

// const colors = ['#ffcc00', '#ff6666', '#cc0066', '#66cccc', '#f688bb', '#65587f', '#baf1a1', '#333333', '#75b79e',  '#66cccc', '#9de3d0', '#f1935c', '#0c7b93', '#eab0d9', '#baf1a1', '#9399ff']
 
// //Create all the scales and save to global variables

// function createScales(){
//     salarySizeScale = d3.scaleLinear(d3.extent(dataset, d => d.uyghur_count), [5, 35])
//     salaryXScale = d3.scaleLinear(d3.extent(dataset, d => d.country), [margin.left, margin.left + width+250])
//     salaryYScale = d3.scaleLinear(d3.extent(dataset, d => d.year), [margin.top + height, margin.top])
//     categoryColorScale = d3.scaleOrdinal(categories, colors)
//     //shareWomenXScale = d3.scaleLinear(d3.extent(dataset, d => d.ShareWomen), [margin.left, margin.left + width])
//     //enrollmentScale = d3.scaleLinear(d3.extent(dataset, d => d.Total), [margin.left + 120, margin.left + width - 50])
//     //enrollmentSizeScale = d3.scaleLinear(d3.extent(dataset, d=> d.Total), [10,60])
//     //histXScale = d3.scaleLinear(d3.extent(dataset, d => d.Midpoint), [margin.left, margin.left + width])
//     //histYScale = d3.scaleLinear(d3.extent(dataset, d => d.HistCol), [margin.top + height, margin.top])
// }

// function createLegend(x, y){
//     let svg = d3.select('#legend')

//     svg.append('g')
//         .attr('class', 'categoryLegend')
//         .attr('transform', `translate(${x},${y})`)

//     categoryLegend = d3.legendColor()
//                             .shape('path', d3.symbol().type(d3.symbolCircle).size(150)())
//                             .shapePadding(10)
//                             .scale(categoryColorScale)
    
//     d3.select('.categoryLegend')
//         .call(categoryLegend)
// }

// function createSizeLegend(){
//     let svg = d3.select('#legend2')
//     svg.append('g')
//         .attr('class', 'sizeLegend')
//         .attr('transform', `translate(100,50)`)

//     sizeLegend2 = d3.legendSize()
//         .scale(salarySizeScale)
//         .shape('circle')
//         .shapePadding(15)
//         .title('Salary Scale')
//         .labelFormat(d3.format("$,.2r"))
//         .cells(7)

//     d3.select('.sizeLegend')
//         .call(sizeLegend2)
// }

// function createSizeLegend2(){
//     let svg = d3.select('#legend3')
//     svg.append('g')
//         .attr('class', 'sizeLegend2')
//         .attr('transform', `translate(50,100)`)

//     sizeLegend2 = d3.legendSize()
//         //.scale(enrollmentSizeScale)
//         .shape('circle')
//         .shapePadding(55)
//         .orient('horizontal')
//         .title('Enrolment Scale')
//         .labels(['1000', '200000', '400000'])
//         .labelOffset(30)
//         .cells(3)

//     d3.select('.sizeLegend2')
//         .call(sizeLegend2)
// }

// // All the initial elements should be create in the drawInitial function
// // As they are required, their attributes can be modified
// // They can be shown or hidden using their 'opacity' attribute
// // Each element should also have an associated class name for easy reference

// function drawInitial(){
//     createSizeLegend()
//     createSizeLegend2()

//     let svg = d3.select("#vis")
//                     .append('svg')
//                     .attr('width', 1000)
//                     .attr('height', 950)
//                     .attr('opacity', 1)

//     let xAxis = d3.axisBottom(salaryXScale)
//                     .ticks(4)
//                     .tickSize(height + 80)

//     let xAxisGroup = svg.append('g')
//         .attr('class', 'first-axis')
//         .attr('transform', 'translate(0, 0)')
//         .call(xAxis)
//         .call(g => g.select('.domain')
//             .remove())
//         .call(g => g.selectAll('.tick line'))
//             .attr('stroke-opacity', 0.2)
//             .attr('stroke-dasharray', 2.5)

//     // Instantiates the force simulation
//     // Has no forces. Actual forces are added and removed as required

//     simulation = d3.forceSimulation(dataset)

//      // Define each tick of simulation
//     simulation.on('tick', () => {
//         nodes
//             .attr('cx', d => d.x)
//             .attr('cy', d => d.y)
//     })

//     // Stop the simulation until later
//     simulation.stop()

//     // Selection of all the circles 
//     nodes = svg
//         .selectAll('circle')
//         .data(dataset)
//         .enter()
//         .append('circle')
//             .attr('fill', 'black')
//             .attr('r', 3)
//             .attr('cx', (d, i) => salaryXScale(d.Median) + 5)
//             .attr('cy', (d, i) => i * 5.2 + 30)
//             .attr('opacity', 0.8)
        
//     // Add mouseover and mouseout events for all circles
//     // Changes opacity and adds border
//     svg.selectAll('circle')
//         .on('mouseover', mouseOver)
//         .on('mouseout', mouseOut)

//     function mouseOver(d, i){

//         console.log('hi')
//         d3.select(this)
//             .transition('mouseover').duration(100)
//             .attr('opacity', 1)
//             .attr('stroke-width', 5)
//             .attr('stroke', 'black')
            
//         d3.select('#tooltip')
//             .style('left', (d3.event.pageX + 10)+ 'px')
//             .style('top', (d3.event.pageY - 25) + 'px')
//             .style('display', 'inline-block')
//             .html(`<strong>Major:</strong> ${d.Major[0] + d.Major.slice(1,).toLowerCase()} 
//                 <br> <strong>Median Salary:</strong> $${d3.format(",.2r")(d.Median)} 
//                 <br> <strong>Category:</strong> ${d.Category}
//                 <br> <strong>% Female:</strong> ${Math.round(d.ShareWomen*100)}%
//                 <br> <strong># Enrolled:</strong> ${d3.format(",.2r")(d.Total)}`)
//     }
    
//     function mouseOut(d, i){
//         d3.select('#tooltip')
//             .style('display', 'none')

//         d3.select(this)
//             .transition('mouseout').duration(100)
//             .attr('opacity', 0.8)
//             .attr('stroke-width', 0)
//     }

//     //Small text label for first graph
//     svg.selectAll('.small-text')
//         .data(dataset)
//         .enter()
//         .append('text')
//             .text((d, i) => d.Major.toLowerCase())
//             .attr('class', 'small-text')
//             .attr('x', margin.left)
//             .attr('y', (d, i) => i * 5.2 + 30)
//             .attr('font-size', 7)
//             .attr('text-anchor', 'end')
    
//     //All the required components for the small multiples charts
//     //Initialises the text and rectangles, and sets opacity to 0 
//     svg.selectAll('.cat-rect')
//         .data(categories).enter()
//         .append('rect')
//             .attr('class', 'cat-rect')
//             .attr('x', d => categoriesXY[d][0] + 120 + 1000)
//             .attr('y', d => categoriesXY[d][1] + 30)
//             .attr('width', 160)
//             .attr('height', 30)
//             .attr('opacity', 0)
//             .attr('fill', 'grey')


//     svg.selectAll('.lab-text')
//         .data(categories).enter()
//         .append('text')
//         .attr('class', 'lab-text')
//         .attr('opacity', 0)
//         .raise()

//     svg.selectAll('.lab-text')
//         .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
//         .attr('x', d => categoriesXY[d][0] + 200 + 1000)
//         .attr('y', d => categoriesXY[d][1] - 500)
//         .attr('font-family', 'Domine')
//         .attr('font-size', '12px')
//         .attr('font-weight', 700)
//         .attr('fill', 'black')
//         .attr('text-anchor', 'middle')       

//     svg.selectAll('.lab-text')
//             .on('mouseover', function(d, i){
//                 d3.select(this)
//                     .text(d)
//             })
//             .on('mouseout', function(d, i){
//                 d3.select(this)
//                     .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
//             })


//     // Best fit line for gender scatter plot

//     const bestFitLine = [{x: 0, y: 56093}, {x: 1, y: 25423}]
//     const lineFunction = d3.line()
//                             .x(d => shareWomenXScale(d.x))
//                             .y(d => salaryYScale(d.y))

//     // Axes for Scatter Plot
//     svg.append('path')
//         .transition('best-fit-line').duration(430)
//             .attr('class', 'best-fit')
//             .attr('d', lineFunction(bestFitLine))
//             .attr('stroke', 'grey')
//             .attr('stroke-dasharray', 6.2)
//             .attr('opacity', 0)
//             .attr('stroke-width', 3)

//     let scatterxAxis = d3.axisBottom(shareWomenXScale)
//     let scatteryAxis = d3.axisLeft(salaryYScale).tickSize([width])

//     svg.append('g')
//         .call(scatterxAxis)
//         .attr('class', 'scatter-x')
//         .attr('opacity', 0)
//         .attr('transform', `translate(0, ${height + margin.top})`)
//         .call(g => g.select('.domain')
//             .remove())
    
//     svg.append('g')
//         .call(scatteryAxis)
//         .attr('class', 'scatter-y')
//         .attr('opacity', 0)
//         .attr('transform', `translate(${margin.left - 20 + width}, 0)`)
//         .call(g => g.select('.domain')
//             .remove())
//         .call(g => g.selectAll('.tick line'))
//             .attr('stroke-opacity', 0.2)
//             .attr('stroke-dasharray', 2.5)

//     // Axes for Histogram 

//     let histxAxis = d3.axisBottom(enrollmentScale)

//     svg.append('g')
//         .attr('class', 'enrolment-axis')
//         .attr('transform', 'translate(0, 700)')
//         .attr('opacity', 0)
//         .call(histxAxis)
// }

// //Cleaning Function
// //Will hide all the elements which are not necessary for a given chart type 

// function clean(chartType){
//     let svg = d3.select('#vis').select('svg')
//     if (chartType !== "isScatter") {
//         svg.select('.scatter-x').transition().attr('opacity', 0)
//         svg.select('.scatter-y').transition().attr('opacity', 0)
//         svg.select('.best-fit').transition().duration(200).attr('opacity', 0)
//     }
//     if (chartType !== "isMultiples"){
//         svg.selectAll('.lab-text').transition().attr('opacity', 0)
//             .attr('x', 1800)
//         svg.selectAll('.cat-rect').transition().attr('opacity', 0)
//             .attr('x', 1800)
//     }
//     if (chartType !== "isFirst"){
//         svg.select('.first-axis').transition().attr('opacity', 0)
//         svg.selectAll('.small-text').transition().attr('opacity', 0)
//             .attr('x', -200)
//     }
//     if (chartType !== "isHist"){
//         svg.selectAll('.hist-axis').transition().attr('opacity', 0)
//     }
//     if (chartType !== "isBubble"){
//         svg.select('.enrolment-axis').transition().attr('opacity', 0)
//     }
// }

// //First draw function

// function draw1(){
//     //Stop simulation
//     simulation.stop()
    
//     let svg = d3.select("#vis")
//                     .select('svg')
//                     .attr('width', 1000)
//                     .attr('height', 950)
    
//     clean('isFirst')

//     d3.select('.categoryLegend').transition().remove()

//     svg.select('.first-axis')
//         .attr('opacity', 1)
    
//     svg.selectAll('circle')
//         .transition().duration(500).delay(100)
//         .attr('fill', 'black')
//         .attr('r', 3)
//         .attr('cx', (d, i) => salaryXScale(d.Median)+5)
//         .attr('cy', (d, i) => i * 5.2 + 30)

//     svg.selectAll('.small-text').transition()
//         .attr('opacity', 1)
//         .attr('x', margin.left)
//         .attr('y', (d, i) => i * 5.2 + 30)
// }


// function draw2(){
//     let svg = d3.select("#vis").select('svg')
    
//     clean('none')

//     svg.selectAll('circle')
//         .transition().duration(300).delay((d, i) => i * 5)
//         .attr('r', d => salarySizeScale(d.Median) * 1.2)
//         .attr('fill', d => categoryColorScale(d.Category))

//     simulation  
//         .force('charge', d3.forceManyBody().strength([2]))
//         .force('forceX', d3.forceX(d => categoriesXY[d.Category][0] + 200))
//         .force('forceY', d3.forceY(d => categoriesXY[d.Category][1] - 50))
//         .force('collide', d3.forceCollide(d => salarySizeScale(d.Median) + 4))
//         .alphaDecay([0.02])

//     //Reheat simulation and restart
//     simulation.alpha(0.9).restart()
    
//     createLegend(20, 50)
// }

// function draw3(){
//     let svg = d3.select("#vis").select('svg')
//     clean('isMultiples')
    
//     svg.selectAll('circle')
//         .transition().duration(400).delay((d, i) => i * 5)
//         .attr('r', d => salarySizeScale(d.Median) * 1.2)
//         .attr('fill', d => categoryColorScale(d.Category))

//     svg.selectAll('.cat-rect').transition().duration(300).delay((d, i) => i * 30)
//         .attr('opacity', 0.2)
//         .attr('x', d => categoriesXY[d][0] + 120)
        
//     svg.selectAll('.lab-text').transition().duration(300).delay((d, i) => i * 30)
//         .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
//         .attr('x', d => categoriesXY[d][0] + 200)   
//         .attr('y', d => categoriesXY[d][1] + 50)
//         .attr('opacity', 1)

//     svg.selectAll('.lab-text')
//         .on('mouseover', function(d, i){
//             d3.select(this)
//                 .text(d)
//         })
//         .on('mouseout', function(d, i){
//             d3.select(this)
//                 .text(d => `Average: $${d3.format(",.2r")(categoriesXY[d][2])}`)
//         })

//     simulation  
//         .force('charge', d3.forceManyBody().strength([2]))
//         .force('forceX', d3.forceX(d => categoriesXY[d.Category][0] + 200))
//         .force('forceY', d3.forceY(d => categoriesXY[d.Category][1] - 50))
//         .force('collide', d3.forceCollide(d => salarySizeScale(d.Median) + 4))
//         .alpha(0.7).alphaDecay(0.02).restart()

// }

// function draw5(){
    
//     let svg = d3.select('#vis').select('svg')
//     clean('isMultiples')

//     simulation
//         .force('forceX', d3.forceX(d => categoriesXY[d.Category][0] + 200))
//         .force('forceY', d3.forceY(d => categoriesXY[d.Category][1] - 50))
//         .force('collide', d3.forceCollide(d => salarySizeScale(d.Median) + 4))

//     simulation.alpha(1).restart()
   
//     svg.selectAll('.lab-text').transition().duration(300).delay((d, i) => i * 30)
//         .text(d => `% Female: ${(categoriesXY[d][3])}%`)
//         .attr('x', d => categoriesXY[d][0] + 200)   
//         .attr('y', d => categoriesXY[d][1] + 50)
//         .attr('opacity', 1)
    
//     svg.selectAll('.lab-text')
//         .on('mouseover', function(d, i){
//             d3.select(this)
//                 .text(d)
//         })
//         .on('mouseout', function(d, i){
//             d3.select(this)
//                 .text(d => `% Female: ${(categoriesXY[d][3])}%`)
//         })
   
//     svg.selectAll('.cat-rect').transition().duration(300).delay((d, i) => i * 30)
//         .attr('opacity', 0.2)
//         .attr('x', d => categoriesXY[d][0] + 120)

//     svg.selectAll('circle')
//         .transition().duration(400).delay((d, i) => i * 4)
//             .attr('fill', colorByGender)
//             .attr('r', d => salarySizeScale(d.Median))

// }

// function colorByGender(d, i){
//     if (d.ShareWomen < 0.4){
//         return 'blue'
//     } else if (d.ShareWomen > 0.6) {
//         return 'red'
//     } else {
//         return 'grey'
//     }
// }

// function draw6(){
//     simulation.stop()
    
//     let svg = d3.select("#vis").select("svg")
//     clean('isScatter')

//     svg.selectAll('.scatter-x').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)
//     svg.selectAll('.scatter-y').transition().attr('opacity', 0.7).selectAll('.domain').attr('opacity', 1)

//     svg.selectAll('circle')
//         .transition().duration(800).ease(d3.easeBack)
//         .attr('cx', d => shareWomenXScale(d.ShareWomen))
//         .attr('cy', d => salaryYScale(d.Median))
    
//     svg.selectAll('circle').transition(1600)
//         .attr('fill', colorByGender)
//         .attr('r', 10)

//     svg.select('.best-fit').transition().duration(300)
//         .attr('opacity', 0.5)
   
// }

// function draw7(){
//     let svg = d3.select('#vis').select('svg')

//     clean('isBubble')

//     simulation
//         .force('forceX', d3.forceX(d => enrollmentScale(d.Total)))
//         .force('forceY', d3.forceY(500))
//         .force('collide', d3.forceCollide(d => enrollmentSizeScale(d.Total) + 2))
//         .alpha(0.8).alphaDecay(0.05).restart()

//     svg.selectAll('circle')
//         .transition().duration(300).delay((d, i) => i * 4)
//         .attr('r', d => enrollmentSizeScale(d.Total))
//         .attr('fill', d => categoryColorScale(d.Category))

//     //Show enrolment axis (remember to include domain)
//     svg.select('.enrolment-axis').attr('opacity', 0.5).selectAll('.domain').attr('opacity', 1)

// }

// function draw4(){
//     let svg = d3.select('#vis').select('svg')

//     clean('isHist')

//     simulation.stop()

//     svg.selectAll('circle')
//         .transition().duration(600).delay((d, i) => i * 2).ease(d3.easeBack)
//             .attr('r', 10)
//             .attr('cx', d => histXScale(d.Midpoint))
//             .attr('cy', d => histYScale(d.HistCol))
//             .attr('fill', d => categoryColorScale(d.Category))

//     let xAxis = d3.axisBottom(histXScale)
//     svg.append('g')
//         .attr('class', 'hist-axis')
//         .attr('transform', `translate(0, ${height + margin.top + 10})`)
//         .call(xAxis)

//     svg.selectAll('.lab-text')
//         .on('mouseout', )
// }

// function draw8(){
//     clean('none')

//     let svg = d3.select('#vis').select('svg')
//     svg.selectAll('circle')
//         .transition()
//         .attr('r', d => salarySizeScale(d.Median) * 1.6)
//         .attr('fill', d => categoryColorScale(d.Category))

//     simulation 
//         .force('forceX', d3.forceX(500))
//         .force('forceY', d3.forceY(500))
//         .force('collide', d3.forceCollide(d => salarySizeScale(d.Median) * 1.6 + 4))
//         .alpha(0.6).alphaDecay(0.05).restart()
        
// }

// //Array of all the graph functions
// //Will be called from the scroller functionality

// let activationFunctions = [
//     draw1,
//     draw2,
//     draw3,
//     draw4,
//     draw5, 
//     draw6, 
//     draw7,
//     draw8
// ]

// //All the scrolling function
// //Will draw a new graph based on the index provided by the scroll


// let scroll = scroller()
//     .container(d3.select('#graphic'))
// scroll()

// let lastIndex, activeIndex = 0

// scroll.on('active', function(index){
//     d3.selectAll('.step')
//         .transition().duration(500)
//         .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
//     activeIndex = index
//     let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
//     let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
//     scrolledSections.forEach(i => {
//         activationFunctions[i]();
//     })
//     lastIndex = activeIndex;

// })

// scroll.on('progress', function(index, progress){
//     if (index == 2 & progress > 0.7){

//     }
// })