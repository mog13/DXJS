/**
 * Created by morganowen on 05/05/16.
 */
describe('unit tests for the dice object', function () {
    var d4 = new dice('d4',[1,2,3,4]);
    var d1 = new dice('d1',[1]);
    var elements = new dice('elements',['fire','wind','water','earth']);
    describe('it should properly create dice objects',function(){
      it('should create the correct amount of faces',function(){
        expect(d4.faces.length).toBe(4);
        expect(d1.faces.length).toBe(1);
        expect(elements.faces.length).toBe(4);
      });
      it('should store names of the dice',function(){
        expect(d4.name).toBe('d4');
        expect(d1.name).toBe('d1');
        expect(elements.name).toBe('elements');
      })
      it('shopuld initialize with a valuye of undefined',function(){
        expect(d1.value).toBe(undefined);
        expect(d4.value).toBe(undefined);
        expect(elements.value).toBe(undefined);
      })
    });

    describe('it should correctly be able to roll a given dice', function () {

        it('should never return a 0 and should include the number itself', function () {
            for (var i = 0; i < 10; i++) {
                expect(d1.roll()).toBe(1);
            }
        });

        it('it should return a number between 1 and the given value', function () {
            for (var i = 0; i < 10; i++) {
                var roll = d4.roll();
                expect(roll).toBeGreaterThan(0);
                expect(roll).toBeLessThan(5);
            }
        });

        it('should store the previous value',function(){
          var result = d4.roll();
          expect(result).toBe(d4.value);
        });
    });

});
