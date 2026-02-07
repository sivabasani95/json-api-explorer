// so much empty
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");

const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

/* ---------------------------
   FETCH AND DISPLAY POSTS
---------------------------- */
fetchButton.addEventListener("click", async () => {
  postList.innerHTML = "Loading...";
  errorDiv.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();
    postList.innerHTML = "";

    posts.slice(0, 10).forEach(post => {
      const postDiv = document.createElement("div");

      postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <hr />
      `;

      postList.appendChild(postDiv);
    });
  } catch (error) {
    postList.innerHTML = "";
    errorDiv.textContent = error.message;
  }
});

/* ---------------------------
   CREATE A NEW POST (POST)
---------------------------- */
postForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formError.textContent = "";
  formSuccess.textContent = "";

  const newPost = {
    title: titleInput.value,
    body: bodyInput.value
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    const data = await response.json();

    formSuccess.textContent = `Post created! ID: ${data.id}`;
    postForm.reset();
  } catch (error) {
    formError.textContent = error.message;
  }
});
