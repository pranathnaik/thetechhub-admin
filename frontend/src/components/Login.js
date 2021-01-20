import React, { useState, useContext } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  Flex,
  Center,
  Stack,
} from "@chakra-ui/react";
import imga from "./login.png";
import axios from "axios";
import AdminContext from "../context/AdminContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState({ email: "", password: "" });
  const [message, setmessage] = useState(null);
  const [submit, setsubmit] = useState(false);
  const { setadmin } = useContext(AdminContext);
  const history = useHistory();
  const onsub = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    event.preventDefault();
    setuser({ ...user, [event.target.name]: event.target.value });
    console.log(user);
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/settings/login", {
      ...user,
    });
    if (res) {
      console.log(res.data);
      setadmin({ id: res.data.admin.id, admin: res.data.admin });
      localStorage.setItem("x-auth-id", res.data.admin.id);
      history.push("/");
    }
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
