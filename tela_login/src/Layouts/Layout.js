import { Box, HStack, Flex, VStack, Icon } from "@chakra-ui/react";
import Fim from "../components/Fimpagina";
import Topopagina from "../components/Topopagina"
import { TbBrandPepsi } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsQuestionCircle } from "react-icons/bs";

const Layout = ({ children }) => {
  return (
    <div className="content">
      <HStack
        w="100%"
        h="100vh"
      >
        <Flex
          w="4%"
          h="full"
        >
          <Box
            bgColor= "white"
            w="full"
            h="full"
          >
          <Icon w={12} h={12} color={"#004B93"} marginLeft={3.5} marginTop={2} >
          <TbBrandPepsi />
          </Icon>
          <Icon w={10} h={10} color={"gray"} marginLeft={4.5} marginTop={10} >
          <AiOutlineProduct />
          </Icon>
          <Icon w={10} h={10} color={"gray"} marginLeft={4.5} marginTop={4} >
          <CgProfile />
          </Icon>
          <Icon w={10} h={10} color={"gray"} marginLeft={4.5} marginTop={4} >
          <MdOutlineAttachMoney />
          </Icon>
          <Icon w={10} h={10} color={"gray"} marginLeft={4.5} marginTop={4} >
          <BsQuestionCircle />
          </Icon>
          
          </Box>
        </Flex>
        <VStack
          w="96%"
          h="full"
          spacing={4}
        >
          <Topopagina />
          {children}
          <Fim />
        </VStack>
      </HStack>
    </div>
  );
}

export default Layout;