async function AddEmployee() {
    debugger
    event.preventDefault();
    let url = "https://localhost:44326/api/Admin/AddNewEmployee";
    let form = document.getElementById("addemployee");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'POST',
        body: formData
    });
   if (response.status === 200) {
    alert("Employee added successfully");
    window.location.reload();
    }
    else {
        alert("Failed to add employee. Please try again.");
    }
    
}