import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext.js"

function Income () {
    const navigate = useNavigate();
    const {id} = useParams()
    const { token, data } = useContext(UserContext);
    const [ value, setValue ] = useState();
    const [ description, setDescription] = useState("");
    const [ isDisabled, setIsDisabled] = useState(false);
    
    async function validate (event){
        event.preventDefault();
        setIsDisabled(true);

        
        if(!id){
            const body = {
                value: parseFloat(value),
                text: description
            }
            try {
                await axios.post('http://localhost:5000/wallet/currency', body, token);
                setIsDisabled(false);
                navigate("/home");
                
            } catch (error) {
                alert("Deu bosta, me troca por toast pfv");
                setValue();
                setDescription("");
                setIsDisabled(false);
            }
        }else{
            const body = {
                value: parseFloat(value),
                text: description,
                id: id
            }
            try {
                await axios.put('http://localhost:5000/wallet/currency', body, token);
                setIsDisabled(false);
                navigate("/home");
                
            } catch (error) {
                alert("Deu bosta, me troca por toast pfv");
                setValue();
                setDescription("");
                setIsDisabled(false);
            }
        }
        }
        
    const HeaderToggle = () => {
        if(!id){
            return(
                   <h3>Nova entrada</h3>
            )
        }else{
            return(
                <h3>Editar entrada</h3>
            )
        }
    }
    
    const ButtonToggle = () => {
        if(isDisabled === true){
            return (
                <button><ThreeDots  color="#FFFFFF" height={17} width={326} /></button>
            )
        };

        return(
            <button type="submit">Salvar entrada</button>
        )
    }
    
        console.log(id);

        return(
            <Page>
                <Title>
                <HeaderToggle/>
                </Title>
                <form onSubmit={(event)=>validate(event)}>
                <input
                type="number"
                value={value}
                onChange={e=> setValue(e.target.value)}
                placeholder= "Valor"
                required
                disabled= {isDisabled}
                ></input>
                <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder= "Descrição"
                required
                disabled= {isDisabled}
                ></input>
                <ButtonToggle/>
                </form>
            </Page>
        )
    }
    
    export default Income;
    
    const Page = styled.div`
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #8C11BE;
    
        form{
            width: 326px;
            
        }
    
        input{
            width: 326px;
            height: 58px;
            background: ${(props) => props.isDisabled ? "#F2F2F2" : "#FFFFFF"};
            font-family: 'Raleway', sans-serif;
            font-weight: 400;
            font-size: 20px;
            color: #000000;
            border-radius: 5px;
            border: none;
            margin-bottom: 13px;
            padding: 0 10px;
            box-sizing: border-box;
        }
    
        button{
            width: 326px;
            height: 46px;
            background-color: #A328D6;
            border: none;
            border-radius: 5px;
            color: #FFFFFF;
            font-family: 'Raleway';
            font-size: 20px;
            font-weight: 700;
        }
    
        h3{
            font-family: 'Raleway';
            font-weight: 700;
            font-size: 26px;
            color: #FFFFFF;
            margin: 25px 0 40px;
        }
    `
    const Title = styled.div`
        width: 326px;
    `