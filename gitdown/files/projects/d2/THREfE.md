---
tags: [tag3, tag34, tag55, tagF]
users: [user18@email.com, user2@email.com, user62@email.com]
archived: null
created: 1699989370265
due: null
id: wDcEz9xRcLstAoZv1Rvsf
priority: Lowest
project: d2
status: In Progress
title: THREE
type: Use Case
---
<!-- GENERATED WITH GITDOWN; DO NOT CHANGE -->

# 2

short smmojmethig hebbnsssnmmm,,re

## Heading 2

short something heremmbbb

### Criteria

yarn :222 typescript

### Structure

package.json /packages /configs

#### /packages

##### Types

* Libraries
* Runtimes
* Data Access Objects

#### Libraries

These are to be utilized by runtimes. They #test have to be transpiled to be used by a runtime.

A resource library is a subtype to access a Key Resource (ie. Mailchimp for mail)

* Domain
* Email (resource)
* Push Notification (resource)
* Authorization (resource?)
* Logging
* Client functional
* Client styles

#### Runtimes

These do not contain business logic, and act as the interface between the user and a library. Runtimes exports routes to be consumed by clients.

##### Types

* HTTPS App Server
* Websocket
* Web App
* Mobile Apps

##### Ours

* General server
* Admin
* Queue
* Authorization
* Client to server Websocket
* Marketing
* Web client

#### Data Access Objects

These is the interface between a library and a database

##### Dbs

* Neo4j
* Postgres
* Redis