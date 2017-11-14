function MenuChoice(selection)
{
    document.getElementById("custlist").style.visibility = "hidden";
    document.getElementById("custhist").style.visibility = "hidden";
    document.getElementById("updatestore").style.visibility = "hidden";
    
    
    switch(selection)
    {
        case "cslist":
                document.getElementById("custlist").style.visibility = "visible";
        
        CustList();
        break;
        
        case "cshist":
                document.getElementById("custhist").style.visibility = "visible";
        break;
    
        case "update":
                document.getElementById("updatestore").style.visibility = "visible";
        break;
        
        case "None":
        break;
    default:
        alert("Please select a different menu option");
    }
}


function CustList()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";
    
    xmlhttp.onreadystatechange = function ()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);  
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
}

function GenerateOutput(result)
{
    var display = "<table class = 'tablecenter'><tr><th>Update Store Information </th><th>Company Name </th><th> Company ID </th><th> City </th></tr>";
    var count = 0;
    var companyname = "";
    var customerid = "";
    var compcity = "";
   
    
    
    
    for (count = 0; count < result.GetAllCustomersResult.length; count ++)
    {
        customerid = result.GetAllCustomersResult[count].CustomerID;
        companyname = result.GetAllCustomersResult[count].CompanyName;
        compcity = result.GetAllCustomersResult[count].City;
       
        
      display += '<tr><td><button onclick = "Orders('+"'" + customerid + "')" + '"> Update Store Info </button></td><td>' + companyname + "</td><td>" + customerid +"</td><td>" + compcity+ "</td></tr>";
        
        
    }
    display +="</table>";
    
    document.getElementById("listcust").innerHTML = display;
   
  
}

  function Orders(customerid)
    {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
    url += customerid;
    
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
            
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class = 'tablecenter'> <tr><th> Order ID </th><th> Shipping Address </th><th> Shipping City</th><th> Shipping Name </th><th>Shipping Post Code</th></tr>";
        var count = 0;
        
        
        for (count = 0; count<result.GetOrdersForCustomerResult.length; count++)
        {
            
            display += "<tr><td>" + result.GetOrdersForCustomerResult[count].OrderID + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipAddress + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipCity + "</td><td>" + result.GetOrdersForCustomerResult[count].ShipName+ "</td><td>" + result.GetOrdersForCustomerResult[count].ShipPostcode +
"</td></tr>";
}
  MenuChoice("cshist");
  display += "</table>";
  document.getElementById("sec2").innerHTML = display;
    }
    }

function Orders1()

{
    customerid=document.getElementById("stname").value;
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status ==200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result)
    {
        var display = "<table class = 'tablecenter'> <tr><th> Update Info </th><th>Order ID </th><th> Shipping Address </th><th> Shipping City</th><th> Shipping Name </th><th>Shipping Post Code</th></tr>";
        var count = 0;
        var orderID = result[count].OrderID;
        var shipaddress = result[count].ShipAddress;
        var shipcity = result[count].ShipCity;
        var shipname = result[count].ShipName;
        var shipzip = result[count].ShipPostcode;

        
        for (count = 0; count<result.length; count++)
        {
           //  display += "<tr><td>" + (orderID) + "</td><td>" + (shipaddress) + "</td><td>" + (shipcity) + "</td><td>" + (shipname) + "</td><td>" + (shipzip) +
//"</td></tr>";
            display += '<tr><td><button onclick = "CustInfo('+"'" + orderID + "')" + '"> Update </button></td><td>' + (orderID) + "</td><td>" + (shipaddress) + "</td><td>" + (shipcity) + "</td><td>" + (shipname) + "</td><td>" + (shipzip) +
"</td></tr>";
}
  display += "</table>";
  document.getElementById("sec2").innerHTML = display;
    }
    }

    
function CustInfo(orderid)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
    url += orderid;
    
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status== 200){
            var output = JSON.parse(xmlhttp.responseText);
            
            document.getElementById("orderID").value = output[0].OrderID;
            document.getElementById("shipadd").value = output[0].ShipAddress;
            document.getElementById("shipcity").value = output[0].ShipCity;
            document.getElementById("shipname").value = output[0].ShipName;
            document.getElementById("shippost").value = output[0].ShipPostcode;
            MenuChoice("update");
        }
    };
xmlhttp.open("GET", url,true);
xmlhttp.send();
}

 
function StoreUpdate()

{   
    var Storeid = document.getElementById("orderID").value;
    var shpadd  = document.getElementById("shipadd").value;
    var shpcity = document.getElementById("shipcity").value;
    var shpname = document.getElementById("shipname").value;
    var shppost = document.getElementById("shippost").value;
    
    var parameters = '{"OrderID":"' + Storeid+ '","ShipAddress":"' + shpadd + '","ShipCity":"' + shpcity + '","ShipName":"' + shpname + '","ShipPostcode":"' + shppost + '"}';
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
     xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var result = JSON.parse(xmlhttp.responseText);
          //  var outcome = result.WasSuccessful;
          //  var error = result.Exception;
           OperationResult(result);
            MenuChoice("update");
        }
    };
    
    xmlhttp.open ("POST", url, true);
    xmlhttp.setRequestHeader ("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parameters);
    
}

function OperationResult()
{
    switch(success)
    {
        case 1:
            alert ("The Operation Was Successful");
            break;
        case 0:
            alert ("The Operation Was Not Successful:\ " + exception);
            break;
        case -2:
            alert ("The Operation Was Not Successful because the data string supplied could not be deserialized into the service object!");
            break;
        case -3:
            alert ("The Operation Was Not Successful because a record with the supplied Order ID couldn't be found!");
            break;
        default: 
            alert ("The Operation Code returned can not be Identified!"); 
    }
}
  function goBack() {
    
      document.getElementById("custlist").style.visibility = "visible";
      document.getElementById("custhist").style.visibility = "hidden";
      document.getElementById("updatestore").style.visibility = "hidden";
        
}
 