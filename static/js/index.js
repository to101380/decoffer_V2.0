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
    var contract_address = "0x681C2FC2335F1fe5F23500B7aC14D4418FE4273c";
    var contract_abi = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recommended_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_retain","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_retain","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_commission_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"CT_out_share","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"pay_CT","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_stocker","type":"address"}],"name":"set_stock","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_payable_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_commission_03_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_commission_03_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"eth_amount","type":"uint256"},{"name":"user","type":"address"}],"name":"CT_swap_ETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_platform_fee","type":"uint256"}],"name":"set_platform_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_commission_02_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_payable_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"now_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_commission_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_swap_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_commission_02_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"ETH_swap_CT","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"},{"name":"_value","type":"uint256"},{"name":"RC_01","type":"address"},{"name":"RC_02","type":"address"},{"name":"RC_03","type":"address"},{"name":"a","type":"uint256"},{"name":"b","type":"uint256"},{"name":"c","type":"uint256"}],"name":"migrate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"paid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_swap_fee","type":"uint256"}],"name":"set_swap_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_stock_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"authorize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_stock","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"CT_payable","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"no_authorize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stock","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorization","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"my_recommender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coffer_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recommender","type":"address"}],"name":"save_coffer","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"get_CT_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_platform_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_stock_fee","type":"uint256"}],"name":"set_stock_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_fee","type":"uint256"},{"name":"_payable_fee","type":"uint256"},{"name":"_stock_fee","type":"uint256"},{"name":"_platform_fee","type":"uint256"},{"name":"_swap_fee","type":"uint256"},{"name":"_commission","type":"uint256"},{"name":"_commission_02","type":"uint256"},{"name":"_commission_03","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"coffer_value","type":"uint256"},{"indexed":false,"name":"CT_amount","type":"uint256"}],"name":"swap_CT","type":"event"}]
    de_coffer = new ethers.Contract(contract_address, contract_abi, signer);
    


    var pool = await web3.getBalance(contract_address);
    $("#balance").text(ethers.utils.formatUnits(pool));
    // 讀取合約的兩個封裝變數，totalSupply()、balanceOf()
    var coffer_value = await de_coffer.coffer_value(coinbase);
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