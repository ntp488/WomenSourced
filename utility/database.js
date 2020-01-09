var mysql = require( "mysql" );

var connectionPool;

module.exports = function( config ) {
    connectionPool = mysql.createPool( config );
    //start a single connection in the pool
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.release();
        }
    } );
};

module.exports.performLoginValidation = function( username, password, callback ){
    console.log( "getting connection" );
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            console.log( "beginning query" );
            connection.query( "SELECT COUNT(*) FROM users WHERE username = ? AND password = AES_ENCRYPT(?, 'WOMEN_SOURCED_KEY')", [username, password], function( error, rows, fields ) {
                if ( error ) {
                    throw error;
                }
                
                console.log( "returning results" );
                return callback( rows[0]["COUNT(*)"] == 1 );
        
                /*
                    If data is returned for a query with a given userID and password (make sure to AES_Encrypt/Decrypt)
                    then return that the validation was successful.
                */
            } );
            console.log( "releasing connection" );
            connection.release();
        }
    } );
};

module.exports.performSignup = function( userId, password, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "INSERT INTO users (username, password) VALUES (?, AES_ENCRYPT(?, 'SVS_ENCRYPTION_KEY')", [userId, password], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results );
                    return callback();
                }
                
                /*
                    If data is returned for a query with a given userID and password (make sure to AES_Encrypt/Decrypt)
                    then return that the validation was successful.
                */
            } );
            connection.release();
        }
    } );
};

module.exports.storeStreamlabsToken = function( accessToken, refreshToken, expiresIn, timeCreated, username, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "UPDATE users SET accessToken = ?, refreshToken = ?, expiresIn = ?, timeCreated = ? WHERE username = ?", [accessToken, refreshToken, expiresIn, timeCreated, username], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results );
                    return callback();
                }
                
                /*
                    If data is returned for a query with a given userID and password (make sure to AES_Encrypt/Decrypt)
                    then return that the validation was successful.
                */
            } );
            connection.release();
        }
    } );
};

module.exports.storeStreamlabsSocketToken = function( socketToken, accessToken, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "UPDATE users SET socketToken = ? WHERE accessToken = ?", [socketToken, accessToken], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results );
                    return callback();
                }
                
                /*
                    If data is returned for a query with a given userID and password (make sure to AES_Encrypt/Decrypt)
                    then return that the validation was successful.
                */
            } );
            connection.release();
        }
    } );
};

module.exports.checkStreamlabsApiAuthorized = function( username, callback ){
    console.log( "getting connection" );
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            console.log( "beginning query" );
            connection.query( "SELECT COUNT(*) FROM users WHERE username = ? AND accessToken IS NOT NULL AND socketToken IS NOT NULL", [username], function( error, rows, fields ) {
                if ( error ) {
                    throw error;
                }
                
                console.log( "returning results" );
                return callback( rows[0]["COUNT(*)"] == 1 );
            } );
            console.log( "releasing connection" );
            connection.release();
        }
    } );
};

module.exports.saveBitBoss = function( socketToken, currentBoss, maxHealth, health, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "UPDATE users SET currentBoss = ?, maxHealth = ?, health = ?  WHERE socketToken = ?", [currentBoss, maxHealth, health, socketToken], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results );
                    return callback( results );
                }
            } );
            connection.release();
        }
    } );
};

module.exports.loadBitBoss = function( socketToken, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "SELECT currentBoss, maxHealth, health FROM users WHERE socketToken = ?", [socketToken], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results[0] );
                    return callback( results[0] );
                }
            } );
            connection.release();
        }
    } );
};

module.exports.fetchSocketToken = function( username, callback ){
    connectionPool.getConnection( function( error, connection ) {
        if ( error ) {
            throw error;
        }
        else {
            connection.query( "SELECT socketToken FROM users WHERE username = ?", [username], function( error, results, fields ) {
                if ( error ) {
                    throw error;
                }
                else {
                    console.log( results[0] );
                    return callback( results[0] );
                }
            } );
            connection.release();
        }
    } );
};