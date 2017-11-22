$(function(){

	DashboardModel = Backbone.Model.extend({
		url: 'data/data.json'
	});

	DashboardView = Backbone.View.extend({
		
		el: '.container',
		
		model: dashboardModel,
		
		render: function(){
	
			var tiles = dashboardModel.get('tiles');
			var courseDetails = dashboardModel.get('courseDetails');
			title = courseDetails['courseName'];
			thumbnail = courseDetails['courseThumbnail'];
			description = courseDetails['courseDescription'];
			target = $('#course-details');
			template = $('#course-details-template');
			
			target.append(_.template(template.html(), {title: title, thumbnail: thumbnail, 
													   description:description }));	
			
			for(var tile in tiles){
				
				var tileType = tiles[tile]['tileType'];
		
				
				if(tileType == "course_stream"){
					
					loadCourseStream(tiles[tile]);
					
				}
				else if(tileType == "grade_book"){	
					
					loadGradeBook(tiles[tile]);
					
				}
				else if( tileType == "recent_activity"){
					
					loadRecentActivity(tiles[tile]);
					
				}
				else if( tileType == "class_statistics"){
					
					loadStatistics(tiles[tile])
					
				}	
			}	
		}	
	});
	
	var dashboardModel = new DashboardModel();
	var dashboardView = new DashboardView();
	
	dashboardModel.fetch().complete(function(){
		dashboardModel.toJSON();
		console.log(JSON.stringify(dashboardModel));
		dashboardView.render();
	});

})














