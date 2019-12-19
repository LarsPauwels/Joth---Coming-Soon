var feed = document.getElementById("facebook_feed");
var url = "https://graph.facebook.com//v5.0/100501821357714/feed?fields=id,message,story,created_time,attachments{media,type,subattachments}&access_token=";
var key = "EAAjIZBHeEFjMBAAVsMvqaE5A0fAKZAtKS3XYpTASdB7EV4ZCZCgxQcyudkBtlg8mMCsY8iLGmNraLV6pTuRx27ZAZAMvc30A9dZAVXxLIWYcGCNfw9XzFZBjZCx8tdMACdi2WpY5J7aEcjm53HQbrgUthvhQ6MJw1mOnuppUkA2gZCuQZDZD";

getPosts();

function getPosts() {
	fetch(url+key)
	.then(response => response.json())
	.then(data => {
	    addPosts(data.data);
	});
}

function addPosts(data) {
	for(var i = 0; i < data.length; i++){

		feed.innerHTML += '<article class="facebook_post" data-id="'+i+'"></article>';

		if (data[i].attachments != undefined) {
			if (data[i].attachments.data[0].subattachments != undefined) {
				var container = document.querySelector("[data-id='"+i+"']");
				container.innerHTML += '<div class="facebook_post_image" style="background-image: url('+data[i].attachments.data[0].subattachments.data[0].media.image.src+'); background-position: center center; background-size: cover;">';
			}

			if (data[i].attachments.data[0].media != undefined) {
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