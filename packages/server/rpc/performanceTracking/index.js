const { method, createError } = require('@bufferapp/micro-rpc');
const StatsD = require('node-dogstatsd').StatsD;

const dogstatsd = new StatsD('dd-agent.default');

module.exports = method(
  'performance',
  'track performance',
  ({ measures }) => {
    const processedMeasures = measures.map((data) => {
      if (!data.tags) data.tags = [];
      if (!data.name) throw createError({ message: 'can\'t save a measure without a valid data.name' });
      if (!data.duration) throw createError({ message: 'can\'t save a measure without a valid data.duration' });
      data.tags.push('app:publish');
      data.name = `buffer.perf.${data.name}`;

      dogstatsd.histogram(
        data.name,
        data.duration,
        1,
        data.tags,
      );
      return data;
    });
    return processedMeasures;
  });
