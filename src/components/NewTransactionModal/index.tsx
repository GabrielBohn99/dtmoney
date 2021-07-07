import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useState, useContext } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setCategory('')
    setAmount(0)
    setType('deposit')
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" placeholder="Valor" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <TransactionTypeContainer>
          <RadioBox type="button" isActive={type === 'deposit'} activeColor="green" onClick={() => setType("deposit")}>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox type="button" isActive={type === 'withdraw'} activeColor="red" onClick={() => setType("withdraw")}>
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
