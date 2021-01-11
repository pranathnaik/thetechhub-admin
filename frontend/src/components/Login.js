import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Form,
  Field,
  Button,
  Input,
  Flex,
  Center,
  Image,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import imga from "./login.png";

const Login = () => {
  const [user, setuser] = useState({ email: "", password: "" });
  const [message, setmessage] = useState(null);
  const [submit, setsubmit] = useState(false);
  const onsub = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    event.preventDefault();
    setuser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const login = () => {
    console.log(user.email);
  };
  return (
    <>
      <Flex justify h="100vh" w="100%">
        <Center w="50%" alignSelf="center">
          <img src={imga} alt="" />
        </Center>
        <Center w="50%">
          <Box w="50%">
            <form onSubmit={onsub}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={onChange}
                    isRequired
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    onChange={onChange}
                    isRequired
                  />
                </FormControl>

                <Button
                  isLoading={submit}
                  onClick={login}
                  loadingText="Submitting"
                  colorScheme="teal"
                  w="100%"
                  type="submit"
                >
                  login
                </Button>
              </Stack>
            </form>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
