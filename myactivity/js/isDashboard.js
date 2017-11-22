$(function(){

	var jsonFile = {"courseID":1,"courseName":"Business","courseDetails":{"courseName":"Contemporary business 15e","courseThumbnail":"http://s7.postimg.org/rhdl2luwn/magazine.jpg","courseDescription":"Boone and Kurtz, Contemporary Business 15th Edition delivers solutions at the speed of business.Solutions designed to help you improve critical thinking—from the Boone and Kurtz Student Case Videos to the Weekly Updates news blog—will get students thinking, talking, connecting and making decisions—at the speed of business.Experience a textbook program that supports your goals to stimulate curiously, show relevance, promote creativity and prepare students for what’s ahead, in their academic and business careers."},"tiles":[{"tileId":"a1","position":"0","tileType":"course_stream","tileData":{"courseStreamList":[{"ownerTn":"http://s24.postimg.org/okik4yeox/guy.png","ownerName":"John Doe","isInstructor":true,"streamType":"File","inMyBookMark":false,"streamTitle":"Please read through this document before tomorrows class ","fileType":"pdf","fileName":"Additional_Reading_material_for_chapter_10"},{"ownerTn":"http://s23.postimg.org/givnllvnr/kamran.jpg","ownerName":"Jane Doe","isInstructor":false,"streamType":"Assignement","inMyBookMark":false,"streamTitle":"Charting of obtained field data","dueDate":"28­Oct­2013"},{"ownerTn":"http://s24.postimg.org/okik4yeox/guy.png","ownerName":"John Doe","isInstructor":true,"streamType":"Assessment","inMyBookMark":false,"streamTitle":"Some data posted by the student "}],"stream_items":[{"bmIds":[5374],"cCnt":1,"cId":250,"cm":[{"pId":"52583f82da06cc5cf9b84198","ts":"2013­10­11T18:37:35.251Z","by":"student3 adlspace","uId":5374,"text":"dkdj","ut":"student","sts":0,"csId":94}],"csId":94,"iPs":"2013­10­11T18:12:18.451Z","iTit":"Test Post<br>","itSts":0,"iup":"2013­10­11T18:37:35.251Z","lc":1,"lkIds":[5347],"oId":5374,"oName":"student 3 adlspace","oType":["own_5374","cls_94"],"type":1},{"bmIds":[5374],"cCnt":1,"cId":250,"cm":[{"pId":"52583f82da06cc5cf9b84198","ts":"2013­10­11T18:37:35.251Z","by":"student4 adlspace","uId":5374,"text":"aa  bbb","ut":"student","sts":0,"csId":94}],"csId":94,"iPs":"2013­10­11T18:12:18.451Z","iTit":"Test Post<br>","itSts":0,"iup":"2013­10­11T18:37:35.251Z","lc":1,"lkIds":[5347],"oId":5374,"oName":"student 3 adlspace","oType":["own_5374","cls_94"],"type":1}]},"url":""},{"tileId":"a2","position":"1","tileType":"grade_book","tileData":{"assignments":{"assignmentPercentile":"60%","recentGrades":[15,25,34,45,55],"upcoming":{"count":3,"dueDate":"Oct 27 2013"}}},"url":""},{"tileId":"a3","position":"2","tileType":"recent_activity","tileData":{"recentActivityList":[{"displayText":"Ch 5: Forms of business ownership and organization","age":"2013/10/5 11:37:35","activityType":"Lesson","urlParameters":{"lessonId":"enccrypted lesson id","chId":"encrypted chapter id","tid":"enccrypted topic id","stId":"enccrypted subtopic id"}},{"displayText":"Ch 6: Starting your own business: The enterpreneurs….","age":"2013/10/20 19:37:35","activityType":"Assessment","urlParameters":{"chId":"encrypted chapter id","tid":"enccrypted topic id","stId":"enccrypted subtopic id","resourceId":"encrypted resource id","assessmentId":"encrypted assessment id"}},{"displayText":"Ch 2: Business ethics and social  responsibility","age":"2013/09/20 11:37:35","activityType":"Assignment","urlParameters":{"assessmentId":"encrypted assessment id","assignmentId":"assignment Id","chId":"encrypted chapter id","tid":"enccrypted topic id","stId":"enccrypted subtopic id","resourceId":"encrypted resource id"}}]},"url":""},{"tileId":"a4","position":"1","tileType":"class_statistics","tileData":{"classStatistics":{"classParticipant":"70","timeSpent":"1234","practicePerformance":"80","questionsCount":"123","topclassPartAvg":"34","topTimeSpentAvg":"1234","topPracticePerformanceAvg":"80%","topQuestionsAvg":"132424"}},"url":""}]};


	DashboardModel = Backbone.Model.extend({
		data: null
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
	
	var dashboardModel = new DashboardModel(jsonFile);
	var dashboardView = new DashboardView();
	dashboardView.render();
	

})














