const usersAPI = "https://jsonplaceholder.typicode.com/users";
const postsAPI = "https://jsonplaceholder.typicode.com/posts";

class Letter {
  async get() {
    const usersResponse = await fetch(usersAPI);
    if (!usersResponse.ok) throw new Error("failed to fetch users");
    const users = await usersResponse.json();

    const postsResponse = await fetch(postsAPI);
    if (!postsResponse.ok) throw new Error("failed to fetch posts");
    const allPosts = await postsResponse.json();

    const mergedData = users.map((user) => {
      const posts = [];
      allPosts.forEach(({ id, userId, title, body }) => {
        if (userId === user.id) {
          posts.push({
            id,
            title,
            body,
          });
        }
      });
      return {
        ...user,
        posts,
      };
    });

    return mergedData;
  }
}

function getData() {
  console.log("loading...");
  const feedback = document.getElementById('feedback');
  const letter = new Letter();
  letter
    .get()
    .then((data) => {
      feedback.innerHTML = 'status: <strong>success!</strong><br>'
      console.log(data);
    })
    .catch((error) => {
      feedback.innerHTML = 'status: <strong>fail!</strong><br>'
      console.error(error)
    })
    .finally(() => feedback.innerHTML += 'open dev tools to see the result on console')
}
