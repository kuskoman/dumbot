export class DumbotLogger {
  public log(input: any) {
    console.log(`[${~~new Date()}] ${input}`);
  }
}

export const logger = new DumbotLogger();
export default logger;
