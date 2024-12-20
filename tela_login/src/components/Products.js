import { Box, HStack, Heading, Stack, Table, Flex, Text } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { IoIosAdd } from "react-icons/io";
import { MdBorderColor, MdOutlineAdd } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { Dialog } from "./Dialog";
import { Alert } from "./ui/alert"
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { IoMdDownload } from "react-icons/io";
import { saveAs } from 'file-saver';

const animations = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const products = ({material=[], handleEditProduct, handleAddProduct, deleta}) => {
  
  
  const router = useRouter();
  const verifyAdmin = async () => {
    const token = localStorage.getItem('token');
    if (!token) {

      router.push('/');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3335/fornecedor', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status !== 200) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error verifying admin:', error);
      router.push('/');
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = material.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(material.length / itemsPerPage);
  useEffect(() => {
    verifyAdmin();

  }, []);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDownload = (fileId) => {
    const fileContent = `File ID: ${fileId}`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, `file_${fileId}.txt`);
  };

  return (
    
    <Stack width="full" bgColor={"#d4d4d8"} color={"black"} pl={20} pr={20} borderRadius={"10px"} >
      {alertVisible && (
        <Alert
          status="error"
          title="There was an error processing your request"
          onClose={() => setAlertVisible(false)}
        />
      )}
      <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      <Box
        borderRadius={"10px"}
        backgroundColor={"white"}
        p={10}>
        <Box  >
          <HStack >
            <Box justify="space-between" w="full">
              <HStack justify="space-between" w="full">
                <Heading fontSize={30} marginBottom={"3"} >Lista de Produtos</Heading>
                <IconButton marginBottom={"1"} textAlign="end" aria-label="Search database" variant="outline" borderRadius={10} >
                  <LuSearch />
                </IconButton>
              </HStack>
            </Box>
            <IconButton borderRadius={10} pl={2} marginBottom={"1"} textAlign="end" aria-label="Search database" variant="outline"  gap={0} >
            <FaSortAmountDown color="black"/>
              <Text color={"black"} marginRight={2}>Ordenar</Text>
            </IconButton>
            <IconButton borderRadius={10} p={2} marginBottom={"1"} textAlign="end" aria-label="Search database" variant="outline" border={"transparent"} bgColor={"green"} gap={0} >
              <MdOutlineAdd color="white" />
              <Text color={"white"} marginRight={2} onClick={() => setModalOpen(true)} >Adicionar Produto</Text>
            </IconButton>
            {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
          onSubmit={handleAddProduct}
        />
      )}
          </HStack>
        </Box>
        <Table.Root  >
          <Table.Header  >
            <Table.Row backgroundColor="#004B93"  >
              <Table.ColumnHeader borderRadius={"10px 0px 0px 0px"} color={"white"}>Id</Table.ColumnHeader>
              <Table.ColumnHeader color={"white"}>Tipo</Table.ColumnHeader>
              <Table.ColumnHeader color={"white"}>Nome</Table.ColumnHeader>
              <Table.ColumnHeader color={"white"}>Preço</Table.ColumnHeader>
              <Table.ColumnHeader pl={8} color={"white"} borderRadius={"0px 10px 0px 0px"}>Ações</Table.ColumnHeader>
            </Table.Row>
          </Table.Header >
          <Table.Body>
            {currentItems.map((item) => (
              <Table.Row key={item.id} bgColor={"transparent"}>
                <Table.Cell width={"20%"} >{item.id}</Table.Cell>
                <Table.Cell width={"20%"}>{item.tipo}</Table.Cell>
                <Table.Cell width={"20%"}>{item.nome}</Table.Cell>
                <Table.Cell width={"20%"}>R$ {item.valor}.00</Table.Cell>
                <Table.Cell>
                  <Dialog data={item} onSubmit={handleEditProduct} />
                  <IconButton marginLeft={3} borderRadius={6} size="xs" bgColor={"red"} aria-label="Delete product" onClick={() => deleta(item.id, setAlertVisible )}>
                    <FaRegTrashAlt />
                  </IconButton>
                  <IconButton  marginLeft={3} borderRadius={6} size="xs" bgColor={"gray.700"} aria-label="Download" onClick={() => handleDownload(item.id)}>
                    <IoMdDownload />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Flex justifyContent="center" mt={4}>
          <IconButton
            onClick={handlePreviousPage}
            isDisabled={currentPage === 1}
            aria-label="Previous Page"
            margin={1}
            backgroundColor="lightgray"  
            color="black "
          >
            {"<"}
          </IconButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <IconButton
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              isActive={currentPage === index + 1}
              aria-label={`Page ${index + 1}`}
              backgroundColor={currentPage === index + 1 ? "#004B93" : "#d4d4d8"}
              color={currentPage === index + 1 ? "white" : "black"}
              margin={1}
              _focus={{ backgroundColor: "#004B93", color: "white" }}
              _hover={{ backgroundColor: "gray", color: "white" }}
            >
              {index + 1}
            </IconButton>
          ))}
          <IconButton
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            aria-label="Next Page"
            margin={1}
            backgroundColor="lightgray"  
            color="black "
          >
            {">"}
          </IconButton>
        </Flex>
      </Box>
      </motion.div>
    </Stack>
  );
}

export default products;