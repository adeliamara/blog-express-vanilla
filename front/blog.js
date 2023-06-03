
const loadPosts = async () => {
  const config = {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch('http://localhost:3000/posts', config);
  const postsArray = await response.json();
  //const postsArray = data.posts; // converter para um array no cliente


  if (!Array.isArray(postsArray)) {
    throw new Error('Os posts não são uma lista válida');
  }

  postsArray.forEach(post => {
    appendPost(post);
  });

};


async function addPost() {

  title = document.getElementById('post-title').value;
  text =  document.getElementById('post-text').value;

  const titleErrorElement = document.getElementById('title-error');
  const textErrorElement = document.getElementById('text-error');
  titleErrorElement.textContent = '';
  textErrorElement.textContent = '';


  if (!title) {
    titleErrorElement.textContent = 'Please enter a post title.';
    return;
  }

  if (!text) {
    textErrorElement.textContent = 'Please enter the post text.';
    return;
  }
  const newPost = {
    "title": title,
    "text": text,
    "likes": 0
  };


  const config = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  };

  const response = await fetch('http://localhost:3000/posts', config);
  const post = await response.json();

  appendPost(post);
  
}

async function addLike(id) {
  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  const response = await fetch(`http://localhost:3000/posts/${id}/like`, config);
  const likes = await response.json();

  const likeCountElement = document.getElementById(id).querySelector('.like-count');
  if (likeCountElement) {
    likeCountElement.innerText = likes;
  }
}

const deletePost = async (id) => {
  const config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };

  confirmed = confirm("Você quer mesmo deletar esse post?")

  if(confirmed){
    const response = await fetch(`http://localhost:3000/posts/${id}`, config);
  }

  removePost(id);
}

const removePost = async (postId) => {
  const post = document.getElementById(postId);
  post.remove();
}





function appendPost(post) {
  const template = document.getElementById('post-template');
  const postElement = document.importNode(template.content, true);
  const buttons = postElement.querySelectorAll('button')

  const likeButton = buttons[0]
  const deleteButton = buttons[1]

  const postTitle = postElement.querySelectorAll('h3')[0]
  postTitle.innerText = post.title;
  const postItens = postElement.querySelectorAll('p')
  postItens[0].innerText = post.text;
  const likeCountElement = postElement.querySelector('.like-count');
  likeCountElement.innerText = post.likes
  const article = postElement.querySelectorAll('article')[0]
  article.id = post.id

  document.getElementById('timeline').append(postElement);
  likeButton.onclick = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do evento de clique
    addLike(post.id);
  };

  deleteButton.onclick = () => {deletePost(post.id)};
}

window.onload = () => {
  const btnAddPost = document.getElementById('add-post')
  btnAddPost.onclick = addPost;

  loadPosts()
}

