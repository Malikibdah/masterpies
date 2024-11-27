async function AddEmployee() {
    debugger
    event.preventDefault();

    let employeeName = document.getElementById("employeeName").value;
    if (employeeName == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill employee name before proceeding.',
        });
        return;
    }
    let employeeId = document.getElementById("employeeId").value;
    if (employeeId == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill employee Id before proceeding.',
        });
        return;
    }
    if (isNaN(employeeId)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter a valid numeric value for employee Id.',
        });
        return;
    }
    let employeeSalary = document.getElementById("employeeSalary").value;
    if (employeeSalary == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill employee salary before proceeding.',
        });
        return;
    }
    if (isNaN(employeeSalary)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter a valid numeric value for employee salary.',
        });
        return;
    }

    let PhoneNumber = document.getElementById("phoneNumber").value;
    if (PhoneNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill phone number before proceeding.',
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
    let employeeJobtitle = document.getElementById("employeeJobtitle").value;
    if (employeeJobtitle == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill employee job title before proceeding.',
        });
        return;
    }
    let emergencyPhoneNumber = document.getElementById("emergencyPhoneNumber").value;
    if (emergencyPhoneNumber == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill emergency phone number before proceeding.',
        });
        return;
    }
    if (!/^(?:\+962|0)?7[789]\d{7}$/.test(emergencyPhoneNumber)) {
        await Swal.fire({
            icon: 'error',
            title: 'Invalid Number',
            text: 'Please enter a valid Jordanian phone number. It should start with +962 or 07, followed by (7, 8, or 9), and followed by 7 digits.',
        });
        return;
    }
    let url = "https://localhost:44326/api/Admin/AddNewEmployee";
    let form = document.getElementById("addemployee");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    if(response.status === 409){
        alert("This employee ID already exists in the system. Please try a different one.");
        return;
        
    }
    if (response.status === 200) {
        alert("Employee added successfully");
        window.location.reload();
    }
    else {
        await Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Failed to add employee. Please be sure to fill in all fields in',
        });
        return;
    }

}