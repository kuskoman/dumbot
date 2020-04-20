import { DumbotModule, Command } from "../src/module";
import moduleLoader from "../src/moduleLoader";

describe("module loader", () => {
  const mockedCommand: Command = {
    name: "mockedCommand",
    patterns: ["test"],
    execute: () => {
      return;
    },
  };

  const mockedModule: DumbotModule = {
    name: "testmodule",
    version: "1.0.0",
    description: "testmodule",
    commands: [mockedCommand],
  };
  it("loads module and command", () => {
    moduleLoader.registerModule(mockedModule);
    expect(moduleLoader.getCommand("test")).toBe(mockedCommand);
  });
});
