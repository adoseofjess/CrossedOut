Crossedout.Views.AddMemberView = Backbone.View.extend({
  template: JST["teams/addmember"],
  
  initialize: function (team) {
    this.team = team;
  }, 
  
	events: {
		"submit form": "addMember",
	},
  
  render: function () {
    var renderedContent = this.template( { team: this.team } )
    this.$el.html(renderedContent);
    
    this.$el.find(".typeahead").typeahead({
      name: 'users',                                                          
      local: Crossedout.users.pluck("username"),                                         
      limit: 10,    
    })
    
    return this;
  },
  
  addMember: function (event) {
    
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    
    var newMember = Crossedout.users.findWhere({username: formData.team.member_ids})
    
    $(".content-right-pane").find(".member-show").last().after("<div class='member-show'>"+ newMember.get("username")+ "</div><br>");
    
    $.ajax({
      type: 'POST',
      url: '/teams/' + this.team.id + '/' + newMember.get('id') + '/' + formData.team.member_ids,
      dataType: 'json',
      success: function (data) {
        console.log("Email sent");
        console.log(data);
      },
      errors: function(xhr, status, error) {
        console.log("ERROR");
        console.log(xhr.responseText);
      }
    });
  }
  
  
});
