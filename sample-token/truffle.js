module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    }
  }
};

// module.exports = {
//   networks: {
//     development: {
//       host: '192.168.27.101',
//       port: 8545,
//       gas: 4700000,
//       network_id: '3'
//     }
//   }
// };
