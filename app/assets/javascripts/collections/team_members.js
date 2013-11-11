Crossedout.Collections.teamMembers = Backbone.Collection.extend({
  
  //not sure about this part
  initialize: function (models, options) {
    
    this.team = options.team;
  },
  
  model: Crossedout.Models.User,
  url: function () {
    return '/teams/' + this.team.id + '/users'
  }
});