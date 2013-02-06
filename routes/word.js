// Generated by CoffeeScript 1.4.0

module.exports.initialize = function(app) {
  var word;
  word = app.db.model('word', app.schemas.word);
  app.server.get('/word', function(request, response, next) {
    return word.find(request.params, function(err, objs) {
      return response.send(JSON.stringify(objs));
    });
  });
  app.server.get('/word/:id', function(request, response, next) {
    var id;
    id = request.params.id;
    return word.findById(id, function(err, obj) {
      return response.send(JSON.stringify(obj));
    });
  });
  app.server.put('/word/:id', function(request, response, next) {
    var id;
    id = request.params.id;
    if (request.body._id) {
      delete request.body._id;
    }
    return word.update({
      _id: id
    }, {
      $set: request.body
    }, function(error, result) {
      return response.send(JSON.stringify(result));
    });
  });
  app.server.post('/word', function(request, response, next) {
    var obj;
    obj = new word(request.body);
    return obj.save(function(err) {
      return response.send(JSON.stringify(obj));
    });
  });
  return app.server.del('/word/:id', function(request, response, next) {
    var id;
    id = request.params.id;
    if (id) {
      return word.findById(id, function(err, obj) {
        return obj.remove(function() {
          return response.send('');
        });
      });
    }
  });
};