function createPostElement(data) {
    const post = document.createElement("div");
    post.className = "post";
  
    const header = document.createElement("h2");
    header.textContent = data["title"];
    post.appendChild(header);
  
    const content = document.createElement("p");
    content.textContent = data["content"];
    post.appendChild(content);
  
    const remove = document.createElement("button");
    remove.id = data["id"];
    remove.textContent = "x";
    remove.addEventListener("click", deletePost);
    post.appendChild(remove);
  
    return post;
  }
  
  async function deletePost(e) {
    const postId = e.target.id;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
  
    const response = await fetch(
      `http://localhost:3000/posts/${postId}`,
      options
    );
  //   const data = await response.json();
    console.log(response);
    if (response.status == 200) {
      window.location.reload();
    } else {
      alert(data);
    }
  }
  
  document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const form = new FormData(e.target);
  
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.get("title"),
        content: form.get("content"),
      }),
    };
  
    const result = await fetch("http://localhost:3000/posts", options);
  
    if (result.status == 201) {
      window.location.reload();
    }
  });
  
  async function loadPosts() {
    const options = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    const response = await fetch("http://localhost:3000/posts", options);
  
    if (response.status == 200) {
      const posts = await response.json();
  
      const container = document.getElementById("posts");
      posts.forEach((p) => {
        const elem = createPostElement(p);
        container.appendChild(elem);
      });
    } else {
      window.location.assign("./index.html");
    }
  }
  
  loadPosts();
  