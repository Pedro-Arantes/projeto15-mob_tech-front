import { useState, useContext, useEffect } from 'react';
import axios from "axios";
import {  CartItemStyled, CartDescription,CounterDiv,CartContent } from "../assets/styles/CartStyle"
import {FiTrash2} from  'react-icons/fi'

export default function CartItem ({objt,setUpdate,token,navigate,setTeste,teste}){

    const {img,model,price,amount,_id} = objt
    const real =  Number(price).toLocaleString('pt-BR',{style: 'currency', currency: 'BRL'})
    let qnt = !amount ? 1 : amount
    qnt = Number(qnt)

    let num= Number(qnt) ;
    let n = 1 ;
   
    const updateAmount = ()=>{
        const obj ={
            amount: num,
            id: _id
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const URL = 'http://localhost:5000/cart'
        const tratarSucesso = (resposta) => {
            //console.log(resposta)
            n=   n +1
            setUpdate(n)
        }

        const tratarErro = (resp) => {
            console.log(resp)
            alert(resp.response)
            navigate("/")
        }

        const requisicao = axios.put(URL, obj, config);
        requisicao.then(tratarSucesso)
        requisicao.catch(tratarErro)
    }

    const SumSubAmount = (operator) =>{
        
            if (operator === "minus") {
                console.log(" menos")
                if (qnt === 1) {
                    num= 1
                }else{
                    num= qnt-1

                    n=   n +1
                    setUpdate(n)
                }
            } else {
                console.log(" mais")
                num= qnt+1
                n=   n +1
                setUpdate(n)
            }
            
            updateAmount()

    }

    const deleteItem = () =>{
       
        
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                id:_id
            }
        }
        const URL = 'http://localhost:5000/cart'
        const tratarSucesso = (resposta) => {
            
            n = Number(teste) +1
            setTeste(n)
            
            navigate("/carrinho")  
        }

        const tratarErro = (resp) => {
            //console.log(resp)
            alert(resp.response.data.message)
            navigate("/")
        }

        const requisicao = axios.delete(URL,  config);
        requisicao.then(tratarSucesso)
        requisicao.catch(tratarErro)
    

    }

    const delIt = () =>{
        deleteItem()
    }

    return(
        <CartItemStyled>
        <CartContent>
            <img alt="vazio" src={img}></img>

            <CartDescription>
                <p>{model}</p>
                <p>{real}</p>
                <CounterDiv>
                    <button onClick={()=>SumSubAmount("minus")}>-</button>
                    <p>{qnt?.toString()}</p>
                    <button onClick={()=>SumSubAmount("plus")}>+</button>
                </CounterDiv>
                
            </CartDescription>
        </CartContent>

        <FiTrash2 onClick={delIt}/>
    </CartItemStyled>
    )
}