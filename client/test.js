const oracledb = require('oracledb');

oracledb.initOracleClient({libDir: 'C:\\Users\\deepn\\Downloads\\instantclient-basic-windows.x64-21.3.0.0.0\\instantclient_21_3'});

async function run() {

  let connection;

  try {

    connection = await oracledb.getConnection(  {
        user          : 'kxs9016',
        password      : 'Karannanda95',
        connectString : 'acaddbprod-2.uta.edu:1523/pcse1p.data.uta.edu',
        // connectString: '(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = acaddbprod-2.uta.edu)(PORT = 1523))(CONNECT_DATA = (SID= ORCL)))'
    });      

    console.log("Successfully connected to Oracle Database");

    let d = new Date();
    let dt = d.getFullYear()+'/'+(d.getMonth()+1)
    // Create a table
    // const sql = "INSERT INTO F21_S001_16_Content (ContentID, ContentName, ContentLength, AverageRating, Date_of_Release) values(:1,:2,:3,:4,:5)"
    // let rows = [[21020, 'TEST', '300', 9.0, new Date(2021-12-03)]]
    // let res = await connection.executeMany(sql,rows)
    // console.log(res)
    // connection.commit();
    connection.execute(
      `SELECT * FROM F21_S001_16_Content`,  
     function(err, result) {
        if (err) {
          console.error(err.message);
          return result;
        }
        else
        console.log(result)
        return result;
     });


  } catch (err) {
    console.error('why this error: ', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();