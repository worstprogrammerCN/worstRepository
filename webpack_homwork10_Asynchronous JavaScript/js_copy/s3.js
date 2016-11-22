var At_plus_container = function(){
		var click_queue = [0, 1, 2, 3, 4];
		var get_requests = [null, null, null, null, null];
		var info_bar;
		var buttons = [];
		var icon;

		var info_bar = function(){
			this.dom = $("#info-bar")[0];
			this.activated = false;
			var that = this;

			this.init = function(){
				this.activated = false;
				$(this.dom).find(".info-text").text("");
				$("#click-message").text("");
			}

			this.show_click_queue = function(click_queue){
				var click_queue_str = "";
				$.each(click_queue, function(index, element){
					click_queue_str += $(buttons[click_queue[index]].dom).find(":not(.unread)").text();
				})
				$("#click-message").text(click_queue_str);
			}

			$(this.dom).on("all_buttons_get_its_number", function(){
				that.activated = true;
				$(that.dom).click();
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

			var all_buttons_clicked = function(){
				for(var i = 0; i < buttons.length; i++)
					if (!buttons[i].clicked)
						return false;
				return true;
			}

			var all_buttons_get_its_number = function(){
				for(var i = 0; i < buttons.length; i++){
					if (!buttons[i].has_number)
						return false;
				}
				return true;
			}


			var button_activated_on_click = function(){
				var index_in_click_queue = click_queue.indexOf($(this.dom).index());
				console.log($(this.dom).index());
				console.log(index_in_click_queue);
				this.waiting = true;
				this.clicked = true;
				if (all_buttons_clicked())
					disable_all_button();
				add_waiting_tag();
				var get_request = $.get("http:127.0.0.1:8000/?date=" + (new Date()).getTime(), function(data, status){
					console.log(status);
					if (status == "success"){
						that.has_number = true;
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

			
			$(this.dom).on("all_buttons_clicked", function(){
				disable_all_button();
			})
			
		}

		var Icon = function(){
			this.dom = $(".icon")[0];
			var that = this;
			this.click_each_button = function(){
				$.each(buttons, function(index, element){
					$(element.dom).click();
				})
			}

			var stop_all_ajax = function(){
				$.each(get_requests, function(index, element){
					if (!!element)
						element.abort();
				})
			}

			$(this.dom).on("mouseout", function(){
				for(var i = 0; i < buttons.length; i++)
					buttons[i].init();

				info_bar.init();
				stop_all_ajax();
			});

			$(this.dom).on("click", function(){
				info_bar.show_click_queue(click_queue);
				that.click_each_button();
			})
		}

		for(var i = 0; i < 5; i++)
			buttons.push(new Button(i + 1));

		info_bar = new info_bar();
		icon 	 = new Icon();

	}

	$(function(){
		new At_plus_container();
	})