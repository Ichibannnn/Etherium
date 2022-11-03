import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Select,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon} from '@chakra-ui/icons';
import { FaSearch } from "react-icons/fa";
import request from "../services/request";
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from '@ajna/pagination'

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    uoM_Code: "",
    uoM_Description: "",
  });

  const [pageTotal, setPageTotal] = useState(undefined);

  const outerLimit = 2;
  const innerLimit = 2;
  const { currentPage, setCurrentPage, pagesCount, pages, setPageSize, pageSize } = usePagination({
    total: pageTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: { currentPage: 1, pageSize: 5 },
  })

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
  }

  const handlePageSizeChange = (e) => {
    const pageSize = Number(e.target.value)
    setPageSize(pageSize)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [search, setSearch] = useState("");

  const getHandler = async () => {
    const response = await request.get("Uom/GetAllUOM");

    return response.data;
  };

  const getHandlerData = () => {
    getHandler().then((res) => {
      setCustomers(res);
    });
  };

  useEffect(() => {
    getHandlerData();

    return () => {
      setCustomers();
    };
  }, []);

  // EDIT BUTTON -> DRAWER
  const editHandler = (sahod) => {
    onOpen();
    setEditData({
      id: sahod.id,
      uoM_Code: sahod.uoM_Code,
      uoM_Description: sahod.uoM_Description,
    });
  };

  // ADD CUSTOMER BUTTON -> DRAWER
  const addCustomerHandler = () => {
    setEditData({
      id: "",
      uoM_Code: "",
      uoM_Description: "",
    });
    onOpen();
  };

  //DELETE

  // DELETE UOM BUTTON
  const deleteUOMHandler = (id) => {
    try {
      console.log("Item successfully deleted.");

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((confirmButtonText, showCancelButton) => {
        if (confirmButtonText.isConfirmed) {
          request.delete(`Uom/DeleteUom/${id}`);

          Swal.fire("Deleted!", "Your file has been deleted.", "success");

          getHandlerData();
        } else {
          console.log("Not deleted");
        }
      });
    } catch (error) {}
  };

  return (
    <Flex w="full" flexDirection="column" alignItems="left">
      <Flex
        p={2}
        mb={2}
        justifyContent="space-between"
        flexDirection="column"
        gap={2}
      >
        <HStack w="30%" mt={2} mr={1}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch color="gray.300" />}
            />
            <Input type="text" placeholder="Search: UOM Name" />
          </InputGroup>
        </HStack>
      </Flex>

      <Table size="sm" variant="striped" bgColor="#282828" width="full">
        <Thead bgColor="#1c1c1c" h="50px">
          <Tr color="#fff">
            <Th>ID</Th>
            <Th>UOM CODE</Th>
            <Th>UOM DESCRIPTION</Th>
            <Th>ACTION</Th>
          </Tr>
        </Thead>
        <Tbody>
          {customers.map((showData, i) => (
            
            <Tr key={i}>
              <Td>{showData.id}</Td>
              <Td>{showData.uoM_Code}</Td>
              <Td>{showData.uoM_Description}</Td>
              <Td>
              <HStack spacing="24px">
                <EditIcon
                // color="primary"
                w={5} h={5}
                onClick={() => editHandler(showData)}
                />

                <DeleteIcon
                // color="primary"
                 w={5} h={5}
                 onClick={() => deleteUOMHandler(showData.id)}
                 />
                </HStack>
              </Td>
            </Tr>
            
          ))}
        </Tbody>
      </Table>

      <Flex mt={5} justifyContent="space-between">
        <Button colorScheme="teal" onClick={addCustomerHandler} borderRadius="none">
          Add UOM
        </Button>

        <Stack>
          <Pagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          >
            <PaginationContainer>
              <PaginationPrevious bg="secondary" color='white' p={1} _hover={{ bg: 'accent', color: 'white' }}>{"<<"}</PaginationPrevious>
              <PaginationPageGroup ml={1} mr={1}>
                {pages.map((page) => (
                  <PaginationPage
                    _hover={{ bg: 'accent', color: 'white' }}
                    p={3}
                    bg="secondary"
                    color='white'
                    key={`pagination_page_${page}`}
                    page={page}
                  />
                ))}
              </PaginationPageGroup>
              <HStack>
                <PaginationNext bg="secondary" color='white' p={1} _hover={{ bg: 'accent', color: 'white' }}>{">>"}</PaginationNext>
                <Select
                  onChange={handlePageSizeChange}
                  variant='filled'
                >
                  <option value={Number(5)}>5</option>
                  <option value={Number(10)}>10</option>
                  <option value={Number(25)}>25</option>
                  <option value={Number(50)}>50</option>
                </Select>
              </HStack>
            </PaginationContainer>
          </Pagination>
        </Stack>
      </Flex>

      {/* PROPS */}
      {isOpen && (
        <DrawerComponent
          isOpen={isOpen}
          onClose={onClose}
          editData={editData}
          setEditData={setEditData}
          getHandlerData={getHandlerData}
          deleteUOMHandler={deleteUOMHandler}
        />
      )}
    </Flex>
  );
};

export default Customers;

const DrawerComponent = (props) => {
  const { isOpen, onClose, editData, setEditData, getHandlerData } = props;

  const submitHandler = async () => {
    if (editData.id) {
      // EDIT - PUT
      const submitData = {
        id: editData.id,
        uoM_Code: editData.uoM_Code,
        uoM_Description: editData.uoM_Description,
      };
      const id = editData.id;
      const res = await request.put(`Uom/UpdateUom/${id}`, submitData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully updated UOM!",
        showConfirmButton: false,
        timer: 1500,
      });
      onClose();
      getHandlerData();
    } else if (editData.id === "") {
      delete editData["id"];
      const res = await request.post("Uom/AddNewUOM", editData);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully added customer!",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
      getHandlerData();
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>UOM Information</DrawerHeader>

          <DrawerBody>
            <Text>UOM CODE</Text>
            <Input
              value={editData.uoM_Code}
              onChange={(e) =>
                setEditData({
                  id: editData.id,
                  uoM_Code: e.target.value,
                  uoM_Description: editData.uoM_Description,
                })
              }
            />
            <Text>UOM Description</Text>
            <Input
              value={editData.uoM_Description}
              onChange={(e) =>
                setEditData({
                  id: editData.id,
                  uoM_Code: editData.uoM_Code,
                  uoM_Description: e.target.value,
                })
              }
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={submitHandler}>
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
