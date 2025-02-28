

  function setupUI() {
    // console.log( localStorage.getItem("user"))
    //  console.log("setupUI is running");
    //  return
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

  // AUTH FUNCTION
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
      console.log('Before showAlert');
      showAlert("user logged in successfully","#84cc16");
      console.log('After showAlert');
      setupUI()
    //   showAlert("user logged in successfully","#84cc16");
      // location.reload();
      console.log(response.data.token);
    })
    .catch(function (error) {
        let errorMessage = error.response.data.message;
        showAlert(errorMessage,"red")
        console.log(errorMessage);
      });
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setupUI()
    showAlert("user logouted successfully","#a855f7")
    // showLogoutAlert()
  }
setupUI()