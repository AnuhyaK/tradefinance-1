var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieParser = require('cookie-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
var url= "mongodb://localhost:27017/Bank";


app.use(express.static('public'));
app.use(multer({ dest: '/home/cps/Desktop/nodejs/'}).single('file'));
app.use(cookieParser());

app.get('/login.html', function (req, res) {
		res.sendFile( __dirname + "/" + "login.html" );

		});

app.get('/b.html', function (req, res) {
		res.sendFile( __dirname + "/" +"b.html" );

		});

app.get('/signup.html', function (req, res) {
		res.sendFile( __dirname + "/" +"signup.html" );

		});
app.get('/buybank.html', function (req, res) {
		res.sendFile( __dirname + "/" +"buybank.html" );

		});
app.get('/user.html', function (req, res) {
		res.sendFile( __dirname + "/" +"user.html" );

		});
app.post('/user.html',function(req,res){
		res.redirect("user.html");
		});
app.post('/buybank.html',function(req,res){
		res.redirect("buybank.html");
		});
app.post('/login.html',function(req,res){
		res.redirect("login.html");
		});
app.post('/signup.html',function(req,res){
		res.redirect("signup.html");
		});
app.post('/b.html',function(req,res){
		res.redirect("b.html");
		});

app.post('/uploadsd',urlencodedParser,function(req,res){
				res.cookie('trans',req.body.tid);
                           res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<center><body bgcolor=Lightblue><head><h2>Upload  Shipping Documents</h2> </head></body>');
                                res.write('<br Select a file to upload: <br/><form action = "http://idrbtcps.com:8081/upload" method = "POST"  enctype = "multipart/form-data"> <input type="file" name="file" size="50" /> <br /><input type = "submit" value = "Upload File" /> </form>');
     				res.end();
});
app.post('/sellerstatus', function(req,res){

		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var id = req.cookies.id;
				console.log(id);
				db.collection("User").find({userid:id}).toArray(function(err,result){
				console.log(result[0].username);
				db.collection("mtt").find({seller:result[0].username}).count({},function(err,resl){
						if (err) throw err
						var count = resl;
						console.log(resl);
						if(resl==0)
						{
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.write('<center><body bgcolor=Lightblue><h> There are no transcations you are acting as an seller</h></body>');
						res.write('<br><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
						res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
						res.end();
						}
						else
						{

						db.collection("mtt").find({seller:result[0].username,msgid:"2"}).count({},function(err,r){
								if (err) throw err
								var count = r;
								console.log(r);
								if(r==0)
								{
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><h> There is no transcations to upload shipping documents an seller</h></body>');
								res.write('<br><form action="http://idrbtcps.com:8081/tstatus" method ="POST"><br> <button type="submit">click here to view remaning transactions act as seller</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
								}else
								{

								db.collection("mtt").find({seller:result[0].username,msgid:"2"}).toArray(function(err,resul){
										if (err) throw err;
										res.writeHead(200, { 'Content-Type': 'text/html' });
										res.write('<center><body bgcolor=Lightblue><head> Shipping Documents  needed transactions</head></body>');

										for(var i=0;i<count;i++)
										{
										res.write('<br><h><b>Transaction ID:</b></h>'+resul[i].transid);
										}
										res.write('<br><form action="http://idrbtcps.com:8081/uploadsd" method ="POST"><br>Transaction Id: <input type="text" name="tid"><button type="submit"> click here to upload shipping Documents</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
										res.end();
										});
								}
						});
						}
				});
		});
});
});
app.post('/pstatus', function(req,res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var id = req.cookies.id;
				db.collection("bank").findOne({bankadmin:id},function(err,output){

						if (err) throw err
						db.collection("mtt").find({buyerifsc:output.bankifsc}).count({},function(err,re){
								if (err) throw err
								console.log(id);
								var count = re;
								if(re==0)
								{
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><h2> There are no transactions you  act as Buyer Bank </h2></body>');
								res.write('<br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
								}
								else
								{

								db.collection("mtt").find({buyerifsc:output.bankifsc}).toArray(function(err,resul){
										if (err) throw err
										res.writeHead(200, { 'Content-Type': 'text/html' });
										res.write('<center><body bgcolor=Lightblue><head> <h2>Transactions to send Payment Receipt</h2></head></body>');
								for(var i=0;i<count;i++)
                                                                {
                                                                if(resul[i].msgid == 1)
                                                                { 
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'">Purchase Order</a>');
                                                                }
                                                                else if(resul[i].msgid==2)

                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp');
                                                                }
                                                                else if(resul[i].msgid==3)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp');
                                                                }
                                                                else if(resul[i].msgid==4)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp<a href="/'+resul[i].paymentreceipt+'">PaymentReceipt</a>');
                                                                }
                                                                else
                                                                {

                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp');
                                                                }

										}
										res.write('<form action="http://idrbtcps.com:8081/buyercheckstatus" method="POST"><br><button type="submit" >click here to view the pending payment receipt generation transactions</button>	</form>');
										res.write('<center><br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
										res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');

										res.end();
										});
								}
						});
				});
		});
});

app.post('/uploadpr',urlencodedParser,function(req,res){
				res.cookie('trans',req.body.sid);
                           res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<center><body bgcolor=Lightblue><head>Upload Payment Receipt </head></body>');
                                res.write('<br Select a file to upload: <br/><form action = "http://idrbtcps.com:8081/paymentstatus" method = "POST"  enctype = "multipart/form-data"> <input type="file" name="file" size="50" /> <br /><input type = "submit" value = "Upload File" /> </form>');
     				res.end();
});
app.post('/paymentstatus',urlencodedParser,function(req,res)
                {
   var path =req.file.destination+"/"+req.file.filename;
	var out = __dirname +"/"+req.file.originalname;
  
  fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(out, data, function (err) {
});
});

                var h = parseInt(req.cookies.trans);
		console.log(req.file.filename);
                MongoClient.connect(url, function(err, db) {
                                if (err) throw err;
                                db.collection("mtt").findOne({transid:h},function(err,result){
                                                if (err) throw err;

						console.log(result);
                                                var update={ $set:{msgid:"4" ,from:result.buyer,to:result.seller,paymentreceipt:req.file.originalname} };
                                                db.collection("mtt").update({transid:h},update,function(err,resut){
                                                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                res.write('<center><body bgcolor=Lightblue> payment receipt sent succesfully !......</body>');
                                                                res.write('<center><br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
                                                                res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
                                                                res.end();

                                                                });
                                                });
                                });
                });

app.post('/status', function(req,res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var id = req.cookies.id;
				db.collection("mtt").find({buyer:id}).count({},function(err,re){
						if (err) throw err
						var count = re;
						if(re==0)
						{
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.write('<body bgcolor=Lightblue><center><h2> There are no transcations you are acting as an Buyer</h2></center></body>');
						res.write('<br><center><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form></center>');
						res.write('<br><center><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form></center>');
						res.end();
						}
						else
						{

						db.collection("mtt").find({buyer:id}).toArray(function(err,resul){
						if (err) throw err
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<body bgcolor=Lightblue><center><head><h2> Status of transactions as Buyer</h2></head></center></body>');
								for(var i=0;i<count;i++)
								{
								if(resul[i].msgid == 1)
								{		
								res.write('<br><center><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS:</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'">Purchase Order</a>');
								}
								else if(resul[i].msgid==2)

								{
								res.write('<br><center><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp');
								}
								else if(resul[i].msgid==3)
								{
								res.write('<br><center><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp');
								}
								else if(resul[i].msgid==4)
								{
								res.write('<br><center><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp<a href="/'+resul[i].paymentreceipt+'">PaymentReceipt</a>');
								}
								else
								{
									
								res.write('<br><center><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp');
								}
								}
								res.write('<br><center><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><center><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end()
								});
						}
				});
		});

});
app.get('/:file(*)', function(req, res, next){
  var file = req.params.file
    , path = __dirname + '/' + file;

  res.download(path);
});

app.post('/buybank.html/disapprovelc',function(req,res)
		{
		console.log(req.body.sid);
		var h = parseInt(req.body.ssid);
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				var update ={$set:{msgid:"-1"}};
				db.collection("mtt").update({transid:req.cookies.transid},update,function(err,result){
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><head> Lc Dis Approved Successfully</head></body>');  
								res.write('<center><br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
				
				});
						});
		});


app.post('/buybank.html/approvelc',urlencodedParser,function(req,res)
		{
   var path =req.file.destination+"/"+req.file.filename;
	var out = __dirname +"/"+req.file.originalname;
  
  fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(out, data, function (err) {
});
      });
		
		var h= parseInt(req.cookies.transid);	
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("mtt").findOne({transid:h},function(err,result){
						if (err) throw err;
						

						var update={ $set:{msgid:"2" ,from:result.buyerifsc,to:result.seller,lc:req.file.originalname} };
						db.collection("mtt").update({transid:h},update,function(err,resut){
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue> Lc Aprroved Successfully !......</body>');
								res.write('<center><br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();

								});
						});
				});
		});


app.post('/buyercheckstatus',function(req,res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("bank").findOne({bankadmin:req.cookies.id},function(err,result){
						if (err) throw err;
						var ifsc = result.bankifsc;
						db.collection("mtt").find({buyerifsc:ifsc,msgid:"3"}).count({},function(err,re){
								if (err) throw err
								var count = re;
								if(re==0)
								{
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><h> There are no transcations to generate payment receipt</h></body>');
								res.write('<br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
										res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
								}
								else
								{
								db.collection("mtt").find({buyerifsc:ifsc,msgid:"3"}).toArray(function(err,resul){
  										if (err) throw err;
						
                                                                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                                res.write('<center><body bgcolor=Lightblue><head> Payment receipt generation </head></body>');

                                                                                for(var i=0;i<count;i++)
                                                                                { 
                                                                                res.write('<br><h>transactionid:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp Status:&nbsp&nbsp'+resul[i].msgid);
                                                                                }
                                                                                res.write('<br><form action="http://idrbtcps.com:8081/uploadpr" method ="POST"><br> <input type="text" name="sid"><button type="submit">click here to upload Payment receipt</button></form>');

										res.end();
										});
								}
						});
				});	
		});
});

app.post('/sellercheckstatus',function(req,res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("bank").findOne({bankadmin:req.cookies.id},function(err,result){
						if (err) throw err;
						var ifsc = result.bankifsc;
						db.collection("mtt").find({sellerifsc:ifsc}).count({},function(err,re){
								if (err) throw err
								var count = re;
								if(re==0)
								{
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><h3> There is no transcations you are acting as an Seller bank</h3></body>');
								res.write('<br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
										res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
								}
								else
								{
								db.collection("mtt").find({sellerifsc:ifsc}).toArray(function(err,resul){
										if (err) throw err;
										res.writeHead(200, { 'Content-Type': 'text/html' });
										res.write('<center><body bgcolor=Lightblue><head><h2> Status of transactions as seller bank </h2></head></body>');
						for(var i=0;i<count;i++)
                                                                {
                                                                if(resul[i].msgid == 1)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'">Purchase Order</a>');
                                                                }
                                                                else if(resul[i].msgid==2)

                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp');
                                                                }
                                                                else if(resul[i].msgid==3)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp');
                                                                }
                                                                else if(resul[i].msgid==4)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp<a href ="/'+resul[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+resul[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+resul[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp<a href="/'+resul[i].paymentreceipt+'">PaymentReceipt</a>');
                                                                }
                                                                else
                                                                {

                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp');
                                                                }

								}
										res.write('<br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
										res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');

										res.end();
										});
								}
						});
				});
		});
});

				
app.post('/checklc',function(req,res){
				MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				console.log(req.cookies.id);
				db.collection("bank").findOne({bankadmin:req.cookies.id}, function(err,result){
						if (err) throw err;
						var ifsc = result.bankifsc;	 
						db.collection("mtt").find({msgid:"1",buyerifsc:ifsc}).count({},function(err,re){
								if (err) throw err
								var count = re;
								if(re==0)
								{
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><h2> There are no pending transcations</h2></body>');
								res.write('<br><form action="http://idrbtcps.com:8081/buybank.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.end();
								}
								else
								{
								db.collection("mtt").find({msgid:"1",buyerifsc:ifsc}).toArray(function(err,resul){
										if (err) throw err;
										res.writeHead(200, { 'Content-Type': 'text/html' });
										res.write('<center><body bgcolor=Lightblue><head><h2> Pending approval transactions</h2> </head></body>');

										for(var i=0;i<count;i++)
										{	
										res.write('<br><h>Transaction ID :</h>'+resul[i].transid);
										}
										res.write('<br><form action="http://idrbtcps.com:8081/getdetails" method ="POST"><br>Enter a transaction Id to view purchase details : <input type="text" name="ssid"><br><button type="submit">click here to view</button></form>');
										res.end();
										});
								}
						});
						
				});
		});
});
app.post('/getdetails',urlencodedParser,function(req,res){
		var h = parseInt(req.body.ssid);
		res.cookie('transid', h);
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("mtt").findOne({transid:h},function(err,result){
						if (err) throw err;
				res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<center><body bgcolor=Lightblue><head><h2>Application Details</h2></head></body>');
                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+result.transid);
 
				res.write('<br><h>Buyer</h>:&nbsp&nbsp'+result.buyer);
				res.write('<br><h>Buyer account no</h>:&nbsp&nbsp'+result.buyeraccno);
				res.write('<br><h>Buyer Bank</h>::&nbsp&nbsp'+result.buyerbank);
				res.write('<br><h>Buyer ifsc</h>::&nbsp&nbsp'+result.buyerifsc);
				res.write('<br><h>Seller</h>:&nbsp&nbsp'+result.seller);
				res.write('<br><h>Seller account no</h>:&nbsp&nbsp'+result.selleracno);
				res.write('<br><h>Seller Bank</h>:&nbsp&nbsp'+result.sellerbank);
				res.write('<br><h>Seller ifsc</h>:&nbsp&nbsp'+result.sellerifsc);
				res.write('<br>	<a href="/'+result.purchaseorder+'">Purchase Order</a>&nbsp&nbsp');
				res.write('<br><form action="http://idrbtcps.com:8081/approvelc" method ="POST"><br><button type="submit">Approve lc</button></form>');
				res.write('<br><form action="http://idrbtcps.com:8081/buybank.html/disapprovelc" method ="POST" enctype = "multipart/form-data"><br><button type="submit">DisApprove lc</button></form>');
				res.end();
		});
});
});

	
app.post('/approvelc',urlencodedParser,function(req,res){
                           res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.write('<center><body bgcolor=Lightblue><head>Upload the Lc  </head></body>');
                                res.write('<br Select a file to upload: <br/><form action = "http://idrbtcps.com:8081/buybank.html/approvelc" method = "POST"  enctype = "multipart/form-data"> <input type="file" name="file" size="50" /> <br /><input type = "submit" value = "Upload File" /> </form>');
     				res.end();
});

 
				

app.post('/tstatus',function(req,res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
			console.log("db connected");
db.collection("mtt").find({seller:req.cookies.id,msgid:{$ne:"2"}}).count({},function(err,resul){
								if (err) throw err
								var count = resul;
								console.log(resul);
db.collection("mtt").find({seller:req.cookies.id,msgid:{$ne:"2"}}).toArray(function(err,re){
                                                                if (err) throw err
								console.log(re);
								res.writeHead(200, { 'Content-Type': 'text/html' });
                                                                res.write('<center><body bgcolor=Lightblue><head><h2> Status of transactions as seller</h2></head></body>');
								for(var i=0;i<count;i++)
                                                                {
                                                                if(re[i].msgid == 1)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+re[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+re[i].msgid+'&nbsp&nbsp<a href ="/'+re[i].purchaseorder+'">Purchase Order</a>');
                                                                }
                                                                else if(re[i].msgid==2)

                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+re[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+re[i].msgid+'&nbsp&nbsp<a href ="/'+re[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+re[i].lc+'">Letter of credit</a>&nbsp&nbsp');
                                                                }
                                                                else if(re[i].msgid==3)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+re[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+re[i].msgid+'&nbsp&nbsp<a href ="/'+re[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+re[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+re[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp');
                                                                }
                                                                else if(re[i].msgid==4)
                                                                {
                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+re[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+re[i].msgid+'&nbsp&nbsp<a href ="/'+re[i].purchaseorder+'" >purchaseorder</a>&nbsp&nbsp<a href="/'+re[i].lc+'">Letter of credit</a>&nbsp&nbsp<a href="/'+re[i].shippingdoc+'">shipping Docs</a>&nbsp&nbsp<a href="/'+re[i].paymentreceipt+'">PaymentReceipt</a>');
                                                                }
                                                                else
                                                                {

                                                                res.write('<br><h>Transaction ID:</h>&nbsp&nbsp'+resul[i].transid+'&nbsp&nbsp<h> STATUS :</h> &nbsp&nbsp '+resul[i].msgid+'&nbsp&nbsp');
                                                                }

                                                                }
                                                                res.write('<br><br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();
							});
});
				});
});


app.post('/upload',urlencodedParser,function(req,res){

   var path =req.file.destination+"/"+req.file.filename;
	var out = __dirname +"/"+req.file.originalname;
  
  fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(out, data, function (err) {
});
});
	var h=parseInt(req.cookies.trans);
					console.log(h);
 MongoClient.connect(url, function(err, db) {
                                if (err) throw err;
		db.collection("mtt").findOne({transid:h},function(err,result){
                                if (err) throw err;
				if (result==null)
				{
					console.log("not retrived from data base");
				}
				else
				{	
						var update={ $set:{msgid:"3" ,from:result.sellerifsc,to:result.buyerifsc,shippingdoc:req.file.originalname} };
						db.collection("mtt").update({transid:h},update,function(err,resut){
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue> Shipping Documents sent  Succesfully !......</body>');
								res.write('<br><form action="http://idrbtcps.com:8081/tstatus" method ="POST"><br> <button type="submit">click here to view remaning transactions act as seller</button></form>');
								res.write('<center><br><form action="http://idrbtcps.com:8081/b.html" method ="POST"><br> <button type="submit">click here to goto home page</button></form>');
								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form>');
								res.end();

								});
						}
				}
);
				});
});

app.post('/applylc',function(req,res){
   var path =req.file.destination+"/"+req.file.filename;
	var out = __dirname +"/"+req.file.originalname;
  
  fs.readFile( req.file.path, function (err, data) {
      fs.writeFile(out, data, function (err) {
});
      });
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				console.log('Cookies: ', req.cookies.id);

				db.collection("User").findOne({userid:req.cookies.id},function(err,resl){
						if (err) throw err;
						console.log(resl);

						db.collection("mtt").find().count({},function(err,result){
								if(err) throw err;
								console.log(result);
								var id= result+1;
								
								//		console.log(resl);
								var inse = {transid:id,msgid:"1",from:resl.userid,to:resl.bankifsc,buyer:resl.userid,buyeraccno:resl.bankaccno,buyerbank:resl.bankname,buyerifsc:resl.bankifsc,seller:req.body.sname,sellerbank:req.body.sbank,selleracno:req.body.sacno,sellerifsc:req.body.sifsc,purchaseorder:req.file.originalname,lc:null,shippingdoc:null,lc:null,paymentreceipt:null}; 
								db.collection("mtt").insertOne(inse,function(err,resl){

										res.writeHead(200, { 'Content-Type': 'text/html' });
										res.write('<body bgcolor=Lightblue><center><p> Request For LC is sent succesfully</p></center></body>');
										res.write('<br><center><form action="http://idrbtcps.com:8081/b.html" method ="POST"> <button type="submit">click here to goto home page</button></form></center>');
										res.write('<br><center><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  logout</button></form></center>');
										res.end();
										});
								});
						});
		});
});



app.post('/login',urlencodedParser, function(req, res){
		MongoClient.connect(url, function(err, db) {
				if (err) throw err;
				db.collection("bank").findOne({bankadmin:req.body.userid},function(err,result){

						if (err) throw err;

						if(result==null)
						{
						
						db.collection("User").findOne({userid:req.body.userid},function(err,resul){
								if (err) throw err;

								if(resul==null){
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write('<center><body bgcolor=Lightblue><p> Invalid User Id</p></body>');

								res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  login</button></form>');
								res.end();}
								else
								{
								if((resul.userpassword).localeCompare(req.body.password)==0)
								{

								res.cookie('id', req.body.userid);
								console.log('Cookies: ', req.cookies);

								return res.redirect('b.html');
								}
								else
								{
									res.writeHead(200, { 'Content-Type': 'text/html' });
									res.write('<center><body bgcolor=Lightblue><p> Username or password does not match</p></body>');

									res.write('<br><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">click here to  login</button></form>');
									res.end();
								}
								}
						});
						}
						else
						{
							res.cookie('id', req.body.userid);
							console.log('Cookies: ', req.cookies);
							res.redirect('buybank.html');
						}
				});

		});
});


app.post("/signup",urlencodedParser,function(req,res){
		MongoClient.connect(url, function(err,db){
				if (err) throw err;
				console.log(req.body.userid);
				db.collection("User").findOne({userid:req.body.userid},function(err,result){
						console.log(err);
						if (err) throw err;

						if((result== null))
						{

						var myobj = { userid:req.body.userid,userpassword:req.body.password,username:req.body.username,bankname:req.body.bname,bankaccno:req.body.bacno,bankifsc:req.body.bifsc};
						db.collection("User").insertOne(myobj, function(err, res) {
								});
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.write('<body bgcolor=Lightblue><center><p> You created a account successfully</p></center></body>');
						res.write('<br><center><form action="http://idrbtcps.com:8081/login.html" method ="POST"> <button type="submit">Click here to go to login page<center></button></form></center>');
						res.end();
						}
						else
						{			
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.write('<body bgcolor=Lightblue><center><p> Already user id existed choose another userid</p></center></body>');
						res.write('<br><center><form action="http://idrbtcps.com:8081/signup" method ="POST"> <button type="submit">click here to redirect</button></form></center>');
						res.end();
						}

				});
		});
});





var server = app.listen(8081, function () {
		
		console.log("Example app listening at http://idrbtcps.com:8081")

		});
