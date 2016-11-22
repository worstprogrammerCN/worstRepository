$(function(){

	var init_info_bar = function($info_bar){
		$info_bar.data("activated", false);
		$info_bar.find(".info-text").text("");
		$("#click-message").text("");
	}

	var show_click_queue = function(click_queue){
		var click_queue_str = "";
		$.each(click_queue, function(index, element){
			click_queue_str += $(".button:eq(" + click_queue[index] + ")").find(":not(.unread)").text();
		})
		show_message(message);
	}

	var show_message = function(message){
		$("#click-message").text(message);
	}

	$("#info-bar").on("all_buttons_get_its_number", function(event, current_sum){
		$(this).data("activated", true).trigger("click", current_sum);
	});

	var init_button = function($button){
		$button.data("waiting", false).data("has_number", false)
		.removeClass("disabled").addClass("activated")
		.find(".unread").remove();
	}

	var add_waiting_tag = function(){
		var tag = $("<div></div>").addClass("unread").text("...");
		$(this).append(tag);
	}
	var disable_all_button = function(){
		$(".button").removeClass("activated").addClass("disabled");
	}

	var tag_display_number = function(data){
		$(this).children(".unread").text(data);
	}

	var activate_other_button = function(){
		$(".button").each(function(index, element){
			var $button = $(element);
			if (!$button.data("has_number"))
				$button.removeClass("disabled").addClass("activated");
		});
	}

	var all_buttons_clicked = function(){
		var flag = true;
		$(".button").each(function(index, element){
			var $button = $(element);
			if (!$button.data("clicked"))
				return flag = false;
		})
		return flag;
	}

	var all_buttons_get_its_number = function(){
		var flag = true;
		$(".button").each(function(index, element){
			var $button = $(element);
			console.log($button.data("has_number"));
			if (!$button.data("has_number")){
				console.log("jump out");
				return flag = false;
			}
		})
		return flag;
	}

	var execute_success = function(){
		//return Math.random() > 0.5;
		return false;
	}

	var a_handler = function(event, click_queue, index, current_sum, request_queue){
		var that = this;
		$(this).data("waiting", true).data("activated", true);
		add_waiting_tag.call(this);
		disable_all_button();
		var request = $.get("http://127.0.0.1:8000/?data=" + (new Date()).getTime(), function(data, status){
			try{
				$(".icon").data("request_queue")[0] = null;
				current_sum += parseInt(data);
				$(that).data("has_number", true)
				.data("number", parseInt(data));
				tag_display_number.call(that, data);
				if (!execute_success())
					throw {
						"message" : "A:这不是个天大的秘密", 
						"current_sum" : current_sum
					}
				show_message("A:这是个天大的秘密");
				activate_other_button();

				if (all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
				else
					$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
			}catch(error){
				error_handler.call(this, click_queue, index, error.message, error.current_sum);
			}
		});
		$(".icon").data("request_queue")[0] = request;

	};

	var b_handler = function(event, click_queue, index, current_sum, request_queue){
		var that = this;
		$(this).data("waiting", true).data("activated", true);
		add_waiting_tag.call(this);
		disable_all_button();
		var request = $.get("http://127.0.0.1:8000/?data=" + (new Date()).getTime(), function(data, status){
			try{
				$(".icon").data("request_queue")[1] = null;
				current_sum += parseInt(data);
				$(that).data("has_number", true)
				.data("number", parseInt(data));
				tag_display_number.call(that, data);
				if (!execute_success())
					throw {
						"message" : "B:我知道", 
						"current_sum" : current_sum
					}
				show_message("B：我不知道");
				activate_other_button();

				if (all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
				else
					$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
			}catch(error){
				error_handler.call(this, click_queue, index, error.message, error.current_sum);
			}
		});
		$(".icon").data("request_queue")[1] = request;
	}

	var c_handler = function(event, click_queue, index, current_sum, request_queue){
		var that = this;
		$(this).data("waiting", true).data("activated", true);
		add_waiting_tag.call(this);
		disable_all_button();
		var request = $.get("http://127.0.0.1:8000/?data=" + (new Date()).getTime(), function(data, status){
			try{
				$(".icon").data("request_queue")[2] = null;
				current_sum += parseInt(data);
				$(that).data("has_number", true)
				.data("number", parseInt(data));
				tag_display_number.call(that, data);
				if (!execute_success())
					throw {
						"message" : "C：你知道", 
						"current_sum" : current_sum
					}
				show_message("C：你不知道");
				activate_other_button();

				if (all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
				else
					$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
			}catch(error){
				error_handler.call(this, click_queue, index, error.message, error.current_sum);
			}
		});
		$(".icon").data("request_queue")[2] = request;
	}

	var d_handler = function(event, click_queue, index, current_sum, request_queue){
		var that = this;
		$(this).data("waiting", true).data("activated", true);
		add_waiting_tag.call(this);
		disable_all_button();
		var request = $.get("http://127.0.0.1:8000/?data=" + (new Date()).getTime(), function(data, status){
			try{
				$(".icon").data("request_queue")[3] = null;
				current_sum += parseInt(data);
				$(that).data("has_number", true)
				.data("number", parseInt(data));
				tag_display_number.call(that, data);
				if (!execute_success())
					throw {
						message : "D：他知道", 
						current_sum : current_sum
					}
				show_message("D：他不知道");
				activate_other_button();

				if (all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
				else
					$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
			}catch(error){
				error_handler.call(this, click_queue, index, error.message, error.current_sum);
			}
		});
		$(".icon").data("request_queue")[3] = request;
	}

	var e_handler = function(event, click_queue, index, current_sum, request_queue){
		var that = this;
		$(this).data("waiting", true).data("activated", true);
		add_waiting_tag.call(this);
		disable_all_button();
		var request = $.get("http://127.0.0.1:8000/?data=" + (new Date()).getTime(), function(data, status){
			try{
				$(".icon").data("request_queue")[4] = null;
				current_sum += parseInt(data);
				$(that).data("has_number", true)
				.data("number", parseInt(data));
				tag_display_number.call(that, data);
				if (!execute_success())
					throw {
						message : "E：才不怪", 
						current_sum : current_sum
					}
				show_message("E：才怪");
				activate_other_button();

				if (all_buttons_get_its_number())
					$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
				else
					$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
			}catch(error){
				error_handler.call(this, click_queue, index, error.message, error.current_sum);
			}
		});
		$(".icon").data("request_queue")[4] = request;
	}

	var bubble_handler = function(event, current_sum){
		try{
			if (!execute_success())
				throw new Error("大气泡：楼主异步调用战斗力感人，目测超过" + current_sum);
			show_message("大气泡：楼主异步调用战斗力感人，目测不超过" + current_sum);
			$(".button").each(function(index, element){
				init_button($(element));
			})

		}catch(error){
			bubble_error_handler(error.message);
		}
	}

	var error_handler = function(click_queue, index, message, current_sum){
		show_message(message);
		activate_other_button();
		if (all_buttons_get_its_number())
			$("#info-bar").trigger("all_buttons_get_its_number", current_sum);
		else
			$(".button:eq(" + click_queue[index + 1] + ")").trigger("click", [click_queue, index + 1, current_sum]);
	}

	var bubble_error_handler = function(message){
		show_message(message);
		$(".button").each(function(index, element){
			init_button($(element));
		})
	}

	$(".button:eq(0)").click(a_handler);
	$(".button:eq(1)").click(b_handler);
	$(".button:eq(2)").click(c_handler);
	$(".button:eq(3)").click(d_handler);
	$(".button:eq(4)").click(e_handler);
	$("#info-bar").click(bubble_handler);
	$(".icon").click(function(){
		$(".icon").data("request_queue", [null, null, null, null, null]);
		var click_queue = [0, 1, 2, 3, 4];
		click_queue.sort(function(){
			return 0.5 - Math.random();
		});
		$(".button:eq(" + click_queue[0] + ")").trigger("click", [click_queue, 0, 0]) // 点击队列中第0个对应的序号的按钮
	}).on("mouseon mouseout", function(){
		console.log($(".icon").data("request_queue"));
		$.each($(".icon").data("request_queue"), function(index, element){
			if (!!element)
				element.abort();
		})
		init_info_bar($("#info-bar"));
		$(".button").each(function(index, element){
			init_button($(element));
		})
	})
	})