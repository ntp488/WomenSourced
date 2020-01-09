var express = require( "express" );
var expressSession = require( "express-session" );
var expressSqlStore = require( "express-mysql-session" );
var routes = require( "./routes/routes" );
var utils = require( "./utility/utils" );
var database = require( "./utility/database" );
var fs = require( "fs" );
//var particles = require("particles.js");

var app = express();

fs.readFile( utils.path.join( __dirname, "/config/config.json" ), function( error, data ){
    if ( error ) {
        throw error;
    } 
    else {
        var config = JSON.parse( data );
        //database( config.databaseOptions );
        //var sessionStore = new expressSqlStore( config.databaseOptions );
        //var sessionOptions = config.databaseOptions.session;
        //sessionOptions.store = sessionStore;

        //app.use( expressSession( sessionOptions ) );
        app.set( "views", utils.path.join( __dirname, "views" ) );
        app.set( "view engine", "ejs" );
        app.use( express.static( utils.path.join( __dirname, "/public" ) ) );
        var router = new express.Router();

        //Routing for root
        //router.get( "/", routes.root.get ), [routes.middleware.processForm, routes.middleware.performLogoff, routes.middleware.validateLogin], routes.root.get );
        //router.post( "/", [routes.middleware.processForm, routes.middleware.performLogoff, routes.middleware.validateLogin], routes.root.post );

        //Routing for index
        router.get("/", routes.home.get)

        //Routing for index
        router.get("/portal", routes.portal.get)

        //Routing for about
        router.get("/about", routes.about.get)

        //Routing for contact
        router.get("/contact", routes.contact.get)

        //Routing for faq
        router.get("/faq", routes.faq.get)

        //Routing for services
        router.get("/services", routes.services.get)

        //Routing for pricing
        router.get("/pricing", routes.pricing.get)

        //Routing for personas

        //Routing for dashboards
        router.get("/dashboard", routes.dashboard.get)

        //Routing for charts
        router.get("/charts", routes.charts.get)

        //Routing for tables
        router.get("/tables", routes.tables.get)

        //Routing for blank
        router.get("/blank", routes.blank.get)

        //Routing for blank
        router.get("/resumeOne", routes.resumeOne.get)

        //Routing for BetterBitBoss
        //router.get( "/betterBitBoss", routes.middleware.requireLogin, routes.betterBitBoss.get );
        //router.post( "/betterBitBoss", routes.middleware.requireLogin, routes.betterBitBoss.post );

        //Routing for BetterBitBoss
        //router.get( "/bbb", routes.bbb.get );
        //router.post( "/bbb", [routes.middleware.requireLogin, routes.middleware.processForm], routes.bbb.post );

        router.use(function(req, res, next) {
            return res.status(404).render("404.ejs");
        })

        /*router.use(function(err, req, res, next) {
            return res.status(500).send({ error: err });
        })*/

        app.use( "/", router );

        app.listen( process.env.PORT || 8080 );
        if ( process.env.PORT ) {
            console.log( process.env.PORT );
        }
    }
});