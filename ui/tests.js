// QUnit.test( "hello test", function( assert ) {
//   assert.ok( 1 == "1", "Passed!" );
// });

QUnit.test('test roundToTwoDecimalPlaces', function(assert){
  var testStr = '1.019342194';
  assert.ok( roundToTwoDecimalPlaces(testStr)>=1.01 && roundToTwoDecimalPlaces(testStr)<=1.02, "Passed!");
});