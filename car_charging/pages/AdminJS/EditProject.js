async function getServiceById() {
    let ServiceId = localStorage.getItem('projectId');
    let url = `https://localhost:44326/api/Admin/GetProjectInfoById/${ServiceId}`;
    let response = await fetch(url);
    let data = await response.json();
    document.getElementById("ProjectName").value = data.projectName;
    
}

getServiceById();


async function EditProject() {
    debugger
    let projectId = localStorage.getItem('projectId');
    event.preventDefault();

    let ProjectName = document.getElementById("ProjectName").value;
    if (ProjectName == "") {
        await Swal.fire({
            icon: 'warning',
            title: 'Missing Information',
            text: 'Please fill Project Name before proceeding.',
        });
        return;
    }

    let url = `https://localhost:44326/api/Admin/UpdateProject/${projectId}`;

    let form = document.getElementById("editprojectform");
    let formData = new FormData(form);
    let response = await fetch(url, {
        method: 'PUT',
        body: formData
    });

    if (response.status === 200) {

        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Project Edited successfully.',
        }).then(() => {
            localStorage.removeItem('projectId');
            window.location.href = "Projects.html";
        });
    } else {

        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error has occurred. Please try again.',
        });
    }

}