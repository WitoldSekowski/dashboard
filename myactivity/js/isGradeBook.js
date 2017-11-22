function loadGradeBook(tile){
	GradeBookModel = Backbone.Model.extend({});
	
	var gradeBookModel = new GradeBookModel({tile:tile});
	
	GradeBookView = Backbone.View.extend({
		
		el: '.grade-book',
		model: gradeBookModel,
	
		render: function(){
			
			data = this.model.get("tile");
			console.log(data["tileData"]['assignments']);
			template = $('#grade-book-template');
			percentile = data["tileData"]['assignments']["assignmentPercentile"];
			grades = data["tileData"]['assignments']["recentGrades"];
			practice = data["tileData"]['assignments']["practicePerformance"];
			count = data["tileData"]['assignments']['upcoming']["count"];
			dueDate = data["tileData"]['assignments']['upcoming']["dueDate"];
			
			var percentileVal = Number(percentile.replace(/[^\d.,]+/,''));
  			var rest = 100 - percentileVal;
  			
			this.$el.append(_.template(template.html(), {count: count, dueDate:dueDate}));	
			this.renderCharts(percentileVal, rest, grades);
	
		},
		
		initialize: function(){
			this.render();
		},
		
		renderCharts: function(percentileVal, rest, grades){
			
			 $('#bar-chart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        credits: {
			      enabled: false
			  },
	        title: {
	            text: 'Recently graded',
	            style:{
	            	color:'#7e7e7e',
	            	fontSize:12,
	            	fontFamily:"open sans semibold",
	            }
	        },
	        xAxis: {
	            title: {
	            	text: 'Assignments',
	            	style: {
								color: '#7e7e7e',
								fontFamily:"open sans semibold",
							},
	            },
	             categories: [
	                    'Homework #1',
	                    'Homework #2',
	                    'Homework #3',
	                    'Homework #4',
	                    'Homework #5',
	                ],
	            
	            tickWidth:0,
	            lineWidth:0,
	            labels:
						{
						  enabled: false
						},
			},
	        yAxis: {
	            title: {
	                text: 'Score (%)',
	                style: {
								color: '#7e7e7e',
								fontFamily:"open sans semibold",
							},
					offset:30,
	            },
	            labels:{
	            	style: {
	            		color:'#939393',
	            	},
	            },
	            offset:5,
	            max: 100,
	            tickWidth:1,
	            tickInterval:25,
	            tickColor:'#aeaeae',
	            lineColor: '#aeaeae',
	            lineWidth:1,
	            gridLineWidth:0,
	        },
	        series: [{
	            name: 'Homework #1',
	            data: grades,
	             
	        }],
	       
	       plotOptions:{
	       	column: {
	        	pointPadding:0,
	        	pointWidth: 35,
	        	borderRadius:5,
	        	color:'#63a4cc',
	        }
	       },
	       
	       tooltip:{
	       	pointFormat:'',
	       	backgroundColor: '#4c4c4c',
	       	borderColor:'#4c4c4c',
	       	style:{
	       		color:'#ffffff',
	       	},
	       	
	       },   
	    });
	   
	
	 
	    var share = [{
	        name: 'point3',
	        y: 100,
	        color: '#63a4cc'
	    }];
	
		
	  var chart = new Highcharts.Chart({
	  	
	        chart: {
	            renderTo: 'donut-chart',
	            type: 'pie',
	            margin: [0, 0, 0, 20],
		        spacingTop: 0,
		        spacingBottom: 0,
		        spacingLeft: 50,
		        spacingRight: 0,
	        },
	        title:{
	        	text: 'Percentile Rank',
	        	style:{
	            	color:'#7e7e7e',
	            	fontSize:12,
	            	fontFamily:"open sans semibold",
	           },
	           x:-15,
	        	
	        },
			tooltip:{
			enabled: false,
			},
	        plotOptions: {
	            pie: {
	                pointWidth: '2',
	                borderWidth: 0,
	                dataLabels: {
	           				enabled: false
	        		},
	        		states: {
							hover: {
								enabled: false
							},
							},
				},
	        },
	        series: [{
	            color: '#FF00FF',
	            name: 'Total',
	            size: '70%',
	            
	            data: [{
					        name: 'point2',
					        y: percentileVal,
					        color: '#7cb7db'
					    }, {
					        name: 'point1',
					        y: rest,
					        color: '#ffffff'
					    }],
	            
	        }, {
	            name: 'share',
	            color: '#FF0012',
	            size: '50%',      
	            startAngle: 90,
	            data: share,
	            
	        }],
	         credits: {
	      enabled: false
	  },
	   
	    },
	  
	    function(chart) {
	
		    var circleradius = 102;
		    
			chart.innerText = chart.renderer.text(percentileVal, 90, 115).css({
		            width: circleradius*2,
		            color: '#ffffff',
		            fontSize: '36px',
		            textAlign: 'center'
		      }).attr({
		            zIndex: 999
		        }).add();
		        chart.innerText = chart.renderer.text('%', 137, 114).css({
		            width: circleradius*2,
		            color: '#ffffff',
		            fontSize: '18px',
		            textAlign: 'center'
		      }).attr({
		            zIndex: 999
		        }).add();
	
		});	
		}
	})
	
	var gradeBookView = new GradeBookView();

}



