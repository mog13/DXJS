/**
 * Created by morganowen on 05/05/16.
 */
describe('unit tests for the DX object', function () {

    describe('it should correctly intialize with a d2-d20', function () {

        it('should have each dice accesable', function () {
          expect(DX.d2).not.toBe(undefined);
          expect(DX.d20).not.toBe(undefined);
          for(var n = 3; n<20; n++){
          expect(DX['d'+n]).not.toBe(undefined);
          }
        });


    });

    describe('it should be able to transfer a string to a dice and roll it',function(){
      it(' should not accept unformated input',function(){
          expect(1).toBe(1);
      });

      it('it should comply to the format dx',function(){
        for (var i = 0; i < 10; i++) {
            var roll = DX._evaluateSingleRoll('d4');
            expect(roll).toBeGreaterThan(0);
            expect(roll).toBeLessThan(5);
        }
      })
    });
});
