import ILevel from '../interfaces/level';

const levels: ILevel[] = [
	{
		name: 'Easy',
		width: 16,
		height: 16,
		bombs: 50,
		time: 300,
	},
	{
		name: 'Medium',
		width: 20,
		height: 20,
		bombs: 100,
		time: 300,
	},
	{
		name: 'Hard',
		width: 30,
		height: 30,
		bombs: 200,
		time: 300,
	},
	{
		name: 'Ultra',
		width: 30,
		height: 30,
		bombs: 500,
		time: 300,
	}
]

export default levels;
