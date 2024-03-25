import {
  Alert,
  Box,
  Button,
  Divider,
  Input,
  InputAdornment,
  Snackbar,
  Typography
} from '@mui/material';
import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { type RootState } from '../../pages/store';
import { BankBanner } from './BankBanner';

interface IBanks {
  name: string;
  imgSrc: string;
}

const BankTransfer: React.FC = () => {
  const [matchedBanks, setMatchedBanks] = useState<IBanks[]>();
  const [choosedBank, setChoosedBank] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);

  const banks: IBanks[] = [
    { name: 'Airbank', imgSrc: 'airbank.png' },
    { name: 'Banka Creditas', imgSrc: 'creditas.png' },
    { name: 'Česká spořitelna', imgSrc: 'ceska_sporitelna.png' },
    { name: 'ČSOB', imgSrc: 'csob.png' },
    { name: 'Fio banka', imgSrc: 'fio.png' },
    { name: 'Komerční banka', imgSrc: 'komercni_banka.png' },
    { name: 'mBank', imgSrc: 'mbank.png' },
    { name: 'Moneta', imgSrc: 'moneta.png' },
    { name: 'PPF Banka', imgSrc: 'ppf.png' },
    { name: 'Raiffeisen Bank', imgSrc: 'raiffeisen.png' },
    { name: 'Trinity bank', imgSrc: 'trinity.png' },
    { name: 'Unicredit Bank', imgSrc: 'unicredit.png' }
  ];
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputText = event.target.value;
    setUserInput(inputText);
    const myBank = banks.filter((bank) => bank.name.toLowerCase().includes(inputText));
    setMatchedBanks(myBank);
  };

  const handleClick = (bankname: string): void => {
    setChoosedBank(bankname);
  };

  const handleNextStep = (): void => {
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 5000);
  };

  const renderBanks = banks.map((bank, index) => {
    return (
      <Box key={index}>
        <BankBanner
          name={bank.name}
          imgSrc={bank.imgSrc}
          active={bank.name === choosedBank}
          onClick={handleClick}
        />
        <Divider sx={{ background: '#80797B', margin: '10px' }} />
      </Box>
    );
  });

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography>
        <FormattedMessage id="app.checkoutpage.banktransfertext" />
      </Typography>
      <Input
        placeholder={appLanguage === 'cs' ? 'Vaše banka' : 'Your bank'}
        onChange={handleChange}
        value={userInput}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{
          color: '#80797B',
          padding: '10px',
          width: '100%',
          marginTop: '10px',
          background: '#4B4958'
        }}
      />
      {userInput === '' ? (
        renderBanks.slice(0, 3)
      ) : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      matchedBanks!.length > 0 ? (
        matchedBanks?.map((bank, index) => {
          return (
            <Box key={index}>
              <BankBanner
                name={bank.name}
                imgSrc={bank.imgSrc}
                onClick={handleClick}
                active={choosedBank === bank.name}
              />
              <Divider sx={{ background: '#80797B', margin: '10px' }} />
            </Box>
          );
        })
      ) : (
        <Typography sx={{ marginTop: '10px' }}>
          <FormattedMessage id="app.checkoutpage.notsupported" />
        </Typography>
      )}
      {choosedBank !== '' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={handleNextStep}>
            <ArrowForwardIcon />
          </Button>
        </Box>
      )}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {appLanguage === 'cs'
            ? 'Platební metoda v současný okamžik nefunguje'
            : 'The payment method does not work at the moment'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export const BankTransferBanner = memo(BankTransfer);
