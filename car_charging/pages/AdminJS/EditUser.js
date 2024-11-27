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

    let UserName = document.getElementById("UserName").value;
    if (UserName == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill User name before proceeding.',
        });
        return;
    }

    let UserEmail = document.getElementById("UserEmail").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(UserEmail)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Email',
            text: 'Please enter a valid email address.',
        });
        return;
    }

    let UserPhoneNumber = document.getElementById("UserPhoneNumber").value;
    if (UserPhoneNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill phone number before proceeding.',
        });
        return;
    }
    if (!/^(?:\+962|0)?7[789]\d{7}$/.test(UserPhoneNumber)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Number',
            text: 'Please enter a valid Jordanian phone number. It should start with +962 or 07, followed by (7, 8, or 9), and followed by 7 digits.',
        });
        return;
    }
    let UserCarPlateNumber = document.getElementById("UserCarPlateNumber").value;
    if (UserCarPlateNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill User Car Plate Number before proceeding.',
        });
        return;
    }

    let carnumbercount = UserCarPlateNumber.length;
    if (carnumbercount < 1 || carnumbercount > 7) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid car plat number',
            text: 'Please enter a valid car plat number. It should be between 1 and 7 characters long.',
        });
        return;
    }
    if (isNaN(UserCarPlateNumber)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter a valid numeric value for Car Plate Number.',
        });
        return;
    }

    let UserCity = document.getElementById("UserCity").value;
    if (UserCity == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill User City before proceeding.',
        });
        return;
    }

    let UserStreet = document.getElementById("UserStreet").value;
    if (UserStreet == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill User Street before proceeding.',
        });
        return;
    }

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