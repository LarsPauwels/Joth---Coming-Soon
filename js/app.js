var feed = document.getElementById("facebook_feed");
var url = "https://graph.facebook.com//v5.0/100501821357714/feed?fields=id,message,story,created_time,attachments{media,type,subattachments}&access_token=";
var key = "EAAjIZBHeEFjMBAJXShZASedzKaUZBpw3OvDQUfx4b6lbcRYbWLHsVOoUhiaUqxWRojrZBSd8EYBagkXhTT9qpV665G1GK3fytTWGBTtyW5maweezch08WWP48Bdki5KRZC3EFgyPzUZBHVV7ZAURvg536h01VviKGos6gqgDmdm3yo2ZADMWBFPOVH2an1VhmXDZAS8l2YwA9FQZDZD";

getPosts();

function getPosts() {
	fetch(url+key)
	.then(response => response.json())
	.then(data => {
		console.log(data);
	    addPosts(data.data);
	});
}

function addPosts(data) {
	for(var i = 0; i < data.length; i++){
		console.log(i);

		feed.innerHTML += '<article class="facebook_post" data-id="'+i+'"></article>';

		if (data[i].attachments != undefined) {
			console.log("test")
			if (data[i].attachments.data[0].subattachments != undefined) {
				console.log("test")
				var container = document.querySelector("[data-id='"+i+"']");
				container.innerHTML += '<div class="facebook_post_image" style="background-image: url('+data[i].attachments.data[0].subattachments.data[0].media.image.src+'); background-position: center center; background-size: cover;">';
			}

			if (data[i].attachments.data[0].media != undefined) {
				console.log("yes")
				var container = document.querySelector("[data-id='"+i+"']");
				container.innerHTML += '<div class="facebook_post_image" style="background-image: url('+data[i].attachments.data[0].media.image.src+'); background-position: center center; background-size: cover;">';
			}
		}

		if (data[i].message != undefined) {
			var container = document.querySelector("[data-id='"+i+"']");
			container.innerHTML += '<p>'+data[i].message+'</p>';
		}
	}
}