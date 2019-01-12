$(document).ready(function(){

	$('#searchForm').on('submit', function(e){
		e.preventDefault();
		var str = document.getElementById('inp').value;
		var str2 = $('#inp2').val();
		var final = str.split(' ').join('+');

		$.ajax({
			type: 'POST',
			url: 'http://ws.audioscrobbler.com/2.0/',
			data: 'method=album.getinfo&' + 'api_key=4d53f4315e689c759c23ee667393383f&artist=counterparts&album=prophets&format=json',
			dataType: 'jsonp',
			success: function(data){
				console.log('.getInfo(): ');
				console.log(data);
			},
			error: function(code, msg){
				console.log('.getInfo(): ERROR');
			}
		});

		$.ajax({
			type: 'GET',
			url: 'http://ws.audioscrobbler.com/2.0/',
			data: 'method=album.search&' +
			'album='+final+'&' +
			'api_key=4d53f4315e689c759c23ee667393383f&' +
			'format=json',
			dataType: 'jsonp',
			success: function(data){
				console.log(data);
				var bool = false;

				for(var i = 0; i < data.results.albummatches.album.length; i++){
					if(data.results.albummatches.album[i].artist.toLowerCase() == str2.toLowerCase()){
						$('#artist').html(data.results.albummatches.album[i].artist);
						$('#album').html(data.results.albummatches.album[i].name);
						$('#img').html('<img class="img-fluid" src="'+data.results.albummatches.album[i].image[3]['#text']+'"/>');
						bool = true;
						break;
					}
				}


				/*data.results.albummatches.album.forEach(function(item){
					if(item.artist.toLowerCase() == str2.toLowerCase()){
						$('#artist').html(item.artist);
						$('#album').html(item.name);
						$('#img').html('<img src="'+item.image[3]['#text']+'"/>');
						console.log(item.name);
						bool = true;
						return false;
					}
				});*/

				if(!bool){
					$('#artist').html('The album could not be found');
				}

				$('#box').css('display', 'block');

			},
			error: function(code, msg){
				console.log(code);
				$('#artist').html('ERROR code: ' + code + ', ERROR msg: ' + msg);
			}
		});
	});
});

