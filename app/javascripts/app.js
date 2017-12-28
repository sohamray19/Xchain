// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// import "../node_modules/bootstrap/dist/css/bootstrap.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import main_artifact from '../../build/contracts/Main.json'

// Wallet is our usable abstraction, which we'll use through the code below.
var main = contract(main_artifact);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

window.App = {
  start: function() {
    var self = this;

    main.setProvider(web3.currentProvider);

    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

    // Get the initial account balance so it can be displayed.
    });
  },

  addProduct: function() {
    main.deployed().then(function(instance) {
      console.log(instance);
      var password = $("#password").val();
      var productId = $("#productId").val();
      console.log(password);
      console.log(productId);
      var s = instance.addProduct.sendTransaction(password, productId, {from:account,gas:500000});
      return s;
    }).then(function(er){
        if(er){
            if()
      document.getElementById("output1").innerHTML="added successfully";
  }
    });

  },

  checkOwner: function() {
    main.deployed().then(function(instance) {
      var productId = $("#productIdd").val();
      console.log(productId);
      var s = instance.hasEntry.call(productId, {from:account,gas:50000});
      return s;
    }).then(function(er){
      document.getElementById("output2").innerHTML=er.toString();
    });
},
registerUser : function() {
    main.deployed().then(function(instance){
        var password = $("#password").val();
        return instance.registerUser.sendTransaction(password, {from:account,gas:50000});
    }).then(function(result){
        document.getElementById("output3").innerHTML = result.toString();
    });
        //TODO: display the error message on screen instead of log, sharan look into it
},
fetchOwnerHash : function() {
    main.deployed().then(function(instance){
        var password = $("#password").val();
        return instance.fetchOwnerHash.sendTransaction({from : account, gas:50000});
    }).then(function(result){
        document.getElementById("output4").innerHTML = result.toString();
    });
},
transfer : function() {
    main.deployed().then(function(instance){
        var password = $("#password").val();
        var newOwner = $("#newOwner").val();
        var productId = $("#productId").val();

        return instance.transfer.sendTransaction(newOwner,password,productId,{from : account, gas:50000});
    }).then(function(result){
        document.getElementById("output5").innerHTML = result.toString();
    });
},

backtracking: function(){
    main.deployed().then(function(instance){
        var productId = $("#productId").val();
        return instance.track.sendTransaction({from : account, gas:50000});
    }).then(function(result){
        document.getElementById("output6").innerHTML = result.toString();
    });
}

};



window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  App.start();
});