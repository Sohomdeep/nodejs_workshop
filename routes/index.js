//load library
var express = require('express');
var router = express.Router();
var app = express();
var oauthServer = require('express-oauth-server');
var util = require('util');
var bodyParser = require('body-parser');
var config = require('../config/config');
var moment = require('moment');
var models = require('../models');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
//load files

//var member = require('./member.js');
 const api_version = config.api_version
 const api_developer = config.api_developer;

//set global method

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// start method--------------------------------------------------
app.oauth = new oauthServer({
   debug: true,
  model: require('../oauth')
});

router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});



router.post('/oauth/token', app.oauth.token());
// Get secret.
router.post('/secret',app.oauth.authenticate(), function(req, res) {
  // Will require a valid access_token.
  var travelTime = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');
  console.log(travelTime);
  console.log(req.body);
  res.json('Secret area');
});

router.get('/public', function(req, res) {
  // Does not require an access_token.
  res.send('Public area');
});


router.post('/login', app.oauth.authenticate(),function (req, res) {
	
		console.log(config.apis);
		var dataset = {};
		var flag=true;
		if(req.body.user_id){
			
			dataset.user_id=req.body.user_id;
		}else{
			var flag=false;
		}
		console.log(dataset);
		if(flag){
		 	if (!req.body) {return res.status(400)}
		 	else{
					var error_message=''
					var success_message=''
					
					res.status(200)
					res.json({response: 
						{
							error_message:error_message,
							success_message:success_message,
							dataset:dataset,
							publish:{
								version:api_version,
								developer:api_developer
							}

						}
					});
				  }
			}else{
				res.status(400);
				res.json('dfd');
			}
  	//connection.end()
})

// insert with POST method
router.post('/customer', function (req, res) 
{ 
	//console.log(config.apis);
	var dataset = {};
	var flag=true;
	var status_code = '';
	var error_message='';
	var success_message='';

	/*if(req.body.user_id)
	{
		dataset.user_id=req.body.user_id;
	}
	else
	{
		var flag=false;
	}*/


	var flag = true;

	var id 				= req.body.id;
	var status      	= req.body.status;
	/*
    var name      		= req.body.name;
    var address     	= req.body.address;
    var mobile      	= req.body.mobile;
    var email      		= req.body.email;
    console.log(errors);
    if(errors)
    {
    	var flag = false;
    }*/

    if(!req.body.email)
	{
		var error_message = "Email is required";
        var flag          = false;
	}
	
	else
	{
		var email      	= req.body.email;
	}

	if(!req.body.mobile)
	{
		var error_message = "Mobile is required";
        var flag          = false;
	}
	else
	{
		var mobile      	= req.body.mobile;
	}

	if(!req.body.address)
	{
		var error_message = "Address is required";
        var flag          = false;
	}
	else
	{
		var address     	= req.body.address;
	}

	if(!req.body.name)
	{
		var error_message = "Name is required";
        var flag          = false;
	}
	else
	{
		var name      		= req.body.name;
	}

	//Validation with Express validator
	req.checkBody('email', 'Email is invalid').isEmail();
	req.checkBody('mobile', 'Mobile is invalid').len(10, 10).isNumeric();
    var errors = req.validationErrors();

	if(error_message=='')
	{
		if(errors)
		{
	    	console.log(errors);
	    	var error_message = errors[0].msg;  //if more than one message, show only one message at a time
	    	var flag          = false;
		}
	}

	//console.log(dataset);

	if(flag)
	{
		
		if (!req.body) 
	 	{
	 		return res.status(400)
	 	}
	 	else
	 	{	
	 		models.tbl_customers.create({
	 			id 				: id,
			  	name 			: name,
			  	address 		: address,
			  	mobile 			: mobile,
			  	email			: email,
			  	status 			: status
	 		}).then(function(result){ 
	 	
	 			if(result)
	 			{//console.log('hi');
	 				var error_message='';
					var success_message='Registration successful';
					var status_code = 200; 
					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:dataset,
						publish:{
									version:api_version,
									developer:api_developer
								}

					}
					});
	 			}
	 			// else
	 			// {
	 			// 	var error_message='';
					// var success_message='Registration faild';
	 			// 	var status_code = 400;
	 			// } 
	 		})
	 		.catch(function(err){
	  			if(err.name == 'SequelizeUniqueConstraintError')
	  			{
		  			var error_message='Registration faild';
					var success_message='';
					var status_code = 400;
					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:dataset,
						publish:{
									version:api_version,
									developer:api_developer
								}

					}
					});
		  		}
	  		});

				
			
		}
	}
	else
	{
		res.status(400)
		res.json({response: 
		{
			error_message:error_message,
			success_message:success_message,
			dataset:dataset,
			publish:{
						version:api_version,
						developer:api_developer
					}

		}
		})
	}
});


// fetch with POST method 
router.get('/customer', function (req, res) 
{
	//console.log(config.apis);
	var dataset = {};
	var flag=true;
	var status_code = '';
	var error_message='';
	var success_message='';

	/*if(req.body.user_id)
	{
		dataset.user_id=req.body.user_id;
	}
	else
	{
		var flag=false;
	}*/

	var flag = true;
	//console.log(dataset);

	if(flag)
	{
		
		if (!req.body) 
	 	{
	 		return res.status(400)
	 	}
	 	else
	 	{
	 		models.tbl_customers.findAll()
	  		.then(function(cust_data){ 
	 		if(cust_data)
	 		{
	 			var error_message='';
				var success_message='Data fetch successful';
				var status_code = 200;
				res.status(status_code)
				res.json({response: 
				{
					error_message:error_message,
					success_message:success_message,
					dataset:cust_data,
					publish:{
								version:api_version,
								developer:api_developer
							}
				}
				});
	 			} 
	 		})
	 		.catch(function(err){
	  			if(err)
	  			{
		  			var error_message='Data fetch faild';
					var success_message='';
					var status_code = 400;

					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:cust_data,
						publish:{
									version:api_version,
									developer:api_developer
								}
					}
					});
		  		}
	  		});
		}
	}
	else
	{
		res.status(400);
		res.json('faild');
	}

});


//update data with PUT method

router.put('/customer/:id', function (req, res) 
{
	//console.log(config.apis);
	var dataset 			= {};
	var flag 				= true;
	var status_code 		= '';
	var error_message 		='';
	var success_message 	='';
	var id 					= req.params.id;

	/*if(req.body.user_id)
	{
		dataset.user_id=req.body.user_id;
	}
	else
	{
		var flag=false;
	}*/

	var flag = true;

	//console.log("here1");
	if(typeof req.body.email !== 'undefined')    // isset equivalent
	{
		//console.log("here2");
		if(req.body.email=='')
		{
			var error_message = "Email is required";
        	var flag          = false;	
		}
		else(error_message == '')
		{
			req.checkBody('email', 'Email is invalid').isEmail();
			if(!errors)
			{
				var email      	= req.body.email;
			}
		}
		
	}

	if(typeof req.body.mobile !== 'undefined')
	{
		if(req.body.mobile=='')
		{
			var error_message = "Mobile is required";
        	var flag          = false;	
		}
		else(error_message == '')
		{
			req.checkBody('mobile', 'Mobile is invalid').len(10, 10).isNumeric();
			if(!errors)
			{
				var mobile      	= req.body.mobile;
			}
		}
	}

	if(typeof req.body.address !== 'undefined')
	{
		if(req.body.address=='')
		{
			var error_message = "Address is required";
        	var flag          = false;	
		}
		else
		{
			var address      	= req.body.address;
		}
	}

	if(typeof req.body.name !== 'undefined')
	{
		if(req.body.name=='')
		{
			var error_message = "Name is required";
        	var flag          = false;	
		}
		else
		{
			var name      	= req.body.name;
		}
	}

	var errors = req.validationErrors();

	if(error_message=='')
	{
		if(errors)
		{
	    	console.log(errors);
	    	var error_message = errors[0].msg;
	    	var flag          = false;
		}
	}
	
	//console.log(flag);
	//console.log(req.body);
	if(flag)
	{
		if (!req.body) 
	 	{
	 		return res.status(400)
	 	}
	 	else
	 	{
	 		
  			//var name      		= req.body.name;
  			//var address     		= req.body.address;
  			//var mobile      		= req.body.mobile;
  			//var email      		= req.body.email;
  			
	 		models.tbl_customers.update({
			  	name 			: name,
			  	address 		: address,
			  	mobile 			: mobile,
			  	email			: email
	 		},
	 		{
				where		: { id: id},
  				returning	: true,
  				plain		: true
			}
	 		).then(function(result){
	 			if(result[1] == 1)
	 			{
	 				var error_message='';
					var success_message='Update successful';
					var status_code = 200; 
					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:dataset,
						publish:{
									version:api_version,
									developer:api_developer
								}
					}
					});
	 			}
	 			// else
	 			// {
	 			// 	var error_message='';
					// var success_message='update faild';
	 			// 	var status_code = 400;
	 			// } 
	 		})
	 		.catch(function(err){
	  			if(err.name == 'SequelizeUniqueConstraintError')
	  			{
		  			var error_message='Update faild';
					var success_message='';
					var status_code = 400;
					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:dataset,
						publish:{
									version:api_version,
									developer:api_developer
								}

					}
					});
		  		}
	  		});
		}
	}
	else
	{
		res.status(400)
		res.json({response: 
		{
			error_message:error_message,
			success_message:success_message,
			dataset:dataset,
			publish:{
						version:api_version,
						developer:api_developer
					}

		}
		})
	}
});

var multer  = require('multer');
var storage = multer.diskStorage(
{
  destination: function (req, file, cb) 
  {
      cb(null, './public/images/');           //image upload path
  },

  filename: function (req, file, cb) 
  {
    if(!file.originalname.match(/\.(jpeg|jpg|png|wav)$/))
    {
      var err 		= new error();
      err.code 		= 'filetype';
      return cb(err) ;
    }
    else
    { 
  
    // create dynamic file name 

	  /* ===single file rename start ==== */
	  /*var id 				= req.params.id;
      var file_type 		= file.originalname;
      console.log(file.length);
      var name_arr 			= file_type.split(".");
      var len 				= name_arr.length;
      var ext_index 		= len - 1;
      var file_name 		= id + '.' + name_arr[ext_index];
      cb (null,file_name);*/
      /* ===single file rename end ==== */

      cb (null,file.originalname);
    }    
  }
});
 
//=======for single file upload==========

var upload = multer(
{ 
  storage: storage ,
  limits :{fieldSize :40000000 }
}).single('profile_pic');    //<<<<<-------this is the file key

router.post('/customer/main_image/:id', function (req, res) 
{
	var id 				= req.params.id;
  	if(id!='')
  	{
  		upload(req, res, function (err) 
	  {
	    if (err) 
	    {
	      if(err.code === 'LIMIT_FILE_SIZE')
	      {
	        //res.json({success:false,message:'file size is to large'});
	        var status_code = 400;
	        var error_message= 'file size is to large';

	      }
	      else if(err.code === 'filetype')
	      {
	        //res.json({success:false,message:'file type is invalid'});
	        var status_code = 400;
	        var error_message= 'file type is invalid';
	      }  
	      else
	      {
	        console.log(err);
	       // res.json({success:false,message:'file was unable to upload'});
	        var status_code = 400;
	        var error_message= 'file was unable to upload';
	      }


	    	var success_message='';
			res.status(status_code)
			res.json({response: 
			{
				error_message:error_message,
				success_message:success_message,
				dataset:'',
				publish:{
							version:api_version,
							developer:api_developer
						}
			}
			});  
	      // An error occurred when uploading
	    }
	    else
	    { console.log(req.file);
	      if(!req.file)
	      { 
	        //res.json({success:false,message:'no file has been selected'});
	        var error_message='no file has been selected';
			var success_message='';
			var status_code = 400;
			res.status(status_code)
			res.json({response: 
			{
				error_message:error_message,
				success_message:success_message,
				dataset:'',
				publish:{
							version:api_version,
							developer:api_developer
						}
			}
			});
	      }
	      else
	      {
	        var name = req.file.originalname ;
	         

	        models.tbl_customers.update({
				  	//image 			: id + '.jpg',        //for rename pic
				  	image 			: req.file.filename,
				  	has_image 		: 1
		 		},
		 		{
					where		: { id: id},
	  				returning	: true,
	  				plain		: true
				}
		 		).then(function(cust_data){ 
			 		if(cust_data)
			 		{
			 			var error_message='';
						var success_message='Image succesfully uploded';
						var status_code = 200;
						res.status(status_code)
						res.json({response: 
						{
							error_message:error_message,
							success_message:success_message,
							dataset:'',
							publish:{
										version:api_version,
										developer:api_developer
									}
						}
						});
			 		} 
		 		})
	       // res.json({success:true,message:'file was uploaded!'+name});
	      }   
	    }
	    // Everything went fine
	  });
  	}
});

//=======for multiple file upload ========== 
var uploadd = multer(
{ 
  storage: storage ,
  limits :{fieldSize :90000000 }
}).array('others_pic',5);    //this is the file key , max no. of file


router.post('/customer/others_images/:id',function (req, res) 
{
	var id 				= req.params.id;
  	if(id!='')
  	{
	  uploadd(req, res, function (err) 
	  {
	    if (err) 
	    {
	      if(err.code === 'LIMIT_FILE_SIZE')
	      {
	        //res.json({success:false,message:'file size is to large'});
	        var status_code = 400;
	        var error_message= 'file size is to large';
	      }
	      else if(err.code === 'filetype')
	      {
	        //res.json({success:false,message:'file type is invalid'});
	        var status_code = 400;
	        var error_message= 'file type is invalid';
	      }  
	      else
	      {
	        console.log(err);
	        //res.json({success:false,message:'file was unable to upload'});
	        var status_code = 400;
	        var error_message= 'file was unable to upload';
	      }

	      var success_message='';
			res.status(status_code)
			res.json({response: 
			{
				error_message:error_message,
				success_message:success_message,
				dataset:'',
				publish:{
							version:api_version,
							developer:api_developer
						}
			}
			});  
	      // An error occurred when uploading 
	    }
	    else
	    {
	      if(Object.keys(req.files).length<1)
	      {
	        //res.json({success:false,message:'no file has been selected'});
	        var error_message='no file has been selected';
			var success_message='';
			var status_code = 400;
			res.status(status_code)
			res.json({response: 
			{
				error_message:error_message,
				success_message:success_message,
				dataset:'',
				publish:{
							version:api_version,
							developer:api_developer
						}
			}
			});
	      }
	      else
	      { 
	        var sz = Object.keys(req.files).length

	        var file_name = '';
	        var name = '';
	        for(var i=0;i<sz;i++)
	        {
	          name += req.files[i].filename+',';
	        }
	        console.log(name);

	        //res.json({success:true,message:'file was uploaded!'});

	      	//var name = req.files.filename ;
	        models.tbl_images.create({
				  	name 			: name,
				  	status 			: 1,
				  	tblCustomerId 	: id
		 		}
		 		).then(function(cust_data){ 
			 		if(cust_data)
			 		{
			 			var error_message='';
						var success_message='Image succesfully uploded';
						var status_code = 200;
						res.status(status_code)
						res.json({response: 
						{
							error_message:error_message,
							success_message:success_message,
							dataset:'',
							publish:{
										version:api_version,
										developer:api_developer
									}
						}
						});
			 		} 
		 		})
	       // res.json({success:true,message:'file was uploaded!'+name});
	      }   
	    }
	    // Everything went fine
	  });
	}
});


/**======================association===================*/

//=====find all user,post,comment=====

router.get('/users', (req, res) => {  
    models.tbl_users.findAll({
      include: [
        {
          model: models.tbl_posts,
          include: [
            {
              model: models.tbl_comments
            }
          ]
        }
      ]
    }).then(function(data) {
			//res.send(data);
			var error_message='';
			var success_message='Data fetch successful';
			var status_code = 200;
			res.status(status_code)
			res.json({response: 
			{
				error_message:error_message,
				success_message:success_message,
				dataset:data,
				publish:{
							version:api_version,
							developer:api_developer
						}
			}
			});
    	})
    	.catch(function(err){
	  			if(err)
	  			{
		  			var error_message='Data fetch faild';
					var success_message='';
					var status_code = 400;

					res.status(status_code)
					res.json({response: 
					{
						error_message:error_message,
						success_message:success_message,
						dataset:cust_data,
						publish:{
									version:api_version,
									developer:api_developer
								}
					}
					});
		  		}
	  		});
    });


/*router.query("select * from tbl_customers").spread((results, metadata) => {
  // Results will be an empty array and metadata will contain the number of affected rows.
  console.log(results);
})*/

router.get('/rawq', (req, res) => {  
    models.sequelize.query("select * from tbl_customers where id = 1").then((results, metadata) => {
    	console.log(results);
    })
    });

//=====find all user,post=====

router.get('/users1', (req, res) => {  
    models.tbl_users.findAll({
      include: [
        {
          model: models.tbl_posts,
        }
      ]
    }).then(function(data) {

    		res.send(data);
    	});
    });


//=====find all post,comment=====

router.get('/post', (req, res) => {  
    models.tbl_posts.findAll({
      include: [
        {
          model: models.tbl_comments,
        }
      ]
    }).then(function(data) {

    		res.send(data);
    	});
    });

// =====show post & comments of a user with id (fetch some fields) and where condition=====

router.get('/post1', (req, res) => {  
    models.tbl_posts.findAll({
      		attributes: ['content', 'created_at'],
      		where: {tbl_user_id: 2},
    		
      include: [
        { 
          attributes: ['content', 'created_at','commenter_username','commenter_email'],
          model: models.tbl_comments,
          
        }
      ]
    }).then(function(data) {

    		res.send(data);
    	});
    });


 // =====show username,post & comments of a user id (fetch some fields) with some where conditions=====
router.get('/user2', (req, res) => {  
    models.tbl_users.findAll({
    	attributes: ['username', 'role'],
    	where: {id: 2},
      include: [
        {
          attributes: ['content', 'created_at'],
          model: models.tbl_posts,
          include: [
            {
            	attributes: ['content', 'created_at','commenter_username','commenter_email'],
            	where: {status: 'approved'},
              model: models.tbl_comments
            }
          ]
        }
      ]
    }).then(function(data) {

    		res.send(data);
    	});
    });

// =====inner join=====
 router.get('/innerjoin', (req, res) => {  
    models.tbl_users.findAll({
      include: [
        {
        	attributes:[],                 //not select any attribute from tbl_posts
          	model: models.tbl_posts,
          	required: true
        }
      ]
    }).then(function(data) {

    		res.send(data);
    	});
    });

 // =====left join=====
 router.get('/leftjoin', (req, res) => {  
    models.tbl_users.findAll({
    	attributes : ['id',['username','creator']],            // attribuate alias
      include: [
        {
        	attributes : ['content','created_at'],
          	model: models.tbl_posts,
          	
          	//required: true
        }
      ]
      	
    }).then(function(data) {

    		res.send(data);
    	});
    });


var md5 = require('md5');

router.post('/justtest', function (req, res) {
	console.log(md5("Hello"));
  res.send('Hello World!')
});

var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();
var fs = require('fs');


// emitter.on('print_content',function(data){
//       console.log("Printing content of file....nn");
//       console.log(data);
//       emitter.emit('done');

// });

// emitter.on('error',function(type){

//       console.log("Faced error while "+type);
//       emitter.emit('done');

// });

// emitter.on('done',function(){

//       console.log("Ok its done !");

// });

module.exports = router;


