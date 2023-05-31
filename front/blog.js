const loadPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts');
      if (!response.ok) {
        throw new Error('Erro ao carregar os posts');
      }
      const data = await response.json();
      const postsArray = data.posts; // converter para um array no cliente


      if (!Array.isArray(postsArray)) {
        throw new Error('Os posts não são uma lista válida');
      }
  
      postsArray.forEach(post => {
        appendPost(post);
      });
    } catch (error) {
      console.error(error);
    }
  };
  

async function addPost() {

    const newPost = {
        "title": document.getElementById('post-title').value,
        "text": document.getElementById('post-text').value,
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
  const post = await response.json();

  const likeCountElement = document.getElementById(id).querySelector('.like-count');
  if (likeCountElement) {
    likeCountElement.innerText = post.likes;
  }
}




async function appendPost (post){
  const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const likeButton = postElement.querySelector('button')
    
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
    
  }

window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;

    loadPosts()
}

