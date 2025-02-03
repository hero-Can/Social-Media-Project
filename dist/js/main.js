let postContent = document.getElementById("post");

function getPosts(){
    axios.get('https://tarmeezacademy.com/api/v1/posts')
  .then(function (response) {
    let posts = response.data.data
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
                    <img src="images/img3.jpg" class="rounded-xl mt-5 mb-5 h-[600px] w-full " alt="">
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
    
    setupUI()
    showLoginAlert()
  //  hideAlert()
    console.log(response.data.token);
  })
  .catch(function (error) {
    let errorMessage = error.response.data.message
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
    let user_email = (userObject.email === null || userObject.email === "null") ? "user@company.com" : userObject.email;
    document.getElementById("current_email").textContent = user_email;
  } else{
    // show login Div & Hide LOgout Div
    document.getElementById("login").style.setProperty("display","block")
    document.getElementById("logout").style.setProperty("display","none")

    // remove user data from profile bar
    document.getElementById("current_username").textContent ="Username";
    document.getElementById("current_email").textContent = "user@company.com";

  }
}
setupUI()

function logout() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
  setupUI()
  showLogoutAlert()
}

function userRegister() {
  let name = document.getElementById("register-name").value
  let username = document.getElementById("register-username").value
  let password = document.getElementById("register-password").value

  axios.post('https://tarmeezacademy.com/api/v1/register', {
    "name": name,
    "username": username,
    "password": password
  })
  .then(function (response) {
    localStorage.setItem("token",response.data.token)
    localStorage.setItem("user",JSON.stringify(response.data.user))
    document.getElementById("modal-register").classList.add("hidden");
    
    setupUI()
    showLoginAlert()
  //  hideAlert()
    console.log(response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });
}
