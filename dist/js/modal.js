// Login Modal
document.getElementById("open-modal-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.remove("hidden");
    //  console.log("clicked")
  });
  
  document.getElementById("close-modal-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.add("hidden");
  });
// Register Modal
  document.getElementById("open-modal-btn-register").addEventListener("click", function() {
    document.getElementById("modal-register").classList.remove("hidden");
    // console.log("clicked")
  });
  
  document.getElementById("close-modal-btn-register").addEventListener("click", function() {
    document.getElementById("modal-register").classList.add("hidden");
  });

  // Post create model
  document.getElementById("open-modal-post-btn").addEventListener("click", function() {
     console.log("clicked")
    document.getElementById("modal-post").classList.remove("hidden");
  });
  
  document.getElementById("close-modal-btn-post").addEventListener("click", function() {
    document.getElementById("modal-post").classList.add("hidden");
  });