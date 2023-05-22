const url = "http://localhost:3000";

export const newBingo = async () => {
  try {
    const response = await fetch(`${url}/newBingo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return {
      code:"error"
    }
  }
};

export const getTabla = async (code:string) => {
  try {
    const response = await fetch(`${url}/tabla/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return {
      numerosTabla:{
        b: []
      }
    }
  }
}

export const asignarNumero = async (code:string, numero:number) => {
  try {
    const response = await fetch(`${url}/bingo/${code}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"number":numero})
    });
    return response.json();
  } catch (error) {
    console.log(error);
    return {
      code:"error"
    }
  }
}
