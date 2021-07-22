const express = require('express');

const app = express();


app.get('/', function(request, response){
    const reject = () => {
        response.setHeader('www-authenticate', 'Basic')
        response.sendStatus(401)
    }

    const authorization = request.headers.authorization

    if(!authorization) {
    return reject()
    }

    const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

    if(! (username === 'saic' && password === 'babyyodansdl')) {
    return reject()
    }
    
    
    response.sendFile(__dirname + '/index.html')
});

app.use(express.static('.'));

const listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port)
});


