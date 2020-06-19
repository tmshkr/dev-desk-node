exports.seed = function (knex, Promise) {
	return knex('tickets')
		.truncate()
		.then(function () {
			return knex('tickets').insert([
				{
					id: 1,
					postedBy: 1,
					postedAt: Date.now(),
					claimedBy: 1,
					status: 'OPEN',
					title: 'Ticket 1',
					description: 'Ticket 1 description text ',
				},
				{
					id: 2,
					postedBy: 2,
					postedAt: Date.now(),
					claimedBy: 1,
					status: 'OPEN',
					title: 'Ticket 2',
					description: 'Ticket 2 description text ',
				},
				{
					id: 3,
					postedBy: 2,
					postedAt: Date.now(),
					claimedBy: 1,
					status: 'OPEN',
					title: 'Ticket 3',
					description: 'Ticket 3 description text ',
				},
				{
					id: 4,
					postedBy: 1,
					postedAt: Date.now(),
					claimedBy: 2,
					status: 'OPEN',
					title: 'Ticket 4',
					description: 'Ticket 4 description text ',
				},
			]);
		});
};