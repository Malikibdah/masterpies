using CarCharging.DTO;
using CarCharging.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarCharging.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly MyDbContext _db;
        public BookingController(MyDbContext db)
        {
            _db = db;
        }
        [HttpPost("BookingDeliveryCharger/{id}")]
        public IActionResult BookingDeliveryCharger(int id, [FromForm] BookingDeliveryChargeRequestDTO bookingDeliveryChargeRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var chrgerbooking = new DeliveryCharger
            {
                UserId = id,
                TheLoction = bookingDeliveryChargeRequest.TheLoction,
                PhoneNumber = bookingDeliveryChargeRequest.PhoneNumber,
                CarPlateNumber = bookingDeliveryChargeRequest.CarPlateNumber,
                CarType = bookingDeliveryChargeRequest.CarType,
                ChargerType = bookingDeliveryChargeRequest.ChargerType,
                City = bookingDeliveryChargeRequest.City,
            };
            _db.DeliveryChargers.Add(chrgerbooking);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPost("BookingComputerCheck/{id}")]
        public IActionResult BookingComputerCheck(int id, [FromForm] BookingComputerCheckRequestDTO bookingComputerCheckRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var computerbooking = new ComputerCheck
            {
                UserId = id,
                TheLocation = bookingComputerCheckRequest.TheLocation,
                PhoneNumber = bookingComputerCheckRequest.PhoneNumber,
                CarPlateNmber = bookingComputerCheckRequest.CarPlateNmber,
                CarType = bookingComputerCheckRequest.CarType,
                CarClass = bookingComputerCheckRequest.CarClass,
                ManufacturingDate = bookingComputerCheckRequest.ManufacturingDate,
            };
            _db.ComputerChecks.Add(computerbooking);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPost("BookingInTheStation/{id}")]
        public IActionResult BookingInTheStation(int id, [FromForm] BookingInStationRequestDTO bookingInStationRequest)
        {
            if (id == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = _db.Users.FirstOrDefault(d => d.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            
            var existingBooking = _db.VehicaleChargings
                .FirstOrDefault(b => b.CarPlateNumber == bookingInStationRequest.CarPlateNumber &&
                                     b.Date == bookingInStationRequest.Date &&
                                     b.Time == bookingInStationRequest.Time);

            if (existingBooking != null)
            {
                return Conflict("A booking already exists for this car at the specified date and time.");
            }

            var stationbooking = new VehicaleCharging
            {
                UserId = id,
                PhoneNumber = bookingInStationRequest.PhoneNumber,
                CarPlateNumber = bookingInStationRequest.CarPlateNumber,
                CarType = bookingInStationRequest.CarType,
                ChargerType = bookingInStationRequest.ChargerType,
                Date = bookingInStationRequest.Date,
                Time = bookingInStationRequest.Time,
            };
            _db.VehicaleChargings.Add(stationbooking);
            _db.SaveChanges();
            return Ok();
        }
        //[HttpPost("CheckforAvailableChager")]
        //public IActionResult CheckforAvailableCharger([FromBody]CheckForAvailableCharger checkForAvailableCharger)
        //{
        //    var checkchrgers = _db.VehicaleChargings
        //        .Where(m => m.Date == checkForAvailableCharger.Date && m.Time == checkForAvailableCharger.Time && m.Status == "pending").Count();
        //    if (checkchrgers < 8)
        //    {
        //        return Ok();
        //    }
        //    return StatusCode(StatusCodes.Status503ServiceUnavailable, "No available chargers at the moment");
        //}
        [HttpGet("CheckforAvailableChager/{date}/{time}")]
        public IActionResult CheckforAvailableCharger(string date, string time)
        {
            var checkchrgers = _db.VehicaleChargings
                .Where(m => m.Date == date && m.Time == time && m.Status == "pending").Count();
            if (checkchrgers < 8)
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status503ServiceUnavailable, "No available chargers at the moment");
        }

        [HttpGet("GetAllVehiclechargingrequests")]
        public IActionResult GetAllVehiclechargingrequests()
        {
            var vehicleChargings = _db.VehicaleChargings
                .Where(w => w.IsAccept == false)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,  
                    s.CarPlateNumber,
                    s.CarType,
                    s.ChargerType,
                    s.Date,
                    s.Time,
                    s.Status,
                    s.User.UserName  
                })
                .ToList();
            return Ok(vehicleChargings);
        }
        [HttpPut("AcceptVehicleChargingRequest/{id}")]
        public IActionResult AcceptVehicleChargingRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var vehicleCharging = _db.VehicaleChargings.FirstOrDefault(b => b.Id == id);
            if (vehicleCharging == null)
            {
                return NotFound();
            }
            vehicleCharging.IsAccept = true;
            _db.SaveChanges();
            return Ok();
        }
        [HttpDelete("DeletVehicleChargingRequest/{id}")]
        public IActionResult DeletVehicleChargingRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var vehicleCharging = _db.VehicaleChargings.FirstOrDefault(b => b.Id == id);
            if (vehicleCharging == null)
            {
                return NotFound();
            }
            _db.VehicaleChargings.Remove(vehicleCharging);
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetAllDeliveryChargerRequests")]
        public IActionResult GetAllDeliveryChargerRequests()
        {
            var deliveryChargers = _db.DeliveryChargers
                .Where(w => w.IsAccept == false)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.TheLoction,
                    s.CarPlateNumber,
                    s.CarType,
                    s.ChargerType,
                    s.City,
                    s.User.UserName
                })
                .ToList();
            return Ok(deliveryChargers);
        }
        [HttpPut("AcceptDeliveryChargerRequest/{id}")]
        public IActionResult AcceptDeliveryChargerRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var deliveryCharger = _db.DeliveryChargers.FirstOrDefault(b => b.Id == id);
            if (deliveryCharger == null)
            {
                return NotFound();
            }
            deliveryCharger.IsAccept = true;
            _db.SaveChanges();
            return Ok();
        }
        [HttpDelete("DeleteDeliveryChargerRequest/{id}")]
        public IActionResult DeleteDeliveryChargerRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var deliveryCharger = _db.DeliveryChargers.FirstOrDefault(b => b.Id == id);
            if (deliveryCharger == null)
            {
                return NotFound();
            }
            _db.DeliveryChargers.Remove(deliveryCharger);
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetAllComputerCheckRequests")]
        public IActionResult GetAllComputerCheckRequests()
        {
            var computerChecks = _db.ComputerChecks
                .Where(w => w.IsAccept == false)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.TheLocation,
                    s.CarPlateNmber,
                    s.CarType,
                    s.CarClass,
                    s.ManufacturingDate,
                    s.User.UserName
                })
                .ToList();
            return Ok(computerChecks);
        }
        [HttpPut("AcceptComputerCheckRequest/{id}")]
        public IActionResult AcceptComputerCheckRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var computerCheck = _db.ComputerChecks.FirstOrDefault(b => b.Id == id);
            if (computerCheck == null)
            {
                return NotFound();
            }
            computerCheck.IsAccept = true;
            _db.SaveChanges();
            return Ok();
        }
        [HttpDelete("DeleteComputerCheckRequest/{id}")]
        public IActionResult DeleteComputerCheckRequest(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var computerCheck = _db.ComputerChecks.FirstOrDefault(b => b.Id == id);
            if (computerCheck == null)
            {
                return NotFound();
            }
            _db.ComputerChecks.Remove(computerCheck);
            _db.SaveChanges();
            return Ok();
        }


        [HttpGet("GetAllAcceptVehiclechargingrequests")]
        public IActionResult GetAllAcceptVehiclechargingrequests()
        {
            var acceptvehicleChargings = _db.VehicaleChargings
                .Where(w => w.IsAccept == true)
                .OrderByDescending(w => w.Status)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.CarPlateNumber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptvehicleChargings);
        }
        [HttpGet("GetAcceptAllDeliveryChargerRequests")]
        public IActionResult GetAcceptAllDeliveryChargerRequests()
        {
            var acceptdeliveryChargers = _db.DeliveryChargers
                .Where(w => w.IsAccept == true)
                .OrderByDescending(w => w.Status)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.CarPlateNumber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptdeliveryChargers);
        }
        [HttpGet("GetAcceptAllComputerCheckRequests")]
        public IActionResult GetAcceptAllComputerCheckRequests()
        {
            var acceptcomputerChecks = _db.ComputerChecks
                .Where(w => w.IsAccept == true)
                .OrderByDescending(w => w.Status)
                .Select(s => new
                {
                    s.Id,
                    s.PhoneNumber,
                    s.CarPlateNmber,
                    s.CarType,
                    s.Status,
                    s.User.UserName
                })
                .ToList();
            return Ok(acceptcomputerChecks);
        }
        [HttpPut("UpdateStatusForVehicleRequest/{id}")]
        public IActionResult UpdateStatusForVehicleRequest(int id, ChangeStatusRequestsDTO changeStatusRequestsDTO)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var vehicleCharging = _db.VehicaleChargings.FirstOrDefault(b => b.Id == id);
            if (vehicleCharging == null)
            {
                return NotFound();
            }
            vehicleCharging.Status = changeStatusRequestsDTO.Status;

            _db.VehicaleChargings.Update(vehicleCharging);
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("UpdateStatusForDeliveryRequest/{id}")]
        public IActionResult UpdateStatusForDeliveryRequest(int id, ChangeStatusRequestsDTO changeStatusRequestsDTO)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var deliveryCharger = _db.DeliveryChargers.FirstOrDefault(b => b.Id == id);
            if (deliveryCharger == null)
            {
                return NotFound();
            }
            deliveryCharger.Status = changeStatusRequestsDTO.Status;
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("UpdateStatusForComputerRequest/{id}")]
        public IActionResult UpdateStatusForComputerRequest(int id, ChangeStatusRequestsDTO changeStatusRequestsDTO)
        {
            if (id <= 0)
            {
                return BadRequest("You can not use 0 or negative value for id");
            }
            var computerCheck = _db.ComputerChecks.FirstOrDefault(b => b.Id == id);
            if (computerCheck == null)
            {
                return NotFound();
            }
            computerCheck.Status = changeStatusRequestsDTO.Status;
            _db.SaveChanges();
            return Ok();
        }
    }
}
