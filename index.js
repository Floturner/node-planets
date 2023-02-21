const fs = require('fs');
const { parse } = require('csv-parse');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
	return (
		planet.koi_disposition === 'CONFIRMED' &&
		planet.koi_insol > 0.36 &&
		planet.koi_insol < 1.11 &&
		planet.koi_prad < 1.6
	);
};

const logHabitablePlanetsName = (planets) =>
	planets.forEach((planet, index) => {
		console.log(`${index + 1} - ${planet.kepler_name}`);
	});

fs.createReadStream('./kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on('data', (data) => {
		if (isHabitablePlanet(data)) {
			habitablePlanets.push(data);
		}
	})
	.on('error', (err) => {
		console.error('Error ==>', err);
	})
	.on('end', () => {
		console.log('-----------------------');
		console.log('Habitable planets');
		logHabitablePlanetsName(habitablePlanets);
		console.log('-----------------------');
	});
