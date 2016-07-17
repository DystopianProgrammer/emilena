#Frances Taylor Foundation Rota


Requirements:
------------

##rota

+ staff availability
+ support hours per day (per person per day)
+ people who only like stagnant days
 - stagnant days are limited fixed hourly support per week (days)
+ intermmitent custom support (e.g. fortnightly support)
+ Match carers with clients (perference of support worker - from the clients point of view)
+ Adhoc appointments
 - These need to be logged
+ Auditable
+ Each client have appointed weekly hours
+ Clients have time preferences e.g. morning or afternoon
+ Support workers confined to areas ( this is constrained by point 5)
+ Sickness/ holidays / absence of client
+ Sickness/ holidays / absence of staff
+ Contractual staff obtain preference over bank staff
+ Senior staff have to be rota'd for office hours

##design

[Design draw.io](https://www.draw.io/#G0B5PamaXEsqiHb3VkbGVFd01rVUk)

##backend

The backend repository is at https://github.com/DystopianProgrammer/emilena-api


Implementation:
--------------

##finer details

+ Client and Support worker have a many to many relationhip.
+ There is a support component and a relationhip component.
 - The support component assigns support workers to a client
 - The relationhip component lists the currently assigned support workers to the clients

TODOs
------

1. Update operations
2. Hours/Days
3. Availability
