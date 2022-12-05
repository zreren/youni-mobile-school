import {getProfessorList} from "../../pages/api/professor";
const sum = function(a, b) {
    return a+b;
}

test('adds 1 + 2 to equal 3', async() => {
    const result = await getProfessorList();
  expect(result).toBe(3);
});

