module.exports = function(app, connection){
	app.get('/', function(req, res){
		var sess = req.session;

		res.render('index', {
			title:"Connection Test",
			data:null,
			name:sess.name,
			username:sess.username
		});
	});


	app.get('/json/foodtruck_status', function(req, res){
		connection.query('select * from truck_status', function(err, rows){
			if(err) throw err;
			res.json(rows);		
		});

	});

	app.get('/json/mr-result', function(req, res){
		connection.query('select * from mr', function(err, rows){
			if(err) throw err;
			res.json(rows);
		});
	});

	app.get('/json/mr-result/with-url', function(req, res){
		connection.query('select a.k as \"key\", a.v as \"value\", b.url from mr a, food_img_url b where a.k=b.name', function(err, rows){
			if(err) throw err;
			res.json(rows);
		});
	});

	app.get('/json/available_place', function(req, res){
		connection.query('select * from available_place', function(err, rows){
			if(err) throw err;
			res.json(rows);
		});
	});

};
