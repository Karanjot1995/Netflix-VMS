
var express = require('express')
var app = express()
const path = require('path');
const util = require('util');
const cors = require("cors");
const mysql = require('mysql');
const PORT = process.env.PORT || 8000;
var router = express.Router();
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", require("./routes"));

// let config = {
//     host     : 'netflix-vms.cjnhrlike9ax.us-east-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'karan1195',
//     port     : '3306',
//     database:'VMS'
// };

let config = {
    host     : 'remotemysql.com',
    user     : '6Yp3q3zcNd',
    password : 'enc1taaYIV',
    database:'6Yp3q3zcNd',
    port:'3306'
};

let connection;


// const connection = mysql.createPool({
//     host     : 'remotemysql.com',
//     user     : '6Yp3q3zcNd',
//     password : 'enc1taaYIV',
//     database:'6Yp3q3zcNd',
//     port:'3306'
// });

// connection.query(
//   "Select * from F21_S001_16_Customer",
//   (err, result) => {
//     err ? console.log(err) : console.log(result);
//   }
// );





// var connection = mysql.createConnection({
//     host     : 'netflix-vms.cjnhrlike9ax.us-east-2.rds.amazonaws.com',
//     user     : 'admin',
//     password : 'karan1195',
//     port     : '3306',
//     database : 'VMS',
// });
// var query = connection.query(  "DELETE FROM F21_S001_16_Customer where DOB = '0000-00-00'", function(err, result) {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(result)
//     }
// });


// function conn (){
//     let connection = mysql.createConnection(config);
//     connection.connect();
//     let query = util.promisify(connection.query).bind(connection);
// }
// function connEnd(){
//     connection.end();                
//     connection = null;
//     query = null;
// }



app.get('/api/all-content', async (req, res) => {
    let data = {content:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        console.log(connection)
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let result = await query(
            `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating,  CG.Genre
            from F21_S001_16_Content C JOIN (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG ON C.ContentId = CG.ContentID`
        )
        data.content = result;
        if(result.length){
            let c = result
            for(let i = 0;i<c.length;i++){
                let g = c[i]['Genre']
                g = g.split(',')
                c[i]['Genre'] = g
            }
        }
  
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)
})


app.get('/api/all-movies', async (req, res) => {
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let content = await query(
            `select C.ContentID, C.ContentName, C.AverageRating, C.ImageData, CG.Genre
            from F21_S001_16_Content C JOIN F21_S001_16_ContentGenre CG ON C.ContentId = CG.ContentID`
        )

        // let topRated = await query(
        //     `select ContentID, ContentName , 
        //         (select ContentType
        //         from F21_S001_16_ContentLocation CL
        //         where C.ContentID = CL.ContentID) as contentType
        //     from F21_S001_16_Content C
        //     where ContentID in (
        //         select ContentID
        //         from F21_S001_16_Watches
        //         group by ContentID
        //         order by count(ContentID) desc
        //         )
        //     limit 5`
        // )
        data = {content}
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();           
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)

})

app.post('/api/popular', async (req, res) => {
    let data = {mostViewed:[]}
    let q = req.body.type
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let mostViewed = []

        if(q?.length){
            mostViewed = await query(
                `select W.views, C.ContentID, C.ContentName, C.ImageData, CG.Genre, CL.contentType
                from F21_S001_16_Content C, F21_S001_16_ContentLocation CL, (
                        select ContentId, GROUP_CONCAT(Genre) as Genre
                        from F21_S001_16_ContentGenre
                        group by ContentID
                    ) CG, (select ContentID , count(CustomerID) as views
                    from F21_S001_16_Watches
                    group by ContentID
                    ) W
                where C.ContentId = CG.ContentID and CL.ContentID = C.ContentID 
                and CL.ContentType = '${q}' and C.ContentID = W.ContentID
                order by W.views desc
                limit 10`
            )
        }else{
            mostViewed = await query(
                `select C.ContentID, C.ContentName, C.ImageData, CG.Genre, CL.contentType, W.views
                from (select ContentID , count(CustomerID) as views
                    from F21_S001_16_Watches
                    group by ContentID
                    ) W, F21_S001_16_Content C, F21_S001_16_ContentLocation CL, (
                        select ContentId, GROUP_CONCAT(Genre) as Genre
                        from F21_S001_16_ContentGenre
                        group by ContentID
                    ) CG
                where C.ContentID = W.ContentID and C.ContentId = CG.ContentID 
                and CL.ContentID = C.ContentID
                order by W.views desc
                limit 20`
            )
        }

        data = {mostViewed}
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();           
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/best-rated', async (req, res) => {
    let data = {bestRated:null}
    data.rating = Number(req.body.rating)
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let bestRated = await query(
            `select C.ContentID, C.ContentName, C.ImageData, CG.Genre,
                (select avg(Rating)
                from F21_S001_16_RatingReview RR
                group by RR.ContentID
                having C.contentID = RR.ContentID
                )as avgRating,
                (select count(Rating)
                from F21_S001_16_RatingReview RR
                group by RR.ContentID
                having C.contentID = RR.ContentID
                )as ratingCount
            from F21_S001_16_Content C JOIN (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG ON C.ContentId = CG.ContentID
            where C.contentID in (
                select contentID
                from F21_S001_16_RatingReview R2
                where C.contentID = R2.contentID
                group by R2.contentID
                having avg(Rating) >= ${req.body.rating}
            )
            order by avgRating asc`
        )
        data.bestRated = bestRated
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
    
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
      
})


app.get('/api/shows', async (req, res) => {
    let data = {shows:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let shows = await query(
            `select C.ContentID, C.ContentName, C.ImageData, C.Date_of_Release, C.AverageRating, CG.Genre, CL.ContentType
            from F21_S001_16_Content C, (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG , F21_S001_16_ContentLocation CL
            where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID and CL.ContentType = 'TV'`
        )

        // let bestRated = await query()

        if(shows.length){
            let c = shows
            for(let i = 0;i<c.length;i++){
                let g = c[i]['Genre']
                g = g.split(',')
                c[i]['Genre'] = g
            }
        }

        data.shows = shows
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
    
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.get('/api/movies', async (req, res) => {
    let data = {movies:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        // let movies = await query(
        //     `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, CG.Genre, CL.ContentType
        //     from F21_S001_16_Content C, F21_S001_16_ContentGenre CG , F21_S001_16_ContentLocation CL
        //     where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID and CL.ContentType = 'Movie'
        //     `
        // )
        // let common = await query(
        //     `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, CL.ContentType
        //     from F21_S001_16_Content C , F21_S001_16_ContentLocation CL
        //     where C.ContentID = CL.ContentID and CL.ContentType = 'Movie'
        //     order by C.AverageRating desc`
        // )

        let movies = await query(
            `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, C.Date_of_Release, CG.Genre, CL.ContentType
            from F21_S001_16_Content C, (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG , F21_S001_16_ContentLocation CL
            where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID and CL.ContentType = 'Movie'`
        )

        if(movies.length){
            let c = movies
            for(let i = 0;i<c.length;i++){
                let g = c[i]['Genre']
                g = g.split(',')
                c[i]['Genre'] = g
            }
        }

        data.movies = movies
        // data.common = common
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
    
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.post('/api/new-releases', async (req, res) => {
    let q = req.body.query
    let data = {content:[]}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let content = []

        if(q.length){
            content = await query(
                `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, C.Date_of_Release ,CG.Genre, CL.ContentType
                from F21_S001_16_Content C, (
                    select ContentId, GROUP_CONCAT(Genre) as Genre
                    from F21_S001_16_ContentGenre
                    group by ContentId
                ) CG , F21_S001_16_ContentLocation CL
                where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID and CL.ContentType = "${q}"
                order by C.Date_of_Release desc
                limit 10`
            )
        }else{
            content = await query(
                `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, C.Date_of_Release ,CG.Genre, CL.ContentType
                from F21_S001_16_Content C, (
                    select ContentId, GROUP_CONCAT(Genre) as Genre
                    from F21_S001_16_ContentGenre
                    group by ContentId
                ) CG , F21_S001_16_ContentLocation CL
                where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
                order by C.Date_of_Release desc
                limit 10`
            )   
        }
        data.content = content;
  
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)
})

app.post('/api/search', async (req, res) => {
    let q = req.body.query
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        if(q.length){
            let result = await query(
                `select C.ContentID, C.ContentName, C.ImageData, C.AverageRating, CG.Genre
                from F21_S001_16_Content C JOIN (
                    select ContentId, GROUP_CONCAT(Genre) as Genre
                    from F21_S001_16_ContentGenre
                    group by ContentId
                ) CG ON C.ContentId = CG.ContentID
                where lower(C.ContentName) like '%${q}%'
                limit 20`
            )
            data = result;
        }
  
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
                console.error(err);
            }
        }
    }
    res.send(data)
})




app.post('/api/content/:id', async (req, res) => {
    let data = {}
    try {
        // conn();
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let result = await query(
            `select * from F21_S001_16_Content
            where ContentID = ${req.params.id}`
        )  
        data = result

    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/user-list', async (req, res) => {
    let data = {userContent:[]}
    let userID = req.body.userid
    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let userContent = await query(
            `select U.CustomerID, C.ContentID, C.ContentName, C.ImageData, C.Date_of_Release, C.AverageRating, CG.Genre, CL.ContentType
            from F21_S001_16_Content C, (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
            where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
            and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        )

        // if(shows.length){
        //     let c = shows
        //     for(let i = 0;i<c.length;i++){
        //         let g = c[i]['Genre']
        //         g = g.split(',')
        //         c[i]['Genre'] = g
        //     }
        // }

        data.userContent = userContent
        // having avg(Rating) between (${req.body.maxRating},${req.body.minRating})
    
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})


app.post('/api/add-to-list', async (req, res) => {
    let data = {userContent:[],updatedContent:[]}
    let userID = req.body.userid
    let cid = req.body.contentID
    var todayDate = new Date().toISOString().slice(0,10);

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let userContent = await query(
            `INSERT INTO F21_S001_16_Watches (ContentID, CustomerID, WatchingDate, WatchingTime) VALUES (${cid},${userID},'${todayDate}','00:15')`
        )
        let updatedContent = await query(
            `select U.CustomerID, C.ContentID, C.ContentName, C.ImageData, C.Date_of_Release, C.AverageRating, CG.Genre, CL.ContentType
            from F21_S001_16_Content C, (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
            where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
            and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        )
        data.userContent = userContent
        data.updatedContent = updatedContent
        data.userContent = userContent
        connection.commit()
    
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})



app.post('/api/remove-from-list', async (req, res) => {
    let data = {userContent:[],updatedContent:[]}
    let userID = req.body.userid
    let cid = req.body.contentID

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let userContent = await query(
            `DELETE FROM F21_S001_16_Watches where ContentID = ${cid} and CustomerID = ${userID}`
        )
        let updatedContent = await query(
            `select U.CustomerID, C.ContentID, C.ContentName, C.ImageData, C.Date_of_Release, C.AverageRating, CG.Genre, CL.ContentType
            from F21_S001_16_Content C, (
                select ContentId, GROUP_CONCAT(Genre) as Genre
                from F21_S001_16_ContentGenre
                group by ContentId
            ) CG , F21_S001_16_ContentLocation CL, F21_S001_16_Watches W, F21_S001_16_Customer U
            where C.ContentId = CG.ContentID and C.ContentID = CL.ContentID
            and U.CustomerID = '${userID}' and C.ContentID = W.ContentID and W.CustomerID = '${userID}'`
        )
        data.userContent = userContent
        data.updatedContent = updatedContent
        connection.commit()
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();            
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})





app.post('/api/country-content', async (req, res) => {
    let location = req.body.country
    let data = {list:null}
    try {
    
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let result = await query(
            `select C.ContentID, C.ContentName, C.ImageData 
            from F21_S001_16_ContentLocation CL JOIN F21_S001_16_Content C ON CL.ContentID = C.ContentID
            where CL.CONTENTLOCATION = '${location}' 
            order by C.ContentID asc`
        )  
        data.list = result
  
    } catch (err) {
        console.error('why this error: ', err);
    } finally {
        if (connection) {
            try {
                connection.end();
            } catch (err) {
            console.error(err);
            }
        }
    }
    res.send(data)
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

var listener = app.listen(PORT, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 8000
});