import React from 'react';
import { FiAlertCircle } from 'react-icons/fi'

import { Container } from './styles';

interface Props {
  title: string;
  className?: string;
}

const Tooltip: React.FC<Props> = ({ title, className, children }) => {
  return <Container className={className}>
    <FiAlertCircle color="#C53030" size={20} />
    <span>{title}</span>
  </Container>
}

export default Tooltip;
