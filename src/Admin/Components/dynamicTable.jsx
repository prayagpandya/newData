import React from 'react';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DynamicTable = ({ caption, headers, data, actions, id }) => {
  return (
    <TableContainer w={'100%'} maxW={'60vw'}>
      <Table variant="striped" colorScheme="yellow">
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>
            {headers.map((header, index) => (
              <Th key={index}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr
              key={rowIndex}
              gridColumn={headers.length}
              gridTemplateColumns={`repeat(${headers.length}, 1fr)`}
            >
              {Object.values(row).map((cell, cellIndex) => (
                <Td key={cellIndex}>{cell}</Td>
              ))}
              {actions &&
                actions.map((action, actionIndex) => (
                  <Td key={actionIndex}>
                    <Button
                      colorScheme={action.colorScheme}
                      size="sm"
                      onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </Button>
                  </Td>
                ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DynamicTable;
