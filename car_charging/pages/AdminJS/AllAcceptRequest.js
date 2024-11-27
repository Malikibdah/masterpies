async function acceptVehicleRequest() {

  let url = "https://localhost:44326/api/Booking/GetAllAcceptVehiclechargingrequests";
  let response = await fetch(url);
  let data = await response.json();
  let table = document.getElementById("acceptrequestsTable");
  data.forEach(element => {
    table.innerHTML += `
             <tr>
                      <td>
                        <div class="d-flex px-2">
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.phoneNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carType}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carPlateNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">Vehicle Charging</span>
                      </td>
                      <td>
                        <select id="status1-${element.id}" class="form-select form-select-sm text-uppercase fw-bold bg-light border-0 shadow-sm">
                          <option value="" class="text-secondary">${element.status}</option>
                          <option value="Pending" class="text-secondary">Pending</option>
                          <option value="Done" class="text-success">Done</option>
                          <option value="Canceled" class="text-danger">Canceled</option>
                        </select>
                      </td>                      
                      
                      <td class="align-middle">
                        <a onclick="deletVehicleRequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                        <a onclick="editVehicleRequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i class="material-icons text-sm me-2">edit</i>Edit</a>
                    </td>
            </tr>
        
        `
  });

}

acceptVehicleRequest();

async function deletVehicleRequest(id) {
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
    let url = `https://localhost:44326/api/Booking/DeletVehicleChargingRequest/${id}`;
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


async function editVehicleRequest(id) {
  event.preventDefault();
  let url2 = `https://localhost:44326/api/Booking/UpdateStatusForVehicleRequest/${id}`;
  var selectedStatus = document.getElementById(`status1-${id}`).value;
  let response = await fetch(url2, {
    method: 'PUT',
    body: JSON.stringify({ status: selectedStatus }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (response.status === 200) {
    Swal.fire({
      icon: 'success',
      title: 'change Status Accepted successfully',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.reload();
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Failed to change Status. Please try again.',
      confirmButtonText: 'OK'
    });
  }

}


async function acceptDeliveryChargerRequests() {

  let url = "https://localhost:44326/api/Booking/GetAcceptAllDeliveryChargerRequests";
  let response = await fetch(url);
  let data = await response.json();
  let table = document.getElementById("acceptrequestsTable");
  data.forEach(element => {
    table.innerHTML += `
             <tr>
                      <td>
                        <div class="d-flex px-2">
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.phoneNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carType}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carPlateNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">Delivery Charger</span>
                      </td>
                      <td>
                        <select id="status2-${element.id}" class="form-select form-select-sm text-uppercase fw-bold bg-light border-0 shadow-sm">
                          <option value="" class="text-secondary">${element.status}</option>
                          <option value="Pending" class="text-secondary">Pending</option>
                          <option value="Done" class="text-success">Done</option>
                          <option value="Canceled" class="text-danger">Canceled</option>
                        </select>
                      </td>                      
                      
                      <td class="align-middle">
                        <a onclick="deletDeliveryRequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                        <a onclick="editDeliveryRequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i class="material-icons text-sm me-2">edit</i>Edit</a>
                    </td>
            </tr>
        
        `
  });

}

acceptDeliveryChargerRequests();


async function deletDeliveryRequest(id) {
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
    let url = `https://localhost:44326/api/Booking/DeleteDeliveryChargerRequest/${id}`;
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


async function editDeliveryRequest(id) {
  event.preventDefault();
  let url2 = `https://localhost:44326/api/Booking/UpdateStatusForDeliveryRequest/${id}`;
  var selectedStatus = document.getElementById(`status2-${id}`).value;
  let response = await fetch(url2, {
    method: 'PUT',
    body: JSON.stringify({ status: selectedStatus }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (response.status === 200) {
    Swal.fire({
      icon: 'success',
      title: 'change Status Accepted successfully',
      confirmButtonText: 'OK'
    }).then(() => {
      window.location.reload();
    });
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Failed to change Status. Please try again.',
      confirmButtonText: 'OK'
    });
  }

}


async function acceptComputerCheckRequests() {

  let url = "https://localhost:44326/api/Booking/GetAcceptAllComputerCheckRequests";
  let response = await fetch(url);
  let data = await response.json();
  let table = document.getElementById("acceptrequestsTable");
  data.forEach(element => {
    table.innerHTML += `
             <tr>
                      <td>
                        <div class="d-flex px-2">
                          <div class="my-auto">
                            <h6 class="mb-0 text-sm ms-2">${element.userName}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.phoneNumber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carType}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">${element.carPlateNmber}</span>
                      </td>
                      <td>
                        <span class="text-xs font-weight-bold">Computer Check</span>
                      </td>
                      <td>
                        <select id="status3-${element.id}" class="form-select form-select-sm text-uppercase fw-bold bg-light border-0 shadow-sm">
                          <option value="" class="text-secondary">${element.status}</option>
                          <option value="Pending" class="text-secondary">Pending</option>
                          <option value="Done" class="text-success">Done</option>
                          <option value="Canceled" class="text-danger">Canceled</option>
                        </select>
                      </td>                      
                      
                      <td class="align-middle">
                        <a onclick="deletComputerRequest(${element.id})" class="btn btn-link text-danger text-gradient px-3 mb-0" href=""><i class="material-icons text-sm me-2">delete</i>Delete</a>
                        <a onclick="editComputerRequest(${element.id})" class="btn btn-link text-success px-3 mb-0" href=""><i class="material-icons text-sm me-2">edit</i>Edit</a>
                    </td>
            </tr>
        
        `
  });

}

acceptComputerCheckRequests();

async function deletComputerRequest(id) {
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


async function editComputerRequest(id) {
  debugger;
  event.preventDefault();
  let url2 = `https://localhost:44326/api/Booking/UpdateStatusForComputerRequest/${id}`;
  var selectedStatus = document.getElementById(`status3-${id}`).value;
  let response = await fetch(url2, {
    method: 'PUT',
    body: JSON.stringify({ status: selectedStatus }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (response.status === 200) {
    await Swal.fire({
      icon: 'success',
      title: 'change Status Accepted successfully',
      confirmButtonText: 'OK'
    })
  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Failed to change Status. Please try again.',
      confirmButtonText: 'OK'
    });
  }

}

