// Generated by CoffeeScript 1.4.0

define(["./../models/word", "localstorage"], function(Word) {
  return Backbone.Collection.extend({
  	localStorage: new Backbone.LocalStorage("words"),
    model: Word,
    url: '/word'
  });
});