Crossedout.Models.User = Backbone.Model.extend({
  urlRoot: "/users",
    
  teams: function() {
    
    if (!this._teams) {
      this._teams = new Crossedout.Collections.Teams([], { user: this });
    }
    
    return this._teams;
  },
  
  projects: function() {
    
    if (!this._projects) {
      this._projects = new Crossedout.Collections.Projects([], { user:this });
    }
    
    return this._projects;
  },
  
  parse: function (serverAttributes, options) {
    
    
    this.projects().reset(serverAttributes.projects, { parse: true });
    this.teams().reset(serverAttributes.teams, { parse: true });
    delete serverAttributes.teams;
    delete serverAttributes.projects;
    return serverAttributes;
  },
  
  toJSON: function () {
    
    var json = _.extend({}, this.attributes);
    json.teams = this.teams().toJSON();
    
    return json;
  },
  
  
});