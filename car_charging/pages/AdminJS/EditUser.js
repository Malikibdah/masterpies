async function EditUser() {
    debugger
    event.preventDefault();
    let id = localStorage.getItem('edituserbyId');
    let url = `https://localhost:44326/api/Admin/UpdateUser/${id}`;
    let form = document.getElementById("edituserform");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });

    if (response.status == 200) {
        alert("User updated successfully");
        localStorage.removeItem('edituserbyId');
        window.location.reload();
    } else {
        alert("Failed to update user. Please try again.");
    }
    
}