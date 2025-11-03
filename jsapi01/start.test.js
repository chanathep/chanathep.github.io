const { startServer } = require('./index');

describe('startServer', () => {
  let server;
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    server = startServer();
  });

  afterEach((done) => {
    consoleLogSpy.mockRestore();
    server.close(done);
  });

  it('should start the server and log a message', (done) => {
    server.on('listening', () => {
      expect(consoleLogSpy).toHaveBeenCalledWith('API listening at http://localhost:3000');
      done();
    });
  });
});