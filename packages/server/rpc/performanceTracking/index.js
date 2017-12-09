const { method } = require('@bufferapp/micro-rpc');
const StatsD = require('node-dogstatsd').StatsD;

const dogstatsd = new StatsD('dd-agent.default');

module.exports = method(
  'performance',
  'track performance',
  ({ data }) => {
    if (!data.tags) data.tags = [];
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
