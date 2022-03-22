const HDWalletProvider = require("@truffle/hdwallet-provider");
const MNEMONIC =
  "7a7e034f5336a065ab484c669c28727cfd6a6fc7abf08f797804224eb2c2b8be";
//

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          MNEMONIC,
          "https://ropsten.infura.io/v3/aaa6d1fd89cf40aea63ef46ccfa91682"
        );
      },
      network_id: 3,
      gas: 4000000,
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.12",
    },
  },
};
