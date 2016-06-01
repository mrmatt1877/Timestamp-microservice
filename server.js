 var express = require("express");
 var app = express();

 var moment = require("moment");
 /* serves main page */
 app.get("/", function(req, res) {
    res.sendFile(__dirname + 'index.html')
 });


app.get('/:query', function(req, res) {
        var date = req.params.query;
		res.setHeader('Content-Type', 'application/json');
		if(!isNaN(parseInt(date))){
			 res.send({"unix": parseInt(date), "natural": moment.unix(date).format("MMMM D, YYYY")});
		} else if (moment(date, "MMMM D, YYYY").isValid()){
			 res.send({"unix":parseInt(moment.unix(moment(date, "MMMM D, YYYY").unix()).format("X")), "natural": date});
		}
		else {
			res.send({"unix":null,"natural":null});
		}
		});
 var port = process.env.PORT || 8080;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });