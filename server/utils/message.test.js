const expect = require("expect");
const { generateMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "shivam";
    const text = "Hello world";
    const message = generateMessage(from, text);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});