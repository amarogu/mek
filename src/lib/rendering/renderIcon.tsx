import Image from 'next/image';
import Cancel from '../../../public/cancel.svg';
import Check from '../../../public/check_circle.svg';
import Pending from '../../../public/pending.svg';
import PendingDark from '../../../public/pending_dark.svg';

export const renderIcon = (isDarkMode: boolean, message: string) => {
  switch (message) {
    case 'Payment succeeded!':
      return <Image src={Check} alt="Pagamento aprovado!" width={64} />;
    case 'Your payment is processing.':
        return <Image src={isDarkMode ? PendingDark : Pending} alt="Pagamento em processamento" width={64} />;
    case 'Your payment was not successful, please try again.':
        return <Image src={Cancel} alt="Pagamento não aprovado" width={64} />;
    default:
        return <Image src={Cancel} alt="Algo deu errado" width={64} />;
  }
}