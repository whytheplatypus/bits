// Generated by CoffeeScript 1.4.0

define(['text!templates/miniWord.handlebars', './wordView', 'backbone', 'marked'], function(templateString, wordView, Backbone, marked) {
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
    className: 'mini-word',
    initialize: function() {},
    onRender: function() {},
    onRendered: function() {},
    onClose: function() {},
    onClosed: function() {},
    events: {
        'click' : 'renderWord'
    },
    close: function(removeElement) {
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
        this.remove();
      }
      if (this.onClosed) {
        return this.onClosed();
      }
    },
    renderWord: function(){
      var done = new CustomEvent("delete");
      document.getElementById('wordPanel').dispatchEvent(done);
      var bigView = new wordView({model: this.model});
      bigView.render()
      $('.panel.active').removeClass('active');
      $("#wordPanel").removeClass('active2');
      $("#wordPanel").addClass('active');
    },
    render: function() {
      var data, template;
      this.onRender();
      template = Handlebars.compile(templateString);
      data = {};
      if (typeof this.model !== 'undefined') {
        data = this.model.attributes;
      }
      $(this.el).empty().append(template(data));
      this.$('.description').empty().append(marked(this.model.get('description')));
      return this.onRendered();
    }
  });
});
