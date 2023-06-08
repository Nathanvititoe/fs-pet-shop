
const regex = /\/pets\/(\d+)/;
const url = "/pets/456";

const matches = url.match(regex);

if (matches) {
  const digits = matches[1];
  console.log("Digits extracted:", digits);
} else {
  console.log("No match found");
}