
// create 2 data_set

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 1060 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
  .range([0, width])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
var y = d3.scaleLinear()
  .range([height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")

var urls = ["https://raw.githubusercontent.com/lchang31/HCI-Project-2/main/ben_sex.csv"];
var filename = urls[0];

var dataGender;
d3.csv(filename)
  .row(function (d) { return { state: d.state, male_ben: +d.male_ben, female_ben: +d.female_ben }; })
  .get(function (error, rows) {
    console.log(rows);
    dataGender = rows;// Now you can assign it
    updateBar("male_ben")// Now you can draw it
  });

function updateBar(gender) {

  // Update the X axis
  x.domain(dataGender.map(function (d) { return d.state; }))
  xAxis.call(d3.axisBottom(x))

  // Update the Y axis
  if (gender == "male_ben") {
    y.domain([0, d3.max(dataGender, function (d) { return d.male_ben })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
  } else if (gender == "female_ben") {
    y.domain([0, d3.max(dataGender, function (d) { return d.female_ben })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
  }

  // Create the u variable
  var u = svg.selectAll("rect")
    .data(dataGender)

  if (gender == "male_ben") {
    u
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(u) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr("x", function (d) { return x(d.state); })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      .attr("y", function (d) { return y(d.male_ben); })
      .attr("height", function (d) { return height - y(d.male_ben); })
  } else {
    u
      .enter()
      .append("rect") // Add a new rect for each new elements
      .merge(u) // get the already existing elements as well
      .transition() // and apply changes to all of them
      .duration(1000)
      .attr("x", function (d) { return x(d.state); })
      .attr("width", x.bandwidth())
      .attr("fill", "#69b3a2")
      .attr("y", function (d) { return y(d.female_ben); })
      .attr("height", function (d) { return height - y(d.female_ben); })
  }

  // If less group in the new dataset, I delete the ones not in use anymore
  u
    .exit()
    .remove()
}