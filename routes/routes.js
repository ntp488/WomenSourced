var utils = require( "../utility/utils" );

module.exports.portal = require( "./portal" );
module.exports.about = require( "./about" );
module.exports.contact = require( "./contact" );
module.exports.faq = require( "./faq" );
module.exports.services = require( "./services" );
module.exports.pricing = require( "./pricing" );
module.exports.dashboard = require( "./dashboard" );
module.exports.charts = require( "./charts" );
module.exports.tables = require( "./tables" );
module.exports.blank = require( "./blank" );
module.exports.resumeOne = require( "./resumeOne" );
module.exports.home = require( "./home" );

module.exports.middleware = {
    processForm: function( request, response, next ){
        var form = new utils.formidable.IncomingForm();
        form.parse( request, function( error, fields, files ){
            if ( error ) {
                throw error;
            }
            else {
                request.formFields = fields;
                console.log( "form parsed, handing off to middleware processor!" );
                next();
            }
        });
    },
    performLogoff: function( request, response, next ) {
        if ( request.formFields.logoffForm ) {
            //user is logging out! destroy session!
            request.session.destroy();
            console.log( "user session destroyed, handing off!" );
            next();
        }
        else {
            //user isn't logging off! bypass to next middleware func!
            console.log( "bypassing logoff, handing off to next middleware function!" );
            next();
        }
    },
    validateLogin: function( request, response, next ) {
        if ( !request.formFields.logoffForm ) {
            if ( request.session.username ){
                console.log( "user already logged in! bypassing login!" );
                next();
            }
            else {
                //user might be attempting to login
                if ( request.formFields.loginForm ) {
                    //The user is trying to login!
                    console.log( "about to perform validation" );
                    utils.database.performLoginValidation( request.formFields.username.toLowerCase(), request.formFields.password, function( result ) {
                        if ( result ) {
                            console.log( "user logged in successfully! handing off! " + request.formFields.username );
                            request.session.username = request.formFields.username;
                            next();
                        }
                        else {
                            console.log( "user failed to login successfully! handing off!" );
                            request.loginFailed = true;
                            next();
                        }
                    } );
                }
                else {
                    console.log( "user is not logged in or logging in! bypassing validateLogin()!" );
                    next();
                }
            }
        }
        else {
            console.log( "was logoff form, session destroyed, handing off!" );
            next();
        }
    },
    requireLogin: function( request, response, next ) {
        if ( request.session ) {
            //session exists
            if ( request.session.username ) {
                //user logged in
                next();
            }
            else {
                //user not logged in
                console.log( "redirection to home" );
                response.redirect( "/" );
            }
        }
        else {
            //no session exists
            console.log( "redirection to home" );
            response.redirect( "/" );
        }
    }
};