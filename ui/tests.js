// QUnit.test( "hello test", function( assert ) {
//   assert.ok( 1 == "1", "Passed!" );
// });

QUnit.test('test renderFloatsTo2DecimalPlaces on floats', function(assert){
  var testStr = '1.019342194';
  assert.ok( renderFloatsTo2DecimalPlaces(testStr)>=1.01 && renderFloatsTo2DecimalPlaces(testStr)<=1.02, "Passed!");
});

QUnit.test('test renderFloatsTo2DecimalPlaces on integers', function(assert){
  var testStr = '1';
  assert.ok( renderFloatsTo2DecimalPlaces(testStr)==1, "Passed!");
});

// QUnit.test('test varNameComparator', function(assert){
//   assert.ok( varNameComparator({varName:'a___2'},{varName:'a___10'})<0, "Passed!");
// });