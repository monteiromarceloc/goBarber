import React, { useCallback } from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi'
import { Container } from './styles';
import Toast from './toast';
import { ToastMessage, useToast } from "../../hooks/Toast";

interface Props {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<Props> = ({ messages }) => {
  const { removeToast } = useToast();
  return <Container>
    {
      messages.map(msg => <Toast message={msg} />)
    }
  </Container>
}

export default ToastContainer;
