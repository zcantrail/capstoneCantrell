const sql = require('mssql')
const express = require('express')
const app = express()

//set template engine, and the public folder for css, font, and images
app.set('view engine', 'pug')
app.use(express.static(__dirname + '/public'))

// Configuration for Azure SQL sever
const sqlconfig = {
    server: "ftpubserver.database.windows.net",
    database: "FTPubdb",
    user: "user",
    password: "FTPubdb12",
    port: 1433,
    encrypt: true
}

//home page route
app.get('/', (req, res) => {
    //set up connection variables for the sql query
    var conn = new sql.ConnectionPool(sqlconfig);
    var sqlreq = new sql.Request(conn);

    //initiate the connection
    conn.connect(function (err) {
        //throw an error if the page cannot connect to the server
        if (err) {
            console.log(err);
            return;
        }
        // connection good. Run sql query to get the events and specials from the table using the database view, and store the results in *results*
        sqlreq.query("select * from eventsSpecials", function (err, results) {
            if (err) {
                console.log(err);
            } else {
                //render index.pug from the views folder, and pass the results as a json variable *homeText*
                res.render('index', {
                    homeText: results.recordset
                })
            }
            //close connection to server
            conn.close();
        });
    });
});
// Tap list page route
app.get('/tapList', (req, res) => {
    //set up connection variables for the sql query
    var conn = new sql.ConnectionPool(sqlconfig);
    var sqlreq = new sql.Request(conn);

    //initiate the connection
    conn.connect(function (err) {
        if (err) {
            //throw an error if the page cannot connect to the server
            console.log(err);
            return;
        }
        // connection good. Run sql query to get the beers on tap from the table using the database view, and store the results in *taplist*
        sqlreq.query("select * from tapListView", function (err, taplist) {
            if (err) {
                console.log(err);
            } else {
                //render taplist.pug from the views folder, and pass the results as a json variable *taplist*
                res.render('taplist', {
                    tapList: taplist.recordset
                })
            }
            //close connection to server
            conn.close();
        });
    });
});
// Lunch menu page route
app.get('/lunchM', (req, res) => {
    //set up connection variables for the sql query
    var conn = new sql.ConnectionPool(sqlconfig);
    var sqlreq = new sql.Request(conn);

    //initiate the connection
    conn.connect(function (err) {
        if (err) {
            //throw an error if the page cannot connect to the server
            console.log(err);
            return;
        }
        // connection good. Run sql query to get the lunch menu items from the table using the database view, and store the results in *lunch*
        sqlreq.query("select * from lunchMenu", function (err, lunch) {
            if (err) {
                console.log(err);
            } else {
                //render lunchMenu.pug from the views folder, and pass the results as a json variable *lunch*
                res.render('lunchMenu',{
                    lunch: lunch.recordset
                  })
            }
            //close connection to server
            conn.close();
        });
    });
});
// Dinner menu page route
app.get('/dinnerM', (req, res) => {
    //set up connection variables for the sql query
    var conn = new sql.ConnectionPool(sqlconfig);
    var sqlreq = new sql.Request(conn);

    //initiate the connection
    conn.connect(function (err) {
        if (err) {
            //throw an error if the page cannot connect to the server
            console.log(err);
            return;
        }
        // connection good. Run sql query to get the dinner menu items from the table using the database view, and store the results in *results*
        sqlreq.query('select * from dinnerMenu', function (err, results) {
            if (err) {
                console.log(err);
            } else {
                //render dinnerMenu.pug from the views folder, and pass the results as a json variable *dinner*
                res.render('dinnerMenu',{
                    dinner: results.recordset
                  })
            }
            //close connection to server
            conn.close();
        });
    });
});
// Contact page router
app.get('/contact', (req, res) => {
    res.render('contact')
});
// editor page route
app.get('/editor', (req, res) => {
    //set up connection variables for the sql query
    var conn = new sql.ConnectionPool(sqlconfig);
    var sqlreq = new sql.Request(conn);

    //initiate the connection
    conn.connect(function (err) {
        if (err) {
            //throw an error if the page cannot connect to the server
            console.log(err);
            return;
        }
        // connection good. Run sql query to get the dinner menu items from the table using the database view, and store the results in *results*
        sqlreq.query('select * from food', function (err, results) {
            if (err) {
                console.log(err);
            } else {
                //render dinnerMenu.pug from the views folder, and pass the results as a json variable *dinner*
                res.render('editor',{
                    allfood: results.recordset
                  })
            }
            //close connection to server
            conn.close();
        });
    });
});
// Contact page router
app.get('/contact', (req, res) => {
    res.render('contact')
});

//the port where the page is hosted(running 'node index' from terminal while in the /CapstoneProject-ZacCantrell directory will host the site at localhost:7000)
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });