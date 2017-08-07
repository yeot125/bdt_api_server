module.exports = function(app, connection){
	app.get('/', function(req, res){
		var sess = req.session;

		res.render('index', {
			title:"Root Page",
			data:null,
			name:sess.name,
			username:sess.username
		});
	});

	app.get('/data', function(req, res){
		connection.query('select * from test', function(err, rows){
			var sess = req.session;

			//if(err) throw err;

			res.render('index', {
				title : "Get Data Page",
				data: rows,
				name: sess.name,
				username: sess.username
			});
		});
	});

	app.get('/json/data', function(req, res){
		connection.query('select * from test', function(err, rows){
			//if(err) throw err;
			res.json(rows);
		});
	});

	app.get('/json/place', function(req, res){
		connection.query('select * from place', function(err, rows){
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

};
