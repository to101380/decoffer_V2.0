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
var CT_staking_address;
var CT_staking;
var cm_token;
var coinbase;
var cm_price;
var out_share;
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
   

    // 取得帳號餘額
    var balance = await signer.getBalance(); 
    var simple_balance = toPoint_4(ethers.utils.formatUnits(balance));     
    $("#my_balance").text(simple_balance);

  

    // 建立合約
    CT_staking_address = "0x431457e417178e58162d8F8059cE22CaFd28Ad03";
    var CT_staking_abi = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"staking_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"get_profit","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_cm","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"total_supply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_fee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"recommender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"recommender_number","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"authorize","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recommender","type":"address"}],"name":"staking","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"user","type":"address"}],"name":"cancel_authorization","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"input","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
    var cm_address = "0xa17E60F4f0A5b952f297988e4b483B9906067e56";
    var cm_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]
    
    CT_staking = new ethers.Contract( CT_staking_address, CT_staking_abi, signer);
    cm_token = new ethers.Contract(cm_address, cm_abi, signer);
    
    

    

    owner = await CT_staking.owner();


    // fee
    var minimum = await CT_staking.fee_info(1,1); 
    var fee = await CT_staking.fee_info(1,2); 
    var RT_01 = await CT_staking.fee_info(2,1); 
    var RT_02 = await CT_staking.fee_info(2,2); 
    var RT_03 = await CT_staking.fee_info(2,3); 
    var liquid = await CT_staking.fee_info(3,1); 
    

    //staking_info
    var staking_value = await CT_staking.staking_info(coinbase,1); 
    $("#staking_value").text(ethers.utils.formatUnits(staking_value));

    //reaommender_info
    var my_recommender = await CT_staking.recommender(coinbase);
    var RT1 = await CT_staking.recommender_number(coinbase,1);
    var RT2 = await CT_staking.recommender_number(coinbase,2); 
    var RT3 = await CT_staking.recommender_number(coinbase,2);    
    $("#RTn").text(Number(RT1)+Number(RT2)+Number(RT2));

    var hidden_str = (my_recommender.substring(6,38));
    var replace_part = my_recommender.replace(hidden_str,"...");            
    $("#RT").text(replace_part);

    //cm_info    
    out_share = await cm_token.totalSupply();     
    var my_cm = await cm_token.balanceOf(coinbase); 
    var hold_rate = my_cm/out_share; 
    var allowance = await cm_token.allowance(coinbase,CT_staking_address);  

    $("#cm_balance").text(toPoint_4(my_cm/10**18));
    $("#myCM_balance").text(toPoint_4(my_cm/10**18));
    $("#hold_rate").text(toPercent(hold_rate));
    if(allowance != 0){
        $("#approve").css("display","none");
        $("#diswithdraw").css("display","none");
        $("#confirm_withdraw").css("display","block");
    }

    

    
    
    var profit = await CT_staking.get_profit();  
    var my_profit = Math.floor(profit*hold_rate);     
    $("#profit").text(toPoint_4(my_profit/10**18));
    $("#currently_profit").text(toPoint_4(profit/10**18))
    
    
    var CT_per = profit/out_share;
    var power_per = my_cm/out_share;   
    $("#CT_per").text(toPoint_8(CT_per));
    $("#power_per").text(toPercent(power_per));



    const set_staking_amount = () => {
        var save_amount = $("#create_staking .staking_amount").val();        
        $("#check_save_amount").text(save_amount);

        var get_amount =  save_amount*Number(out_share)/(Number(liquid)+Number(profit));
        var cost = get_amount*(Number(RT_01)+Number(RT_02)+Number(RT_03))/1000;
        var actul_amount = get_amount-cost;    
        $("#check_cm_amount").text(toPoint_6(actul_amount));    

        var check_hold_rate = toPercent(actul_amount*10**18/out_share);        
        $("#check_power_rate").text(check_hold_rate);

        //檢視餘額是否足夠
        if (Number(save_amount) > Number(simple_balance)) {
            $("#have_no").css("visibility","visible");
        }else{
            $("#have_no").css("visibility","hidden");
        }


        


    };


    const set_recommender = () => {
        var recommender = $("#create_staking .recommender").val();
        

        var hidden_str = (recommender.substring(6,38));
        var replace_part = recommender.replace(hidden_str,"...");
        $("#check_recommender").text(replace_part);       



        if(recommender == null || recommender == undefined || recommender == ''){
           $("#not_length").css("display","none");  
           $("#not_self").css("display","none");    
        }else if(recommender.length < 42){
           $("#not_length").css("display","block");       
        }else if(recommender == coinbase){
           $("#not_self").css("display","block");
        }else{
           $("#not_self").css("display","none");
           $("#not_length").css("display","none"); 
        }


    };



    const set_withdraw = () => {
        var withdraw = $("#withdraw_staking .withdraw_amount").val();
        $("#withdraw_amount").text(withdraw);
    };



    // keyup 資訊給使用者確認明細
    // 確認轉出對象及金額
    set_staking_amount();
    set_recommender();
    set_withdraw();


    $("#create_staking").on("keyup", ".staking_amount", set_staking_amount);
    $("#create_staking").on("keyup", ".recommender", set_recommender);
    $("#withdraw_staking").on("keyup", ".withdraw_amount", set_withdraw);
  

    
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
    
    if (recommender == null || recommender == undefined || recommender == '') {
        _staking_coffer(owner,overrides);
    }else{
        _staking_coffer(recommender,overrides);
    }
    
   
});



var confirm_withdraw = document.querySelector("#confirm_withdraw");
confirm_withdraw.addEventListener("click", async (e) => {
    e.preventDefault();


   
    withdraw(cm_amount);

   
   
});





function _staking_coffer(recommender,overrides){

    let tx = CT_staking.staking(recommender,overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}

function cm_approve(){

    let tx = cm_token.approve(CT_staking_address,out_share).then(function(receipt){             
         location.reload();          
     });;
                 
      
}


function withdraw(cm_amount){

    let tx = CT_staking.withdraw(cm_amount).then(function(receipt){             
         location.reload();          
     });;
                 
      
}