const photos = [
	{
		id: '0',
		src: 'https://loremflickr.com/320/240',
	},
	{
		id: '1',
		src: 'https://loremflickr.com/321/240',
	},
	{
		id: '2',
		src: 'https://loremflickr.com/322/240',
	},
	{
		id: '3',
		src: 'https://loremflickr.com/323/240',
	},
	{
		id: '4',
		src: 'https://loremflickr.com/324/240',
	},
];
document.addEventListener('DOMContentLoaded', () => {
	const gallery = new Gallery({
		photos,
		size: 5,
		current: '2',
		container: document.querySelector('#gallery'),
	});
});
