// Generated by CoffeeScript 1.4.0

define(['backbone'], function(Backbone) {
  return Backbone.Model.extend({
    idAttribute: "_id",
    defaults: function(){
    	return {
	    	name: "",
	    	active: true,
	    	description: "",
	    	bits: []
 		};
    },
    addBit: function(duration){
        this.get('bits').push(duration);
        console.log(this.get('bits'));
        this.trigger('change');
    },
    complete: function(){
    	//this.save({active: !this.get("active")});
    	this.set({active: !this.get("active")});
    }
  });
});