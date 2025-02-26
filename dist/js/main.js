let postContent = document.getElementById("post");
let current_page = 1;
let last_page = 1;

window.addEventListener("scroll", function () {
  // const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  // if (endOfPage && current_page < last_page ) {
  //   current_page = current_page+1
  //    getPosts(current_page+1)
  // }
});

function getPosts(page = 1){
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
  .then(function (response) {
    let posts = response.data.data;
    last_page = response.data.meta.last_page;
    for (const post of posts) {
        let title = (post.title === null || post.title === "null") ? "Title" : post.title;

        let tags = post.tags.map(tag => 
          `<div class="bg-red-400 rounded-2xl px-5 py-1">${tag}</div>`
      ).join(''); 

        let element = `<div class="post-infos bg-white rounded-xl py-5 px-16 shadow-xl mb-7">
                    <div class="user-post flex gap-5">
                        <img src="images/person-1824144_1280.png" class="w-14">
                        <div class="username">
                            <div class="font-bold">${post.author.name}</div>
                            <div class="text-slate-400 font-bold text-sm py-1">${post.created_at}</div>
                        </div>
                    </div>
                    <img src="${post.image}" class="rounded-xl mt-5 mb-5 h-[600px] w-full " alt="">
                    <div class="post-title font-bold text-xl">${title}</div>
                    <div class="post-description mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur illo quibusdam dolorem blanditiis, odit, iusto accusamus quis quas repudiandae iure
                        exercitationem consequatur ducimus minus magnam ipsum nemo? Itaque, architecto quaerat.</div>
                    <i class="fa-solid fa-comments fa-xl" style="color: #000000;"></i> <span><a href=""
                            class="font-bold px-2"> (${post.comments_count}) Comments</a></span>
                    <div class="tags flex gap-5 py-4">
                        ${tags} <!-- Insert the dynamic tags here -->
                    </div>
                </div>`;

                 // Convert the string into a DOM element
                 let tempDiv = document.createElement('div'); // Temporary container
                 tempDiv.innerHTML = element.trim(); // Convert the string to DOM elements

                 // Append the first child (the actual new element) to the parent
                 postContent.appendChild(tempDiv.firstChild);
    }
    // console.log(posts);
  })
  .catch(function (error) {
    // en cas d’échec de la requête
    console.log(error);
  })
}

getPosts()

function userLogin(){

  let username = document.getElementById("username").value
  let password = document.getElementById("password").value


  axios.post('https://tarmeezacademy.com/api/v1/login', {
    "username": username,
    "password": password
  })
  .then(function (response) {
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    document.getElementById("modal").classList.add("hidden");
    // Remove URL parameters after successful login
    // if (window.history.replaceState) {
    //   window.history.replaceState(null, '', window.location.pathname); // Removes query parameters
    // }
    setupUI()
    showAlert("user logged in successfully","#84cc16")
    // location.reload();
    console.log(response.data.token);
  })
  .catch(function (error) {
    let errorMessage = error.response.data.message;
    showAlert(errorMessage,"red")
    console.log(errorMessage);
  });
}

function showLoginAlert() {
  const alert = document.getElementById('alert');
  alert.classList.remove('opacity-0', 'pointer-events-none');
  alert.classList.add('opacity-100', 'pointer-events-auto');
}

function showLogoutAlert() {
  const alert2 = document.getElementById('alert2');
  alert2.classList.remove('opacity-0', 'pointer-events-none');
  alert2.classList.add('opacity-100', 'pointer-events-auto');
}

// function hideAlert() {
//   const closeAlertBtn = document.getElementById('closeAlert');
//   // Fermer l'alerte
//   closeAlertBtn.addEventListener('click', () => {
//     alert.classList.remove('opacity-100', 'pointer-events-auto');
//     alert.classList.add('opacity-0', 'pointer-events-none');
// });
// }

// very important function who contains generale concepts
function setupUI() {
  if (localStorage.getItem("token") != null) {
    const userData = localStorage.getItem("user")
  
    // Parse the JSON string into an object
    const userObject = JSON.parse(userData);
    // show Logout Div & Hide Login Div
    document.getElementById("login").style.setProperty("display","none")
    document.getElementById("logout").style.setProperty("display","flex")

    // Fill profile bar by user data
    document.getElementById("current_username").textContent =userObject.username;
    document.getElementById("user-text").textContent =userObject.username;
    let user_email = (userObject.email === null || userObject.email === "null") ? "user@company.com" : userObject.email;
    document.getElementById("current_email").textContent = user_email;
    let user_image = (userObject.profile_image === null || userObject.profile_image === "null") ? "images/person-1824144_1280.png" : userObject.profile_image;
    document.getElementById("nav_image").src = user_image;

    // show add post button
    document.getElementById("open-modal-post-btn").classList.remove("hidden");

  } else{
    // show login Div & Hide LOgout Div
    document.getElementById("login").style.setProperty("display","block")
    document.getElementById("logout").style.setProperty("display","none")

    // remove user data from profile bar
    document.getElementById("current_username").textContent ="Username";
    document.getElementById("current_email").textContent = "user@company.com";

    // show add post button
    document.getElementById("open-modal-post-btn").classList.add("hidden");

  }
}
setupUI()

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setupUI()
  showAlert("user logouted successfully","#a855f7")
  // showLogoutAlert()
}

// function userRegister() {
//   let name = document.getElementById("register-name").value
//   let username = document.getElementById("register-username").value
//   let password = document.getElementById("register-password").value

//   axios.post('https://tarmeezacademy.com/api/v1/register', {
//     "name": name,
//     "username": username,
//     "password": password
//   })
//   .then(function (response) {
//     localStorage.setItem("token",response.data.token)
//     localStorage.setItem("user",JSON.stringify(response.data.user))
//     document.getElementById("modal-register").classList.add("hidden");
    
//     setupUI()
//     showLoginAlert()
//   //  hideAlert()
//   console.log(name,username,password);
//     console.log(response.data.token);
//   })
//   .catch(function (error) {
//     let errorMessage = error.response.data.message
//     console.log(errorMessage);
//   });
// }

// function createNewPost(){
//   let post_title = document.getElementById("post-title").value
//   let post_description = document.getElementById("post-description").value
  
//   axios.post('https://tarmeezacademy.com/api/v1/posts', {
//     "title": post_title,
//     "body": post_description,
//   },{
//     headers : {
//       "authorization" : `Bearer ${localStorage.getItem("token")}`
//     }
//   })
//   .then(function (response) {
//     console.log(response)
//     document.getElementById("modal-post").classList.add("hidden");
//     showAlert("post created successfully","#3b82f6");
//     })
//   .catch(function (error) {
//     let errorMessage = error.response.data.message
//     showAlert(errorMessage,"red");
//     console.log(errorMessage);
//   });
//   //console.log("post add btn")
// }

// document.getElementById('form-post').addEventListener('submit', createNewPost());
//  document.getElementById('submit-post').addEventListener('click', createNewPost);

function createNewPost() {
  
  let post_name = document.getElementById("post-name").value;
  let post_body = document.getElementById("post-body").value;
  let post_image = document.getElementById("post-image").files[0]; // Assuming you have an <input type="file" id="post-image">

  console.log("Response received:", post_name,post_body);
  
  // Create FormData instance to send form data and image
  let formData = new FormData();
  formData.append("title", post_name);
  formData.append("body", post_body);

  // Append the image to the form data if it exists
  if (post_image) {
    formData.append("image", post_image); // Adjust the field name ("image") as required by the API
  }

  // Get token from localStorage
  let token = localStorage.getItem("token");

  // Send POST request with FormData
  axios.post('https://tarmeezacademy.com/api/v1/posts', formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Important: let axios handle content type
    }
  })
  .then(function (response) {
    console.log("Response received:", response);
    document.getElementById("modal-post").classList.add("hidden");
    showAlert("Post created successfully", "#3b82f6");
    getPosts();
  })
  .catch(function (error) {
    console.log("Error during request:", error.response.data.message);
    let errorMessage = error.response ? error.response.data.message : "Unknown error";
    showAlert(errorMessage, "red");
  });

}

function userRegister() {
  console.log("Requesting user registration...");
  
  let name = document.getElementById("register-name").value;
  let username = document.getElementById("register-username").value;
  let password = document.getElementById("register-password").value;
  let user_image = document.getElementById("register-image").files[0]; // File input

  // Create FormData instance to send form data and image
  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("password", password);
  
  // Append the image if it exists
  if (user_image) {
    formData.append("image", user_image); // Ensure the API expects "profile_image"
  }

  axios.post('https://tarmeezacademy.com/api/v1/register', formData, {
    headers : {
      "Content-Type": "multipart/form-data",
    }
  })
    .then(function (response) {
      console.log("Response received:", response);
      // Assuming 'response.data.token' and 'response.data.user' are the correct fields
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Close modal and update UI
      document.getElementById("modal-register").classList.add("hidden");

      setupUI();
      showAlert("User created successfully", "#84cc16");

    })
    .catch(function (error) {
      console.log("Error during request:", error.response ? error.response.data.message : error.message);
      let errorMessage = error.response ? error.response.data.message : "Unknown error";
      showAlert(errorMessage, "red");
    });
}

function showAlert(message,color) {
  const alert = document.getElementById('alert');
  const p = document.querySelector('#alert p');
  const btn = document.querySelector('#alert #closeAlert');
  p.textContent = message
  alert.style.backgroundColor = color;
  alert.style.zIndex = 999;
  alert.classList.remove('opacity-0', 'pointer-events-none');
  alert.classList.add('opacity-100', 'pointer-events-auto');
  btn.style.color = color;
}