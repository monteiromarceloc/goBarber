import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './toast';
import { ToastMessage, useToast } from "../../hooks/Toast";
import { Container } from './styles';

interface Props {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<Props> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    msg => msg.id,
    {
      from: { right: '-110%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-110%', opacity: 0 }
    }
  );
  const { removeToast } = useToast();
  return <Container>
    {
      messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))
    }
  </Container>
}

export default ToastContainer;
