import { Button, Box, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";

import { Data } from "../interfaces/interfaces";

export default function Whitelist(props: any) {
  const { contractAddress, ABI } = props;

  const [wlAddress, setWlAddress]: any = useState();

  const { runContractFunction, data, error, isLoading, isFetching } =
    useWeb3Contract({
      contractAddress: contractAddress,
      functionName: "whitelistAdd",
      abi: ABI,
      params: {
        _add: wlAddress,
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
            Whitelist method
          </Typography>
          <TextField
            sx={{
              width: "100%",
            }}
            id="whitelist"
            label="Add a new Wallet address"
            onChange={(e) => setWlAddress(e.target.value)}
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
            Add Address
          </Button>
        </Box>
      </Card>
    </>
  );
}
