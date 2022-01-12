const mysql = require('mysql');
const util = require('util');

let config = {
    host     : 'netflix-vms.cjnhrlike9ax.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'karan1195',
    port     : '3306',
    database:'VMS'
};
let connection;

exports.login = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);
        let data = {}
        let isLogged = false;
        let userID = null;


        // let result = await query(
        //     `SELECT * FROM F21_S001_16_Customer WHERE Email = ${email}  AND UserPassword = ${password}`,
        //     [email, password],
        //     (err, result)=> {
        //         if (err) {
        //             res.send({err: err});
        //         }
        //         if (result.length > 0) {
        //             auth = true;
        //             userID = result[0].CustomerID
        //             // res.send( {message:'Successfully Logged in!',result});
        //         }else{
        //             res.send({message: "Wrong username/password comination!"});
        //         }
        //     }
        // );
        // let result = await query(`UPDATE F21_S001_16_Watches SET CustomerID = "21007" where CustomerID = "21001"`)
        let userDetails = {}

        let result = await query(`SELECT * FROM F21_S001_16_Customer WHERE Email = "${email}"  AND UserPassword = "${password}"`)

        if (result.length > 0) {
            isLogged = true;
            userID = result[0].CustomerID
            userDetails = {
                CustomerID: result[0].CustomerID,
                Email: result[0].Email,
                Fname: result[0].Fname,
                Lname: result[0].Lname,
                PhoneNo: result[0].PhoneNo,
                DOB: result[0].DOB
            }
            data.isLogged = isLogged
            data.userDetails = userDetails
            // res.send( {message:'Successfully Logged in!',result});
        }else{
            res.send({message: "Wrong username/password comination!"});
        }


        if(userID){
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
            data.userContent = userContent
            res.send(data)
        }else{
            res.send({message: "Wrong username/password comination!"});
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
};

// Display list of all books.
exports.register = async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    try {
        let connection = mysql.createConnection(config);
        connection.connect();
        let query = util.promisify(connection.query).bind(connection);

        let userDetails = {
            Email: req.body.Email,
            UserPassword: req.body.UserPassword,
            Fname: req.body.Fname,
            Lname: req.body.Lname,
            PhoneNo: Number(req.body.PhoneNo),
            DOB: req.body.DOB, 
            CardNo: Number(req.body.CardNo),
            CVV: Number(req.body.CVV),
            ExpiryDate: Number(req.body.ExpiryDate)
        }
        let user = await query(          
            `SELECT PhoneNo, Email, CardNo 
            FROM F21_S001_16_Customer 
            WHERE PhoneNo = ${userDetails.PhoneNo} OR Email = '${userDetails.Email}' OR CardNo = ${userDetails.CardNo}`
        )

        let errMsg = {};

        console.log(user)
        if(user.length){
            user.map(u=>{
                if(userDetails.PhoneNo == u.PhoneNo){
                    errMsg['phone'] = 'Phone number already registered!'
                    // errMsg.push('Phone number already registered!')
                }
                if(userDetails.Email == u.Email){
                    errMsg['email'] = 'Email already registered!'
                    // errMsg.push('Email already registered!')
                }
                if(userDetails.CardNo == u.CardNo){
                    errMsg['card'] = 'Please check Card number!'
                    // errMsg.push('Please check Card number!')
                }
            })

            // let errMsg = duplicateEntry.join(', ')
            res.send({message: errMsg, success:false})
        }else{
            let newUser = await query(
                `INSERT INTO F21_S001_16_Customer 
                (Fname,Lname,DOB,UserPassword,PhoneNo,Email,CardNo,CVV,ExpiryDate) 
                VALUES ('${userDetails.Fname}','${userDetails.Lname}',${userDetails.DOB},'${userDetails.UserPassword}',
                    ${userDetails.PhoneNo},'${userDetails.Email}',${userDetails.CardNo},${userDetails.CVV},${userDetails.ExpiryDate}
                )`
            )
            console.log(newUser)
            res.send({message: "Successfully Signed up!",success:true})
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
};
