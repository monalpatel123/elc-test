/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data = require("./data");
const http = require("http");
const url = require("url");
const { Server } = require("tls");
const hostname = "localhost";
const port = 3035;
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const app = express();
// to avoid CORS issue
app.use(cors());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());

/**
 * Start the Node Server Here...
 *
 * The http.createServer() method creates a new server that listens at the specified port.
 * The requestListener function (function (req, res)) is executed each time the server gets a request.
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */

// function where searching takes place
function searchData(str) {
	// this function returns t an array which contains the elements which satisfies the condition
	// that if the str (input) is substring of given item , we use toLowerCase() to avoid case sensitivity
	return data.filter(
		(item) => item.name.toLowerCase().indexOf(str.toLowerCase()) > -1
	);
}
app.get("/", function (req, res) {
	res.send(`Server running on ${hostname}:${port}`);
});

app.post("/search", function (req, res) {
	const searchStr = req.body.query;
	const result = searchData(searchStr);
	res.send(JSON.stringify({ res: result }));
	res.end();
});

app.listen(port, function (err) {
	console.log("WEB project is started to " + port + " port");
	if (err) {
		console.log(err);
	}
});

console.log(`[Server running on ${hostname}:${port}]`);
