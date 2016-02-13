/**
 * Created by morganowen on 13/02/16.
 */
describe('unit tests for the utility functions', function () {

    describe('it should provide functionality to interpret a single dice roll ', function () {

        it('should never return a 0 and should include the number itself', function () {
            for (var i = 0; i < 10; i++) {
                expect(DX.utilities.roll('1')).toBe(1);
            }
        });

        it('it should return a number between 1 and the given value', function () {
            for (var i = 0; i < 10; i++) {
                var roll = DX.utilities.roll('6');
                expect(roll).toBeGreaterThan(0);
                expect(roll).toBeLessThan(7);
            }
        });
    });

    describe('it should evaluate a xdx roll providing individual information as well as total', function () {

        it('should repeat the roll by the amount given by the multiplier ', function () {
            expect(DX.utilities.evaluateRoll('3d1').values.length).toBe(3);
            expect(DX.utilities.evaluateRoll('843d4').values.length).toBe(843);

        });

        it('should repeat the roll by the amount given by the multiplier and sum them ', function () {
            expect(DX.utilities.evaluateRoll('3d1').total).toBe(3);
            for (var i = 0; i < 10; i++) {
                var roll = DX.utilities.evaluateRoll('2d6');
                expect(roll.total).toBeGreaterThan(1);
                expect(roll.total).toBeLessThan(13);
            }
        });


    })


});