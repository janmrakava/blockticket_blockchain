import { Alert, Grid, Input, Typography, Snackbar, Button, Box } from '@mui/material';
import { LogoLogin } from '../components/Login/LoginLogo';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from './store';
import { FormattedMessage } from 'react-intl';
import { loginUser } from '../api/users/user';
import { type AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { changeUserData } from '../features/userSlice';

interface ILoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cookies = new Cookies();
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [showSuccessSnackBar, setShowSuccessSnackBar] = useState<boolean>(false);

  const [snackBarText, setSnackBarText] = useState<string>('');
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: ''
  });
  const appLanguage = useSelector((state: RootState) => state.language.appLanguage);

  const handleClick = (): void => {
    setShowSnackBar(true);
    setSnackBarText('notworking');
    setTimeout(() => {
      setShowSnackBar(false);
      setSnackBarText('');
    }, 5000);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginData.email, loginData.password);
      const userObj = {
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        email: response.user.email,
        telNumber: response.user.tel_number,
        dateOfBirth: response.user.date_of_birth
      };
      dispatch(changeUserData(userObj));
      cookies.set('authToken', response.token, { path: '/' });
      setShowSuccessSnackBar(true);
      setTimeout(() => {
        setShowSuccessSnackBar(false);
        navigate('/');
      }, 2000);
    } catch (error: unknown) {
      const typedError = error as AxiosError;
      setSnackBarText(typedError.message);
      setShowSnackBar(true);
      setTimeout(() => {
        setShowSnackBar(false);
        setSnackBarText('');
      }, 5000);
    }
  };

  const handleClickRegister = (): void => {
    navigate('/register');
  };
  return (
    <Grid container sx={{ color: '#fff', marginBottom: '100px' }}>
      <Grid item xs={12} md={12} lg={12}>
        <LogoLogin />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <form
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleLogin}>
          <Input
            id="e-mail"
            placeholder={appLanguage === 'cs' ? 'E-mailová adresa' : 'E-mail'}
            name="email"
            value={loginData.email}
            onChange={handleChange}
            sx={{
              background: '#4B4958',
              color: '#80797B',
              padding: '5px',
              width: '353px',
              height: '60px',
              borderRadius: '10px',
              paddingLeft: '20px',
              fontSize: '20px',
              marginTop: '50px'
            }}
          />
          <Input
            id="password"
            placeholder={appLanguage === 'cs' ? 'Heslo' : 'Password'}
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            sx={{
              background: '#4B4958',
              color: '#80797B',
              padding: '5px',
              width: '353px',
              height: '60px',
              borderRadius: '10px',
              paddingLeft: '20px',
              fontSize: '20px',
              marginTop: '20px'
            }}
          />
          <Typography
            sx={{ fontSize: '15px', color: '#80797B', fontWeight: 500, cursor: 'pointer' }}
            onClick={handleClick}>
            <FormattedMessage id="app.loginpage.forgotpassword" />
          </Typography>
          <Button
            variant="contained"
            type={'submit'}
            sx={{
              width: '353px',
              height: '50px',
              fontSize: '20px',
              fontWeight: 800,
              textTransform: 'capitalize'
            }}>
            Login
          </Button>
        </form>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '20px',
          fontSize: '20px',
          color: '#80797B'
        }}>
        <Typography>
          <FormattedMessage id="app.loginpage.orloginwith" />
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            marginTop: '20px',
            marginBottom: '50px'
          }}>
          <Button
            variant="contained"
            onClick={handleClickRegister}
            sx={{
              width: '353px',
              height: '50px',
              fontSize: '20px',
              fontWeight: 800,
              textTransform: 'capitalize'
            }}>
            Založit účet
          </Button>
        </Box>
      </Grid>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.login.${snackBarText}`} />
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessSnackBar}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          <FormattedMessage id={`app.login.succesfullLogin`} />
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
