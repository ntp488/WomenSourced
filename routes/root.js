var utils = require( "../utility/utils" );

module.exports.get = function(request, response) {
    response.render( utils.path.join( __dirname, "../views/root.ejs" ));
};

/*module.exports.get = function( request, response ) {
    console.log( "doing get" );
    if ( request.session.username ) {
        //user is logged in, reflect that in the page
        response.render( utils.path.join( __dirname, "../views/root.ejs" ), { username : request.session.username, streamlabsApiAuthorized: request.session.apiAuthorized } );
    }
    else {
        response.render( utils.path.join( __dirname, "../views/root.ejs" ) );
    }
};

module.exports.post = function( request, response ) {
    if ( request.loginFailed ) {
        //the user failed login, reflect that in page
        response.render( utils.path.join( __dirname, "../views/root.ejs" ), { error : request.loginFailed } );
    } 
    else if ( request.session ) {
        if ( request.session.username ) {
            //user is logged in, reflect that in the page
            response.render( utils.path.join( __dirname, "../views/root.ejs" ), { username : request.session.username, streamlabsApiAuthorized: request.session.apiAuthorized } );
        }
        else {
            //posted here? weird... just render normal page
            response.render( utils.path.join( __dirname, "../views/root.ejs" ) );
        }
    }
    else {
        //posted here? weird... just render normal page
        response.render( utils.path.join( __dirname, "../views/root.ejs" ) );
    }
};*/