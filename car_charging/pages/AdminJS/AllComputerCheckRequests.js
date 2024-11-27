async function GetAllComputerCheckRequests() {
    let url = "https://localhost:44326/api/Booking/GetAllComputerCheckRequests";
    let response = await fetch(url);
    let data = await response.json();
    let vehicleChargingRequestTable = document.getElementById('ComputerCheckRequestTableId');
    data.forEach(element => {
        vehicleChargingRequestTable.innerHTML += `
        <tr>
                      <td>
                        <div class="d-flex px-2">

                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td class="text-wrap" style="min-width: 150px; max-width: 270px;">
                        <p class="text-sm font-weight-bold mb-0">${element.theLocation}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.phoneNumber}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.carType}</p>
                      </td>
                      <td>
                        <p class="text-sm font-weight-bold mb-0">${element.carClass}</p>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.manufacturingDate}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carPlateNmber}</span>
                      </td>

                      <td class="align-middle">
                        <a onclick="deletrequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
                            class="material-icons text-sm me-2" >delete</i>Delete</a>
                        <a onclick="acceptrequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i
                            class="material-icons text-sm me-2">check</i>Accept</a>
                      </td>
                    </tr>
        `
    });
}

GetAllComputerCheckRequests();

async function acceptrequest(id) {
  event.preventDefault();

  const result = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to accept this request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel!',
  });

  if (result.isConfirmed) {
      let url = `https://localhost:44326/api/Booking/AcceptComputerCheckRequest/${id}`;
      let response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Request accepted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); 
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to accept request',
              confirmButtonText: 'OK'
          });
      }
  } else {
      Swal.fire({
          icon: 'info',
          title: 'Request acceptance canceled',
          confirmButtonText: 'OK'
      });
  }
}


async function deletrequest(id) {
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
      let url = `https://localhost:44326/api/Booking/DeleteComputerCheckRequest/${id}`;
      let response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Request deleted successfully',
              confirmButtonText: 'OK'
          }).then(() => {
              window.location.reload(); 
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Failed to delete request',
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


async function getComputerRequestByCarNumber() {
  let carNumber = document.getElementById('carNumber').value;
  let url = `https://localhost:44326/api/Admin/GetAllComputerCheckRequestsByCarNumber/${carNumber}`;
  let response = await fetch(url);
  let data = await response.json();
  let vehicleChargingRequestTable = document.getElementById('ComputerCheckRequestTableId');
  vehicleChargingRequestTable.innerHTML = '';
  data.forEach(element => {
      vehicleChargingRequestTable.innerHTML += `
      <tr>
            <td>
              <div class="d-flex px-2">
              <div class="my-auto">
                <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
              </div>
            </div>
          </td>
          <td class="text-wrap" style="min-width: 150px; max-width: 270px;">
          <p class="text-sm font-weight-bold mb-0">${element.theLocation}</p>
          </td>
          <td>
            <p class="text-sm font-weight-bold mb-0">${element.phoneNumber}</p>
          </td>
          <td>
            <p class="text-sm font-weight-bold mb-0">${element.carType}</p>
          </td>
          <td>
            <p class="text-sm font-weight-bold mb-0">${element.carClass}</p>
          </td>
          <td>
            <span class="text-xs font-weight-bold">${element.manufacturingDate}</span>
          </td>
          <td>
            <span class="text-xs font-weight-bold">${element.carPlateNmber}</span>
          </td>

          <td class="align-middle">
            <a onclick="deletrequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i
              class="material-icons">delete</i>delete</a>
              <a onclick="acceptrequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i
              class="material-icons">check</i>Accept</a>
          </td>
      </tr>
  `
  });
  
}