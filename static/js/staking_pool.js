// 將數值計算至小數點後四位


var apikey = {
    key:'8cd5ffee-da32-4ead-8913-ce590a512e2f'
}


$(document).ready(function(){
    $.ajax({
        method:"GET",
        url: "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY="+ apikey.key,                
      }).done(function(msg) {  
        
        console.log(msg); 
        console.log(msg.data.defi_market_cap);  
        $(".test").text(msg.data.defi_market_cap);      

      });


})









function toPoint_3(point) {
    var str = Number(point).toFixed(3);
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
    var str=Number(point*100).toFixed(8);
    str+="%";
    return str;
}


// 調用智能合約
var staking_pool_address;
var staking_pool;
var ct_staking;
var coinbase;


async function SHOW_CONTRACT() {
    // 確認是否有window.ethereum
    if (window.ethereum) {
        // 啟用metamask
        await window.ethereum.enable();
        web3 = new ethers.providers.Web3Provider(window.ethereum);
        $("#install_wallet").css("display","none");

    } else {
        // will default to localhost:8545
        web3 = new ethers.providers.JsonRpcProvider();
        $("#loader").css("display","none");
       
    }



    // 取得帳號
    const signer = web3.getSigner();   
    coinbase = await signer.getAddress();

    var hidden_str = (coinbase.substring(6,38));
    var replace_part = coinbase.replace(hidden_str,"...");            
    $("#my_address").text(replace_part);
   

    // 取得帳號餘額
    var balance = await signer.getBalance();      
    $("#my_balance").text(toPoint_3(ethers.utils.formatUnits(balance)));

  

    // 建立合約
    staking_pool_address = "0xc066D333A9940e571eCac09A7f08Aa2eFEBC5da8";
    var ct_staking_address = "0x6726b998CE7e8c538b491f48C45E7d877df6ea43";
    var staking_pool_abi =[{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"set_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_liquid","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_profit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"staking_value","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_minimum","type":"uint256"}],"name":"set_minimum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"to_de_coffer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"staking","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"get_fee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"loss_rights","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_to_coffer","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_liquid","type":"uint256"}],"name":"set_liquid","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"authorize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_contract","type":"address"}],"name":"no_authorize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_minimum","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorization","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"to_staking","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
    var ct_staking_aabi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
    staking_pool = new ethers.Contract(staking_pool_address,staking_pool_abi, signer);
    ct_staking = new ethers.Contract(ct_staking_address, ct_staking_aabi, signer);

    var weiUnit = 10**18;

    // pool_info
    var liquid = await staking_pool.get_liquid();
    var profit = await staking_pool.get_profit();   
    var fee = await staking_pool.get_fee();
    fee = fee/1000;
   
    

 
    //CTs_info
    var CTs_total_supply = await ct_staking.totalSupply();
    var destroy = await ct_staking.balanceOf("0x0000000000000000000000000000000000000000"); // 銷毀枚數
    var out_share = CTs_total_supply-destroy;   
    var CTs_balance = await ct_staking.balanceOf(coinbase);
    var rate = CTs_balance/out_share; // 持有的比例    
    $("#staking_hold").text(toPercent(rate));

    var CTs_approve = await ct_staking.allowance(coinbase,staking_pool_address);
    if(CTs_approve>0){
        $("#can_withdraw").css("display","block");
        $("#cant_withdraw").css("display","none");
        $("#approve_pool").css("display","none");
    }
    
    // my_info
    var staking_value = await staking_pool.staking_value(coinbase);
    $("#staking_amount").text(staking_value/weiUnit);
    if(staking_value > 0){
        $("#my_staking").css("display","block");
    }

    var loss_rights = await staking_pool.loss_rights(coinbase);
    $("#loss_right").text(toPoint_8(loss_rights/weiUnit));

    var distribute = Math.floor(profit*rate)-loss_rights;    
    $("#profit").text(distribute);
    
    
    //remove
    var remove_taken = Number(staking_value)+Number(distribute);
    $("#remove_taken").text(toPoint_8(remove_taken/weiUnit));

    var remove_fee = distribute*fee;   
    $("#remove_fee").text(remove_fee);

    var earn_total = remove_taken-remove_fee;
    $("#earn_total").text(toPoint_8(earn_total/weiUnit));
    if (earn_total != NaN || earn_total != null) {
        $("#staking_story").css("display","block");
        $("#loader").css("display","none");
    }

    const staking_amount = () => {
        var eth_amount = $("#ticket ._staking_amount").val(); 
        var eth_amount= eth_amount*weiUnit;
        var staking_fee = eth_amount*fee;
        $("#staking_fee").text(staking_fee/weiUnit);        
        var eth_amount = eth_amount-(staking_fee);
        $("#staking_value").text(eth_amount/weiUnit);
        var CTs_amount = eth_amount*out_share/(Number(liquid)+Number(profit));
        var hold_rate = CTs_amount/out_share;       

        $("#_staking_hold").text(toPercent(hold_rate));
       
    };


    // keyup 資訊給使用者確認明細
    // 確認轉出對象及金額
    staking_amount();
    

    $("#ticket").on("keyup", "._staking_amount", staking_amount);
  

    
}

SHOW_CONTRACT();

var confirm_staking = document.querySelector("#confirm_staking");
confirm_staking.addEventListener("click", async (e) => {
    e.preventDefault();
    var save = document.querySelector("._staking_amount").value;   
    var amount = (Number(save)).toString(); 
    

    let overrides = {        
        value: ethers.utils.parseEther(amount)     // ether in this case MUST be a string       
    };
   
    join_staking(overrides);
   
});




function join_staking(overrides){

    let tx = staking_pool.staking(overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}


function remove(){

    let rm = staking_pool.remove().then(function(receipt){             
         location.reload();          
     });;                 
      
}


function approve_cts(){
    let approve = ct_staking.approve(staking_pool_address,"300000000000000000000000").then(function(receipt){             
         location.reload();          
     });; 
}