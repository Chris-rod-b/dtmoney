import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { api } from '../../services/api';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import React, { useState } from 'react';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    title?: string;
    value?: number;
    category?: string;
}

export function NewTransactionModal ( {  isOpen, onRequestClose, ...props} : NewTransactionModalProps){

    const [title, setTitle ] = useState('');
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');

    function handleSetTypeNull(){
        onRequestClose();
        setType('');
        setTitle('');
        setValue(0);
        setCategory('');
    }
    /*function handleFocusOnClick(event : React.FormEvent<HTMLInputElement>){
        
    }

    /*function handleAutoComplete(){
        var search = value.search(/(,)/);
        var stringValue = '';
        if (search > 0)
            stringValue = value.replace(/(,)$/, ',00');
        else if (search === -1)
            stringValue = value+',00';
        
        if (value === '')
            stringValue = '00,00';
        
        console.log(search);

        setValue(stringValue);
    }*/

    function handleCreateNewTransaction(event : React.FormEvent){
        event.preventDefault();

        const data = {
            title,
            value,
            category,
            type
        };

        api.post('/transactions', data);
    }

    return ( 
        
        <Modal 
            //document.body does not exist yet and it will resolve to undefined || null
            //if Modal.setAppElement() is called with null or not called at all 
            //with the <script /> placed on <head />
            appElement={document.getElementById('root') as HTMLElement}
            isOpen={isOpen} 
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick = {handleSetTypeNull} 
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Casdastrar transação</h2>

                <input type="text" 
                    placeholder="Titulo" 
                    value={title} 
                    onChange={event => setTitle(event.target.value)}
                />

                <input type="number" 
                    id="value"
                    value={value} 
                    onChange={event => setValue(Number(event.target.value))}
                    //onBlur={handleAutoComplete}
                    onClick={()=> ({})}
                    placeholder="Valor"
                    
                />
                
                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => {setType('deposit');}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox 
                        type="button" 
                        onClick={() => {setType('withdraw');}}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input type="text"
                    value={category} 
                    onChange={event => setCategory(event.target.value)} 
                    placeholder="Categoria" 
                />
                
                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}