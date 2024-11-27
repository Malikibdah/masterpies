async function AllContactmessage() {
    let url = "https://localhost:44326/api/Admin/GetAllContactus";
    let response = await fetch(url);
    let data = await response.json();
    let allcontact = document.getElementById("contactid");
    data.forEach(element => {
        allcontact.innerHTML += `
            <tr>
                    <td>
                        <div class="d-flex px-2">
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.email}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.subject}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.message}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">
                          <a class="text-success" href= "https://mail.google.com/mail/?view=cm&fs=1&to=${element.email}" target="_blank"> 
                            Click to Send Mail
                         </a>
                        </span>
                      </td>
                      
                      <td class="align-middle">
                        <button class="btn btn-link text-danger mb-0">
                          <i class="material-icons opacity-10" onclick="Deletcontact(${element.id})">delete</i>Delete
                        </button>
                    </td>
            </tr>
        `;
    });
    
}
AllContactmessage();

async function Deletcontact(id) {
  event.preventDefault();

  
  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this contact message?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
  });

 
  if (result.isConfirmed) {
      let url1 = `https://localhost:44326/api/Admin/DeletContactMessage/${id}`;
      let response = await fetch(url1, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'User deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); 
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete User',
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
