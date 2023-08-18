var http = require("http");
var fs = require("fs");
var path = require("path")
const port = 2000;

http.createServer((req, res) => {
    var contentType = 'text/html';
    var filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }
    else if (filePath == './about') {
        filePath = './about.html';
    }
    else if (filePath == './contact') {
        filePath = './contact.html';
    }
    else if (filePath == './project') {
        filePath = './project.html';
    }
    else if (filePath == './service') {
        filePath = './service.html';
    }
    else if (filePath == './team') {
        filePath = './team.html';
    }
    else if (filePath == './testimonial') {
        filePath = './testimonial.html';
    }


    var extname = path.extname(filePath);
    // console.log(extname)

    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
             contentType = 'text/css';
             break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
        case '.json':
            contentType = 'application/json';
            break;      
    }



    fs.readFile(filePath, function (err, data) {
        if (err) {
            fs.readFile("404.html", (error, cont) => {
                error ? console.log(error) : res.end(cont)
            }

            )
        }

        else {
            res.end(data)
        }

    })
})
    .listen(port);