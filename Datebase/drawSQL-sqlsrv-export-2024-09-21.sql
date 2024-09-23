--"AdminTable"
CREATE TABLE "Admin"(
    "id" INT identity(1,1),
    "AdminName" NVARCHAR(255) NOT NULL,
    "PhoneNumber" INT,
    "Email" NVARCHAR(255) NOT NULL,
    "Address" NVARCHAR(255),
    "Password" NVARCHAR(255) NOT NULL,
	"Image" NVARCHAR(MAX)
);
ALTER TABLE
    "Admin" ADD CONSTRAINT "admin_id_primary" PRIMARY KEY("id");

--"DeliveryChargerTable"
CREATE TABLE "DeliveryCharger"(
    "id" INT identity(1,1),
    "UserId" INT NOT NULL,
    "TheLoction" NVARCHAR(255) NOT NULL,
    "PhoneNumber" INT NOT NULL,
    "CarPlateNumber" INT NOT NULL,
    "CarType" NVARCHAR(255) NOT NULL,
    "ChargerType" NVARCHAR(255) NOT NULL,
    "City" NVARCHAR(255),
    "Status" NVARCHAR(255) default 'pending',
    "isAccept" BIT default 0
);
ALTER TABLE
    "DeliveryCharger" ADD CONSTRAINT "deliverycharger_id_primary" PRIMARY KEY("id");

--"TestimonialTable"
CREATE TABLE "Testimonial"(
    "id" INT identity(1,1),
    "UserId" INT NOT NULL,
    "UserName" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "TheTestimonial" NVARCHAR(255)
);
ALTER TABLE
    "Testimonial" ADD CONSTRAINT "testimonial_id_primary" PRIMARY KEY("id");

--"ComputerCheckTable"
CREATE TABLE "ComputerCheck"(
    "id" INT identity(1,1),
    "UserId" INT NOT NULL,
    "TheLocation" NVARCHAR(255) NOT NULL,
    "PhoneNumber" INT NOT NULL,
    "CarPlateNmber" INT NOT NULL,
    "CarType" NVARCHAR(255) NOT NULL,
    "CarClass" NVARCHAR(255) NOT NULL,
    "ManufacturingDate" NVARCHAR(255) NOT NULL,
    "Status" NVARCHAR(255) default 'pending',
    "isAccept" BIT default 0
);
ALTER TABLE
    "ComputerCheck" ADD CONSTRAINT "computercheck_id_primary" PRIMARY KEY("id");

--"ProjectsTable"
CREATE TABLE "Projects"(
    "Id" INT identity(1,1),
    "ProjectName" NVARCHAR(255) NOT NULL,
    "Image" NVARCHAR(MAX) NOT NULL
);
ALTER TABLE
    "Projects" ADD CONSTRAINT "projects_id_primary" PRIMARY KEY("Id");

--"UsersTable"
CREATE TABLE "Users"(
    "id" INT identity(1,1),
    "UserName" NVARCHAR(255) NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "PhonrNumber" INT,
    "CarPlateNumber" INT,
    "City" NVARCHAR(255),
    "Street" NVARCHAR(255),
    "PasswordHash" VARBINARY(MAX),
    "PasswordSalt" VARBINARY(MAX),
    "Image" NVARCHAR(MAX) 
);
ALTER TABLE
    "Users" ADD CONSTRAINT "users_id_primary" PRIMARY KEY("id");

--"ContactusTable"
CREATE TABLE "Contactus"(
    "id" INT identity(1,1),
    "UserId" INT NOT NULL,
    "Email" NVARCHAR(255) NOT NULL,
    "Subject" NVARCHAR(255) ,
    "Message" NVARCHAR(255) 
);
ALTER TABLE
    "Contactus" ADD CONSTRAINT "contactus_id_primary" PRIMARY KEY("id");

--"VehicaleChargingTable"
CREATE TABLE "VehicaleCharging"(
    "id" INT identity(1,1) ,
    "UserId" INT NOT NULL,
    "PhoneNumber" INT NOT NULL,
    "CarPlateNumber" INT NOT NULL,
    "CarType" NVARCHAR(255) NOT NULL,
    "ChargerType" NVARCHAR(255) NOT NULL,
    "Date" NVARCHAR(255) NOT NULL,
    "Time" NVARCHAR(255) NOT NULL,
    "Status" NVARCHAR(255) default 'pending',
    "isAccept" BIT default 0
);
ALTER TABLE
    "VehicaleCharging" ADD CONSTRAINT "vehicalecharging_id_primary" PRIMARY KEY("id");
--"ServicesTable"
CREATE TABLE "Services"(
    "Id" INT identity(1,1),
    "ServiceName" NVARCHAR(255) NOT NULL,
    "Description" NVARCHAR(255) NOT NULL,
    "Image" NVARCHAR(MAX) NOT NULL
);
ALTER TABLE
    "Services" ADD CONSTRAINT "services_id_primary" PRIMARY KEY("Id");
	--"EmployeesTable"
CREATE TABLE "Employees"(
    "id" INT identity(1,1) NOT NULL,
    "EmpName" NVARCHAR(255) NOT NULL,
    "EmployeeID" INT NOT NULL,
    "Salary" DECIMAL(8, 2),
    "Jobtitle" NVARCHAR(255) NOT NULL,
    "PhoneNumber" INT ,
    "EmergencyNumber" INT,
    "Image" NVARCHAR(MAX) 
);
ALTER TABLE
    "Employees" ADD CONSTRAINT "employees_id_primary" PRIMARY KEY("id");
ALTER TABLE
    "VehicaleCharging" ADD CONSTRAINT "vehicalecharging_userid_foreign" FOREIGN KEY("UserId") REFERENCES "Users"("id");
ALTER TABLE
    "Contactus" ADD CONSTRAINT "contactus_userid_foreign" FOREIGN KEY("UserId") REFERENCES "Users"("id");
ALTER TABLE
    "Testimonial" ADD CONSTRAINT "testimonial_userid_foreign" FOREIGN KEY("UserId") REFERENCES "Users"("id");
ALTER TABLE
    "DeliveryCharger" ADD CONSTRAINT "deliverycharger_userid_foreign" FOREIGN KEY("UserId") REFERENCES "Users"("id");
ALTER TABLE
    "ComputerCheck" ADD CONSTRAINT "computercheck_userid_foreign" FOREIGN KEY("UserId") REFERENCES "Users"("id");

ALTER TABLE Services
ADD isHidden BIT;
