var GETDATA={'serialData':{},'modelData':{}};

var link = (ID_Value,page)=>{
        switch (page) {
            case "serial":
                return "https://pcsupport.lenovo.com/gb/en/api/v4/mse/getproducts?productId="+ID_Value;
            case "model":
                return "https://psref.lenovo.com/api/model/Info/SpecData?model_code="+ID_Value;
            case "products":
                return "https://pcsupport.lenovo.com/us/en/products/" + ID_Value.toLowerCase() + "/warranty";
            case "parts":
                return "https://pcsupport.lenovo.com/us/en/products/" + ID_Value.toLowerCase() + "/parts";
            default:
                break;
        }
    }   

async function getData(url,response_fun,fail_fun) {
  try {
    /*const response = await fetch(url, {mode: 'cors',
        headers: new Headers({
            'Origin':'http://localhost',
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*',
            'Access-Control-Allow-Origin':'*',  
            'User-Agent': 'rest-client',
            'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4',
            'Content-Type': 'application/json',
            'X-Requested-With':'XMLHttpRequest'
        })
    });*/
    const response = await fetch(url, {mode: 'cors' });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    response_fun(result);
  } catch (error) {
    fail_fun(error.message);
  }
}

function writeElem(){
    var elem = document.createElement("div");
}

async function getAllData(id) {
    await getData(link(id,"serial"), async(serialData)=>{
            localStorage.setItem(id,serialData[0]);
            await getData(link(serialData[0]['Id'].split("/",5).pop(),"model"), async(modelData)=>{
                GETDATA.modelData[serialData[0]['Id'].split("/",5).pop()]=modelData;
            },console.error);
            GETDATA.serialData[id]=serialData[0];
        },console.error).then(
    ); 
}