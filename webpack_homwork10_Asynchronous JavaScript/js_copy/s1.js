var At_plus_container = function(){
		var info_bar;
		var buttons = [];
		var get_requests = [null, null, null, null, null];
		var icon;

		var info_bar = function(){
			this.dom = $("#info-bar")[0];
			this.activated = false;
			var that = this;

			this.init = function(){
				this.activated = false;
				$(this.dom).find(".info-text").text("");
			}

			$(this.dom).bind("all_buttons_get_its_number", function(){
				that.activated = true;
			});

			$(this.dom).on("click", function(){
				var total = 0;
				if (!that.activated)
					return;
				for(var i = 0; i < buttons.length; i++)
					total += buttons[i].number;
				$(that.dom).find(".info-text").text("" + total); // 显示计算的和
				$.each(buttons, function(index, element){
					element.init();
				});
				this.activated = false;
			});
		}

		var Button = function(index){
			this.dom = $("#control-ring .button:nth-of-type(" + index + ")")[0];
			this.waiting = false;
			this.clicked = false;
			this.has_number = false;
			this.number;
			var that = this;

			this.init = function(){
				this.waiting = false;
				this.clicked = false;
				this.has_number = false;
				$(this.dom).removeClass("disabled").addClass("activated");
				$(this.dom).find(".unread").remove();
			}

			var add_waiting_tag = function(){
				var tag = $("<div></div>").addClass("unread").text("...");
				$(that.dom).append(tag);
			}

			var disable_all_button = function(){
				$.each(buttons, function(index, element){
					$(element.dom).removeClass("activated").addClass("disabled");
				})
			}

			var tag_display_number = function(data){
				$(that.dom).children(".unread").text(data);
			}

			var activate_other_button = function(){
				$.each(buttons, function(index, element){
					if (!element.clicked)
						$(element.dom).removeClass("disabled").addClass("activated");
				})
			}

			var all_buttons_get_its_number = function(){
				for(var i = 0; i < buttons.length; i++){
					if (!buttons[i].has_number)
						return false;
				}
				return true;
			}

			var button_activated_on_click = function(){
				this.waiting = true;
				var index = $(this.dom).index();
				add_waiting_tag();
				disable_all_button();
				var get_request = $.get("http:127.0.0.1:8000/", function(data, status){
					console.log(status);
					if (status == "success"){
						that.has_number = true;
						that.clicked = true;
						that.number = parseInt(data);
						get_requests[index] = null;
						tag_display_number(data);
						activate_other_button();
						if (all_buttons_get_its_number())
							$("#info-bar").trigger("all_buttons_get_its_number");
					}
					else {
						alert("连接失败");
						return;
					}
				});
				get_requests[index] = get_request;
			}

			$(this.dom).on("click", function(){
				console.log("clicked");
				if ($(this).hasClass("disabled"))
					return;
				if ($(this).hasClass("activated"))
					button_activated_on_click.bind(that)();

			});
			
		}

		var Icon = function(){
			this.dom = $(".icon")[0];

			var stop_all_ajax = function(){
				$.each(get_requests, function(index, element){
					if (!!element)
						element.abort();
				})
			}

			$(this.dom).on("mouseout mouseon", function(){
				for(var i = 0; i < buttons.length; i++)
					buttons[i].init();

				info_bar.init();
				stop_all_ajax();
			});
		}

		for(var i = 0; i < 5; i++)
			buttons.push(new Button(i + 1));

		info_bar = new info_bar();
		icon 	 = new Icon();

	}

	$(function(){
		new At_plus_container();
	})