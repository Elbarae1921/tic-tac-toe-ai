const http = require('http');
const fs = require('fs');
const path = require('path');

const reqHandler = (req, res) => {
    const url = req.url;
    if(url === "/") {
        const filepath = path.join(__dirname, "public", "index.html");
        fs.readFile(filepath, (err, data) => {
            if(err) {
                res.writeHead(500);
                return res.end("Internal Error.");
            }
            res.writeHead(200);
            res.end(data);
        });
    }
    else {
        const filepath = path.join(__dirname, "public"+url);
        fs.readFile(filepath, (err, data) => {
            if(err) {
                res.writeHead(404);
                return res.end("Not Found.");
            }
            res.writeHead(200);
            res.end(data);
        });
    }
}

const server = http.createServer(reqHandler);

server.listen(5000, () => console.log("listening on http://localhost:5000"));