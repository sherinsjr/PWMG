import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const MealsDetails = ({ meals }) => {
  return (
    <Flex>
      <Flex gap='4'>
        <Table>
          <Thead>
            <Tr>
              <Th>Meal</Th>
              <Th>Calories</Th>
            </Tr>
          </Thead>
          <Tbody>
            {meals.map((meal, index) => (
              <Tr key={index}>
                <Td>{meal.mealName}</Td>
                <Td>{meal.calories}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Flex>
  );
};
MealsDetails.propTypes = {
  meals: PropTypes.any,
};

export default MealsDetails;
