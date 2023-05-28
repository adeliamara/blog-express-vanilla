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


appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);

    const postTitle = postElement.querySelectorAll('h3')[0]
    postTitle.innerText = post.title;
    const postItens = postElement.querySelectorAll('p')
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";

    document.getElementById('timeline').append(postElement);
}

window.onload = () => {
    const btnAddPost = document.getElementById('add-post')
    btnAddPost.onclick = addPost;
    loadPosts()
}

