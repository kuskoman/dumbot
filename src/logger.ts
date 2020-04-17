export class DumbotLogger {
  private logFn: LogFn;
  constructor(opts: LoggerOpts = {}) {
    this.logFn = opts.logFn || defaultOpts.logFn;
  }
  public info(input: any) {
    this.logFn(`[${+new Date()} INFO] ${input}`);
  }
  public debug(input: any) {
    this.logFn(`[${+new Date()} DEBUG] ${input}`);
  }
}

// todo: allow disabling debug

const defaultOpts = {
  logFn: (a: any) => {
    console.log(a);
  },
};

export interface LoggerOpts {
  logFn?: LogFn;
}

export type LogFn = (input: any) => void;
export const logger = new DumbotLogger();
export default logger;
