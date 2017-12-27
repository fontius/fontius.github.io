// presale.js 2017.10.15 djh

var IcoInstance,
    TokInstance;

function SetEl(elId, valueS) {
  document.getElementById(elId).innerHTML = valueS;
}

function PicosToPIOEs(picos) {
  // picos is expected to be a BigNumber return from a Dapp call
  return picos.dividedBy(10**12).toNumber();
};

function WeiToEtherDec2(wei) {
  return parseFloat(web3.fromWei(wei, 'ether')).toFixed(2);
}

function CallAndSetS(fn, id) {
  fn(function(e, res) {
    if (e)
      console.error(e);
    else
      SetEl(id, res);
  })
}

function CallAndSetPIOEs(fn, id) {
  fn(function(e, res) {
    if (e)
      console.error(e);
    else
      SetEl(id, PicosToPIOEs(res).toLocaleString());
  })
}

function CallAndSetETH(fn, id) {
  fn(function(e, res) {
    if (e)
      console.error(e);
    else
      SetEl(id, WeiToEtherDec2(res));
  })
}

function CallAndSetPicosSold() {
  IcoInstance.picosSold(function(e, res) {
    if (e)
      console.error(e);
    else{
      let pioesSold = PicosToPIOEs(res),
         progressPc = pioesSold / 10000.0;
      // Update progress bar
      $("#progressBar")
        .css("width", progressPc + "%")
        .attr("aria-valuenow", progressPc);
      //.text(progressPc + "%");
      SetEl('PIOEsSold', pioesSold.toLocaleString());
      SetEl('ProgressPc', progressPc.toFixed(1));
    }
  })
}

function ShowEl(elId) {
  document.getElementById(elId).style.display = 'block';
}

function HideEl(elId) {
  document.getElementById(elId).style.display = 'none';
}

function IAgreeClick() {
  SetEl('PopupHdg', 'Wallet Instructions to Send ETH to Purchase Pacio Presale Tokens');
  HideEl('Terms');
  ShowEl('BuyDetails');
}

window.onload = function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  // if (typeof web3 !== 'undefined') {
  //   // console.warn("Using web3 detected from external source. If you find that the page doesn't load correctly, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
  //   // Use Mist/MetaMask's provider
  //   window.web3 = new Web3(web3.currentProvider);
  // }else{
  //  console.warn("No web3 detected. Using Infura");
  // No. Use own web3 even if MetaMask is loaded as that gave problems
    web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/wWSn0Kji2EQ8AywGzJkz"));
  //}
  // Start
  // Bootstrap the FundingHub abstraction for Use.
// PacioICO abi
let abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"picos","type":"uint256"}],"name":"Mint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"ResumeTokenContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"picosCap","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"picosPerEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vPCwalletA","type":"address"}],"name":"ChangePCWallet","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"weiRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"Resume","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"PauseTokenContract","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vNameS","type":"string"},{"name":"vStartTime","type":"uint256"},{"name":"vPicosCap","type":"uint256"},{"name":"vPicosPerEther","type":"uint256"},{"name":"vTokenA","type":"address"},{"name":"vPCwalletA","type":"address"}],"name":"PrepareToStart","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"Pause","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vFounderTokensA","type":"address"},{"name":"vFoundationTokensA","type":"address"},{"name":"vFounderTokensAllocation","type":"uint256"},{"name":"vFoundationTokensAllocation","type":"uint256"}],"name":"SetFFSettings","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"picosSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"startTime","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"Buy","outputs":[],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"PIOE","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"picos","type":"uint256"}],"name":"Burn","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"IcoCompleted","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vPicosPerEther","type":"uint256"}],"name":"SetPicosPerEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"picos","type":"uint256"}],"name":"Destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerA","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vSupplierA","type":"address"},{"name":"wad","type":"uint256"},{"name":"picos","type":"uint256"}],"name":"Allocate","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vFounderTokensVesting","type":"uint256"},{"name":"vFoundationTokensVesting","type":"uint256"}],"name":"VestFFTokens","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vNewOwnerA","type":"address"}],"name":"ChangeTokenContractOwner","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vNewOwnerA","type":"address"}],"name":"ChangeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pausedB","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Name","type":"string"},{"indexed":false,"name":"StartTime","type":"uint256"},{"indexed":false,"name":"PicosCap","type":"uint256"},{"indexed":false,"name":"TokenContract","type":"address"},{"indexed":false,"name":"PCwallet","type":"address"}],"name":"LogPrepareToStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"PicosPerEther","type":"uint256"}],"name":"LogSetPicosPerEther","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"PCwallet","type":"address"}],"name":"LogChangePCWallet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Purchaser","type":"address"},{"indexed":false,"name":"SaleWei","type":"uint256"},{"indexed":false,"name":"Picos","type":"uint256"}],"name":"LogSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Supplier","type":"address"},{"indexed":false,"name":"SuppliedWei","type":"uint256"},{"indexed":false,"name":"Picos","type":"uint256"}],"name":"LogAllocate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"WeiRaised","type":"uint256"},{"indexed":false,"name":"PicosSold","type":"uint256"}],"name":"LogSaleCapReached","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"PreviousOwner","type":"address"},{"indexed":false,"name":"NewOwner","type":"address"}],"name":"LogOwnerChange","type":"event"},{"anonymous":false,"inputs":[],"name":"LogPaused","type":"event"},{"anonymous":false,"inputs":[],"name":"LogResumed","type":"event"}]
let IcoA = '0x2b94E0c6cCB25ccF6B2DfA1A286712eb565437Ee';
let myContract = web3.eth.contract(abi);
IcoInstance = myContract.at(IcoA);
// PacioToken  abi
abi = [{"constant":true,"inputs":[],"name":"saleInProgressB","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"PrepareForSale","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"picos","type":"uint256"}],"name":"Mint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"SaleCapReached","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"icoCompleteB","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"Resume","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokensAvailable","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isEIP20Token","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"Pause","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contributors","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"guy","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vFounderTokensA","type":"address"},{"name":"vFoundationTokensA","type":"address"},{"name":"vFounderTokensAllocation","type":"uint256"},{"name":"vFoundationTokensAllocation","type":"uint256"}],"name":"SetFFSettings","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"tokensIssued","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"founderTokensVested","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vNewOwnerA","type":"address"}],"name":"Initialise","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundationTokensVested","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"picos","type":"uint256"}],"name":"Issue","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"picos","type":"uint256"}],"name":"Burn","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"IcoCompleted","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"picos","type":"uint256"}],"name":"Destroy","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"foundationTokensAllocated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"guy","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"ownerA","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vFounderTokensVesting","type":"uint256"},{"name":"vFoundationTokensVesting","type":"uint256"}],"name":"VestFFTokens","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"vNewOwnerA","type":"address"}],"name":"ChangeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"founderTokensAllocated","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pausedB","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Dst","type":"address"},{"indexed":false,"name":"Picos","type":"uint256"}],"name":"LogIssue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"TokensIssued","type":"uint256"}],"name":"LogSaleCapReached","type":"event"},{"anonymous":false,"inputs":[],"name":"LogIcoCompleted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Src","type":"address"},{"indexed":false,"name":"Picos","type":"uint256"}],"name":"LogBurn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Picos","type":"uint256"}],"name":"LogDestroy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Sender","type":"address"},{"indexed":true,"name":"Spender","type":"address"},{"indexed":false,"name":"Wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"PreviousOwner","type":"address"},{"indexed":false,"name":"NewOwner","type":"address"}],"name":"LogOwnerChange","type":"event"},{"anonymous":false,"inputs":[],"name":"LogPaused","type":"event"},{"anonymous":false,"inputs":[],"name":"LogResumed","type":"event"}];
myContract = web3.eth.contract(abi);
let TokA = '0x18dfd8c468ed83397C0E1caDAe01E1e65E86d275';
TokInstance = myContract.at(TokA);

CallAndSetPicosSold();
CallAndSetPIOEs(IcoInstance.picosPerEther, 'PIOEsPerEther');
CallAndSetETH(IcoInstance.weiRaised, 'EthRaised');
CallAndSetS(TokInstance.contributors, 'Contributors');

document.getElementById('IAgreeBtnId').addEventListener('click', IAgreeClick);

}
