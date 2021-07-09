var expect = require('chai').expect;
var eventMapper = require('../');

it('Test mapping from dto to event', function (done) {

    var mappers = eventMapper.init('./test-definitions/');

    var dto = {
        "Field1": "12345",
        "Field2": "99999912345X",
        "Field3": 200
    };

    var event = eventMapper.map(dto, mappers['TestEvent1']);

    var field1 = event.TestEvent1.FieldDest1;
    var field2 = event.TestEvent1.FieldDest2;
    var field3 = event.TestEvent1.SchemeData.FieldDest3;

    expect(dto.Field1).to.equal(field1);
    expect(dto.Field2).to.equal(field2);
    expect(dto.Field3).to.equal(field3);


    var event2 = eventMapper.map(dto, mappers['TestEvent2']);

    var e2Field1 = event2.TestEvent2.FieldDest1;
    var e2Field2 = event2.TestEvent2.FieldDest2;
    var e2Field3 = event2.TestEvent2.SchemeData.FieldDest3;

    expect(dto.Field1).to.equal(e2Field1);
    expect(dto.Field2).to.equal(e2Field2);
    expect(dto.Field3).to.equal(e2Field3);

    done();

});