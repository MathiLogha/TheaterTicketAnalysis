var express = require('express');
const app = express();
var mongoose = require('mongoose')

var bodyParser = require('body-parser');
var helmet = require('helmet');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());


mongoose.connect('mongodb://127.0.0.1:27017/movie_ticket')


const theatre_details = mongoose.model('theatre_details',
                                        new mongoose.Schema({
                                          _id: Number,
                                          theatre_name: String,
                                          location: String,
                                          screens: Array
                                        })
)
const movie_details = mongoose.model('movie_details',
                                        new mongoose.Schema({
                                          _id: Number,
                                          movie_name: String,
                                          main_cast: String,
                                          language: Array,
                                          genres: String,
                                          mode: String,
                                          movie_release_date: String
                                        })
)
const ticket_details = mongoose.model('ticket_details',
                                        new mongoose.Schema({
                                          _id: Number,
                                          register_mode: String,
                                          number_of_seats: Number,
                                          total_price: Number,
                                          todays_date: String,
                                          mov_name: String,
                                          theat_name: String,
                                          screennum: Array,
                                          show_time: String
                                        })
)

app.listen(4000, () => {
  console.log("Application started and Listening on port 4000");
});


app.get("/", (req, res) => {
    res.sendFile(__dirname+'/index.html')
});
app.post('/reg', async(req, res) => {
  res.sendFile(__dirname+'/createhtml.html')
})
app.post('/regi', async(req, res) => {
  res.sendFile(__dirname+'/theatre_details.html')
})
app.post('/register', async(req, res) => {
  if (await theatre_details.findOne({ _id:req.body.id })) {   
    return res.send(req.body)
  }
  theatre_details.insertMany({
    _id: req.body.id,
    theatre_name: req.body.theatre_name,
    location: req.body.location,
    screens: req.body.screens
  })
  return res.sendFile(__dirname+'/submit.html')
})
app.post('/regis', async(req, res) => {
  res.sendFile(__dirname+'/movie_details.html')
})

app.post('/register1', async(req, res) => {
  if (await movie_details.findOne({ _id:req.body.movie_id })) {  
    return res.send(req.body)
  }
  
  movie_details.insertMany({
    _id: req.body.movie_id,
    movie_name: req.body.movie_name,
    main_cast: req.body.main_cast,
    language: req.body.language,
    genres: req.body.genres,
    mode: req.body.mode,
    movie_release_date: req.body.movie_release_date,
  })
  return res.sendFile(__dirname+'/submit.html')
})

app.post('/regist', async(req, res) => {
  res.sendFile(__dirname+'/ticket_details.html')
})

app.post('/register2', async(req, res) => {
  if (await ticket_details.findOne({ _id:req.body.ticket_id })) {  
    return res.send(req.body)
  }
  
  ticket_details.insertMany({
    _id: req.body.ticket_id,
    register_mode: req.body.register_mode,
    number_of_seats: req.body.number_of_seats,
    total_price: req.body.total_price,
    todays_date: req.body.todays_date,
    theat_name:req.body.theat_name,
    screennum: req.body.screennum,
    show_time: req.body.show_time
  })
  return res.sendFile(__dirname+'/submit.html')
})