async function AddProject() {
    debugger
    event.preventDefault();
    let url = "https://localhost:44326/api/Admin/AddNewProject";
    let form = document.getElementById("addprojectform");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
   if (response.status === 200) {
    alert("Project added successfully");
    window.location.reload();
    }
    else {
        alert("Failed to add project. Please be sure to fill in all fields");
    }
    
}