 // 將數值計算至小數點後四位



function toPoint_6(point) {
    var str = Number(point).toFixed(6);
    return str;
}



function toPoint_8(point) {
    var str = Number(point).toFixed(8);
    return str;
}




function toPercent(point){
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
}


// 調用智能合約
var de_coffer;
var ct_token;
var coinbase;
var CT_price;

async function SHOW_CONTRACT() {
    // 確認是否有window.ethereum
    if (window.ethereum) {
        // 啟用metamask
        await window.ethereum.enable();
        web3 = new ethers.providers.Web3Provider(window.ethereum);
    } else {
        // will default to localhost:8545
        web3 = new ethers.providers.JsonRpcProvider();
    }
    // 取得帳號
    const signer = web3.getSigner();   
    coinbase = await signer.getAddress();
    $("#my_address").text(coinbase);

    // 取得帳號餘額
    var balance = await signer.getBalance();      
    $("#my_balance").text(ethers.utils.formatUnits(balance));

  

    // 建立合約
    var decoffer_address = "0x85e4293478edC99E94e50aB0Fd73aBf61c2CBddc";
    var decoffer_abi = [{"constant":false,"inputs":[{"name":"_recommender","type":"address"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"quick_withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recommender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"coffer_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recommender_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_parameter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"cancel_authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ct","type":"uint256"},{"name":"_eth","type":"uint256"},{"name":"_user","type":"address"}],"name":"CT_swap_ETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]   
    var ct_address = "0xdc2DB76A8074116FcE6e4EAc6d20fb251819AEc5";
    var ct_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

    de_coffer = new ethers.Contract(decoffer_address, decoffer_abi, signer);
    ct_token = new ethers.Contract(ct_address, ct_abi, signer);
    


    var now_balance = await de_coffer.get_balance();;
    $("#now_balance").text(ethers.utils.formatUnits(now_balance));
    
    var coffer_value = await de_coffer.coffer_info(coinbase,1);
    $("#coffer_value").text(ethers.utils.formatUnits(coffer_value));

    var CT_balance = await de_coffer.get_CT_balance(coinbase);
    $("#CT_balance").text(ethers.utils.formatUnits(CT_balance));

    var CT_payable = await de_coffer.CT_payable(coinbase);
    $("#CT_payable").text(ethers.utils.formatUnits(CT_payable));

    var paid = await de_coffer.paid(coinbase);
    $("#paid").text(ethers.utils.formatUnits(paid));

    var out_share = await de_coffer.CT_out_share();
    $("#out_share").text(ethers.utils.formatUnits(out_share));

    var hold_rate = CT_balance/out_share;
     $("#hold_rate").text(toPercent(hold_rate));

    var retain = await de_coffer.get_retain();
    var payable_fee = await de_coffer.get_payable_fee();


    
    CT_price = pool/out_share;
    $("#CT_price").text(toPoint_8(CT_price));


    const set_save_amount = () => {
    var save_amount = $("#ticket .save_amount").val();

    var save_retain = save_amount*retain/1000
    var get_CT =(save_amount-save_retain)/CT_price;

    var payable = get_CT+get_CT*payable_fee/1000;

    $("#check_save_amount").text(save_amount);
    $("#CT_amount").text(get_CT);
    $("#_CT_payable").text(payable);


    };


    const set_recommender = () => {
        var recommender = $("#ticket .recommender").val();
        $("#check_recommender").text(recommender);
    };



    // keyup 資訊給使用者確認明細
    // 確認轉出對象及金額
    set_save_amount();
    set_recommender();


    $("#ticket").on("keyup", ".save_amount", set_save_amount);
    $("#ticket").on("keyup", ".recommender", set_recommender);
  

    
}

SHOW_CONTRACT();

var comfirm_transfer = document.querySelector("#confirm_transfer");
confirm_transfer.addEventListener("click", async (e) => {
    e.preventDefault();
    var save = document.querySelector(".save_amount").value;   
    var amount = (Number(save)).toString(); 
    var recommender = document.querySelector(".recommender").value;

    let overrides = {        
        value: ethers.utils.parseEther(amount)     // ether in this case MUST be a string       
    };
   
    _save_coffer(recommender,overrides);
   
});














function _save_coffer(recommender,overrides){

    let tx = de_coffer.save_coffer(recommender,overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}