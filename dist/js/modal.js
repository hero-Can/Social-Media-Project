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