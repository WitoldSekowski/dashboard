function loadRecentActivity(tile){
	RecentActivityModel = Backbone.Model.extend({});
	
	var recentActivityModel = new RecentActivityModel({tile:tile});
	
	RecentActivityView = Backbone.View.extend({
		
		el: '.activities',
		model: recentActivityModel,
	
		render: function(){
			
			activities = this.model.get("tile");
			iter = activities["tileData"]["recentActivityList"];
			
			var i = 1;
			for( item in iter){
				
				var link = "";
				type = [iter][0][item]['activityType'];
				text = [iter][0][item]['displayText'];
				age = [iter][0][item]['age'];
				url = [iter][0][item]['urlParameters'];
				
				var days;
				var diff = Math.abs(new Date() - new Date(age));
				var hours = Math.floor(diff/(1000*60*60));
				
				if (hours>24){
					days = Math.floor(hours/24);
					hours = null;
				}	
				
				for(part in url){
					link += url[part] + "/";
				}	
				
				template = $('#recent-activity-template');
				this.$el.append(_.template(template.html(), {type: type, text: text,
															 hours: hours, days:days, url: url,
															 link: link, i: i
															 }));		
				i = i+1;	
			}		
		},
		
		initialize: function(){
			this.render();
		}
	})
	
	var recentActivityView = new RecentActivityView();
}



