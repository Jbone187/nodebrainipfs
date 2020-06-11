const ipfsClient = require("ipfs-http-client");
const brain = require("brain.js");

let ipfs = ipfsClient("localhost", "5001", { protocol: "http" });

const validCID = "QmTVuzT4GTcYwvbsrcawxY1pM6NcNj5Lr7eD5z8g9hhE13";

console.log(typeof validCID);

const stream = ipfs.getReadableStream(validCID);

stream.on("data", file => {
  // write the file's path and contents to standard out
  console.log(file.path);
  if (file.type !== "dir") {
    file.content.on("data", data => {
      //console.log(data.toString());

      var trainData = [];
      let val = data.toString();
      trainData.push(val);
      console.log(trainData);

      const net = new brain.recurrent.LSTM();

      net.train(trainData, {
        iterations: 100
      });

      const output = net.run("What");
      console.log(output);
    });
    //file.content.resume();
  }
});
