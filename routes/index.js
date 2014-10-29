
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Raspberry PI Nodejs Web Server', pagetitle: 'Running Nodejs Express on Raspberry PI!' });
};
