
$('#button-refresh').click(function() {
	
	function refreshPage()
	{
		  $.mobile.changePage
		  (
			window.location.href,
			{
			  allowSamePageTransition : true,
			  transition              : 'none',
			  showLoadMsg             : false,
			  reloadPage              : true
			}
		  );
	}

});

$('#action-button').click(function() {

	var city = $("#city").val();
	
	if( $("#showdata").is(':empty') )
	{
		
	}else{
		$( '#showdata').children().remove();
	}
	function date(timestamp)
		{
			//define milliseconds using  time stamp
			var milliseconds = timestamp * 1000;
						
			//create a new date using milliseconds
			var date = new Date(milliseconds);
												
			return date;
		}

	
	//json
	 $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=metric&cnt=5', function(data)
	 {
		
		var html = '';
		html += '<div class="entry1">';
		html += 'City: ' + data.city.name + '<br/>';
		html += 'Longitude: ' + data.city.coord.lon + '<br/>';
		html += 'Latitude: ' + data.city.coord.lat + '<br/><hr>';
		$('#showdata').append(html);
		$.each(data.list, function(key,val){
			var timestamp = val.dt;
			var format = date(timestamp);
			var weather = this.weather;
			 var html = '<div class="entry">';
			 html += 'Date ' + format + '<br/>';
			 html += 'Minimum temperature ' + Math.round(val.temp.min) + '<br/>';
			 html += 'Maximum temperature ' + Math.round(val.temp.max) + '<br/>';
			 
				$.each(weather,function(){
				
					var iconurl ='http://openweathermap.org/img/w/'+this.icon+'.png';
					html += '<img src= "' + iconurl + '"><br/>';
				});
			 
			 html += '</div>';
			 $('#showdata').append(html);
			 
		});
	 });
	 
	 
});
