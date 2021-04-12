
//HEATMAP 

var margin = {top: 80, right: 25, bottom: 160, left: 120},
    width = 900 - margin.left - margin.right,
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
d3.csv("https://raw.githubusercontent.com/karinanguyen/uyghurs/main/data/heatmap_data2.csv", function(data) {


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
    .style("font-family", "Georgia")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()


    // Build Y scales and axis:
    var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.5);
    svg.append("g")
    .style("font-size", 8)
    .style("font-family", "Georgia")
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    

    // Build color scale
    // var myColor = d3.scaleSequential()
    //  .interpolator( d3.interpolateGreys)
    //  .domain([0, 100])

    var myColor = d3.scaleLinear()
    .range(["#DED7F4", "#4D3B6C"])
    .domain([1,100])

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
    .attr("height", y.bandwidth())
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
// svg.append("text")
//       .attr("x", 20)
//       .attr("y", 10)
//       .attr("text-anchor", "left")
//       .style("font-size", "18px")
//       .text("Counts of 'Uyghurs' mentions from major media sources from countries over the period of 2017-2021");

// Add subtitle to graph
svg.append("text")
      .attr("x", 10)
      .attr("y", -10)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text(" Counts of 'Uyghurs' mentions from major media sources from countries over the period of 2017-2021.");

// svg.append("text")
//       .attr("x", 10)
//       .attr("y", -20)
//       .attr("text-anchor", "left")
//       .style("font-size", "14px")
//       .style("fill", "grey")
//       .style("max-width", 400)
//       .text(" Hey.");