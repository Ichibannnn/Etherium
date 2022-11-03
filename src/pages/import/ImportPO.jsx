import { Flex, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const ImportPO = () => {
  return (
    <Flex w="full" mt={4} flexDirection="column" alignItems="left">
        <Table>
            <Thead bg="primary">
                <Tr>
                    <Th>PR NUMBER</Th>
                    <Th>PR DATE</Th>
                    <Th>PO NUMBER</Th>
                    <Th>PO DATE</Th>
                    <Th>ITEM CODE</Th>
                    <Th>ITEM DESCRIPTION</Th>
                    <Th>ORDERED</Th>
                    <Th>DELIVERED</Th>
                    <Th>BILLED</Th>
                    <Th>UOM</Th>
                    <Th>UNIT PRICE</Th>
                    <Th>VENDOR NAME</Th>
                </Tr>
            </Thead>
            <Tbody>
                
            </Tbody>
        </Table>
    </Flex>
  )
}

export default ImportPO