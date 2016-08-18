#Emilena

##Engineering debt

Contract types should be provided

##Release v1.0

1. Appointments - staff to client (check for overlaps) - Do this on the backend!
2. Edit functions - staff & client
3. Absences
4. Alerts
5. Then polish - favicon, bug fixing (validations etc)
6. deployment!

##Release v2.0

1. Expenses
2. E-mail alerts
3. Text messaging alerts

##Security

2 types of Roles

1. ADMIN
2. SYSTEM

###ADMIN

1. Grants system wide access
2. This includes adding, deleting staff members
3. This includes adding, deleting clients
4. This includes setting up new users of the system with both ADMIN and SYSTEM roles
5. Access to updating appointments, and the calendar

###SYSTEM

1. Grants read-only access
2. This includes read-only access to client information
3. This includes read-only access to appointments and the calendar

##PSQL Cheat Sheet:

https://www.postgresql.org/docs/9.3/static/app-psql.html

dropdb emilena
createdb emilena
psql emilena

psql -d emilena -a -f admin.sql

##Notes for documentation and presentation

1. Background
2. Purpose/Overview/Benefits
3. Use cases
4. Validation
5. Security
6. Quality
7. Data compliancy
8. Technical concerns
9. Summary

##AWS

Access Key ID:
AKIAIN4FBHJBZOP77X7Q

Secret Access Key:
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


For the db connection (ADD THIS TO THE YML):

  driverClass: org.postgresql.Driver
  url: jdbc:postgresql://emilena.cyzjmm8gvb01.eu-west-1.rds.amazonaws.com:5432/emilena

##Jenkins

http://52.51.232.117:2030  - AWS EC2 - note the port


##Docker

####Emilena-API

* docker build -t emilena-api .
* docker run -p 9090:9090 emilena-api

#####Emilena-WEB

* docker build -t emilena-web .
* docker run -p 80:80 emilena-web


##design

[Design draw.io](https://www.draw.io/#G0B5PamaXEsqiHb3VkbGVFd01rVUk)

##backend

The backend repository is at https://github.com/DystopianProgrammer/emilena-api