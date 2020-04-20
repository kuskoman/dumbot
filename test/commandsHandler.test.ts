import { handleMessage } from "../src/commandsHandler";
import { Msg } from "../src/types";
import { PREFIX } from "../src/config";
import moduleLoader from "../src/moduleLoader";

describe("commandsHandler", () => {
  moduleLoader.getCommand = jest.fn();

  const mockedMsg = {
    content: `${PREFIX}testcommand args`,
  };
  it("handles commands properly", () => {
    handleMessage(mockedMsg as Msg);
    expect(moduleLoader.getCommand).toBeCalledWith("testcommand");
  });
});
