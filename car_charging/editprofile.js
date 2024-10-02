async function userprofileinfo() {
    let id = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/UserProfileInfo /${id}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("fullName").value = data.userName;
    document.getElementById("email").value = data.email;
    document.getElementById("phonenumber").value = data.phonrNumber;
    document.getElementById("carplatenumber").value = data.carPlateNumber;
    document.getElementById("city").value = data.city;
    document.getElementById("street").value = data.street;
    let image = "img/" + data.image;
    document.getElementById("image").src = image;


};
userprofileinfo();

async function UpdateProfileInfo() {
    debugger
    event.preventDefault();
    let user = localStorage.getItem('userId');
    let url = `https://localhost:44326/api/User/UpdateUserProfile/${user}`;
    let form = document.getElementById("editprofileform");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });

    if (response.status === 200) {
        await Swal.fire({
            icon: 'success',
            title: 'Profile Updated',
            text: 'Profile updated successfully.',
        });
        window.location.reload();
    } else {
        await Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Failed to update profile. Please try again.',
        });
    }
}
