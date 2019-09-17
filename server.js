const express = require('express');
var bodyParser = require('body-parser');

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.json({'lala':'Hello World!'})
  }
)

app.get('/file/:name', (req, res) => {
  const options = {
    root: __dirname + '/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };
  const filename = req.params.name;
  res.status(200).sendFile(filename, options)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))