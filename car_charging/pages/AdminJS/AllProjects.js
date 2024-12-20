async function AllProjects() {
    let url = "https://localhost:44326/api/Admin/GetAllProjects";
    let response = await fetch(url);
    let data = await response.json();
    let allproject = document.getElementById("projectid");
    data.forEach(element => {
        allproject.innerHTML += `
            <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  <div>
                    <img src="../img/${element.image}" class="avatar avatar-lg me-3 border-radius-lg" alt="user1">
                  </div>
                  <div class="d-flex flex-column">
                    <h6 class="mb-3 text-sm">JOCharging Project</h6>
                    <span class="mb-2 text-xs">Project Name: <span class="text-dark font-weight-bold ms-sm-2">${element.projectName}</span></span>
                  </div>
                  <div class="ms-auto text-end">
                    <a class="btn btn-link text-danger text-gradient px-3 mb-0" onclick="Deletproject(${element.id})" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                    <a class="btn btn-link text-success px-3 mb-0" onclick="Editproject(${element.id})" href="./EditProject.html"><i class="material-icons text-sm me-2">edit</i>Edit</a>
                  </div>
                </li>
        `; 
    });
    
};
AllProjects();

async function Deletproject(id) {
    event.preventDefault();

    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
        let url = `https://localhost:44326/api/Admin/DeleteProject/${id}`;
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Project deleted successfully',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload(); 
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Failed to delete project',
                confirmButtonText: 'OK'
            });
        }
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Deletion canceled',
            confirmButtonText: 'OK'
        });
    }
}


function Editproject(id) {
    let project = localStorage.setItem('projectId', id);
}