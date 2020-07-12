var x, y;
var commentsCount = 0;
function getClickedPosition(e,thisEle){
	var imageElement = document.getElementById("image-container");
	x = event.pageX - imageElement.offsetLeft-5;
    y = event.pageY - imageElement.offsetTop-5;
    
    //element.innerHTML = element.innerHTML + '<span class="dot-note" style="position:absolute;left:'+x+'px;top:'+y+'px"></span>';
    var commentboxEle = document.getElementById("comment-box");
    commentboxEle.style.display = "block";
    commentboxEle.style.left = x;
    commentboxEle.style.top = y;
}

var loadFile = function(event) {
	var image = document.getElementById('image-uplaoded');
	image.src = URL.createObjectURL(event.target.files[0]);
	
	var url = URL.createObjectURL(event.target.files[0]);
	var img = new Image;

	img.onload = function() {
	    document.getElementById('upload-image-dimen').innerHTML = img.width+" x "+img.height;
	};
	img.src = url;
	
	var comentsContainer = document.getElementById('image-info');
	comentsContainer.style.display = "block";
	
	imageInputEle = document.getElementById('file');
	imageInputEle = imageInputEle.files[0];
	document.getElementById('upload-image-name').innerHTML = imageInputEle.name;
	document.getElementById('upload-image-type').innerHTML = imageInputEle.type;
	
};

function saveComment(){
	var addedComment = document.getElementById("input-comment").value;
	var imageElement = document.getElementById("image-container");
	imageElement.innerHTML = imageElement.innerHTML + '<span class="dot-note" data-x="'+x+'" data-y="'+y+'" data-cmt="'+addedComment+'" style="position:absolute;left:'+x+'px;top:'+y+'px"  onmouseover="showComment(event,this);" onmouseleave="hideComment(event,this);"></span>';
	
	var commentsTableEle = document.getElementById("added-coments");
	if(commentsCount == 0){
		var comentsContainer = document.getElementById('coments-container');
		comentsContainer.style.display = "block";
	}
	commentsCount++;
	commentsTableEle.innerHTML = commentsTableEle.innerHTML + '<tr><td>'+x+'</td><td>'+y+'</td><td>'+addedComment+'</td></tr>';
	
	var commentboxEle = document.getElementById("comment-box");
	commentboxEle.style.display = "none";
}

function cancelComment(){
	var commentboxEle = document.getElementById("comment-box");
	commentboxEle.style.display = "none";
}

function showComment(e,thisEle){
	var imageElement = document.getElementById("image-container");
	//var posx = event.pageX - imageElement.offsetLeft-8;
    //var posy = event.pageY - imageElement.offsetTop-8;
    
    var commentboxDisplyEle = document.getElementById("comments-display-box");
    var addedComment = thisEle.getAttribute("data-cmt");
    var posx = thisEle.getAttribute("data-x");
    var posy = thisEle.getAttribute("data-y");
    commentboxDisplyEle.innerHTML = addedComment;
    commentboxDisplyEle.style.left = parseInt(posx)+20;
    commentboxDisplyEle.style.top = parseInt(posy)+20;
    commentboxDisplyEle.style.display = "block";
}

function hideComment(e,thisEle){
	var commentboxDisplyEle = document.getElementById("comments-display-box");
	commentboxDisplyEle.innerHTML = "";
	commentboxDisplyEle.style.display = "none";
}