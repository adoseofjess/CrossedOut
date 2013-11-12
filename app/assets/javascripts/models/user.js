Crossedout.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
    
  teams: function() {
    
    if (!this._teams) {
      this._teams = new Crossedout.Collections.Teams([], { user: this });
    }
    
    return this._teams;
  },
  
  parse: function (serverAttributes, options) {
    
    //turn personal tasks into collection
    Crossedout.current_user.tasks = new Crossedout.Collections.Tasks(serverAttributes.tasks);
    //turn teams into collection
    Crossedout.current_user.teams = new Crossedout.Collections.Teams(serverAttributes.teams);
    
    this.teams().reset(serverAttributes.teams);
    delete serverAttributes.teams;
    
    return serverAttributes;
  },
  
  toJSON: function () {
    
    var json = _.extend({}, this.attributes);
    json.teams = this.teams().toJSON();
    
    return json;
  },
  
  
});