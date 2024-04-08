/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useSDK } from '@metamask/sdk-react';
import { Grid } from '@mui/material';
import { useState } from 'react';

/* eslint-disable @typescript-eslint/no-misused-promises */
const BlockchainPlayground: React.FC = () => {
  const [account, setAccount] = useState<string>();

  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async (): Promise<void> => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn('failed to connect..', err);
    }
  };

  return (
    <Grid
      container
      sx={{
        maxWidth: '1228px',
        margin: '0 auto',
        border: '1px solid red',
        color: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '50px'
      }}>
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </Grid>
  );
};

export default BlockchainPlayground;
