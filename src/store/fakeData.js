import { faker } from "@faker-js/faker";
import { groupByToObject, groupByToMap } from "../helpers";
import {
  Teams,
  JobCapacities,
  SHIFT_BLOCKS,
  START_HOURS,
  BLOCK_SECONDS,
} from "../constants";

const movies = faker.helpers.multiple(
  () => ({
    title: faker.lorem.words({ min: 1, max: 5 }),
    //duration: 3600 + Math.random() * 3600, // between 1 and 2 hours
    blocks: Math.floor(Math.random() * 5) + 6, // pretend this is derived from duration :)
  }),
  { count: { min: 5, max: 10 } },
);

const users = Object.fromEntries(
  faker.helpers.multiple(
    () => [
      faker.internet.userName(),
      {
        password: "password",
      },
    ],
    { count: { min: 10, max: 50 } },
  ),
);

function generateShowings() {
  const moviesByBlocks = groupByToMap(movies, (movie) => movie.blocks)
  const movieBlocks = Array.from(moviesByBlocks.keys())
  let blocksLeft = SHIFT_BLOCKS;
  let fittingBlocks = movieBlocks.filter(
    (b) => b <= blocksLeft,
  );
  const blocks = [];
  while (fittingBlocks.length > 0) {
    const block = faker.helpers.arrayElement(fittingBlocks);
    blocks.push(block);
    blocksLeft -= block;
    fittingBlocks = movieBlocks.filter((b) => b <= blocksLeft);
  }
  let currentBlock = 0;
  return faker.helpers.shuffle(blocks).map((b) => {
    const start = currentBlock;
    currentBlock += b;
    return {
      title: faker.helpers.arrayElement(moviesByBlocks.get(b)).title,
      start,
    };
  });
}

const schedule = faker.helpers.multiple(
  () => {
    const movies = faker.helpers.multiple(
      () => generateShowings(),
      // For each booth
      { count: 6 },
    );
    // Put users on random teams...
    const usersByTeam = groupByToObject(Object.keys(users), () =>
      faker.helpers.arrayElement(Object.values(Teams)),
    );
    // ...and select random users.
    const volunteers = Object.fromEntries(
      Object.entries(usersByTeam).flatMap(([team, mates]) =>
        faker.helpers
          .arrayElements(mates, {
            // Cut away excess users
            min: 0,
            max: JobCapacities[team],
          })
          .map((user) => [user, team]),
      ),
    );
    return {
      movies,
      volunteers,
    };
  },
  { count: { min: 18, max: 24 } },
);

// Business days generator ignoring holidays
function* businessDays(
  start = new Date(),
  n = Infinity,
  isClosed = (day) => day.getDay() == 0,
) {
  for (
    let i = 0, day = new Date(start);
    i < n;
    day.setDate(day.getDate() + 1)
  ) {
    if (!isClosed(day)) {
      i += 1;
      yield new Date(day);
    }
  }
}

const dates = Array.from(
  businessDays(
    new Date(),
    schedule.length,
    (date) => date.getDay() == 1 || date.getDay() == 2,
  ),
);

const data = {
  users,
  schedule,
  dates,
};

export default data;
