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
    var str=Number(point*100).toFixed(4);
    str+="%";
    return str;
}


// 調用智能合約
var credit_address;
var credit;
var ct_token;
var coinbase;




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
    credit_address = "0x89bb75DC1d3BA2F42bE312cFdC5db92ca9899356";
    var credit_abi = [{"constant":false,"inputs":[],"name":"redemption","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"fee_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"p1","type":"uint256"},{"name":"p2","type":"uint256"},{"name":"p3","type":"uint256"}],"name":"set_parameter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_balance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_CT","type":"uint256"}],"name":"borrow","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_out_share","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"loan_info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]
    var ct_address = "0xC9A10D3635E8874801A41c5186e091b0e8b546d1";
    var ct_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]


    credit = new ethers.Contract( credit_address, credit_abi, signer);
    ct_token = new ethers.Contract(ct_address, ct_abi, signer);
    


    

    var owner = await credit.owner();


    // fee
    var discount = await credit.fee_info(1,1);   
    var weight = await credit.fee_info(1,2); 
   

    //loan_info
    var borrow_eth = await credit.loan_info(coinbase,1);  
    var mortgage_CT = await credit.loan_info(coinbase,2);   
    $("#borrow_eth").text(ethers.utils.formatUnits(borrow_eth));
    $("#mortgage_CT").text(ethers.utils.formatUnits(mortgage_CT));

    //CT_info
    var my_CT_balance =await ct_token.balanceOf(coinbase); 
    var destroy = await ct_token.balanceOf("0x0000000000000000000000000000000000000000"); 
    var CT_out_share = await credit.get_out_share();  
    var DT_balance = await credit.get_balance();
    var price = DT_balance/CT_out_share;
    $("#my_CT_balance").text(toPoint_4(my_CT_balance/10**18));
    $("#out_share").text(toPoint_4(CT_out_share/10**18));
    $("#destroy").text(toPoint_4(destroy/10**18));
    $("#price").text(toPoint_8(price));

    var price_weight = price+(price*weight/1000);
    var payable = price_weight*mortgage_CT;
    var interest = payable-borrow_eth;
    $("#total_payable").text(payable/10**18);
    $("#interest").text(interest/10**18);



 
    

    const set_staking_amount = () => {
        var save_amount = $("#create_staking .staking_amount").val();        
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


    $(document).ready(function(){
    $.ajax({
            method:"GET",
            url: "https://api.coinlore.net/api/ticker/?id=80",        
          }).done(function(msg) {   
            console.log(msg);
            var ETH_price = (msg[0].price_usd);            

            var ETH_CT = price*ETH_price;
            $("#usd_price").text(toPoint_2(ETH_CT));

            var my_ct_price = my_CT_balance/(10**18)*ETH_CT;
            $("#my_ct_price").text(toPoint_2(my_ct_price));
            
          });
    })
  

    
}




SHOW_CONTRACT();



// var confirm_staking = document.querySelector("#confirm_staking");
// confirm_staking.addEventListener("click", async (e) => {
//     e.preventDefault();
//     var staking = document.querySelector(".staking_amount").value;   
//     var amount = (Number(staking)).toString(); 
//     var recommender = document.querySelector(".recommender").value;

//     let overrides = {        
//         value: ethers.utils.parseEther(amount)     // ether in this case MUST be a string       
//     };
   
//     _staking_coffer(recommender,overrides);
   
// });




function _staking_coffer(recommender,overrides){

    let tx = credit.staking(recommender,overrides).then(function(receipt){             
         location.reload();          
     });;
                 
      
}

function dt_approve(){

    let tx = dt_token.approve(credit_address,out_share).then(function(receipt){             
         location.reload();          
     });;
                 
      
}

