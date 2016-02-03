
$('.submit').on('click', function(){
  var name = $('#search').val().trim().toUpperCase()
  for (var i = 0; i < names.length; i++) {
    if(name == names[i].name) return showChart(i)
  }
  showChart()
})

function showChart(index) {
  $('#intro').addClass('hide')
  $('#chart-container').removeClass('hide')

  var isIndex = typeof index == 'number'
  var cut = isIndex ? [Math.max(0, index - 25), Math.min(names.length, index + 25)] : [0, 50]
  var data = {
    labels: names.map(function(n){ return n.name }).slice(cut[0], cut[1]),
    datasets: [
      {
        data: names.map(function(n){ return n.avg }).slice(cut[0], cut[1]),
        fillColor: "rgba(20,20,225,0.8)"
      }
    ]
  }

  if(isIndex) {
    $('.score').text('Your name is #' + (index+1) + ' in terms of campaing funding. You will earn an estimate of $' + names[index].avg.toFixed(2) + ' for your campaign!')
  } else {
    $('.score').html('Your name was not found :( Please <a href="#" onclick="window.location=window.location;">try again</a>.')    
  }
  var $p = $('#chart').parent()
  $('#chart').width($p.width())
  $('#chart').height(500)
  var ctx = $('#chart').get(0).getContext('2d')
  var chart = new Chart(ctx).Bar(data)

  if(!isIndex) return;
  var bars = chart.datasets[0].bars
  for(var i = 0; i < bars.length; i++) {
    if(bars[i].label === names[index].name.toUpperCase()) {
      bars[i].fillColor = 'red';
    }
  }
  chart.update()
}
