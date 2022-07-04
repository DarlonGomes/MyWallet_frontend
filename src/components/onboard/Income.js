import styled from "styled-components";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../context/UserContext.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Income () {
    const navigate = useNavigate();
    const {id} = useParams()
    const { token } = useContext(UserContext);
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
                await axios.post('https://project-my-wallet-back.herokuapp.com/wallet/currency', body, token);
                setTimeout(()=>{
                    setIsDisabled(false);
                    navigate("/home");
                }, "500")
                
            } catch (error) {
                toast.error('Dados não válidos', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
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
                await axios.put('https://project-my-wallet-back.herokuapp.com/wallet/currency', body, token);
                toast.success('Sucesso', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
                setTimeout(()=>{
                    setIsDisabled(false);
                    navigate("/home");
                }, "1000")
                
            } catch (error) {
                toast.error('Dados não válidos', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
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
                <button disabled={isDisabled}><ThreeDots  color="#FFFFFF" height={17} width={"100%"} /></button>
            )
        };

        return(
            <button type="submit" disabled={isDisabled}>Salvar entrada</button>
        )
    }
    
        

        return(
            <>
                <ToastContainer/>
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
                    min = "1"
                    step= ".01"
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
                    <button className="cancel" onClick={()=>{navigate("/home")}}>Cancelar</button>
                </Page>
            </>
        )
    }
    
    export default Income;
    
    const Page = styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #8C11BE;
        padding: 0 20px;
        box-sizing: border-box;
        form{
            width:100%;
        }
    
        input{
            width:100%;
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
            ::placeholder{color: #000000}
        }
    
        button{
            width:100%;
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

        .cancel{
            margin-top: 13px;
            background-color: #A075B1;
            color: #DCDCDC;
        }
    `
    const Title = styled.div`
        width: 326px;
    `