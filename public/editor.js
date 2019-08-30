const sql = require('mssql')
// Configuration for Azure SQL sever
const sqlconfig = {
    server: "ftpubserver.database.windows.net",
    database: "FTPubdb",
    user: "user",
    password: "FTPubdb12",
    port: 1433,
    encrypt: true
}

function addMenuItem (itype,name,price,abv,desc) {
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
        //
        sqlreq.query("insert into food '"+itype+"','"+name+"','"+price+"','"+abv+"','"+desc+"'")
    })
};

function updateMenuItem (itype,name,price,abv,desc) {
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
        //
        sqlreq.query("update food set itype = '"+itype+"', name = '"+name+"', price = '"+price+"', abv = '"+abv+"', description = '"+desc+"' where itype = '"+itype+"', name = '"+name+"'"), function () {
            console.log('OK')
        };
    })
};

function deleteMenuItem (itype,name) {
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
        //
        sqlreq.query("delete from food where itype = '"+itype+"', name = '"+name+"'"), function () {
            console.log('OK')
        };
    })
};