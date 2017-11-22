function loadCourseStream(tile){
	CourseStreamModel = Backbone.Model.extend({});
	var courseStreamModel = new CourseStreamModel({tile:tile});
	
	CourseStreamView = Backbone.View.extend({
		
		el: '.content-stream',
		model: courseStreamModel,
	
		render: function(){
	
			news = this.model.get("tile");
			iter = news["tileData"]["courseStreamList"];
			console.log(JSON.stringify(iter));
			for( item in iter){
				
				type = news["tileData"]["courseStreamList"][item]['streamType'];
				
				if(type == "File"){
					status = news["tileData"]["courseStreamList"][item]['isInstructor'];
					thumbnail = news["tileData"]["courseStreamList"][item]['ownerTn'];
					name = news["tileData"]["courseStreamList"][item]['ownerName'];
					title = news["tileData"]["courseStreamList"][item]['streamTitle'];
					fileType = news["tileData"]["courseStreamList"][item]["fileType"];
					fileName = news["tileData"]["courseStreamList"][item]["fileName"];
						
					template = $('#file-template');
					this.$el.append(_.template(template.html(), {status: status, thumbnail: thumbnail, name: name, title: title, fileType: fileType, fileName: fileName}));		
				}
				else if(type == "Assignement"){
					status = news["tileData"]["courseStreamList"][item]['isInstructor'];
					thumbnail = news["tileData"]["courseStreamList"][item]['ownerTn'];
					name = news["tileData"]["courseStreamList"][item]['ownerName'];
					title = news["tileData"]["courseStreamList"][item]['streamTitle'];
					due =  news["tileData"]["courseStreamList"][item]['dueDate'];
					
					template = $('#assignment-template');
					this.$el.append(_.template(template.html(), {status: status, thumbnail: thumbnail, name: name, title: title, due: due}));	
				}
				else if(type == "Assessment"){
					status = news["tileData"]["courseStreamList"][item]['isInstructor'];
					thumbnail = news["tileData"]["courseStreamList"][item]['ownerTn'];
					name = news["tileData"]["courseStreamList"][item]['ownerName'];
					title = news["tileData"]["courseStreamList"][item]['streamTitle'];
					
					template = $('#assessment-template');
					this.$el.append(_.template(template.html(), {status: status, thumbnail: thumbnail, name: name, title: title,}));		
				}
			}
		},
		
		initialize: function(){
			this.render();
		}

	})
	
	var courseStreamView = new CourseStreamView();
}



