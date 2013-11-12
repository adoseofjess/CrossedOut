Crossedout.Models.Team = Backbone.Model.extend({
  urlRoot: "/teams",
  
  members: function() {
    
    if (!this._teamMembers) {
      this._teamMembers = new Crossedout.Collections.Users([], { team: this });
    }
    
    return this._teamMembers;
  },
  
  projects: function() {
    if (!this._projects) {
      this._projects = new Crossedout.Collections.Projects([], { team: this });
    }
    
    return this._projects;
  },
  
  parse: function (serverAttributes, options) {
    
    //turn team members into user collection
    this.members().reset(serverAttributes.members);
    //turn team tasks into collection
    this.projects().reset(serverAttributes.projects, { parse: true });    

    delete serverAttributes.members;
    delete serverAttributes.projects;
    return serverAttributes;
  },
  
  //when this is called a team doesn't have any members yet
  toJSON: function () {
    
    var json = _.extend({}, this.attributes);
    json.members = this.members().toJSON();
    
    return json;
  },

});