#Frances Taylor Foundation Rota


Requirements:
------------

##rota

1. staff availability
2. support hours per day (per person per day)
3. people who only like stagnant days
.. stagnant days are limited fixed hourly support per week (days)
4. intermmitent custom support (e.g. fortnightly support)
5. Match carers with clients (perference of support worker - from the clients point of view)
6. Adhoc appointments
.. These need to be logged
7. Auditable
8. Each client have appointed weekly hours
9. Clients have time preferences e.g. morning or afternoon
10. Support workers confined to areas ( this is constrained by point 5)
11. Sickness/ holidays / absence of client
12. Sickness/ holidays / absence of staff
13. Contractual staff obtain preference over bank staff
14. Senior staff have to be rota'd for office hours

##design

[Design draw.io](https://www.draw.io/#G0B5PamaXEsqiHb3VkbGVFd01rVUk)

##backend

The backend repository is at https://github.com/DystopianProgrammer/emilena-api


Implementation:
--------------

##finer details

1. Client and Support worker have a many to many relationhip.
2. There is a support component and a relationhip component.
.. The support component assigns support workers to a client
.. The relationhip component lists the currently assigned support workers to the clients
