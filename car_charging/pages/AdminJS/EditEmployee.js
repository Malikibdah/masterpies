async function EditEmployee() {
    debugger
    let employeeId = localStorage.getItem('employeeId');
    event.preventDefault();
    let url = `https://localhost:44326/api/Admin/UpdateEmployee/${employeeId}`;

    let form = document.getElementById("editemployee");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });
    if (response.status === 200){
    alert("Employee Edited successfully");

    localStorage.removeItem('employeeId');
    } else {
        alert("Failed to edit employee");
    }
}