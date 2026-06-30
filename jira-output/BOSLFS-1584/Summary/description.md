# Description — BOSLFS-1584

[~accountid:62e946413cc20c06c8ae8839] Vin number for vehicle loans is not pulling to the MACA form. In this scenario the vehicle does not have a Chassis no. but it does have a Vin. The Vin number must also pull onto the MACA form. This happened in the live environment [~accountid:712020:56ae8e42-105a-42ca-975d-78458889866f] 

[^Missing VIN on MACA.pdf]

[~accountid:626ff8c876b8d3006872261d]   Edit the Document to Place the Chasis NO / VIN NO: and add a conditional if the System read that the Chasis NO is Populated, will add this information, if is Blank and the VIN No is populated will add this information instead.

As system, I want to

!image-20260225-145800 (f63cad8d-723a-4722-8337-10f88e8339cd).png|width=659,alt="image-20260225-145800.png"!