    const express = require('express');
    const app = express();
    const mongoose = require('mongoose');
    const config = require('./config');
    const bodyParser = require('body-parser');
    const jwt = require('jsonwebtoken');
    const multer = require('multer')
    const fileType = require('file-type')
    const fs = require('fs')
    var User = require('./User');
    var auth = require('./auth');

    mongoose.connect(config.path);
    app.use(bodyParser.json());



    app.post('/register',(req,res)=>{
        const {name,email,password,confirmPassword} = req.body;
        if(password != confirmPassword){
            res.send("Please Enter Valid Password");
            return ;
        }
        User.create({
        name,email, password,confirmPassword
        },(err,data)=>{
            if(err) 
                {return res.send(err);}
            else
                {return res.send(data);}
        })
    })

    app.post('/login', function(req, res){
        User.findOne({email:req.body.email,password:req.body.password},function(err, data){
            if(err) {
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            }
            if(data) {
                const JWTToken = jwt.sign({
                    email: User.email,
                    _id: User._id  
                },
                'secret',
                    {
                    expiresIn: '2h'
                    });
                    //  return res.status(200).json({
                    //   success: 'Welcome to the JWT Auth',
                    //   token: JWTToken
                    // });

                return  res.header('Token',JWTToken).send("Check Your Token In HEADER");
            }
            res.send("Unauthorized");
            
        });
        });
        


    app.get('/List', (req, res) => {
        User.find({}, function (err, detail) {
            if (err) {
                res.send("error find  detail");
                next();
            }
            res.json(detail);
        })
    })

    const upload = multer({
        dest:'Images/', 
        limits: {fileSize: 10000000, files: 1},
        fileFilter:  (req, file, callback) => {
        
            if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

                return callback(new Error('Only Images are allowed [Jpg or Jpeg]!'), false)
            }
            callback(null,file.originalname);
        }
    }).single('image',3)

    app.post('/Upload',auth, (req, res) => {

        upload(req, res, function (err) {

            if (err) {

                res.status(400).json({message: err.message})

            } else {
                // const JWTToken = req.header('Token');
                // const decoded = jwt.verify(JWTToken, "secret");
                let path = `/images/${req.file.originalname }`
            
                res.status(200).json({message: 'Image Uploaded Successfully !', path: path})
                

            
            }
        }) 
    });

    app.listen(4000, () => {
        console.log(`Server listening on 4000`);
    })