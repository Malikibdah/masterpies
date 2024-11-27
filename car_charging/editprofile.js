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

    let PhoneNumber = document.getElementById("phonenumber").value;
    if (PhoneNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill your phone number before proceeding.',
        });
        return;
    }
    if (!/^(?:\+962|0)?7[789]\d{7}$/.test(PhoneNumber)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Number',
            text: 'Please enter a valid Jordanian phone number. It should start with +962 or 07, followed by (7, 8, or 9), and followed by 7 digits.',
        });
        return;
    }

    let CarPlateNumber = document.getElementById("carplatenumber").value;
    if (CarPlateNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill your car plate number before proceeding.',
        });
        return;
    }
    let carnumbercount = CarPlateNumber.length;
    if (carnumbercount < 1 || carnumbercount > 7) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid car plat number',
            text: 'Please enter a valid car plat number. It should be between 1 and 7 characters long.',
        });
        return;
    }
    if (isNaN(CarPlateNumber)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter a valid numeric value for Car Plate Number.',
        });
        return;
    }

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
