import { Button, Box, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";

import { Data } from "../interfaces/interfaces";

export default function Burn(props: any) {
  const { contractAddress, ABI } = props;

  const [address, setAddress]: any = useState();
  const [amount, setAmount]: any = useState();

  const { runContractFunction, data, error, isLoading, isFetching } =
    useWeb3Contract({
      contractAddress: contractAddress,
      functionName: "burn",
      abi: ABI,
      params: {
        account: address,
        amount: amount,
      },
    });

  return (
    <>
      {isFetching && console.log("========isFetching======== ")}
      {isLoading && console.log("========isLoading======== ")}
      {data && console.log("Success! Hash: ", (data as Data).hash)}
      {error && console.log("error: ", error)}

      <Card
        sx={{
          width: "500px",
          m: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: 2,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            component="h5"
            sx={{
              mb: 4,
            }}
          >
            Burn tokens method
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            id="ownership"
            label="Add address you want to burn"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{
              width: "100%",
              mt: 1,
            }}
            id="amount"
            label="Token amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            sx={{
              mt: 4,
            }}
            variant="outlined"
            onClick={() => {
              runContractFunction();
            }}
          >
            Change ownership
          </Button>
        </Box>
      </Card>
    </>
  );
}
