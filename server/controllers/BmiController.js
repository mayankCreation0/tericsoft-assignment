const BmiModel = require('../models/BmiModel');

const bmiCalculation = async (req, res) => {
    try {
        const { height, weight } = req.body;
        const user = req.userid;
        const heightInMeter = (height * 0.305)
        const bmi = weight / Math.pow(heightInMeter, 2);

        const calculation = new BmiModel({ user, height, weight, bmi });
        await calculation.save();

        return res.json({ bmi });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { bmiCalculation }