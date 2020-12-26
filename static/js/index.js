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
    var decoffer_address = "0xe668a42a71dFb1ae624721a48C41dB13c8fC5BAF";
    var decoffer_abi = [{"constant":false,"inputs":[{"name":"_recommender","type":"address"}],"name":"invest","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"quick_withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recommender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"coffer_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recommender_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_parameter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"cancel_authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_ct","type":"uint256"},{"name":"_eth","type":"uint256"},{"name":"_user","type":"address"}],"name":"CT_swap_ETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]
    var ct_address = "0xd4478Bb7AF4BF53f9744Ad3d85596C098e22ff13";
    var ct_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

    de_coffer = new ethers.Contract(decoffer_address, decoffer_abi, signer);
    ct_token = new ethers.Contract(ct_address, ct_abi, signer);
    


    var now_balance = await de_coffer.get_balance();;
    $("#now_balance").text(ethers.utils.formatUnits(now_balance));

    var owner = await de_coffer.owner();

    //fee
    var least_invest = await de_coffer.fee_info(1,1);       // 1-1最小投資金額
    var exchange_rate = await de_coffer.fee_info(1,2);      //1-2匯兌比 ，目前CT價格12%off
    var credit_weight = await de_coffer.fee_info(1,3);      //1-3 credit的權重
    var actual_profit = await de_coffer.fee_info(1,4);      //1-4 Actual profit
    var profit_rake = await de_coffer.fee_info(1,5);        //1-5收益抽成 
    var RT1_fee = await de_coffer.fee_info(2,1);            //2-1推薦一代 
    var RT2_fee = await de_coffer.fee_info(2,2);            //2-2推薦二代  
    var recommender_cond = await de_coffer.fee_info(2,3);   //2-3推薦資格
    var credit = await de_coffer.fee_info(3,1);             //2-3推薦資格   

    

    //coffer_info
    var earned_bonus = await de_coffer.coffer_info(coinbase,0);
    var coffer_value = await de_coffer.coffer_info(coinbase,1);
    var save_price = await de_coffer.coffer_info(coinbase,2);
    var payable = await de_coffer.coffer_info(coinbase,3);
    var credit = await de_coffer.coffer_info(coinbase,4);
    var get_CT = await de_coffer.coffer_info(coinbase,5);
    $("#coffer_value").text(ethers.utils.formatUnits(coffer_value));
    $("#earned_bonus").text(ethers.utils.formatUnits(earned_bonus));

    //reaommender_info
    var my_recommender = await de_coffer.recommender(coinbase);
    var RT1 = await de_coffer.recommender_number(coinbase,1);
    var RT2 = await de_coffer.recommender_number(coinbase,2);
    $("#my_recommender").text(my_recommender);
    $("#recommender_number").text(Number(RT1)+Number(RT2));

    //CT_info
    var CT_balance = await ct_token.balanceOf(coinbase);
    var owner_balance = await ct_token.balanceOf(owner);
    var destroy = await ct_token.balanceOf("0x0000000000000000000000000000000000000000");
    var totalSupply = await ct_token.totalSupply();
    var out_share = totalSupply-owner_balance-destroy;
    $("#CT_balance").text(ethers.utils.formatUnits(CT_balance));
    $("#destroy").text(ethers.utils.formatUnits(destroy));
    $("#out_share").text(toPoint_6(out_share/(10**18)));
    $("#hold_rate").text(toPercent(CT_balance/out_share));

    var CT_price = now_balance/out_share;
    $("#ct_price").text(CT_price);

    
    // withdraw line

    var profit = (CT_price*get_CT)-save_price;
    var Actual_Profit = profit*actual_profit/1000;
    var discount = profit-Actual_Profit;
    var line = toPercent(discount/payable);    
    $("#withdraw_line").text(line);
    $("#profit").text(toPoint_8(Actual_Profit/(10**18)));
    
    

    
 


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