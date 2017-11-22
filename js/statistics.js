function loadStatistics(tile){
	StatisticsModel = Backbone.Model.extend({
	
	});
	var statisticsModel = new StatisticsModel({tile:tile});
	
	StatisticsView = Backbone.View.extend({
		
		el: '#statistics',
		model: statisticsModel,
	
		render: function(){
	
			stats = this.model.get("tile");
			part = stats["tileData"]['classStatistics']["classParticipant"];
			time = stats["tileData"]['classStatistics']["timeSpent"];
			practice = stats["tileData"]['classStatistics']["practicePerformance"];
			questions = stats["tileData"]['classStatistics']["questionsCount"];
			partAvg = stats["tileData"]['classStatistics']["topclassPartAvg"];
			timeAvg = stats["tileData"]['classStatistics']["topTimeSpentAvg"];
			practiceAvg = stats["tileData"]['classStatistics']["topPracticePerformanceAvg"];
			questionsAvg = stats["tileData"]['classStatistics']["topQuestionsAvg"];
				
			var h = Math.floor(time/60);
			var rem = timeAvg % 60;
			var hAvg = Math.floor(time/60);
			var remAvg = timeAvg % 60;
				
			template = $('#statistics-template');
			this.$el.append(_.template(template.html(), {part: part, hAvg: hAvg, remAvg: remAvg, 
														 practice: practice, questions:questions, 
														 partAvg: partAvg, h: h, rem: rem,
														 practiceAvg: practiceAvg, questionsAvg: questionsAvg
														 }));		
		},
		
		initialize: function(){
			this.render();
		}
	})
	
	var statisticsView = new StatisticsView();

}



