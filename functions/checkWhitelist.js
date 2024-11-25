// functions/checkWhitelist.js

const whitelist = require('./whitelist.json');
  
  exports.handler = async (event, context) => {
    const { wallet } = event.queryStringParameters;
  
    if (!wallet) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "No wallet parameter provided." }),
      };
    }
  
    // Basic Wallet Address Validation
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletRegex.test(wallet)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Invalid wallet address format." }),
      };
    }
  
    // Normalize wallet address for comparison
    const normalizedWallet = wallet.toLowerCase();
  
    // Check if the wallet is in the whitelist
    const isWhitelisted = whitelist.some(addr => addr.toLowerCase() === normalizedWallet);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, whitelisted: isWhitelisted }),
    };
  };
  