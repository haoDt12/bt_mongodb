const express = require('express');
const app = express();
const port = 3000

const expressHbs = require('express-handlebars');

const mongoose = require('mongoose');
const LabModel = require('./labModel');
const uri = 'mongodb+srv://haodtph27524:AgV4IfwmFln1Z0PG@atlascluster.ip5xlax.mongodb.net/cp17301?retryWrites=true&w=majority'


const labModel = require('./labModel');

app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'page2'
}))
app.set('view engine', '.hbs');
app.set('views', './express-Hbs/views');

app.get('/lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi db thanh cong'));

  try {
    const labs = await labModel.find({ tailieu: 0 });

    // labModel.updateMany();
    // labModel.updateOne({ten: 'Lab 3'}, {ten: 'Lab 3 - 2023'})
    await labModel.updateOne({ tieude: 'Win3' }, { tieude: 'Win4' });
    // labModel.deleteMany({ten: 'Lab 4'}); 
    await labModel.deleteOne({tieude: 'tieude-2025'});

    console.log(labs.toString());
    res.send(labs);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})
app.get('/add_lab', async (req, res) => {
  await mongoose.connect(uri).then(console.log('Ket noi DB thanh cong!'));

  let lab = new labModel({
    tieude: 'lab 7',
    noidung: 'phothamcamdb',
    url: 'linktailieu.com'
    //tailieu: 2
  });

  //lab.tailieu = 2;


  try {
    let kq = await lab.save();

    console.log(kq);

    let labs = await labModel.find();
    res.send(labs);

  } catch (err) {
    console.log(err);
  }

  // lab.tieude = "The lose";
  // await lab.save();
  // console.log(lab);
});



app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    //showContentMaytinh: false,

    helpers: {
      foo() { return 'foo. CP17305 - server Android'; }
    }
  });
});


app.listen(port, () => {
  console.log('vô');
})