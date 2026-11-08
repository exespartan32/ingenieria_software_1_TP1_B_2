import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // Controla el estado del Modal de Chakra UI
  const [data, setData] = useState([]); // Arreglo principal de datos
  const [dataEdit, setDataEdit] = useState({}); // Datos seleccionados para edición

  // Detecta si es un dispositivo móvil para ajustar anchos
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  // Al cargar la app, lee el LocalStorage
  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];
    setData(db_costumer);
  }, [setData]);

  const handleRemove = (email) => {
    // Filtra excluyendo el email a eliminar
    const newArray = data.filter((item) => item.email !== email);
    setData(newArray);
    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          Nuevo
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  Nombre
                </Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                  E-Mail
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, email }, index) => (
                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                  <Td maxW={isMobile ? 5 : 100}>{name}</Td>
                  <Td maxW={isMobile ? 5 : 100}>{email}</Td>
                  <Td p={0}>
                    {/* Botón de Editar */}
                    <Button
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, email, index }),
                        onOpen(),
                      ]}
                    >
                      ✏️
                    </Button>
                  </Td>
                  <Td p={0}>
                    {/* Botón de Eliminar */}
                    <Button fontSize={20} onClick={() => handleRemove(email)}>
                      🗑️
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {/* Solo renderiza el modal si está abierto (isOpen) */}
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}
    </Flex>
  );
};

export default App;
