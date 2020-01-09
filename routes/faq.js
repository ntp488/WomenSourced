var utils = require( "../utility/utils" );

module.exports.get = function(request, response) {
    response.render( utils.path.join( __dirname, "../views/faq.ejs" ));
};