const MIN_DELAY_MS = 0;
const MAX_DELAY_MS = 2500;

function getRandomDelayTime () {
  return Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1) + MIN_DELAY_MS);
}