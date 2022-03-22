import "./App.css";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Button, Box, Container, Alert, Chip } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

import reputationContract from "./contracts/reputation.json";

import Whitelist from "./components/whitelist";
import Ownership from "./components/ownership";
import Burn from "./components/burn";
import MultipleMint from "./components/multipleMint";

export default function App() {
  const [userInfo, setUserInfo]: any = useState();
  const [alert, setAlert]: any = useState(false);

  const contractAddress = "0x507f2f797Bcdcf17212C04520C1BAdBC7E20A388";
  const ABI: any = reputationContract.abi;

  const { authenticate, isAuthenticated, logout } = useMoralis();
  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          setUserInfo(user?.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
          setUserInfo("");
        });
    }
  };

  const logOut = async () => {
    await logout();
    setAlert(true);
    setUserInfo("");
    setTimeout(() => {
      setAlert(false);
    }, 2500);
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            m: 2,
          }}
        >
          <Chip
            label={userInfo ? userInfo : "?"}
            variant="outlined"
            icon={<AccountBalanceWalletOutlinedIcon />}
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              p: 2,
              m: 1,
              maxWidth: 150,
            }}
            disabled={isAuthenticated}
            onClick={login}
          >
            Login MM
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: 2,
              p: 2,
              m: 1,
              maxWidth: 150,
            }}
            onClick={logOut}
            disabled={!isAuthenticated}
          >
            Logout
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            m: 2,
            p: 4,
          }}
        >
          {isAuthenticated && userInfo ? (
            <>
              <Box>
                <Whitelist ABI={ABI} contractAddress={contractAddress} />
                <Ownership
                  userInfo={userInfo}
                  ABI={ABI}
                  contractAddress={contractAddress}
                />
                <Burn
                  userInfo={userInfo}
                  ABI={ABI}
                  contractAddress={contractAddress}
                />
              </Box>
              <Box>
                <MultipleMint />
              </Box>
            </>
          ) : (
            <Alert severity="warning">Please login with your MM wallet</Alert>
          )}
        </Box>
      </Container>
      {alert && (
        <Alert
          sx={{ position: "absolute", bottom: 0, left: 0, w: "150px" }}
          severity="info"
          color="info"
          variant="filled"
        >
          Logged out
        </Alert>
      )}
    </>
  );
}
