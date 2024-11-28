import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, Flex, Heading, HStack, Image, Input, Link, Stack, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Checkbox } from "../components/ui/checkbox"
import { PasswordInput } from "../components/ui/password-input"
import { FaF, FaGoogle } from "react-icons/fa6";
import { Separator } from "@chakra-ui/react"
import { SiApple } from "react-icons/si";
import { Icon } from "@chakra-ui/react"
import { FaFacebook } from "react-icons/fa";
import { sendDataToAPI } from '../utils/axios';
import { createListCollection } from "@chakra-ui/react"


const cadastro = () => {

	const [visible, setVisible] = useState(false);
	
	const [usuario, setUsuario] = useState('');
	const [cpf, setCpf] = useState('');
	const [cargo, setCargo] = useState('');
	const [senha, setSenha] = useState('');

	const handleCadastro = async () => {
		try {
			const payload = { usuario, cpf, senha, cargo };
			console.log('Sending payload:', payload); // Add this line
			const response = await sendDataToAPI('/fornecedor', payload);
			console.log('Cadastro realizado com sucesso:', response);
		} catch (error) {
			console.error('Erro ao realizar cadastro:', error);
		}
	};

	return (
		<div>
			<HStack
				w="100%"
				h="97vh"
				bgColor={"gray.800"}
			>
				<Flex
					w="220%"
					h="full"
				>
					<Box
						bgRepeat={"no-repeat"}
						bgPos={"left"}
						bgImage="url(https://images6.alphacoders.com/491/491674.jpg)"
						p={5}
						w="full"
						h="full"
						bgSize="cover"
					/>
				</Flex>
				<Flex
					w="full"
					h="full"
					alignItems="center"
					justifyContent="center"
				>
					<Stack
						w="full"
						maxW="md"
						p={4}
					>
						<Image
							pb={5}
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Pepsi_logo_%282014%29.svg/800px-Pepsi_logo_%282014%29.svg.png"
							alt="Pepsi Logo"
							maxW={"250px"}
							w={"auto"}
							h={"auto"}

						/>
						<Heading
							fontSize={"2xl"}
							color="white"
							fontWeight={600}
						>
							Crie sua conta
						</Heading>
						<Text pb={3} color="whiteAlpha.500" fontSize={14}>Digite suas credenciais</Text>
						<FormControl pb={10} id="usuario" color={"white"}>
							<FormLabel pb={5}>Usuário</FormLabel>
							<Input
								borderColor="transparent"
								bgColor={"black"}
								placeholder="Seu usuário"
								_placeholder={{ color: "whiteAlpha.700" }}
								_focus={{ borderColor: "#004B93" }}
								value={usuario}
								onChange={(e) => setUsuario(e.target.value)}
							/>
						</FormControl >
						<FormControl pb={10} id="cpf" color={"white"}>
							<FormLabel pb={5}>Cpf</FormLabel>
							<Input
								borderColor="transparent"
								bgColor={"black"}
								placeholder="Seu cpf"
								_placeholder={{ color: "whiteAlpha.700" }}
								_focus={{ borderColor: "#004B93" }}
								value={cpf}
								onChange={(e) => setCpf(e.target.value)}
							/>
						</FormControl >
						<FormControl pb={10} id="cargo" color={"white"}>
							<FormLabel pb={5}>Cargo</FormLabel>
							<Input
								borderColor="transparent"
								bgColor={"black"}
								placeholder="Seu cargo"
								_placeholder={{ color: "whiteAlpha.700" }}
								_focus={{ borderColor: "#004B93" }}
								value={cargo}
								onChange={(e) => setCargo(e.target.value)}
							/>
						</FormControl >
						<FormControl pb={5} id="senha" color={"white"}>
							<FormLabel pb={5}>Senha</FormLabel>
							<PasswordInput
								borderColor="transparent"
								bgColor={"black"}
								placeholder="Sua senha"
								_placeholder={{ color: "whiteAlpha.700" }}
								_focus={{ borderColor: "#004B93" }}
								visible={visible}
								onVisibleChange={setVisible}
								value={senha}
								onChange={(e) => setSenha(e.target.value)}
							/>
							<Text color="whiteAlpha.500" fontSize={13} pl={0.4} pb={0}>Password is {visible ? "visible" : "hidden"}</Text>
						</FormControl>
						<Stack
							direction={"row"}
							align="start"
							justify={"space-between"}
							spacing={4}
							pb={15}
							pl={0.5}
						>
							<Checkbox colorPalette="blue" size="md" color={"white"}>Lembrar-me</Checkbox>
						</Stack>
						<Button borderRadius={20} bgColor="#004B93" onClick={handleCadastro}>Cadastre-se</Button>
						<HStack pb={2} pt={2}>
							<Separator borderColor='whiteAlpha.700' />
							<Text flexShrink="0" color="whiteAlpha.700">OU</Text>
							<Separator borderColor='whiteAlpha.700' />
						</HStack>
						<Button
							borderRadius={20}
							bgColor="white"
							color="black"
							alignItems="center"
							justifyContent="center"
							gap={0} // Adds space between icon and text
							style={{ marginBottom: '10px' }}
						>
							<Icon fontSize="18px" style={{ marginLeft: '10px' }} >
								<FaGoogle />
							</Icon>
							<Text pl={0} style={{ marginLeft: '10px' }}>Entrar com o Google</Text>
						</Button>
						<Button
							borderRadius={20}
							bgColor="white"
							color="black"
							alignItems="center"
							justifyContent="center"
							gap={2} // Adds space between icon and text
							style={{ marginBottom: '10px' }}
						>
							<Icon fontSize="20px">
								<SiApple />
							</Icon>
							<Text>Entrar com a Apple</Text>
						</Button>

						<Button
							borderRadius={20}
							bgColor="white"
							color="black"
							alignItems="center"
							justifyContent="center"
							gap={1} // Adds space between icon and text
							style={{ marginBottom: '10px' }}
						>
							<Icon fontSize="20px">
								<FaFacebook />
							</Icon>
							<Text >Entrar com o Facebook</Text>
						</Button>
					</Stack>
				</Flex>

			</HStack>
		</div>
	);
}

export default cadastro;