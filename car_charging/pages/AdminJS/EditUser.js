async function getUserById() {
    let UserId = localStorage.getItem('edituserbyId');
    let url = `https://localhost:44326/api/Admin/GetUserInfoById/${UserId}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("UserName").value = data.userName;
    document.getElementById("UserEmail").value = data.email;
    document.getElementById("UserPhoneNumber").value = data.phonrNumber;
    document.getElementById("UserCarPlateNumber").value = data.carPlateNumber;
    document.getElementById("UserCity").value = data.city;
    document.getElementById("UserStreet").value = data.street;

}

getUserById();



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