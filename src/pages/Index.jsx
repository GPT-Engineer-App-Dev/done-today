// Complete the Index page component for a basic Todo application
import { useState } from "react";
import { Box, Input, Button, List, ListItem, IconButton, Text, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === "") {
      toast({
        title: "No input",
        description: "Please enter a task.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = {
      id: Date.now(),
      text: input,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <Box p={5}>
      <Box mb={4}>
        <Input placeholder="Add a new task..." value={input} onChange={(e) => setInput(e.target.value)} size="lg" />
        <Button leftIcon={<FaPlus />} colorScheme="blue" ml={2} onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} p={2} bg={task.isCompleted ? "green.100" : "gray.100"} display="flex" alignItems="center" justifyContent="space-between">
            <Text as={task.isCompleted ? "s" : "span"}>{task.text}</Text>
            <Box>
              <IconButton icon={<FaCheck />} aria-label="Complete Task" colorScheme="green" onClick={() => handleToggleComplete(task.id)} mr={2} />
              <IconButton icon={<FaTrash />} aria-label="Delete Task" colorScheme="red" onClick={() => handleDeleteTask(task.id)} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;
