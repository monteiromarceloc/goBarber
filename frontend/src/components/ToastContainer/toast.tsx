import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { ToastContainer } from './styles';
import { ToastMessage, useToast } from "../../hooks/Toast";

interface Props {
  message: ToastMessage;
  style: object;
}

const icons = {
  success: <FiCheckCircle size={24} />,
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
}

const Toast: React.FC<Props> = ({ message: { id, type, title, description }, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 4000);

    return () => {
      clearTimeout(timer);
    }
  }, [id, removeToast])

  return <ToastContainer key={id} type={type} hasDescription={!!description} style={style}>
    {icons[type || 'info']}
    <div>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
    </div>
    <button onClick={() => removeToast(id)} type="button"><FiXCircle size={18} /></button>
  </ToastContainer>
}

export default Toast;
