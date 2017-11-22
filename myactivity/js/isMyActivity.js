$(function(){	
	
	$.ajaxSetup({
			async: false
		});
		
			
	UserActivityModel = Backbone.Model.extend({
		defaults: {
				dashboard: null
			},
			
			initialize: function() {
				var model = this;
				
				$.getJSON('data/myactivity.json', function(jsonRaw) {
					model.set({dashboard: jsonRaw});
				});
			},
	});
	
	CounterModel = Backbone.Model.extend({
		defaults:{
			iter: 1,
			loadFrom:0,
			loadTo:19,
			deletor:0
		}
	});
	
	var counterModel = new CounterModel();

	var userActivityModel = new UserActivityModel();


	LessonCardModel = Backbone.Model.extend({
		defaults:{
			activityCard: null
		}		
	});
	
	
	LessonCardView = Backbone.View.extend({
				
			initialize: function(){
				
				this.renderCard();
				this.renderSummary();
				
			},
			
			events: {
				"click"						: "renderDetails",
				"click a.hide"				: "reRenderSummary"
			},
			
			renderDetails: function(e){				
				e.preventDefault();
				
				template = $('#details-template');
				
				var string = e.currentTarget.className;
		
				var result = string.match(/(\d+)/);
				str = result[0];


				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				var card = activityCards[str-1];
				
				var groups = card.card_activity_groups;
				$(e.currentTarget).find('.subevents').empty();
				_.each(groups, function(group){

					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					var groupItems = group.activity_groups_items;
		
					$(e.currentTarget).find('.subevents').append(_.template(template.html(),{title: groupTitle, subtitle: groupSubtitle, items: groupItems, card_type:"lesson"}))	
				});
				
				
		// enables going back to summary state	$(e.currentTarget).find('.subevents').append('<a class="hide" href="#">hide</a>');
			
				
		//		$('.act'+str).ScrollTo();	
				
				userActivityView.position();
			},
			
			reRenderSummary: function(e){
				
				e.preventDefault();
				e.stopPropagation();
			

				var target = e.currentTarget.parentNode.parentNode.className;
				var result = str.match(/(\d+)/);

				target = result[0];
				
				$('.act'+target+' .subevents').empty();
				
				target2 = $('.act'+target+' .subevents');
				template = $('#summary-template');
				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				var card = activityCards[target-1];
				
				var groups = card.card_activity_groups;
				var eksclude = [];
				var printTab = [];
				var i = 0;
				var k = 0;

				_.each(groups, function(group){

					_.each(group.activity_groups_items, function(item){
						var test = item.activityType;
						var filter = _.filter(group.activity_groups_items, function(prop){
							if(_.contains(eksclude,test)){
								return false
							}else{ return prop.activityType === test}
						})
						eksclude[i] = test;

						if(filter.length != 0){

							printTab[k]= new Array(2);
							printTab[k][0] = filter[0]['activityType'];
							printTab[k][1] = filter.length;

							k= k+1;
						}
						i = i+1;
					})
					
					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					
					target2.append(_.template(template.html(),{title: groupTitle, subtitle: groupSubtitle, printTab: printTab, card_type:"lesson"}))
					
					eksclude = [];
					printTab = [];					
				});	  
			//	$('#test').isotope('destroy');
				userActivityView.position();	
				
		}, 
			
			renderCard: function(){
				targetCard = $('.activity-feed');
				templateCard = $('#card-template') 
				var iter = counterModel.get('iter');
				var card = this.model.get('activityCard');
				var m_names = new Array("January", "February", "March", 
										"April", "May", "June", "July", "August", "September", 
										"October", "November", "December");
				var milisec = card.card_date;
				var date = new Date(milisec);
					month = date.getMonth();
					year = date.getFullYear();
					day = date.getDate();
					month = m_names[month];
				var title= card.card_title;
				var groups = card.card_activity_groups;

				targetCard.append(_.template(templateCard.html(),{title: title,  day:day, month:month,year:year, iter: iter, type: "lesson"}));
				
			},
			
			
			
			renderSummary: function(){
				
				var iter = counterModel.get('iter');
				this.setElement('.act'+iter);
				
				target = $('.act'+iter+' .subevents');
				template = $('#summary-template');
				var card = this.model.get('activityCard');
				
				var groups = card.card_activity_groups;
				var eksclude = [];
				var printTab = [];
				var i = 0;
				var k = 0;

				_.each(groups, function(group){

					_.each(group.activity_groups_items, function(item){
						var test = item.activityType;
						var filter = _.filter(group.activity_groups_items, function(prop){
							if(_.contains(eksclude,test)){
								return false
							}else{ return prop.activityType === test}
						})
						eksclude[i] = test;

						if(filter.length != 0){

							printTab[k]= new Array(2);
							printTab[k][0] = filter[0]['activityType'];
							printTab[k][1] = filter.length;

							k= k+1;
						}
						i = i+1;
					})
					
					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					
					target.append(_.template(template.html(),{title: groupTitle, subtitle: groupSubtitle, printTab: printTab, card_type:"lesson"}))
					
					eksclude = [];
					printTab = [];					
				});			
			},
		});

	AssessmentCardView = Backbone.View.extend({
		
		initialize: function(){
				
				this.renderCard();
				this.renderSummary();
				
			},
			
			events: {
				"click"			: "renderDetails",
				"click a.hide"				: "reRenderSummary"
				
			},
			
			renderDetails: function(e){
				

				e.preventDefault();
				template = $('#details-template');
				var string = e.currentTarget.className;
				var result = string.match(/(\d+)/);
				str = result[0];
				
				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				var card = activityCards[str-1];
				var groups = card.card_activity_groups;
				
				$(e.currentTarget).find('.subevents').empty();
				_.each(groups, function(group){

					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					var groupItems = group.activity_groups_items;
					var performance = group.group_performance;
					$(e.currentTarget).find('.subevents').append(_.template(template.html(),{title: groupTitle, 
																							 subtitle: groupSubtitle, items: groupItems,
																							 card_type:'assessment',iter:str, performance:performance}))

					$( "#progressbar"+str).progressbar({
			      value: performance
			    });	
				});	
		// enables going back to summary state		$(e.currentTarget).find('.subevents').append('<a class="hide" href="#">hide</a>');
		//	$('.act'+str).ScrollTo()					
			userActivityView.position();
			
			
			
			},
			reRenderSummary: function(e){
				
				e.preventDefault();
				e.stopPropagation();
	
				var str = e.currentTarget.parentNode.parentNode.className;
				var result = str.match(/(\d+)/);

				target = result[0];

				$('.act'+target+' .subevents').empty();
				
				
				target2 = $('.act'+target+' .subevents');
				template = $('#summary-template');
				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				var card = activityCards[target-1];
				
				var groups = card.card_activity_groups;
				var eksclude = [];
				var printTab = [];
				var i = 0;
				var k = 0;

				_.each(groups, function(group){

					_.each(group.activity_groups_items, function(item){
						var test = item.activityType;
						var filter = _.filter(group.activity_groups_items, function(prop){
							if(_.contains(eksclude,test)){
								return false
							}else{ return prop.activityType === test}
						})
						eksclude[i] = test;

						if(filter.length != 0){

							printTab[k]= new Array(2);
							printTab[k][0] = filter[0]['activityType'];
							printTab[k][1] = filter.length;

							k= k+1;
						}
						i = i+1;
					})

					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					var performance = group.group_performance;
					target2.append(_.template(template.html(),{title: groupTitle, subtitle: groupSubtitle, 
															  printTab: printTab, iter:target,card_type:'assessment',
															  performance: performance}))
					
					eksclude = [];
					printTab = [];	
					$( "#progressbar"+target).progressbar({
			     		value: performance
			     	 
			   		 });				
				});	  
			//	$('#test').isotope('destroy');
			
				userActivityView.position();	
				
		}, 
			renderCard: function(){
				targetCard = $('.activity-feed');
				templateCard = $('#card-template') 
				var m_names = new Array("January", "February", "March", 
										"April", "May", "June", "July", "August", "September", 
										"October", "November", "December");
				var iter = counterModel.get('iter');
				var card = this.model.get('activityCard');
				var milisec = card.card_date;
				var date = new Date(milisec);
					month = date.getMonth();
					month = m_names[month];
					year = date.getFullYear();
					day = date.getDate();
				var title= card.card_title;
				var groups = card.card_activity_groups;
				
				targetCard.append(_.template(templateCard.html(),{title: title, day:day, month:month,year:year, iter: iter,type: "assessment"}));
				
			},
			
			renderSummary: function(){
				
				var iter = counterModel.get('iter');
				this.setElement('.act'+iter);
				
				target = $('.act'+iter+' .subevents');
				template = $('#summary-template');
				var card = this.model.get('activityCard');
				
				var groups = card.card_activity_groups;
				var eksclude = [];
				var printTab = [];
				var i = 0;
				var k = 0;
				
				
		    
		    
				_.each(groups, function(group){

					_.each(group.activity_groups_items, function(item){
						var test = item.activityType;
						var filter = _.filter(group.activity_groups_items, function(prop){
							if(_.contains(eksclude,test)){
								return false
							}else{ return prop.activityType === test}
						})
						eksclude[i] = test;

						if(filter.length != 0){

							printTab[k]= new Array(2);
							printTab[k][0] = filter[0]['activityType'];
							printTab[k][1] = filter.length;

							k= k+1;
						}
						i = i+1;
					})

					var groupTitle = group.group_title;
					var groupSubtitle = group.group_subtitle;
					var performance = group.group_performance;
					target.append(_.template(template.html(),{title: groupTitle, subtitle: groupSubtitle, 
															  printTab: printTab, iter:iter,card_type:'assessment',
															  performance: performance}))
					
					eksclude = [];
					printTab = [];	
					$( "#progressbar"+iter).progressbar({
			     		value: performance
			     	 
			   		 });				
				});					
						
		}
	});
	
	
	ActivityFilterView = Backbone.View.extend({
		
		
		
		initialize: function(){
			this.render()
		},
		
		
		render: function(){
			var timeline = userActivityModel.get('dashboard');
			timeline = timeline['activity_timeline_summary'];
			
			target = $('.stick');
			template = $('#timeline-template');
			
			target.append(_.template(template.html(),{months: timeline}))	
		},
		
		timelineFilter: function(month, week){
			
			var timeline = userActivityModel.get('dashboard');
			var activities = timeline['activity_cards'];
			timeline = timeline['activity_timeline_summary'];
			
			
			if(week == "month"){
				var start	 = timeline[month].startDate;
				var end 	 = timeline[month].endDate;
			    var startMil = new Date(start.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3"));
			    var endMil 	 = new Date(end.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3"));
			    startMil 	= startMil.valueOf();			    
			    endMil 		= endMil.valueOf();
			    var filter 	= [];
			    var i		= 0;
			    
			   _.each(activities, function(elem){ 
			   		 filter = _.filter(activities, function(elem){
						if(elem.card_date <= endMil && elem.card_date >= startMil){
							return elem
						}else{
							return false}
					});		
				});

				$('.activity-feed').empty();
			
				var result;
				var loadFrom 		= filter[0];
				var loadTo 	= _.last(filter);
				 loadTo			= loadTo.card_date;
				 loadFrom 		= loadFrom.card_date;
			
				loadTo = _.find(activities, function(elem){
					return elem.card_date == loadTo;
				});
				loadFrom = _.find(activities, function(elem){
					return elem.card_date == loadFrom;
				});
				
		
				loadTo 			= _.indexOf(activities, loadTo);
				loadFrom		= _.indexOf(activities, loadFrom);
				
				if( loadTo-loadFrom < 20){
					loadTo = loadTo + (20-(loadTo-loadFrom));
				}else if(loadTo == 0 && loadFrom == 0){
					alert('cos');
				}
				
				counterModel.set({loadTo: loadTo,loadFrom: loadFrom})
				$('#test').masonry('destroy');
				userActivityView.loadCards();
				
			//	$('#test').masonry().masonry('reloadItems');
				
				userActivityView.position();
				/*
				var offsets = $('.span-now').offset();	
				var left = offsets.left;
				var iter = counterModel.get('loadFrom');
				
				for (var i =1; i<=iter ; i++){
					
					target = ".act"+i;
					if($(target).length >0){
						if($(target).offset().left >= left-50){
							
							$(target+ ' .act-arrow').removeClass('arr-left');	
							$(target+ ' .act-arrow').addClass('arr-right');
							$(target).removeClass('margin-left');
							$(target).addClass('margin-right');
						}else{
							
							$(target+ ' .act-arrow').removeClass('arr-right');
							$(target+ ' .act-arrow').addClass('arr-left');
							$(target).removeClass('margin-right');
							$(target).addClass('margin-left');
						}
					}
				}*/
				$('.span-now').css('visibility','hidden');
				$('.corner-stamp').css('display', 'none');
				if($('.act1').length >0 ){
					$('.span-now').css('visibility','visible');
				}
			//	$('.act'+(loadFrom+1)).ScrollTo()
				$(window).scrollTop(10);
				
			}else{

				var start	 = timeline[month].mySubTimeLineDO[week].startDate;
				var end 	 = timeline[month].mySubTimeLineDO[week].endDate;
				
			    var startMil = new Date(start.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3"));
			    var endMil 	 = new Date(end.replace( /(\d{2})-(\d{2})-(\d{4})/, "$1/$2/$3"));

			    startMil 	= startMil.valueOf();			    
			    endMil 		= endMil.valueOf();
			    var filtr 	= [];
			    var i		= 0;
			    
			   _.each(activities, function(elem){ 
			 
			   		 filtr = _.filter(activities, function(elem){
						if(elem.card_date <= endMil && elem.card_date >= startMil){
						
							return elem;
							
						}else{
							return false}
					});	
						
				});
				
			
				$('.activity-feed').empty();
	
				var result;
				var loadFrom 			= filtr[0];
				var loadTo 				= _.last(filtr);
				 loadTo			= loadTo.card_date;
				 loadFrom		= loadFrom.card_date;
			
				loadTo = _.find(activities, function(elem){
					return elem.card_date == loadTo;
				});
				loadFrom = _.find(activities, function(elem){
					return elem.card_date == loadFrom;
				});
				
		
				loadTo 			= _.indexOf(activities, loadTo);
				loadFrom		= _.indexOf(activities, loadFrom);
				
				
				if( loadTo-loadFrom < 20){
					loadTo = loadTo + (20-(loadTo-loadFrom));
				}else if(loadTo == 0 && loadFrom == 0){
					alert('cos');
				}
				
				
				counterModel.set({loadTo: loadTo,loadFrom: loadFrom})
				$('#test').masonry('destroy');
				userActivityView.loadCards();
			//	$('#test').masonry().masonry('reloadItems');
				
				userActivityView.position();
			/*	
				var offsets = $('.span-now').offset();	
				var left = offsets.left;
				var iter = counterModel.get('loadFrom');
			
				for (var i =1; i<=iter ; i++){
					
					target = ".act"+i;
					if($(target).length >0){
						if($(target).offset().left >= left-50){
							
							$(target+ ' .act-arrow').removeClass('arr-left');	
							$(target+ ' .act-arrow').addClass('arr-right');
							$(target).removeClass('margin-left');
							$(target).addClass('margin-right');
						}else{
							
							$(target+ ' .act-arrow').removeClass('arr-right');
							$(target+ ' .act-arrow').addClass('arr-left');
							$(target).removeClass('margin-right');
							$(target).addClass('margin-left');
						}
					}
				} */
				$('.span-now').css('visibility','hidden');
				$('.corner-stamp').css('display', 'none');
				if($('.act1').length >0 ){
					$('.span-now').css('visibility','visible');
				}
			//	$('.act'+(loadFrom+1)).ScrollTo()
				$(window).scrollTop(10);
			}
		
			
			
		}
		
	});
	
	

	UserActivityView = Backbone.View.extend({
	
		model: userActivityModel,
		
		initialize: function(){
			this.render();
			_.bindAll(this, 'detect_scroll');
	    // bind to window
	    $(window).scroll(this.detect_scroll);
		},
		
		detect_scroll: function(){
			
			if($(window).height() + $(window).scrollTop() > $(document).height()-300){

				isCard = counterModel.get('loadFrom');
				
				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				
				if(activityCards[isCard] != null){

					var loadTo = counterModel.get('loadFrom');	
									
					loadTo = loadTo + 20;
					counterModel.set({loadTo: loadTo});
					
					this.loadCards();
					this.position();
					
					$('.corner-stamp').css('display','none');
					
				}else if($('.end-data-bottom').length <= 0){
					
					var loadFrom = counterModel.get('loadFrom');
					var loadTo = counterModel.get('loadTo');

					$('.activity-feed').height($('.activity-feed').height()+100);
					$('.activity-feed').append('<div class="end-data-bottom corner-stamp">End of data</div>');
					
				}else{}
			}else if($(window).scrollTop() == 0){
				var iter = counterModel.get('iter');
				
				if($('.act1').length >0 ){
					
					
					if( $('.corner-stamp').length == 0){
						
						$('.act-header').append('<div class="corner-stamp">End of data</div>');
					}
					$('.corner-stamp').css('display', 'block');
					$('.span-now').css('visibility','visible');
						
				}else {
			
					var loadFrom = counterModel.get('loadFrom');
					var loadTo = counterModel.get('loadTo');
					var deletor = counterModel.get('deletor');
					
					var iter = counterModel.get('iter');
					loadFrom = loadFrom-(deletor+7);
					loadTo = loadTo-(deletor+7);
					iter = loadFrom+1;
					counterModel.set({loadFrom:loadFrom, loadTo:loadTo, iter:iter});

					$('.activity-feed').not('.act-header').empty();
						this.loadCards();
						 $('#test').masonry().masonry('reloadItems');
						this.position();
						$(window).scrollTop(10);
						
					if($('.act1').length >0){					
						$('.span-now').css('visibility','visible');
						$(window).scrollTop(0);
					}
				
				
					
				}
			}	
		},
		
		render: function(){
			
			this.loadCards()
			this.position();
			$(window).scrollTop(10);
		},
		
		
		loadCards: function(filtered,filter){
			
			var iter = counterModel.get('loadFrom');
				iter = iter +1;
			if(filtered != "active"){
				var activityCards = userActivityModel.get('dashboard');
				activityCards = activityCards['activity_cards'];
				var loadFrom = counterModel.get('loadFrom');
				var loadTo = counterModel.get('loadTo');
			
			}else{
				var activityCards = filter;
				var loadTo = activityCards.length;
				
			}
			
			var deletor = counterModel.get('deletor');
			deletor = 0;
			
			
			if(loadFrom <0){
				iter = loadFrom-loadFrom+1;
				
			}
			
			for ( var t = loadFrom ; t <= loadTo; t++){
				
				if(activityCards[t] != null){
					var activityCard = activityCards[t];
					var cardType = activityCard.card_type;
					counterModel.set({iter:iter});
					if(cardType == "lesson"){
						
						var lessonCardModel = new LessonCardModel({activityCard:activityCard});
						var lessonCardView = new LessonCardView({model:lessonCardModel});
						
					}
					else if(cardType == "assessment"){
						
						var assessmentCardModel = new LessonCardModel({activityCard:activityCard});
						var assessmentCardView = new AssessmentCardView({model:assessmentCardModel});
						
					}	
					iter= iter+1;
					counterModel.set({iter:iter});
				
				}
				deletor = deletor+1;
			}	
			
			loadFrom = loadFrom+deletor;
			loadTo = loadTo+deletor;
			counterModel.set({loadFrom:loadFrom, loadTo:loadTo, deletor:deletor});
			
		},
		
		
		position: function(){
				
			var container = document.querySelector('#test');
			var msnry = new Masonry( container, {
				transitionDuration: 0,
				itemSelector: '.act',
				columnWidth:420,
				
			});
			
				
				var offsets = $('.span-now').offset();
						
						var left = offsets.left;
				
				var iter = counterModel.get('iter');
			
				for (var i =1; i<=iter ; i++){
					
					target = ".act"+i;
					if($(target).length >0){
						if($(target).offset().left >= left-50){
							
							$(target+ ' .act-arrow').removeClass('arr-left');	
							$(target+ ' .act-arrow').addClass('arr-right');
							$(target).removeClass('margin-left');
							$(target).addClass('margin-right');
						}else{
							
							$(target+ ' .act-arrow').removeClass('arr-right');
							$(target+ ' .act-arrow').addClass('arr-left');
							$(target).removeClass('margin-right');
							$(target).addClass('margin-left');
						}
					}
				}			
			
		$('.activity-feed').height($('.activity-feed').height()+100);
		
		},
	
	})

	userActivityView = new UserActivityView()
	var activityFilterView = new ActivityFilterView();

			
		AppRouter = Backbone.Router.extend({
			routes: {
				"filter/:month/:week"								: "timelineFilter",
			},
			
			childView: activityFilterView,
			
			timelineFilter: function(month,week) {
				this.childView.timelineFilter(month,week);
				return false;
			},		
		
		});
		var appRouter = new AppRouter();
		Backbone.history.start();
	});
	


		







































