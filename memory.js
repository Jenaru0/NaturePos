const v8 = require('v8');

console.log(
  `Memoria asignada máxima (MB): ${
    v8.getHeapStatistics().heap_size_limit / 1024 / 1024
  }`,
);
