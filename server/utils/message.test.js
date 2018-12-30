const expect = require("expect");
const { generateMessage, generateLocationMessage } = require("./message");

describe("generateMessage", () => {
  it("should generate correct message object", () => {
    const from = "shivam";
    const text = "Hello world";
    const message = generateMessage(from, text);
    expect(message.createdAt).toBeA("number");
    expect(message).toInclude({ from, text });
  });
});

describe("generateLocationMessage", () => {
  const from = "Admin";
  const latitude = 22;
  const longitude = 75;
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

  it("should generate correct url", () => {
    const result = generateLocationMessage(from, latitude, longitude);
    expect(result.createdAt).toBeA("number");
    expect(result).toInclude({ from, url });
  });
});
