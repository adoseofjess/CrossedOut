Crossedout.Views.TeamEditView = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    // this.listenTo(this.model, "remove add reset taskChange", this.render);  
//     this.listenTo(this.model.tasks(), "remove add reset taskChange", this.render);
    this.$el = $("<div class=\"header-container\"></div>")    
  },
  
  template: JST["teams/edit"],
  
  events: {
    "submit form": "updateTeam"
  },
  
  render: function () {
    // $(".trashcan").html("<div class="trashcan-icon"><i class="fa fa-trash-o"></i></div>")
    var renderedContent = this.template({
      team: this.model,
    });
    this.$el.html(renderedContent);
    return this;
    
  },
  
  updateTeam: function (event) {
    event.preventDefault();
    
    var formData = $(event.currentTarget).serializeJSON();
    var that = this;
    this.model.save({team: formData.team}, {
      success: function () {

        var UpdatedTeamShowHeader = new Crossedout.Views.TeamShowHeaderView({team: that.model})
        var UpdatedTeamShowView = new Crossedout.Views.TeamShowView({team: that.model})
        $(".content-header").html(UpdatedTeamShowHeader.render().$el);
        $(".content-left-pane").html(UpdatedTeamShowView.render().$el);
        
      }
    })
    
    // this.model.destroy({
    //   success: function () {
    //     $(".content-header").html("");
    //     $(".content-left-pane").html("");
    //   }
    // })
  },
  
});
