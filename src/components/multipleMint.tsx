import {
  Button,
  Box,
  Card,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";

import { useWeb3Contract } from "react-moralis";

import { Data } from "../interfaces/interfaces";

export default function MultipleMint(props: any) {
  const { contractAddress, ABI } = props;

  const emptyArray: any = [];

  const [multiWallets, setMultiWallets] = useState(emptyArray);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const haveData: any = (address: string, amount: string) => {
    setMultiWallets((prevState: any) => {
      var newArray = Array.from(prevState);
      newArray.push({ address, amount });
      return newArray;
    });
  };

  const { runContractFunction, data, error, isLoading, isFetching } =
    useWeb3Contract({
      contractAddress: contractAddress,
      //this function "mintMultiple" is not working, also tested with Remix.ethereum
      functionName: "mintMultiple",
      abi: ABI,
      // params: {
      //   tokenHolders: multiWallets,
      //   amount: multiWallets,
      // },
    });
  return (
    <>
      {isFetching && console.log("========isFetching======== ")}
      {isLoading && console.log("========isLoading======== ")}
      {data && console.log("Success! Hash: ", (data as Data).hash)}
      {error && console.log("error: ", error)}
      <Card
        sx={{
          width: "100%",
          m: 2,
        }}
      >
        <Box
          sx={{
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
            Multiple Mint Method
          </Typography>
          <TextField
            sx={{
              width: "67%",
            }}
            id="mintAddress"
            label="Add a new wallet address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <TextField
            sx={{
              width: "30%",
              ml: 1,
            }}
            id="mintAmount"
            label="Amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <Button
            sx={{
              mb: 4,
              mt: 1,
              float: "right",
            }}
            variant="outlined"
            onClick={() => {
              haveData(address, amount);
            }}
          >
            Add address
          </Button>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Address</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {multiWallets &&
                  multiWallets.length !== 0 &&
                  multiWallets.map((multiWallets: any, id: string) => (
                    <TableRow key={multiWallets.amount}>
                      <TableCell>{id + 1}</TableCell>
                      <TableCell>{multiWallets.address}</TableCell>
                      <TableCell>{multiWallets.amount}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            sx={{
              my: 4,
              float: "right",
            }}
            variant="outlined"
            onClick={() => {
              runContractFunction();
            }}
          >
            Mint
          </Button>
        </Box>
      </Card>
    </>
  );
}
