var link = (ID_Value,page)=>{
        switch (page) {
            case "serial":
                return "https://pcsupport.lenovo.com/gb/en/api/v4/mse/getproducts?productId="+ID_Value;
            case "model":
                return "https://psref.lenovo.com/api/model/Info/SpecData?model_code="+ID_Value;
            case "serial":
                return "https://pcsupport.lenovo.com/us/en/products/" + ID_Value.toLower() + "/warranty";
            default:
                break;
        }
    }   

async function getData(url,response_fun,fail_fun) {
  try {
    const response = await fetch(url, {mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Access-Control-Expose-Headers': '*',
            'Access-Control-Allow-Origin':'*'
        })
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    response_fun(result)
  } catch (error) {
    fail_fun(error.message);
  }
}