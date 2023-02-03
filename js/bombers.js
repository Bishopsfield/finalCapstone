let links = [];
let comments = [];

function loadSite() {
  if (localStorage.getItem("links") === null) { // no saved links
    localStorage.setItem("links", JSON.stringify(links)); // create local storage item
  }
  else {
    links = JSON.parse(localStorage.getItem("links"));
  }

  if (localStorage.getItem("comments") === null) { // no saved comments
    localStorage.setItem("comments", JSON.stringify(comments)); // create local storage item
  }
  else {
    comments = JSON.parse(localStorage.getItem("comments"));
  }
}

function displayLinks() { // called on loading links page
  //Get the array of links from Local Storage
  links = JSON.parse(localStorage.getItem("links"));
  let linkList = document.getElementById("savedLinks"); // ul on links page
  let i = 0;
  links.forEach(function(l) {
      // add each link to HTML list
      newItem = document.createElement("li"); // list element
      // tag = document.createElement("a"); // anchor
      // tag.setAttribute("href", l.link);
      // tag.innerText = l.name;
      newItem.innerHTML = l.link;
      // newItem.appendChild(tag);
      linkList.appendChild(newItem);
  })
}

function displayComments() { // called on loading comments page
  //Get the array of comments from Local Storage
  comments = JSON.parse(localStorage.getItem("comments"));
  let commentList = document.getElementById("commentList"); // ul on comments page
  let i = 0;
  comments.forEach(function(c) {
      // add each comment to HTML list
      newItem = document.createElement("li"); // list element
      newItem.textContent = c.comment;
      commentList.appendChild(newItem);
  })
}



// Constructor for new saved links
function Link(name, link) {
  this.name = name;
  this.link = link;
}

// Constructor for new comment
function Comment(key, comment) {
  this.comment = comment;
  this.key = key;
}


function addLink(name, link) {
  // retreieve links array
  links = JSON.parse(localStorage.getItem("links"));
  
  // create new link from passed parameters
  let newLink = new Link(name, link);
  
  // add the new link to links array
  links.push(newLink);
  
  // save to local storage
  localStorage.setItem("links", JSON.stringify(links));

  // update user
  alert(`You have saved ${links.length} item(s) for later`);
}

  // Create event listener for all link clicks
  Array.from(document.getElementsByClassName("linkit")).forEach(link => {
    link.addEventListener('click', (e) => {
      let targetId = e.target.attributes["idref"].value;
      // if (e.target.parentNode.nodeName == "P"){ //paragraph
      //   targetData = e.target.parentNode.childNodes[0]; // text of parent <p> tag
      // }
      // else if (e.target.parentNode.nodeName == "FIGCAPTION") { // picture
      //   targetData = e.target.parentNode.parentNode.childNodes[1].src; // img url
      // }
      let targetElement = document.getElementById(targetId).cloneNode(true);
      if (targetElement.tagName=="IMG") { //adjust image path if necessary
        if (targetElement.attributes["src"].nodeValue.substring(0,2) != "..") {
          targetElement.attributes["src"].nodeValue = "." + targetElement.attributes["src"].nodeValue;
        }
      }
      let targetData = targetElement.outerHTML;
      // e.g. targetData.outerHTML == <img id="memorial" src="images/memorial.jpg" class="responsive" alt="Bomber Command Memorial, Green Park, London">
      if (targetData != "") {
        addLink(targetId, targetData); // add to array and HTML list
      }
    });
  });

  // add new comment
  function thanks() {
    comments = JSON.parse(localStorage.getItem("comments"));
    newCommentKey = comments.length.toString(); // unique key
    newComment = new Comment (newCommentKey, document.getElementById("comment").value);
    comments.push(newComment);
    
    // save to local storage
    localStorage.setItem("comments", JSON.stringify(comments));
    alert("Thanks for your comment");
    location.reload(); // refresh page
  }
  
  // thanks for comment
  function thanksForContact() {
    alert(`Thanks for contacting me. I will get back to you as soon as I can.`);
  }