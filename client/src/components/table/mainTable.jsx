import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

import React, { useCallback, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

// Component for the global search bar
const GlobalSearch = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  // eslint-disable-next-line no-unused-vars
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  // Function to debounce onChange
  const debounceOnChange = useCallback(
    (value) => {
      const timeout = setTimeout(() => {
        setGlobalFilter(value || undefined);
      }, 200);
      return () => clearTimeout(timeout);
    },
    [setGlobalFilter]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setValue(value);
    debounceOnChange(value);
  };

  return (
    <Flex
      w={{ base: '10rem', md: '16rem', lg: '20rem' }}
      h={{ base: '2.1875rem', lg: '2.4rem' }}
    >
      <InputGroup color='#3d3d3d'>
        <InputLeftElement ml={1} height='full' size='1.25rem'>
          <AiOutlineSearch />
        </InputLeftElement>
        <Input
          maxHeight={{ base: '2rem', lg: '2.2rem' }}
          placeholder='Search...'
          _placeholder={{ opacity: 0.9, color: 'black' }}
          color='black'
          border='2px solid'
          borderColor='#3d3d3d'
          bg='transparent'
          value={value || ''}
          onChange={handleInputChange}
        />
      </InputGroup>
    </Flex>
  );
};

GlobalSearch.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired,
};

// Component for the table
const TableComponent = ({
  columns,
  data,
  isButton,
  buttonLink,
  isPagination,
  buttonName,
  icon,
}) => {
  // Default column filter
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Custom filter UI for text columns
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;
    return (
      <Input
        maxHeight='2.1875rem'
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
  }
  DefaultColumnFilter.propTypes = {
    column: PropTypes.shape({
      filterValue: PropTypes.string,
      preFilteredRows: PropTypes.array.isRequired,
      setFilter: PropTypes.func.isRequired,
    }).isRequired,
  };

  // Custom filter function for text columns
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  // useTable from react-table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: { sortBy: [{ desc: true }], pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  return (
    <Flex w='full' flexDirection='column' gap='4'>
      <Flex justify='space-between' pb='2' gap={{ base: '2', md: '0' }}>
        <Flex gap='4'>
          {isButton && (
            <Button
              as={Link}
              bg='brand.btnBg'
              display='flex'
              color='brand.white'
              gap='2'
              px='8'
              size='sm'
              _hover={{ background: '#3DC76C' }}
              w={{ base: '8rem', md: '9rem' }}
              to={buttonLink}
            >
              <Flex>{icon}</Flex>
              <Text fontSize={{ base: '0.8rem', md: '0.90rem' }}>
                {buttonName}
              </Text>
            </Button>
          )}
        </Flex>
        <Flex></Flex>
        <GlobalSearch
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
        />
      </Flex>
      {page.length === 0 ? (
        <Flex w='100%' fontSize={18} color='brand.white' fontWeight='medium'>
          No data available
        </Flex>
      ) : (
        <TableContainer w='100%' overflow='auto'>
          <Flex w='full' overflow='auto' flexDirection='column' p='2'>
            <Table
              w='100%'
              variant='simple'
              {...getTableProps()}
              size='sm'
              // border='2px solid'
              bg='#3d3d3d80'
              borderRadius='1rem'
            >
              <Thead>
                {headerGroups.map((group, index) => (
                  <Tr key={index} {...group.getHeaderGroupProps()}>
                    {group.headers.map((column, index) => (
                      <Th
                        key={index}
                        textTransform='uppercase'
                        fontSize={{
                          base: '0.8125rem',
                          md: '0.875rem',
                          lg: '1.2rem',
                        }}
                        py='4'
                        fontWeight='bold'
                        color='brand.mainTeal'
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        border='none'
                      >
                        {column.render('Header')}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <Tr key={index} border='none' {...row.getRowProps()}>
                      {row.cells.map((cell, cellindex) => (
                        <Td
                          key={cellindex}
                          color='brand.white'
                          fontSize={{
                            base: '0.75rem',
                            md: '0.875rem',
                            lg: '1.1rem',
                          }}
                          py='4'
                          border='none'
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            {/* Pagination start */}
            {isPagination && (
              <Flex mt={5} overflow='auto'>
                <Flex
                  display='flex'
                  px={2}
                  mb={1}
                  borderRadius='1rem'
                  w='full'
                  justifyContent={{ base: 'center', md: 'space-between' }}
                  gap='4'
                  direction={{ base: 'column', md: 'row' }}
                >
                  <Flex
                    gap='8'
                    ml={{ base: '0', md: '0', lg: '35%' }}
                    fontSize={{ base: '0.75rem', md: '0.875rem', lg: '1rem' }}
                  >
                    <Button
                      size='sm'
                      bg='#3d3d3d'
                      color='brand.white'
                      fontWeight='extrabold'
                      w={{ base: '4rem' }}
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {'<<'}
                    </Button>
                    <Button
                      size='sm'
                      bg='#3d3d3d'
                      color='brand.white'
                      fontWeight='extrabold'
                      w={{ base: '3rem' }}
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {'<'}
                    </Button>
                    <Button
                      size='sm'
                      bg='#3d3d3d'
                      color='brand.white'
                      fontWeight='extrabold'
                      w={{ base: '3rem' }}
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      {'>'}
                    </Button>
                    <Button
                      size='sm'
                      bg='#3d3d3d'
                      color='brand.white'
                      fontWeight='extrabold'
                      w={{ base: '4rem' }}
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {'>>'}
                    </Button>
                  </Flex>
                  <Flex
                    fontSize={{ base: '0.75rem', md: '0.875rem', lg: '1rem' }}
                    flexDir='row'
                    alignItems='center'
                    justify='center'
                    gap='2'
                  >
                    <Flex>
                      <Text color='brand.white' mr='2'>
                        Page
                      </Text>
                      <Text color='brand.white'>
                        <strong>
                          {pageIndex + 1} of {pageCount}
                        </strong>
                      </Text>
                    </Flex>
                    <Select
                      size='sm'
                      color='brand.white'
                      bg='brand.mainTeal'
                      fontSize={{ base: '0.75rem', md: '0.875rem', lg: '1rem' }}
                      border='0.0625rem solid'
                      borderColor='brand.dark'
                      borderRadius='6'
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option
                          key={pageSize}
                          value={pageSize}
                          style={{
                            backgroundColor: 'transparent',
                            color: 'brand.dark',
                          }}
                        >
                          Show {pageSize}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
              </Flex>
            )}

            {/* Pagination end */}
          </Flex>
        </TableContainer>
      )}
    </Flex>
  );
};

TableComponent.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isButton: PropTypes.bool,
  buttonLink: PropTypes.string,
  isPagination: PropTypes.bool,
  buttonName: PropTypes.string,
  icon: PropTypes.elementType,
};

export default TableComponent;
