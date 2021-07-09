# event-mapper



## About

Utility to map a dto to an event based on a json mapping definition.

## Installation

```shell
$ npm install --save event-mapper
```

## Usage

1.First of all create a folder and define some mapping definition files.
* The `Name` field is the name of the event.
* The `Mapping` object defines the fields that needs to be mapped from the dto to the event

```javascript
{
    "Name": "TestEvent1",
    "Mapping": {
        "Field1": "FieldDest1",
        "Field2": "FieldDest2",
        "Field3": "SchemeData.FieldDest3"
    }
}
```

2.In your app, add the required dependencies and initialise the library for it to compile the mapping files.

```javascript
var eventMapper = require('event-mapper');

var mappers = eventMapper.init('./test-definitions/');

    var dto = {
        "Field1": "12345",
        "Field2": "99999912345X",
        "Field3": 200
    };

var event = eventMapper.map(dto, mappers['TestEvent1']);

console.log(event);

//returns a structured json containing the event
// {
//   TestEvent1: {
//     FieldDest1: '12345',
//     FieldDest2: '99999912345X',
//     SchemeData: { FieldDest3: 200 }
//   }
// }

console.log(event.TestEvent1.SchemeData.FieldDest3);

//200

```
