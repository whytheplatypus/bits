// Generated by CoffeeScript 1.4.0

define(['text!templates/word.handlebars', './miniByteView', 'backbone', 'marked'], function(templateString, miniByteView, Backbone, marked) {
  marked.setOptions({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    langPrefix: 'language-'
  });
  return Backbone.View.extend({
    el: $('#wordPanel'),
    initialize: function() {
        var self = this;
        this.model.on('change', this.render, this);
        this.el.addEventListener('delete', function(){self.close(false);}, false);
        var close = function(){
            this.close(true);
        }
        this.model.on('destroy', close, this);
    },
    onRender: function() {},
    onRendered: function() {
        return this.el;
    },
    onClose: function() {},
    onClosed: function() {
    },
    events: {
        "click .add_byte" : "addByte",
        "click .remove_word": "removeWord",
        "blur .word_name" : "updateName",
        "keypress .word_name"  : "blurName",
        "focus .word_description" : "rawDescription",
        "blur .word_description" : "updateDescription"
    },
    removeWord: function(){
        this.model.destroy();
    },
    blurName: function(e){
        if (e.keyCode == 13){
            this.$('.word_name').blur();
        }
    },
    addByte: function(){
        console.log('add byte');
        this.model.get('bytes').add({name: "new byte", description: "click to edit"});
    },
    updateName: function(){
        this.model.set('name', this.$('.word_name').html());
    },
    rawDescription: function(){
        this.$('.word_description').empty().append(this.model.get('description'));
    },
    updateDescription: function(){
        this.model.set('description', this.$('.word_description').html());
        this.$('.word_description').empty().append(marked(this.model.get('description')));
    },
    close: function(removeElement) {
        console.log("closing word");
      if (removeElement == null) {
        removeElement = false;
      }
      if (this.onClose) {
        this.onClose();
      }
      this.undelegateEvents();
      this.$el.removeData().unbind();
      this.$el.empty();
      if (removeElement) {
        //this.remove();
      }
      if (this.onClosed) {
        return this.onClosed();
      }
    },
    render: function(e) {
      console.log("rendering byte list");
      var self = this;
      var data, template;
      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      $(this.el).empty().append(template(data));
      this.$('.word_description').empty().append(marked(this.model.get('description')));
      var bytes = this.$('.bytes');
      console.log('bytes:');
      console.log(this.model.get('bytes'));
      this.model.get('bytes').each(function(byte){
        var minibyte = new miniByteView({model: byte});
        minibyte.render();
        bytes.append(minibyte.el);
      });
      return this.onRendered();
    }
  });
});
