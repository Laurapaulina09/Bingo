import { api } from "../env/enviroment";


export const newBingo = async () => {
  try {
    const response = await fetch(`${api}/newBingo`, {
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
    const response = await fetch(`${api}/tabla/${code}`, {
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
    const response = await fetch(`${api}/bingo/${code}`, {
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
