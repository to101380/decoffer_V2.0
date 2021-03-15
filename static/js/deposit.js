



// 將數值計算至小數點後四位

function toPoint_2(point) {
    var str = Number(point).toFixed(2);
    return str;
}


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
    var str=Number(point*100).toFixed(2);
    str+="%";
    return str;
}


// 調用智能合約
var decoffer_address
var de_coffer;
var ct_token;
var coinbase;
var CT_price;
var ct_totalSupply;
var _fine;
var owner;

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
    $("#check_address").text(replace_part); 
   

    // 取得帳號餘額
    var balance = await signer.getBalance(); 
    var simple_balance = toPoint_4(ethers.utils.formatUnits(balance));     
    $("#my_balance").text(simple_balance);

  

    // 建立合約
    decoffer_address = "0x17f93904ac6670Cfc4d452d439c9ef884fCc4Aba";
    var decoffer_abi = [{"constant":false,"inputs":[],"name":"safe","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"coffer_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_parameter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_out_share","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"cancel_authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"input","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"Deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_ct","type":"uint256"},{"name":"_eth","type":"uint256"},{"name":"_user","type":"address"}],"name":"CT_swap_ETH","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":true,"stateMutability":"payable","type":"constructor"}]
    var ct_address = "0x2D277e2555031e6eD79aaEd3379fC28C15AD303a";
    var ct_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]

    de_coffer = new ethers.Contract(decoffer_address, decoffer_abi, signer);
    ct_token = new ethers.Contract(ct_address, ct_abi, signer);    


    var now_balance = await de_coffer.get_balance();
    $("#now_balance").text(ethers.utils.formatUnits(now_balance));

    owner = await de_coffer.owner();


      
  

    //fee
    var minimum_amount = await de_coffer.fee_info(1,1);     //1-1最小投資金額
    var exchange_rate = await de_coffer.fee_info(1,2);      //1-2匯兌比 (default : 120)
    var actual_profit = await de_coffer.fee_info(1,4);      //1-4實際獲利比 (default : 90)
    var profit_rake = await de_coffer.fee_info(1,5);        //1-5收益抽成  (default : 30)
    var credit_rate = await de_coffer.fee_info(3,1);        //3-1信用成數比例 (default : 20)    
    

    //coffer_info   
    var coffer_value = await de_coffer.coffer_info(coinbase,1);
    var save_price = await de_coffer.coffer_info(coinbase,2);
    var credit = await de_coffer.coffer_info(coinbase,3);
    var get_CT = await de_coffer.coffer_info(coinbase,4);  
    $("#coffer_value").text(ethers.utils.formatUnits(coffer_value));    
    $("#payable_CT").text(toPoint_6(ethers.utils.formatUnits(get_CT)));
    

    //CT_info
    var CT_balance = await ct_token.balanceOf(coinbase);   
    var out_share = await de_coffer.get_out_share(); 
    var allowance = await ct_token.allowance(coinbase,decoffer_address);     
    ct_totalSupply = await ct_token.totalSupply();             
    $("#CT_balance").text(toPoint_4(ethers.utils.formatUnits(CT_balance)));
    $("#my_CT").text(toPoint_6(ethers.utils.formatUnits(CT_balance))); 
    $("#hold_rate").text(toPercent(CT_balance/out_share));
    

    if(CT_balance < get_CT ){
        $("#error").css("display","block");
        $("#tick").css("display","none");
        $("#withdraw_condition").css("color","red");
    }

    if(allowance>Number(CT_balance)){
        $("#withdraw_btn").css("display","block");
        $("#approve_btn").css("display","none");
        $("#withdraw_disbtn").css("display","none");
    }



   
    
  

    var CT_price = now_balance/out_share;       
    $("#ct_price").text(toPoint_8(CT_price));



//------------------------------------------------------------------------
    //------------------計算獲利-------------
    var profit = get_CT*CT_price; // 計算持有的CT目前價格
    profit = profit-save_price;   // 目前價格 - 儲存價格 = 當前獲利 
    var actual = profit*actual_profit/1000;  // 當前獲利乘上配比成數    
    var after_fee = actual-(actual*profit_rake/1000);//配比後的獲利減掉手續費

    // if(after_fee<0){
    //     after_fee = 0;
    // }

    var sum = Number(coffer_value)+after_fee // 本利和
    $("#profit").text(toPoint_4(after_fee/10**18));
    $("#total_value").text(toPoint_4(sum/10**18));
    $("#check_total_profit").text(toPoint_4(sum/10**18));


    //------------------計算違約金-------------
    var discount = profit - actual; // 當前獲利-實際獲利 = 折抵金額
    var fin = credit-discount;      // 應付金額 - 折抵金額 = 當前違約金額

    if(fin<0){
        fin = 0;
    }

    $("#fin").text(toPoint_4(fin/10**18));
    $("#check_fin").text(toPoint_4(fin/10**18));

    //------------------確認最後提領金額-------------
    var check_actual_profit = sum-fin;
    $("#check_actual_profit").text(toPoint_4(check_actual_profit/10**18));
 
//------------------------------------------------------------------------




    const set_save_amount = () => {
        var save_amount = $("#ticket .save_amount").val(); 
        $("#check_save_amount").text(save_amount);

        var ct_amount = save_amount-(save_amount*exchange_rate/1000);
        ct_amount = ct_amount*out_share/now_balance;
        $("#check_ct_amount").text( toPoint_4(ct_amount));
    }; 



    // keyup 資訊給使用者確認明細
    // 確認轉出對象及金額
    set_save_amount();    


    $("#ticket").on("keyup", ".save_amount", set_save_amount);
  





    $(document).ready(function(){
    $.ajax({
            method:"GET",
            url: "https://api.coinlore.net/api/ticker/?id=80",        
          }).done(function(msg) {   
            console.log(msg);
            var ETH_price = (msg[0].price_usd); 
            $("#ETH_price").text(toPoint_4(ETH_price*sum/10**18));

            var ETH_CT_price = ETH_price*CT_price;
            ETH_CT_price = ETH_CT_price*CT_balance/10**18;
            $("#ETH_CT_price").text(toPoint_2(ETH_CT_price));
            
          });
    })




  
  

    
}

SHOW_CONTRACT();

var comfirm_transfer = document.querySelector("#confirm_invest");
comfirm_transfer.addEventListener("click", async (e) => {
    e.preventDefault();
    var save = document.querySelector(".save_amount").value;   
    var amount = (Number(save)).toString();     

    let overrides = {        
        value: ethers.utils.parseEther(amount)     // ether in this case MUST be a string       
    };   
    
    _save_coffer(overrides);
     
   
});




function _save_coffer(overrides){

    let tx = de_coffer.Deposit(overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}



function _withdraw(){ 

    let tx = de_coffer.withdraw().then(function(receipt){             
         location.reload();          
     });;
                 
      
}





function approve_ct(){

    let tx = ct_token.approve(decoffer_address,ct_totalSupply).then(function(receipt){             
         location.reload();          
     });;
                 
      
}




