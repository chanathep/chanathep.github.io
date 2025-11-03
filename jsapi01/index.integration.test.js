const child_process = require('child_process');
const path = require('path');

describe('index.js integration', () => {
  it('should start the server when run directly', (done) => {
    const filePath = path.join(__dirname, 'index.js');
    const process = child_process.fork(filePath, [], { silent: true });

    let output = '';
    const listener = (data) => {
      output += data.toString();
      if (output.includes('API listening at http://localhost:3000')) {
        process.kill();
      }
    };
    process.stdout.on('data', listener);

    process.on('exit', () => {
      expect(output).toContain('API listening at http://localhost:3000');
      done();
    });
  });
});