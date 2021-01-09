 // 將數值計算至小數點後四位

function toPoint_4(point) {
    var str = Number(point).toFixed(4);
    return str;
}


function toPoint_6(point) {
    var str = Number(point).toFixed(6);
    return str;
}



function toPoint_8(point) {
    var str = Number(point).toFixed(8);
    return str;
}




function toPercent(point){
    var str=Number(point*100).toFixed(4);
    str+="%";
    return str;
}


// 調用智能合約
var hight_staking_address;
var hight_staking;
var dt_token;
var coinbase;
var DT_price;
var out_share

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

    var hidden_str = (coinbase.substring(6,38));
    var replace_part = coinbase.replace(hidden_str,"...");            
    $("#my_address").text(replace_part);
   

    // 取得帳號餘額
    var balance = await signer.getBalance(); 
    var simple_balance = toPoint_4(ethers.utils.formatUnits(balance));     
    $("#my_balance").text(simple_balance);

  

    // 建立合約
    hight_staking_address = "0xaB003b52E249062371ACbB6eA9494BFDc310427f";
    var hight_staking_abi = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"staking_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_eth","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"profit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recommender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recommender_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorization","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recommender","type":"address"}],"name":"staking","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
    var dt_address = "0xC6B77D57d8664E8648Fba7F4CAAFa8e72FF57Ea0";
    var dt_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
    
    hight_staking = new ethers.Contract( hight_staking_address, hight_staking_abi, signer);
    dt_token = new ethers.Contract(dt_address, dt_abi, signer);
    


    

    var owner = await hight_staking.owner();


    // fee
    var minimum = await hight_staking.fee_info(1,1);   
    var withdraw_fee = await hight_staking.fee_info(1,2); 
    var RT_01 = await hight_staking.fee_info(2,1); 
    var RT_02 = await hight_staking.fee_info(2,2); 
    var RT_03 = await hight_staking.fee_info(2,3); 
    var liquid = await hight_staking.fee_info(3,1); 
    var distribute_rate = await hight_staking.fee_info(3,2); 

    //staking_info
    var staking_value = await hight_staking.staking_info(coinbase,1);  
    var loss_weight = await hight_staking.staking_info(coinbase,2);
    var get_token = await hight_staking.staking_info(coinbase,3);
    var bonus = await hight_staking.staking_info(coinbase,4); 
    $("#staking_value").text(ethers.utils.formatUnits(staking_value));
    $("#loss_weight").text(ethers.utils.formatUnits(loss_weight));
    $("#get_token").text(toPoint_6(ethers.utils.formatUnits(get_token)));
    $("#bonus").text(ethers.utils.formatUnits(bonus));

    //reaommender_info
    var my_recommender = await hight_staking.recommender(coinbase);
    var RT1 = await hight_staking.recommender_number(coinbase,1);
    var RT2 = await hight_staking.recommender_number(coinbase,2); 
    var RT3 = await hight_staking.recommender_number(coinbase,2);    
    $("#RTn").text(Number(RT1)+Number(RT2)+Number(RT2));

    var hidden_str = (my_recommender.substring(6,38));
    var replace_part = my_recommender.replace(hidden_str,"...");            
    $("#RT").text(replace_part);

    //DT_info    
    out_share = await dt_token.totalSupply(); 
    var my_dt = await dt_token.balanceOf(coinbase); 
    var hold_rate = get_token/out_share; 
    $("#hold_rate").text(toPercent(hold_rate));

    

    
  
    var profit = await hight_staking.profit();

    var fragments = await my_dt - get_token;
    fragments = fragments*profit/out_share;
    fragments = fragments-(fragments*withdraw_fee/1000); 
    $("#fragments").text(fragments/10**18);


    profit = Math.floor(profit*hold_rate)-loss_weight;   
    profit = profit - (profit*withdraw_fee/1000); 
    $("#profit").text(profit/10**18);
    
    

    const set_staking_amount = () => {
        var save_amount = $("#create_staking .staking_amount").val(); 
        var distribute = save_amount*distribute_rate/1000;
        $("#check_save_amount").text(save_amount);
        
    };


    const set_recommender = () => {
        var recommender = $("#create_staking .recommender").val();
        $("#check_recommender").text(recommender);
    };



    // keyup 資訊給使用者確認明細
    // 確認轉出對象及金額
    set_staking_amount();
    set_recommender();


    $("#create_staking").on("keyup", ".staking_amount", set_staking_amount);
    $("#create_staking").on("keyup", ".recommender", set_recommender);
  

    
}

SHOW_CONTRACT();

var confirm_staking = document.querySelector("#confirm_staking");
confirm_staking.addEventListener("click", async (e) => {
    e.preventDefault();
    var staking = document.querySelector(".staking_amount").value;   
    var amount = (Number(staking)).toString(); 
    var recommender = document.querySelector(".recommender").value;

    let overrides = {        
        value: ethers.utils.parseEther(amount)     // ether in this case MUST be a string       
    };
   
    _staking_coffer(recommender,overrides);
   
});




function _staking_coffer(recommender,overrides){

    let tx = hight_staking.staking(recommender,overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}

function dt_approve(){

    let tx = dt_token.approve(hight_staking_address,out_share).then(function(receipt){             
         location.reload();          
     });;
                 
      
}