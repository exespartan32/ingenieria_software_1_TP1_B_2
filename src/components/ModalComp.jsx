import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  // Inicializamos los estados con los datos a editar (si existen)
  const [name, setName] = useState(dataEdit.name || "");
  const [email, setEmail] = useState(dataEdit.email || "");

  const handleSave = () => {
    // Validar que los campos no estén vacíos
    if (!name || !email) return;

    // Verificar si el email ya existe (ignorando el que se está editando)
    if (emailAlreadyExists()) {
      return alert("E-mail já cadastrado!");
    }

    // Lógica para Edición
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, email };
    }
    // Lógica para Creación
    else {
      const newDataArray = !data
        ? [{ name, email }]
        : [...data, { name, email }];
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
      setData(newDataArray);
      onClose(); // Cierra el modal
      return;
    }

    // Actualiza LocalStorage en caso de edición
    localStorage.setItem("cad_cliente", JSON.stringify(data));
    setData([...data]);
    onClose(); // Cierra el modal
  };

  const emailAlreadyExists = () => {
    if (dataEdit.email !== email && data?.length) {
      return data.find((item) => item.email === email);
    }
    return false;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastro de Clientes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl display="flex" flexDir="column" gap={4}>
            <Box>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </FormControl>
        </ModalBody>

        <ModalFooter justifyContent="start">
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            GUARDAR
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            CANCELAR
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComp;
