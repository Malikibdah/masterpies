async function getEmployeeById() {
    let employeeId = localStorage.getItem('employeeId');
    let url = `https://localhost:44326/api/Admin/GetEmployeeInfoById/${employeeId}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("employeeName").value = data.empName;
    document.getElementById("employeeId").value = data.employeeId;
    document.getElementById("employeeSalary").value = data.salary;
    document.getElementById("phoneNumber").value = data.phoneNumber;
    document.getElementById("employeeJobtitle").value = data.jobtitle;
    document.getElementById("emergencyPhoneNumber").value = data.emergencyNumber;

}

getEmployeeById();


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