var At_plus_container = function(){
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
			$(that.dom).find(".info-text").text("" + total);
			this.activated = false;
		});
	}

	var Button = function(index){
		this.dom = $("#control-ring .button:nth-of-type(" + index + ")")[0];
		this.waiting = false;
		this.has_number = false;
		this.number;
		var that = this;

		this.init = function(){
			this.waiting = false;
			this.has_number = false;
			$(this.dom).removeClass("disabled").addClass("activated");
			$(this.dom).find(".unread").remove();
			
		}

		var add_waiting_tag = function(){
			var tag = $("<div></div>").addClass("unread").text("...");
			$(that.dom).append(tag);
		}

		var disable_other_button = function(){
			$(that.dom).prevAll().removeClass("activated").addClass("disabled");
			$(that.dom).nextAll().removeClass("activated").addClass("disabled");
		}

		var tag_display_number = function(data){
			$(that.dom).children(".unread").text(data);
		}

		var activate_other_button = function(){
			$(that.dom).prevAll().removeClass("disabled").addClass("activated");
			$(that.dom).nextAll().removeClass("disabled").addClass("activated");
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
			add_waiting_tag();
			disable_other_button();
			$.get("http:127.0.0.1:8000/", function(data, status){
				console.log(status);
				if (status == "success"){
					that.has_number = true;
					that.number = parseInt(data);
					tag_display_number(data);
					$(that.dom).removeClass("activated").addClass("disabled");
					activate_other_button();
					if (all_buttons_get_its_number())
						$("#info-bar").trigger("all_buttons_get_its_number");
				}
				else {
					alert("连接失败");
					return;
				}
			});
		}

		$(this.dom).on("click", function(){
			console.log("clicked");
			if (this.waiting)
				return;
			if ($(this).hasClass("disabled"))
				return;
			if ($(this).hasClass("activated"))
				button_activated_on_click.bind(that)();

		});
		
	}

	var Icon = function(){
		this.dom = $(".icon")[0];
		$(this.dom).on("mouseout", function(){
			for(var i = 0; i < buttons.length; i++)
				buttons[i].init();

			info_bar.init();
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